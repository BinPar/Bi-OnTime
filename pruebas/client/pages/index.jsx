import React from 'react';
import Estimaciones from '../components/estimaciones';
import {Tabs, Tab} from 'react-bootstrap';

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

				{Meteor.userId() &&
					<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
						<Tab eventKey={1} title="Estimaciones">
							<Estimaciones />
						</Tab>
						<Tab eventKey={2} title="No imputable"></Tab>
						<Tab eventKey={3} title="Planificación"></Tab>
					</Tabs>
				}

			</section>
		);
	}
}
