
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import fetch from "node-fetch"
import os from 'os'

const server: FastifyInstance = Fastify({})

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    pong: {
                        type: 'string'
                    }
                }
            }
        }
    }
}

server.get('/register', opts, async (request, reply) => {
    console.log("Registration performed")
    return { pong: 'it worked!' }
})

const start = async () => {
    try {
        await server.listen({ port: 3000 })

        const address = server.server.address()
        const port = typeof address === 'string' ? address : address?.port

    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

const register = async () => {
    console.log("a")

    const response = await fetch('http://seeder:3000/register');
    console.log("s")
    const data = await response.json();
    console.log(data, "e")
}

console.log(`Instance ${os.hostname} running on ${process.version}.`)


console.log("Start serving.")
start()
await new Promise(r => setTimeout(r, 1000));
console.log("Register")
register()
