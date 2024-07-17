import Category from "./Category.js";
import Clue from "./Clue.js";
import Relation from "./Relation.js";

export default class Enigma {
	relations = [];
	constructor(categories, clues) {
		this.categories = this.parseCategories(categories);
		this.createRelations();
		this.clues = this.parseClues(clues);
		this.actions = [];
	}
	toString() {
		let result = [];
		let cats = Object.values(this.categories);
		let catsCol = cats.slice(0, -1);
		let catsRow = cats.slice(1).reverse();
		for (let catRow of catsRow) {

			for (let instanceRow in catRow.instances) {
				let blocks = [];
				for (let catCol of catsCol) {
					let block = [];
					for (let instanceCol in catCol.instances) {
						let relation = catCol.instances[instanceCol].relations[catRow.id][instanceRow];
						block.push(relation.toString());
					}
					block = block.join(" ");
					blocks.push(block);
				}
				blocks = blocks.join("   ");
				result.push(blocks);
			}
			result.push("");
			catsCol.pop();
		}

		return result.join("\n");
	}
	processClue(...ids) {
		ids.forEach(id => this.clues[id].process());
		return this;
	}
	toStringPlus() {
		const cChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const iChar = "123456789";
		const cats = Object.values(this.categories);
		const nc = cats.length;
		const ni = Object.keys(cats[0].instances).length;
		let result = [];
		result[0] = `╔══════`;
		result[1] = `║      `;
		result[2] = `║      `;
		result[3] = `╠══════`;

		function segment2(a, b, inter, n, m = 1) {
			const aa = a + inter.repeat(3);
			const bb = b + inter.repeat(3);
			return (aa + bb.repeat(n - 1)).repeat(m);
		}
		function segment(type, n, m = 1) {
			let types = [
				[`╬═══`, `╪═══`],
				[`╫───`, `┼───`],
				[`╦═══`, `════`],
				[`╫───`, `┼───`],
				[`║   `, `│   `],
			];
			return (types[type][0] + types[type][1].repeat(n - 1)).repeat(m);
		}

		// result[0] += segment(2, ni, nc - 1);
		result[0] += segment2(`╦`, `═`, `═`, ni, nc - 1);
		for (let j = 0; j < nc - 1; j++) {
			result[1] += `║` + ` `.repeat(ni * 2 - 1) + cChar[j] + ` `.repeat(ni * 2 - 1);
			result[2] += `║ ` + iChar.slice(0, ni).split("").join(" │ ") + ` `;
		}
		result[3] += segment(0, ni, nc - 1);
		result[0] += `╗`;
		result[1] += `║`;
		result[2] += `║`;
		result[3] += `╣`;

		let split = `║   ───` + segment(3, ni, 3) + `╢`;

		for (let j = nc - 1; j > 0; j--) {
			result.push(`║    ${iChar[0]} ` + segment(4, ni, 3) + `╢`);
			for (let i = 1; i < ni; i++) {

				result.push(split);
				result.push(`║    ${iChar[i]} ` + segment(4, ni, 3) + `╢`);
			}
			result.push(`╠══════` + segment(0, ni, 2) + segment(1, ni));
			break;
		}
		// let result = [
		// 	"╔══════╦═══════════════╦═══════════════╗",
		// 	"║      ║       A       ║       B       ║",
		// 	"║      ║ 1 │ 2 │ 3 │ 4 ║ 1 │ 2 │ 3 │ 4 ║",
		// 	"╠══════╬═══╪═══╪═══╪═══╬═══╪═══╪═══╪═══╣",
		// 	"║    1 ║   │   │   │   ║   │   │   │   ║",
		// 	"║   ───╫───┼───┼───┼───╫───┼───┼───┼───╢",
		// 	"║    2 ║   │   │   │   ║   │   │   │   ║",
		// 	"║ D ───╫───┼───┼───┼───╫───┼───┼───┼───╢",
		// 	"║    3 ║   │   │   │   ║   │   │   │   ║",
		// 	"║   ───╫───┼───┼───┼───╫───┼───┼───┼───╢",
		// 	"║    4 ║   │   │   │   ║   │   │   │   ║",
		// 	"╠══════╬═══╪═══╪═══╪═══╬═══╧═══╧═══╧═══╝",
		// 	"║    1 ║   │   │   │   ║",
		// 	"║   ───╫───┼───┼───┼───╢",
		// 	"║    2 ║   │   │   │   ║",
		// 	"║ E ───╫───┼───┼───┼───╢",
		// 	"║    3 ║   │   │   │   ║",
		// 	"║   ───╫───┼───┼───┼───╢",
		// 	"║    4 ║   │   │   │   ║",
		// 	"╚══════╩═══╧═══╧═══╧═══╝",
		// ];
		// let asciiboxcharacters= "┌┬┐├┼┤└┴┘│─";
		// let asciidoubleboxcharacters= "╔╦╗╠╬╣╚╩╝║═";
		// let asciidoublemixboxcharactersV= "╓╥╖╟╫╢╙╨╜║═";
		// let asciidoublemixboxcharactersH= "╒╤╕╞╪╡╘╧╛│─";

		return result.join("\n");
	}
	getInstance(c, i) {
		if (arguments.length === 1) {
			[ c, i ] = c.split(".");
		}
		return this.categories[c].instances[i];
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
	parseClues(arr) {
		return arr.map(str => {
			const clue = Clue.from(str);
			clue.enigma = this;
			return clue;
		});
	}
	static from(obj) {
		let enigma = new Enigma(obj.categories, obj.clues);
		return enigma;
	}
}