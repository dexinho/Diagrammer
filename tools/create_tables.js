const pool = require("./mysql_pool.js");

let databaseName = "diagrammer_dk";
let catsQuery = `CREATE TABLE cats(id int,
        type varchar(8),
        parent int,
        title varchar(512),
        description text,
        password varchar(32),
        empty_message varchar(512),
        last_date datetime)`;
let pdfsQuery = `CREATE TABLE pdfs(
        id int,
        cat_id varchar(32),
        order_num int,
        thumbnail_id int,
        title varchar(512),
        slug varchar(256),
        file_name varchar(512),
        description text,
        by_media_uploader int,
        media_ext varchar(32),
        last_date datetime,
        weekday varchar(20),
        download_count int,
        publish_date datetime,
        expiry_date datetime,
        trash tinyint(1),
        pending tinyint(1),
        author_id int,
        size int,
        redirect_permalink tinyint(1)
    )`;
let pdfManagerRelationshipsQuery = `create table pdf_cat_relationships(
        id int,
        type varchar(3),
        pdf_id int,
        cat_id int
    )`;
let checkDatabaseTableQuery = `SELECT table_name FROM information_schema.tables WHERE table_schema = ? AND table_name = ?`;

const tablesToCreate = [catsQuery, pdfsQuery, pdfManagerRelationshipsQuery];
const tableNamesToCheck = ["cats", "pdfs", "pdf_cat_relationships"];

async function checkIfTableExists(table) {
    return pool.query(checkDatabaseTableQuery, [databaseName, table]);
}

async function createTables() {
    for (let i = 0; i < tablesToCreate.length; i++) {
        const [table] = await checkIfTableExists(tableNamesToCheck[i])
        if (!table.length) {
            await pool.query(tablesToCreate[i]);
        }
    }
}

module.exports = createTables;
