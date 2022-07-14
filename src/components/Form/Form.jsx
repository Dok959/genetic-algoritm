import React from 'react';
import './Form.css';

const Form = (props) => {
	const { setMarkers, generateMinPath, countIndividuals, gapPoint } = props;

	return (
		<section>
			<div className="Form">
				<header className="Form-header">
					<h3>Генетический алгоритм в задаче коммивояжера</h3>
					<p>Вы можете добавить новые точки кликами на карте</p>
					<p className="block-remove">
						Для удаления всех маркеров нажмите на кноку
						<button
							type="button"
							className="my-btn"
							onClick={() => setMarkers([])}
						>
							Очистить карту
						</button>
					</p>

					<hr />

					<h4>Параметры для рассчета</h4>
					{/* TODO редактирование параметров */}
					<p>Количество отбираемых особей {countIndividuals}</p>
					<p>Величина точки разрыва {gapPoint}</p>

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
