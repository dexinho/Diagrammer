const pool = require("./mysql_pool.js");
const pdfs = require("./wp_pdfs.js");
const cats = require("./wp_cats.js");
// const pdf_manager_relationships = require("./wp_pdf_manager_relationships.js");

async function fixDiagrammer() {
    await pdfs();
    await cats();
    // await pdf_manager_relationships();

    pool.end();
}

fixDiagrammer();
