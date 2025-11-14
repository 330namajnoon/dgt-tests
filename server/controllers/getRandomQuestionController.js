const { createController } = require('sm-express-server');
const questionsRepository = require('../repositories/questionsRepository');

const getRandomQuestionController = createController(async (req, res) => {
	try {
		const issue = req.query.issue;
		const questions = await questionsRepository.getByIssues(issue);
		if (questions.length === 0) {
			return res.status(404).json({ message: 'No questions found for the specified issue.' });
		}
		const randomIndex = Math.floor(Math.random() * questions.length);
		const randomQuestion = questions[randomIndex];
		res.send(randomQuestion);
	} catch (error) {
		
	}
});

module.exports = getRandomQuestionController;
