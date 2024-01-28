import puppeteer from 'puppeteer';

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true
    });
    const endereco = "100.64.1.14"
    const page = await browser.newPage();
    await page.setViewport({width: 1080, height: 1024});

    {
        await page.goto(`http://${endereco}`);
        await page.waitForTimeout(5000)
        const title = await page.title();
        console.log(title);
    }
})();