var ErrorHora = false;
var CUIL = 0;
var Cod_OS = 0;
var libres = 0;
var T_libres = 0;
var T_ocupados = 0;
var T_sobreturnos = 0;
var T_cancelados = 0;
var dias_turnos = [];

var objListTurnos = new Array();
var objTurnosSelec = new Array();
var Ids = "";

Cargar_Seccionales_Lista();

$("#btnTurnosOtorgados").click(function () {
    if ($(this).attr("disabled")) return false;
    else CargarHistorialTurnos();
});


function CargarHistorialTurnos() {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': "HistoricodeTurnosporPaciente.aspx?T=1&ID="+$("#afiliadoId").val(),
		    'width': '100%',
		    'height': '100%',
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

////***CONTROL POR NHC***////
$("#txtNHC_Control").keydown(function (event) {
    if (event.which == 13 || event.which == 9) { //Enter o TAB
        event.preventDefault();
        $("#txtDoc_Control").val('');
        if ($(this).val().trim().length > 0) Cargar_Paciente_NHC($(this).val().trim());
        else alert("Ingrese Nro. HC.");
    }
}); 

function Cargar_Paciente_NHC(NHC) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            if (lista.length > 0) VerificarPaciente(lista[0]);
            else alert("Paciente no encontrado.");
        },
        error: errores
    });
}

///***CONTROL POR DOC***///
$("#txtDoc_Control").keydown(function (event) {
    if (event.which == 13 || event.which == 9) { //Enter o TAB
        event.preventDefault();
        $("#txtNHC_Control").val('');
        if ($(this).val().trim().length > 0) Cargar_Paciente_Documento($(this).val().trim());
        else alert("Ingrese Documento.");
    }
}); 


function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": 'DU' });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            if (lista.length > 0) VerificarPaciente(lista[0]);
            else alert("Paciente no encontrado.");
        },
        error: errores
    });
}

function VerificarPaciente(Paciente) {
    if (!Paciente.Vencido) { //Paciente sin vencimiento
        $(".controles").removeAttr("disabled");
        $("#botones").show();
        $("#txtDoc_Control").val(Paciente.documento_real);
        $("#txtNHC_Control").val(Paciente.NHC_UOM);
        $("#txtPaciente").val(Paciente.Paciente);

        if (Paciente.Paciente.length > 20) $("#lblPaciente").html("Paciente: " + Paciente.Paciente.substring(0, 20) + "...")
        else $("#lblPaciente").html("Paciente: " + Paciente.Paciente);
        $("#lblSeccional").html("Seccional: " + Paciente.Seccional);
        if (Paciente.Observaciones.length > 20)
            $("#lblObservaciones").html("Observaciones: " + Paciente.Observaciones.substring(0, 20) + "...");
        else $("#lblObservaciones").html("Observaciones: " + Paciente.Observaciones);
        $("#lblPaciente").attr("title", "Paciente: " + Paciente.Paciente);
        $("#lblObservaciones").attr("title","Observaciones: " + Paciente.Observaciones);
        $("#afiliadoId").val(Paciente.documento);
        $("#cbo_Especialidad").focus();
    }
    else { //Paciente
        alert("Paciente: " + Paciente.Paciente + " dado de baja, con fecha: " + Paciente.FechaVencido);
        $(".controles").attr("disabled",true);
        $("#botones").hide();
        $("#afiliadoId").val('');
        $("#txtNHC_Control").focus();
    }
}

function RecargarPagina(url) {
    document.location = "CargaSemanal.aspx" + url;
}

function CambiarPagina(url) {
    document.location = url + "&TurnoTelefonico=" + $("#cb_ttel").is(':checked');
}

$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

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

function Cargar_Especialidades(Todos, Id, SoloTurnos) {
//    $.ajax({
//        type: "POST",
//        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
//        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: Especialidad_Cargadas,
//        error: errores
    //    });

    $('#cbo_Especialidad').empty();

    $('#cbo_Especialidad').append('<option value="0">Especialidad</option>');
    $('#cbo_Especialidad').append('<option value="343">ECOGRAFIA</option>');
    $('#cbo_Especialidad').append('<option value="339">MAMOGRAFIA</option>');
    $('#cbo_Especialidad').append('<option value="341">RADIOLOGIA</option>');
    $('#cbo_Especialidad').append('<option value="340">RESONANCIA MAGNETICA</option>');
    $('#cbo_Especialidad').append('<option value="342">TOMOGRAFIA</option>'); 

}

$("#txt_dni").blur(function () {
    var str = $("#txt_dni").val();
    var ceros = "";
    var index = str.indexOf("-");
    if (index != -1 && index != 0) {
        var cant = 8 - index;
        for (i = 0; i < cant; i++)
            ceros = ceros + "0";
        $("#txt_dni").val(ceros + $("#txt_dni").val());
    }
});

function CargarLosTurnos(valor) {
    var reservados = false;
    var libres = false;

    if (valor == 0) { 
        reservados = $("#btn_Todos").hasClass('active') || $("#btn_Reservados").hasClass('active');
        libres = $("#btn_Libres").hasClass('active') || $("#btn_Todos").hasClass('active');
    }

    if (valor == 1) { //Todos
        reservados = false;
        libres = false;
    }

    if (valor == 2) { //Libres
        reservados = false;
        libres = true;
    }

    if (valor == 3) { //Ocupados
        reservados = true;
        libres = false;
    }

    var _sobreturnos = false;
    if (valor == 4) var _sobreturnos = true; //Sobreturnos

    var _cancelados = false;
    if (valor == 5) var _cancelados = true; //Cancelados
    
    Cargar_Turnos($("#cbo_Medico").val(), $("#cbo_Especialidad").val(), $('#txtFecha').val(), $("#txtHora").val(), reservados, libres, $("#cbo_Dias").val(), _sobreturnos, _cancelados);
}

function ClearCounters() {
    T_libres = 0;
    T_ocupados = 0;
    T_sobreturnos = 0;
    T_cancelados = 0;
}

function Cargar_Turnos(MedicoId, EspecialidadId, FechaDesde, HoraDesde, Reservados, Libres, Dias, Sobreturnos, Cancelados) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Turno_List_IMG",
        data: '{MedicoId: "' + MedicoId + '", EspecialidadId: "' + EspecialidadId + '", Fecha: "' + FechaDesde + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Turnos_Cargados,
        error: errores,
        beforeSend: antes,
        complete: finalizo
    });
}

function finalizo() {
    $("#cargando").hide();
    $("#TablaTurnos_div").show();
    PrintCounters();
}

function antes() {
    $("#cargando").show();
    ClearCounters(); //Pone en 0 los contadores de turnos
    $("#TablaTurnos_div").hide();
}


$("#txtFecha").datepicker();

function Actualizar_Telefono_Seccional(Telefono, Seccional, Documento) {
    Cod_OS = $("#cbo_ObraSocial :selected").val();
    if (Cod_OS == undefined) { Cod_OS = 112103 }

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
        $("#desdeaqui").show();
        $("#controlTelefono").removeClass("error");
        $("#controlSeccional").removeClass("error");
        $("#CargadoTelefono").html($("#txtTelefono").val());


        if ($("#Cod_OS").val() == "112103") {
            $("#CargadoSeccional").html($("#cboSeccional :selected").text());
        }
        else {
            $("#CargadoSeccional").html($("#cbo_ObraSocial :selected").text());
        }

    }
    else {


        if ($("#txtTelefono").val().length < 6) {
            $("#controlTelefono").addClass("error");
            $("#txtTelefono").focus();
        }
        else {
            $("#controlTelefono").removeClass("error");
        }

        if ($("#cboSeccional :selected").val() == "999") {
            $("#controlSeccional").addClass("error");
        }
        else {
            $("#controlSeccional").removeClass("error");
        }

    }

}


function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {
        $("#btnactualizar").show();
        $("#btnCancelarPedidoTurno").show();

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#btnOtorgados").css('display', 'inline');
        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txt_dni").attr('value', paciente.documento);
        $("#txtNHC").attr('value', paciente.NHC);
        $("#txtTelefono").attr('value', paciente.Telefono);



        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);



        if ($("#txtTelefono").val().length < 5) {
            $("#controlTelefono").addClass("error");
            $("#txtTelefono").focus();
            PError = true;
        }


        if (paciente.Nro_Seccional == "999") {
            $("#controlSeccional").addClass("error");
            PError = true;
        }



        $("#CargadoApellido").html(paciente.Paciente);

        var AnioActual = new Date();
        var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

        $("#CargadoEdad").html(AnioActual.getFullYear() - AnioNacimiento.getFullYear());
        $("#CargadoDNI").html(paciente.documento);
        $("#CargadoNHC").html(paciente.cuil);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html($("#cboSeccional :selected").text());

        $("#Cod_OS").val(paciente.OSId);
        $("#cbo_ObraSocial").show();
        $("#cboSeccional").hide();
        $("#Titulo_Seccional_o_OS").html("Ob. Social");
        $("#CargadoSeccionalTitulo").html("Ob. Social");
        Cargar_ObraSociales_Cargar(paciente.OSId);
        $("#CargadoSeccional").html(paciente.ObraSocial);


        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
        }

    });
}


function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    $.each(Paciente, function (index, paciente) {
        $("#btnactualizar").show();
        $("#btnCancelarPedidoTurno").show();

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txtNHC").attr('value', paciente.cuil);
        $("#txtTelefono").attr('value', paciente.Telefono);
        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);



        $("#btnOtorgados").css('display', 'inline');

        if ($("#txtTelefono").val().length < 5) {
            $("#controlTelefono").addClass("error");
            $("#txtTelefono").focus();
            PError = true;
        }
        if (paciente.Nro_Seccional == 999) {
            $("#controlSeccional").addClass("error");
            PError = true;
        }


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
        $("#CargadoSeccional").html($("#cboSeccional :selected").text());

        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#Titulo_Seccional_o_OS").html("Ob. Social");
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            Cargar_ObraSociales_Cargar(paciente.OSId);
            $("#CargadoSeccional").html(paciente.ObraSocial);
        }
        else {
            $("#btnVencimiento").show();
        }

        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}

function PrintCounters() {
    $("#btn_Libres").html("Libres ("+T_libres+")");
    $("#btn_Reservados").html("Ocupados (" + T_ocupados + ")");
    $("#btn_SobreT").html("Sobreturnos (" + T_sobreturnos + ")");
    $("#btn_CancelT").html("Cancelados (" + T_cancelados + ")"); 
}

function Turnos_Cargados(Resultado) {

    var textosemana = new Array(7);
    textosemana[0] = "Dom.";
    textosemana[1] = "Lun.";
    textosemana[2] = "Mar.";
    textosemana[3] = "Mié.";
    textosemana[4] = "Jue.";
    textosemana[5] = "Vie.";
    textosemana[6] = "Sáb.";

    objListTurnos.length = 0;
    var Turnos = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var SobreTurno = false;

    if ($("#btn_SobreTurno").hasClass('active')) {
        SobreTurno = true;
    }
    else {
        SobreTurno = false;
    }

    //
    //ClearCounters();
    //Tabla_Titulo = "<table id='TablaTurnos' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>&nbsp;</th><th>Fecha</th><th>Hora</th><th>Especialidad</th><th>Médico</th><th>Paciente</th><th>Seccional/OS</th></tr></thead><tbody>";
//    if (Turnos.length == 0) {
//        Tabla_Fin = "</tbody></table>";
//        $("#TablaTurnos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
//        //alert("No hay turnos para el médico seleccionado.");
//        return;
    //    }

    $("#tf0").html("");
    $("#tf1").html("");
    $("#tf2").html("");
    $("#tf3").html("");
    $("#tf4").html("");
    $("#tf5").html("");
    $("#tf6").html("");

    var poscheck = -1;

    $.each(Turnos, function (index, turnos) {
        //        switch (turnos.Clase) {
        //            case 'warning': T_libres++; break;
        //            case 'success': T_ocupados++; break;
        //            case 'error': T_cancelados++; break;
        //            case 'info': T_sobreturnos++; break;
        //        }
        poscheck++;
        var Adj = "";
        if (turnos.FechaAdj != null) {
            Adj = turnos.FechaAdj + "-" + turnos.Usuario;
        }

        //Tabla_Datos = Tabla_Datos + "<tr rel='tooltip' title='" + Adj + "' class='" + turnos.Clase + "'";

        objListTurnos[index] = turnos;
        
        var OS = "";
        if (turnos.OS.length > 13) {
            OS = turnos.OS.substring(0, 14) + "...";
        }
        else {
            OS = turnos.OS;
        }
        //var multi = "<td class='checks'>&nbsp;</td>";
        //if (turnos.Clase == 'warning') multi = "<td><input class='checks' onclick=selec('" + index + "') type=checkbox id='chk" + index + "' value='" + index + "'/></td>";

        var _NHC = "";
        if (turnos.NombrePaciente.trim().length > 0) { _NHC = " (" + turnos.NHC + ")"; }
        //Tabla_Datos = Tabla_Datos + ">" + multi + "<td>" + turnos.DiaSemana + " " + turnos.Fecha + "</td><td>" + turnos.Hora + "</td><td>" + turnos.EspecialidadDescripcion + "</td><td>" + turnos.NombreMedico + "</td><td>" + turnos.NombrePaciente + _NHC + " </td><td>" + OS + "</td></tr>";

        //<span class="bordeado libre"><input type="checkbox">99:99</span>

        var cual = 0;

        if ($("#fecha0").html().substring(6, 8).trim() == turnos.Fecha.substring(0, 2)) { cual = 0; }
        if ($("#fecha1").html().substring(6, 8).trim() == turnos.Fecha.substring(0, 2)) { cual = 1; }
        if ($("#fecha2").html().substring(6, 8).trim() == turnos.Fecha.substring(0, 2)) { cual = 2; }
        if ($("#fecha3").html().substring(6, 8).trim() == turnos.Fecha.substring(0, 2)) { cual = 3; }
        if ($("#fecha4").html().substring(6, 8).trim() == turnos.Fecha.substring(0, 2)) { cual = 4; }
        if ($("#fecha5").html().substring(6, 8).trim() == turnos.Fecha.substring(0, 2)) { cual = 5; }
        if ($("#fecha6").html().substring(6, 8).trim() == turnos.Fecha.substring(0, 2)) { cual = 6; }

        if (turnos.Clase == "ocupado" || turnos.Clase == "cancelado" || turnos.Clase == "sobreturno") {
            $("#tf" + (cual)).html($("#tf" + (cual)).html() + "<span class='bordeado checks " + turnos.Clase + " ' style='height:25px;padding-left:23px;font-size:14px; width:57px;' rel='tooltip' title='" + turnos.NombrePaciente + _NHC + "--" + Adj + "'>" + turnos.Hora + "</span>");
        }
        else {
            $("#tf" + (cual)).html($("#tf" + (cual)).html() + "<span class='bordeado " + turnos.Clase + " '><input class='checks' onclick=selec('" + index + "') type=checkbox id='chk" + index + "' value='" + index + "'/><label for='chk" + index + "'>" + turnos.Hora + "</label></span>");
        }

    });

    //Tabla_Fin = "</tbody></table>";
    //$("#TablaTurnos").empty();
    //$("#TablaTurnos").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function selec(z) {
    objTurnosSelec.length = 0;
    $(".checks").each(function (index, obj) {
        if ($(obj).is(":checked")) {            
            objTurnosSelec.push(objListTurnos[index]);
        }
    });
}

function DeleteItem(obj) {
    objTurnosSelec = jQuery.grep(objTurnosSelec, function (value) {
        return value != obj;
    });
}


function VerSelection() {
    var fechas = "";
    Ids = "";
    $.each(objTurnosSelec, function (index, obj) {
        fechas = fechas + obj.Fecha + " " + obj.Hora + "hs.\n";
        Ids = Ids + "," + obj.Fecha + " " + obj.Hora;
    });
    if (confirm("¿Desea otorgar los siguientes turnos?\n" + fechas)) ConfirmarTurnos();
}

$("#btnMulti").click(function () {
    if (!$("#cb_pv").is(":checked") && !$("#cb_ulterior").is(":checked")) { alert("Seleccione Primera vez o Ulterior."); return false; }
    if (objTurnosSelec.length > 0) VerSelection();
    else {
        if ($("#ck_turnoforzado").is(":checked")) {
            ConfirmarTurnos_NuevoTurno();
        }
        else {
            alert("No hay turnos seleccionados."); return;
        }
    }
});

function ConfirmarTurnos() {
    if (!$.isNumeric($("#afiliadoId").val()) || $("#afiliadoId").val() <= 0) {alert("Paciente no válido."); return false;}
    var url = "CargaExpressDatos.aspx?MedicoID=" + objTurnosSelec[0].MedicoId + "&EspecialidadId=" + objTurnosSelec[0].EspecialidadId + "&Fecha=" + objTurnosSelec[0].Fecha + "&Hora=" + objTurnosSelec[0].Hora + "&Primera=" + $("#cb_pv").is(':checked') + "&TurnoTelefonico=" + $("#cb_ttel").is(':checked') + "&Ids=" + Ids + "&ID="+$("#afiliadoId").val();
    Ventana(url);
}

function ConfirmarTurnos_NuevoTurno() {
    if (!$.isNumeric($("#afiliadoId").val()) || $("#afiliadoId").val() <= 0) { alert("Paciente no válido."); return false; }
    var url = "CargaExpressDatos.aspx?MedicoID=" + objTurnosSelec[0].MedicoId + "&EspecialidadId=" + objTurnosSelec[0].EspecialidadId + "&Fecha=" + objTurnosSelec[0].Fecha + "&Hora=" + objTurnosSelec[0].Hora + "&Primera=" + $("#cb_pv").is(':checked') + "&TurnoTelefonico=" + $("#cb_ttel").is(':checked') + "&Ids=" + Ids + "&GenerarTurno=1&ID=" + $("#afiliadoId").val();
    Ventana(url);
}

var impreso = false;

function Ventana(url) {
    $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
            'width': '85%',
            'height': '110%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
            'onClosed': function () {
                //if (impreso) { 
                    
                //}
                //else
                //{
                document.location = "../Turnos_IMG/CargaSemanal.aspx";
                //}

            }
        });
}

function Cargar_Centro_Unico() {
    var Todos = 0;
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CentroUnico",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Centro_Unico_Select,
        error: errores
    });

}


function Cargar_Centro_Unico_Select(Resultado) {
    var Centros = Resultado.d;
    $('#cbo_Centro').empty();
    $.each(Centros, function (index, centro) {
        $('#cbo_Centro').append(
              $('<option></option>').val(centro.Id).html(centro.RazonSocial)
            );
    });
}

function Cargar_Tipo_Documentos_Lista_Cargados(Resultado) {
    var Documentos = Resultado.d;
    $('#cboTipoDoc').empty();
    $.each(Documentos, function (index, tdoc) {
        $('#cboTipoDoc').append(
              $('<option></option>').val(tdoc.Id).html(tdoc.Descripcion)
            );
    });
}


function Seccionales_Listas_Cargadas(Resultado) {
    var Seccionales = Resultado.d;
    $('#cboSeccional').empty();
    $.each(Seccionales, function (index, seccionales) {
        $('#cboSeccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
    });
}





function MostrarBotonEditarEliminar(id) {
    $("#Editar" + id).css("display", "inline");
    $("#Elminar" + id).css("display", "inline");
}

function OcultarBotonEditarEliminar(id) {
    $("#Editar" + id).css("display", "none");
    $("#Elminar" + id).css("display", "none");
}


function Cargar_Medicos_por_Especialidad(Especialidad,Tipo) {
    var json = JSON.stringify({"Especialidad": Especialidad, "Tipo": Tipo});
    $.ajax({
        type: "POST",
        //url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivos",
        //data: '{Especialidad: "' + Especialidad + '"}',
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivosTipo",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Medicos_por_Especialidad_Cargados,
        error: errores
    });

}


function Cargar_Tipo_Documentos_Lista() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Documentos_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Tipo_Documentos_Lista_Cargados,
        error: errores
    });

}


function Cargar_Seccionales_Lista() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Seccionales_Listas_Cargadas,
        error: errores
    });

}

function Medicos_por_Especialidad_Cargados(Resultado) {
    var Medicos = Resultado.d;
    $('#cbo_Medico').empty();
    $('#cbo_Medico').append('<option value="0">Medicos</option>');
    $.each(Medicos, function (index, medicos) {
        $('#cbo_Medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
    });
}

$("#txtHora").keypress(function (e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
        if($('#txtHora').val().length == 5) $("#btn_SobreTurno").click();
    }
});

$("#chkSobreturno").click(function () {
    if ($("#chkSobreturno").is(":checked")) {
        $("#ControltxtHora").show();
        $("#btnMulti").hide();
        objTurnosSelec = new Array();
        $(".checks").attr("disabled", true);
        $(".checks").removeAttr("checked");
        $("#ck_turnoforzado").prop('checked', false);
    }
    else {
        $("#ControltxtHora").hide();
        $("#btnMulti").show();
        $(".checks").removeAttr("disabled");
        objTurnosSelec = new Array();
    }
});



$("#ck_turnoforzado").click(function () {
    if ($("#ck_turnoforzado").is(":checked")) {
        $("#ControltxtHora").show();
        $("#btnMulti").hide();
        objTurnosSelec = new Array();
        $(".checks").attr("disabled", true);
        $(".checks").removeAttr("checked");
        $("#chkSobreturno").prop('checked', false);
    }
    else {
        $("#ControltxtHora").hide();
        $("#btnMulti").show();
        $(".checks").removeAttr("disabled");
        objTurnosSelec = new Array();
    }
});




function Especialidad_Cargadas(Resultado) {
    var Especialidad = Resultado.d;
    $('#cbo_Especialidad').empty();
    $('#cbo_Especialidad').append('<option value="0">Especialidad</option>');
    $.each(Especialidad, function (index, especialidades) {
        $('#cbo_Especialidad').append(
              $('<option></option>').val(especialidades.Id).html(especialidades.Especialidad)
            );
    });
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function CargarPacienteID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            if (lista.length > 0) VerificarPaciente(lista[0]);
            else alert("Paciente no encontrado.");
        },
        error: errores
    });
}

$(document).ready(function () {
    $(".controles").attr("disabled", true);
    $("#botones").hide();
    $("#txtNHC_Control").focus();

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }


    var GET = {};
    var NHC = "";

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        Cargar_Paciente_NHC(NHC);
    }

    if (GET["ID"] != "" && GET["ID"] != null) {
        ID = GET["ID"];
        $("#afiliadoId").val(ID);
        CargarPacienteID(ID);
    }

    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtHora").mask("99:99", { placeholder: "" });
    $("#txtFechaSobre").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaSobre").datepicker();


    $("#txtFecha").val(FechaActual());
    ListarSemanas();


    $("#txtNHC").mask("9999999999?9", { placeholder: "-" });
    $("#txt_dni").mask("9999999?9", { placeholder: "-" });

    $("#btn_Dias_de_Atencion").css("display", "none");
    $("#btn_SobreTurno").css("display", "none");

    $("#btn_SobreT").click(function () { //Sobreturnos
        $("#btn_Todos").removeClass("reff_activo");
        $("#btn_Libres").removeClass("reff_activo");
        $("#btn_Reservados").removeClass("reff_activo");
        $("#btn_SobreT").addClass("reff_activo");
        $("#btn_CancelT").removeClass("reff_activo");
        CargarLosTurnos(4);
    });

    $("#btn_CancelT").click(function () { //Cancelados
        $("#btn_Todos").removeClass("reff_activo");
        $("#btn_Libres").removeClass("reff_activo");
        $("#btn_Reservados").removeClass("reff_activo");
        $("#btn_SobreT").removeClass("reff_activo");
        $("#btn_CancelT").addClass("reff_activo");
        CargarLosTurnos(5);
    });

    //Todos
    $('#btn_Todos').click(function () {
        $("#btn_Todos").addClass("reff_activo");
        $("#btn_Libres").removeClass("reff_activo");
        $("#btn_Reservados").removeClass("reff_activo");
        $("#btn_SobreT").removeClass("reff_activo");
        $("#btn_CancelT").removeClass("reff_activo");
        CargarLosTurnos(1);
    });

    //Libres
    $('#btn_Libres').click(function () {
        $("#btn_Libres").addClass("reff_activo");
        $("#btn_Todos").removeClass("reff_activo");
        $("#btn_Reservados").removeClass("reff_activo");
        $("#btn_SobreT").removeClass("reff_activo");
        $("#btn_CancelT").removeClass("reff_activo");
        CargarLosTurnos(2);
    });

    //Reservados
    $('#btn_Reservados').click(function () {
        $("#btn_Reservados").addClass("reff_activo");
        $("#btn_Todos").removeClass("reff_activo");
        $("#btn_Libres").removeClass("reff_activo");
        $("#btn_SobreT").removeClass("reff_activo");
        $("#btn_CancelT").removeClass("reff_activo");
        CargarLosTurnos(3);
    });

    $('#cbo_Dias').change(function () {
        $("#btn_Libres").click();
        CargarLosTurnos(2);
    });

    $('#txtFecha').change(function () {
        var Date = $('#txtFecha').val();
        var elem = Date.split('/');
        dia = elem[0];
        mes = elem[1];
        anio = elem[2];
        $("#ControltxtFecha").removeClass("error");
        //$("#btn_Libres").click();
        ListarSemanas();
        CargarLosTurnos(2);
    });



    $("#txtFecha").keypress(function (event) {
        if ((event.keyCode == 9) || (event.which == 13)) {
            event.preventDefault();
            var Date = $('#txtFecha').val();
            var elem = Date.split('/');
            dia = elem[0];
            mes = elem[1];
            anio = elem[2];
            $("#ControltxtFecha").removeClass("error");
            $("#btn_Libres").click();
            CargarLosTurnos(2);
        }
    });




    $('#txtHora').change(function () {

        ErrorHora = false;
        var hora = $('#txtHora').val();
        if ($('#txtHora').val().length == 5) {

            var h1 = hora.charAt(0);
            var h2 = hora.charAt(1);
            var dp = hora.charAt(2);
            var m1 = hora.charAt(3);

            if ((h1 == 2 && h2 > 3) || (h1 > 2)) { ErrorHora = true; }
            if (m1 > 5) { ErrorHora = true; }
            if (dp != ":") { ErrorHora = true; }
            if (!ErrorHora) {
                //CargarLosTurnos(0);
                SobreTurnoActivo();
            }
            else {
                $('#txtHora').val("");
                $("#btn_SobreTurno").hide();
            }
        }
    });

    function ValidaHora() {

        ErrorHora = false;
        var hora = $('#txtHora').val();
        if ($('#txtHora').val().length == 5) {

            var h1 = hora.charAt(0);
            var h2 = hora.charAt(1);
            var dp = hora.charAt(2);
            var m1 = hora.charAt(3);

            if ((h1 == 2 && h2 > 3) || (h1 > 2)) { ErrorHora = true; }
            if (m1 > 5) { ErrorHora = true; }
            if (dp != ":") { ErrorHora = true; }
        }
        return ErrorHora;

    }


    $('#cbo_Especialidad').change(function () {
        $("#TablaTurnos").empty();
        Cargar_Medicos_por_Especialidad($(this).val(), 'A');
        $("#btn_Libres").click();
        CargarLosTurnos(2);
        SobreTurnoActivo();
    });


    $('#btnactualizar').click(function () {
        Actualizar_Telefono_Seccional($('#txtTelefono').val(), $('#cboSeccional option:selected').val(), $('#txt_dni').val());
    });


    Cargar_Especialidades(true, 0, true);

    Cargar_Medicos_por_Especialidad(326, 'A');
    //Cargar_Tipo_Documentos_Lista();

    function SobreTurnoActivo() {
        if (($("#txtFechaSobre").val() != "") && ($("#txtHora").val() != "") && ($('#cbo_Medico option:selected').val() != "0") && ($('#cbo_Especialidad option:selected').val() != "0") && ErrorHora == false) {
            $("#btn_SobreTurno").show();
            $("#btnMulti").hide();
        }
        else {
            $("#btn_SobreTurno").hide();
            $("#btnMulti").show();
        }

    }

    function resultado(Resultado) {
        if (Resultado.d == '54') {
            $('#Informacion').html("<div class='alert alert-success'><button type='button' class='close' data-dismiss='alert'>×</button>El Paciente " + $('#txtPaciente').val() + " ha sido actualizado Correctamente</div>");
            $('#Informacion').css("visibility", "block");
        }
        else {
            $('#Informacion').html("<div class='alert-error'><button type='button' class='close' data-dismiss='alert'>×</button>Error al intentar Actualizar los Datos</div>");
            $("#Informacion").css("visibility", "block");
        }
    }


    function $_GET(q, s) {
        s = (s) ? s : window.location.search;
        var re = new RegExp('&' + q + '=([^&]*)', 'i');
        return (s = s.replace(/^\?/, '&').match(re)) ? s = s[1] : s = '';
    }



    if ($_GET("NHC") != '') {
        $("#btnActualizar").css('display', 'inline');
        $("#btnOtorgados").css('display', 'inline');
        $("#btnCancelarPedidoTurno").css('display', 'inline');
        $("#btn_VerMas").css('display', 'inline');
        $("#btnOtroAfiliado").css('display', 'inline');
        $("#btnBuscarPaciente").css('display', 'none');
        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

    }
    else {
        $("#btnCancelarPedidoTurno").css('display', 'none');
        $("#btnOtroAfiliado").css('display', 'none');
        $("#btnOtorgados").css('display', 'none');
        $("#btn_VerMas").css('display', 'none');
        $("#btnActualizar").css('display', 'none');
        $("#btnBuscarPaciente").css('display', 'inline');
        $("#txt_dni").prop("readonly", false);
        $("#txtNHC").prop("readonly", false);
    }


    $("#other").click(function () {
        $("#target").click();
    });

    $("#btn_VolveraTurno").click(function () {
        parent.document.location = "DarTurnos.aspx";
    });

    $("a#inline").fancybox({
        'hideOnContentClick': true
    });

    $("#btnOtroAfiliado").click(function () {
        document.location = "../Turnos_IMG/DarTurnos.aspx";
    });

    $("#btn_SobreTurno").click(function () {
        if (!$("#cb_pv").is(":checked") && !$("#cb_ulterior").is(":checked")) { alert("Seleccione Primera vez o Ulterior."); return false; }
        objTurnosSelec = new Array();
        if ($("#txtHora").val().length == 5) {
            objTurnosSelec = $("#txtFechaSobre").val() + " " + $("#txtHora").val();
            var sobreoforzado = "Sobreturno";
            if ($("#ck_turnoforzado").is(":checked")) { sobreoforzado = "Turno"; }
            if (confirm("¿Desea otorgar el " + sobreoforzado + " para el día " + $("#txtFechaSobre").val() + " a las " + $("#txtHora").val() + "hs. ?"))
                if ($("#chkSobreturno").is(":checked")) {
                    SobreturnosLibres($("#txtFechaSobre").val(), $("#txtHora").val(), $('#cbo_Medico option:selected').val(), $('#cbo_Especialidad option:selected').val());
                }
                else {                    
                    var url = "CargaExpressDatos.aspx?MedicoID=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cbo_Especialidad option:selected').val() + "&Fecha=" + $("#txtFechaSobre").val() + "&Hora=" + $("#txtHora").val() + "&Primera=" + $("#cb_pv").is(':checked') + '&Actual=' + $("#afiliadoId").val() + "&TurnoTelefonico=" + $("#cb_ttel").is(':checked') + "&TurnoForzado=1&Ids=" + objTurnosSelec + "&ID=" + $("#afiliadoId").val();
                    Ventana(url)
                }

        }
    });


    $("#txt_dni").keypress(function (event) {
        if (event.which == 13) {


            if ($('#txt_dni').attr('readonly') == undefined) {
                Cargar_Paciente_Documento($("#txt_dni").val());
            }
        }
    });

    $("#txt_dni").change(function () {
        Cargar_Paciente_Documento($("#txt_dni").val());
    });

    $("#txtNHC").change(function () {
        Cargar_Paciente_NHC($("#txtNHC").val());
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



    $("#Buscar").fancybox({
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });


    $("#btnOtorgados").fancybox({
        'width': '75%',
        'height': '75%',
        'href': 'TurnosOtorgados.aspx?Documento=' + $('#txt_dni').val(),
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

    $("#btn_VerMas").fancybox({
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

    $("#btn_Dias_de_Atencion").fancybox({
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

    $("#btn_Guardar_Turno").fancybox({
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'hideOnOverlayClick': false,
        'showCloseButton': false,
        'enableEscapeButton': false,
        'type': 'iframe',
        'onClosed': function () {
            document.location = "DarTurnos.aspx";
        }
    });

    $("#cbo_Medico").change(function () {

        if ($('#cbo_Medico option:selected').val() == '0') {
            $("#btn_Dias_de_Atencion").css("display", "none");
            $("#btn_SobreTurno").css("display", "none");
        }
        else {
            $("#btn_Dias_de_Atencion").css("display", "inline");
            $("#btn_SobreTurno").css("display", "inline");
            $("#btn_Dias_de_Atencion").attr('href', 'DiasdeAtencionVista.aspx?MedicoId=' + $('#cbo_Medico option:selected').val());
        }

        SobreTurnoActivo();
        $("#btn_Libres").click();
        CargarLosTurnos(2);
    });

});




function SobreturnosLibres(Fecha, Hora, Medico, Especialidad) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/SobreTurnosLibre",
        data: '{F: "' + Fecha + '", H: "' + Hora + '", Mid: "' + Medico + '", Esp: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: sobreTurnosLibresRespuesta,
        error: errores
    });
}

function sobreTurnosLibresRespuesta(Respuesta) {
    if (Respuesta.d) {
        AtiendeDiadelaSemana();
    }
    else
        alert("Se Han Alcanzado el Límite de Sobreturnos para el dia de la fecha.");
}


function AtiendeDiadelaSemana() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/AtiendeDiaDeLaSemana_Sobreturno",
        data: '{F: "' + $("#txtFechaSobre").val() + '", H: "' + $("#txtHora").val() + '", Mid: "' + $('#cbo_Medico option:selected').val() + '", Esp: "' + $('#cbo_Especialidad option:selected').val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: AtiendeDiadelaSemanaRespuesta,
        error: errores
    });

}

function AtiendeDiadelaSemanaRespuesta(Respuesta) {
    var r = Respuesta.d;
    if (r) {
        var url = "CargaExpressDatos.aspx?MedicoID=" + $('#cbo_Medico option:selected').val() + "&EspecialidadId=" + $('#cbo_Especialidad option:selected').val() + "&Fecha=" + $("#txtFechaSobre").val() + "&Hora=" + $("#txtHora").val() + "&Primera=" + $("#cb_pv").is(':checked') + '&Actual=' + $("#afiliadoId").val() + "&SobreTurno=true&TurnoTelefonico=" + $("#cb_ttel").is(':checked') + "&Ids=" + objTurnosSelec + "&ID=" + $("#afiliadoId").val();
        Ventana(url)
    }
    else {
        alert("Atención el médico no atiende en la fecha ingresada");
    }
}

function isDate(y, m, d) {
    var date = new Date(y, m - 1, d);
    var dd = date.getDate();
    dd = (dd < 10) ? '0' + dd : dd;

    var yyyy = date.getFullYear();

    var mm = date.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;

    var convertedDate = yyyy + '' + mm + '' + dd;
    var givenDate = "" + y + '' + m + '' + d;
    return (givenDate == convertedDate);
}


$('#desdeaqui').click(function () {
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    $('#cbo_Especialidad').focus();

});


$(function () {
    $(document).keydown(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 115) {
            if (parent.Nro_Box == -1) {
                alert("Usted no tiene box asignado ingrese el número de Box");
                parent.AsignarBox();
                return;
            }

            $.ajax({
                type: "POST",
                url: "../Json/Turnera/TurneraBonos.asmx/Turnera_Turno_Llamar_Bonos",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: PacienteLlamado,
                error: errores
            });

        }
    });

});




function PacienteLlamado(Respuesta) {
    Datos = Respuesta.d;
    if (Respuesta.d && Datos.paciente != null) {
        alert(Datos.paciente);
    }
    else
        alert("No hay pacientes para llamar");
}




function ListarSemanas() {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/ListarSemana",
        data: '{Fecha: "' + $("#txtFecha").val() + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (res) {
            dato = res.d;
            $.each(dato, function (index, paciente) {                
                $("#fecha" + index).html(dato[index]);
            })
        },
        error: errores
    });

}