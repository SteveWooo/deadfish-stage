#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const initHandles = {
    web: async (context) => {
        fs.writeFileSync(`${path.resolve("./")}/webpack.config.js`, fs.readFileSync(`${__dirname}/template/web/webpack.config.js`).toString());

        fs.mkdirSync(`${path.resolve("./")}/src`)
        fs.writeFileSync(`${path.resolve("./")}/src/index.html`, fs.readFileSync(`${__dirname}/template/web/src/index.html`).toString());
        fs.writeFileSync(`${path.resolve("./")}/src/index.js`, fs.readFileSync(`${__dirname}/template/web/src/index.js`).toString());
        fs.writeFileSync(`${path.resolve("./")}/package.json`, fs.readFileSync(`${__dirname}/template/web/package.json`).toString());
        return;
    }
}

async function main() {
    const context = {
        env: "web"
    }
    if (process.argv.length >= 3) {
        context.env = process.argv[2]
    }
    await initHandles[context.env](context);
    return;
}
main()