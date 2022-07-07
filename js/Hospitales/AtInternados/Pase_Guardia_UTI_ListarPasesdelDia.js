
function Buscar_Pases_Lista_Del_Dia() {
    var json = JSON.stringify({ "Fecha": $("#txtFechaDesde").val() });
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/Epicrisis.asmx/Pase_Guardia_UTI_Listar_Pases_del_Dia",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: Listar_Pases,
        error: errores,
        beforeSend: antes,
        complete: finalizo
    });
}

function finalizo() {
    $("#cargando").hide();
    $("#table_b").show();
}

function antes() {
    $("#cargando").show();
    $("#table_b").hide();
}

$("#btn_BuscarPases").click(function () {
    if ($("#txtFechaDesde").val().trim().length == 0) { alert("Ingrese Fecha."); return false; }
    Buscar_Pases_Lista_Del_Dia();
});


function Listar_Pases(Resultado) {
    var Pases = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    if (Pases != null) {
        Tabla_Titulo = "<table id='TablaTurnos' class='table table-hover table-condensed' style='font-size:10px;'><thead><tr><th>Paciente</th><th>Cama</th><th>Evolucion</th></tr></thead><tbody>";
        $.each(Pases, function (index, pase) {
            Tabla_Datos = Tabla_Datos + "<tr><td>" + pase.PacienteNombre + "</td><td>" + pase.Cama + "</td><td><div style='white-space: pre-wrap;'>" + pase.Evolucion + "</div></td></tr>";
        });

        Tabla_Fin = "</tbody></table>";
        $("#table_b").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
    }
    else $("#table_b").empty();
}

$("#btn_Imprimir").click(function () {
    if ($("#txtFechaDesde").val().trim().length == 0) { alert("Ingrese Fecha."); return false; }
    Mostrar_Impresion('../Impresiones/At_Internados_PaseGuardiaUTI_Evo.aspx?Desde=' + $("#txtFechaDesde").val());
});

function Mostrar_Impresion(Pagina) {
    $.fancybox({
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
		});
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$(document).ready(function () {
    $("#txtFechaDesde").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaDesde").datepicker();
    Buscar_Pases_Lista_Del_Dia();
});
