var builder= require('botbuilder');

exports.HelpFunction1=function(session,args){
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
    session.send('Don\'t worry!!! I\'m right here waiting for you!');
    session.send(msg);
};