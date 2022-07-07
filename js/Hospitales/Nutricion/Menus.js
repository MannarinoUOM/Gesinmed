var como = "";
var listIds = new Array();
var fechaAseguir = "";
var indiceDeInternacion = 0;
var sigue = 0;
var indiceAseguir = 0;
var fechaIngreso = "";
var AIdalmuerzo = 0;
var Aalmuerzo = "";
var AIdcena = 0;
var Acena = "";
var menuGlobal = {};
var porMemoria = 0;
var menuAcompañante = {};
var mostrar = 0;
var queComida = "";
var listaDeComidasSeleccionadas = new Array();
var idNutricion = 0;
var idNutricionAcompañante = 0;
var deDondeCarga = 0;
var cargarAux = 0;
var cargarCombosAcompañante = 0;
var objBusquedaLista = "";

listIds.length = 0;

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["check"] != "" && GET["check"] != null) {
        $("#cboSi").attr('checked', true);
        $("#cboSi").attr('disabled', true);
        $("#cboNo").attr('checked', false);
        $("#cboNo").attr('disabled', false);
        $("#btnEditarAcompañante").hide();
    }
        
    if (GET["como"] != "" && GET["como"] != null) {
        como = GET["como"];
    }
    if (GET["indiceAseguir"] != "" && GET["indiceAseguir"] != null) {
        indiceAseguir = GET["indiceAseguir"];
        indiceDeInternacion = parseInt(indiceAseguir);
//       // alert(indiceAseguir);
    }
    if (GET["fecha"] != "" && GET["fecha"] != null) {
         fechaAseguir = GET["fecha"];     
     }
     if (GET["mostrarBoton"] != "" && GET["mostrarBoton"] != null) {
       $("#btnEditarAcompañante").show();
   }

   if (GET["idInternacion"] != "" && GET["idInternacion"] != null) {
       var idInternacion = GET["idInternacion"];
   }
   if (GET["idNutricion"] != "" && GET["idNutricion"] != null) {
        idNutricion = GET["idNutricion"];
   }
    if (GET["idNutricionAcompañante"] != "" && GET["idNutricionAcompañante"] != null) {
        idNutricionAcompañante = GET["idNutricionAcompañante"];
    } 
   if (GET["queComida"] != "" && GET["queComida"] != null) {
       queComida = GET["queComida"];
       switch (queComida) {
           case "1":
           queComida = "almuerzo";
               break;              
           case "2":
               queComida = "cena";
               break;
       }
   }

  

   $("#btnLimpiar").click(function () {
       var json = JSON.stringify({
           "idInternacion": idInternacion,
           "fechaComida": hoy
       });


          $.ajax({
              type: "POST",
              url: "../Json/Nutricion/Nutricion.asmx/NutricionBorrarDetalle",
              contentType: "application/json; charset=utf-8",
              data: json,
              success: function () {
                  $("#txtAlmuerzo").val("");
                  $("#txtCena").val("");
              },
              error: errores
          });

      });

////////////////////DE A UNO////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
////////////////////DE A UNO////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
      if (como == "deAuno") {

          //  var idInternacion = 0;
          var fecha = new Date();
          var hoy = "";
          var listaIndicaciones = new Array();
          var listaMenu = new Array();
          var idPaciente = 0;
          var idNutricion = 0;
          var paso = false;
          var quitar = 0;
          var dia = "";
          var mes = "";
          var ano = "";

          parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Pacientes Internados</strong> > <strong>Nutrición</strong>";



          $("#btnVerTotales").hide();
          $("#btnGuardar").hide();

          $(document).ready(function () {
              if ($("[rel=tooltip]").length) {
                  $("[rel=tooltip]").tooltip();
              }

              var GET = {};

              document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
                  function decode(s) {
                      return decodeURIComponent(s.split("+").join(" "));
                  }

                  GET[decode(arguments[1])] = decode(arguments[2]);
              });

              if (GET["ID_Int"] != "" && GET["ID_Int"] != null) {
                  //alert(como);
                  hoy = fecha.getFullYear();
                  idInternacion = GET["ID_Int"];
                  Cargar_Encabezado_idInternacion(idInternacion);
              }

              if (GET["B"] != undefined && GET["B"] != null) {
                  objBusquedaLista = GET["B"];
              }

              if (GET["check"] != "" && GET["check"] != null) {
                  $("#cboSi").attr('checked', true);
                  $("#cboSi").attr('disabled', true);
                  $("#cboNo").attr('checked', false);
                  $("#cboNo").attr('disabled', false);
                  $("#btnEditarAcompañante").show();
                  //alert(GET["check"]);
              }

              $("#txtFecha").keydown(function () { return false; });
              $("#txtFecha").datepicker({
                  dateFormat: 'dd/mm/yy',
                  changeMonth: true,
                  changeYear: true,
                  onClose: function (selectedDate) {
                      $("#btnEditarAcompañante").hide();
                      $("#cboNo").attr('checked', true);
                      $("#cboNo").attr('disabled', true);
                      $("#cboSi").attr('disabled', false);
                      $("#cboSi").attr('checked', false);
                      $("#txtAlmuerzo").val("");
                      $("#txtCena").val("");

                      hoy = $("#txtFecha").val();
                      var json = JSON.stringify({
                          "fecha": $("#txtFecha").val()
                      });

                      $.ajax({
                          type: "POST",
                          url: "../Json/Nutricion/Nutricion.asmx/traerIdsInternacion",
                          contentType: "application/json; charset=utf-8",
                          data: json,
                          dataType: "json",
                          success: traerIdsInternacionCargar,
                          error: errores
                      });
                      cargarIndicaiones(idInternacion, hoy);
                      if (listaIndicaciones.length > 0) {
                      }
                  }
              });

              /// Cargar_Encabezado_idInternacion(idInternacion);

              dia = fecha.getDate();
              mes = fecha.getMonth() + 1;
              ano = fecha.getFullYear();

              hoy = dia + "/" + mes + "/" + ano;
              $("#txtFecha").val(hoy);
              if (fechaAseguir != "") {
                  $("#txtFecha").val(fechaAseguir); ///////////////////////////////////////////////////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
              }
              cargarIndicaiones(idInternacion, hoy);

          });

          function errores(msg) {
              var jsonObj = JSON.parse(msg.responseText);
              alert('Error: ' + jsonObj.Message);
          }


          function exito(resultado) {
              var M = resultado.d;

              $.each(M, function (index, res) {

                  if (res.id != 33)
                      $("#cboAlmuerzo").append(new Option(res.apodo, res.id));

                  if (res.id != 32)
                      $("#cboCena").append(new Option(res.apodo, res.id));
              });
              $("#cboCena").append(new Option("Seleccione", 0));
              $("#cboCena").val(0);
              $("#cboAlmuerzo").append(new Option("Seleccione", 0));
              $("#cboAlmuerzo").val(0);
          }
          /////////////////////////////CARGAR ENCABEZADO//////////////////////////////////////////////////
          function Cargar_Encabezado_idInternacion(NHC) {
              $.ajax({
                  type: "POST",
                  url: "../Json/Nutricion/Nutricion.asmx/cargarEncabezado",
                  data: '{idInternacion: "' + idInternacion + '"}',
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  beforeSend: function () {
                      $("#cargando").show();
                      $("#TablaConsultas").empty();
                      $("#TablaConsultas").hide();
                  },
                  complete: function () {
                      $("#cargando").hide();
                      $("#TablaConsultas").show();
                  },
                  success: Cargar_Encabezado_Cargado,
                  error: errores
              });
          }

          function Cargar_Encabezado_Cargado(Resultado) {
              var E = Resultado.d;
              idPaciente = E.documento;

              $("#txt_dni").attr('value', E.documento_real);
              $("#txtNHC").attr('value', E.NHC_UOM);
              $("#CargadoApellido").html(E.apellido);
              $("#CargadoEdad").html(E.Edad_Format);
              $("#CargadoDNI").html(E.documento_real);
              $("#CargadoNHC").html(E.NHC_UOM);
              $("#CargadoSeccional").html(E.seccional)
              $("#CargadoLocalidad").html(E.localidad);
              $("#CargadoMedico").html(E.medico);
              $("#CargadoServicio").html(E.servicio);
              $("#CargadoSala").html(E.sala);
              $("#CargadoCama").html(E.cama);
              if (E.fecha_Egreso != null) {
                  $("#CargadoEgresoFecha").html(E.fecha_Egreso);
                  $("#contenedorFechaEgreso").show();
              } else { $("#contenedorFechaEgreso").hide(); }
              fechaIngreso = E.fehcaInternacion;
              var ruta = "silueta";
              if (E.foto == "0") { $('#fotopaciente').attr('src', '../img/silueta.jpg'); } else { $('#fotopaciente').attr('src', '../fotoPerfil/' + E.foto); }

          }

          $('#fotopaciente').error(function () {
              $(this).attr('src', '../img/silueta.jpg');
          });


          /////////////////////////////CARGAR INDICACIONES//////////////////////////////////////////////////
          function cargarIndicaiones(id, fecha) {

              // alert(idInternacion);
              var json = JSON.stringify({
                  "idInternacion": idInternacion,
                  "fecha": hoy
              });


              $.ajax({
                  type: "POST",
                  url: "../Json/Nutricion/Nutricion.asmx/cargarIndicaciones",
                  //            data: '{idInternacion: "' + idInternacion + '"}',
                  data: json,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  beforeSend: function () {
                      //alert("paso before");
                      $("#cboSi").attr('checked', false);
                      $("#cboSi").attr('disabled', false);

                      $("#cboNo").attr('checked', true);
                      $("#cboNo").attr('disabled', true);
                      $("#btnEditarAcompañante").hide();

                  },
                  complete: cargar2(idInternacion),
                  success: Cargar_Indicaciones_Cargado,
                  error: errores
              });

          }


          function Cargar_Indicaciones_Cargado(resultado) {
              var I = resultado.d;
              var indicacion = {};
              listaIndicaciones.length = 0;
              $("#TablaConsultas").empty();
              var Encabezado = "<table class='table table-bordered table-hover table-condensed' style='width: 100%; text-align:center'><thead><tr><th>Indicaciones</th></tr>";

              var Contenido = "";
              $.each(I, function (index, i) {

                  indicacion.REM_NOMBRE = i.REM_NOMBRE;
                  indicacion.indicacion = i.indicacion;

                  if (indicacion.REM_NOMBRE == "") { Contenido = Contenido + "<tr><td style='cursor:auto'>" + i.indicacion + " </td>" } else { Contenido = Contenido + " <tr><td style='cursor:auto'> " + i.REM_NOMBRE + "</td>"; }

                  listaIndicaciones.push(indicacion);

              });

              var Pie = "</table>";
              $("#TablaConsultas").html(Encabezado + Contenido + Pie);
              if (listaIndicaciones.length > 0 && como == "deAuno") {
                  $("#cboAlmuerzo").attr('disabled', false);
                  $("#txtDescAlm").attr('disabled', false);
                  $("#cboCena").attr('disabled', false);
                  $("#txtDesCen").attr('disabled', false);
                  $("#btnAgregar").show();
                  //$("#btnGuardar").show();
              }
              else if (como == "deAuno") {

                  $("#btnAgregar").show();
                  $("#btnGuardar").hide();
              }

              /////////////////////////////CARGAR INDICACIONES MENU//////////////////////////////////////////////////
              traerComidasAcompañante();
          }
         
          //////////////////////////////////////////////////////btns compañante

          $("#cboSi").click(function () {
              $("#cboNo").attr('checked', false);
              $("#cboNo").attr('disabled', false);
              $("#cboSi").attr('disabled', true);
              // document.location = "../Nutricion/Nutrcion_Acompañante.aspx?como=" + como + "&indiceAseguir=" + indiceDeInternacion + "&fechaAseguir=" + $("#txtFecha").val() + "&idInternacion=" + idInternacion + "&cargarAux=" + cargarAux + "&idNutricionAcompañante=" + idNutricionAcompañante;

              var json = JSON.stringify({
                  "id": idNutricionAcompañante,
                  "idInternacion": idInternacion,
                  "fechaCarga": $("#txtFecha").val(),
                  "idAlmuerzo": 1,
                  "codAlmuerzo": "GRAL",
                  "tipificacionAlmuerzo": "",
                  "idCena": 1,
                  "codCena": "GRAL",
                  "tipificacionCena": ""
              });
              $.ajax({
                  type: "POST",
                  url: "../Json/Nutricion/Nutricion.asmx/InternacionNutricionGuardarComidasAcompañante",
                  data: json,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (resultado) {
                      $("#btnEditarAcompañante").show();
                      var r = resultado.d;
                      idNutricionAcompañante = r;
                  },
                  error: errores
              });
          });

          $("#cboNo").click(function () {
              var json = JSON.stringify({
                  "idInternacion": idInternacion,
                  "fecha": $("#txtFecha").val()
              });

              $.ajax({
                  type: "POST",
                  url: "../Json/Nutricion/Nutricion.asmx/InternacionNutrcionEliminarAcompañante",
                  // data: '{idInternacion: "' + idInternacion + '"}',
                  data: json,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function () {
                      $("#btnEditarAcompañante").hide();
                  },
                  error: errores
              });

              $("#cboSi").attr('checked', false);
              $("#cboSi").attr('disabled', false);
              $("#cboNo").attr('disabled', true);
          });

          $("#btnEditarAcompañante").click(function () {
              //alert(como + "/" + indiceDeInternacion + "/" + menuAcompañante.AIdalmuerzo + "/" + menuAcompañante.Aalmuerzo + "/" + menuAcompañante.AIdcena + "/" + menuAcompañante.Acena + "/" + idInternacion + "/" + cargarCombosAcompañante + "/" + idNutricionAcompañante);
              document.location = "../Nutricion/Nutrcion_Acompañante.aspx?como=" + como + "&indiceAseguir=" + indiceDeInternacion + "&AIdAlmuerzo=" + menuAcompañante.AIdalmuerzo + "&Aalmuerzo=" + menuAcompañante.Aalmuerzo + "&AidCena=" + menuAcompañante.AIdcena + "&Acena=" + menuAcompañante.Acena + "&fechaAseguir=" + $("#txtFecha").val() + "&idInternacion=" + idInternacion + "&cargar=1" + "&idNutricionAcompañante=" + idNutricionAcompañante;
          });

          //////////////////////////////////////////////////////btns compañante
          /////////////////////////////BTN AGREGAR//////////////////////////////////////////////////

          $("#btnAgregar").click(function () {

              if ($("#cboAlmuerzo").val() == 0)
              { alert("Seleccione un Almuerzo"); return; }
              if ($("#cboCena").val() == 0)
              { alert("Seleccione una Cena"); return; }

              listaMenu.length = 0;
              var menu = {};
              menu.codAlmuerzo = $('#cboAlmuerzo option:selected').html();
              menu.descAlmuero = $("#txtDescAlm").val();
              menu.codCena = $('#cboCena option:selected').html();
              menu.descCena = $("#txtDesCen").val();
              listaMenu.push(menu);

              $("#tablaMenu").empty();
              var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='width:110px; overflow:scroll:auto; text-align:center'>Código Almuerzo</th><th style='width:110px; overflow:auto; text-align:center'>Código Cena</th></tr>";
              var Contenido = "<tr><td  onclick='CargarComida(" + 1 + ")'></td><td  onclick='CargarComida(" + 2 + ")'></td>";
              $.each(listaMenu, function (index, o) {
                  //<th style='width:210px; text-align:center'>Descripción Almuezro</th>  <th style='width:210px; text-align:center'>Descripción Cena</th>
                  Contenido = Contenido + "<tr><td onclick='CargarComida(" + 1 + ")'>" + o.codAlmuerzo + "</td><td onclick='CargarComida(" + 2 + ")'>" + o.codCena + "</td>";
                  //<td style='cursor:auto'>" + o.descAlmuero + "</td> <td style='cursor:auto'>" + o.descCena + "</td>"
              });
              var Pie = "</table>";
              $("#tablaMenu").html(Encabezado + Contenido + Pie);

              $("#btnQuitar").attr('disabled', false);
              quitar = 1;
          });


          /////////////////////////////BTN GUARDAR//////////////////////////////////////////////////
          $("#btnGuardar").click(function () {


              if ($("#txtFecha").val() == "") { alert("Ingrese una fecha"); return; }
              if (listaMenu.length <= 0) { alert("Cargue Algún Menú"); return; }


              var json = JSON.stringify({
                  "idNutricion": idNutricion,
                  "idInternacion": idInternacion,
                  "documento": idPaciente,
                  "fecha": $("#txtFecha").val(),
                  "codAlmuerzo": $('#cboAlmuerzo option:selected').html(),
                  "descAlmuerzo": $("#txtDescAlm").val(),
                  "codCena": $('#cboCena option:selected').html(),
                  "descCena": $("#txtDesCen").val(),
                  "idAlmuerzo": $("#cboAlmuerzo").val(),
                  "idCena": $("#cboCena").val()
              });

              $.ajax({
                  type: "POST",
                  url: "../Json/Nutricion/Nutricion.asmx/guardarNutricion",
                  //            data: '{idInternacion: "' + idInternacion + '"}',
                  data: json,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: exito2,
                  error: errores
              });
          });

          //          function exito2(resultado) {
          //              var r = resultado.d;
          //              idNutricion = r;

          //              //        alert(idNutricion);
          //              alert("Nutrición Guardada");
          //              sigue = 1;
          //          }
          /////////////////////////////////////////////////////////////////////////////////////////////////////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

          function cargar2() {
              var json = JSON.stringify({
                  "idInternacion": idInternacion,
                  "fecha": $("#txtFecha").val(),
                  "tipo": ""
              });


              $.ajax({
                  type: "POST",
                  url: "../Json/Nutricion/Nutricion.asmx/cargarMenus",
                  data: json,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: Cargar_Indicaciones_Cargado_Menu,
                  error: errores
              });
          }
          ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////>>>>>>>>>>>>>>>>>>>>>>>>
          function Cargar_Indicaciones_Cargado_Menu(resultado) {

              var r = resultado.d;
              var almuerzo = "";
              var cena = "";

              listaMenu.length = 0;
              $.each(r, function (index, o) {

                  menuGlobal.codAlmuerzo = o.apodo;
                  menuGlobal.descAlmuero = o.descAlmuerzo;
                  menuGlobal.codCena = o.apodo;
                  menuGlobal.descCena = o.descCena;

                  traerComidasAcompañante();
                  listaMenu.push(menuGlobal);

                  switch (o.Es) {
                      case "almuerzo":
                          almuerzo = almuerzo + o.apodo + " + ";
                          break;
                      case "cena":
                          cena = cena + o.apodo + " + ";
                          break;
                  }

                  $("#txtAlmuerzo").val(almuerzo.substring(0, almuerzo.length - 2));
                  $("#txtCena").val(cena.substring(0, cena.length - 2));

                  idNutricion = o.id;
              });
              cargar = 0;
          }

          $("#btnVolverAlPaciente").click(function () {
              self.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + idInternacion + "&B=" + objBusquedaLista;
          });

          $("#btnQuitar").click(function () {
              if (quitar == 1) {
                  $("#btnQuitar").attr('disabled', true);
                  listaMenu.length = 0;
                  $("#tablaMenu").empty();
                  var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th style='width:110px; overflow:scroll:auto; text-align:center'>Código Almuerzo</th><th style='width:110px; overflow:auto; text-align:center'>Código Cena</th></tr>";
                  var Contenido = "<tr><td  onclick='CargarComida(" + 1 + ")'></td><td  onclick='CargarComida(" + 2 + ")'></td></tr>";
                  var Pie = "</table>";
                  $("#tablaMenu").html(Encabezado + Contenido + Pie);
                  quitar = 0;
              }
          });


          function VerMas() {
              var ancho = 900;
              var alto = 600;
              var posicion_x = (screen.width / 2) - (ancho / 2);
              var posicion_y = (screen.height / 2) - (alto / 2);
              var pagina = "../Pacientes/NuevoAfiliado.aspx?ID=" + idPaciente;
              var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=900, height=365, top=85, left=140";
              window.open(pagina, "", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
          }

          function traerComidasAcompañante() {
              //alert();
              if (GET["ID_Int"] != "" && GET["ID_Int"] != null) {
                  idInternacion = GET["ID_Int"];
              }

              var json = JSON.stringify({
                  "fecha": $("#txtFecha").val(),
                  "idIntenacion": idInternacion
              });

              $.ajax({
                  type: "POST",
                  url: "../Json/Nutricion/Nutricion.asmx/InternacionNutricionTraerAcompañanteComida",
                  contentType: "application/json; charset=utf-8",
                  data: json,
                  dataType: "json",
                  success: function (resultado) {
                      var r = resultado.d;
                      menuAcompañante.AIdalmuerzo = 0;
                      menuAcompañante.Aalmuerzo = "";
                      menuAcompañante.AIdcena = 0;
                      menuAcompañante.Acena = "";

                      menuAcompañante.AIdalmuerzo = r.idalmuerzo;
                      menuAcompañante.Aalmuerzo = r.codAlmuerzo;
                      menuAcompañante.AIdcena = r.idCena;
                      menuAcompañante.Acena = r.codCena;
                      idNutricionAcompañante = r.id;
                      //alert("hay: " + r.hay);
                      if (r.hay == 1) {
                          $("#cboSi").attr('checked', true);
                          $("#cboSi").attr('disabled', true);

                          $("#cboNo").attr('checked', false);
                          $("#cboNo").attr('disabled', false);
                          $("#btnEditarAcompañante").show();
                          cargarCombosAcompañante = 1;
                      } else {

                          $("#cboSi").attr('checked', false);
                          $("#cboSi").attr('disabled', false);

                          $("#cboNo").attr('checked', true);
                          $("#cboNo").attr('disabled', true);
                          $("#btnEditarAcompañante").hide();
                      }
                  },
                  error: errores
              });
          } 
      }
      /////////////////////////DE A MUCHOS////////////////////////////////////////////////////////////////////////////
      /////////////////////////DE A MUCHOS////////////////////////////////////////////////////////////////////////////
      /////////////////////////DE A MUCHOS////////////////////////////////////////////////////////////////////////////
      /////////////////////////DE A MUCHOS////////////////////////////////////////////////////////////////////////////
      /////////////////////////DE A MUCHOS////////////////////////////////////////////////////////////////////////////
      /////////////////////////DE A MUCHOS////////////////////////////////////////////////////////////////////////////
      else if (como == "todos") {
          //alert(como);
          parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Nutrición</strong>";

          $("#btnVolverAlPaciente").hide();
          $("#btnGuardar").hide();

          $("#btnSiguiente").show();
          $("#btnAnterior").show();
          $("#btnListadoDeComidas").show();
          var fecha = new Date();
          var hoy = "";
          var listaIndicaciones = new Array();
          var listaMenu = new Array();
          var idPaciente = 0;
          //var idNutricion = 0;
          var paso = false;
          var quitar = 0;
          var dia = "";
          var mes = "";
          var ano = "";

          $(document).ready(function () {

              if (indiceAseguir > 0) { $("#btnAnterior").attr('disabled', false); } else {
                  $("#btnAnterior").attr('disabled', true);
              }

              $("#txtFecha").keydown(function () { return false; });
              $("#txtFecha").datepicker({
                  dateFormat: 'dd/mm/yy',
                  changeMonth: true,
                  changeYear: true,
                  onClose: function (selectedDate) {
                      $("#btnEditarAcompañante").hide();
                      $("#cboNo").attr('checked', true);
                      $("#cboNo").attr('disabled', true);
                      $("#cboSi").attr('disabled', false);
                      $("#cboSi").attr('checked', false);
                      $("#txtAlmuerzo").val("");
                      $("#txtCena").val("");

                      hoy = $("#txtFecha").val();


                      hoy = $("#txtFecha").val();
                      var json = JSON.stringify({
                          "fecha": $("#txtFecha").val()
                      });

                      $.ajax({
                          type: "POST",
                          url: "../Json/Nutricion/Nutricion.asmx/traerIdsInternacion",
                          contentType: "application/json; charset=utf-8",
                          data: json,
                          dataType: "json",
                          success: traerIdsInternacionCargar,
                          error: errores
                      });
                      
                      cargarIndicaiones(idInternacion, hoy);
                      if (listaIndicaciones.length > 0) {
                      }
                  }
              });

              dia = fecha.getDate();
              mes = fecha.getMonth() + 1;
              ano = fecha.getFullYear();
              hoy = dia + "/" + mes + "/" + ano;

              $("#txtFecha").val(hoy);
              if (fechaAseguir != "") {
                  $("#txtFecha").val(fechaAseguir); ///////////////////////////////////////////////////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
              }

              var json = JSON.stringify({
                  "fecha": $("#txtFecha").val()
              });

              $.ajax({
                  type: "POST",
                  url: "../Json/Nutricion/Nutricion.asmx/traerIdsInternacion",
                  contentType: "application/json; charset=utf-8",
                  data: json,
                  dataType: "json",
                  success: traerIdsInternacionCargar,
                  error: errores
              });
          });

          function traerIdsInternacionCargar(resultado) {
              var resul = resultado.d;
              listIds.length = 0;
              $.each(resul, function (index, res) {
                  //
                  listIds.push(res);
                  // alert(res);
              });
              ////////////////////////////////////////////////////////>>><<

              idInternacion = listIds[indiceAseguir];
              //alert(idInternacion);
              Cargar_Encabezado_idInternacion(idInternacion);
              cargarIndicaiones(idInternacion, hoy);
              traerComidasAcompañante();
          }

          $("#btnSiguiente").click(function () {
              if (indiceDeInternacion == listIds.length - 1) {
                  alert("No hay más Pacientes por ahora");
              }
              if ($("#txtAlmuerzo").val() == "") {
                  alert("Seleccione algún Almuerzo");
                  return;
              }
              if ($("#txtCena").val() == "") {
                  alert("Seleccione alguna Cena");
                  return;
              }

              avanzar();
          });

          $("#btnAnterior").click(function () {
              if ($("#txtAlmuerzo").val() == "") {
                  alert("Seleccione algún almuerzo");
                  return;
              }
              if ($("#txtCena").val() == "") {
                  alert("Seleccione alguna cena");
                  return;
              }


              if (indiceDeInternacion != 0) {
                  $("#txtAlmuerzo").val("");
                  $("#txtCena").val("");
              }

              if (indiceDeInternacion == 0) { return; }
              if ($("#txtFecha").val() == "") { alert("Ingrese una fecha"); return; }
              if (indiceDeInternacion <= listIds.length - 1 && indiceDeInternacion > 0) {
                  indiceDeInternacion = indiceDeInternacion - 1;
                  idInternacion = listIds[indiceDeInternacion];
                  cargarIndicaiones(idInternacion, hoy);
                  Cargar_Encabezado_idInternacion(idInternacion);
                  if (indiceDeInternacion == 0) { $("#btnAnterior").attr('disabled', true); }
              }
          });

          function Cargar_Encabezado_Cargado(Resultado) {
              var E = Resultado.d;
              idPaciente = E.documento;

              $("#txt_dni").attr('value', E.documento_real);
              $("#txtNHC").attr('value', E.NHC_UOM);
              $("#CargadoApellido").html(E.apellido);
              $("#CargadoEdad").html(E.Edad_Format);
              $("#CargadoDNI").html(E.documento_real);
              $("#CargadoNHC").html(E.NHC_UOM);
              $("#CargadoSeccional").html(E.seccional)
              $("#CargadoLocalidad").html(E.localidad);
              $("#CargadoMedico").html(E.medico);
              $("#CargadoServicio").html(E.servicio);
              $("#CargadoSala").html(E.sala);
              $("#CargadoCama").html(E.cama);
              if (E.fecha_Egreso != null) {
                  $("#CargadoEgresoFecha").html(E.fecha_Egreso);
                  $("#contenedorFechaEgreso").show();
              }else { $("#contenedorFechaEgreso").hide(); }

              fechaIngreso = E.fehcaInternacion;
              var ruta = "silueta";
              $('#fotopaciente').attr('src', '../fotoPerfil/' + E.foto);
          }

          $("#btnGuardar2").click(function () {
              var json = JSON.stringify({
                  "idNutricion": idNutricion,
                  "idInternacion": idInternacion,
                  "idPaciente": idPaciente,
                  "fecha": $("#txtFecha").val()
              });
              $.ajax({
                  type: "POST",
                  url: "../Json/Nutricion/Nutricion.asmx/NutricionGuardarEncabezado",
                  data: json,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: guardarDetalle,
                  error: errores
              });
          });

          function guardarDetalle(resultado) {
              idNutricion = resultado.d;
              var json = JSON.stringify({
                  "idNutricion": idNutricion,
                  "fechaComida": $("#txtFecha").val(),
                  "lista": listaDeComidasSeleccionadas
              });
              $.ajax({
                  type: "POST",
                  url: "../Json/Nutricion/Nutricion.asmx/NutricionGuardarDetalle",
                  data: json,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function () {
                      //   $("#btnLimpiar").click();
                      alert("Guardado");
                  },
                  error: errores
              });
          }


          function exito2(resultado) {
              var r = resultado.d;
              idNutricion = r;
              porMemoria = 1;
              AIdalmuerzo = 0;
              Aalmuerzo = "";
              AIdcena = 0;
              Acena = "";
              sigue = 1;
              avanzar();
          }

          function avanzar() {
              if (indiceDeInternacion != listIds.length - 1) {
                  $("#txtAlmuerzo").val("");
                  $("#txtCena").val("");
              }
              if (indiceDeInternacion < listIds.length - 1) {
                  indiceDeInternacion = indiceDeInternacion + 1;
                  idInternacion = listIds[indiceDeInternacion];
                  Cargar_Encabezado_idInternacion(idInternacion);
                  cargarIndicaiones(idInternacion, hoy);

                  sigue = 0;
                  $("#btnAnterior").attr('disabled', false);
              }
          }

          $("#btnVerTotales").click(function () {
              //              if ($("#txtAlmuerzo").val() == "") { alert("Seleccione un Almuerzo"); return; }
              //              if ($("#txtCena").val() == "") { alert("Seleccione una Cena"); return; }
              parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Nutrición > <strong>Totales</strong>";
              document.location = "../Nutricion/Listar_Totales_Nutricion.aspx?fecha=" + $("#txtFecha").val() + "&indiceAseguir=" + indiceDeInternacion + "&idInternacion=" + idInternacion;
          });

          $("#btnListadoDeComidas").click(function () {
              //              if ($("#txtAlmuerzo").val() == "") { alert("Seleccione un Almuerzo"); return; }
              //              if ($("#txtCena").val() == "") { alert("Seleccione una Cena"); return; }
              parent.document.getElementById("DondeEstoy").innerHTML = "Internación > Nutrición > <strong>Listado</strong>";
              document.location = "../Nutricion/Listar_Totales_Nutricion.aspx?fecha=" + $("#txtFecha").val() + "&indiceAseguir=" + indiceDeInternacion + "&listadoDeComidas=" + 1;

          });

          function despues() {
          }

          $("#cboSi").click(function () {
              $("#cboNo").attr('checked', false);
              $("#cboNo").attr('disabled', false);
              $("#cboSi").attr('disabled', true);
              // document.location = "../Nutricion/Nutrcion_Acompañante.aspx?como=" + como + "&indiceAseguir=" + indiceDeInternacion + "&fechaAseguir=" + $("#txtFecha").val() + "&idInternacion=" + idInternacion + "&cargarAux=" + cargarAux + "&idNutricionAcompañante=" + idNutricionAcompañante;
              var json = JSON.stringify({
                  "id": idNutricionAcompañante,
                  "idInternacion": idInternacion,
                  "fechaCarga": $("#txtFecha").val(),
                  "idAlmuerzo": 1,
                  "codAlmuerzo": "GRAL",
                  "tipificacionAlmuerzo": "",
                  "idCena": 1,
                  "codCena": "GRAL",
                  "tipificacionCena": ""
              });
              $.ajax({
                  type: "POST",
                  url: "../Json/Nutricion/Nutricion.asmx/InternacionNutricionGuardarComidasAcompañante",
                  data: json,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function (resultado) {
                      $("#btnEditarAcompañante").show();
                      var r = resultado.d;
                      idNutricionAcompañante = r;
                  },
                  error: errores
              });

          });

          $("#cboNo").click(function () {
              var json = JSON.stringify({
                  "idInternacion": idInternacion,
                  "fecha": $("#txtFecha").val()
              });

              $.ajax({
                  type: "POST",
                  url: "../Json/Nutricion/Nutricion.asmx/InternacionNutrcionEliminarAcompañante",
                  // data: '{idInternacion: "' + idInternacion + '"}',
                  data: json,
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  success: function () {
                      $("#btnEditarAcompañante").hide();
                  },
                  error: errores
              });

              $("#cboSi").attr('checked', false);
              $("#cboSi").attr('disabled', false);
              $("#cboNo").attr('disabled', true);
          });

          $("#btnEditarAcompañante").click(function () {
              //alert(como + "/" + indiceDeInternacion + "/" + menuAcompañante.AIdalmuerzo + "/" + menuAcompañante.Aalmuerzo + "/" + menuAcompañante.AIdcena + "/" + menuAcompañante.Acena + "/" + idInternacion + "/" + cargarCombosAcompañante + "/" + idNutricionAcompañante);
              document.location = "../Nutricion/Nutrcion_Acompañante.aspx?como=" + como + "&indiceAseguir=" + indiceDeInternacion + "&AIdAlmuerzo=" + menuAcompañante.AIdalmuerzo + "&Aalmuerzo=" + menuAcompañante.Aalmuerzo + "&AidCena=" + menuAcompañante.AIdcena + "&Acena=" + menuAcompañante.Acena + "&fechaAseguir=" + $("#txtFecha").val() + "&idInternacion=" + idInternacion + "&cargar=" + cargarCombosAcompañante + "&idNutricionAcompañante=" + idNutricionAcompañante;
          });

          function traerComidasAcompañante() {
              if (GET["ID_Int"] != "" && GET["ID_Int"] != null) {
                  idInternacion = GET["ID_Int"];
              }

              var json = JSON.stringify({
                  "fecha": $("#txtFecha").val(),
                  "idIntenacion": idInternacion
              });

              $.ajax({
                  type: "POST",
                  url: "../Json/Nutricion/Nutricion.asmx/InternacionNutricionTraerAcompañanteComida",
                  contentType: "application/json; charset=utf-8",
                  data: json,
                  dataType: "json",
                  success: function (resultado) {
                      var r = resultado.d;
                      menuAcompañante.AIdalmuerzo = 0;
                      menuAcompañante.Aalmuerzo = "";
                      menuAcompañante.AIdcena = 0;
                      menuAcompañante.Acena = "";

                      menuAcompañante.AIdalmuerzo = r.idalmuerzo;
                      menuAcompañante.Aalmuerzo = r.codAlmuerzo;
                      menuAcompañante.AIdcena = r.idCena;
                      menuAcompañante.Acena = r.codCena;
                      idNutricionAcompañante = r.id;
                      //alert("hay: " + r.hay);
                      if (r.hay == 1) {
                          $("#cboSi").attr('checked', true);
                          $("#cboSi").attr('disabled', true);

                          $("#cboNo").attr('checked', false);
                          $("#cboNo").attr('disabled', false);
                          $("#btnEditarAcompañante").show();
                          cargarCombosAcompañante = 1;
                      } else {
                          $("#cboSi").attr('checked', false);
                          $("#cboSi").attr('disabled', false);

                          $("#cboNo").attr('checked', true);
                          $("#cboNo").attr('disabled', true);
                          $("#btnEditarAcompañante").hide();
                      }
                  },
                  error: errores
              });
          }
          /////////////////////////////////////////////NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
       


      }

      /////////////////////////////////////////////NUEVOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      $("#txtAlmuerzo").click(function () {
          CargarComida(1);
      });

      $("#txtCena").click(function () {
          CargarComida(2);
      });

      function CargarComida(queComida) {
          switch (queComida) {
              case 1:
                  $.fancybox({
                      'autoDimensions': false,
                      'href': "../Nutricion/NutricionCargar.aspx?tipoComida=almuerzo&idInternacion=" + idInternacion + "&como=" + como + "&indiceAseguir=" + indiceDeInternacion + "&queComida=" + queComida + "&idNutricion=" + idNutricion + "&fecha=" + $("#txtFecha").val() + "&cargarAux=" + cargarAux + "&idPaciente=" + idPaciente,
                      'width': '100%',
                      'height': '100%',
                      'autoScale': false,
                      'transitionIn': 'elastic',
                      'transitionOut': 'none',
                      'type': 'iframe',
                      'hideOnOverlayClick': true,
                      'enableEscapeButton': true,
                      'preload': true,
                      'showCloseButton': true,
                      'scrolling': 'no',
                      'onClosed': function () {
                       document.location = "../Nutricion/Nutricion.aspx?como=" + como + "&fecha=" + $("#txtFecha").val() + "&indiceAseguir=" + indiceDeInternacion + "&listadoDeComidas=" + 1 + "&idPaciente=" + idPaciente + "&idInternacion=" + idInternacion },
                      //                          { document.location = "../AtInternados/Nutricion.aspx?como=" + como + "&indiceAseguir=" + indiceAseguir + "&cargarAux=" + cargarAux + "&queComida=" + queComida + "&idInternacion=" + idInternacion + "&idNutricion=" + idNutricion + "&cargarAux=" + cargarAux },
                      'onComplete': function f() {
                          $("#fancybox-wrap").css({ 'top': '0px', 'bottom': 'auto' });
                          jQuery.fancybox.showActivity();
                          jQuery('#fancybox-frame').load(function () {
                              jQuery.fancybox.hideActivity();
                          });

                      }
                  });
                  break;

              case 2:
                  $.fancybox({
                      'autoDimensions': false,
                      'href': "../Nutricion/NutricionCargar.aspx?tipoComida=cena&como=" + como + "&como=" + como + "&indiceAseguir=" + indiceAseguir + "&queComida=" + queComida + "&idInternacion=" + idInternacion + "&fecha=" + $("#txtFecha").val() + "&cargarAux=" + cargarAux + "&idNutricion=" + idNutricion + "&idPaciente=" + idPaciente,
                      'width': '100%',
                      'height': '70%',
                      'autoScale': false,
                      'transitionIn': 'elastic',
                      'transitionOut': 'none',
                      'type': 'iframe',
                      'hideOnOverlayClick': true,
                      'enableEscapeButton': true,
                      'preload': true,
                      'showCloseButton': true,
                      'scrolling': 'no',
                      'onClosed': function () { document.location = "../Nutricion/Nutricion.aspx?como=" + como + "&fecha=" + $("#txtFecha").val() + "&indiceAseguir=" + indiceDeInternacion + "&listadoDeComidas=" + 1 + "&idPaciente=" + idPaciente + "&idInternacion=" + idInternacion },
                      'onComplete': function f() {
                          $("#fancybox-wrap").css({ 'top': '0px', 'bottom': 'auto' });
                          jQuery.fancybox.showActivity();
                          jQuery('#fancybox-frame').load(function () {
                              jQuery.fancybox.hideActivity();
                          });
                      }
                  });
                  break;
          }
      }

      function Cargar_Encabezado_idInternacion(NHC) {
          $.ajax({
              type: "POST",
              url: "../Json/Nutricion/Nutricion.asmx/cargarEncabezado",
              data: '{idInternacion: "' + idInternacion + '"}',
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              beforeSend: function () {
                  $("#cargando").show();
                  $("#TablaConsultas").empty();
                  $("#TablaConsultas").hide();
              },
              complete: function () {
                  $("#cargando").hide();
                  $("#TablaConsultas").show();
              },
              success: Cargar_Encabezado_Cargado,
              error: errores
          });
      }

      function cargarIndicaiones(id, fecha) {

          // alert(idInternacion);
          var json = JSON.stringify({
              "idInternacion": idInternacion,
              "fecha": hoy
          });


          $.ajax({
              type: "POST",
              url: "../Json/Nutricion/Nutricion.asmx/cargarIndicaciones",
              //            data: '{idInternacion: "' + idInternacion + '"}',
              data: json,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              beforeSend: function () {
                  //alert("paso before");
                  $("#cboSi").attr('checked', false);
                  $("#cboSi").attr('disabled', false);

                  $("#cboNo").attr('checked', true);
                  $("#cboNo").attr('disabled', true);
                  $("#btnEditarAcompañante").hide();

              },
              complete: cargar2(idInternacion),
              success: Cargar_Indicaciones_Cargado,
              error: errores
          });

      }

      function cargar2() {
          
          var json = JSON.stringify({
              "idInternacion": idInternacion,
              "fecha": $("#txtFecha").val(),
              "tipo": ""
          });
         

          $.ajax({
              type: "POST",
              url: "../Json/Nutricion/Nutricion.asmx/cargarMenus",
              data: json,
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: Cargar_Indicaciones_Cargado_Menu,
              error: errores
          });
         
      }

      function Cargar_Indicaciones_Cargado(resultado) {
          var I = resultado.d;
          var indicacion = {};
          listaIndicaciones.length = 0;
          $("#TablaConsultas").empty();
          var Encabezado = "<table class='table table-bordered table-hover table-condensed' style='width: 100%; text-align:center'><thead><tr><th>Indicaciones</th></tr>";

          var Contenido = "";
          $.each(I, function (index, i) {

              indicacion.REM_NOMBRE = i.REM_NOMBRE;
              indicacion.indicacion = i.indicacion;

              if (indicacion.REM_NOMBRE == "") { Contenido = Contenido + "<tr><td style='cursor:auto'>" + i.indicacion + " </td>" } else { Contenido = Contenido + " <tr><td style='cursor:auto'> " + i.REM_NOMBRE + "</td>"; }

              listaIndicaciones.push(indicacion);
          });

          var Pie = "</table>";
          $("#TablaConsultas").html(Encabezado + Contenido + Pie);
          if (listaIndicaciones.length > 0 && como == "deAuno") {
              $("#cboAlmuerzo").attr('disabled', false);
              $("#txtDescAlm").attr('disabled', false);
              $("#cboCena").attr('disabled', false);
              $("#txtDesCen").attr('disabled', false);
              $("#btnAgregar").show();
              //$("#btnGuardar").show();
          }
          else if (como == "deAuno") {

              $("#btnAgregar").show();
              $("#btnGuardar").hide();
          }

          /////////////////////////////CARGAR INDICACIONES MENU//////////////////////////////////////////////////

      }

      function traerComidasAcompañante() {
          if (GET["ID_Int"] != "" && GET["ID_Int"] != null) {
              idInternacion = GET["ID_Int"];
          }

          var json = JSON.stringify({
              "fecha": $("#txtFecha").val(),
              "idIntenacion": idInternacion
          });

          $.ajax({
              type: "POST",
              url: "../Json/Nutricion/Nutricion.asmx/InternacionNutricionTraerAcompañanteComida",
              contentType: "application/json; charset=utf-8",
              data: json,
              dataType: "json",
              success: function (resultado) {
                  var r = resultado.d;
                  menuAcompañante.AIdalmuerzo = 0;
                  menuAcompañante.Aalmuerzo = "";
                  menuAcompañante.AIdcena = 0;
                  menuAcompañante.Acena = "";

                  menuAcompañante.AIdalmuerzo = r.idalmuerzo;
                  menuAcompañante.Aalmuerzo = r.codAlmuerzo;
                  menuAcompañante.AIdcena = r.idCena;
                  menuAcompañante.Acena = r.codCena;
                  idNutricionAcompañante = r.id;

                  if (r.hay == 1) {
                      $("#cboSi").attr('checked', true);
                      $("#cboSi").attr('disabled', true);

                      $("#cboNo").attr('checked', false);
                      $("#cboNo").attr('disabled', false);
                      $("#btnEditarAcompañante").show();
                      cargarCombosAcompañante = 1;
                  } else {
                      $("#cboSi").attr('checked', false);
                      $("#cboSi").attr('disabled', false);

                      $("#cboNo").attr('checked', true);
                      $("#cboNo").attr('disabled', true);
                      $("#btnEditarAcompañante").hide();
                  }
              },
              error: errores
          });
      }

      function Cargar_Indicaciones_Cargado_Menu(resultado) {

          var r = resultado.d;
          var almuerzo = "";
          var cena = "";

          listaMenu.length = 0;
          $.each(r, function (index, o) {

              menuGlobal.codAlmuerzo = o.apodo;
              menuGlobal.descAlmuero = o.descAlmuerzo;
              menuGlobal.codCena = o.apodo;
              menuGlobal.descCena = o.descCena;

              traerComidasAcompañante();
              listaMenu.push(menuGlobal);

              switch (o.Es) {
                  case "almuerzo":
                      almuerzo = almuerzo + o.apodo + " + ";
                      break;
                  case "cena":
                      cena = cena + o.apodo + " + ";
                      break;
              }

              $("#txtAlmuerzo").val(almuerzo.substring(0, almuerzo.length - 2));
              $("#txtCena").val(cena.substring(0, cena.length - 2));

              idNutricion = o.id;
          });
          cargar = 0;
      }
