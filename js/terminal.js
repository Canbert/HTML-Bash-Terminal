/*
* USER CLASS
* */
function User(){
    this.name = "guest";
}

User.prototype.toString = function userToString() {
    return this.name;
}


/*
 * TERMINAL COMMANDS CLASS
 * Commands the user can input in the terminal
 * */
function TerminalCommands(parent) {

    this.parent = parent;

    //Clear the terminal
    this.clear = function () {
        $('#previous-commands').empty();
    }

    this.history = function () {
        for(var i = 0;i<parent.commandsHistory.length;i++){
            parent.printLine((i+1) + ". " + parent.commandsHistory[i]);
        }
    }

    //Displays list of commands
    this.help = function() {

        var help = [];

        //Check all of the commands in the TerminalCommands object
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                //Ignore these commands and variables
                if(key == "parent" || key == "ay"){
                    continue;
                }
                else{
                    help.push(key);
                }
            }
        }

        //Sort the commands in alphabetical order
        help.sort();

        //Print each of the commands to the terminal
        for(var i = 0;i<help.length;i++){
            parent.printLine(help[i]);
        }

    }

    //List all the folders and files in the current directory
    this.ls = function () {
        parent.printLine("README.txt");
    }

    //Echo text that the user provides
    this.echo = function(arg){
        if(arg != null){
            parent.printLine(arg);
        }
    }

    //Add images to the page that revolve around the "ay lmao" meme
    this.ay = function(arg) {
        if(arg == "lmao"){
            $('#previous-commands').append('<img src="https://lh6.googleusercontent.com/-QNfycKTbXDc/VzN7nl1I4xI/AAAAAAAAAR4/96nRKsbGr5Qhm0WMMWxZbChjOUhiVgR8wCL0B/w776-h875-no/2016-05-11.png">');
        }
        else if(arg == "la mayo"){
            $('#previous-commands').append('<img src="https://40.media.tumblr.com/6fa311e06dae0cc061f9670e76819ca2/tumblr_n9mx2fTr7e1sxfvy5o1_1280.png">');
        }
    }
}


/*
* TERMINAL CLASS
* */
function Terminal(){

    this.user = new User();
    this.beginCmd = "<span style='color: red'>" + this.user + "</span>@HTML-Bash-Terminal:$ ";

    this.commands = new TerminalCommands(this);

    this.commandsHistory = [];

    this.historyIndex = this.commandsHistory.length;

    //Add a new command to the history
    this.addHistory = function (val) {
        this.commandsHistory.push(val);
        this.historyIndex = this.commandsHistory.length;
    }

    //Add <p> tag to printLine
    this.printLine = function(out) {
        if(out == null){
            $('#previous-commands').append("</br>");
        }
        else{
            $('#previous-commands').append("<p>" + out + "</p>");
        }
    }
}

$(document).ready(function () {

    var terminal = new Terminal();

    terminal.printLine("HTML-Bash-Terminal");
    terminal.printLine();
    terminal.printLine("HTML-Bash-Terminal login: " + terminal.user + " (automatic login)");

    $('#input-label').html(terminal.beginCmd);

    var input = $('#input');

    setInputSize();

    //Check if a key is pressed in the input box
    $(input).keypress(function(event) {

        //Enter button
        if ( event.which == 13 ) {

            var command = input.val();

            //Command line arguments
            var args = [];

            //Check if the command has a space after it
            if(command.indexOf(' ') > -1){
                args[0] = command.substring(0,command.indexOf(' '));
                args[1] = command.substring(command.indexOf(' ')+1);
            }
            else{
                args[0] = command.substring(0);
            }

            //Print the command just entered
            terminal.printLine(terminal.beginCmd + args.join(" "));

            //Add to the cmdsHistory
            terminal.addHistory(args.join(" "));

            //Commands the user can input into the terminal
            if(!isNullOrWhitespace(args[0])) {
                switch (args[0]) {
                    case "help":
                        terminal.commands.help();
                        break;
                    case "echo":
                        terminal.commands.echo(args[1]);
                        break;
                    case "clear":
                        terminal.commands.clear();
                        break;
                    case "history":
                        terminal.commands.history();
                        break;
                    case "ay":
                        terminal.commands.ay(args[1])
                        break;
                    default:
                        terminal.printLine(args[0] + ": command not found");
                }

                //Scroll the page to the bottom
                $("body").scrollTop($("body")[0].scrollHeight);
                //Empty the input box
                input.val("");
            }
        }
    });


    $(input).keydown(function (event) {
        //Up arrow
        if(event.which == 38){
            if(terminal.historyIndex != 0){
                terminal.historyIndex--;
            }
            input.val(terminal.commandsHistory[terminal.historyIndex]);
            input
                .putCursorAtEnd() // should be chainable
                .on("focus", function() { // could be on any event
                    input.putCursorAtEnd()
                });


        }

        //Down arrow
        if(event.which == 40){
            if(terminal.historyIndex != terminal.commandsHistory.length-1){
                terminal.historyIndex++;
                input.val(terminal.commandsHistory[terminal.historyIndex]);
            }
            else{
                input.val("");
            }

            input
                .putCursorAtEnd() // should be chainable
                .on("focus", function() { // could be on any event
                    input.putCursorAtEnd()
                });
        }
    });
});

$(window).on('resize', function(){
    setInputSize();
});

//Set the of the input elements when the window is resized
function setInputSize() {

    var width = $('#input-container').width() - $('#input-label').width();

    $('#input').width(width);
}

//Check if there is a string is null or has whitespace in it
function isNullOrWhitespace( input ) {

    if (typeof input === 'undefined' || input == null) return true;

    return input.replace(/\s/g, '').length < 1;
}

jQuery.fn.putCursorAtEnd = function() {

    return this.each(function() {

        // Cache references
        var $el = $(this),
            el = this;

        // Only focus if input isn't already
        if (!$el.is(":focus")) {
            $el.focus();
        }

        // If this function exists... (IE 9+)
        if (el.setSelectionRange) {

            // Double the length because Opera is inconsistent about whether a carriage return is one character or two.
            var len = $el.val().length * 2;

            // Timeout seems to be required for Blink
            setTimeout(function() {
                el.setSelectionRange(len, len);
            }, 1);

        } else {

            // As a fallback, replace the contents with itself
            // Doesn't work in Chrome, but Chrome supports setSelectionRange
            $el.val($el.val());

        }

        // Scroll to the bottom, in case we're in a tall textarea
        // (Necessary for Firefox and Chrome)
        this.scrollTop = 999999;

    });

};