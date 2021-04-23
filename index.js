const Discord = require("discord.js");
const Filesystem = require("fs");
const Request = require("./node_modules/request/request.js");

const TOKEN = "MzQyMzAzOTE3MDA0MjkyMDk2.DGTvQw.jtuMVq6WdEK2lLLN_bnpnWDRAts";
const PREFIX = "./";

var bot = new Discord.Client(); //mozda treba .bot


function fileOpen(path)
{
    Filesystem.open(path, "r+", function (err, fd) {
        if (err)
        {
            console.log("fileOpen (" + path + ") Error: " + err);
            return false;
        } else
        {
            return fd;
        }
    }
    );
}

function fileClose(path)
{
    Filesystem.close(path, function(err)
    {
        if (err)
        {
            console.log("fileClose (" + path + ") Error: " + err);
            return false;
        } else {
            return true;
        }
    }
    );
}

function fileCreate(path)
{
    //Filesystem.writeFile(path)
}

function fileDelete(path)
{

}

function fileRead(path)
{

}

function fileWrite(path, data, bOverwrite)
{
    Filesystem.appendFile(path, data, function (err) {
        if (!err) {
            return true;
        } else {
            console.log("fileWrite (" + path + ") failed to write, Error: " + err);
            return false;
        }
    }
    );
}

function fileExists(path)
{
    Filesystem.stat(path, function(err, stat)
    {
        if (err == null) {
            return true;
        } else if (err.code == "ENOENT") {
            return false;
        } else {
            console.log("fileExists (" + path + ") Error: " + err);
            return false;
        }
    }
    );
}

function isMentionedUser(s)
{
    return (s && s.startsWith("<@") ? true : false);
}

function getUserFromMessage(msg, data)
{
    
    if (msg && data)
    {

        // Pogledaj jeli data ima <@, ako ima makni ta govna da samo id ostane
        if (data.startsWith("<@")) { data = data.substr(2, data.length - 3); }

        if (msg.channel.guild.members.find("id", data))
        {
            return msg.channel.guild.members.find("id", data);
        } else {
            if (msg.channel.guild.members.find("username", data))
            {
                return msg.channel.guild.members.find("username", data);
            }
        }
    }
}

function LOG(str, sCustomPath)
{
    try {
        fileWrite(sCustomPath ? sCustomPath : "script.log", str);
    }catch(e)
    {
        console.log("LOG Error: (str = " + str + "), Error: " + e);
    }
}

function getTime()
{
    var time = new Date();
    var second = time.getSeconds(), minute = time.getMinutes(), hour = time.getHours(), day = time.getDate(), month = time.getMonth() + 1, year = time.getFullYear();
    return hour + ":" + minute + ":" + second;
}

function getDate()
{
    var time = new Date();
    var second = time.getSeconds(), minute = time.getMinutes(), hour = time.getHours(), day = time.getDate(), month = time.getMonth() + 1, year = time.getFullYear();
    return day + "." + month + "." + year;
}

function downloadImage(link, dtype)
{
    try {
        Request.get(link, function (response) {
            if (response.statusCode === 200) {
                Filesystem.write("download." + dtype, response.body, function () {
                    console.log("Success!");
                }
                );
            } else {
                console.log("Error Downloading: " + response.statusCode);
            }
        }
        );
    }catch(e)
    {
        console.log("Request Error: " + e);
    }
}

downloadImage("https://upload.wikimedia.org/wikipedia/commons/e/e0/JPEG_example_JPG_RIP_050.jpg", "jpg");

bot.on("ready", function () {
    console.log("[" + Date() + "] Milan Bandiæ has been born.");
}
);

bot.on("message", function (message) {

    if (message.author.equals(bot.user)) return; // nemoj logirat ono sto bot pise

    console.log("[" + getDate() + " " + getTime() + "] (" + message.channel.name + ") " + message.author.username + ": " + message.content);

    try {
        fileWrite("console.log", "[" + getDate() + " " + getTime() + "] (" + message.channel.name + ") " + message.author.username + ": " + message.content + "\n");
    } catch(e)
    {
        console.log("Failed to log message, Error: " + e);
    }

    // Ako tekst nije komanda nemoj ovo dolje executat
    if (!message.content.startsWith(PREFIX)) return;

    // argumenti ubaèeni u komandu
    var args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0].toLowerCase())
    {

        case "hello":
            message.channel.send("World");
            break;

        case "avatar":
            if (!args[1]) {
                message.channel.send(message.author.avatarURL);
            } else {
                var user = args[1];
                message.channel.send("${args[1]}");
            }
            
            break;

        case "scan":
            // ako ima username
            //if (args[1] && args[1].startsWith("<@")) {
            if (isMentionedUser(args[1])) {
              
                var userdata = args[1].substr(2, args[1].length - 3);
                var user = getUserFromMessage(message, userdata);

                if (!user) {
                    console.log("Cannot find user, message = " + message + ", userdata = " + userdata);
                }

                break;

            }

        case "random":

            var num = Math.floor(Math.random()) * 100 + Math.floor(Math.random() + 3 * 249 / Math.random());

            message.channel.send(num);

            break;
   
        case "time":

            var time = new Date();
            var second = time.getSeconds(), minute = time.getMinutes(), hour = time.getHours(), day = time.getDate(), month = time.getMonth() + 1, year = time.getFullYear();

            message.channel.send("Current time: " + hour + ":" + minute + ":" + second);

            break;

        case "date":

            var time = new Date();
            var second = time.getSeconds(), minute = time.getMinutes(), hour = time.getHours(), day = time.getDate(), month = time.getMonth() + 1, year = time.getFullYear();

            message.channel.send("Current date: " + day + "." + month + "." + year);

            break;

        case "vrijeme":

            var time = new Date();
            var second = time.getSeconds(), minute = time.getMinutes(), hour = time.getHours(), day = time.getDate(), month = time.getMonth() + 1, year = time.getFullYear();

            message.channel.send("Vrijeme: " + hour + ":" + minute + ":" + second);

            break;

        case "datum":

            var time = new Date();
            var second = time.getSeconds(), minute = time.getMinutes(), hour = time.getHours(), day = time.getDate(), month = time.getMonth() + 1, year = time.getFullYear();

            message.channel.send("Datum: " + day + "." + month + "." + year);

            break;

    }
}
);

bot.login(TOKEN);