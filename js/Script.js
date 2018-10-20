

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
      usu += '<div class="col-md-3 animate-box fadeInUp animated-fast busquedaclientes" id=div'+value.id+'>';
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
if (i==10 ){
  $('#vermas').html('<button class="compartir" onclick="vermas()">ver mas </button>')

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
  alert("el usuario fue borrado correctamente")
}})}

function borrarH(idUsuario){
  $.ajax({
  type: "DELETE",
dataType: "json",
url: "http://localhost:3000/historial/"+idUsuario,
    success: function( response ) {

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
      usu += '<div class="col-md-3 animate-box fadeInUp animated-fast busquedaclientes" id=div'+value.id+'>';
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



//Buscar Rutinas
 $(document).ready(function(){
  $('#botonRutina').click(function(){
    $('#rutinas_table').empty();
    $.getJSON("http://localhost:3000/rutinas",function(data){
      console.log(data);
      var form = $('#formuRutinas');
      var usuario = $('#NombreUsuario').val();
      var tipoRutina = $('#TIPO').val();
      var nivelRutina = $('#Nivel').val();
      if (usuario == ""){
        usuario = "nada";
      }
      $.each(data, function(key,value){
        ti = value.tipo;
        niv = value.nivel;
        usua = value.usuario;
        if ( (nivelRutina == niv || nivelRutina == "nada") && (tipoRutina == ti || tipoRutina == "nada")&& (usuario == usua || usuario == "nada")) {
            ruti = '';
            ruti += '<tr id=tr'+value.id+'>';
            ruti += '<td>' +value.tipo+ '</td>';
            ruti += '<td>' +value.usuario+ '</td>';
            ruti += '<td>' +value.descripcionRutina+ '</td>';
            ruti += '<td><button id="borrarRutina" class="delete btn btn-danger" onclick ="borrarRutina('+value.id+')"  value="Eliminar">Eliminar</button></td>';
            ruti += '</tr>';
            $('#rutinas_table').append(ruti);
        }
      })
      form[0].reset();
    });
  });
});

var lista = []
//agregar ejercicio a rutina
$(document).ready(function(){
  $('#agregarEjercicio').click(function(){
    var ejer = $('#ejer').val();
    var descEjer = $('#descripcionEjer').val();
    if (ejer == "" || descEjer == "") {
      alert("Debe completar los campos");
    } else {
      var ejercicio = ejer+' '+descEjer;
      lista.push(ejercicio);
      console.log(lista);
      $('#ejer').text("");
      $('#descripcionEjer').text("");
      alert("El ejercicio se agrego correctamente");
    }
  })
})

//Nueva Rutina
$(document).ready(function(){
  $('#crearRutina').click(function(e){
    e.preventDefault();
    var form = $('#nuevaRutina');
    //var data = $('#nuevaRutina').serializeArray();
    console.log(lista);
    //$('select[id=ejemplo2]').val()
    var tip=$('').val();
    console.log(tip);
    var data = {
        "usuario" : $('#usuarioRutina').val(),
        "tipo" : $('#tipoRutina').val(),
        "ejercicios" : lista,
        "nivel" : $('#nivelRutina').val(),
        "descripcionRutina" : $('#descRutina').val()
    }
    $.ajax( {
      url: "http://localhost:3000/rutinas ",
      method : 'post', //en este caso
      dataType : 'json',
      type: "post",
      data: data,
      success: function( response ) {
        console.log(data);
        console.log( response );
        alert("La rutina se ha creado con exito")
        form[0].reset();
      }
    });
    lista = [];
  });
});


//Borrar Rutina
function borrarRutina(idRutina){
  if (confirm('¿Estas seguro que deseas eliminar esta rutina?')){
    $.ajax({
      type: "DELETE",
      dataType: "json",
      url: "http://localhost:3000/rutinas/"+idRutina,
      success: function( response ) {
        $('#tr'+idRutina).text("");
        alert("La rutina fue borrada correctamente");
      }
    });
  }
}



$(document).ready(function(){
 $('#iniciar').click(function(e){
   e.preventDefault();
    var usuario = $('#usuario').val();
    var contraseña = $('#contraseña').val();
    var encontrado = "no";

    $.getJSON("http://localhost:3000/usuarios",function(data){
    $.each(data, function(key,value){
         if (usuario == value.nombre){
           localStorage.setItem("usuarioo",JSON.stringify(value));
       window.location.replace("index.html");
       encontrado = "si";


           }

         })
       if(encontrado=="no"){alert("usuario o contraseña incorrecta")}})})})


    $(document).ready(function(){
        var usuario = JSON.parse(localStorage.getItem("usuarioo"));
        ruti = "";

        $('#bienvenido').html("bienvenido "+ usuario.nombre);
        if(usuario.nombre != "admin"){

          $('#nuevaRutina').css("display","none");
          $('#formuRutinas').css("display","none");
          $('#tablaAdmin').css("display","none");
          $('#tablaUsuario').css("display","block");
          $('.admin').css("display","none");

            $.getJSON("http://localhost:3000/rutinas",function(data){
                $.each(data, function(key,value){
                  if(value.usuario == usuario.nombre){

                    ruti += '<tr id=tr'+value.id+'>';
                    ruti += '<td>' +value.tipo+ '</td>';
                    ruti += '<td>' +value.descripcion+ '</td>';
                        ruti += '</tr>';


                  }})
                      $('#rutinas_table_U').append(ruti);})}})



/*$(document).ready(function(){
    var usuarios= [""];

    $.getJSON("http://localhost:3000/rutinas",function(data){
      console.log("esta andando");
        $.each(data, function(key,value){
          console.log(value.usuario);
          usuarios.push(value.usuario);
       console.log(usuarios);
});})})*/





$(document).ready(function(){
$('#botonPagos').click(function(){
 $("#employee_table").empty();
$.getJSON("http://localhost:3001/Usuarios",function(data){
 var usu = '';
 $('#pagos_table').text("");

 var usuario = $('#formusuario').val();
 var nombre = $('#NombreUsuario').val();
 var apellido = $('#apellidoUsuario').val();


if( usuario == ""){
  usuario = "vacio";
}
if (nombre == ""){
  nombre = "vacio";
}
if (apellido == ""){
  apellido = "vacio";
}
 $.each(data, function(key,value){
   u = value.usuario;
   n = value.nombre;
   a = value.apellido;
 console.log("esta andando");


   if ( (nombre == n || nombre =="vacio" && n != "admin") && (usuario == u || usuario =="vacio")&& (apellido == a || apellido == "vacio") ) {
     usu += '<tr>';
     usu += '<td>' +value.tipo+ '</td>';
     usu += '<td>' +value.nombre+" "+value.apellido+ '</td>';
     usu += '<td>' +value.fecha+ '</td>';
     usu += '<td><button id="agregarMes" class="delete btn btn-danger" onclick ="agregarmes('+value.id+')" >Agregar Mes</button></td>';
     usu += '<td><button id="agregarMes" class="delete btn btn-danger" onclick ="editar('+value.id+')" >editar</button> </td>';
     usu += '</tr>';

   }


})

$('#pagos_table').append(usu);


});

});})





//funcion para mostrar la fecha actual

$(document).ready(function(){

var f = new Date();
$('#fecha').val(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear());
})




//agrega el pago de un mes
function agregarmes(id){
var usuario ="";
var f ="";

  $.ajax({
    type: "GET",
    dataType: "json",
    url: "http://localhost:3000/usuarios/"+id,
      success: function(data ) {
    usuario= data;

     var f = new Date(usuario.fecha);

f.setMonth(f.getMonth() + 1);
console.log(f);
f = (  f.getFullYear() +"-"+(f.getMonth() +1)+"-"+f.getDate())
  if (confirm('¿agregar un mes a '+usuario.nombre+" "+ usuario.apellido+"?")){
 $.ajax({
    type: "PATCH",
    dataType: "string",
    data: {fecha: f},
    url: "http://localhost:3000/usuarios/"+id,
  })
  recargar();
}recargar();}})}

  function recargar(){
    document.getElementById("botonPagos").click();
  }


  function editar(id){
    var f ="";
window.location="#Modal";
$('#botonEditar').click(function(){
  f = $('#nuevafecha').val();
  $.ajax({
     type: "PATCH",
     dataType: "string",
     data: {fecha: f},
     url: "http://localhost:3000/usuarios/"+id,
   });
   window.location="#close"
recargar();
});;
 recargar();}
