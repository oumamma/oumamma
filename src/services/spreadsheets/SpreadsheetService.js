class SpreadsheetService {
	constructor() {
		this._lsKey = 'landbot_data';
		// this.host = 'http://localhost:5000/oumamma-56c90/us-central1/getRanking';
		this.host =
			'https://us-central1-oumamma-56c90.cloudfunctions.net/getRanking';
	}

	saveDataInMemory(data) {
		localStorage.setItem(this._lsKey, JSON.stringify(data));
	}

	chatData() {
		try {
			return JSON.parse(localStorage.getItem(this._lsKey));
		} catch (e) {
			console.log(e);
			return undefined;
		}
	}

	updateRow(loginId, loginType, loginName) {
		const data = {
			...this.chatData(),
			loginId,
			loginType,
			loginName,
		};
		return fetch(this.host, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(data),
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers':
					'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
			},
		})
			.catch((error) => console.error('Error:', error))
			.then((response) => {
				// localStorage.removeItem(this._lsKey);
			});
	}

	getRanking() {
		const url = this.host;
		const options = {
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers':
					'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
			},
		};
		return fetch(url, options).then(function (response) {
			if (response.ok) {
				return response.json();
			} else {
				console.log('Respuesta de red KO.');
			}
		});
	}
}

export default new SpreadsheetService();
