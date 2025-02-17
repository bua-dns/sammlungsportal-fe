import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

const UPLOADS_DIR = join(process.cwd(), 'uploads'); // ✅ Outside of .output

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Expecting { filename, content }

  if (!body.filename || !body.content) {
    throw createError({ statusCode: 400, message: 'Invalid data' });
  }

  try {
    // Ensure uploads directory exists
    await mkdir(UPLOADS_DIR, { recursive: true });

    // Save the file
    const filePath = join(UPLOADS_DIR, body.filename);
    await writeFile(filePath, body.content, 'utf8');

    return { message: 'File saved', filePath };
  } catch (err) {
    throw createError({ statusCode: 500, message: 'Failed to save file', cause: err });
  }
});
