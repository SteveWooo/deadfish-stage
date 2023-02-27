#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const initHandles = {
    web: async (context) => {
        fs.writeFileSync(`${path.resolve('./')}/webpack.config.js`, fs.readFileSync(`${__dirname}/template/web/webpack.config.js`).toString());

        fs.mkdirSync(`${path.resolve('./')}/src`)
        fs.writeFileSync(`${path.resolve('./')}/src/index.html`, fs.readFileSync(`${__dirname}/template/web/src/index.html`).toString());
        fs.writeFileSync(`${path.resolve('./')}/src/index.js`, fs.readFileSync(`${__dirname}/template/web/src/index.js`).toString());
        fs.writeFileSync(`${path.resolve('./')}/package.json`, fs.readFileSync(`${__dirname}/template/web/package.json`).toString());
        return;
    },
    'web-react': (context) => {
        const sourceFileDir = `${__dirname}/template/web-react/`
        const rootDir = fs.readdirSync(sourceFileDir)
        const workDir = path.resolve('./');
        function doCp(dir, files) {
            for(let i = 0; i < files.length; i ++) {
                const fileDir = path.join(sourceFileDir, dir, files[i])
                const state = fs.lstatSync(fileDir)
                if(state.isDirectory()) {
                    fs.mkdirSync(path.join(workDir, dir, files[i]))
                    doCp(path.join(dir, files[i]), fs.readdirSync(fileDir))
                    continue;
                }
                fs.writeFileSync(
                    path.join(workDir, dir, files[i]),
                    fs.readFileSync(fileDir).toString()
                )
            }
        }

        doCp("", rootDir)
    }
}

const utils = {
    getArgvs: async argvs => {
        const result = {}
        for(let i = 0; i < argvs.length; i ++ ) {
            if (argvs[i].indexOf('--') === 0) {
                if (i < argvs.length - 1) {
                    result[argvs[i].replace('--', '')] = argvs[i + 1]
                    i++
                    continue
                }
            }
        }

        return result
    }
}

async function main() {
    const context = {
        env: 'web'
    }

    const params = await utils.getArgvs(process.argv)
    params['env'] && (
        context.env = params['env']
    )
    try {
        await initHandles[context.env](context);
        console.log(
            "done!\n" +
            "env: " + context.env + "\n" +
            "output: " + path.resolve("./")
        )
    } catch(e) {
        console.log(e)
    }
    
    return;
}
main()