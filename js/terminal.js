$(function(){
    $("#terminal").click(function(){
        $("#terminal #command")[0].focus();
    });

    var evaluateCommand = function(cmd){
        if(cmd.trim() == "" || cmd == null)return [];
        re = [];
        if(cmd == 'help'){
            re.push("about - displays information about Phase One");
            re.push("contact - displays contact information");
        }
        else if(cmd == 'about'){
            re.push("Phase one is blablabla");
        }
        else if(cmd == 'contact'){
            re.push("Contact us at");
            re.push("Phone:");
            re.push("Email:");
            re.push("Twitter:");
            re.push("Facebook:");
        }else if(cmd == "more welcome.txt"){
            re.push("Welcome to Phase One!");
            re.push("For a list of commands type 'help'");
        }else if(cmd == "ls"){
            re.push("welcome.txt");
        }else if(cmd == "cd"){
            re.push("`cd` access denied");
        }else if(cmd.startsWith("sudo")){
            re.push("`sudo` access denied")
        }else{
            re.push("Invalid command. Enter \"help\" for a list of commands.");
        }
        return re;
    }

    $("#command").keypress(function(event){
        if(event.which == 13){
            event.preventDefault();
            //show the command and make it uneditable
            var x = "<div class='sentcommend'>";
            x += $("#precommand").html() + " ";
            x += $("#command").html().trim();
            x += "</div>"
            $(x).insertBefore($("#precommand"));

            //evaluate the command and print the result
            res = evaluateCommand($("#command").html().trim());
            x = "";
            for(i in res){
                x += "<div class='response'>"+res[i]+"</div>";
            }
            $(x).insertBefore($("#precommand"));
            $("#terminal")[0].scrollTop = $("#terminal")[0].scrollHeight;
            $("#command").html("");
        }
    });
});
