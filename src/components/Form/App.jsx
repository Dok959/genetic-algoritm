import './App.css';
import React from 'react';
import data from '../../data.json';

const App = () => {
	return (
		<section>
			<div className="App">
				<header className="App-header">
					<h3>Генетический алгоритм в задаче коммивояжера</h3>
					<label>
						Ввод каких-то значений
						<input type="text" />
					</label>
					<button type="button">Рассчитать</button>
				</header>
			</div>
		</section>
	);
};

const generatePointMarkers = () => {
	const basePoints = data;
	console.log(basePoints[0]);
};

export default App;
