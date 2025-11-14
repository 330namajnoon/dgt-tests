const { chromium } = require("playwright");
const fs = require("fs");
const https = require("https");

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

	await page.goto("http://lateoricaendirecto.com/tests-online/test-por-temas");
	await page.fill("#username", "Y9107590H");
	await page.fill("#password", "sina");
	await page.click(".submit.login");

    while (true) {
		await page.goto("http://lateoricaendirecto.com/tests-online/test-por-temas");

        const issues = "vehículos"; // Cambia esto por el tema que desees
        await page.evaluate((issues) => {
            const links = Array.from(document.querySelectorAll("a"));
            const link = links.find((l) => l.text.includes(issues));
            console.log(link);
            link.click();
            return link.href; // Devuelve el número de <a>
        }, issues);
        await page.waitForNavigation();
        const data = fs.readFileSync("database/questions.json");
        const list = JSON.parse(data);
        while (true) {
            const data = await page.evaluate((issues) => {
                const data = Array.from(document.querySelectorAll(".pregunta.panel.activePage")).map((l) => ({
                    issues,
                    question: l.children[1].textContent,
                    answers: Array.from(l.children[2].querySelectorAll("p")).map((l) => l.children[3].textContent),
                    correctAnswerIndex: Array.from(
                        document.querySelector(".pregunta.panel.activePage").querySelectorAll(".resultado")
                    ).reduce((cc, val, index) => (val.className.includes("ok") ? index : cc), 0),
                    imgSrc: document.querySelector(".pregunta.panel.activePage").querySelector("img").src,
                }));
                const index = parseInt(document.querySelector(".cur").textContent);
                return { data, index };
            }, issues);

            if (!!data.data[0].imgSrc) {
                const box = await page.evaluate(() => {
                    const img = document.querySelector(".pregunta.panel.activePage").querySelector("img"); // cambia el selector
                    if (!img) return null;
                    const rect = img.getBoundingClientRect();
                    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
                });

                if (box.height > 1 && box.width > 1) {
                    console.log("📐 Coordenadas:", box);

                    // 🔹 Capturar solo esa región
                    await page.screenshot({
                        path: "images/" + data.data[0].imgSrc.split("/").pop(),
                        clip: {
                            x: box.x,
                            y: box.y,
                            width: box.width,
                            height: box.height,
                        },
                    });
                }
            }

            await page.evaluate(() => {
                document.querySelector(".arrow.forward").children[0].click();
            });
            await page.waitForTimeout(1000);
            if (!list.find((d) => d.question.split(".")[1] === data.data[0].question.split(".")[1])) {
                list.push(...data.data);
            }
            if (data.index >= 30) {
                break;
            }
        }
        fs.writeFileSync("database/questions.json", JSON.stringify(list));
        console.log(`Cantidad de enlaces en la página: ${list}`);
    }
    browser.close();
})();
