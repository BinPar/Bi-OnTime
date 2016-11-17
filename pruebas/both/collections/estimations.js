import Collection from "./collection";

export default class Estimations extends Collection {

    constructor() {
        super("estimations");
    }

    getSchema() {
        return new SimpleSchema({
            repository: {
                type: String,
                label: "Repository"
            },
            issue: {
                type: Number,
                label: "Issue number"
            },
            user: {
                type: String,
                label: "User id"
            },
            ghUser: {
                type: Number,
                label: "GitHub user id"
            },
            duration: {
                type: Number,
                label: "Estimated duration",
                decimal: true
            },
            updateDate: {
                type: Date,
                label: "Update date",
                autoValue: function () {
                    if (this.isUpdate) {
                        return new Date();
                    }
                },
                optional: true
            },
            creationDate: {
                type: Date,
                label: "Creation date",
                autoValue: function () {
                    if (this.isInsert) {
                        return new Date();
                    } else if (this.isUpsert) {
                        return {$setOnInsert: new Date()};
                    } else {
                        this.unset();
                    }
                }
            }
        });
    }

    query_getEstimations(userId) {
        if(!Roles.userIsInRole(userId, ['user', 'manager', 'admin'])) throw new Meteor.Error(401, `Acceso denegado al usuario ${userId}.`);

        // ToDo: filtrar por listado de repos e issues
        return this.find({user: userId});
    }
}
