const Router = require('koa-router')
const { performDBCall } = require('../../controllers/basic')

const router = new Router({
	prefix: '/api',
})

router.get('/categories', async ctx => performDBCall(ctx, 'categories'))

module.exports = router
