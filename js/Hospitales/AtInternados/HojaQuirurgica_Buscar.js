var MedicoId = 0;
var DiagnosticoId = 0;
var EspecialidadId = 0;
var PracticaId = 0;
var fecha_traida = "";
var AfiliadoId = 0;
var Ultimo_OK = 0;

var objBusquedaLista = "";

var PRQ_ID = 0;
var PRQ_SOC_ID = 0;
var PRQ_SESION = 0;
var PRQ_CAMA_ID = 0;
var PRQ_GUA_ID = 0;
var Cama = "";
var Sala = "";

var MedicoUsuario = 0;

$(document).ready(function () {

    var Query = {};
    Query = GetQueryString();

    if (Query['IntId'] != null) {
        PRQ_SESION = Query['IntId'];
        CargarInternacion();
    }

    if (Query["B"] != "" && Query["B"] != null) {
        objBusquedaLista = Query["B"];
    }

});



function GetQueryString() {
    var querystring = location.search.replace('?', '').split('&');
    // declare object
    var queryObj = {};
    // loop through each name-value pair and populate object
    for (var i = 0; i < querystring.length; i++) {
        // get name and value
        var name = querystring[i].split('=')[0];
        var value = querystring[i].split('=')[1];
        // populate object
        queryObj[name] = value;
    }
    return queryObj;
}



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}






function CargarPacienteID() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + PRQ_SOC_ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}



function VerificarPMI(PacienteID) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/VerificarPMI",
        data: '{PacienteId: "' + PacienteID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#verificarPMI").val(Resultado.d);
        },
        error: errores
    });
}



function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    $.each(Paciente, function (index, paciente) {
        if (paciente.Vencido) {
            alert("Paciente dado de baja el día: " + paciente.FechaVencido);
        }

        VerificarPMI(paciente.documento);                

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));
        

        //Verifico si esta en el padron 10.0.0.1
        $("#SpanCargando").show();
        $("#btnVencimiento").hide();
        //EstaVendico($("#txt_dni").val());

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);

        AfiliadoId = paciente.documento;
        

        $("#CargadoTelefono").html(paciente.Telefono);
        $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);

        
        //        if (Ultimo_OK != 1) {
        //            alert(Ultimo_OK);
        UltimoAporte_OK(); //Verifica aportes en Padron UOM.
        //        }

        $("#CargadoSeccional").html(paciente.Seccional);        
        
    });
}



function UltimoAporte_OK() {
    if (Ultimo_OK == 1) { return false; }
    var json = JSON.stringify({ "Documento": $("#CargadoDNI").html() });
    $.ajax({
        type: "POST",
        url: "../Json/Gente.asmx/UltimoAporte_OK",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            Ultimo_OK = 1;
            var ok = Resultado.d;
            if (!ok) {
                alert("No se registran aportes en los últimos 3 meses. Regularizar situación en AFILIACIONES.");                
                $("#IconoVencido2").attr("src", "../img/Icono_ERROR.gif")                
                $("#IconoVencido2").attr("data-original-title", "Problemas Aportes 3 meses");

                if ($("[rel=tooltip]").length) {
                    $("[rel=tooltip]").tooltip();
                }
                //$("#desdeaqui").remove();
            }
            else {                
                $("#IconoVencido2").attr("src", "../img/Icono_OK.gif")
            }
            $("#SpanCargando").show();
        }
    });
}



function CargarInternacion() {
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/Buscar_Internacion_Id",
        data: '{Id: "' + PRQ_SESION + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Internacion = Resultado.d;

            PRQ_SOC_ID = Internacion.NHC;

            PRQ_CAMA_ID = Internacion.CamaId;
            Cama = Internacion.Cama;
            Sala = Internacion.Sala;

            $("#Cargado_Cama").html(Cama);
            $("#Cargado_Sala").html(Sala);

            
            ListarHojaQuirurgica();
            CargarPacienteID();             

        },
        error: errores
    });
}


function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}



function ListarHojaQuirurgica() {
    //int Id, int PacienteId, int InternacionId

    var json = JSON.stringify({ "Id": 0, "PacienteId": PRQ_SOC_ID, "InternacionId": PRQ_SESION });

    var Tabla_Contenido = "";
    var Tabla_Contenido_Cab = "<table class='table table-hover'><tr><td>Fecha</td><td>Práctica</td></tr>";
    var Tabla_Contenido_Pie = "</table>";

    var cant = 0;

    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/AtInternados_Hoja_Quirurgica_Listar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            var HojasCargadas = Resultado.d;
            $.each(HojasCargadas, function (index, hoja) {
                if (hoja.ES_ESPECIALISTA == 0) {
                    Tabla_Contenido = Tabla_Contenido + "<tr onclick='javascript:Cargar(" + hoja.PRQ_ID + ");' class='manito'><td>" + hoja.PRQ_FECHA + "</td><td>" + hoja.PRACTICA_DESCRIPCION + "</td></tr>";
                    cant++;
                }
                if (hoja.ES_ESPECIALISTA == 1) {
                    Tabla_Contenido = Tabla_Contenido + "<tr onclick='javascript:ImprimirEspecialista(" + hoja.PRQ_ID + ");' class='manito'><td>" + hoja.PRQ_FECHA + "</td><td>" + hoja.PRACTICA_DESCRIPCION + "</td></tr>";
                    cant++;
                }
            });

            $("#div_busqueda").html(Tabla_Contenido_Cab + Tabla_Contenido + Tabla_Contenido_Pie);
            if (cant == 0) {
                $("#btnNuevo").click();
            }

        },
        error: errores
    });
}


//IMPRESION PRACTICA ESPECIALISTA
function ImprimirEspecialista(Id) {
    $.fancybox({
        'autoDimensions': false,
        'href': "../Impresiones/At_Int_Impresion_PracticaEspecialista.aspx?ID=" + Id,
        'width': '100%',
        'height': '100%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false
    });
}
//IMPRESION PRACTICA ESPECIALISTA

function Cargar(Id) {
    document.location = "HojaQuirurgica.aspx?IntId=" + PRQ_SESION + "&HojaId=" + Id + "&MedicoId=" + MedicoId;
}

$("#btnVolver").click(function () {
    //document.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + PRQ_SESION + "&B=" + objBusquedaLista;
    parent.jQuery.fancybox.close();
});

$("#btnNuevo").click(function () {
    document.location = "../AtInternados/HojaQuirurgica.aspx?V=1&IntId=" + PRQ_SESION;    
});


