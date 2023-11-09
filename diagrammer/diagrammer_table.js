const pool = require('../mysql_pool.js')

async function diagrammer_table(){
    const [data] = await pool.execute('SELECT * FROM diagrammer')

    return data
} 

module.exports = diagrammer_table