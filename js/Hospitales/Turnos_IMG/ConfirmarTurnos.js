var Total = -1;
var i = 0;
var Editando = 0;
var EditandoPos = 0;
var Actual = "";
var Hora = "";
var MedicoID = "";
var EspecialidadId = "";
var Fecha = "";
var TurnoTelefonico = false;
var CUIL = "";
var SinAgenda = false;

var TurnoAutorizanteId = 0;
var TurnoPrimeraVez = false;
var TurnoEmiteBono = false;
var TurnoEmiteComprobante = false;
var TurnoVerificado = null;
var Comentario = null;
var Recepcionaturno = false;
var TurnoForzado = false;

var Impreso = 0;

var SobreTurno = false;

var objPracticas = new Array();

var Turno_Id = 0;

var Ids = "";

var Moneda = /^(-)?\d+(\.\d\d)?$/;


$(document).ready(function () {

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    $('#txtCodigo').focus();
    //$('#txtCodigo').val('420101');
    $("#btnConfirmarTurno").attr("disabled", true);
    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);

    });

    EsEspress = 0;


    if (GET["Express"] != "") {
        EsEspress = GET["Express"];
        if (EsEspress == 1) {
            EsEspress = 1;
            $("#btnVolver").hide();
        }
    }

    if (GET["Express_img"] != "") {
        EsEspress_img = GET["Express_img"];
        if (EsEspress_img == 1) {
            EsEspress_img = 1;
            $("#btnVolver").hide();
        }
    }

    if (GET["Ids"] != "") {
        Ids = GET["Ids"];
    }


    if (GET["Actual"] != "") {
        Actual = GET["Actual"];
        //Cargar_Paciente_Documento(Actual);
        CargarPacienteID(Actual);
    }


    if (GET["SobreTurno"] == 'true') {
        SobreTurno = true;
        $("#TituloConfirmacion").html("Confirmación de Sobreturno");
    }
    else {
        SobreTurno = false;
        $("#TituloConfirmacion").html("Confirmación de Turno");
    }


    if (GET["TurnoForzado"] == 'true') {
        TurnoForzado = true;
        $("#TituloConfirmacion").html("Confirmación de Turno");
    }
    else {
        TurnoForzado = false;
        $("#TituloConfirmacion").html("Confirmación de Turno");
    }

    

    //TituloConfirmacion

    Hora = GET["Hora"];
    MedicoID = GET["MedicoID"];
    EspecialidadId = GET["EspecialidadId"];
    Fecha = GET["Fecha"];

    TurnoPrimeraVez = GET["Primera"];

    if (!$.isNumeric(MedicoID) || MedicoID <= 0) { alert("Médico no válido."); return false; }
    if (!$.isNumeric(EspecialidadId) || EspecialidadId <= 0) { alert("Especialidad no válida."); return false; }

    Cargar_Practicas_by_Especialidad(EspecialidadId);
    Cargar_Medico_Id(MedicoID, EspecialidadId);

    $("#CagadoHora").html(Hora);
    $("#CagadoFecha").html(Fecha);
    TurnoTelefonico = GET["TurnoTelefonico"];
});

function Cargar_Practicas_by_Especialidad(EspecialidadId) {
    var json = JSON.stringify({ "EspecialidadId": EspecialidadId });
    $.ajax({
        type: "POST",
        url: "../Json/ConfirmarTurnos.asmx/Lista_Practicas_by_Esp",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pracias_Cargadas,
        complete: function () {
            if ($("#cbo_Practicas option[value='420101']").val() == undefined) {
                $("#cbo_Practicas :nth(1)").attr("selected", "selected");
                $("#txtCodigo").val($("#cbo_Practicas :selected").val());
            }
            else {
                $("#cbo_Practicas").val("420101");
                $("#txtCodigo").val("420101");
            }
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
        success: Cargar_Paciente_Documento_Cargado,
        error: errores
    });
}

function Practicas_Id_Codigo(Id) {
    $.ajax({
        type: "POST",
        url: "../Json/Practicas/Practicas.asmx/Practicas_Id_Codigo",
        data: '{Id: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Id_Codigo,
        error: errores
    });
}


function Cargar_Id_Codigo(Resultado) {
    var Codigo = Resultado.d;
    $("#txtCodigo").val(Codigo);
    $("#txtImporte").focus();
}



function Cargar_Medico_Id(Id, Especialidad) {
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/Cargar_Medico_Id",
        data: '{MedicoId: "' + Id + '", Especialidad: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicos_Encabezado,
        error: errores
    });
}


function Cargar_Medicos_Encabezado(Resultado) {
    var Medico = Resultado.d;
    $.each(Medico, function (index, medico) {
        if (medico.Medico.length > 13) $("#CargadoMedico").html(medico.Medico.substring(0, 13) + "...");
        else $("#CargadoMedico").html(medico.Medico);

        if (medico.Especialidad.length > 13) {
            $("#CargadoEspecialidad").html(medico.Especialidad.substring(0, 13) + "...");
        } else {
            $("#CargadoEspecialidad").html(medico.Especialidad);
        }
        $('#fotomedico').attr('src', '../img/Medicos/' + medico.Id + '.jpg');
    });
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


function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    $.each(Paciente, function (index, paciente) {
        CUIL = paciente.cuil;
        if (paciente.Paciente.length > 20) $("#CargadoApellido").html(paciente.Paciente.substring(0, 19) + "...");
        else $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#afiliadoId").val(paciente.documento);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoCelular").html(paciente.Celular);
        $("#CargadoSeccional").html(paciente.Seccional);

        $("#Cod_OS").val(paciente.OSId);
        if (paciente.Nro_Seccional == 998) {
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            if (paciente.ObraSocial.length > 40) {
                $("#CargadoSeccional").html(paciente.ObraSocial.substring(0, 37)+"...");
            } else {
                $("#CargadoSeccional").html(paciente.ObraSocial);
            }
        }

        //$('#fotopaciente').attr('src', '../img/Pacientes/' + Actual + '.jpg');
        $('#fotopaciente').attr('src', '../img/Pacientes' + paciente.Foto);

    });
}


function parseJsonDate(jsonDateString) {
    return new Date(parseInt(jsonDateString.replace('/Date(', '')));
}


function Cargar_Practicas() {
    $.ajax({
        type: "POST",
        url: "../Json/ConfirmarTurnos.asmx/Practicas_Listas_Total",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Pracias_Cargadas,
        error: errores
    });
}

function Practica_Codigo_ID(Codigo) {
    $.ajax({
        type: "POST",
        url: "../Json/ConfirmarTurnos.asmx/Practicas_Codigo_ID",
        data: '{Codigo: "' + Codigo + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Practica_Codigo_ID_Cargadas,
        error: errores
    });
}

function Practica_Codigo_ID_Cargadas(Resultado) {
    var Id = Resultado.d;
    if (Id != 0) {
        $("#cbo_Practicas option[value=" + Id + "]").attr("selected", true);
        $("#txtImporte").focus();
    }
    else {
        $("#ControltxtCodigo").addClass("error");
        $("#cbo_Practicas option[value=0]").attr("selected", true);
        $("#txtCodigo").val('');
        $("#txtCodigo").focus();
    }
}

function Existe(Algo) {
    return false;
    for (var i = 0; i <= Total; i++) {
        if (objPracticas[i].Codigo == Algo && objPracticas[i].Estado == 1 && Editando != 1) {
            alert("Ya ha cargado la práctica Nro: " + Algo);
            LimpiarCampos();
            $("#txtCodigo").focus();
            return true;
        }
    }
    return false;
}

function Pracias_Cargadas(Resultado) {
    var Practicas = Resultado.d;
    $('#cbo_Practicas').empty();
    $('#cbo_Practicas').append('<option value="0">Seleccione una Práctica</option>');
    $.each(Practicas, function (index, practicas) {
        $('#cbo_Practicas').append(
              $('<option></option>').val(practicas.Id).html(practicas.Practica)
            );
        if (practicas.Id == 420101) $('#cbo_Practicas').val('420101');
    });
}


$("#btnAgregarPractica").click(function () {
    if ($("#cbo_Practicas :selected").val() == "0") { alert("Seleccione una práctica."); return false; }

    if ($("#txtCodigo").val() == '') {
        $("#ControltxtCodigo").addClass("error");
        $("#txtCodigo").focus();
    }
    else {

        if ($("#ControltxtImporte").hasClass("error")) {
            $("#txtImporte").focus();
            return false;
        }
        else {
            if ($("#ControltxtImporteReal").hasClass("error")) {
                $("#txtImporteReal").focus();
                return false;
            }
            else {
                Nombre = $("#cbo_Practicas :selected").text();
                Codigo = $("#txtCodigo").val();
                Precio = $("#txtImporte").val();
                PrecioReal = $("#txtImporteReal").val();
                ComentarioPractica = $("#txtPracticaComentario").val();
                PracticaId = $("#cbo_Practicas").val();
                Estado = 1;
                var Cual = Total;
                if (Editando == 1) {
                    Cual = EditandoPos;
                }
                else {
                    Total = Total + 1;
                    Cual = Total;
                }

                var objPractica = {};
                objPractica.Codigo = Codigo;
                objPractica.Precio = 0;
                objPractica.PrecioReal = 0;
                objPractica.Estado = Estado;
                objPractica.ComentarioPractica = ComentarioPractica;
                objPractica.Nombre = Nombre;
                objPractica.PracticaId = PracticaId;
                objPracticas[Cual] = objPractica;
                RenderizarTabla();
                Editando = 0;
                EditandoPos = -1;

                LimpiarCampos();
                $("#txtCodigo").focus();
                //}
            }
        }
    }



});

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Código</th><th>Práctica</th><th style='display:none;'>Importe</th><th style='display:none;'>Importe Real</th></tr></thead><tbody>";
    var Contenido = "";
    $("#btnConfirmarTurno").attr("disabled", true);
    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objPracticas[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Práctica'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Práctica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objPracticas[i].Codigo + " </td><td> " + objPracticas[i].Nombre.substring(0, 20) + " </td><td style='display:none;'> $ " + objPracticas[i].Precio + " </td><td style='display:none;'> $ " + objPracticas[i].PrecioReal + " </td></tr>";
            $("#btnConfirmarTurno").removeAttr("disabled");
        }

    }

    var Pie = "</tbody></table>";
    $("#TablaPracticas").html(Encabezado + Contenido + Pie);

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#txtCodigo").val(objPracticas[Nro].Codigo);
    $("#txtImporte").val(objPracticas[Nro].Precio);
    $("#txtImporteReal").val(objPracticas[Nro].PrecioReal);
    $("#txtPracticaComentario").val(objPracticas[Nro].ComentarioPractica);
    $("#cbo_Practicas option[value=" + objPracticas[Nro].PracticaId + "]").attr("selected", true);
    $("#btnAgregarPractica").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelarPractica").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");

}

function Eliminar(Nro) {
    objPracticas[Nro].Estado = 0;
    RenderizarTabla();
}



$("#cbo_Practicas").change(function () {
    Practicas_Id_Codigo($('#cbo_Practicas option:selected').val());
});


$("#txtCodigo").blur(function () {
    var Numeros = /^([0-9])*$/;
    if (Numeros.test($("#txtCodigo").val())) {
        $("#ControltxtCodigo").removeClass("error");
        if ($("#txtCodigo").val() == "") {
            //$("#btnConfirmarTurno").focus();
        }
        else {
            Practica_Codigo_ID($("#txtCodigo").val());
            $("#txtImporte").focus();
        }
    } else {
        $("#ControltxtCodigo").addClass("error");
        $("#txtCodigo").focus();
    }


});


$("#txtCodigo").keypress(function (event) {
    var Numeros = /^([0-9])*$/;
    if (event.which == 13 || event.keyCode == 9) {
        event.preventDefault();
        if (Numeros.test($("#txtCodigo").val())) {
            if ($("#txtCodigo").val() == "") {
                //$("#btnConfirmarTurno").focus();
            }
            else {
                Practica_Codigo_ID($("#txtCodigo").val());
            }
        }
        else {
            $("#ControltxtCodigo").addClass("error");
        }
    }

});


function imgErrorMedico(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}


$("#txtImporte").keypress(function (event) {

    if (event.keyCode == 9) {
        event.preventDefault();
        
        if (Moneda.test($("#txtImporte").val())) {
            $("#txtImporteReal").val($("#txtImporte").val());
            $("#ControltxtImporte").removeClass("error");
            $("#btnAgregarPractica").focus();

        }
        else {
            if ($("#txtImporte").val() == '') {
                $("#txtImporte").val('0');
                $("#txtImporteReal").val('0');
                $("#ControltxtImporte").removeClass("error");
                $("#txtImporteReal").focus();
            }
            else {
                $("#ControltxtImporte").addClass("error");
            }
        }
    }

    if (event.which == 13) {

        if (Moneda.test($("#txtImporte").val())) {

            $("#txtImporteReal").val($("#txtImporteReal").val());
            if ($("#txtImporte").val() == '') { $("#txtImporte").val('0'); $("#txtImporteReal").val('0'); }

            $("#ControltxtImporte").removeClass("error");
            $("#btnAgregarPractica").focus();
        }
        else {
            if ($("#txtImporte").val() == '') {
                $("#txtImporte").val('0');
                $("#txtImporteReal").val('0');
                $("#ControltxtImporte").removeClass("error");
                $("#btnAgregarPractica").focus();
            }
            else {
                $("#ControltxtImporte").addClass("error");
            }
        }
    }
});

$("#btnCancelarPractica").click(function () {
    Editando = 0;
    EditandoPos = -1;
    $("#btnAgregarPractica").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarPractica").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
    $("#ControltxtCodigo").removeClass("error");
    $("#ControltxtImporteReal").removeClass("error");
    $("#ControltxtImporte").removeClass("error");
    LimpiarCampos();
});

$("#txtImporte").blur(function () {
    
    if (Moneda.test($("#txtImporte").val())) {
        $("#ControltxtImporte").removeClass("error");
        $("#txtImporteReal").val($("#txtImporte").val());
        $("#btnAgregarPractica").focus();
    }
    else {
        if ($("#txtImporte").val() == '') {
            $("#txtImporte").val('0');
            $("#txtImporteReal").val('0');
            $("#ControltxtImporte").removeClass("error");
            $("#btnAgregarPractica").focus();
        }
        else {
            $("#ControltxtImporte").addClass("error");
        }
    }

});

function Validar() { //Valida datos del turno
    if (!$.isNumeric(Actual) || Actual <= 0) { alert("Paciente no válido."); return false; }
    if (!$.isNumeric(MedicoID) || MedicoID <= 0) { alert("Médico no válido."); return false; }
    if (!$.isNumeric(EspecialidadId) || EspecialidadId <= 0) { alert("Especialidad no válida."); return false; }
    return true;
}

$("#btnConfirmarTurno").click(function () {


    if ($("#btnEmitebono").hasClass('active')) {
        ExisteB = false;
        for (var i = 0; i <= Total; i++) {
            if (objPracticas[i].Estado == 1) {
                ExisteB = true;
            }
        }
        if (ExisteB == false) {
            alert("No se puede emitir un bono en blanco.");
            return false;
        }
    }



    if (TurnoForzado) {
        //Genero el turno
        var json = JSON.stringify({ "MedicoId": MedicoID, "EspecialidadId": EspecialidadId, "Dia": Fecha, "Hora": Hora });

        $.ajax({
            type: "POST",
            url: "../Json/ConfirmarTurnos.asmx/Crear_un_Turno",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",            
            error: errores
        });
    }



    if (Impreso == 0) {
        if (!Validar()) return false;

        Impreso = 1;
        TurnoAutorizanteId = $('#cboAutorizante option:selected').val();
        TurnoEmiteBono = false;
        TurnoEmiteComprobante = false;

        if ($("#btnEmitebono").hasClass('active')) {
            TurnoEmiteBono = true;
        }
        else {
            TurnoEmiteBono = false;
        }

        if ($("#btnEmitecoprobante").hasClass("active")) {
            TurnoEmiteComprobante = true;
        }
        else {
            TurnoEmiteComprobante = false;
        }

        if ($("#btnRecepcionaturno").hasClass("active")) {
            Recepcionaturno = true;
        }
        else {
            Recepcionaturno = false;
        }


        SinAgenda = false;

        TurnoVerificado = null;
        Comentario = $("#txtComentario").val().trim().toUpperCase();

        var json = JSON.stringify({ "objPracticas": objPracticas, "Documento": Actual, "MedicoId": MedicoID, "EspecialidadId": EspecialidadId, "Dia": Fecha, "Hora": Hora, "Telefonico": TurnoTelefonico, "AutorizanteId": TurnoAutorizanteId, "PrimeraVez": TurnoPrimeraVez, "EmiteBono": TurnoEmiteBono, "EmiteComprobante": TurnoEmiteComprobante, "Verificado": TurnoVerificado, "Comentario": Comentario, "Sobreturno": SobreTurno, "SinAgenda": SinAgenda, "Fechas": Ids });


        if (EsEspress_img == 0) {
            $.ajax({
                type: "POST",
                url: "../Json/ConfirmarTurnos.asmx/GuardarTurno",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: TurnoGuardado,
                error: errores
            });
        } else {
            $.ajax({
                type: "POST",
                url: "../Json/ConfirmarTurnos.asmx/GuardarTurno_IMG",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: TurnoGuardado,
                error: errores
            });
        }
    }

});


function TurnoGuardado(Resultado) {
    var Id = Resultado.d;
    $.each(Id, function (index, elem) {
        Turno_Id = Turno_Id + "," + elem;
    });
    if (Id.length > 0) {
        //Agrego lo de imagenes
        if (EsEspress != 1 && EsEspress_img != 1) {
            if ($("#btnEmitecoprobante").hasClass("active")) {
                if (TurnoTelefonico == "false") {
                    $.fancybox({
                        'autoDimensions': false,
                        'href': '../Impresiones/ImpresionTurno.aspx?MedicoId=' + MedicoID + '&EspecialidadId=' + EspecialidadId + '&Fecha=' + Fecha + ' ' + Hora + "&Ids=" + Turno_Id + " ",
                        'width': '75%',
                        'height': '75%',
                        'autoScale': false,
                        'transitionIn': 'elastic',
                        'transitionOut': 'none',
                        'type': 'iframe',
                        'hideOnOverlayClick': false,
                        'enableEscapeButton': false,
                        'onClosed': function () {
                            if (TurnoEmiteBono) {
                                setTimeout(function () {
                                    EmiteBono();
                                }, 1000);

                            }
                            else {
                                window.location.href = "CargaSemanal.aspx?ID=" + Actual;
                            }


                        }
                    });
                }
                else {
                    parent.location.href = "CargaSemanal.aspx";
                    $.fancybox.close();
                }
            }
            else window.location.href = "CargaSemanal.aspx?ID=" + Actual;
        }
        else {
            if (TurnoTelefonico == "false") window.location = "../Impresiones/ImpresionTurno.aspx?MedicoId=" + MedicoID + "&EspecialidadId=" + EspecialidadId + "&Fecha=" + Fecha + " " + Hora + "&Ids=" + Turno_Id + " ";
            else {
                parent.location.href = "CargaSemanal.aspx";
                $.fancybox.close();
            } 
        }
    }
}


function EmiteBono() {
    var json = JSON.stringify({ "objPracticas": objPracticas, "Documento": Actual, "EsPrimeraVez": TurnoPrimeraVez, "Verificado": TurnoVerificado, "EmiteComprobante": TurnoEmiteComprobante, "AutorizanteId": TurnoAutorizanteId, "MedicoId": MedicoID, "EspecialidadId": EspecialidadId, "EsAtencionSinTurno": false, "EsUrgencia": false, "ReservaTurnoAhora": false, "FechaTurno": Fecha + ' ' + Hora, "Recepcionaturno": Recepcionaturno });
    $.ajax({
        type: "POST",
        url: "../Json/Bonos/NuevoBonos.asmx/GuardarPracticasBono",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: BonoGuardado,
        error: errores
    });
}

function BonoGuardado(Resultado) {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': '../Impresiones/ImpresionBono.aspx?' + Resultado.d,
		    'width': '75%',
		    'height': '75%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'onClosed': function () {
		        window.location.href = "CargaSemanal.aspx?ID=" + Actual;
		    }
		}
	        );
}


function LimpiarCampos() {
    $("#txtCodigo").val("");
    $("#txtImporte").val("");
    $("#txtImporteReal").val("");
    $("#txtPracticaComentario").val("");
    $("#cbo_Practicas option[value=0]").attr("selected", true);
    $("#btnAgregarPractica").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarPractica").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
}


function errores(msg) {
    Impreso = 0;
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnVolver").click(function () {
    window.location.href = "CargaSemanal.aspx?ID=" + Actual;
});


$("#CerrarError").click(function () {
    window.location.href = "CargaSemanal.aspx?ID=" + Actual;
});

function MostrarError(Mensaje) {
    $("#DialogoError").html(Mensaje);
    $('#ModalError').modal({
        keyboard: false,
        backdrop: 'static'
    });
}

$("#btnEmitebono").click(function () {

    if ($("#btnEmitebono").hasClass('active') == false) {
        $("#btnRecepcionaturno").addClass("active");
    }
});


