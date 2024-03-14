//constantes para seleccionar las etiquetas de HTML
const main = document.querySelector('main');
const busqueda = document.querySelector('#busqueda');
const consulta = document.querySelector('#query');
const cantidadImagenes = document.querySelector('#cantidadImagenes');
const formato = document.querySelector('#formatoImagen');
const fotoAleatoria = document.querySelector('#aleatorio');
const mostrarMas = document.querySelector("#mostrar-mas");
const color = document.querySelector("#color");
const ordenar = document.querySelector("#ordenar");
//Eventos
busqueda.onclick = cargaImagenes;
fotoAleatoria.onclick = cargaFotoAleatoria;
//código de cuenta para llamar a la API y variables
const codigo = "h_Qe2q1Ah4NaTOmH6ihSVaibJlODG3K9mSPL4InsoL0";
let pagina = 1;
let imagenesCargadas = [];
let mostrartipus = consulta.value;

//función para llamar a la API y seleccionar imagenes específicas
function carga() {
   
    fetch(`https://api.unsplash.com/search/photos?page=${pagina}&per_page=${cantidadImagenes.value}&orientation=${formato.value}&order_by=${ordenar.value}${color.value}&query=${consulta.value}&client_id=${codigo}`)
        .then(response => { return response.json(); })


        .then(data => {
            data.results.forEach(result => {
                imagenesCargadas.push(result);
                fetch(`https://api.unsplash.com/photos/${result.id}/statistics?client_id=${codigo}`)
                    .then(statsResponse => statsResponse.json())
                    .then(statsData => {
                        let fechaCreacion = new Date(result.created_at);
                        main.innerHTML += `<div class="card col-xl-3 col-lg-4 col-md-6 mb-4">
                                            
                                                <img src="${result.urls.small}" alt="${result.description}">
                                              <div class="card__content">
                                                <p>&#x1f642;  ${result.user.name}</p>
                                                <p>&#128337;  ${fechaCreacion.toDateString()}</p>
                                                <p>&#128064;  ${statsData.views.total}</p>
                                                <p>	&#128233;  ${statsData.downloads.total}</p>
                                                <p>&#129505;  ${result.likes}</p>
                                                <a href="${result.urls.full}" target="_blank">
                                                 <button id="abrirImagen"> Abrir Imagen </button> </a>
                                              </div>
                                            </div>`;
                    })
                    .catch(statsError => console.error('Error al obtener estadísticas:', statsError));
            });
        })
        .catch(error => console.error('Error al cargar las imágenes:', error));
        if(!consulta.value.length == "" ){
    mostrarMas.style.display = "block";
}

}

function cargaImagenes() {
    main.innerHTML = '';
    imagenesCargadas = [];
    if (mostrartipus != undefined) {
        carga();
    } else cargaFotoAleatoria();
}


//función para llamar a la API y seleccionar imagenes aleatorias
function cargaFotoAleatoria() {

    fetch(`https://api.unsplash.com/photos/random?count=${cantidadImagenes.value}&orientation=${formato.value}&client_id=${codigo}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(result => {
                imagenesCargadas.push(result);
                main.innerHTML += `<div class="card col-xl-3 col-lg-4 col-md-6 mb-4">
                  <img src="${result.urls.small}" alt="${result.description}">
                <div class="card__content">
                  <p>&#x1f642; ${result.user.name}</p>
                  <p>&#128337; ${result.created_at}</p>
                  <p>&#128233; ${result.downloads}</p>
                  <p>&#128064; ${result.views}</p>
                  <p>&#129505; ${result.likes}</p>
                  <a href="${result.urls.full}" target="_blank">
                  <button id="abrirImagen"> Abrir Imagen </button> </a>
                    </div>
                </div>
              </div>`;
            });
        })
        .catch(error => console.error('Error al cargar las imágenes aleatorias:', error));

            mostrarMas.style.display = "block";       
}

//Funcionalidad al boton Mostrar mas.
mostrarMas.addEventListener("click", () => {

    pagina++;
    if (mostrartipus != undefined) {
        carga();
    } else cargaFotoAleatoria();

})
