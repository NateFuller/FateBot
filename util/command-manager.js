var constants = require("./config/constants.json");
var coolingDown = false

var commandMap = {
	"about": {
		execute: about,
		modOnly: false
	},
	"twitter": {
		execute: twitter,
		modOnly: false
	}
};

function perform(client, cmdStr, user) {
	if (coolingDown) { return; }
	beginCooldownTimer()

	var command = commandMap[cmdStr];
	if (command) {
		if (!command.modOnly || user.mod) {
			command.execute(client);
		}
	}
}

function about(client) {
	client.say(constants.CHANNEL, "My name is Nate. I'm 23 years old. Ball is life.");
}

function twitter(client) {
	client.say(constants.CHANNEL, "https://twitter.com/fatenuller");
}

function beginCooldownTimer() {
	coolingDown = true;
	setTimeout(() => {
		coolingDown = false;
	}, constants.COOLDOWN * 1000);
}

module.exports = {
	perform: perform
};
