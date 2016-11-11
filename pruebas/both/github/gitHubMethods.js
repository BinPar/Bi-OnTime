
export default function setupGitHubMethods() {
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

                gitHubApi.issues.getForOrg({
                    org: Meteor.settings.private.organization,
                    filter: "assigned",
                    page: 1,
                    per_page: 100
                }, (err, res) => {
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
