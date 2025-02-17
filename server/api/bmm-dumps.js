import { writeFile, readdir, stat, unlink } from 'fs/promises';
import { join } from 'path';

const UPLOADS_DIR = join(process.cwd(), 'uploads');
const MAX_FILES = 5; // Keep only the latest 5 files

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Expecting { filename, content }

  if (!body.filename || !body.content) {
    throw createError({ statusCode: 400, message: 'Invalid data' });
  }

  const filePath = join(UPLOADS_DIR, body.filename);

  try {
    // Ensure the uploads directory exists
    await ensureUploadsDir();

    // Manage file count before saving
    await manageFileLimit();

    // Save the new file
    await writeFile(filePath, body.content, 'utf8');

    return { message: 'File saved', filePath };
  } catch (err) {
    throw createError({ statusCode: 500, message: 'Failed to save file', cause: err });
  }
});

/**
 * Ensures the uploads directory exists.
 */
async function ensureUploadsDir() {
  try {
    await readdir(UPLOADS_DIR); // Check if folder exists
  } catch (error) {
    // If error, create the directory
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  }
}

/**
 * Manages file limit by deleting oldest files if more than MAX_FILES exist.
 */
async function manageFileLimit() {
  const files = await readdir(UPLOADS_DIR);

  if (files.length >= MAX_FILES) {
    // Get file details (timestamps)
    const fileStats = await Promise.all(
      files.map(async (file) => {
        const filePath = join(UPLOADS_DIR, file);
        const stats = await stat(filePath);
        return { file, time: stats.mtimeMs, path: filePath };
      })
    );

    // Sort files by modification time (oldest first)
    fileStats.sort((a, b) => a.time - b.time);

    // Delete oldest files if necessary
    while (fileStats.length >= MAX_FILES) {
      const oldestFile = fileStats.shift(); // Get and remove first element
      if (oldestFile) {
        await unlink(oldestFile.path);
        console.log(`Deleted old file: ${oldestFile.file}`);
      }
    }
  }
}
