// https://about-time-2357.twil.io/fdbr?key=abc&description=Testing
exports.handler = function(context, event, callback) {
	let sync = Runtime.getSync({serviceName: context.SYNC_DB_SID});
	let payload = {
		description: event.description
	};
	sync.documents.create({
		uniqueName: event.key,
		data: payload
	}).then(function(response) {
		console.log(response);
		callback(null);
	});
};

// https://about-time-2357.twil.io/fdbr?key=abc
exports.handler = function(context, event, callback) {
    const sync = Runtime.getSync({serviceName: context.SYNC_DB_SID});
    sync.documents(event.key)
        .fetch()
        .then(response => {
            console.log(response.data);
            callback(null, response.data);
        })
        .catch(error => {
            console.error(error.message);
            callback(null, {message: "not found."});
        });
};
