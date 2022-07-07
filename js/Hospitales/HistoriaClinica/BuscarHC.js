
var Compras = 0;

$(document).ready(function () {
    ListTipoDoc();
    Cargar_Seccionales_Lista();
    //$('#txt_dni').focus();
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

    //$("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    //$("#txt_dni").mask("99999?999", { placeholder: "-" });
    $("#txtTelefono").mask("99999999?99999", { placeholder: "-" });
    if (GET["C"] != "" && GET["C"] != null) {
        //Compras = 1;
        Compras = GET["C"]; // manuel
    }


    if (GET["DNI"] != "" && GET["DNI"] != null) {
        Cargar_Paciente_Documento(GET["DNI"]);
    }


    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        Cargar_Paciente_NHC(NHC);
    }

    if (GET["ID"] != "" && GET["ID"] != null) {
        $("#afiliadoId").val(GET["ID"]);
        CargarPacienteID(GET["ID"]);
    }


});

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

$("#txtNHC").change(function () {
    if ($("#txtNHC").val().length > 0)
        Cargar_Paciente_NHC($("#txtNHC").val());
});


//Carga paciente por NHC al pulsar ENTER
$("#txtNHC").keypress(function (event) {
    if (event.which == 13) {
        if ($('#txtNHC').attr('readonly') == undefined) {
            Cargar_Paciente_NHC($("#txtNHC").val());
        }
    }
});

$("#btnCaratula").click(function () {
    Imprimir("../Impresiones/Imprimir_CaratulaHC.aspx?NHC=" + $("#afiliadoId").val());
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



function RecargarPagina(url) {
    document.location = "../HistoriaClinica/BuscarPacienteHC.aspx" + url;
}

function CambiarPagina(url) {
    //document.location = url + "&TurnoTelefonico=" + $("#cb_ttel").is(':checked');
    document.location = url; 
}

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
    var Tipo = $('#cbo_TipoDOC :selected').val();
    if (Tipo == undefined) Tipo = "DU";

 
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": Tipo });
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
            //$("#txtTelefono").focus();
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
    var PError = false;

    $.each(Paciente, function (index, paciente) {
        $("#btnactualizar").show();
        $("#btnCancelarPedidoTurno").show();
        //$("#btn_HC_detalle").show();
        $("#btnCaratula").show();
        $("#desdeaqui").show();
        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#btnOtorgados").css('display', 'inline');
        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txt_dni").attr('value', paciente.documento_real);
        $("#txtNHC").attr('value', paciente.NHC_UOM);
        $("#txtTelefono").attr('value', paciente.Telefono);
        $("#afiliadoId").val(paciente.documento);
        $("#txtPaciente").focus();

        $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);



        if ($("#txtTelefono").val().length < 5) {
            $("#controlTelefono").addClass("error");
            // $("#txtTelefono").focus();
            PError = true;
        }


        if (paciente.Nro_Seccional == "999") {
            $("#controlSeccional").addClass("error");
            PError = true;
        }



        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
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

        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');

        if (PError) {
            //$("#desdeaqui").hide();
            $("#btn_HC_detalle").hide();
        }
        else {
            $("#desdeaqui").show();
            //$("#btn_HC_detalle").show();
        }
        $("#afiliadoCuil").val(paciente.cuil);
    });
}

$("#btn_HC_detalle").click(function () {
    //window.location.href = "../Impresiones/ImpresionesHCTotales.aspx?NHC=" + $("#txtNHC").val() + "&Diabetologia=true&Cirugia=true&Internacion=true&Neonatologia=true";
    Imprimir("../Impresiones/ImpresionesHCTotales.aspx?NHC=" + $("#afiliadoId").val() + "&Diabetologia=true&Cirugia=true&Internacion=true&Neonatologia=true");
    parent.document.getElementById("DondeEstoy").innerHTML = "Consultorio > <strong>Historia Clínica > Completa</strong>";
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


function Cargar_Paciente_Documento_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;
    if (Paciente.length == 1) {
        $.each(Paciente, function (index, paciente) {
            $("#btnactualizar").show();
            $("#btnCancelarPedidoTurno").show();
            $("#desdeaqui").show();
            //$("#btn_HC_detalle").show();
            $("#btnCaratula").show();
            $("#txt_dni").prop("readonly", true);
            $("#txtNHC").prop("readonly", true);

            $("#txtPaciente").focus();
            $("#txtPaciente").attr('value', paciente.Paciente);
            $("#txtNHC").attr('value', paciente.NHC_UOM);
            $("#txtTelefono").attr('value', paciente.Telefono);
            $("#cboSeccional option[value=" + paciente.Nro_Seccional + "]").attr("selected", true);

            $("#afiliadoId").val(paciente.documento);

            $("#btnOtorgados").css('display', 'inline');

            if ($("#txtTelefono").val().length < 5) {
                $("#controlTelefono").addClass("error");
                //$("#txtTelefono").focus();
                PError = true;
            }
            if (paciente.Nro_Seccional == 999) {
                $("#controlSeccional").addClass("error");
                PError = true;
            }


            $("#CargadoApellido").html(paciente.Paciente);

            $("#CargadoEdad").html(paciente.Edad_Format);
            $("#CargadoDNI").html(paciente.documento_real);
            $("#CargadoNHC").html(paciente.NHC_UOM);
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

            $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');

            if (PError) {
               // $("#desdeaqui").hide();
            }
            else {
                $("#desdeaqui").show();
                $("#desdeaqui").focus();
            }

        });
    } else if (Paciente.length > 1) {
        $("#txtdocumento").val($("#txt_dni").val());
        BuscarPacientes_fancy();
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


  $('#btnactualizar').click(function () {
        Actualizar_Telefono_Seccional($('#txtTelefono').val(), $('#cboSeccional option:selected').val(), $('#txt_dni').val());
    });

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
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


    $("#btnBuscarPaciente").fancybox({
        'hideOnContentClick': true,
        'width': '75%',
        'height': '75%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe'
    });









