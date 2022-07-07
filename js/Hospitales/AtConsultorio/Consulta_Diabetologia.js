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

var Protocolo = 0;
var MedicoId = 0;
var NHC = 0;

function Cargar_Paciente_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {

        if (paciente.NHC != null && paciente.NHC != '') {
            //$("#desdeaqui").show();
            //TieneUltimo(paciente.NHC);
        }

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txt_dni").attr('value', paciente.documento);
        NHC = paciente.NHC;
        $("#txtNHC").attr('value', paciente.NHC);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        if (AnioNacimiento.getFullYear() == 0) {
            edad = S / FN;
        }

        $("#CargadoEdad").html(edad);
        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.cuil);
        $("#CargadoTelefono").html(paciente.Telefono);

        $("#CargadoLocalidad").html(paciente.localidad.substring(0, 15));


        if (paciente.Nro_Seccional != "999") {
            $("#CargadoSeccional").html(paciente.Seccional);
        }
        else {
            $("#CargadoSeccional").html("Sin Seccionalizar");
        }

        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');

    });
}

$(document).ready(function () {

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


    if (GET["Protocolo"] != "" && GET["Protocolo"] != null) {
        $("#TabModificacion").show();
        if (GET["U"] != "" && GET["U"] != null) {
            U = GET["U"];
            CargarRecetas();
        }
        else {
            Protocolo = GET["Protocolo"];
            $("#btnImprimir").show();
            CargarDiabetes();
        }

    }
    else {

        if (GET["NHC"] != "" && GET["NHC"] != null) {
            NHC = GET["NHC"];
            Cargar_Paciente_NHC(NHC);
        }

        if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
            MedicoId = GET["MedicoId"];
        }
    }

    $("#txt_FechaAnalisis").datepicker();

});


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#btnGuardar").click(function () {

    if (MedicoId == "0") { alert("Error con el médico seleccionado"); return false; }
    if (Protocolo != 0) {
        if ($.trim($("#txt_Motivo").val()).replace(" ", "") == '') {
            $("#TabModificacionA").click();
            alert("Ingrese el Motivo de la modificación");
            $("#txt_Motivo").focus();
            return false;
        }

    }

    var json = JSON.stringify({
        "Protocolo": Protocolo,
        "Tipo": $("#cbo_TipoDiabetes option:selected").val(),
        "Obesidad": $("#ck_Obesidad").is(':checked'),
        "Dislipidemia": $("#ck_dislipidemia").is(':checked'),
        "HC": $("#ck_TMHC").is(':checked'),
        "otros": $("#txt_otros_diagnosticos").val(),
        "Retinopatia": $('#cbo_retinopatia option:selected').val(),
        "Neuropatia": $('#cbo_neuropatia option:selected').val(),
        "ivp": $('#cbo_ivp option:selected').val(),
        "CI": $('#cbo_cardioisquemia option:selected').val(),
        "Nefropatia": $('#cbo_nefropatia option:selected').val(),
        "Pie": $('#cbo_pie option:selected').val(),
        "hta": $('#cbo_hta option:selected').val(),
        "tabaco": $('#cbo_tabaco option:selected').val(),
        "NHC": NHC,
        "Medico_Diabetes_Id": MedicoId,
        "MotivoModificacion": $("#txt_Motivo").val(),
        "HbgA1C": $("#txt_HBGA1C").val(),
        "HDL": $("#txt_HDL").val(),
        "TG": $("#txt_TG").val(),
        "FRUCTOSAMINA": $("#txt_FRUCTOSAMINA").val(),
        "URICEMIA": $("#txt_URICEMIA").val(),
        "CLEARENCEC": $("#txt_DEPCREATININA").val(),
        "UREA": $("#txt_UREA").val(),
        "TGO": $("#txt_TGO").val(),
        "BT": $("#txt_BT").val(),
        "BD": $("#txt_BD").val(),
        "COLTOTAL": $("#txt_COLAT").val(),
        "LDL": $("#txt_LDL").val(),
        "MICROALBUMINURIA": $("#txt_MICROALBUMINURIA").val(),
        "CREA": $("#txt_CREATININA").val(),
        "GLUCEMIA": $("#txt_GLUCEMIA").val(),
        "PROTEINURIA": $("#txt_PROTEINURIA").val(),
        "CPK": $("#txt_CPK").val(),
        "TGP": $("#txt_TGP").val(),
        "BI": $("#txt_BI").val(),
        "OJO_D": $("#txt_OJO_D").val(),
        "OJO_I": $("#txt_OJO_I").val(),
        "OTROS_LABORATORIO": $("#txt_observaciones_laboratorio").val(),
        "fechaanalisis": $("#txt_FechaAnalisis").val(),
        "EVOLUCION": $("#txt_evolucion").val(),
        "Peso": $("#txt_PESO").val(),
        "Talla": $("#txt_TALLA").val(),
        "Metformina": $("#txt_MET").val(),
        "Glibenciamida": $("#txt_GLIB").val(),
        "Glicazida": $("#txt_GLIZ").val(),
        "Glimepirida": $("#txt_GLI").val(),
        "Glipizida": $("#txt_GL").val(),
        "Rosiglitazona": $("#txt_RO").val(),
        "Atorvastatina": $("#txt_AT").val(),
        "Sinvastantina": $("#txt_SIN").val(),
        "Ezetimibe": $("#txt_EZE").val(),
        "Fenofibrato": $("#txt_FENO").val(),
        "NPH": $("#txt_NPH").val(),
        "Rapida": $("#txt_RAPIDA").val(),
        "RapidaAnalogo": $("#txt_RAPIDAANALOGO").val(),
        "Lispro": $("#txt_LISPRO").val(),
        "Ultralenta": $("#txt_ULTRALENTA").val(),
        "Mix25": $("#txt_M25").val(),
        "Mix30": $("#txt_M30").val(),
        "OTROS_MEDICAMENTOS": $("#txt_Otros_Medicamentos").val()
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/GuardarConsultaDiabetes",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: GuardarConsultaDiabetes_Guardado,
        error: errores
    });


});

function GuardarConsultaDiabetes_Guardado(Resultado) {
    Protocolo = Resultado.d;
    self.location = "../Impresiones/CDDiabetes.aspx?Protocolo=" + Protocolo;
}


function CargarDiabetes() { 
var json = JSON.stringify({
        "Protocolo": Protocolo
    });

    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/CargarDiabetes",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarDiabetes_Cargado,
        error: errores
    });


}


function CargarDiabetes_Cargado(Resultado) {
        var Diabetes = Resultado.d;
        NHC = Diabetes.NHC;
        Cargar_Paciente_NHC(NHC);
        Protocolo = Diabetes.Protocolo;        
        $("#cbo_TipoDiabetes option:selected").val();        
        if (Diabetes.Obesidad) { $("#checkbox").attr('checked', true); }else { $("#checkbox").attr('checked', false); }
        if (Diabetes.Dislipidemia) { $("#ck_dislipidemia").attr('checked', true); }else { $("#ck_dislipidemia").attr('checked', false); }
        if (Diabetes.HC) { $("#ck_TMHC").attr('checked', true); }else { $("#ck_TMHC").attr('checked', false); }
        $("#txt_otros_diagnosticos").val(Diabetes.otros);
        $("#cbo_retinopatia option[value=" + Diabetes.Retinopatia + "]").attr("selected", true);
        $("#cbo_neuropatia option[value=" + Diabetes.Neuropatia + "]").attr("selected", true);
        $("#cbo_ivp option[value=" + Diabetes.ivp + "]").attr("selected", true);
        $("#cbo_cardioisquemia option[value=" + Diabetes.CI + "]").attr("selected", true);
        $("#cbo_nefropatia option[value=" + Diabetes.Nefropatia + "]").attr("selected", true);
        $("#cbo_pie option[value=" + Diabetes.Pie + "]").attr("selected", true);
        $("#cbo_hta option[value=" + Diabetes.hta + "]").attr("selected", true);
        $("#cbo_tabaco option[value=" + Diabetes.tabaco + "]").attr("selected", true);
        MedicoId = Diabetes.Medico_Diabetes_Id;
        $("#txt_Motivo").val(Diabetes.MotivoModificacion);
        $("#txt_HBGA1C").val(Diabetes.HbgA1C);
        $("#txt_HDL").val(Diabetes.HDL);
        $("#txt_TG").val(Diabetes.TG);
        $("#txt_FRUCTOSAMINA").val(Diabetes.FRUCTOSAMINA);
        $("#txt_URICEMIA").val(Diabetes.URICEMIA);
        $("#txt_DEPCREATININA").val(Diabetes.CLEARENCEC);
        $("#txt_UREA").val(Diabetes.UREA);
        $("#txt_TGO").val(Diabetes.TGO);
        $("#txt_BT").val(Diabetes.BT);
        $("#txt_BD").val(Diabetes.BD);
        $("#txt_COLAT").val(Diabetes.COLTOTAL);
        $("#txt_LDL").val(Diabetes.LDL);
        $("#txt_MICROALBUMINURIA").val(Diabetes.MICROALBUMINURIA);
        $("#txt_CREATININA").val(Diabetes.CREA);
        $("#txt_GLUCEMIA").val(Diabetes.GLUCEMIA);
        $("#txt_PROTEINURIA").val(Diabetes.PROTEINURIA);
        $("#txt_CPK").val(Diabetes.CPK);
        $("#txt_TGP").val(Diabetes.TGP);
        $("#txt_BI").val(Diabetes.BI);
        $("#txt_OJO_D").val(Diabetes.OJO_D);
        $("#txt_OJO_I").val(Diabetes.OJO_I);
        $("#txt_observaciones_laboratorio").val(Diabetes.OTROS_LABORATORIO);
        $("#txt_FechaAnalisis").val(Diabetes.fechaanalisis);
        $("#txt_evolucion").val(Diabetes.EVOLUCION);
        $("#txt_PESO").val(Diabetes.Peso);
        $("#txt_TALLA").val(Diabetes.Talla);
        $("#txt_MET").val(Diabetes.Metformina);
        $("#txt_GLIB").val(Diabetes.Glibenciamida);
        $("#txt_GLIZ").val(Diabetes.Glicazida);
        $("#txt_GLI").val(Diabetes.Glimepirida);
        $("#txt_GL").val(Diabetes.Glipizida);
        $("#txt_RO").val(Diabetes.Rosiglitazona);
        $("#txt_AT").val(Diabetes.Atorvastatina);
        $("#txt_SIN").val(Diabetes.Sinvastantina);
        $("#txt_EZE").val(Diabetes.Ezetimibe);
        $("#txt_FENO").val(Diabetes.Fenofibrato);
        $("#txt_NPH").val(Diabetes.NPH);
        $("#txt_RAPIDA").val(Diabetes.Rapida);
        $("#txt_RAPIDAANALOGO").val(Diabetes.RapidaAnalogo);
        $("#txt_LISPRO").val(Diabetes.Lispro);
        $("#txt_ULTRALENTA").val(Diabetes.Ultralenta);
        $("#txt_M25").val(Diabetes.Mix25);
        $("#txt_M30").val(Diabetes.Mix30);
        $("#txt_Otros_Medicamentos").val(Diabetes.OTROS_MEDICAMENTOS);
}