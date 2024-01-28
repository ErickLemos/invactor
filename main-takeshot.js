import {Cluster} from "puppeteer-cluster";
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
    cluster.on('taskerror', (err, data) => {
    });

    ips.forEach(ip => {
        cluster.queue(ip)
    });

    await cluster.idle();
    await cluster.close();
})();


async function attack({page, data: ip}) {

    await page.setViewport({
        width: 1000,
        height: 1000
    })

    await page.goto(`http://${ip}`);
    await page.waitForTimeout(1000);

    await localpage.screenshot({
        path: `./fotos/takeshot/${ip}.png`,
        fullPage: true
    })

}

