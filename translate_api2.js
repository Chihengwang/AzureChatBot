const Axios=require('axios');
var env = require('dotenv').load();
let subscriptionKey = process.env.Translate_api_key;
let target = 'en';
let text = '你好，jeremy是豬';
let params = '?to=' + target + '&text=' + encodeURI(text);
var url='https://api.microsofttranslator.com/V2/Http.svc/Translate'+params


console.log(url);
Axios.get(url,{headers:{'Ocp-Apim-Subscription-Key' : subscriptionKey}})
.then(res=>{
    // console.log(res.data);
    var final_result=''
    var xml=res.data;
    var parseString = require('xml2js').parseString;
    parseString(xml, function (err, result) {
        console.log(result.string._);
    });

}).catch(err=>{
    console.log(err);
})
