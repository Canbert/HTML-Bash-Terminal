$(document).ready(function () {

    //Create new terminal class
    var terminal = new Terminal();

    //Print the start text
    terminal.print(terminal.startText);

    //Set the inputs label to the beginning part before input
    $('#input-label').html(terminal.beginCmd);

    //Set the input variable to the text box
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
            terminal.printLine(terminal.beginCmd() + args.join(" "));

            //Add to the history
            // terminal.addHistory(args.join(" "));

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
                    case "ls":
                        terminal.commands.ls();
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