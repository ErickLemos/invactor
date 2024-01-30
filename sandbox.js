import puppeteer from 'puppeteer';
import attack from "./modelos/modelo-ONUGW24AC-ONT4GE2P2WZ.js";

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
    });
    const endereco = "100.64.4.227"
    const page = await browser.newPage();
    await page.setViewport({
        width: 950,
        height: 950
    });

    await page.goto(`http://${endereco}`);
    await page.waitForTimeout(5000);
    const title = await page.title();
    console.log(title);

    attack(page, endereco);
})();