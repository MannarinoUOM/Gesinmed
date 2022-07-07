var idCarga = 0; // id de la carga que se trata 
var save = 1; //comprueba si se esta guardando para evitar multiples clicks
var bPreguntar = false; // para comprobar si se debe preguntar por perdida de datos al salir de l apagina
var edita = 0;
var idsAdecuacion = [];
var adecuacionMuestra = [];
var idsHallazgos = [];
var HallazgosNoNeoplasicos = [];
var idsMicroorganismos = [];
var microorganismos = [];
var idsEscamosas = [];
var escamosas = [];
var protocolo = 0;
var internoExterno = 1;

parent.document.getElementById("DondeEstoy").innerHTML = "Patología > <strong>Carga PAP</strong>";

$(document).ready(function () {
    //cargarCombo("cboMuestraAdecuacion", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 1 });
    cargarCombo("cboCategoriaGeneral", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 2 });
    cargarCombo("cboFlora", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 3 });
    //cargarCombo("cboMicroorganismos", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 4 });
    //cargarCombo("cboHallazgos", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 5 });
    //cargarCombo("cboCelulasEscamosas", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 6 });
    cargarCombo("cboCelulasGlandulares", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 7 });
    cargarCombo("cboValoracionHormonal", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 8 }); ;
    cargarCombo("cboSalaPeriferica", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/TraerServiciosCentAnatomiaPatologica", 1, '');
    cargarCombo("cboDiagnosticador", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMedicosCentListado", 1, { "id": 0 });
    cargarCombo("cboMedicoCentral", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMedicosCentListado", 1, { "id": 0 });
    cargarCombo("cboMedicoExterno", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMedicosExtListado", 1, { "id": 0 });
    if (idCarga > 0)
        $("#btnInprimir").attr('disabled', false);
    else
        $("#btnInprimir").attr('disabled', true);
    

    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Seccionales_Listas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Seccionales = Resultado.d;
            $('#cboSeccionalChange').empty();
            $.each(Seccionales, function (index, seccionales) {

                $('#cboSeccionalChange').append(
              $('<option></option>').val(seccionales.Nro).html(seccionales.Seccional)
            );
            });
        },
        error: errores
    });
});


//function retorno() {
//    cargarCombo(control, "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/" + recargar, 1, { "tipo": 0, "busqueda": "" });
//    if (idsTecnicas.length == 0) {
//        $("#chkTecnicasEspeciales").attr('checked', false);
//        $("#btnModificarTecnicasEspeciales").attr('disabled', true);
//    }
//    if (idsTecnicas.length > 0) { $("#TeCantidad").val(idsTecnicas.length); } else { $("#TeCantidad").val(""); }

//    if (idsTecnicas.length == 0) {
//        $("#txtTecnicasEspeciales").val("");
//    }
//    if (idsDiagnosticos.length == 0) {
//        $("#txtCodigoDiagnostico").val("");
//    }
//}
function reSeleccionar() {
//    switch (recargar) {
//        case "PatoMetodosListado":
//            $("#cboMetodo").val(seleccionMetodo);
//            break;
//        case "PatoProcedimientosListado":
//            $("#cboProcedimiento").val(seleccionProcedimiento);
//            break;
//        case "PatoMaterialTopografiasListado":
//            $("#cboMaterial").val(seleccionMaterial);
//            break;
//        case "traerNomenclador":
//            $("#cboCodigoNN").val(seleccionNN); ;
//            break;
//    }
}

$("#btnGuardar").click(function () {
    // valida formato de fecha de salida correcto
    if (($("#txtFechaIngreso").val().toString().trim().length > 0) && !(validaFechaDDMMAAAA($("#txtFechaIngreso").val()))) {
        //alert("Ingrese una fecha de salida válida!.");
        $("#mensajes").html("INGRESE UNA FECHA DE SALIDA VÁLIDA!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        return false;
    }

    if (($("#txtFechaDiagnostico").val().toString().trim().length > 0) && !(validaFechaDDMMAAAA($("#txtFechaDiagnostico").val()))) {
        //alert("Ingrese una fecha de diagnóstico válida!.");
        $("#mensajes").html("INGRESE UNA FECHA DE DIAGNÓSTICO VÁLIDA!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        return false;
    }

    if (($("#txtFechaEntrega").val().toString().trim().length > 0) && !(validaFechaDDMMAAAA($("#txtFechaEntrega").val()))) {
        //alert("Ingrese una fecha de entrega válida!.");
        $("#mensajes").html("INGRESE UNA FECHA DE ENTREGA VÁLIDA!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        return false;
    }

    if (($("#txtFechaNotificacion").val().toString().trim().length > 0) && !(validaFechaDDMMAAAA($("#txtFechaNotificacion").val()))) {
        //alert("Ingrese una fecha de notificación válida!.");
        $("#mensajes").html("INGRESE UNA FECHA DE NOTIFICACIÓN VÁLIDA!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        return false;
    }

    //comprueba si se esta guardando para evitar multiples clicks
    if (save == 0) { return false; }
    save = 0;
    $(this).attr('disabled', true);

    // si no se pudo cargar el afiliado por er externo se pone en cero para no guardar el id de afiliado
    if (($("#afiliadoId").val()) == NaN)
        $("#afiliadoId").val(0)

    if ($("#txtProtocolo").val() == "") {
        //alert("Ingrese un Protocolo!");
        $("#mensajes").html("INGRESE UN PROTOCOLO!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        save = 1;
        $(this).attr('disabled', false);
        return false;
    }

    if (idCarga == 0) { comprobarExistenciaProtocolo($("#txtProtocolo").val(),2); } else { guardar(); }
});



function guardar() {
    var obj = {};
    obj.id = idCarga;
    obj.pacienteId = $("#afiliadoId").val();
    //obj.adecuacionMuestra = $("#cboMuestraAdecuacion").val();
    obj.adecuacionMuestra = idsAdecuacion.join(",");
    obj.categoriaGeneral = $("#cboCategoriaGeneral").val();
    obj.servicio = $("#cboSalaPeriferica").val();
    if ($("#txtFechaIngreso").val() == "") { obj.fechaIngreso = null; } else { obj.fechaIngreso = $("#txtFechaIngreso").val() };
    obj.protocolo = $("#txtProtocolo").val();
    obj.flora = $("#cboFlora").val();
    //obj.microorganismos = $("#cboMicroorganismos").val();
    obj.microorganismosIds = idsMicroorganismos.join(",");
    //obj.noNeoplasticos = $("#cboHallazgos").val();
    obj.noNeoplasticos = idsHallazgos.join(",");
    //obj.celulasEscamosas = $("#cboCelulasEscamosas").val();
    obj.celulasEscamosas = idsEscamosas.join(",");
    obj.celulasGladulares = $("#cboCelulasGlandulares").val();
    obj.ValoracionHormonal = $("#cboValoracionHormonal").val();
    obj.comentario = $("#txtComentario").val();
    obj.medicoInternoId = $("#cboMedicoCentral").val();
    obj.medicoExternoId = $("#cboMedicoExterno").val();

    if ($("#txtFechaDiagnostico").val() == "") { obj.fechaDiagnostico = null; } else { obj.fechaDiagnostico = $("#txtFechaDiagnostico").val();}
    if ($("#txtFechaEntrega").val() == ""){obj.fechaEntrega = null;} else { obj.fechaEntrega = $("#txtFechaEntrega").val();}
    if ($("#txtFechaNotificacion").val() == "") { obj.fechaNotificacion = null; } else { obj.fechaNotificacion = $("#txtFechaNotificacion").val(); }
//    obj.fechaDiagnostico = $("#txtFechaDiagnostico").val();
//    obj.fechaEntrega = $("#txtFechaEntrega").val();
//    obj.fechaNotificacion = $("#txtFechaNotificacion").val();
    obj.diagnosticador = $("#cboDiagnosticador").val();
  
    if (externo == 1) {
        obj.pacienteId = 0;
        obj.pacienteExterno = $("#txtPacienteExterno").val();
        obj.SeccionalExterna = $("#cboSeccional").val();
        obj.seccionalExternaName = $('#cboSeccional option:selected').html();
        obj.hcExterno = $("#txtNhcExterna").val();
    }
//    } else {
//    obj.pacienteExterno = null;
//        obj.SeccionalExterna = null;
//        obj.seccionalExternaName = null;
//        obj.hcExterno = null;
//    }
    
    var json = JSON.stringify({ "obj": obj });
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPGuardarEditar",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            idCarga = Resultado.d;
            if (idCarga > 0) {
                if (edita == 0) {
                    //alert("Guardado!");
                    $("#mensajes").html("GUARDADO!.");
                    $("#btnCancelarMensaje").hide();
                    $("#avisos").modal('show');
                } else {
                    //alert("Editado!"); 
                    $("#mensajes").html("EDITADO!.");
                    $("#btnCancelarMensaje").hide();
                    $("#avisos").modal('show');
                }
                // vuelva a habilitar la funcion del boton guardar
                $("#btnGuardar").attr('disabled', false);
                save = 1;
                bPreguntar = false;
                $("#btnInprimir").attr('disabled', false);
            } else { alert("No se pudo guardar!"); }
        },
        complete: function () {
            if (edita == 0)
                $("#btnAceptarMensaje").click(function () {
                    $("#btnVolver").click();
                });
        }
    });
}



$("#btnInprimir").click(function () {
    //alert(idCarga);
    if (idCarga > 0)
        imprimir("../Impresiones/Patologia/PAP_Estudio.aspx?id=" + idCarga + "&PDF=1", 0);
});

function comprobarExistenciaProtocolo(protocolo, tipo) {
    var json = JSON.stringify({ "protocolo": protocolo, "tipo": tipo });
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoVerificarExistenciaProtocolo",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function esta(Resultado) {
            var r = Resultado.d;
            if (r == 1) {
                //alert("El número de protocolo ingresado ya existe!");
                $("#mensajes").html("EL NÚMERO DE PROTOCOLO INGRESADO YA EXISTE!.");
                $("#btnCancelarMensaje").hide();
                $("#avisos").modal('show');
                $("#btnGuardar").attr('disabled', false);
                save = 1;
                return false;
            } else { guardar(); }
        }
    });
}


window.onbeforeunload = preguntarAntesDeSalir;

function preguntarAntesDeSalir() {
    if (bPreguntar)
        return "Los cambios realizados no se guardarán. ¿Desea continuar?";
}

$(".cambio").change(function () {
    bPreguntar = true;
});


$("#btnViejo").click(function () {
    imprimir("../AnatomiaPatologicaTrue/PAP_Viejas.aspx?idPaciente=" + $("#afiliadoId").val() + "&nombrePacienteExt=" + $("#CargadoApellido").html() +"&extInt=" + $("#externo").val() + "&PDF=1", 0);
});

$("#cboMuestraAdecuacion").click(function () {
    //alert("aca? " + idsAdecuacion);
    imprimir("../AnatomiaPatologicaTrue/adecuacionMuestra.aspx");
});

$("#cboMuestraAdecuacion").on('keydown', function () {
    return false;
});

$("#cboHallazgos").click(function () {
    //alert("aca? " + idsAdecuacion);
    imprimir("../AnatomiaPatologicaTrue/HallazgosNoNeoplasicos.aspx");
});

$("#cboHallazgos").on('keydown', function () {
    return false;
});

$("#cboCelulasEscamosas").click(function () {
    //alert("aca? " + idsAdecuacion);
    imprimir("../AnatomiaPatologicaTrue/celulasEscamosas.aspx");
});

$("#cboCelulasEscamosas").on('keydown', function () {
    return false;
});

$("#cboMicroorganismos").click(function () {
    //alert("aca? " + idsAdecuacion);
    imprimir("../AnatomiaPatologicaTrue/microorganismos.aspx");
});

$("#cboMicroorganismos").on('keydown', function () {
    return false;
});


$("#btnBorrar").click(function () {
    $("#mensajes").html("EL PROTOCOLO NÚMERO: <b>" + protocolo + "</b> SE ELIMINARÁ. </br>¿DESEA CONTINUAR?.");
    $("#btnCancelarMensaje").show();
    $("#avisos").modal('show');
    $("#btnAceptarMensaje").click(function () { eliminarProtocolo(); });
    $("#btnCancelarMensaje").click(function () { bPreguntar = false; });
});

function eliminarProtocolo() {
    var json = JSON.stringify({ "protocolo": protocolo });
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPBorrar",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        //        success: function (Resultado) {
        //        }
        complete: function () {

            $("#btnCancelarPedidoTurno").click();
        }
    });
}








$("#btnTraspaso").click(function () {
    $("#lblProtocoloReasignar").html("<b>" + protocolo + "</b>");
    $("#H2").html("<h3 style='text-aling:center'>Traspaso de Protocolo</h3>");
    $('#ModalTraspasoProtocolo2').modal('show');
 });

 $(function () {
     //   alert($(this).prop('checked'));
     $('#internoExterno2').change(function () {//EXTERNO PROBAR CUANDO SE QUIERE RE-ASIGNAR A EXTERNO
         if ($(this).prop('checked') == false) {
             $(".externo").fadeIn("slow");
             $(".interno").fadeOut("slow");
             internoExterno = 0;
             $("#txtNuevaNHC").val("");
         } else {//INTERNO
             $(".interno").fadeIn("slow");
             $(".externo").fadeOut("slow");
             internoExterno = 1;
             $("#NHCchange").val("");
             $("#pacienteChange").val("");
             $("#cboSeccionalChange").val(0);
         }
     });
 });

 function confirmarCambios() {

    var obj = {};
    obj.internoExterno = internoExterno;

    if (internoExterno == 1) {

        obj.nhc = $("#txtNuevaNHC").val();
        obj.seccionalId = 0;
        obj.seccionalName = "";
        obj.afiliadoname = "";
        obj.idEstudio = idCarga;
    }
    else {
        obj.nhc = $("#NHCchange").val();
        obj.seccionalId = $("#cboSeccionalChange").val();
        obj.seccionalName = $("#cboSeccionalChange option:selected").html();
        obj.afiliadoname = $("#pacienteChange").val();
        obj.idEstudio = idCarga;
    }

    // alert(obj.internoExterno + "/" + obj.nhc + "/" + obj.seccionalId + "/" + obj.seccionalName + "/" + obj.afiliadoname + "/" + obj.idEstudio);

    //return false;


    var json = JSON.stringify({ "obj": obj });
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PapReasignarProtocolo",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            var r = Resultado.d;
            if (r == -1) {
                //alert("Ha ocurrido un error!");
                $("#mensajes").html("HA OCURRIDO UN ERROR!.");
                $("#btnCancelarMensaje").hide();
                $("#avisos").modal('show');
            } else {
                cambiarEncabezado(r);
            }
        }
    });
}

function cambiarEncabezado(r) {
    if (r == 0) {

        $("#CargadoApellido").html($("#pacienteChange").val());
        $("#CargadoNHC").html($("#NHCchange").val());
        $("#CargadoNHC2").html($("#NHCchange").val());
        $("#CargadoSeccional").html($("#cboSeccionalChange :selected").text());
        $("#CargadoSeccional2").html($("#cboSeccionalChange :selected").text());
        $(".ocultar").hide();
        $(".derecha").addClass('pull-left');
    } else {
        traerPacienteInterno(r);
    }

}

function traerPacienteInterno(r) {
    var json = JSON.stringify({ "pacienteId": r });
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoTraerPacienteEncabezadoReasignado",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            var r = Resultado.d;
            //alert(r.edad + " / " + r.dni + " / " + r.pacienteInternoName + " / " + r.nhc + " / " + r.telefono + " / " + r.seccionalName);

            $("#CargadoEdad").html(r.edad);

            $("#CargadoDNI").html(r.dni);
            $("#CargadoApellido").html(r.pacienteInternoName);
            $("#CargadoNHC").html(r.nhc);

            $("#CargadoTelefono").html(r.telefono);
            $("#CargadoSeccional").html(r.seccionalName);
            $(".ocultar").show();
            $(".derecha").removeClass('pull-left');
            $("#afiliadoId").val(r.afiliadoId);
        }
    });
}