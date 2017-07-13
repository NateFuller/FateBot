var profanityDictionary = require('./profanities.json');
var constants = require('./constants.json');
var messages = require('./messages.json');

function containsProfanity(message) {
	var simpleString = message.replace(/\s/g,'').toLowerCase();

	if (simpleString.includes("***")) {
		return true;
	}

	for (var i = 0; i < profanityDictionary.length; i++) {
		if (simpleString.includes(profanityDictionary[i])) {
			return true;
		}
	}

	return false;
}

function timeout(client, user) {
	client.timeout(constants.CHANNEL, user.username, 300, messages.TIMEOUT_PROFANITY).then(function(data) {
		console.log(data);
	}).catch(function(err) {
		console.log("ERR: " + err);
	});
}

module.exports = {
	messageIsProfane: containsProfanity,
	timeout: timeout
};
