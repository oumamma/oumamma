import React from 'react';

const TwitterShare = ({ location }) => {
	return (
		<a
			className="social twitter-round"
			// href="https://twitter.com/intent/tweet?text=Ou%20Mamma"
			href={`https://twitter.com/intent/tweet?original_referer=${encodeURI(
				'https://oumamma.com' + location.pathname
			)}&ref_src=twsrc%5Etfw&text=${`Madafakas!! Mirad mi puesto en el @oumamma_ranking 🤘

			¿Cuál es el vuestro losers?`}&tw_p=tweetbutton&url=${encodeURI(
				'https://oumamma.com' + location.pathname
			)}`}
		>
			Tweet
		</a>
	);
};

export default TwitterShare;
