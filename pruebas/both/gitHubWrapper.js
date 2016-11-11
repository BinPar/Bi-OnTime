
class GitHubWrapper {
    constructor() {
        if (Meteor.isServer) {
            this._setupApi();
            this._defineMethods();
        }
    }

    userIsInOrg(callback) {
        Meteor.call("userIsInOrg", (err, res) =>  {
            callback(err, res);
        });
    }

    getFeed(callback) {
        Meteor.call("getFeed", (err, res) => {
            callback(err, res);
        });
    }

    getIssues(callback) {
        Meteor.call("getIssues", (err, res) => {
            callback(err, res);
        });
    }

    getUserIssues(callback) {
        Meteor.call("getUserIssues", (err, res) => {
            callback(err, res);
        });
    }

    estimateTask(repository, issueNumber, duration, callback) {
        Meteor.call("estimateTask", repository, issueNumber, duration, (err, res) => {
            callback(err, res);
        });
    }

    needMoreInfo(repository, issueNumber, description, callback) {
        Meteor.call("setLabel", repository, issueNumber, ["help wanted"], (err, res) => {
            if (err) {
                callback(err, res);
            } else {
                Meteor.call("postComment", repository, issueNumber, description, (err2, res2) => {
                    callback(err2, res2);
                });
            }
        });
    }

    _setupApi() {
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

    _defineMethods() {
        if (Meteor.isServer) {
            let Future = require("fibers/future");

            Meteor.methods({
                userIsInOrg() {
                    let future = new Future();

                    gitHubApi.users.getOrgMembership({org: Meteor.settings.private.organization}, (err, res) => {
                        if (err) {
                            future.throw(err);
                        } else {
                            future.return(res && res.state == "active");
                        }
                    });

                    return future.wait();
                },

                getIssues() {
                    let future = new Future();

                    gitHubApi.issues.getForOrg({org: Meteor.settings.private.organization, filter: "assigned", page: 1, per_page: 100 }, (err, res) => {
                        if (err) {
                            console.log("====", err);
                            future.throw(err);
                        } else {
                            future.return(res);
                        }
                    });

                    return future.wait();
                },

                getUserIssues() {
                    let future = new Future();

                    gitHubApi.issues.getForUser({filter: "created", page: 1, per_page: 100}, (err, res) => {
                        if (err) {
                            console.log("====", err);
                            future.throw(err);
                        } else {
                            future.return(res);
                        }
                    });

                    return future.wait();
                },

                getFeed() {
                    let future = new Future();

                    gitHubApi.activity.getNotifications({}, (err, res) => {
                        if (err) {
                            console.log("====", err);
                            future.throw(err);
                        } else {
                            future.return(res);
                        }
                    });

                    return future.wait();
                },

                setLabel(repository, issueId, labels) {
                    let future = new Future();

                    gitHubApi.issues.addLabels({
                        owner: Meteor.settings.private.organization,
                        repo: repository,
                        number: issueId,
                        body: labels
                    }, (err, res) => {
                        if (err) {
                            future.throw(err);
                        } else {
                            future.return(res);
                        }
                    });

                    return future.wait();
                },

                postComment(repository, issueId, text) {
                    let future = new Future();

                    gitHubApi.issues.createComment({
                        owner: Meteor.settings.private.organization,
                        repo: repository,
                        number: issueId,
                        body: text
                    }, (err, res) => {
                        if (err) {
                            future.throw(err);
                        } else {
                            future.return(res);
                        }
                    });

                    return future.wait();
                },

                getOwnRepositories() {
                    let future = new Future();

                    gitHubApi.repos.getForUser({
                        user: Meteor.user().services.gitHubApi.username,
                        type: "all"
                    }, (err, res) => {
                        if (err) {
                            future.throw(err);
                        } else {
                            future.return(res);
                        }
                    });

                    return future.wait();
                },

                getBPRepositories() {
                    let future = new Future();

                    gitHubApi.repos.getForOrg({org: Meteor.settings.private.organization, type: "all"}, (err, res) => {
                        if (err) {
                            future.throw(err.reason);
                        } else {
                            future.return(res);
                        }
                    });

                    return future.wait();
                },

                estimateTask(repository, issue, duration) {
                    let future = new Future();

                    let estimation = {
                        repository,
                        issue,
                        user: Meteor.user().services.github.id,
                        duration
                    };

                    Meteor.call("estimations.newEstimation", estimation, (err, res) => {
                    //BP.DB.estimations.newEstimation(estimation, (err, res) => {
                        if (err) {
                            future.throw(`Error: ${err.reason}.`);
                        } else {
                            future.return("New estimation res", res);
                        }
                    });

                    return future.wait();
                }
            });
        }
    }
}

export default GHWInstance = new GitHubWrapper();
