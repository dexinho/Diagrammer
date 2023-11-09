const pool = require("./mysql_pool.js");
const csv_data = require("./csv_data.js");
const diagrammerKeywords = require("./diagrammer_keywords.js");

async function cats() {
    const keywordsSet = await diagrammerKeywords();
    const keywordsArray = [...keywordsSet];
    const idTypeTitleCats = {};

    try {
        for (let index = 0; index < keywordsArray.length; index++) {
            const keyword = keywordsArray[index];
            const ifDataExists = csv_data.find((obj) => obj.newID == index + 1);

            let [type, title] = ifDataExists
                ? ["CAT", ifDataExists.name]
                : ["TAG", keyword];

            idTypeTitleCats[index + 1] = title

            await pool.query(
                `INSERT INTO cats(id, type, parent, title, description, password, empty_message, last_date)
                VALUES(?, ?, 0, ?, null, null, null, NOW())`,
                [index + 1, type, title]
            );
        }
        console.log("CATS inserted!");
    } catch (err) {
        console.log(err);
    }

    return idTypeTitleCats;
}

module.exports = cats;
