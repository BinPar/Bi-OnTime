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
		return false;
	}
}
