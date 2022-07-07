
var Total = -1;
var objDetails = new Array();
var Id = 0;

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

$(document).ready(function () {
    InitControls();
    List_Servicios();
    //List_Centro();
    List_Seccionales();
    //List_Medicos();
    //Especialidades_Lista();
    //List_ObraSociales(false);
    //ListarPracticas();
    //Cargar_Modulos();
    var Query = {};
    Query = GetQueryString();
    if (Query['NHC'] != null) {
        CargarPacienteID(Query['NHC']);
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
    $.each(Paciente, function (index, paciente) {

        $("#txtNHC").attr('value', paciente.NHC);
        $("#txtPaciente").val(paciente.Paciente);

    });
}


function InitControls() {
    $(".date").datepicker();
    $(".date").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaRendicion").val(FechaActual());
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
}

$("#ambos").change(function () {
    if ($("#ambos").is(":checked")) {
        $("#Internacion").removeAttr("checked");
        $("#Ambulatorio").removeAttr("checked");
        $("#Internacion").attr("disabled", true);
        $("#Ambulatorio").attr("disabled", true);
    }
    else {
        $("#Ambulatorio").attr("checked", "checked");
        $("#Internacion").removeAttr("disabled");
        $("#Ambulatorio").removeAttr("disabled");
    }
});

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
    var Lista = Resultado.d;
    $.each(Lista, function (index, Servicio) {
        $("#cbo_Servicio").append($("<option></option>").val(Servicio.id).html(Servicio.descripcion));
    });

}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
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
    });

}

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
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medico").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
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
    var json = JSON.stringify({ "Especialidad": $("#cbo_Especialidad :selected").val() });
    $("#cbo_Medico").empty();
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
    $("#cbo_Medico").empty();
    $("#cbo_Medico").append("<option value='0'></option>");
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medico").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });
}

function List_ObraSociales(Todas) {
    var json = JSON.stringify({ "Todas": Todas });
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
        success: Practicas_Listadas,
        error: errores
    });
}

function Practicas_Listadas(Resultado) {
    var Practicas = Resultado.d;
    $('#cbo_Practica').empty();
     $('#cbo_Practica').append($('<option></option>').val("0").html(""));
    $.each(Practicas, function (index, Practica) {
        $('#cbo_Practica').append(
              $('<option></option>').val(Practica.Codigo).html(Practica.Practica)
            );
    });
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

function Pracias_Cargadas(Resultado) {
    var Practicas = Resultado.d;
    $('#cbo_Modulo').empty();
    $('#cbo_Modulo').append($('<option></option>').val("0").html(""));
    $.each(Practicas, function (index, practicas) {
        $('#cbo_Modulo').append(
              $('<option></option>').val(practicas.Codigo).html(practicas.Descripcion)
            );
    });
}

$("#cbo_Modulo").change(function () {
    $("#txtCodigoMod").val($("#cbo_Modulo :selected").val());
});

$("#cbo_Practica").change(function () {
    $("#txtCodigoPrac").val($("#cbo_Practica :selected").val());
});

function List_Partes() {
    var json = JSON.stringify({ "NHC": $("#txtNHC").val(), "Afiliado": $("#txtPaciente").val().trim(),
    "SeccionalId": $("#cbo_Seccional :selected").val(), "Estado": $("#cbo_Estado :selected").val(),
    "Ambos": $("#ambos").is(":checked"), "Internacion": $("#Internacion").is(":checked"), 
    "Ambulatorio": $("#Ambulatorio").is(":checked"), "DesdeParte": $("#txtDesdeParte").val(),
    "HastaParte": $("#txtHastaParte").val(), "Order": $("#cbo_Order :selected").val(), "ServicioId": $("#cbo_Servicio :selected").val()
});
$.ajax({
    type: "POST",
    data: json,
    url: "../Json/Facturacion/Facturacion.asmx/List_Partes_SeleccionDatos",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    beforeSend: function () {
        $("#tabla").hide();
        $("#cargando").show();
        $("#Total").html("Registros: ");
        $("#trx").empty();
        $("#chkgral").removeAttr("checked");
    },
    success: List_Partes_Cargado,
    complete: function () {
        $("#tabla").show();
        $("#cargando").hide();
        if ($("#cbo_Estado :selected").val() == "1") $("#chkgral").click(); //Procesados
    },
    error: errores
});
}

function List_Partes_Cargado(Resultado) {
    var Lista = Resultado.d;
    if (Lista != null) {
        var Encabezado = "<table class='table table-striped' style='width: 100%; font-size:10px;'><thead><tr><th><input type='checkbox' id='chkgral' onchange='toggle_checks(this)' rel='gral'></th><th>Nro.Parte</th><th>Fec.Practica</th><th>Fec.Parte</th><th>Fecha</th><th>NHC</th><th>Afiliado</th><th>Seccional</th><th>Cantidad</th><th>Codigo</th><th>Practica</th><th>Especialidad</th><th>Médico</th><th>RV</th></tr></thead><tbody>";
        var Contenido = "";
        $.each(Lista, function (index, Detalle) {
            Contenido = Contenido + "<tr><td><input type='checkbox' class='checkstable' onclick='toggle_check(this)' id='chk" + index + "' rel='" + Detalle.NroParte + "," + Detalle.Codigo + "'></td><td style='cursor:pointer' onclick=Ventana('CargaPracticasMedicasHC.aspx?S=1&Id=" + Detalle.NroParte + "');><a href='#'>" + Detalle.NroParte + "</a></td><td> " + Detalle.FechaPractica + " </td><td> " + Detalle.FechaParte + " </td><td> " + Detalle.FechaRendicion + " </td><td> " + Detalle.NHC + " </td><td> " + Detalle.Afiliado + " </td><td> " + Detalle.Seccional + " </td><td> " + Detalle.Cantidad + " </td><td> " + Detalle.Codigo + " </td><td> " + Detalle.Practica + " </td><td> " + Detalle.Especialidad + " </td><td> " + Detalle.Medico + " </td><td> " + Detalle.RV + " </td></tr>";
        });
        var Pie = "</tbody></table>";
        $("#trx").html(Contenido);
        $("#Total").html("Registros: " + Lista.length);
    }
}

function Ventana(url) {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
            'width': '100%',
            'height': '120%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'scrolling': 'no',
            'onClosed': function () {
                $("#btnBuscar").click();
            },
            'hideOnOverlayClick': false,
            'enableEscapeButton': false
        });
}

$("#btnBuscar").click(function () {
    List_Partes();
});

function toggle_checks(chk) {
    if ($(chk).is(":checked")) {
        $(".checkstable").attr("checked", "checked");
        $(".checkstable").addClass("active");
    }
    else {
        $(".checkstable").removeAttr("checked");
        $(".checkstable").removeClass("active");
    }
}

function toggle_check(chk) {
    if ($(chk).is(":checked")) {
        $(chk).attr("checked", "checked");
        $(chk).addClass("active");
    }
    else {
        $(chk).removeAttr("checked");
        $(chk).removeClass("active");
    }
}

$("#btnProcesar").click(function () {
    var size = $(".checkstable").size();
    var k = 0;
    var o = 0; //Procesados
    $("#tabla").hide();
    $("#cargando").show();
    objDetails = new Array();
    if (size != 0) {
        $(".checkstable").each(function () {
            k = k + 1;
//            if ($(this).hasClass("active")) {
                var parts = $(this).attr("rel").split(",");
                var Obj = {};
                Obj.NroParte = parts[0];
                Obj.Codigo = parts[1];
                if ($(this).hasClass("active")) Obj.Procesado = 1; //Proc
                else Obj.Procesado = 0; //No proc
                objDetails[o] = Obj;
                o = o + 1;
//            }
            if (k == size && o != 0) {
                SaveDetail();
                alert("Partes Procesados de Forma Correcta");
                $("#chkgral").removeAttr("checked");
                $("#tabla").show();
                $("#cargando").hide();
                List_Partes();
            }
        });
        if (o == 0) {
            $("#tabla").show();
            $("#cargando").hide();
            alert("Seleccione algún parte");
        }
    }
    else {

        $("#tabla").show();
        $("#cargando").hide();
        alert("Seleccione algún parte");
    }
});

function SaveDetail() {
    var json = JSON.stringify({ "Obj": objDetails });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/InsertSeleccionDatos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores
    });
}

$("#btnNoRevalorizado").click(function () {
    var size = $(".checkstable").size();
    var k = 0;
    var o = 0;
    $("#tabla").hide();
    $("#cargando").show();
    if (size != 0) {
        $(".checkstable").each(function () {
            k = k + 1;
            if ($(this).hasClass("active")) {
                var parts = $(this).attr("rel").split(",");
                var Obj = {};
                Obj.NroParte = parts[0];
                Obj.Codigo = parts[1];
                Obj.Revalorizado = false;
                objDetails[o] = Obj;
                o = o + 1;
            }
            if (k == size && o != 0) {
                SaveRevalorizado();
            }
        });
        if (o == 0) {
            $("#tabla").show();
            $("#cargando").hide();
            alert("Seleccione algún parte");
        }
    }
    else {
        $("#tabla").show();
        $("#cargando").hide();
        alert("Seleccione algún parte");
    }
});

$("#btnRevalorizado").click(function () {
    var size = $(".checkstable").size();
    var k = 0;
    var o = 0;
    $("#tabla").hide();
    $("#cargando").show();
    objDetails = new Array();
    if (size != 0) {
        $(".checkstable").each(function () {
            k = k + 1;
            if ($(this).hasClass("active")) {
                var parts = $(this).attr("rel").split(",");
                var Obj = {};
                Obj.NroParte = parts[0];
                Obj.Codigo = parts[1];
                Obj.Revalorizado = true;
                objDetails[o] = Obj;
                o = o + 1;
            }
            if (k == size && o != 0) {
                SaveRevalorizado();
            }
        });
        if (o == 0) {
            $("#tabla").show();
            $("#cargando").hide();
            alert("Seleccione algún parte");
        }
    }
    else {
        $("#tabla").show();
        $("#cargando").hide();
        alert("Seleccione algún parte");
    }

});

function alerta() {
    alert("Partes Procesados de Forma Correcta");
}

function SaveRevalorizado() {
    var json = JSON.stringify({ "Obj": objDetails });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/RevalorizarParte",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores,
        success: SaveRevalorizado_ok,
        complete: function () {
            $("#tabla").show();
            $("#cargando").hide();
            List_Partes();
        }
    });
}

function SaveRevalorizado_ok() {
    alert("Partes Procesados de Forma Correcta");
    $("#chkgral").removeAttr("checked");
}

$("#btnCambiarFecha").click(function () {
    var size = $(".checkstable").size();
    var k = 0;
    var o = 0;
    $("#tabla").hide();
    $("#cargando").show();
    objDetails = new Array();
    if (size != 0) {
        $(".checkstable").each(function () {
            k = k + 1;
            if ($(this).hasClass("active")) {
                var parts = $(this).attr("rel").split(",");
                var Obj = {};
                Obj.NroParte = parts[0];
                Obj.Codigo = parts[1];
                objDetails[o] = Obj;
                o = o + 1;
            }
            if (k == size && o != 0) {
                UpdateFechaRendicion();
            }
        });
        if (o == 0) {
            $("#tabla").show();
            $("#cargando").hide();
            alert("Seleccione algún parte");
        }
    }
    else {
        $("#tabla").show();
        $("#cargando").hide();
        alert("Seleccione algún Parte");
    }
        
});

function UpdateFechaRendicion() { //Actualizo la fecha de rendicion de los detalles seleccionados...
    var json = JSON.stringify({ "Obj": objDetails, "Fecha": $("#txtFechaRendicion").val() });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Facturacion/Facturacion.asmx/UpdateFechaRendicion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores,
        success: UpdateFechaRendicion_ok,
        complete: function () {
            List_Partes();   
        }
    });
}

function UpdateFechaRendicion_ok() {
    alert("Fecha de Rendicion Modificada");
    $("#chkgral").removeAttr("checked");
}

$("#txtCodigoPrac").blur(function () {
    $("#cbo_Practica").val($("#txtCodigoPrac").val());

});

$("#txtCodigoMod").blur(function () {
    $("#cbo_Modulo").val($("#txtCodigoMod").val());

});

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

function RecargarPagina(url) {
    document.location = "../Facturacion_Cap/Selecciondedatos.aspx" + url;
}