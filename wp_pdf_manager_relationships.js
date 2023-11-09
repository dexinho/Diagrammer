const pool = require("./mysql_pool.js");
const diagramerTable = require('./diagrammer_table.js')
const diagrammer_keywords = require('./diagrammer_keywords.js')
const cats = require('./wp_cats.js')

async function wp_pdf_manager_relationships() {
    const diagrammer = await diagramerTable()
    const keywordsSet = await diagrammer_keywords()
    const catsObj = await cats()

    console.log(catsObj)

    // for (let index = 0; index < diagrammer.length; index++) {
    //     let unsortedKeywords = diagrammer[index].keywords
    //     console.log(unsortedKeywords.match())
    // }

    // let id
    // let type
    // let pdf_id
    // let cat_id
    // pool.query(
    //     `INSERT INTO pdf_manager(id, type, pdf_id, cat_id)
    // VALUES(?, ?, ?, ?)`,
    //     []
    // );
}

wp_pdf_manager_relationships()

module.exports = wp_pdf_manager_relationships