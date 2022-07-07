function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Cargado,
        error: errores
    });
}

function CargarPacienteID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Cargado,
        error: errores
    });
}

var Internado = 0;
var tipoEstudio = localStorage.getItem('tipoEstudio') || 0;
var Protocolo = 0;
var MedicoId = 0;
var NHC = 0;
var DniReal = 0;
var EspecialidadId = 0;
var Diagnostico = 0;
var FechaTurno = "";
var HoraTurno = "";
var HC_Cargada = 0;
var sourceArr = [];
var mapped = {};
var dia = new Date();
var fecha = dia.getFullYear() + '/' + (dia.getMonth() + 1) + '/' + dia.getDate();
var hora = dia.getHours() + ':' + dia.getMinutes() + ':' + dia.getSeconds();

function Cargar_Paciente_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {

        if (paciente.NHC !== null && paciente.NHC !== '') {
            //$("#desdeaqui").show();
            //TieneUltimo(paciente.NHC);
        }

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);
        $("#afiliadoId").val(paciente.documento);
        $("#txt_dni").attr('value', paciente.documento_real);
        NHC = paciente.documento;
        DniReal = paciente.documento_real;  

        $("#txtNHC").attr('value', paciente.NHC_UOM);

        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);

        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        //$("#CargadoTelefono").html(paciente.Telefono);

        $("#CargadoLocalidad").html(paciente.localidad.substring(0, 15));


        if (paciente.Nro_Seccional != "999") {
            $("#CargadoSeccional").html(paciente.Seccional);
        }
        else {
            $("#CargadoSeccional").html("Sin Seccionalizar");
        }

        if (paciente.Nro_Seccional != 998) {
            $("#CargadoSeccional").html(paciente.Seccional);
        }
        else $("#CargadoSeccional").html(paciente.ObraSocial);

        $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);

    });
}
$("#btnCancelar").click(function () {
    parent.$.fancybox.close();
});

$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

function Cargar_Estudios_Complementarios() {

    $.ajax({
        type: "POST",
        url: "../Json/EstudiosComplementarios.asmx/Estudios_Complementarios_listar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Estudio_Complementarios_Cargados,
        error: errores
    });
}

function Estudio_Complementarios_Cargados(Resultado) {
    var Estudios = Resultado.d;
    $('#cbo_EstudiosComplementarios').empty();
    $('#cbo_EstudiosComplementarios').append('<option value="">Seleccione Estudios Complementarios </option>');
    $.each(Estudios, function (index, estComp) {
        $('#cbo_EstudiosComplementarios').append(
            $('<option></option>').val(estComp.Id).html(estComp.Descripcion)
        );
    });
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

$('#cbo_EstudiosComplementarios').change(function () {
    var OpcionSeleccionada = $('#cbo_EstudiosComplementarios option:selected').html();
    Filtrar_Tipo_Estudios_Complementarios(OpcionSeleccionada);
});

function Filtrar_Tipo_Estudios_Complementarios(Estudio) {
    var json = JSON.stringify({ "Descripcion": Estudio });
    $.ajax({
        type: "POST",
        url: "../Json/EstudiosComplementarios.asmx/Filtro_Estudios_Complementarios",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Filtro_Estudio_Complementarios,
        error: errores
    });

}

function Filtro_Estudio_Complementarios(Resultado) {
    var TipoEstudio = Resultado.d;

    $('#cbo_TipoEstudiosComplementarios').empty();
    $('#cbo_TipoEstudiosComplementarios').append('<option value="">Seleccione tipo de estudio</option>');
    $.each(TipoEstudio, function (index, estComp) {
        $('#cbo_TipoEstudiosComplementarios').append(
            $('<option></option>').val(estComp.Id).html(estComp.Descripcion)  
        );
    });
    
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$(document).ready(function () {


    Cargar_Estudios_Complementarios();
    
    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    //CargarDiagnostico();
    if (GET["Protocolo"] != "" && GET["Protocolo"] != null) {
        $("#divmotivo").show();
        if (GET["U"] != "" && GET["U"] != null) {
            U = GET["U"];
            CargarConsulta();
            $("#btnImprimir").show();
        }
        else {
            Protocolo = GET["Protocolo"];
            CargarConsulta();
            $("#btnImprimir").show();
        }
    }
    else {
        $("#btnImprimirElectroencefalograma").hide();
        $("#btnImprimirElectromiografia").hide();
        $("#btnImprimirMAPA").hide();
        $("#btnImprimirHolter").hide();
        $("#btnImprimirRiesgoQuirurgico").hide();
        $("#btnImprimirPolisomnografia").hide();
        $("#btnImprimirReflujo").hide();
        $("#btnImprimir").hide();

        if (GET["NHC"] != "" && GET["NHC"] != null) {
            NHC = GET["NHC"];
            CargarPacienteID(NHC);
            //CargarDiagnostico();
        }

        Internado = GET["Internado"];
        localStorage.setItem('Internado', Internado);

        if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
            if (GET["EspecialidadId"] != "" && GET["EspecialidadId"] != null) {
                EspecialidadId = GET["EspecialidadId"];
            }
            MedicoId = GET["MedicoId"];
            FechaTurno = GET["F"];
        }
    }
    if (GET["m"] == "1") { //Modifica Atencion        
        $("#btnImprimir").show();
        $("#divmotivo").show();
    }

    $("#txt_FechaAnalisis").datepicker();

});

function Siguiente() {

    if (($('#cbo_EstudiosComplementarios').val() !== "") && ($('#cbo_TipoEstudiosComplementarios').val() !== "")) {
        var afiliado = $('#afiliadoId').val
        tipoEstudio = $('#cbo_TipoEstudiosComplementarios').val();

        localStorage.setItem('tipoEstudio', tipoEstudio);
        const data = {
            0: '',
            1: '../EstudiosComplementarios/Electromiografia.aspx?NHC=' + $('#afiliadoId').val() + "&Internado=" + Internado + "&MedicoId=" + MedicoId,
            2: '../EstudiosComplementarios/Polisomnografia.aspx?NHC=' + $('#afiliadoId').val() + "&Internado=" + Internado + "&MedicoId=" + MedicoId,
            3: '../EstudiosComplementarios/Electroencefalograma.aspx?NHC=' + $('#afiliadoId').val() + "&Internado=" + Internado + "&MedicoId=" + MedicoId,
            4: '../EstudiosComplementarios/MAPA.aspx?NHC=' + $('#afiliadoId').val() + "&Internado=" + Internado + "&MedicoId=" + MedicoId,
            5: '../EstudiosComplementarios/Holter.aspx?NHC=' + $('#afiliadoId').val() + "&Internado=" + Internado + "&MedicoId=" + MedicoId,
            6: '../EstudiosComplementarios/RiesgoQuirurgico.aspx?NHC=' + $('#afiliadoId').val() + "&Internado=" + Internado + "&MedicoId=" + MedicoId,
            7: '../EstudiosComplementarios/Reflujo.aspx?NHC=' + $('#afiliadoId').val() + "&Internado=" + Internado + "&MedicoId=" + MedicoId
        };   
            let target = document.querySelector('#cbo_EstudiosComplementarios').value;
            window.location.href = data[target];
    }
    else {
        alert('Error: ' + "Por favor seleccione estudio para continuar");
    }
}

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
/*Imprimir distintas practicas--INICIO--*/
$("#btnImprimirElectromiografia").click(function () {
    Print("../Impresiones/ImpresionEstudiosComplementarios/ImpresionElectromiografia.aspx?id_afiliado=" + NHC + "&MedicoId=" + MedicoId);
});

$("#btnImprimirElectroencefalograma").click(function () {
    Print("../Impresiones/ImpresionEstudiosComplementarios/ImpresionElectroencefalograma.aspx?id_afiliado=" + NHC + "&MedicoId=" + MedicoId);
});

$("#btnImprimirHolter").click(function () {
    Print("../Impresiones/ImpresionEstudiosComplementarios/ImpresionHolter.aspx?id_afiliado=" + NHC + "&MedicoId=" + MedicoId);
});

$("#btnImprimirMAPA").click(function () {
    Print("../Impresiones/ImpresionEstudiosComplementarios/ImpresionMAPA.aspx?id_afiliado=" + NHC + "&MedicoId=" + MedicoId);
});

$("#btnImprimirPolisomnografia").click(function () {
    Print("../Impresiones/ImpresionEstudiosComplementarios/ImpresionPolisomnografia.aspx?id_afiliado=" + NHC + "&MedicoId=" + MedicoId);
});

$("#btnImprimirRiesgoQuirurgico").click(function () {
    Print("../Impresiones/ImpresionEstudiosComplementarios/ImpresionRiesgoQuirurgico.aspx?id_afiliado=" + NHC + "&MedicoId=" + MedicoId);
});

$("#btnImprimirReflujo").click(function () {
    Print("../Impresiones/ImpresionEstudiosComplementarios/ImpresionReflujo.aspx?id_afiliado=" + NHC + "&MedicoId=" + MedicoId);
});


/*Imprimir distintas practicas--FIN--*/


function Print(url) {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
            'width': '100%',
            'height': '90%',
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

$("#btnCerrar").click(function () {
    parent.$.fancybox.close();
});

$("#btnCancelar").click(function () {
    parent.$.fancybox.close();
});

/*Guardar distintas practicas--INICIO--*/
    var fechaActual = fecha;
    var fechaActualPartes = fechaActual.split("/");
    var fechaActualDate = new Date(fechaActualPartes[0],fechaActualPartes[1]-1,fechaActualPartes[2]); 

$("#btnGuardarElectromiografia").click(function () {
    
    var fecPractica = $("#fechaPractica").val();
    var fecPracticaPartes = fecPractica.split("-");
    var fecPracticaDate = new Date(fecPracticaPartes[0],fecPracticaPartes[1]-1,fecPracticaPartes[2]);   

    if(fecPracticaDate > fechaActualDate){ alert("La fecha de practica no puede ser mayor a la fecha de hoy.");return false;}
    if ($("#fechaPractica").val().trim().length <= 0) { alert("Seleccione la fecha que se realizó la practica!"); return false; }
    var json = JSON.stringify({
        "idAfiliado": NHC,
        "Id_Medico": MedicoId,
        "idPractica": 1,
        "TipoPractica": tipoEstudio,
        "fechaPractica": $("#fechaPractica").val().trim(),
        "internado": Internado,
        "columna1": $("#txtConclusion").val().trim(),
        "columna2": $("#txtNeuroConduccionMotora").val().trim(),
        "columna3": $("#txtSensitivo").val().trim(),
        "columna4": $("#txtEMG").val().trim(),
        "columna5": $("#txtObservaciones").val().trim(),
        "columna6": "",
        "columna7": "",
        "Link_Pdf": "",
        "Observaciones": "",
        "Fecha_Sistema": fecha,
        "titulo": "",
        "tituloB": "",
        "fechaYHora": fecha + ' ' + hora
    });

    $.ajax({
        type: "POST",
        url: "../Json/EstudiosComplementarios.asmx/Insertar_Historial_Practicas_Complementarias",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Guardado");
            $("#btnImprimirElectromiografia").show();
        },
        error: errores
    });

});

$("#btnGuardarPolisomnografia").click(function () {

    var fecPractica = $("#fechaPractica").val();
    var fecPracticaPartes = fecPractica.split("-");
    var fecPracticaDate = new Date(fecPracticaPartes[0],fecPracticaPartes[1]-1,fecPracticaPartes[2]);
    
    if(fecPracticaDate > fechaActualDate){ alert("La fecha de practica no puede ser mayor a la fecha de hoy.");return false;}
    if ($("#fechaPractica").val().trim().length <= 0) { alert("Seleccione la fecha que se realizó la practica!"); return false; }

    var json = JSON.stringify({
        "idAfiliado": NHC,
        "Id_Medico": MedicoId,
        "idPractica": 2,
        "TipoPractica": tipoEstudio,
        "fechaPractica": $("#fechaPractica").val().trim(),
        "internado": Internado,
        "columna1": $("#txtMotivoEstudio").val().trim(),        
        "columna2": $("#chkOculogramaIzq").prop('checked') + "|" + $("#chkOculogramaDer").prop('checked')  + "|" + $("#chkElectromiogramaSubmentoniano").prop('checked') + "|" +
         $("#chkC3A2").prop('checked') + "|" + $("#chkC4A1").prop('checked')  + "|" + $("#chkEMGTibial").prop('checked'), 
          
        "columna3": $("#chkOximetria").prop('checked') + "|" + $("#chkFlujoAereoBuco-Nasal").prop('checked')  + "|" + $("#chkMovimientosTorácicosYAbdominales").prop('checked') + "|" +
         $("#chkVideoImagenSonido").prop('checked') + "|" + $("#chkElectrocardiograma").prop('checked')  + "|" + $("#chkSonido").prop('checked') + "|" +
         $("#chkTransitoOndaPulso").prop('checked') + "|" + $("#chkPresionEsofagica").prop('checked'), 

        "columna4": $("#chkPolisomnografocomputarizado21").prop('checked') + "|" + $("#chkPolisomnografocomputarizadoATI").prop('checked')  + "|" + 
         $("#chkOximetroNelicor").prop('checked') + "|" +$("#chkPoligrafoStardust").prop('checked') + "|" + $("#chkPoligrafoAlice").prop('checked')  + "|" +
         $("#chkPoligrafoOxford").prop('checked') + "|" + $("#chkAutoCPAP").prop('checked'), 

        "columna5":  "",
        "columna6": "",
        "columna7": "",
        "Link_Pdf": "",
        "Observaciones": "",
        "Fecha_Sistema": fecha,
        "titulo": "",
        "tituloB": "",
        "fechaYHora": fecha + ' ' + hora
    });

    $.ajax({
        type: "POST",
        url: "../Json/EstudiosComplementarios.asmx/Insertar_Historial_Practicas_Complementarias",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Guardado");
            $("#btnImprimirPolisomnografia").show();

        },
        error: errores
    });
});

$("#btnGuardarElectroencefalograma").click(function () {

    var fecPractica = $("#fechaPractica").val();
    var fecPracticaPartes = fecPractica.split("-");
    var fecPracticaDate = new Date(fecPracticaPartes[0],fecPracticaPartes[1]-1,fecPracticaPartes[2]);   

    if(fecPracticaDate > fechaActualDate){ alert("La fecha de practica no puede ser mayor a la fecha de hoy.");return false;}
    if ($("#fechaPractica").val().trim().length <= 0) { alert("Seleccione la fecha que se realizó la practica."); return false; }
    

    var json = JSON.stringify({
        "idAfiliado": NHC,
        "Id_Medico": MedicoId,
        "idPractica": 3,
        "TipoPractica": tipoEstudio,
        "fechaPractica": $("#fechaPractica").val().trim(),
        "internado": Internado,
        "columna1": $("#txtRitmoBase").val().trim(),
        "columna2": $("#txtActividadepileptiforme").val().trim(),
        "columna3": $("#txtRespuestaHiperventilacion").val().trim(),
        "columna4": $("#txtRegistroSueño").val().trim(),
        "columna5": $("#txtConclusiones").val().trim(),
        "columna6": "",
        "columna7": "",
        "Link_Pdf": "",
        "Observaciones": "",
        "Fecha_Sistema": fecha,
        "titulo": "",
        "tituloB": "",
        "fechaYHora": fecha + ' ' + hora
    });

    $.ajax({
        type: "POST",
        url: "../Json/EstudiosComplementarios.asmx/Insertar_Historial_Practicas_Complementarias",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Guardado");
            $("#btnImprimirElectroencefalograma").show();

        },
        error: errores
    });
});

$("#btnGuardarMAPA").click(function () {
    
    var fecPractica = $("#fechaPractica").val();
    var fecPracticaPartes = fecPractica.split("-");
    var fecPracticaDate = new Date(fecPracticaPartes[0],fecPracticaPartes[1]-1,fecPracticaPartes[2]);   

    if(fecPracticaDate > fechaActualDate){ alert("La fecha de practica no puede ser mayor a la fecha de hoy.");return false;}
    if ($("#fechaPractica").val().trim().length <= 0) { alert("Seleccione la fecha que se realizó la practica!"); return false; }

    var json = JSON.stringify({
        "idAfiliado": NHC,
        "Id_Medico": MedicoId,
        "idPractica": 4,
        "TipoPractica": tipoEstudio,
        "fechaPractica": $("#fechaPractica").val().trim(),
        "internado": Internado,
        "columna1": $("#txtInformeyConclusion").val().trim(),
        "columna2": "",
        "columna3": "",
        "columna4": "",
        "columna5": "",
        "columna6": "",
        "columna7": "",
        "Link_Pdf": "",
        "Observaciones": "",
        "Fecha_Sistema": fecha,
        "titulo": "",
        "tituloB": "",
        "fechaYHora": fecha + ' ' + hora
    });

    $.ajax({
        type: "POST",
        url: "../Json/EstudiosComplementarios.asmx/Insertar_Historial_Practicas_Complementarias",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Guardado");
            $("#btnImprimirMAPA").show();

        },
        error: errores
    });
});

$("#btnGuardarHolter").click(function () {

    var fecPractica = $("#fechaPractica").val();
    var fecPracticaPartes = fecPractica.split("-");
    var fecPracticaDate = new Date(fecPracticaPartes[0],fecPracticaPartes[1]-1,fecPracticaPartes[2]);   

    if(fecPracticaDate > fechaActualDate){ alert("La fecha de practica no puede ser mayor a la fecha de hoy.");return false;}
    if ($("#fechaPractica").val().trim().length <= 0) { alert("Seleccione la fecha que se realizó la practica!"); return false; }

    var json = JSON.stringify({
        "idAfiliado": NHC,
        "Id_Medico": MedicoId,
        "idPractica": 5,
        "TipoPractica": tipoEstudio,
        "fechaPractica": $("#fechaPractica").val().trim(),
        "internado": Internado,
        "columna1": $("#txtConclusion").val().trim(),
        "columna2": "",
        "columna3": "",
        "columna4": "",
        "columna5": "",
        "columna6": "",
        "columna7": "",
        "Link_Pdf": "",
        "Observaciones": "",
        "Fecha_Sistema": fecha,
        "titulo": "",
        "tituloB": "",
        "fechaYHora": fecha + ' ' + hora
    });

    $.ajax({
        type: "POST",
        url: "../Json/EstudiosComplementarios.asmx/Insertar_Historial_Practicas_Complementarias",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Guardado");
            $("#btnImprimirHolter").show();

        },
        error: errores
    });
});


$("#btnGuardarRiesgoQuirurgico").click(function () {

    var fecPractica = $("#fechaPractica").val();
    var fecPracticaPartes = fecPractica.split("-");
    var fecPracticaDate = new Date(fecPracticaPartes[0],fecPracticaPartes[1]-1,fecPracticaPartes[2]);   

    if(fecPracticaDate > fechaActualDate){ alert("La fecha de practica no puede ser mayor a la fecha de hoy.");return false;}
    if ($("#fechaPractica").val().trim().length <= 0) { alert("Seleccione la fecha que se realizó la practica!"); return false; }

    var json = JSON.stringify({
        "idAfiliado": NHC,
        "Id_Medico": MedicoId,
        "idPractica": 6,
        "TipoPractica": tipoEstudio,
        "fechaPractica": $("#fechaPractica").val().trim(),
        "internado": Internado,
        "columna1": $("#chCirugiaUrgente").prop('checked') + "|" + $("#chIAMMenor6").prop('checked') + "|" + $("#chEstenosis").prop('checked'),

        "columna2": $("#chMayor70anios").prop('checked') + "|" + $("#chDiabetes").prop('checked') + "|" + $("#chVasculopatia").prop('checked') + "|" +
                    $("#chICCoFey").prop('checked') + "|" + $("#chICCoFey").prop('checked') + "|" + $("#chACV").prop('checked') + "|" + $("#chInsufMiOAosevera").prop('checked') + "|" +
                    $("#chEPOCsevero").prop('checked') + "|" + $("#chCancerActivo").prop('checked') + "|" + $("#chCr").prop('checked') +  
                    "|AltoRiesgo|" + $("#chMayor").prop('checked') + "|ModeradoRiesgo|" + $("#chNingunMayor1Menor").prop('checked') + "|BajoRiesgo|" + $("#chNingunMayor").prop('checked'),
       
        "columna3": "AltoRiesgo|" + $("#chAortica").prop('checked') + "|" + $("#chVascularPeriferica").prop('checked') + "|" + $("#chToracicaMayor").prop('checked') + "|" +
                    $("#chNeurocirugiaMayor").prop('checked') + "|" + $("#chGeneralMayor").prop('checked') + 
                    "|ModeradoRiesgo|" + $("#chAbdominal").prop('checked') + "|" + $("#chEndarterectomía").prop('checked') + "|" + $("#chAngioplastiaPeriferica").prop('checked') + "|" +
                    $("#chProcedimientoEndoscopicoTerapeutico").prop('checked') + "|" + $("#chCirugiaCabezaYCuello").prop('checked') + "|" + $("#chOrtopedicaMayor").prop('checked') + "|" +
                    $("#chUrologicaOGinecologicaMayor").prop('checked')+
                    "|BajoRiesgo|" + $("#chMamas").prop('checked') + "|" + $("#chEndocrina").prop('checked') + "|" + $("#chOftamológica").prop('checked') + "|" +
                    $("#chGinecologicaMenor").prop('checked') + "|" + $("#chPlástica").prop('checked') + "|" + $("#chOrtopedicaMenor").prop('checked') + "|" +
                    $("#chUrologicaMenor").prop('checked') + "|" + $("#chEndoscopiaDX").prop('checked') + "|"  + $("#chDental").prop('checked') + "|" + $("#txtOtros").val().trim(),
                    
        "columna4": "Bajo|" + $("#chBajo1").prop('checked') + "|" + $("#chBajo2").prop('checked') + "|" + $("#chBajo3").prop('checked') + 
                    "|Moderado|" + $("#chBajoModerado1").prop('checked') + "|" + $("#chModerado").prop('checked') + "|" + $("#chAltoModerado").prop('checked') +
                    "|Alto|" + $("#chAlto1").prop('checked') + "|" + $("#chAlto2").prop('checked') + "|" + $("#chAlto3").prop('checked'),

        "columna5": $("#txtRecomendaciones").val().trim(),
        "columna6": "",
        "columna7": "",
        "Link_Pdf": "",
        "Observaciones": "",
        "Fecha_Sistema": fecha,
        "titulo": "",
        "tituloB": "",
        "fechaYHora": fecha + ' ' + hora
    });

    $.ajax({
        type: "POST",
        url: "../Json/EstudiosComplementarios.asmx/Insertar_Historial_Practicas_Complementarias",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Guardado");
            $("#btnImprimirRiesgoQuirurgico").show();

        },
        error: errores
    });
});

$("#btnGuardarReflujo").click(function () {
    
    var fecPractica = $("#fechaPractica").val();
    var fecPracticaPartes = fecPractica.split("-");
    var fecPracticaDate = new Date(fecPracticaPartes[0],fecPracticaPartes[1]-1,fecPracticaPartes[2]);   

    if(fecPracticaDate > fechaActualDate){ alert("La fecha de practica no puede ser mayor a la fecha de hoy.");return false;}
    if ($("#fechaPractica").val().trim().length <= 0) { alert("Seleccione la fecha que se realizó la practica!"); return false; }
    var json = JSON.stringify({
        "idAfiliado": NHC,
        "Id_Medico": MedicoId,
        "idPractica": 7,
        "TipoPractica": tipoEstudio,
        "fechaPractica": $("#fechaPractica").val().trim(),
        "internado": Internado,
        "columna1": $("#txtDescripcion").val().trim(),
        "columna2": $("#txtInterpretacionHallazgos").val().trim(),
        "columna3": "",
        "columna4": "",
        "columna5": "",
        "columna6": "",
        "columna7": "",
        "Link_Pdf": "",
        "Observaciones": "",
        "Fecha_Sistema": fecha,
        "titulo": "",
        "tituloB": "",
        "fechaYHora": fecha + ' ' + hora
    });

    $.ajax({
        type: "POST",
        url: "../Json/EstudiosComplementarios.asmx/Insertar_Historial_Practicas_Complementarias",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            alert("Guardado");
            $("#btnImprimirReflujo").show();
        },
        error: errores
    });

});
/*Guardar distintas practicas--FIN--*/

/*function ValidarElectroencefalograma() {
    if ($("#txtRitmoBase").val().trim().length === 0) $("#txtRitmoBase").val('0');
    if ($("#txtActividadepileptiforme").val().trim().length === 0) $("#txtActividadepileptiforme").val('0');
    if ($("#txtRespuestaHiperventilacion").val().trim().length === 0) $("#txtRespuestaHiperventilacion").val('0');
    if ($("#txtRegistroSueño").val().trim().length === 0) $("#txtRegistroSueño").val('0');
    if ($("#txtConclusiones").val().trim().length === 0) $("#txtConclusiones").val('0');
    if ($("#fechaPractica").val().trim().length === 0) $("#fechaPractica").val('0');
    return true;
}*/


