import React from 'react';
import ranking from './ranking'

const Ranking = () => {
	console.log(ranking)
	let info;
	return (
		<div>
			<h1>Ranking!</h1>
			<div>{ranking.info.map((res) => {
				console.log(res)
				return <div >
					<div > <h5>Sexo: </h5> {res.Sexo} </div>
					<div > <h5> Dinero: </h5> {res.Dinero}</div>
				</div>
			})}
			</div>
		</div>
	);
};

export default Ranking;
