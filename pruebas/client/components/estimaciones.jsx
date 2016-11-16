import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Loading from '../components/loading';
import Estimacion from '../components/estimacion';
import {Table} from 'react-bootstrap';

export default class Estimaciones extends TrackerReact(React.Component) {
    constructor(props) {
        super(props);

        this.state = {
            issuesLoaded: false
        };

        this.issues = null;
    }

    componentWillMount() {
        if (Meteor.userId()) {
            GH.getIssues((err, res) => {
                if (err) {
                    console.error(err.reason);
                } else {
                    console.log("org issues", res);
                    this.issues = res;
                    this.setState({issuesLoaded: true});
                }
            });
        }
    }

    render() {
        if (!Meteor.userId()) {
            return <div>No tienes acceso.</div>;
        }

        if (!this.state.issuesLoaded) {
            return <Loading/>;
        }

        return <div>
            <Table responsive striped hover>
                <thead>
                <tr>
                    <th>Repository</th>
                    <th>Issue</th>
                    <th>Labels</th>
                    <th>Created by</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.issues.map((is, i) => {
                        return <Estimacion key={i} issue={is}/>
                    })
                }
                </tbody>
            </Table>
        </div>;
    }
}
