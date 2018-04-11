var builder= require('botbuilder');

exports.function_template=(session)=>{
    return [
        new builder.HeroCard(session)
            .title("ASMS Translator") // 大標題
            .subtitle("This is the tool for ASMS") //說明
            .text("Try to click the button belows") //給電腦看的
            .images([builder.CardImage.create(session, 'https://azurecomcdn.azureedge.net/cvt-b3ae4c7bb7807f8a5b2674b06e3707c0eddf16bbf62e9aee0f434901d2e92011/images/page/services/cognitive-services/translator-text-api/custom-translation-systems.png')]) // 要放圖的話，全要放，而且要https
            .buttons([
                builder.CardAction.imBack(session, "English to Chinese", "Translate from en into zh-tw"), // CardAction.imBack :是直接讓使用者傳訊， 這個範例後面還有設計一個 triggerAction 去 促發 動作。
                builder.CardAction.imBack(session, "Chinese to English", "Translate from zh-tw into en"), // CardAction.imBack :是直接讓使用者傳訊， 這個範例後面還有設計一個 triggerAction 去 促發 動作。
            ])
    ]
};