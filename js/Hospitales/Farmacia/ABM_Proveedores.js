var EditandoId = 0;
var ProveedorId = 0;
var objProveedores = new Array();

$(document).ready(function () {
    List_Proveedores('S');
    $("#txtCUIT").mask("9?9999999999", { placeholder: "-" });
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
        Tabla_Datos = Tabla_Datos + "<tr>";
        Tabla_Datos = Tabla_Datos + "<td><a id='Editar" + index + "' onclick='Editar(" + index + ");' class='btn btn-mini' title='Editar'>";
        Tabla_Datos = Tabla_Datos + "<i class='icon-edit'></i></a></td><td>" + Proveedor.Nombre + "</td><td>" + Proveedor.Rubro + "</td><td>" + Proveedor.Telefono + "</td><td>" + Proveedor.Contacto + "</td><td>" + Proveedor.Direccion + "</td>";
        Tabla_Datos = Tabla_Datos + "<td>" + Proveedor.Cuit + "</td><td>" + Proveedor.Localidad + "</td><td>" + Proveedor.Celular + "</td>";
        Tabla_Datos = Tabla_Datos + "</tr>";
        objProveedores[index] = Proveedor;
    });
    $("#TConvenios").html(Tabla_Datos);
}

function Editar(Id) {
    EditandoId = Id;
    ProveedorId = objProveedores[EditandoId].Id;
    $("#btnGuardar").html("<i class='icon-ok-circle'></i>&nbsp;Actualizar");
    $("#txtProveedor").val(objProveedores[EditandoId].Nombre);
    $("#txtTelefono").val(objProveedores[EditandoId].Telefono);
    $("#txtDireccion").val(objProveedores[EditandoId].Direccion);
    $("#txtCUIT").val(objProveedores[EditandoId].Cuit);

    $("#txtRubro").val(objProveedores[EditandoId].Rubro);
    $("#txtContacto").val(objProveedores[EditandoId].Contacto);
    $("#txtLocalidad").val(objProveedores[EditandoId].Localidad);
    $("#txtCelular").val(objProveedores[EditandoId].Celular);
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
            p.Cuit = $("#txtCUIT").val().trim();
            p.EnUso = 'N';
            p.Rubro = $("#txtRubro").val().trim().toUpperCase();
            p.Contacto = $("#txtContacto").val().trim().toUpperCase();
            p.Localidad = $("#txtLocalidad").val().trim().toUpperCase();
            p.Celular = $("#txtCelular").val().trim().toUpperCase();


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
    $("#btnGuardar").html("<i class='icon-ok-circle'></i>&nbsp;Agregar");
    $("#txtProveedor").val('');
    $("#txtTelefono").val('');
    $("#txtDireccion").val('');
    $("#txtCUIT").val('');
    $("#txtRubro").val('');
    $("#txtContacto").val('');
    $("#txtLocalidad").val('');
    $("#txtCelular").val('');
    EditandoId = 0;
    ProveedorId = 0;
    $("#btnQuitar").hide();
}

$("#btnCancelar").click(function () {
    Limpiar();
});

function ExisteProveedor(Algo) {
    for (var i = 0; i <= objProveedores.length - 1; i++) {
        if (objProveedores[i].Nombre.toUpperCase().trim() == Algo.toUpperCase().trim() && ProveedorId == 0) {
            alert("Ya ha cargado el Proveedor: " + Algo);
            return true;
        }
    }
    return false;
}

function Validar() {
    if ($("#txtProveedor").val().trim().length == 0) { alert("Ingrese Proveedor."); return false; }
    if ($("#txtCUIT").val().trim().length == 0) { alert("Ingrese CUIT."); return false; }
    return true;
}

$("#btnGuardar").click(function () {
    if (confirm("Desea guardar el Proveedor?")) {
        
        if (!Validar()) return false;

        if (ExisteProveedor($("#txtProveedor").val())) return;
        p = {};
        p.Id = ProveedorId;
        p.Nombre = $("#txtProveedor").val().trim().toUpperCase();
        p.Telefono = $("#txtTelefono").val().trim().toUpperCase();
        p.Direccion = $("#txtDireccion").val().trim().toUpperCase();
        p.Cuit = $("#txtCUIT").val().trim();
        p.EnUso = 'S';
        p.Rubro = $("#txtRubro").val().trim().toUpperCase();
        p.Contacto = $("#txtContacto").val().trim().toUpperCase();
        p.Localidad = $("#txtLocalidad").val().trim().toUpperCase();
        p.Celular = $("#txtCelular").val().trim().toUpperCase();


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
});

function GuardarProveedor_Guardado(Resultado) {
    alert("Proveedor Guardado");
    Limpiar();
    List_Proveedores('S');
}




