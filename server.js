const Koa = require('koa')
const zeitNext = require('next')
const Router = require('koa-router')
const cors = require('@koa/cors')

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

	server.listen(port, err => {
		if (err) throw err
		console.log(
			'\x1b[42m\x1b[37m%s\x1b[0m',
			' Jerjis Jewellery Store Application Started '
		)
		console.log('\x1b[42m\x1b[37m%s\x1b[0m', ' ENV: ', process.env.NODE_ENV)
		console.log('\x1b[42m\x1b[37m%s\x1b[0m', ' TIER: ', process.env.TIER)
		console.log('\x1b[42m\x1b[37m%s\x1b[0m', ' PORT: ', port)
	})
})
