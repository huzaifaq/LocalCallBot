const Koa = require('koa')
const zeitNext = require('next')
const Router = require('koa-router')
const cors = require('@koa/cors')
const http2 = require('http2')
const fs = require('fs')
const path = require('path')

const port = parseInt(process.env.PORT, 10) || 3000
const protocol = process.env.PROTOCOL || 'HTTP'
const tier = process.env.TIER || 'dev'
const env = process.env.NODE_ENV
const dev = tier === 'dev'
const app = zeitNext({ dir: '.', dev })
const handle = app.getRequestHandler()
const { initializeDBConnection } = require('./backend/mongoConnection')

const applicationServerLog = () => {
	console.log(
		'\x1b[42m\x1b[37m%s\x1b[0m',
		' Jerjis Jewellery Store Application Started '
	)
	console.log('\x1b[42m\x1b[37m%s\x1b[0m', ' ENV: ', env)
	console.log('\x1b[42m\x1b[37m%s\x1b[0m', ' TIER: ', tier)
	console.log('\x1b[42m\x1b[37m%s\x1b[0m', ' PROTOCOL: ', protocol)
	console.log('\x1b[42m\x1b[37m%s\x1b[0m', ' PORT: ', port)
}

initializeDBConnection()

app.prepare().then(() => {
	const server = new Koa()
	const router = new Router()

	router.get('*', async ctx => {
		await handle(ctx.req, ctx.res)
		ctx.respond = false
	})

	server.use(
		cors({
			origin: '*',
			allowMethods: ['GET', 'PUT', 'POST'],
		})
	)

	server.use(async (ctx, next) => {
		ctx.res.statusCode = 200
		ctx.set('X-Frame-Options', 'SAMEORIGIN')
		await next()
	})

	/* Main router middleware - should be used after other routes */
	server.use(router.routes())

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
		http2.createSecureServer(cert, server.callback()).listen(port, err => {
			if (err) throw err
			applicationServerLog()
		})
	} else {
		// Compression can to be turned on in next.config.js
		server.listen(port, err => {
			if (err) throw err
			applicationServerLog()
		})
	}
})
