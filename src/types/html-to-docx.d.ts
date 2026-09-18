declare module 'html-to-docx' {
  interface HtmlToDocxOptions {
    orientation?: 'portrait' | 'landscape';
    margins?: { top?: number; right?: number; bottom?: number; left?: number };
  }

  function asBlob(html: string, options?: HtmlToDocxOptions): Promise<Blob | ArrayBuffer>;
  export default asBlob;
}
