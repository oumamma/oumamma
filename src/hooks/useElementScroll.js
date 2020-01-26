import { useState, useEffect, useRef } from 'react';

export default function useElementScroll() {
	const ref = useRef(null);

	const [maxLeft, setMaxLeft] = useState(true);
	const [maxRight, setMaxRight] = useState(false);

	useEffect(() => {
		function handleScroll() {
			setMaxLeft(ref.current.scrollLeft === 0);
			setMaxRight(ref.current.scrollLeft === ref.current.scrollWidth / 2);
		}

		const current = ref.current;

		current.addEventListener('scroll', handleScroll);
		return () => current.removeEventListener('scroll', handleScroll);
	}, [ref]);

	return { ref, maxLeft, maxRight };
}
