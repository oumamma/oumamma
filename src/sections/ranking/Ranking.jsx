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
		SpreadsheetService.getRanking().then(res => {
			const moneyList = [...res]
				.map(elem => ({
					...elem,
					Dinero: formatMoney(elem)
				}))
				.filter(x => !isNaN(x.Dinero))
				.sort((a, b) => (a.Dinero < b.Dinero ? 1 : -1));
			setMoney(moneyList);
			setMyMoneyPosition(moneyList.findIndex(isMyRow));

			const fuckList = [...res]
				.map(elem => ({
					...elem,
					Sexo: formatSex(elem)
				}))
				.filter(x => !isNaN(x.Sexo))
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

	const formatMoney = useCallback(row => {
		return row.Dinero ? parseFloat(row.Dinero.replace(/\./g, '')) : undefined;
	}, []);

	const formatSex = useCallback(row => {
		return row.Sexo ? parseFloat(row.Sexo.replace(/\./g, '')) : undefined;
	}, []);

	const scrollRight = useCallback(() => {
		container.current.scrollLeft = container.current.scrollWidth;
	}, [container]);

	const scrollLeft = useCallback(() => {
		container.current.scrollLeft = 0;
	}, [container]);

	const isMyRow = useCallback(row => {
		return loginId && row['ID red social'] === loginId;
	}, []);

	const isFamous = useCallback(row => {
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
											key={`${index}${result['ID red social']}`}
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
												marginBlockEnd: '0'
											}}
										>
											SHARE:
										</h1>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-around',
												width: '100%'
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
											key={`${index}${result['Nombre red social'] ||
												result['Nombre']}`}
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
