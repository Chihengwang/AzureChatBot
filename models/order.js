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


module.exports=mongoose.model('order', OrderSchema);