import React from 'react';

export default class TextArea extends React.Component {

    constructor() {
        super();

        this.state = {};

        this.onKeyUp = this.onKeyUp.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
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

    render() {
        const inputholder = `${this.props.holderClasses} input-holder`;

        return (
            <div className={inputholder}>

                <textarea id={this.props.id} className={this.props.classes} placeholder={this.props.placeholder}
                          defaultValue={this.props.value}
                          cols={this.props.cols} rows={this.props.rows}
                          onKeyUp={this.onKeyUp} onKeyDown={this.onKeyDown}
                          onChange={this.onChange} onFocus={this.onFocus}
                          onBlur={this.onBlur} readOnly={this.props.readOnly ? this.props.readOnly : false}>
                </textarea>

                {(this.props.label) ? (
                    <label htmlFor={this.props.id}>
                        {this.props.label}
                    </label>
                ) : null}

            </div>
        );
    }
}
