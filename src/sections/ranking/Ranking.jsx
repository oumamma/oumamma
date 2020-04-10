import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import useElementScroll from '../../hooks/useElementScroll';
import SpreadsheetService from '../../services/spreadsheets/SpreadsheetService';
import AuthService from '../../services/auth/AuthService';
import Loading from '../Loading';
import './Ranking.scss';
import TwitterShare from './share/TwitterShare';
import FacebookShare from './share/FacebookShare';
import WhatsappShare from './share/WhatsappShare';
import CopyClipboardShare from './share/CopyClipboardShare';

const Ranking = () => {
	const location = useLocation();
	const { loginId } = useParams();

	const [loading, setLoading] = useState(true);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
	const [money, setMoney] = useState([]);
	// const [filterMoney, setFilterMoney] = useState();
	// const [filteredMoney, setFilteredMoney] = useState([]);
	const [myMoneyPosition, setMyMoneyPosition] = useState(0);
	const [fuck, setFuck] = useState([]);
	const [myFuckPosition, setMyFuckPosition] = useState(0);
	// const [filterFuck, setFilterFuck] = useState();
	// const [filteredFuck, setFilteredFuck] = useState([]);

	const { width } = useWindowDimensions();
	const { ref: container, maxLeft, maxRight } = useElementScroll();

	useEffect(() => {
		setIsMobile(width < 600);
	}, [width]);

	useEffect(() => {
		SpreadsheetService.getRanking().then((res) => {
			const moneyList = [...res]
				.map((elem) => ({
					...elem,
					Dinero: formatMoney(elem),
				}))
				.filter((x) => !isNaN(x.Dinero))
				.sort((a, b) => (a.Dinero < b.Dinero ? 1 : -1));
			setMoney(moneyList);
			setMyMoneyPosition(moneyList.findIndex(isMyRow));

			const fuckList = [...res]
				.map((elem) => ({
					...elem,
					Sexo: formatSex(elem),
				}))
				.filter((x) => !isNaN(x.Sexo))
				.sort((a, b) => (a.Sexo < b.Sexo ? 1 : -1));
			setFuck(fuckList);
			setMyFuckPosition(fuckList.findIndex(isMyRow));
			setLoading(false);
		});

		AuthService.signOut();
	}, []);

	const moneyListElem = useRef(null);
	const fuckListElem = useRef(null);

	const scrollRanking = useCallback((elem, percentile, total) => {
		const scrollVal = elem.scrollHeight * percentile;
		elem.scroll({ left: 0, top: scrollVal, behavior: 'smooth' });
	}, []);

	useEffect(() => {
		if (money.length === 0) return;
		if (!moneyListElem.current) return;

		const percentile = myMoneyPosition / money.length;
		scrollRanking(moneyListElem.current, percentile, money.length);
	}, [moneyListElem, myMoneyPosition]);

	useEffect(() => {
		if (fuck.length === 0) return;
		if (!fuckListElem.current) return;

		const percentile = myFuckPosition / fuck.length;
		scrollRanking(fuckListElem.current, percentile, fuck.length);
	}, [fuckListElem, myFuckPosition]);

	const formatMoney = useCallback((row) => {
		return row.Dinero ? parseFloat(row.Dinero.replace(/\./g, '')) : undefined;
	}, []);

	const formatSex = useCallback((row) => {
		return row.Sexo ? parseFloat(row.Sexo.replace(/\./g, '')) : undefined;
	}, []);

	const scrollRight = useCallback(() => {
		container.current.scrollLeft = container.current.scrollWidth;
	}, [container]);

	const scrollLeft = useCallback(() => {
		container.current.scrollLeft = 0;
	}, [container]);

	const isMyRow = useCallback((row) => {
		return loginId && row['loginid'] === loginId;
	}, []);

	const isFamous = useCallback((row) => {
		return row['Famoso'] === '1';
	}, []);

	return (
		<div className="ranking">
			<div className="logo">
				<img src="/logo.png" alt="logo" />

				{isMobile && (
					<>
						<Link to="/" className="social oumamma-big landing-button">
							Quiero mi entrevista!
						</Link>
						<div className="social-share-container">
							<div className="social-share-mobile">
								<h4 style={{ fontWeight: 'bold' }}>SHARE RANKING:</h4>
								<div className="social-share-mobile-container">
									<TwitterShare location={location}></TwitterShare>
									<FacebookShare location={location}></FacebookShare>
									<WhatsappShare
										location={location}
										isMobile={true}
									></WhatsappShare>
									<CopyClipboardShare location={location}></CopyClipboardShare>
								</div>
							</div>
							<div className="social-share-mobile-instagram">
								<div>
									Y si quieres posturear en
									<a
										className="ig-share-link"
										href={'https://instagram.com/oumammaranking'}
										target="_blank"
									>
										<span> Instagram</span>
									</a>
								</div>
								<div>
									screenshot + etiqueta
									<a
										className="ig-share-link"
										href={'https://instagram.com/oumammaranking'}
										target="_blank"
									>
										<span> @oumammaranking</span>
									</a>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
			<div ref={container} className="toilet-paper-scroll-container">
				<div className="toilet-paper-container">
					<div className="left-toilet-paper-bg">
						<div className="left-toilet-paper-content">
							<div className="img-container">
								<img src="/money.png" alt="Pray for money"></img>
							</div>
							{/* <input onChange={searchMoney}></input> */}
							<div ref={moneyListElem} className="ranking-list">
								{money.length > 0 ? (
									money.map((result, index) => (
										<div
											key={`${index}${result['loginid']}`}
											className={`ranking-list-element ${
												isMyRow(result) ? 'my-element' : ''
											} ${isFamous(result) ? 'famous' : ''}`}
										>
											<div className="ranking-list-element-position cool-font">
												{index + 1}
											</div>
											<div className={`ranking-list-element-name`}>
												{result['Nombre red social'] || result['Nombre']}
											</div>
											{isFamous(result) && (
												<div className="ranking-list-element-buttons-container">
													<a
														href={`https://es.wikipedia.org/?search=${result[
															'Nombre red social'
														].replace('', '+')}`}
														className="ranking-list-element-button"
														target="_blank"
													>
														<img
															width="25px"
															height="25px"
															src="data:image/png;base64,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"
															// src="/wikipedia.png"
															// src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Wikipedia_article_icon_BLACK.svg/1200px-Wikipedia_article_icon_BLACK.svg.png"
														></img>
													</a>
													{result['Youtube'] && (
														<a
															href={result['Youtube']}
															className="ranking-list-element-button"
															target="_blank"
														>
															<img
																width="25px"
																height="25px"
																// src="/youtube.png"
																src="https://seeklogo.net/wp-content/uploads/2016/06/YouTube-icon.png"
															></img>
														</a>
													)}
												</div>
											)}
										</div>
									))
								) : (
									<Loading></Loading>
								)}
							</div>
						</div>
					</div>
					{isMobile && maxLeft && (
						<div
							className={`scroll-arrow right ${
								money.length > 0 ? 'shake-right' : ''
							}`}
							onClick={scrollRight}
						></div>
					)}
					<div className="center">
						<div className="social-share-container">
							{!isMobile && (
								<>
									<div>
										<Link to="/" className="social oumamma-big landing-button">
											Quiero mi entrevista!
										</Link>
										<div></div>
									</div>
									{/* {loginId && money.length > 0 && (
										<div>
											<div className="img-container">
												<img src="/money.png" alt="Pray for money"></img>
											</div>
											{money.find(x => isMyRow(x)) ? (
												<div key="" className="ranking-list-element">
													<span className="cool-font">
														{money.indexOf(money.find(x => isMyRow(x))) + 1}
													</span>
													<span className="">de</span>
													<span className="cool-font"> {money.length} </span>
												</div>
											) : null}
											<div className="img-container">
												<img src="/fuck.png" alt="fuck"></img>
											</div>
											{fuck.find(x => isMyRow(x)) ? (
												<div key="" className="ranking-list-element">
													<span className="cool-font">
														{fuck.indexOf(fuck.find(x => isMyRow(x))) + 1}
													</span>
													<span className="">de</span>
													<span className="cool-font"> {fuck.length} </span>
												</div>
											) : null}
										</div>
									)} */}
									<div>
										<h1
											style={{
												fontWeight: 'bold',
												fontSize: '40px',
												marginBlockEnd: '0',
											}}
										>
											SHARE:
										</h1>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-around',
												width: '100%',
											}}
										>
											<TwitterShare location={location}></TwitterShare>
											<FacebookShare location={location}></FacebookShare>
											<WhatsappShare
												location={location}
												isMobile={false}
											></WhatsappShare>
											<CopyClipboardShare
												location={location}
											></CopyClipboardShare>
										</div>
										<h3>
											<span>Y si quieres posturear </span>
											<a
												className="ig-share-link"
												href={'https://instagram.com/oumammaranking'}
												target="_blank"
											>
												en IG
											</a>
											<span> ya sabes screenshot + share</span>
										</h3>
										<h3>
											<span>Y etiquétanos </span>
											<a
												className="ig-share-link"
												href={'https://instagram.com/oumammaranking'}
												target="_blank"
											>
												@oumammaranking
											</a>
											<span> que lo mismo te llevas una sorpresa</span>
										</h3>
									</div>
								</>
							)}
						</div>
					</div>

					{isMobile && maxRight && (
						<div
							className={`scroll-arrow left ${
								money.length > 0 ? 'shake-left' : ''
							}`}
							onClick={scrollLeft}
						></div>
					)}
					<div className="right-toilet-paper-bg">
						<div className="right-toilet-paper-content">
							<div className="img-container">
								<img src="/fuck.png" alt="fuck"></img>
							</div>
							<div ref={fuckListElem} className="ranking-list">
								{fuck.length > 0 ? (
									fuck.map((result, index) => (
										<div
											key={`${index}${
												result['Nombre red social'] || result['Nombre']
											}`}
											className={`ranking-list-element ${
												isMyRow(result) ? 'my-element' : ''
											} ${isFamous(result) ? 'famous' : ''}`}
										>
											<div className="ranking-list-element-position cool-font">
												{index + 1}
											</div>
											<div className={`ranking-list-element-name`}>
												{result['Nombre red social'] || result['Nombre']}
											</div>
											{isFamous(result) && (
												<a
													href={`https://es.wikipedia.org/?search=${result[
														'Nombre red social'
													].replace('', '+')}`}
													className="ranking-list-element-button"
													target="_blank"
												>
													<img
														width="25px"
														height="25px"
														src="/wikipedia.png"
													></img>
												</a>
											)}
										</div>
									))
								) : (
									<Loading></Loading>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Ranking;
