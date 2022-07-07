
var Medico = 0;
var Esp = 0;
var objConsultas = new Array();
var Total = -1;
var Editando = 0;
var EditandoPos = -1;
var InterID = -1;
var Open = 0;

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

$(document).ready(function () {
    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["Med"] != "" && GET["Med"] != null) {
        Medico = GET["Med"];
        Esp = GET["Esp"];
        InterID = GET["IDInter"];
        Open = 1;
    }
    CargarMedicos();
    CargarEspecialidad(0);
});

function CargarMedicos() {
    $.ajax({
        type: "POST",
        url: "../Json/AtConsultorio/AtConsultorio.asmx/Medicos_Por_Usuarios",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Medicos = Resultado.d;
            $('#cbo_Medico').empty();
            $.each(Medicos, function (index, medico) {
                $('#cbo_Medico').append(
              $('<option></option>').val(medico.Id).html(medico.Medico)
            );
            });
        },
        complete: function () {
            if (Medico > 0) $('#cbo_Medico').val(Medico);
            CargarEspecialidad($('#cbo_Medico :selected').val());
        },
        error: errores
    });
}


function CargarEspecialidad(MedicoId) {
    var json = JSON.stringify({"MedicoId": MedicoId, "Tipo": "I"});
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/DiasAtencionEdicion.asmx/Especialidades_que_Atiende_el_Medico_por_Tipo",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var Especialidad = Resultado.d;
            $('#cbo_Especialidad').empty();
            $('#cbo_Especialidad').append($('<option></option>').val("0").html("TODAS"));
            $.each(Especialidad, function (index, especialidades) {
                $('#cbo_Especialidad').append(
                  $('<option></option>').val(especialidades.EspecialidadId).html(especialidades.Especialidad)
                );
            });
        },
        complete: function () {
            if (Esp > 0) $('#cbo_Especialidad').val(Esp);
            List_Interconsultas($("#cbo_Medico :selected").val(), $('#cbo_Especialidad :selected').val());
        },
        error: errores
    });
}


function List_Medicos() {
    var json = JSON.stringify({ "Apellido": null, "MN": null, "MP": null, "objBusquedaLista": null });
    $.ajax({
        type: "POST",
        url: "../Json/Medicos.asmx/MedicoBuscar",
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
    });
}

$("#cbo_Especialidad").change(function () {
    List_Interconsultas($("#cbo_Medico :selected").val(), $('#cbo_Especialidad :selected').val());
});

$("#cbo_Medico").change(function () {
    List_Interconsultas($("#cbo_Medico :selected").val(), $('#cbo_Especialidad :selected').val());
    CargarEspecialidad($("#cbo_Medico :selected").val());
});

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#btnConfirmar").click(function () {
    var Interconsulta = {};
    if (Editando != 0) {
        if (objConsultas[EditandoPos].Estado != 3) {
            Interconsulta.IdInterconsulta = objConsultas[EditandoPos].IdInterconsulta;
            Interconsulta.Estado = 1; //Visto
            Interconsulta.NHC = objConsultas[EditandoPos].NHC;
            Interconsulta.MedicoSol = objConsultas[EditandoPos].MedicoSol;
            Interconsulta.Fecha = objConsultas[EditandoPos].Fecha;
            Interconsulta.MedicoInter = objConsultas[EditandoPos].MedicoInter;
            Interconsulta.EspecialidadInter = objConsultas[EditandoPos].EspecialidadInter;
            Interconsulta.NroInternacion = objConsultas[EditandoPos].NroInternacion;
            Interconsulta.Observacion = $("#txt_Observacion").val().trim().toUpperCase();
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
        else alert("La interconsulta ya fue cerrada");
    }
});

function Interconsulta_Guardada() {
    alert("Interconsulta Guardada Correctamente");
    LimpiarCampos();
    List_Interconsultas($("#cbo_Medico :selected").val(), $('#cbo_Especialidad :selected').val());
}

function List_Interconsultas(MedicoId, Esp) {
    if (MedicoId == undefined || Esp == undefined) return false;
    var json = JSON.stringify({ "NHC": 0, "Medico": MedicoId, "Especialidad": Esp });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/Interconsultas_by_NHC",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Interconsultas_Load,
        complete: function () {
            if (InterID > 0 && Open == 1) { ver_menu(InterID); Open = 0; }
        },
        error: errores
    });
}

function ver_menu(Intercon) {
    var Id = $("#Index" + Intercon).html();
    CargarPacienteID($("#NHC" + Id).html());
    InterID = $("#IDInter" + Id).html();
    $(".hsuper_menu").toggleClass("hsuper_menu_Accion");
    $(".hsuper_menu").css("margin-left", "-10px");
    Editando = 1;
    EditandoPos = Id;
    $("#txt_Observacion").removeAttr("disabled");
    $("#txt_Observacion").val(objConsultas[Id].Observacion);
    $("#txt_Observacion").focus();
    if (objConsultas[Id].Estado == 3)
        $("#btnImprimir").show();
    else $("#btnImprimir").hide();
}

function List_Interconsultas_Load(Resultado) {
    var Interconsultas = Resultado.d;
    $("#TInterconsultas").empty();
    var Encabezado = "";
    var Contenido = "";
    if (Interconsultas.length > 0) {
        var i = 0;
        $.each(Interconsultas, function (index, Detalle) {
            Contenido = Contenido + "<tr onclick='Editar(" + i + ")' class='" + Detalle.RowClass + "'><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar Interconsulta'><i class='icon-edit'></i></a></td><td style='display:none;' id='IDInter" + i + "'>" + Detalle.IdInterconsulta + "</td><td> " + Detalle.MedicoSolDesc + " </td><td> " + Detalle.EspecialidadInterDesc + " </td><td> " + Detalle.Fecha + " </td><td> " + Detalle.Motivo + " </td><td id='NHC" + i + "' style='display:none;'>" + Detalle.NHC + "</td><td id='Index" + Detalle.IdInterconsulta + "' style='display:none;'>" + i + "</td></tr>";
            objConsultas[i] = Detalle;
            Total = Total + 1;
            i = i + 1;
        });
    }
    $("#TInterconsultas").html(Contenido); 
}

$("#btnCerrar").click(function () {
    $(".hsuper_menu").removeClass("hsuper_menu_Accion");
    $(".hsuper_menu").css("margin-left", "900px");
});

function Editar(Id) {
    CargarPacienteID($("#NHC" + Id).html());
    InterID = $("#IDInter" + Id).html();
    $(".hsuper_menu").toggleClass("hsuper_menu_Accion");
    $(".hsuper_menu").css("margin-left", "-10px");
    Editando = 1;
    EditandoPos = Id;
    $("#txt_Observacion").removeAttr("disabled");
    $("#txt_Observacion").val(objConsultas[Id].Observacion);
    $("#txt_Observacion").focus();
    if (objConsultas[Id].Estado == 3)
        $("#btnImprimir").show();
    else $("#btnImprimir").hide();
}

function HC() {
    self.location = "../HistoriaClinica/HistoriaClinica.aspx?NHC=" + $("#afiliadoId").val() + "&InterID=" + InterID + "&Med=" + $("#cbo_Medico :selected").val() + "&Esp=" + $("#cbo_Especialidad :selected").val();
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

        $("#CargadoApellido").html(paciente.Paciente);

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#afiliadoId").val(paciente.documento);

        $("#CargadoNHC").html(paciente.NHC_UOM);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#CargadoSeccional").html(paciente.Seccional);
        $('#fotopaciente').attr('src', '../img/Pacientes/' + paciente.documento + '.jpg');

    });

}



function LimpiarCampos() {
    Editando = 0;
    EditandoPos = -1;
    $("#txt_Observacion").val('');
    $("#txt_Observacion").attr("disabled", "disabled");
    $("#btnImprimir").hide();
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

                    