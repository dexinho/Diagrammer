const pool = require("./mysql_pool.js");
const csv_data = require("./csv_data.js");
const diagrammerTable = require("./diagrammer_table.js");

const pdfs = async () => {
    try {
        const diagramer = await diagrammerTable();
        for (let index = 0; index < diagramer.length; index++) {
            let row = diagramer[index]
            let foundData = csv_data.find(data => data.oldType == row.type)
            let id = index + 1
            let cat_id = foundData.newID;
            let thumbnail_id = Math.floor(Math.random() * 100);
            let title = row.name.replace(/<B>(.*)<\/B>(.*)/, "$1$2");
            let slug = title.replace(/\s/g, "-");
            let filename =
                "wp-content/uploads/bsk-pdf-manager/2022/11/" + row.ext;
            let description = row.discription
                ? "<p>" + row.discription + "</p>"
                : "";
            let size = Math.floor(Math.random() * 900001 + 100000);
            let download_count = Math.floor(Math.random() * 33 + 1);
            let dayName = new Date().toLocaleDateString("en-US", {
                weekday: "short",
            });

            await pool.query(
                `INSERT INTO pdfs(id, cat_id, order_num, thumbnail_id,
                    title, slug, file_name, description, by_media_uploader, media_ext,
                    last_date, weekday, download_count, publish_date, expiry_date, trash,
                    pending, author_id, size, redirect_permalink)
                    VALUES (?, ?, null, ?, ?, ?, ?, ?, 0, null, NOW(), ?, ?, null, null, 0, 0, 0, ?, 0)`,
                [
                    id,
                    cat_id,
                    thumbnail_id,
                    title,
                    slug,
                    filename,
                    description,
                    dayName,
                    download_count,
                    size,
                ]
            );
        }

        console.log("PDFS inserted!");
    } catch (err) {
        console.log(err);
    }
};

module.exports = pdfs;
