import React, { useEffect } from 'react';
import SpreadsheetService from '../../services/spreadsheets/SpreadsheetService';

const Home = ({ history }) => {
	useEffect(() => {
		window.myLandbot = new window.LandbotFrameWidget({
			container: '#myLandbot',
			index: 'https://landbot.io/u/H-406891-4QTTZU2266FA6HCP/index.html',
		});
		window.myLandbot.on('formFinished', (data) => {
			SpreadsheetService.saveDataInMemory(data);
			history.push('/login');
		});
	});

	return <div id="myLandbot" style={{ width: '100%', height: '100%' }}></div>;
};

export default Home;
