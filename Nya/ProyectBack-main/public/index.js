document.addEventListener("DOMContentLoaded", cargarPeliculas);
console.log("cargando");
const container = document.querySelector("#lista-peliculas");
const formularioAgregar = document.querySelector("#formAdd");

formularioAgregar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  const request = await fetch("http://localhost:4321/api/peliculas/add", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const datajson = await request.json();

  console.log(datajson);
});

async function cargarPeliculas() {
  const request = await fetch("http://localhost:4321/api/peliculas");
  const data = await request.json();

  data.peliculas.forEach((element) => {
    console.log(element);
    const parra = document.createElement("p");
    parra.innerHTML = element.titulo;
    const imgPel = document.createElement("img");
    imgPel.src = element.urlImagen;
    const div = document.createElement("div");
    const url = document.createElement("button");
    url.innerHTML = "Ver Ahora"; 
    url.addEventListener("click", () => {
      window.location.href = element.url; 
    });
    
    div.appendChild(parra);
    div.appendChild(imgPel);
    div.appendChild(url);
    container.appendChild(div);
  });

  console.log(data);
}
