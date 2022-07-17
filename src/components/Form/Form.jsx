import React from 'react';
import './Form.css';

const Form = (props) => {
	const {
		setMarkers,
		generateMinPath,
		countIndividuals,
		setCountIndividuals,
		gapPoint,
		setGapPoint,
		generations,
		setGenerations,
		retry,
		setRetry,
	} = props;

	return (
		<section>
			<div className="Form">
				<header className="Form-header">
					<h3>Генетический алгоритм в задаче коммивояжера</h3>
					<p>Вы можете добавить новые точки кликами на карте</p>
					<div className="block-remove">
						Для удаления всех маркеров нажмите на кнопку
						<button
							type="button"
							className="my-btn"
							onClick={() => setMarkers([])}
						>
							Очистить карту
						</button>
					</div>

					<h4>Параметры для рассчета</h4>
					<div className="block-remove settings">
						Количество отбираемых особей {countIndividuals}
						<div>
							<button
								type="button"
								className="my-btn pair"
								onClick={() => {
									if (countIndividuals > 2)
										setCountIndividuals(
											countIndividuals - 1,
										);
								}}
							>
								Уменьшить
							</button>
							<button
								type="button"
								className="my-btn"
								onClick={() =>
									setCountIndividuals(countIndividuals + 1)
								}
							>
								Увеличить
							</button>
						</div>
					</div>

					<div className="block-remove settings">
						Количество генерируемых поколений {generations}
						<div>
							<button
								type="button"
								className="my-btn pair"
								onClick={() => {
									if (generations > 1)
										setGenerations(generations - 1);
								}}
							>
								Уменьшить
							</button>
							<button
								type="button"
								className="my-btn"
								onClick={() => setGenerations(generations + 1)}
							>
								Увеличить
							</button>
						</div>
					</div>

					<div className="block-remove settings">
						Величина точки разрыва {gapPoint} для скрещивания
						<div>
							<button
								type="button"
								className="my-btn pair"
								onClick={() => {
									if (gapPoint > 1) setGapPoint(gapPoint - 1);
								}}
							>
								Уменьшить
							</button>
							<button
								type="button"
								className="my-btn"
								onClick={() => setGapPoint(gapPoint + 1)}
							>
								Увеличить
							</button>
						</div>
					</div>

					<div className="block-remove settings">
						Количество повторений лучшего пути {retry.maxCount}
						<div>
							<button
								type="button"
								className="my-btn pair"
								onClick={() => {
									if (retry.maxCount > 1)
										setRetry({
											individual: {},
											count: 0,
											maxCount: retry.maxCount - 1,
										});
								}}
							>
								Уменьшить
							</button>
							<button
								type="button"
								className="my-btn"
								onClick={() =>
									setRetry({
										individual: {},
										count: 0,
										maxCount: retry.maxCount + 1,
									})
								}
							>
								Увеличить
							</button>
						</div>
					</div>

					<p className="block-remove">
						Вычистить кратчайший путь
						<button
							type="button"
							className="my-btn"
							onClick={() => generateMinPath()}
						>
							Рассчитать
						</button>
					</p>
				</header>
			</div>
		</section>
	);
};

export default Form;
