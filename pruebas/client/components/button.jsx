import React from 'react';

export default class Button extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};
		this.onClick = this.onClick.bind(this);
	}

	onClick(e){
		if (this.props.onClick != undefined) {
			this.props.onClick(e);
		}
	}

	render() {
		const buttonholder = `${this.props.buttonHolderClasses} button-holder`;
		return (
			<div className={buttonholder}>
				<button type="button" id={this.props.buttonId} onClick={this.onClick} className={this.props.buttonClasses}>

					{this.props.buttonValue}

					{(this.props.buttonI)?(
						<i>
							{this.props.buttonI}
						</i>
					):null}
				</button>
			</div>
		)
	}
}
