var listpracticas;

/*
//var ConInv = true;

$(document).ready(function () {
$("#frm_Main").validate({
rules: {
'desde': { required: true, dateES: true },
'hasta': { required: true, dateES: true }
},
messages: {
'desde': { required: '', dateES: '' },
'hasta': { required: '', dateES: '' }
},
invalidHandler: function (e, validator) {
var list = validator.invalidElements();
$("#controldesde").removeClass("error");
$("#controlhasta").removeClass("error");
for (var i = 0; i < list.length; i++) {
var name_element = $(list[i]).attr("name");
$("#control" + name_element).addClass("error");
}
}
});
InitControls();
});
*/


/*
$("#chk_Inventario").click(function () {
    if ($(this).is(":checked")) $(".fecha").hide();
    else $(".fecha").show();
});
*/
/*
function List_by_Monodroga(MonoId) {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Medicamentos_Lista_by_Mono",
        data: '{MonoId: "' + MonoId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado,
        beforeSend: function () {
            $("#cbo_Medicamento").attr("disabled", true);
        },
        complete: function () {
            $("#cbo_Medicamento").removeAttr("disabled");
        },
        error: errores
    });
}
*/

/*
$(function () {
    $("#txtDesde").datepicker({
        onClose: function (selectedDate) {
            $("#txtHasta").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#txtHasta").datepicker({
        onClose: function (selectedDate) {
            $("#txtDesde").datepicker("option", "maxDate", selectedDate);
        }
    });
});
*/

/*
function InitControls() {
    //Cargar_Medicamentos(false);
    //List_by_Monodroga(0);
    //List_Rubros();
    $("#txtDesde").mask("99/99/9999", { placeholder: "-" });
    $("#txtHasta").mask("99/99/9999", { placeholder: "-" });
    //$("#btnPrint").hide();
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtDesde").val(p);
    $("#txtHasta").val(d);
}
*/

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

//Se presiona boton buscar
$("#btnBuscar").click(function () {

    Listar(); 
 });


function Listar() {
    var fechaDesde = $("#txtDesde").val()
    var fechaHasta = $("#txtHasta").val()
    var arrayFechaDesde = fechaDesde.split("/");
    var arrayFechaHasta = fechaHasta.split("/");

    var nuevaFechaDesde = arrayFechaDesde[1] + "/" + arrayFechaDesde[0] + "/" + arrayFechaDesde[2]
    var nuevaFechaHasta = arrayFechaHasta[1] + "/" + arrayFechaHasta[0] + "/" + arrayFechaHasta[2]

    var json = JSON.stringify({
      "fechaDesde": nuevaFechaDesde
    , "fechaHasta": nuevaFechaHasta
    });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/VoucherDerivacion.asmx/VoucherListarASMX",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListVoucherDerivacion,
        error: errores,
        beforeSend: function () {
            $("#TablaPedidos_div").hide();
            $("#cargando").show();
        },
        complete: function () {
            $("#TablaPedidos_div").show();
            $("#cargando").hide();
        }
    });
}


//Lista los vauchers dentro del rango de fechas
function ListVoucherDerivacion(lista) {

    //console.log(lista)

    var Contenido = "";
    var Pie = "";
    var Encabezado = " <thead style=' background-color:Black; font-weight:bold; width:100%'>" +
    "<tr style='color:White;'>" +
    "<td style='width:10%;padding-left:3px;padding-right:3px'>" +
    "<td style='width:10%;padding-left:3px;padding-right:3px'>" +
    "<td style='width:20%;padding-left:3px;padding-right:3px; text-align:center'>N° Carga</td>" +
    "<td style='width:10%;padding-left:3px;padding-right:3px'>" +
    "<td style='width:20%;padding-left:3px;padding-right:3px; text-align:left'>NHC</td>" +
    "<td style='width:10%;padding-left:3px;padding-right:3px'>" +
    "<td style='width:20%;padding-left:3px;padding-right:3px; text-align:center'>Nombre</td>" +
    "<td style='width:10%;padding-left:3px;padding-right:3px'>" +
    "<td style='width:20%;padding-left:3px;padding-right:3px; text-align:center'>Fecha Impresion</td>" +
    "<td style='width:10%;padding-left:3px;padding-right:3px'>" +
    "<td style='width:20%;padding-left:3px;padding-right:3px; text-align:center'>Observaciones</td>" +
    "<td style='width:10%;padding-left:3px;padding-right:3px'>" +
    "</tr>" +
    "</thead>";
    listpracticas = lista.d;
    var cont = listpracticas.length - 1;
    $.each(listpracticas, function (index, item) {

        Contenido = Contenido + "<tr style='width:100%'>" +
            "<td style='cursor:auto;width:10%;padding-left:10px;padding-right:10px'>" +
        //"<a id='imprimir" + cont + "'onclick='ImprimirVoucherList(" + listpracticas[cont].numeroCarga + ");' class='btn btn-mini btn-success' rel='tooltip' title='Imprimir Derivación' style='float:right'><i class='icon-print icon-white'></i></a></td>" +
            "<a id='imprimir" + cont + "'onclick='EditarAntesDeImprimir(" + cont + ");' class='btn btn-mini btn-success' rel='tooltip' title='Imprimir Derivación' style='float:right'><i class='icon-print icon-white'></i></a></td>" +
            "<td style='width:10%;padding-left:3px;padding-right:3px'></td>" +
            "<td id='idNumeroCarga" + cont + "' style='cursor:auto;width:30%;padding-left:3px;padding-right:3px; text-align:center; color:black'> " + listpracticas[cont].numeroCarga + " </td>" +
            "<td style='width:10%;padding-left:3px;padding-right:3px'></td>" +
            "<td id='idNHC" + cont + "' style='cursor:auto; width:30%;padding-left:3px;padding-right:3px; text-aling:center; color:black'>" + listpracticas[cont].nhc + "</td>" +
            "<td style='width:10%;padding-left:3px;padding-right:3px'></td>" +
            "<td id='idNombre" + cont + "' style='cursor:auto; width:30%;padding-left:3px;padding-right:3px; text-aling:center; color:black'>" + listpracticas[cont].nombre + "</td>" +
            "<td style='width:10%;padding-left:3px;padding-right:3px'></td>" +
            "<td id='idFechaActual" + cont + "' style='cursor:auto; width:30%;padding-left:3px;padding-right:3px; text-aling:center; color:black'>" + listpracticas[cont].fechaActual + "</td>" +
            "<td style='width:10%;padding-left:3px;padding-right:3px'></td>" +
            "<td id='idObservaciones" + cont + "' style='cursor:auto; width:30%;padding-left:3px;padding-right:3px; text-aling:center; color:black'>" + listpracticas[cont].observaciones + "</td>" +
        cont--;

    });
    Pie = "</tbody></table>";
    $("#resultados").html(Encabezado + Contenido + Pie);
     
}

//verifica si hay observaciones, si no hay observaciones da la posibiliada de agregarlas
function EditarAntesDeImprimir(seleccion) 
{
   //console.log(seleccion);
    var observaciones = document.getElementById("idObservaciones" + seleccion).textContent;
    var idNumeroCarga = document.getElementById("idNumeroCarga"+seleccion).textContent;
    console.log(observaciones);
    console.log(idNumeroCarga);
    if (observaciones == "Sin Observaciones" || observaciones == null || observaciones == "")
    {

        var obs = prompt("Desea agregar observaciones?", "");
        
        var json = JSON.stringify({
            "nc"    : idNumeroCarga
           ,"obs"   : obs
        });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/VoucherDerivacionUpdate.asmx/VoucherDerivacionesUpdateASMX",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ImprimirVoucherList(idNumeroCarga),
            error: errores,
        });

        
    }
    else {
        //console.log(document.getElementById(temp).textContent);
        //console.log(temp2);
        ImprimirVoucherList(idNumeroCarga)
    }

}



//imprime los datos del voucher
function ImprimirVoucherList(nc) {

console.log(nc);

    //------uso de fancybox para visualizacion antes de la impresion.
    
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': "../Impresiones/VoucherDerivaciones.aspx?nc=" + nc,
		    'width': '75%',
		    'height': '75%',
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

		}
	        );


}

