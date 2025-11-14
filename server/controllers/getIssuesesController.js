const { createController } = require('sm-express-server');
const questionsRepository = require('../repositories/questionsRepository');

const getIssuesesController = createController(async (req, res) => {
	try {
		const questions = await questionsRepository.getAll();
		const issuesesSet = new Set();
		questions.forEach(question => issuesesSet.add(question.issues));
		const issueses = Array.from(issuesesSet);
		res.send(issueses);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Internal server error.' });
	}
});

module.exports = getIssuesesController;
