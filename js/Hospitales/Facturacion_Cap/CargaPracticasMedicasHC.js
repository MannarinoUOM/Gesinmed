var objPractica = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objPracticas = new Array();
var Seccional_Id;
var NroParte = 0;
var Id = 0;
var OS;
var S = 0;

var objMedicamentos = Array();
var Total_Med = -1;
var Editando_Med = 0;
var EditandoPos_Med = 0;
var objDescartables = Array();
var Total_1 = -1;
var Editando_1 = 0;
var EditandoPos_1 = 0;
var Existe = 0;

var objMedicos = Array();
var TotalMedicos = -1;
var EditandoMedicos = 0;
var EditandoPosMedicos = 0;

var Err = false;
var servicio;

//Medicamentos auto
var sourceArr = [];
var mapped = {};

//Descartable auto
var DescartableArr = [];
var D_mapped = {};

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////CARGA DE COMBOS//////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
/*
    Nuevo Combo para elegir nomenclador, cargo los del convenioId = 10 (Intrared)
    Segun con que nomenclador factura, carga el precio de cada practica/modulo
*/

function BuscarNomencladores(Todos) {
    var json = JSON.stringify({ "Todos": Todos, "ConvenioId": 10 });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/FACT_NOMENCLA_LIST",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Nomencladores = Resultado.d;
            $('#cbo_Nomenclador').empty();
            $('#cbo_Nomenclador').append($('<option></option>').val("").html("Seleccione Nomenclador"));
            $.each(Nomencladores, function (index, nom) {
                $('#cbo_Nomenclador').append($('<option></option>').val(nom.FACT_NOMENCLA_ID).html(nom.FACT_NOMENCLA_DESC));
            });
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
                $('#cbo_TipoDOC').append($('<option></option>').val(Tipo.Id).html(Tipo.Descripcion));
            });

        },
        error: errores
    });
}

function List_Seccionales() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Seccionales_Cargado,
        error: errores,
        complete: function () { 
            $("#btnBuscar").show();
        }
    });
}

function List_Seccionales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Seccional) {
        $("#cbo_Seccional").append($("<option></option>").val(Seccional.Nro).html(Seccional.Seccional));
    });

}

function List_Centro() {
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/Centro.asmx/CentroUnico",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Centro_Cargado,
        error: errores
    });
}

function List_Centro_Cargado(Resultado) {
    var Centro = Resultado.d;
    $("#cbo_Centro").append($("<option></option>").val(Centro.Id).html(Centro.RazonSocial));
}

function List_Medicos() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivos",
        data: '{Especialidad: "' + 0 + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Cargado,
        error: errores
    });

}

function List_Medicos_Cargado(Resultado) {
    var Medicos = Resultado.d;
    $('#cbo_Medicos').empty();
    $.each(Medicos, function (index, medicos) {
        $('#cbo_Medicos').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
    });
}

function Especialidades_Lista() {
    var json = JSON.stringify({ "Todas": false, "Id": 0, "SoloTurnos": false });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidades_Lista_Cargado,
        error: errores
    });
}

function Especialidades_Lista_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Especialidad").append("<option value='0'></option>");
    $.each(Lista, function (index, Especialidad) {
        $("#cbo_Especialidad").append($("<option></option>").val(Especialidad.Id).html(Especialidad.Especialidad));
    });
}


$("#cbo_Especialidad").change(function () {
    CargarMedicosPorEsp();
    CargarValorNN();
});

function CargarMedicosPorEsp() {
    var json = JSON.stringify({ "Especialidad": $("#cbo_Especialidad :selected").val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: MedicosporEsp_Cargado,
        error: errores
    });
}

function MedicosporEsp_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Medicos").empty();
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });
}

function List_Servicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Servicios_SoloFact",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Servicios_Cargado,
        error: errores
    });
}

function List_Servicios_Cargado(Resultado) {
    var Servicios = Resultado.d;
    $.each(Servicios, function (index, Servicio) {
        $('#cbo_Servicio').append(
              $('<option></option>').val(Servicio.id).html(Servicio.descripcion)
            );
    });
}

function ListarPracticas() {
    var json = JSON.stringify({ "Practica": ' ', "Codigo": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/ConfirmarTurnos.asmx/Practicas_Listas_Total",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Practicas = Resultado.d;
            $('#cbo_Practica').empty();
            $('#cbo_Practica').append($('<option></option>').val('0').html(''));
            $.each(Practicas, function (index, Practica) {
                $('#cbo_Practica').append($('<option></option>').val(Practica.Codigo).html(Practica.Practica));
            });
        },
        complete: function () {
            if ($("#codigo").val().trim().length > 0) $('#cbo_Practica').val($("#codigo").val());
        },
        error: errores
    });
}


function Cargar_Modulos() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/AltasNomencladores.asmx/ListadodeModulosTotal",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Modulos = Resultado.d;
            $('#cbo_Modulo').empty();
            $('#cbo_Modulo').append($('<option></option>').val('0').html(''));
            $.each(Modulos, function (index, modulo) {
                $('#cbo_Modulo').append($('<option></option>').val(modulo.Codigo).html(modulo.Descripcion));
            });
        },
        error: errores
    });
}

function List_by_Monodroga(MonoId) {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Medicamentos_Lista_by_Mono",
        data: '{MonoId: "' + MonoId + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado,
        beforeSend: function () {
            $("#cbo_MedicamentoMed").attr("disabled", true);
        },
        complete: function () {
            $("#cbo_MedicamentoMed").removeAttr("disabled");
        },
        error: errores
    });
}

function Cargar_Medicamentos_Cargado(Resultado) {
    var Medicamentos = Resultado.d;
    $.each(Medicamentos, function (i, item) {
        if (Medicamentos[i].Medida != null) {
            var Medida = Medicamentos[i].Medida;
        }
        else {
            var Medida = '';
        }
        if (Medicamentos[i].Presentacion != null) {
            var Presentacion = Medicamentos[i].Presentacion;
        }
        else {
            var Presentacion = '';
        }
        if (i == 0) {
            sourceArr.length = 0;
        }
        str = Medicamentos[i].REM_NOMBRE + ' - ' + Medicamentos[i].REM_GRAMAJE + Medida + ' - ' + Presentacion;
        mapped[str] = item.REM_ID;
        sourceArr.push(str);
        if (i == Medicamentos.length - 1)  $("#cbo_MedicamentoMed").removeAttr("disabled"); 
    });
}

function List_Descartables() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ListInsumosDescartables",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Descartables_Cargado,
        error: errores
    });
}

function List_Descartables_Cargado(Resultado) {
    var Medicamentos = Resultado.d;
    $.each(Medicamentos, function (i, item) {
        if (Medicamentos[i].Medida != null) {
            var Medida = Medicamentos[i].Medida;
        }
        else {
            var Medida = '';
        }
        if (Medicamentos[i].Presentacion != null) {
            var Presentacion = Medicamentos[i].Presentacion;
        }
        else {
            var Presentacion = '';
        }
        if (i == 0) {
            DescartableArr.length = 0;
        }
        str = Medicamentos[i].REM_NOMBRE + ' - ' + Medicamentos[i].REM_GRAMAJE + Medida + ' - ' + Presentacion;
        D_mapped[str] = item.REM_ID;
        DescartableArr.push(str);
        if (i == Medicamentos.length - 1) $("#cbo_Descartable").removeAttr("disabled");
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////FIN CARGA COMBOS//////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////INICIO DE CONTROLES////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function InitControls() {
    BuscarNomencladores(false);
    List_Seccionales();
    List_Centro();
    ListTipoDoc();
    $("#txtNroParte").val("Provisorio");
    $("#txtNroParte").attr("disabled", "disabled");
    $("#txtNHC").focus();
    $("#txtFechaCarga").val(FechaActual());
    //$(".fecha").mask("99/99/9999", { placeholder: "" });
    $(".fecha").datepicker();
}

function InitControls_DetPartes() {
    List_by_Monodroga(0);
    ListaMonoDrogras();
    List_Descartables();
    $("#CargadoRendicion").datepicker();
    $("#CargadoRendicion").val(FechaActual());
    $("#CargadoRendicion").mask("99/99/9999", { placeholder: "-" });
    List_Servicios();
    ListarPracticas();
    Cargar_Modulos();
    List_Medicos();
    Especialidades_Lista();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////FIN INICIO DE CONTROLES///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////FUNCIONES COMUNES////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function FechaActual() {
    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var dd = currentDt.getDate();
    dd = (dd < 10) ? '0' + dd : dd;
    var yyyy = currentDt.getFullYear();
    var date = dd + '/' + mm + '/' + yyyy;
    return (date);
}

function VerMas() {
    var ancho = 900;
    var alto = 600;
    var posicion_x = (screen.width / 2) - (ancho / 2);
    var posicion_y = (screen.height / 2) - (alto / 2);
    var pagina = "../Pacientes/NuevoAfiliado.aspx?ID=" + $("#afiliadoId").val();
    var opciones = "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, width=900, height=365, top=85, left=140";
    window.open(pagina, "", "width=" + ancho + ",height=" + alto + ",menubar=0,toolbar=0,directories=0,scrollbars=no,resizable=no,left=" + posicion_x + ",top=" + posicion_y + "");
}

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

$(".numeroDecimal").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        if (e.keyCode == 190) {
            if ($(this).val().indexOf('.') == -1 && $(this).val().trim().length > 0) return;
            else e.preventDefault();
        }
        else return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function RecargarPagina(url) {
    document.location = "../Facturacion_Cap/CargaPracticasMedicasHC.aspx" + url;
}

function GetQueryString() {
    var querystring = location.search.replace('?', '').split('&');
    var queryObj = {};
    for (var i = 0; i < querystring.length; i++) {
        var name = querystring[i].split('=')[0];
        var value = querystring[i].split('=')[1];
        queryObj[name] = value;
    }
    return queryObj;
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
        $("#txtDNI").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtDNI").attr('value', paciente.documento_real);
        $("#txtNHC").attr('value', paciente.NHC_UOM);
        Seccional_Id = paciente.Nro_Seccional;
        $("#cbo_Seccional").val(Seccional_Id);
        $("#cbo_Seccional").attr('disabled', 'disabled');
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
        $("#afiliadoId").val(paciente.documento);
        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
        }
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////FIN FUNCIONES COMUNES////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// FANCYS//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
$("#btnBuscarPaciente").fancybox({
    'hideOnContentClick': true,
    'width': '75%',
    'height': '75%',
    'autoScale': false,
    'transitionIn': 'none',
    'transitionOut': 'none',
    'type': 'iframe'
});

$("a#inline").fancybox({
    'hideOnContentClick': true
});

function Ventana(url) {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
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

////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////FIN FANCYS///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////EVENTOS CONTROLES (CARGA PRAC Y MODULO)//////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
function CargarValorNN() {
    if ($("#codigo").val().trim().length == 0) return false;
    if ($("#rdPractica").is(":checked")) {
        $("#cbo_Practica").val($("#codigo").val());
        ValorPractica();
    }
    else {
        $("#cbo_Modulo").val($("#codigo").val());
        ValorModulo();
    }
}


$("#codigo").change(function () {
    if ($("#codigo").val().trim().length > 0) CargarValorNN();
});


$("#cbo_Practica").change(function () {
    $("#codigo").val($("#cbo_Practica :selected").val());
    CargarValorNN();
});

$("#cbo_Modulo").change(function () {
    $("#codigo").val($("#cbo_Modulo :selected").val());
    CargarValorNN();
});

function ValorPractica() {
    var json = JSON.stringify({ "Seccional": Seccional_Id, "EspecialidadId": $("#cbo_Especialidad :selected").val(), "PracticaId": $("#codigo").val().trim(), "NomencladorId": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ValorPracticaporConvenio",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Valor = Resultado.d;
            if (Valor != null) $("#precio").val(Valor.ValorNN.replace(',', '.'));
            else {
                $("#precio").val('0');
                $("#total").val('0');
            }
        },
        error: errores
    });
}

function ValorModulo() {
        var json = JSON.stringify({ "InstSecc": Seccional_Id, "ModuloId": $("#codigo").val().trim(), "NomencladorId": 0 });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/Fact_Valor_Modulo_Convenio",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var Valor = Resultado.d;
                if (Valor != null) $("#precio").val(Valor.ValorNN);
                else {
                    $("#precio").val('0');
                    $("#total").val('0');
                }
            },
            error: errores
        });
}

$("#rdModulo").click(function () {
    $("#controlcbo_Especialidad").hide();
    $("#controlcbo_Modulo").show();
    $("#controlcbo_Practica").hide();
    $("#cbo_Especialidad").val("0");
    List_Medicos();
    var obj = document.getElementById('tabPrac');
    obj.innerHTML = "Módulo";
});

$("#rdPractica").click(function () {
    $("#controlcbo_Modulo").hide();
    $("#controlcbo_Practica").show();
    $("#controlcbo_Especialidad").show();
    var obj = document.getElementById('tabPrac');
    obj.innerHTML = "Práctica";
});

function ValidarPractica() {
    if ($("#fechapractica").val().trim().length == 0) { alert("Ingrese Fecha de Práctica."); return false; }
    if ($("#fecharendicion").val().trim().length == 0) { alert("Ingrese Fecha de Rendición."); return false; }
    if ($("#cbo_Especialidad :selected").val() == "0" && $("#rdPractica").is(":checked")) { alert("Ingrese Especialidad."); return false; }
    if ($("#cbo_Servicio :selected").val() == "0") { alert("Ingrese Servicio."); return false; }
    
    if ($("#cbo_Practica :selected").val() == "0" && $("#rdPractica").is(":checked")) { alert("Ingrese Práctica."); return false; }
    if ($("#cbo_Modulo :selected").val() == "0" && $("#rdModulo").is(":checked")) { alert("Ingrese Módulo."); return false; }

    if ($("#codigo").val().trim().length == 0) { alert("Ingrese Práctica."); return false; }
    if ($("#cbo_Medicos :selected").val() == "0") { alert("Ingrese Médico."); return false; }
    if (parseInt($("#cantidad").val().trim()) <= 0 || $("#cantidad").val().trim().length == 0) { alert("Ingrese Cantidad."); return false; }
    if (parseInt($("#porcentaje").val().trim()) < 0 || $("#porcentaje").val().trim().length == 0) { alert("Ingrese Porcentaje."); return false; }
    if (parseInt($("#precio").val().trim()) < 0 || $("#precio").val().trim().length == 0) { alert("Ingrese Valor."); return false; }
    //if (ExisteCodigo($("#codigo").val())) return false;
    return true;
}

///Carga objeto para agregarlo a la lista
function LoadObjPractica() {
    var objPractica = {};
    if ($("#rdAmbu").is(":checked")) {
        objPractica.Ambulatorio = true;
        objPractica.Internacion = false;
    }
    else {
        objPractica.Ambulatorio = false;
        objPractica.Internacion = true;
    }
    if ($("#rdModulo").is(":checked")) {
        objPractica.Modulo = true;
        objPractica.Practica = false;
    }
    else {
        objPractica.Modulo = false;
        objPractica.Practica = true;

    }
    var desc = Calcular_Descuento($("#porcentaje").val());
    objPractica.FechaPractica = $("#fechapractica").val();
    objPractica.FechaRendicion = $("#fecharendicion").val();
    objPractica.ServicioId = $("#cbo_Servicio :selected").val();
    objPractica.Serv_Nombre = $("#cbo_Servicio :selected").text();
    objPractica.EspecialidadId = $("#cbo_Especialidad :selected").val();
    objPractica.Esp_Nombre = $("#cbo_Especialidad :selected").text();
    objPractica.MedicoId = $("#cbo_Medicos :selected").val();
    objPractica.Med_Nombre = $("#cbo_Medicos :selected").text();
    objPractica.Cantidad = $("#cantidad").val();
    objPractica.Porcentaje = $("#porcentaje").val();
    objPractica.PracticaId = $("#codigo").val();

    if (objPractica.Practica) objPractica.Prac_Nombre = $("#cbo_Practica :selected").text();
    else objPractica.Prac_Nombre = $("#cbo_Modulo :selected").text();

    objPractica.Precio = $("#precio").val();
    objPractica.Total = parseInt($("#cantidad").val()) * parseFloat($("#precio").val()) * desc;

    if ($("#chkFacturado").is(":checked")) objPractica.Facturarlo = true;
    else objPractica.Facturarlo = false;

    objPractica.PrecioHonorario = "0";
    if ($("#chkHonorarios").is(":checked")) {
        objPractica.Honorarios = true;
        objPractica.PrecioHonorario = $("#txtPrecioHono").val();
    }
    else {
        objPractica.Honorarios = false;
        objPractica.PrecioHonorario = "0";
    }
    if ($("#chkAPE").is(":checked")) objPractica.APE = true;
    else objPractica.APE = false;

    objPractica.Estado = 1;
    return objPractica;
}

///Agregar una practica a lista////
$("#btnAgregar, #btnAgregar_").click(function () {
    if (!ValidarPractica()) return false;

    var Cual = Total;
    if (Editando == 1) {
        Cual = EditandoPos;
    }
    else {
        Total = Total + 1;
        Cual = Total;
    }
    objPracticas[Cual] = LoadObjPractica();
    RenderizarTablaP();
    LimpiarCamposP();
});

$("#btnCancelar,#btnCancelar_").click(function () {
    LimpiarCamposP();
});

//Limpia controles donde se ingresa la practica/modulo
function LimpiarCamposP() {
    EditandoPos = -1;
    Editando = 0;
    //$("#fechapractica").val('');
    //$("#fecharendicion").val('');
    //$("#cbo_Servicio").val('');
    //$("#cbo_Medicos").val('0');
    $("#cantidad").val('1');
    $("#porcentaje").val('100');
    $("#codigo").val('');
    $("#cbo_Practica").val('0');
    $("#precio").val('');
    $("#total").val('');
    $("#txtPrecioHono").val('0');
    $("#PrecioHono").hide();
    $("#chkFacturado").attr("checked", true);
    $("#chkHonorarios").removeAttr("checked", "");
    $("#chkAPE").removeAttr("checked", "");
    $("#rdModulo").removeAttr("checked", "");
    $("#rdPractica").removeAttr("checked", "");
    $("#codigo").removeAttr("disabled");
    $("#cbo_Practica").removeAttr("disabled");
    $("#rdPractica").attr("checked", "checked");
    //$("#tabMedicos").hide();
    $('#controlcbo_Especialidad').show();
    $('#controlcbo_Practica').show();
    $('#controlcbo_Modulo').hide();
    $("#codigo").focus();
    //var obj = document.getElementById('tabPrac');
    //obj.innerHTML = "Práctica";
}


function RenderizarTablaP() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%; font-size:11px;'><thead><tr><th></th><th>F.Práctica</th><th>F.Rendición</th><th>Tipo</th><th>Fact</th><th>Cantidad</th><th>Código</th><th>Práctica</th><th>%</th><th>Imp. Unit</th><th>Imp. Total</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        tipo = ''; fact = 'N';
        if (objPracticas[i].Ambulatorio) tipo = 'A';
        else tipo = 'I';
        if (objPracticas[i].Facturarlo) fact = 'S';
        if (objPracticas[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Practica'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Practica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objPracticas[i].FechaPractica + " </td><td> " + objPracticas[i].FechaRendicion + " </td><td> " + tipo + " </td><td> " + fact + " </td><td> " + objPracticas[i].Cantidad + " </td><td> " + objPracticas[i].PracticaId + " </td><td> " + objPracticas[i].Prac_Nombre + " </td><td> " + objPracticas[i].Porcentaje + " </td><td> $" + objPracticas[i].Precio + " </td><td> $" + objPracticas[i].Total + " </td></tr>";
        }
    }
    var Pie = "</tbody></table>";
    $("#TablaPracticas").html(Encabezado + Contenido + Pie);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////FIN EVENTOS CONTROLES (CARGA PRAC Y MODULO)//////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {
    InitControls();
    var Query = {};
    Query = GetQueryString();
    if (Query['NHC'] != null) {
        Cargar_Paciente_NHC(Query['NHC']);
    }
    if (Query['S'] != null) {
        S = 1;
    }
    if (Query['ID'] != null) {
        CargarPacienteID(Query['ID']);
    }
    if (Query['Id'] != null) {
        Id = Query['Id'];
        NroParte = Id; //Modificacion
        CargarCabecera();
        EstaProcesadoParte();
        InitControls_DetPartes();
        $("#btnBaja").show();
        $("#btnImprimir").show();
    }

    $('#cbo_MedicamentoMed').typeahead({
        source: sourceArr,
        updater: function (selection) {
            $("#txt_Medicamento").val(selection); //nom
            $("#Medicamento_val").val(mapped[selection]); //id
            //CargarPrecioAlfabeta();
            return selection;
        },
        minLength: 4,
        items: 10
    });

    $('#cbo_Descartable').typeahead({
        source: DescartableArr,
        updater: function (selection) {
            $("#txt_Descartable").val(selection); //nom
            $("#Descartable_val").val(D_mapped[selection]); //id
            
            return selection;
        },
        minLength: 4,
        items: 10
    });
});

function CargarPrecioAlfabeta() {
    var _remId = $("#Medicamento_val").val();
    var json = JSON.stringify({ "REM_ID_CENTRAL": _remId });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Farmacia/Farmacia.asmx/INSUMOS_PRECIO_ALFABETA_BY_ID",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#precioMed").val(Resultado.d);
        },
        error: errores
    });
    
}

$("#btnBaja").click(function () {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/Baja_Parte",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: BajaParte,
        error: errores
    });
});

function EstaProcesadoParte() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/EstaProcesadoParte",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: EstaProcesadoParteCargado,
        error: errores
    });
}

function EstaProcesadoParteCargado(Resultado) {
    var r = Resultado.d;
    if (r > 0) { //Procesado, no se puede modificar parte y ni darlo de baja.
        $("#btnBaja").hide();
        $("#btnCargaMedicamentos").hide();
        $("#btnConfirmar").hide();
    }
    else { //No procesado, se puede modificar parte y ni darlo de baja.
        $("#btnBaja").show();
        $("#btnCargaMedicamentos").show();
        $("#btnConfirmar").show();
    }
}

function BajaParte(Resultado) {
    var r = Resultado.d;
    if (r > 0) {
        //alert("Parte Dado de baja");
        window.location = "BusquedadePartes.aspx";
    }
    else alert("PARTE PROCESADO, NO PUEDE DARSE DE BAJA");
}

function CargarCabecera() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/ListPartesCab",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListPartesCab_Cargado,
        error: errores
    });
}

function ListPartesCab_Cargado(Resultado) {
    var Cabecera = Resultado.d;
    if (Cabecera != null) {
        $("#txtNroParte").val(Cabecera.NroParte);
        $("#txtFechaCarga").val(Cabecera.Fecha);
        $("#txtNHC").val(Cabecera.NHC);
        CargarPacienteID(Cabecera.NHC);
        $("#cbo_Centro").val(Cabecera.CentroId);
        OS = Cabecera.InstitucionId;
        if (Cabecera.Ambulatorio)
        $("#rdAmbu").attr("checked","checked");
        else {
            $("#rdInter").attr("checked", "checked");
            $("#txtNroInt").val(Cabecera.NroInternacion);
            if ($("#txtNroInt").val().length > 0)
            DatosInternacion();
        }
        $("#hastaaqui").fadeIn(1500);
        if (S != 1)
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        else $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top }, 500); //de seleccion
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
        $("#CargadoCentro").html($("#cbo_Centro :selected").text());
        CargarDetalles();
    }
}

function CargarDetalles() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/ListPartesDet",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListPartesDet_Cargado,
        complete: function () {
            LoadCabeceraMedicamentos();
        },
        error: errores
    });
}

function ListPartesDet_Cargado(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;font-size:11px;'><thead><tr><th></th><th>F.Práctica</th><th>F.Rendición</th><th>Tipo</th><th>Fact</th><th>Cantidad</th><th>Código</th><th>Práctica</th><th>%</th><th>Imp. Unit</th><th>Imp. Total</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Lista, function (index, Detalle) {
        tipo = ''; fact = 'N';
        if (Detalle.Ambulatorio) tipo = 'A';
        else tipo = 'I';
        if (Detalle.Facturarlo) fact = 'S';

        var desc = Calcular_Descuento(Detalle.Porcentaje);
        Detalle.Total = parseFloat(Detalle.Precio) * desc;
        Detalle.Precio = parseFloat(Detalle.Total / Detalle.Cantidad).toPrecision(10);
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Practica'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Practica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.FechaPractica + " </td><td> " + Detalle.FechaRendicion + " </td><td> " + tipo + " </td><td> " + fact + " </td><td> " + Detalle.Cantidad + " </td><td> " + Detalle.PracticaId + " </td><td> " + Detalle.Prac_Nombre + " </td><td> " + Detalle.Porcentaje + " </td><td> $" + Detalle.Precio + " </td><td> $" + Detalle.Total + " </td></tr>";
        objPracticas[i] = Detalle;
        objPracticas[i].Estado = 1;
        Total = Total + 1;
        i = i + 1;
    });

    var Pie = "</tbody></table>";
    $("#TablaPracticas").html(Encabezado + Contenido + Pie);
}

$("#txtDNI").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txtDNI').attr('readonly') == undefined) {
            Cargar_Paciente_Documento($("#txtDNI").val());
        }

    }
});

$("#txtDNI").change(function () {
    Cargar_Paciente_Documento($("#txtDNI").val());
});

$("#txtNHC").change(function () {
    Cargar_Paciente_NHC($("#txtNHC").val());
});

$("#txtNHC").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txtNHC').attr('readonly') == undefined) {
            Cargar_Paciente_NHC($("#txtNHC").val());
        }

    }
});

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

function ExisteCodigo(Algo) {
    for (var i = 0; i <= Total; i++) {
        if (objPracticas[i].PracticaId == Algo && objPracticas[i].Estado == 1 && Editando != 1) {
            alert("Ya ha cargado la Practica Nro: " + Algo);
            return true;
        }
    }
    return false;
}

function Calcular_Descuento(porcentaje) {
    Descuento = parseFloat(porcentaje);
    var porc = parseFloat(100);
    var desc = Descuento / porc;
    return desc;
}

$("#cantidad").blur(function () {
    if ($("#precio").val() != null && $("#precio").val() != undefined && $("#porcentaje").val() != null && $("#porcentaje").val() ) {
        var desc = Calcular_Descuento($("#porcentaje").val());
        var tot = parseFloat($("#precio").val()) * parseFloat($("#cantidad").val()) * desc;
        $("#total").val(tot.toFixed(2));
    }
    else $("#total").val('0');
});

$("#porcentaje").blur(function () {
    if ($("#precio").val() != null && $("#precio").val() != undefined && $("#cantidad").val() != null && $("#cantidad").val() ) {
        var desc = Calcular_Descuento($("#porcentaje").val());
        var tot = parseFloat($("#precio").val()) * parseFloat($("#cantidad").val()) * desc;
        $("#total").val(tot.toFixed(2));
    }
    else $("#total").val('0');
});

$("#precio").blur(function () {
    if ($("#cantidad").val() != null && $("#cantidad").val() != undefined && $("#porcentaje").val() != null && $("#porcentaje").val() ) {
        var desc = Calcular_Descuento($("#porcentaje").val());
        var tot = parseFloat($("#precio").val()) * parseFloat($("#cantidad").val()) * desc;
        $("#total").val(tot.toFixed(2));
    }
    else $("#total").val('0');
});

function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    $.each(Paciente, function (index, paciente) {

        $("#txtDNI").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.cuil);

        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#txtNHC").attr('value', paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        Seccional_Id = paciente.Nro_Seccional;
        $("#cbo_Seccional").val(Seccional_Id);
        $("#cbo_Seccional").attr('disabled', 'disabled');
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
        $("#afiliadoId").val(paciente.documento);
        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}

function Editar(Nro) 
{
    Editando = 1;
    EditandoPos = Nro;
   //$("#codigo").attr("disabled","disabled");
   //$("#cbo_Practica").attr("disabled", "disabled");
   $("#codigo").val(objPracticas[Nro].PracticaId);
   //$("#tabMedicos").hide();
    if (objPracticas[Nro].Ambulatorio) $("#rdAmbulatorio").attr('checked', 'checked');
    else $("#rdInternacion").attr('checked', 'checked');

   if (objPracticas[Nro].Modulo) $("#rdModulo").attr('checked', 'checked');
   else $("#rdPractica").attr('checked', 'checked');
   
   if ($("#rdModulo").is(":checked")) {
       var obj = document.getElementById('tabPrac');
       obj.innerHTML = "Módulo";
       $('#controlcbo_Practica').hide();
       $('#controlcbo_Especialidad').hide();
       $('#controlcbo_Modulo').show();
       $("#cbo_Modulo").val($("#codigo").val());
   }
   else {
       var obj = document.getElementById('tabPrac');
       obj.innerHTML = "Práctica";
       $('#controlcbo_Especialidad').show();
       $('#controlcbo_Practica').show();
       $('#controlcbo_Modulo').hide();
       $("#cbo_Practica").val($("#codigo").val());
   }
   $("#fechapractica").val(objPracticas[Nro].FechaPractica);
   $("#fecharendicion").val(objPracticas[Nro].FechaRendicion);
   $("#cbo_Servicio").val(objPracticas[Nro].ServicioId);
   $("#cbo_Especialidad").val(objPracticas[Nro].EspecialidadId);
   $("#cbo_Medicos").val(objPracticas[Nro].MedicoId);
   $("#cantidad").val(objPracticas[Nro].Cantidad);
   $("#porcentaje").val(objPracticas[Nro].Porcentaje);
   $("#precio").val(objPracticas[Nro].Precio);
   $("#cantidad").val(objPracticas[Nro].Cantidad);
   $("#total").val(objPracticas[Nro].Total);

   if (objPracticas[Nro].Facturarlo) $("#chkFacturado").attr("checked", "checked");
   else $("#chkFacturado").remoeveAttr("checked");

   if (objPracticas[Nro].Honorarios) $("#chkHonorarios").attr("checked", "checked");
   else $("#chkHonorarios").remoeveAttr("checked");

   if (objPracticas[Nro].APE) $("#chkAPE").attr("checked", "checked");
   else $("#chkAPE").remoeveAttr("checked");
}

function Eliminar(Nro) {
//    $(objMedicos).each(function (index,item) {
//        if (item.PracticaId == objPracticas[Nro].PracticaId) {
//            item.Estado = 0;
//            TotalMedicos = TotalMedicos - 1;
//        }
//    });
//    
//    objMedicos = $.grep(objMedicos, function (value) {
//        return value.Estado != 0;
//    });
    //RenderizarTablaMedicos();

    objPracticas[Nro].Estado = 0;
    RenderizarTablaP();
    objPracticas = $.grep(objPracticas, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;

    LimpiarCamposP();
}

$("#txtPaciente").keypress(function (event) {
    if (event.which == 42) {
        if ($('#txtPaciente').attr('readonly') == undefined) {
            $("#desdeaqui").show();
        }
    }
});

$("#desdeaqui").click(function () {
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    $("#CargadoCentro").html($("#cbo_Centro :selected").text());
    $("#CargadoInstitucion").html($("#cbo_Institucion :selected").text().substr(0, 53));
    InitControls_DetPartes();
    if ($("#txtNroInt").val().length > 0) DatosInternacion();
    $("#fechapractica").focus();
});


function DatosInternacion() {
    var json = JSON.stringify({ "Id": $("#txtNroInt").val(), "NHC": $("#txtNHC").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/List_Fact_Internacion_by_Id",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: DatosInternacion_Cargado,
        error: errores
    });
}

function DatosInternacion_Cargado(Resultado) {
    var obj = Resultado.d;
    $("#NroInt").html($("#txtNroInt").val());
    if (obj.id != null) {
        $("#NroInt").html(obj.id);
        $("#FechaIng").html(obj.ingreso);
        $("#FechaEgr").html(obj.egreso);
    }
    else $("#NroInt").html('0');
}

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////Medicamentos//////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////

$("#btnCargaMedicamentos").click(function () {
    $("#myModal").modal({ backdrop: 'static', keyboard: false });
});

function ListaMonoDrogras() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/MonoDrogas",
        data: '{Numero: "' + 0 + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var MonoDrogas = Resultado.d;
            $('#cbo_MonodrogaMed').empty();
            $('#cbo_MonodrogaMed').append('<option value="0"></option>');
            $.each(MonoDrogas, function (index, mono) {
                $('#cbo_MonodrogaMed').append(
              $('<option></option>').val(mono.numero).html(mono.nombre)
            );
            });
        },
        error: errores
    });
}

function Get_Insumo_by_Id(Id) {
    $.ajax({
        type: "POST",
        data: "{Id: '" + Id + "'}",
        url: "../Json/Farmacia/Farmacia.asmx/Get_Insumo_by_Id",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Get_Insumo_by_Id_Cargado,
        error: errores
    });
}

function Get_Insumo_by_Id_Cargado(Resultado) {
    var Insumo = Resultado.d;
    $("#precio_desc").val(Insumo.REM_PRECIO);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////OPERACIONES DE MEDICAMENTOS///////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function LoadMedicamentoObj() {
    var objMedicamento = {};
    objMedicamento.Ambulatorio = $("#rdAmbu").is(":checked");
    objMedicamento.Internacion = !$("#rdAmbu").is(":checked");
    objMedicamento.Facturarlo = $("#chkFacturadoMed").is(":checked");
    objMedicamento.Estadisticas = $("#chkEstadisticasMed").is(":checked");
    objMedicamento.APE = $("#chkAPEMed").is(":checked");
    objMedicamento.Medicamento = $("#Medicamento_val").val(); //Id
    objMedicamento.Medicamento_Nombre = $("#txt_Medicamento").val(); //Nombre Med
    objMedicamento.Monodroga = $("#cbo_MonodrogaMed :selected").val();
    objMedicamento.Monodroga_Nombre = $("#cbo_MonodrogaMed :selected").text();
    objMedicamento.Cantidad = $("#cantidadMed").val();
    objMedicamento.Precio = $("#precioMed").val();
    objMedicamento.FechaPractica = $("#fechapracMed").val();
    objMedicamento.Total = $("#subtotalMed").val();
    objMedicamento.Porcentaje = $("#porcentajeMed").val();
    objMedicamento.Estado = 1;
    return objMedicamento;
}

function ValidarMed() {
    if ($("#Medicamento_val").val() == "0") { alert("Ingrese Medicamento."); return false; }
    if ($("#txt_Medicamento").val().trim().length == 0) { alert("Ingrese Medicamento."); return false; }
    if ($("#cbo_MonodrogaMed :selected").val() == 0) { alert("Ingrese Monodroga."); return false; }
    if ($("#cantidadMed").val().trim().length == 0) { alert("Ingrese Cantidad."); return false; }
    if ($("#precioMed").val().trim().length == 0) { alert("Ingrese Total."); return false; }
    if ($("#fechapracMed").val().trim().length == 0) { alert("Ingrese Fecha."); return false; }
    return true;
}

$("#btnAgregarMed").click(function () {
    if (!ValidarMed()) return false;
    var Cual = Total_Med;
    if (Editando_Med == 1) {
        Cual = EditandoPos_Med;
    }
    else {
        Total_Med = Total_Med + 1;
        Cual = Total_Med;
    }
    objMedicamentos[Cual] = LoadMedicamentoObj();
    RenderizarTabla();
    LimpiarCampos();
});

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;font-size:11px;'><thead><tr><th></th><th>Medicamento</th><th>Monodroga</th><th>Cantidad</th><th>Importe</th><th>%</th><th>Total</th></tr></thead><tbody>";
    var Contenido = "";
    for (var i = 0; i <= Total_Med; i++) {
        if (objMedicamentos[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='EditarMed" + i + "' onclick='EditarMed(" + i + ");' class='btn btn-mini' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='ElminarMed" + i + "'onclick='EliminarMed(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Medicamento_Nombre + " </td><td> " + objMedicamentos[i].Monodroga_Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> $" + objMedicamentos[i].Precio + " </td><td> " + objMedicamentos[i].Porcentaje + " </td><td> $" + objMedicamentos[i].Total + " </td></tr>";
        }
    }
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

function EditarMed(Nro) {
    Editando_Med = 1;
    EditandoPos_Med = Nro;
    $("#chkFacturadoMed").attr("checked", "checked");
    $("#cbo_MedicamentoMed").attr("disabled", "disabled");

    $("#Medicamento_val").val(objMedicamentos[Nro].Medicamento);
    $("#txt_Medicamento").val(objMedicamentos[Nro].Medicamento_Nombre);
    $("#cbo_MedicamentoMed").val(objMedicamentos[Nro].Medicamento_Nombre);

    $("#cbo_MonodrogaMed").val(objMedicamentos[Nro].Monodroga);
    $("#cantidadMed").val(objMedicamentos[Nro].Cantidad);
    $("#precioMed").val(objMedicamentos[Nro].Precio);
    $("#fechapracMed").val(objMedicamentos[Nro].FechaPractica);
    $("#subtotalMed").val(objMedicamentos[Nro].Total);
    $("#porcentajeMed").val(objMedicamentos[Nro].Porcentaje);
    if (objMedicamentos[Nro].Facturarlo)
        $("#chkFacturadoMed").attr("checked", "checked");
    if (objMedicamentos[Nro].Estadisticas)
        $("#chkEstadisticasMed").attr("checked", "checked");
    if (objMedicamentos[Nro].APE)
        $("#chkAPEMed").attr("checked", "checked");
}

function EliminarMed(Nro) {
    objMedicamentos[Nro].Estado = 0;
    RenderizarTabla();
    objMedicamentos = $.grep(objMedicamentos, function (value) {
        return value.Estado != 0;
    });
    Total_Med = Total_Med - 1;
}

$("#precioMed").blur(function () {
    if ($("#cantidadMed").val() != null && $("#cantidadMed").val() != undefined && $("#porcentajeMed").val() != null && $("#porcentajeMed").val()) {
        var desc = Calcular_Descuento($("#porcentajeMed").val());
        var tot = parseFloat($("#precioMed").val()) * parseFloat($("#cantidadMed").val()) * desc;
        $("#subtotalMed").val(tot.toFixed(2));
    }
    else $("#subtotalMed").val('');
});

$("#cantidadMed").blur(function () {
    if ($("#precioMed").val() != null && $("#precioMed").val() != undefined && $("#porcentajeMed").val() != null && $("#porcentajeMed").val()) {
        var desc = Calcular_Descuento($("#porcentajeMed").val());
        var tot = parseFloat($("#precioMed").val()) * parseFloat($("#cantidadMed").val()) * desc;
        $("#subtotalMed").val(tot.toFixed(2));
    }
    else $("#subtotalMed").val('');
});

$("#porcentajeMed").blur(function () {
    if ($("#precioMed").val() != null && $("#precioMed").val() != undefined && $("#porcentajeMed").val() != null && $("#porcentajeMed").val()) {
        var desc = Calcular_Descuento($("#porcentajeMed").val());
        var tot = parseFloat($("#precioMed").val()) * parseFloat($("#cantidadMed").val()) * desc;
        $("#subtotalMed").val(tot.toFixed(2));
    }
    else $("#subtotalMed").val('');
});

function LimpiarCampos() {
    $("#cbo_MedicamentoMed").removeAttr("disabled");
    $("#Medicamento_val").val('0');
    $("#txt_Medicamento").val("");
    $("#cbo_MedicamentoMed").val("");
    $("#cbo_MonodrogaMed").val('0');
    $("#cantidadMed").val('');
    $("#precioMed").val('');
    $("#subtotalMed").val('');
    $("#porcentajeMed").val('100');
    $("#chkFacturadoMed").removeAttr("checked");
    $("#chkEstadisticasMed").removeAttr("checked");
    $("#chkAPEMed").removeAttr("checked");
    Editando_Med = 0;
    EditandoPos_Med = -1;
}

$("#btnCancelarMed").click(function () {
    LimpiarCampos();
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// FIN OPERACIONES DE MEDICAMENTOS//////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////Descartables///////////////////////////////////////////////


function LoadDataDesc() {
    var objDescartable = {};
    objDescartable.Facturarlo = $("#chkFacturado_desc").is(":checked");
    objDescartable.Estadisticas = $("#chkEstadisticas_desc").is(":checked");
    objDescartable.APE = $("#chkAPE_desc").is(":checked");
    objDescartable.Ambulatorio = $("#rdAmbu").is(":checked");
    objDescartable.Internacion = !$("#rdAmbu").is(":checked");

    objDescartable.Descripcion = $("#txt_Descartable").val(); //Nombre
    objDescartable.InsumoId = $("#Descartable_val").val(); //Id

    objDescartable.Cantidad = $("#cantidad_desc").val();
    objDescartable.Precio = $("#precio_desc").val();
    objDescartable.FechaPractica = $("#fechaprac_desc").val();
    objDescartable.Total = $("#subtotal_desc").val();
    objDescartable.Porcentaje = $("#porcentajeDesc").val();
    objDescartable.Estado = 1;
    return objDescartable;
}

function ValidarDesc() {
    if ($("#Descartable_val").val() == "0") { alert("Ingrese Medicamento."); return false; }
    if ($("#txt_Descartable").val().trim().length == 0) { alert("Ingrese Medicamento."); return false; }
    if ($("#cantidad_desc").val().trim().length == 0) { alert("Ingrese Cantidad."); return false; }
    if ($("#precio_desc").val().trim().length == 0) { alert("Ingrese Total."); return false; }
    if ($("#fechaprac_desc").val().trim().length == 0) { alert("Ingrese Fecha."); return false; }
    return true;
}

$("#btnAgregarDesc").click(function () {
    if (!ValidarDesc()) return false;
    var Cual = Total_1;
    if (Editando_1 == 1) {
        Cual = EditandoPos_1;
    }
    else {
        Total_1 = Total_1 + 1;
        Cual = Total_1;
    }
    objDescartables[Cual] = LoadDataDesc();
    RenderizarTabla_desc();
    LimpiarCampos_desc();
});

function RenderizarTabla_desc() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;font-size:11px;'><thead><tr><th></th><th>Descripcion</th><th>Cantidad</th><th>Importe</th><th>%</th><th>Total</th></tr></thead><tbody>";
    var Contenido = "";
    for (var i = 0; i <= Total_1; i++) {
        if (objDescartables[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='EditarDesc" + i + "' onclick='Editar_desc(" + i + ");' class='btn btn-mini' title='Editar Descartable'><i class='icon-edit'></i></a><a id='ElminarDesc" + i + "'onclick='Eliminar_desc(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Descartable'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objDescartables[i].Descripcion + " </td><td> " + objDescartables[i].Cantidad + " </td><td> $" + objDescartables[i].Precio + " </td><td> " + objDescartables[i].Porcentaje + " </td><td> $" + objDescartables[i].Total + " </td></tr>";
        }
    }
    var Pie = "</tbody></table>";
    $("#Tabla_Medicamentos_Desc").html(Encabezado + Contenido + Pie);
}

function Editar_desc(Nro) {
    Editando_1 = 1;
    EditandoPos_1 = Nro;
    $("#cbo_Descartable").attr("disabled", "disabled");
    $("#cbo_Descartable").val(objDescartables[Nro].Descripcion);
    $("#txt_Descartable").val(objDescartables[Nro].Descripcion); //Nombre
    $("#Descartable_val").val(objDescartables[Nro].InsumoId); //Id
    $("#cantidad_desc").val(objDescartables[Nro].Cantidad);
    $("#precio_desc").val(objDescartables[Nro].Precio);
    $("#fechaprac_desc").val(objDescartables[Nro].FechaPractica);
    $("#subtotal_desc").val(objDescartables[Nro].Total);
    $("#porcentajeDesc").val(objDescartables[Nro].Porcentaje);
    if (objDescartables[Nro].Facturarlo)
        $("#chkFacturado_desc").attr("checked", "checked");
    if (objDescartables[Nro].Estadisticas)
        $("#chkEstadisticas_desc").attr("checked", "checked");
    if (objDescartables[Nro].APE)
        $("#chkAPE_desc").attr("checked", "checked");
}

function Eliminar_desc(Nro) {
    objDescartables[Nro].Estado = 0;
    RenderizarTabla_desc();
    objDescartables = $.grep(objDescartables, function (value) {
        return value.Estado != 0;
    });
    Total_1 = Total_1 - 1;
}

$("#precio_desc").blur(function () {
    if ($("#cantidad_desc").val() != null && $("#cantidad_desc").val() != undefined) {
        var desc = Calcular_Descuento($("#porcentajeDesc").val());
        var tot = parseFloat($("#precio_desc").val()) * parseFloat($("#cantidad_desc").val()) * desc;
        $("#subtotal_desc").val(tot.toFixed(2));
    }
    else $("#subtotal_desc").val('');
});

$("#cantidad_desc").blur(function () {
    if ($("#precio_desc").val() != null && $("#precio_desc").val() != undefined) {
        var desc = Calcular_Descuento($("#porcentajeDesc").val());
        var tot = parseFloat($("#precio_desc").val()) * parseFloat($("#cantidad_desc").val()) * desc;
        $("#subtotal_desc").val(tot.toFixed(2));
    }
    else $("#subtotal_desc").val('');
});

function LimpiarCampos_desc() {
    $("#cbo_Descartable").removeAttr("disabled");
    $("#cbo_Descartable").val('');
    $("#txt_Descartable").val(''); //Nombre
    $("#Descartable_val").val('0'); //Id
    $("#cantidad_desc").val('');
    $("#precio_desc").val('');
    $("#subtotal_desc").val('');
    $("#porcentajeDesc").val('100');
    $("#chkFacturado_desc").removeAttr("checked");
    $("#chkEstadisticas_desc").removeAttr("checked");
    $("#chkAPE_desc").removeAttr("checked");
    Editando_1 = 0;
    EditandoPos_1 = -1;
}

$("#btnCancelarDesc").click(function () {
    LimpiarCampos_desc();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////Guardar Datos//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#btnConfirmar").click(function () {
    $("#btnConfirmar").attr("disabled", true);
    if (NroParte > 0) DeleteDetalles(); //Es modificacion
    else InsertarCabeceraParte(); //Nuevo parte
});

function LoadDatosCabeceraParte() { //Cargo cabecera de parte.
    var f = {};
    f.NroParte = NroParte;
    f.Fecha = $("#txtFechaCarga").val();
    f.NHC = $("#afiliadoId").val();
    f.InstitucionId = Seccional_Id;
    f.CentroId = $("#cbo_Centro :selected").val();
    f.Internacion = $("#rdInt").is(":checked");
    f.Ambulatorio = $("#rdAmbu").is(":checked");
    if (f.Ambulatorio) f.NroInternacion = 0;
    if (f.Internacion) f.NroInternacion = $("#NroInt").html();
    return f;
}

function InsertarCabeceraParte() { //Se inserta cabecera en BD
    var json = JSON.stringify({ "f": LoadDatosCabeceraParte() });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/InsertParteCab",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: InsertParteCab_Cargado,
        error: errores
    });
}

///Guardo las practicas, Medicamentos, Medicos asoc a prac.
function InsertParteDetalles() {
    var json = JSON.stringify({ "objPracticas": objPracticas, "NroParte": NroParte, "MedCab": LoadDataCabeceraMed(), "objDescartables": objDescartables,
        "objMedicamentos": objMedicamentos, "objMedicos": objMedicos
    });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/InsertParteDet",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            //alert("Parte Cargado Correctamente");
            if (S == 0)
                window.location = "CargaPracticasMedicasHC.aspx";
            else parent.$.fancybox.close();
        },
        error: errores
    });
}

function ValidarCabeceraMed() {
    if (NroParte <= 0) { alert("Nro. de Parte no válido."); return false; }
    if (objPracticas.length == 0) { alert("No se puede guardar un parte sin prácticas."); return false; }
    return true;
}

function InsertParteCab_Cargado(Resultado) {
    NroParte = Resultado.d;
    InsertParteDetalles();
}


function DeleteDetalles() { //Borro todos los detalles y actualizo la cabecera, luego inserto detalles nuevos. (Es modificacion)
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/DeleteParteDet",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            InsertarCabeceraParte();
        },
        error: errores
    });
}

function LoadDataCabeceraMed() {
    var MedCab = {};
    MedCab.NroParte = NroParte;
    MedCab.FechaParte = $("#txtFechaCarga").val();
    MedCab.FechaRendicion = $("#CargadoRendicion").val();
    MedCab.NHC = $("#afiliadoId").val();
    return MedCab;
}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////FIN Guardar Datos//////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("#rdInt").change(function () {
    if ($("#rdInt").is(":checked")) {
        $("#txtNroInt").show();
        $("#desdeaqui").hide();
        CargarNroInternacion($("#txtNHC").val());
    }
    else {
        $("#txtNroInt").hide();
        $("#desdeaqui").show();
        $("#NroInt").html('0');
        $("#FechaIng").html('');
        $("#FechaEgr").html('');
        servicio = 0;
    }
});

$("#rdAmbu").change(function () {
    if ($("#rdAmbu").is(":checked")) {
        $("#txtNroInt").hide();
        $("#desdeaqui").show();
        $("#NroInt").html('0');
        $("#FechaIng").html('');
        $("#FechaEgr").html('');
        servicio = 0;
    }
    else {
        $("#txtNroInt").show();
        $("#desdeaqui").hide();
        CargarNroInternacion($("#txtNHC").val());
    }
});

function CargarNroInternacion(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/NroInternacionbyNHC",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarNroInternacion_Cargado,
        error: errores
    });

}

function CargarNroInternacion_Cargado(Resultado) {
    var Nro = Resultado.d;
    if (Nro > 0 && !Err) {
        $("#txtNroInt").val(Nro);
        $("#txtNroInt").attr("disabled", true);
        $("#desdeaqui").show();
        $("#div_radios").show();
        DatosInternacion();
    }
    if (!Err) {
        if (Nro == 0) {
            Err = true;
            alert("La Internación tiene un parte asociado.");
            $("#txtNroInt").val('');
            $("#txtNroInt").attr("disabled", true);
            $("#desdeaqui").hide();
            $("#div_radios").hide();
            $("#txtDNI").attr("disabled", true);
            $("#txtNHC").attr("disabled", true);
        }
    }
}

function LoadCabeceraMedicamentos() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/List_Medicamentos_Cab",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadCabeceraMedicamentos_Cargado,
        error: errores
    });
}

function LoadCabeceraMedicamentos_Cargado(Resultado) {
    var Cabecera = Resultado.d;
    if (Cabecera != null) {
        $("#fecharendicion").val(Cabecera.FechaRendicion);
        LoadDetalles();
        LoadDetallesDesc();
        Existe = 1;
    }
}

function LoadDetalles() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/List_Medicamentos_Det",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadDetalles_Cargado,
        error: errores
    });
}

function LoadDetalles_Cargado(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%; font-size:11px;'><thead><tr><th></th><th>Medicamento</th><th>Monodroga</th><th>Cantidad</th><th>Importe</th><th>%</th><th>Total</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Lista, function (index, Detalle) {
        var desc = Calcular_Descuento(Detalle.Porcentaje);
        var Tot = Detalle.Precio * Detalle.Cantidad * desc;
        objMedicamentos[i] = Detalle;
        objMedicamentos[i].Total = Tot.toFixed(2);
        objMedicamentos[i].Estado = 1;
        Contenido = Contenido + "<tr><td><a id='EditarMed" + i + "' onclick='EditarMed(" + i + ");' class='btn btn-mini' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='ElminarMed" + i + "'onclick='EliminarMed(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Medicamento_Nombre + " </td><td> " + objMedicamentos[i].Monodroga_Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> $" + objMedicamentos[i].Precio + " </td><td> " + objMedicamentos[i].Porcentaje + " </td><td> $" + objMedicamentos[i].Total + " </td></tr>";
        Total_Med = Total_Med + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

function LoadDetallesDesc() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/List_Descartables_Det",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadDetallesDesc_Cargado,
        error: errores
    });
}

function LoadDetallesDesc_Cargado(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;font-size:11px;'><thead><tr><th></th><th>Descripcion</th><th>Cantidad</th><th>Importe</th><th>%</th><th>Total</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Lista, function (index, Detalle) {
        var Tot = Detalle.Precio * Detalle.Cantidad;
        objDescartables[i] = Detalle;
        objDescartables[i].Total = Tot;
        objDescartables[i].Estado = 1;
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar_desc(" + i + ");' class='btn btn-mini' title='Editar Descartable'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar_desc(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Descartable'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objDescartables[i].Descripcion + " </td><td> " + objDescartables[i].Cantidad + " </td><td> $" + objDescartables[i].Precio + " </td><td> " + objDescartables[i].Porcentaje + " </td><td> $" + objDescartables[i].Total + " </td></tr>";
        Total_1 = Total_1 + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#Tabla_Medicamentos_Desc").html(Encabezado + Contenido + Pie);
}


//$("#tabPrac").click(function () {
//    //$("#TablaMedicos").hide();
//    $("#TablaPracticas").show();
//});

//$("#tabCab").click(function () {
//    //$("#TablaMedicos").hide();
//    $("#TablaPracticas").show();
//});

$("#btnImprimir").click(function () {
    var url = "../Impresiones/ImpresionRendicionIndInt_Cap.aspx?Id=" + Id;
    Ventana(url);
});


$(".fecha").keydown(function () {
    if ($(this).val().trim().length == 6) {
        var str = $(this).val().trim();
        $(this).val($(this).val().substring(0, 4) + "20" + str.substring(4, 7));
        str = $(this).val().substring(0, 2) + "/" + $(this).val().substring(2, 4) + "/" + $(this).val().substring(4, 8);
        $(this).val(str);
    }
});