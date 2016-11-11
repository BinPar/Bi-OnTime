import React from 'react';

export default class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            error: null
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    render() {
        let user = Meteor.user();

        return user ?
            <div>Hola, {user.profile.name} - <a href='#' onClick={this.logout}>Cerrar sesión</a></div>
            :
            <div>Usuario no identificado - <a href="#" onClick={this.login}>Iniciar sesión</a></div>;
    }

    login() {
        let callBackSettings = Meteor.settings.public.oAuth.github;

        Meteor.loginWithGithub({
                requestPermissions: ['user', 'public_repo', 'repo', 'admin:org', 'notifications', 'admin:repo_hook'],
                redirectUrl: Meteor.isDevelopment ? callBackSettings.localCallBackUrl : callBackSettings.remoteCallBackUrl
            },
            (err) => {
                if (err) {
                    console.error(err.reason);
                } else {
                    GH.userIsInOrg((err2, res) => {
                        if (err2) {
                            alert("El usuario no pertenece a la organización.");
                            this.logout();
                        } else {
                            if (res === true) {
                                FlowRouter.reload();
                            } else {
                                alert("El usuario no pertenece a la organización.");
                                this.logout();
                            }
                        }
                    });
                }
            }
        );
    }

    logout() {
        Meteor.logout((err) => {
            FlowRouter.reload();
        });
    }
}
