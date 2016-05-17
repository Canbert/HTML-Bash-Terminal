

var output = $('#console');

output.append(
    "<p>HTML-Bash-Terminal</p></br>"
    + "<p>HTML-Bash-Terminal login: root (automatic login)</p>");
$('#input-label').html("<span style='color: red'>root</span>@HTML-Bash-Terminal ~ $ ");

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

        switch (args[0]){
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
                break;
            case "ay":
                ay(args[1]);
                break;
            default:
                output.append("<p>" +  args[0] + ": command not found</p>");
        }

        //Scroll the page to the bottom
        $("body").scrollTop($("body")[0].scrollHeight);
        //Empty the input box
        $('#input').val("");
    }
});

//Displays list of commands
function help() {
    console.log("help command");
    var help = [
        "help",
        "echo [arg]"
    ];
    help.sort();

    output.append("Bash commands")

    for(var i = 0;i < help.length;i++){
        output.append("<p>" + help[i] + "</p>");
    }
}

//List all the folders and files in the current directory
function ls() {

}

//Echo text that the user provides
function echo(arg){
    console.log("echo command");
    console.log(arg);
    if(arg != null){
        output.append("<p>" + arg + "</p>");
    }
    else{

    }

}

//Clear the console
function clear(){
    console.log("clear command");
    output.empty();
}

//Add images to the page that revolve around the "ay lmao" meme
function ay(arg) {
    console.log("ay command");
    if(arg == "lmao"){
        output.append('<img height="500px" src="https://lh6.googleusercontent.com/-QNfycKTbXDc/VzN7nl1I4xI/AAAAAAAAAR4/96nRKsbGr5Qhm0WMMWxZbChjOUhiVgR8wCL0B/w776-h875-no/2016-05-11.png">');
    }
    else if(arg == "la mayo"){
        output.append('<img height="500px" src="https://40.media.tumblr.com/6fa311e06dae0cc061f9670e76819ca2/tumblr_n9mx2fTr7e1sxfvy5o1_1280.png">');
    }
    else{
        output.append("<p>'ay' requires an argument</p>");
    }
}