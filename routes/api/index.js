const Router = require('koa-router')
const {
	performDBCall,
	performDiscordAction,
} = require('../../controllers/basic')

const router = new Router({
	prefix: '/api',
})

/**
 * All sounds are fetched based on category
 */
router.get('/sounds', async ctx => performDBCall(ctx, 'sounds'))

/**
 * All categories are fetched
 */
router.get('/categories', async ctx => performDBCall(ctx, 'categories'))

/**
 * Discord Actions
 */
router.get('/sendMessage', async ctx =>
	performDiscordAction(ctx, 'sendMessage')
)

router.get('/getChannelInformation', async ctx =>
	performDiscordAction(ctx, 'getChannelInformation')
)

router.get('/getAllChannels', async ctx =>
	performDiscordAction(ctx, 'getAllChannels')
)

router.get('/playSound', async ctx => performDiscordAction(ctx, 'playSound'))

/**
 * todo
 */
router.get('/status', async ctx => performDBCall(ctx, 'products'))

module.exports = router
