var controles = ["txtDesdeSalidaS", "txtHastaSalidaS", "txtPacienteS", "txtDniS", "txtNhc", "txtSeccionalS" , "txtPacienteExternoS",
    "txtNhcExternaS", "chkConPlacaS", "cboTipoEstudioS", "cboMedicoCentralS", "cboServicioS", "cboEspecialidadS","cboMedicoExtS","cboServicioExts" , "cboCodigoDiagnosticoS",
    "cboMaterialS", "cboProcedimientoS", "cboMetodosS", "txtProtocoloS", "cboDiagnosticadoS", "cboTecnicasEspecialesS", "txtCodigoNNS"];
    //array de clases de columnas para poder ocultarlas o mostrarlas segun la busqueda

var oTabla; // variable tabla para la configuracion en el metodo LoadDataTable()
var buscar = 1;// para comprobar si ya se esta ejecutando el proceso de busqueda y no se pise con uno nuevo
var comprobar = [];// se utiliza para comprobar si hay almenos un filtro cargado para realizar la busqueda de estudio
var estudioComprobador = {
cboMaterial: 0
};  // se utilizar para comprobar si se modifico algun dato de un estudio ya cargado
var imprime = 0;
var lista = [];

LoadDataTable();// metodo para configurar la tabla de busqueda

$(document).ready(function () {
    cargarCombo("txtSeccionalS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/Seccionales_Listar", 1, { "tipo": 0, "busqueda": "" });
    cargarCombo("cboMaterialS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMaterialTopografiasListado", 1, { "tipo": 0, "busqueda": "" });
    //cargarCombo("cboProcedimientoS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoProcedimientosListado", 1, { "tipo": 0, "busqueda": "" });
    //cargarCombo("cboMetodosS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMetodosListado", 1, { "tipo": 0, "busqueda": "" });

    cargarCombo("cboMedicoCentralS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMedicosCentListado", 1, { "id": 0 });
    cargarCombo("cboMedicoExtS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMedicosExtListado", 1, { "id": 0 });

    cargarCombo("cboServicioS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/TraerServiciosCentAnatomiaPatologica", 1, '');
    cargarCombo("cboServicioExts", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/TraerServiciosExtAnatomiaPatologica", 1, '');

    //cargarCombo("cboDiagnosticadoS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMedicosCentListado", 1, { "id": 0 });
    //cargarCombo("txtCodigoNNS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/traerNomenclador", 1, { "tipo": 0, "busqueda": "" });
    //cargarCombo("cboEspecialidadS", "../Json/Autorizaciones/Autorizaciones.asmx/TraerEspecialidadesComboAnatomia", 1, { "id": 0 });

    //cargarCombo("cboTecnicasEspecialesS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/traerTecnicas", 1, { "tipo": 0, "busqueda": "" });
    cargarCombo("cboCodigoDiagnosticoS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/TraerDiagnosticosComboAnatomia", 1, { "id": 0, "cuantos": 1 });
    $('.no-footer').css("width", "100%");
    $('.dataTables_scrollHeadInner').css("width", "100%");
    $("#btnImprimirS").attr('disabled', true);
});

$("#btnBuscarS").click(function () {

    // vacio el array para iniciar una nueva comprovacion para saber si hay algun filtro de busqueda ingresado
    comprobar.length = 0;
    // recorre la clase requerido y los va agregando al array de comprovacion si no se cargo algun filtro de busqueda
    $(".requerido").each(function (index, item) {
        switch ($(this).prop("tagName")) {
            case "INPUT":
                if ($(this).val().trim().length <= 0) {
                    comprobar.push(1);
                }
                break;

            case "SELECT":
                if ($(this).val() == 0) {
                    comprobar.push(1);
                }
                break;
        }
    });
    //si estan los 24 filtros vacios cancelo la busqueda
    if (comprobar.length == 16) {
        //alert("Ingrese algún filtro para buscar.");
        $("#mensajes").html("INGRESE ALGÚN FILTRO PARA BUSCAR.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        return false;
    }

    if (($("#txtDesdeIngresoS").val().toString().trim().length > 0) && (validaFechaDDMMAAAA($("#txtDesdeIngresoS").val())) == false) {
        //alert("Ingrese una fecha de ingreso válida!.");
        $("#mensajes").html("INGRESE UNA <b>FECHA DE INGRESO VÁLIDA</b>.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        return false;
    }

    if (($("#txtHastaIngresoS").val().toString().trim().length > 0) && (validaFechaDDMMAAAA($("#txtHastaIngresoS").val())) == false) {
        //alert("Ingrese una fecha de ingreso válida!.");
        $("#mensajes").html("INGRESE UNA <b>FECHA DE INGRESO VÁLIDA</b>.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        return false;
    }

    //comprueba que se este buscando y no se pise la busqueda
    if (buscar == 0) { return false; }
    buscar = 0;
    $(this).attr('disabled', true);


    lista.length = 0;
    $("#sinResultados").hide();

    // armo el objeto de busqueda
    var datos = {};
    datos.desdeIng = $("#txtDesdeIngresoS").val();
    datos.hastaIng = $("#txtHastaIngresoS").val();
    //datos.desdeSal = $("#txtDesdeSalidaS").val();
    //datos.hastaSal = $("#txtHastaSalidaS").val();
    datos.paciente = $("#txtPacienteS").val();
    datos.dni = $("#txtDniS").val();
    datos.hc = $("#txtNhc").val();
    datos.seccional = $("#txtSeccionalS").val();
    datos.tipoEstudio = $("#cboTipoEstudioS").val();
    datos.medicoCentral = $("#cboMedicoCentralS").val();
    datos.servicio = $("#cboServicioS").val();
    //datos.especialidad = $("#cboEspecialidadS").val();
    datos.medicoExt = $("#cboMedicoExtS").val();
    datos.servicioExt = $("#cboServicioExts").val();
    datos.cDiagnostico = $("#cboCodigoDiagnosticoS").val();
    datos.material = $("#cboMaterialS").val();
    //datos.procedimiento = $("#cboProcedimientoS").val();
    //datos.metodo = $("#cboMetodosS").val();

    if ($("#txtProtocoloS").val() == "")
        datos.protocolo = 0;
    else
        datos.protocolo = $("#txtProtocoloS").val();

    //datos.diagnosticador = $("#cboDiagnosticadoS").val();
    //datos.tEspeciales = $("#cboTecnicasEspecialesS").val();
    //datos.NN = $("#txtCodigoNNS").val();

    //if ($("#chkConPlacaS").is(":checked"))
    //   datos.placa = '1'
    //else
    //   datos.placa = '0'

    datos.pacienteExterno = $("#txtPacienteExternoS").val();
    datos.nhcExterno = $("#txtNhcExternaS").val();
    // llamda al metodo de busqueda
    var json = JSON.stringify({ "b": datos });
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/buscarEstudios",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) { lista = Resultado.d; cargarLista(lista); },
        beforeSend: function () {
            //resetea el contador del resultado de la busqueda
            $("#cantidadBusqueda").val(0);
            $("#tablaResultados").hide();
            // oculta el encabezado de la tabla
            $('.dataTables_scrollBody').hide();
            $('.sorting_asc').hide();
            $('.sorting').hide();
            $("#cargando").show();

        },
        complete: function () {

            if (lista.length <= 0) {
                $("#sinResultados").show();
                buscar = 1;
                $("#btnBuscarS").attr('disabled', false);
            }
           
                // muestra el encabezado de la tabla
                $('.dataTables_scrollBody').show();
                $('.sorting').show();
                $('.sorting_asc').show();
                //comprueba que columnas oculta y cuales no
                MostrarOcultar();
                $("#tablaResultados").DataTable();
                //auto click para acomodar los titulos
                $('.sorting').click();
                $(".sorting_asc").click();
                $(".sorting_desc").click();
                //permite realizar una nueva busqueda
                buscar = 1;
                $("#btnBuscarS").attr('disabled', false);
                imprime = 1;
                $("#btnImprimirS").attr('disabled', false);
            

        }
    });
});


function cargarLista(lista) {
    $("#tablaResultados").empty();
    var Encabezado = "";
    var Contenido = "";
    $.each(lista, function (index, item) {
        var paciente = "";
        var estudioT = "";
        // alert(item.pendiente);
        if (item.externo == 1) { paciente = item.pacienteExterno; } else { if (item.pacienteInterno == null) { paciente = "BUSCAR PACIENTE EN EL ANTERIOR SISTEMA DE GESTION"; } else { paciente = item.pacienteInterno; } }
        if (item.tipoEstudio != null) { if (item.pendiente == 1) { estudioT = "Pendiente"; } else { estudioT = item.tipoEstudio; } }
        else { if (item.pendiente == 1) { estudioT = "Pendiente"; } }
        // columnas fijas
        Contenido = Contenido + "<tr style='height:20px; cursor:default' id='" + item.id + ";overflow:scroll; width:auto'>" +
           "<td style='width:1%;cursor:pointer'>" +
           "<td style='cursor:pointer' onclick='seleccionar(" + item.id + ")'>" + item.fechaInicio + "</div></td>" +
           "<td style='cursor:pointer' onclick='seleccionar(" + item.id + ")'>" + paciente + "</div></td>" +
           "<td style='cursor:pointer' onclick='seleccionar(" + item.id + ")'>" + item.protocolo + "</div></td>" +

        //columnas variables
           "<td style='cursor:pointer; display:none' class='txtDesdeSalidaS' onclick='seleccionar(" + item.id + ")'>" + item.fechaSalida + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='txtDniS' onclick='seleccionar(" + item.id + ")'>" + item.documentoInterno + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='txtNhc' onclick='seleccionar(" + item.id + ")'>" + item.hcInterno + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='txtSeccionalS' onclick='seleccionar(" + item.id + ")'>" + item.seccionalInterno + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='txtNhcExterna' onclick='seleccionar(" + item.id + ")'>" + item.hcExterno + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='txtPacienteExterno' onclick='seleccionar(" + item.id + ")'>" + item.pacienteExterno + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboTipoEstudioS' onclick='seleccionar(" + item.id + ")'>" + estudioT + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboMedicoCentralS' onclick='seleccionar(" + item.id + ")'>" + item.medicoInterno + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboServicioS' onclick='seleccionar(" + item.id + ")'>" + item.servicioInterno + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboEspecialidadS' onclick='seleccionar(" + item.id + ")'>" + item.especialidad + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboMedicoExtS' onclick='seleccionar(" + item.id + ")'>" + item.medicoExterno + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboServicioExts' onclick='seleccionar(" + item.id + ")'>" + item.servicioExterno + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboCodigoDiagnosticoS' onclick='seleccionar(" + item.id + ")'>" + item.diagnosticos + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboMaterialS' onclick='seleccionar(" + item.id + ")'>" + item.material + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboProcedimientoS' onclick='seleccionar(" + item.id + ")'>" + item.procedimiento + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboMetodosS' onclick='seleccionar(" + item.id + ")'>" + item.metodo + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='txtProtocoloS' onclick='seleccionar(" + item.id + ")'>" + item.protocolo + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboTecnicasEspecialesS' onclick='seleccionar(" + item.id + ")'>" + item.tecnicasEspeciales + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='txtCodigoNNS' onclick='seleccionar(" + item.id + ")'>" + item.nomenclador + "</div></td>";

    });
    var Pie = "</tbody></table>";
    $("#tablaResultados").html(Contenido + Pie);
    $("#cantidadBusqueda").val(lista.length);




}

function MostrarOcultar() {
    //recorre el array controles y comprueba si los filtros con esas clases fueron utilizados en la busqueda para habillitar las columnas
    for (var i = 0; i < controles.length; i++) {
        switch ($("#" + controles[i]).prop("tagName")) {
            case "INPUT":
                if ($("#" + controles[i]).val().trim().length > 0) {
                    $("." + controles[i]).css('display', 'table-cell');
                    var table = $('#tablaResultados').DataTable();
                    table.column("." + controles[i]).visible(true);
                    //table.columns.adjust().draw(true);
                } else {
                    var table = $('#tablaResultados').DataTable();
                    if (table.column("." + controles[i]).visible() == true) { table.column("." + controles[i]).visible(false);}
                    //table.columns.adjust().draw(true);
                }
                break;
            case "SELECT":
                if ($("#" + controles[i]).val() > 0) {
                    $("." + controles[i]).css('display', 'table-cell');
                    var table = $('#tablaResultados').DataTable();
                    table.column("." + controles[i]).visible(true);
                    //table.columns.adjust().draw(true);
                } else {
                    var table = $('#tablaResultados').DataTable();
                    if (table.column("." + controles[i]).visible() == true) { table.column("." + controles[i]).visible(false); }
                    //table.columns.adjust().draw(true);
                }
                break;
        }
    }

    $("#tablaResultados").show();
    $("#cargando").hide();
    
}

// metodo de configuracion de la tabla de busqueda
function LoadDataTable() {
    oTabla = $('#tablaResultados').DataTable({
        "bAutoWidth": false,
        "bPaginate": false,
        "bFilter": false,
        "bInfo": false,
        "sScrollY": "350px",
        "sScrollX": "100%",
        "sScrollXInner": "400%",
        "sScrollYInner": "100%",
        "bScrollCollapse": true,
//        fixedHeader: {
//            header: true,
//            footer: false
//        },
        "columnDefs": [{ "visible": false, "targets": [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]}],
        "aaSorting": [],
        "language": {
            "zeroRecords": "No se encontró ningún resultado"
        }
    });
}


// trae y carga los datos del estudio que se selecciono de la busqueda 
function seleccionar(id) {
    var r = true;
   
    //comprueba si hay modificaciones en una carga nueva para avisar que se perderan los valores
        //if (preguntarAntesDeSalir())
    // r = confirm("Los cambios realizados no se guardarán. ¿Desea continuar?");

    if (bPreguntar) {
        $("#mensajes").html("LOS CAMBIOS REALIZADOS NO SE GUARDARÁN. ¿DESEA CONTINUAR?.");
        $("#btnCancelarMensaje").show();
        $("#avisos").modal('show');
        $("#btnAceptarMensaje").click(function () { r = true; avanzar(r, id); });
        $("#btnCancelarMensaje").click(function () { r = false; avanzar(r, id); });
    } else {
        avanzar(r, id);
    }
}
//////////////////////////////////////////////////////////////////


function avanzar(r, id) {
    if (!r)
        return false;
    else
    // arregla el encabezado del paciente en caso de que sea externo
        if (externo == 0) {
            $("#hastaaqui").fadeIn(1500);
            $("#primero").hide();
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 100 }, 600);
            $('.container').height($('html').height() + ($('#autorizaciones').height() -
        				$('.pie').height() -
        				$('#autorizaciones').height()));

            $("#derivaciones").height(752);
            $(".ocultar").show();
            $(".derecha").removeClass('pull-left');
        } else {
            $("#hastaaqui").fadeIn(1500);
            $("#primero").hide();
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top - 100 }, 600);
            $('.container').height($('html').height() + ($('#autorizaciones').height() -
        				$('.pie').height() -
        				$('#autorizaciones').height()));

            $("#derivaciones").height(752);

            $("#CargadoApellido").html($("#txtPacienteExterno").val());
            $("#CargadoApellido").html($("#txtPacienteExterno").val());

            $("#CargadoNHC").html($("#txtNhcExterna").val());
            $("#CargadoNHC2").html($("#txtNhcExterna").val());

            $("#CargadoSeccional").html($("#cboSeccional :selected").text());
            $("#CargadoSeccional2").html($("#cboSeccional :selected").text());
            $(".ocultar").hide();
            $(".derecha").addClass('pull-left');
        }

    var json = JSON.stringify({ "id": id });

    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoTraerCargaPorId",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) { cargarEstudio(Resultado.d); },
        complete: function () { $(".carousel-control").click(); $("#btnImprimir").attr('disabled', false); edita = 1; $("#btnGuardar").html("<i class=' icon-ok icon-white'></i>&nbsp;Guardar Edición"); }
    });
}
// carga la pantalla de carga con los datos del estudio seleccionado
function cargarEstudio(estudio) {
    idCarga = estudio.id;
    $("#estudioId").val(idCarga);
    $("#externo").val(estudio.externo);
    idsTecnicas.length = 0;
    tecnicas.length = 0;
    idsDiagnosticos.length = 0;
    diagnosticos.length = 0;
    var str = "";
    var str2 = "";

    if (estudio.diagnosticosIds != null)
        var str = estudio.diagnosticosIds;

    if (str != "") {
        if (str != null)
            idsDiagnosticos = str.split(',').map(Number);
    } //Output: [1,2,3]
    //estudioComprobador.idsDiagnosticos = idsDiagnosticos;

    if (estudio.tecnicasEspecialesIds != null)
        var str2 = estudio.tecnicasEspecialesIds;

    if (str2 != "") {
        if (str2 != null)
            idsTecnicas = str2.split(',').map(Number);
    } //Output: [1,2,3]
    //estudioComprobador.idsTecnicas = idsTecnicas;

    tecnicas.push(estudio.tecnicasEspeciales);
    diagnosticos.push(estudio.diagnostico);
    // alert(estudio.diagnostico);
    if (estudio.tecnicasEspeciales != "") {
        $("#chkTecnicasEspeciales").attr('checked', true);
        $("#btnModificarTecnicasEspeciales").attr('disabled', false);
    }

    $("#cboMaterial").val(estudio.materialId);
    //estudioComprobador.cboMaterial = estudio.materialId;
    $("#txtFechaIngreso").val(estudio.fechaInicio);
    //estudioComprobador.txtFechaIngreso = estudio.fechaInicio;
    $("#txtFechaSalida").val(estudio.fechaSalida);
    //estudioComprobador.txtFechaSalida = estudio.fechaSalida;

    //segun interno externo carga el encabezado
    if (estudio.externo == 0) {
        //alert(estudio.afiliadoId);

        CargarPacienteID(estudio.afiliadoId);
        //    $("#CargadoApellido").html(estudio.pacienteInterno);
        //    $("#CargadoSeccional").html(estudio.seccionalInterno);
        //    $("#CargadoDNI").html(estudio.documentoInterno);
        //    $("#CargadoNHC").html(estudio.hcInterno);
        //    $("#CargadoTelefono").html(estudio.telefono);
        $(".ocultar").show();
        $(".derecha").removeClass('pull-left');

        //    $("#txtPaciente").attr('value', estudio.pacienteInterno);
        //    $("#txtNHC").attr('value', estudio.hcInterno);
        //    $("#txtTelefono").attr('value', estudio.telefono);
        //    $("#cboSeccional option[value=" + estudio.seccionalInternoId + "]").attr("selected", true);
        //    $("#cbo_TipoDOC").val(estudio.tipoDoc);
        //    $("#txt_dni").val(estudio.documentoInterno);
        $("#btnBuscarPaciente").show();
        $("#desdeaqui").show();
        $("#btnCancelarPedidoTurno").show();
    } else {
        $("#CargadoNHC").html(estudio.hcExterno);
        $("#CargadoApellido").html(estudio.pacienteExterno);
        $("#CargadoSeccional").html(estudio.seccionalExterna);
        $(".ocultar").hide();
        $(".derecha").addClass('pull-left')

        $("#txtPacienteExterno").attr('value', estudio.pacienteExterno);
        $("#txtNhcExterna").attr('value', estudio.hcExterno);
        $("#cboSeccional option[value=" + estudio.seccionalExternaId + "]").attr("selected", true);
        $(".interno").val("");
        $(".interno").attr('disabled', true);
        $("#btnBuscarPaciente").hide();
        $("#desdeaqui").show();
        $("#btnCancelarPedidoTurno").show();
    }


    $("#cboTestudio").val(estudio.tipoEstudioId);
    //estudioComprobador.cboTestudio = estudio.tipoEstudioId;
    $("#cboMedicoremitente").val(estudio.medicoInternoId);
    //estudioComprobador.cboMedicoremitente = estudio.medicoInternoId;
    $("#cboServicio").val(estudio.servicioInternoId);
    //estudioComprobador.cboServicio = estudio.servicioInternoId;
    $("#cboEspecialidad").val(estudio.especialidadId);
    //estudioComprobador.cboEspecialidad = estudio.especialidadId;
    $("#cboMedExt").val(estudio.medicoExternoId);
    //estudioComprobador.cboMedExt = estudio.medicoExternoId;
    $("#cboServExt").val(estudio.servicioExternoId);
    //estudioComprobador.cboServExt = estudio.servicioExternoId;
    $("#txtCodigoDiagnostico").val(estudio.diagnostico);
    //estudioComprobador.txtCodigoDiagnostico = estudio.diagnostico;
    $("#cboMaterial").val(estudio.materialId);
    //estudioComprobador.cboMaterial = estudio.materialId;
    $("#cboProcedimiento").val(estudio.procedimientoId);
    //estudioComprobador.cboProcedimiento = estudio.procedimientoId;
    $("#cboMetodo").val(estudio.metodoId);
    //estudioComprobador.cboMetodo = estudio.metodoId;
    $("#txtProtocolo").val(estudio.protocolo);
    //estudioComprobador.txtProtocolo = estudio.protocolo;
    //alert(estudio.tecnicasEspeciales);
    $("#txtTecnicasEspeciales").val(estudio.tecnicasEspeciales);
    //estudioComprobador.txtTecnicasEspeciales = estudio.tecnicasEspeciales;
    $("#cboCodigoNN").val(estudio.nomencladorId);
    //estudioComprobador.cboCodigoNN = estudio.nomencladorId;
    $("#txtMacroscopia").val(estudio.macro);
    //estudioComprobador.txtMacroscopia = estudio.macro;
    $("#txtMicroscopia").val(estudio.micro);
    //estudioComprobador.txtMicroscopia = estudio.micro;
    $("#txtDiagnostico").val(estudio.diagnosticoTab.toString().replace(/<br\s*[\/]?>/gi, "\n"));
    //estudioComprobador.txtDiagnostico = estudio.diagnosticoTab;
    $("#txtComplementario").val(estudio.informeComplementario.toString().replace(/<br\s*[\/]?>/gi, "\n"));

    //estudioComprobador.chkReceptores = estudio.receptoresHormonales; 
    if (estudio.receptoresHormonales == 'S')
        $("#chkReceptores").attr('checked', true);
    else
        $("#chkReceptores").attr('checked', false);

    //estudioComprobador.chkPlaca = estudio.placa;
    if (estudio.placa == 'S')
        $("#chkPlaca").attr('checked', true);
    else
        $("#chkPlaca").attr('checked', false);

    $("#txtNumeroTacos").val(estudio.tacos);
    //estudioComprobador.txtNumeroTacos = estudio.tacos;
    $("#txtNumeroPreparados").val(estudio.preparados);
    //estudioComprobador.txtNumeroPreparados = estudio.preparados;
    $("#TeCantidad").val(estudio.tecEspCantidad);
    //estudioComprobador.TeCantidad = estudio.tecEspCantidad;
    $("#IHQcantidad").val(estudio.tecIhqCantidad);
    //estudioComprobador.IHQcantidad = estudio.tecIhqCantidad;
    $("#cboDiagnosticado").val(estudio.diagnosticador);
    //estudioComprobador.cboDiagnosticado = estudio.diagnosticador;
    $("#afiliadoId").val(estudio.afiliadoId);
    //estudioComprobador.afiliadoId = estudio.afiliadoId;
    $("#txtTecnicasEspeciales").attr('title', estudio.tecnicasEspViejas);
    $("#txtMaterialCod").val(estudio.materialCod);
    $("#txtProcedimientoCod").val(estudio.procedimientoCod);
    $("#txtMetodoCod").val(estudio.metodoCod);
    // estudioComprobador = estudio; // asigno el resultado de la busqueda al objeto para comprobar cambios de estudios viejo
    //    jQuery.each(estudioComprobador, function (name, value) {
    //        alert(value);
    //    });
    //    jQuery.each(estudioComprobador, function (name, value) {
    //        alert(name + ": " + value);
    //    });
    //   alert( estudioComprobador.hasOwnProperty('cboMaterial'));
    //    return false;
    //    $.each(estudioComprobador, function (index, item) {
    //        alert(item);
    //    });
    protocolo = estudio.protocolo;
    $("#btnTraspaso").show();
    $("#btnBorrar").show();

}


//////////////////////////////////////////////////////////////////

$("#btnImprimirS").click(function () {
    if (imprime == 0)
        return false;

    var p = 0;
    var txtHastaIngresoS = " ";
    var txtPacienteS = " ";
    var txtDniS = " ";
    var txtNhc = " ";
    var txtPacienteExternoS = " ";
    var txtNhcExternaS = " ";
    var txtDesdeIngresoS = "";


    if ($("#txtProtocoloS").val() == "")
        p = 0;
    else
        p = $("#txtProtocoloS").val();

    if ($("#txtHastaIngresoS").val() != "")
        txtHastaIngresoS = $("#txtHastaIngresoS").val();

    if ($("#txtDesdeIngresoS").val() != "")
        txtDesdeIngresoS = $("#txtDesdeIngresoS").val();

    if ($("#txtPacienteS").val() != "")
        txtPacienteS = $("#txtPacienteS").val();

    if ($("#txtDniS").val() != "")
        txtDniS = $("#txtDniS").val();

    if ($("#txtNhc").val() != "")
        txtNhc = $("#txtNhc").val();

    if ($("#txtPacienteExternoS").val() != "")
        txtPacienteExternoS = $("#txtPacienteExternoS").val();

    if ($("#txtNhcExternaS").val() != "")
        txtNhcExternaS = $("#txtNhcExternaS").val();


    imprimir("../Impresiones/Patologia/impresionBusqueda2.aspx?desdeIng=" + txtDesdeIngresoS +
    "&hastaIng=" + txtHastaIngresoS +
    "&paciente=" + txtPacienteS +
    "&dni=" + txtDniS +
    "&hc=" + txtNhc +
    "&seccional=" + $("#txtSeccionalS").val() +
    "&tipoEstudio=" + $("#cboTipoEstudioS").val() +
    "&medicoCentral=" + $("#cboMedicoCentralS").val() +
    "&servicio=" + $("#cboServicioS").val() +
    "&medicoExt=" + $("#cboMedicoExtS").val() +
    "&servicioExt=" + $("#cboServicioExts").val() +
    "&cDiagnostico=" + $("#cboCodigoDiagnosticoS").val() +
    "&material=" + $("#cboCodigoDiagnosticoS").val() +
    "&protocolo=" + p +
    "&pacienteExterno=" + txtPacienteExternoS +
    "&nhcExterno=" + txtNhcExternaS +
    "&PDF=1", 0
    );
});




/*var contents = $("#TablaResultados").html();
//    var frame1 = $('<iframe />');
//    frame1[0].name = "frame1";
//    frame1.css({ "position": "absolute", "top": "-1000000px" });
//    $("body").append(frame1);
//    var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
//    frameDoc.document.open();

//    var Encabezado = "";
//    var Contenido = "";
//    Encabezado = "<table><thead><td></td><td>Fecha Ingreso</td><td>Pacinete</td><td>Protocolo</td></thead>";
//    $.each(listaBusqueda, function (index, item) {
//        var paciente = "";
//        var estudioT = "";
//        // alert(item.pendiente);
//        if (item.externo == 1) { paciente = item.pacienteExterno; } else { if (item.pacienteInterno == null) { paciente = "BUSCAR PACIENTE EN EL ANTERIOR SISTEMA DE GESTION"; } else { paciente = item.pacienteInterno; } }
//        if (item.tipoEstudio != null) { if (item.pendiente == 1) { estudioT = "Pendiente"; } else { estudioT = item.tipoEstudio; } }
//        else { if (item.pendiente == 1) { estudioT = "Pendiente"; } }
//        // columnas fijas
//        Contenido = Contenido + "<tr style='height:20px; cursor:default' id='" + item.id + ";overflow:scroll; width:auto'>" +
//           "<td style='width:1%;cursor:pointer'>" +
//           "<td style='cursor:pointer' onclick='seleccionar(" + item.id + ")'>" + item.fechaInicio + "</div></td>" +
//           "<td style='cursor:pointer' onclick='seleccionar(" + item.id + ")'>" + paciente + "</div></td>" +
//           "<td style='cursor:pointer' onclick='seleccionar(" + item.id + ")'>" + item.protocolo + "</div></td>";

//        //columnas variables
//        //           "<td style='cursor:pointer; display:none' class='txtDesdeSalidaS' onclick='seleccionar(" + item.id + ")'>" + item.fechaSalida + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='txtDniS' onclick='seleccionar(" + item.id + ")'>" + item.documentoInterno + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='txtNhc' onclick='seleccionar(" + item.id + ")'>" + item.hcInterno + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='txtSeccionalS' onclick='seleccionar(" + item.id + ")'>" + item.seccionalInterno + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='txtNhcExterna' onclick='seleccionar(" + item.id + ")'>" + item.hcExterno + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='txtPacienteExterno' onclick='seleccionar(" + item.id + ")'>" + item.pacienteExterno + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='cboTipoEstudioS' onclick='seleccionar(" + item.id + ")'>" + estudioT + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='cboMedicoCentralS' onclick='seleccionar(" + item.id + ")'>" + item.medicoInterno + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='cboServicioS' onclick='seleccionar(" + item.id + ")'>" + item.servicioInterno + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='cboEspecialidadS' onclick='seleccionar(" + item.id + ")'>" + item.especialidad + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='cboMedicoExtS' onclick='seleccionar(" + item.id + ")'>" + item.medicoExterno + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='cboServicioExts' onclick='seleccionar(" + item.id + ")'>" + item.servicioExterno + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='cboCodigoDiagnosticoS' onclick='seleccionar(" + item.id + ")'>" + item.diagnosticos + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='cboMaterialS' onclick='seleccionar(" + item.id + ")'>" + item.material + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='cboProcedimientoS' onclick='seleccionar(" + item.id + ")'>" + item.procedimiento + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='cboMetodosS' onclick='seleccionar(" + item.id + ")'>" + item.metodo + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='txtProtocoloS' onclick='seleccionar(" + item.id + ")'>" + item.protocolo + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='cboTecnicasEspecialesS' onclick='seleccionar(" + item.id + ")'>" + item.tecnicasEspeciales + "</div></td>" +
//        //           "<td style='cursor:pointer; display:none' class='txtCodigoNNS' onclick='seleccionar(" + item.id + ")'>" + item.nomenclador + "</div></td>";

//    });
//    var Pie = "</tbody></table>";
//    //    $("#tablaResultados").html(Contenido + Pie);
//    //    $("#cantidadBusqueda").val(lista.length);

//    frameDoc.document.write(Encabezado + Contenido + Pie);
//    frameDoc.document.write(contents)
//    //    //Create a new HTML document.
//    //    frameDoc.document.write('<html><head><title>DIV Contents</title>');
//    //    frameDoc.document.write('</head><body>');
//    //    //Append the external CSS file.
//    //    frameDoc.document.write('<link href="style.css" rel="stylesheet" type="text/css" />');
//    //    //Append the DIV contents.
//    //    frameDoc.document.write(contents);
//    //    frameDoc.document.write('</body></html>');
//    frameDoc.document.close();
//    setTimeout(function () {
//        window.frames["frame1"].focus();
//        window.frames["frame1"].print();
//        frame1.remove();
//    }, 500);


//.click(function () {
//    var divToPrint = document.getElementById('TablaResultados');
//    var newWin = window.open('', 'Print-Window', 'width=100,height=100');
//    newWin.document.open();
//    newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
//    newWin.document.close();
//    setTimeout(function () { newWin.close(); }, 10);
//});*/