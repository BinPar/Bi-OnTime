import Users from './collections/users';
import Estimations from './collections/estimations';

export default class DB {
	constructor()
	{
		this.users = new Users();
		this.estimations = new Estimations();
	}
}
