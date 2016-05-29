var cmdsHistory = new function () {
    this.commands = [];
    this.get = function(){
        for(var i = 0;i<this.commands.length;i++){
            printLine((i+1) + ". " + this.commands[i]);
        }
    };
    this.add = function(val){
        this.commands.push(val);
    }
};

var user = "root";

var beginLine = "<span style='color: red'>" + user + "</span>@HTML-Bash-Terminal:$ ";

function setInputSize() {

    var width = $('#input-container').width() - $('#input-label').width();

    $('#input').width(width);
}

function isNullOrWhitespace( input ) {

    if (typeof input === 'undefined' || input == null) return true;

    return input.replace(/\s/g, '').length < 1;
}

$(document).ready(function () {

    console.log(cmdsHistory.test);

    printLine("HTML-Bash-Terminal");
    printLine();
    printLine("HTML-Bash-Terminal login: root (automatic login)");

    $('#input-label').html(beginLine);

    setInputSize();
});

$(window).on('resize', function(){
    setInputSize();
});

//Check for a command when the enter button is pressed in the input field
$("#input").keypress(function(event) {
    if ( event.which == 13 ) {

        var input = $('#input').val();

        //Command line arguments
        var args = [];

        //Check if the command has a space after it
        if(input.indexOf(' ') > -1){
            args[0] = input.substring(0,input.indexOf(' '));
            args[1] = input.substring(input.indexOf(' ')+1);
        }
        else{
            args[0] = input.substring(0);
        }

        //Print the command just entered
        printLine(beginLine + args.join(" "));

        //Add to the cmdsHistory
        cmdsHistory.add(args.join(" "));

        if(!isNullOrWhitespace(args[0])) {
            switch (args[0]) {
                case "help":
                    help();
                    break;
                case "echo":
                    echo(args[1]);
                    break;
                case "clear":
                    clear();
                    break;
                case "ls":
                    ls();
                    break;
                case "cd":
                    cd(args[1]);
                    break;
                case "history":
                    cmdsHistory.get();
                    break;
                case "ay":
                    ay(args[1]);
                    break;
                default:
                    printLine(args[0] + ": command not found");
            }

            //Scroll the page to the bottom
            $("body").scrollTop($("body")[0].scrollHeight);
            //Empty the input box
            $('#input').val("");
        }
    }
});

//Add <p> tag to printLine
function printLine(out) {
    if(out == null){
        $('#previous-commands').append("</br>");
    }
    else{
        $('#previous-commands').append("<p>" + out + "</p>");
    }
}

//Clear the console
function clear(){
    $('#previous-commands').empty();
}

//Displays list of commands
function help() {
    var help = [
        "help",
        "echo [arg]",
        "ls",
        "cd [arg]",
        "clear"
    ];
    help.sort();

    for(var i = 0;i < help.length;i++){
        printLine(help[i]);
    }
}

//List all the folders and files in the current directory
function ls() {
    printLine("README.txt");

}

//Go to a specific directory
function cd(arg) {

}

//Echo text that the user provides
function echo(arg){
    console.log(arg);
    if(arg != null){
        printLine(arg);
    }
}

//Add images to the page that revolve around the "ay lmao" meme
function ay(arg) {
    if(arg == "lmao"){
        $('#previous-commands').append('<img src="https://lh6.googleusercontent.com/-QNfycKTbXDc/VzN7nl1I4xI/AAAAAAAAAR4/96nRKsbGr5Qhm0WMMWxZbChjOUhiVgR8wCL0B/w776-h875-no/2016-05-11.png">');
    }
    else if(arg == "la mayo"){
        $('#previous-commands').append('<img src="https://40.media.tumblr.com/6fa311e06dae0cc061f9670e76819ca2/tumblr_n9mx2fTr7e1sxfvy5o1_1280.png">');
    }
}