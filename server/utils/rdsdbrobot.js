const { chromium } = require("playwright");
const path = require("path");

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        storageState: path.join(__dirname, "../database/rdsdbStorageState.json"),
    });
    const page = await context.newPage();
    await page.goto("https://rdsdb.digimobil.es/backoffice/contracts/list-contract-requests");
    await page.selectOption("#status", "2");
    await page.click("#submit");

    let paginationIndex = 1;

    while (true) {
        const trackingNumbers = await page.evaluate(() => {
            const tns = Array.from(document.querySelectorAll("tbody")[1]?.querySelectorAll("tr"))
                .map((el) => ({
                    trackingNumber: el.children?.[9]?.textContent?.includes("Ilimitodo")
                        ? el.children[1]?.textContent
                        : null,
                }))
                .filter((el) => el.trackingNumber !== null);
            return tns;
        });
        for (const tn of trackingNumbers) {
            const trackingPage = await context.newPage();
            await trackingPage.goto(
                `https://entornotrackingessina.sw.digimobil.es:12443/mi-pedido/${tn.trackingNumber}`
            );
            await trackingPage.waitForLoadState("networkidle");
            const isCorrect = await trackingPage.evaluate(() => {
                const text = document.querySelector(".card-panel").querySelector(".azul1")?.textContent?.trim?.();
                if (text === "Envío") return true;
                return false;
            });
            if (isCorrect)
                console.log(`https://entornotrackingessina.sw.digimobil.es:12443/mi-pedido/${tn.trackingNumber}`);
            await trackingPage.close();
        }

        await page.evaluate((index) => {
            [...document.querySelector(".pagination").querySelectorAll("a")]
                .find((el) => el.textContent.trim() === String(index))
                ?.click?.();
        }, paginationIndex + 1);

        await page.waitForNavigation();

        paginationIndex++;
    }
})();
