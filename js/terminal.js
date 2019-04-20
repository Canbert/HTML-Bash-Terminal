/*
* TERMINAL CLASS
* */
class Terminal{

    constructor(user){
        this.user = user;
        this.previousCommands = '#previous-commands';
    }

    startText(){
        return "<p>HTML-Bash-Terminal</p></br><p>HTML-Bash-Terminal login: " + this.user + " (automatic login)</p>";
    }

    beginCmd(){
        return "<span style='color: red'>" + this.user + "</span>@HTML-Bash-Terminal:$ ";
    }

    //Add the output to the terminal with padded "<p>" tags
    printLine(out) {
        if(out == null){
            $(this.previousCommands).append("</br>");
        }
        else{
            $(this.previousCommands).append("<p>" + out + "</p>");
        }
    }

    //Add the output to the terminal with no tags
    print(out) {
        if(out == null){
            $(this.previousCommands).append("</br>");
        }
        else{
            $(this.previousCommands).append(out);
        }
    }
}