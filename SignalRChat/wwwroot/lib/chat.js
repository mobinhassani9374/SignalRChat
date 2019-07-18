/// <reference path="signalr/dist/browser/signalr.js" />
var name;
var connection;
function saveName() {
    name = document.getElementById("txtName").value;
    document.getElementById("intro").style.display = "none";
    document.getElementById("wellcome").style.display = "block";
    document.getElementById("sendMessage").style.display = "block";
    document.getElementById("wellcome-name").innerHTML = name;
    hubInit();
}
function hubInit() {

    connection = new signalR.HubConnectionBuilder().withUrl("/chat").build();

    connection.on("Join", function (name) {
        document.getElementById("allMessage").innerHTML += "<p style='color:red;'>" + name + " به چت پیوست . </p > ";
    });

    connection.on("ReceiveMessage", function (name, message) {
        document.getElementById("allMessage").innerHTML += "<p style='color:green;'>" + name + ": " + message + " </p > ";
    });

    connection.start().then(function () {
        connection.invoke("Join", name);

    }).catch(function (err) {
        alert(err);
    });
}
function send() {
    var message = document.getElementById("txtMessage").value;
    document.getElementById("txtMessage").value = "";
    connection.invoke("SendMessage", name, message);
    document.getElementById("allMessage").innerHTML += "<p style='color:blue;'>" + name + ": " + message + " </p > ";
}