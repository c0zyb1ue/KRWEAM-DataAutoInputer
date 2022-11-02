require('dotenv').config();
const { DataSource } = require('typeorm');

class Database {
     constructor(database){
          this.database=database;
     }
     async query(sql, params){
          return this.database.query(sql, params);
     }
};

const krweamDataSource = new DataSource({
     type: process.env.TYPEORM_CONNECTION,
     username: process.env.TYPEORM_USERNAME,
     password: process.env.TYPEORM_PASSWORD,
     host: process.env.TYPEORM_HOST,
     port: process.env.TYPEORM_PORT,
     database: process.env.TYPEORM_DATABASE
 });

 const krweamDatabase = new Database(krweamDataSource);
 
const envToArr = (productData) => {
     let arr = productData.split('\n');
     let PDarr = [];
     
     for(let i=1; i<arr.length; i++){
        PDarr.push(arr[i].split(','));
     }
     return PDarr;
} 

module.exports ={ envToArr, krweamDatabase, krweamDataSource }

