import selfsigned from "selfsigned";
import * as path from "node:path";
import * as fs from "node:fs";

const attrs = [{name: "commonName", value: "localhost"}];
const options = {
  keySize: 4096,
  days: 365,
  algorithm: "sha256"
};
const perms = selfsigned.generate(attrs, options);

const certsDir = path.join(path.resolve(), "src/main/resources/localhost-ssl");
if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir);
}

fs.writeFileSync(path.join(certsDir, "localhost.key"), perms.private);
fs.writeFileSync(path.join(certsDir, "localhost.crt"), perms.cert);

console.log(`✅  Certificates generated in ${certsDir}`);
