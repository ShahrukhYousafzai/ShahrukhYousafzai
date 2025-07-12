'use server';

import asBlob from 'html-to-docx';

export async function generateDocx(htmlString: string, title: string) {
  try {
    const fileBuffer = await asBlob(htmlString, {
      orientation: 'portrait',
      margins: { top: 720, right: 720, bottom: 720, left: 720 },
    });

    // When running in a server environment, asBlob returns a Buffer directly.
    // The previous code was trying to treat it like a browser Blob.
    if (Buffer.isBuffer(fileBuffer)) {
        return fileBuffer.toString('base64');
    }
    
    // Fallback for browser-like environments, though the server action should use the above.
    const buffer = Buffer.from(await (fileBuffer as Blob).arrayBuffer());
    return buffer.toString('base64');
  } catch (error) {
    console.error('Error generating DOCX:', error);
    throw new Error('Failed to generate DOCX file.');
  }
}
