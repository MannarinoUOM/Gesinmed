var G_INS_ID = 0;

$(document).ready(function () {
    Cargar_Medicamentos(true);
});

function Cargar_Medicamentos(Todos) {
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_INS_LIST",
        data: '{Todos: "' + Todos + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Cargar_Medicamentos_Cargado
    });
}

function Cargar_Medicamentos_Cargado(Resultado) {
    var Detalles = Resultado.d;
    var Contenido = "";
    var Encabezado = "<table class='table table-hover table-condensed' style='width:100%;height:100px; overflow:auto;'><thead><tr><th></th><th>&nbsp;</th><th>Insumo</th><th>Estado</th></tr></thead><tbody>";
    Contenido = "";
    $.each(Detalles, function (i, Detalle) {
        var baja = "<a id='btnActivo" + i + "' data-id='" + Detalle.COM_ADM_INS_INS_ID + "' class='btn btn-success'><i class='icon-ok'></i>&nbsp;Activo</a>";
        if (Detalle.COM_ADM_INS_BAJA) baja = "<a id='btnBaja" + i + "' data-id='" + Detalle.COM_ADM_INS_INS_ID + "' class='btn btn-danger'><i class='icon-asterisk'></i>&nbsp;Baja</a>";
        Contenido = Contenido + "<tr><td><a id='Editar" + Detalle.COM_ADM_INS_INS_ID + "' onclick='Editar(" + Detalle.COM_ADM_INS_INS_ID + ");' class='btn btn-mini' title='Editar Insumo'><i class='icon-edit'></i></a></td><td>&nbsp;</td><td id='INS_DESC" + Detalle.COM_ADM_INS_INS_ID + "'>" + Detalle.COM_ADM_INS_INS_DESC + "</td><td id='INS_BAJA" + Detalle.COM_ADM_INS_INS_ID +"'>" + baja + "</td></tr>";
    });
    var Pie = "</tbody></table>";
    $("#Resultado").html(Encabezado + Contenido + Pie);
}

$(document).on('click', '.btn-success', function () {
    var id = $(this).data("id");
    CambiarEstado(id, true); //dar de baja
});

$(document).on('click', '.btn-danger', function () {
    var id = $(this).data("id");
    CambiarEstado(id,false); //sacar baja
});

function LimpiarCampos() {
    $("#txtInsumo").val("");
    $("#chkActivo").removeAttr("checked");
    G_INS_ID = 0;
}

function Editar(i) {
    G_INS_ID = i;
    $("#txtInsumo").val($("#INS_DESC" + i).html());
    if ($("#INS_BAJA" + i).html().trim() == "Activo")
        $("#chkActivo").attr("checked", true);
    else $("#chkActivo").removeAttr("checked");
}

function CambiarEstado(i,baja) {
        var ins = {};
        ins.COM_ADM_INS_INS_ID = i;
        ins.COM_ADM_INS_INS_DESC = $("#INS_DESC" + i).html().trim().toUpperCase();
        ins.COM_ADM_INS_BAJA = baja;
        GrabarInsumo(ins);
}

$("#btnConfirmar").click(function () {
    if ($("#txtInsumo").val().trim().length == 0) { alert("Ingrese Insumo."); return false; }

    if (confirm("¿Desea confirmar?")) {
        var ins = {};
        ins.COM_ADM_INS_INS_ID = G_INS_ID;
        ins.COM_ADM_INS_INS_DESC = $("#txtInsumo").val().trim().toUpperCase();
        ins.COM_ADM_INS_BAJA = false;
        GrabarInsumo(ins);
    }
});

$("#btnCancelar").click(function () {
    LimpiarCampos();
});

function GrabarInsumo(ins) {
    var json = JSON.stringify({"ins": ins});
    $.ajax({
        type: "POST",
        url: "../Json/Compras/Compras_Administracion.asmx/COM_ADM_INS_UPDATE",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () { 
            alert("Insumo Actualizado");
            LimpiarCampos();
            Cargar_Medicamentos(true);
        },
        error: errores
    });
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}