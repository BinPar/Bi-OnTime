import React from 'react';

export default class SelectableList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.changeEvent = this.changeEvent.bind(this);
    }

	changeEvent(e) {
		if (this.props.onChange != undefined) {
			/*
			let index = e.nativeEvent.target.selectedIndex;
			console.log("texto select: " + e.nativeEvent.target[index].text);
			console.log("valor select: " + e.target.value);
			*/
			this.props.onChange(e);
		}
	}

	render() {
		return (
			<div id={this.props.selectListId} className="selectable-list">
				<select multiple onChange={this.changeEvent} value={this.props.value}>
					{(this.props.selectables)?(
						this.props.selectables.map((o, i)=>{
							return <option key={i} value={o.value}>{o.name}</option>
						})
					):null}
				</select>
			</div>
		)
	}
}
