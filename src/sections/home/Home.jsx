import React, { useEffect } from 'react';

const Home = () => {
	useEffect(() => {
		window.myLandbot = new window.LandbotFrameWidget({
			container: '#myLandbot',
			// index: 'https://landbot.io/u/H-278074-YMM3YI18XURUT4ZC/index.html'
			index: 'https://landbot.io/u/H-352449-0FUSBHW4UB7ABE4N/index.html'
		});
		window.myLandbot.on('sendToLogin', data => {
			console.log('wtf', data);
			window.location.href = data;
		});
	});

	return <div id="myLandbot" style={{ width: '100%', height: '100%' }}></div>;
};

export default Home;
