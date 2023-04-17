
//titulo principal en el header
let header = document.querySelector('header');
let div = document.createElement('div');
header.appendChild(div);

let img = document.createElement('img');
img.setAttribute('src', './img/pokedex.jpeg');
img.setAttribute('alt', 'pokedex');
div.appendChild(img);

//todas las tarjetas de pokemons
//llamada a la api para recuperar sus datos
let pokedex = async (numero) => {
    try {
        let respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`);
        let resJson = await respuesta.json();
        console.log(resJson);
        return resJson;
    } catch (error) {
        console.log(error);
    }
}

//pintar los datos de la api
let pintar = (datos) => {
    // console.log('name: ', datos.name);
    // console.log('image: ', datos.sprites['front_default']);
    // console.log('type: ', datos.types.map((type) => type.type.name).join(', '));
    // console.log('id: ', datos.id);
    //console.log('video: ', datos.sprites.versions['generation-v']['black-white'].animated['front_default']);

    let lista = document.querySelector('#pokedex');

    let li = document.createElement('li');
    li.setAttribute('class', 'tarjeta');
    li.setAttribute('data-aos', 'flip-left');
    lista.appendChild(li);

    let div1 = document.createElement('div');
    div1.setAttribute('class', 'div1');
    li.appendChild(div1);

    let nombre = document.createElement('h4');
    nombre.textContent = datos.name.toUpperCase();
    div1.appendChild(nombre);

    let img = document.createElement('img');
    img.setAttribute('src', datos.sprites.versions['generation-v']['black-white'].animated['front_default']);
    img.setAttribute('alt', datos.name);
    div1.appendChild(img);
    
    let div2= document.createElement('div');
    div2.setAttribute('class', 'div2');
    div1.appendChild(div2);

    let id = document.createElement('p');
    id.setAttribute('class','id');
    id.textContent = datos.id;
    div2.appendChild(id);

    let tipo = document.createElement('p');
    tipo.setAttribute('class', 'tipo');
    tipo.textContent = datos.types.map((type) => type.type.name).join(', ');
    div2.appendChild(tipo);
}

//boton input para filtrar
let inputFiltro = (filtro) => {
    let divFiltro = document.createElement('div');
    header.appendChild(divFiltro);
    
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeHolder', 'Atrapa tu pokémon');
    divFiltro.appendChild(input);
}
inputFiltro();

//escuchamos el input del filtro
let cogerInput = (texto) => {
    let input = document.querySelector('input');
    input.addEventListener('input',() => busqueda(input.value,texto))
    //console.log(input);
}

//hacemos el filtrado
let busqueda = (texto,pokemons) => {
    let lista = document.querySelector('#pokedex');
    lista.innerHTML = '';
    let filtrados = pokemons.filter((filtrado) => 
        filtrado.name.toLowerCase().includes(texto) ||
        filtrado.id == texto ||
        filtrado.types.map((type) => type.type.name.toLowerCase()).join(', ').includes(texto)
    );
    //console.log(pokemons[0].types.map((type) => type.type.name));
    //console.log(texto);
    for (let i = 0; i < filtrados.length; i++) {
        let pokemon = filtrados[i];
        pintar(pokemon);        
    }
    //console.log(filtrados);
}

//llamamos a las funciones anteriores pokedex y pintar por cada pokemon
let init = async () => {
    // let pokemon = await pokedex(1);
    // console.log(pokemon);
    // pintar(pokemon);
    let arrayPokemons = [];

    for (let i = 1; i <= 150; i++) {
       let pokemon = await pokedex(i);
       pintar(pokemon);
       arrayPokemons.push(pokemon);
    }
    cogerInput(arrayPokemons);
}
init();
AOS.init();

