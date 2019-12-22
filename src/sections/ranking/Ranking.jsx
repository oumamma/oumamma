import React, { useEffect, useState } from 'react';
import fetch from 'node-fetch';
import './Ranking.scss';
//import SpreadsheetService from '../../services/spreadsheets/SpreadsheetService';
import SpreadsheetService from './authRanking'

const Ranking = () => {
	const [money, setMoney] = useState([{}]);
	const [fuck, setFuck] = useState([{}]);

	// useEffect(() => {
	// 	fetch(`http://localhost:4000/home`)
	// 		.then(res => res.json())
	// 		.then(res => {
	// 			console.log(res.get.data);
	// 			const [...OBJ] = res.get.data;
	// 			const money = [...OBJ];
	// 			const fuck = [...OBJ];

	// 			setMoney(money);
	// 			setFuck(fuck);
	// 		});
	// }, []);

	const getEntries = async () => {
		await SpreadsheetService.getInfoSheets().then(res => {return res});
	};
	getEntries();

	/*	const [...OBJ] = fakeRank
		const money = [...OBJ]
		const fuck = [...OBJ]*/

	const orderFuck = fuck.sort(function(a, b) {
		if (a.Fuck > b.Fuck) {
			return -1;
		}
		if (a.Fuck < b.Fuck) {
			return 1;
		}

		return 0;
	});

	const orderMoney = money.sort(function(a, b) {
		if (a.Money > b.Money) {
			return -1;
		}
		if (a.Money < b.Money) {
			return 1;
		}

		return 0;
	});

	return (
		<div className="ranking">
			<div className="toiler-paper-container">
				<div className="left-toilet-paper-bg">
					<div className="left-toilet-paper-content">
						<div className="img-container">
							<img src="/money.png"></img>
						</div>
						<div className="ranking-list">
							{orderMoney.map((result, indx) => (
								<div className="ranking-list-element">
									<div className="ranking-list-element-position">{indx} </div>
									<div className="ranking-list-element-name">{result.Name}</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="center"></div>
				<div className="right-toilet-paper-bg">
					<div className="right-toilet-paper-content">
						<div className="img-container">
							<img src="/fuck.png"></img>
						</div>
						<div className="ranking-list">
							{orderFuck.map((result, indx) => (
								<div className="ranking-list-element">
									<div className="ranking-list-element-position">{indx} </div>
									<div className="ranking-list-element-name">{result.Name}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Ranking;
