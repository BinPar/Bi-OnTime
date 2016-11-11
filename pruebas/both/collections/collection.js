export default class Collection extends Mongo.Collection {

	constructor(collectionName)
	{
		super(collectionName);

		if(!this.getSchema) throw (`It is required to define a Schema for the class: ${this.constructor.name}`);

		this.attachSchema(this.getSchema());

		this.before.insert(this.onBeforeInsert);
		this.before.update(this.onBeforeUpdate);
		this.before.remove(this.onBeforeRemove);
		this.before.upsert(this.onBeforeUpsert);

		this.after.insert(this.onAfterInsert);
		this.after.update(this.onAfterUpdate);
		this.after.remove(this.onAfterRemove);

		this.before.find(this.onBeforeFind);
		this.after.find(this.onAfterFind);
		this.before.findOne(this.onBeforeFindOne);
		this.after.findOne(this.onAfterFindOne);
	}

	onBeforeInsert (userId, doc) {}
	onBeforeUpdate (userId, doc, fieldNames, modifier, options) {}
	onBeforeRemove (userId, doc) {}
	onBeforeUpsert (userId, doc, fieldNames, modifier, options) {}

	onAfterInsert (userId, doc) {}
	onAfterUpdate (userId, doc, fieldNames, modifier, options) {}
	onAfterRemove (userId, doc) {}

	onBeforeFind (userId, selector, options) {}
	onAfterFind (userId, selector, options, cursor) {}
	onBeforeFindOne (userId, selector, options) {}
	onAfterFindOne (userId, selector, options, doc) {}

}