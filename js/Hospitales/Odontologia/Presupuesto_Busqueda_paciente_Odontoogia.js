
$(document).ready(function () {
    ListTipoDoc();
    Cargar_Seccionales_Lista();

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }
    $("#txtNHC").focus();
    var GET = {};
    var NHC = "";
    var Documento = "";
//    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
//    $("#txtNhcExterna").mask("9?9999999999", { placeholder: "" });
//    $("#txt_dni").mask("999999?99", { placeholder: "-" });
//    $("#txtTelefono").mask("99999999?99999", { placeholder: "-" });

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["ID"] != "" && GET["ID"] != null) {
        $("#afiliadoId").val(GET["ID"]);
        CargarPacienteID(GET["ID"]);
    }
});


$("#txt_dni").change(function () {
    Cargar_Paciente_Documento($("#txt_dni").val());
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

function errores(msg) {
    Impreso = 0;
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
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
            $("#btnBuscar").show();
            $("#btnCancelarPedidoTurno").show();
            $("#desdeaqui").show();
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
            $("#CargadoLocalidad").html(paciente.localidad);

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
    $('#fotopaciente').attr('src', '../fotoPerfil/' + Paciente.Foto);
    $('#fotopaciente').error(function () {
        $(this).attr('src', '../img/silueta.jpg');
    });
}


function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
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


function Cargar_Paciente_NHC_Cargado(Resultado) {
   
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {
        //        if (paciente.Vencido) {
        //            alert("Paciente dado de baja el día: " + paciente.FechaVencido);
        //            $("#desdeaqui").hide();
        //            return false;
        //        }

        $("#btnBuscar").show();
        $("#btnCancelarPedidoTurno").show();
        $("#desdeaqui").show();
        $("#afiliadoId").val(paciente.documento);
        $("#txtnroturno").prop("readonly", true);

        $("#afiliadoId").val(paciente.documento);

        $("#btnOtorgados").css('display', 'inline');
        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txt_dni").attr('value', paciente.documento_real);
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
        $("#CargadoLocalidad").html(paciente.localidad);

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

        $('#fotopaciente').error(function () {
            $(this).attr('src', '../img/silueta.jpg');
        });
        //silueta
    });

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
    document.location = "../Odontologia/Presupuesto_Odontologia.aspx" + url;
}


function CargarPacienteID(ID) {

    $.ajax({
        type: "POST",
        url: "../Json/Entrega_De_Resultados/Resultados_Entrega.asmx/CargarPacienteID_Entrega_De_Resultados", ////////////////////>>>>>>>>>>>>>>>>>>>>>>>>>>
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_NHC_Cargado,
        error: errores
    });
}

$("#btnCancelarPedidoTurno").click(function () { document.location = "../Odontologia/Presupuesto_Odontologia.aspx"; });

$("#desdeaqui").click(function () { traerProximoPresupuesto(); });

function traerProximoPresupuesto() {
    $.ajax({
        type: "POST",
        url: "../Json/Odontologia.asmx/PresupuestoOdontologiaProximoNumero",
        //data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            if (Resultado.d <= 0) {
                alert("Ha ocurrido un error. Intentelo de nuevo.");
            }
            else {
                $("#CargadoPresupuesto").html(Resultado.d);
                $("#segundo").fadeIn(1500);
                $("#primero").hide();
            }
        },
        error: errores
    });
}

$("#btnBuscar").click(function (index, item) { document.location = "Buscar_Presupuesto_Odontologia.aspx?afiliadoId=" + $("#afiliadoId").val() + "&dni=" + $("#txt_dni").val() + "&nhc=" + $("#txtNHC").val() + "&nombre=" + $("#txtPaciente").val(); });


