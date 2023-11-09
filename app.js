const pool = require("./tools/mysql_pool.js");
const pdfs = require("./sorted_tables/wp_pdfs.js");
const cats = require("./sorted_tables/wp_cats.js");
const pdfCatRelationships = require("./sorted_tables/pdf_cat_relationships.js");
const createTables = require('./tools/create_tables.js')

async function fixDiagrammer() {
    await createTables();
    await pdfs();
    await cats();
    await pdfCatRelationships();

    pool.end();
}

fixDiagrammer();
