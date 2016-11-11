import React from 'react';

export default class Aside extends React.Component {

	constructor() {
		super();

		this.state = {
			expanded: true
		};
 
		this.menuClick = this.menuClick.bind(this);
	}

	render() {
		return (

			<aside className={this.state.expanded ? "expanded" : null}>
				<header>
					<a onClick={this.goTo.bind(this, "")} title="Home">
						<h1>
							Aage Hempel
						</h1>
					</a>
				</header>

				<a className="menu" onClick={this.menuClick}><span><i>Menu</i></span></a>

				<nav>
					<ul>
						<li>
							<a onClick={this.goTo.bind(this, "userList")} title="Access Control" className="">
								Access Control
							</a>

							<ul>
								<li>
									<a onClick={this.goTo.bind(this, "userList")} title="User List">
										User List
									</a>
								</li>
								<li>
									<a onClick={this.goTo.bind(this, "newUser")} title="New User">
										New User
									</a>
								</li>
							</ul>
						</li>

						<li>
							<a onClick={this.goTo.bind(this, "vessels")} title="Vessels">
								Vessels
							</a>
						</li>
						
						<li>
							<a onClick={this.goTo.bind(this, "serviceRequest")} title="Service Request">
								Service Request
							</a>
						</li>

						<li>
							<a onClick={this.goTo.bind(this, "profile")}>
								Profile
							</a>
						</li>

						<li>
							<a onClick={this.goTo.bind(this, "logout")}>
								Logout
								<i className="material-icons"></i>
							</a>
						</li>

					</ul>
				</nav>

			</aside>

		);
	}

	menuClick(e) {
		this.setState({expanded: !this.state.expanded});
	}

	goTo(url) {
		FlowRouter.go(`/${url}`);
		this.setState({expanded: false});
	}
}
