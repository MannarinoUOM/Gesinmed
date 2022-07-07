var Id = 0;

$(document).on("keydown", function (e) {
    if (e.which === 8 && !$(e.target).is("input, textarea, select")) {
        e.preventDefault();
    }
});

$(document).ready(function () {

    var Query = {};
    Query = GetQueryString();
    Id = Query['Id'];
    if (Id > 0) {
        LoadCirugia();
        Cargar_Sala_y_Cama();
    }
    ListTipoDoc();
});

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

$("#btnVolver").click(function () {
    window.location = "Planificar-Cirugia.aspx?Cirugia_Id=" + Id;
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

function LoadCirugia() {
    var json = JSON.stringify({ "Id": Id, "Fecha": null, "Baja": false });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListaCirugias_Id",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cirugia_Cargada,
        error: errores
    });
}



function errores(msg) {
    alert('Error: ' + msg.responseText);
}

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
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

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.cuil);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


        //var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        //if (AnioNacimiento.getFullYear() == 0) {
        //    edad = S / FN;
        //}

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.documento);
        $("#CargadoTelefono").html(paciente.Telefono);

        $("#CargadoSeccional").html(paciente.Seccional);
        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }

        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}

$("#btnGuardar").click(function () {
    var r = {};
    r.nhc = $("#CargadoNHC").html();
    r.operacion = Id;
    r.observaciones = $("#Observaciones").val();
    if ($("#chkConfirma").is(':checked') == true)
        r.circulante_confirma = true;
    else r.circulante_confirma = false;
    if ($("#chkPacResponder").is(':checked') == true)
        r.paciente_puede_responder = true;
    else r.paciente_puede_responder = false;
    if ($("#chkEquipAnestesia").is(':checked') == true)
        r.control_de_equipamento_anestesia = true;
    else r.control_de_equipamento_anestesia = false;
    //
    if ($("#chkOximetro").is(':checked') == true)
        r.oximetro_de_pulso_colocado_y_funcionando = true;
    else r.oximetro_de_pulso_colocado_y_funcionando = false;

    if ($("#chkVerifAlergias").is(':checked') == true)
        r.verificacion_de_existencia_de_alergia_conocidas = true;
    else r.verificacion_de_existencia_de_alergia_conocidas = false;

    if ($("#chkViaAerea").is(':checked') == true)
        r.chequeo_de_via_aerea = true;
    else r.chequeo_de_via_aerea = false;

    if ($("#chkVerifProfilaxis").is(':checked') == true)
        r.verificacion_de_profilaxis_antibioticos = true;
    else r.verificacion_de_profilaxis_antibioticos = false;

    if ($("#chkEquiposQuirurgicos").is(':checked') == true)
        r.equipos_quirurgicos_conoce_comorbilidades = true;
    else r.equipos_quirurgicos_conoce_comorbilidades = false;

    if ($("#chkDemarcacion").is(':checked') == true)
        r.demarcacion_de_sitios = true;
    else r.demarcacion_de_sitios = false;
    //
    if ($("#chkDisponibilidadEstudios").is(':checked') == true)
        r.chequeo_de_disponibilidad_de_estudio_complementario = true;
    else r.chequeo_de_disponibilidad_de_estudio_complementario = false;

    if ($("#chkRiesgoHemo").is(':checked') == true)
        r.verificacion_de_riesgos_hemorragia = true;
    else r.verificacion_de_riesgos_hemorragia = false;

    if ($("#chkConfirmacionEsterilidad").is(':checked') == true)
        r.confirmacion_esterilidad = true;
    else r.confirmacion_esterilidad = false;

    if ($("#chkCirujano_Instrumentadora").is(':checked') == true)
        r.cirujano_e_instrumentadora_verificaron_materiales = true;
    else r.cirujano_e_instrumentadora_verificaron_materiales = false;

    if ($("#chkChequeoEquipos").is(':checked') == true)
        r.chequeo_del_correcto_funcionamiento_de_todos = true;
    else r.chequeo_del_correcto_funcionamiento_de_todos = false;

    if ($("#chkMiembrosPresentes").is(':checked') == true)
        r.que_todos_los_miembros_del_equipo_q_presentes = true;
    else r.que_todos_los_miembros_del_equipo_q_presentes = false;

    if ($("#chkMiembrosNomFunc").is(':checked') == true)
        r.cbo_Que_todos_los_miembros_del_equipo_se_hayan_presentado_con_Nombre_y_Funcion = true;
    else r.cbo_Que_todos_los_miembros_del_equipo_se_hayan_presentado_con_Nombre_y_Funcion = false;

    if ($("#chkMiembrosPresentes").is(':checked') == true)
        r.que_todos_los_miembros_del_equipo_s_h_presentados = true;
    else r.que_todos_los_miembros_del_equipo_s_h_presentados = false;

    if ($("#chkConfirmanVerbal").is(':checked') == true)
        r.cirujano_circulante_anestesista_corfirman_verbalmente = true;
    else r.cirujano_circulante_anestesista_corfirman_verbalmente = false;

    if ($("#chkChequeo").is(':checked') == true)
        r.chequeo_de_control_de_decubitos_y_f = true;
    else r.chequeo_de_control_de_decubitos_y_f = false;

    if ($("#chkCirujanoRevisa").is(':checked') == true)
        r.el_cirujano_revisa_en_voz = true;
    else r.el_cirujano_revisa_en_voz = false;

    if ($("#chkAnestesistaRevisa").is(':checked') == true)
        r.anestesista_revisa_en_voz = true;
    else r.anestesista_revisa_en_voz = false;

    if ($("#chkNombreProcedimiento").is(':checked') == true)
        r.el_nombre_del_procedimiento_realizado = true;
    else r.el_nombre_del_procedimiento_realizado = false;

    if ($("#chkRecuento").is(':checked') == true)
        r.el_recuento_de_instrumental = true;
    else r.el_recuento_de_instrumental = false;

    if ($("#chkRotulo").is(':checked') == true)
        r.rotulado_de_muestras = true;
    else r.rotulado_de_muestras = false;

    if ($("#chkProblemasIntrumental").is(':checked') == true)
        r.si_se_detectaron_problemas = true;
    else r.si_se_detectaron_problemas = false;

    if ($("#chkIndicacionesPost").is(':checked') == true)
        r.cirujano_anestesista_y_circulante_revisaran = true;
    else r.cirujano_anestesista_y_circulante_revisaran = false;

    if ($("#chkMedicamentosPost").is(':checked') == true)
        r.transpaso_escrito_de_medicamentos = true;
    else r.transpaso_escrito_de_medicamentos = false;

    if ($("#chkNormotermia").is(':checked') == true)
        r.control_de_normotermia = true;
    else r.control_de_normotermia = false;

    if ($("#chkQuirurgicosCompl").is(':checked') == true)
        r.parte_quirurgicos_c = true;
    else r.parte_quirurgicos_c = false;


    if ($("#chkAnestesicoCompl").is(':checked') == true)
        r.parte_anestesicos_c = true;
    else r.parte_anestesicos_c = false;    

    var json = JSON.stringify({ "c": r });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/Resolucion28_Guardar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Resolucion28_Guardar_Guardada,
        error: errores
    });
});

function Resolucion28_Guardar_Guardada(Resultado) {
    var Resolucion = Resultado.d;
    //alert(Resolucion);
    $.fancybox(
        {
            'autoDimensions': false,
            'href': '../Impresiones/Resolucion28.aspx?Id=' + Id,
            'width': '90%',
            'height': '90%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location.href = "Planificar-Cirugia.aspx?Id=" + Id;
            }
        });
}

function LoadResolucion() {    
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/CargarResolucion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarResolucion_Guardada,
        error: errores
    });

}

function CargarResolucion_Guardada(Resultado) {
    var r = Resultado.d;
    $("#Observaciones").val(r.observaciones);
    if (r.circulante_confirma == true)
        $("#chkConfirma").attr("checked", true);
    else $("#chkConfirma").attr("checked", false);

    if (r.paciente_puede_responder == true)
        $("#chkPacResponder").attr("checked", true);
    else $("#chkPacResponder").attr("checked", false);


    if (r.control_de_equipamento_anestesia == true)
        $("#chkEquipAnestesia").attr("checked", true);
    else $("#chkEquipAnestesia").attr("checked", false);


    if (r.oximetro_de_pulso_colocado_y_funcionando == true)
        $("#chkOximetro").attr("checked", true);
    else $("#chkOximetro").attr("checked", false);

    if (r.verificacion_de_existencia_de_alergia_conocidas == true)
        $("#chkVerifAlergias").attr("checked", true);
    else $("#chkVerifAlergias").attr("checked", false);

    if (r.chequeo_de_via_aerea == true)
        $("#chkViaAerea").attr("checked", true);
    else $("#chkViaAerea").attr("checked", false);

    if (r.verificacion_de_profilaxis_antibioticos == true)
        $("#chkVerifProfilaxis").attr("checked", true);
    else $("#chkVerifProfilaxis").attr("checked", false);

    if (r.equipos_quirurgicos_conoce_comorbilidades == true)
        $("#chkEquiposQuirurgicos").attr("checked", true);
    else $("#chkEquiposQuirurgicos").attr("checked", false);

    if (r.demarcacion_de_sitios == true)
        $("#chkDemarcacion").attr("checked", true);
    else $("#chkDemarcacion").attr("checked", false);

    if (r.chequeo_de_disponibilidad_de_estudio_complementario == true)
        $("#chkDisponibilidadEstudios").attr("checked", true);
    else $("#chkDisponibilidadEstudios").attr("checked", false);

    if (r.verificacion_de_riesgos_hemorragia == true)
        $("#chkRiesgoHemo").attr("checked", true);
    else $("#chkRiesgoHemo").attr("checked", false);

    if (r.confirmacion_esterilidad == true)
        $("#chkConfirmacionEsterilidad").attr("checked", true);
    else $("#chkConfirmacionEsterilidad").attr("checked", false);

    if (r.cirujano_e_instrumentadora_verificaron_materiales == true)
        $("#chkCirujano_Instrumentadora").attr("checked", true);
    else $("#chkCirujano_Instrumentadora").attr("checked", false);


    if (r.chequeo_del_correcto_funcionamiento_de_todos == true)
        $("#chkChequeoEquipos").attr("checked", true);
    else $("#chkChequeoEquipos").attr("checked", false);

    if (r.que_todos_los_miembros_del_equipo_q_presentes == true)
        $("#chkMiembrosPresentes").attr("checked", true);
    else $("#chkMiembrosPresentes").attr("checked", false);

    if (r.que_todos_los_miembros_del_equipo_s_h_presentados == true)
        $("#chkMiembrosNomFunc").attr("checked", true);
    else $("#chkMiembrosNomFunc").attr("checked", false);

    if (r.cirujano_circulante_anestesista_corfirman_verbalmente == true)
        $("#chkConfirmanVerbal").attr("checked", true);
    else $("#chkConfirmanVerbal").attr("checked", false);


    if (r.chequeo_de_control_de_decubitos_y_f == true)
        $("#chkChequeo").attr("checked", true);
    else $("#chkChequeo").attr("checked", false);

    if (r.el_cirujano_revisa_en_voz == true)
        $("#chkCirujanoRevisa").attr("checked", true);
    else $("#chkCirujanoRevisa").attr("checked", false);

    if (r.anestesista_revisa_en_voz == true)
        $("#chkAnestesistaRevisa").attr("checked", true);
    else $("#chkAnestesistaRevisa").attr("checked", false);

    if (r.el_nombre_del_procedimiento_realizado == true)
        $("#chkNombreProcedimiento").attr("checked", true);
    else $("#chkNombreProcedimiento").attr("checked", false);

    if (r.el_recuento_de_instrumental == true)
        $("#chkRecuento").attr("checked", true);
    else $("#chkRecuento").attr("checked", false);

    if (r.rotulado_de_muestras == true)
        $("#chkRotulo").attr("checked", true);
    else $("#chkRotulo").attr("checked", false);

    if (r.si_se_detectaron_problemas == true)
        $("#chkProblemasIntrumental").attr("checked", true);
    else $("#chkProblemasIntrumental").attr("checked", false);


    if (r.cirujano_anestesista_y_circulante_revisaran == true)
        $("#chkIndicacionesPost").attr("checked", true);
    else $("#chkIndicacionesPost").attr("checked", false);


    if (r.transpaso_escrito_de_medicamentos == true)
        $("#chkMedicamentosPost").attr("checked", true);
    else $("#chkMedicamentosPost").attr("checked", false);


    if (r.control_de_normotermia == true)
        $("#chkNormotermia").attr("checked", true);
    else $("#chkNormotermia").attr("checked", false);

    if (r.parte_quirurgicos_c == true)
        $("#chkQuirurgicosCompl").attr("checked", true);
    else $("#chkQuirurgicosCompl").attr("checked", false);

    if (r.parte_anestesicos_c == true)
        $("#chkAnestesicoCompl").attr("checked", true);
    else $("#chkAnestesicoCompl").attr("checked", false);

}



function ListTipoDoc() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/ListTipoDoc",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, Tipo) {
                $('#cbo_TipoDOC').append($('<option></option>').val(Tipo.Id).html(Tipo.Descripcion));
            });

        },
        error: errores
    });
}

function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}


function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
        $.each(Paciente, function (index, paciente) {

            $("#txt_dni").prop("readonly", true);
            $("#txtNHC").prop("readonly", true);

            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txtNHC").attr('value', paciente.NHC_UOM);

            $("#CargadoApellido").html(paciente.Paciente);

            var AnioActual = new Date();
            var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


            //var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
            //if (AnioNacimiento.getFullYear() == 0) {
            //    edad = S / FN;
            //}

            $("#CargadoEdad").html(paciente.Edad_Format);
            $("#CargadoDNI").html(paciente.documento_real);
            $("#CargadoNHC").html(paciente.documento);
            $("#CargadoTelefono").html(paciente.Telefono);

            $("#CargadoSeccional").html(paciente.Seccional);
            $("#Cod_OS").val(paciente.OSId);
            if (paciente.Nro_Seccional == 998) {
                $("#cbo_ObraSocial").show();
                $("#cboSeccional").hide();
                $("#CargadoSeccionalTitulo").html("Ob. Social");
                $("#CargadoSeccional").html(paciente.ObraSocial);
            }

            $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');

            $("#afiliadoId").val(paciente.documento);
            $("#cbo_TipoDOC").val(paciente.TipoDoc);

            if (PError) {
                $("#desdeaqui").hide();
            }
            else {
                $("#desdeaqui").show();
                $("#desdeaqui").focus();
            }

        });
    }
    else if (Paciente.length > 1) {
        $("#txtdocumento").val($("#txt_dni").val());
        BuscarPacientes_fancy();
    }
}





$("#txt_dni").change(function () {
    if ($('#txt_dni').val().length > 0) {
        Cargar_Paciente_Documento($("#txt_dni").val());
    }
});

$("#txtNHC").change(function () {
    if ($('#txtNHC').val().length > 0) {
        Cargar_Paciente_NHC($("#txtNHC").val());
    }
});




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

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

        $("#txt_dni").val(paciente.documento_real);
        $("#afiliadoId").val(paciente.documento);

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.documento);

        $("#afiliadoId").val(paciente.documento);
        $("#cbo_TipoDOC").val(paciente.TipoDoc);

        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}

function LoadDatos() {
    var json = JSON.stringify({ "Id": Id, "Fecha": null, "Baja": false });
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/ListaCirugias_Id",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cirugia_Cargada,
        error: errores
    });
}


function Cirugia_Cargada(Resultado) {
    var Cirugias = Resultado.d;
    $.each(Cirugias, function (index, Cirugia) {
        CargarPacienteID(Cirugia.nhc);
    });
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    LoadResolucion();
}


function Cargar_Sala_y_Cama() {
    $.ajax({
        type: "POST",
        url: "../Json/Quirofano/Quirofano_.asmx/Cargar_Sala_y_Cama",
        contentType: "application/json; charset=utf-8",
        data: '{Quirofano_ID: "' + Id + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#Cargado_Sala").html(lista.Sala);
            $("#Cargado_Cama").html(lista.Cama);
        },
        error: errores
    });
}