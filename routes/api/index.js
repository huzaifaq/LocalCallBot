const Router = require('koa-router')
const {
	performDBCall,
	performDiscordAction,
} = require('../../controllers/basic')

const router = new Router({
	prefix: '/api',
})

/**
 * All categories are fetched
 */
router.get('/soundboard', async ctx => performDBCall(ctx, 'categories'))

/**
 * All products are fetched in a category
 */
router.get('/status', async ctx => performDBCall(ctx, 'products'))

router.get('/sendMessage', async ctx =>
	performDiscordAction(ctx, 'sendMessage')
)

module.exports = router
