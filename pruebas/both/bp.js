import DB from './db';

class BPClass {

	constructor()
	{
		this.DB  = new DB();
		this.ready = Meteor.isServer;
		this._onReadyQueue = [];

		if(Meteor.isServer) {
			this.API = {};
			this.publications = {};
			this.methods = {};
			this.queries = {};
		} else {
			Meteor.call("setupBinParAPI", (e, API) =>
			{
				if(e) console.error("Error setting up BinParAPI :" + e);

				for(let method of API.methods)
				{
					let parts = method.split('.');
					if(parts.length>1) {
						if(BP.DB[parts[0]][parts[1]])
						{
							console.error(`Duplicated method in collection ${parts[0]}: ${parts[1]}`);
						} else {
							BP.DB[parts[0]][parts[1]] = function(...params) {
								return Meteor.call(method, ...params);
							}
						}
					}
				}

				for(let publication of API.publications)
				{
					let parts = publication.split('.');
					if(parts.length>1) {
						if(BP.DB[parts[0]][parts[1]])
						{
							console.error(`Duplicated subscription in collection ${parts[0]}: ${parts[1]}`);
						} else {
							BP.DB[parts[0]][parts[1]] = function(...params) {
								return Meteor.subscribe(publication, ...params);
							}
						}
					}
				}

				for(let publication of API.queries)
				{
					let parts = publication.split('.');
					if(parts.length>1) {
						if(BP.DB[parts[0]][parts[1]])
						{
							console.error(`Duplicated subscription in collection ${parts[0]}: ${parts[1]}`);
						} else {
							BP.DB[parts[0]][parts[1]] = function(...params) {
								let subs = Meteor.subscribe(publication, ...params);
								subs.query = BP.DB[parts[0]]["query_" + parts[1]].bind(BP.DB[parts[0]], Meteor.userId(),...params);
								return subs;
							}
						}
					}
				}
				this.onReady();
			});
		}
	}

	onReady()
	{
		this.ready = true;

		for(let fn of this._onReadyQueue)
		{
			fn();
		}

	}

	onLoad(fn)
	{
		if(this.ready) fn();
		else this._onReadyQueue.push(fn);
	}
}

var BP = new BPClass();
export default BP;