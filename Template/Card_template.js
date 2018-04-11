var builder= require('botbuilder');

exports.createHeroCard=function createHeroCard(session) {
    return new builder.HeroCard(session)
        .title('BotFramework Hero Card')
        .subtitle('Your bots — wherever your users are talking')
        .text('Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.')
        .images([
            builder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')
        ])
        .buttons([
            builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework', 'Go URL')
        ]);
}
exports.createThumbnailCard=function createThumbnailCard(session) {
    return new builder.ThumbnailCard(session)
        .title('BotFramework Thumbnail Card')
        .subtitle('Your bots — wherever your users are talking')
        .text('Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.')
        .buttons([
            builder.CardAction.openUrl(session, 'https://docs.microsoft.com/bot-framework', 'Get Started')
        ]);
}


    // msg.attachmentLayout(builder.AttachmentLayout.carousel)
    // msg.attachments([
    //     new builder.HeroCard(session)
    //         .title("Classic White T-Shirt")
    //         .subtitle("100% Soft and Luxurious Cotton")
    //         .text("Price is $25 and carried in sizes (S, M, L, and XL)")
    //         .images([builder.CardImage.create(session, 'http://petersapparel.parseapp.com/img/whiteshirt.png')])
    //         .buttons([
    //             builder.CardAction.imBack(session, "buy classic white t-shirt", "Buy")
    //         ]),
    //     new builder.HeroCard(session)
    //         .title("Classic Gray T-Shirt")
    //         .subtitle("100% Soft and Luxurious Cotton")
    //         .text("Price is $25 and carried in sizes (S, M, L, and XL)")
    //         .images([builder.CardImage.create(session, 'http://petersapparel.parseapp.com/img/grayshirt.png')])
    //         .buttons([
    //             builder.CardAction.imBack(session, "buy classic gray t-shirt", "Buy"),
    //             builder.CardAction.openUrl(session,"https://azure.microsoft.com/zh-tw/offers/ms-azr-0111p/","Open Url")
    //         ])
    // ]);