const { createController } = require('sm-express-server');
const questionsRepository = require('../repositories/questionsRepository');
const answerRepository = require('../repositories/answerRepository');

const setAnswerController = createController(async (req, res) => {
	try {
		const questionId = req.body.questionId;
		const answer = req.body.answer;
		if (!questionId || !answer === undefined) {
			return res.status(400).send({ message: 'questionId and answer are required.' });
		}
		const question = await questionsRepository.getByID(questionId);
		if (!question) {
			return res.status(404).send({ message: 'Question not found.' });
		}
		await answerRepository.set(question, answer);
		res.status(200).send({ message: 'Response recorded successfully.' });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error.', detail: error.message });
	}
});

module.exports = setAnswerController;
