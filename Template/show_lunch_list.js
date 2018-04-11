var Template={
    contentType: "application/vnd.microsoft.card.adaptive",
    content: {
        type: "AdaptiveCard",
        speak: "<s>Your  meeting about \"Adaptive Card design session\"<break strength='weak'/> is starting at 12:30pm</s><s>Do you want to snooze <break strength='weak'/> or do you want to send a late notification to the attendees?</s>",
           body: [
                {
                    "type": "TextBlock",
                    "text": "Lunch Order List for ASMS",
                    "size": "extraLarge",
                    "weight": "bolder"
                },
                
            ],
    }
}


exports.lunch_list=function(Lunch_list){
    Template.content.body=[
        {
            "type": "TextBlock",
            "text": "Lunch Order List for ASMS",
            "size": "extraLarge",
            "weight": "bolder"
        },
        
    ]
    var sum=0;
    for (let index = 0; index < Lunch_list.length; index++) {
        sum+=Lunch_list[index].price;
        Template.content.body.push({
            "type": "TextBlock",
            "text": "**ID:**",
            "size": "large"
        })
        Template.content.body.push({
            "type": "TextBlock",
            "text": Lunch_list[index]._id,
        })
        Template.content.body.push({
            "type": "TextBlock",
            "text": "**Name:**",
            "size": "large"
        })
        Template.content.body.push({
            "type": "TextBlock",
            "text": Lunch_list[index].name,
        })
        Template.content.body.push({
            "type": "TextBlock",
            "text": "**Food:**",
            "size": "large"
        })
        Template.content.body.push({
            "type": "TextBlock",
            "text": Lunch_list[index].food,
        })
        Template.content.body.push({
            "type": "TextBlock",
            "text": "**Pricing:**",
            "size": "large"
        })
        Template.content.body.push({
            "type": "TextBlock",
            "text": "單價："+Lunch_list[index].price.toString()+"元",
        })
        Template.content.body.push({
            "type": "TextBlock",
            "text": "==============================",
            "color": "dark"
        })
    }
    if(Lunch_list){
        Template.content.body.push({
            "type": "TextBlock",
            "text": "日期:"+Lunch_list[0].createdTime,
            "size": "medium",
            "weight": "bolder"
        })     
    }
    Template.content.body.push({
        "type": "TextBlock",
        "text": "總共:"+sum.toString()+"元",
        "size": "large",
        "weight": "bolder"
    })
    return Template;
}