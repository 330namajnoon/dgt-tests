const fs = require("fs");


const answerRepository = {
	getAll: async () => {
		const data = JSON.parse(fs.readFileSync("database/answers.json"));
		return data;
	},
	getByID: async (id) => {
		const data = JSON.parse(fs.readFileSync("database/answers.json"));
		return data.filter((a) => a.id === id);
	},
	set: async (answer, ok) => {
		const data = JSON.parse(fs.readFileSync("database/answers.json"));
		const answer_ = data.find((a) => a.id === answer.id);
		if (answer_) {
			answer_.ok = ok ? answer_.ok + 1 : answer_.ok;
			answer_.ko = ok ? answer_.ko : answer_.ko + 1;
		}
		else {
			answer.ok = ok ? 1 : 0;
			answer.ko = ok ? 0 : 1;
			data.push(answer);
		}
		fs.writeFileSync("database/answers.json", JSON.stringify(data, null, 2));
		return answer;
	}
};

module.exports = answerRepository;
