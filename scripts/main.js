// ==============================
// 🌱 Sélection des éléments
// ==============================
const listHTML = document.querySelector(".list");
const printHTML = document.querySelector(".pokedex");

// ==============================
// 🌍 Variables globales
// ==============================

let arrayTmp = [];

// ==============================
// 🎊 Fonctionnalités
// ==============================

async function getPokemon(offset) {
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
	    const data = await response.json();
		console.log(data.results);
		return (data.results);
	}
	catch (error) {
		console.error('Erreur :', error);
	  }
}

async function getSpec(link) {
	try {
		const response = await fetch(`${link}`);
	    const data = await response.json();
		console.log(data);
		return (data);
	}
	catch (error) {
		console.error('Erreur :', error);
	  }
}

function createList(data) {
	listHTML.innerHTML = '';
	for (let i = 0; i < data.length; i++) {
		const btn = document.createElement("button");
		btn.className += `btn`;
		btn.id = i;
		btn.innerHTML = data[i].name
		listHTML.append(btn);
	}
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

function addArray(){

}

function createPokemon(spec){
	// printHTML.innerHTML = `
	// <div class="wrapper">
	//     <div class="img"></div>
	//     <div class="txt">
	//         <div class="Name">${spec.name}</div>
	//         <div class="Type">Type:</div>
	//         <div class="Taille">${spec.height / 10} m</div>
	//         <div class="Poids">${spec.weight /10} kg</div>
	//         <div class="Stats"></div>
	//     </div>
	// </div>
	// `
	const wrapper = addSimple("wrapper", "");
	const img = addSimple("img", "");
	img.innerHTML = `<img src="${spec.sprites.front_default}" alt="">`;
	wrapper.append(img);
	const txt = addSimple("txt", "");
	txt.append(addSimple("name", `${spec.name}`));
	txt.append(addSimple("Taille", `${spec.height / 10} m`));
	// append type
	txt.append(addSimple("Poids", `${spec.weight /10} kg`));
	// append stats
	wrapper.append(txt);
	printHTML.append(wrapper);
}

async function firstInit() {
	const data = await getPokemon(0);
	arrayTmp = data;
	createList(data);
	getSpec(data[2].url);
}

// ==============================
// 🧲 Événements
// ==============================

firstInit()
// data.types[0].type.name

listHTML.addEventListener("click", async (e)=> {
	if (e.target.matches(".btn")) {
		const spec = await getSpec(arrayTmp[e.target.id].url)
		createPokemon(spec);
	}
})
