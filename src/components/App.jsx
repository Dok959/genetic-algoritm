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
	const [gapPoint, setGapPoint] = useState(3);

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

	const getRandomInt = (max) => {
		return Math.floor(Math.random() * max);
	};

	// Формирование пар для размножения
	const generatePair = () => {
		let father;
		let mather;
		while (true) {
			const temp = getRandomInt(population.length);
			if (population[temp].reproduction) continue;

			if (father === undefined) father = population[temp];
			else if (father !== population[temp]) {
				mather = population[temp];
			}

			if (father !== undefined && mather !== undefined) break;
		}

		return { father, mather };
	};

	// Смена флага на разрешение участия в размножении
	const switchReproduction = (individual) => {
		individual.reproduction = !individual.reproduction;
	};

	// Генерация пути потомка
	const generateChild = (args) => {
		const { father, mather, swap } = args;
		let parrentOne, parrentTwo;

		if (swap) {
			parrentOne = mather;
			parrentTwo = father;
		} else {
			parrentOne = father;
			parrentTwo = mather;
		}

		let individual = parrentOne.path.slice(0, gapPoint);
		while (individual.length < markers.length) {
			parrentTwo.path.map((/** @type {Number} */ el) => {
				if (!individual.includes(el)) {
					individual.push(el);
				}
				return null;
			});
		}
		individual.push(1);
		return individual;
	};

	// Генерация пар потомков
	const reproduction = (args) => {
		const { father, mather } = args;
		let swap = false;
		let childs = [];
		let individualOne = generateChild({ father, mather, swap });
		swap = true;
		let individualTwo = generateChild({ father, mather, swap });
		childs.push({
			path: individualOne,
			len: generateLenIndividual(individualOne),
			reproduction: false,
		});
		childs.push({
			path: individualTwo,
			len: generateLenIndividual(individualTwo),
			reproduction: false,
		});
		return childs;
	};

	// Генерация точек разрыва
	const generatePointGap = (len) => {
		while (true) {
			const pointOne = getRandomInt(len);
			const pointTwo = getRandomInt(len);

			if (
				Math.abs(pointOne - pointTwo) <= 1 ||
				Math.abs(pointTwo - pointOne) <= 1
			) {
				continue;
			}

			if (pointOne < pointTwo) {
				return [pointOne, pointTwo];
			} else {
				return [pointTwo, pointOne];
			}
		}
	};

	// Мутация потомка
	// [x] возможно не будет перещитываться длина пути
	const generateMutation = (individual) => {
		const [pointOne, pointTwo] = generatePointGap(individual.path.length);
		let reverse = individual.path.slice(pointOne, pointTwo).reverse();
		individual.path = [
			...individual.path.slice(0, pointOne),
			...individual.path.splice(
				pointOne,
				pointTwo - pointOne,
				...reverse,
			),
			...individual.path.slice(pointTwo),
		];
	};

	// Запуск процедуры мутации потомков
	const mutations = (newPopulation) => {
		for (let index = 0; index < newPopulation.length; index++) {
			generateMutation(newPopulation[index]);
		}
	};

	// Скрещивание
	const crossing = () => {
		const newPopulation = [];
		while (population.find((item) => item.reproduction === false)) {
			const { father, mather } = generatePair();
			switchReproduction(father);
			switchReproduction(mather);
			newPopulation.push(...reproduction({ father, mather }));
		}
		return newPopulation;
	};

	const generateMinPath = () => {
		if (markers.length < 3) return null;

		// console.log('Пути между пунктами', paths);

		console.log('Начальная популяция', population);

		const newPopulation = crossing();
		console.log('Созданные потомки', newPopulation);

		mutations(newPopulation);
		console.log('Мутации проведены', newPopulation);

		// TODO отбор лучших, повторение операций
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

	// Вычисление длины пути
	const generateLenIndividual = (path) => {
		let len = 0;
		let pointFrom = path[0];
		for (let i = 1; i < path.length; i++) {
			const pointTo = path[i];

			len +=
				paths?.find(
					// eslint-disable-next-line no-loop-func
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
			initIndividuals.push({ path, len, reproduction: false });
		}
		return initIndividuals;
	};

	// Популяция
	const [population, setPopulation] = useState(() => {
		return generateOriginalIndividuals();
	});

	return (
		<>
			<Form
				setMarkers={setMarkers}
				generateMinPath={generateMinPath}
				countIndividuals={countIndividuals}
				gapPoint={gapPoint}
			/>
			<MyMap markers={markers} setMarkers={setMarkers} />
		</>
	);
};

export default App;
