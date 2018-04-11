msg= 'My order id is 5ab9c372818ae43714d7b784';
// const fs = require('fs')
// re=/[a-z0-9_]+-[a-z0-9_]+-[a-z0-9_]+-[a-z0-9_]+-[a-z0-9_]+/i;
var re=/[0-9a-z-A-Z]{24}/i
if(msg.match(re)){
    console.log(msg.match(re)[0]);
}
console.log(msg.match(re))


// var str="https://docs.microsoft.com/en-us/azure/sql-database/"

// var array= str.split('/');

// console.log(array[5]);
// var product_name="web"
// var pattern = new RegExp(product_name, "i");

// fs.readFile('product.json', 'utf8', function readFileCallback(err, data){
//     if (err){
//         console.log(err);
//     } else {
//     obj = JSON.parse(data); //now it an object
//     // console.log(obj);
//     for (let index = 0; index < obj.length; index++) {
//     //    console.log(obj[index].p_name);
//     if(obj[index].p_name.match(pattern)){
//         console.log((obj[index].p_name));
//         console.log(obj[index].p_name.match(pattern)[0]);
//     }
//     }
// }});
// var data=fs.readFileSync('product.json', 'utf8');
// obj = JSON.parse(data); //now it an object
// // console.log(obj);
// for (let index = 0; index < obj.length; index++) {
// //    console.log(obj[index].p_name);
//     if(obj[index].p_name.match(pattern)){
//         console.log((obj[index].p_name));
//         console.log(obj[index].p_name.match(pattern)[0]);
//     }
// }
