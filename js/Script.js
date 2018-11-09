$(document).ready(function () {
  $('#boton').click(function () {
    $("#employee_table").empty();
    $.getJSON("http://localhost:3001/Usuarios", function (data) {
      var usu = '';
      console.log(data);
      $('#usuarios').text("");

      var estado = $('#estado').val();
      var tipo = $('#TIPO').val();
      var nombre = $('#nombre').val();
      var i = 1;

      if (tipo == "0") {
        tipo = "vacio";
      }
      if (estado == "0") {
        estado = "vacio";
      }
      if (nombre == "") {
        nombre = "vacio";
      }
      $.each(data, function (key, value) {
        ti = value.tipo;
        est = value.estado;
        nomb = value.nombre;
        console.log(tipo);
        console.log(estado);
        console.log(nombre);


        if ((estado == est || estado == "vacio") && (tipo == ti || tipo == "vacio") && (nombre == nomb || nombre == "vacio" && nomb != "admin") && i < 10) {
          usu += '<tr>';
          usu += '<td>' + value.nombre + '</td>';
          usu += '<td>' + value.apellido + '</td>';
          usu += '<td>' + value.estado + '</td>';
          usu += '<td><button id="borrar" class="delete btn btn-danger" onclick ="borrar(' + value.id + ')"  value="Eliminar">Eliminar</button></td>';
          usu += '<td><button class="compartir" onclick="rutinas(' + value.id + ')">rutinas</button></td>';
          usu += '</tr>';
          i = i + 1;
          /*
          AGREGA AL HISTORIAL
          */
          //data = ',{ "id": ' + value.id + ', "nombre": ' + value.nombre +',"apellido": '+ value.apellido +',"tipo": '+ value.tipo +',"estado": ' + value.estado + ' }'
          $.ajax({
            url: "http://localhost:3000/historial ",
            method: 'post', //en este caso
            dataType: 'json',
            type: "post",
            data: value,
            success: function (response) {
              console.log(value);
            }
          });
          /*
          TERIMA DE AGREGAR AL HISTORIAL
          */
        }


      })
      if (i == 10) {
        $('#vermas').html('<button class="compartir" onclick="vermas()">ver mas </button>')

      }

      if (usu == "") {
        usu += ' <h3> no se encontraron resultados </h3>';
      }
      $('#usuarios').append(usu);


    });

  });
})




$(document).ready(function () {

  $('#search').keyup(function () {

    $('#result').html('');
    var searchField = $('#search').val();

    var expression = new RegExp(searchField, "i");
    $.getJSON('http://localhost:3001/Usuarios', function (data) {


      $.each(data, function (key, value) {
        if (value.nombre.search(expression) != -1 || value.apellido.search(expression) != -1) {
          $('#result').append('<li class="list-group-item>' + value.nombre + ' | <span class="text-muted">' + value.apellido + '</span></li>');
        }


      });
    });
  });

});



$(document).ready(function () {
  $('#crear').click(function (e) {
    e.preventDefault();
    var form = $('#nuevoUsuario');
    var data = $('#nuevoUsuario').serializeArray();
    $.ajax({
      url: "http://localhost:3000/usuarios ",
      method: 'post', //en este caso
      dataType: 'json',
      type: "post",
      data: data,
      success: function (response) {
        console.log(data);
        console.log(response);
        alert("el usuario se ha creado con exito")
        form[0].reset();

      }
    });
  });

});

$(document).ready(function () {   // funcion de prueba
  $('#crearrrr').click(function () {
    event.preventDefault();
    var data = $('#nuevoUsuario').serializeArray();
    console.log(data);
  })
})




//   HISTORAIAL!!!!!!!!!!!!!!!!!!!!!!!
$(document).ready(function () {
  $.getJSON("http://localhost:3000/historial", function (data) {
    $.each(data, function (key, value) {
      usu = '';
      usu += '<tr>';
      usu += '<td>' + value.tipo + '</td>';
      usu += '<td>' + value.nombre + '</td>';
      usu += '<td>' + value.apellido + '</td>';
      usu += '</tr>';
      $('#historial').append(usu);
    });
  });
});

function compartir(id) {
  $.getJSON("http://localhost:3001/Usuarios", function (data) {
    event.preventDefault();
    console.log(data);
    $.each(data, function (key, value) {
      if (value.id == id) {
        var usuario = "nombre: " + value.nombre + "  Apellido: " + value.apellido + "  estado:" + value.estado;
        localStorage.setItem("usuario", usuario);
        window.location.href = "compartir.html";

        //ahora falta meter estos datos en un lugar para compartirlos por mail
      }

    })
  })
}

$(window).ready(function () {
  var usuario = localStorage.getItem("usuario");
  console.log(usuario);
  $("#message").val(usuario);
})



function borrar(idUsuario) {
  $.ajax({
    type: "DELETE",
    dataType: "json",
    url: "http://localhost:3000/usuarios/" + idUsuario,
    success: function (response) {
      $('#div' + idUsuario).text("");
      alert("el usuario fue borrado correctamente")
    }
  })
}

function borrarH(idUsuario) {
  $.ajax({
    type: "DELETE",
    dataType: "json",
    url: "http://localhost:3000/historial/" + idUsuario,
    success: function (response) {

    }
  })
}


$(document).ready(function () {
  $('#crear').click(function (e) {
    e.preventDefault();
    var form = $('#formmail');
    var data = $('#formmail').serializeArray();
    $.ajax({
      url: "https://formspree.io/stamina.gym.11@gmail.com ",
      method: 'post', //en este caso
      dataType: 'json',
      type: "post",
      data: data,
      success: function (response) {
        console.log(data);
        console.log(response);
        alert("el usuario se ha creado con exito")
        form[0].reset();

      }
    });
  });

});



////funcion ver mas

function vermas() {
  $.getJSON("http://localhost:3001/Usuarios", function (data) {
    var usu = '';
    console.log(data);
    $('#resultados').text("");
    $('#vermas').text("");

    var estado = $('#estado').val();
    var tipo = $('#TIPO').val();
    var nombre = $('#nombre').val();


    if (tipo == "0") {
      tipo = "vacio";
    }
    if (estado == "0") {
      estado = "vacio";
    }
    if (nombre == "") {
      nombre = "vacio";
    }
    $.each(data, function (key, value) {
      ti = value.tipo;
      est = value.estado;
      nomb = value.nombre;



      if ((estado == est || estado == "vacio") && (tipo == ti || tipo == "vacio") && (nombre == nomb || nombre == "vacio")) {
        usu = '';
        usu += '<tr>';
        usu += '<td>' + value.nombre + '</td>';
        usu += '<td>' + value.apellido + '</td>';
        usu += '<td>' + value.estado + '</td>';
        usu += '<td><button id="borrar" class="delete btn btn-danger" onclick ="borrar(' + value.id + ')"  value="Eliminar">Eliminar</button>';
        usu += '<button class="compartir" onclick="compartir(' + value.id + ')">Compartir</button>';
        usu += '</tr>';

        /*
        AGREGA AL HISTORIAL
        */
        //data = ',{ "id": ' + value.id + ', "nombre": ' + value.nombre +',"apellido": '+ value.apellido +',"tipo": '+ value.tipo +',"estado": ' + value.estado + ' }'
        $.ajax({
          url: "http://localhost:3000/historial ",
          method: 'post', //en este caso
          dataType: 'json',
          type: "post",
          data: value,
          success: function (response) {
            console.log(value);
          }
        });
        /*
        TERIMA DE AGREGAR AL HISTORIAL
        */
      }


    })



    if (usu == "") {
      usu += ' <h3> no se encontraron resultados </h3>';
    }
    $('#resultados').append(usu);


  });

}



//Buscar Rutinas
$(document).ready(function () {
  $('#botonRutina').click(function () {
    $('#rutinas_table').empty();
    $.getJSON("http://localhost:3000/rutinas", function (data) {
      console.log(data);
      var form = $('#formuRutinas');
      var usuario = $('#NombreUsuario').val();
      var tipoRutina = $('#TIPO').val();
      var nivelRutina = $('#Nivel').val();
      if (usuario == "") {
        usuario = "nada";
      }
      $.each(data, function (key, value) {
        ti = value.tipo;
        niv = value.nivel;
        usua = value.usuario;
        if ((nivelRutina == niv || nivelRutina == "nada") && (tipoRutina == ti || tipoRutina == "nada") && (usuario == usua || usuario == "nada")) {
          ruti = '';
          ruti += '<tr id=tr' + value.id + '>';
          ruti += '<td>' + value.tipo + '</td>';
          ruti += '<td>' + value.usuario + '</td>';
          ruti += '<td>' + value.descripcionRutina + '</td>';
          ruti += '<td><button id="ejerciciosVer" class="delete btn btn-danger" onclick ="verEjercicios(' + value.id + ')" >Ver Ejercicios</button> </td>';
          ruti += '<td><button id="borrarRutina" class="delete btn btn-danger" onclick ="borrarRutina(' + value.id + ')"  value="Eliminar">Eliminar</button></td>';
          ruti += '</tr>';
          $('#rutinas_table').append(ruti);
        }
      })
      form[0].reset();
    });
  });
});
//


function guardarEjercicios() {
  var prue = JSON.parse(localStorage.getItem('datos'));
  var id = JSON.parse(localStorage.getItem('idUsuarioCambiado'));
  var nuevaLista = new Array;
  console.log("llega");
  var tam = prue.length;
  console.log
  for (var i=0; i<tam; i++){
    var ej;
    var de;
    if ( $('#ejer'+i).val() == ""){
      ej = prue[i].ejer;
    } else {
      ej = $('#ejer'+i).val()
    }
    if ( $('#desc'+i).val() == ""){
      de = prue[i].desc;
    } else {
      de = $('#desc'+i).val();
    }
    var ejercicio = {
      "ejer": ej,
      "desc": de
    }
    nuevaLista.push(ejercicio);
  }
  var nose = JSON.stringify(nuevaLista);
  $.ajax({
    type: "PATCH",
    dataType: "string",
    data: { ejercicios: nose },
    url: "http://localhost:3000/rutinas/" + id,
  });
}

function verEjercicios(id) {
  window.location = "#modalRutina";
  localStorage.setItem('idUsuarioCambiado', JSON.stringify(id));
  $('#ejercicios').empty();
  var i = 0;
  $.getJSON("http://localhost:3000/rutinas", function (data) {
    $.each(data, function (key, value) {
      if (value.id == id) {
        localStorage.setItem('datos', value.ejercicios);
        var prue = JSON.parse(value.ejercicios);
        prue.forEach(function(elemento, indice, array) {
          console.log("entra");
          e = '';
          e += '<tr>';
          e += '<td><input id="ejer'+i+'" type="text" class="form-control" name="ejerc'+i+'" placeholder='+elemento.ejer+' style="margin-bottom:20px" required></td>';
          e += '<td><input id="desc'+i+'" type="text" class="form-control" name="desc" placeholder='+elemento.desc+' style="margin-bottom:20px" required></td>';
          e += '</tr>';
          i += 1;
          $('#ejercicios').append(e);
        });
      }
    })
  })
}

//agregar ejercicio a rutina


//Nueva Rutina
$(document).ready(function () {
  var l = new Array();
  $('#agregarEjercicio').click(function () {
    var ejer = $('#ejercic').val();
    var descEjer = $('#descripcionEjer').val();
    if (ejer == "" || descEjer == "") {
      alert("Debe completar los campos");
    } else {
      var ejercicio = {
        "ejer": ejer,
        "desc": descEjer
      }
      l.push(ejercicio);
      console.log(l);
      $('#ejercic').text("");
      $('#descripcionEjer').text("");
      alert("El ejercicio se agrego correctamente");
      localStorage.setItem("lista", JSON.stringify(l));
    }
    $('#cargandoEjercicios').empty();
    l.forEach(function(elemento, indice, array){
      tab = '';
      tab += '<tr>';
      tab += '<td>'+elemento.ejer+'</td>';
      tab += '<td>'+elemento.desc+'</td>';
      tab += '</tr>';
      $('#cargandoEjercicios').append(tab);
    })
  })


  $('#crearRutina').click(function (e) {
    e.preventDefault();
    var form = $('#nuevaRutina');
    var lis = JSON.stringify(l);
    console.log(lis)
    var dato = {
        "usuario": $('#usuarioRutina').val(),
        "tipo": $('#tipoRutina').val(),
        "ejercicios": lis,
        "nivel": $('#nivelRutina').val(),
        "descripcionRutina": $('#descRutina').val()
    }
    var datito = dato.toJSON;
    console.log(datito);
    $.ajax({
      url: "http://localhost:3000/rutinas ",
      method: 'post', //eneste caso
      dataType: 'json',
      type: "post",
      data: dato,
      success: function (dato) {
        console.log(dato);
        alert("La rutina se ha creado con exito")
        form[0].reset();
      }
    });
    lista = [];
  });
});


//Borrar Rutina
function borrarRutina(idRutina) {
  if (confirm('¿Estas seguro que deseas eliminar esta rutina?')) {
    $.ajax({
      type: "DELETE",
      dataType: "json",
      url: "http://localhost:3000/rutinas/" + idRutina,
      success: function (response) {
        $('#tr' + idRutina).text("");
        alert("La rutina fue borrada correctamente");
      }
    });
  }
}



$(document).ready(function () {
  $('#iniciar').click(function (e) {
    e.preventDefault();
    var usuario = $('#usuario').val();
    var contraseña = $('#contraseña').val();
    var encontrado = "no";

    $.getJSON("http://localhost:3000/usuarios", function (data) {
      $.each(data, function (key, value) {
        if (usuario == value.usuario && contraseña == value.contraseña) {
          localStorage.setItem("usuarioo", JSON.stringify(value));
          window.location.replace("index.html");
          encontrado = "si";


        }

      })
      if (encontrado == "no") { alert("usuario o contraseña incorrecta") }
    })
  })
})


$(document).ready(function () {
  var usuario = JSON.parse(localStorage.getItem("usuarioo"));
  var ruti = "";
  var ejer = "";

  $('#bienvenido').html("bienvenido " + usuario.nombre);
  if (usuario.nombre != "admin") {
    $('.admin').css("display", "none");
  }
  else {
    $('.usuario').css("display", "none");
    console.log("no esta entrando")
  }

  $.getJSON("http://localhost:3000/rutinas", function (data) {
    $.each(data, function (key, value) {
      if (value.usuario == usuario.usuario) {


        console.log(value);
        console.log(value.ejercicios);
        var lista = JSON.parse(localStorage.getItem("lista"));
        console.log(lista);


        ruti += '<tr id=tr' + value.id + '>';
        ruti += '<td>' + value.tipo + '</td>';
        ruti += '<td>' + value.descripcionRutina + '</td>';
        ruti += '<td> <a href="#modalRutina"> ver rutina </a> </td>';
        ruti += '</tr>';

      }
    })


    $('#rutinas_table_U').append(ruti);
    $('#ejercicios').append(ejer);
  })
})


/*$(document).ready(function(){
    var usuarios= [""];

    $.getJSON("http://localhost:3000/rutinas",function(data){
      console.log("esta andando");
        $.each(data, function(key,value){
          console.log(value.usuario);
          usuarios.push(value.usuario);
       console.log(usuarios);
});})})*/





$(document).ready(function () {
  $('#botonPagos').click(function () {
    $("#employee_table").empty();
    $.getJSON("http://localhost:3001/Usuarios", function (data) {
      var usu = '';
      $('#pagos_table').text("");

      var usuario = $('#formusuario').val();
      var nombre = $('#NombreUsuario').val();
      var apellido = $('#apellidoUsuario').val();


      if (usuario == "") {
        usuario = "vacio";
      }
      if (nombre == "") {
        nombre = "vacio";
      }
      if (apellido == "") {
        apellido = "vacio";
      }
      $.each(data, function (key, value) {
        u = value.usuario;
        n = value.nombre;
        a = value.apellido;
        console.log("esta andando");


        if ((nombre == n || nombre == "vacio" && n != "admin") && (usuario == u || usuario == "vacio") && (apellido == a || apellido == "vacio")) {
          usu += '<tr>';
          usu += '<td>' + value.tipo + '</td>';
          usu += '<td>' + value.nombre + " " + value.apellido + '</td>';
          usu += '<td>' + value.fecha + '</td>';
          usu += '<td><button id="agregarMes" class="delete btn btn-danger" onclick ="agregarmes(' + value.id + ')" >Agregar Mes</button></td>';
          usu += '<td><button id="agregarMes" class="delete btn btn-danger" onclick ="editar(' + value.id + ')" >editar</button> </td>';
          usu += '</tr>';

        }


      })

      $('#pagos_table').append(usu);


    });

  });
})





//funcion para mostrar la fecha actual

$(document).ready(function () {

  var f = new Date();
  $('#fecha').val(f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear());
})




//agrega el pago de un mes
function agregarmes(id) {
  var usuario = "";
  var f = "";
  var faux = "";

  $.ajax({
    type: "GET",
    dataType: "json",
    url: "http://localhost:3000/usuarios/" + id,
    success: function (data) {
      usuario = data;

      var f = new Date(usuario.fecha);
      faux = f;
      f.setMonth(f.getMonth() + 1);
      console.log(f);
      f = (f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate())
      faux = (faux.getFullYear() + "-" + (faux.getMonth()) + "-" + faux.getDate())
      if (confirm('¿agregar un mes a ' + usuario.nombre + " " + usuario.apellido + "?")) {
        $('#comprobanteNombre').html("Usuario:" + usuario.nombre + " " + usuario.apellido);
        $('#fechaPago').html('fecha: ' + faux);
        $('#fechaVencimiento').html('nuevo vencimiento: ' + f);
        window.location = "#imprimir";
        $.ajax({
          type: "PATCH",
          dataType: "string",
          data: { fecha: f },
          url: "http://localhost:3000/usuarios/" + id,
        })
        recargar();
      } recargar();
    }
  })
}



function recargar() {
  document.getElementById("botonPagos").click();
}


function editar(id) {
  var f = "";
  window.location = "#Modal";
  $('#botonEditar').click(function () {
    f = $('#nuevafecha').val();
    $.ajax({
      type: "PATCH",
      dataType: "string",
      data: { fecha: f },
      url: "http://localhost:3000/usuarios/" + id,
    });
    window.location = "#close"
    recargar();
  });;
  recargar();
}



function pruebaDivAPdf() {
  var pdf = new jsPDF('p', 'pt', 'letter');
  source = $('#imprimir')[0];

  specialElementHandlers = {
    '#bypassme': function (element, renderer) {
      return true
    }
  };
  margins = {
    top: 80,
    bottom: 60,
    left: 40,
    width: 522
  };

  pdf.fromHTML(
    source,
    margins.left, // x coord
    margins.top, { // y coord
      'width': margins.width,
      'elementHandlers': specialElementHandlers
    },

    function (dispose) {
      pdf.save('Prueba.pdf');
    }, margins
  );
}

function rutinas(id) {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "http://localhost:3000/usuarios/" + id,
    success: function (data) {
      var usuario = data.usuario;
      localStorage.setItem("usuariorutina", usuario);

      window.location.href = "rutinas.html"
    }
  })
}

$(document).ready(function () {
  var usuario = localStorage.getItem("usuariorutina");
  if (usuario != "") {
    $("#usuarioRutina").val(usuario);
    localStorage.setItem("usuariorutina", "");

    $.getJSON("http://localhost:3000/rutinas", function (data) {


      $.each(data, function (key, value) {
        if (value.usuario == usuario) {
          ruti = '';
          ruti += '<tr id=tr' + value.id + '>';
          ruti += '<td>' + value.tipo + '</td>';
          ruti += '<td>' + value.usuario + '</td>';
          ruti += '<td>' + value.descripcionRutina + '</td>';
          ruti += '<td><button id="ejerciciosVer" class="delete btn btn-danger" onclick ="verEjercicios(' + value.id + ')" >Ver Ejercicios</button> </td>';
          ruti += '<td><button id="borrarRutina" class="delete btn btn-danger" onclick ="borrarRutina(' + value.id + ')"  value="Eliminar">Eliminar</button></td>';
          ruti += '</tr>';
          $('#rutinas_table').append(ruti);
        }
      })

    });
  }
})
