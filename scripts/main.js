// ==============================
// 🌱 Sélection des éléments
// ==============================
const listHTML = document.querySelector(".list");
const printHTML = document.querySelector(".pokedex");
const btnBefore = document.querySelectorAll(".before");
const btnNext = document.querySelectorAll(".next");
const nbPokemonHTML = document.querySelectorAll(".nbpokemon");

// ==============================
// 🌍 Variables globales
// ==============================

let arrayTmp = [];
let allPokemon = [];
let nbPokemon = 0;

// ==============================
// 🎊 Fonctionnalités
// ==============================


async function getAllPokemon(offset) {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1302`);
	    const data = await response.json();
		console.log(data.results);
		return (data.results);
	}
	catch (error) {
		console.error('Erreur :', error);
	  }
}

// async function getPokemon(offset) {
// 	try {
// 		const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=${offset}`);
// 	    const data = await response.json();
// 		console.log(data.results);
// 		return (data.results);
// 	}
// 	catch (error) {
// 		console.error('Erreur :', error);
// 	  }
// }

async function getSpec(link) {
	try {
		const response = await fetch(`${link}`);
	    const data = await response.json();
		// console.log(data);
		return (data);
	}
	catch (error) {
		console.error('Erreur :', error);
	  }
}

async function createList() {
	printHTML.innerHTML = '';
	for (let i = 0; i < arrayTmp.length; i++) {
		const spec = await getSpec(arrayTmp[i].url)
		createPokemon(spec, i);
	}
	console.log(nbPokemonHTML);
	nbPokemonHTML.forEach(poke => {
		poke.innerHTML = `Pokemon ${nbPokemon +1}->${nbPokemon +21} / 1302`;
	})
}

function addSimple(className, txt) {
	const div = document.createElement("div");
	if (className) {
		div.className += className;
	}
	if (txt) {
		div.innerHTML = txt;
	}
	return (div);
}

function addType(query, spec){
	spec.types.forEach(element => {
		const div = document.createElement("div");
		div.className += `${element.type.name}`;
		div.innerHTML = element.type.name;
		query.append(div);
	});
}

function createPokemon(spec, id){
	printHTML.innerHTML += `
	<div class="wrapper wrapper${id}">
	    <div class="img">
			<div class="Name">${spec.name}</div>
			<img src="${spec.sprites.front_default}" alt="">
			<div class="Type Type${id}"><div class="title">Type: </div></div>
		</div>
	    <div class="txt">
	        <div class="Taille"><div class="title">Taille: </div>${spec.height / 10} m</div>
	        <div class="Poids"><div class="title">Poids: </div>${spec.weight /10} kg</div>
	        <div class="Stats"><div class="title">Stats: </div>
				<div class="hp">hp: ${spec.stats[0].base_stat}</div>
        		<div class="attack">attack: ${spec.stats[1].base_stat}</div>
        		<div class="defense">defense: ${spec.stats[2].base_stat}</div>
        		<div class="special-attack">attack: ${spec.stats[3].base_stat}</div>
        		<div class="special-defense">defense: ${spec.stats[4].base_stat}</div>
        		<div class="speed">speed: ${spec.stats[5].base_stat}</div>
			</div>
	    </div>
	</div>
	`
	const type = document.querySelector(`.Type${id}`);
	const wtype = document.querySelector(`.wrapper${id}`);
	addType(type, spec);
	const tmp = spec.types[0].type.name;
	wtype .className += ` w${tmp}`;
}

async function createSection() {
	arrayTmp = allPokemon.slice(nbPokemon, (nbPokemon + 21));
	console.log(arrayTmp);
	createList();
}

async function init() {
	allPokemon = await getAllPokemon();
	createSection()
}

// ==============================
// 🧲 Événements
// ==============================


init();

btnNext.forEach((btn) => {
	btn.addEventListener("click", () => {
		nbPokemon += 21;
		if (nbPokemon > 1302) {
			nbPokemon = 1302;
		}
		createSection();
	})
})

btnBefore.forEach((btn) => {
	btn.addEventListener("click", () => {
		nbPokemon -= 21;
		if (nbPokemon < 0) {
			nbPokemon = 0;
		}
		createSection();
	})
})
