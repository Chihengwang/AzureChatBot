var builder= require('botbuilder');
var restify=require('restify');
var azure = require('botbuilder-azure'); 
var env = require('dotenv').load();
const CardTemplate=require('./Template/Card_template');
const Axios=require('axios');
// =============================================================
// Table storage
var tableName = process.env.TABLE_NAME; // You define
var storageName = process.env.STORAGE_TABLE; // Obtain from Azure Portal
var storageKey = process.env.STORAGE_KEY; // Obtain from Azure Portal
var azureTableClient = new azure.AzureTableClient(tableName, storageName, storageKey);

var tableStorage = new azure.AzureBotStorage({gzipData: false}, azureTableClient);
// ==============================================================
// var connector=new builder.ChatConnector();
// console.log(process.env.MicrosoftAppId)
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});
const bot =new builder.UniversalBot(connector)
.set('storage', tableStorage);
var server=restify.createServer();
server.listen(process.env.port||process.env.PORT||3978,function(req,res){
    console.log('%s listening to %s', server.name, server.url); 
});

//dealing with the request you send in
server.post('/api/messages',connector.listen(),function(req,res,next){
    // if(req){
    //     console.log(req.body);
    // }
});
//===========================================================================
//Including all the controller here.
const PriceMiddleWare=require('./middlewares/pricingMiddleware');
const PriceController=require('./controllers/PricingController');
const GreetingController=require('./controllers/GreetingController');
const HelpController=require('./controllers/HelpController');
const DefaultController=require('./controllers/DefaultController');
const ShowOrderController=require('./controllers/ShowOrderController');
// ---------------------------------------------------------------------------
// Login your own Cosmos DB
const mongoose=require('mongoose');
 
mongoose.connect("mongodb://asmsassistant.documents.azure.com:10255/?ssl=true", {
  auth: {
   user: process.env.COSMOSDB_USER,
   password: process.env.COSMOSDB_PASSWORD,
  }}, function (err, db) {

});
const Order=require('./models/order');
// var now=new Date()
// Order.find({"createdTime":now.toLocaleDateString()},function(err,docs){
//     console.log(docs)
// })
// ---------------------------------------------------------------------------
//任何訊息出來都會被攔截才會到本來的intents
bot.use({
    botbuilder: function (session, next) {
        PriceMiddleWare.logIncomingMessage(session, next);
    },
    send: function (event, next) {
        PriceMiddleWare.logOutgoingMessage(event, next);
    }
})
//======================================================================
//sending the key
var model=process.env.LUIS_KEY;
var recognizer= new builder.LuisRecognizer(model);

var intents=new builder.IntentDialog({recognizers:[recognizer]});
//======================================================================
var firsttime=0;
bot.on('conversationUpdate', function (message,session) {
    // Avoid double request from the server.
    if(firsttime){
        if (message.membersAdded && message.membersAdded.length > 0) {
            // Say hello
            var isGroup = message.address.conversation.isGroup;
            var txt = isGroup ? "Hello!! You can try to ask me some problem. E.g. I wanna have lunch or I want to ask the price" : "Hello!! You can try to ask me some problem. E.g. I wanna have lunch or I want to ask the price";
            var reply = new builder.Message()
                    .address(message.address)
                    .text(txt);
            firsttime=0;
            //Load session in the beginnning conversation.
            bot.loadSession(message.address,(err,session)=>{
                var msg = new builder.Message(session);
                var template = require('./Template/function_template');
                msg.attachments(
                    //這裡要注意 line 要發 carousel 要注意button數量等
                template.function_template(session)
                );
                session.send(msg);
            });
            bot.send(reply);
        } else if (message.membersRemoved) {
            // See if bot was removed
            var botId = message.address.bot.id;
            for (var i = 0; i < message.membersRemoved.length; i++) {
                if (message.membersRemoved[i].id === botId) {
                    // Say goodbye
                    var reply = new builder.Message()
                            .address(message.address)
                            .text("Goodbye");
                    bot.send(reply);
                    firsttime=0;
                    break;
                }
            }
        }
    }else{
        firsttime=1;
    }

});

//=====================================================================
intents.matches('Help',HelpController.HelpFunction1);
// ====================================================================
//Dealing with the process of the greeting.
intents.matches('Greeting',[GreetingController.GreetFunction1]);

/**
 * Main intent is to deal with the pricing problem
 * If clients press help to server, it would obtain the extra message from the server.
 */

intents.matches('Pricing',[PriceController.Price_handler_one,PriceController.Price_handler_two])


/**
 * These codes are dealing with the form you sent out, and the 
 * data would be retrieved by the default intent. Therefore, you
 * can use the parameter of the form input you sent out to validate
 * all the strings and numbers.
 */
intents.matches('Eating',function(session,args){
    console.log(args)
    var msg = new builder.Message(session)
    var template = require('./Template/form_template');
    
    msg.addAttachment(
    template.form
    );
    session.send('Okay I would deal with it!!')
    session.endDialog(msg);
})
//=========================================================================
// Ask the Basic introduction of the subscription problem.
const subscriptionQA_template=require('./Template/Subscription_Answer_template');
intents.matches('SubscriptionIntroduce',[
    function(session,args,next){
        console.log(args)
        for (let i = 0; i < args.entities.length; i++) {
            var resolution=args.entities[i].resolution.values[0]
            console.log(resolution);
            if(resolution=='AIO'){
                var aioQAcard=subscriptionQA_template.aio_Introduction(session)
                var msg=new builder.Message(session)
                msg.addAttachment(aioQAcard);
                session.send(msg);
                session.send("This is azure in open problem")
            }else if (resolution=="PAYG"){
                var paygQAcard=subscriptionQA_template.payg_Introduction(session)
                var msg=new builder.Message(session)
                msg.addAttachment(paygQAcard);
                session.send(msg);
                session.send("This is pay as you go problem")

            }else{
                session.send("Here is the subscription problem")
            }
        }
    },
])
intents.matches('AskSubScriptionBalance',[
    function(session,args,next){
        // console.log(args)
        // Catch the type out
        var entity_type_set=[]
        for (let i = 0; i <  args.entities.length; i++) {
            entity_type_set.push(args.entities[i].type)
        }
        if(entity_type_set.includes("Token")){
            var msg = new builder.Message(session)
            .addAttachment(subscriptionQA_template.aio_Balance_Template);
            session.send(msg);
        }else{
            session.send("Maybe you should ask the problem more specifically!!")
        }
        console.log(entity_type_set);
    },
])
// =========================================================================
// Dealing with the Order If user wants to delete it, just say delete which would trigger the action.
intents.matches('ShowOrder',[ShowOrderController.show])
bot.customAction({
    // matches can send the array to filter two kind of vacaborary.
    matches: [/Delete.*order/i,/Cancel.*order/i],
    onSelectAction: (session, args, next) => {
        // console.log(session.message.text)
        session.beginDialog('DeleteOrderDialog')
    }
});
bot.dialog('DeleteOrderDialog',ShowOrderController.deleteOrder);


// =========================================================================
//  Translate the words
intents.matches('TranslateText',[
    function(session,args,next){
        // session.send("This is translate intent");
        var msg = new builder.Message(session);
        var template = require('./Template/translate_api_template');
        msg.attachments(
            //這裡要注意 line 要發 carousel 要注意button數量等
        template.function_template(session)
        );
        session.send(msg);
    }
])
.triggerAction({
    // Translate the words from english to chinese.
    matches: /Chinese to English|English to Chinese/i,
    onSelectAction: (session, args, next) => {
        // console.log(session.message.text)
        if(session.message.text=='Chinese to English'){
            // session.send('This is for zh-tw to en');
            session.conversationData.target_Language='en';
            session.beginDialog('UsingTranslateApi');
        }else if(session.message.text=='English to Chinese'){
            // session.send('This is en to zh-tw');
            session.conversationData.target_Language='zh-Hant';
            session.beginDialog('UsingTranslateApi');
        }else{
            next();
        }
    }
});
bot.dialog('UsingTranslateApi',[
    (session,args,next)=>{
        console.log(session.conversationData.target_Language)
        if(!session.conversationData.target_Language){
            session.endConversation("Bye");
        }else{
            // session.send('Your target is :'+session.conversationData.target_Language);
            if(session.conversationData.target_Language=='en'){
                builder.Prompts.text(session,'Input some Chinese words or paragraphs');
            }else if (session.conversationData.target_Language=='zh-Hant'){
                builder.Prompts.text(session,'Input some English words or paragraphs');
            }else{
                session.endConversation("Bye, I don't know what it is");
            }
        }
    },
    (session,result,next)=>{
        // console.log(result.response);
        if(!result.response){
            session.endDialog("You should give me some texts");
        }else{
            session.conversationData.Text=result.response;
            var final_result='';
            var subscriptionKey = process.env.Translate_api_key;
            let params = '?to=' + session.conversationData.target_Language + '&text=' + encodeURI(session.conversationData.Text);
            var url='https://api.microsofttranslator.com/V2/Http.svc/Translate'+params
            Axios.get(url,{headers:{'Ocp-Apim-Subscription-Key' : subscriptionKey}})
            .then(res=>{
                // console.log(res.data);
                var final_result='';
                var xml=res.data;
                var parseString = require('xml2js').parseString;
                parseString(xml, function (err, result) {
                    console.log(result.string._);
                    final_result=result.string._;
                });
                session.send(final_result);
            }).catch(err=>{
                session.send('There are some errors cropping up');
                console.log(err);
            })
            session.endDialog("Here are the results. Please check them.");
        }
    }
])
// ========================================================================
/**
 * Setting basic route, if client say something which wouldn't match  any of the LUIS intent except 'None'
 * The matches methods on the IntentDialog invokes a handler when the specified intent is detected in the user utterance. 
 * To add a handler for the None intent, copy the following code and paste it after the .matches handler for the Cancel intent,
 *  before onDefault.
 */
// https://github.com/Microsoft/BotBuilder-Samples/tree/master/Node/cards-RichCards

intents.matches('None',function(session,next){
    var msg = new builder.Message(session);
    msg.addAttachment(CardTemplate.createThumbnailCard(session))

    session.send(msg).endDialog();
    session.send('I don\'t Understand your meaning in None.');
});

bot.dialog('/',intents);
intents.onDefault([DefaultController.default_function1]);









//=======================Intent testing (Waterfall) You could ask "Whoareyou"
// intents.matches(/^change name/i,[
//     function(session){
//         session.userData.name={};
//         session.beginDialog('WhoAreYou');
//     },
//     function(session,result){
//         session.send('Now you are '+result.fuck.name.firstname+" "+result.fuck.name.lastname);
//     }
// ])


// bot.dialog('WhoAreYou',
// [function(session,args,next){
//     console.log('Dialog');
//     if(!session.userData.name)
//     {
//         session.userData.name=args||{}//傳遞空值
//     }
//     if(!session.userData.name.firstname)
//     {
//         builder.Prompts.text(session,'Hi I am bot! what\' your name?');
//     }
//     else{
//         next();
//     }

// },
// function(session,result,next){
    
//     if(result.response)
//     {
//         session.userData.name.firstname=result.response;
//     }
//     if(!session.userData.name.lastname){
//         builder.Prompts.text(session,'Hi I am bot! what\' your last name?');
//     }
//     else{
//         next();
//     }
    
// },
// function(session,result){
//     if(result.response){
//         session.userData.name.lastname=result.response;
//     }
//     session.endDialogWithResult({fuck: session.userData});
//     // session.save();
//     session.send('end dialog');
// }

// ])