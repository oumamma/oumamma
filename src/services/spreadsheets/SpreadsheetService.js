class SpreadsheetService {
	updateRow(landbotId, loginId, loginType, loginName) {
		fetch('https://hooks.zapier.com/hooks/catch/5877074/ou9yg0j/', {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
				landbotId,
				loginId,
				loginType,
				loginName
			}), // data can be `string` or {object}!
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers':
					'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
			}
		})
			.then(res => res.json())
			.catch(error => console.error('Error:', error))
			.then(response => console.log('Success:', response));
	}

	async getEntries() {
		const gapi = window.gapi;
		await gapi.auth2.getAuthInstance().signIn();
		gapi.client.sheets.spreadsheets.values
			.get({
				spreadsheetId: '1DDbnsGxLsPAJIQflI7jNet3INpeEJ2yh5hUZOpVc7w8'
			})
			.then(res => res.json())
			.catch(error => console.error('Error:', error))
			.then(response => console.log('Success:', response));
	}
}

export default new SpreadsheetService();
