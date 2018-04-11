module.exports = {
    logIncomingMessage: function (session, next) {        
        // console.log(session);
        next();
    },
    logOutgoingMessage: function (event, next) {
        // console.log(event.text);
        next();
    }
}