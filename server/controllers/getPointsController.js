const { createController } = require('sm-express-server');
const answerRepository = require('../repositories/answerRepository');

const getPointsController = createController(async (req, res) => {
	try {
		const answers = await answerRepository.getAll();
		const totalResponses = answers.reduce((t, answer) => answer.ok + (answer.ko < answer.ok ? 0 : answer.ko) + t, 0);
		const okResponses = answers.reduce((t, answer) => answer.ok + t, 0);
		return res.send(JSON.stringify({ points: Math.floor(okResponses / totalResponses * 100) }))
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Internal server error.' });
	}
});

module.exports = getPointsController;
