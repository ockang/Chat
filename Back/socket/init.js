'use strict'

var users = {}  


module.exports.connect = (io) => {


	io.on('connection', (client, username) => {
        
		client.on('set-nickname', (user) => {
			client.handshake.name = user;
			users[user] = user;
			//updateClients();

		});


		client.on('add-message', (message) => {
		    io.emit('message', message);    
		});

		client.on('disconnect', function () {
			
			delete users[client.handshake.name];
	        updateClients(); 
	    });


		
		function updateClients() {	
	        io.sockets.emit('listmap', users);
	    }
		

	});


}