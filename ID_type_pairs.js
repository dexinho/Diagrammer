const diagrammerKeywords = require("./diagrammer_keywords.js");

async function makeIDTypePairs() {
    const keywordsSet = await diagrammerKeywords();
    const keywordsArray = [...keywordsSet];
    const idTypeTitleCats = {};
    for (let index = 0; index < keywordsArray.length; index++) {
        const keyword = keywordsArray[index];
        idTypeTitleCats[keyword] = index + 1;
    }

    return idTypeTitleCats
}

module.exports = makeIDTypePairs;
