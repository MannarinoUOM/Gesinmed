var fecha = new Date();
var dia = fecha.getDate();
var mes = fecha.getMonth() + 1;
var ano = fecha.getFullYear();
var hoy = dia + "/" + mes + "/" + ano;
var listIds = new Array();
var como = "";
var idInternacion = 0;
var indiceAseguir = 0;

/////////////////////////////////////////////////////////////////////////////////////////////////////query strings
if ($("[rel=tooltip]").length) {
    $("[rel=tooltip]").tooltip();
}

var GET = {};

document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
        return decodeURIComponent(s.split("+").join(" "));
    }

    GET[decode(arguments[1])] = decode(arguments[2]);
});

if (GET["como"] != "" && GET["como"] != null) {
    como = GET["como"];
}
/////////////////////////////////////////////////////////////////////////////////////////////////////query strings<<<<<<<<<<<<<<<<<<
///////////////////////////////////////////////defino fecha y control<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
$("#txtFecha").val(hoy);
$("#txtFecha").keydown(function () { return false; });
$("#txtFecha").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    maxDate: '0m',
    onClose: function (selectedDate) {
        hoy = $("#txtFecha").val();
//        traerComidasAcompañante();
//        cargarIndicaiones(idInternacion, hoy);
    }
});
///////////////////////////////////////////////defino fecha y control<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
traerIdsInternacion();





//if (como == "todos") {
//    parent.document.getElementById("DondeEstoy").innerHTML = "Internación > <strong>Nutrición</strong>";
//    $("#btnVolverAlPaciente").hide();
//    $("#btnGuardar").hide();
//    $("#btnSiguiente").show();
//    $("#btnAnterior").show();
//    $("#btnListadoDeComidas").show();

//    if (indiceAseguir > 0) { $("#btnAnterior").attr('disabled', false); } else {
//        $("#btnAnterior").attr('disabled', true);
//    }

//  
//}





///////////////////////////////////////////////////////////////funciones<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function cargarIndicaiones(id, fecha) {

    // alert(idInternacion);
    var json = JSON.stringify({
        "idInternacion": idInternacion,
        "fecha": hoy
    });


    $.ajax({
        type: "POST",
        url: "../Json/Nutricion/AtConsultorio.asmx/cargarIndicaciones",
        //            data: '{idInternacion: "' + idInternacion + '"}',
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            //alert("paso before");
            $("#cboSi").attr('checked', false);
            $("#cboSi").attr('disabled', false);

            $("#cboNo").attr('checked', true);
            $("#cboNo").attr('disabled', true);
            $("#btnEditarAcompañante").hide();

        },
        //complete: cargar2(idInternacion),
        success: Cargar_Indicaciones_Cargado,
        error: errores
    });

}

    function Cargar_Encabezado_idInternacion() {
        alert();
        $.ajax({
            type: "POST",
            url: "../Json/Nutricion/AtConsultorio.asmx/cargarEncabezado",
            data: '{idInternacion: "' + idInternacion + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function () {
                $("#cargando").show();
                $("#TablaConsultas").empty();
                $("#TablaConsultas").hide();
            },
            complete: function () {
                $("#cargando").hide();
                $("#TablaConsultas").show();
            },
            success: Cargar_Encabezado_Cargado,
            error: errores
        });
    }

    function Cargar_Encabezado_Cargado(Resultado) {
        var E = Resultado.d;
        idPaciente = E.documento;

        $("#txt_dni").attr('value', E.documento_real);
        $("#txtNHC").attr('value', E.NHC_UOM);
        $("#CargadoApellido").html(E.apellido);
        $("#CargadoEdad").html(E.edad);
        $("#CargadoDNI").html(E.documento_real);
        $("#CargadoNHC").html(E.NHC_UOM);
        $("#CargadoSeccional").html(E.seccional)
        $("#CargadoLocalidad").html(E.localidad);
        $("#CargadoMedico").html(E.medico);
        $("#CargadoServicio").html(E.servicio);
        $("#CargadoSala").html(E.sala);
        $("#CargadoCama").html(E.cama);
        fechaIngreso = E.fehcaInternacion;

        var ruta = "silueta";
        $('#fotopaciente').attr('src', '../img/usuarios/' + ruta + '.jpg');
    }

function traerIdsInternacion() {//// trae los id de las internaciones, los carga en un array y llama a los demas metodos
    var json = JSON.stringify({
        "fecha": $("#txtFecha").val()
    });

    $.ajax({
        type: "POST",
        url: "../Json/Nutricion/Nutricion.asmx/traerIdsInternacion",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: traerIdsInternacionCargar,
        error: errores
    });

    function traerIdsInternacionCargar(resultado) {
        var resul = resultado.d;
        $.each(resul, function (index, res) {
            listIds.push(res);
        });
        ////////////////////////////////////////////////////////>>><<
        idInternacion = listIds[indiceAseguir];
        Cargar_Encabezado_idInternacion(idInternacion);
        cargarIndicaiones(idInternacion, hoy);
        //        traerComidasAcompañante();
    }
}


function Cargar_Indicaciones_Cargado(resultado) {
    var I = resultado.d;
    var indicacion = {};
    listaIndicaciones.length = 0;
    $("#TablaConsultas").empty();
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%; text-align:center'><thead><tr><th>Indicaciones</th></tr>";
    var Contenido = "";
    $.each(I, function (index, i) {

        indicacion.REM_NOMBRE = i.REM_NOMBRE;
        indicacion.indicacion = i.indicacion;
        if (indicacion.REM_NOMBRE == "") { Contenido = Contenido + "<tr><td>" + i.indicacion + " </td>" } else { Contenido = Contenido + " <tr><td> " + i.REM_NOMBRE + "</td>"; }
        listaIndicaciones.push(indicacion);

    });
    var Pie = "</table>";
    $("#TablaConsultas").html(Encabezado + Contenido + Pie);
}