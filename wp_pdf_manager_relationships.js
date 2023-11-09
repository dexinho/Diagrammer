const pool = require("./mysql_pool.js");
const diagramerTable = require("./diagrammer_table.js");
const diagrammerKeywords = require("./diagrammer_keywords.js");
const makeIDTypePairs = require("./ID_type_pairs.js");
const csvData = require("./csv_data.js");

async function wp_pdf_manager_relationships() {
    const diagrammerArr = await diagramerTable();
    const keywordsSet = await diagrammerKeywords();
    const keywordsArray = [...keywordsSet];
    const idTypeTitleCats = await makeIDTypePairs()
    let synteticId = 1;

    try {
        for (let i = 0; i < diagrammerArr.length; i++) {
            let unsortedKeywords = diagrammerArr[i].keywords;
            const splitKeywords = unsortedKeywords.split(",");
            for (let j = 0; j < splitKeywords.length; j++) {
                let keyword = splitKeywords[j].trim();

                if (keywordsArray.includes(keyword)) {
                    let id = synteticId++;
                    let pdf_id = i + 1;
                    let cat_id = idTypeTitleCats[keyword];
                    let type = csvData.find((el) => el.newID == cat_id)
                        ? "CAT"
                        : "TAG";

                    await pool.query(
                        `INSERT INTO pdf_manager_relationships(id, type, pdf_id, cat_id)
                VALUES(?, ?, ?, ?)`,
                        [id, type, pdf_id, cat_id]
                    );
                }
            }
        }
        console.log("Relationships inserted!");
    } catch (err) {
        console.log(err);
    }
}

module.exports = wp_pdf_manager_relationships;
