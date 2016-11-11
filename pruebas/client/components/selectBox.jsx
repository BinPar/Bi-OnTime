import React from 'react';

export default class SelectBox extends React.Component {

	constructor(props) {
		super(props);

		this.state = {};

		this.onClick = this.onClick.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onClick(e) {
		if (this.props.onClick != undefined) {
			this.props.onClick(e);
		}
	}

	onChange(e) {
		if (this.props.onChange != undefined) {
			this.props.onChange(e);
		}
	}

	render() {
		return (

			<div id={this.props.selectBoxId} className="select-box">
				<select id={this.props.selectListId} onChange={this.onChange} onClick={this.onClick} defaultValue={this.props.selected ? this.props.selected : null}>
					{this.props.selectables ?
						this.props.selectables.map((o, i)=> {
							return o ?
								<option key={i} value={o.value}>{o.name}</option>
								: null
						}) : null}
				</select>
			</div>
		)

	}

}
