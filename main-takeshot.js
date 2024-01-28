import {Cluster} from "puppeteer-cluster";
import {ips} from "./ips.js";

// function: tirar foto da tela de login do roteador
(async () => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 200,
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

    {
        await localpage.setViewport({
            width: 950,
            height: 950
        })
    }
    {
        await localpage.goto(endereco);
        await page.waitForTimeout(1000);
    }
    {
        const enderecoUrlFoto = endereco
            .replace("http://", "");

        await localpage.screenshot({
            path: `./fotos/${enderecoUrlFoto}.png`,
            fullPage: true
        })
    }
}

