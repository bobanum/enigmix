import Action from "./Action.js";

export default class Clue {
	actions = [];
	enigma = null;
	constructor(formula) {
		this.formula = formula;
	}
	static from(str) {
		return new this(str);
	}
	process() {
		let parts;
		if (parts = this.parseDirectComparison(this.formula)) {
			let inst0 = parts.instances[0];
			let inst1 = parts.instances[1];
			if (parts.instances.length > 2) {
				console.warn("Not implemented multiple operators");
			}
			switch (parts.ops[0]) {
				case '=': return this.processEqual(inst0, inst1);
				case '!=': return this.processNotEqual(inst0, inst1);
				case '<': return this.processLess(inst0, inst1);
			}
			return this;
		}
		if (parts = this.parseAttributeComparison(this.formula)) {
			// let inst0 = parts.instances[0];
			// let inst1 = parts.instances[1];
			// switch (parts.ops[0]) {
			// 	case '=': return this.processEqual(inst0, inst1);
			// 	case '!=': return this.processNotEqual(inst0, inst1);
			// 	case '<': return this.processLess(inst0, inst1);
			// }
			return this;
		}
	}
	parseDirectComparison(formula) {
		const ident = "[a-z_][a-z0-9_]*";
		const instance = `(${ident})\\.(${ident})`;
		const op = "(?:=|!=|<|>|<=|>=)";
		let parts, r;
		// Direct comparison
		r = new RegExp(`^${instance}\\s*(${op})\\s*(.*)$`);
		parts = r.exec(formula);
		if (!parts) return false;
		let result = {
			instances: [],
			ops: []
		};
		let limit = 100;
		while ((parts = r.exec(formula)) && limit--) {
			result.instances.push(this.enigma.getInstance(parts[1], parts[2]));
			result.ops.push(parts[3]);
			formula = parts[4];
		}
		result.instances.push(this.enigma.getInstance(formula));
		return result;
	}
	parseAttributeComparison(formula) {
		const ident = "[a-z_][a-z0-9_]*";
		const instance = `(${ident})\\.(${ident})`;
		const op = "(?:=|!=|<|>|<=|>=)";
		let parts, r;
		// Attribute comparison
		r = new RegExp(`^(${ident})\\.(${ident}|#)\\((.*)\\)`);
		parts = r.exec(formula);
		if (!parts) return false;
		let result = {};
		result.group = parts[1];
		result.attr = parts[2];
		formula = parts[3];
		parts = this.parseDirectComparison(formula);
		result.instances = parts.instances;
		result.ops = parts.ops;
		// result.instances = [];
		// result.ops = [];
		
		// r = new RegExp(`^${instance}\\s*(${op})\\s*(.*)$`);
		// let idx = 0;
		// while (parts = r.exec(formula)) {
		// 	result.instances.push(this.enigma.getInstance(parts[1], parts[2]));
		// 	result.ops.push(parts[3]);
		// 	formula = parts[4];
		// 	idx++;
		// }
		// result.instances.push(this.enigma.getInstance(formula));
		return result;
	}
	processEqual(...instances) {
		let [inst0, inst1] = instances;
		let relation = inst0.getRelation(inst1);
		let action = new Action(relation, true, this);
		relation.addAction(action);
		return this;
	}
	processNotEqual(...instances) {
		let [inst0, inst1] = instances;
		let relation = inst0.getRelation(inst1);
		let action = new Action(relation, false, this);
		relation.addAction(action);
		return this;
	}
	processLess(...instances) {
		console.error("Not implemented");
		// let [inst0, inst1] = instances;
		// let relation = inst0.getRelation(inst1);
		// let action = new Action(relation, false, this);
		// relation.addAction(action);
		// return this;
	}
}