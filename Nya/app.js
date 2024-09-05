let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		pagina -= 1;
		cargarPeliculas();
	}
});

const cargarPeliculas = async() => {
	try {
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=192e0b9821564f26f52949758ea3c473&language=es-MX&page=${pagina}`);
	
		console.log(respuesta);

		// Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('La pelicula que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}

cargarPeliculas();

const form = document.getElementById('formPelicula');
const listaPeliculas = document.getElementById('listaPeliculas');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Obtener los valores de los campos
  const titulo = document.getElementById('titulo').value;
  const director = document.getElementById('director').value;
  const genero = document.getElementById('genero').value;

  // Validación básica
  if (!titulo || !director) {
    alert('Por favor, ingresa el título y el director de la película.');
    return;
  }

  // Crear un objeto con los datos de la película
  const nuevaPelicula = {
    titulo,
    director,
    genero
  };

  // Obtener las películas almacenadas o crear un array vacío
  let peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];

  // Agregar la nueva película al array
  peliculas.push(nuevaPelicula);

  // Almacenar el array actualizado en localStorage
  localStorage.setItem('peliculas', JSON.stringify(peliculas));

  // Limpiar el formulario
  form.reset();

  // Mostrar un mensaje de confirmación
  alert('Película agregada correctamente');

  // Mostrar las películas en la lista
  mostrarPeliculas();
});

function mostrarPeliculas() {
	const peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];
	listaPeliculas.innerHTML = '';;

  peliculas.forEach(pelicula => {
    const li = document.createElement('li');
    li.textContent = `${pelicula.titulo} (${pelicula.director}, ${pelicula.genero})`;
    listaPeliculas.appendChild(li);
  });
}