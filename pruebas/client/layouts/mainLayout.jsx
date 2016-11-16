import React from 'react';
import Loading from '../components/loading';
import Login from '../components/login';

export default class EmptyLayout extends React.Component {

	constructor() {
		super();

		this.state = {
			loading: !BP.ready
		};
	}

	componentDidMount() {
		if(!BP.ready) {
			BP.onLoad((()=> {
				this.setState({loading: false});
			}).bind(this));
		}
	}

	render() {
		if (this.state.loading) {
			return <Loading />;
		}

		return (
			<div>
				<div style={{margin: "10px"}}>
					<Login/>
				</div>

				{this.props.content}
			</div>
		)
	}
}
