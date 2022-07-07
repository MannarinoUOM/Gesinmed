var MedicoId = 0;
var NHC = 0;

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


$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    $.each(Paciente, function (index, paciente) {
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#afiliadoId").val(paciente.documento);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        //alert(paciente.Foto);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
    });

}

$(document).ready(function () {
    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


//    if (GET["internacion"] != "") {
//        internacion = GET["internacion"];
//        //alert(internacion);
//    }

    if (GET["MedicoId"] != "") {
        MedicoId = GET["MedicoId"];
    }


    if (GET["NHC"] != "") {
        NHC = GET["NHC"];
        CargarPacienteID(NHC);
        Cargar_Ultimo();
    }
});

$("#btnCancelar").click(function () {
    parent.$.fancybox.close();
}); 

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#btnGuardarCertificado").click(function () {    
    GuardarCertificado();
});

function Validar() {
    if (MedicoId <= 0 || MedicoId == null || MedicoId == undefined) { alert("Médico no válido."); return false; }
    if (NHC <= 0 || NHC == null || NHC == undefined) { alert("Paciente no válido."); return false; }
    if ($("#txtCertificado").val().trim().length == 0) { alert("Complete certificado."); return false; }
    return true;
}

function GuardarCertificado() {
    if (!Validar()) return false;

    var json = JSON.stringify({
        "MedicoId": MedicoId,
        "Indicaciones": $('#txtCertificado').val().trim().toUpperCase(),
        "NHC": NHC
    });


    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/CertificadoMedico.asmx/CertificadoMedico_Guardar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CertificadoGuardado,
        error: errores
    });
}

function CertificadoGuardado(Resultado) {
    //alert(internacion);
    var Pedidos = Resultado.d;
    //self.location = "../Impresiones/CertificadoMedico.aspx?Id=" + Pedidos + " ";
    self.location = "../Impresiones/CertificadoMedicoN.aspx?IdCertificado=" + Pedidos + "&ID=" + NHC + "&MedicoId=" + MedicoId + " " + "&dni=" + $("#CargadoDNI").html(); //  + "&internacion=" + internacion;
    parent.$("#fancybox-close").show();
}

function ValidarUltimo() {
    if (MedicoId <= 0 || MedicoId == null || MedicoId == undefined) { alert("Médico no válido."); return false; }
    if (NHC <= 0 || NHC == null || NHC == undefined) { alert("Paciente no válido."); return false; }
    return true;
}

function Cargar_Ultimo() {
    if (!ValidarUltimo()) return false;

    var json = JSON.stringify({
        "MedicoId": MedicoId,
        "NHC": NHC
    });


    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/AtConsultorio.asmx/At_Consultorio_CertificadoUltimo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CertificadoUltimoCargado,
        error: errores
    });
}

function CertificadoUltimoCargado(Resultado) {
    var Certificado = Resultado.d;
    $("#txtAnterior").val(Certificado.Indicaciones);
    $("#btnUC").show();
}

$("#btnUC").click(function () {
    $("#txtCertificado").val($("#txtAnterior").val());
});
