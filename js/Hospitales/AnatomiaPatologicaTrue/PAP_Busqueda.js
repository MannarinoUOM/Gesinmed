var controles = ["txtDesdeIngresoS", "txtHastaIngresoS", "txtDesdeSalidaS", "txtHastaSalidaS", "txtFechaNotificacionDesdeS", "txtFechaNotificacionHastaS", "txtFechaDiagnosticoDesdeS","txtFechaDiagnosticoHastaS",
    "txtPacienteS", "txtDniS", "txtNhc", "txtSeccionalS", "txtPacienteExternoS", "txtNhcExternaS", "cboMuestraAdecuacionS", "cboCelulasGlandularesS", "cboCategoriaGeneralS",
    "cboSalaPerifericaS", "cboHallazgosS", "cboMicroorganismosS", "cboCelulasGlandularesS", "cboValoracionHormonalS", "txtProtocoloS", "cboDiagnosticadorS", "cboCelulasEscamosasS", "cboSalaPerifericaS", "cboMedicoInternoS", "cboMedicoExternoS"];
//array de clases de columnas para poder ocultarlas o mostrarlas segun la busqueda

var oTabla; // variable tabla para la configuracion en el metodo LoadDataTable()
var buscar = 1; // para comprobar si ya se esta ejecutando el proceso de busqueda y no se pise con uno nuevo
var comprobar = []; // se utiliza para comprobar si hay almenos un filtro cargado para realizar la busqueda de estudio
var estudioComprobador = {
    cboMaterial: 0
};  // se utilizar para comprobar si se modifico algun dato de un estudio ya cargado
LoadDataTable(); // metodo para configurar la tabla de busqueda

$(document).ready(function () {
    cargarCombo("txtSeccionalS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/Seccionales_Listar", 1, { "tipo": 0, "busqueda": "" });  
    cargarCombo("cboServicioS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/TraerServiciosCentAnatomiaPatologica", 1, '');
    //cargarCombo("cboServicioExts", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/TraerServiciosExtAnatomiaPatologica", 1, '');

    cargarCombo("cboMuestraAdecuacionS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 1 });
    cargarCombo("cboCategoriaGeneralS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 2 });
    cargarCombo("cboFloraS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 3 });
    cargarCombo("cboMicroorganismosS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 4 });
    cargarCombo("cboHallazgosS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 5 });
    cargarCombo("cboCelulasEscamosasS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 6 });
    cargarCombo("cboCelulasGlandularesS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 7 });
    cargarCombo("cboValoracionHormonalS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCombos", 1, { "tipo": 8 }); ;
    cargarCombo("cboSalaPerifericaS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/TraerServiciosCentAnatomiaPatologica", 1, '');
    cargarCombo("cboDiagnosticadorS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMedicosCentListado", 1, { "id": 0 });
    cargarCombo("cboMedicoInternoS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMedicosCentListado", 1, { "id": 0 });
    cargarCombo("cboMedicoExternoS", "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PatoMedicosExtListado", 1, { "id": 0 });
    $('.no-footer').css("width", "100%");
    $('.dataTables_scrollHeadInner').css("width", "100%");
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
    if (comprobar.length == 26) {
        //alert("Ingrese algún filtro para buscar.");
        $("#mensajes").html("INGRESE ALGÚN FILTRO PARA BUSCAR!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        return false;
    }

    //comprueba que se este buscando y no se pise la busqueda
    if (buscar == 0) { return false; }
    buscar = 0;
    $(this).attr('disabled', true);

    if (($("#txtDesdeIngresoS").val().toString().trim().length > 0) && (validaFechaDDMMAAAA($("#txtDesdeIngresoS").val())) == false) {
        //alert("Ingrese una fecha de ingreso válida!.");
        $("#mensajes").html("INGRESE UNA FECHA DE INGRESO VÁLIDA!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        buscar = 1;
        $("#btnBuscarS").attr('disabled', false);
        return false;
    }

    if (($("#txtHastaIngresoS").val().toString().trim().length > 0) && (validaFechaDDMMAAAA($("#txtHastaIngresoS").val())) == false) {
        //alert("Ingrese una fecha de ingreso válida!.");
        $("#mensajes").html("INGRESE UNA FECHA DE INGRESO VÁLIDA!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        return false;
        buscar = 1;
        $("#btnBuscarS").attr('disabled', false);
    }
    if (($("#txtDesdeSalidaS").val().toString().trim().length > 0) && (validaFechaDDMMAAAA($("#txtDesdeSalidaS").val())) == false) {
        //alert("Ingrese una fecha de salida válida!.");
        $("#mensajes").html("INGRESE UNA FECHA DE SALIDA VÁLIDA!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        buscar = 1;
        $("#btnBuscarS").attr('disabled', false);
        return false;
    }

    if (($("#txtHastaSalidaS").val().toString().trim().length > 0) && (validaFechaDDMMAAAA($("#txtHastaSalidaS").val())) == false) {
        //alert("Ingrese una fecha de salida válida!.");
        $("#mensajes").html("INGRESE UNA FECHA DE SALIDA VÁLIDA!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        buscar = 1;
        $("#btnBuscarS").attr('disabled', false);
        return false;
    }

    if (($("#txtFechaNotificacionDesdeS").val().toString().trim().length > 0) && (validaFechaDDMMAAAA($("#txtFechaNotificacionDesdeS").val())) == false) {
        //alert("Ingrese una fecha de notificación válida!.");
        $("#mensajes").html("INGRESE UNA FECHA DE NOTIFICACIÓN VÁLIDA!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        buscar = 1;
        $("#btnBuscarS").attr('disabled', false);
        return false;
    }

    if (($("#txtFechaNotificacionHastaS").val().toString().trim().length > 0) && (validaFechaDDMMAAAA($("#txtFechaNotificacionHastaS").val())) == false) {
        //alert("Ingrese una fecha de notificación válida!.");
        $("#mensajes").html("INGRESE UNA FECHA DE NOTIFICACIÓN VÁLIDA!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        buscar = 1;
        $("#btnBuscarS").attr('disabled', false);
        return false;
    }
    if (($("#txtFechaDiagnosticoDesdeS").val().toString().trim().length > 0) && (validaFechaDDMMAAAA($("#txtFechaDiagnosticoDesdeS").val())) == false) {
        //alert("Ingrese una fecha de diagnóstico válida!.");
        $("#mensajes").html("INGRESE UNA FECHA DE DIAGNÓSTICO VÁLIDA!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        buscar = 1;
        $("#btnBuscarS").attr('disabled', false);
        return false;
    }

    if (($("#txtFechaDiagnosticoHastaS").val().toString().trim().length > 0) && (validaFechaDDMMAAAA($("#txtFechaDiagnosticoHastaS").val())) == false) {
        //alert("Ingrese una fecha de diagnóstico válida!.");
        $("#mensajes").html("INGRESE UNA FECHA DE DIAGNÓSTICO VÁLIDA!.");
        $("#btnCancelarMensaje").hide();
        $("#avisos").modal('show');
        buscar = 1;
        $("#btnBuscarS").attr('disabled', false);
        return false;
    }

    // armo el objeto de busqueda
    var datos = {};
    datos.paciente = $("#txtPacienteS").val();
    datos.pacienteExterno = $("#txtPacienteExternoS").val();
    datos.hc = $("#txtNhc").val();
    datos.hcExterno = $("#txtNhcExternaS").val();

    if ($("#txtDniS").val() == "")
        datos.documento_real = 0;
    else
        datos.documento_real = $("#txtDniS").val();

    datos.papSeccionalExterna = $("#txtSeccionalS").val();
    datos.adecuacionMuestraIdS = $("#cboMuestraAdecuacionS").val();
    datos.categoriaGeneral = $("#cboCategoriaGeneralS").val();
    datos.servicio = $("#cboSalaPerifericaS").val();
    datos.fechaIngresoDesde = $("#txtDesdeIngresoS").val();
    datos.fechaIngresoHasta = $("#txtHastaIngresoS").val();
    datos.protocolo = $("#txtProtocoloS").val();
    datos.flora = "0";
    datos.microorganismos = $("#cboMicroorganismosS").val();
    datos.noNeoplasticosIdS = $("#cboHallazgosS").val();

    if ($("#txtProtocoloS").val() == "")
        datos.protocolo = "0";
    else
        datos.protocolo = $("#txtProtocoloS").val();

    datos.diagnosticador = $("#cboDiagnosticadorS").val();
    //datos.celulasEscamosas = $("#cboCelulasEscamosasS").val();
    datos.celulasEscamosasIds = $("#cboCelulasEscamosasS").val();
    datos.celulasGladulares = $("#cboCelulasGlandularesS").val();
    datos.ValoracionHormonal = $("#cboValoracionHormonalS").val();
    datos.comentario = "";

    datos.fehcaDiagnosticoDesde = $("#txtFechaDiagnosticoDesdeS").val();
    datos.fechaDiagnosticoHasta = $("#txtFechaDiagnosticoHastaS").val();
    datos.fechaEntregaDesde = $("#txtDesdeSalidaS").val();
    datos.fechaEntregaHasta = $("#txtHastaSalidaS").val();
    datos.fechaNotificacionDesde = $("#txtFechaNotificacionDesdeS").val();
    datos.fechaNotificacionHasta = $("#txtFechaNotificacionHastaS").val();
    datos.medicoInternoId = $("#cboMedicoInternoS").val();
    datos.medicoExternoId = $("#cboMedicoExternoS").val();

    //    $.each(datos, function (index, item) {
    //        alert(item);
    //    });
    //    return false;
    // llamda al metodo de busqueda
    var json = JSON.stringify({ "pap": datos });
    $.ajax({
        type: "POST",
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/buscarPAP",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) { cargarLista(Resultado.d); },
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
        }
    });
});


function cargarLista(lista) {
    $("#tablaResultados").empty();
    var Encabezado = "";
    var Contenido = "";
    $.each(lista, function (index, item) {
    
        var paciente = "";
        var seccional = "";
        if (item.externo == 1) { paciente = item.pacienteExterno; seccional = item.seccionalExternaName; } else { paciente = item.paciente; seccional = item.seccionalName; }
        // columnas fijas
        Contenido = Contenido + "<tr style='height:20px; cursor:default' id='" + item.id + ";overflow:scroll; width:auto'>" +
           "<td style='width:1%;cursor:pointer'>" +
           "<td style='cursor:pointer' onclick='seleccionar(" + item.id + ")'>" + item.fechaIngreso + "</div></td>" +
           "<td style='cursor:pointer' onclick='seleccionar(" + item.id + ")'>" + paciente + "</div></td>" +
           "<td style='cursor:pointer' onclick='seleccionar(" + item.id + ")'>" + item.protocolo + "</div></td>" +

        //columnas variables
           "<td style='cursor:pointer; display:none' class='txtDesdeSalidaS' onclick='seleccionar(" + item.id + ")'>" + item.fechaEntrega + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='txtFechaNotificacionDesdeS' onclick='seleccionar(" + item.id + ")'>" + item.fechaNotificacion + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='txtFechaDiagnosticoDesdeS' onclick='seleccionar(" + item.id + ")'>" + item.fechaDiagnostico + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='txtDniS' onclick='seleccionar(" + item.id + ")'>" + item.documento_real + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='txtNhc' onclick='seleccionar(" + item.id + ")'>" + item.hc + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='txtSeccionalS' onclick='seleccionar(" + item.id + ")'>" + seccional + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboMuestraAdecuacionS' onclick='seleccionar(" + item.id + ")'>" + item.adecuacionMuestraName + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboCategoriaGeneralS' onclick='seleccionar(" + item.id + ")'>" + item.categoriaGeneralName + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboSalaPerifericaS' onclick='seleccionar(" + item.id + ")'>" + item.servicioName + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboHallazgosS' onclick='seleccionar(" + item.id + ")'>" + item.noNeoplasticosName + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboMicroorganismosS' onclick='seleccionar(" + item.id + ")'>" + item.microorganismosName + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboCelulasGlandularesS' onclick='seleccionar(" + item.id + ")'>" + item.celulasGladularesName + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboValoracionHormonalS' onclick='seleccionar(" + item.id + ")'>" + item.ValoracionHormonalName + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboDiagnosticadorS' onclick='seleccionar(" + item.id + ")'>" + item.diagnosticadorName + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboMedicoInternoS' onclick='seleccionar(" + item.id + ")'>" + item.medicoInternoName + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboMedicoExternoS' onclick='seleccionar(" + item.id + ")'>" + item.medicoExternoName + "</div></td>" +
           "<td style='cursor:pointer; display:none' class='cboCelulasEscamosasS' onclick='seleccionar(" + item.id + ")'>" + item.celulasEscamosasName + "</div></td>";
        //           "<td style='cursor:pointer; display:none' class='cboProcedimientoS' onclick='seleccionar(" + item.id + ")'>" + item.celulasEscamosasName + "</div></td>";
        //           "<td style='cursor:pointer; display:none' class='cboMetodosS' onclick='seleccionar(" + item.id + ")'>" + item.metodo + "</div></td>" +
        //           "<td style='cursor:pointer; display:none' class='txtProtocoloS' onclick='seleccionar(" + item.id + ")'>" + item.protocolo + "</div></td>" +
        //           "<td style='cursor:pointer; display:none' class='cboTecnicasEspecialesS' onclick='seleccionar(" + item.id + ")'>" + item.tecnicasEspeciales + "</div></td>" +
        //           "<td style='cursor:pointer; display:none' class='txtCodigoNNS' onclick='seleccionar(" + item.id + ")'>" + item.nomenclador + "</div></td>";

    });

    //fecha ingreso, paciente, protocolo---
    //fecha entrega, fecha notificacion, fecha diagnostico,dni, nhc,seccional,--
    //adecuacion de la muestra,categoria general,servicio,no neoplasticos,micoorganismos--
    //glandulares, hormonal,diagnosticador,escamosas
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
                    if (table.column("." + controles[i]).visible() == true) { table.column("." + controles[i]).visible(false); }
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
        "sScrollY": "220px",
        "sScrollX": "100%",
        "sScrollXInner": "400%",
        "sScrollYInner": "100%",
        "bScrollCollapse": true,
        "bScrollInfinite": true,
        "iDisplayLength": 50,
//                fixedHeader: {
//                    header: true,
//                    footer: false
//                },
        "columnDefs": [{ "visible": false, "targets": [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,19,20]}],
        "aaSorting": [],
        "language": {
            "zeroRecords": "Sin Resultados"
        }
    });
}


// trae y carga los datos del estudio que se selecciono de la busqueda
function seleccionar(id) {
    var r = true;

    //comprueba si hay modificaciones en una carga nueva para avisar que se perderan los valores
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
    function avanzar(r, id) {
    if (!r)
        return false;

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
        url: "../Json/AnatomiaPatologica/AnatomiaPatologicaTrue.asmx/PAPTraerCargaPorId",
        contentType: "application/json; charset=utf-8",
        data: json,
        dataType: "json",
        success: function (Resultado) { cargarEstudio(Resultado.d); },
        complete: function () { $(".carousel-control").click(); $("#btnInprimir").attr('disabled', false); edita = 1; $("#btnGuardar").html("<i class=' icon-ok icon-white'></i>&nbsp;Guardar Edición"); }
    });
}
// carga la pantalla de carga con los datos del estudio seleccionado
function cargarEstudio(estudio) {
    idCarga = estudio.id;
    $("#estudioId").val(idCarga);
    $("#externo").val(estudio.externo);

    idsAdecuacion.length = 0;
    adecuacionMuestra.length = 0;
    idsHallazgos.length = 0;
    HallazgosNoNeoplasicos.length = 0;
    idsMicroorganismos.length = 0;
    microorganismos.length = 0;
    idsEscamosas.length = 0;
    escamosas.length = 0;
     
    var str = "";
    var strNeoplasicos = "";
    var strMicroorganismos = "";

    if(estudio.adecuacionMuestra != null)
    if(estudio.adecuacionMuestra != "")
        var str = estudio.adecuacionMuestra;


    if (str != "") {
        if (str != null)
            idsAdecuacion = str.split(',').map(Number);
    } //Output: [1,2,3]
    //estudioComprobador.idsDiagnosticos = idsDiagnosticos;
    //alert(idsAdecuacion);

    // adecuacionMuestra.push(estudio.adecuacionMuestraName);
    if (estudio.adecuacionMuestraName != null)
    adecuacionMuestra = estudio.adecuacionMuestraName.split(' + ');
    //alert("que onda " + adecuacionMuestra);
    //alert(adecuacionMuestra);


    //no neoplasticos
    if (estudio.noNeoplasticos != null)
        if (estudio.noNeoplasticos != "")
            var strNeoplasicos = estudio.noNeoplasticos;


    if (strNeoplasicos != "") {
        if (strNeoplasicos != null)
            idsHallazgos = strNeoplasicos.split(',').map(Number);
    }

    if (estudio.noNeoplasticosName != null)
        HallazgosNoNeoplasicos = estudio.noNeoplasticosName.split(' + ');

    //microorganismos
    if (estudio.microorganismosIds != null)
        if (estudio.microorganismosIds != "")
            var strMicroorganismos = estudio.microorganismosIds;


    if (strMicroorganismos != "") {
        if (strMicroorganismos != null)
            idsMicroorganismos = strMicroorganismos.split(',').map(Number);
    }

    if (estudio.microorganismosName != null)
        microorganismos = estudio.microorganismosName.split(' + '); //????????????????????????


  
    //celulas escamosas
    if (estudio.celulasEscamosas != null)
        if (estudio.celulasEscamosas != "")
            var strCelulasEscamosas = estudio.celulasEscamosas;


    if (strCelulasEscamosas != "") {
        if (strCelulasEscamosas != null)
            idsEscamosas = strCelulasEscamosas.split(',').map(Number);
    }

    if (estudio.celulasEscamosasName != null)
        escamosas = estudio.celulasEscamosasName.split(' + '); //????????????????????????

    //alert(estudio.microorganismosName);
    //segun interno externo carga el encabezado
    if (estudio.externo == 0) {
//        $("#CargadoApellido").html(estudio.pacienteInterno);
//        $("#CargadoSeccional").html(estudio.seccionalInterno);
//        $("#CargadoDNI").html(estudio.documentoInterno);
//        $("#CargadoNHC").html(estudio.hcInterno);
//        $("#CargadoTelefono").html(estudio.telefono);
        $(".ocultar").show();
        $(".derecha").removeClass('pull-left');

//        $("#txtPaciente").attr('value', estudio.pacienteInterno);
//        $("#txtNHC").attr('value', estudio.hcInterno);
//        $("#txtTelefono").attr('value', estudio.telefono);
//        $("#cboSeccional option[value=" + estudio.seccionalInternoId + "]").attr("selected", true);
//        $("#cbo_TipoDOC").val(estudio.tipoDoc);
        //        $("#txt_dni").val(estudio.documentoInterno);
        CargarPacienteID(estudio.pacienteId);
        $("#afiliadoId").val(estudio.pacienteId);
        $("#btnBuscarPaciente").show();
        $("#desdeaqui").show();
        $("#btnCancelarPedidoTurno").show();
    } else {
        $("#CargadoNHC").html(estudio.hcExterno);
        $("#CargadoApellido").html(estudio.pacienteExterno);
        $("#CargadoSeccional").html(estudio.seccionalExternaName);
        $(".ocultar").hide();
        $(".derecha").addClass('pull-left')
        $("#afiliadoId").val(estudio.pacienteId);
        $("#txtPacienteExterno").attr('value', estudio.pacienteExterno);
        $("#txtNhcExterna").attr('value', estudio.hcExterno);
        $("#cboSeccional option[value=" + estudio.seccionalExternaId + "]").attr("selected", true);
        $(".interno").val("");
        $(".interno").attr('disabled', true);
        $("#btnBuscarPaciente").hide();
        $("#desdeaqui").show();
        $("#btnCancelarPedidoTurno").show();
    }


    $("#txtFechaIngreso").val(estudio.fechaIngreso);
    //estudioComprobador.cboTestudio = estudio.tipoEstudioId;
    $("#txtFechaDiagnostico").val(estudio.fechaDiagnostico);
    //estudioComprobador.cboMedicoremitente = estudio.medicoInternoId;
    $("#txtFechaNotificacion").val(estudio.fechaNotificacion);
    //estudioComprobador.cboServicio = estudio.servicioInternoId;
    $("#txtFechaEntrega").val(estudio.fechaEntrega);
    //estudioComprobador.cboEspecialidad = estudio.especialidadId;
    $("#cboMuestraAdecuacion").val(estudio.adecuacionMuestraName);
    //estudioComprobador.cboMedExt = estudio.medicoExternoId;
    $("#cboCategoriaGeneral").val(estudio.categoriaGeneral);
    //estudioComprobador.cboServExt = estudio.servicioExternoId;
    $("#cboSalaPeriferica").val(estudio.servicio);
    //estudioComprobador.txtCodigoDiagnostico = estudio.diagnostico;
    $("#txtProtocolo").val(estudio.protocolo);
    //estudioComprobador.cboMaterial = estudio.materialId;
    $("#cboFlora").val(estudio.flora);
    //estudioComprobador.cboProcedimiento = estudio.procedimientoId;
    $("#cboMicroorganismos").val(estudio.microorganismosName);
    //estudioComprobador.cboMetodo = estudio.metodoId;
    $("#cboHallazgos").val(estudio.noNeoplasticosName);
    //estudioComprobador.txtProtocolo = estudio.protocolo;

    $("#cboCelulasEscamosas").val(estudio.celulasEscamosasName);
    //estudioComprobador.txtTecnicasEspeciales = estudio.tecnicasEspeciales;
    $("#cboCelulasGlandulares").val(estudio.celulasGladulares);
    //estudioComprobador.cboCodigoNN = estudio.nomencladorId;
    $("#cboValoracionHormonal").val(estudio.ValoracionHormonal);
    //estudioComprobador.txtMacroscopia = estudio.macro;
    $("#txtComentario").val(estudio.comentario);
    //estudioComprobador.txtMicroscopia = estudio.micro;
    $("#cboDiagnosticador").val(estudio.diagnosticador);
    //estudioComprobador.txtDiagnostico = estudio.diagnosticoTab;
    $("#cboMedicoCentral").val(estudio.medicoInternoId);
    $("#cboMedicoExterno").val(estudio.medicoExternoId);
    //estudioComprobador.chkReceptores = estudio.receptoresHormonales; 
    protocolo = estudio.protocolo;
    $("#btnTraspaso").show();
    $("#btnBorrar").show();
}