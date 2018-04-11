var Template={
    contentType: "application/vnd.microsoft.card.adaptive",
    content: {
        type: "AdaptiveCard",
        speak: "<s>Your  meeting about \"Adaptive Card design session\"<break strength='weak'/> is starting at 12:30pm</s><s>Do you want to snooze <break strength='weak'/> or do you want to send a late notification to the attendees?</s>",
           body: [
                {
                    "type": "TextBlock",
                    "text": "ASMS Lunch Reservation",
                    "size": "large",
                    "weight": "bolder"
                },
                {
                    "type": "TextBlock",
                    "text": "**Order Id:**"
                },
                {
                    "type": "TextBlock",
                    "text": ""
                },
                {
                    "type": "TextBlock",
                    "text": "**Name:**"
                },
                {
                    "type": "TextBlock",
                    "text": ""
                },
                {
                    "type": "TextBlock",
                    "text": "**餐點**:"
                },
                {
                    "type": "TextBlock",
                    "text": ""
                },
                {
                    "type": "TextBlock",
                    "text": "**總共價錢**"
                },
                {
                    "type": "TextBlock",
                    "text": ""
                },
            ],
    }
}


exports.form=function(session){
    Template.content.body[2].text=session.message.value.id;
    Template.content.body[4].text=session.message.value.Name;
    Template.content.body[6].text=session.message.value.Meal;
    Template.content.body[8].text=session.message.value.Price+"元";
    return Template;
}