var idsTecnicas = []; // lista de ids de tecnicas seleccionadas o traidas de busqueda
var tecnicas = []; // lista de nombres de tecnicas seleccionadas o traidas de busqueda
var idsDiagnosticos = []; // lista de ids de diagnosticos seleccionadas o traidas de busqueda
var diagnosticos = []; // lista de nombres de diagnosticos seleccionadas o traidas de busqueda
var recargar = "";// se carga con el nombre del metodo usado para recargar los combos segun el caso
var control = "";// que control se recarga
var seleccionMaterial = 0;
var seleccionProcedimiento = 0;
var seleccionMetodo = 0;
var seleccionNN = 0;
var idCarga = 0;// id de la carga que se trata 
var save = 1; //comprueba si se esta guardando para evitar multiples clicks
var bPreguntar = false;// para comprobar si se debe preguntar por perdida de datos al salir de l apagina
var chekearCambios = [];
var edita = 0;
var listaCodigos = [];
var protocolo = 0;
var internoExterno = 1;
var informeComplmentario = "";
parent.document.getElementById("DondeEstoy").innerHTML = "Patología > <strong>Carga Estudio</strong>";

$(document).ready(function () {
    cargarCombo2("cboMaterial", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMaterialTopografiasListado", 1, { "tipo": 0, "busqueda": "" });
    cargarCombo2("cboProcedimiento", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoProcedimientosListado", 1, { "tipo": 0, "busqueda": "" });
    cargarCombo("cboMetodo", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMetodosListado", 1, { "tipo": 0, "busqueda": "" });

    cargarCombo("cboMedicoremitente", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMedicosCentListado", 1, { "id": 0 });
    cargarCombo("cboMedExt", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMedicosExtListado", 1, { "id": 0 });

    cargarCombo("cboServicio", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/TraerServiciosCentAnatomiaPatologica", 1, '');
    cargarCombo("cboServExt", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/TraerServiciosExtAnatomiaPatologica", 1, '');

    cargarCombo("cboDiagnosticado", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMedicosCentListado", 1, { "id": 0 });
    cargarCombo("cboCodigoNN", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/traerNomenclador", 1, { "tipo": 0, "busqueda": "" });
    cargarCombo("cboEspecialidad", "../Json/Autorizaciones/Autorizaciones.asmx/TraerEspecialidadesComboAnatomia", 1, { "id": 0 });
    

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

    //    $(".cambio").change(function () {
    //        alert();
    //        if (idCarga > 0)
    //            bPreguntar = true;
    //    });

    if (idCarga > 0)
        $("#btnInprimir").attr('disabled', false);
    else
        $("#btnInprimir").attr('disabled', true);
});
    $("#chkTecnicasEspeciales").click(function () {
          
    var q = false;
    if ($(this).is(':checked')) {
        q = false;
        $("#btnModificarTecnicasEspeciales").click();
    } else {
        q = true;
        idsTecnicas.length = 0;
        tecnicas.length = 0;
        $("#txtTecnicasEspeciales").val("");
        $("#TeCantidad").val("");
    }
    $("#btnModificarTecnicasEspeciales").attr('disabled', q);
});


$("#btnModificarTecnicasEspeciales").click(function () {
    if (!($("#chkTecnicasEspeciales").is(':checked')))
        return false;
    imprimir("../AnatomiaPatologicaTrue/tecnicasEspeciales.aspx",1);
});


$("#btnNuevoMetodo").click(function () {
    seleccionMetodo = $("#cboMetodo").val();
    imprimir("../AnatomiaPatologicaTrue/ABMS.aspx?titulo=Métodos&mostrar=0", 1);
    recargar = "PatoMetodosListado";
    control = "cboMetodo";
});

$("#btnNuevoProcedimiento").click(function () {
    seleccionProcedimiento = $("#cboProcedimiento").val();
    imprimir("../AnatomiaPatologicaTrue/ABMS.aspx?titulo=Procedimientos&mostrar=0", 1);
    recargar = "PatoProcedimientosListado";
    control = "cboProcedimiento";
});


$("#btnNuevoMaterial").click(function () {
    seleccionMaterial = $("#cboMaterial").val();
    imprimir("../AnatomiaPatologicaTrue/ABMS.aspx?titulo=Material&mostrar=0", 1);
    recargar = "PatoMaterialTopografiasListado";
    control = "cboMaterial";
});

$("#btnNuevoNN").click(function () {
    seleccionNN = $("#cboCodigoNN").val();
    imprimir("../AnatomiaPatologicaTrue/ABMS.aspx?titulo=Nomenclador&mostrar=0", 1);
    recargar = "traerNomenclador";
    control = "cboCodigoNN";
});

$("#btnNuevoDiagnostico").click(function () {
    //seleccionNN = $("#cboCodigoNN").val();
    imprimir("../AnatomiaPatologicaTrue/ABMS.aspx?titulo=Diagnósticos&mostrar=0", 1);
    //recargar = "traerNomenclador";
    //control = "cboCodigoNN";
});

function retorno() {
    if (recargar == "PatoMaterialTopografiasListado" || recargar == "PatoProcedimientosListado") {
        cargarCombo2(control, "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/" + recargar, 1, { "tipo": 0, "busqueda": "" });
    } else {
        cargarCombo(control, "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/" + recargar, 1, { "tipo": 0, "busqueda": "" });
    }
    if (idsTecnicas.length == 0) {
        $("#chkTecnicasEspeciales").attr('checked',false);
        $("#btnModificarTecnicasEspeciales").attr('disabled', true);
    }
    //alert(tecnicasSeparadas);
    if (idsTecnicas.length > 0) { $("#TeCantidad").val(idsTecnicas.length); } else { $("#TeCantidad").val(""); }
    //alert(idsTecnicas.length);
        if (idsTecnicas.length == 0) {
            $("#txtTecnicasEspeciales").val("");
        }
        //alert(idsDiagnosticos.length);
    if (idsDiagnosticos.length == 0) {
        $("#txtCodigoDiagnostico").val("");
    }
}

function reSeleccionar() {
    switch (recargar) {
        case "PatoMetodosListado":
            $("#cboMetodo").val(seleccionMetodo);
            break;
        case "PatoProcedimientosListado":
            $("#cboProcedimiento").val(seleccionProcedimiento);
            break;
        case "PatoMaterialTopografiasListado":
            $("#cboMaterial").val(seleccionMaterial);
            break;
        case "traerNomenclador":
            $("#cboCodigoNN").val(seleccionNN); ;
            break;
    }
}


$("#txtCodigoDiagnostico").click(function () {
    imprimir("../AnatomiaPatologicaTrue/Diagnosticos.aspx",1);
});

$("#btnGuardar").click(function () {
    if ($("#cboTestudio").val() == 0) {

        //alert("Seleccione Tipo de Estudio");
        $("#mensajes").html("SELECCIONE <b>TIPO DE ESTUDIO</b>");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');

        return false;
    }

    // valida formato de fecha de ingreso correcto
    //if (!(validaFechaDDMMAAAA($("#txtFechaSalida").val())) == false) { alert("Ingrese una fecha de ingreso válida"); return false; }

    // valida formato de fecha de salida correcto
    if (($("#txtFechaSalida").val().toString().trim().length > 0) && (validaFechaDDMMAAAA($("#txtFechaSalida").val())) == false) {
        //alert("Ingrese una fecha de salida válida!.");
        $("#mensajes").html("INGRESE UNA FECHA DE SALIDA VÁLIDA!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        return false;
    }

    if (edita == 1 && ($("#cboMaterial").val() == 0 || $("#cboServicio").val() == 0 || $("#cboCodigoNN").val() == 0)) {
        //alert("Falta cargar alguno de estos campos: Material, Servicio, Nomenclador"); 
        $("#mensajes").html("FALTA CARGAR ALGUNO DE ESTOS CAMPOS: <b>MATERIAL</b>, <b>SERVICIO</b>, <b>NOMENCLADOR</b>");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
    return false; }

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

    if (idCarga == 0) { comprobarExistenciaProtocolo($("#txtProtocolo").val(), 1); } else { guardar(); }
});


/////////////////////////////////////SALTO DE CARRO

//$("#txtComplementario").on('keyup', function (e) {
//    if (e.key == "Enter") {
//        informeComplmentario = $(this).val().replace(/\n/g, "<br />");
//        //alert(informeComplmentario);
//    } 
//});

///////////////////////////////////SALTO DE CARRO

function guardar() {
    var obj = {};
    obj.id = idCarga;
    obj.fechaInicio = $("#txtFechaIngreso").val();
    obj.materialId = $("#cboMaterial").val();
    obj.protocolo = $("#txtProtocolo").val();
    obj.hcExterno = $("#txtNhcExterna").val();
    obj.medicoExternoId = $("#cboMedExt").val();
    obj.servicioInternoId = $("#cboServicio").val();
    obj.procedimientoId = $("#cboProcedimiento").val();
    obj.metodoId = $("#cboMetodo").val();
    obj.macro = $("#txtMacroscopia").val();
    obj.micro = $("#txtMicroscopia").val();
    obj.diagnostico = $("#txtDiagnostico").val().replace(/\n/g, "<br />");
    obj.informeComplementario = $("#txtComplementario").val().replace(/\n/g, "<br />");
    obj.diagnosticosIds = idsDiagnosticos.join(",");
    obj.nomencladorId = $("#cboCodigoNN").val();

    if ($("#txtFechaSalida").val() == "") {obj.fechaSalida = null;} else { obj.fechaSalida = $("#txtFechaSalida").val();}
    
    if ($("#txtNumeroTacos").val() == "")
        obj.tacos = null;
    else
        obj.tacos = $("#txtNumeroTacos").val();

    if ($("#txtNumeroPreparados").val() == "")
        obj.preparados = null;
    else
        obj.preparados = $("#txtNumeroPreparados").val();

    if ($("#TeCantidad").val() == "")
        obj.tecEspCantidad = null;
    else
        obj.tecEspCantidad = $("#TeCantidad").val();

    if ($("#IHQcantidad").val() == "")
        obj.tecIhqCantidad = null;
    else
        obj.tecIhqCantidad = $("#IHQcantidad").val();

    if ($("#chkReceptores").is(':checked'))
        obj.receptoresHormonales = 'S'
    else
        obj.receptoresHormonales = 'N'

    obj.pacienteExterno = $("#txtPacienteExterno").val();
    obj.afiliadoId = parseInt($("#afiliadoId").val());
    obj.servicioExternoId = $("#cboServExt").val();
    obj.medicoInternoId = $("#cboMedicoremitente").val();
    obj.especialidadId = $("#cboEspecialidad").val();
    if ($("#chkPlaca").is(':checked'))
        obj.placa = 'S'
    else
        obj.placa = 'N'

    obj.diagnosticador = $("#cboDiagnosticado").val();

    if (idsTecnicas.length > 0)
        obj.tecnicasEspecialesIds = idsTecnicas.join(",");
    else
        obj.tecnicasEspecialesIds = "";

    obj.tipoEstudioId = $("#cboTestudio").val();

    if (externo == 1) {
        obj.seccionalExternaId = $("#cboSeccional").val();
        obj.seccionalExterna = $('#cboSeccional option:selected').html();
    } else {
        obj.seccionalExternaId = null;
        obj.seccionalExterna = null;
    }

    var json = JSON.stringify({ "obj": obj });
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoGuardarEditar",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) {
            idCarga = Resultado.d;

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
            $("#btnImprimir").attr('disabled', false);
        },
        complete: function () {
            if (edita == 0) {
                $("#btnAceptarMensaje").click(function () {
                    $("#btnVolver").click();
                });
            }

        }

    });
}



$("#btnImprimir").click(function () {
    //alert(idCarga);
    if(idCarga > 0)
    imprimir("../Impresiones/Patologia/Patologia_Estudio.aspx?id=" + idCarga + "&PDF=1", 0);
});

function comprobarExistenciaProtocolo(protocolo) {
    var json = JSON.stringify({ "protocolo": protocolo , "tipo": 1 });
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


//$(window).bind("beforeunload", function (event) {
//    //if (hasChanged) return "You have unsaved changes";
//    alert(bPreguntar);
//    if (bPreguntar) {
//        $("#mensajes").html("LOS CAMBIOS REALIZADOS NO SE GUARDARÁN. ¿DESEA CONTINUAR?.");
//        $("#btnCancelarMensaje").show();
//        $("#avisos").modal('show');
//        $("#btnAceptarMensaje").click(function () { return true; });
//        $("#btnCancelarMensaje").click(function () { return false; });
//    }
//    //$(this).preventDefault();
//});


//$('a').on('mousedown',function (e) {
//    if (bPreguntar) {
//                $("#mensajes").html("LOS CAMBIOS REALIZADOS NO SE GUARDARÁN. ¿DESEA CONTINUAR?.");
//                $("#btnCancelarMensaje").show();
//                $("#avisos").modal('show');
//                $("#btnAceptarMensaje").click(function () { return true; });
//                $("#btnCancelarMensaje").click(function () { return false; });
//    }
//});

window.onbeforeunload = preguntarAntesDeSalir;

function preguntarAntesDeSalir(event) {
    //var respuesta = false;
    if (bPreguntar)
        return "Los cambios realizados no se guardarán. ¿Desea continuar?";
//    $("#mensajes").html("LOS CAMBIOS REALIZADOS NO SE GUARDARÁN. ¿DESEA CONTINUAR?.");
//    $("#btnCancelarMensaje").show();
//    $("#avisos").modal('show');
//return function(){
//    $("#btnAceptarMensaje").click(function () { bPreguntar = true; });
//    $("#btnCancelarMensaje").click(function () { bPreguntar = false; });
//}
    //return bPreguntar;

   //event.preventDefault();
//    if (bPreguntar) {
//        $("#mensajes").html("LOS CAMBIOS REALIZADOS NO SE GUARDARÁN. ¿DESEA CONTINUAR?.");
//        $("#btnCancelarMensaje").show();
//        $("#avisos").modal('show');
//        $("#btnAceptarMensaje").click(function () { return false; });
//        $("#btnCancelarMensaje").click(function () { return true; });
//    }
//    return true;
}



$(".cambio").change(function () {
    bPreguntar = true;
});


//$("img").click(function () {
//    alert("hola");
//});


$("#txtMaterialCod").on('keyup', function () {
    var encontro = 0;
    if ($(this).val().trim().length >= 4) {
        $("#cboMaterial option").each(function () {
            if ($("#txtMaterialCod").val() == $(this).attr('name')) { $("#cboMaterial").val($(this).attr('value')); encontro = 1; } 
        });
    }
    if(encontro == 0)
    $("#cboMaterial").val(0);
});

$("#txtProcedimientoCod").on('keyup', function () {
    var encontro = 0;
    if ($(this).val().trim().length >= 4) {
        $("#cboProcedimiento option").each(function () {
            if ($("#txtProcedimientoCod").val() == $(this).attr('name')) { $("#cboProcedimiento").val($(this).attr('value')); encontro = 1; }
        });
    }
    if (encontro == 0)
        $("#cboProcedimiento").val(0);
});


$("#txtMetodoCod").on('keyup', function () {

    //    var encontro = 0;
    //    //if ($(this).val().trim().length >= 4) {
    ////        $("#cboMetodo option").each(function () {
    ////            if ($("#txtMetodoCod").val() == $(this).attr('name')) { $("#cboMetodo").val($(this).attr('value')); encontro = 1; }
    ////        });
    //    //}
    //    if (encontro == 0)
    //        $("#cboMetodo").val(0);
    $("#cboMetodo").val($(this).val());

});

$("#cboMaterial").change(function () {
    $("#txtMaterialCod").val($( "#cboMaterial option:selected" ).attr('name'));
});

$("#cboProcedimiento").change(function () {
    $("#txtProcedimientoCod").val($("#cboProcedimiento option:selected").attr('name'));
});

$("#cboMetodo").change(function () {
    $("#txtMetodoCod").val($("#cboMetodo option:selected").attr('name'));
});

function cargarCombo2(control, url, seleccione, datos) {
    $("#" + control).empty();
    if (datos != '') {
        var json = JSON.stringify(datos);
        $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json; charset=utf-8",
            data: json,
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                if (seleccione == 1) { $("#" + control).append(new Option("Seleccione", 0)); }

                $.each(lista, function (index, item) {
                    //$("#" + control).append(new Option(item.descripcion, item.id));
                    $("#" + control).append("<option value=" + item.id + " name=" + item.codigo + ">" + item.descripcion + "</option>");
//                    var obj = {};
//                    obj.codigo = item;
//                    obj.id = item.id;

//                    listaCodigos.push(obj);
                });
            },
            complete: reSeleccionar
        });
    }
}

$("#btnTraspaso").click(function () {
    $("#lblProtocoloReasignar").html("<b>" + protocolo + "</b>");
    $("#H2").html("<h3 style='text-aling:center'>Traspaso de Protocolo</h3>");
    $('#ModalTraspasoProtocolo').modal('show');
});

$(function () {
    $('#internoExterno').change(function () {//EXTERNO
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
//          var s = true;
//          switch (internoExterno) {
//              case 1:
//                  if ($("#txtNuevaNHC").val().trim().length <= 0) 
//                      s = false;
//                  break;

//              case 0:
//                  if ($("#NHCchange").val().trim().length <= 0)
//                      s = false;

//                  if ($("#pacienteChange").val().trim().length <= 0)
//                      s = false;
//                  break;
//          }

//          if (!s)
//              alert("Falta ingresar datos");
//          return false;

    var obj = {};
    obj.internoExterno = internoExterno;

    if(internoExterno == 1){
    obj.nhc = $("#txtNuevaNHC").val();
    obj.seccionalId = 0;
    obj.seccionalName = "";
    obj.afiliadoname = "";
    obj.idEstudio = idCarga;}
    else{
    obj.nhc = $("#NHCchange").val();
    obj.seccionalId = $("#cboSeccionalChange").val();
    obj.seccionalName = $("#cboSeccionalChange option:selected").html();
    obj.afiliadoname = $("#pacienteChange").val();
    obj.idEstudio = idCarga;}

   // alert(obj.internoExterno + "/" + obj.nhc + "/" + obj.seccionalId + "/" + obj.seccionalName + "/" + obj.afiliadoname + "/" + obj.idEstudio);

    //return false;
    

    var json = JSON.stringify({ "obj": obj });
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoReasignarProtocolo",
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
            $("#fotopaciente").attr('src', '../fotoPerfil/' + r.foto);
        }
    });
}


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
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PATOBorrar",
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