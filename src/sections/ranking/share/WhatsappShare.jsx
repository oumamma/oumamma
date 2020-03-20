import React from 'react';

const WhatsappShare = ({ location, isMobile }) => {
	const baseUrl = isMobile
		? 'whatsapp://send'
		: 'https://web.whatsapp.com/send';
	return (
		<a
			className="social whatsapp-round"
			href={`${baseUrl}?text=Ouuu mamma! ${encodeURI(
				'https://oumamma.com' + location.pathname
			)}`}
			target="_blank"
			data-action="share/whatsapp/share"
		>
			Share via Whatsapp
		</a>

		// <a
		// 	class="social facebook-round"
		// 	target="_blank"
		// 	href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(
		// 		'https://oumamma.com' + location.pathname
		// 	)}`}
		// 	// class="fb-xfbml-parse-ignore social facebook-small"
		// 	// style={{
		// 	// 	width: '76px',
		// 	// 	height: '28px',
		// 	// 	margin: '0 auto'
		// 	// }}
		// >
		// 	Share
		// </a>
	);
};

export default WhatsappShare;
