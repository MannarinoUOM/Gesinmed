var objPractica = {};
var Total = -1;
var Editando = 0;
var EditandoPos = -1;
var objPracticas = new Array();
var Historial = 0;
var nhcGlobal = 0;
var afiliafoIdGlobal = 0;

function InitControls() {
    List_Servicios();
    ObtenerUsuario();
}

$(document).ready(function () {
    InitControls();
    $("#desdeaqui").click();
});

$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
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

function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": "DU" });
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

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    Historial = 0;
    if (Paciente.length == 0) { alert("Paciente no encontrado."); $("#cbo_Origen").val("0"); $("#NHC").val(""); $("#txtDNI").val(""); return false; }
    $.each(Paciente, function (index, paciente) {
        ListMovimientos(paciente.NHC_UOM);
        $("#afiliadoId").val(paciente.documento);
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#txtDNI").val(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#NHC").val(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $("#Cod_OS").val(paciente.OSId);

        //alert(paciente.Foto);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
        $("#cbo_Origen").focus();
        $("#tomo").show();
        nhcGlobal = paciente.NHC_UOM;
        afiliafoIdGlobal = paciente.documento;
        $("#ok").hide();
        $("#error").hide();
        traerTomos();
    });
}

$("#btnImprimir").click(function () {
    if ($("#CargadoNHC").html().trim().length == 0) { alert("Ingrese Paciente"); $("#NHC").focus() ; return false; }
    Imprimir("../Impresiones/Impresion_HC_Movimientos.aspx?NHC=" + $("#CargadoNHC").html());
});

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

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
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

$('#desdeaqui').click(function () {
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
    $("#NHC").focus();
});


function List_Servicios() {
    $.ajax({
        type: "POST",
        url: "../Json/Internaciones/IntSSC.asmx/Servicios_Archivo",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Servicios_Cargado,
        error: errores,
        complete: function () {
            $("#cbo_Origen").val('349');
        }
    });
}

function List_Servicios_Cargado(Resultado) {
    var Servicios = Resultado.d;
    $.each(Servicios, function (index, Servicio) {
        $('#cbo_Origen').append(
              $('<option></option>').val(Servicio.id).html(Servicio.descripcion)
            );
        $('#cbo_Destino').append(
              $('<option></option>').val(Servicio.id).html(Servicio.descripcion)
            );
    });
}

function Validar() {
    if ($("#usuarioId").val().trim().length == 0) { alert("Usuario no logueado."); return false; }
    if ($("#CargadoNHC").html().trim().length == 0) { alert("Ingrese Paciente."); return false; }
    if ($("#cbo_Origen :selected").val() == "0") { alert("Ingrese Origen."); return false; }
    if ($("#cbo_Destino :selected").val() == "0") { alert("Ingrese Destino."); return false; }
    if ($("#cbo_Origen :selected").val() == $("#cbo_Destino :selected").val()) { alert("El origen coincide con el destino."); return false; }
    return true;
}

$("#btnAgregar").click(function () {
    if (!Validar()) return false;
    CargarDatos();
});

function CargarDatos() {
    objPractica = {};
    objPractica.Id = Editando;
    objPractica.OrigenId = $("#cbo_Origen :selected").val();
    objPractica.DestinoId = $("#cbo_Destino :selected").val();
    objPractica.Origen = $("#cbo_Origen :selected").text();
    objPractica.Destino = $("#cbo_Destino :selected").text();
    objPractica.NHC = $("#CargadoNHC").html();
    objPractica.UsuarioId = $("#usuarioId").val();
    objPractica.Usuario = $("#usuario").val();
    objPractica.Observaciones = $("#txtObservaciones").val().trim().toUpperCase();
    objPractica.Fecha = FechaSystem();
    var Estado = true;
    objPractica.Estado = Estado;
    InsertMovimiento(objPractica);
    LimpiarCampos();
}

function strpad00(s) {
    s = s + '';
    if (s.length === 1) s = '0' + s;
    return s;
}

function FechaSystem() {
    var currentdate = new Date();
    var datetime = strpad00(currentdate.getDate())
    + "/" + strpad00((currentdate.getMonth() + 1))
    + "/" + currentdate.getFullYear()
    + " "
    + currentdate.getHours() + ":"
    + strpad00(currentdate.getMinutes()) + ":"
    + strpad00(currentdate.getSeconds());
    return datetime;
}

function ObtenerUsuario() { //Obtengo el Usuario de la Sesion Actual.
    $.ajax({
        type: "POST",
        url: "../Json/Usuarios/Usuarios.asmx/UsuarioActual",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#usuarioId").val(Resultado.d.id);
            $("#usuario").val(Resultado.d.nombre);
        },
        error: errores
    });
}

$("#btnLimpiar").click(function () {
    $("#cbo_Origen").val("0");
    $("#cbo_Destino").val("0");
    $("#txtObservaciones").val('');
    Editando = 0;
    EditandoPos = -1;
    $("#NHC").val('');
    $("#txtDNI").val('');
    $("#NHC").focus();
    $("#Total").html("");
    $("#TablaPracticas").empty();
    Historial = 0;
});

function LimpiarCampos() {
    $("#cbo_Origen").val("0");
    //$("#cbo_Destino").val("0");
    $("#txtObservaciones").val('');
    Editando = 0;
    EditandoPos = -1;
    $("#NHC").val('');
    $("#txtDNI").val('');
    $("#NHC").focus();
    Historial = 0;
}

function Editar(Nro) {
    $("#cbo_Origen").val($("#MovOrigen" + Nro).html());
    $("#cbo_Destino").val($("#MovDestino" + Nro).html());
    $("#txtObservaciones").val($("#MovObs" + Nro).html()); 
    Editando = Nro;
}

function Eliminar(Nro) {
    var json = JSON.stringify({ "Id": Nro });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/HistoriaClinica/HistoriaClinica.asmx/HC_Movimiento_Delete",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        complete: function () {
            ListMovimientos($("#CargadoNHC").html());
        },
        error: errores
    });
}

function InsertMovimiento(h) {
    var json = JSON.stringify({"h":h});
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/HistoriaClinica/HistoriaClinica.asmx/HC_Movimiento_Insert",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        complete: function () {
            ListMovimientos($("#CargadoNHC").html(), 0);
            LimpiarCampos();
        },
        error: errores
    });
}

$("#btnHistorial").click(function () {
    Historial = 1;
    if ($("#CargadoNHC").html().trim().length > 0)
        ListMovimientos($("#CargadoNHC").html());
    else alert("Ingrese Nro. HC");
});

function ListMovimientos(NHC) {
    var json = JSON.stringify({ "NHC": NHC });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/HistoriaClinica/HistoriaClinica.asmx/HC_Movimiento_Listar",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#Total").html("MOVIMIENTOS: " + Resultado.d.length.toString());
            RenderizarTabla(Resultado.d);
        },
        beforeSend: function () {
            $("#cbo_Origen").attr("disabled",true);
        },
        complete: function () {
            $("#cbo_Origen").removeAttr("disabled");
        },
        error: errores
    });
}

function RenderizarTabla(Lista) {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Fecha de Movimiento</th><th>Origen</th><th>Destino</th><th>Usuario</th><th>Observaciones</th></tr></thead><tbody>";
    var Contenido = "";
    if (Lista.length == 0) $("#cbo_Origen").val("349");
    $.each(Lista, function (i, Mov) {
        Contenido = Contenido + "<tr><td> " + Mov.Fecha + " </td><td>" + Mov.Origen + "</td><td id='MovOrigen" + Mov.Id + "' style='display:none;'>" + Mov.OrigenId + "</td><td>" + Mov.Destino + "</td><td id='MovDestino" + Mov.Id + "' style='display:none;'>" + Mov.DestinoId + "</td><td> " + Mov.Usuario + " </td><td id='MovObs" + Mov.Id + "' style='color:red;'>" + Mov.Observaciones + "</td></tr>";
        if (i == 0) $("#cbo_Origen").val(Mov.DestinoId);
        if (Historial == 0) return false; //Muestro solo el primer registro...
    });  
    var Pie = "</tbody></table>";
    $("#TablaPracticas").html(Encabezado + Contenido + Pie);
}

$("#btnCancelar").click(function () {
    LimpiarCampos();
});


$(function () {
    $(document).keydown(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 121) { //F10
            e.preventDefault();
            if ($("#cbo_Origen").is(":disabled")) return false;
            if (confirm("¿Desea confirmar movimiento?")) {
                if (!Validar()) return false;
                CargarDatos();
                return false;
            }
        }
    });
});

$("input:text").focus(function () {
    $(this).select();
});

$("input:text").mouseup(function () {
    return false;
});

$("#NHC").keydown(function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter
        e.preventDefault();
        if ($(this).val().trim().length > 0)
            Cargar_Paciente_NHC($(this).val());
        else alert("Ingrese Nro. HC.");
        return false;
    }
    if (code == 38) //Arrow up
    {
        $(this).val('');
    }
});

$("#txtDNI").keydown(function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter
        e.preventDefault();
        if ($(this).val().trim().length > 0)
            Cargar_Paciente_Documento($(this).val());
        else alert("Ingrese Nro. Doc.");
        return false;
    }
});

$("#btnActualizarTomo").click(function () {
    var tomos = 0;
    if ($("#txtTomo").val().trim().length <= 0) { tomos = 0; } else { tomos = $("#txtTomo").val(); }

    var json = JSON.stringify({ "nhc": nhcGlobal, "afiliafoId": afiliafoIdGlobal, "tomos": tomos });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/HistoriaClinica/HistoriaClinica.asmx/ActualizarTomoHC",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
          //  alert(Resultado.d);
            switch (Resultado.d) {
                case 1:
                    $("#error").hide();
                    $("#ok").show();
                    $("#ok").addClass("animacion");
                    setTimeout(function () { $("#ok").removeClass("animacion") }, 3000);
                    break;
                case 0:
                    $("#ok").hide();
                    $("#error").show();
                    $("#error").addClass("animacion");
                    setTimeout(function () { $("#error").removeClass("animacion") }, 3000);
                    break;
                default:
                    alert("Ha perdido sesión!. Vuleva a loguearse.");
                    break;
            }
        },
        error: errores
    });
});

function traerTomos() {
    var json = JSON.stringify({ "nhc": nhcGlobal, "afiliafoId": afiliafoIdGlobal });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/HistoriaClinica/HistoriaClinica.asmx/TraerTomoNHC",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
           // alert(Resultado.d);
            switch (Resultado.d) {
                case 0:
                    $("#txtTomo").val("");
                    $("#ok").hide();
                    break;
                case -1:
                    alert("Ha perdido sesión!. Vuleva a loguearse.");
                    break;
                default:
                    $("#txtTomo").val(Resultado.d);
                    $("#error").hide();
                    $("#ok").show();
                    $("#ok").addClass("animacion");
                    setTimeout(function () { $("#ok").removeClass("animacion") }, 3000);
                    break;
            }
        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}