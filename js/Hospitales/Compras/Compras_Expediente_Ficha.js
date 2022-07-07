var G_ExpId = 0;

var mostrar_div_diagnostico = false;
var mostrar_div_patologia = false;
var hubo_cambios = false;

$(document).bind('input', function () {
    hubo_cambios = true;
});

$('textarea').click(function () {
    hubo_cambios = true;
});

$(':checkbox').click(function () {
    hubo_cambios = true;
});

$(':text').change(function () {
    hubo_cambios = true;
});


$(document).ready(function () {

    if ($("#editar").val() == "0") {
        $("#txt_NHC_UOM").css("background-color", "rgb(204, 204, 204)");
        $("#txtapellido").css("background-color", "rgb(204, 204, 204)");
        $("#txt_NroExpendiente").css("background-color", "rgb(204, 204, 204)");
        $("#txtdocumento").css("background-color", "rgb(204, 204, 204)");
        $("#txt_NHC_UOM").css("color", "#A4A4A4");
        $("#txtapellido").css("color", "#A4A4A4");
        $("#txt_NroExpendiente").css("color", "#A4A4A4");
        $("#txtdocumento").css("color", "#A4A4A4");
    } // para farmacia externa

    InitControls();
    var GET = {};


    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["ExpId"] != null && GET["ExpId"] != "")
        G_ExpId = GET["ExpId"];
    else {
        if (GET["ID"] != null && GET["ID"] != "")
            Cargar_Persona_Local_ID(GET["ID"]);

        else if (GET["Documento"] != null && GET["Documento"] != "")
            Cargar_Paciente_Documento(GET["Documento"]);
    }
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function InitControls() {
    ValidarEntrada();
    Entradas();
    ListPatologias(0);
    ListTipoDoc();
    Cargar_CodPariente(0);
    Cargar_Seccionales_Lista("");
    Cargar_CodProvincias("");
    Expediente_Estado_List(false);
    List_Diagnosticos(false);
}

///Control de Diagnosticos///
$("#txt_cbo_Diagnostico").click(function () {
    if (mostrar_div_diagnostico) {
        mostrar_div_diagnostico = false;
        $("#div_diagnostico").hide();
        $("#txt_cbo_Diagnostico").val(Diag_Desc_selec);
    }
    else {
        mostrar_div_diagnostico = true;
        $("#div_diagnostico").show();
    }
});

function List_Diagnosticos(Todos) {
    var json = JSON.stringify({ "Todos": Todos });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/Expediente_Diagnostico_List",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            var lista_diag = "";
            $("#span_diagnosticos_cargados").empty();
            $.each(Lista, function (index, diag) {
                lista_diag = lista_diag + "<div id='div_ck_diag_" + diag.Diagnostico_Id + "'><input class='ck_class_diagnosticos' type='checkbox' onclick='MostrarDiag()' id='ck_diag_" + diag.Diagnostico_Id + "'value='" + diag.Diagnostico_Id + "'/> <label style='display:inline;' id='label_ck_diag_" + diag.Diagnostico_Id + "' for='ck_diag_" + diag.Diagnostico_Id + "'>" + diag.Diagnostico_Desc + "</label></div>";
            });
            $("#span_diagnosticos_cargados").html(lista_diag);
        },
        complete: function () {
            if (G_ExpId > 0)
                CargarExpediente_byId(G_ExpId);
        },
        error: errores
    });
}

var Diag_Ids_selec = "";
var Diag_Desc_selec = "";

function MostrarDiag() {
    Diag_Ids_selec = "";
    Diag_Desc_selec = "";
    $(".ck_class_diagnosticos").each(function (index, elem) {
        if ($(this).is(":checked")) {
            Diag_Ids_selec += $(this).val() + ",";
            Diag_Desc_selec += $("#label_ck_diag_" + $(this).val()).html() + "+";
        }
    });
    Diag_Desc_selec = Diag_Desc_selec.slice(0, -1);
    Diag_Ids_selec = Diag_Ids_selec.slice(0, -1);
}

///Fin Control de Diagnosticos///

///Control de Patologias///
$("#txt_cbo_Patologia").click(function () {
    if (mostrar_div_patologia) {
        mostrar_div_patologia = false;
        $("#div_patologia").hide();
        $("#txt_cbo_Patologia").val(Pat_Desc_selec);
    }
    else {
        mostrar_div_patologia = true;
        $("#div_patologia").show();
    }
});

function ListPatologias(Id) {
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/Patologia.asmx/Patologia_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            var lista_pat = "";
            $("#span_patologias_cargados").empty();
            $.each(Lista, function (index, pat) {
                lista_pat = lista_pat + "<div id='div_ck_pat_" + pat.id + "'><input class='ck_class_patologias' type='checkbox' onclick='MostrarPatologia()' id='ck_pat_" + pat.id + "' value='" + pat.id + "' /> <label style='display:inline;' id='label_ck_pat_" + pat.id + "' for='ck_pat_" + pat.id + "'>" + pat.patologias + "</label></div>";
            });
            $("#span_patologias_cargados").html(lista_pat);
        },
        error: errores
    });
}

var Pat_Ids_selec = "";
var Pat_Desc_selec = "";

function MostrarPatologia() {
    Pat_Ids_selec = "";
    Pat_Desc_selec = "";
    $(".ck_class_patologias").each(function (index, elem) {
        if ($(this).is(":checked")) {
            Pat_Ids_selec += $(this).val() + ",";
            Pat_Desc_selec += $("#label_ck_pat_" + $(this).val()).html() + "+";
        }
    });
    Pat_Ids_selec = Pat_Ids_selec.slice(0, -1);
    Pat_Desc_selec = Pat_Desc_selec.slice(0, -1);
}

///Fin Control de Patologias///

function Expediente_Estado_List(Todos) {
    var json = JSON.stringify({"Todos": Todos});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/Expediente_Estado_List",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Estados = Resultado.d;
            $('#cbo_EstadoExpediente').empty();
            $('#cbo_EstadoExpediente').append($('<option></option>').val("0").html("Seleccione Estado..."));
            $.each(Estados, function (index, estado) {
                $('#cbo_EstadoExpediente').append($('<option></option>').val(estado.Expediente_Estado_Id).html(estado.Expediente_Estado_Desc));
            });
        },
        error: errores
    });
}

$("#txt_NroExpendiente").change(function () {
    if ($(this).val().trim().length > 0) {
        CargarExpediente_byId($(this).val());
        G_ExpId = $(this).val();
        hubo_cambios = false;
    }
});

function CargarExpediente_byId(ExpId) {
    var json = JSON.stringify({ "ExpId": ExpId })
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/Expediente_Cab_List_byId",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {
            var exp = Resultado.d;
            $("#id_Expediente").val(ExpId); //para escaneo...

            $("#txt_NroExpendiente").val(exp.EXP_ID);
            $("#CargadoNroExpediente").html(exp.EXP_ID);
            $("#txtdocumento").val(exp.EXP_NRO_DOC);
            $("#cboSeccional").val(exp.EXP_SEC_ID);
            $("#txtSeccionalId").val(exp.EXP_SEC_ID);
            $("#cbo_tipo_doc").val(exp.EXP_TIPO_DOC);
            $("#txtapellido").val(exp.EXP_NOMBRE);
            $("#txtcalle").val(exp.EXP_DIRECCION);
            $("#txtcodpos").val(exp.EXP_COD_POST);
            $("#txt_NHC_UOM").val(exp.EXP_NHC);
            $("#txtObservaciones").val(exp.EXP_OBS);
            $("#cboCodPariente").val(exp.EXP_GRU_ID);
            $("#txtEmpresa").val(exp.EXP_TRAB_EMPR);
            $("#txtcuit").val(exp.EXP_TRAB_CUIT);
            $("#txtCalleEmpresa").val(exp.EXP_TRAB_DIR);
            $("#chkDocu_Discapacidad").attr("checked", exp.EXP_DOC_DISCA);
            $("#chkDocu_ReciboSueldo").attr("checked", exp.EXP_DOC_SUEL);
            $("#chkDocu_DNI").attr("checked", exp.EXP_DOC_DNI);
            $("#chkDocu_NacCasam").attr("checked", exp.EXP_DOC_CERT);
            $("#txttelefono").val(exp.EXP_TELEFONO);
            $("#cbo_EstadoExpediente").val(exp.EXP_EST_ID);
            $("#txtFechaVencExp").val(exp.EXP_VENC_FECHA);
            //alert(exp.EXP_FEC_NAC);
            $("#txtFechaNacimiento").val(exp.EXP_FEC_NAC);
            Cargar_Expediente_Extras(exp.EXP_ID);
            Cargar_Expediente_Patologias(exp.EXP_ID);
            Cargar_Expediente_Diagnosticos(exp.EXP_ID);

            Cargar_Paciente_Documento(exp.EXP_NRO_DOC);
            CargarDatosdelPaciente(exp);
            $("#btnBaja").show();
            $("#btnPedidos").show();
            $("#btnEntregas").show();
            $("#txt_NroExpendiente").attr("disabled", true);
        },
        error: errores
    });
}

function CargarDatosdelPaciente(exp) {
    $("#txtcalle").val(exp.Calle);
    $("#txtnumero").val(exp.Numero);
    $("#txtpiso").val(exp.Piso);
    $("#txtdpto").val(exp.Depto);
    $("#txtcodpos").val(exp.CP);
    $("#txtlocalidad").val(exp.Localidad);
    $("#cboProvincia").val(exp.Provincia);
    $("#txtcelular").val(exp.Celular);
    $("#txttelefono").val(exp.Telefono);
}

function Cargar_Expediente_Patologias(ExpId) {
    var json = JSON.stringify({"ExpId": ExpId});
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/Expediente_Patologias_List_by_ExpId",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {
            var Patologias = Resultado.d;
            $.each(Patologias, function (index, pat) {
                $("#ck_pat_" + pat).attr("checked", true);
                Pat_Ids_selec += $("#ck_pat_" + pat).val() + ",";
                Pat_Desc_selec += $("#label_ck_pat_" + $("#ck_pat_" + pat).val()).html() + "+";
            });
            Pat_Ids_selec = Pat_Ids_selec.slice(0, -1);
            Pat_Desc_selec = Pat_Desc_selec.slice(0, -1);
            $("#txt_cbo_Patologia").val(Pat_Desc_selec);


//            $("#pat").attr('title', Pat_Desc_selec);
//            var points;
//            if (Pat_Desc_selec.length > 15) { points = "..."; } else { points = ""; }
//            $("#pat").html("<lable style='color:red' >PATOLOGIA: </label>" + Pat_Desc_selec.substr(0, 15) + points);
        },
        error: errores
    });
}

function Cargar_Expediente_Diagnosticos(ExpId) {
    var json = JSON.stringify({ "ExpId": ExpId });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/Expediente_Diagnosticos_List",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {
            var Diags = Resultado.d;
            $.each(Diags, function (index, diag) {
                $("#ck_diag_" + diag).attr("checked", true);
                Diag_Ids_selec += $("#ck_diag_" + diag).val() + ",";
                Diag_Desc_selec += $("#label_ck_diag_" + $("#ck_diag_" + diag).val()).html() + "+";
            });
            Diag_Ids_selec = Diag_Ids_selec.slice(0, -1);
            Diag_Desc_selec = Diag_Desc_selec.slice(0, -1);
            $("#txt_cbo_Diagnostico").val(Diag_Desc_selec);
        },
        error: errores
    });
}

function Cargar_Expediente_Extras(ExpId) {
    var json = JSON.stringify({ "ExpId": ExpId });
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras.asmx/Expediente_Extras_List_byExpId",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
        success: function (Resultado) {
            var extra = Resultado.d;
            $("#txtPMIDesde").val(extra.EXP_EXT_PMI_DESDE);
            $("#txtPMIHasta").val(extra.EXP_EXT_PMI_HASTA);
            $("#txtCodemDesde").val(extra.EXP_EXT_CODEM_DESDE);
            $("#txtCodemHasta").val(extra.EXP_EXT_CODEM_HASTA);
            $("#txtSSSDesde").val(extra.EXP_EXT_SSS_DESDE);
            $("#txtSSSHasta").val(extra.EXP_EXT_SSS_HASTA);
            $("#txtPMDesde").val(extra.EXP_EXT_PM_DESDE);
            $("#txtPMHasta").val(extra.EXP_EXT_PM_HASTA);
            $("#txtCertificadoDiscDesde").val(extra.EXP_EXT_CERT_DESDE);
            $("#txtCertificadoDiscHasta").val(extra.EXP_EXT_CERT_HASTA);
            $("#txtVencimientoPatologia").val(extra.EXP_EXT_VENC_PAT);
            $("#txtTutor").val(extra.EXP_EXT_TUTOR);
            $("#cbo_EstadoLegal").val(extra.EXP_EXT_EST_LEGAL);
            if ($("#txtFechaVencExp").val().length == 0)
                AnalizarFechaVencimiento();
        },
        error: errores
    });
}

$("#txtFechaVencExp").change(function () {
    if (fecha_max_venc.length > 0) { //Si hay una fecha desde cargada...
        if (Fecha_Comparar($(this).val(), fecha_max_venc)) {
            //Si fecha maxima es mayor a la modificada...
            alert("La fecha cargada en datos extra ("+ fecha_max_venc +") tiene vencimiento posterior a la ingresada.");
        }
    }
});

function AnalizarFechaVencimiento() {
//Buscar si hay una fecha "hasta" ingresada y la carga en fecha vto.
//Si se cumplio la fecha se debe informar.
     $(".hasta").each(function () {
         if ($(this).val().trim().length > 0) $("#txtFechaVencExp").val($(this).val());
     });
     if ($("#txtFechaVencExp").val().trim().length > 0)
         if (ValidarFecha($("#txtFechaVencExp").val())) alert("La fecha de vencimiento ha caducado.");
}

function ValidarFecha(fecha_validar) {
    //Valida la fecha de vto. de expediente, con la fecha del dia. False: No vencio, True: Vencio.
    var x = new Date();
    var fecha = fecha_validar.split("/");
    x.setFullYear(fecha[2], fecha[1] - 1, fecha[0]);
    var today = new Date();

    if (x >= today)
        return false; //Fecha vto. mayor o igual a hoy
    else
        return true;
}

var fecha_max_venc = "";

//Si modifico alguna fecha desde en Datos Extra//
$(".hasta").change(function () {
    RecorrerFechas();
    hubo_cambios = true; 
});

//Busca fecha desde maxima en Datos Extra//
function RecorrerFechas() {
    fecha_max_venc = "";
    $(".hasta").each(function () {
        if ($(this).val().trim().length > 0) { //Fecha cargada
            if (fecha_max_venc.trim().length == 0) { fecha_max_venc = $(this).val(); $("#txtFechaVencExp").val($(this).val()); } //Primer fecha detectada, la guardo como max
            else {
                if (Fecha_Comparar(fecha_max_venc, $(this).val())) {
                    //Si la fecha es mayor a max, guardo actual como max
                    fecha_max_venc = $(this).val();
                    $("#txtFechaVencExp").val($(this).val());
                }
            }
        }
    });
}

function Fecha_Comparar(fecha_max, fecha_leida) {
    //Si fecha leida es mayor a max, return true;
    var fecha_max_date = new Date();
    var fecha_maxima = fecha_max.split("/");
    fecha_max_date.setFullYear(fecha_maxima[2], fecha_maxima[1] - 1, fecha_maxima[0]);

    var fecha_leida_date = new Date();
    var fecha_leida_ = fecha_leida.split("/");
    fecha_leida_date.setFullYear(fecha_leida_[2], fecha_leida_[1] - 1, fecha_leida_[0]);

    if (fecha_leida_date > fecha_max_date) return true;
    else return false;
}

function Cargar_Seccionales_Lista(Cod) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Seccionales = Resultado.d;
            $('#cboSeccional').empty();
            $('#cboSeccional').append($('<option></option>').val("").html("Seleccione Seccional..."));
            $.each(Seccionales, function (index, seccionales) {
                $('#cboSeccional').append($('<option></option>').val(seccionales.Nro).html(seccionales.Seccional));
            });
        },
        error: errores,
        complete: function () {
                $('#cboSeccional').val(Cod);
        }
    });
}

function Cargar_CodPariente(Cod) {
    $.ajax({
        type: "POST",
        data: '{Codigo: "0"}',
        url: "../Json/Gente/ActualizarGente.asmx/CodPariente",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            var CodParientes = Resultado.d;
            $('#cboCodPariente').empty();
            $.each(CodParientes, function (index, cp) {
                $('#cboCodPariente').append(
              $('<option></option>').val(cp.codigo).html(cp.descripcion)
            );
            });
            if (Cod != null && Cod != '') {
                $("#cboCodPariente option[value=" + Cod + "]").attr("selected", true);
            }

        },
        error: errores
    });

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
                $('#cbo_tipo_doc').append($('<option></option>').val(Tipo.Id).html(Tipo.Descripcion));
            });

        },
        error: errores
    });
}

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});


function ListDocumentacionTipo() {
    $.ajax({
        type: "POST",
        url: "../Json/Documentacion.asmx/ListDocumentacionTipo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, item) {
                $('#cbo_Tipos').append($('<option></option>').val(item.id).html(item.descripcion));
            });
        },
        error: errores
    });
}

$("#txtapellido").change(function () {
    $("#txtPaciente").val($(this).val());
});

function Entradas(val) {
    if (G_ExpId > 0) {
        $("#btnBaja").show(); //Para dar baja expediente
        $("#tabDocu").show(); //Habilitar solapa para escanear.  
    }
    else {
        $("#btnBaja").hide(); //Para dar baja expediente
        //$("#tabDocu").hide(); //Habilitar solapa para escanear.  
    }
}

$("#txt_NHC_UOM").change(function () {
    if (G_ExpId == 0) {
        if ($(this).val().trim().length > 0) Cargar_Paciente_NHC($(this).val());
        else alert("Ingrese Nro. HC");
    }
});

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

function JsonDate_Fecha(_date) {
    var dateString = _date.toString().substr(6);
    var currentTime = new Date(parseInt(dateString));
    var month = currentTime.getMonth() + 1;
    var day = currentTime.getDate();
    var year = currentTime.getFullYear();
    if (day < 10) day = '0' + day.toString();
    if (month < 10) month = '0' + month.toString();
    var date = day + "/" + month + "/" + year;
    return date;
}

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    if (Paciente[0].NHC_UOM > 0) {
        /*$("#txtdocumento").val(Paciente[0].documento_real);
        $("#txtFechaNacimiento").val(JsonDate_Fecha(Paciente[0].fecha_nacimiento));
        $("#Edad").html(Paciente[0].Edad_Format);
        $("#txtcalle").val(Paciente[0].calle);
        $("#txtnumero").val(Paciente[0].numero);
        $("#txtpiso").val(Paciente[0].piso);
        $("#txtdpto").val(Paciente[0].depto);
        $("#txtlocalidad").val(Paciente[0].localidad);
        $("#txtcodpos").val(Paciente[0].cod_pos);
        $("#txttelefono").val(Paciente[0].telefono);
        $("#afiliadoID").val(Paciente[0].documento);
        $("#txt_NHC_UOM").val(Paciente[0].NHC_UOM);
        $("#txtapellido").val(Paciente[0].Paciente);
        $("#cboSeccional").val(Paciente[0].Nro_Seccional);*/
        if (Paciente[0].Foto == "0") { $('#FotoFinal').attr('src', '../img/silueta.jpg'); } else { $('#FotoFinal').attr('src', '../fotoPerfil/' + Paciente[0].Foto); }

        varificarDBT(Paciente[0].documento);
        $("#afiliadoID").val(Paciente[0].documento);
    }
}

function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_tipo_doc :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

$(".datos").click(function () { if ($("#editar").val() == "0") { return false; } });

$("#btnBuscarPaciente").click(function () {
    if ($("#editar").val() == "0") { return false; } // para farmacia externa
    $.fancybox({
        'hideOnContentClick': true,
        'href': "../Turnos/BuscarPacientes.aspx?Express=0",
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });
});
function RecargarPagina(url) {
    document.location = "../Compras/Compras_Expediente_Ficha.aspx" + url;
}

function ValidarEntrada() {
    $("#txtcuil").mask("9999999999?9", { placeholder: "-" });
    $("#txtFechaNacimiento").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaNacimiento").datepicker();
    $("#txtFechaVencExp").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaVencExp").datepicker();
    $("#txtFechaParto").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaParto").datepicker();
    $("#txtcuiltitu").mask("9999999999?9", { placeholder: "-" });
    $("#txtcuit").mask("9999999999?9", { placeholder: "-" });
    $("#txttelefono").mask("99999999?99999", { placeholder: "-" });
    $("#txtNHC").mask("9?999999999999", { placeholder: "-" });
    $(".date").mask("99/99/9999", { placeholder: "-" });
    $(".date").datepicker();
}

function BuscarPacientes_fancy() {
    $.fancybox({
        'hideOnContentClick': true,
        'width': '85%',
        'href': "../Turnos/BuscarPacientes.aspx?Express=0",
        'height': '85%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });
}

function RecargarPagina(url) {
    document.location = "../Compras/Compras_Expediente_Ficha.aspx" + url;
}

function Cargar_Persona_Local_ID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/Personas_Local_ID",
        data: '{Id: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Persona_Local_ID_Cargado,
        error: errores
    });
}

function Cargar_Persona_Local_ID_Cargado(Resultado) {
    var Paciente = Resultado.d;

    $("#txtapellido").val(Paciente.apellido);
    $("#txtFechaNacimiento").val(Paciente.fecha_nacimiento);
    $("#Edad").html(Paciente.Edad_Format);
    $("#txtcalle").val(Paciente.calle);
    $("#txtnumero").val(Paciente.numero);
    $("#txtpiso").val(Paciente.piso);
    $("#txtdpto").val(Paciente.depto);
    $("#txtlocalidad").val(Paciente.localidad);
    $("#txtcodpos").val(Paciente.cod_pos);
    $("#txttelefono").val(Paciente.telefono);
    $("#txtNHC").val(Paciente.documento);
    $("#txt_NHC_UOM").val(Paciente.NHC_UOM);

    $("#txtemail").val(Paciente.email);
    //$('#FotoFinal').attr('src', '../img/pacientes' + Paciente.Foto);
    if (paciente.Foto == "0") { $('#FotoFinal').attr('src', '../img/silueta.jpg'); } else { $('#FotoFinal').attr('src', '../fotoPerfil/' + paciente.Foto); }
    $("#txtdocumento").val(Paciente.documento_real);
    $("#afiliadoID").val(Paciente.documento);

    $("#cbo_tipo_doc").val(Paciente.tipo_docu);
    $("#txtcuit").val(Paciente.cuit);

    $("#txtSeccionalId").val(Paciente.SeccionalId);
    $("#cboSeccional").val(Paciente.SeccionalId);
    $("#cboProvincia").val(Paciente.provincia);
    $("#txtCodOS").val(Paciente.ObraSocialId);
    $("#EstadoCivil").val(Paciente.EstadoCivil);
    $("#Nacionalidad").val(Paciente.Nacionalidad);
    $("#txtNroCarnet").val(Paciente.NroCarnet);
    $("#txtcelular").val(Paciente.Celular);
}

$('#FotoFinal').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});


$("#btnBuscarPersonas").click(function () {
    Cargar_Persona_Apellido();
});

$("#txtdocumento").blur(function () {
    var str = $("#txtdocumento").val();
    var ceros = "";

    if (str.length <= 7) {
        var cant = 8 - str.length;
        for (i = 0; i < cant; i++)
            ceros = ceros + "0";
        $("#txtdocumento").val(ceros + $("#txtdocumento").val());
    }
});

function Cargar_Persona_Apellido() {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/PersonaXApellido",
        data: '{Apellido: "' + $("#txtPacienteBuscar").val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Persona_Apellido_Cargado,
        error: errores,
        beforeSend: function () {
            $("#tabla").hide();
            $("#cargando").show();
        },
        complete: function () {
            $("#cargando").hide();
            $("#tabla").show();
        }
    });
}

function Cargar_Persona_Apellido_Cargado(Resultado) {
    var Pacientes = Resultado.d;

    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    $("#Resultado").empty();
    Tabla_Titulo = "<table class='table table-hover' style='width: 100%;'><thead><tr><th>#</th><th>Titular</th><th>Paciente</th><th>Documento</th><th>Teléfono</th></tr></thead><tbody>";
    $.each(Pacientes, function (index, pacientes) {
        Tabla_Datos = Tabla_Datos + "<tr onclick='CargarPaciente(" + pacientes.documento + ");' style='cursor:pointer;'><td>" + (index + 1) + "</td><td>" + pacientes.titular + "</td><td>" + pacientes.apellido + "</td><td>" + pacientes.documento + "</td><td>" + pacientes.telefono + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#Resultado").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);

    if (Resultado.d.length == 0) {
        $("#myModal").modal('show');
    }

}

function CargarPaciente(documento) {
    self.location = "Compras_Expediente_Ficha.aspx?Documento=" + documento + "&Padron=1";
}

function Cargar_CodProvincias(Cod) {
    $.ajax({
        type: "POST",
        data: '{Codigo: "0"}',
        url: "../Json/Gente/ActualizarGente.asmx/Provincias",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var CodParientes = Resultado.d;
            $('#cboProvincia').empty();
            $.each(CodParientes, function (index, cp) {
                $('#cboProvincia').append($('<option></option>').val(cp.codigo).html(cp.descripcion));
            });
        },
        error: errores
    });
}

$("#txtdocumento").change(function () {
    if (G_ExpId == 0)
    Cargar_Paciente_Documento($(this).val().trim());
});

function ValidarDatos_Exp() {
    if ($("#txtdocumento").val().trim().length == 0) { alert("Ingrese Nro. Documento."); return false; }
    if ($("#cboSeccional :selected").val() == "") { alert("Ingrese Seccional."); return false; }
    if ($("#txtapellido").val().trim().length == 0) { alert("Ingrese nombre de paciente."); return false; }
    if ($("#cbo_EstadoExpediente :selected").val() == "") { alert("Ingrese estado del expediente."); return false; }
    if (Pat_Ids_selec.trim().length == 0) { alert("Ingrese alguna patología."); return false; }
    //if (Diag_Ids_selec.trim().length == 0) {alert("Ingrese algún diagnóstico.");return false;}
    return true;
}

function CargarDatosExpediente_Obj() {
    var exp = {};

    exp.EXP_ID = G_ExpId;
    exp.EXP_NRO_DOC = $("#txtdocumento").val().trim();
    exp.EXP_SEC_ID = $("#cboSeccional :selected").val();
    exp.EXP_TIPO_DOC = $("#cbo_tipo_doc :selected").val();

    if ($("#txtapellido").val().trim().length == 0) exp.EXP_NOMBRE = "";
    else exp.EXP_NOMBRE = $("#txtapellido").val().trim().toUpperCase();

    if ($("#txtcalle").val().trim().length == 0) exp.EXP_DIRECCION = "";
    else exp.EXP_DIRECCION = $("#txtcalle").val().trim().toUpperCase() + " " + $("#txtnumero").val().trim().toUpperCase();

    if ($("#txtcodpos").val().trim().length == 0) exp.EXP_COD_POST = "";
    else exp.EXP_COD_POST = $("#txtcodpos").val().trim();

    if ($("#txt_NHC_UOM").val().trim().length == 0) exp.EXP_NHC = 0;
    else exp.EXP_NHC = $("#txt_NHC_UOM").val().trim();

    if ($("#txtObservaciones").val().trim().length == 0) exp.EXP_OBS = "";
    else exp.EXP_OBS = $("#txtObservaciones").val().trim().toUpperCase();

    exp.EXP_GRU_ID = $("#cboCodPariente :selected").val();

    if ($("#txtEmpresa").val().trim().length == 0) exp.EXP_TRAB_EMPR = "";
    else exp.EXP_TRAB_EMPR = $("#txtEmpresa").val().trim().toUpperCase();

    if ($("#txtcuit").val().trim().length == 0) exp.EXP_TRAB_CUIT = 0;
    else exp.EXP_TRAB_CUIT = $("#txtcuit").val().trim();

    if ($("#txtCalleEmpresa").val().trim().length == 0) exp.EXP_TRAB_DIR = "";
    else exp.EXP_TRAB_DIR = $("#txtCalleEmpresa").val().trim().toUpperCase();

    exp.EXP_DOC_DISCA = $("#chkDocu_Discapacidad").is(":checked");
    exp.EXP_DOC_SUEL = $("#chkDocu_ReciboSueldo").is(":checked");
    exp.EXP_DOC_DNI = $("#chkDocu_DNI").is(":checked");
    exp.EXP_DOC_CERT = $("#chkDocu_NacCasam").is(":checked");

    if ($("#txtFechaNacimiento").val().trim().length == 0) exp.EXP_TELEFONO = "";
    else exp.EXP_TELEFONO = $("#txttelefono").val().trim();

    if ($("#txttelefono").val().trim().length == 0) exp.EXP_TELEFONO = "";
    else exp.EXP_TELEFONO = $("#txttelefono").val().trim();

    if ($("#txtFechaNacimiento").val().trim().length == 0) exp.EXP_FEC_NAC = "01/01/1900";
    else exp.EXP_FEC_NAC = $("#txtFechaNacimiento").val();

    exp.EXP_EST_ID = $("#cbo_EstadoExpediente :selected").val();
    exp.EXP_FECHA = "01/01/1900";

    if ($("#txtFechaVencExp").val().trim().length == 0) exp.EXP_VENC_FECHA = "01/01/1900";
    else exp.EXP_VENC_FECHA = $("#txtFechaVencExp").val();

    return exp;
}

function CargarDatosExtra_Obj() {
    var extra = {};

    extra.EXP_EXT_EXP_ID = G_ExpId;
    if ($("#txtPMIDesde").val().trim().length == 0) extra.EXP_EXT_PMI_DESDE = "01/01/1900";
    else extra.EXP_EXT_PMI_DESDE = $("#txtPMIDesde").val();

    if ($("#txtPMIHasta").val().trim().length == 0) extra.EXP_EXT_PMI_HASTA = "01/01/1900";
    else extra.EXP_EXT_PMI_HASTA = $("#txtPMIHasta").val();

    if ($("#txtCodemDesde").val().trim().length == 0) extra.EXP_EXT_CODEM_DESDE = "01/01/1900";
    else extra.EXP_EXT_CODEM_DESDE = $("#txtCodemDesde").val();

    if ($("#txtCodemHasta").val().trim().length == 0) extra.EXP_EXT_CODEM_HASTA = "01/01/1900";
    else extra.EXP_EXT_CODEM_HASTA = $("#txtCodemHasta").val();

    if ($("#txtSSSDesde").val().trim().length == 0) extra.EXP_EXT_SSS_DESDE = "01/01/1900";
    else extra.EXP_EXT_SSS_DESDE = $("#txtSSSDesde").val();

    if ($("#txtSSSHasta").val().trim().length == 0) extra.EXP_EXT_SSS_HASTA = "01/01/1900";
    else extra.EXP_EXT_SSS_HASTA = $("#txtSSSHasta").val();

    if ($("#txtPMDesde").val().trim().length == 0) extra.EXP_EXT_PM_DESDE = "01/01/1900";
    else extra.EXP_EXT_PM_DESDE = $("#txtPMDesde").val();

    if ($("#txtPMHasta").val().trim().length == 0) extra.EXP_EXT_PM_HASTA = "01/01/1900";
    else extra.EXP_EXT_PM_HASTA = $("#txtPMHasta").val();

    if ($("#txtCertificadoDiscDesde").val().trim().length == 0) extra.EXP_EXT_CERT_DESDE = "01/01/1900";
    else extra.EXP_EXT_CERT_DESDE = $("#txtCertificadoDiscDesde").val();

    if ($("#txtCertificadoDiscHasta").val().trim().length == 0) extra.EXP_EXT_CERT_HASTA = "01/01/1900";
    else extra.EXP_EXT_CERT_HASTA = $("#txtCertificadoDiscHasta").val();

    if ($("#txtVencimientoPatologia").val().trim().length == 0) extra.EXP_EXT_VENC_PAT = "01/01/1900";
    else extra.EXP_EXT_VENC_PAT = $("#txtVencimientoPatologia").val();

    extra.EXP_EXT_TUTOR = $("#txtTutor").val().trim().toUpperCase();

    if ($("#cbo_EstadoLegal :selected").val() == "") extra.EXP_EXT_EST_LEGAL = 0;
    else extra.EXP_EXT_EST_LEGAL = $("#cbo_EstadoLegal :selected").val();

    return extra;
}

$("#btnGuardar").click(function () {
    if ($("#editar").val() == "0") { return false; } // para farmacia externa
    if (!ValidarDatos_Exp()) return false;

    var json = JSON.stringify({ "expediente": CargarDatosExpediente_Obj(), "PatologiasIds": Pat_Ids_selec, "extra": CargarDatosExtra_Obj(), "DiagnosticosIds": Diag_Ids_selec });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/Expediente_Cab_Insert",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            G_ExpId = Resultado.d;
            if (G_ExpId > 0) {
                alert("Expediente guardado.");
                window.location = "Compras_Expediente_Ficha.aspx";
                $("#id_Expediente").val(G_ExpId); //para escaneo...
            }
        },
        error: errores
    });
});


$("#btnBaja").click(function () {
    if ($("#editar").val() == "0") { return false; } // para farmacia externa
    if (confirm("¿Desea dar de baja el expediente?")) {
        if (G_ExpId <= 0) return false;
        var json = JSON.stringify({ "ExpId": G_ExpId });

        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Compras/Compras.asmx/Expediente_Baja",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                alert("Expediente dado de baja.");
                window.location = "Compras_Expediente_Ficha.aspx";
            },
            error: errores
        });
    }
});

$("#btnBuscarExpedientes").click(function () {
   // if ($("#editar").val() == "0") { return false; } // para farmacia externa
    if (hubo_cambios) { //pregunto si hubo cambios en los datos
        if (confirm("No se han guardado los cambios realizados ¿Desea salir?")) window.location = "Mostrar_Expedientes.aspx";
    }
    else window.location = "Mostrar_Expedientes.aspx";
});

//Opciones//

$("#btnPedidos").click(function () {
    if ($("#editar").val() == "0") { return false; }// para farmacia externa
    if (G_ExpId > 0)
    window.location = "Compras_Expediente_Pedidos.aspx?ExpId=" + G_ExpId;
});

$("#btnEntregas").click(function () {
    if (G_ExpId > 0)
        window.location = "Compras_Expediente_Entregas.aspx?ExpId=" + G_ExpId;
});


$("#btnNuevoExp").click(function () {
    if ($("#editar").val() == "0") { return false; } // para farmacia externa
    if (hubo_cambios) { //pregunto si hubo cambios en los datos
        if (confirm("No se han guardado los cambios realizados ¿Desea salir?")) window.location = "Compras_Expediente_Ficha.aspx";
    }
    else window.location = "Compras_Expediente_Ficha.aspx";
});



///Adjuntos///

$("#tabVerDocu").click(function () {
    ListaDocumentacion_Exp(G_ExpId); //Muestra los escaneos del expediente
});

function ListaDocumentacion_Exp(ExpId) {
    var json = JSON.stringify({ "ExpId": ExpId });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/Adjuntos_List",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            var fila = "";
            var Contenido = "";
            var finfila = "";
            var ruta = "http://10.10.8.66//documentacion_new/";
            var fila = "<div class='row' style='margin-left:10px; margin-top:10px;max-height:300px; height:300px: overflow:auto'>";
            $.each(lista, function (index, item) {
                var nombre_recortado = item.RutaArchivo.split("\\");
                var nombre_corto = nombre_recortado[nombre_recortado.length - 1];
                //Contenido = Contenido + "<div class='span2'><div style='width:100px; height:120px;'><a href='" + ruta + item.RutaArchivo + "' class='thumbnail' download><img src='../img/img-icon.jpg' alt='...'></a></div><p align='left' style='font-size:11px;'>" + nombre_corto + "<a style='cursor:pointer;' class='btn_borrar_img' data-id='" + item.IdDetalle + "' title='Eliminar adjunto'>&nbsp;<img src='../img/Icono_ERROR.gif'/></a></p></div>";
                var r = ruta + item.RutaArchivo;
                Contenido = Contenido + "<div class='span2'><div style='width:100px; height:120px;'><a class='thumbnail' download><img class='mostrar' style='cursor:pointer' data='"+ r +"' src='../img/img-icon.jpg' alt='...'></a></div><p align='left' style='font-size:11px;'>" + nombre_corto + "<a style='cursor:pointer;' class='btn_borrar_img' data-id='" + item.IdDetalle + "' title='Eliminar adjunto'>&nbsp;<img src='../img/Icono_ERROR.gif'/></a></p></div>";
                //alert(item.RutaArchivo);
            });

            var finfila = "</div>";
            $("#fotos").html(fila + Contenido + finfila);
        },
        error: errores
    });
}

$(".mostrar").live('click', function () {

    window.open($(this).attr('data'), 'Nombre Ventana');
//    return false;

//    $.fancybox({
//        'href': $(this).attr('data'),
//        'width': '100%',
//        'height': '75%',
//        'autoScale': false,
//        'transitionIn': 'elastic',
//        'transitionOut': 'none',
//        'type': 'iframe',
//        'hideOnOverlayClick': false,
//        'enableEscapeButton': false,
//        'preload': true,
//        'onComplete': function f() {
//            jQuery.fancybox.showActivity();
//            jQuery('#fancybox-frame').load(function () {
//                jQuery.fancybox.hideActivity();
////                win = window.open("width=200,height=200");
////                self.focus();
////                win.document.open($(this).attr('data'), 'Nombre Ventana');
////                win.document.write('<' + 'html' + '><' + 'head' + '><' + 'style' + '>');
////                win.document.write('body, td { font-family: Verdana; font-size: 10pt;}');
////                win.document.write('<' + '/' + 'style' + '><' + '/' + 'head' + '><' + 'body' + '>');
////                win.document.write(content.html());
////                win.document.write('<' + '/' + 'body' + '><' + '/' + 'html' + '>');
////                win.document.close();
////                win.print();
////                win.close();
//            });
    //    }
  //  });
});


//Dar de baja adjunto//
$(".btn_borrar_img").live("click", function () {
    if (confirm("¿Desea dar de baja el adjunto?")) {
        var idArchivo = $(this).data("id");

        if (idArchivo > 0) BajaAdjunto(idArchivo);
        else alert("Archivo no válido.");
    }
});


function BajaAdjunto(idArchivo) {
    var json = JSON.stringify({ "idArchivo": idArchivo });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Compras/Compras.asmx/BajaAdjunto",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        complete: function () {
            alert("Adjunto dado de baja.");
            ListaDocumentacion_Exp(G_ExpId);
        },
        error: errores
    });
}

$("#tabVerDocu_Turnos").click(function () {
    ListaDocumentacion_Paciente($("#afiliadoID").val());
});

function ListaDocumentacion_Paciente(IdPaciente) {
    var json = JSON.stringify({ "IdPaciente": IdPaciente });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Documentacion.asmx/Documentacion_Archivos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            var fila = "";
            var Contenido = "";
            var finfila = "";

            var fila = "<div class='row' style='margin-left:10px; margin-top:10px;max-height:380px; height:380px: overflow:auto'>";
            $.each(lista, function (index, item) {
                var nombre_recortado = item.archivo.split("\\");
        
                var nombre_corto = nombre_recortado[nombre_recortado.length - 1];
                Contenido = Contenido + "<div class='span2'><div style='width:100px; height:150px;'><a href='../img/escaneadas/" + item.archivo + "' class='thumbnail' download><img src='../img/escaneadas/" + item.archivo + "' alt='...'></a></div><p align='left' style='font-size:13px;'>" + item.tipodocu + "-" + item.cantidad + "<a class='btn_borrar_img' data-nombre='" + nombre_corto + "'><img src='../img/Icono_ERROR.gif'/></a></p></div>";
            });

            var finfila = "</div>";
            $("#documentacion_turnos").html(fila + Contenido + finfila);
        },
        error: errores
    });
}


function varificarDBT(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/Diabetes.asmx/VerificarDBT",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            switch (Resultado.d) {
                case 0:
                    $("#btnDBT").removeClass('btn-success');
                    $("#btnDBT").addClass('btn-danger');
                    $("#btnDBT").text('Diabetes mas de 6 meses');
                    $("#DBT").show();
                    break;
                case 1:
                    $("#btnDBT").removeClass('btn-danger');
                    $("#btnDBT").addClass('btn-success');
                    $("#btnDBT").text('Diabetes OK');
                    $("#DBT").show();
                    break;
            }
        },
        error: errores
    });
}