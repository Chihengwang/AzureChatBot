const axios=require('axios');
const cheerio= require('cheerio');
const request= require('request');
var fs = require('fs');

const product_url="https://docs.microsoft.com/en-us/azure/index#pivot=products&panel=all";
const Base_url="https://docs.microsoft.com";
const Pricing_Baseurl="https://azure.microsoft.com/zh-tw/pricing/details/"

function get_url_ref(url){
    console.log(url);
    var result;
    request.get(url, (err, res, body) => {  
        let $ = cheerio.load(body);
        //404
        var text=$("strong").text();
        if(text==404){
            console.log('404');
            result=false;
        }else{
            console.log('200');
            result=true;
        }
    })
    return result;
}

// request(product_url, (err, res, body) => {
//     let $ = cheerio.load(body);
//     var product_list=[];
//     $('.group ul p').each(function(i,element){
//         console.log($('.group ul a').attr('href'));
//         // all text from the product
//         let product={};
//         console.log($(this).text());
//         // Get all a href (element is p, parent is a)
//         console.log(element.parent.attribs.href);
//         product['p_name']=$(this).text();
//         product['p_doc_url']=Base_url+element.parent.attribs.href;
//         product_list.push(product);
//     });
//     // console.log(product_list);
//     // overall 153 items
//     // console.log(product_list.length);
//     for (let index = 0; index < product_list.length; index++) {
//         var url_name=product_list[index]['p_doc_url'].split('/')[5];
//         product_list[index]['Pricing_url']=Pricing_Baseurl+url_name;
//     }
//     var json = JSON.stringify(product_list);
//     fs.writeFile('myjsonfile.json', json, 'utf8',function(err){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("success!!");
//         }
//     });
// });


// =====================
fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data); //now it an object
    // console.log(obj);
    console.log(obj);
}});
// =====================
