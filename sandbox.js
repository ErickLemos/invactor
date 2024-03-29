import puppeteer from 'puppeteer';
import attack from "./modelos/modelo-GM620.js";

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true
    });
    const endereco = "100.64.1.29"
    const page = await browser.newPage();
    await page.setViewport({
        width: 950,
        height: 950
    });

    await page.goto(`http://${endereco}`);
    const title = await page.title();
    console.log(title);

    attack(page, endereco);
})();