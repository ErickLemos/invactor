import IPCIDR from "ip-cidr";
import {Cluster} from "puppeteer-cluster";

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

    const address = "100.64.0.0/16";
    const cidr = new IPCIDR(address);
    const ips = cidr.toArray({
        from: '100.64.1.2',
        to: '100.64.15.255'
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

