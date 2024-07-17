<template>
	<div>Enigme</div>
</template>
<script setup>
import Enigma from '~/logic/Enigma.js';
const categories = {
	seniority: {
		id: "seniority",
		label: "Seniority",
		instances: {
			y4: {
				label: "4 years",
				properties: {}
			},
			y5: {
				label: "5 years",
				properties: {}
			},
			y6: {
				label: "6 years",
				properties: {}
			},
			y7: {
				label: "7 years",
				properties: {}
			},
			y8: {
				label: "8 years",
				properties: {}
			}
		}
	},
	last_name: {
		id: "last_name",
		label: "Last name",
		instances: {
			bouchard: {
				label: "Bouchard",
				properties: {}
			},
			marechal: {
				label: "Maréchal",
				properties: {}
			},
			ledoux: {
				label: "Ledoux",
				properties: {}
			},
			anderson: {
				label: "Anderson",
				properties: {}
			},
			forest: {
				label: "Forest",
				properties: {}
			}
		}
	},
	first_name: {
		id: "first_name",
		label: "First name",
		instances: {
			benoit: {
				label: "Benoît",
				properties: {}
			},
			daniel: {
				label: "Daniel",
				properties: {}
			},
			mathieu: {
				label: "Mathieu",
				properties: {}
			},
			laurent: {
				label: "Laurent",
				properties: {}
			},
			quentin: {
				label: "Quentin",
				properties: {}
			},
		}
	},
	position: {
		id: "position",
		label: "Position",
		instances: {
			anouncer: {
				label: "Anouncer",
				properties: {}
			},
			baggage_handler: {
				label: "Baggage handler",
				properties: {}
			},
			electrician: {
				label: "Electrician",
				properties: {}
			},
			security_guard: {
				label: "Security guard",
				properties: {}
			},
			air_traffic_controller: {
				label: "Air traffic controller",
				properties: {}
			},
		}
	},
};
const clues = [
	"position.baggage_handler = seniority.y6",
	"seniority.#(position.electrician > last_name.ledoux)",
	"first_name.quentin = seniority.y5",
	"seniority.#(last_name.marechal > position.air_traffic_controller > first_name.daniel)",
	"seniority.#(last_name.forest < last_name.bouchard)",
	"first_name.mathieu = position.security_guard",
	"first_name.laurent = last_name.anderson",
	"seniority.#(first_name.laurent < position.air_traffic_controller)",
	"seniority.#(last_name.anderson < position.air_traffic_controller) ",
];
const enigma = new Enigma(categories, clues);
enigma.processClue(0,1,2,3,4,5,6,7,8);
console.log(enigma.toString());

</script>