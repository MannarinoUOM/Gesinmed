var EditandoId = 0;
var ProveedorId = 0;
var objProveedores = new Array();

$(document).ready(function () {
    List_Proveedores('S');
    $("#txtCUIT").mask("99999999999", { placeholder: "-" });
    $("#frm_Main").validate({
        rules: {
            'txtProveedor': { required: true },
            'txtDireccion': { required: true },
            'txtTelefono': { required: true },
            'txtCUIT': { required: true }
        },
        showErrors: function (errorMap, errorList) {
            //
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            var msj = '';
            for (var i = 0; i < list.length; i++) {
                msj = msj + $(list[i]).attr("rel") + "\n";
                if (i == list.length - 1) alert(msj);
            }
        }
    });
});

function List_Proveedores(Todos) {
    $.ajax({
        type: "POST",
        data: '{Todos: "' + Todos + '"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Proveedores",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Proveedores_Cargado,
        error: errores,
        complete: function () {

        }
    });
}

function List_Proveedores_Cargado(Resultado) {
    var Proveedores = Resultado.d;
    var Tabla_Datos = "";
    $("#TConvenios").empty();

    $.each(Proveedores, function (index, Proveedor) {
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + " onclick=Editar(" + index + ");"
        Tabla_Datos = Tabla_Datos + "><td></td><td>" + Proveedor.Nombre + "</td><td>" + Proveedor.Telefono + "</td><td>" + Proveedor.Cuit + "</td><td>" + Proveedor.Direccion + "</td><td>" + Proveedor.EnUso + "</td></tr>";
        objProveedores[index] = Proveedor;
    });

    $("#TConvenios").html(Tabla_Datos);
}

function Editar(Id) {
    EditandoId = Id;
    ProveedorId = objProveedores[EditandoId].Id;
    $("#txtProveedor").val(objProveedores[EditandoId].Nombre);
    $("#txtTelefono").val(objProveedores[EditandoId].Telefono);
    $("#txtDireccion").val(objProveedores[EditandoId].Direccion);
    $("#txtCUIT").val(objProveedores[EditandoId].Cuit);
    $("#btnQuitar").show();
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#btnQuitar").click(function () {
    if (confirm("Desea dar de baja al Proveedor?")) {
            p = {};
            p.Id = ProveedorId;
            p.Nombre = $("#txtProveedor").val().trim().toUpperCase();
            p.Telefono = $("#txtTelefono").val().trim().toUpperCase();
            p.Direccion = $("#txtDireccion").val().trim().toUpperCase();
            p.Cuit = $("#txtCUIT").val();
            p.EnUso = 'N';
            var json = JSON.stringify({ "p": p });
            $.ajax({
                type: "POST",
                url: "../Json/Farmacia/Proveedor.asmx/Insert_Proveedores",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: QuitadoProveedor_Guardado,
                error: errores
            });
    }
});

function QuitadoProveedor_Guardado() {
    alert("Proveedor Dado de baja");
    List_Proveedores('S');
    Limpiar();
}

function Limpiar() {
    $("#txtProveedor").val('');
    $("#txtTelefono").val('');
    $("#txtDireccion").val('');
    $("#txtCUIT").val('');
    EditandoId = 0;
    ProveedorId = 0;
    $("#btnQuitar").hide();
}

$("#btnCancelar").click(function () {
    Limpiar();
});

function ExisteProveedor(Algo) {
    for (var i = 0; i <= objProveedores.length - 1; i++) {
        if (objProveedores[i].Nombre.toUpperCase().trim() == Algo.toUpperCase().trim() && EditandoId == 0) {
            alert("Ya ha cargado el Proveedor: " + Algo);
            return true;
        }
    }
    return false;
}


$("#btnGuardar").click(function () {
    if (confirm("Desea guardar el Proveedor?")) {
        if ($("#frm_Main").valid()) {
            if (ExisteProveedor($("#txtProveedor").val())) return;
            p = {};
            p.Id = ProveedorId;
            p.Nombre = $("#txtProveedor").val().trim().toUpperCase();
            p.Telefono = $("#txtTelefono").val().trim().toUpperCase();
            p.Direccion = $("#txtDireccion").val().trim().toUpperCase();
            p.Cuit = $("#txtCUIT").val();
            p.EnUso = 'S';
            var json = JSON.stringify({ "p": p });
            $.ajax({
                type: "POST",
                url: "../Json/Farmacia/Proveedor.asmx/Insert_Proveedores",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: GuardarProveedor_Guardado,
                error: errores
            });
        }
    }
});



function GuardarProveedor_Guardado(Resultado) {
    alert("Proveedor Guardado");
    Limpiar();
    List_Proveedores('S');
}




