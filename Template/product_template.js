var template={
    contentType: "application/vnd.microsoft.card.adaptive",
    content: {
        type: "AdaptiveCard",
        speak: "<s>Your  meeting about \"Adaptive Card design session\"<break strength='weak'/> is starting at 12:30pm</s><s>Do you want to snooze <break strength='weak'/> or do you want to send a late notification to the attendees?</s>",
           body: [
                {
                    "type": "TextBlock",
                    "text": "產品詳細資訊",
                    "size": "large",
                    "weight": "bolder"
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "FactSet",
                            "facts": [
                                {
                                    "title": "MeterCategory:",
                                    "value": ""
                                },
                                {
                                    "title": "MeterSubCategory",
                                    "value": ""
                                },
                                {
                                    "title": "MeterId:",
                                    "value": ""
                                },
                                {
                                    "title": "MeterRegion:",
                                    "value": ""
                                },
                                {
                                    "title": "Unit:",
                                    "value": ""
                                },
                                {
                                    "title": "Rate:",
                                    "value": ""
                                }
                            ]
                        }
                    ]
                }
            ]
    }
}


exports.product_template=(Product_object)=>{
    var rate=Product_object.MeterRates[0];
    
    template.content.body[1].items[0].facts[0].value=Product_object.MeterCategory;
    template.content.body[1].items[0].facts[1].value=Product_object.MeterSubCategory;
    template.content.body[1].items[0].facts[2].value=Product_object.MeterId;
    template.content.body[1].items[0].facts[3].value=Product_object.MeterRegion;
    template.content.body[1].items[0].facts[4].value=Product_object.Unit;
    template.content.body[1].items[0].facts[5].value=rate.toString();
    return template;
}
// exports.fuck="hello fuck";