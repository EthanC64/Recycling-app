const puppeteer = require('puppeteer');

const delay = (time) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}
const getCollectionDate = async (address) => {
    // Launch a headless browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the website
    await page.goto('https://getitdone.sandiego.gov/CollectionMapLookup');

    // Enter input
    let output = "";
    for (var i = 0; i < address.length; i++) {
        // address[i]
        const inputSelector = '#address-search';
        await page.type(inputSelector, address[i]);
        await delay(500);
        // Collect output
        const outputSelector = '.result';
        const input = await page.$eval(inputSelector, element => element.value);
        console.log(input);

        output = await page.$eval(outputSelector, element => element.textContent);
        console.log(inputSelector, output);
    }

    // Close the browser
    await browser.close();

    return output;
}

module.exports = { getCollectionDate }
