import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class NoPermissions extends TrackerReact(React.Component) {
    render() {
        return (<div style={{"width": "100%", "textAlign": "center"}}>You are not authorized to view this page.</div>)
    }
}
