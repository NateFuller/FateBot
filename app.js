var tmi = require('tmi.js');

var CommandManager = require('./util/command-manager.js');
var ProfanityManager = require('./util/profanity-manager.js');

var constants = require('./constants.json');

var options = {
	options: {
		debug: true
	},
	connection: {
		cluster: "aws",
		reconnect: true
	},
	identity: {
		username: "RoboFate",
		password: process.env.TWITCH_API_KEY
	},
	channels: [constants.CHANNEL]
};

var client = new tmi.client(options);
client.connect();

// Someone used (/me <message>) in chat.
client.on('action', function(channel, user, message, self) {
	if (self) return;
});

// GET BANNED.
client.on('ban', function(channel, username, reason) {

});

// Someone's talking in chat.
client.on('chat', function(channel, user, message, self) {
	if (self) return;

	if (ProfanityManager.messageIsProfane(message)) {
		ProfanityManager.timeout(client, user);
	}

	var parts = message.split(" ");

	if (parts[0].charAt(0) === '!' && parts[0].substring(1).length > 0) {
		var command = parts[0].substring(1);
		CommandManager.perform(client, command, user);
	}
});

// Bot connected to the IRC channel.
client.on('connected', function(address, port) {
	console.log("Address: " + address + " Port: " + port);
	client.action(constants.CHANNEL, " has connected to chat.");
});

// Bot disconnected from the IRC channel.
client.on('disconnected', function(reason) {
	console.log("Disconnected from Twitch IRC. Reason >>>");
	console.log("\t" + reason);
	client.action(constants.CHANNEL, " has disconnected from chat.");
});

// Someone joined your channel - say hi to them, you pleb.
client.on('join', function(channel, username, self) {
	if (self) return;
	client.whisper(constants.OWNER, username + " has entered the stream.");
});

client.on('notice', function(channel, msgid, message) {
	console.log(msgid);
	if (msgid === "msg_censored_broadcaster") {
		console.log("CENSORED MESSAGE: " + message);
	}
});

// Someone joined your channel - say hi to them, you pleb.
client.on('part', function(channel, username, self) {
	if (self) return;
	client.whisper(constants.OWNER, username + " has left the stream.");
});

// HYPE - Someone subbed to you. LIT FAM!?
client.on('subscription', function(channel, username, method, message, userstate) {

});
