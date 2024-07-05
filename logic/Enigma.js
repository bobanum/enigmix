import Category from "./Category.js";
import Clue from "./Clue.js";
import Relation from "./Relation.js";

export default class Enigma {
	relations = [];
	constructor(categories, clues) {
		this.categories = this.parseCategories(categories);
		this.createRelations();
		// this.clues = Clue.from(clues);
		this.actions = [];
	}
	createRelations() {
		let to = Object.values(this.categories);
		while (to.length) {
			let from = to.shift(); 
			from.createRelations(...to);
		}
		return this;
	}
	parseCategories(obj) {
		const result = {};
		for (let id in obj) {
			result[id] = Category.from(id, obj[id]);
			result[id].enigma = this;
		}
		return result;
	}
	parseClues(obj) {
		const result = {};
		for (let id in obj) {
			result[id] = Clue.from(obj[id]);
			result[id].enigma = this;
		}
		return result;
	}
	static from(obj) {
		let enigma = new Enigma(obj.categories, obj.clues);
		return enigma;
	}
}