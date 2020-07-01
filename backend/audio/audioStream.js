const portAudio = require('naudiodon')
const { OpusEncoder } = require('@discordjs/opus')
const { Transform } = require('stream')

const encoder = new OpusEncoder(48000, 1)
let ai = null

const PCMtoOpusTransform = new Transform({
	transform(chunk, encoding, callback) {
		const encoded = encoder.encode(chunk, 48000 / 100)
		callback(null, encoded)
	},
})

const initAudioStream = async () => {
	// Create an instance of AudioIO with inOptions (defaults are as below), which will return a ReadableStream
	ai = new portAudio.AudioIO({
		inOptions: {
			channelCount: 1,
			sampleFormat: portAudio.SampleFormat16Bit,
			sampleRate: 48000,
			deviceId: -1, // Use -1 or omit the deviceId to select the default device
			closeOnError: true, // Close the stream if an audio error is detected, if set false then just log the error
		},
	})

	// Start streaming
	ai.pipe(PCMtoOpusTransform) // Send audio data to be encoded to Opus
	return PCMtoOpusTransform
}

const startAudioStream = async () => {
	ai.start()
}

const stopAudioStream = async () => {
	ai.quit()
}

module.exports = {
	initAudioStream,
	startAudioStream,
	stopAudioStream,
}
