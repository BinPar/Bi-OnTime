import React from 'react';
import Estimaciones from '../components/estimaciones';

export default class Index extends React.Component {

	constructor() {
		super();
	}

	componentWillMount() {
		document.title = "Pruebas conexión github";
	}

	render() {
		return (
			<section className="index">
				
				<header>
					<h2>Home</h2>
				</header>

				<Estimaciones />

			</section>
		)
	}
}
