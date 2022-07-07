var Id = 0;
var objBusquedaLista = "";
var IntID = 0;
var MedicoId = 0;
var CamaId = 0;
var SalaId = 0;
var Fecha = "";
var Ido = 0;
var IntIDo = 0;
var Medico = 0;
var guardado = 0;

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

var selected = [];
$("#btnImprimir").click(function () {

    $("#txt_lineas").val("");
    $("#btn_lineas").html("Imprimir en la linea...");
    selected = [];
    $('#TEvoluciones input:checked').each(function () {
        selected.push($(this).data("evoid"));
    });

    if (selected.length <= 0) {
        alert("Falta seleccionar alguna impresión.");
        return false;
    }

    $("#myModalImpresion").modal('show');
});


$(document).ready(function () {
    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["Id"] != "" && GET["Id"] != null) {
        Id = GET["Id"];
        Ido = Id;
    }

    if (GET["MedicoId"] != "" && GET["MedicoId"] != null && GET["MedicoId"] > 0) {
        MedicoId = GET["MedicoId"];
        CargarEspecialidad(MedicoId);
    }
    else {
        alert("Médico no válido.");
        return false;
    }

    if (GET["IntID"] != "" && GET["IntID"] != null && GET["IntID"] != undefined) {

        IntID = GET["IntID"];
        IntIDo = IntID;
        CargarEncabezado();
        CargarEvoluciones();
    }
    else {
        alert("Internación no válida.");
        return false;
    }

    if (GET["B"] != "" && GET["B"] != null) {
        objBusquedaLista = GET["B"];
    }

});

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
    $.each(Paciente, function (index, paciente) {

        $("#txt_dni").prop("readonly", true);
        $("#txtNHC").prop("readonly", true);

        $("#CargadoEdad").html(paciente.Edad_Format);
        $("#afiliadoId").val(paciente.documento);
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoTelefono").html(paciente.Telefono);
        if (paciente.Nro_Seccional != 998)
            $("#CargadoSeccional").html(paciente.Seccional);
        else $("#CargadoSeccional").html(paciente.ObraSocial);
        $("#CargadoDNI").html(paciente.documento_real);
        $("#CargadoNHC").html(paciente.NHC_UOM);
    });

}

function volver() {
    self.locate = "ListaPacientesInternados.aspx?V="+objBusquedaLista + "&B=" + objBusquedaLista;
}

$("#btnIngeso").click(function () {
    var Pagina = "../Impresiones/Impresion_Ingreso.aspx?Id=" + IntID + " ";

    Pagina = Pagina.slice(0, -1);
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

$("#btnNueva").click(function () {
    $("#txtEvolucion").val("");
    $(".ingreso").show();
    $(".ingreso_botonera").show();
    $("#txtEvolucion").removeAttr("disabled");
    $("#contenedor").css('height', '192px');
    $("#evoluciones").css('height', '190px');
    $("#cbo_Especialidad").val("0");
    $("#btnNueva").hide();
    $("#btnEliminar").hide();
    Id = 0;
});

$("#btnCancelar").click(function () {
    $("#txtEvolucion").val("");
    $(".ingreso").hide();
    $(".ingreso_botonera").hide();
    $("#contenedor").css('height', '435px');
    $("#evoluciones").css('height', '425px');
    $("#cbo_Especialidad").val("0");
    $("#btnNueva").show();
    Id = 0;
});


function CargarEvoluciones() {
    var json = JSON.stringify({
        "Id": Ido,
        "Internacion": IntIDo,
        "MedicoId": MedicoId
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/BuscarEvolucion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarEvoluciones_Cargados,
        error: errores
    });
}

function CargarEvoluciones_Cargados(Resultado) {
    var Evoluciones = Resultado.d;
    
    var Tabla_Datos = "";
    var primer_id = "";
    var click = "";
    var check = "";
    $("#TEvoluciones").empty();
    $.each(Evoluciones, function (index, evo) {
        if (primer_id == "") {
            primer_id = evo.EId;
        }

        if (evo.internacionid == 0) { click = " onclick =ImprimirEspecialista(" + evo.EId + ")"; check = ""; }
        else {
            click = " onclick = 'javascript:CargarIdEvoluciones(" + evo.EId + ")'";
            check = " <input type='checkbox' id='evo_id_" + evo.EId + "' data-evoid='" + evo.EId + "' /> ";
        }

        Tabla_Datos = Tabla_Datos + "<tr>";
        Tabla_Datos = Tabla_Datos + "<td>" + check + "</td>";
        Tabla_Datos = Tabla_Datos + "<td" + click + "><div>" + evo.ff + "</div><div class='evolucionDato2'>" + evo.hh + "</div></td>";
        Tabla_Datos = Tabla_Datos + "<td" + click + ">";
        Tabla_Datos = Tabla_Datos + "<div class='evolucionDato1'>" + evo.medico + "</div>";
        Tabla_Datos = Tabla_Datos + "<div class='evolucionDato2'><div style='white-space: pre-wrap;'>" + evo.evoluciones + "</div></div>";
        Tabla_Datos = Tabla_Datos + "</td></tr>";
    });

    $("#TEvoluciones").html(Tabla_Datos);
    if (guardado == 1) {
        guardado = 0;
        $("#evo_id_" + primer_id).attr('checked', true);      
    }
}

//IMPRESION PRACTICA ESPECIALISTA
function ImprimirEspecialista(Id) {
    $.fancybox({
        'autoDimensions': false,
        'href': "../Impresiones/At_Int_Impresion_PracticaEspecialista.aspx?ID=" + Id,
        'width': '100%',
        'height': '100%',
        'autoScale': false,
        'transitionIn': 'none',
        'transitionOut': 'none',
        'type': 'iframe',
        'hideOnOverlayClick': false,
        'enableEscapeButton': false
    });
}
//IMPRESION PRACTICA ESPECIALISTA

function Validar() {
    if ($("#txtEvolucion").val().trim().length == 0) { alert("Ingrese Evolución."); return false; }
    //if ($("#cbo_Especialidad :selected").val() == "0") { alert("Ingrese Especialidad."); return false; }
    if (MedicoId <= 0 || Medico == null) { alert("Médico no válido."); return false; }
    if (IntID == null || IntID <= 0) { alert("Internación no válida."); return false; }
    return true;
}

$("#btnGuardar").click(function () {
    if (!Validar()) return false;
    guardado = 1;
    GuardarEvoluciones();
});

function GuardarEvoluciones() {
    var json = JSON.stringify({
        "Internacion": IntID,
        "medicoid": MedicoId,
        "evolucion": $("#txtEvolucion").val().trim().toUpperCase(), 
        "EvolucionId": Id,
        "Fecha": Fecha,
        "Especialidad": 161
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/GuardarEvolucion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            CargarEvoluciones();
            $(".ingreso").hide();
            $(".ingreso_botonera").hide();            
            $("#txtEvolucion").val('');
            $("#cbo_Especialidad").val('0');
            Id = 0;
            $("#btnNueva").show();
            $("#contenedor").css('height', '435px');
            $("#evoluciones").css('height', '425px');
        },
        error: errores
    });
}  


function CargarEncabezado() {
    var json = JSON.stringify({
        "Id": IntID
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/CargarEncabezadoInternacion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarEncabezado_Cargados,
        error: errores
    });
}  


function CargarEncabezado_Cargados(Resultado) {
    var Encabezado = Resultado.d;
    $("#afiliadoId").val(Encabezado.NHC);
    CargarPacienteID(Encabezado.NHC);
    $("#SPaciente").html(Encabezado.paciente);
    $("#CargadoDNI").html(Encabezado.dni);
    $("#SSala").html(Encabezado.sala);
    $("#SCama").html(Encabezado.cama);
    $("#SServicio").html(Encabezado.servicio);
    //alert(Encabezado.foto);
    $('#fotopaciente').attr('src', '../fotoPerfil/' + Encabezado.foto);
    
    evolucion = "";
    HNC = 0;    
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function imgErrorMedico(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
}

$("#btnEliminar").click(function () {
    var json = JSON.stringify({
        "Id": Id
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/EliminarEvolucion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            CargarEvoluciones();
            $(".ingreso").hide();
            $(".ingreso_botonera").hide();
            $("#txtEvolucion").val('');
            Id = 0;
            $("#cbo_Especialidad").val('0');
            $("#btnNueva").show();
            $("#contenedor").css('height', '435px');
            $("#evoluciones").css('height', '425px');
        },
        error: errores
    });
});

function CargarIdEvoluciones(Ids) {
   var q = 0;
   Id = Ids;
    var json = JSON.stringify({
        "Id": Ids,
        "Internacion": q,
        "MedicoId": MedicoId
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/BuscarEvolucion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarIdEvoluciones_Cargados,
        error: errores
    });
}

function CargarIdEvoluciones_Cargados(Resultado) {

    var Evoluciones = Resultado.d;

    var Tabla_Datos = "";

    $.each(Evoluciones, function (index, evo) {
        //alert(evo.evoEspecialista.evolucion);
        $("#evolucionEspecialista").val(evo.evoEspecialista.evolucion);
        $("#txtEspecialista").val(evo.evoEspecialista.usuarioName);
        $("#txtEspecialidad").val(evo.evoEspecialista.especialidad);
        $("#txtFecha").val(evo.evoEspecialista.fecha);

        Fecha = evo.fecha;
        $("#txtEvolucion").val(evo.evoluciones);
        $("#cbo_Especialidad").val(evo.especialidadId);
        Medico = evo.medicoid;
        if (evo.Editable) { $(".ingreso_botonera").show(); $(".ingreso").show(); $(".ingreso_cancelar").show(); $("#btnEliminar").show(); $("#txtEvolucion").removeAttr("disabled"); }
        else { $(".ingreso_botonera").show(); $(".ingreso").hide(); $("#divEvo").show(); $(".ingreso_cancelar").show(); } //$("#txtEvolucion").attr("disabled", true); }
        CargarMedicosEsp();
    });
    
    $("#contenedor").css('height', '192px');
    $("#evoluciones").css('height', '190px');
     
}

function CargarEspecialidad(MedicoId) {
    var json = JSON.stringify({"MedicoId": MedicoId, "Tipo":"I"});
    $.ajax({
        type: "POST",
        url: "../Json/Turnos/DiasAtencionEdicion.asmx/Especialidades_que_Atiende_el_Medico_por_Tipo",
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
        $("#cbo_Especialidad").append($("<option></option>").val(Especialidad.EspecialidadId).html(Especialidad.Especialidad));
    });
}

function CargarMedicosEsp() {
    $("#cbo_Medico").empty();
    var json = JSON.stringify({ "Especialidad": $("#cbo_Especialidad :selected").val() });
    $.ajax({
        type: "POST",
        url: "../Json/DarTurnos.asmx/Medico_Lista_por_Especialidad",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: MedicosporEsp_Cargado,
        complete: function () {
            $("#cbo_Medico").val(MedicoId);
        },
        error: errores
    });
}

$("#cbo_Especialidad").change(function () {
    $("#cbo_Medico").empty();
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

function MedicosporEsp_Cargado(Resultado) {
    var Lista = Resultado.d;
    $("#cbo_Medico").empty();
    $("#cbo_Medico").append($("<option></option>").val("0").html(''));
    $.each(Lista, function (index, Med) {
        $("#cbo_Medico").append($("<option></option>").val(Med.Id).html(Med.Medico));
        if (Medico == Med.Id) $("#cbo_Medico").val(Medico);
    });
}

$("#btnVolver").click(function () {
    document.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + IntID + "&B=" + objBusquedaLista;
});


$("#btn_1_cuarto").click(function () {
    Impresion(0);
});

$("#btn_2_cuarto").click(function () {
    Impresion(17);
});

$("#btn_3_cuarto").click(function () {
    Impresion(34);
});

$("#btn_4_cuarto").click(function () {
    Impresion(52);
});

$("#btn_lineas").click(function () {
    if ($("#txt_lineas").val() == "") {
        alert("Falta cargar el número de lineas.");
        $("#txt_lineas").focus();
        return;
    }
    else {
        Impresion($("#txt_lineas").val());
    }
});


function Impresion(Lineas) {

    var encabezado = "0";
    if ($("#ck_encabezado").is(':checked')) { encabezado = "1"; }    

    Pagina = "../Impresiones/At_Int_ImpresionEvolucion_ids.aspx?lineas=" + Lineas + "&Ids=" + selected + "&encabezado=" + encabezado + "&MedicoId=" + MedicoId;
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

}


$("#txt_lineas").keyup(function () {
    CambiarMensajeBoton();
});


$("#txt_lineas").change(function () {
    CambiarMensajeBoton();
});

function CambiarMensajeBoton() {
    $("#btn_lineas").html("Imprimir en la linea " + $("#txt_lineas").val());
}