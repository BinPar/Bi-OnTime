import React from 'react';

export default class LoginLayout extends React.Component {

    constructor() {
        super();

        this.state = {};

        if (Meteor.userId()) {
            //console.log("Logged in user: " + Meteor.userId());
            //location.href = "/";
        }
    }

    render() {
        return (
            <div className="main-container">
                <div className="main-content login">
                    <div className="section-content">
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }
}
