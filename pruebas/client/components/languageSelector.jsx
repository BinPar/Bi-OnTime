import React from "react";
import Select from "react-select";

export default class LanguageSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            language: TAPi18n.getLanguage()
        };

        this._languageChanged = this._languageChanged.bind(this);
        this._renderOption = this._renderOption.bind(this);
    }

    render() {
        return (
            <div className="languageSelector" style={this.props.style}>
                <Select name="select-language"
                        options={this._getLanguages()}
                        onChange={this._languageChanged}
                        placeholder={__("menu.language")}
                        searchable={false}
                        clearable={false}
                        optionRenderer={this._renderOption}
                        valueRenderer={this._renderOption}
                        value={this.state.language}
                        style={{cursor: "pointer"}}
                        {...utils.translation.getSelectStrings()}
                />
            </div>
        );
    }

    _getLanguages() {
        let langs = Object.keys(TAPi18n.getLanguages());

        return langs.map((l) => {
            return {
                value: l,
                label: l
            }
        });
    }

    _renderOption(option) {
        return (
            <span className={`flag-icon flag-icon-${this._getFlagCode(option.value)}`}>
				<div style={{paddingLeft: "35px", marginTop: "-16px"}}>
					{option.label}
				</div>
			</span>
        );
    }

    _getFlagCode(code) {
        switch (code) {
            case "en":
                return "gb";

            default:
                return code;
        }
    }

    _languageChanged(item) {
        localStorage.setItem("language", item.value);
        Session.set("showLoadingIndicator", true);

        TAPi18n.setLanguage(item.value)
            .done(() => {
                Session.set("showLoadingIndicator", false);
                this.setState({language: item.value});
                utils.refreshTitle();
                FlowRouter.reload();
            })
            .fail((err) => {
                console.log(err);
            });
    }
}
