var Internado = 0;
var Ultimo_OK = 0;
var pacienteId = 0;
var CertificadoMostrado = false;
var fecha = new Date();
var listpracticas = [];
var idEntrega = 0;
var idEditar = 0;
var edita = 0;
var tipo = 0;
var entregaId = 0;
var externo = 0;

Cargar_Seccionales_Lista();
ListTipoDoc();
//parent.document.getElementById("DondeEstoy").innerHTML = "<strong>Entrega de Resultados </strong>";
//$("#titulo").html("Entrega de Resultados");

$(document).ready(function () {
    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    $("#txtNHC").focus();
    var GET = {};
    var NHC = "";
    var Documento = "";
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txtNhcExterna").mask("9?9999999999", { placeholder: "" });
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


    if (GET["ID"] != "" && GET["ID"] != null) {
        $("#afiliadoId").val(GET["ID"]);
        CargarPacienteID(GET["ID"]);
    }

});

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



$("#txtNHC").on('keypress', function (event) {
    if ($("#desdeaqui").is(":visible") && event.keyCode == 13) {
        $("#desdeaqui").click();
    }
});

$("#txt_dni").on('keypress', function (event) {
    if ($("#desdeaqui").is(":visible") && event.keyCode == 13) {
        $("#desdeaqui").click();
    }
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
        url: "../Json/Entrega_De_Resultados/Resultados_Entrega.asmx/Cargar_Paciente_Documento_Entrega_De_Resultados", ///////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        //complete: cargarControles,
        error: errores
    });
}


function Cargar_Paciente_Documento_Cargado(Resultado) {
    //    if (edita == 0) {idAutorizacion = 0;}
    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
        $.each(Paciente, function (index, paciente) {
            //            if (paciente.Vencido) {
            //                alert("Paciente dado de baja el día: " + paciente.FechaVencido);
            //                return false;
            //            }
            // $("#btnactualizar").show();
            $("#btnCancelarPedidoTurno").show();

            $("#txtnroturno").prop("readonly", true);

            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txtNHC").attr('value', paciente.NHC_UOM);
            $("#txtTelefono").attr('value', paciente.Telefono);
            $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

            $("#btnOtorgados").css('display', 'inline');


            //            if ($("#txtTelefono").val().length < 5) {
            //                $("#controlTelefono").addClass("error");
            //                PError = true;
            //            }
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

            $("#afiliadoId").val(paciente.documento);

            $("#cbo_TipoDOC").val(paciente.TipoDoc);

            //$("#discapacidad_val").val(paciente.Discapacidad);

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
            $("#CargardoTitular").html(paciente.Nombretitular);

            pacienteId = paciente.documento;

        });
    }
    else if (Paciente.length > 1) {
        $("#txtdocumento").val($("#txt_dni").val());
        BuscarPacientes_fancy();
        $("#txtPaciente").focus();
    }
    $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
    $('#fotopaciente').error(function () {
        $(this).attr('src', '../img/silueta.jpg');
    });
}


function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}
$("#btnCancelarPedidoTurno").click(function () { document.location = "PAP.aspx"; });

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

$("#desdeaqui").click(function () {
    //if ($("#afiliadoId").val() == 0) { alert("Busque algún paciente para seguir"); return false; }
    $("#externo").val(externo);
    if (externo == 0 && $("#externo").val() == 0) {
        $("#hastaaqui").fadeIn(1500);
        $("#primero").hide();
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 100 }, 600);
        $('.container').height($('html').height() + ($('#autorizaciones').height() -
        				$('.pie').height() -
        				$('#autorizaciones').height()));

        $("#derivaciones").height(720);
        $(".ocultar").show();
        $(".derecha").removeClass('pull-left');
        parent.idCarga = 0;
        $("#txtMaterialCod").focus();
        //        var lista = [];
        //        lista.push(idsTecnicas);
        //        lista.push(tecnicas);
        //        lista.push(idsDiagnosticos);
        //        lista.push(diagnosticos);
        //        //$.each(lista, function (index, item) { alert(item); });
        //        //  alert(lista.length);
        //        reestablecer(lista);

        // alert(parent.idsTecnicas.length + " / " + parent.tecnicas.length + " / " + parent.idsDiagnosticos.length + " / " + parent.diagnosticos.length);
    } else {
        $("#hastaaqui").fadeIn(1500);
        $("#primero").hide();
        $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 100 }, 600);
        $('.container').height($('html').height() + ($('#autorizaciones').height() -
        				$('.pie').height() -
        				$('#autorizaciones').height()));

        $("#derivaciones").height(760);

        $("#CargadoApellido").html($("#txtPacienteExterno").val());
        $("#CargadoApellido").html($("#txtPacienteExterno").val());

        $("#CargadoNHC").html($("#txtNhcExterna").val());
        $("#CargadoNHC2").html($("#txtNhcExterna").val());

        $("#CargadoSeccional").html($("#cboSeccional :selected").text());
        $("#CargadoSeccional2").html($("#cboSeccional :selected").text());
        $(".ocultar").hide();
        $(".derecha").addClass('pull-left');
        $("#afiliadoId").val(null); //"///////////////////////////////////////////////////////////////////////////////)
        parent.idCarga = 0;
        $("#txtMaterialCod").focus();
    }
});

$("#btnVolver").click(function () {
    var r = true;

    if (preguntarAntesDeSalir())
        r = confirm("Los cambios realizados no se guardarán. ¿Desea continuar?");

    if (!r)
        return false;

    $("#btnCancelarPedidoTurno").click();
    //parent.idCarga = 0;
    $("#primero").fadeIn(1500);
    $("#hastaaqui").hide();
    $('html, body').animate({ scrollTop: $("#primero").offset().top - 60 }, 500);
    $('.container').height($('html').height() + ($('#primero').height() -
				$('.pie').height() -
				$('#primero').height()));
    $("#txt_dni").focus();
    $("#derivaciones").height(600);
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
//310
function RecargarPagina(url) {
    document.location = "../AnatomiaPatologicaTrue/PAP.aspx" + url;
}

function CargarPacienteID(ID) {

    //if (Internado == 1) { return false; }
        $.ajax({
            type: "POST",
            url: "../Json/Entrega_De_Resultados/Resultados_Entrega.asmx/CargarPacienteID_Entrega_De_Resultados", ////////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>
            data: '{ID: "' + ID + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Cargar_Paciente_NHC_Cargado,
            error: errores
            //        ,
            //        complete: cargarControles
        });
}

function Cargar_Paciente_NHC_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {
        //        if (paciente.Vencido) {
        //            alert("Paciente dado de baja el día: " + paciente.FechaVencido);
        //            $("#desdeaqui").hide();
        //            return false;
        //        }

        //$("#btnactualizar").show();
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

        $("#discapacidad_val").val(paciente.Discapacidad);

        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);



        //        if ($("#txtTelefono").val().length < 5) {
        //            $("#controlTelefono").addClass("error");
        //            PError = true;
        //        }

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
        //alert("foto");
        $("#txtPaciente").focus();
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);
        $('#fotopaciente2').attr('src', '../fotoPerfil/' + paciente.Foto);

        $('#fotopaciente').error(function () {
            $(this).attr('src', '../img/silueta.jpg');
        });
        //silueta
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
        url: "../Json/Entrega_De_Resultados/Resultados_Entrega.asmx/CargarPacienteNHC_UOM_Entrega_De_Resultados",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
        //complete: cargarControles
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


$(".externo").keyup(function () {
    //alert($(this).val());
    if ($("#txtPacienteExterno").val().trim().length > 0) {
        $(".interno").val("");
        $(".interno").attr("disabled", true);
        $("#btnBuscarPaciente").hide();
    } else if ($("#txtNhcExterna").val().trim().length <= 0) {
        $(".interno").attr("disabled", false);
        $("#btnBuscarPaciente").show();
    }

    if ($("#txtNhcExterna").val().trim().length > 0) {
        $(".interno").val("");
        $(".interno").attr("disabled", true);
        $("#btnBuscarPaciente").hide();
    } else if ($("#txtPacienteExterno").val().trim().length <= 0) {
        $(".interno").attr("disabled", false);
        $("#btnBuscarPaciente").show();
    }

    if ($("#txtPacienteExterno").val().trim().length > 0 && $("#txtNhcExterna").val().trim().length > 0) {
        $("#desdeaqui").show();
        $("#btnCancelarPedidoTurno").show();
        externo = 1;
        //$("#externo").val() = 1;
        $("#externo").val(1);
    } else {
        $("#desdeaqui").hide();
        $("#btnCancelarPedidoTurno").hide();
        //$("#externo").val() = 0;
        $("#externo").val(0);
        externo = 0;
    }


    if (($(this).attr('id')) == "txtPacienteExterno")
        var json = JSON.stringify({ "paciente": $("#txtPacienteExterno").val(), "nhc": $("#txtNhcExterna").val(), "tipo": 1 });

    if (($(this).attr('id')) == "txtNhcExterna")
        var json = JSON.stringify({ "paciente": $("#txtPacienteExterno").val(), "nhc": $("#txtNhcExterna").val(), "tipo": 1 });

    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerPacienteExterno",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            var r = Resultado.d;
            $("#resultados").empty();
            var Encabezado = "<table class=' table-hover' style='width:100%;overflow:auto'><thead><td><b>NHC</b></td><td><b>Afiliado</b></td><td><b>Seccional</b></td></thead><tbody>";
            var Contenido = "";
            $.each(r, function (index, item) {

                Contenido = Contenido + "<tr>" +
           "<td id='nhc" + index + "' style='width:20%; text-aling:center' class='manito' onclick='sel(" + index + ")'>" + item.nhc.toString().toUpperCase() + "</td>" +
           "<td id='afiliado" + index + "' style='width:40%; text-aling:center' class='manito' onclick='sel(" + index + ")'>" + item.afiliadoname.toString().toUpperCase() + "</td>" +
           "<td id='seccionalName" + index + "' style='width:40%; text-aling:center' class='manito' onclick='sel(" + index + ")'>" + item.seccionalName.toString().toUpperCase() + "</td>" +
           "<td id='seccionalId" + index + "' style='width:0%; text-aling:center; display:none' class='manito' onclick='sel(" + index + ")'>" + item.seccionalId + "</td>";

            });
            var Pie = "</tbody></table>";
            $("#resultados").html(Encabezado + Contenido + Pie);

            if ($(".externo").val().trim().length <= 0) {
                //$("#sugerencias").fadeOut();
                $("#sugerencias").hide();
                //$("#resultados").fadeOut();
            } else {
                if ($("#sugerencias").css('display') != 'block') { $("#sugerencias").fadeIn(); }
            }

            if ($("#txtNhcExterna").val().trim().length > 0) {
                //alert($("#sugerencias").css('display'));
                if ($("#sugerencias").css('display') != 'block') { $("#sugerencias").fadeIn(); }
            } else if ($("#txtPacienteExterno").val().trim().length <= 0) {
                //$("#sugerencias").fadeOut();
                $("#sugerencias").hide();
                //$("#resultados").fadeOut();
            }
        }
    });
});


function sel(index) {
    $("#txtNhcExterna").val($("#nhc" + index).html());
    $("#txtPacienteExterno").val($("#afiliado" + index).html());
    $("#cboSeccional").val($("#seccionalId" + index).html());
    $("#desdeaqui").show();
    $("#btnCancelarPedidoTurno").show();
    externo = 1;
    $("#externo").val(1);
    $("#sugerencias").hide();
    //$("#resultados").hide();
            } 