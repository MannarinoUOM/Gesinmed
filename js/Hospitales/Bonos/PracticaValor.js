var Estado = 1;
var Editando = 0;

function ListarPracticas() {
    var json = JSON.stringify({ "Practica": $('#txtPracticas').val(), "Codigo": $("#txtCodigo").val() });
    $.ajax({
        type: "POST",
        url: "../Json/Practicas/Practicas.asmx/Practicas_Listar",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Practicas_Listadas,
        error: errores,
        beforeSend: function () {
            $("#cargando").show();
            $("#Resultado").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#Resultado").show();
        }
    });
}

$("#btn_Buscar").click(function () {
    $("#TablaPracticas").empty();
    ListarPracticas();
});


$("#btn_Cancelar").click(function () {
	$("#btnAgregarPractica").hide();
    //$("#TablaPracticas").empty();
    LimpiarCampos();
});

$("#btnAgregarPractica").click(function () {
    Guardar();
});


$("#btn_Nuevo").click(function () {
    Nueva_Practica();
});



function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$(document).ready(function () {

});

function Practicas_Listadas(Resultado) {
    var Practicas = Resultado.d;
    var Tabla_Titulo = "";
    var Tabla_Datos = "";
    var Tabla_Fin = "";

    Tabla_Titulo = "<table id='TablaPracticas' class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Código</th><th>Práctica</th><th>Estado</th></tr></thead><tbody>";
    $.each(Practicas, function (index, practicas) {
        Tabla_Datos = Tabla_Datos + "<tr style='cursor:pointer;'";
        Tabla_Datos = Tabla_Datos + " onclick=Editar(" + practicas.Id + ");";
        Tabla_Datos = Tabla_Datos + "><td id='Codigo" + practicas.Id + "'>" + practicas.Codigo + "</td><td id='Descripcion" + practicas.Id + "'>" + practicas.Descripcion + "</td><td id='Activa" + practicas.Id + "'>" + practicas.Activa + "</td></tr>";
    });

    Tabla_Fin = "</tbody></table>";
    $("#Resultado").html(Tabla_Titulo + Tabla_Datos + Tabla_Fin);
}

function Editar(PracticaId) {
    Editando = PracticaId;
	$("#btnAgregarPractica").show();
    $("#txtCodigoEdicion").val($("#Codigo" + PracticaId).html());
    $("#txtPracticaEdicion").val($("#Descripcion" + PracticaId).html());
    $("#btn_Nuevo").hide();
    //$("#btnOcularPractica").show();


    if ($("#Activa" + PracticaId).html() == 'Activa') {
        /*$("#btnOcularPractica").removeClass("btn-success");
        $("#btnOcularPractica").removeClass("btn-danger");
        $("#btnOcularPractica").addClass("btn-success");
        $("#btnOcularPractica").html("Práctica Activa");*/
        $("#chkActiva").attr("checked",true);
        Estado = 1;
    }
    else {
        /*$("#btnOcularPractica").html("Práctica <b>NO</b> Activa");
        $("#btnOcularPractica").removeClass("btn-success");
        $("#btnOcularPractica").removeClass("btn-danger");
        $("#btnOcularPractica").addClass("btn-danger");*/
        $("#chkActiva").removeAttr("checked");
        Estado = 0;
        
    }

}

function LimpiarCampos() {
    Editando = 0;
    //$("#btnOcularPractica").hide();
    $("#chkActiva").removeAttr("checked");
    $("#txtCodigoEdicion").val('');
    $("#txtPracticaEdicion").val('');
    $("#btn_Nuevo").show();
    $("#btnAgregarPractica").hide();
    /*    $("#btnOcularPractica").removeClass("btn-success");
        $("#btnOcularPractica").removeClass("btn-danger");
        $("#btnOcularPractica").html("");*/
        Estado = 0;
    }


    function Guardar() {
		if (!Validar()) { return false; }
        var json = JSON.stringify({ "Practica": $('#txtPracticaEdicion').val(), "Codigo": $("#txtCodigoEdicion").val(), "FE": 0, "FG": 0, "Id": Editando, "Estado": Estado });
        $.ajax({
            type: "POST",
            url: "../Json/Practicas/Practicas.asmx/Practicas_Guardar",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Practicas_Guardar_Guardadas,
            error: errores
        });
    }

    function Validar() {
        if ($('#txtPracticaEdicion').val() == '') { alert("Falta Cargar el nombre de la Práctica"); return false; }
        if ($('#txtCodigoEdicion').val() == '') { alert("Falta Cargar el código de la Práctica"); return false; }
        return true;
    }
	
    function Practicas_Guardar_Guardadas() {
        LimpiarCampos();
        ListarPracticas();
        alert("Practica Guardada");
    }


    function Nueva_Practica() {
		if (!Validar()) { return false; }
        var json = JSON.stringify({
            "Practica": $('#txtPracticaEdicion').val(),
            "Codigo": $("#txtCodigoEdicion").val(),
            "FE": 0,
            "FG": 0
        });

        $.ajax({
            type: "POST",
            url: "../Json/Practicas/Practicas.asmx/Practica_Nueva",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Nueva_Practica_Guardadas,
            error: errores
        });
    }

    function Nueva_Practica_Guardadas() {
        LimpiarCampos();
        ListarPracticas();
        alert("Practica Creada");
    }


    $("#chkActiva").click(function () {

        if ($("#chkActiva").is(":checked"))
    {
        /*$("#btnOcularPractica").removeClass("btn-success");
        $("#btnOcularPractica").removeClass("btn-danger");
        $("#btnOcularPractica").addClass("btn-success");
        $("#btnOcularPractica").html("Práctica Activa");*/
        Estado = 1;
    }
    else {
        /*$("#btnOcularPractica").html("Práctica <b>NO</b> Activa");
        $("#btnOcularPractica").removeClass("btn-success");
        $("#btnOcularPractica").removeClass("btn-danger");
        $("#btnOcularPractica").addClass("btn-danger");*/
        Estado = 0;

    }

});