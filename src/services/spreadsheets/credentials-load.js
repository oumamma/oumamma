const { google } = require('googleapis');

//load credentials some how...
if (process.env.REFRESH_TOKEN === '...') {
	throw "Please run 'node credentials-fill.js'";
}

//prepare oauth2 client
const auth = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	'urn:ietf:wg:oauth:2.0:oob'
);
auth.setCredentials({
	access_token: 'DUMMY',
	expiry_date: 1,
	refresh_token: process.env.REFRESH_TOKEN,
	token_type: 'Bearer'
});

module.exports = auth;