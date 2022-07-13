import './App.css';
import React, { useEffect, useState } from 'react';
import data from '../data.json';
import Form from './Form/Form';
import MyMap from './Map/Map';

const App = () => {
	const [markers, setMarkers] = useState(data);
	const [countIndividuals, setCountIndividuals] = useState(
		markers.length > 6 ? 6 : 2,
	);

	useEffect(() => {
		setPaths(generateOriginalPaths());
		// if (markers.length > 6) {
		// 	setCountIndividuals(6);
		// }
		// else {
		// 	setCountIndividuals(2);
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [markers]);

	const generateMinPath = () => {
		if (markers.length < 3) return null;

		console.log('Пути между пунктами', paths);

		console.log('Созданные особи', individuals);
	};

	// Генерация расстояний между двумя точками
	const generateOriginalPaths = () => {
		let masPaths = [];

		for (let i = 0; i < markers.length; i++) {
			const itemFrom = markers[i];
			for (let j = 0; j < markers.length; j++) {
				const itemTo = markers[j];

				if (itemFrom === itemTo) continue;

				if (
					masPaths.find(
						(item) =>
							item.from === itemTo.name &&
							item.to === itemFrom.name,
					)
				) {
					continue;
				}

				const path = {
					from: itemFrom.name,
					to: itemTo.name,
					len: Math.sqrt(
						(itemTo.position[0] - itemFrom.position[0]) ** 2 +
							(itemTo.position[1] - itemFrom.position[1]) ** 2,
					),
				};
				masPaths.push(path);
			}
		}

		return masPaths;
	};

	// Пути между парами точек
	const [paths, setPaths] = useState(() => {
		return generateOriginalPaths();
	});

	const getRandomInt = (max) => {
		return Math.floor(Math.random() * max);
	};

	// Вычисление длины пути
	const generateLenIndividual = (path) => {
		let len = 0;
		let pointFrom = path[0];
		for (let i = 1; i < path.length; i++) {
			const pointTo = path[i];

			len +=
				paths?.find(
					(item) =>
						(item.from === pointFrom && item.to === pointTo) ||
						(item.from === pointTo && item.to === pointFrom),
				)?.len || 0;

			pointFrom = pointTo;
		}
		return len;
	};

	// Изначальная генерация одной особи
	const generateOriginalIndividual = () => {
		let individual = [1];
		while (individual.length < markers.length) {
			const item = getRandomInt(markers.length) + 1;
			if (!individual.includes(item)) {
				individual.push(item);
			}
		}
		individual.push(1);
		return individual;
	};

	// Изначальная генерация популяции
	const generateOriginalIndividuals = () => {
		let initIndividuals = [];
		while (initIndividuals.length < countIndividuals) {
			const path = generateOriginalIndividual();
			const len = generateLenIndividual(path);
			initIndividuals.push({ path, len });
		}
		return initIndividuals;
	};

	// Популяция
	const [individuals, setIndividuals] = useState(() => {
		return generateOriginalIndividuals();
	});

	return (
		<>
			<Form
				setMarkers={setMarkers}
				generateMinPath={generateMinPath}
				countIndividuals={countIndividuals}
			/>
			<MyMap markers={markers} setMarkers={setMarkers} />
		</>
	);
};

export default App;
