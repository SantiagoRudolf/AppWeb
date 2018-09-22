

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
 	$('#employee_table').append(usu);

 	var valnivel = $('#nivel').val();
 	var valor = $('#TIPO').val();
 	$.each(data, function(key,value){
 		tipo = value.tipo;
 		nivel = value.nivel;
 		if (tipo == valor && nivel == valnivel){
 		usu += '<tr>';
 		usu += '<td>' +tipo+ '</td>';
 		usu += '<td>' +value.nombre+ '</td>';
 		usu += '<td>' +value.apellido+ '</td>';
 		usu += '</tr>';
 		} else {

 		if(nivel === valnivel){
 		usu += '<tr>';
 		usu += '<td>' +tipo+ '</td>';
 		usu += '<td>' +value.nombre+ '</td>';
 		usu += '<td>' +value.apellido+ '</td>';
 		usu += '</tr>';
 		}
 		else {
 			if (tipo === valor){
 		usu += '<tr>';
 		usu += '<td>' +tipo+ '</td>';
 		usu += '<td>' +value.nombre+ '</td>';
 		usu += '<td>' +value.apellido+ '</td>';
 		usu += '</tr>';

 		}
 	}
 }


 	});
 	$('#employee_table').append(usu);

 });
 });
 });

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
