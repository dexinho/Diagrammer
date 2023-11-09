const pool = require('../mysql_pool.js')

diagrammer_keywords = async () => {
    const keywordSet = new Set();

    const [rows] = await pool.execute(`SELECT keywords from diagrammer`);

    rows.forEach((row) => {
        if (row.keywords) {
            let keywordRow = row.keywords.match(",")
                ? row.keywords.split(",")
                : row.keywords;

            if (toString.call(keywordRow) === "[object Array]")
                keywordRow.forEach((keyword) => {
                    if (keyword) keywordSet.add(keyword.trim());
                });
            else keywordSet.add(keywordRow.trim());
        }
    });

    return keywordSet
};

module.exports = diagrammer_keywords
