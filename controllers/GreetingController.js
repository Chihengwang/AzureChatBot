var builder= require('botbuilder');


exports.GreetFunction1=function(session,args,next){
    // session.send('You are reaching the Greeting intent,you said \'%s\'.',session.message.text);
    // console.log(args.intent);
    // console.log(session.message.address);
    session.userData={};
    // console.log(session.dialogData['BotBuilder.Data.Intent']);
    session.conversationData.intent=args.intent;
    var msg = new builder.Message(session)
    var template = require('../Template/function_template');
    msg.attachments(
        //這裡要注意 line 要發 carousel 要注意button數量等
    template.function_template(session)
    );
    // console.log(msg);
    session.send('Hello here is the function list you could try!');
    session.send(msg);    
}