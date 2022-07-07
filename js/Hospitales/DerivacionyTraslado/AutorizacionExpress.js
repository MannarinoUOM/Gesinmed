var Internado = 0;
var Ultimo_OK = 0;
var pacienteId = 0;
var CertificadoMostrado = false;
var fecha = new Date();
var listpracticas = [];
var idAutorizacion = 0;
var idEditar = 0;
var edita = 0;
//var autorizacionEditar = new Object();
var celCache;

Cargar_Seccionales_Lista();
ListTipoDoc();
cargarMedico()
//Cargar_Especialidades(true, 0, false);
parent.document.getElementById("DondeEstoy").innerHTML = "Derivaciones > <strong>Autorización Express</strong>";
$("#titulo").html("Autorización Express");

$(document).ready(function () {
    //ListTipoDoc();
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


    if (GET["idAutorizacion"] != "" && GET["idAutorizacion"] != null) {
        idAutorizacion = GET["idAutorizacion"];
        //        if (GET["edita"] != "" && GET["edita"] != null) {
        //            edita = GET["edita"];
        //        }
        //        if (edita == 1) {
        cargarEdicion(idAutorizacion);
        //        }
    }

    if (GET["ID"] != "" && GET["ID"] != null) {
        $("#afiliadoId").val(GET["ID"]);
        CargarPacienteID(GET["ID"]);
    }
    if (GET["edita"] != "" && GET["edita"] != null) {
        edita = GET["edita"];

        if (edita == 1) {
            $("#btnCancelaredicion").show();
        } else { $("#btnCancelaredicion").hide(); }
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

    //Cargar_Autorizantes(0);

    $("#btnReservaTurnoAhora").attr("checked", true);
    //ActualizarNroTurno_();
    $("#NroTurnoAhora").show();
});

function UltimoAporte_OK(cuil, Parentesco) {
    if (Ultimo_OK == 1) { return false; }
    if (Parentesco == null) Parentesco = '00';
    //var json = JSON.stringify({ "Cuil": cuil, "Cod_Parentesco": Parentesco });
    var json = JSON.stringify({ "Documento": pacienteId });
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
    //if (opcion == 1) {
        if (Id <= 1) { $('#span_Discapacidad').html("PATOLOGÍA: NO"); $("#discapacidad_paga").val('S'); return; }
//    } else {
//        if (Id <= 1) { $('#span_Discapacidad2').html("PATOLOGÍA: NO"); $("#discapacidad_paga2").val('S'); return; }
//    }
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


function errores(msg) {
    Impreso = 0;
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
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
    if (Internado == 1) { return false; }
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        complete: traerEmail,
        error: errores
    });
}


function Cargar_Paciente_Documento_Cargado(Resultado) {
    //    if (edita == 0) {idAutorizacion = 0;}
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
                //                $("#controlTelefono").addClass("error");
                //                PError = true;
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


function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}
$("#btnCancelarPedidoTurno").click(function () { document.location = "AutorizacionExpress.aspx"; });

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

$('#desdeaqui').click(function () {
//        //$("#cbo_Medico option[value=" + MedicoID + "]").attr("selected", true);
        var f = "";
        f = f + fecha.getDate();
        f = f + "/" + (fecha.getMonth() + 1) + "/";
        f = f + fecha.getFullYear();
        $("#txtFecha").val(f);

    $("#hastaaqui").fadeIn(1500);
        $("#primero").hide();
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 100 }, 600);
        $('.container').height($('html').height() + ($('#autorizaciones').height() -
        				$('.pie').height() -
        				$('#autorizaciones').height()));
    });

    $("#btnVolver").click(function () {
        $("#primero").fadeIn(1500);
        $("#hastaaqui").hide();
        $('html, body').animate({ scrollTop: $("#primero").offset().top - 60 }, 500);
        $('.container').height($('html').height() + ($('#primero').height() -
				$('.pie').height() -
				$('#primero').height()));
        $("#txt_dni").focus();
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

    function RecargarPagina(url) {
        document.location = "../DerivacionyTraslado/AutorizacionExpress.aspx" + url;
    }

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
            complete: traerEmail
        });
    }

    function Cargar_Paciente_NHC_Cargado(Resultado) {
        
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
            $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
            $('#fotopaciente2').attr('src', '../fotoPerfil/' + paciente.Foto);
        });

    }

    $("#txtNHC").change(function () {
        if ($("#txtNHC").val().length > 0)
            Cargar_Paciente_NHC($("#txtNHC").val());
    });

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
            complete: traerEmail
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

    function cargarMedico() {
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerMedicosComboDT",
            contentType: "application/json; charset=utf-8",
            data: '{id: "' + 0 + '"}',
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                $("#cboMedico").append(new Option("Seleccione", 0));
                $.each(lista, function (index, item) {
                    $("#cboMedico").append(new Option(item.Medico, item.Id));
                });
            },
            complete: function () { cargarPracticas(); }
        });
    }
    function cargarPracticas(){
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerPracticasCombo",
            contentType: "application/json; charset=utf-8",
            data: '{tipo: "' + 1 + '"}',
            dataType: "json",
            success: function (Resultado) {
                listaPracticas = Resultado.d;
                $("#cboPractica").append(new Option("Seleccione", 0));
                $.each(listaPracticas, function (index, item) {
                    $("#cboPractica").append(new Option(item.Practica, item.Codigo));
                });
            }
        });
    }

    $("#txtCodigo").keydown(function (event) {
        if (event.shiftKey) {
            event.preventDefault();
        }

        if (event.keyCode == 46 || event.keyCode == 8) {
        }
        else {
            if (event.keyCode < 95) {
                if (event.keyCode < 48 || event.keyCode > 57) {
                    event.preventDefault();
                }
            }
            else {
                if (event.keyCode < 96 || event.keyCode > 105) {
                    event.preventDefault();
                }
            }
        }

    });

    $("#txtCodigo").keyup(function () {
        $("#cboPractica").val($("#txtCodigo").val());

       // if ($("#txtCodigo").val().trim().length > 0) {

    });

    $("#cboPractica").change(function () {
        $("#txtCodigo").val($("#cboPractica").val());
        if ($("#cboPractica").val() != 0) { $("#cboPractica").attr('disabled', false); $("#txtCodigo").attr('disabled', false); }
    });
////////////////////////////////////////////////////////////////
    $("#btnAgregar").click(function () {
        if ($('#cboPractica option:selected').val() == 0) { alert("Seleccione una Práctica."); return false; }
        if ($('#cboMedico option:selected').val() == 0) { alert("Seleccione un Médico."); return false; }


        var seleccion = {};
        seleccion.codigoPrac = $('#txtCodigo').val();
        seleccion.descripcionPrac = $('#cboPractica option:selected').text();
        seleccion.idMedico = $('#cboMedico option:selected').val();
        seleccion.medico = $('#cboMedico option:selected').text();
        listpracticas.push(seleccion);
        cargarTabla(listpracticas);
        // }
    });

        function cargarTabla(lista) {

            $("#tablaPracticas").empty();
            var Contenido = "";
            var Pie = "";
            var Encabezado = "";
            //var cont = listpracticas.length - 1;
            for (cont = listpracticas.length - 1; cont >= 0;cont--)  {
                var item = listpracticas[cont];

                Contenido = Contenido + "<tr style='width:100%'><td style='cursor:auto;width:8%'><a id='Editar" + cont + "' onclick='Edita(" + cont + ");' class='btn btn-mini' rel='tooltip' title='Editar Práctica' style='display:none'><i class='icon-edit'></i></a>" +
                "<a id='Elminar" + cont + "'onclick='Eliminar(" + cont + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Práctica' style='float:right'><i class='icon-remove-circle icon-white'></i></a>" +
                "</td><td style='cursor:auto;width:8%'> " + item.codigoPrac + " </td><td style='cursor:auto; width:52%'>" + item.descripcionPrac + "<td style='cursor:auto; width:32%'>" + item.medico + "</td>";
              
            }
            Pie = "</tbody></table>";
            $("#tablaPracticas").html(Encabezado + Contenido + Pie);
            restablecerControles();
        }

        function restablecerControles() {
            $("#cboPractica").val(0);
            $("#txtCodigo").val("");
            $("#cboMedico").val(0);
        }

        function Eliminar(indice) {
            listpracticas.splice(indice, 1);
            cargarTabla(listpracticas);
            restablecerControles();
        }

        $("#btnGuardar").click(function () {


//            $.fancybox({
//                'href': "http://10.10.8.71/Impresiones/ReportesDYT/AutorizacionExpressComprobante.aspx?id=76044&tipo=1&desde=1/1/1900&hasta=1/1/1900&documento=0",
//                'width': '100%',
//                'height': '75%',
//                'autoScale': false,
//                'transitionIn': 'elastic',
//                'transitionOut': 'none',
//                'type': 'iframe',
//                'hideOnOverlayClick': false,
//                'enableEscapeButton': false,
//                'preload': true,
//                'onComplete': function f() {
//                    jQuery.fancybox.showActivity();
//                    jQuery('#fancybox-frame').load(function () {
//                        jQuery.fancybox.hideActivity();
//                    });
//                    idAutorizacion = 0;
//                    edita = 0;
//                    $("#btnCancelaredicion").hide();
//                }
//            });
//            return false;

            // if ($("#cboMedico").val() == 0) { alert("Seleccione un Médico."); return false; }
            if (listpracticas.length <= 0) { alert("Cargue alguna Práctica."); return false; }

            var json = JSON.stringify({
                "id": idAutorizacion
        , "fecha": $("#txtFecha").val()
        , "idPaciente": $("#afiliadoId").val()
                //        , "idMedico": $('#cboMedico option:selected').val()
        , "observacion": $("#txtComentarios").val()
        , "email": $("#email").val()
            });

            $.ajax({
                type: "POST",
                url: "../Json/Autorizaciones/Autorizaciones.asmx/GuardarActulizarEncabezadoAutorizacionExpress",
                contentType: "application/json; charset=utf-8",
                data: json,
                dataType: "json",
                success: function (Resultado) {
                    idAutorizacion = Resultado.d;
                    guardarDetalle(idAutorizacion);
                }
            });
        });

    function guardarDetalle(id) {

        var json = JSON.stringify({ "lista": listpracticas, "id": id });
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/GuardarDetalleAutorizacionExpress",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                //idAutorizacion = Resultado.d;
                //                alert(Resultado.d);
                //alert(idAutorizacion);
                //alert("guardado. Número: " + idAutorizacion);
                // alert("Guardado.");
               
                listpracticas.length = 0;
                $("#tablaPracticas").empty();
                restablecerControles();
                //$("#cboMedico").val(0);
                $("#email").val("");
                $("#txtComentarios").val("");
               
                if (edita == 1) {
                    $("#btnCancelaredicion").show();
                } else { $("#btnCancelaredicion").hide(); }
               // alert(idAutorizacion); return false;
                $.fancybox({
                    'href': "../Impresiones/ReportesDYT/AutorizacionExpressComprobante.aspx?id=" + idAutorizacion + "&tipo=1" + "&desde=1/1/1900" + "&hasta=1/1/1900&documento=0",
                    'width': '100%',
                    'height': '75%',
                    'autoScale': false,
                    'transitionIn': 'elastic',
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
                        idAutorizacion = 0;
                        edita = 0;
                        $("#btnCancelaredicion").hide();
                    }
                });
            }
        });
    }

    function traerEmail() {
            $.ajax({
                type: "POST",
                url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerEmail",
                data: '{id: "' + $("#afiliadoId").val() + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: cargarEmail,
                error: errores
                //complete: cargarEmail(resultado)
            });
    }

    function cargarEmail(resultado) {
        $("#email").val(resultado.d);
    }

    $("#BtnBuscar").click(function () {
        document.location = "../DerivacionyTraslado/Buscar_Autorizacion_Express.aspx";
    });

    function cargarEdicion(id) {
        var json = JSON.stringify({ "idEncabezado": id, "tipo": 1, "desde": "1-1-1900", "hasta": "1-1-1900" });
        $.ajax({
            type: "POST",
            url: "../Json/Autorizaciones/Autorizaciones.asmx/BuscarExpress",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: cargarControles,
            complete: cargardetalles
        });
    }

    function cargarControles(resultado) {
         var lista = {};
         lista = resultado.d;
         $.each(lista, function (index, item) {
                $("#txtFecha").val(item.fecha);
                //$("#cboMedico").val(item.idMedico);
                $("#txtComentarios").val(item.observacion);
          });
        }

        function cargardetalles() {
            var json = JSON.stringify({ "idEncabezado": idAutorizacion });
            $.ajax({
                type: "POST",
                url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerDetalleExpress",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: fin
            });  
        }

        function fin(resultado) {
            listpracticas = resultado.d;
            cargarTabla(listpracticas); }

            $("#btnCancelaredicion").click(function () {
                restablecerControles();
                idAutorizacion = 0;
                listpracticas.length = 0;
                $("#tablaPracticas").empty();
                $("#cboMedico").val(0);
                $("#email").val("");
                $("#txtComentarios").val("");
                $("#btnCancelaredicion").hide();
                edita = 0;
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
                                    generarLog($("#afiliadoId").val(), $("#txtTelefono").val(), "AUTORIZACION EXPRESS"); celCache = $("#txtTelefono").val();
                                    alert("Celular Actualizado!.");
                                }
                                else { alert("No se pudo actualizar el Celular!."); }
                            },
                            error: errores
                        });
                    }
                }
            });