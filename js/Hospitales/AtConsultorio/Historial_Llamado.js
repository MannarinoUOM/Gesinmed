function Cargar_Medicos_por_Especialidad() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: '{Especialidad: "0"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_por_Especialidad_Cargados,
        error: errores
    });

}


function Medicos_por_Especialidad_Cargados(Resultado) {
    var Medicos = Resultado.d;
    $('#cbo_Medico').empty();
    $('#cbo_Medico').append('<option value="0">Medicos</option>');
    $.each(Medicos, function (index, medicos) {
        $('#cbo_Medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
    });
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$(document).ready(function () {


    Cargar_Medicos_por_Especialidad();

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

    $("#txtFechaInicio").datepicker();
    $("#txtFechaFinal").datepicker();
    $("#txtFechaInicio").val(FechaActual());
    $("#txtFechaFinal").val(FechaActual());

    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaFinal").mask("99/99/9999", { placeholder: "-" });
    $("#txtNHC").mask("9?9999999999");

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var d = dd + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaInicio").val(p);
    $("#txtFechaFinal").val(d);
});

$("#btn_Listar").click(function () {

    $("#Control_Fecha_Inicio").removeClass("error");
    $("#Control_Fecha_Final").removeClass("error");

    var Date = $('#txtFechaInicio').val();
    var elem = Date.split('/');
    dia = elem[0];
    mes = elem[1];
    anio = elem[2];

    if ($("#txtFechaInicio").val() == "") { $("#Control_Fecha_Inicio").addClass("error"); }
    if (!isDate(anio, mes, dia)) {
        $("#Control_Fecha_Inicio").addClass("error");
        $("#txtFechaInicio").focus();
        return false;
    }

    Date = $('#txtFechaFinal').val();
    elem = Date.split('/');
    dia = elem[0];
    mes = elem[1];
    anio = elem[2];
    if ($("#txtFechaFinal").val() == "") { $("#Control_Fecha_Final").addClass("error"); }
    if (!isDate(anio, mes, dia)) {
        $("#Control_Fecha_Final").addClass("error");
        $("#txtFechaFinal").focus();
        return false;
    }
    if ($("#txtFechaInicio").val() == "") { $("#txtFechaInicio").focus(); return false; }
    if ($("#txtFechaFinal").val() == "") { $("#txtFechaFinal").focus(); return false; }
    Imprimir("../Impresiones/ImpresionAtConsultorioHistorial.aspx?F1=" + $("#txtFechaInicio").val() + "&F2=" + $("#txtFechaFinal").val() + "&M=" + $('#cbo_Medico option:selected').val() + "&H=" + $("#txtNHC").val() + " ");
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



