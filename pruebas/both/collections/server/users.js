import BP from '../../bp';
import ServerCollectionAPI from './serverCollectionAPI';

export default new class Users {
	constructor() {
		this.collectionName = "users";
		BP.API[this.collectionName] = this;
		this.collection = Meteor.users;
		ServerCollectionAPI.setupAPI(this);
	}

	fixturesRequired() {
		return this.collection.find({}).count() == 0;
	}

	checkEmail(address) {
		return /^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(address);
	}

	createFixtures() {
		let adminId = 0;
		// Admins
		{
			let info = {
				password: 'binpar',
				email: 'binpar@binpar.com',
				profile: {
					name: 'BinPar Team',
					clients: new Array(),
					vessels: new Array()
				},
				createdDate: new Date()
			};

			adminId = Accounts.createUser(info);
			Roles.addUsersToRoles(adminId, ['admin']);
		}
	}
}
