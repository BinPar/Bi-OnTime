
class GitHubWrapper {
    constructor() {
        if (Meteor.isServer) {
            require('./gitHubSetup').default();
            require('./gitHubMethods').default();
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
}

export default GHWInstance = new GitHubWrapper();
