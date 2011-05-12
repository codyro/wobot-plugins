// Simple nslookup plugin. Resolves a given hostname.

var dns = require('dns');

module.exports.load = function(bot) {
  bot.on('message', onMessage);
};

module.exports.unload = function(bot) {
  bot.removeListener('message', onMessage);
};

var onMessage = function(channel, from, message) {
  var matches = message.match(/^\!nslookup (.*)$/i);
  var ret = "";
  var self = this;
  if (!matches) return false;

  dns.resolve4(matches[1], function(err, addresses) {
	if (err) {
		self.message(channel, '@' + from.split(' ')[0] + ' ' + 'Error with lookup!');
		return true;
	}

	addresses.forEach(function (address) {
		ret += address + " ";
	});

	self.message(channel, '@' + from.split(' ')[0] + ' DNS Lookup: ' + ret);
  });

  return true;
};
