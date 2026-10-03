import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1280,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });

  const scrollSteps = [0, 900, 1100, 1350, 1600, 1900, 2050, 2300];
  const results = [];

  const screenshotDir = '/home/kashyap/.gemini/antigravity-ide/brain/77b3cb4c-0c0a-4db9-b2fb-14868f7aecf8/scratch';

  for (let i = 0; i < scrollSteps.length; i++) {
    const scrollY = scrollSteps[i];
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await new Promise(r => setTimeout(r, 200));

    const state = await page.evaluate(() => {
      const section = document.querySelector('section[style*="220vh"]');
      const stickyDiv = section?.querySelector('div.sticky');
      const canvas = section?.querySelector('canvas');
      const tag = section?.querySelector('.mono-tag.text-burnt-orange');

      const sRect = section ? section.getBoundingClientRect() : null;
      const dRect = stickyDiv ? stickyDiv.getBoundingClientRect() : null;
      const cRect = canvas ? canvas.getBoundingClientRect() : null;

      return {
        scrollY: window.scrollY,
        sectionRectTop: sRect?.top,
        stickyDivTop: dRect?.top,
        canvasTop: cRect?.top,
        canvasVisible: cRect ? (cRect.top < window.innerHeight && cRect.bottom > 0) : false,
        label: tag ? tag.textContent.trim() : '',
      };
    });

    results.push(state);
    const shotPath = `${screenshotDir}/fixed_scroll_${scrollY}px.png`;
    await page.screenshot({ path: shotPath });
    console.log(`Step ${i}: scrollY=${scrollY}, state:`, state);
  }

  await browser.close();
  return results;
}

run().then(() => {
  console.log('Done!');
}).catch(err => {
  console.error('Error:', err);
});
