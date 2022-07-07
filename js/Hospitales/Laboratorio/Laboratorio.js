var Practicas = new Array();
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
var MedicoId = 0;
var objPracticas = new Array();
var Moneda = /^(-)?\d+(\.\d\d)?$/;
var TurnoAutorizanteId = "0";
var TurnoPrimeraVez = false;
var TurnoEmiteBono = false;
var TurnoEmiteComprobante = false;
var Recepcionaturno = false;
var FechaTurno = "";
var EsAtencionSinTurno = false;
var Cod_OS = 0;
var Impreso = 0;


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

function Seccionales_Listas_Cargadas(Resultado) {
    var Seccionales = Resultado.d;
    $('#cboSeccional').empty();
    $.each(Seccionales, function (index, seccionales) {
        $('#cboSeccional').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
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
    ValorPractica();
    $("#txtImporte").focus();
}


function Cargar_Practicas() {
    $.ajax({
        type: "POST",
        url: "../Json/Laboratorio/Laboratorio.asmx/Practicas_Listar",
        data: '{}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Practicas_Cargadas,
        error: errores
    });
}






$("#txtCodigo").blur(function () {
    var Numeros = /^([0-9])*$/;
    if (Numeros.test($("#txtCodigo").val())) {
        if ($("#txtCodigo").val() == "") {

        }
        else {

            var exists = false;
            $('#cbo_Practicas option').each(function () {
                if (this.value == $("#txtCodigo").val()) {
                    $("#cbo_Practicas option[value=" + $("#txtCodigo").val() + "]").attr("selected", true);
                    $('#txt_practica').val($(this).text());
                    exists = true;
                    return false;
                }
            });

            if (exists) {
                CargarSubCodigos();
            }

        }
    } else {
        $("#ControltxtCodigo").addClass("error");
        $("#txtCodigo").focus();
    }
});


$("#txtSubCodigo").blur(function () {
    var Numeros = /^([0-9])*$/;
    if (Numeros.test($("#txtSubCodigo").val())) {
        $("#ControltxtSubCodigo").removeClass("error");
        if ($("#txtSubCodigo").val() == "") {
        }
        else {

            var exists = false;
            $('#cbo_SubPracticas option').each(function () {
                if (this.value == $("#txtSubCodigo").val()) {
                    exists = true;
                    return false;
                }
            });

            if (exists) {
                $('#cbo_SubPracticas').val($("#txtSubCodigo").val());
            }

        }
    } else {
        $("#ControltxtSubCodigo").addClass("error");
        $("#txtSubCodigo").focus();
    }
});



function Practicas_Cargadas(Resultado) {
    var Practicas = Resultado.d;
    $('#cbo_Practicas').empty();
    $('#cbo_Practicas').append('<option value="0">Seleccione una Práctica</option>');
    $.each(Practicas, function (index, practicas) {
        $('#cbo_Practicas').append(
              $('<option></option>').val(practicas.Id).html(practicas.Practica)
            );
    });
}


$("#btnAgregarPractica").click(function () {

    if ($("#txtCodigo").val() == '' || $("#txt_practica").val() == '' ) {
        $("#ControltxtCodigo").addClass("error");
        $("#txt_practica").addClass("error");
        $("#txtCodigo").focus();
    }
    else {

        Nombre = $("#txt_practica").val();
        Codigo = $("#txtCodigo").val();

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
        objPractica.SubPracticaCodigo = $("#cbo_SubPracticas :selected").val();
        objPractica.SubPractica = $("#cbo_SubPracticas :selected").text();
        objPractica.Estado = Estado;
        objPractica.Comentario = ComentarioPractica;
        objPractica.Nombre = Nombre;
        objPractica.PracticaId = PracticaId;
        objPracticas[Cual] = objPractica;
        

        RenderizarTabla();
        Editando = 0;
        EditandoPos = -1;

        $("#ControltxtCodigo").removeClass("error");
        $("#txt_practica").remove("error");

        LimpiarCampos();
        $("#txtCodigo").focus();

    }

});

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Código</th><th>Práctica</th><th>Sub Práctica</th></tr></thead><tbody>";
    var Contenido = "";

    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objPracticas[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Práctica'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Práctica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objPracticas[i].Codigo + " </td><td> " + objPracticas[i].Nombre.substring(0, 20) + " </td><td>" + objPracticas[i].SubPractica + " </td></tr>";
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
    CargarSubCodigos(objPracticas[Nro].SubPracticaCodigo);
    $("#txtPracticaComentario").val(objPracticas[Nro].Comentario);
    $("#txt_practica").val(objPracticas[Nro].Nombre);
    $("#btnAgregarPractica").html("<i class='icon-plus-sign icon-white'></i> Aceptar Cambio");
    $("#btnCancelarPractica").html("<i class='icon-remove-circle icon-white'></i> Cancelar Cambio");
}

function Eliminar(Nro) {
    objPracticas[Nro].Estado = 0;
    RenderizarTabla();
}


function Existe(Algo) {

    for (var i = 0; i <= Total; i++) {
        if (objPracticas[i].Codigo == Algo && objPracticas[i].Estado == 1 && Editando != 1 ) {
            alert("Ya ha cargado la práctica Nro: " + Algo);
            LimpiarCampos();
            $("#txtCodigo").focus();
            return true;
        }
    }
    return false;
}


$("#cbo_Practicas").change(function () {
    $("#txtCodigo").val($('#cbo_Practicas option:selected').val());
    CargarSubCodigos('');
});

function CargarSubCodigos(Cargar) {
    var json = JSON.stringify({ "Cod": $("#txtCodigo").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Laboratorio/Laboratorio.asmx/SubPracticas_Listar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success:
        function (Resultado) {
            var Practicas = Resultado.d;
            $('#cbo_SubPracticas').empty();
            $("#txtSubCodigo").val("");
            $.each(Practicas, function (index, practicas) {
                if (practicas.Practica != null) {
                    $('#cbo_SubPracticas').append($("<option value='" + practicas.Id + "'>" + practicas.Practica + "</option>").appendTo("#cbo_SubPracticas"));
                    if (Cargar != "") {
                        $("#cbo_SubPracticas option[value=" + Cargar + "]").attr("selected", true);
                        $("#txtSubCodigo").val(Cargar);
                    }

                }
            });
        }
        ,
        error: errores
    });
}


function VerificarEstado(NroBono) {
    var json = JSON.stringify({ "NroBono": $("#txt_NroBono").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Bonos/Bonos.asmx/EstadoBono",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success:
        function (Resultado) {
            var Estado = Resultado.d;
            if (!Estado) {
                alert("ATENCIÓN: El Bono ha sido utlizado anteriormente");
            }
            else {
                Cargar_Paciente_Bono($("#txt_NroBono").val());
            }
        }
        ,
        error: errores
    });
}


$("#cbo_SubPracticas").change(function () {
    $("#txtSubCodigo").val($('#cbo_SubPracticas option:selected').val());
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









function LimpiarCampos() {
    $("#txtCodigo").val("");
    $("#txtImporte").val("");
    $("#txtImporteReal").val("");
    $("#txtPracticaComentario").val("");
    //$("#cbo_Practicas option[value=0]").attr("selected", true);
    $("#txt_practica").val("");
    $("#cbo_SubPracticas").empty();
    $("#txtSubCodigo").val("");    
    $("#btnAgregarPractica").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarPractica").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
}



$("#CerrarError").click(function () {
    window.location.href = "DarTurnos.aspx?NHC=" + CUIL;
});

function MostrarError(Mensaje) {
    Impreso = 0;
    //alert(Mensaje);
    $("#DialogoError").html(Mensaje);
    //alert(Mensaje);
    //alert($('#DialogoError').html());
    $('#ModalError').modal({
        keyboard: false,
        backdrop: 'static'
    });
}





function errores(msg) {
    Impreso = 0;
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$(document).ready(function () {

    $("#txtnroturno").focus();
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

    $('input[type=text]').focus(function () {
        var tempSouper = $(this);
        setTimeout(function () {
            tempSouper.select();
        }, 100);
    });

    Cargar_Practicas();

    var GET = {};
    var NHC = "";
    var Documento = "";
    $("#txtNHC").mask("9999999999?9", { placeholder: "-" });
    $("#txt_dni").mask("9999999?9", { placeholder: "-" });

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        GET[decode(arguments[1])] = decode(arguments[2]);
    });
});

$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});



$("#btnConfirmarNuevoBono").click(function () {

    if (Impreso == 0) {      

        var TurnoVerificado = null;
        var Comentario = $("#txtComentario").val();
        var Valido = true;

        if ($('#txt_FPerscripcion').val() == "") {
            alert("Falta la fecha de Perscripción");
            Valido = false;
        }

        if ($('#txt_FEntrega').val() == "") {
            alert("Falta la Fecha estimativa de Entrega");
            Valido = false;
        }


        if (Valido) {
            Impreso = 1;
            var json = JSON.stringify({ "objPracticas": objPracticas,
                "TipoOrden": $('#cbo_tipoorden option:selected').val(),
                "MedicoId": $('#cbo_medicosolicitante option:selected').val(),
                "FechaPrescripcion": $('#txt_FPerscripcion').val(),
                "FUM": $('#txt_FUM').val(),
                "Diagnostico1": $('#cbo_diagnostico1 option:selected').val(),
                "Diagnostico2": $('#cbo_diagnostico2 option:selected').val(),
                "FechaAEntregar": $('#txt_FEntrega').val(),
                "NroBono": $('#txt_NroBono').val(),
                "Observacion": $('#txt_ObsGral').val()
            });

            $.ajax({
                type: "POST",
                url: "../Json/Laboratorio/Laboratorio.asmx/GuardarLaboratorio",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: ImprimirTalon,
                error: errores
            });
        }

    }

});




function ImprimirTalon(Resultado) {
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': '../Impresiones/LaboratorioComprobante.aspx?Protocolo=' + Resultado.d,
		    'width': '75%',
		    'height': '75%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false,
		    'onClosed': function () {
		        window.location.href = "Laboratorio.aspx";
		    }
		});
}






$("#txt_NroBono").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txt_NroBono').attr('readonly') == undefined) {
            Cargar_Paciente_Bono($("#txt_NroBono").val());
        }
    }
});

$("#txt_NroBono").change(function () {
    VerificarEstado($("#txt_NroBono").val());    
});



function Cargar_Paciente_Bono(Bono) {
    $.ajax({
        type: "POST",
        url: "../Json/Laboratorio/Laboratorio.asmx/Cargar_Paciente_Bono",
        data: '{Bono: ' + Bono + '}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Bono_Cargado,
        error: errores
    });
}


function Cargar_Paciente_Bono_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    $.each(Paciente, function (index, paciente) {        
        $("#btnCancelarPedidoTurno").show();

        $("#txt_NroBono").prop("readonly", true);

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
        $("#CargadoSeccional").html(paciente.Seccional);
        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.cuil + '.jpg');

        if (paciente.Nro_Seccional == 998) {
            $("#cbo_ObraSocial").show();
            $("#cboSeccional").hide();
            $("#Titulo_Seccional_o_OS").html("Ob. Social");
            $("#CargadoSeccionalTitulo").html("Ob. Social");
            Cargar_ObraSociales_Cargar(paciente.OSId);
            if (paciente.ObraSocial.length > 40) {
                $("#CargadoSeccional").html(paciente.ObraSocial.substring(0, 37) + "...");
            } else {
                $("#CargadoSeccional").html(paciente.ObraSocial);
            }
        }
        else {
            $("#btnVencimiento").show();
        }

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
            $("#desdeaqui").focus();
        }

    });
}









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



$("#btnBuscarPaciente").fancybox({
        'hideOnContentClick': true,
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });

function RecargarPagina(url) {
    document.location = "../Bonos/NuevoBono.aspx" + url;
}

$('#desdeaqui').click(function () {
    $("#cbo_Medico option[value=" + MedicoID + "]").attr("selected", true);
    $("#hastaaqui").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
    $('#cbo_Especialidad').focus();

});


$(document).ready(function () {

    $("#txt_FPerscripcion").datepicker();
    $("#txt_FUM").datepicker();
    $("#txt_FEntrega").datepicker();

    $("#txt_FPerscripcion").mask("99/99/9999", { placeholder: "-" });
    $("#txt_FUM").mask("99/99/9999", { placeholder: "-" });
    $("#txt_FEntrega").mask("99/99/9999", { placeholder: "-" });

});