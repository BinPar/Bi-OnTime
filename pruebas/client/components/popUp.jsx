import React from 'react';
import Button from '../components/button.jsx';

export default class PopUp extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			visible: false
		};

		this.hide = this.hide.bind(this);
	}

	show(title, text, onClose) {
		this.title = title;
		this.text = text;
		this.onClose = onClose;
		this.setState({visible: true});

		$('#popUpButton').focus();
	}

	hide() {
		this.setState({visible: false});
		if (this.onClose) {
			this.onClose();
		}
	}

	render() {

		return this.state.visible ?
			 <div className="pop-up">

				<div className="inner">

					<h2>
						{this.title}
					</h2>
					<p>
						{this.text}
					</p>

					<Button buttonId="popUpButton" buttonValue="OK" onClick={this.hide}  />
				</div>

			</div>
		: null;
	}
}
