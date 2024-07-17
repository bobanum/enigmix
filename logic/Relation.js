import Action from "./Action.js";

export default class Relation {
	state = null;
	constructor(instance0, instance1) {
		this.instance0 = instance0;
		this.instance1 = instance1;
		this.actions = [];
		this.clues = [];
		instance0.addRelation(this, instance1);
		instance1.addRelation(this, instance0);
	}
	toString() {
		switch (this.state) {
			case null:
				return `-`;
			case true:
				return `1`;
			case false:
				return `0`;
		}
	}
	get path() {
		return `${this.instance0.path}.${this.instance1.path}`;
	}
	getOther(instance) {
		return instance === this.instance0 ? this.instance1 : this.instance0;
	}
	getRelations(state) {
		return [
			this.instance0.getRelations(this.instance1.category.id, state).filter(r => r !== this),
			this.instance1.getRelations(this.instance0.category.id, state).filter(r => r !== this)
		];
	}
	getOtherRelations(state) {
		return [this.instance0.getOtherRelations(this.instance1.category.id, state), this.instance1.getOtherRelations(this.instance0.category.id, state)];
	}
	static levels = -1;
	addNewAction(state, clueOrAction) {
		const action = new Action(this, state, ...this.clues);
		this.addAction(action);
		return action;
	}
	addAction(...actions) {
		// console.log(this.path);
		if (Relation.levels-- == 0) {
			console.log("Too deep");
			return;
		}
		actions.forEach(action => {
			if (this.actions.includes(action.path)) return;
			this.actions.push(action.path);
			if (this.state !== null && this.state !== action.state) {
				throw new Error(`Contradiction: ${this}`);
			}
			if (this.state !== null) {
				return;
			}
			this.state = action.state;
			if (action.state === true) {
				this.checkOuterRelations(true, true);
				this.checkOuterRelations(false, false);
				this.checkInnerRelations(false);
			} else {
				this.checkOuterRelations(false, true);
			}
		});
	}
	checkOuterRelations(state = false, filter) {
		let relations;
		relations = this.getOtherRelations(filter);
		relations.flat().forEach(relation2 => {
			let correlation = this.correlation(relation2);
			correlation.addNewAction(state, this);
		});
	}
	checkInnerRelations(state = false, filter) {
		let relations = this.getRelations(filter);
		relations.flat().forEach(relation => {
			const action = new Action(relation, state, this);
			relation.addAction(action);
		});
	}

	correlation(relation) {
		if (relation.instance0 === this.instance0) {
			return relation.instance1.getRelation(this.instance1);
		}
		if (relation.instance0 === this.instance1) {
			return relation.instance1.getRelation(this.instance0);
		}
		if (relation.instance1 === this.instance0) {
			return relation.instance0.getRelation(this.instance1);
		}
		if (relation.instance1 === this.instance1) {
			return relation.instance0.getRelation(this.instance0);
		}
	}
}