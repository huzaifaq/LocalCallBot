const Koa = require('koa')
const zeitNext = require('next')
const Router = require('koa-router')
const cors = require('@koa/cors')
const http2 = require('http2')
const fs = require('fs')
const path = require('path')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.TIER === 'dev'
const app = zeitNext({ dir: '.', dev })
const handle = app.getRequestHandler()

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

	if (process.env.PROTOCOL === 'HTTP2') {
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
		http2.createSecureServer(cert, server.callback()).listen(443, err => {
			if (err) throw err
			console.log(
				'\x1b[42m\x1b[37m%s\x1b[0m',
				' Jerjis Jewellery Store Application Started '
			)
			console.log(
				'\x1b[42m\x1b[37m%s\x1b[0m',
				' ENV: ',
				process.env.NODE_ENV
			)
			console.log(
				'\x1b[42m\x1b[37m%s\x1b[0m',
				' TIER: ',
				process.env.TIER
			)
			console.log(
				'\x1b[42m\x1b[37m%s\x1b[0m',
				' PROTOCOL: ',
				process.env.PROTOCOL
			)
			console.log('\x1b[42m\x1b[37m%s\x1b[0m', ' PORT: ', port)
		})
	} else {
		// Use this to debug the service worker
		// Compression can to be turned on in next.config.js
		server.listen(port, err => {
			if (err) throw err
			console.log(
				'\x1b[42m\x1b[37m%s\x1b[0m',
				' Jerjis Jewellery Store Application Started '
			)
			console.log(
				'\x1b[42m\x1b[37m%s\x1b[0m',
				' ENV: ',
				process.env.NODE_ENV
			)
			console.log(
				'\x1b[42m\x1b[37m%s\x1b[0m',
				' TIER: ',
				process.env.TIER
			)
			console.log('\x1b[42m\x1b[37m%s\x1b[0m', ' PORT: ', port)
		})
	}
})
