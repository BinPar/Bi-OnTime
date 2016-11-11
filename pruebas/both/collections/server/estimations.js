import ServerCollectionAPI from './serverCollectionAPI';

export default new class Estimations extends ServerCollectionAPI {

    constructor() {
        super("estimations");
    }

    get permissions() {
        return {
            'insert': function (userId, doc) {
                return Roles.userIsInRole(userId, ['admin']);
            },
            'update': function (userId, doc, fields, modifier) {
                return Roles.userIsInRole(userId, ['admin']);
            },
            'remove': function (userId, doc) {
                return Roles.userIsInRole(userId, ['admin']);
            }
        }
    }

    fixturesRequired() {
        return false;
    }

    met_newEstimation(userId, estimation) {
        if (!Roles.userIsInRole(userId, ['admin'])) {
            throw new Meteor.Error(401, "Access denied.");
        }

        this.collection.insert(estimation);
    }
}
