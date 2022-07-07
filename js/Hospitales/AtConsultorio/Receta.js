function CargarPacienteID(ID) {
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/CargarPacienteID",
        data: '{ID: "' + ID + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Cargado,
        error: errores
    });
}

$("#btnCancelar_FB, #btnCerrarFB").click(function () {
    parent.$.fancybox.close();
});

function Cargar_Paciente_DOC(DOC) {
    var json = JSON.stringify({ "Documento": DOC, "T_Doc": $('#cbo_TipoDOC :selected').val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Cargar_Paciente_Documento",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Paciente_Cargado,
        error: errores
    });
}

var objPracticas = new Array();
var i = 0;
var Practicas = new Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var Actual = "";
var MedicoId = 0;
var MedicoIdOrigin = 0;
var NHC = 0;
var Protocolo = 0;
var Ultimo = 0;
var U = 0;
var EspId = 0;
var Modificado = 0;
var Guardado = 0;
///Autocomplete
var sourceArr = [];
var mapped = {};

function Cargar_Paciente_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {

        if (paciente.documento != null && paciente.documento != '') {
            $("#desdeaqui").show();
        }

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txt_dni").attr('value', paciente.documento_real);
        NHC = paciente.documento;
        $("#txtNHC").attr('value', paciente.NHC_UOM);

        if (paciente.Paciente.length > 20) $("#CargadoApellido").html(paciente.Paciente.substring(0, 19) + "...");
        else $("#CargadoApellido").html(paciente.Paciente);


        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#afiliadoId").val(paciente.documento);
        if (paciente.localidad != null)
            $("#CargadoLocalidad").html(paciente.localidad.substring(0, 15));
        else $("#CargadoLocalidad").html(paciente.localidad);

        if (paciente.Nro_Seccional != "999") {
            $("#CargadoSeccional").html(paciente.Seccional);
        }
        else {
            $("#CargadoSeccional").html("Sin Seccionalizar");
        }

        $('#fotopaciente').error(function () {
            $(this).attr('src', '../img/silueta.jpg');
        });

        //$('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');
        //alert(paciente.Foto);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

    });
}

$(document).ready(function () {
    $('input.typeahead').typeahead({
        updater: function (item) {
            $("#diag_nombre").val(item); //nom
            $("#id_val").val(mapped[item]); //id
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

    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if (GET["Protocolo"] != "" && GET["Protocolo"] != null) {
        $("#divmotivo").show();
        if (GET["U"] != "" && GET["U"] != null) {
            U = GET["U"];
            Protocolo = GET["Protocolo"];
            CargarRecetas();
        }
        else {
            Protocolo = GET["Protocolo"];
            $("#NROProtocolo").html(Protocolo);
            $("#NROProtocolo").removeClass("red");
            CargarRecetas();
        }

        if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
            MedicoId = GET["MedicoId"];
            MedicoDetalle(MedicoId);
            //EspId = GET["EspId"];
        }

        if (GET["MedicoIdOrigin"] != "" && GET["MedicoIdOrigin"] != null) {
            MedicoIdOrigin = GET["MedicoIdOrigin"];
        }

        
        Eliminar_Receta(true); //Verifico si puedo eliminar receta.
    }
    else {

        if (GET["NHC"] != "" && GET["NHC"] != null) {
            NHC = GET["NHC"];
            CargarPacienteID(NHC);
            CargarPatologia('');
            Cargar_Autorizantes(0, '');
        }

        if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
            MedicoId = GET["MedicoId"];
            MedicoDetalle(MedicoId);
            EspId = GET["EspId"];
        }
    }
    InitControls();

});

$("#btnBuscarRecetas, #btnBuscar").click(function () {
    document.location = "BuscarRecetas.aspx?NHC="+NHC+"&UOMID=" + $("#txtNHC").val() + "&EspId=" + EspId + "&MedicoId=" + MedicoId;
});


$(function () {
    var f = new Date();
    $("#txtFechaEntrega").datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: f,
        maxDate: '+14Y'
    });
});

$(".datos").change(function () {
    Modificado = 1;
});


function InitControls() {
    $("#txtFechaAtencion").datepicker();
    $("#txtFecha").datepicker();
    $("#txt_FechaRecp").datepicker();
    $("#txtFechaInicio").datepicker();

    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaAtencion").mask("99/99/9999", { placeholder: "-" });
    $("#txt_FechaRecp").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaEntrega").mask("99/99/9999", { placeholder: "-" });
    $("#txtFechaInicio").mask("99/99/9999", { placeholder: "-" });
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txt_dni").mask("999999?99", { placeholder: "-" });

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var dd = currentDt.getDate()
    dd = (dd < 10) ? '0' + dd : dd;

    var d = dd + '/' + mm + '/' + yyyy;
    $("#txtFechaInicio").val(d);

    ListaMonoDrogras();
    Lista_Medidas();
    Lista_Presentacion();
    ListTipoDoc();
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

$(".btnEliminar").click(function () {
    Eliminar_Receta(false); //Elimino receta
});

function Eliminar_Receta(Verificar) { //Verifico si puedo eliminar receta
    var json = JSON.stringify({"Protocolo": Protocolo, "Verificar": Verificar });
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Recetas_Eliminar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $(".btnEliminar").hide();
            var Receta = Resultado.d;
            if (Receta == 1 && Verificar) { $(".btnEliminar").show(); return false; }
            if (Receta > 0) { alert("Receta Eliminada."); return false; }
        },
        error: errores
    });
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function CargarPatologia(Patologia) {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/Patologia.asmx/Patologia_Lista_AtConsultorio",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var PATOLOGIA = Resultado.d;
            $('#cbo_patologia').empty();
            $('#cbo_patologia').append('<option value="0"></option>');
            $.each(PATOLOGIA, function (index, pat) {
                $('#cbo_patologia').append(

              $('<option></option>').val(pat.id).html(pat.patologias)
            );
            });
            if (Patologia != '' && Patologia != null) {
                $("#cbo_patologia option[value=" + Patologia + "]").attr("selected", true);
            }
        },
        error: errores
    });
}

function Cargar_Autorizantes(Id, Cual) {
    if (Cual == '' || Cual == null) Cual = "80000004";
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Autorizantes",
        data: '{Id: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Autorizantes = Resultado.d;
            $('#cboAutorizante').empty();
            $('#cboAutorizante').append('<option value="0"></option>');
            $.each(Autorizantes, function (index, autori) {
                $('#cboAutorizante').append(
              $('<option></option>').val(autori.id).html(autori.autorizante)
            );
            });

            if (Cual != '' && Cual != null) {
                $("#cboAutorizante option[value=" + Cual + "]").attr("selected", true);
            }

        },
        error: errores
    });
}

function ListaMonoDrogras() {
    var Id = 0;
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/MonoDrogas",
        data: '{Numero: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var MonoDrogas = Resultado.d;
            $('#cbo_MonoDrogas').empty();
            $('#cbo_MonoDrogas').append('<option value="0"></option>');
            $.each(MonoDrogas, function (index, mono) {
                $('#cbo_MonoDrogas').append(
              $('<option></option>').val(mono.numero).html(mono.nombre)
            );
            });
        },
        error: errores
    });
}

function Lista_Medidas() {
    var Id = 0;
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Lista_Medidas",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Medidas = Resultado.d;
            $('#cbo_medidas').empty();
            $('#cbo_medidas').append('<option value="0"></option>');
            $.each(Medidas, function (index, medidas) {
                $('#cbo_medidas').append(
              $('<option></option>').val(medidas.id).html(medidas.medida)
            );
            });
        },
        error: errores
    });
}

function Lista_Presentacion() {
    var Id = 0;
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Lista_Presentacion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Presentaciones = Resultado.d;
            $('#cbo_presentacion').empty();
            $('#cbo_presentacion').append('<option value="0"></option>');
            $.each(Presentaciones, function (index, pres) {
                $('#cbo_presentacion').append(
              $('<option></option>').val(pres.id).html(pres.presentacion)
            );
            });
        },
        error: errores
    });
}

function MedicoDetalle(Id) {
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/MedicoBuscar_Nombre",
        data: '{Id: "' + Id + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            $("#Medico").html(Resultado.d.Medico);
        }
        ,
        error: errores
    });
}

$("#txtNHC").change(function () {
    if ($("#txtNHC").val().length > 0)
        CargarPacienteID($("#txtNHC").val());
});

$("#txt_dni").change(function () {
    Cargar_Paciente_DOC($("#txt_dni").val());
});

$("#btnAceptar").click(function () {
    Codigo = $('#cbo_MonoDrogas option:selected').val();
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
            objPractica.monodrogascodigo = $('#cbo_MonoDrogas option:selected').val();
            objPractica.monodrogasnombre = $("#cbo_MonoDrogas :selected").text();
            objPractica.adicional = $("#txt_Adicional").val().trim().toUpperCase();
            objPractica.dosis = $("#txt_Dosis").val().trim();
            objPractica.dosis_diaria = $("#txt_Dosis_diaria").val().trim();
            objPractica.observacion = $("#txt_Observaciones").val().trim().toUpperCase();
            objPractica.unidad_medida_id = $('#cbo_medidas option:selected').val();
            objPractica.unidad_medida = $("#cbo_medidas :selected").text();
            objPractica.presentacion_id = $('#cbo_presentacion option:selected').val();
            objPractica.presentacion = $("#cbo_presentacion :selected").text();
            objPractica.Estado = Estado;           
                                  

            objPracticas[Cual] = objPractica;

            RenderizarTabla();
            Editando = 0;
            EditandoPos = -1;
            Modificado = 1;
            LimpiarCamposCarga();

    });


    $("#btnCancelar").click(function () {
        Editando = 0;
        EditandoPos = -1;
        LimpiarCamposCarga();
    });

function LimpiarCamposCarga() {
    $("#txt_Adicional").val('');
    $("#txt_Dosis").val('');
    $("#txt_Dosis_diaria").val('');
    $("#txt_Observaciones").val('');
    $("#cbo_MonoDrogas option[value=0]").attr("selected", true);
    $("#cbo_presentacion option[value=0]").attr("selected", true);
    $("#cbo_medidas option[value=0]").attr("selected", true);
    $("#cbo_MonoDrogas").removeAttr('disabled');
}

    function Existe(Algo) {
        for (var i = 0; i <= Total; i++) {
            if (objPracticas[i].monodrogascodigo == Algo && objPracticas[i].Estado == 1 && Editando != 1) {
                alert("Ya ha cargado la Monodroga : " + objPracticas[i].monodrogasnombre);
                LimpiarCamposCarga();
                return true;
            }
        }
        return false;
    }

    function RenderizarTabla() {

    var Contenido = "";
    for (var i = 0; i <= Total; i++) {
        if (objPracticas[i].Estado == 1) {
            Contenido = Contenido + "<tr onclick='Editar(" + i + ");'><td>" + objPracticas[i].monodrogasnombre + " </td><td>" + objPracticas[i].adicional + " </td><td> " + objPracticas[i].dosis_diaria + " </td><td> " + objPracticas[i].dosis + " </td><td> " + objPracticas[i].unidad_medida + " </td><td> " + objPracticas[i].presentacion + " </td></tr>";
        }
    }

    if ($("[rel=tooltip]").length) {
        $("[rel=tooltip]").tooltip();
    }

    $("#TablaResultado").html(Contenido);

}


function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#btnQuitar").show();
    $("#cbo_MonoDrogas option[value=" + objPracticas[Nro].monodrogascodigo + "]").attr("selected", true);
    $("#txt_Adicional").val(objPracticas[Nro].adicional);
    $("#txt_Dosis").val(objPracticas[Nro].dosis);
    $("#txt_Dosis_diaria").val(objPracticas[Nro].dosis_diaria);
    $("#txt_Observaciones").val(objPracticas[Nro].observacion);
    $("#cbo_medidas option[value=" + objPracticas[Nro].unidad_medida_id + "]").attr("selected", true);
    $("#cbo_presentacion option[value=" + objPracticas[Nro].presentacion_id + "]").attr("selected", true);
    $("#cbo_MonoDrogas").attr('disabled', 'disabled');
}

$("#btnQuitar").click(function () {
    $("#btnQuitar").hide();
    Editando = 0;
    objPracticas[EditandoPos].Estado = 0;
    Modificado = 1;
    RenderizarTabla();
    LimpiarCamposCarga();
});



$("#btnGuardar").click(function () {

    vacio = true;
    i = 0;
    if (objPracticas == undefined) { alert("No se puede guardar una receta vacia."); return false; }
    else {
        for (i = 0; i < objPracticas.length; i++) {
            if (objPracticas[i].Estado == 1) {
                vacio = false;
            }
        }
    }

    if (vacio) { alert("No se puede guardar una receta vacia"); return false; }

    if (MedicoId == "0") { alert("Error con el médico seleccionado"); return false; }

    if ($("#txtFechaInicio").val().lenght < 8) { alert("Ingrese fecha de inicio."); return false; }
    if ($("#txtFechaInicio").val() == "") { alert("Ingrese fecha de inicio."); return false; }
    if ($("#txtFechaEntrega").val().lenght < 8) { alert("Ingrese fecha de entrega."); return false; }
    if ($("#txtFechaEntrega").val() == "") { alert("Ingrese fecha de entrega."); return false; }
    if ($("#id_val").val().trim() == "" || $("#id_val").val().trim() == "0") { $("#id_val").val("ZA10"); }

    if (Modificado == 0) { alert("Debe modificar la receta para guardar la misma."); return false; }

    Protocolo = 0; //Siempre creo una receta nueva. (Nunca modifico)

    var json = JSON.stringify({
        "objMonoDrogas": objPracticas,
        "Protocolo": Protocolo,
        "FechaEntrega": $("#txtFechaEntrega").val(),
        "MedicoId": MedicoId,
        "ParologiaId": $('#cbo_patologia option:selected').val(),
        "NHC": $("#afiliadoId").val(),
        "FechaInicio": $("#txtFechaInicio").val(),
        "DiagnosticoID": $("#id_val").val(), //$('#cbo_diagnostico option:selected').val(),
        "AutoizadoId": $('#cboAutorizante option:selected').val(),
        "PeriodoSolicitado": $("#txtPeriodo").val(),
        "EspecialidadId": EspId
    });
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Guardar_Recetas",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: RecetasGuardados,
        error: errores
    });


});

function RecetasGuardados(Resultado) {
    Protocolo = Resultado.d;
    $("#NROProtocolo").html(Protocolo);
    Guardado = 1;
	alert("Se ha guardado correctamente el formulario de medicación.");
}

function CargarRecetas() {
    $.ajax({
        type: "POST",
        data: '{Protocolo: "' + Protocolo + '"}',
        url: "../Json/AtConsultorio/AtConsultorio.asmx/CargarRecetaCAB",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Recetas = Resultado.d;
            $.each(Recetas, function (index, Receta) {
                NHC = Receta.NHC;
                CargarPacienteID(NHC);
                //MedicoId = Receta.medicoid;
                MedicoDetalle(MedicoId);
                Protocolo = Receta.protocolo;
                $("#id_val").val(Receta.diagnoticoid);
                $("#diag_nombre").val(Receta.diagnoticodesc);
                $("#cbo_diagnostico").val(Receta.diagnoticodesc);
                $("#txtFechaEntrega").val(Receta.fechaentrega);
                CargarPatologia(Receta.patologia);
                $("#txtFechaInicio").val(Receta.fechainicio);
                Cargar_Autorizantes(0, Receta.autorizanteid);
                $("#txtPeriodo").val(Receta.periodo);
            });
            CargarDetalles();
        },
        error: errores
    });
}


function CargarDetalles() {
    $.ajax({
        type: "POST",
        data: '{Protocolo: "' + Protocolo + '"}',
        url: "../Json/AtConsultorio/AtConsultorio.asmx/CargarRecetaDET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Detalles = Resultado.d;

            $.each(Detalles, function (index, detalle) {
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
                objPractica.monodrogascodigo = detalle.monodrogascodigo;
                objPractica.monodrogasnombre = detalle.monodrogasnombre;
                objPractica.adicional = detalle.adicional;
                objPractica.dosis = detalle.dosis;
                objPractica.dosis_diaria = detalle.dosis_diaria;
                objPractica.observacion = detalle.observacion;
                objPractica.unidad_medida_id = detalle.unidad_medida_id;
                objPractica.unidad_medida = detalle.unidad_medida;
                objPractica.presentacion_id = detalle.presentacion_id;
                objPractica.presentacion = detalle.presentacion;
                objPractica.Estado = Estado;
                objPracticas[Cual] = objPractica;

            });

            RenderizarTabla();
            Editando = 0;
            EditandoPos = -1;
            if (U == 1) {
                Protocolo = 0;
                $("#NROProtocolo").html("Provisorio");
                $("#NROProtocolo").addClass("red");
            }
        },
        complete: function () {
            $("#desdeaqui").click();
        },
        error: errores
    });
}

function LimpiarVar() {
    Guardado = 0;
    Modificado = 0;
}


function Traer_Firma(medico,tipo) {
    //alert(medico);
    var json = JSON.stringify({ "idMedico": medico });
    $.ajax({
        type: "POST",
        url: "../Json/firmaDigital.asmx/TraerFirmaMedico",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {

            //if (tipo == 1) { self.location = "../Impresiones/Recetario.aspx?Protocolo=" + Protocolo + "&imgF=" + Resultado.d.nombreArchivo + "&idm=" + medico + "&F=" + $("#chkConCopia").prop('checked'); }
            //if (tipo == 2) { self.location = "../Impresiones/Autorizacion70100.aspx?Protocolo=" + Protocolo + "&imgF=" + Resultado.d.nombreArchivo + "&idm=" + medico + "&F=" + $("#chkConCopia").prop('checked'); }


            if (tipo == 1) {
                if ($("#chkConCopia").prop('checked')) {
                    self.location = "../Impresiones/RecetarioX3.aspx?Protocolo=" + Protocolo + "&imgF=" + Resultado.d.nombreArchivo + "&idm=" + medico;
                } else {
                    self.location = "../Impresiones/Recetario.aspx?Protocolo=" + Protocolo + "&imgF=" + Resultado.d.nombreArchivo + "&idm=" + medico;
                }
            }
            if (tipo == 2) {
                if ($("#chkConCopia").prop('checked')) {
                    self.location = "../Impresiones/Autorizacion70100X3.aspx?Protocolo=" + Protocolo + "&imgF=" + Resultado.d.nombreArchivo + "&idm=" + medico;
                } else {
                    self.location = "../Impresiones/Autorizacion70100.aspx?Protocolo=" + Protocolo + "&imgF=" + Resultado.d.nombreArchivo + "&idm=" + medico;
                }
            }

//            if (tipo == 1) {
//                if ($("#chkConCopia").prop('checked')) {
//                    self.location = "10.10.8.71:82/Impresiones/RecetarioX3.aspx?Protocolo=" + Protocolo + "&imgF=" + Resultado.d.nombreArchivo + "&idm=" + medico;
//                } else {
//                    self.location = "10.10.8.71:82/Impresiones/Recetario.aspx?Protocolo=" + Protocolo + "&imgF=" + Resultado.d.nombreArchivo + "&idm=" + medico;
//                }
//            }
//            if (tipo == 2) {
//                if ($("#chkConCopia").prop('checked')) {
//                    self.location = "10.10.8.71:82/Impresiones/Autorizacion70100X3.aspx?Protocolo=" + Protocolo + "&imgF=" + Resultado.d.nombreArchivo + "&idm=" + medico;
//                } else {
//                    self.location = "10.10.8.71:82/Impresiones/Autorizacion70100.aspx?Protocolo=" + Protocolo + "&imgF=" + Resultado.d.nombreArchivo + "&idm=" + medico;               
//                }
//            }
            parent.$("#ProtocoloImpresion").val(Protocolo);
            LimpiarVar();
            parent.$("#fancybox-close").show();
        },
        error: errores
    });
}


function ImprimirRecetario() {
   // alert("MedicoIdOrigin: " + MedicoIdOrigin + "//" + "MedicoId: " + MedicoId + "//" + "Guardado: " + Guardado);
    if (MedicoIdOrigin == 0) { Traer_Firma(MedicoId, 1); } else if (Guardado == 1) { Traer_Firma(MedicoId, 1); } else { Traer_Firma(MedicoIdOrigin, 1); }
    

//                self.location = "../Impresiones/Recetario.aspx?Protocolo=" + Protocolo;
//                parent.$("#ProtocoloImpresion").val(Protocolo);
//                LimpiarVar();
//                parent.$("#fancybox-close").show();
}

function ImprimirRecetario70100() {

   // alert("MedicoIdOrigin: " + MedicoIdOrigin + "//" + "MedicoId: " + MedicoId + "//" + "Guardado: " + Guardado);
    if (MedicoIdOrigin == 0) { Traer_Firma(MedicoId, 2); } else if (Guardado == 1) { Traer_Firma(MedicoId, 2); } else { Traer_Firma(MedicoIdOrigin, 2); }

//    self.location = "../Impresiones/Autorizacion70100.aspx?Protocolo=" + Protocolo;
//    parent.$("#ProtocoloImpresion").val(Protocolo);
//    LimpiarVar();
//    parent.$("#fancybox-close").show();
}

$("#btnImprimir").click(function () {
   // alert(MedicoId);
    if (objPracticas == undefined || objPracticas.length == 0) { alert("No puede imprimir una receta vacia."); return false; }
    if ($("#NROProtocolo").html() == "Provisorio") { alert("No puede imprimir una receta sin guardar la misma."); return false; }
    if (Guardado == 0 && Modificado == 1) { alert("No puede imprimir una receta sin guardar la misma."); return false; }

    if ($("#NROProtocolo").html() != "Provisorio") {
        if (confirm("¿Desea imprimir la receta con fecha " + $("#txtFechaEntrega").val() + "?")) $("#myModalImpresion").modal('show');
    }
    else $("#myModalImpresion").modal('show');
}); 