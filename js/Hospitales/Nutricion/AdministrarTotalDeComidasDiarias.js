var date = new Date();
var dia = date.getDate();
var mes = (date.getMonth() + 1);
var ano = date.getFullYear();
var fecha = "";
var bPreguntar = false;

 $("#txtFecha").datepicker({
     dateFormat: 'dd/mm/yy',
     changeMonth: true,
     changeYear: true,
     onClose: function (selectedDate) {
         fecha = $("#txtFecha").val();
     }
 });

 $("#txtFecha").keydown(function () { return false; })
 if (mes.toString().length < 2) { mes = "0" + mes; }
 if (dia.toString().length < 2) { dia = "0" + dia; }
 $("#txtFecha").val(dia + "/" + mes + "/" + ano);

 cargarEntrada();

 function cargarEntrada() {
     var json = JSON.stringify({ "fecha": $("#txtFecha").val(), "imprimir": 0});
     $.ajax({
         type: "POST",
         url: "../Json/Nutricion/Nutricion.asmx/NutricionTotaldeComidasDiariasImprimir",
         contentType: "application/json; charset=utf-8",
         data: json,
         dataType: "json",
         success: cargarControles
     });
 }

 $(".numero").keydown(function (event) {
     if (event.shiftKey) {
         event.preventDefault();
     }

     if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 190) {
     }
     else {
         if (event.keyCode < 95) {
             if (event.keyCode < 48 || event.keyCode > 57) {
                 event.preventDefault();
             }
         }
         else {
             if (event.keyCode < 96 || event.keyCode > 105) {
                 event.preventDefault();
             }

         }
     }
 });

 $(".numero").css('text-align', 'center');
 $("#personalComnerdorT").css('text-align', 'center');
 $("#ambulatorioT").css('text-align', 'center');
 $("#medicosT").css('text-align', 'center');
 $("#dietasEspecialesT").css('text-align', 'center');

 $(".numero").keyup(function () {
     var cual = $(this).attr('id').toString().substring($(this).attr('id').toString().length - 1, $(this).attr('id').toString().length);
     switch (cual) {
         case "1":
             var valor1 = 0;
             var valor2 = 0;
             if ($("#almuerzo1").val() != "") { valor1 = parseInt($("#almuerzo1").val()); }
             if ($("#cena1").val() != "") { valor2 = parseInt($("#cena1").val()); }
             if (valor1 != 0 || valor2 != 0)
                 $("#personalComnerdorT").val(valor1 + valor2);
             bPreguntar = true;
             break;
         case "2":
             var valor1 = 0;
             var valor2 = 0;
             if ($("#almuerzo2").val() != "") { valor1 = parseInt($("#almuerzo2").val()); }
             if ($("#cena2").val() != "") { valor2 = parseInt($("#cena2").val()); }
             if (valor1 != 0 || valor2 != 0)
                 $("#ambulatorioT").val(valor1 + valor2);
             bPreguntar = true;
             break;
         case "3":
             var valor1 = 0;
             var valor2 = 0;
             if ($("#almuerzo3").val() != "") { valor1 = parseInt($("#almuerzo3").val()); }
             if ($("#cena3").val() != "") { valor2 = parseInt($("#cena3").val()); }
             if (valor1 != 0 || valor2 != 0)
                 $("#medicosT").val(valor1 + valor2);
             bPreguntar = true;
             break;
         case "4":
             var valor1 = 0;
             var valor2 = 0;
             if ($("#almuerzo4").val() != "") { valor1 = parseInt($("#almuerzo4").val()); }
             if ($("#cena4").val() != "") { valor2 = parseInt($("#cena4").val()); }
             if (valor1 != 0 || valor2 != 0)
                 $("#dietasEspecialesT").val(valor1 + valor2);
             bPreguntar = true;
             break;
     }
 });


 $("#btnGuardar").click(function () {
     var seguir = 0;
     $(".numero").each(function (index, item) {
         if ($(this).val() == "") {
             var cual = $(this).attr('id').toString().slice(0, $(this).attr('id').toString().length - 1);
             switch (cual) {
                 case "almuerzo":
                     alert("Ingrese el " + cual + " faltante");
                     seguir = 1;
                     return false;
                     break;

                 case "cena":
                     alert("Ingrese la " + cual + " faltante");
                     seguir = 1;
                     return false;
                     break;
             }
         }
     });
     if (seguir == 1) { return false;}
     
     var almuerzo = {};
     var cena = {};
     var lista = new Array();

     almuerzo.fecha = $("#txtFecha").val();
     almuerzo.tipo = 1;
     almuerzo.personalComedor = $("#almuerzo1").val();
     almuerzo.ambulatorio = $("#almuerzo2").val();
     almuerzo.medicos = $("#almuerzo3").val();
     almuerzo.dietasEspeciales = $("#almuerzo4").val();

     cena.fecha = $("#txtFecha").val();
     cena.tipo = 2;
     cena.personalComedor = $("#cena1").val();
     cena.ambulatorio = $("#cena2").val();
     cena.medicos = $("#cena3").val();
     cena.dietasEspeciales = $("#cena4").val();

     lista.push(almuerzo);
     lista.push(cena);

     var json = JSON.stringify({ "lista": lista });
     $.ajax({
         type: "POST",
         url: "../Json/Nutricion/Nutricion.asmx/NutricionTotaldeComidasDiariasGuardarEditar",
         contentType: "application/json; charset=utf-8",
         data: json,
         dataType: "json",
         success: function (Resultado) {
             $(".total").css('background-color', '#58FA58');
             bPreguntar = false;
             alert("Guardado.");
         }
     });
 });

 $("#btnLimpiar").click(function () {
     var json = JSON.stringify({ "fecha": $("#txtFecha").val() });
     $.ajax({
         type: "POST",
         url: "../Json/Nutricion/Nutricion.asmx/NutricionTotaldeComidasDiariasBorrar",
         contentType: "application/json; charset=utf-8",
         data: json,
         dataType: "json",
         success: function (Resultado) {
             $(".numero").val("");
             $(".total").val("");
             alert("Borrado.");
         }
     });
 });

 $("#btnImprimir").click(function () {

     $("#btnGuardar").click();
     $.fancybox({
         'autoDimensions': false,
         'href': "../Impresiones/Nutricion/Nutricion_Total_de_Comidas_Diarias_Imprimir.aspx?fecha=" + $("#txtFecha").val() + "&imprimir=1",
         'width': '75%',
         'height': '75%',
         'autoScale': false,
         'transitionIn': 'elastic',
         'transitionOut': 'none',
         'type': 'iframe',
         'hideOnOverlayClick': false,
         'enableEscapeButton': false,
         'preload': true,
         'onComplete': function f() {
             jQuery.fancybox.showActivity();
             jQuery('#fancybox-frame').load(function () {
                 jQuery.fancybox.hideActivity();
             });
         }

     });
 });

 $("#txtFecha").change(function () {
     var json = JSON.stringify({ "fecha": $(this).val() , "imprimir": 0 });
     $.ajax({
         type: "POST",
         url: "../Json/Nutricion/Nutricion.asmx/NutricionTotaldeComidasDiariasImprimir",
         contentType: "application/json; charset=utf-8",
         data: json,
         dataType: "json",
         success: cargarControles
     });
 });

 function cargarControles(resultado) {
     var lista = resultado.d;
     if (lista.length == 0) {
         $(".numero").val("");
         $(".total").val("");
     }
     $.each(lista, function (index, item) {
         switch (item.tipoNombre) {
             case "Almuerzo":
                 $("#almuerzo1").val(item.personalComedor);
                 $("#almuerzo2").val(item.ambulatorio);
                 $("#almuerzo3").val(item.medicos);
                 $("#almuerzo4").val(item.dietasEspeciales);
                 break;

             case "Cena":
                 $("#cena1").val(item.personalComedor);
                 $("#cena2").val(item.ambulatorio);
                 $("#cena3").val(item.medicos);
                 $("#cena4").val(item.dietasEspeciales);
                 break;

             case "Total":
                 $("#personalComnerdorT").val(item.personalComedor);
                 $("#ambulatorioT").val(item.ambulatorio);
                 $("#medicosT").val(item.medicos);
                 $("#dietasEspecialesT").val(item.dietasEspeciales);
                 break;
         }
         if (item.existe == 0) { $(".total").css('background-color', '#FA5858'); } else { $(".total").css('background-color', '#58FA58'); }
     });
 }

 window.onbeforeunload = preguntarAntesDeSalir;

 function preguntarAntesDeSalir() {
     if (bPreguntar)
         return "¿Seguro que quieres salir?";
 }