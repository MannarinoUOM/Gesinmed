var Internacion;
var Medico;
var objConsultas = new Array();
var Total = -1;
var Editando = 0;
var EditandoPos = -1;
var objBusquedaLista = "";

$(document).ready(function () {
    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        GET[decode(arguments[1])] = decode(arguments[2]);
    });
    if (GET["NHC"].length > 0) {
        $("#txtNHC").val(GET["NHC"]);
        CargarPacienteID(GET["NHC"]);
        Internacion = GET["IntId"];
        Medico = GET["MedicoId"];
        List_Interconsultas(GET["NHC"]);
        CargarEncabezadoInternacion(Internacion);
    }

    if (GET["B"] != "" && GET["B"] != null) { //At Internados, lista Servicios
        objBusquedaLista = GET["B"];
    }

    $("#desdeaqui").click();
    CargarMedicos();
    Especialidades_Lista();
    $("#txtFecha").datepicker();
    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    $("#txtFecha").val(FechaActual());
    $("#txtFechaCierre").datepicker();
    $("#txtFechaCierre").val(FechaActual());
    $("#txtFechaCierre").mask("99/99/9999", { placeholder: "-" });
});

function CargarMedicos() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Medicos_Por_Usuarios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarMedicos_Cargados,
        error: errores
    });
}

function CargarMedicos_Cargados(Resultado) {
    var Medicos = Resultado.d;
    $('#cbo_MedicoSol').empty();
    $.each(Medicos, function (index, medico) {
        $('#cbo_MedicoSol').append($('<option></option>').val(medico.Id).html(medico.Medico));
    });
}

$("#cbo_Especialidad").change(function () {
    var json = JSON.stringify({ "Especialidad": $("#cbo_Especialidad :selected").val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: MedicosporEsp_Cargado,
        error: errores
    });
});

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

function MedicosporEsp_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Medico").empty();
    $("#cbo_Medico").append($("<option></option>").val("").html(""));
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medico").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });
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

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#txtPaciente").attr('value', paciente.Paciente);
        $("#txt_dni").attr('value', paciente.documento_real);
        $("#txtNHC").attr('value', paciente.NHC_UOM);
        $("#afiliadoId").val(paciente.documento);
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoTelefono").html(paciente.Telefono);
        if (paciente.Nro_Seccional != 998)
            $("#CargadoSeccional").html(paciente.Seccional);
        else $("#CargadoSeccional").html(paciente.ObraSocial);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
        //alert(paciente.Foto);
        $('.avatar2').attr('src', '../fotoPerfil/' + paciente.Foto);

        if (PError) {
            $("#desdeaqui").hide();
        }
        else {
            $("#desdeaqui").show();
        }
    });

}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function List_Medicos() {
    var json = JSON.stringify({ "EspId": 0 });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/Medicos_Por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Medicos_Cargado,
        error: errores
    });
}

function List_Medicos_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Medico) {
        $("#cbo_Medico").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
        $("#cbo_MedicoSol").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
    });

}

function Especialidades_Lista() {
    var json = JSON.stringify({ "Todas": false, "Id": 0, "SoloTurnos": false });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Especialidades_Lista",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Especialidades_Lista_Cargado,
        error: errores
    });
}

function Especialidades_Lista_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Especialidad").append("<option value='0'></option>");
    $.each(Lista, function (index, Especialidad) {
        $("#cbo_Especialidad").append($("<option></option>").val(Especialidad.Id).html(Especialidad.Especialidad));
    });
}

function Validar() {
    if ($("#cbo_MedicoSol :selected").val() == "") { alert("Ingrese médico solicitante."); return false; }
   // if ($("#cbo_Medico :selected").val() == "") { alert("Ingrese médico de interconsulta."); return false; }
    if ($("#cbo_Especialidad :selected").val() == "0") { alert("Ingrese especialidad de interconsulta."); return false; }
    if ($("#txtDiagnostico").val().trim().length == "0") { alert("Ingrese diagnóstico."); return false; }
    if ($("#txtFecha").val().trim().length == "0") { alert("Ingrese fecha de la interconsulta."); return false; }
    if ($("#txtIndicacion").val().trim().length < "10") { alert("Ingrese alguna indicación de 10 caracteres como mínimo."); return false; }
    return true;
}

$("#btnConfirmar").click(function () {
    if (confirm("¿Desea finalizar la Interconsulta?")) {
        if (!Validar()) return false;
        if (EditandoPos != -1) {
            if (objConsultas[EditandoPos].Estado == 3) {
                alert("La interconsulta ya fue cerrada");
                return false;
            }
            if (!$("#chk_Cerrar").is(":checked") && objConsultas[EditandoPos].Estado == 1) { alert("Debe tildar 'Finalizar Interconsulta', para finalizar la misma."); return false; }
            if (objConsultas[EditandoPos].Estado != 3) {
                var Interconsulta = {};

                if (Editando != 0)
                    Interconsulta.IdInterconsulta = objConsultas[EditandoPos].IdInterconsulta;
                else Interconsulta.IdInterconsulta = 0;

                if (Editando != 0 && $("#chk_Cerrar").is(":checked")) {
                    if ($("#txtFechaCierre").val().length > 0) {
                        Interconsulta.Estado = 3;
                        Interconsulta.FechaCierre = $("#txtFechaCierre").val();
                    }
                    else {
                        alert("Ingrese Fecha de Cierre");
                        return;
                    }
                }
                Interconsulta.NroInternacion = Internacion;
                Interconsulta.NHC = $("#afiliadoId").val();
                Interconsulta.MedicoSol = $("#cbo_MedicoSol :selected").val();

                Interconsulta.MedicoInter = $("#cbo_Medico :selected").val();
                if ($("#cbo_Medico :selected").val() == "") Interconsulta.MedicoInter = 80000553; //Medico Desconocido...

                Interconsulta.EspecialidadInter = $("#cbo_Especialidad :selected").val();
                Interconsulta.Fecha = $("#txtFecha").val();
                Interconsulta.Motivo = $("#txtDiagnostico").val().trim().toUpperCase();
                Interconsulta.Indicacion = $("#txtIndicacion").val().trim().toUpperCase();
                var json = JSON.stringify({ "i": Interconsulta });
                $.ajax({
                    type: "POST",
                    data: json,
                    url: "../Json/AtInternados/ListaPacientesInternados.asmx/Insert_PedidoInterconsulta",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: Interconsulta_Guardada,
                    error: errores
                });
            }
        }
        else {
            var Interconsulta = {};
            Interconsulta.Estado = 0; //Ingresado
            Interconsulta.NroInternacion = Internacion;
            Interconsulta.NHC = $("#afiliadoId").val();
            Interconsulta.MedicoSol = $("#cbo_MedicoSol :selected").val();


            Interconsulta.MedicoInter = $("#cbo_Medico :selected").val();
            if ($("#cbo_Medico :selected").val() == "") Interconsulta.MedicoInter = 80000553; //Medico Desconocido...


            Interconsulta.EspecialidadInter = $("#cbo_Especialidad :selected").val();
            Interconsulta.Fecha = $("#txtFecha").val();
            Interconsulta.Motivo = $("#txtDiagnostico").val().trim().toUpperCase();
            Interconsulta.Indicacion = $("#txtIndicacion").val().trim().toUpperCase();
            var json = JSON.stringify({ "i": Interconsulta });
            $.ajax({
                type: "POST",
                data: json,
                url: "../Json/AtInternados/ListaPacientesInternados.asmx/Insert_PedidoInterconsulta",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Interconsulta_Guardada,
                error: errores
            });
        }
    }
});

function Interconsulta_Guardada() {
    alert("Interconsulta Guardada Correctamente");
    LimpiarCampos();
    List_Interconsultas($("#afiliadoId").val());
}

function List_Interconsultas(NHC) {
    var json = JSON.stringify({ "NHC": NHC, "Medico": 0, "Especialidad": 0 });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/Interconsultas_by_NHC",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Interconsultas_Load,
        error: errores
    });
}

function List_Interconsultas_Load(Resultado) {
    var Interconsultas = Resultado.d;
    if (Interconsultas.length > 0) {
        var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Med. Solicitante</th><th>Esp. de Interconsulta</th><th>Med. Interconsulta</th><th>Fecha</th><th>Diagnóstico</th></tr></thead><tbody>";
        var Contenido = "";
        var i = 0;
        $.each(Interconsultas, function (index, Detalle) {
            Contenido = Contenido + "<tr class='" + Detalle.RowClass + "'><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Interconsulta'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Cancelar Interconsulta'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.MedicoSolDesc + " </td><td> " + Detalle.EspecialidadInterDesc + " </td><td> " + Detalle.MedicoInterDesc + " </td><td> " + Detalle.Fecha + " </td><td> " + Detalle.Motivo + " </td></tr>";
            objConsultas[i] = Detalle;
            Total = Total + 1;
            i = i + 1;
        });

        var Pie = "</tbody></table>";
        $("#TablaInterconsultas").html(Encabezado + Contenido + Pie);
    }
}

function MedicosByEsp(Esp,Med) {
    var json = JSON.stringify({ "Especialidad": Esp });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Lista = Resultado.d;
            $("#cbo_Medico").empty();
            $("#cbo_Medico").append($("<option></option>").val("").html(""));
            $.each(Lista, function (index, Medico) {
                $("#cbo_Medico").append($("<option></option>").val(Medico.Id).html(Medico.Medico));
            });
        },
        complete: function () {
            $("#cbo_Medico").val(Med);
        },
        error: errores
    });
}

function Editar(Id) {
    Editando = 1;
    EditandoPos = Id;

    MedicosByEsp(objConsultas[Id].EspecialidadInter, objConsultas[Id].MedicoInter);
    $("#cbo_Especialidad").val(objConsultas[Id].EspecialidadInter);
    $("#cbo_MedicoSol").val(objConsultas[Id].MedicoSol);
    $("#txtFecha").val(objConsultas[Id].Fecha);
    $("#txtDiagnostico").val(objConsultas[Id].Motivo);
    $("#txtIndicacion").val(objConsultas[Id].Indicacion);
    if (objConsultas[Id].Estado == 1 || objConsultas[Id].Estado == 3){
        $("#controlchk_Cerrar").show();
        $("#txtIndicacion").val(objConsultas[Id].Observacion);
    }
    else $("#controlchk_Cerrar").hide();
    if (objConsultas[Id].Estado == 3) {
        $("#btnImprimir").show();
        $("#chk_Cerrar").attr("checked", "checked");
        $("#chk_Cerrar").attr("disabled", "disabled");
        $("#btnFinInter").attr("disabled", true);
        $("#txtFechaCierre").attr("disabled", true);
        $(".datos").attr("disabled",true);
    }
    else {
        $("#btnImprimir").hide();
        $("#chk_Cerrar").removeAttr("checked");
        $("#chk_Cerrar").removeAttr("disabled");
        $("#btnFinInter").removeAttr("disabled");
        $("#txtFechaCierre").removeAttr("disabled");
        $(".datos").removeAttr("disabled");
    }
    if (objConsultas[Id].Estado == 1) { $(".datos").attr("disabled", true); $("#btnFinInter").removeAttr("disabled"); $("#txtFechaCierre").removeAttr("disabled"); } //Inter Vista
}

function Eliminar(Id) {
    if (objConsultas[Id].Estado == 3) {alert("La interconsulta se encuentra finalizada y no puede ser cancelada.");return false;}
    if (objConsultas[Id].Estado == 1) {alert("La interconsulta ya fue vista y no puede ser cancelada.");return false;}
    if (objConsultas[Id].MedicoSol == Medico) {
        if (objConsultas[Id].Estado != 2) {
            var Interconsulta = {};
            Interconsulta.IdInterconsulta = objConsultas[Id].IdInterconsulta;
            Interconsulta.Estado = 2; //Cancelado
            Interconsulta.NroInternacion = objConsultas[Id].NroInternacion;
            Interconsulta.NHC = objConsultas[Id].NHC;
            Interconsulta.MedicoSol = Medico;
            Interconsulta.MedicoInter = objConsultas[Id].MedicoInter;
            Interconsulta.EspecialidadInter = objConsultas[Id].EspecialidadInter;
            Interconsulta.Fecha = objConsultas[Id].Fecha;
            Interconsulta.Motivo = objConsultas[Id].Motivo;
            Interconsulta.Indicacion = objConsultas[Id].Indicacion;
            var json = JSON.stringify({ "i": Interconsulta });
            $.ajax({
                type: "POST",
                data: json,
                url: "../Json/AtInternados/ListaPacientesInternados.asmx/Insert_PedidoInterconsulta",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Interconsulta_Guardada,
                error: errores
            });
        }
        else alert("La interconsulta ya se encuentra eliminada");
    }
    else alert("Sólo el Médico que realizó la interconsulta puede eliminarla");
}

function LimpiarCampos() {
    Editando = 0;
    EditandoPos = -1;
    $("#cbo_Medico").empty();
    $("#cbo_Especialidad").val('0');
    $("#txtFecha").val('');
    $("#txtDiagnostico").val('');
    $("#txtIndicacion").val('');
    $("#controlchk_Cerrar").hide();
    $("#chk_Cerrar").removeAttr("checked");
    $("#btnImprimir").hide();
    $("#btnFinInter").removeAttr("disabled");
    $("#txtFechaCierre").removeAttr("disabled");
    $(".datos").removeAttr("disabled");
}

$("#btnCancelar").click(function () {
    LimpiarCampos();
});


$("#btnImprimir").click(function () {
    var Pagina = "../Impresiones/ImpresionInterconsulta.aspx?Id=" + objConsultas[EditandoPos].IdInterconsulta;
    $.fancybox(
		{
		    'autoDimensions': false,
		    'href': Pagina,
		    'width': '100%',
		    'height': '100%',
		    'autoScale': false,
		    'transitionIn': 'none',
		    'transitionOut': 'none',
		    'type': 'iframe',
		    'hideOnOverlayClick': false,
		    'enableEscapeButton': false
		}
	        );
});

$("#btnVolver").click(function () {
    document.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + Internacion + "&B=" + objBusquedaLista;
});

$("#btnVolverAlPaciente").click(function () {
    document.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + Internacion + "&B=" + objBusquedaLista;
});

function CargarEncabezadoInternacion(I) {
    var json = JSON.stringify({ "Id": I });
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/CargarEncabezadoInternacion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarEncabezadoInternacion_Cargado,
        error: errores
    });
}

function CargarEncabezadoInternacion_Cargado(Resultado) {
    var Encabezado = Resultado.d;
    if (Encabezado != null) {
        $("#CargadoCama").html(Encabezado.cama);
        $("#CargadoServicio").html(Encabezado.servicio);
        $("#CargadoSala").html(Encabezado.sala);
    }
}