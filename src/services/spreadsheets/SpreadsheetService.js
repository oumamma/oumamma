class SpreadsheetService {
	updateRow(landbotId, loginId, loginType, loginName) {
		fetch('https://us-central1-oumamma-56c90.cloudfunctions.net/getRanking', {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
				landbotId,
				loginId,
				loginName,
				loginType
			}), // data can be `string` or {object}!
			headers: {
				'Content-Type': 'application/json'
			}
			// mode: 'no-cors',
			// headers: {
			// 	'Content-Type': 'application/json',
			// 	'Access-Control-Allow-Origin': '*',
			// 	'Access-Control-Allow-Headers':
			// 		'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
			// }
		})
			// .then(res => {
			// 	console.log(res);
			// 	res.json();
			// })
			.catch(error => console.error('Error:', error))
			.then(response => true);
	}

	getRanking() {
		const url =
			'https://us-central1-oumamma-56c90.cloudfunctions.net/getRanking';
		const options = {
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers':
					'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
			}
		};
		return fetch(url, options).then(function(response) {
			if (response.ok) {
				return response.json();
			} else {
				console.log('Respuesta de red KO.');
			}
		});
	}
}

export default new SpreadsheetService();
