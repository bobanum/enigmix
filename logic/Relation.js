export default class Relation {
	constructor(instance0, instance1) {
		this.instance0 = instance0;
		this.instance1 = instance1;
		this.actions = [];
		instance0.addRelation(this, instance1);
		instance1.addRelation(this, instance0);
	}
	getOther(instance) {
		return instance === this.instance0 ? this.instance1 : this.instance0;
	}
}