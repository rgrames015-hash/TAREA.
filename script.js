const canciones = [
    "Pop Dreams",
    "Rock Night",
    "Bachata Love",
    "Summer Beat"
];

let posicion = 0;
let reproduciendo = false;


function reproducir(nombre) {

    document.getElementById("cancionActual").textContent = nombre;

    posicion = canciones.indexOf(nombre);

    if (posicion === -1) {
        posicion = 0;
    }

    reproduciendo = true;

    document.getElementById("playBtn").textContent = "⏸";
}


function pausarReproducir() {

    const boton = document.getElementById("playBtn");

    if (reproduciendo) {
        reproduciendo = false;
        boton.textContent = "▶";
    } else {

        reproduciendo = true;

        if (document.getElementById("cancionActual").textContent === "Ninguna canción") {
            reproducir(canciones[0]);
        } else {
            boton.textContent = "⏸";
        }
    }
}


function siguiente() {

    posicion++;

    if (posicion >= canciones.length) {
        posicion = 0;
    }

    reproducir(canciones[posicion]);
}


function anterior() {

    posicion--;

    if (posicion < 0) {
        posicion = canciones.length - 1;
    }

    reproducir(canciones[posicion]);
}


function buscarCancion() {

    const texto = document
        .getElementById("buscador")
        .value
        .toLowerCase();

    const lista = document.querySelectorAll(".cancion");

    lista.forEach(cancion => {

        const nombre = cancion
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if (nombre.includes(texto)) {
            cancion.style.display = "flex";
        } else {
            cancion.style.display = "none";
        }

    });
}


function filtrarGenero(genero) {

    const lista = document.querySelectorAll(".cancion");

    lista.forEach(cancion => {

        if (
            genero === "Todos" ||
            cancion.dataset.genero === genero
        ) {
            cancion.style.display = "flex";
        } else {
            cancion.style.display = "none";
        }

    });
}


function mostrarCanciones() {

    document
        .getElementById("explora")
        .scrollIntoView({
            behavior: "smooth"
        });
}


function agregarFavorito() {

    const actual =
        document.getElementById("cancionActual").textContent;

    if (actual === "Ninguna canción") {

        document.getElementById("favorito").textContent =
            "Primero selecciona una canción.";

    } else {

        document.getElementById("favorito").textContent =
            "❤️ " + actual + " fue agregada a tus favoritos.";

    }
}


function abrirYouTube() {

    window.open(
        "https://music.youtube.com/",
        "_blank"
    );

}
