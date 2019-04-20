class History{
    constructor(){
        this.history = [];
    }

    add(cmd){
        this.history[this.history.length] = cmd;
    }

    print(){
        console.log("hello");
    }

}