var builder= require('botbuilder');


exports.aio_Introduction=function createThumbnailCard(session) {
    var msg="Azure in Open 大量授權為新選項，可以讓客戶向他們的合作夥伴購買 Azure 服務。客戶透過 Open、Open Value 或 Open Value Subscription 大量授權方案購買 Azure SKU。Azure in Open 購買在啟用後 12 個月內都有效，且必須在購買日期後 5 年內啟用。"
    msg+="SKU 會以線上服務啟用 (OSA) 金鑰的形式供應，轉銷商會先向經銷商購買 OSA 金鑰，然後再銷售給客戶。除非購買時另行指定，否則全額購買都是以單一 OSA 金鑰發行。"
    msg+="訂單完成處理之後，可從大量授權服務中心取得 OSA 金鑰，並在 Azure 帳戶入口網站 (http://aka.ms/azureinopen) 中啟用。"
    return new builder.ThumbnailCard(session)
        .title('Azure in open INTRODUCTION')
        .subtitle('Basic description of the azure in open and how it works')
        .text(msg)
        .buttons([
            builder.CardAction.openUrl(session, 'http://aka.ms/azureinopen', 'AIO 入口網站')
        ]);
}
exports.aio_Balance_Template={
    contentType: "application/vnd.microsoft.card.adaptive",
    content: {
        type: "AdaptiveCard",
        speak: "<s>Your  meeting about \"Adaptive Card design session\"<break strength='weak'/> is starting at 12:30pm</s><s>Do you want to snooze <break strength='weak'/> or do you want to send a late notification to the attendees?</s>",
           body: [
            {
                "type": "Container",
                "items": [
                    {
                        "type": "TextBlock",
                        "text": "如何知道Azure In Open的餘額",
                        "weight": "bolder",
                        "size": "medium"
                    }
                ]
            },
            {
                "type": "Container",
                "items": [
                    {
                        "type": "TextBlock",
                        "text": "除了**登入帳戶檢視餘額及使用量**之外，當帳戶餘額達到初始值的的 30%時，您將會收到電子郵件通知。您也可以使用**計費警示功能**，建立最多五個可設定的警示，在訂用帳戶所剩餘的信用額度達到設定金額時，傳送電子郵件通知您。每個警示都能傳送給兩個電子郵件地址。警示會在訂用帳戶層級建立，並可從使用量與計費入口網站的 [警示] 索引標籤存取，以下將詳細說明。",
                        "wrap": true
                    }
                ]
            }
        ],
        "actions": [
            {
                "type": "Action.ShowCard",
                "title": "警示重點(點我有驚喜)",
                "card": {
                    "type": "AdaptiveCard",
                    "body": [
                          
                        {
                            "type": "FactSet",
                            "facts": [
                                {
                                    "title": "一",
                                    "value": "保證金所剩餘的信用額度：保證金所剩餘的餘額**小於**或**等於**初始**保證金餘額的 30%**。"
                                },
                                {
                                    "title": "二",
                                    "value": "Token 到期：Token 到期日的前 **30 天**。到期後，您將失去所有未使用的信用額度。"
                                },
                                {
                                    "title": "三",
                                    "value": "訂用帳戶信用額度：訂用帳戶所剩餘的信用額度總計小於或等於所設定的金額。"
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "type": "Action.OpenUrl",
                "title": "Billing Alert影片教學",
                "url": "https://channel9.msdn.com/Series/azure-skill-subscription/azure-in-open-notification"
            },
            {
                "type": "Action.OpenUrl",
                "title": "登入account portal查看餘額",
                "url": "https://account.azure.com/Subscriptions?l=zh-tw&correlationId=d6fcd8ab-5b83-4558-89ed-1ce7a70a779f"
            }
        ]
    }
}

exports.payg_Introduction=function createThumbnailCard(session) {
    var msg="This offer is billed at the standard Pay-As-You-Go rates, except as otherwise specified herein."
    msg+="You will be notified at least 30 days in advance of any changes to the Pay-As-You-Go rates. New services may be added periodically to the Azure platform. We will "
    msg+="notify you in advance of these new services and any fees that might be charged for using them. However, you would only be charged if you elect to use the new "
    msg+="services.Any taxes which may result from receiving services at no charge are the sole responsibility of the recipient."
    return new builder.ThumbnailCard(session)
        .title('Pay As You Go INTRODUCTION')
        .subtitle('Basic description of pay as you go')
        .text(msg)
        .buttons([
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/zh-tw/offers/ms-azr-0003p/', 'PAYG 入口網站'),
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/zh-tw/pricing/', 'Pricing page')

        ]);
}


exports.aio_countryAvailable=function createThumbnailCard(session) {
    var msg="Azure in Open is available in countries that have Open Volume Licensing program partners and that offer Azure Direct."
    msg+="Go here to see if Open volume licensing is available in your country."
    return new builder.ThumbnailCard(session)
        .title('Azure in open available country')
        .subtitle('You can find the available country to get the license.')
        .text(msg)
        .buttons([
            builder.CardAction.openUrl(session, 'https://www.microsoft.com/en-us/licensing/worldwide.aspx', 'Available Countries'),
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/zh-tw/pricing/', 'Pricing page')
        ]);
}


exports.aio_Advantage=function createThumbnailCard(session) {
    var msg="Before August 2014, there were two options for customers to purchase Azure, either on azure.microsoft.com or as part of an Enterprise Agreement (EA) with Microsoft."
    msg+="With this change, Azure will now be available through another familiar licensing option that offers the benefits of Microsoft Volume Licensing.";
    msg+="One major benefit of purchasing Azure via Open Licensing is the ability for customers to work with the same resellers that they may purchase from currently under the Open Volume License Programs";
    msg+="—enabling them to take advantage of the services and expertise they offer as well as help with managing their account.";
    return new builder.ThumbnailCard(session)
        .title('Azure in open Benefits')
        .subtitle('These are the benefits while getting the azure in open')
        .text(msg)
        .buttons([
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/offers/ms-azr-0111p/', 'More information?'),
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/zh-tw/pricing/', 'Pricing page')
        ]);
}


exports.aio_BindingProblem=function createThumbnailCard(session) {
    var msg="Associating an Azure in Open subscription with an EA will forfeit any unconsumed Azure in Open credits."
    msg+="Prior to associating an Azure in Open account with an EA, please review relevant Azure EA documentation.";
    msg+="**To avoid any potential forfeiture of credit**, it is recommended that customers **consume all credit **on an Azure in Open subscription prior to adding the account to their EA.";
    return new builder.ThumbnailCard(session)
        .title('Azure in open Binding problem')
        .subtitle('Watch out while you want to bind two subscription')
        .text(msg)
        .buttons([
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/offers/ms-azr-0111p/', 'Azure in open page'),
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/zh-tw/pricing/', 'Pricing page')
        ]);
}

exports.aio_serviceAvailable=function createThumbnailCard(session) {
    var msg="In the Azure Marketplace, customers in Open licensing can transact all bring-your-own-license(BYOL) offerings and will need to associate a new subscription with a credit card for usage-based offerings."
    msg+="Some Azure services can be purchased through Open Licensing as per user licenses on an annual term, separately. Azure Active Directory Basic and Premium and Enterprise Mobility Suite (EMS) are examples of a per user license that are purchased annually and separately.";
    msg+="Some services aren’t available in all Datacenter locations. **You can check to see what services are offered in each Datacenter here.**";
    return new builder.ThumbnailCard(session)
        .title('Azure in open available services')
        .subtitle('Some services can\'t be used in azure in open')
        .text(msg)
        .buttons([
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/status/', 'Available Services page'),
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/zh-tw/pricing/', 'Pricing page')
        ]);
}

exports.aio_RollOverProblem=function createThumbnailCard(session) {
    var msg="**No.** The Azure in Open program does not offer any rollover benefits to future periods."
    msg+="Customers have a “use or lose” deadline **that expires 12 months after the date of activation.**";
    msg+=" If a customer has activated multiple OSA keys at different times, each key will have a separate expiration date based on the each key’s individual activation date.";
    return new builder.ThumbnailCard(session)
        .title('Wanna roll over your token?')
        .subtitle('Something you should notice.')
        .text(msg)
        .buttons([
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/offers/ms-azr-0111p/', 'Azure in open page'),
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/zh-tw/pricing/', 'Pricing page')
        ]);
}