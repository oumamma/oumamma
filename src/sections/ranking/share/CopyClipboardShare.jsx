import React, { useState, useCallback, useEffect } from 'react';

const CopyClipboardShare = () => {
	const [copySuccess, setCopySuccess] = useState('');

	useEffect(() => {
		setTimeout(() => setCopySuccess(''), 2000);
	}, [copySuccess]);

	const copyToClipboard = useCallback(e => {
		var tempInput = document.createElement('input');
		tempInput.style = 'position: absolute; left: -1000px; top: -1000px';
		tempInput.value = window.location.href;
		document.body.appendChild(tempInput);
		tempInput.select();
		document.execCommand('copy');
		document.body.removeChild(tempInput);
		setCopySuccess('Link copiado!');
	}, []);

	return (
		<>
			{document.queryCommandSupported('copy') && (
				<>
					{!copySuccess && (
						<button
							className="social link-round"
							onClick={copyToClipboard}
						></button>
					)}
					{copySuccess && (
						<span style={{ right: 0, fontSize: '10px' }}>COPIADO!</span>
					)}
				</>
			)}
		</>
	);
};

export default CopyClipboardShare;
