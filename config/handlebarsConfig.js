const handlebars = require('express-handlebars');
const Handlebars = require('handlebars');
const handlebarsConfig = (app) => {
    // > Handlebars config <
    
    Handlebars.registerHelper('eq', function (a, b, options) {
        return a === b;
    });
    Handlebars.registerHelper('*', function(a,b){
        return Number(a) * Number(b);
    })

    Handlebars.registerHelper('debug',function(data){
        console.log(data,'TEMPLATE DEBUG DATA');
    });

    Handlebars.registerHelper('blockHelperMissing', function(context, options) {
        return "Helper '"+options.name+"' not found. " 
          + "Printing block: " + options.fn(context); 
    });


    Handlebars.registerHelper('helperMissing', function() {
        var options = arguments[arguments.length-1];
        var args = Array.prototype.slice.call(arguments, 0,arguments.length-1)
        return new Handlebars.SafeString("Missing: "+options.name+"("+args+")")
      })   
      



    Handlebars.registerHelper('typeof', function(value){
        return typeof value;
    });

    Handlebars.registerHelper('isOdd',function(number){
        return Number(number) % 2 === 0;
    });


    Handlebars.registerHelper('getDay',(date) => {
        return new Date(date).getDate();
    });

    Handlebars.registerHelper('getMonth',(date) => {
        const DATES = {
            0 : 'January',
            1 : 'February',
            2 : 'March',
            3 : 'April',
            4 : 'May',
            5 : 'June',
            6 : 'July',
            7 : 'August',
            8 : 'September',
            9 : 'October',
            10 : 'November',
            11 : 'December',
        }
        return DATES[new Date(date).getMonth()];
    });
    Handlebars.registerHelper('print',(data) => {
        console.log(data,'Print function called');
    })
    Handlebars.registerHelper('json', function(context) {
        return JSON.stringify(context);
    });

    Handlebars.registerHelper('formatDate', function(date) {
        return new Date(date).toLocaleDateString();
    });
    app.engine('hbs', handlebars.engine({
        extname: '.hbs',
        defaultLayout : 'default',
    }));
    
    app.set('view engine', 'hbs');
    app.set('views', 'views');
    console.info('[INFO] Handlebars Configured !')
    // ! Handlebars config !
};

module.exports = handlebarsConfig;
