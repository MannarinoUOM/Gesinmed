$(document).ready(function () {
    $(".fecha").datepicker();
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = fecha_ultimo_dia_mes(mm, yyyy);
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#txtFechaDesde").val(p);
    $("#txtFechaHasta").val(d);
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}



$("#btn_BuscarRendicion").click(function () {
    Ruta = '../Impresiones/admin_TotalesGuardia.aspx?Desde=' + $('#txtFechaDesde').val() + "&Hasta=" + $("#txtFechaHasta").val();
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