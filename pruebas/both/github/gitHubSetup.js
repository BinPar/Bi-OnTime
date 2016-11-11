
export default function setupGitHubApi() {
    if (Meteor.isServer) {
        let GitHubApi = require("github");

        gitHubApi = new GitHubApi({
            // optional
            debug: true,
            protocol: "https",
            host: "api.github.com",
            headers: {
                "user-agent": "Meteor"
            },
            Promise: require('bluebird'),
            followRedirects: false,
            timeout: 60000
        });

        let appData = Meteor.settings.private.oAuth.github;
        ServiceConfiguration.configurations.upsert({service: "github"}, {
            $set: {
                clientId: appData.clientId,
                secret: appData.secret,
                loginStyle: "popup"
            }
        });

        Accounts.onCreateUser((options, user) => {
            if (user.services.github) {
                user.profile = {
                    name: options.profile.name
                };
                user.emails = [{
                    address: user.services.github.email
                }];

                // ToDo: iniciar con rol de invitado para forzar aceptación
                user.roles = ["admin"];
            }

            return user;
        });

        Accounts.onLogin((info) => {
            if (info.user) {
                gitHubApi.authenticate({
                    type: "oauth",
                    token: info.user.services.github.accessToken
                });

                try {
                    Meteor.users.update({_id: info.user._id}, {
                        $set: {
                            'emails.0.address': info.user.services.github.email
                        }
                    });
                } catch (e) {
                    console.log(`Exception updating user profile: ${e.message}.`);
                }
            }
        });
    }
}
