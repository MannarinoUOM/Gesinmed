var Internacion;
var Medico=0;
var objConsultas = new Array();
var Total = -1;
var Editando = 0;
var EditandoPos = -1;
var NHC;
var Hab;
var Cama;
var Serv;
var Id = 0;
var Existe = 0;
var objBusquedaLista = "";

$(document).ready(function () {
    var GET = {};

    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }
        GET[decode(arguments[1])] = decode(arguments[2]);
    });

    if (GET["Id"] != undefined && GET["Id"] != null) {
        Id = GET["Id"];
    }

    if (GET["IntId"] != undefined && GET["IntId"] != null) {
        UltimaHojaEnf_by_Int(GET["IntId"]);
        CargarEncabezadoInternacion(GET["IntId"]);
    }

    if (GET["NHC"] != undefined && GET["NHC"] != null) {
        NHC = GET["NHC"];
        CargarPacienteID(GET["NHC"]);
        $("#afiliadoId").val(NHC);
        Internacion = GET["IntId"];
        Medico = GET["MedicoId"];
        $("#txtFecha").val(FechaActual());
    }

    if (GET["B"] != undefined && GET["B"] != null) {
        objBusquedaLista = GET["B"];
    }

    List_Medicos();
    $("#txtFecha").datepicker();
    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
});


function UltimaHojaEnf_by_Int(Int) {
    var json = JSON.stringify({ "IdInternacion": Int });
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/UltimaHojaEnf_by_Int",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            Id = Resultado.d;
            if (Id > 0) LoadHoja();
            else CargarUltimaIMbyNHC();
        },
        error: errores
    });
}


function LoadHoja() {
    var json = JSON.stringify({"Id": Id});
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/Hoja_Enfermeria_List_Cab_byId",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadHoja_Cargado,
        error: errores
    });
}

function LoadHoja_Cargado(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Item) {
        //$("#txtNHC").attr('value', Item.NHC);
        CargarPacienteID(Item.NHC);
        $("#CargadoCama").html(Item.Cama);
        $("#CargadoServicio").html(Item.Servicio);
        $("#CargadoSala").html(Item.Sala);
        $("#CargadoMedico").html(Item.Medico);
        $("#cbo_Medico").val(Item.MedicoId);
        Medico = Item.MedicoId;
        Hab = Item.IdSala;
        Cama = Item.IdCama;
        Serv = Item.IdServicio;
        $("#txtFecha").val(Item.Fecha);
        LoadDetalles();
        Existe = 1;
    });

}

function LoadDetalles() {
    var json = JSON.stringify({ "Id": Id });
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/Hoja_Enfermeria_List_Det_byId",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: LoadDetalles_Cargado,
        error: errores
    });
}

function LoadDetalles_Cargado(Resultado) {
    //alert();
    var Detalles = Resultado.d;
    if (Detalles.length > 0) {
        var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Indicacion</th><th>Cada(Hs.)</th><th>Observaciones</th><th>Realizado</th></tr></thead><tbody>";
        var Contenido = "";
        var i = 0;
        $.each(Detalles, function (index, Detalle) {
            Realizado = "";
            if (Detalle.Realizado) Realizado = "checked";
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Indicacion + " </td><td> " + Detalle.Frecuencia + " </td><td> " + Detalle.Observaciones + " </td><td> " + "<input id='chk_OK" + i + "' type='checkbox' " + Realizado + " disabled>" + " </td></tr>";
            Detalle.Estado = 1;
            objConsultas[i] = Detalle;
            Total = Total + 1;
            i = i + 1;
        });
        var Pie = "</tbody></table>";
        $("#TablaInterconsultas").html(Encabezado + Contenido + Pie);
        $("#btnImprimir").show();
    }
    else $("#TablaInterconsultas").empty();
}

function imgErrorPaciente(image) {
    image.onerror = "";
    image.src = "../img/silueta.jpg";
    return true;
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

function CargarEncabezadoInternacion(I) {
    var json = JSON.stringify({ "Id": I});
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
        Hab = Encabezado.salaid;
        Cama = Encabezado.camaid;
        Serv = Encabezado.servicioid;
    } 
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
        $("#CargadoApellido").html(paciente.Paciente);
        $("#CargadoTelefono").html(paciente.Telefono);
        $("#afiliadoId").val(paciente.documento);
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
    $.each(Lista, function (index, MedicoItem) {
        $("#cbo_Medico").append($("<option></option>").val(MedicoItem.Id).html(MedicoItem.Medico));
        if (Medico == MedicoItem.Id) $("#cbo_Medico").val(Medico);
    });

}

function CargarUltimaIMbyNHC() {
    var json = JSON.stringify({ "NHC": NHC });
    $.ajax({
        type: "POST",
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/UltimaIMbyNHC",
        data: '{NHC: "' + NHC + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarUltimaIMbyNHC_Cargado,
        error: errores
    });
}

function CargarUltimaIMbyNHC_Cargado(Resultado) {

    var Detalles = Resultado.d;
    if (Detalles.length > 0) {
        var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Indicacion</th><th>Cada(Hs.)</th><th>Observaciones</th><th>Realizado</th></tr></thead><tbody>";
        var Contenido = "";
        var i = 0;
        $.each(Detalles, function (index, Detalle) {
            Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Indicacion + " </td><td> " + Detalle.Frecuencia + " </td><td> " + Detalle.Observaciones + " </td><td> " + "<input id='chk_OK" + i + "' type='checkbox' disabled>" + " </td></tr>";
            Detalle.Enfermera = 0;
            Detalle.Realizado = false;
            Detalle.Estado = 1;
            Detalle.Observaciones = "";
            objConsultas[i] = Detalle;
            Total = Total + 1;
            i = i + 1;
        });
        var Pie = "</tbody></table>";
        $("#TablaInterconsultas").html(Encabezado + Contenido + Pie);
    }
    else $("#TablaInterconsultas").empty();
}

function Editar(Id) {
    Editando = 1;
    EditandoPos = Id;
    $("#Indicacion").val(objConsultas[EditandoPos].Indicacion);
    $("#txtHoras").val(objConsultas[EditandoPos].Frecuencia);
    if (objConsultas[EditandoPos].EnHoras)
        $("#chk_Horas").attr("checked", true);
    else $("#chk_Horas").removeAttr("checked");
    if (objConsultas[EditandoPos].Realizado)
        $("#chk_Realizado").attr("checked", true);
    else $("#chk_Realizado").removeAttr("checked");
    $("#Observaciones").val(objConsultas[EditandoPos].Observaciones);
    if (objConsultas[EditandoPos].Enfermera == 0) {
        $("#Indicacion").attr("disabled", true);
        $("#txtHoras").attr("disabled", true);
        $("#chk_Horas").attr("disabled", true);
    }
    else {
        $("#Indicacion").removeAttr("disabled");
        $("#txtHoras").removeAttr("disabled");
        $("#chk_Horas").removeAttr("disabled");
    }
}

function Eliminar(Id) {
    if (objConsultas[Id].Enfermera == 1) {
        objConsultas[Id].Estado = 0;
        objConsultas = $.grep(objConsultas, function (value) {
            return value.Estado != 0;
        });
        RenderizarTabla();
        Total = Total - 1;
        
    }
    else alert("No se puede eliminar este registro");
}

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

function Validar() {
    if ($("#Indicacion").val().trim().length == 0) { alert("Ingrese Indicación."); return false; }
    if ($("#txtHoras").val().trim().length == 0) {$("#txtHoras").val('0'); }
    return true;
}

$("#btnAgregar").click(function () {
    if (!Validar()) return false;
    var Item = {};
    var i = 0;
    if (Editando != 1) {
        Total = Total + 1;
        i = Total;
        Item.Enfermera = 1;
    }
    else {
        i = EditandoPos;
        Item.Enfermera = objConsultas[i].Enfermera;
        Item.IdInsumo = objConsultas[i].IdInsumo;
    }
    Item.Indicacion = $("#Indicacion").val().trim().toUpperCase();
    Item.Frecuencia = parseInt($("#txtHoras").val());
    if (Item.Frecuencia > 0) Item.EnHoras = true;
    else { Item.EnHoras = false; Item.Frecuencia = 0; }
    if ($("#chk_Realizado").is(":checked")) Item.Realizado = true;
    else Item.Realizado = false;
    Item.Observaciones = $("#Observaciones").val().trim().toUpperCase();
    Item.Estado = 1;
    objConsultas[i] = Item;
    RenderizarTabla();
    LimpiarCampos();
});

function RenderizarTabla() {
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th></th><th>Indicacion</th><th>Cada(Hs.)</th><th>Observaciones</th><th>Realizado</th></tr></thead><tbody>";
        var Contenido = "";
        var i = 0;
        $.each(objConsultas, function (index, Detalle) {
            if (Detalle.Estado != 0) {
                Realizado = "";
                if (Detalle.Realizado) Realizado = "checked";
                Contenido = Contenido + "<tr><td><a id='Editar" + i + "' onclick='Editar(" + i + ");' class='btn btn-mini' rel='tooltip' title='Editar'><i class='icon-edit'></i></a><a id='Elminar" + i + "'onclick='Eliminar(" + i + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Quitar'><i class='icon-remove-circle icon-white'></i></a></td><td> " + Detalle.Indicacion + " </td><td> " + Detalle.Frecuencia + " </td><td>" + Detalle.Observaciones + "</td><td> " + "<input id='chk_OK" + i + "' type='checkbox' " + Realizado + " disabled>" + " </td></tr>";
                i = i + 1;
            }
        });
        var Pie = "</tbody></table>";
        $("#TablaInterconsultas").html(Encabezado + Contenido + Pie);
    }

    function LimpiarCampos() {
        Editando = 0;
        EditandoPos = -1;
        $("#Indicacion").val('');
        $("#txtHoras").val('');
        $("#chk_Horas").removeAttr("checked");
        $("#chk_Realizado").removeAttr("checked");
        $("#Observaciones").val('');
        $("#Indicacion").removeAttr("disabled");
        $("#txtHoras").removeAttr("disabled");
        $("#chk_Horas").removeAttr("disabled");
        $("#Indicacion").focus();
    }


    $("#btnCancelar").click(function () {
        LimpiarCampos();
    });

    $("#btnConfirmar").click(function () {
        if (Existe == 0) {
            var h = {};
            h.NHC = $("#afiliadoId").val();
            h.IdSala = Hab;
            h.IdCama = Cama;
            h.IdServicio = Serv;
            h.Fecha = $("#txtFecha").val();
            h.IdInternacion = Internacion;
            //h.MedicoId = Medico;
            h.MedicoId = $("#cbo_Medico :selected").val();
            var json = JSON.stringify({ "h": h });
            $.ajax({
                type: "POST",
                url: "../Json/AtInternados/ListaPacientesInternados.asmx/Hoja_Enfermeria_InsertCab",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Hoja_Enfermeria_InsertCab_Cargado,
                error: errores
            });
        }
        else DeleteDetalles();
    });

    function DeleteDetalles() {
        var json = JSON.stringify({ "Id": Id });
        $.ajax({
            type: "POST",
            url: "../Json/AtInternados/ListaPacientesInternados.asmx/Hoja_Enfermeria_Delete_Det",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: DeleteDetalles_Cargado,
            error: errores
        });
    }

    function DeleteDetalles_Cargado() {
        InsertDetalles();
    }

    function InsertDetalles() {
        var json = JSON.stringify({ "objConsultas": objConsultas, "IdHoja": Id });
        $.ajax({
            type: "POST",
            url: "../Json/AtInternados/ListaPacientesInternados.asmx/Hoja_Enfermeria_InsertDet",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Hoja_Enfermeria_InsertDet_Cargado,
            error: errores
        });
    }

    function Hoja_Enfermeria_InsertCab_Cargado(Resultado) {
        Id = Resultado.d;
        if (Id > 0) {
            var json = JSON.stringify({ "objConsultas": objConsultas, "IdHoja": Id });
            $.ajax({
                type: "POST",
                url: "../Json/AtInternados/ListaPacientesInternados.asmx/Hoja_Enfermeria_InsertDet",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: Hoja_Enfermeria_InsertDet_Cargado,
                error: errores
            });
        }
    }

    function Hoja_Enfermeria_InsertDet_Cargado(Resultado) {
        Id = Resultado.d;
        if (Id > 0) {
            Imprimir(Id);
        }
        else alert('Error al Guardar Hoja');
    }

    function Imprimir(r) {
       // alert(Medico);
        // return false;                                                                     $("#cbo_Medico").val();
        var Pagina = "../Impresiones/ImpresionHojaEnfermeria.aspx?Id=" + r + "&medicoId=" + Medico;
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
		    'enableEscapeButton': false,
		    'onClosed': function () {
		        //window.location = "../AtInternados/ListaPacientesInternados.aspx";
		        document.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + Internacion + "&B=" + objBusquedaLista;
		    }
		}
	        );
}

$("#btnImprimir").click(function () {
    if (Id > 0)
    Imprimir(Id);
});

$("#btnVolver").click(function () {
    document.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + Internacion + "&B=" + objBusquedaLista;
});

$("#btnVolverAlPaciente").click(function () {
    document.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + Internacion + "&B=" + objBusquedaLista;
});