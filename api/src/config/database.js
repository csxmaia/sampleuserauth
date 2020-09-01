require('dotenv').config();
module.exports = {
    development: {
        host: 'localhost',
        dialect: 'mysql',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        operatorAliases: false,
        define: {
            underscored: true,
            underscoredAll: true,
            timestamps: true
        }
    }
}// }