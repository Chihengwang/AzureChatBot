// Define JSON File
var fs = require("fs");

exports.FindMeterId=function(MeterId){
    console.log("\n *Finding STARTING* \n");
    console.log(__dirname);
// Get content from file
    var contents = fs.readFileSync(__dirname+"/Aio.json");
    // Define to JSON type
    var jsonContent = JSON.parse(contents);
    // Get Value from JSON
    for (let index = 0; index < jsonContent.Meters.length; index++) {
        // console.log("Meter ID:", jsonContent.Meters[index]['MeterId']);
        if(MeterId==jsonContent.Meters[index]['MeterId']){
            // console.log(MeterId);
            return jsonContent.Meters[index];
        }
    }
    return "Sorry I can\'t find this product. Please give me the right MeterId";

}