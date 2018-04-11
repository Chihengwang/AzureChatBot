var builder= require('botbuilder');
const fs = require('fs');
// =====
//Some helper function here
function get_product_doc_url(resolution,filename){
    //Use product name as the regular expression.
    var pattern = new RegExp(resolution, "i");
    var data=fs.readFileSync(filename, 'utf8');
    var product_list=[];
        obj = JSON.parse(data); //now it an object
        // console.log(obj);
        for (let index = 0; index < obj.length; index++) {
        //    console.log(obj[index].p_name);
            if(obj[index].p_name.match(pattern)){
                // console.log((obj[index]));
                product_list.push((obj[index]));
            }
        }
        return product_list;
}
//=======
//傳入intents的function
exports.Price_handler_one=function(session,args,next){
    session.dialogData.MeterId ="";
    //取得一個entity
    // var product=builder.EntityRecognizer.findEntity(args.entities,'Product').entity;
    //取得多個entity;
    // console.log(args.entities[0].type);
    console.log(args);
    // console.log(args.entities[0].resolution.values[0]);
    /** 
     * Use Regexp to deal with the meter id and get it.
    */
   re=/[a-z0-9_]+-[a-z0-9_]+-[a-z0-9_]+-[a-z0-9_]+-[a-z0-9_]+/i;
   msg= session.message.text;
    //假如client有輸入MeterId 將其值parse出來。
    //一定要用If去執行 判斷到底是不是回傳有數值的。
   if(msg.match(re)){
       var MeterId=msg.match(re)[0];
   }
    var products=builder.EntityRecognizer.findAllEntities(args.entities,'Product');
    // console.log(products);

    for(let i=0;i<args.entities.length;i++){
        var resolution=args.entities[i].resolution.values[0]
        var filename='product.json';
        // console.log(args.entities[i].resolution.values)
        // console.log(product);
        // ====================================================
        //Read Data from product.json
        if (resolution!="pricing list"){
            var product_list=get_product_doc_url(resolution,filename);
            console.log(product_list);
            var show_product_template=require('../Template/show_product_list').product_list(product_list);
            session.send("Here you can find other product....");
            var msg = new builder.Message(session)
            .addAttachment(show_product_template);
            // builder.Prompts.text(session,msg);
            setTimeout(function(){
                session.send(msg);
            },1000);
        }
        // ====================================================
        if(resolution=="Virtual Machine"){
            session.send('You are asking the VM');
        }else if (resolution=="Storage"){
            session.send('You are asking Storage');
        }else if (resolution=="Networking"){
            session.send('you are asking network');
        }else if(resolution=='pricing list'){
            if(MeterId){
                session.dialogData.MeterId=MeterId;
                next();
            }else{
                builder.Prompts.text(session,'OK~~~!!!Please provide me with MeterId~~(Maybe your Id is wrong or you haven\'t given me yet)');
            }
        }else{
            session.send("You can add more information for me.  Thanks!!.");
        }
    }
}
exports.Price_handler_two=function(session,result,next){
    //result.response would show the Meter ID
    // console.log(result.response);
    session.send('Dealing with your product...I would return you the product description back!!');
    const ReadAio=require('../AioFile/ReadAio');
    if(result.response){
        Aio_result=ReadAio.FindMeterId(result.response);
    }else{
        Aio_result=ReadAio.FindMeterId(session.dialogData.MeterId);
    }
        if(typeof Aio_result=='object'){
            // console.log(Aio_result);
            // session.send('Your meterId is right');
            var template_module=require('../Template/product_template');
            var msg = new builder.Message(session)
            .addAttachment(template_module.product_template(Aio_result));
            // builder.Prompts.text(session,msg);
            setTimeout(function(){
                session.endDialog(msg);
            },2500);
            // session.endDialog(msg);
        }else{
            session.endDialog(Aio_result);
        }
}