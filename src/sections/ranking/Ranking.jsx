import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import useElementScroll from '../../hooks/useElementScroll';
import SpreadsheetService from '../../services/spreadsheets/SpreadsheetService';
import Loading from '../Loading';
import './Ranking.scss';
import TwitterShare from './TwitterShare';
import FacebookShare from './FacebookShare';

const Ranking = () => {
	const location = useLocation();
	const { loginId } = useParams();

	const [loading, setLoading] = useState(true);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
	const [money, setMoney] = useState([]);
	const [myMoneyPosition, setMyMoneyPosition] = useState(0);
	const [fuck, setFuck] = useState([]);
	const [myFuckPosition, setMyFuckPosition] = useState(0);

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
			</div>
			<div ref={container} className="toilet-paper-scroll-container">
				<div className="toilet-paper-container">
					<div className="left-toilet-paper-bg">
						<div className="left-toilet-paper-content">
							<div className="img-container">
								<img src="/money.png" alt="Pray for money"></img>
							</div>
							<div ref={moneyListElem} className="ranking-list">
								{money.length > 0 ? (
									money.map((result, index) => (
										<div
											key={`${index}${result['ID red social']}`}
											className={`ranking-list-element ${
												isMyRow(result) ? 'my-element' : ''
											}`}
										>
											<div className="ranking-list-element-position cool-font">
												{index + 1}
											</div>
											<div
												className={`ranking-list-element-name ${
													isFamous(result) ? 'famous' : ''
												}`}
											>
												{result['Nombre red social']}
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
						<div className="scroll-arrow right" onClick={scrollRight}></div>
					)}
					<div className="center">
						<div className="social-share-container">
							{!isMobile && (
								<>
									<div>
										<h1
											style={{
												fontWeight: 'bold',
												fontSize: '50px',
												marginBlockEnd: '0'
											}}
										>
											SHARE:
										</h1>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												width: '100%'
											}}
										>
											<TwitterShare location={location}></TwitterShare>
											<FacebookShare location={location}></FacebookShare>
										</div>
									</div>
									<img src="/icon_broncano.png" className="broncano-img"></img>
									<h3>Y si quieres posturear ya sabes screenshot + share</h3>
									<h3>
										Y etiquétanos <b>@OUMAMMA_RANKING</b> que lo mismo te llevas
										una sorpresa
									</h3>
								</>
							)}
						</div>
					</div>

					{isMobile && maxRight && (
						<div className="scroll-arrow left" onClick={scrollLeft}></div>
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
											key={`${index}${result['Nombre red social']}`}
											className={`ranking-list-element ${
												isMyRow(result) ? 'my-element' : ''
											}`}
										>
											<div className="ranking-list-element-position cool-font">
												{index + 1}
											</div>
											<div
												className={`ranking-list-element-name ${
													isFamous(result) ? 'famous' : ''
												}`}
											>
												{result['Nombre red social']}
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
			{isMobile && (
				<div className="social-share-container">
					<h1 style={{ fontWeight: 'bold' }}>SHARE:</h1>
					<div className="social-share-mobile-container">
						<TwitterShare location={location}></TwitterShare>
						<FacebookShare location={location}></FacebookShare>
					</div>
				</div>
			)}
		</div>
	);
};

export default Ranking;
