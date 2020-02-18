import React from 'react';

const FacebookShare = ({ location }) => {
	return (
		<a
			class="social facebook-round"
			target="_blank"
			href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
				'https://oumamma.com' + location.pathname
			)}`}
			// class="fb-xfbml-parse-ignore social facebook-small"
			// style={{
			// 	width: '76px',
			// 	height: '28px',
			// 	margin: '0 auto'
			// }}
		>
			Share
		</a>
	);
};

export default FacebookShare;
