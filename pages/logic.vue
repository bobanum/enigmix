<template>
	<div>Enigme</div>
</template>
<script setup>
import Enigma from '~/logic/Enigma.js';
const categories = {
	first_name: {
		id: "first_name",
		label: "First name",
		instances: {
			benoit: {
				label: "Benoît",
				properties: {}
			},
			quentin: {
				label: "Quentin",
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
	position: {
		id: "position",
		label: "Position",
		instances: {
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
			anouncer: {
				label: "Anouncer",
				properties: {}
			}
		}
	},
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
	}
};
const clues = [
	"position.baggage_handler = seniority.y6",
	"seniority.#(position.electrician) > seniority.#(lastname.ledoux) ",
	"firstname.quentin = seniority.y5",
	"seniority.#(lastname.maréchal > position.air_traffic_controller > firstname.daniel)",
	"seniority.#(lastname.forest < lastname.bouchard)",
	"firstname.mathieu = position.security_guard",
	"firstname.laurent = lastname.anderson",
	"seniority.#(firstname.laurent < position.air_traffic_controller)",
	"seniority.#(lastname.anderson < position.air_traffic_controller) ",
];
const enigma = new Enigma(categories, clues);
console.log(enigma.relations);
</script>