const fs = require("fs");

(async () => {
    const data = JSON.parse(fs.readFileSync("database/questions.json"));
    data.map((item, index) => {
        item.id = index + 1;
        item.imageSrc = item.imgSrc ? "/images/" + item.imgSrc.split("/").pop() : null;
        if (item.question.includes(". ")) item.question = item.question.split(". ")[1];
    });
    fs.writeFileSync("database/questions.json", JSON.stringify(data));
})();
