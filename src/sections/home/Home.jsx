import React, { useEffect } from 'react';

const Home = () => {
	useEffect(() => {
		window.myLandbot = new window.LandbotFrameWidget({
			container: '#myLandbot',
			index: 'https://landbot.io/u/H-406891-4QTTZU2266FA6HCP/index.html'
		});
		window.myLandbot.on('sendToLogin', data => {
			window.location.href = data;
		});
	});

	return <div id="myLandbot" style={{ width: '100%', height: '100%' }}></div>;
};

export default Home;
