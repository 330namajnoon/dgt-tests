const fs = require("fs");


const questionsRepository = {
	getAll: async () => {
		const data = JSON.parse(fs.readFileSync("database/questions.json"));
		return data;
	},
	getByIssues: async (issue) => {
		const data = JSON.parse(fs.readFileSync("database/questions.json"));
		return data.filter((q) => q.issues.includes(issue));
	},
	getByID: async (id) => {
		const data = JSON.parse(fs.readFileSync("database/questions.json"));
		return data.find((q) => q.id === id);
	},
};

module.exports = questionsRepository;
