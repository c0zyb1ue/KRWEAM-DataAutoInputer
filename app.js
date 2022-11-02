const fileSystem = require('fs');
const { envToArr, krweamDatabase, krweamDataSource } = require('./modules.js');

// brand -> sizes -> products

const products = envToArr(fileSystem.readFileSync("./products.csv", 'utf-8'));
const sizes = envToArr(fileSystem.readFileSync("./size.csv", 'utf-8'));
const brands = envToArr(fileSystem.readFileSync("./brands.csv", 'utf-8'));

const main = async() => {
     await krweamDataSource.initialize()
     .then(() => {
          console.log("Data Source has been initialized");
     })
     .catch((err) => {
          console.error('Error occured during Data Source initialization', err);
     });
     
     //Add gender to table genders
     let gender = ['남성', '여성', '공용'];
     for(value of gender){
          await krweamDatabase.query(`
               INSERT INTO genders(
                    name
               ) VALUES(?)`,[value]);
     };
     
     // Add category to table categories
     let category = ['신발', '의류', '패션 잡화', '라이프', '테크'];
     for(value of category){
          await krweamDatabase.query(`
               INSERT INTO categories(
                    name
               ) values(?)`,[value]
          )
     };
     
     // Add brand to table brands
     for(let i=0;i<brands.length;i++){
          await krweamDatabase.query(`
               INSERT INTO brands(
                    english_name,
                    korean_name
               ) values(?,?)`,[brands[i][0], brands[i][1]]
          )
     };

     // Add size to table sizes
     for(let i=0;i<sizes.length;i++){
          await krweamDatabase.query(`
               INSERT INTO sizes(
                    category_id,
                    size
               ) values(?,?)`,[sizes[i][0], sizes[i][1]]
          )
     };

     // Add products to table products 
     for(let i=0;i<products.length;i++){
          await krweamDatabase.query(`
               INSERT INTO products(
                    english_name,
                    korean_name,
                    thumbnail,
                    model_number,
                    released_price,
                    color,
                    category_id,
                    gender_id,
                    brand_id
               ) values(?,?,?,?,?,?,?,?,?)`
               ,[products[i][0], products[i][1], products[i][2], products[i][3],
                products[i][4], products[i][5], products[i][6], products[i][7], products[i][8]])
     };
     console.log("DATA INPUT SUCCESS");
}

main();