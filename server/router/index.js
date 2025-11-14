const { createRouter } = require("sm-express-server");
const getRandomQuestionController = require("../controllers/getRandomQuestionController");
const getIssuesesController = require("../controllers/getIssuesesController");
const setAnswerController = require("../controllers/setAnswerController");

const router = createRouter("/", router => {
	router.get("/issueses", getIssuesesController);
	router.get("/random-question", getRandomQuestionController);
	router.post("/answer", setAnswerController);
});

module.exports = router;
