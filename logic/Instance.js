export default class Instance {
	category = null;

	constructor(id, label, properties = {}) {
		this.id = id;
		this.label = label;
		this.properties = properties;
		this.relations = {};
	}
	get path() {
		return `${this.category.path}.${this.id}`;
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
	getRelation(c, i) {
		if (c instanceof Instance) {
			i = c.id;
			c = c.category.id;
		}
		// console.log(c,this.id,this.relations[c]);
		return this.relations[c][i];
	}
	getRelations(c, state = null) {
		let result;
		if (!c) {
			result = Object.values(this.relations).map(r => Object.values(r)).flat();
			console.log(40, this.id, result);
		} else {
			result = Object.values(this.relations[c]);
		}
		return result.filter(r => r.state === state);
	}
	getOtherRelations(c, state = null) {
		let result;
		if (!c) {
			result = Object.values(this.relations).map(r => Object.values(r)).flat();
		} else {
			result = [];
			for (let i in this.relations) {
				if (i === c) {
					continue;
				}
				result.push(...Object.values(this.relations[i]));
			}
		}
		return result.filter(r => r.state === state);
	}
}