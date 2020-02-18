
$('document').ready(function() {
    var token = localStorage.getItem('token');
    var socket = io('http://127.0.0.1:5000');
    socket.on('connect', function(){
    });
    socket.on('game', function(data){
        console.log(data);
    });
    socket.on('disconnect', function(){
    });
    
    $("#new_game").on('click', function() {
        console.log("new game button clicked");
        socket.emit('new_game', { 'token': token });
    });
});

