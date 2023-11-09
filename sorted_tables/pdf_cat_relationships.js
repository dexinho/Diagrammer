const pool = require("../tools/mysql_pool.js");
const diagramerTable = require("../diagrammer_table/data.js");
const diagrammerKeywords = require("../diagrammer_table/keywords.js");
const makeIDTypePairs = require("../tools/ID_type_pairs.js");
const csvData = require("../csv_data/oldType_newID.js");

async function pdfCatRelationships() {
    const diagrammerArr = await diagramerTable();
    const keywordsSet = await diagrammerKeywords();
    const keywordsArray = [...keywordsSet];
    const idTypeTitleCats = await makeIDTypePairs();
    let synteticId = 1;

    try {
        for (let i = 0; i < diagrammerArr.length; i++) {
            let unsortedKeywords = diagrammerArr[i].keywords;
            const splitKeywords = unsortedKeywords.split(",");
            for (let j = 0; j < splitKeywords.length; j++) {
                let keyword = splitKeywords[j].trim();

                let id = synteticId++;
                let pdf_id = i + 1;
                let cat_id = idTypeTitleCats[keyword];
                let type = csvData.find((el) => el.newID == cat_id)
                    ? "CAT"
                    : "TAG";

                await pool.query(
                    `INSERT INTO pdf_cat_relationships(id, type, pdf_id, cat_id)
                VALUES(?, ?, ?, ?)`,
                    [id, type, pdf_id, cat_id]
                );
            }
        }
        console.log("Relationships inserted!");
    } catch (err) {
        console.log(err);
    }
}

module.exports = pdfCatRelationships;
