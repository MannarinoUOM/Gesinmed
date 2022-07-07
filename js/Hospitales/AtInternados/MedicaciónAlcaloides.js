var GET = {};
var int = 0;
var mostrar = "";
var mensajeError = "";
var medicamentos = [];
var medicoId = 0;
var idCarga = 0;


//$(document).ready(function () { alert(); });



document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }
    GET[decode(arguments[1])] = decode(arguments[2]);
});


if (GET["int"] != "" && GET["int"] != null && GET["int"] != undefined) {
    int = GET["int"];
    cargar(int); 
}

if (GET["medicoId"] != "" && GET["medicoId"] != null && GET["int"] != undefined) { medicoId = GET["medicoId"]; }

function cargar(int) {
    //alert(int);
    var json = JSON.stringify({ "idIntenacion": int });
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Traer_Alcaloides",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            var encabezado = "<table class='table'><tr style='background-color:Black; color:White'><td>Alcaloide</td><td>Cantidad</td><td>Fecha Enrtega</td></tr>";
            var fila = "";
            var pie = "</table>";
            var editar = "contenteditable";
            var contenteditable = "";
            $.each(Resultado.d, function (index, item) {

                // alert(item.fechaPedido + "//" + item.tipo);
                //if (item.editar == 1) { editar = ""; contenteditable = "contenteditable"; mostrar = "G"; } else { editar = "disabled"; contenteditable = ""; mostrar = "I"; }
                if (item.editar != 1) { $("#btnImprimir").show(); }
                if (item.tipo == 1) { idCarga = item.CabId; $("#fechaPeido").val(item.fechaPedido); $(".fechaPedido").show(); } //if (item.fechaPedido == "") { $(".fechaPedido").hide(); } else { alert(); $(".fechaPedido").show(); $("#fechaPeido").val(item.fechaPedido); } }
                if (item.tipo == 2) {
                   // $(".fechaPedido").hide();
                    fila = fila + "<tr><td id='descripcion" + item.alcaloideId + "'>" + item.alcaloide + "</td><td " + contenteditable + " class='cantidad dato' data-tipo='cantidad' data-id='" + item.alcaloideId + "' id='cantidad" + item.alcaloideId + "'  " + editar + " >" + item.cantidad + "</td>" +
                    "<td><input  id='fecha" + item.alcaloideId + "' class='fecha dato' value='" + item.fechaEntrega + "' data-tipo='fecha'  data-id='" + item.alcaloideId + "' type='text' style='border-style:none;text-align:center' " + editar + "/></td></tr>";
                }
            });
            //            if (mostrar == "G") { $("#btnGuardar").show(); }
            //            if (mostrar == "I") { $("#btnImprimir").show(); }
            $("#lista").html(encabezado + fila + pie);
        },
        error: errores
    });
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$(".cantidad").live("keydown", function (e) {
   // alert(e.keycode);


    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }

    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }

    if ($(this).html().length > 2) { return false; }
});




$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '< Ant',
    nextText: 'Sig >',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};
$.datepicker.setDefaults($.datepicker.regional['es']);
$(function () {
    $(".fecha").datepicker();
});


$('.fecha').live("focus", function () {
    $(this).datepicker({
        dateFormat: 'dd/mm/yy',
        regional: ['es'],
        minDate: 'today'
    });

});

$("#btnGuardar").click(function () {
    if (validar()) {
        armarDatosLista();
        if (medicamentos.length > 0) { guardar(medicamentos); } else { alert("Ingrese datos para guardar"); }
    }

});

function validar() {
    var id = 0;
    var idRevisado = 0;
    $(".dato").each(function (index, item) {
        id = $(this).data('id');
        if ($("#cantidad" + id).html() != "" && $("#fecha" + id).val() == "" && id != idRevisado) { mensajeError += "ingrese la fecha de " + $("#descripcion" + id).html() + "\n"; }
        if ($("#cantidad" + id).html() == "" && $("#fecha" + id).val() != "" && id != idRevisado) { mensajeError += "ingrese la cantidad de " + $("#descripcion" + id).html() + "\n "; }
        idRevisado = id;
    });
    if (mensajeError.trim().length > 0) { alert(mensajeError); mensajeError = ""; return false; } else { return true; }
}

function armarDatosLista() {
    var id = 0;
    var idRevisado = 0;
    $(".dato").each(function (index, item) {
        id = $(this).data('id');
        if ($("#cantidad" + id).html() != "" && $("#fecha" + id).val() != "" && id != idRevisado) {
            var obj = {};
            obj.alcaloideId = id;
            obj.cantidad = $("#cantidad" + id).html();
            obj.fechaEntrega = $("#fecha" + id).val();
            medicamentos.push(obj);
        }
        idRevisado = id;
    });

    console.log(medicamentos);
    
  //  return medicamentos;
}

function guardar(lista) {
  //  console.log(lista);
  //  alert("internacion:" + int + "medico:" + medicoId);
    var json = JSON.stringify({ "internacion": int, "medico": medicoId, "lista": lista });
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/guardarAlcaloides",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {
            if (Resultado.d > 0) {
                idCarga = Resultado.d;
                //                $(".dato").attr('disabled', true);
                //                $(".dato").removeAttr('contenteditable').blur();
                //                $("#btnGuardar").hide();
                $("#btnImprimir").show();
                alert("Guardado");

            } else { alert("No se ha podido guardar"); }
        },
        error: errores
    });

 }

 $("#btnImprimir").click(function () {
     $.fancybox(
		{//int
		    'autoDimensions': false,
		    'href': '../Impresiones/AlcaloidesImpresion.aspx?CabId=' + idCarga,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
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



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$(".fecha").live("keypress", function () { return false; })