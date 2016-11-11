
export default class Users  {

	constructor() {
		Meteor.users.attachSchema(this.getSchema());
	}

	getSchema()
	{
		let userProfile = new SimpleSchema({
			name: {
				type: String,
				label: "Username",
				optional: true
			}
		});

		return new SimpleSchema({
			emails: {
				type: Array,
				label: "Emails",
				optional: true
			},
			"emails.$": {
				type: Object,
				optional: true
			},
			"emails.$.address": {
				type: String,
				label: "eMail",
				regEx: SimpleSchema.RegEx.Email
			},
			/*
			"emails.$.verified": {
				type: Boolean,
				label: "Verified",
				defaultValue: false
			},
			*/
			createdDate: {
				type: Date,
				label: "Creation Date",
				optional: true
			},
			updateDate: {
				type: Date,
				label: "Update Date",
				autoValue: function () {
					if (this.isUpdate) {
						return new Date();
					}
				},
				optional: true
			},
			profile: {
				type: userProfile,
				label: "Profiles",
				optional: true
			},
			services: {
				type: Object,
				optional: true,
				blackbox: true
			},
			roles: {
				type: [String],
				optional: true,
				label: "Roles"
			},
			heartbeat: {
				type: Date,
				optional: true
			},
			selectUser: {
				type: String,
				optional: true
			}
		});

	}

	/*
	query_getUser(userId, targetId) {
		//if (!Roles.userIsInRole(userId, ['superuser', 'admin'])) throw new Meteor.Error(401, `Access denied for user: ${userId}`);
		check(targetId, String);

		return Meteor.users.find({_id: targetId}, {limit: 300});
	}
	*/
}
