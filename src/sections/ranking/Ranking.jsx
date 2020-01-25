import React, { useEffect, useState } from 'react';
import './Ranking.scss';
import SpreadsheetService from '../../services/spreadsheets/SpreadsheetService';
import Loading from '../Loading';

const Ranking = () => {
	const [loading, setLoading] = useState(true);
	const [money, setMoney] = useState([]);
	const [fuck, setFuck] = useState([]);

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

	return (
		<div className="ranking">
			<div className="toiler-paper-container">
				<div className="left-toilet-paper-bg">
					<div className="left-toilet-paper-content">
						{loading ? (
							<Loading></Loading>
						) : (
							<>
								<div className="img-container">
									<img src="/money.png"></img>
								</div>
								<div className="ranking-list">
									{money.map((result, index) => (
										<div
											className="ranking-list-element"
											key={`${index}${result['Nombre red social']}`}
										>
											<div className="ranking-list-element-position">
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
				<div className="center"></div>
				<div className="right-toilet-paper-bg">
					<div className="right-toilet-paper-content">
						{loading ? (
							<Loading></Loading>
						) : (
							<>
								<div className="img-container">
									<img src="/fuck.png"></img>
								</div>
								<div className="ranking-list">
									{fuck.map((result, index) => (
										<div
											className="ranking-list-element"
											key={`${index}${result['Nombre red social']}`}
										>
											<div className="ranking-list-element-position">
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
	);
};

export default Ranking;
