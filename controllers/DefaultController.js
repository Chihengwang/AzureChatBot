var builder= require('botbuilder');
const Order=require('../models/order');
exports.default_function1=function (session,args,next){
    // console.log(args);
    // next();
    //It would be undefined.
    // console.log(session.message.value.fuck);
    //可以藉由收到的id/name去辨別表單是收到甚麼樣的 因為按表單時會走default這個選項。
    //表單目前裡面有snooze,input3兩個變數 我們就取input3 or snooze
    if(session.message.value){
        if(session.message.value.Name && session.message.value.Meal && session.message.value.Price>1){
            var lunch_order={
                name:session.message.value.Name,
                food:session.message.value.Meal,
                price:session.message.value.Price
            }
            
            console.log(session.message.value);
            const order=new Order(lunch_order)
            order.save().then(doc=>{
                session.message.value.id=doc._id.toString()
                ReceiveForm= require('../Template/receiveForm');
                var msg= new builder.Message(session)
                    .addAttachment(ReceiveForm.form(session));
                session.send(msg); 
                session.send('Please remember your order_id: '+doc._id+'.(You would need it while changing the order.)'+' Thanks you, '+session.message.value.Name);
            }).catch(err=>{
                session.send('DataBase Can\'t save your data');
            })

        }else{
            session.send('Please double check your form is correct');
        }
    }else{
        session.send('I Don\'t Understand your meaning in default');
    }
    //Form 傳送出去後 會走dialog的方式去
    //假如沒有form傳進來value就為undefined.
    // console.log(session.message.value);
}