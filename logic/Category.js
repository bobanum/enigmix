import Instance from "./Instance.js";
import Relation from "./Relation.js";

export default class Category {
	enigma = null;
	constructor(id, label, instances) {
		this.id = id;
		this.label = label;
		this.instances = this.parseInstances(instances);
		this.relations = {};
	}
	get path() {
		return this.id;
	}
	parseInstances(obj) {
		const result = {};
		for (let id in obj) {
			result[id] = Instance.from(id, obj[id]);
			result[id].category = this;
		}
		return result;
	}
	/**
	 * Creates relations between instances of this category and instances of other categories.
	 * @param {...Category} tos - The categories to create relations with.
	 * @returns {Category} - The current category instance.
	 */
	createRelations(...tos) {
		tos.forEach(to => {
			// console.log(26,this.path,to.path);
			this.relations[to.path] = {};
			if (!to.relations[this.path]) {
				to.relations[this.path] = {};
			}
			for (let i of Object.values(this.instances)) {
				for (let j of Object.values(to.instances)) {
					let relation = new Relation(i, j);
					this.enigma.relations.push(relation);
					if (!to.relations[this.path][i.id]) {
						to.relations[this.path][i.id] = {};
					}
					if (!this.relations[to.path][j.id]) {
						this.relations[to.path][j.id] = {};
					}
					this.relations[to.path][j.id][i.id] = relation;
					to.relations[this.path][i.id][j.id] = relation;
				}
			}
		});
		// console.log(40,this.relations);
		return this;
	}
	getRelations(instance) {
		// if (instance instanceof Instance) instance = instance.path;
		console.log(45,this.relations[instance.category.id]);
		// return this.relations.filter(r => {
		// 	if (r.instance0.path === instance || r.instance1.path === instance) {
		// 		// console.log(52, r.path,r.instance0.path === instance , r.instance1.path === instance,r.instance0.path, r.instance1.path, instance);
		// 	}
		// 	return r.instance0.path === instance || r.instance1.path === instance
		// });
	}
	static from(id, obj) {
		let category = new Category(id, obj.label, obj.instances);
		return category;
	}
}