var objPracticas = new Array();
var i = 0;
var Practicas = new Array();
var Total = -1;
var Editando = 0;
var EditandoPos = 0;
var Actual = "";
var MedicoId = 0;
var NHC = "";
var Protocolo = 0;
var IntId = 0;

///Autocomplete
var sourceArr = [];
var mapped = {};


$("#btnCerrar").click(function () {
    parent.$.fancybox.close();
});

$(".numero").on('keydown', function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
        return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

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

function Cargar_Paciente_Documento(Documento) {
    var json = JSON.stringify({ "Documento": Documento, "T_Doc": $('#cbo_TipoDOC :selected').val() });
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

function Cargar_Paciente_Cargado(Resultado) {
    var Paciente = Resultado.d;
    var PError = false;

    $.each(Paciente, function (index, paciente) {


        $("#btnCargar").show();
        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#txt_dni").attr('value', paciente.documento_real);
        $("#txtNHC").attr('value', paciente.NHC_UOM);
        $("#afiliadoId").val(paciente.documento);

        if (paciente.Paciente.length > 20) $("#CargadoApellido").html(paciente.Paciente.substring(0, 19) + "...");
        else $("#CargadoApellido").html(paciente.Paciente);

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);

        $("#CargadoLocalidad").html(paciente.localidad.substring(0, 15));


        if (paciente.Nro_Seccional != "999") {
            $("#CargadoSeccional").html(paciente.Seccional);
        }
        else {
            $("#CargadoSeccional").html("Sin Seccionalizar");
        }

        //$('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');
        //alert(paciente.Foto);
        $('#fotopaciente').attr('src', '../fotoPerfil/' + paciente.Foto);

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
        }

        if (NHC != '' && NHC != null) {
            $("#btnCargar").click();
        }

    });
}


function errores(msg) {
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


    if (GET["NHC"] != "" && GET["NHC"] != null) {
        NHC = GET["NHC"];
        CargarPacienteID(NHC);
    }

    if (GET["MedicoId"] != "" && GET["MedicoId"] != null) {
        MedicoId = GET["MedicoId"];
    }

    $(".Int").hide();
    if (GET["IntId"] != "" && GET["IntId"] != null) {
        IntId = GET["IntId"];
        $(".Int").show();
        CargarDatosInternacion(IntId);
    }

    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtNHC").mask("9?9999999999", { placeholder: "-" });
    $("#txt_dni").mask("999999?99", { placeholder: "-" });
    $("#txtFecha").datepicker();

    ListTipoDoc();
    ListarPlantillas(false); //Listo plantillas solo activas...

    if (GET["Protocolo"] != "" && GET["Protocolo"] != null) {
        Protocolo = GET["Protocolo"];
        if (Protocolo != 0) {
            $("#btnImprimir").show();
        }
        $("#ProtocoloNumero").html(Protocolo);
        $("#ProtocoloNumero").removeClass("red");
        CargarOrdenesdeEstudios();
    }
    else {
        //  CargarDiagnostico('');
        CargarPatologia(0);
        $("#txtFecha").val(FechaActual());
    }

});


function CargarDatosInternacion(ID) {
    $.ajax({
        type: "POST",
        data: '{IntId: "' + ID + '"}',
        url: "../Json/Internaciones/IntSSC.asmx/InternacionResumen",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var inter = Resultado.d;
            $("#CargadoCama").html(inter.cama);
            $("#CargadoSala").html(inter.sala);
        },
        error: errores
    });
}

$('#fotopaciente').error(function () {
    $(this).attr('src', '../img/silueta.jpg');
});

$("#btnImprimir").click(function () {
    self.location = "../Impresiones/ImpresionOrdenesEstudios.aspx?Protocolo=" + Protocolo + "&IntId=" + IntId;
    parent.$("#fancybox-close").show();
});

function CargarOrdenesdeEstudios() {
    $.ajax({
        type: "POST",
        data: '{Protocolo: "' + Protocolo + '"}',
        url: "../Json/AtConsultorio/AtConsultorio.asmx/CargarOrdenEstudioCab",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Orden = Resultado.d;
            // $('#cbo_dignostico').empty();
            // CargarDiagnostico(Orden.diagnosticoid);
            CargarPatologia(Orden.patologiaid);
            $("#txtFecha").val(Orden.fechainicio);
            $("#cbo_diagnostico").val(Orden.DiagnosticoName);
            $("#id_val").val(Orden.diagnosticoid);
            $("#diag_nombre").val(Orden.DiagnosticoName);
            //alert(Orden.servicioId);
            $("#cbo_Servicio").val(Orden.servicioId);
            CargarDetalles();
        },
        error: errores
    });
}


function CargarDetalles() {
    $.ajax({
        type: "POST",
        data: '{Protocolo: "' + Protocolo + '"}',
        url: "../Json/AtConsultorio/AtConsultorio.asmx/CargarOrdenEstudioDet",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Detalles = Resultado.d;
            $.each(Detalles, function (index, detalle) {
                Observacion = detalle.Observacion;
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
                objPractica.Estado = Estado;
                objPractica.Observacion = Observacion;
                objPracticas[Cual] = objPractica;
            });

            RenderizarTabla();
            Editando = 0;
            EditandoPos = -1;
        },
        error: errores
    });
}

function CargarPatologia(Patologia) {
    var json = JSON.stringify({"Id": Patologia});
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/Patologia.asmx/Patologia_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: json,
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

function Eliminar(Nro) {
    objPracticas[Nro].Estado = 0;
    RenderizarTabla();
}

function RenderizarTabla() {
    var Contenido = "";
    for (var i = 0; i <= Total; i++) {
        //Estado = 0 es Borrado
        if (objPracticas[i].Estado == 1) {
            Contenido = Contenido + "<tr><td ><a id='Eliminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Práctica'><i class='icon-remove-circle icon-white'></i></a></td><td onclick='Editar(" + i + ");'> " + objPracticas[i].Observacion + " </td></tr>";
        }
    }
    $("#TablaPracticas").html(Contenido);
}

function Editar(Nro) {
    Editando = 1;
    EditandoPos = Nro;
    $("#txt_observacion").val(objPracticas[Nro].Observacion);
    $("#myModal").modal('show');
}


$("#btnAgregarPractica").click(function () {
    if ($("#txt_observacion").val().trim().length == 0) { alert("Ingrese Observacion."); return false; }
    Observacion = $("#txt_observacion").val().trim().toUpperCase();
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
    objPractica.Estado = Estado;
    objPractica.Observacion = Observacion;
    objPracticas[Cual] = objPractica;
    RenderizarTabla();
    Editando = 0;
    EditandoPos = -1;
    LimpiarCampos();
});

$("#btnCancelar").click(function () {
    LimpiarCampos();
});


function LimpiarCampos() {
    Editando = 0;
    EditandoPos = -1;
    $("#txt_observacion").val("");
    $("#txt_observacion").focus();
}

        $('#btnCargar').click(function () {
            $("#hastaaqui").fadeIn(1500);
            $('html, body').animate({ scrollTop: $("#hastaaqui").offset().top + 10 }, 500);
            $('.container').height($('html').height() + ($('.contenedor_1').height() -
				$('.pie').height() -
				$('#hastaaqui').height()));
        });

        $("#modal_carga").click(function () {
            $("#myModal").modal('show');
        });


        function Validar() {
            var vacio = true;
            var i = 0;
            if (objPracticas == undefined) { alert("No se puede guardar una orden de estudio vacía."); return false; }
            else {
                for (i = 0; i < objPracticas.length; i++) {
                    if (objPracticas[i].Estado == 1) {
                        vacio = false;
                    }
                }
            }
            if (vacio) { alert("No se puede guardar una orden de estudio vacía."); return false; }
           // if (MedicoId == "0") { alert("Error con el médico seleccionado."); return false; }
            if ($("#txtFecha").val().trim().length == 0) { alert("Error con la fecha ingresada."); return false; }
            if ($("#id_val").val().trim() == "0" || $("#id_val").val().trim() == "") $("#id_val").val('ZA10');
            return true;
        }



        $("#btnGuardarOrdenEstudio").click(function () {
            if (!Validar()) return false;

            var med = 0;
            if (parent.$("#cbo_Medico").val() != undefined) { med = parent.$("#cbo_Medico").val(); } //por consultorio
            if (parent.$("#cbo_Medicos").val() != undefined) { med = parent.$("#cbo_Medicos").val(); } //por guardia

            //alert(med);

            //            alert(parent.$("#cbo_Medico").val());
            //            alert(parent.$("#cbo_Medicos").val());
            //            return false;
            var json = JSON.stringify({
                "objPracticas": objPracticas,
                "Protocolo": Protocolo,
                "MedicoID": med, //parent.$("#cbo_Medico").val(), // MedicoId,
                "PatologiaID": $('#cbo_patologia :selected').val(),
                "NHC": $("#afiliadoId").val(),
                "FechaInicio": $("#txtFecha").val(),
                "DiagnosticoID": $("#id_val").val(), //$('#cbo_dignostico :selected').val()
                "servicioId": $("#cbo_Servicio").val()
            });

            console.log(json);

            $.ajax({
                type: "POST",
                url: "../Json/AtConsultorio/AtConsultorio.asmx/GuardarOrdenesdeEstudio",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OrdenesEstudiosGuardados,
                error: errores
            });


        });

        function OrdenesEstudiosGuardados(Resultado) {
            var Id = Resultado.d;
            self.location = "../Impresiones/ImpresionOrdenesEstudios.aspx?Protocolo=" + Id + "&IntId=" + IntId + "&MedicoId=" + MedicoId;
            parent.$("#fancybox-close").show();
        }

        $("#btnBuscar").click(function () {
            self.location = "BuscarOrdenesdeEstudios.aspx?NHC=" + $("#afiliadoId").val() + "&MedicoId=" + MedicoId + "&UOMID=" + $("#CargadoNHC").html();
        });


        ///Plantillas para los distintos servicios///
        function ListarPlantillas(Todos) {
            var json = JSON.stringify({ "Todos": Todos });
            $.ajax({
                type: "POST",
                data: json,
                url: "../Json/Administracion/OrdenesEstudio_Plantilla.asmx/ListarPlantillas",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    var Plantillas = Resultado.d;
                    $('#cbo_Servicio').append($('<option></option>').val("0").html("Seleccione Servicio..."));
                    $.each(Plantillas, function (index, plan) {
                        $('#cbo_Servicio').append($('<option></option>').val(plan.IdPlantilla).html(plan.Servicio));
                    });
                },
                error: errores
            });
        }


        $('#cbo_Servicio').change(function () {
            ListarPlantillasDetalle($('#cbo_Servicio :selected').val(), false);
        });

        function ListarPlantillasDetalle(IdPlantilla, Todos) {
            var json = JSON.stringify({ "IdPlantilla": IdPlantilla, "Todos": Todos });
            $.ajax({
                type: "POST",
                data: json,
                url: "../Json/Administracion/OrdenesEstudio_Plantilla.asmx/ListarPlantillasDetalle",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    var Contenido = "";
                    var Lista = Resultado.d;
                    Total = Lista.length - 1;
                    for (var i = 0; i <= Total; i++) {
                        //Estado = 0 es Borrado
                        var objPractica = {};
                        objPractica.Estado = Lista[i].Estado;
                        objPractica.Observacion = Lista[i].Estudio;
                        objPracticas[i] = objPractica;
                        Contenido = Contenido + "<tr><td><a id='Eliminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar Práctica'><i class='icon-remove-circle icon-white'></i></a></td><td onclick='Editar(" + i + ");'> " + objPracticas[i].Observacion + " </td></tr>";

                    }
                    $("#TablaPracticas").html(Contenido);
                },
                error: errores
            });
        }