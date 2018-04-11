var builder= require('botbuilder');
const Order=require('../models/order');
//===============================================
function formatDate(date) {
    var monthNames = [
      "1", "2", "3",
      "4", "5", "6", "7",
      "8", "9", "10",
      "11", "12"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return year+'-'+monthNames[monthIndex]+'-'+ day;
  }

//==============================================
exports.show=function(session,args,next){
    var now = new Date();
    var yesterday= new Date();
    yesterday.setDate(now.getDate()-1);
    today=formatDate(now);
    yesterday_format=formatDate(yesterday);
    Order.count({$or:[{"createdTime":today},{"createdTime":yesterday_format}]},function(err,count){
        // console.log(count)
        // If count>0, then Search for today order
        if(count){
            Order.find({$or:[{"createdTime":today},{"createdTime":yesterday_format}]},function(err,docs){
                // console.log(docs)
                if(docs!=[]){
                    var show_lunch_list=require('../Template/show_lunch_list').lunch_list(docs);
                    var msg = new builder.Message(session)
                    .addAttachment(show_lunch_list);
                    session.send('All orders today');
                    session.send(msg);
                }else if(err){
                    session.send("We don't receive any orders today")
                }
        
            })
        }else{
            session.send("We don't receive any orders today")
        }
    })
}



exports.deleteOrder=[
    (session, args, next)=>{
        builder.Prompts.text(session,"Please Give me the order Id")
    },
    (session,result, next)=>{
        //Verify whether the text contains OrderId
        var re=/[0-9a-z-A-Z]{24}/i
        if(result.response.match(re)){
            console.log(result.response.match(re)[0]);
            Order.remove({_id:result.response.match(re)[0]})
            .exec()
            .then(result=>{
                console.log(result)
                session.endDialog("Cancel your order Successfully!!!")
            })
            .catch(err=>{
                session.endDialog("I can't find your order,sorry.Please provide me with correct ID");
            })
        }else{
            session.endDialog("You didn't give me the order id in your sentense!!");
        }

    }
]
