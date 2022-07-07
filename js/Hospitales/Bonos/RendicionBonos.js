var i = 0;
var objTurno = new Array();
var objTurnos = new Array();
var Ruta = "";

function Cargar_Usuarios() {
    $.ajax({
        type: "POST",
        url: "../Usuarios.asmx/UsuariobyId",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Usuarios_Cargados,
        error: errores
    });
}

function Usuarios_Cargados(Resultado) {
    var Usuarios = Resultado.d;
    $('#cbo_Usuarios').empty();
    $.each(Usuarios, function (index, usuarios) {
            $('#cbo_Usuarios').append(
                  $('<option></option>').val(usuarios.id).html(usuarios.nombre)
                );
        });
}

function Cargar_Terminales() {
    $.ajax({
        type: "POST",
        url: "../Json/Bonos/Bonos.asmx/List_Terminales_Bonos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $('#cbo_Terminal').empty();
            $('#cbo_Terminal').append($('<option></option>').val("0").html("TODAS"));
            $.each(lista, function (index, terminal) {
                $('#cbo_Terminal').append(
                  $('<option></option>').val(terminal.Ip).html(terminal.Descripcion)
                );
            });
        },
        error: errores
    });
}


$(document).ready(function () {
    Cargar_Usuarios();
    Cargar_Terminales();
    $("#txtFecha").datepicker();
    $("#txtFecha").val(FechaActual());
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}



$("#btn_BuscarRendicion").click(function () {
   /// var TEL;
   /// if ($("#chkTELEF").is(":checked")) { TEL = "2"; } else { TEL = "1"; }
    if ($("#rdUsuario").is(":checked"))
        Ruta = '../Impresiones/ImpresionRendicionBono.aspx?Fecha=' + $('#txtFecha').val() + "&Desde=" + $("#txtNroInicial").val() + "&Hasta=" + $("#txtNroFinal").val() + "&U=" + $('#cbo_Usuarios option:selected').val() + "&Terminal=" + $("#cbo_Terminal :selected").val() + "&Orden=1";
    else Ruta = '../Impresiones/ImpresionRendicionBono_porTerminal.aspx?Fecha=' + $('#txtFecha').val() + "&Desde=" + $("#txtNroInicial").val() + "&Hasta=" + $("#txtNroFinal").val() + "&U=" + $('#cbo_Usuarios option:selected').val() + "&Terminal=" + $("#cbo_Terminal :selected").val() + "&Orden=2"; //Agrupado por Terminal
    Ventana(Ruta);
});


$("#btn_PDF").click(function () {
   /// var TEL;
   /// if ($("#chkTELEF").is(":checked")) { TEL = "2"; } else { TEL = "1"; }
    if ($("#rdUsuario").is(":checked"))
        Ruta = '../Impresiones/ImpresionRendicionBono.aspx?Fecha=' + $('#txtFecha').val() + "&Desde=" + $("#txtNroInicial").val() + "&Hasta=" + $("#txtNroFinal").val() + "&U=" + $('#cbo_Usuarios option:selected').val() + "&PDF=1&Terminal=" + $("#cbo_Terminal :selected").val() + "&Orden=1";
    else Ruta = '../Impresiones/ImpresionRendicionBono_porTerminal.aspx?Fecha=' + $('#txtFecha').val() + "&Desde=" + $("#txtNroInicial").val() + "&Hasta=" + $("#txtNroFinal").val() + "&U=" + $('#cbo_Usuarios option:selected').val() + "&PDF=1&Terminal=" + $("#cbo_Terminal :selected").val() + "&Orden=2"; //Agrupado por Terminal
    Ventana(Ruta);
});

function Ventana(Pagina) {
    $.fancybox({
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
    });
}