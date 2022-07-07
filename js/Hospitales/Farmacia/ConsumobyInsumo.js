$(document).ready(function () {
    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFin").mask("99/99/9999", { placeholder: "-" });
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var a = dd + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaInicio").val(p);
    $("#txtFechaFin").val(a);
    List_Rubros();
    List_Servicios();
});

function List_Servicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Servicios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Servicios_Cargado,
        error: errores
    });
}

function List_Servicios_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Servicio").append($("<option></option>").val("0").html("TODOS"));
    $.each(Lista, function (index, Servicio) {
        $("#cbo_Servicio").append($("<option></option>").val(Servicio.id).html(Servicio.descripcion));
    });

}

function List_Rubros() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Medicamentos_Rubro",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Rubros_Cargado,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function List_Rubros_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Rubros").append($("<option></option>").val("0").html("TODOS"));
    $.each(Lista, function (index, Rubro) {
        if (Rubro.Id != "0")
            $("#cbo_Rubros").append($("<option></option>").val(Rubro.Id).html(Rubro.Rubro));
    });

}

$(function () {
    $("#txtFechaInicio").datepicker({
        onClose: function (selectedDate) {
            $("#txtFechaFin").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#txtFechaFin").datepicker({
        onClose: function (selectedDate) {
            $("#txtFechaInicio").datepicker("option", "maxDate", selectedDate);
        }
    });
});


function Imprimir(Pagina) {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
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

$(".imprimir").click(function () {
    var pdf = 0;
    switch ($(this).attr('id')) {
        case "btnPdf":
            pdf = 1;
            break;
        case "btnExcel":
            pdf = 0;
            break;
    }
    Imprimir('../Impresiones/Impresion_Consumo_by_Insumo.aspx?Desde=' + $("#txtFechaInicio").val() + "&Hasta=" + $("#txtFechaFin").val() + "&RubroId=" + $("#cbo_Rubros :selected").val() + "&IdServicio=" + $("#cbo_Servicio :selected").val() + "&PDF=" + pdf);
});
