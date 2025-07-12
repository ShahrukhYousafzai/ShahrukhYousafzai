'use server';

import asBlob from 'html-to-docx';

export async function generateDocx(htmlString: string, title: string) {
  try {
    const fileBuffer = await asBlob(htmlString, {
      orientation: 'portrait',
      margins: { top: 720, right: 720, bottom: 720, left: 720 },
    });

    const buffer = Buffer.from(await fileBuffer.arrayBuffer());
    return buffer.toString('base64');
  } catch (error) {
    console.error('Error generating DOCX:', error);
    throw new Error('Failed to generate DOCX file.');
  }
}
