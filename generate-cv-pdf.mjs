import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});

const page = await browser.newPage();
await page.goto('http://localhost:9002/cv', { waitUntil: 'networkidle0', timeout: 30000 });

// Wait a bit for fonts and styles to fully render
await new Promise(r => setTimeout(r, 3000));

await page.pdf({
  path: 'public/Shahrukh-Yousafzai-CV.pdf',
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
  preferCSSPageSize: true,
});

console.log('PDF generated successfully!');
await browser.close();
