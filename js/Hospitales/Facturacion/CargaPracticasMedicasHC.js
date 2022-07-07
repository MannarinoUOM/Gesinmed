var objPractica = Array();
var objPracticas2 = Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var objPracticas = new Array();
var Seccional_Id;
var Id = 0;
var OS = 0;
var Guardar = 0;
var servicio;
var Err = false;
var Ambu = true;
var Importe = 0;

var objMedicamentos = Array();
var objMedicamentos2 = Array();
var Total_Med = -1;
var Editando_Med = 0;
var EditandoPos_Med = 0;
var objDescartables = Array();
var objDescartables2 = Array();
var Total_1 = -1;
var Editando_1 = 0;
var EditandoPos_1 = 0;
var Existe = 0;

var objMedicos = Array();
var TotalMedicos = -1;
var EditandoMedicos = 0;
var EditandoPosMedicos = 0;

$.validator.setDefaults({
    ignore: ""
});



$(document).ready(function () {
    $("#frm_Inicio").validate({
        rules: {
            'txtNroParte': { number: true },
            'txtFechaCarga': { required: true, dateES: true },
            'txtNHC': { required: true, number: true },
            'txtDNI': { required: true, number: true },
            'txtPaciente': { required: true },
            'txtNomencla': {required: true }
        },
        messages: {
            'txtNroParte': { number: '' },
            'txtFechaCarga': { required: '', dateES: '' },
            'txtNHC': { required: '', number: '' },
            'txtDNI': { required: '', number: '' },
            'txtPaciente': { required: '' },
            'txtNomencla': { required: '' }

        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    $("#frm_Internacion").validate({
        rules: {
            'fechapractica': { required: true, dateES: true },
            'fecharendicion': { required: true, dateES: true },
            'cantidad': { required: true, number: true, range: [1, 999] },
            'porcentaje': { required: true, number: true },
            'precio': { required: true, number: true },
            'total': { required: true, number: true },
            'txtPrecioHono': { required: true},
            'codigo': { required: true, number: true }
        },
        messages: {
            'fechapractica': { required: '', dateES: '' },
            'fecharendicion': { required: '', dateES: '' },
            'cantidad': { required: '', number: '', range: '' },
            'porcentaje': { required: '', number: '' },
            'precio': { required: '', number: '' },
            'total': { required: '', number: '' },
            'txtPrecioHono': { required: ''},
            'codigo': { required: '', number: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });

    $("#frm_Medicamentos").validate({
        rules: {
            'cantidadMed': { required: true, number: true, range: [1, 999] },
            'precioMed': { required: true, number: true },
            'subtotalMed': { required: true, number: true },
            'fechapracMed': { required: true, dateES: true }
        },
        messages: {
            'cantidadMed': { required: '', number: '', range: '' },
            'precioMed': { required: '', number: '' },
            'subtotalMed': { required: '', number: '' },
            'fechapracMed': { required: '', dateES: '' }

        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });

    $("#frm_Descartables").validate({
        rules: {
            'cantidad_desc': { required: true, number: true, range: [1, 999] },
            'precio_desc': { required: true, number: true },
            'subtotal_desc': { required: true, number: true },
            'fechaprac_desc': { required: true, dateES: true }
        },
        messages: {
            'cantidad_desc': { required: '', number: '', range: '' },
            'precio_desc': { required: '', number: '' },
            'subtotal_desc': { required: '', number: '' },
            'fechaprac_desc': { required: '', dateES: '' }

        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }

    });
    InitControls();
    var Query = {};
    Query = GetQueryString();
    if (Query['NHC'] != null) {
        Cargar_Paciente_NHC(Query['NHC']);
    }
    if (Query['Id'] != null) {
        Id = Query['Id'];
        CargarCabecera();
        EstaProcesadoParte();
        InitControls_DetPartes();
        $("#btnBaja").show();
        $("#btnImprimir").show();
    }
});

    $("#btnBuscarPaciente").fancybox({
        'hideOnContentClick': true,
        'width': '75%',
        'height': '75%',
        'href': '../Turnos/BuscarPacientes.aspx?Express=0&Apellido=' + $("#txtPaciente").val().trim(),
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

$("#rdInt").change(function () {
    if ($("#rdInt").is(":checked")) {
        $("#txtNroInt").show();
        Ambu = false;
        CargarNroInternacion($("#txtNHC").val());
    }
    else {
        $("#txtNroInt").hide();
        $("#desdeaqui").show();
        $("#NroInt").html('0');
        $("#FechaIng").html('');
        $("#FechaEgr").html('');
        servicio = 0;
        Ambu = true;
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
        Ambu = true;
    }
    else {
        $("#txtNroInt").show();
        CargarNroInternacion($("#txtNHC").val());
        Ambu = false;
    }
});

$('#horapractica').change(function () {

    ErrorHora = false;
    var hora = $('#horapractica').val();
    if ($('#horapractica').val().length == 5) {

        var h1 = hora.charAt(0);
        var h2 = hora.charAt(1);
        var dp = hora.charAt(2);
        var m1 = hora.charAt(3);

        if ((h1 == 2 && h2 > 3) || (h1 > 2)) { ErrorHora = true; }
        if (m1 > 5) { ErrorHora = true; }
        if (dp != ":") { ErrorHora = true; }
        if (ErrorHora) {
            $('#horapractica').val("");
        }
    }
});

$('#btnactualizar').click(function () {
    var tel = $("#CargadoTelefono").html().trim();
    if ($("#CargadoTelefono").html().trim().length == 0) tel = "11111111";
    Actualizar_Telefono_Seccional(tel, 998, $('#txtDNI').val());
});

function Actualizar_Telefono_Seccional(Telefono, Seccional, Documento) {
    var Cod_OS = $("#cbo_Institucion :selected").val();
    $.ajax({
        type: "POST",
        url: "../Json/Gente.asmx/Actualizar_Telefono_Seccional",
        data: '{Telefono: "' + Telefono + '", Seccional: "' + Seccional + '", Documento: "' + Documento + '", CodOs: "' + Cod_OS + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Actualizado_Telefono_Documento,
        error: errores
    });
}


function Actualizado_Telefono_Documento(Resultado) {
    if (Resultado.d == '1') {
        alert('Obra Social actualizada');
        document.location = "CargaPracticasMedicasHC.aspx?NHC="+$("#txtNHC").val();
    }
}

$("#cbo_Nomencla").change(function () {
    $("#txtNomencla").val($("#cbo_Nomencla :selected").val());
});




function InitControls() {
    List_Seccionales();
    List_ObraSociales(false);
    List_Centro();
    CargarMedicoInvolucrados();
    $("#horapractica").mask("99:99", { placeholder: "-" });
    $("#txtNroParte").val("Provisorio");
    $("#txtFechaCarga").val(FechaActual());
    $("#txtFechaCarga").mask("99/99/9999", { placeholder: "-" });
    $("#txtNHC").mask("9999999999?9", { placeholder: "-" });
    $("#txtCodigoMed").mask("9?999999999", { placeholder: "" });
    $("#txtDNI").mask("9999999?9", { placeholder: "-" });
    $("#txtNroParte").mask("9?9999999", { placeholder: "" });
    $("#txtFechaCarga").datepicker();
    $("#fechapractica").datepicker();
    $("#fechapractica").mask("99/99/9999", { placeholder: "-" });
    $("#fecharendicion").val(FechaActual());
    $("#fecharendicion").datepicker();
    $("#fecharendicion").mask("99/99/9999", { placeholder: "-" }); 
    $("#fechapracMed").datepicker();
    $("#fechapracMed").mask("99/99/9999", { placeholder: "-" }); 
    $("#fechaprac_desc").datepicker();
    List_NomenclaSN();
    $("#btnConfirmar").attr("disabled",true);
}

$('#cbo_Modulo').change(function () {
    $("#codigo").val($('#cbo_Modulo :selected').val());
    ValorModulo();
});


$("#btnBaja").click(function () {
    if (confirm("¿Desea dar de baja la rendicion?")) {
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
    }
});

function EstaFacturadoParte(){
      var json = JSON.stringify({ "NroParte": Id });
        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/Facturacion/Facturacion.asmx/FACT_ESTA_FACTURADO_NROREND",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                //Nulo si no esta fac, caso contrario, retorna nro fact.
                if (Resultado.d.length > 0) {
                    $("#NroFactura").html("Nro. Factura: " + Resultado.d);
                    $("#NroFactura").show();
                    $(".modifica").hide();
                }
                else {
                    $("#NroFactura").html('');
                    $("#NroFactura").hide();
                    $(".modifica").show();
                }
            },
            error: errores
        });
}

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
        alert("Parte Dado de baja");
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
        beforeSend: function () {
            $("#cont_").hide();
            $("#cargando").show();
            $("#btnImprimir").show();
            $("#btnBaja").show();
        },
        success: ListPartesCab_Cargado,
        error: errores
    });
}

function ListPartesCab_Cargado(Resultado) {
    var Cabecera = Resultado.d;
    if (Cabecera != null) {
        $("#txtNroParte").val(Cabecera.NroParte);
        $("#txtFechaCarga").val(Cabecera.Fecha);
        $("#txtNroOrdenInt_Carpeta").val(Cabecera.NroOrdenCarpeta);
        $("#txtObservaciones").val(Cabecera.Observaciones);
        $("#txtNHC").val(Cabecera.NHC);
        Cargar_Paciente_NHC(Cabecera.NHC);
        $("#cbo_Centro").val(Cabecera.CentroId);
        OS = Cabecera.InstitucionId;
        Ambu = Cabecera.Ambulatorio;
        $("#txtNomencla").val(Cabecera.Nomenclador);
        $('#cbo_Nomencla').val($("#txtNomencla").val());
        if (Cabecera.Ambulatorio)
            $("#rdAmbu").attr("checked", "checked");
        else if (Cabecera.Internacion) {
            alert("Internacion");
            $("#txtNroInt").val(Cabecera.NroInternacion);
            $("#txtNroInt").show();
            if ($("#txtNroInt").val().length > 0) {
                DatosInternacion();
                $("#NroInt").html($("#txtNroInt").val());
            }
        }
        $("#CargadoCentro").html($("#cbo_Centro :selected").text());
        $("#CargadoInstitucion").html($("#cbo_Institucion :selected").text().substr(0, 53));
        CargarDetalles();
        ListHonorariosMedicos();
        LoadCabeceraMedicamentos();
    }
}

function ListHonorariosMedicos() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/List_Fact_MedicosHono_by_Parte",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Fact_MedicosHono_by_Parte_Cargado,
        error: errores
    });
}

function List_Fact_MedicosHono_by_Parte_Cargado(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Médico</th><th>Práctica/Módulo</th><th>Honorario</th><th>Honorario OS</th><th>Honorario Pac</th><th>Tipo</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Lista, function (index, Detalle) {
        HonoOS = (parseFloat(Detalle.Porcentaje) / 100) * Detalle.Honorario;
        HonoPac = Detalle.Honorario - HonoOS;
        Contenido = Contenido + "<tr><td><a id='EditarMedico" + i + "' onclick='EditarMedico(" + i + ");' class='btn btn-mini' title='Editar Medico'><i class='icon-edit'></i></a><a id='ElminarMedico" + i + "'onclick='EliminarMedico(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Medico'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Medico + " </td><td> " + Detalle.PracticaId + " </td><td> $" + Detalle.Honorario + " </td><td> $" + HonoOS + " </td><td> $" + HonoPac + " </td><td> " + Detalle.Tipo + " </td></tr>";
        objMedicos[i] = Detalle;
        objMedicos[i].Estado = 1;
        TotalMedicos = TotalMedicos + 1;
        i = i + 1;
    });

    var Pie = "</tbody></table>";
    $("#TablaMedicos").html(Encabezado + Contenido + Pie);
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
            $("#ImporteTotal").html("Importe Total: $" + formatoMoneda(parseFloat(Importe)));
            $("#CantidadTotal").html("Items: " + parseInt(Total + 1));
        },
        error: errores
    });
}


function Calcular_Descuento2(e) {
    Descuento = parseFloat(e);
    var porc = parseFloat(100);
    var desc = (porc - Descuento) / porc;
    return desc;
}

function ListPartesDet_Cargado(Resultado) {
    $("#cont_").show();
    $("#cargando").hide();
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>F.Práctica</th><th>F.Rendición</th><th>Tipo</th><th>Fact</th><th>Cant</th><th>Código</th><th>Práctica</th><th>%</th><th>Imp. Unit</th><th>Imp. Total</th></tr></thead><tbody>";
    var Contenido = "";
    var i = objPracticas.length;
    Importe = 0;
    $.each(Lista, function (index, Detalle) {
        tipo = ''; fact = 'N';
        if (Detalle.Ambulatorio) tipo = 'A';
        else tipo = 'I';
        if (Detalle.Facturarlo) fact = 'S';

        var desc = Calcular_Descuento2(Detalle.Porcentaje);
        Detalle.Precio = parseFloat((100 * parseFloat(Detalle.Precio)) / parseInt(Detalle.Porcentaje)).toFixed(2);
        Detalle.Total = parseFloat(Detalle.Precio * desc).toFixed(2);
        Importe = parseFloat(Importe) + parseFloat(Detalle.Total);
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini modifica' title='Editar Practica'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger modifica' title='Quitar Practica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.FechaPractica + " </td><td> " + Detalle.FechaRendicion + " </td><td> " + tipo + " </td><td> " + fact + " </td><td style='text-align:right;'> " + Detalle.Cantidad + " </td><td> " + Detalle.PracticaId + " </td><td> " + Detalle.Prac_Nombre + " </td><td style='text-align:right;'> " + Detalle.Porcentaje + " </td><td style='text-align:right;'> $" + formatoMoneda(parseFloat(Detalle.Precio / Detalle.Cantidad)) + " </td><td style='text-align:right;'> $" + formatoMoneda(parseFloat(Detalle.Total)) + " </td></tr>";
        objPracticas[i] = Detalle;
        objPracticas2[i] = Detalle;
        objPracticas[i].Estado = 1;
        Total = Total + 1;
        i = i + 1;
    });
    
    var Pie = "</tbody></table>";
    $("#TablaPracticas").html(Encabezado + Contenido + Pie);
}

function Calcular_Descuento2 (Descuento){
    var d = parseFloat(Descuento);
    var porc = parseFloat(100);
    var desc = d / porc;
    return desc;
}

function List_Servicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/List_Servicios",
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
        if (servicio == Servicio.id) $('#cbo_Servicio').val(servicio);
    });
}

function List_NomenclaSN() {
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/ListNomencladoresSN",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_NomenclaSN_Cargado,
        error: errores
    });
}

function List_NomenclaSN_Cargado(Resultado) {
    var Nomencladores = Resultado.d;
    $.each(Nomencladores, function (index, Nomencla) {
        $('#cbo_Nomencla').append(
              $('<option></option>').val(Nomencla.Fecha).html("Nomenclador hasta: " + Nomencla.Fecha)
            );
    });
}

function ListarPracticas() {
    //var json = JSON.stringify({ "OS": $("#cbo_Institucion :selected").val()});
    var json = JSON.stringify({ "Codigo": 0, "Id":  0});
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/Lista_Practicas_Facturacion_por_OS",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Practicas_Listadas,
        error: errores
    });
}

function Practicas_Listadas(Resultado) {
    var Practicas = Resultado.d;
    $('#cbo_Practica').empty();
    $('#cbo_Practica').append($('<option></option>').val('0').html('Seleccione Práctica'));
    $.each(Practicas, function (index, Practica) {
        $('#cbo_Practica').append(
              $('<option></option>').val(Practica.Codigo).html(Practica.Practica + "-" + Practica.Codigo)
            );
       if (Practica.Codigo == $("#codigo").val()) $('#cbo_Practica').val($("#codigo").val());
    });
}

$("#codigo").change(function () {
    if ($("#codigo").val().length > 0)
        if ($("#rdPractica").is(":checked")) {
            $("#cbo_Practica").val($("#codigo").val());
            ValorSN(); //ValorPractica();
        }
        else {
            $("#cbo_Modulo").val($("#codigo").val());
            ValorModulo();
        }
});

$("#cbo_Practica").change(function () {
    $("#codigo").val($("#cbo_Practica :selected").val());
    if ($("#rdPractica").is(":checked"))
        ValorSN(); //ValorPractica();
    else ValorModulo();
});

$("#codigo").blur(function () {
    if ($("#codigo").val().length > 0)
        if ($("#rdPractica").is(":checked")) {
            $("#cbo_Practica").val($("#codigo").val());
            ValorSN(); //ValorPractica();
        }
        else {
            $("#cbo_Modulo").val($("#codigo").val());
            ValorModulo();
        }
});


function List_Medicos() {
    var json = JSON.stringify({ "Apellido": null, "MN": null, "MP": null, "objBusquedaLista": null });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/MedicoBuscar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Cargado,
        error: errores
    });
}

function List_Medicos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Medicos").append($("<option></option>").val('0').html(""));
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        $("#cbo_MedicoInv").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
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
    $("#cbo_Medicos").empty();
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
});

function MedicosporEsp_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Medicos").empty();
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medicos").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });
}

function CargarMedicoInvolucrados() {
    var json = JSON.stringify({ "Especialidad": 0});
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarMedicoInvolucrados_Cargado,
        error: errores
    });
}

function CargarMedicoInvolucrados_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_MedicoInv").empty();
    $.each(Lista, function (index, Medico) {
        $("#cbo_MedicoInv").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });
}

function ListModulos() {
    var json = JSON.stringify({"OS": $("#cbo_Institucion :selected").val()});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/List_Modulos_SN_por_OS",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ListModulos_Cargado,
        error: errores
    });
}

function ListModulos_Cargado(Resultado) {
    var Modulos = Resultado.d;
    $("#cbo_Modulo").empty();
    $("#cbo_Modulo").append($("<option></option>").val('').html("Seleccione Modulo..."));
    $.each(Modulos, function (index, Modulo) {
        $("#cbo_Modulo").append($("<option></option>").val(Modulo.Codigo).html(Modulo.Descripcion + "-" + Modulo.Codigo));
        if ($("#codigo").val() == Modulo.Codigo) $("#cbo_Modulo").val(Modulo.Codigo);
    });
}


$("#rdModulo").click(function () {
    ListModulos();
    List_Medicos();
    $("#controlcbo_Modulo").show(); $("#controlcbo_Practica").hide();
    var obj = document.getElementById('tabPrac');
    obj.innerHTML = "Módulo";
});

function List_Seccionales() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Seccionales_Cargado,
        error: errores
    });
}

function List_Seccionales_Cargado(Resultado) {
    var Lista = Resultado.d;
    
    $.each(Lista, function (index, Seccional) {
        $("#cbo_Seccional").append($("<option></option>").val(Seccional.Nro).html(Seccional.Seccional));
        if (Lista.length - 1 == index) $("#btnBuscar").show();
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


$("#cantidad").blur(function () {
    $("#controlcantidad").removeClass("error");
});

$("#descuento").blur(function () {
    $("#controldescuento").removeClass("error");
});

$("#txtDNI").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txtDNI').attr('readonly') == undefined) {
            Cargar_Paciente_Documento($("#txtDNI").val());
        }

    }
});

$("#txtDNI").blur(function () {
    Cargar_Paciente_Documento($("#txtDNI").val());
});

$("#txtNHC").blur(function () {
    Cargar_Paciente_NHC($("#txtNHC").val());
});

$("#txtNHC").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txtNHC').attr('readonly') == undefined) {
            Cargar_Paciente_NHC($("#txtNHC").val());
        }

    }
});

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC",
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
    $("#rdAmbu").attr("checked", true);
    $("#rdInt").attr("checked", false);
    $("#txtNroInt").hide();
    $.each(Paciente, function (index, paciente) {
        $('#btnactualizar').show();
        $("#txtDNI").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);
        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


        var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
        if (AnioNacimiento.getFullYear() == 0) {
            edad = S / FN;
        }
        $("#CargadoEdad").html(edad);
        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtDNI").attr('value', paciente.documento);
        $("#txtNHC").attr('value', paciente.NHC);
        Seccional_Id = paciente.Nro_Seccional;
        $("#cbo_Seccional").val(Seccional_Id);
        $("#cbo_Seccional").attr('disabled', 'disabled');
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoTelefono").html(paciente.Telefono);
        if (Seccional_Id != 998)
            $("#CargadoSeccional").html(paciente.Seccional);
        else $("#CargadoSeccional").html(paciente.ObraSocial);
        if (OS == 0)
            OS = paciente.OSId;
        List_ObraSociales(true);
        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.cuil);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
        $("#btnOtroPaciente").show();
        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
        }

    });

}

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
    var Nro  = Resultado.d;
    if (Nro > 0) {
        $("#desdeaqui").show();
        $("#div_radios").show();
        DatosInternacion();
    }
}

function Cargar_Paciente_Documento(Documento) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}



function ExisteItem(Algo) {
    for (var i = 0; i <= objPracticas.length - 1; i++) {
        if (objPracticas[i].PracticaId == Algo && objPracticas[i].Estado == 1 && Editando != 1) {
            alert("Ya ha cargado la Practica Nro: " + Algo);
            LimpiarCamposP();
            return true;
        }
    }
    return false;
}

function LimpiarCamposP() {
    $("#cantidad").val('1');
    $("#porcentaje").val('100');
    $("#codigo").val('');
    $("#codigo").focus();
    $("#cbo_Practica").val('0');
    $("#txtModulo").val('');
    $("#precio").val('');
    $("#total").val('');
    $("#txtPrecioHono").val('0');
    $("#PrecioHono").hide();
    $("#chkFacturado").attr("checked", true);
    $("#chkHonorarios").removeAttr("checked", "");
    $("#chkAPE").removeAttr("checked", "");
    $("#rdModulo").removeAttr("checked", "");
    $("#rdPractica").removeAttr("checked", "");
    $("#btnAgregar").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelar").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    $("#codigo").removeAttr("disabled");
    $("#cbo_Practica").removeAttr("disabled");
    $("#rdPractica").attr("checked", "checked");
    ListarPracticas();
    $("#tabMedicos").hide();
    //$('#controlcbo_Especialidad').show();
    $('#cbo_ModulosEnc').removeAttr("disabled");
    $('#controlcbo_ModulosEnc').hide();
    $('#controlcbo_Practica').show();
    $('#controlcbo_Modulo').hide();
    $("#txtModulo").removeAttr("disabled");
    var obj = document.getElementById('tabPrac');
    obj.innerHTML = "Práctica";
}

function Calcular_Descuento(porcentaje) {
    Descuento = parseFloat(porcentaje);
    var porc = parseFloat(100);
    var desc = Descuento / porc;
    return desc;
}

$("#chkHonorarios").change(function () {
    if ($("#chkHonorarios").is(":checked")) {
        CargarValorHono();
        $("#PrecioHono").show();
    }
    else {
        $("#PrecioHono").hide();
        //$("#txtPrecioHono").val('0');
    }
});

$("#btnAgregar").click(function () {
    if ($("#frm_Internacion").valid()) {
        objPractica = {};
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
        if ($("#NroOrden").val().trim().length > 0)
            objPractica.NroOrden = $("#NroOrden").val();
        else objPractica.NroOrden = 0;
        objPractica.HoraPractica = $("#horapractica").val();
        if (objPractica.Practica) {
            objPractica.Prac_Nombre = $("#cbo_Practica :selected").text();
        }
        else {
            objPractica.Prac_Nombre = $("#cbo_Modulo :selected").text();
            objPractica.ModuloEnc = $("#cbo_ModulosEnc :selected").val();
        }
        objPractica.Precio = parseFloat($("#precio").val()).toFixed(2);
        objPractica.Total = parseInt($("#cantidad").val()) * $("#precio").val() * desc;
        objPractica.Total = parseFloat(objPractica.Total).toFixed(2);
        if ($("#chkFacturado").is(":checked"))
            objPractica.Facturarlo = true;
        else objPractica.Facturarlo = false;
        //objPractica.PrecioHonorario = "0";
        objPractica.PrecioHonorario = $("#txtPrecioHono").val().replace(",", ".");
        if ($("#chkHonorarios").is(":checked")) {
            objPractica.Honorarios = true;
            objPractica.PrecioHonorario = $("#txtPrecioHono").val().replace(",", ".");
        }
        else objPractica.Honorarios = false;
        if ($("#chkAPE").is(":checked"))
            objPractica.APE = true;
        else objPractica.APE = false;
        var Estado = 1;
        var Cual = Total;
        if (Editando == 1) {
            objPractica.Prac_Nombre = objPracticas[EditandoPos].Prac_Nombre;
            objPractica.SubPracticaId = objPracticas[EditandoPos].SubPracticaId;
            Cual = EditandoPos;
        }
        else {
            Total = Total + 1;
            Cual = Total;
        }
        objPractica.Estado = Estado;
        objPractica.Detalle = Cual;
        objPractica.PrecioHonorario = parseFloat($("#txtPrecioHono").val().replace(",", "."));
        objPracticas[Cual] = objPractica;
        RenderizarTablaP();
        LimpiarCamposP();
        Editando = 0;
        EditandoPos = -1;
        $("#btnConfirmar").removeAttr("disabled");
    }
});

$("#cantidad").blur(function () {
    if ($("#precio").val() != null && $("#precio").val() != undefined && $("#porcentaje").val() != null && $("#porcentaje").val() ) {
        var desc = Calcular_Descuento($("#porcentaje").val());
        var tot = parseFloat($("#precio").val()) * parseFloat($("#cantidad").val()) * desc;
        $("#total").val(tot.toFixed(2));
    }
    else $("#total").val('');
});

$("#porcentaje").blur(function () {
    if ($("#precio").val() != null && $("#precio").val() != undefined && $("#cantidad").val() != null && $("#cantidad").val() ) {
        var desc = Calcular_Descuento($("#porcentaje").val());
        var tot = parseFloat($("#precio").val()) * parseFloat($("#cantidad").val()) * desc;
        $("#total").val(tot.toFixed(2));
    }
    else $("#total").val('');
});

$("#precio").blur(function () {
    if ($("#cantidad").val() != null && $("#cantidad").val() != undefined && $("#porcentaje").val() != null && $("#porcentaje").val() ) {
        var desc = Calcular_Descuento($("#porcentaje").val());
        var tot = parseFloat($("#precio").val()) * parseFloat($("#cantidad").val()) * desc;
        $("#total").val(tot.toFixed(2));
    }
    else $("#total").val('');
});

$("#btnCancelar").click(function () {
    Editando = 0;
    EditandoPos = -1;
    $("#codigo").removeAttr("disabled");
    $("#cbo_Practica").removeAttr("disabled");
    $("#btnAgregar").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelar").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    LimpiarCamposP();
});

function Cargar_Paciente_Documento_Cargado(Resultado) {
    $("#rdAmbu").attr("checked", true);
    $("#rdInt").attr("checked", false);
    $("#txtNroInt").hide();
    var Paciente = Resultado.d;
    var PError = false;
    $.each(Paciente, function (index, paciente) {
        $('#btnactualizar').show();
        $("#btnOtroPaciente").show();
        $("#txtDNI").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.cuil);

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
        Seccional_Id = paciente.Nro_Seccional;
        if (Seccional_Id != 998)
        $("#CargadoSeccional").html(paciente.Seccional);
        else $("#CargadoSeccional").html(paciente.ObraSocial);
        $("#cbo_Seccional").val(Seccional_Id);
        $("#cbo_Seccional").attr('disabled', 'disabled');
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
        OS = paciente.OSId;
        List_ObraSociales(true);
        //CargarNroInternacion(paciente.cuil);
        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}

function RenderizarTablaP() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>F.Práctica</th><th>F.Rendición</th><th>Tipo</th><th>Fact</th><th>Cant</th><th>Código</th><th>Práctica</th><th>%</th><th>Imp. Unit</th><th>Imp. Total</th></tr></thead><tbody>";
    var Contenido = "";
    Importe = 0;
    //Total = objPracticas.length;
    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        tipo = 'I';fact = 'N';
        if (objPracticas[i].Internacion) tipo = 'I';
        else tipo = 'A';
        if (objPracticas[i].Facturarlo) fact = 'S';
        if (objPracticas[i].Estado == 1) {
            objPracticas[i].Detalle = i;
            var practica_ = objPracticas[i].Prac_Nombre.trim().toUpperCase();
            if (practica_.length > 15) practica_ = practica_.substring(0, 15);

            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' title='Editar Practica'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Practica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objPracticas[i].FechaPractica + " </td><td> " + objPracticas[i].FechaRendicion + " </td><td> " + tipo + " </td><td> " + fact + " </td><td style='text-align:right;'> " + objPracticas[i].Cantidad + " </td><td> " + objPracticas[i].PracticaId + " </td><td> " + practica_ + " </td><td> " + objPracticas[i].Porcentaje + " </td><td style='text-align:right;'> $" + formatoMoneda(parseFloat(objPracticas[i].Total / objPracticas[i].Cantidad)) + " </td><td style='text-align:right;'> $" + formatoMoneda(parseFloat(objPracticas[i].Total)) + " </td></tr>";
            Importe = parseFloat(Importe) + parseFloat(objPracticas[i].Total);
        }
    }
    var Pie = "</tbody></table>";
    $("#TablaPracticas").html(Encabezado + Contenido + Pie);
    $("#ImporteTotal").html("Importe Total: $" + parseFloat(Importe).toLocaleString());
    $("#CantidadTotal").html("Items: " + parseInt(Total + 1));
}

function RecargarPagina(url) {
    document.location = "../Facturacion/CargaPracticasMedicasHC.aspx" + url;
}

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



$("a#inline").fancybox({
    'hideOnContentClick': true
});

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
   $("#cbo_Practica").attr("disabled", "disabled");
   $("#codigo").val(objPracticas[Nro].PracticaId);
   $("#horapractica").val(objPracticas[Nro].HoraPractica);
   $("#tabMedicos").show();
   $("#detalleid").val(objPracticas[Nro].Detalle);
    if (objPracticas[Nro].Ambulatorio) $("#rdAmbulatorio").attr('checked', 'checked');
   else $("#rdInternacion").attr('checked','checked');
   if (objPracticas[Nro].Modulo) $("#rdModulo").attr('checked', 'checked');
   else $("#rdPractica").attr('checked', 'checked');
   if ($("#rdModulo").is(":checked")) {
       var obj = document.getElementById('tabPrac');
       obj.innerHTML = "Módulo";
       ListModulos();
       $('#controlcbo_Practica').hide();
       $('#controlcbo_Especialidad').hide();
       $('#controlcbo_Modulo').show();
       $("#txtModulo").val(objPracticas[Nro].Prac_Nombre);
       $("#cbo_Modulo option").each(function () {
           if ($(this).val() == $("#codigo").val()) {
               $("#txtModulo").attr("title", $(this).attr("title"));
           }
       });
   }
   else {
       var obj = document.getElementById('tabPrac');
       obj.innerHTML = "Práctica";
       ListarPracticas();
       $("#cbo_Especialidad").val(''); 
       $('#cbo_ModulosEnc').removeAttr("disabled");
       $('#controlcbo_ModulosEnc').hide();
       $('#controlcbo_Practica').show();
       $('#controlcbo_Modulo').hide();  
   }
   $("#fechapractica").val(objPracticas[Nro].FechaPractica);
   $("#fecharendicion").val(objPracticas[Nro].FechaRendicion);
   $("#cbo_Servicio").val(objPracticas[Nro].ServicioId);
   $("#cbo_Especialidad").val(objPracticas[Nro].EspecialidadId);
   $("#cbo_Medicos").val(objPracticas[Nro].MedicoId);
   $("#cantidad").val(objPracticas[Nro].Cantidad);
   $("#porcentaje").val(objPracticas[Nro].Porcentaje);
   $("#precio").val(parseFloat(objPracticas[Nro].Total / objPracticas[Nro].Cantidad / Calcular_Descuento(objPracticas[Nro].Porcentaje)).toFixed(2));
   $("#cantidad").val(objPracticas[Nro].Cantidad);
   $("#total").val(objPracticas[Nro].Total);
   $("#NroOrden").val(objPracticas[Nro].NroOrden);
   if (objPracticas[Nro].Facturarlo)
   $("#chkFacturado").attr("checked","checked");
if (objPracticas[Nro].Honorarios) {

    $("#PrecioHono").show();
    $("#chkHonorarios").attr("checked", "checked");

    $("#txtPrecioHono").val(objPracticas[Nro].PrecioHonorario);
} else {
    $("#PrecioHono").hide();
}
   if (objPracticas[Nro].APE)
   $("#chkAPE").attr("checked","checked");
    $("#btnAgregar").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelar").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
}

function CargarValorHono_Cargado(Resultado) {
    var Valor = Resultado.d;
    if (Valor != null) {
        var val = Valor.ValorNN;
        $("#txtPrecioHono").val(val);
    } else {
        $("#txtPrecioHono").val('0.00');
    }
}

function CargarValorHono() {  //Carga el valor del Honorario segun el Convenio y el Rango de Practica (Solo SN), se usa para las ART generalmente.
    var InstSecc = $("#cbo_Institucion :selected").val();
    var json = JSON.stringify({ "InstSecc": InstSecc, "Codigo": $("#codigo").val(), "Fecha": $("#txtNomencla").val() }); //Fecha = 1 nomencla actual
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/BuscarValoresHonorario_NN",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarValorHono_Cargado,
        error: errores
    });
}


function Eliminar(Nro) {
    $(objMedicos).each(function (index,item) {
        if (item.PracticaId == objPracticas[Nro].PracticaId) {
            item.Estado = 0;
            TotalMedicos = TotalMedicos - 1;
        }
    });
    
    objMedicos = $.grep(objMedicos, function (value) {
        return value.Estado != 0;
    });
    RenderizarTablaMedicos();

    objPracticas[Nro].Estado = 0;
    objPracticas = $.grep(objPracticas, function (value) {
        return value.Estado != 0;
    });
    Total = Total - 1;
    RenderizarTablaP();
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
    var valid = $("#frm_Inicio").valid();
    if (valid) {
        $("#hastaaqui").fadeIn(1500);
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
        $("#CargadoCentro").html($("#cbo_Centro :selected").text());
        $("#CargadoSeccional").html($("#cbo_Institucion :selected").text().substr(0, 53));
        VerTipoAcindar(); //Verifica el tipo de report que se usa.
        InitControls_DetPartes();
        EstaFacturadoParte();
        if ($("#rdAmbu").is(":checked")) $("#NroInt").html('0');
    }

});

function VerTipoAcindar(){
     var json = JSON.stringify({ "Id": $("#cbo_Institucion :selected").val()});
    $.ajax({
        type: "POST",
        url: "../Json/ObraSocial/ObraSocial.asmx/CargarObraSocial",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index,Os) {
                $("#txt_tipoacindar").val(Os.TipoAcindar);
            });
        },
        error: errores
    });
}

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
        //$("#NroInt").html(obj.id);
        $("#FechaIng").html(obj.ingreso);
        $("#FechaEgr").html(obj.egreso);
        $("#CargadoCama").html(obj.cama);
        servicio = obj.idservicio;
    }
    else {
        $("#NroInt").html('0');
        $("#FechaIng").html('');
        $("#FechaEgr").html('');
        $("#CargadoCama").html('');
        servicio = 0;
    }
}


function InitControls_DetPartes() {
    Cargar_Medicamentos_Guardia();
    $("#CargadoRendicion").datepicker();
    $("#CargadoRendicion").val(FechaActual());
    $("#CargadoRendicion").mask("99/99/9999", { placeholder: "-" });
    List_Servicios();
    ListarPracticas();
    List_Medicos();
    Especialidades_Lista();
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function List_ObraSociales(Todas) {
    var json = JSON.stringify({ "Todas": false });
    $.ajax({
        type: "POST",
        url: "../Json/ObraSocial/ObraSocial.asmx/ListObraSociales",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_ObraSociales_Cargado,
        error: errores
    });
}

function List_ObraSociales_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Obra) {
        $("#cbo_Institucion").append($("<option></option>").val(Obra.id).html(Obra.OS));
        if (Obra.id == OS) {
            $("#cbo_Institucion").val(OS);
            $("#CargadoSeccional").html(Obra.OS);
        }
    });
}


function ValorSN() {
    var InstSecc;
    Seccional_Id = $("#cbo_Seccional :selected").val();
    OS = $("#cbo_Institucion :selected").val();
    if (Seccional_Id == 998) InstSecc = OS;
    else InstSecc = Seccional_Id;
    var json = JSON.stringify({ "InstSecc": InstSecc, "Codigo": $("#codigo").val(), "Fecha": $("#txtNomencla").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/BuscarValoresSana_NN",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ValorSN_Cargado,
        error: errores
    });
}

function ValorSN_Cargado(Resultado) {
    var Valor = Resultado.d;
    if (Valor != null) {
        var val = Valor.ValorNN;
        $("#precio").val(val);
    } else {
        alert('La Práctica no está valorizada');
        $("#precio").val('');
        $("#total").val('');
    }
}


    function ValorPractica() {
    var InstSecc;
    if (Seccional_Id == 998) InstSecc = OS;
    else InstSecc = Seccional_Id;
    var json = JSON.stringify({ "InstSecc": InstSecc, "EspecialidadId": $("#cbo_Especialidad :selected").val(), "PracticaId": $("#codigo").val(),
        "FechaParte": $("#txtNomencla").val()
    });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/ValorPracticaporConvenio",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ValorPractica_Cargado,
            error: errores
        });
    }

    function ValorPractica_Cargado(Resultado) {
        var Valor = Resultado.d;
        if (Valor != null) {
            var val = Valor.ValorNN.replace(",", ".");
            $("#precio").val(val);
        } else {
            alert('La Práctica no está valorizada');
            $("#precio").val('');
            $("#total").val('');
        }
    }

    $("#btnAnterior").click(function () {
        var InstSecc;
        Seccional_Id = $("#cbo_Seccional :selected").val();
        OS = $("#cbo_Institucion :selected").val();
        if (Seccional_Id == 998) InstSecc = OS;
        else InstSecc = Seccional_Id;
        if ($("#rdPractica").is(":checked")) {
            var json = JSON.stringify({ "InstSecc": InstSecc, "EspecialidadId": $("#cbo_Especialidad :selected").val(), "PracticaId": $("#codigo").val(),
                "FechaParte": $("#txtNomencla").val()
            });
            $.ajax({
                type: "POST",
                url: "../Json/Facturacion/Facturacion.asmx/ValorAnteriorPracticaporConvenio",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: ValorAnteriorPracticaporConvenio_Cargado,
                error: errores
            });
        }
        else {
            var json = JSON.stringify({ "InstSecc": InstSecc, "ModuloId": $("#codigo").val(), "FechaParte": $("#txtNomencla").val() });
            $.ajax({
                type: "POST",
                url: "../Json/Facturacion/Facturacion.asmx/Fact_ValorAnterior_Modulo_Convenio",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: ValorAnteriorModulo_Cargado,
                error: errores
            });
        }
    });

    function ValorAnteriorPracticaporConvenio_Cargado(Resultado) {
        var Valor = Resultado.d;
        if (Valor != null) {
            var val = Valor.ValorNN.replace(",", ".");
            $("#precio").val(val);
            $("#precio").focus();
            alert('Precio Anterior Cargado');
        } else {
            alert('No se encontró precio anterior');
            $("#precio").val('');
            $("#total").val('');
        }
    }

    function ValorAnteriorModulo_Cargado(Resultado) {
        var Valor = Resultado.d;
        if (Valor != null) {
            var val = Valor.ValorNN.replace(",", ".");
            $("#precio").val(val);
            $("#precio").focus();
            alert('Precio Anterior Cargado');
        } else {
            alert('No se encontró precio anterior');
            $("#precio").val('');
            $("#total").val('');
        }
    }

    function ValorModulo() {
        if ($("#codigo").val().length > 0) {
            var InstSecc = $("#cbo_Institucion :selected").val();
            //if (Seccional_Id == 998) InstSecc = OS;
            //else InstSecc = Seccional_Id;
            
            var json = JSON.stringify({ "InstSecc": InstSecc, "ModuloId": $("#codigo").val(), "FechaParte": $("#txtNomencla").val() });
            $.ajax({
                type: "POST",
                url: "../Json/Facturacion/Facturacion.asmx/Fact_Valor_Modulo_Convenio",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: ValorModulo_Cargado,
                error: errores
            });
        }
    }

    function ValorModulo_Cargado(Resultado) {
        var Valor = Resultado.d;
        if (Valor != null) {
            var val = Valor.ValorNN.replace(",", ".");
            $("#precio").val(val);
            $("#cbo_Modulo option").each(function () {
                if ($(this).val() == $("#codigo").val()) {
                    $("#txtModulo").val($(this).text());
                    $("#txtModulo").attr("title", $(this).attr("title"));
                }
            });
            
        } else {
        $("#cbo_Modulo option").each(function () {
            if ($(this).val() == $("#codigo").val()) {
                $("#txtModulo").val($(this).text());
                $("#txtModulo").attr("title", $(this).attr("title"));
            }
        });
            alert('El Módulo no está valorizado');
            $("#precio").val('');
            $("#total").val('');
        }
    }

    function Cargar_Modulos() {
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/AltasNomencladores.asmx/ListadodeModulosTotal",
            data: '{}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Pracias_Cargadas,
            error: errores
        });
    }

    function Cargar_Modulos2() {
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/AltasNomencladores.asmx/ListadodeModulosTotal",
            data: '{}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Modulos_Cargados,
            error: errores
        });
    }

    function Modulos_Cargados(Resultado) {
        var Practicas = Resultado.d;
        $('#cbo_Modulo').empty();
        $('#cbo_Modulo').append($('<option></option>').val('0').html(''));
        $.each(Practicas, function (index, practicas) {
            $('#cbo_Modulo').append(
              $('<option></option>').val(practicas.Codigo).html(practicas.Descripcion)
            );
        });
    }


    function Pracias_Cargadas(Resultado) {
        var Practicas = Resultado.d;
        $('#cbo_Practica').empty();
        $('#cbo_Practica').append($('<option></option>').val('0').html(''));
        $.each(Practicas, function (index, practicas) {
            $('#cbo_Practica').append(
              $('<option></option>').val(practicas.Codigo).html(practicas.Descripcion)
            );
            if (practicas.Codigo == $("#codigo").val()) $('#cbo_Practica').val($("#codigo").val());
        });
    }

    $("#rdPractica").click(function () {
        ListarPracticas();
        $("#controlcbo_Modulo").hide(); $("#controlcbo_Practica").show();
        $("#controlcbo_ModulosEnc").hide();
        $("#cbo_Especialidad").val('');
        var obj = document.getElementById('tabPrac');
        obj.innerHTML = "Práctica";
    });

    $("#cbo_Modulo").blur(function () {
        $("#codigo").val($("#cbo_Modulo").val());

    });




//////////////////////////////////////////Medicamentos///////////////////////////

$("#btnCargaMedicamentos").click(function () {
    $("#myModal").modal({ backdrop: false, keyboard: false });
});



function Cargar_Medicamentos_Guardia() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Medicamentos_Lista_Guardia_SN",
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


//$("#cbo_MedicamentoMed").change(function () {
//    INSUMOS_CODIGO_ALFA_A_CODIGO_SN();
//    LoadInsumo($("#cbo_MedicamentoMed :selected").val());
//    $("#Medicamento_Id").val($("#cbo_MedicamentoMed :selected").val());
//    $("#Medicamento_Nombre").val($("#cbo_MedicamentoMed :selected").text());
//    if ($("#Medicamento_Id").val() != 0)
//        ObtenerPrecio();
//});

function Cargar_Medicamentos_Cargado(Resultado) {
    var Medicamentos = Resultado.d;
    $('#cbo_MedicamentoMed').empty();
    $('#cbo_MedicamentoMed').append('<option value="0">Seleccione Medicamento...</option>');
    $.each(Medicamentos, function (i, item) {
        $('#cbo_MedicamentoMed').append($('<option></option>').val(Medicamentos[i].REM_ID).html(Medicamentos[i].REM_NOMBRE));
        if ($("#Medicamento_Id").val() == Medicamentos[i].REM_ID) $('#cbo_MedicamentoMed').val(Medicamentos[i].REM_ID);
    });
}

$("#txtCodigoMed").blur(function () {
    INSUMOS_CODIGO_SN_A_CODIGO_ALFA();
});

function INSUMOS_CODIGO_SN_A_CODIGO_ALFA()
{
    if ($('#txtCodigoMed').val().trim().length > 0) {
        var json = JSON.stringify({ "Codigo_kike": $('#txtCodigoMed').val().trim()});
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/Farmacia.asmx/INSUMOS_CODIGO_SN_A_CODIGO_ALFA",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $('#cbo_MedicamentoMed').val('');
                $('#cbo_MedicamentoMed').val(Resultado.d);
                $("#Medicamento_Id").val(Resultado.d);
                if (Resultado.d > 0)
                LoadInsumo(Resultado.d);
            },
            error: errores
        });
    }
    else $('#txtCodigoMed').focus();
}

function ObtenerPrecio() {
    var json = JSON.stringify({ "MonodrogaId": $("#Monodroga_id").val(), "InsumoId": $("#Medicamento_Id").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/Fact_PrecioMax_Monodroga",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var precio = Resultado.d;
            $('#precioMed').empty('0');
            $('#precioMed').val(parseFloat(precio).toFixed(2));
        },
        error: errores
    });
}

function List_Descartables_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Insumo) {
        $("#cbo_Descartable").append($("<option></option>").val(Insumo.REM_ID).html(Insumo.REM_NOMBRE + "-" + Insumo.REM_GRAMAJE + Insumo.Medida));
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

$("#cbo_Descartable").change(function () {
    Get_Insumo_by_Id($("#cbo_Descartable :selected").val());
});

///////////////////////////////////////////////Detalles Medicamentos///////////////////////////////////////////////


function RemoveClass() {
    $(".control-group").removeClass("error");
}

$("#btnAgregarMed").click(function () {
    if ($("#frm_Medicamentos").valid() && $("#Medicamento_Id").val() != "0") {
        RemoveClass();
        objMedicamento = {};
        if ($("#rdAmbu").is(":checked")) {
            objMedicamento.Ambulatorio = true;
            objMedicamento.Internacion = false;
        }
        else {
            objMedicamento.Ambulatorio = false;
            objMedicamento.Internacion = true;
        }
        if ($("#chkFacturadoMed").is(":checked"))
            objMedicamento.Facturarlo = true;
        else
            objMedicamento.Facturarlo = false;
        if ($("#chkEstadisticasMed").is(":checked"))
            objMedicamento.Estadisticas = true;
        else
            objMedicamento.Estadisticas = false;
        if ($("#chkAPEMed").is(":checked"))
            objMedicamento.APE = true;
        else
            objMedicamento.APE = false;
        objMedicamento.Monodroga = $("#Monodroga_id").val();
        objMedicamento.Medicamento = $("#Medicamento_Id").val();
        objMedicamento.Medicamento_Nombre = $("#cbo_MedicamentoMed :selected").text();
        objMedicamento.Cantidad = $("#cantidadMed").val();
        objMedicamento.Precio = parseFloat($("#precioMed").val()).toFixed(2);
        objMedicamento.FechaPractica = $("#fechapracMed").val();
        objMedicamento.Total = parseFloat($("#subtotalMed").val()).toFixed(2);
        objMedicamento.Porcentaje = $("#porcentajeMed").val();
        var Estado = 1;
        var Cual = Total_Med;
        if (Editando_Med == 1) {
            Cual = EditandoPos_Med;
        }
        else {
            Total_Med = Total_Med + 1;
            Cual = Total_Med;
        }
        objMedicamento.Estado = Estado;
        objMedicamentos[Cual] = objMedicamento;
        RenderizarTabla();
        LimpiarCampos();
        Editando_Med = 0;
        EditandoPos_Med = -1;
        $("#btnConfirmar").removeAttr("disabled");
    }
});

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Medicamento</th><th>Cantidad</th><th>Importe</th><th>%</th><th>Total</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total_Med; i++) {
        //Estado = 0 es Borrado
        if (objMedicamentos[i].Estado == 1) {
            var _insumo = objMedicamentos[i].Medicamento_Nombre;
            if (_insumo.length > 30) _insumo = _insumo.substring(0,30);
            Contenido = Contenido + "<tr><td><a id='EditarMed" + i + "' onclick='EditarMed(" + i + ");' class='btn btn-mini' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='ElminarMed" + i + "'onclick='EliminarMed(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td title='"+ objMedicamentos[i].Medicamento_Nombre +"'> " + _insumo + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> $" + parseFloat(objMedicamentos[i].Precio).toLocaleString() + " </td><td> " + objMedicamentos[i].Porcentaje + " </td><td> $" +parseFloat(objMedicamentos[i].Total).toLocaleString() + " </td></tr>";
        }
    }
    var Pie = "</tbody></table>";
    $("#TablaMedicamentos").html(Encabezado + Contenido + Pie);
}

function EditarMed(Nro) {
    Editando_Med = 1;
    EditandoPos_Med = Nro;
    $("#Medicamento_Id").val(objMedicamentos[Nro].Medicamento);
    $("#Medicamento_Nombre").val(objMedicamentos[Nro].Medicamento_Nombre);
    $("#chkFacturadoMed").attr("checked", "checked");
    $("#cbo_MedicamentoMed").attr("disabled", "disabled");
    $("#cbo_MedicamentoMed").val(objMedicamentos[Nro].Medicamento);
    $("#Monodroga_id").val(objMedicamentos[Nro].Monodroga);
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
    $("#btnAgregarMed").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelarMed").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
}

function EliminarMed(Nro) {
    objMedicamentos[Nro].Estado = 0;
    objMedicamentos = $.grep(objMedicamentos, function (value) {
        return value.Estado != 0;
    });
    Total_Med = Total_Med - 1;
    RenderizarTabla();
}

$("#precioMed").blur(function () {
    if ($("#cantidadMed").val() != null && $("#cantidadMed").val() != undefined && $("#porcentajeMed").val() != null && $("#porcentajeMed").val()) {
        $("#precioMed").val($("#precioMed").val().replace(',', '.'));
        desc = Calcular_Descuento($("#porcentajeMed").val());
        var tot = $("#precioMed").val() * $("#cantidadMed").val() * desc;
        $("#subtotalMed").val(tot);
    }
    else $("#subtotalMed").val('');
});

$("#cantidadMed").blur(function () {
    if ($("#precioMed").val() != null && $("#precioMed").val() != undefined && $("#porcentajeMed").val() != null && $("#porcentajeMed").val()) {
        desc = Calcular_Descuento($("#porcentajeMed").val());
        var tot = parseFloat($("#precioMed").val()) * parseFloat($("#cantidadMed").val()) * desc;
        $("#subtotalMed").val(tot.toFixed(2));
    }
    else $("#subtotalMed").val('');
});

$("#porcentajeMed").blur(function () {
    if ($("#precioMed").val() != null && $("#precioMed").val() != undefined && $("#porcentajeMed").val() != null && $("#porcentajeMed").val()) {
        desc = Calcular_Descuento($("#porcentajeMed").val());
        var tot = parseFloat($("#precioMed").val()) * parseFloat($("#cantidadMed").val()) * desc;
        $("#subtotalMed").val(tot.toFixed(2));
    }
    else $("#subtotalMed").val('');
});

function LimpiarCampos() {
    $("#cbo_MedicamentoMed").removeAttr("disabled");
    $("#cbo_MedicamentoMed").val('0');
    $("#Medicamento_Id").val('0');
    $("#Medicamento_Nombre").val('');
    $("#Monodroga_id").val('0');
    $("#cantidadMed").val('1');
    $("#precioMed").val('');
    //$("#fechapracMed").val('');
    $("#txtCodigoMed").val('');
    $("#txtCodigoMed").focus();
    $("#subtotalMed").val('');
    $("#porcentajeMed").val('100');
    $("#btnAgregarMed").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarMed").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    $("#chkFacturadoMed").attr("checked",true);
    $("#chkEstadisticasMed").removeAttr("checked");
    $("#chkAPEMed").removeAttr("checked");
}

$("#btnCancelarMed").click(function () {
    Editando_Med = 0;
    EditandoPos_Med = -1;
    $("#btnAgregarMed").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarMed").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    LimpiarCampos();
});



///////////////////////////////Descartables///////////////////////////////////////////////

$("#btnAgregarDesc").click(function () {
    if ($("#frm_Descartables").valid()) {
        $(".control-group").removeClass();
        objDescartable = {};
        if ($("#chkFacturado_desc").is(":checked"))
            objDescartable.Facturarlo = true;
        else
            objDescartable.Facturarlo = false;
        if ($("#chkEstadisticas_desc").is(":checked"))
            objDescartable.Estadisticas = true;
        else
            objDescartable.Estadisticas = false;
        if ($("#chkAPE_desc").is(":checked"))
            objDescartable.APE = true;
        else
            objDescartable.APE = false;

        if ($("#rdAmbu").is(":checked"))
            objDescartable.Ambulatorio = true;
        else
            objDescartable.Internacion = true;
        objDescartable.Descripcion = $("#cbo_Descartable :selected").text();
        objDescartable.InsumoId = $("#cbo_Descartable :selected").val();
        objDescartable.Cantidad = $("#cantidad_desc").val();
        objDescartable.Precio = parseFloat($("#precio_desc").val()).toFixed(2);
        objDescartable.FechaPractica = $("#fechaprac_desc").val();
        objDescartable.Total = parseFloat($("#subtotal_desc").val()).toFixed(2);
        objDescartable.Porcentaje = $("#porcentajeDesc").val();
        var Estado = 1;
        var Cual = Total_1;
        if (Editando_1 == 1) {
            Cual = EditandoPos_1;
        }
        else {
            Total_1 = Total_1 + 1;
            Cual = Total_1;
        }
        objDescartable.Estado = Estado;
        objDescartables[Cual] = objDescartable;
        RenderizarTabla_desc();
        LimpiarCampos_desc();
        Editando_1 = 0;
        EditandoPos_1 = -1;
        $("#btnConfirmar").removeAttr("disabled");
    }
});

function RenderizarTabla_desc() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Descripcion</th><th>Cantidad</th><th>Importe</th><th>%</th><th>Total</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total_1; i++) {
        //Estado = 0 es Borrado
        if (objDescartables[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='EditarDesc" + i + "' onclick='Editar_desc(" + i + ");' class='btn btn-mini' title='Editar Descartable'><i class='icon-edit'></i></a><a id='ElminarDesc" + i + "'onclick='Eliminar_desc(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Descartable'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objDescartables[i].Descripcion + " </td><td> " + objDescartables[i].Cantidad + " </td><td> $" + parseFloat(objDescartables[i].Precio).toLocaleString() + " </td><td> " + objDescartables[i].Porcentaje + " </td><td> $" + parseFloat(objDescartables[i].Total).toLocaleString() + " </td></tr>";
        }
    }
    var Pie = "</tbody></table>";
    $("#Tabla_Medicamentos_Desc").html(Encabezado + Contenido + Pie);
}

function Editar_desc(Nro) {
    Editando_1 = 1;
    EditandoPos_1 = Nro;
    $("#cbo_Descartable").attr("disabled", "disabled");
    $("#cbo_Descartable").val(objDescartables[Nro].InsumoId);
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
    $("#btnAgregarDesc").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelarDesc").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
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
        var tot = parseFloat($("#precio_desc").val()) * parseFloat($("#cantidad_desc").val());
        $("#subtotal_desc").val(tot.toFixed(2));
    }
    else $("#subtotal_desc").val('');
});

$("#cantidad_desc").blur(function () {
    if ($("#precio_desc").val() != null && $("#precio_desc").val() != undefined) {
        var tot = parseFloat($("#precio_desc").val()) * parseFloat($("#cantidad_desc").val()) * desc;
        $("#subtotal_desc").val(tot.toFixed(2));
    }
    else $("#subtotal_desc").val('');
});

function LimpiarCampos_desc() {
    $("#cbo_Descartable").removeAttr("disabled");
    $("#cbo_Descartable").val('');
    $("#cantidad_desc").val('');
    $("#precio_desc").val('');
    $("#fechaprac_desc").val('');
    $("#subtotal_desc").val('');
    $("#porcentajeDesc").val('100');
    $("#btnAgregarDesc").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarDesc").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    $("#chkFacturado_desc").removeAttr("checked");
    $("#chkEstadisticas_desc").removeAttr("checked");
    $("#chkAPE_desc").removeAttr("checked");
}

$("#btnCancelarDesc").click(function () {
    Editando_1 = 0;
    EditandoPos_1 = -1;
    $("#btnAgregarDesc").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarDesc").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    LimpiarCampos_desc();
});

/////////////////////////////////////////////////Guardar Datos//////////////////////////////////////////////////////

$("#btnConfirmar").click(function () {
    if (confirm("¿Desea grabar la rendición?")) {
        if (Guardar == 0) {
            Guardar = 1;
            if (Id > 0) {
                DeleteDetalles();
            }
            else {
                var f = {};
                f.NroParte = Id;
                f.Fecha = $("#txtFechaCarga").val();
                f.NHC = $("#CargadoNHC").html();
                f.InstitucionId = $("#cbo_Institucion :selected").val();
                f.CentroId = $("#cbo_Centro :selected").val();
                f.Internacion = $("#rdInt").is(":checked");
                f.Ambulatorio = $("#rdAmbu").is(":checked");
                if (f.Ambulatorio) f.NroInternacion = 0;
                if (f.Internacion) f.NroInternacion = $("#NroInt").html();
                f.NroOrdenCarpeta = $("#txtNroOrdenInt_Carpeta").val().trim().toUpperCase();
                f.Observaciones = $("#txtObservaciones").val().trim().toUpperCase();
                f.Nomenclador = $("#cbo_Nomencla :selected").val();
                var json = JSON.stringify({ "f": f });
                $.ajax({
                    type: "POST",
                    url: "../Json/Facturacion/Facturacion.asmx/InsertParteCabSN",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: InsertParteCab_Cargado,
                    error: errores
                });
            }
        }
    }
});

function InsertParteCab_Cargado(Resultado) {
    var NroParte = Resultado.d;
    Id = NroParte;
    var MedCab = {};
    MedCab.NroParte = Id;
    MedCab.FechaParte = $("#txtFechaCarga").val();
    MedCab.FechaRendicion = $("#CargadoRendicion").val();
    MedCab.NHC = $("#CargadoNHC").html();
    if (NroParte > 0 && (objPracticas.length > 0 || objMedicamentos.length > 0)) {
        var json = JSON.stringify({ "objPracticas": objPracticas, "NroParte": NroParte, "MedCab": MedCab, "objDescartables": objDescartables, "objMedicamentos":objMedicamentos,"objMedicos":objMedicos });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/InsertParteDet",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: InsertParteDet_Cargado,
            error: errores
        });
    }
}

function InsertParteDet_Cargado(Resultado) {
    if (Ambu)
        var url = "../Impresiones/ImpresionRendicionIndInt_Ambu.aspx?Id=" + Id; //SN
    else
    {
        if ($("#txt_tipoacindar").val() == "false")
            var url = "../Impresiones/ImpresionRendicionIndInt.aspx?Id=" + Id;
        else var url = "../Impresiones/ImpresionRendicionIndInt_Acindar.aspx?Id=" + Id;
    }
    Ventana(url);
}

function DeleteDetalles() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/DeleteParteDet",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: DeleteParteDet_Cargado,
        error: errores
    });
}

function DeleteParteDet_Cargado() {
    var f = {};
    f.NroParte = Id;
    f.Fecha = $("#txtFechaCarga").val();
    f.NHC = $("#CargadoNHC").html();
    f.InstitucionId = $("#cbo_Institucion :selected").val();
    f.CentroId = $("#cbo_Centro :selected").val();
    f.Internacion = $("#rdInt").is(":checked");
    f.Ambulatorio = $("#rdAmbu").is(":checked");
    if (f.Ambulatorio) f.NroInternacion = 0;
    if (f.Internacion) f.NroInternacion = $("#NroInt").html();
    f.NroOrdenCarpeta = $("#txtNroOrdenInt_Carpeta").val().trim().toUpperCase();
    f.Observaciones = $("#txtObservaciones").val().trim().toUpperCase();
    f.Nomenclador = $("#cbo_Nomencla :selected").val();
    var json = JSON.stringify({ "f": f });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/InsertParteCabSN",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: InsertParteCab_Cargado,
        error: errores
    });
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
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Medicamento</th><th>Cantidad</th><th>Importe</th><th>%</th><th>Total</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Lista, function (index, Detalle) {
        desc = Calcular_Descuento(Detalle.Porcentaje);
        var Tot = Detalle.Precio * Detalle.Cantidad * desc;
        objMedicamentos[i] = Detalle;
        objMedicamentos2[i] = Detalle;
        objMedicamentos[i].Total = parseFloat(Tot).toFixed(2);
        objMedicamentos[i].Estado = 1;
        Contenido = Contenido + "<tr><td><a id='EditarMed" + i + "' onclick='EditarMed(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Medicamento'><i class='icon-edit'></i></a><a id='ElminarMed" + i + "'onclick='EliminarMed(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Medicamento'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicamentos[i].Medicamento_Nombre + " </td><td> " + objMedicamentos[i].Cantidad + " </td><td> $" +parseFloat(objMedicamentos[i].Precio).toLocaleString() + " </td><td> " + objMedicamentos[i].Porcentaje + " </td><td> $" +parseFloat(objMedicamentos[i].Total).toLocaleString() + " </td></tr>";
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
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Descripcion</th><th>Cantidad</th><th>Importe</th><th>%</th><th>Total</th></tr></thead><tbody>";
    var Contenido = "";
    var i = 0;
    $.each(Lista, function (index, Detalle) {
        var Tot = Detalle.Precio * Detalle.Cantidad;

        objDescartables[i] = Detalle;
        objDescartables2[i] = Detalle;
        objDescartables[i].Total = parseFloat(Tot).toFixed(2);
        objDescartables[i].Estado = 1;
        Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar_desc(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Descartable'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar_desc(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Descartable'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objDescartables[i].Descripcion + " </td><td> " + objDescartables[i].Cantidad + " </td><td> $" +parseFloat(objDescartables[i].Precio).toLocaleString() + " </td><td> " + objDescartables[i].Porcentaje + " </td><td> $" +parseFloat(objDescartables[i].Total).toLocaleString() + " </td></tr>";
        Total_1 = Total_1 + 1;
        i = i + 1;
    });
    var Pie = "</tbody></table>";
    $("#Tabla_Medicamentos_Desc").html(Encabezado + Contenido + Pie);
}

function DeleteDetallesMedicamentos() {
    var json = JSON.stringify({ "NroParte": Id });
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/Delete_Descartables_Det",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Delete_Descartables_Det_Cargado,
        error: errores
    });
}

function Delete_Descartables_Det_Cargado(Resultado) {
        var json = JSON.stringify({ "NroParte": Id });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/Delete_Medicamentos_Det",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Delete_Medicamentos_Det_Cargado,
            error: errores
        });
}

function Delete_Medicamentos_Det_Cargado(Resultado) {
    if (Resultado.d > 0) {
        Insert_Detalles_Nuevos();
    }
}

function Insert_Detalles_Nuevos() {
    if (objDescartables.length > 0) {
        var json2 = JSON.stringify({ "objDescartables": objDescartables, "NroParte": Id });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/InsertDescartablesDet",
            data: json2,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: InsertDescartablesDet_Cargado,
            error: errores
        });
    }
    else if (objMedicamentos.length > 0) {
        var json = JSON.stringify({ "objMedicamentos": objMedicamentos, "NroParte": Id });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/InsertMedicamentosDet",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: InsertMedicamentosDet_Cargado,
            error: errores
        });
    }
}

$("#tabMedicos").click(function () {
    $("#TablaMedicos").show();
    $("#TablaPracticas").hide();
});


$("#tabPrac").click(function () {
    $("#TablaMedicos").hide();
    $("#TablaPracticas").show();
});

$("#tabCab").click(function () {
    $("#TablaMedicos").hide();
    $("#TablaPracticas").show();
});

function ExisteHonorario(Algo){
    for (var i = 0; i <= objMedicos.length - 1; i++) {
        if (objMedicos[i].PracticaId == Algo.PracticaId && objMedicos[i].MedicoId == Algo.MedicoId && objMedicos[i].Estado == 1 && EditandoMedicos != 1) {
            LimpiarCamposMedicos();
            EditandoMedicos = 0;
            EditandoPosMedicos = -1;
            Editando_1 = 0;
            EditandoPos_1 = -1;
            return true;
        }
    }
    return false;
}


$("#btnAcepMedico").click(function () {
    if ($("#codigo").val().length > 0) {
        objMedico = {};
        var Estado = 1;
        var Cual = TotalMedicos;
        if (EditandoMedicos == 1) {
            Cual = EditandoPosMedicos;
        }
        else {
            TotalMedicos = TotalMedicos + 1;
            Cual = TotalMedicos;
        }
        objMedico.Estado = Estado;
        objMedico.PracticaId = $("#codigo").val();
        objMedico.MedicoId = $("#cbo_MedicoInv :selected").val();

        objMedico.Honorario = parseFloat($("#Hono").val()).toFixed(2);
        objMedico.HonorarioOS = parseFloat($("#Hono").val()) * parseFloat($("#PorcentajeMedico").val()) / 100;
        objMedico.HonorarioOS = objMedico.HonorarioOS.toFixed(2);
        objMedico.HonorarioPac = parseFloat(objMedico.Honorario) - parseFloat(objMedico.HonorarioOS);
        objMedico.HonorarioPac = parseFloat(objMedico.HonorarioPac).toFixed(2);
        objMedico.Porcentaje = $("#PorcentajeMedico").val();
        objMedico.Tipo = $("#cbo_Tipo :selected").text();
        objMedico.Medico = $("#cbo_MedicoInv :selected").text();
        objMedico.Detalle = $("#detalleid").val();
        objMedicos[Cual] = objMedico;
        RenderizarTablaMedicos();
        LimpiarCamposMedicos();
        EditandoMedicos = 0;
        EditandoPosMedicos = -1;
    }
    else alert('Ingrese Codigo de Práctica/Módulo');
});

function RenderizarTablaMedicos() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>&nbsp;</th><th>Médico</th><th>Práctica/Módulo</th><th>Honorario</th><th>Honorario OS</th><th>Honorario Pac.</th><th>Tipo</th></tr></thead><tbody>";
    var Contenido = "";
    
    for (var i = 0; i <= TotalMedicos; i++) {
        //Estado = 0 es Borrado
        if (objMedicos[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='EditarMedico" + i + "' onclick='EditarMedico(" + i + ");' class='btn btn-mini' title='Editar Medico'><i class='icon-edit'></i></a><a id='ElminarMedico" + i + "'onclick='EliminarMedico(" + i + ");' class='btn btn-mini btn-danger' title='Quitar Medico'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objMedicos[i].Medico + " </td><td> " + objMedicos[i].PracticaId + " </td><td> $" + objMedicos[i].Honorario + " </td><td> $" + objMedicos[i].HonorarioOS + " </td><td> $" + objMedicos[i].HonorarioPac + " </td><td> " + objMedicos[i].Tipo + " </td></tr>";
        }
    }
    var Pie = "</tbody></table>";
    $("#TablaMedicos").html(Encabezado + Contenido + Pie);
}

$("#btnCancelMedico").click(function () {
    Editando_1 = 0;
    EditandoPos_1 = -1;
    $("#btnAgregarDesc").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarDesc").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    LimpiarCamposMedicos(); 
});


function EditarMedico(Nro) {
    EditandoMedicos = 1;
    EditandoPosMedicos = Nro;
    $("#cbo_MedicoInv").attr("disabled", "disabled");
    $("#cbo_MedicoInv").val(objMedicos[Nro].MedicoId);
    $("#PorcentajeMedico").val(objMedicos[Nro].Porcentaje);
    $("#Hono").val(objMedicos[Nro].Honorario);
    $("#cbo_Tipo option").each(function () {
        if (objMedicos[Nro].Tipo == $(this).text()) $("#cbo_Tipo").val($(this).val());
    });
    $("#btnAcepMedico").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelMedico").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
}

function EliminarMedico(Nro) {
    objMedicos[Nro].Estado = 0;
    RenderizarTablaMedicos();
    objMedicos = $.grep(objMedicos, function (value) {
        return value.Estado != 0;
    });
    TotalMedicos = TotalMedicos - 1;
}

function LimpiarCamposMedicos() {
    $("#cbo_MedicoInv").val('');
    $("#txtMedicoHono").val('');
    $("#PorcentajeMedico").val('100');
    $("#cbo_MedicoInv").removeAttr('disabled');
    $("#cbo_Tipo").val('1');
    $("#txtMedicoHono").focus();
}


$("#btnImprimir").click(function () {
    if (Ambu)
        var url = "../Impresiones/ImpresionRendicionIndInt_Ambu.aspx?Id=" + Id; //SN
    else
    {
        if ($("#txt_tipoacindar").val() == "false") var url = "../Impresiones/ImpresionRendicionIndInt.aspx?Id=" + Id;
        else var url = "../Impresiones/ImpresionRendicionIndInt_Acindar.aspx?Id=" + Id;
    }
    Ventana(url);
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
            'enableEscapeButton': false,
            'onClosed': function () {
                window.location = "CargaPracticasMedicasHC.aspx";
            }
        });
    }

    $("#txtNroParte").change(function () {
        if ($("#txtNroParte").val().trim().length > 0) {
            Id = $("#txtNroParte").val();
            CargarCabecera();
            $("#btnActualizarObservacion").show();
        }
    });

    $("#btnActualizarObservacion").click(function () {
        if ($("#txtNroOrdenInt_Carpeta").val().trim().length > 0 || $("#txtObservaciones").val().trim().length > 0)
            ActualizarCabecera();
        else alert("Ingrese Orden Internación y/o Observación");
    });

    function ActualizarCabecera()
    {
        var json = JSON.stringify({ "NroOrdenIntCarpeta": $("#txtNroOrdenInt_Carpeta").val().trim().toUpperCase(), "Observaciones": $("#txtObservaciones").val().trim().toUpperCase(),"NroParte": Id });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/UpdateCabeceraParteSN",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado){
                alert(Resultado.d);
            },
            error: errores
        });
    }

    $("#btnCargaLabo").click(function () {
        var json = JSON.stringify({ "NroInternacion": $("#txtNroInt").val(), "ObraSocial": $("#cbo_Institucion :selected").val(), "Nomenclador": $("#cbo_Nomencla :selected").val() });
        $.ajax({
            type: "POST",
            url: "../Json/Facturacion/Facturacion.asmx/ListParteDet_Labo",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ListPartesDetLabo_Cargado,
            error: errores
        });
    });

    function ListPartesDetLabo_Cargado(Resultado) {
        var Lista = Resultado.d;
        var i = 0;
        $("#btnConfirmar").removeAttr("disabled");
        $.each(Lista, function (index, Detalle) {
            var desc = Calcular_Descuento2(Detalle.Porcentaje);
            objPractica = {};
            objPractica.Ambulatorio = false;
            objPractica.Internacion = true;
            objPractica.Modulo = false;
            objPractica.Practica = true;
            objPractica.FechaPractica = Detalle.FechaPractica;
            objPractica.FechaRendicion = Detalle.FechaRendicion;
            objPractica.ServicioId = "0";
            objPractica.Serv_Nombre = "";
            objPractica.EspecialidadId = 0;
            objPractica.Esp_Nombre = "";
            objPractica.MedicoId = 0;
            objPractica.Med_Nombre = "";
            objPractica.Cantidad = Detalle.Cantidad;
            objPractica.Porcentaje = Detalle.Porcentaje;
            objPractica.PracticaId = Detalle.PracticaId;
            objPractica.NroOrden = 0;
            objPractica.HoraPractica = "0:00";
            objPractica.Prac_Nombre = Detalle.Prac_Nombre;
            objPractica.ModuloEnc = "";
            objPractica.Precio = parseFloat(Detalle.Precio).toFixed(2);
            objPractica.Total = parseFloat(Detalle.Precio).toFixed(2);
            objPractica.Facturarlo = true;
            objPractica.PrecioHonorario = "0";
            objPractica.Honorarios = false;
            objPractica.APE = false;
            var Estado = 1;
            objPractica.SubPracticaId = Detalle.SubPracticaId;
            Total = Total + 1;
            objPractica.Estado = Estado;
            objPractica.Detalle = Total;
            objPracticas[Total] = objPractica;
            RenderizarTablaP();
        });
    }

function LoadInsumo(IdInsumo) {
    $.ajax({
        type: "POST",
        data: '{Id: ' + IdInsumo + '}',
        url: "../Json/Farmacia/Farmacia.asmx/Insumos_List_byId",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Insumos_List_byId_Cargado,
        complete: function () {
            ObtenerPrecio();
        },
        error: errores,
    });
}

$("#cbo_MedicamentoMed").change(function () {
    $("#precioMed").val("0.00");
    INSUMOS_CODIGO_ALFA_A_CODIGO_SN();
    LoadInsumo($("#cbo_MedicamentoMed :selected").val());
    $("#Medicamento_Id").val($("#cbo_MedicamentoMed :selected").val());
    $("#Medicamento_Nombre").val($("#cbo_MedicamentoMed :selected").text());
});

function Insumos_List_byId_Cargado(Resultado) {
    var ObjInsumo = Resultado.d;
    $("#Monodroga_id").val(ObjInsumo.MONODROGA);
}


function CargarValorHonobyTipo() {  //Carga el valor del Honorario segun el Convenio,el Rango de Practica (Solo SN) y Tipo de Medico, se usa para las ART generalmente.
    var InstSecc = $("#cbo_Institucion :selected").val();
    var json = JSON.stringify({ "InstSecc": InstSecc, "Codigo": $("#codigo").val(), "Fecha": $("#txtNomencla").val(), "Tipo": $("#cbo_Tipo :selected").val() }); //Fecha = 1 nomencla actual
    $.ajax({
        type: "POST",
        url: "../Json/Facturacion/Facturacion.asmx/BuscarValoresHonorario_byTipo",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#Hono").val(Resultado.d);
        },
        error: errores
    });
}

$("#cbo_Tipo").change(function () {
    CargarValorHonobyTipo();
});

$("#tabMedicos").click(function () {
     CargarValorHonobyTipo();
});

function INSUMOS_CODIGO_ALFA_A_CODIGO_SN()
{
        var json = JSON.stringify({ "Codigo_alfa": $('#cbo_MedicamentoMed :selected').val()});
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/Farmacia.asmx/INSUMOS_CODIGO_ALFA_A_CODIGO_SN",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $('#txtCodigoMed').val('');
                $('#txtCodigoMed').val(Resultado.d);
            },
            error: errores
        });
}

$("#txtMedico").blur(function () {
    $("#txtMedico").val($("#txtMedico").val().toUpperCase());
    if($("#txtMedico").val().trim().length > 0) BuscarMedicoporId();
});

function BuscarMedicoporId(){
       var json = JSON.stringify({ "CodigoInt": $('#txtMedico').val().trim()});
        $.ajax({
            type: "POST",
            url: "../Json/Medicos.asmx/List_MedicoId_by_CodigoInt_SN",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $('#cbo_Medicos').val(Resultado.d);
            },
            error: errores
        });
}

$("#txtMedicoHono").blur(function () {
    $("#txtMedicoHono").val($("#txtMedicoHono").val().toUpperCase());
    if($("#txtMedicoHono").val().trim().length > 0) BuscarMedicoporId_Hono();
});

function BuscarMedicoporId_Hono(){
           var json = JSON.stringify({ "CodigoInt": $('#txtMedicoHono').val().trim()});
        $.ajax({
            type: "POST",
            url: "../Json/Medicos.asmx/List_MedicoId_by_CodigoInt_SN",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                $('#cbo_MedicoInv').val(Resultado.d);
            },
            error: errores
        });
}


/////////////////////////Modificar Porcentaje (p/Acindar) /////////////////////

$("#btnAceptarPorc").click(function () {
    if(!$("#chkMedicamentos").is(":checked") && !$("#chkDescartables").is(":checked")) {alert("Seleccione algún tipo de insumo."); return false;}
    if ($("#txtPorcOS").val().trim().length == 0) {alert("Ingrese porcentajes."); return false;}
    if($("#chkMedicamentos").is(":checked") && $("#chkDescartables").is(":checked")) { ModificarDesc(); ModificarMed(); return; }//Modifica desc y medicamentos.
    if($("#chkMedicamentos").is(":checked")) ModificarMed();
    if($("#chkDescartables").is(":checked")) ModificarDesc();
});

function ModificarDesc(){
    $(objMedicamentos).each(function (index,Med) {
        if(Med.Monodroga == "99999") {
            Med.Porcentaje = $("#txtPorcOS").val();
            Med.Total = Med.Precio * (Med.Porcentaje/100.00) * Med.Cantidad;
        }
    });
    RenderizarTabla();
    alert("Descartables Modificados");
}

function ModificarMed(){
    $(objMedicamentos).each(function (index,Med) {
        if(Med.Monodroga != "99999") {
            Med.Porcentaje = $("#txtPorcOS").val();
            Med.Total = Med.Precio * (Med.Porcentaje/100.00) * Med.Cantidad;
        }
    });
    RenderizarTabla();
    alert("Medicamentos Modificados");
}


$("#txtPorcPaciente").change(function () {
    var porOS = 100 - $("#txtPorcPaciente").val();
    $("#txtPorcOS").val(porOS);
});

$("#txtPorcOS").change(function () {
    var porPac = 100 - $("#txtPorcOS").val();
    $("#txtPorcPaciente").val(porPac);
});