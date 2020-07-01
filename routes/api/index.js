const Router = require('koa-router')
const {
	performDBCall,
	performDiscordAction,
	performCallAction,
} = require('../../controllers/basic')

const router = new Router({
	prefix: '/api',
})

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

router.get('/placeCall', async ctx => performCallAction(ctx, 'placeCall'))

/**
 * todo
 */
router.get('/status', async ctx => performDBCall(ctx, 'products'))

module.exports = router
