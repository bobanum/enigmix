export default class Instance {
	category = null;

	constructor(id, label, properties = {}) {
		this.id = id;
		this.label = label;
		this.properties = properties;
		this.relations = {};
	}
	static fromMany(obj) {
		const result = {};
		for (let id in obj) {
			result[id] = this.from(id, obj[id]);
		}
		return result;
	}
	static from(id, obj) {
		let instance = new Instance(id, obj.label, obj.properties || {});
		return instance;
	}
	addRelation(relation, instance) {
		instance = instance || relation.getOther(this);
		if (!this.relations[instance.category.id]) {
			this.relations[instance.category.id] = {};
		}
		this.relations[instance.category.id][instance.id] = relation;
		return this;
	}
}