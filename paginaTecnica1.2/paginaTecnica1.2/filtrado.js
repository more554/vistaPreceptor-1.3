
const campoBusqueda = document.getElementById("filtro-alumnos");
const selectorAnioProfesores = document.getElementById("filtro-anio-profesores");
const botonBuscar = document.getElementById("boton-buscar");
const filasAlumnos = document.querySelectorAll("#cuerpo-alumnos tr");
const cantidadAlumnos = document.getElementById("cantidad-alumnos");
const avisoSinResultados = document.getElementById("sin-resultados");

function filtrarAlumnos() {
    const texto = campoBusqueda.value.trim().toLocaleLowerCase("es");
    const anioElegido = selectorAnioProfesores.value;
    let visibles = 0;

    filasAlumnos.forEach(function(fila) {
        const contenido = fila.textContent.toLocaleLowerCase("es");
        const curso = fila.cells[3].textContent.trim();

        const coincideTexto = contenido.includes(texto);
        const coincideAnio =
            anioElegido === "" || curso.startsWith(anioElegido + "°");

        if (coincideTexto && coincideAnio) {
            fila.hidden = false;
            visibles++;
        } else {
            fila.hidden = true;
        }
    });

    cantidadAlumnos.textContent =
        "Se muestran " + visibles + " de " + filasAlumnos.length + " docentes.";

    avisoSinResultados.hidden = visibles !== 0;
}

campoBusqueda.addEventListener("input", filtrarAlumnos);
selectorAnioProfesores.addEventListener("change", filtrarAlumnos);
botonBuscar.addEventListener("click", filtrarAlumnos);

campoBusqueda.addEventListener("keydown", function(evento) {
    if (evento.key === "Enter") {
        filtrarAlumnos();
    }
});





// DATOS DE HORARIOS DEL CICLO BÁSICO

const horariosBasico = [
    {
        anio: "1",
        modalidad: null,
        division: "1ra",
        imagen: "/img/1ro1raHorario.png"
    },
    {
        anio: "1",
        modalidad: null,
        division: "2da",
        imagen: "/img/1ro2da.png"
    },
    {
        anio: "1",
        modalidad: null,
        division: "3ra",
        imagen: "/img/1ro3ra.png"
    },
    {
        anio: "2",
        modalidad: null,
        division: "1ra",
        imagen: "/img/2do1ra.png"
    },
    {
        anio: "2",
        modalidad: null,
        division: "2da",
        imagen: "img/2do2da.png"
    },
    {
        anio: "2",
        modalidad: null,
        division: "3ra",
        imagen: "img/horarios2do3ra.png"
    },
    {
        anio: "3",
        modalidad: null,
        division: "1ra",
        imagen: "img/3ro1ra.png"
    },
    {
        anio: "3",
        modalidad: null,
        division: "2da",
        imagen: "img/3ro2da.png"
    },
    {
        anio: "3",
        modalidad: null,
        division: "3ra",
        imagen: "img/3ro3ra.png"
    }
];


// DATOS DE HORARIOS DEL CICLO SUPERIOR

const superiorHorarios = [
    { anio: "4", modalidad: "MMO", division: null, imagen: "img/horarios4toMMO.png" },
    { anio: "4", modalidad: "ER", division: null, imagen: "img/horarios4toER.png" },
    { anio: "4", modalidad: "PROG", division: null, imagen: "img/horarios4toPROG.png" },

    { anio: "5", modalidad: "MMO", division: null, imagen: "img/horarios5toMMO.png" },
    { anio: "5", modalidad: "ER", division: null, imagen: "img/horarios5toER.png" },
    { anio: "5", modalidad: "PROG", division: null, imagen: "img/horarios5toPROG.png" },

    { anio: "6", modalidad: "MMO", division: null, imagen: "img/horarios6toMMO.png" },
    { anio: "6", modalidad: "ER", division: null, imagen: "img/horarios6toER.png" },
    { anio: "6", modalidad: "PROG", division: null, imagen: "img/horarios6toPROG.png" },

    { anio: "7", modalidad: "MMO", division: null, imagen: "img/horarios7moMMO.png" },
    { anio: "7", modalidad: "ER", division: null, imagen: "img/horarios7moER.png" },
    { anio: "7", modalidad: "PROG", division: null, imagen: "img/horarios7moPROG.png" }
];


// ELEMENTOS HTML DE LOS HORARIOS

const anio = document.getElementById("filtro-anio-horarios");
const division = document.getElementById("filtro-division");
const modalidad = document.getElementById("filtro-modalidad");
const cursosBtn = document.getElementById("cursos-btn");
const imagen = document.getElementById("imagen-horario");
const mensaje = document.getElementById("mensaje-horario");
const botonDescargar = document.getElementById("boton-descargar");

function actualizarSelectores() {
    const anioElegido = anio.value;
    const esBasico = ["1", "2", "3"].includes(anioElegido);
    const esSuperior = ["4", "5", "6", "7"].includes(anioElegido);

    division.hidden = !esBasico;
    modalidad.hidden = !esSuperior;

    division.value = "";
    modalidad.value = "";

    imagen.hidden = true;
    botonDescargar.hidden = true;

    if (anioElegido === "") {
        mensaje.textContent = "Seleccione un año para consultar su horario.";
    } else if (esBasico) {
        mensaje.textContent = "Seleccione la división del curso.";
    } else if (esSuperior) {
        mensaje.textContent = "Seleccione la modalidad del curso.";
    }
}

function filtrarHorarios() {
    const anioElegido = anio.value;

    if (anioElegido === "") {
        mensaje.textContent = "Primero debe seleccionar un año.";
        imagen.hidden = true;
        botonDescargar.hidden = true;
        return;
    }

    let resultado;

    if (["1", "2", "3"].includes(anioElegido)) {
        const divisionElegida = division.value;

        if (divisionElegida === "") {
            mensaje.textContent = "Seleccione una división.";
            imagen.hidden = true;
            botonDescargar.hidden = true;
            return;
        }

        resultado = horariosBasico.find(function(horario) {
            return horario.anio === anioElegido &&
                   horario.division === divisionElegida;
        });
    } else {
        const modalidadElegida = modalidad.value;

        if (modalidadElegida === "") {
            mensaje.textContent = "Seleccione una modalidad.";
            imagen.hidden = true;
            botonDescargar.hidden = true;
            return;
        }

        resultado = superiorHorarios.find(function(horario) {
            return horario.anio === anioElegido &&
                   horario.modalidad === modalidadElegida;
        });
    }

    if (resultado) {
        imagen.src = resultado.imagen;
        imagen.alt = "Horario de " + anioElegido + ".º año";
        imagen.hidden = false;

        botonDescargar.href = resultado.imagen;
        botonDescargar.hidden = false;

        mensaje.textContent = "";

    } else {
        imagen.hidden = true;
        botonDescargar.hidden = true;
        mensaje.textContent = "No se encontró un horario para el curso seleccionado.";
    }
            anio.addEventListener("change", actualizarSelectores);
 cursosBtn.addEventListener("click", filtrarHorarios);
}
