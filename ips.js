import IPCIDR from "ip-cidr";

const address = "100.64.0.0/16";
const cidr = new IPCIDR(address);

export const ips = cidr.toArray({
    from: '100.64.1.1',
    to: '100.64.20.255'
});