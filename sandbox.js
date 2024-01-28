import puppeteer from 'puppeteer';

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true
    });
    const endereco = "100.64.1.25"
    const page = await browser.newPage();
    await page.setViewport({width: 1080, height: 1024});

    {
        await page.goto(`http://${endereco}`);
        await page.waitForTimeout(5000)
        const title = await page.title();
        console.log(title);
    }
    {
        await page.focus("#txt_Username");
        await page.keyboard.type("Epadmin");
    }
    {
        await page.focus("#txt_Password");
        await page.keyboard.type("adminEp");
    }
    {
        await page.click("#loginbutton")
    }
    {
        await page.waitForTimeout(5000);
        await page.click("#name_addconfig")
    }
    {
        await page.click("#name_wlanconfig");
    }
    {
        await page.waitForTimeout(5000);
        const enderecoUrlFoto = endereco
            .replace("http://", "")
            .replace(".", "");

        await page.screenshot({
            path: `./fotos/${enderecoUrlFoto}.png`,
            fullPage: true
        });
    }

})();