var Template={
    contentType: "application/vnd.microsoft.card.adaptive",
    content: {
        type: "AdaptiveCard",
        speak: "<s>Your  meeting about \"Adaptive Card design session\"<break strength='weak'/> is starting at 12:30pm</s><s>Do you want to snooze <break strength='weak'/> or do you want to send a late notification to the attendees?</s>",
           body: [
                {
                    "type": "TextBlock",
                    "text": "Product list",
                    "size": "extraLarge",
                    "weight": "bolder"
                },
                
            ],
    }
}


exports.product_list=function(product_list){
    Template.content.body=[
        {
            "type": "TextBlock",
            "text": "Product list",
            "size": "extraLarge",
            "weight": "bolder"
        },
        
    ]
    for (let index = 0; index < product_list.length; index++) {
        Template.content.body.push({
            "type": "TextBlock",
            "text": "**Product name:**",
            "size": "large"
        })
        Template.content.body.push({
            "type": "TextBlock",
            "text": product_list[index].p_name
        })
        Template.content.body.push({
            "type": "TextBlock",
            "text": "**Product Document:**",
            "size": "large"
        })
        Template.content.body.push({
            "type": "TextBlock",
            "text": product_list[index].p_doc_url,
            "color": "accent"
        })
        Template.content.body.push({
            "type": "TextBlock",
            "text": "**Pricing page:**",
            "size": "large"
        })
        Template.content.body.push({
            "type": "TextBlock",
            "text": product_list[index].Pricing_url,
            "color": "accent"
        })
        Template.content.body.push({
            "type": "TextBlock",
            "text": "==============================",
            "color": "dark"
        })
    }
    return Template;
}