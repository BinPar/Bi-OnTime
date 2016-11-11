import React from 'react';
import {ControlLabel, FormGroup, FormControl, Glyphicon, InputGroup, ButtonGroup, Button, Label, Panel} from 'react-bootstrap';

export default class Estimacion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showPanel: null,
            durationValue: null,
            requestValue: null
        };

        this.miniTaskClick = this.miniTaskClick.bind(this);

        this.estimationClick = this.estimationClick.bind(this);
        this.onBlurDuration = this.onBlurDuration.bind(this);
        this.saveEstimation = this.saveEstimation.bind(this);

        this.moreInfoClick = this.moreInfoClick.bind(this);
        this.onBlurMoreInfo = this.onBlurMoreInfo.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    }

    render() {
        const ISSUE = this.props.issue;

        return <tr>

            <td><a href={ISSUE.repository.html_url}>{ISSUE.repository.name}</a></td>

            <td><a href={ISSUE.html_url}>{ISSUE.title}</a></td>

            <td>
                {
                    ISSUE.labels.length > 0 ?
                        ISSUE.labels.map((label, i) => {
                            const R = parseInt(label.color.substring(0, 2), 16);
                            const G = parseInt(label.color.substring(2, 4), 16);
                            const B = parseInt(label.color.substring(4, 6), 16);

                            return <Label key={i} style={{
                                backgroundColor: `#${label.color}`,
                                color: Math.round((R * 299 + G * 587 + B * 114) / 1000) > 125 ? "black" : "white",
                                marginRight: "4px"
                            }}>{label.name}</Label>
                        })
                        :
                        null
                }
            </td>

            <td>
                <img src={ISSUE.user.avatar_url} height="20" width="20"/>
                <a style={{marginLeft: "4px"}} href={ISSUE.user.html_url}>{ISSUE.user.login}</a>
            </td>

            <td>{utils.formatDateTime(new Date(ISSUE.created_at))}</td>

            <td>
                <ButtonGroup>
                    <Button onClick={this.miniTaskClick}>Minitarea</Button>
                    <Button onClick={this.estimationClick}>Estimar</Button>
                    <Button onClick={this.moreInfoClick}>Necesito más info.</Button>
                </ButtonGroup>

                {this.state.showPanel == "estimation" ?
                    <FormGroup controlId="estimationGroup">
                        <ControlLabel>Estimation</ControlLabel>
                        <InputGroup>
                            <FormControl type="text"
                                         onBlur={this.onBlurDuration}
                            />

                            <InputGroup.Addon>
                                <Glyphicon glyph="time" />
                            </InputGroup.Addon>
                        </InputGroup>

                        <Button onClick={this.saveEstimation}>
                            Save
                        </Button>
                    </FormGroup>
                    : null
                }

                {this.state.showPanel == "moreInfo" ?
                    <FormGroup controlId="moreInfoGroup">
                        <ControlLabel>Request more info</ControlLabel>

                        <FormControl componentClass="textarea"
                                     placeholder="Request details..."
                                     onBlur={this.onBlurMoreInfo}
                        />

                        <Button onClick={this.sendRequest}>
                            Send
                        </Button>
                    </FormGroup>
                    : null
                }
            </td>

        </tr>;
    }

    miniTaskClick() {
        const ISSUE = this.props.issue;

        GH.estimateTask(ISSUE.repository.name, ISSUE.number, 0.5, (err, res) => {
            if (err) {
                alert("Error: " + err.reason);
            } else {
                console.log("ok", res);
                FlowRouter.reload();
            }
        });
    }

    saveEstimation() {
        const DURATION = this.state.durationValue.replace(",", ".");

        if (!isNaN(DURATION)) {
            const ISSUE = this.props.issue;

            GH.estimateTask(ISSUE.repository.name, ISSUE.number, parseFloat(DURATION), (err, res) => {
                if (err) {
                    alert("Error: " + err.reason);
                } else {
                    console.log("ok", res);
                    FlowRouter.reload();
                }
            });
        } else {
            alert("Valor no válido en duración.");
        }
    }

    sendRequest() {
        const ISSUE = this.props.issue;

        GH.needMoreInfo(ISSUE.repository.name, ISSUE.number, this.state.requestValue, (err, res) => {
            if (err) {
                alert("Error: " + err.reason);
            } else {
                console.log("ok", res);
                FlowRouter.reload();
            }
        });
    }

    estimationClick() {
        this.setState({
            showPanel: this.state.showPanel != "estimation" ? "estimation" : null
        });
    }

    moreInfoClick() {
        this.setState({
            showPanel: this.state.showPanel != "moreInfo" ? "moreInfo" : null
        });
    }

    onBlurDuration(e) {
        this.setState({
            durationValue: e.target.value
        });
    }

    onBlurMoreInfo(e) {
        this.setState({
            requestValue: e.target.value
        });
    }
}
