import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Header extends TrackerReact(React.Component) {

	goHome() {
		//location.href="/";
		FlowRouter.go("/");
	}

	render() {
		return (
			<div className="header">
				<a onClick={this.goHome.bind(this)} >
					<div className="logo">
						AAGE HEMPEL GROUP
					</div>
				</a>
			</div>
		);
	}
}
