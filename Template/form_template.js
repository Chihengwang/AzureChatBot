exports.form={
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
                    "text": "Conf Room 112/3377 (10)"
                },
                {
                    "type": "TextBlock",
                    "text": "**Note** Send out after 11:30 AM"
                },
                {
                    "type": "TextBlock",
                    "text": "**Name:**"
                },
                {
                    "type": "Input.Text",
                    "id": "Name",
                    "placeholder": "enter comment",
                    "value": ""
                },
                {
                    "type": "TextBlock",
                    "text": "**餐點**:"
                },
                {
                    "type": "Input.Text",
                    "id": "Meal",
                    "placeholder": "enter comment",
                    "value": ""
                },
                {
                    "type": "TextBlock",
                    "text": "**總共價錢**"
                },
                {
                    "type": "Input.Number",
                    "id": "Price",
                    "placeholder": "Enter a number",
                    "min": 1,
                    "max": 1000,
                    "value": 0
                },
            ],
            "actions": [
                {
                    "type": "Action.Submit",
                    "title": "Submit"
                },
            ]
    }
}