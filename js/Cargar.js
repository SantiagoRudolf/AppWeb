let url = "http://localhost:3001/Usuarios";

fetch(url)
.then((response) =>{

return response.json();
})
.then((json) =>{
    console.log(json);
    renderHtml(json);

})

function renderHtml(json) {

    let Usuarios = json;
    let html = `<ul>`;


    Usuarios.map(Usuario => {

        html += renderProducto(Usuario);

    })
    html += `</ul>`;
    document.getElementById('Usuarios').innerHTML = html;
}


function renderProducto(Usuario) {

    let html = `<li>${Usuario.nombre} ${Usuario.apellido}</li>`;

    return html;

}
