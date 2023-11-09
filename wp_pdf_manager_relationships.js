const pool = require("./mysql_pool.js");
const diagramerTable = require("./diagrammer_table.js");
const diagrammerKeywords = require("./diagrammer_keywords.js");
const cats = require("./wp_cats.js");
const csvData = require("./csv_data.js");

async function wp_pdf_manager_relationships() {
    const diagrammerArr = await diagramerTable();
    const keywordsSet = await diagrammerKeywords();
    const catsIDTitleObj = await cats();
    let synteticId = 1;

    console.log(catsIDTitleObj);

    for (
        let diagrammerIndex = 0;
        diagrammerIndex < diagrammerArr.length;
        diagrammerIndex++
    ) {
        let unsortedKeywords = diagrammerArr[diagrammerIndex].keywords;
        const splittedKeywords = unsortedKeywords.split(",");
        for (
            let keywordIndex = 0;
            keywordIndex < splittedKeywords.length;
            keywordIndex++
        ) {
            let keyword = splittedKeywords[keywordIndex].trim()
            let id = synteticId++;
            let type = 'CAT';
            let pdf_id = diagrammerIndex + 1;
            let cat_id = catsIDTitleObj[keyword];
            console.log(keyword)
            pool.query(
                `INSERT INTO pdf_manager_relationships(id, type, pdf_id, cat_id)
        VALUES(?, ?, ?, ?)`,
                [id, type, pdf_id, cat_id]
            );
        }
    }
}

wp_pdf_manager_relationships();

module.exports = wp_pdf_manager_relationships;
