var i = 0;
var objTurno = new Array();
var objTurnos = new Array();
var Ruta = "";

function Cargar_Usuarios() {
    $.ajax({
        type: "POST",
        url: "../Usuarios.asmx/Lista_T",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Usuarios_Cargados,
        error: errores
    });
}


function Usuarios_Cargados(Resultado) {
    var Usuarios = Resultado.d;
    $('#cbo_Usuarios').empty();
    $('#cbo_Usuarios').append('<option value="0">Todos</option>');
    $.each(Usuarios, function (index, usuarios) {
        $('#cbo_Usuarios').append(
              $('<option></option>').val(usuarios.id).html(usuarios.nombre)
            );
    });
}

function Cargar_Medicos_por_Especialidad(Especialidad) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: '{Especialidad: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_por_Especialidad_Cargados,
        error: errores
    });

}

function Medicos_por_Especialidad_Cargados(Resultado) {
    var Medicos = Resultado.d;
    $.each(Medicos, function (index, medicos) {
        $('#cbo_Medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
    });
}


$(document).ready(function () {
    Cargar_Usuarios();
    Cargar_Medicos_por_Especialidad(0);
    $("#txtFecha").datepicker();
    $("#txtFecha").val(FechaActual());
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}



$("#btn_BuscarRendicion").click(function () {
    Ruta = '../Impresiones/ImpresionRendicionBonoMedico.aspx?Fecha=' + $('#txtFecha').val() + "&U=" + $('#cbo_Usuarios option:selected').val() + "&Medico=" + $("#cbo_Medico :selected").val() + "&Tipo=" + $("#cbo_Tipo :selected").val();
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
