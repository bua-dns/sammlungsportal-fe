import { writeFile } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // JSON mit { filename, content }

  if (!body.filename || !body.content) {
    throw createError({ statusCode: 400, message: 'Invalid data' });
  }

  const filePath = join(process.cwd(), 'uploads', body.filename);
  
  try {
    await writeFile(filePath, body.content, 'utf8');
    return { message: 'File saved', filePath };
  } catch (err) {
    throw createError({ statusCode: 500, message: 'Failed to save file' });
  }
});