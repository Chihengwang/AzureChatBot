var env = require('dotenv').load();
const mongoose=require('mongoose');
function formatDate(date) {
    var monthNames = [
      "1", "2", "3",
      "4", "5", "6", "7",
      "8", "9", "10",
      "11", "12"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return year+'-'+monthNames[monthIndex]+'-'+ day;
}
mongoose.connect("mongodb://asmsassistant.documents.azure.com:10255/?ssl=true", {
  auth: {
   user: process.env.COSMOSDB_USER,
   password: process.env.COSMOSDB_PASSWORD,
  }}, function (err, db) {

});

const OrderSchema=mongoose.Schema({
    name: String,
    food: String,
    price: Number,
    createdTime:{
        type: String,
        required: true,
        default: formatDate((new Date))
    }
});
//Become the model
var Order = mongoose.model('order', OrderSchema);
// var lunch_list={ 
//         name: 'Tina',
//         food:'fish',
//         price: 100,
// }

// var Order1 = new Order(lunch_list);

//  Order1.save(function(err,doc){
//      if(err){
//          console.log(err)
//      }else{
//          console.log(doc)
//      }
//  })
// var now = new Date();
// today=now.toLocaleDateString()
// today=today.split('-')
// today=today[1]+"/"+today[2]+"/"+today[0]

// now.setDate(now.getDate()-1)
// yesterday=now.toLocaleDateString()
// yesterday_array=yesterday.split('-')
// yesterday=yesterday_array[1]+"/"+yesterday_array[2]+"/"+yesterday_array[0]

  var now = new Date();
  var yesterday= new Date();
  yesterday.setDate(now.getDate()-1);
  today=formatDate(now);
  var yesterday_format=formatDate(yesterday);
console.log(formatDate(new Date()));  // show current date-time in console
console.log(yesterday_format)
// Order.find({$or:[{"createdTime":today},{"createdTime":yesterday}]},function(err,docs){
//     console.log(docs)
// })
// Order.count({$or:[{"createdTime":today},{"createdTime":yesterday}]},function(err,count){
//     console.log(count)
// })

// console.log("-----------------------------------"+now.toLocaleDateString())
// var now=new Date()
Order.find({},function(err,docs){
    console.log(docs)
})

