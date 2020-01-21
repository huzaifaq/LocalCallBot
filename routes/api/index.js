const Router = require('koa-router')
const { performDBCall } = require('../../controllers/basic')

const router = new Router({
	prefix: '/api',
})

/**
 * All categories are fetched
 */
router.get('/categories', async ctx => performDBCall(ctx, 'categories'))

/**
 * All products are fetched in a category
 */
router.get('/products', async ctx => performDBCall(ctx, 'products'))

module.exports = router
