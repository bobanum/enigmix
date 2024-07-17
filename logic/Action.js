export default class Action {
	clues;
	constructor(relation, state, ...clues) {
		this.state = state;
		this.relation = relation;
		this.clues = clues;
	}
	toString() {
		return this.relation.path+(this.state ? ".1" : ".0");
	}
}