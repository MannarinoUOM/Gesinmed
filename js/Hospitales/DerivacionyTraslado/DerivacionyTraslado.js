var Practicas = new Array();
var Total = -1;
var i = 0;
var Editando = 0;
var EditandoPos = 0;
var Actual = "";
var MedicoID = "";
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
var CertificadoMostrado = false;
var Internado = 0;
var Ultimo_OK = 0;
var opcion = 0;
var patologia = 0;
var pacienteId = 0;
var plantilla = 0;
var idAutorizacion = 0;
var opcion = 0;
var idPlantilla = 0;
var fecha = new Date();
var voucher_a_generar = 0;
var celCache;

Cargar_Seccionales_Lista();
Cargar_Especialidades(true, 0, false);

$("#autorizaciones").hide();
$("#hastaaqui").hide();

function UltimoAporte_OK(cuil, Parentesco) {
    if (Ultimo_OK == 1) { return false; }
    if (Parentesco == null) Parentesco = '00';
    //var json = JSON.stringify({ "Cuil": cuil, "Cod_Parentesco": Parentesco });
    var json = JSON.stringify({"Documento": pacienteId});
    $.ajax({
        type: "POST",
        url: "../Json/Gente.asmx/UltimoAporte_OK",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            Ultimo_OK = 1;
            var ok = Resultado.d;
            if (!ok) {
                alert("No se registran aportes en los últimos 3 meses. Regularizar situación en AFILIACIONES.");
                $("#desdeaqui").remove();
            }
        }
    });
}

function EstaInternado() {
    if (Internado == 0) {
        $.ajax({
            type: "POST",
            url: "../Json/Farmacia/Farmacia.asmx/List_Internacion_Pac_byDoc",
            data: '{Documento: "' + $("#afiliadoId").val() + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_PacienteInt_byDocumento_Cargado,
            error: errores
        });
    }
}

function Cargar_PacienteInt_byDocumento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    if (Paciente != null) {
        $("#desdeaqui").remove();
        alert('No puede emitir un bono para el paciente, ya que el mismo se encuentra internado.');
        Internado = 1;
        $("#btnOtroPaciente").show();
    }
}



function PatologiabyId(Id) {
    if (opcion == 1) {
        if (Id <= 1) { $('#span_Discapacidad').html("PATOLOGÍA: NO"); $("#discapacidad_paga").val('S'); return; }
    }else{
    if (Id <= 1) { $('#span_Discapacidad2').html("PATOLOGÍA: NO"); $("#discapacidad_paga2").val('S'); return; }
}
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtConsultorio/Patologia.asmx/Patologia_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $.each(lista, function (index, item) {
                $('#span_Discapacidad').html("PATOLOGÍA: " + item.patologias);
                $('#span_Discapacidad2').html("PATOLOGÍA: " + item.patologias);
                $("#discapacidad_paga").val(item.pagobono);
                $("#discapacidad_paga2").val(item.pagobono);
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




function VerificarPMI(PacienteID) {
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/VerificarPMI",
        data: '{PacienteId: "' + PacienteID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#verificarPMI").val(Resultado.d);
        },
        error: errores
    });
}

function CertificadoVencido(DNI) {
    $.ajax({
        type: "POST",
        url: "../Json/Discapacidad/Discapacidad.asmx/VerificarFechaCertificado",
        data: '{DNI: "' + DNI + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: errores
    });
}




$("#txtNHC").on('keypress', function (event) {
if ($("#desdeaqui").is(":visible") && event.keyCode == 13)
 { $("#desdeaqui").click(); }
 });

$("#txt_dni").on('keypress', function (event) {
    if ($("#desdeaqui").is(":visible") && event.keyCode == 13)
    { $("#desdeaqui").click(); }
});

$("#txtPaciente").on('keypress', function (event) {
    if ($("#desdeaqui").is(":visible") && event.keyCode == 13)
    { $("#desdeaqui").click(); }
});

//txt_dni
//txtPaciente

$("#txtCodigo").blur(function () {
    var Numeros = /^([0-9])*$/;
    if (Numeros.test($("#txtCodigo").val())) {
        $("#ControltxtCodigo").removeClass("error");
        if ($("#txtCodigo").val() == "") {
            //$("#btnConfirmarNuevoBono").focus();
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
                //$("#btnConfirmarNuevoBono").focus();
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



$("#btnAgregarPractica").click(function () {

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

                //if (!Existe($("#txtCodigo").val())) {

                Nombre = $("#cbo_Practicas :selected").text();
                //Codigo = $('#cbo_Practicas option:selected').val();  //$("#txtCodigo").val();
                Codigo = $("#txtCodigo").val();
                Precio = $("#txtImporte").val().replace(".", ",");
                PrecioReal = $("#txtImporteReal").val().replace(".", ",");
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
                objPractica.Precio = Precio;
                objPractica.PrecioReal = PrecioReal;
                objPractica.Estado = Estado;
                objPractica.ComentarioPractica = ComentarioPractica;
                objPractica.Nombre = Nombre;
                objPractica.PracticaId = PracticaId;
                objPracticas[Cual] = objPractica;

                //Practicas[Cual] = [Codigo, Nombre, Precio, PrecioReal, Estado, ComentarioPractica, PracticaId];           
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

function formatoMoneda(num) {
    var p = num.toFixed(2).split(".");
    var chars = p[0].split("").reverse();
    var newstr = '';
    var count = 0;
    for (x in chars) {
        count++;
        if (count % 3 == 1 && count != 1) {
            newstr = chars[x] + ',' + newstr;
        } else {
            newstr = chars[x] + newstr;
        }
    }
    return newstr + "." + p[1];
}

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Código</th><th>Práctica</th><th>Importe</th><th>Importe Real</th></tr></thead><tbody>";
    var Contenido = "";
    $("#totalBono").val("0");
    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objPracticas[i].Estado == 1) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Práctica'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Práctica'><i class='icon-remove-circle icon-white'></i></a></td><td> " + objPracticas[i].Codigo + " </td><td> " + objPracticas[i].Nombre.substring(0, 20) + " </td><td> $ " + objPracticas[i].Precio + " </td><td> $ " + objPracticas[i].PrecioReal + " </td></tr>";
            $("#totalBono").val(parseFloat($("#totalBono").val()) + parseFloat(objPracticas[i].Precio.replace(',', '.')));
        }
        if (objPracticas.length - 1 == Total) $("#Total").html("TOTAL A PAGAR: $" + formatoMoneda(parseFloat($("#totalBono").val())));
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


function Existe(Algo) {

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


$("#cbo_Practicas").change(function () {
    Practicas_Id_Codigo($('#cbo_Practicas option:selected').val());
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
    $("#cbo_Practicas option[value=0]").attr("selected", true);
    $("#btnAgregarPractica").html("<i class='icon-plus-sign icon-white'></i> Agregar");
    $("#btnCancelarPractica").html("<i class='icon-remove-circle icon-white'></i> Cancelar");
}



function MostrarError(Mensaje) {
    Impreso = 0;
    $("#DialogoError").html(Mensaje);
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
    ListTipoDoc();
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    $("#txt_dni").focus();
    var GET = {};
    var NHC = "";
    var Documento = "";
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txt_dni").mask("999999?99", { placeholder: "-" });
    $("#txtTelefono").mask("99999999?99999", { placeholder: "-" });

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

    if (GET["Documento"] != "" && GET["Documento"] != null) {
        Documento = GET["Documento"];
        //Cargar_Paciente_Documento(Documento);
        $("#txt_dni").val(Documento);
      
    }


    if (GET["Generar"] != "" && GET["Generar"] != null) {
        //alert(GET["Generar"]);
        idPlantilla = GET["Generar"];
        //Generar(id);
    }


    if (GET["ID"] != "" && GET["ID"] != null) {
        $("#afiliadoId").val(GET["ID"]);
        CargarPacienteID(GET["ID"]);
    }


    if (GET["opcion"] != "" && GET["opcion"] != null) {
        opcion = GET["opcion"];
        switch (opcion) {
            case "1":
                CargarPacienteID($("#afiliadoId").val());
                parent.document.getElementById("DondeEstoy").innerHTML = "Derivaciones > <strong>Derivaciones y Traslados</strong>";
                $("#titulo").html("Derivaciones y Traslados");
                break;
            case "2":
                CargarPacienteID($("#afiliadoId").val());
                parent.document.getElementById("DondeEstoy").innerHTML = "Derivaciones > <strong>Autorizaciones</strong>";
                $("#titulo").html("Autorizaciones");
                break;
        }
    }

    Cargar_Autorizantes(0);

    $("#btnReservaTurnoAhora").attr("checked", true);
    ActualizarNroTurno_();
    $("#NroTurnoAhora").show();
});

function CargarPacienteID(ID) {

    //if (Internado == 1) { return false; }
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores,
        complete:TraerTodasDYTPaciente
    });
}

$('#fotopaciente').error(function () {
 $(this).attr('src', '../img/silueta.jpg');
});
$('#fotopaciente2').error(function () {
  $(this).attr('src', '../img/silueta.jpg');
});

$("#btnReservaTurnoAhora").click(function () {
    if (!$("#btnReservaTurnoAhora").is(':checked')) {
        $("#NroTurnoAhora").hide();
    } else {
        $("#NroTurnoAhora").show();

        $.ajax({
            type: "POST",
            url: "../Json/Bonos/NuevoBonos.asmx/Ultimo_Nro_ReservaAhora",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ActualizarNroTurno,
            error: errores
        });


    }

});

function ActualizarNroTurno_() {
    $.ajax({
        type: "POST",
        url: "../Json/Bonos/NuevoBonos.asmx/Ultimo_Nro_ReservaAhora",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ActualizarNroTurno,
        error: errores
    });
}


function ActualizarNroTurno(Resultado) {
    $("#NroTurnoAhora").html('');
    $("#NroTurnoAhora").html(Resultado.d);
}


$("#btnConfirmarNuevoBono").click(function () {

    if (Impreso == 0) {
        Impreso = 1;
        if ($('#cbo_Medico option:selected').val() == "0" || $('#cbo_Medico option:selected').val() == '' || $('#cbo_Medico option:selected').val() == null) { $("#Controlcbo_Medico").addClass("error"); Impreso = 0; return false; }
        //if ($('#cbo_Medico option:selected').val() == "0") { $("#Controlcbo_Especialidad").addClass("error"); return false; }
        //if ($('#cbo_Medico option:selected').val() == '' || $('#cbo_Medico option:selected').val() == null) { $("#Controlcbo_Especialidad").addClass("error"); return false; }
        if ($('#cbo_Especialidad option:selected').val() == "0" || $('#cbo_Especialidad option:selected').val() == '' || $('#cbo_Especialidad option:selected').val() == null) { $("#Controlcbo_Especialidad").addClass("error"); Impreso = 0; return false; }

        TurnoAutorizanteId = $('#cboAutorizante option:selected').val();
        TurnoPrimeraVez = false;
        TurnoEmiteComprobante = false;
        Recepcionaturno = false;

        if ($("#btnEmitecoprobante").is(":checked")) {
            TurnoEmiteComprobante = true;
        }
        else {
            TurnoEmiteComprobante = true;
        }

        //if ($("#btnRecepcionaturno").hasClass("active") && !$("#btnRecepcionaturno").hasClass("disabled")) {
        if ($("#btnRecepcionaturno").is(":checked")) {
            Recepcionaturno = true;
        }
        else {
            Recepcionaturno = false;
        }

        if ($("#btnReservaTurnoAhora").is(":checked")) {
            ReservaTurnoAhora = true;
        }
        else {
            ReservaTurnoAhora = false;
        }

        if ($("#btnAtencionSinTurno").is(":checked")) {
            EsAtencionSinTurno = true;
        }
        else {
            EsAtencionSinTurno = false;
        }



        var TurnoVerificado = null;
        var Comentario = $("#txtComentario").val();

        var json = JSON.stringify({ "objPracticas": objPracticas, "Documento": $("#afiliadoId").val(), "EsPrimeraVez": false, "Verificado": '', "EmiteComprobante": TurnoEmiteComprobante, "AutorizanteId": $('#cboAutorizante option:selected').val(), "MedicoId": $('#cbo_Medico option:selected').val(), "EspecialidadId": $('#cbo_Especialidad option:selected').val(), "EsAtencionSinTurno": EsAtencionSinTurno, "EsUrgencia": false, "ReservaTurnoAhora": ReservaTurnoAhora, "FechaTurno": FechaTurno, "Recepcionaturno": Recepcionaturno });
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

});



$("#cbo_Medico").change(function () {
    $("#CargadoMedico").html($('#cbo_Medico option:selected').html());
    FotoMedico();
});

function FotoMedico() {
    $("#fotomedico").attr('src', '../img/medicos/' + $('#cbo_Medico option:selected').val() + '.jpg');
}

$('#fotomedico').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

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
		        window.location.href = "NuevoBono.aspx?ID=" + $("#afiliadoId").val();
		    }
		});
}

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


function Cargar_Especialidades(Todos, Id, SoloTurnos) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: '{Todas: "' + Todos + '", Id: "' + Id + '", SoloTurnos: "' + SoloTurnos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidad_Cargadas,
        error: errores
    });
}


$('#cbo_Especialidad').change(function () {
    if ($('#cbo_Especialidad option:selected').html().length > 13) {
        $("#CargadoEspecialidad").html($('#cbo_Especialidad option:selected').html().substring(0, 13) + "...");
    } else {
        $("#CargadoEspecialidad").html($('#cbo_Especialidad option:selected').html());
    }
    Cargar_Medicos_por_Especialidad($(this).val(), '');
});


function Cargar_Medicos_por_Especialidad(Especialidad, MedicoId) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad_SoloActivos",
        data: '{Especialidad: "' + Especialidad + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            var Medicos = Resultado.d;
            $('#cbo_Medico').empty();
            $.each(Medicos, function (index, medicos) {
                $('#cbo_Medico').append(
              $('<option></option>').val(medicos.Id).html(medicos.Medico)
            );
            });
            if (Resultado.d != null && Resultado.d != '') {
                $("#CargadoMedico").html($('#cbo_Medico option:selected').html());
            } else {
                $("#CargadoMedico").html('');
            }

            if (MedicoId != '0' || MedicoId != '') {
                $("#cbo_Medico option[value=" + MedicoId + "]").attr("selected", true);
                $("#CargadoMedico").html($('#cbo_Medico option:selected').html());
            }
            FotoMedico();

        },
        error: errores
    });

}



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



function Cargar_Paciente_Documento(Documento) {
if(Documento != "")
    if (Internado == 1) { return false; }
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
    if (Resultado.d != null) {
        var Paciente = Resultado.d;
        var PError = false;
        if (Paciente.length == 1) {
            $.each(Paciente, function (index, paciente) {
                if (paciente.Vencido) {
                    alert("Paciente dado de baja el día: " + paciente.FechaVencido);
                    return false;
                }
                $("#btnactualizar").show();
                $("#btnCancelarPedidoTurno").show();

                $("#txtnroturno").prop("readonly", true);

                $("#txtPaciente").attr('value', paciente.Paciente);
                $("#txtNHC").attr('value', paciente.NHC_UOM);
                $("#txtTelefono").attr('value', paciente.Telefono);
                celCache = paciente.Telefono;
                $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

                $("#btnOtorgados").css('display', 'inline');


                if ($("#txtTelefono").val().length < 5) {
                    $("#controlTelefono").addClass("error");
                    PError = true;
                }
                if (paciente.Nro_Seccional == 999) {
                    $("#controlSeccional").addClass("error");
                    PError = true;
                }

                $("#CargadoApellido").html(paciente.Paciente);
                $("#CargadoApellido2").html(paciente.Paciente);

                var AnioActual = new Date();
                var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));


                var edad = AnioActual.getFullYear() - AnioNacimiento.getFullYear();
                if (AnioNacimiento.getFullYear() == 0) {
                    edad = S / FN;
                }

                $("#CargadoEdad").html(paciente.Edad_Format);
                $("#CargadoEdad2").html(paciente.Edad_Format);

                $("#CargadoDNI").html(paciente.documento_real);
                $("#CargadoDNI2").html(paciente.documento_real);

                $("#CargadoNHC").html(paciente.NHC_UOM);
                $("#CargadoNHC2").html(paciente.NHC_UOM);

                $("#CargadoTelefono").html(paciente.Telefono);
                $("#CargadoTelefono2").html(paciente.Telefono);

                $("#CargadoSeccional").html($("#cboSeccional :selected").text());
                $("#CargadoSeccional2").html($("#cboSeccional :selected").text());

                $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
                $('#fotopaciente2').attr('src', '../fotoPerfil/' + paciente.Foto);

                PatologiabyId(paciente.Discapacidad);

                $("#afiliadoId").val(paciente.documento);



                $("#cbo_TipoDOC").val(paciente.TipoDoc);


                $("#discapacidad_val").val(paciente.Discapacidad);

                $("#Cod_OS").val(paciente.OSId);
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
                    //$("#btnVencimiento").show();
                }

                PMIPI = "";
                if (paciente.PMI && paciente.PI == false) {
                    PMIPI = "PMI"
                }

                if (paciente.PMI == false && paciente.PI) {
                    PMIPI = "PI"
                }

                if (PMIPI != "") {
                    $("#CargadoSeccional").html($("#CargadoSeccional").html() + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[" + PMIPI + "]");
                }


                if (PError) {
                    $("#desdeaqui").hide();
                }
                else {
                    $("#desdeaqui").show();
                }
                //EstaInternado(); //Verifica si el paciente se encuentra internado en la clinica.
                //UltimoAporte_OK(paciente.cuil, paciente.cod_pariente); //Verifica aportes en Padron UOM.
                pacienteId = paciente.documento;

            });
        }
        else if (Paciente.length > 1) {
            $("#txtdocumento").val($("#txt_dni").val());
            BuscarPacientes_fancy();
            $("#txtPaciente").focus();
        }
    }
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


$("#txtNHC").change(function () {
    if ($("#txtNHC").val().length > 0)
        Cargar_Paciente_NHC($("#txtNHC").val());
});

function Cargar_Autorizantes(Id) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Autorizantes",
        data: '{Id: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Autorizantes_Cargado,
        error: errores
    });
}

function Cargar_Autorizantes_Cargado(Resultado) {
    var Autorizantes = Resultado.d;
    $('#cboAutorizante').empty();
    $('#cboAutorizante').append('<option value="0">Autorizado por...</option>');
    $.each(Autorizantes, function (index, autori) {
        $('#cboAutorizante').append(
              $('<option></option>').val(autori.id).html(autori.autorizante)
            );
    });
}

function Cargar_Paciente_NHC(NHC) {
    // if (Internado == 1) { return false; }
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteNHC_UOM",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores,
        complete:TraerTodasDYTPaciente
    });
}


function VerificarSiEsEstudiante(Documento) {
    if (Internado == 1) return false;
    $.ajax({
        type: "POST",
        url: "../Json/Gente/ActualizarGente.asmx/VerificarSiEsEstudiante",
        data: '{Documento: "' + Documento + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_VerificarSiEsEstudiante,
        error: errores
    });
}



function Cargar_VerificarSiEsEstudiante(Resultado) {
    $("#span_Estudiante").html(Resultado.d);
}



function Cargar_Paciente_NHC_Cargado(Resultado) {
    if (Resultado.d != null) {
        var Paciente = Resultado.d;
        var PError = false;

        $.each(Paciente, function (index, paciente) {
            if (paciente.Vencido) {
                alert("Paciente dado de baja el día: " + paciente.FechaVencido);
                $("#desdeaqui").hide();
                return false;
            }
            $("#btnactualizar").show();
            $("#btnCancelarPedidoTurno").show();
            $("#afiliadoId").val(paciente.documento);
            $("#txtnroturno").prop("readonly", true);

            $("#afiliadoId").val(paciente.documento);

            $("#btnOtorgados").css('display', 'inline');
            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txt_dni").attr('value', paciente.documento_real);

            VerificarSiEsEstudiante(paciente.documento_real);

            $("#txtNHC").attr('value', paciente.NHC_UOM);
            $("#txtTelefono").attr('value', paciente.Telefono);
            celCache = paciente.Telefono;
            $("#discapacidad_val").val(paciente.Discapacidad);

            $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);



            if ($("#txtTelefono").val().length < 5) {
                $("#controlTelefono").addClass("error");
                PError = true;
            }

            if (paciente.Nro_Seccional == "999") {
                $("#controlSeccional").addClass("error");
                PError = true;
            }


            $("#CargadoApellido").html(paciente.Paciente);
            $("#CargadoApellido2").html(paciente.Paciente);
            var AnioActual = new Date();
            var AnioNacimiento = new Date(parseJsonDate(paciente.fecha_nacimiento));

            //lo traer
            $("#CargadoEdad").html(paciente.Edad_Format);
            $("#CargadoEdad2").html(paciente.Edad_Format);

            $("#CargadoDNI").html(paciente.documento_real);
            $("#CargadoDNI2").html(paciente.documento_real);

            $("#CargadoNHC").html(paciente.NHC_UOM);
            $("#CargadoNHC2").html(paciente.NHC_UOM);

            $("#CargadoTelefono").html(paciente.Telefono);
            $("#CargadoTelefono2").html(paciente.Telefono);

            $("#CargadoSeccional").html($("#cboSeccional :selected").text());
            $("#CargadoSeccional2").html($("#cboSeccional :selected").text());


            if (!CertificadoMostrado) {
                CertificadoVencido(paciente.documento);
                CertificadoMostrado = true;
            }

            $("#Cod_OS").val(paciente.OSId);
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
                //$("#btnVencimiento").show();
            }

            PMIPI = "";
            if (paciente.PMI && paciente.PI == false) {
                PMIPI = "PMI"
            }

            if (paciente.PMI == false && paciente.PI) {
                PMIPI = "PI"
            }

            if (PMIPI != "") {
                $("#CargadoSeccional").html($("#CargadoSeccional").html() + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[" + PMIPI + "]");
            }

            $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
            $('#fotopaciente2').attr('src', '../fotoPerfil/' + paciente.Foto);

            if (PError) {
                $("#desdeaqui").hide();
            }
            else {
                $("#desdeaqui").show();
            }
            $("#txtPaciente").focus();
            //EstaInternado(); //Verifica si el paciente se encuentra internado en la clinica.
            //UltimoAporte_OK(paciente.cuil, paciente.cod_pariente); //Verifica aportes en Padron UOM.
            VerificarPMI(paciente.documento);
            PatologiabyId(paciente.Discapacidad);
            patologia = paciente.Discapacidad;
        });
    }
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
    document.location = "../DerivacionyTraslado/DerivacionyTraslado.aspx" + url + "&opcion=" + opcion;
}

$('#desdeaqui').click(function () {
    if (opcion == 1) {
        //if (Internado == 1) return false;
        //$("#cbo_Medico option[value=" + MedicoID + "]").attr("selected", true);
        $("#hastaaqui").fadeIn(1500);
        $("#primero").hide();
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 10 }, 500);
        //        $('.container').height($('html').height() + ($('.contenedor_1').height() -
        //				$('.pie').height() -
        //				$('#hastaaqui').height()));
        $('#cbo_Especialidad').focus();
        $("#autorizaciones").hide();
        var f = "";
        f = f + fecha.getDate();
        f = f + "/" + (fecha.getMonth() + 1) + "/";
        f = f + fecha.getFullYear();
        $("#fechaPedido").val(f);
    } else {
        $("#autorizaciones").fadeIn(1500);
        $("#primero").hide();
        //$("#primero").css("display", "none");
        $('html, body').animate({ scrollTop: $("#autorizaciones").offset().top - 10 }, 500);
        var json = JSON.stringify({ "id": pacienteId });
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/ChekearPendientes",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: blink
        });
    }
});

function blink(result) {
    if (result.d != "") {
        $("#btnSinResolucion").show();
        $("#btnSinResolucion").blink({ maxBlinks: 5, blinkPeriod: 500, speed: 'slow' });
    }
}

$("#btnSinResolucion").click(function () {
    document.location = "../DerivacionyTraslado/BuscarAutorizaciones.aspx?pacienteId=" + $("#afiliadoId").val() +"&resolucionesPendientes=1";
});

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
    //alert(Resultado.d);
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


function Practica_Codigo_ID()
{ }
/////////////////////////////////////////////////////////////////////////////////////der y tras

var sourceArr = [];
var mapped = {};
var idDYT = 0;
var icd10ID = "";
var Documento = 0;

cargarMedicoDT();
//cargarEspecialidadDT();
//cargarCentros();
//cargarSolicitado();
//cargaTraslado();
//cargaPrestacion();
//cargaSeguimiento();
//cargarEstado();
//cargarRechazos();




$('input.typeahead').typeahead({
    updater: function (item) {
        $("#txtICD10").val(item); //nom
        //$("#id_val").val(mapped[item]); //id
        icd10ID = mapped[item];
        return item;
    },
    minLength: 4,
    items: 50,
    hint: true,
    highlight: true,
    source: function (query, process) {
        var json = JSON.stringify({ "str": query });
        $.ajax({
            url: "../Json/Internaciones/IntSSC.asmx/CargarDiagnosticoICD10Detalles_Autocomplete",
            type: 'POST',
            dataType: "json",
            data: json,
            contentType: "application/json; charset=utf-8",
            success: function (Resultado) {
                var lista = Resultado.d;
                $.each(lista, function (i, icd) {
                    if (i == 0) {
                        sourceArr.length = 0;
                    }
                    str = icd.Descripcion;
                    mapped[str] = icd.Codigo;
                    sourceArr.push(str);
                });
                return process(sourceArr);
            }
        });
    }
});

$("#BtnVolverDT").click(function () {
    $("#primero").fadeIn(1500);
    $('html, body').animate({ scrollTop: $("#primero").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#primero').height()));
    //$('#cbo_Especialidad').focus();
    $("#autorizaciones").hide();
    $("#hastaaqui").hide();
    $("#txt_dni").focus();
});

function cargarMedicoDT() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerMedicosComboDT",
        contentType: "application/json; charset=utf-8",
        data: '{id: "' + 0 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboMedicoOrigen").append(new Option("Seleccione", 0));
            $("#cboMedicoDestino").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboMedicoOrigen").append(new Option(item.Medico, item.Id));
                $("#cboMedicoDestino").append(new Option(item.Medico, item.Id));
            });
        },
        complete: function () { cargarEspecialidadDT(); }
    });
}

function cargarEspecialidadDT() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerEspecialidadesComboDT",
        contentType: "application/json; charset=utf-8",
        data: '{id: "' + 0 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboEspecialidadOrigen").append(new Option("Seleccione", 0));
            $("#cboEspecialidadDestino").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboEspecialidadOrigen").append(new Option(item.Especialidad, item.Id));
                $("#cboEspecialidadDestino").append(new Option(item.Especialidad, item.Id));
            });
        },
        complete: function () { cargarCentros(); }
    });
}

function cargarCentros() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 21 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboOrigen").append(new Option("Seleccione", 0));
            $("#cboDestino").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboOrigen").append(new Option(item.descripcion, item.id));
                $("#cboDestino").append(new Option(item.descripcion, item.id));
            });
        },
        complete: function () { cargarSolicitado(); }
    });
}

function cargarSolicitado() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 24 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboSolicitado").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboSolicitado").append(new Option(item.descripcion, item.id));
            });
        },
        complete: function () { cargaTraslado(); }
    });
}
function cargaTraslado() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 23 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboTrasladado").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboTrasladado").append(new Option(item.descripcion, item.id));
            });
        },
        complete: function () { cargaPrestacion(); }
    });
}

function cargaPrestacion() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 22 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboPrestacion").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboPrestacion").append(new Option(item.descripcion, item.id));
            });
        },
        complete: function () { cargaSeguimiento(); }
    });
}

function cargaSeguimiento() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 27 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboSeguimiento").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboSeguimiento").append(new Option(item.descripcion, item.id));
            });
        },
        complete: function () { cargarEstado(); }
    });
}

function cargarEstado() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 25 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboEstadoDT").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboEstadoDT").append(new Option(item.descripcion, item.id));
            });
        },
        complete: function () { cargarRechazos(); }
    });
}

function cargarRechazos() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerCombos",
        contentType: "application/json; charset=utf-8",
        data: '{tipo: "' + 26 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboRechazos").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboRechazos").append(new Option(item.descripcion, item.id));
            });
        },
        complete: function () {
            Generar(idPlantilla);
         }
    });
}
$(".fechas").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true
});

$(".fechas").keydown(function () { return false; });

$("#horaPedido").mask("99:99", { placeholder: "-" });

$("#BtnGuardarDT").click(function () {
    if ($("#fechaPedido").val() == "") { alert("Ingrese Fecha del Pedido."); return false; }
    if (!$("#radio_desde").is(':checked') && !$("#radio_hasta").is(':checked')) { alert("Seleccione Origen o Destino"); return false; }

    var hora = $("#horaPedido").val();
    var patron = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/;
    if (patron.test(hora)) {
        //alert('Correcto'); return false;

    }
    else {
        alert('Ingrese un Hora Válida.'); return false;
    }
    var DYT = {};
    //    alert($("#txtdocumento").val());
    //    return false;
    if ($("#radio_desde").is(':checked')) { DYT.tipo = "D"; } else { DYT.tipo = "H"; }
    DYT.pacienteId = $("#afiliadoId").val(); // traer el id del paciente  con el hiden documento
    DYT.fechaPedido = $("#fechaPedido").val();
    DYT.horaPedido = $("#horaPedido").val();
    DYT.solicitanteId = $('#cboSolicitado option:selected').val();
    DYT.centroOrigen = $('#cboOrigen option:selected').val();
    DYT.especialidadOrigen = $('#cboEspecialidadOrigen option:selected').val();
    DYT.medicoOrigen = $('#cboMedicoOrigen option:selected').val();
    DYT.motivo = $("#txtMotivo").val();
    DYT.centroDestino = $('#cboDestino option:selected').val();
    DYT.especialidadDestino = $('#cboEspecialidadDestino option:selected').val();
    DYT.medicoDestino = $('#cboMedicoDestino option:selected').val();
    DYT.traslado = $('#cboTrasladado option:selected').val();
    DYT.prestacion = $('#cboPrestacion option:selected').val();
    DYT.seguimiento = $('#cboSeguimiento option:selected').val();
    DYT.fechaInternacion = $("#txtFechaInternacion").val();
    DYT.fechaAlta = $("#txtFechaAlta").val();
    DYT.estado = $('#cboEstadoDT option:selected').val();
    DYT.rechazos = $('#cboRechazos option:selected').val();
    DYT.diagnostico = icd10ID; // $("#txtICD10").val(); traer el id del diagnostico
    DYT.observaciones = $("#txtObservacionesDT").val(); // graba per no edita

    var json = JSON.stringify({ "id": idDYT, "item": DYT });
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/GuardarActulizarDYT",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            //idDYT = Resultado.d;
            alert("Guardado. Número: " + Resultado.d);

            $("#radio_hasta").attr('checked', false);
            $("#radio_desde").attr('checked', false);
            $("#fechaPedido").val("");
            $("#horaPedido").val("");
            $('#cboSolicitado').val(0);
            $('#cboOrigen').val(0);
            $('#cboEspecialidadOrigen').val(0);
            $('#cboMedicoOrigen').val(0);
            $("#txtMotivo").val("");
            $('#cboDestino').val(0);
            $('#cboEspecialidadDestino').val(0);
            $('#cboMedicoDestino').val(0);
            $('#cboTrasladado').val(0);
            $('#cboPrestacion').val(0);
            $('#cboSeguimiento').val(0);
            $("#txtFechaInternacion").val("");
            $("#txtFechaAlta").val("");
            $('#cboEstadoDT').val(0);
            $('#cboRechazos').val(0);
            icd10ID = 0;
            $("#txtICD10").val("");
            $("#txtObservacionesDT").val("");
            $("#btnVoucher").show();
            voucher_a_generar = 0;
        },
        complete: function () {
            TraerTodasDYTPaciente();
        }
    });
});


function TraerTodasDYTPaciente() {
    if ($("#afiliadoId").val() != "") {
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerTodasDYTPaciente",
            contentType: "application/json; charset=utf-8",
            data: '{idPaciente: "' + $("#afiliadoId").val() + '"}',
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $("#tablaHistorial").empty();
                var Contenido = "";
                var Pie = "";
                var Encabezado = "";
                var numero = lista.length;
                //Encabezado = "<table class='tabla table-hover table-condensed' style='width: 100%;'><thead style='height:0px'><tr><th style='padding:0px; text-align:center; width:2%'></th><th style='padding:0px; text-align:center; width:5%'></th><th  style='width:5%'></th><th style='padding:0px; text-align:center; width:10%'></th><th style='padding:0px; text-align:center; width:10%;color:Black'></th><th style='padding:0px; text-align:center; width:10%;color:Black' ></th><th style='padding:0px; text-align:center; width:38%;color:Black'></th><th style='padding:0px; text-align:center; width:10%;color:Black'></th><th style='padding:0px; text-align:center; width:10%;color:Black'></th></tr></thead><tbody>";
                $.each(lista, function (index, item) {

                    Contenido = Contenido + "<tr  class='filas' id='" + item.id + "'><td onclick='Generar(" + item.id + ") style='cursor:pointer; width:2%'>" + (numero) + "</td><td style='cursor:pointer; font-size:x-small; width:5%' onclick='Generar(" + item.id + ")'> " + item.fechaPedido + " </td><td style='cursor:pointer; font-size:x-small; width:5%' onclick='Generar(" + item.id + ")'>" + item.horaPedido + "</td><td style='cursor:pointer; font-size:x-small; width:10%' onclick='Generar(" + item.id + ")'>" + item.usuario + "</td><td style='cursor:pointer; font-size:x-small; width:10%' onclick='Generar(" + item.id + ")'>" + item.origenNombre + "</td><td style='cursor:pointer; font-size:x-small; width:10%' onclick='Generar(" + item.id + ")'>" + item.destinoNombre + "</td><td style='cursor:pointer; font-size:x-small; width:38%' onclick='Generar(" + item.id + ")'>" + item.motivo + "</td><td style='cursor:pointer; font-size:x-small; width:10%' onclick='Generar(" + item.id + ")'>" + item.estadoNombre + "</td><td style='cursor:pointer; font-size:x-small; width:10%' onclick='Generar(" + item.id + ")'>" + item.rechazosNombre + "</td>";
                    numero = numero - 1;
                });
                Pie = "</tbody></table>";
                $("#tablaHistorial").html(Encabezado + Contenido + Pie);
            }
        });
    }                
}

function Generar(id) {

    voucher_a_generar = id;

    $(".filas").css('background-color', '#dddddd');
    $("#" + id).css('background-color', 'aqua');
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerUnaDYT",
        contentType: "application/json; charset=utf-8",
        data: '{idDYT: "' + id + '"}',
        dataType: "json",
        success: function (Resultado) {
            var item = Resultado.d;
            switch (item.tipo) {
                case "D":
                    $("#radio_desde").attr('checked', true);
                    break;
                case "H":
                    $("#radio_hasta").attr('checked', true);
                    break;
            }
            $("#fechaPedido").val(item.fechaPedido);
            $("#horaPedido").val(item.horaPedido);
            $('#cboSolicitado').val(item.solicitanteId);
            $('#cboOrigen').val(item.centroOrigen);
            $('#cboEspecialidadOrigen').val(item.especialidadOrigen);
            $('#cboMedicoOrigen').val(item.medicoOrigen);
            $("#txtMotivo").val(item.motivo);
            $('#cboDestino').val(item.centroDestino);
            $('#cboEspecialidadDestino').val(item.especialidadDestino);
            $('#cboMedicoDestino').val(item.medicoDestino);
            $('#cboTrasladado').val(item.traslado);
            $('#cboPrestacion').val(item.prestacion);
            $('#cboSeguimiento').val(item.seguimiento);
            $("#txtFechaInternacion").val(item.fechaInternacion);
            $("#txtFechaAlta").val(item.fechaAlta);
            $('#cboEstadoDT').val(item.estado);
            $('#cboRechazos').val(item.rechazos);
            icd10ID = item.diagnosticoID;
            $("#txtICD10").val(item.diagnostico);
            $("#txtObservacionesDT").val(item.observaciones);

        }
    });
}

$("#BtnBuscarDT").click(function () {
    document.location = "../DerivacionyTraslado/Buscar_Derivacion_y_Traslado.aspx?Documento=" + $("#txt_dni").val() + "&ID=" + $("#afiliadoId").val();
});

$("#btnCancelarPedidoTurno").click(function () { document.location = "DerivacionyTraslado.aspx?opcion=" + opcion; });

$("#radio_hasta").click(function () {
    $("#cboDestino").val(57);
    $("#cboOrigen").val(0);
});

$("#radio_desde").click(function () {
    $("#cboOrigen").val(57);
    $("#cboDestino").val(0);
});


$("#btnVoucher").click(function () {
    if (voucher_a_generar == 0) {
        alert("Seleccione una derivacion o traslado para generar el voucher");
        return;
    } else {
        //guardo el voucher
        //complete voucher_a_generar = 0;
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/GenerarVoucher",
            contentType: "application/json; charset=utf-8",
            data: '{idDerivacion: "' + voucher_a_generar + '"}',
            dataType: "json",
            success: function (Resultado) {
                if (Resultado.d > 0) { alert("Se ha generado el voucher correctamente"); $("#btnVoucher").hide(); }
                else { alert("No se ha podido generar el voucher.Intentelo nuevamente mas tarde, de persistir este mensaje comuniquese con sistemas"); }
            }
        });
    }
});

//para actualizar el telefono
$("#btnactualizar").click(function () {
    if ($("#txtTelefono").val() != celCache) {
        if (!PhoneValidate("desdeaqui", "txtTelefono")) { return false } else {
            $.ajax({
                type: "POST",
                url: "../Json/Gente.asmx/ActualizarCelular",
                data: '{AfiliadoId: "' + $("#afiliadoId").val() + '" , celular: "' + $("#txtTelefono").val() + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    if (Resultado.d == 1) {
                        var sector;
                        switch (opcion) {
                            case "1":
                                sector = "DERIVACIONES Y TRASLADOS";
                                break;
                            case "2":
                                sector = "AUTORIZACIONES";
                                break;
                        }
 
                        generarLog($("#afiliadoId").val(), $("#txtTelefono").val(), sector); celCache = $("#txtTelefono").val();
                        alert("Celular Actualizado!.");
                    }
                    else { alert("No se pudo actualizar el Celular!."); }
                },
                error: errores
            });
        }
    }
});

//function restablecerControles() {
//    alert();
//    $("#radio_hasta").attr('checked', true);
//    $("#fechaPedido").val("");
//    $("#horaPedido").val("");
//    $('#cboSolicitado').val(0);
//    $('#cboOrigen').val(0);
//    $('#cboEspecialidadOrigen').val(0);
//    $('#cboMedicoOrigen').val(0);
//    $("#txtMotivo").val("");
//    $('#cboDestino').val(0);
//    $('#cboEspecialidadDestino').val(0);
//    $('#cboMedicoDestino').val(0);
//    $('#cboTrasladado').val(0);
//    $('#cboPrestacion').val(0);
//    $('#cboSeguimiento').val(0);
//    $("#txtFechaInternacion").val("");
//    $("#txtFechaAlta").val("");
//    $('#cboEstadoDT').val(0);
//    $('#cboRechazos').val(0);
//    icd10ID = 0;
//    $("#txtICD10").val("");
//    $("#txtObservacionesDT").val("");
//}