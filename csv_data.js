const fs = require("fs");

const csvData = fs.readFileSync("./Diagrammer-Categories-csv.csv", "utf-8");
const rows = csvData.split("\n");

const data = [];

for (let i = 1; i < rows.length; i++) {
    const columns = rows[i].split(",");

    if (columns.length === 3) {
        const rowObject = {
            name: columns[0].trim(),
            oldType: columns[1].trim(),
            newID: columns[2].trim()
        };

        data.push(rowObject);
    }
}

module.exports = data;