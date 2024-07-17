import Instance from "./Instance.js";
import Relation from "./Relation.js";

export default class Category {
	enigma = null;
	constructor(id, label, instances) {
		this.id = id;
		this.label = label;
		this.instances = this.parseInstances(instances);
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
	createRelations(...to) {
		to.forEach(to => {
			for (let i of Object.values(this.instances)) {
				for (let j of Object.values(to.instances)) {
					let relation = new Relation(i, j);
					this.enigma.relations.push(relation);
				}
			}
		});
		return this;
	}
	static from(id, obj) {
		let category = new Category(id, obj.label, obj.instances);
		return category;
	}
}