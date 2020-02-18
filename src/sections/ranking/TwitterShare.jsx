import React from 'react';

const TwitterShare = ({ location }) => {
	return (
		<a
			class="social twitter-round"
			// href="https://twitter.com/intent/tweet?text=Ou%20Mamma"
			href={`https://twitter.com/intent/tweet?original_referer=${encodeURI(
				'https://oumamma.com' + location.pathname
			)}&ref_src=twsrc%5Etfw&text=${'Ou mamma!'}&tw_p=tweetbutton&url=${encodeURI(
				'https://oumamma.com' + location.pathname
			)}`}
		>
			Tweet
		</a>
	);
};

export default TwitterShare;
