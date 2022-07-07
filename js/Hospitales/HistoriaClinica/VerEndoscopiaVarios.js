var NHC;
var IntId;

var selected = [];

$(document).ready(function () {
    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        CargarPacienteID(NHC);
    }
    if (GET["IntId"] != "" && GET["IntId"] != null) {
        IntId = GET["IntId"];

        VerficarExisteParteAnestesia(IntId);
        CargarDatosInt(IntId);
    }

});

function CargarDatosInt(Id) {
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Egreso_Cargar",
        data: '{Id: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var I = Resultado.d;
            var Egreso = I.dia;
            if (I.dia == null) { Egreso = "SIN EGRESO"; }
            $("#titulo1").html("Ingreso: " + I.diaIngreso + " - Egreso: " + Egreso);
        },
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
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);

        $("#afiliadoId").val(paciente.documento);

        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#Titulo_Seccional_o_OS").html("Ob. Social");
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }
        else {
            $("#btnVencimiento").show();
        }

        $('#fotopaciente').attr('src', '../img/Pacientes/' + NHC + '.jpg');

    });
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}









$("#btn_BRONCO").click(function () {
    Imprimir("1");
});

$("#btn_VCC").click(function () {
    Imprimir("2");
});

$("#btn_Veda").click(function () {
    Imprimir("3");
});

$("#btn_Extra").click(function () {
    Imprimir("4");
});

$("#btn_VRSC").click(function () {
    Imprimir("5");
});

$("#btn_CPER").click(function () {
    Imprimir("6");
});

$("#btn_Insumos").click(function () {
    Imprimir("7");
});

$("#btn_Anestesia").click(function () {
    Imprimir("8");
});

function Imprimir(Id) {
    if (Id == "1") { var Pagina = "../Impresiones/Endoscopia_ProEndoscoDibujo.aspx?Id=" + IntId; }
    if (Id == "2") { var Pagina = "../Impresiones/Endoscopia_ProEndoscoFCC.aspx?Id=" + IntId; }
    if (Id == "3") { var Pagina = "../Impresiones/Endoscopia_ProEndoscoFeda.aspx?Id=" + IntId; }
    if (Id == "4") { var Pagina = "../Impresiones/Impresion_Endoscopia_ProtesisyOtros.aspx?Id=" + IntId; }
    if (Id == "5") { var Pagina = "../Impresiones/Endoscopia_ProEndoscoVRSC.aspx?Id=" + IntId; }
    if (Id == "6") { var Pagina = "../Impresiones/Endoscopia_Impresion_Protocolo_CPER.aspx?Id=" + IntId; }
    if (Id == "7") { var Pagina = "../Impresiones/Endoscopia_Impresion_Insumo.aspx?CirugiaId=" + IntId + "&Tipo=2"; }
    if (Id == "8") { var Pagina = "../Quirofano/PlanillaAnestesia.aspx?NHC=" + NHC + "&cirugiaId=" + IntId + "&tipo=2" + "&mostrar=0"; }    

    $.fancybox({
		    'autoDimensions': false,
		    'href': Pagina,
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

function VerficarExisteParteAnestesia(Id) {
    var json = JSON.stringify({ "cirugiaId": Id, "tipo": 2 });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/VerficarExisteParteAnestesia",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d == 1) { $("#btn_Anestesia").show(); } else { $("#btn_Anestesia").hide(); }
        },
        error: errores
    });
}