
import React, { useEffect, useState } from 'react';
import fakeRank from './fakeRank.json';
import fetch from 'node-fetch'

const Ranking = () => {
	
	const [money, setMoney] = useState([{}])
	const [fuck, setFuck] = useState([{}])

	useEffect(() => {
	  fetch(`http://localhost:8000/home`)
		.then(res => res.json())
		.then(res => {
		const [...OBJ] = res.data
		const money = [...OBJ]
		const fuck = [...OBJ]
			console.log(res.data)
		  setMoney(money)
		  setFuck(fuck)
		})

		
	},[]);
	
/*	const [...OBJ] = fakeRank
		const money = [...OBJ]
		const fuck = [...OBJ]*/

		const orderFuck = fuck.sort(function (a, b) {
		
			if (a.Fuck > b.Fuck) {
				return -1;
			}
			if (a.Fuck < b.Fuck) {
				return 1;
			}
	
			return 0;
		})

		

		const orderMoney = money.sort(function (a, b) {
			if (a.Money > b.Money) {
				return -1;
			}
			if (a.Money < b.Money) {
				return 1;
			}
	
			return 0;
		})
	

	
	


	return (
		<div>
			<h1>Ranking!</h1>
			<div></div>

				<div>
				<h2>How much you kick the peluche ? </h2> 
					<div>
						{
							orderFuck.map((result,indx) => {
								 return <tr>{result.Name + " " + parseInt(indx + 1 ) }</tr>
							})
						}

					</div>
				</div>
				<div>
					<h2>Show me the fucking money!</h2>
					<div>
						{
							orderMoney.map((res, indx) => {
								return <tr>{res.Name + " " + parseInt(indx + 1 )}</tr>
							})
						}

					</div>

				</div>


			</div>
		
	);
};

export default Ranking;
