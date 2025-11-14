const { createController } = require("sm-express-server");
const questionsRepository = require("../repositories/questionsRepository");
const answerRepository = require("../repositories/answerRepository");

const getRandomQuestionController = createController(async (req, res) => {
    try {
        const issue = req.query.issue;
        const questions = await questionsRepository.getByIssues(issue);
        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found for the specified issue." });
        }
        while (true) {
            const randomIndex = Math.floor(Math.random() * questions.length);
            const randomQuestion = questions[randomIndex];
            const answers = await answerRepository.getAll();
            const answer = answers.find((a) => a.id === randomQuestion.id);
            if (!answer) {
                return res.send(randomQuestion);
            }
            const totalResponses = answer.ok + answer.ko;
            const answersTotalResponses = answers.reduce((sum, a) => sum + a.ok + a.ko, 0);
			const answersToptalAverage = answersTotalResponses / answers.length;
			if ((totalResponses + 1) <= answersToptalAverage) {
				return res.send(randomQuestion);
			}
        }
    } catch (error) {}
});

module.exports = getRandomQuestionController;
