import React, { useEffect, useState, useCallback } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import useElementScroll from '../../hooks/useElementScroll';
import SpreadsheetService from '../../services/spreadsheets/SpreadsheetService';
import Loading from '../Loading';
import './Ranking.scss';

const Ranking = () => {
	const [loading, setLoading] = useState(true);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
	const [money, setMoney] = useState([]);
	const [fuck, setFuck] = useState([]);

	const { width } = useWindowDimensions();
	const { ref: container, maxLeft, maxRight } = useElementScroll();

	useEffect(() => {
		setIsMobile(width < 600);
	}, [width]);

	useEffect(() => {
		SpreadsheetService.getRanking().then(res => {
			let moneyList = [...res];
			moneyList = moneyList.sort((a, b) => (+a.Dinero < +b.Dinero ? 1 : -1));
			setMoney(moneyList);

			let fuckList = [...res];
			fuckList = fuckList.sort((a, b) => (+a.Sexo < +b.Sexo ? 1 : -1));
			setFuck(fuckList);

			setLoading(false);
		});
	}, []);

	const scrollRight = useCallback(() => {
		container.current.scrollLeft = container.current.scrollWidth;
	}, [container]);

	const scrollLeft = useCallback(() => {
		container.current.scrollLeft = 0;
	}, [container]);

	return (
		<div className="ranking">
			<div className="logo">
				<img src="/logo.png" alt="logo" />
			</div>
			<div ref={container} className="toilet-paper-scroll-container">
				<div className="toilet-paper-container">
					<div className="left-toilet-paper-bg">
						<div className="left-toilet-paper-content">
							{loading ? (
								<Loading></Loading>
							) : (
								<>
									<div className="img-container">
										<img src="/money.png" alt="Pray for money"></img>
									</div>
									<div className="ranking-list">
										{money.map((result, index) => (
											<div
												className="ranking-list-element"
												key={`${index}${result['Nombre red social']}`}
											>
												<div className="ranking-list-element-position cool-font">
													{index + 1}
												</div>
												<div className="ranking-list-element-name">
													{result['Nombre red social']}
												</div>
											</div>
										))}
									</div>
								</>
							)}
						</div>
					</div>
					{isMobile && maxLeft && (
						<div className="scroll-arrow right" onClick={scrollRight}>
							{'>'}
						</div>
					)}
					<div className="center">
						<div className="social-share-container">
							{!isMobile && (
								<>
									<a href="javascript:void(0)" className="social twitter-big">
										Twitter
									</a>

									<a href="javascript:void(0)" className="social facebook-big">
										Facebook
									</a>
								</>
							)}
						</div>
					</div>

					{isMobile && maxRight && (
						<div className="scroll-arrow left" onClick={scrollLeft}>
							{'<'}
						</div>
					)}
					<div className="right-toilet-paper-bg">
						<div className="right-toilet-paper-content">
							{loading ? (
								<Loading></Loading>
							) : (
								<>
									<div className="img-container">
										<img src="/fuck.png" alt="fuck"></img>
									</div>
									<div className="ranking-list">
										{fuck.map((result, index) => (
											<div
												className="ranking-list-element"
												key={`${index}${result['Nombre red social']}`}
											>
												<div className="ranking-list-element-position cool-font">
													{index + 1}
												</div>
												<div className="ranking-list-element-name">
													{result['Nombre red social']}
												</div>
											</div>
										))}
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
			{isMobile && (
				<div className="social-share-mobile-container">
					<a href="javascript:void(0)" className="social twitter-small">
						Twitter
					</a>
					<a href="javascript:void(0)" className="social facebook-small">
						Facebook
					</a>
				</div>
			)}
		</div>
	);
};

export default Ranking;
