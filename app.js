const pool = require("./mysql_pool.js");
const pdfs = require("./tables/wp_pdfs.js");
const cats = require("./tables/wp_cats.js");
const pdfCatRelationships = require("./tables/pdf_cat_relationships.js");
const createTables = require('./create_tables.js')

async function fixDiagrammer() {
    await createTables();
    await pdfs();
    await cats();
    await pdfCatRelationships();

    pool.end();
}

fixDiagrammer();
