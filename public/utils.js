const server = "http://localhost:3005/mascotas";

//REALIZO UN FETCH A MI SERVER EN EL CUAL HICIMOS UN FIND ANTERIORMENTE DE MI DB Y RECOPILO LA INFO
async function fetchMascotas() {
  const response = await fetch(server);
  const datos = await response.json();
  console.log(datos);

  const table = document.querySelector("#table");
  datos.filter(element => {
    const tr = document.createElement("tr");
    const tdnom = document.createElement("td");
    const tdEdad = document.createElement("td");
    const tdTipo = document.createElement("td");
    const tdCaract = document.createElement("td");

    tr.appendChild(tdnom);
    tr.appendChild(tdEdad);
    tr.appendChild(tdTipo);
    tr.appendChild(tdCaract);

    tdnom.innerText = element.nombre;
    tdEdad.innerText = element.edad;
    tdTipo.innerText = element.tipo;
    tdCaract.innerText = element.caracteristicas;
    table.appendChild(tr);
  });
}

fetchMascotas();