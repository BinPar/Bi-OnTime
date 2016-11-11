import React from 'react';
import Loading from '../components/loading';

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
				{this.props.content}
			</div>
			)
	}
}
