var builder= require('botbuilder');

exports.function_template=(session)=>{
    return [
        new builder.HeroCard(session)
            .title("ASMS Assistant") // 大標題
            .subtitle("This is the tool for ASMS") //說明
            .text("Try to click the button belows") //給電腦看的
            .images([builder.CardImage.create(session, 'https://www.onmsft.com/wp-content/uploads/2017/09/Azure.png')]) // 要放圖的話，全要放，而且要https
            .buttons([
                builder.CardAction.imBack(session, "I wanna ask about the product pricing", "Ask pricing problem(AIO only)"), // CardAction.imBack :是直接讓使用者傳訊， 這個範例後面還有設計一個 triggerAction 去 促發 動作。
                builder.CardAction.imBack(session, "help me fill out the form please", "Lunch form/drink form"), // CardAction.imBack :是直接讓使用者傳訊， 這個範例後面還有設計一個 triggerAction 去 促發 動作。
                builder.CardAction.imBack(session, "I wanna know product like vm", "Find product's document"), // CardAction.imBack :是直接讓使用者傳訊， 這個範例後面還有設計一個 triggerAction 去 促發 動作。
                builder.CardAction.imBack(session, "Show order list", "Show me the order list"),
                builder.CardAction.imBack(session, "Help me translate!!", "Translate the words"),
            ])
    ]
};