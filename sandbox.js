import puppeteer from 'puppeteer';
import attack from "./modelos/modelo-EG8145V5.js";

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true
    });
    const endereco = "100.64.1.42"
    const page = await browser.newPage();
    await page.setViewport({
        width: 950,
        height: 950
    });

    await page.goto(`http://${endereco}`);
    await page.waitForNavigation({
        timeout: 5000
    })
    const title = await page.title();
    console.log(title);

    attack(page, endereco);
})();