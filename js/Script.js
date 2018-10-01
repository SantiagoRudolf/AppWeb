

var map;

 function initialize() {
   var punto = new google.maps.LatLng( -34.906377299999996, -57.925213899999996); //ubicación Flor de jardin
   var myOptions = {
     zoom: 18,
     center: punto,
   }
     map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
 }



 function pedirPosicion(pos) {
   var centro = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
   map.setCenter(centro);
   map.setMapTypeId(google.maps.MapTypeId.ROADMAP);

}

function geolocalizame(){
navigator.geolocation.getCurrentPosition(pedirPosicion);
 }

 function Negocio(){
var punto = new google.maps.LatLng( -34.906377299999996, -57.925213899999996);
  map.setCenter(punto);
 }




 $(document).ready(function(){
 $('#boton').click(function(){
 	$("#employee_table").empty();
 $.getJSON("http://localhost:3001/Usuarios",function(data){
 	var usu = '';
  console.log(data);
 	$('#resultados').text("");

 	var estado = $('#estado').val();
 	var tipo = $('#TIPO').val();
  var nombre = $('#nombre').val();
  var i = 1;

 if( tipo == "0"){
   tipo = "vacio";
 }
 if (estado == "0"){
   estado = "vacio";
 }
 if (nombre == ""){
   nombre = "vacio";
 }
 	$.each(data, function(key,value){
 		ti = value.tipo;
 		est = value.estado;
    nomb = value.nombre;
  console.log(tipo);
  console.log(estado);
  console.log(nombre);


    if ( (estado == est || estado =="vacio") && (tipo == ti || tipo =="vacio")&& (nombre == nomb || nombre == "vacio") && i <10) {
      usu += '<div class="col-md-3 animate-box fadeInUp animated-fast" id=div'+value.id+'>';
   		usu += '<p> Nombre: ' +value.nombre+ '</p>';
      usu += '<p> Apellido: ' +value.apellido+ '</p>';
   		usu += '<p> Tipo: ' +value.tipo+'</p>';
      	usu += '<p> Estado: ' +value.estado+'</p>';

      usu += '<button id="borrar" class="delete btn btn-danger" onclick ="borrar('+value.id+')"  value="Eliminar">Eliminar</button>';
      usu +=  '<button class="compartir" onclick="compartir('+value.id+')">Compartir</button>';
   		usu += '</div>';
      i= i+1;
        /*
        AGREGA AL HISTORIAL
        */
        //data = ',{ "id": ' + value.id + ', "nombre": ' + value.nombre +',"apellido": '+ value.apellido +',"tipo": '+ value.tipo +',"estado": ' + value.estado + ' }'
        $.ajax( {
          url: "http://localhost:3000/historial ",
          method : 'post', //en este caso
          dataType : 'json',
          type: "post",
          data: value,
          success: function( response ) {
            console.log(value);
          }
        });
        /*
        TERIMA DE AGREGAR AL HISTORIAL
        */
    }


})
if (i==10){
  $('#vermas').append('<button class="compartir" onclick="vermas()">ver mas </button>')

}

if (usu =="") {
  usu += ' <h3> no se encontraron resultados </h3>';
}
$('#resultados').append(usu);


 });

 });
})




$(document).ready(function(){

 $('#search').keyup(function(){

 			$('#result').html('');
 			var searchField = $('#search').val();

 			var expression = new RegExp(searchField, "i");
 			$.getJSON('http://localhost:3001/Usuarios', function(data){


 				$.each(data, function(key, value){
 					if(value.nombre.search(expression) != -1 || value.apellido.search(expression) != -1)
 				{
 					$('#result').append('<li class="list-group-item>' +value.nombre+' | <span class="text-muted">' +value.apellido+ '</span></li>');
 				}


 			});
 		});
 	});

 });



 $(document).ready(function(){
 $('#crear').click(function(e){
   e.preventDefault();
   var form = $('#nuevoUsuario');
   var data = $('#nuevoUsuario').serializeArray();
     $.ajax( {
       url: "http://localhost:3000/usuarios ",
       method : 'post', //en este caso
       dataType : 'json',
       type: "post",
       data: data,
       success: function( response ) {
         console.log(data);
         console.log( response );
         alert("el usuario se ha creado con exito")
         form[0].reset();

     }} );
   } );

 } );

$(document).ready(function(){   // funcion de prueba
$('#crearrrr').click(function(){
  event.preventDefault();
  var data = $('#nuevoUsuario').serializeArray();
  console.log(data);
})})




//   HISTORAIAL!!!!!!!!!!!!!!!!!!!!!!!
$(document).ready(function(){
 $("#historial").empty();
  $.getJSON("http://localhost:3000/historial",function(data){
  $.each(data, function(key,value){
    usu = '';
    usu += '<tr>';
    usu += '<td>' +value.tipo+ '</td>';
    usu += '<td>' +value.nombre+ '</td>';
    usu += '<td>' +value.apellido+ '</td>';
    usu += '</tr>';
  $('#historial').append(usu);
});
});
});

/*
AGREGA AL HISTORIAL
data = ',{ "id": ' + value.id + ', "nombre": ' + value.nombre +',"apellido": '+ value.apellido +',"tipo": '+ value.tipo +',"nivel": ' + value.nivel + ' }'
$.ajax( {
  url: "http://localhost:3000/historial ",
  method : 'post', //en este caso
  dataType : 'json',
  type: "post",
  data: data,
  success: function( response ) {
    console.log(data);
  }
});
TERIMA DE AGREGAR AL HISTORIAL
*/
function compartir(id){
  $.getJSON("http://localhost:3001/Usuarios",function(data){
event.preventDefault();
    console.log(data);
    	$.each(data, function(key,value){
    if(value.id == id){
      var usuario = "nombre: "+value.nombre+ "  Apellido: "+value.apellido+"  estado:"+value.estado ;
      localStorage.setItem("usuario",usuario);
    window.location.href = "compartir.html";

      //ahora falta meter estos datos en un lugar para compartirlos por mail
    }

  })
})}

$(window).ready(function(){
  var usuario = localStorage.getItem("usuario");
  console.log(usuario);
  $("#message").val(usuario);})



function borrar(idUsuario){
  $.ajax({
  type: "DELETE",
dataType: "json",
url: "http://localhost:3000/usuarios/"+idUsuario,
    success: function( response ) {
  $('#div'+idUsuario).text("");
  alert("el usuari fue borrado correctamente")
}})}


$(document).ready(function(){
 $('#crear').click(function(e){
   e.preventDefault();
   var form = $('#formmail');
   var data = $('#formmail').serializeArray();
     $.ajax( {
       url: "https://formspree.io/stamina.gym.11@gmail.com ",
       method : 'post', //en este caso
       dataType : 'json',
       type: "post",
       data: data,
       success: function( response ) {
         console.log(data);
         console.log( response );
         alert("el usuario se ha creado con exito")
         form[0].reset();

     }} );
   } );

 } );



 ////funcion ver mas

 function vermas(){
 $.getJSON("http://localhost:3001/Usuarios",function(data){
   var usu = '';
  console.log(data);
   $('#resultados').text("");
    $('#vermas').text("");

   var estado = $('#estado').val();
   var tipo = $('#TIPO').val();
  var nombre = $('#nombre').val();


 if( tipo == "0"){
   tipo = "vacio";
 }
 if (estado == "0"){
   estado = "vacio";
 }
 if (nombre == ""){
   nombre = "vacio";
 }
   $.each(data, function(key,value){
     ti = value.tipo;
     est = value.estado;
    nomb = value.nombre;



    if ( (estado == est || estado =="vacio") && (tipo == ti || tipo =="vacio")&& (nombre == nomb || nombre == "vacio") ) {
      usu += '<div class="col-md-3 animate-box fadeInUp animated-fast" id=div'+value.id+'>';
       usu += '<p> Nombre: ' +value.nombre+ '</p>';
      usu += '<p> Apellido: ' +value.apellido+ '</p>';
       usu += '<p> Tipo: ' +value.tipo+'</p>';
       usu += '<p> Estado: ' +value.estado+'</p>';

      usu += '<button id="borrar" class="delete btn btn-danger" onclick ="borrar('+value.id+')"  value="Eliminar">Eliminar</button>';
      usu +=  '<button class="compartir" onclick="compartir('+value.id+')">Compartir</button>';
       usu += '</div>';

        /*
        AGREGA AL HISTORIAL
        */
        //data = ',{ "id": ' + value.id + ', "nombre": ' + value.nombre +',"apellido": '+ value.apellido +',"tipo": '+ value.tipo +',"estado": ' + value.estado + ' }'
        $.ajax( {
          url: "http://localhost:3000/historial ",
          method : 'post', //en este caso
          dataType : 'json',
          type: "post",
          data: value,
          success: function( response ) {
            console.log(value);
          }
        });
        /*
        TERIMA DE AGREGAR AL HISTORIAL
        */
    }


})




if (usu =="") {
  usu += ' <h3> no se encontraron resultados </h3>';
}
$('#resultados').append(usu);


 });

 }
