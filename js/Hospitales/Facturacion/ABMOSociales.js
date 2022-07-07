var Estado = 1;
var Editando = 0;


function ListarPracticas() {
    var json = JSON.stringify({ "Descripcion": $('#txtPracticas').val().trim(), "Codigo": $("#txtCodigo").val() });
    $.ajax({
        type: "POST",
        url: "../Json/ObraSocial/ObraSocial.asmx/OS_Listar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: ObrasSociales_Listadas,
        error: errores
    });
}

$("#btn_Buscar").click(function () {
    $("#TablaPracticas").empty();
    ListarPracticas();
});


$("#btn_Cancelar").click(function () {
    //$("#btnAgregarPractica").hide();
    $("#TablaPracticas").empty();
    LimpiarCampos();
});

$("#btnAgregarPractica").click(function () {
    Guardar();
});


$("#btn_Nuevo").click(function () {
    Nueva_ObraSocial();
});



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$(document).ready(function () {
    InitControls();
});

function InitControls() {
    $("#txtCodigoEdicion").mask("9?999999", { placeholder: "-" });
    $("#txtCUIT").mask("9999999999?9", { placeholder: "-" });
    $("#txtCodigo").mask("9?999999", { placeholder: "-" });
}

function ObrasSociales_Listadas(Resultado) {
    var Practicas = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";
    var SobreTurno = false;
    var i = 0;

    $("#Resultado").empty();
    $("#TablaPracticas").empty();

    Tabla_Titulo = "<table id='TablaPracticas' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Código</th><th>Obra Social</th><th>CUIT</th><th>Dirección</th><th>Estado</th></tr></thead><tbody>";
    $.each(Practicas, function (index, practicas) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + " onclick=Editar(" + practicas.id + ");";
        var _estado = "Si";
        if (practicas.Estado == "N") _estado = "No";
        Tabla_Datos = Tabla_Datos + "><td id='Codigo" + practicas.id + "'>" + practicas.id + "</td><td id='Descripcion" + practicas.id + "'>" + practicas.OS + "</td><td id='CUIT" + practicas.id + "'>" + practicas.CUIT + "</td><td id='DIRECCION" + practicas.id + "'>" + practicas.Direccion + "</td><td id='Activa" + practicas.id + "'>" + _estado + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#Resultado").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function Editar(PracticaId) {
    Editando = PracticaId;
    //$("#btnAgregarPractica").show();
    $("#txtCodigoEdicion").val($("#Codigo" + PracticaId).html());
    $("#txtPracticaEdicion").val($("#Descripcion" + PracticaId).html());
    $("#txtCUIT").val($("#CUIT" + PracticaId).html());
    $("#txtDireccion").val($("#DIRECCION" + PracticaId).html());
    

    $("#btnOcularPractica").show();

    if ($("#Activa" + PracticaId).html() == 'A') {
        $("#btnOcularPractica").removeClass("btn-success");
        $("#btnOcularPractica").removeClass("btn-danger");
        $("#btnOcularPractica").addClass("btn-success");
        $("#btnOcularPractica").html("Obra Social Activa");
        Estado = 1;
    }
    else {
        $("#btnOcularPractica").html("Obra Social <b>NO</b> Activa");
        $("#btnOcularPractica").removeClass("btn-success");
        $("#btnOcularPractica").removeClass("btn-danger");
        $("#btnOcularPractica").addClass("btn-danger");
        Estado = 0;

    }

}

function LimpiarCampos() {
    Editando = 0;
    $("#btnOcularPractica").hide();
    $("#txtCodigoEdicion").val('');
    $("#txtPracticaEdicion").val('');
    $("#txtCUIT").val('');
    $("#txtDireccion").val('');
    $("#btnOcularPractica").removeClass("btn-success");
    $("#btnOcularPractica").removeClass("btn-danger");
    $("#btnOcularPractica").html("");
    Estado = 0;
}


function Guardar() {
    if ($("#txtPracticaEdicion").val().trim().length > 0) {
        var json = JSON.stringify({ "Descripcion": $('#txtPracticaEdicion').val().trim().toUpperCase(), "Codigo": $('#txtCodigoEdicion').val().trim(), "Estado": Estado, "CUIT": $("#txtCUIT").val(), "Direccion": $("#txtDireccion").val().trim().toUpperCase(), "Editando": Editando });
        $.ajax({
            type: "POST",
            url: "../Json/ObraSocial/ObraSocial.asmx/ObraSocial_Nueva",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Practicas_Guardar_Guardadas,
            error: errores
        });
    }
    else alert("Ingrese la Obra Social"); 
}

function Validar() {
    if ($('#txtPracticaEdicion').val() == '') { alert("Falta Cargar el nombre de la Obra Social"); return false; }
    if ($('#txtCodigoEdicion').val() == '') { alert("Falta Cargar el código de la Obra Social"); return false; }
    return true;
}

function Practicas_Guardar_Guardadas() {
    LimpiarCampos();
    ListarPracticas();
    alert("Obra Social Guardada");
}


function Nueva_ObraSocial() {
    if (!Validar()) { return false; }
    var json = JSON.stringify({
        "Practica": $('#txtPracticaEdicion').val().trim().toUpperCase(),
        "Codigo": $("#txtCodigoEdicion").val().trim().toUpperCase(),
        "CUIT": $("#txtCUIT").val(),
        "Direccion": $("#txtDireccion").val().trim().toUpperCase(),
        "Estado": Estado
    });

    return false;

    $.ajax({
        type: "POST",
        url: "../Json/ObraSocial/ObraSocial.asmx/ObraSocial_Nueva",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Nueva_ObraSocial_Guardadas,
        error: errores
    });
}

function Nueva_ObraSocial_Guardadas() {
    LimpiarCampos();
    ListarPracticas();
    alert("Obra Social Creada");
}


$("#btnOcularPractica").click(function () {

    if ($("#btnOcularPractica").hasClass("btn-danger")) {
        $("#btnOcularPractica").removeClass("btn-success");
        $("#btnOcularPractica").removeClass("btn-danger");
        $("#btnOcularPractica").addClass("btn-success");
        $("#btnOcularPractica").html("Obra Social Activa");
        Estado = 1;
    }
    else {
        $("#btnOcularPractica").html("Obra Social <b>NO</b> Activa");
        $("#btnOcularPractica").removeClass("btn-success");
        $("#btnOcularPractica").removeClass("btn-danger");
        $("#btnOcularPractica").addClass("btn-danger");
        Estado = 0;

    }

});