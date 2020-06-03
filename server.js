const Koa = require('koa')
const zeitNext = require('next')
const Router = require('koa-router')
const cors = require('@koa/cors')
const http2 = require('http2')
const fs = require('fs')
const path = require('path')
const IO = require('koa-socket-2')

const port = parseInt(process.env.PORT, 10) || 3333
process.env.PORT = port // required for getBaseUrl
const protocol = process.env.PROTOCOL || 'HTTP'
const tier = process.env.TIER || 'dev'
const env = process.env.NODE_ENV
const dev = tier === 'dev'
const app = zeitNext({ dir: '.', dev })
const handle = app.getRequestHandler()
const API = require('./routes/api')

require('./backend/mongoConnection')
require('./backend/discord/discordConnection')

const applicationServerLog = () => {
	console.log(
		'\x1b[42m\x1b[37m%s\x1b[0m',
		' Sound Local Bot Application Started '
	)
	console.log('\x1b[42m\x1b[37m%s\x1b[0m', ' ENV: ', env)
	console.log('\x1b[42m\x1b[37m%s\x1b[0m', ' TIER: ', tier)
	console.log('\x1b[42m\x1b[37m%s\x1b[0m', ' PROTOCOL: ', protocol)
	console.log('\x1b[42m\x1b[37m%s\x1b[0m', ' PORT: ', port)
}

app.prepare().then(() => {
	const koaServer = new Koa()
	const io = new IO()
	const router = new Router()

	// Disable koa route handling as app will handle them
	router.get('*', async ctx => {
		await handle(ctx.req, ctx.res)
		ctx.respond = false
	})

	koaServer.use(
		cors({
			origin: '*',
			allowMethods: ['GET', 'PUT', 'POST'],
		})
	)

	koaServer.use(async (ctx, next) => {
		ctx.res.statusCode = 200
		await next()
	})

	koaServer.use(API.routes())
	/* Main router middleware - should be used after other routes */
	koaServer.use(router.routes())

	/* Attach websocket server to Koa server */
	io.attach(koaServer)

	io.on('connection', socket => {
		console.log('a user connected')
		socket.on('disconnect', () => {
			console.log('user disconnected')
		})
	})

	io.on('message', (ctx, data) => {
		console.log('client sent data to message endpoint', data)
	})

	if (protocol === 'HTTP2') {
		const cert = {
			cert: fs.readFileSync(
				path.join(__dirname, './certificates/localhost-cert.pem')
			),
			key: fs.readFileSync(
				path.join(__dirname, './certificates/localhost-privkey.pem')
			),
		}

		// Compression has to be turned off in next.config.js
		// Do not forget to browse with https://localhost:3000
		http2
			.createSecureServer(cert, koaServer.callback())
			.listen(port, err => {
				if (err) throw err
				applicationServerLog()
			})
	} else {
		// Compression can to be turned on in next.config.js
		koaServer.listen(port, err => {
			if (err) throw err
			applicationServerLog()
		})
	}
})
