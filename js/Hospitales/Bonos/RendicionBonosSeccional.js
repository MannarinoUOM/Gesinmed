var i = 0;
var objTurno = new Array();
var objTurnos = new Array();
var Ruta = "";

function Cargar_Seccionales_Lista() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Seccionales_Listas_Cargadas,
        error: errores
    });

}


function Seccionales_Listas_Cargadas(Resultado) {
    var Seccionales = Resultado.d;
    $('#cboSeccional').empty();
    $('#cboSeccional').append('<option value="0">TODAS</option>');
    $.each(Seccionales, function (index, seccionales) {
        $('#cboSeccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
    });
}


$(document).ready(function () {
    Cargar_Seccionales_Lista();
    $("#txtFechaInicio").datepicker();
    $("#txtFechaFinal").datepicker();
    $("#txtFechaInicio").val(FechaActual());
    $("#txtFechaFinal").val(FechaActual());
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}



$("#btn_BuscarRendicion").click(function () {
    Ruta = '../Impresiones/BonoResumenporSeccional.aspx?Fi=' + $('#txtFechaInicio').val() + "&Ff=" + $("#txtFechaFinal").val() + "&Sl=" + $('#cboSeccional option:selected').val();
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Ruta,
		    'width': '75%',
		    'height': '75%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
});
