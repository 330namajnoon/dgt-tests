const { chromium } = require("playwright");
const path = require("path");

(async () => {
    const browser = await chromium.launch({ headless: false });
	const context = await browser.newContext({ storageState: path.join(__dirname, '../database/rdsdbStorageState.json') });
    const page = await context.newPage();
	await page.goto("https://rdsdb.digimobil.es/backoffice/contracts/list-contract-requests");
    // Espera hasta que exista en el DOM un elemento con esa clase
    await page.waitForSelector(".panel-title", {
        state: "visible", // opcional: espera a que sea visible
		timeout: 60000 // opcional: tiempo máximo de espera en milisegundos
    });
	await context.storageState({ path: path.join(__dirname, '../database/rdsdbStorageState.json') });
	browser.close();
})();
