

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

 	var nivel = $('#nivel').val();
 	var tipo = $('#TIPO').val();
  var nombre = $('#nombre').val();
 	$.each(data, function(key,value){
 		ti = value.tipo;
 		niv = value.nivel;
    nomb = value.nombre;

    if (nivel == niv && tipo == ti && nombre == nomb ) {
      usu += '<tr>';
   		usu += '<td>' +value.tipo+ '</td>';
   		usu += '<td>' +value.nombre+ '</td>';
   		usu += '<td>' +value.apellido+ '</td>';
   		usu += '</tr>';
    }
    else {

          if (nivel == niv && tipo == ti && nombre == nomb ) {
            usu += '<tr>';
         		usu += '<td>' +value.tipo+ '</td>';
         		usu += '<td>' +value.nombre+ '</td>';
         		usu += '<td>' +value.apellido+ '</td>';
         		usu += '</tr>';
          }
          else {

                if (nivel == niv && tipo == ti && nombre == "" ) {
                  usu += '<tr>';
               		usu += '<td>' +value.tipo+ '</td>';
               		usu += '<td>' +value.nombre+ '</td>';
               		usu += '<td>' +value.apellido+ '</td>';
               		usu += '</tr>';
                }
                else {

                      if (nivel == niv && tipo == "0" && nombre == nomb ) {
                        usu += '<tr>';
                     		usu += '<td>' +value.tipo+ '</td>';
                     		usu += '<td>' +value.nombre+ '</td>';
                     		usu += '<td>' +value.apellido+ '</td>';
                     		usu += '</tr>';
                      }
                      else {

                            if (nivel == "0" && tipo == ti && nombre == nomb ) {
                              usu += '<tr>';
                           		usu += '<td>' +value.tipo+ '</td>';
                           		usu += '<td>' +value.nombre+ '</td>';
                           		usu += '<td>' +value.apellido+ '</td>';
                           		usu += '</tr>';
                            }
                            else {

                                  if (nivel == niv && tipo == "0" && nombre == "" ) {
                                    usu += '<tr>';
                                 		usu += '<td>' +value.tipo+ '</td>';
                                 		usu += '<td>' +value.nombre+ '</td>';
                                 		usu += '<td>' +value.apellido+ '</td>';
                                 		usu += '</tr>';
                                  }
                                  else {

                                        if (nivel == "0" && tipo == ti && nombre == "" ) {
                                          usu += '<tr>';
                                       		usu += '<td>' +value.tipo+ '</td>';
                                       		usu += '<td>' +value.nombre+ '</td>';
                                       		usu += '<td>' +value.apellido+ '</td>';
                                       		usu += '</tr>';
                                        }
                                        else {

                                              if (nivel == "0" && tipo == "0" && nombre == nomb ) {
                                                usu += '<tr>';
                                             		usu += '<td>' +value.tipo+ '</td>';
                                             		usu += '<td>' +value.nombre+ '</td>';
                                             		usu += '<td>' +value.apellido+ '</td>';
                                             		usu += '</tr>';
                                              }
                                            }}}}}}}})
   if (usu =="") {
     usu += ' <h3> no se encontraron resultados </h3>';
   }
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
