//Koa
import Koa from "koa"
import ip from "koa-ip"
import Router from "koa-router"
import bodyParser from "koa-bodyparser"

//Command line tools
import { Command } from "commander"

//Utils
import crypto from "crypto"
import chalk from 'chalk';

//Redis client
import { createClient } from "redis"
import { Client, Entity, Schema, Repository } from 'redis-om'

const APPNAME = 'blockchain'
const SEEDERS = ['example.com', '88.108.22.101']

const cli = new Command()

const closeFn = async function (opts?: object, exitCode?: number) {
    console.log('closing the redis client')
    await redis.disconnect()
    console.log(`${stati.ok} connection closed`)

    console.log('\ngoodbye!');
    if (!(opts['exit'] == true)) process.exit(exitCode ?? 0)
}

process.on('exit', () => { closeFn({ exit: true }) });
process.on('SIGINT', () => { closeFn() });
process.on('SIGUSR1', () => { closeFn() });
process.on('SIGUSR2', () => { closeFn() });
//process.on('uncaughtException', () => { closeFn() });

cli
    .name(`${APPNAME}`)
    .description("A node model in the blockchain")
    .version("0.0.1")

cli
    .option("-d, --db", "URL for the db instance and port for the db instance", 'redis://127.0.0.1:6379/0')
    .option("-h, --host", "The port for the configuration server", 'localhost:8080')
    .option("-r, --reset", "Force the db instance to be reconstructed", false)
    .option("-w, --passphrase", "The passphrase to use the private key", '')
    .option("-s, --seeders", "Nodes to be used as entry points", SEEDERS)


cli.parse()
const opts = cli.opts()

const stati = {
    ok: chalk.green.bold('ok:'),
    warning: chalk.yellow.bold('warning:'),
    error: chalk.red.bold('error:'),
}

console.log(`${chalk.bold(APPNAME)} starting on ${chalk.italic.underline(opts.host)}`)

console.log(`connecting to ${chalk.italic.underline(opts.db)}`)
const redis = createClient({ url: `${opts.db}` })
//redis.on('error', (err) => console.log('Redis Client Error', err));
try {
    await redis.connect()
    console.log(`${stati.ok} connection done`)

}
catch (e) {
    console.log(`${stati.error} unable to connect to ${opts.db}.`, e)
    process.exit(1)
}

const rdClient = await new Client().use(redis)

const keys = {
    publicKey: null,
    privateKey: null,
    passphrase: opts.passphrase,

    sign: (msg: string) => {
        const sign = crypto.createSign("RSA-SHA256")
        sign.write(msg)
        sign.end()

        return sign.sign(
            {
                key: keys.privateKey,
                passphrase: keys.passphrase
            },
            "base64"
        )
    },
    verify: (msg: string, signature: string, key?: string) => {
        const verify = crypto.createVerify("RSA-SHA256")
        verify.write(msg)
        verify.end()
        return verify.verify(key ?? keys.publicKey, signature, "base64")
    }
}

// Retrieve Keys
console.log(`retrieving keys`)

{
    [keys.publicKey, keys.privateKey] = await redis.mGet(['keys.publicKey', 'keys.privateKey'])
}

if (opts.reset == true || keys.publicKey == null || keys.privateKey == null) {
    console.log(`${stati.warning} no key pair available`)
    await redis.flushDb()
    console.log(`${stati.ok} db flushed`)

    console.log(`generating new keys`)

    const pair = await crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "spki",
            format: "pem"
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
            cipher: "aes-256-cbc",
            passphrase: keys.passphrase
        }
    })
    keys.publicKey = pair.publicKey
    keys.privateKey = pair.privateKey

    console.log(`${stati.ok} testing signature with the new pair: ${keys.verify('hello', keys.sign('hello')) ? chalk.green('true') : chalk.red('false')}`)

    await redis
        .multi()
        .set('keys.publicKey', keys.publicKey)
        .set('keys.privateKey', keys.privateKey)
        .exec()

    console.log(`${stati.ok} keys saved on the db`)

}

console.log(`${stati.ok} keys retrieved`)


const roles = {
    tokenProvider: false,
    worker: false,
    requester: false,
    withness: false,
}

// Retrieve Roles
console.log(`retrieving roles`)


{
    const tmp = await redis.json.get('roles')
    if (tmp == null) {
        await redis.json.set('roles', '$', roles)
    }
    else {
        for await (const [key, value] of Object.entries(tmp)) {
            if (roles[key] == undefined) console.log(`${stati.warning} role ${chalk.bold(key)} is not one of the supported roles`)
        }
    }
}

console.log(`${stati.ok} roles loaded`)

process.exit(0)