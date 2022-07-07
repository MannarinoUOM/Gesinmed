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
var celCache;

Cargar_Seccionales_Lista();
ListTipoDoc();
//Cargar_Especialidades(true, 0, false);
parent.document.getElementById("DondeEstoy").innerHTML = "<strong>Entrega de Resultados </strong>";
$("#titulo").html("Entrega de Resultados");

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


    if (GET["ID"] != "" && GET["ID"] != null) {
        $("#afiliadoId").val(GET["ID"]);
        CargarPacienteID(GET["ID"]);
    }

});
$("#fechaIngreso").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    onClose: function (selectedDate) {
        $("#txtHasta").datepicker("option", "minDate", selectedDate);
    }
});
$("#fechaEntrega").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    onClose: function (selectedDate) {
        $("#txtHasta").datepicker("option", "minDate", selectedDate);
    }
});
$("#fechaDevolucion").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    onClose: function (selectedDate) {
        $("#txtHasta").datepicker("option", "minDate", selectedDate);
    }
});

$(".fecha").mask("99/99/9999", { placeholder: "-" });
$('#fechaIngreso').datepicker('setDate', 'today');
cargarEspecialidad();

function cargarEspecialidad() {
    $.ajax({
        type: "POST",
        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerEspecialidadesCombo",
        contentType: "application/json; charset=utf-8",
        data: '{id: "' + 0 + '"}',
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            $("#cboEspecialidad").append(new Option("Seleccione", 0));
            $.each(lista, function (index, item) {
                $("#cboEspecialidad").append(new Option(item.Especialidad, item.Id));
            });
        }
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
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/Entrega_De_Resultados/Resultados_Entrega.asmx/Cargar_Paciente_Documento_Entrega_De_Resultados", ///////////>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Documento_Cargado,
        complete: cargarEstudios,
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
            $("#btnactualizar").show();
            $("#btnCancelarPedidoTurno").show();

            $("#txtnroturno").prop("readonly", true);

            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txtNHC").attr('value', paciente.NHC_UOM);
            $("#txtTelefono").attr('value', paciente.Telefono);
            celCache = Paciente.Telefono;
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
}


function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}
$("#btnCancelarPedidoTurno").click(function () { document.location = "AdministrarEntrega.aspx"; });

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
    document.location = "../Entrega_De_Resultados/AdministrarEntrega.aspx" + url;
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
        error: errores,
       complete: cargarEstudios
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
        $("#txtPaciente").focus();
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
        url: "../Json/Entrega_De_Resultados/Resultados_Entrega.asmx/CargarPacienteNHC_UOM_Entrega_De_Resultados",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores,
       complete: cargarEstudios
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

function cargarEstudios() {
    var json = JSON.stringify({
        "id": $("#afiliadoId").val(),
        "tipo": tipo
    });
    $.ajax({
        type: "POST",
        url: "../Json/Entrega_De_Resultados/Resultados_Entrega.asmx/TraerEstudiosTodos",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            if (lista.length == 0) { $("#mensaje").show() } else { $("#mensaje").hide() }  
            cargarTabla(lista);

        }
    });
}

$("#btn_Todos").click(function () {
    tipo = 0;
    $("#btn_Todos").addClass("reff_activo");
    $("#btn_Ingresados").removeClass("reff_activo");
    $("#btn_Entregados").removeClass("reff_activo");
    $("#btn_Devolucion").removeClass("reff_activo");
    cargarEstudios();
});
$("#btn_Ingresados").click(function () {
    tipo = 1;
    $("#btn_Ingresados").addClass("reff_activo");
    $("#btn_Entregados").removeClass("reff_activo");
    $("#btn_Devolucion").removeClass("reff_activo");
    $("#btn_Todos").removeClass("reff_activo");
    cargarEstudios();
});
$("#btn_Entregados").click(function () {
    tipo = 2;
    $("#btn_Entregados").addClass("reff_activo");
    $("#btn_Ingresados").removeClass("reff_activo");
    $("#btn_Devolucion").removeClass("reff_activo");
    $("#btn_Todos").removeClass("reff_activo");
    cargarEstudios();
});
$("#btn_Devolucion").click(function () {
    tipo = 3;
    $("#btn_Devolucion").addClass("reff_activo");
    $("#btn_Entregados").removeClass("reff_activo");
    $("#btn_Ingresados").removeClass("reff_activo");
    $("#btn_Todos").removeClass("reff_activo");
    cargarEstudios();
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
    var color = "";
    $.each(lista, function (index, item) {
        if (item.fechaIngreso != "") { color = "#F4FA58" }
        if (item.fechaEntrega != "") { color = "#58FA58" }
        if (item.fechaDevolucion != "") { color = "#0080FF" }
        switch (tipo) {
            case 1:
                color = "#F4FA58"  
                break;
            case 2:
                color = "#58FA58"
                break;
            case 3:
                color = "#0080FF"
                break;
        }
        // if (item.fechaIngreso != "" && item.fechaEntrega == "" && item.fechaDevolucion == "") { color = "#F4FA58" }

        Contenido = Contenido + "<tr style='width:100%;background-color:" + color + "'>" +
        "<td style='cursor:auto;width:7%'><a  onclick='Editar(" + item.estudioId + ");' class='btn btn-mini' rel='tooltip' title='Editar Entrega'><i class='icon-edit'></i></a>" +
        "<a onclick='Eliminar(" + item.estudioId + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Entrega' style='float:right'><i class='icon-remove-circle icon-white'></i></a></td>" +
        "<td id=fechaIngreso" + item.estudioId + " style='cursor:auto;width:8%'> " + item.fechaIngreso + " </td>" +
        "<td id=fechaEntrega" + item.estudioId + " style='cursor:auto; width:10%'>" + item.fechaEntrega + "</td>" +
        "<td id=fechaDevolucion" + item.estudioId + " style='cursor:auto; width:9%'>" + item.fechaDevolucion + "</td>" +
        "<td style='cursor:auto; width:12%'>" + item.estudio + "</td><td style='display:none' id=estudio" + item.estudioId + ">" + item.especialidadId + "</td>" +
        "<td id=afiliado" + item.estudioId + " style='cursor:auto; width:20%'>" + item.afiliado + "</td>" +
        "<td id=observacion" + item.estudioId + " style='cursor:auto; width:17%'>" + item.observacion + "</td>";

    });
    Pie = "</tbody></table>";
    $("#tablaPracticas").html(Encabezado + Contenido + Pie);
}

function Editar(id) {
    edita = 1;
    $("#cboEspecialidad").val($("#estudio" + id).html());
    $("#fechaIngreso").val($("#fechaIngreso" + id).html());
    $("#fechaEntrega").val($("#fechaEntrega" + id).html());
    $("#fechaDevolucion").val($("#fechaDevolucion" + id).html());
    $("#txtComentarios").val($("#observacion" + id).html());
    entregaId = id;
    $("#btnCancelaredicion").show();
}

$("#btnCancelaredicion").click(function () {
    edita = 0;
    entregaId = 0;
    $("#cboEspecialidad").val(0);
    $("#fechaIngreso").val("");
    $("#fechaEntrega").val("");
    $("#fechaDevolucion").val("");
    $("#txtComentarios").val("");
    $("#btnCancelaredicion").hide();
});



function restablecerControles() {
    $("#cboEspecialidad").val(0);
    $("#fechaIngreso").val("");
    $("#fechaEntrega").val("");
    $("#fechaDevolucion").val("");
    $("#txtComentarios").val("");
}

function Eliminar(indice) {
    var respuesta = confirm("Realmente desea borrar la entrega?.");
    if (respuesta == true) {

        var json = JSON.stringify({"id": indice});
        $.ajax({
            type: "POST",
            url: "../Json/Entrega_De_Resultados/Resultados_Entrega.asmx/EliminarEntrega",
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function () {
                cargarEstudios();
                alert("Eliminado.");
            }
        });

    } else {
        return false;
    }
}

$("#btnGuardar").click(function () {
    if ($("#cboEspecialidad").val() == 0) { alert("Selecione 'Estudio De:'"); return false; }
    if ($("#fechaIngreso").val() == "") { alert("Ingrese Fecha de Ingreso"); return false; }

    var entrega = JSON.stringify({
        "estudioId": entregaId
        , "especialidadId": $("#cboEspecialidad").val()
        , "fechaIngreso": $("#fechaIngreso").val()
        , "fechaEntrega": $("#fechaEntrega").val()
        , "fechaDevolucion": $("#fechaDevolucion").val()
        , "observacion": $("#txtComentarios").val()
        , "pacienteId": $("#afiliadoId").val()
    });

    $.ajax({
        type: "POST",
        url: "../Json/Entrega_De_Resultados/Resultados_Entrega.asmx/GuardarEditarEntregas",
        contentType: "application/json; charset=utf-8",
        data: entrega,
        dataType: "json",
        success: function (Resultado) {
            alert("Guardado.");

            $("#btnCancelaredicion").hide();
            entregaId = 0;
            restablecerControles();
            cargarEstudios();
        }
    });
});

//function guardarDetalle(id) {

//    var json = JSON.stringify({ "lista": listpracticas, "id": id });
//    $.ajax({
//        type: "POST",
//        url: "../Json/Autorizaciones/Autorizaciones.asmx/GuardarDetalleAutorizacionExpress",
//        contentType: "application/json; charset=utf-8",
//        data: json,
//        dataType: "json",
//        success: function (Resultado) {
//            //idAutorizacion = Resultado.d;
//            //                alert(Resultado.d);
//            //alert(idAutorizacion);
//            //alert("guardado. Número: " + idAutorizacion);
//            // alert("Guardado.");

//            listpracticas.length = 0;
//            $("#tablaPracticas").empty();
//            restablecerControles();
//            //$("#cboMedico").val(0);
//            $("#email").val("");
//            $("#txtComentarios").val("");

//            if (edita == 1) {
//                $("#btnCancelaredicion").show();
//            } else { $("#btnCancelaredicion").hide(); }
//            // alert(idAutorizacion); return false;
//            $.fancybox({
//                'href': "../Impresiones/ReportesDYT/AutorizacionExpressComprobante.aspx?id=" + idAutorizacion + "&tipo=1" + "&desde=1/1/1900" + "&hasta=1/1/1900",
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
//        }
//    });
//}

//function traerEmail() {
//    $.ajax({
//        type: "POST",
//        url: "../Json/EntregaDeResultado/EntregaDeResultado.asmx/TraerTitular",
//        data: '{id: "' + $("#afiliadoId").val() + '"}',
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: cargarTitular,
//        error: errores
//        //complete: cargarEmail(resultado)
//    });
//}

function cargarTitular(resultado) {
    $("#span_Titular").val(resultado.d);
}

//$("#BtnBuscar").click(function () {
//    document.location = "../DerivacionyTraslado/Buscar_Autorizacion_Express.aspx";
//});

//function cargarEdicion(id) {
//    var json = JSON.stringify({ "idEncabezado": id, "tipo": 1, "desde": "1-1-1900", "hasta": "1-1-1900" });
//    $.ajax({
//        type: "POST",
//        url: "../Json/Autorizaciones/Autorizaciones.asmx/BuscarExpress",
//        data: json,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: cargarControles,
//        complete: cargardetalles
//    });
//}

function cargarControles(resultado) {
    var lista = {};
    lista = resultado.d;
    $.each(lista, function (index, item) {
        $("#txtFecha").val(item.fecha);
        //$("#cboMedico").val(item.idMedico);
        $("#txtComentarios").val(item.observacion);
    });
}

//function cargardetalles() {
//    var json = JSON.stringify({ "idEncabezado": idAutorizacion });
//    $.ajax({
//        type: "POST",
//        url: "../Json/Autorizaciones/Autorizaciones.asmx/TraerDetalleExpress",
//        data: json,
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: fin
//    });
//}

//function fin(resultado) {
//    listpracticas = resultado.d;
//    cargarTabla(listpracticas);
//}


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
                        generarLog($("#afiliadoId").val(), $("#txtTelefono").val(), "ENTREGA DE RESULTADOS"); celCache = $("#txtTelefono").val();
                        alert("Celular Actualizado!.");
                    }
                    else { alert("No se pudo actualizar el Celular!."); }
                },
                error: errores
            });
        }
    }
});