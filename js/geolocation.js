

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

 
 
 
