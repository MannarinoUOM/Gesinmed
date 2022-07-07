
var objBusquedaLista = "";
var IntID = 0;
var Ido = 0;
var IntIDo = 0;
var G_PaseId = 0;

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

    if (GET["Id"] != "" && GET["Id"] != null) {
        Id = GET["Id"];
        Ido = Id;
    }

    if (GET["IntId"] != "" && GET["IntId"] != null && GET["IntId"] != undefined) {

        IntID = GET["IntId"];
        IntIDo = IntID;
        CargarEncabezado();
        CargarMovimientos();
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
    self.locate = "ListaPacientesInternados.aspx?V=" + objBusquedaLista + "&B=" + objBusquedaLista;
}

$("#btnNueva").click(function () {
    EstadoBotones(true);
    LimpiarControles();
});

$("#btnCancelar").click(function () {
    EstadoBotones(false);
    LimpiarControles();
});

function LimpiarControles() {
    G_PaseId = 0;
    $("#txtDescripcion").val("");
    $("#btnEliminar").hide();
}


function CargarMovimientos() {
    var json = JSON.stringify({ "NroInternacion": IntIDo });
    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/PaseCama_List_by_NroInternacion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarMovimientos_Cargados,
        error: errores
    });
}

function CargarMovimientos_Cargados(Resultado) {
    var Evoluciones = Resultado.d;
    var Tabla_Datos = "";
    $("#TEvoluciones").empty();
    $.each(Evoluciones, function (index, pase) {
        Tabla_Datos = Tabla_Datos + "<tr onclick='javascript:CargarPase(" + pase.PaseCama_Id + ")'>";
        Tabla_Datos = Tabla_Datos + "<td></td><td><div id='divFecha" + pase.PaseCama_Id + "'>" + pase.PaseCama_Fecha + " hs.</div></td>";
        Tabla_Datos = Tabla_Datos + "<td>";
        Tabla_Datos = Tabla_Datos + "<div class='evolucionDato1'><div id='divDesc" + pase.PaseCama_Id + "' style='white-space: pre-wrap;'>" + pase.PaseCama_Desc + "</div></div>";
        Tabla_Datos = Tabla_Datos + "</td></tr>";
    });
    $("#TEvoluciones").html(Tabla_Datos);
}


function CargarPase(IdPase) {
    $("#txtDescripcion").val($("#divDesc" + IdPase).html());
    G_PaseId = IdPase;
    EstadoBotones(true);
}

function Validar() {
    if (IntID <= 0) { alert("Nro. de Internacion no valido."); return false; }
    if ($("#txtDescripcion").val().trim().length == 0) { alert("Ingrese Movimiento."); return false; }
    return true;
}

$("#btnGuardar").click(function () {
    if (!Validar()) return false;
    GuardarPase();
});

function CargarData(Alta) {
    objData = {};
    objData.PaseCama_Id = G_PaseId;
    objData.PaseCama_Desc = $("#txtDescripcion").val().trim().toUpperCase();
    objData.PaseCama_InternacionId = IntID;
    if (!Alta) objData.PaseCama_Baja = true; //Se elimina movimiento.
    return objData;
}

function GuardarPase() {
    var json = JSON.stringify({"objData": CargarData(true) });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/AtInternados/ListaPacientesInternados.asmx/PaseCama_Insert",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            CargarMovimientos();
            EstadoBotones(false);
        },
        error: errores
    });
}

function EstadoBotones(Estado) {
    if (!Estado) { //Estado Normal
        $(".ingreso").hide();
        $(".ingreso_botonera").hide();
        $("#txtEvolucion").val('');
        $("#btnNueva").show();
        $("#contenedor").css('height', '435px');
        $("#evoluciones").css('height', '425px');
        G_PaseId = 0;
    }
    else { //Edicion 
        $(".ingreso").show();
        $(".ingreso_botonera").show();
        $("#contenedor").css('height', '192px');
        $("#evoluciones").css('height', '190px');
        $("#divEvo").show();
        $("#btnNueva").hide();
        $("#btnGuardar").show();
    }
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
    //$('#fotopaciente').attr('src', '../img/Pacientes/' + Encabezado.NHC + '.jpg');
    $('#fotopaciente').attr('src', '../fotoPerfil/' + Encabezado.foto); 
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnEliminar").click(function () {
    if (confirm("¿Desea eliminar el movimiento seleccionado?")) {
        if (G_PaseId <= 0) { alert("Movimiento seleccionado no valido."); return false; }
        var json = JSON.stringify({ "objData": CargarData(false) });

        $.ajax({
            type: "POST",
            data: json,
            url: "../Json/AtInternados/ListaPacientesInternados.asmx/PaseCama_Insert",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                if (Resultado.d > 0) {
                    CargarMovimientos();
                    EstadoBotones(false);
                    alert("Movimiento eliminado.");
                }
                else alert("Error al eliminar movimiento.");
            },
            error: errores
        });
    }
});

$("#btnVolver").click(function () {
    document.location = "../AtInternados/ListaPacientesInternados.aspx?V=1&Int=" + IntID + "&B=" + objBusquedaLista;
});
