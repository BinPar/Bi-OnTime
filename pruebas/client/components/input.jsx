import React from 'react';

export default class Input extends React.Component {

	constructor() {
		super();

		this.state = {};

		this.inputRef = null;

		this.onKeyUp = this.onKeyUp.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClickInputI = this.onClickInputI.bind(this);
        this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.setInputRef = this.setInputRef.bind(this);
	}

	onKeyUp(e){
		if (this.props.keyUp != undefined) {
			this.props.keyUp(e.target.value);
		}
	}

	onKeyDown(e) {
		if (this.props.onKeyDown != undefined) {
			this.props.onKeyDown(e);
		}
	}

	onChange(e) {
		if (this.props.onChange != undefined) {
			this.props.onChange(e);
		}
	}

	onClickInputI(e) {
		if (this.props.onClickI != undefined) {
			this.props.onClickI(e);
		}
	}

	onFocus(e) {
	    if (this.props.onFocus != undefined) {
	        this.props.onFocus(e);
        }
    }

	onBlur(e) {
		if (this.props.onBlur != undefined) {
			this.props.onBlur(e);
		}
	}

	// método que asigna la referencia al input
	setInputRef(inputRef) {
		this.inputRef = inputRef;
	}

	// método que devuelve la referencia al input asignada
	getInnerInput() {
		return this.inputRef;
	}
	
	render() {
		const inputholder = `${this.props.inputHolderClasses} input-holder`;

		return (
			this.props.controlled ?
				<div className={inputholder}>
					<input type={this.props.inputType}
						   id={this.props.inputId} className={this.props.inputClasses}
						   value={this.props.inputValue} placeholder={this.props.inputPlaceholder}
						   onKeyUp={this.onKeyUp} onKeyDown={this.onKeyDown}
						   onChange={this.onChange}
                           onFocus={this.onFocus}
						   onBlur={this.onBlur}
						   readOnly={this.props.readOnly ? this.props.readOnly : false}
						   multiple={this.props.multiple ? this.props.multiple : false}
						   ref={this.setInputRef} />

					{(this.props.inputLabel)?(
						<label htmlFor={this.props.inputId}>
							{this.props.inputLabel}
						</label>
					):null}

					{(this.props.inputI)?(
						<i id="input-i-id" className="input-i" onClick={this.onClickInputI}>{this.props.inputI}</i>
					):null}
				</div>
				:
				<div className={inputholder}>
					<input type={this.props.inputType}
						   id={this.props.inputId} className={this.props.inputClasses}
						   defaultValue={this.props.inputValue} placeholder={this.props.inputPlaceholder}
						   onKeyUp={this.onKeyUp} onKeyDown={this.onKeyDown}
						   onChange={this.onChange}
                           onFocus={this.onFocus}
						   onBlur={this.onBlur}
						   readOnly={this.props.readOnly ? this.props.readOnly : false}
						   multiple={this.props.multiple ? this.props.multiple : false}
						   ref={this.setInputRef} />

					{(this.props.inputLabel)?(
						<label htmlFor={this.props.inputId}>
							{this.props.inputLabel}
						</label>
					):null}

					{(this.props.inputI)?(
						<i id="input-i-id"  className="input-i" onClick={this.onClickInputI} style={{cursor: "pointer"}}>

							{(this.props.inputEm)?(
								<em>{this.props.inputEm}</em>
							):null}

							{this.props.inputI}

						</i>
					):null}

				</div>
		)
	}
}