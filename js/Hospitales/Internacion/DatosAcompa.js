var InternacionId = 0;

function GetQueryString() {
    var querystring = location.search.replace('?', '').split('&');
    // declare object
    var queryObj = {};
    // loop through each name-value pair and populate object
    for (var i = 0; i < querystring.length; i++) {
        // get name and value
        var name = querystring[i].split('=')[0];
        var value = querystring[i].split('=')[1];
        // populate object
        queryObj[name] = value;
    }
    return queryObj;
}

$("#btnCerrarAcompa").click(function () {
    if (confirm("Al cerrar los datos ingresados no se guardarán.\n¿Desea cerrar la ventana?")) parent.$.fancybox.close();
});

$(document).ready(function () {
    var Query = GetQueryString();
    if (Query != null) {
        InternacionId = Query["Id"];
        ListDatos();
    }
    parent.$("#fancybox-close").hide();
});


function ListDatos() {
    if (InternacionId > 0) {
        var json = JSON.stringify({ "Id": InternacionId });
        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/DatosAcompa_List",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: ListDatos_Cargado,
            error: errores
        });
    }
}

function ListDatos_Cargado(Resultado) {
    var Datos = Resultado.d;
    if (Datos != null) {
         $("#txtNombre").val(Datos.Nombre);
         //$("#cboTipo").text(Datos.TipoDoc);
         $("#txtDNI").val(Datos.DNI);
         $("#txtCalle").val(Datos.Calle);
         $("#txtNro").val(Datos.Numero);
         $("#txtPiso").val(Datos.Piso);
         $("#txtCP").val(Datos.CP);
         $("#txtLocalidad").val(Datos.Localidad);
         $("#txtProv").val(Datos.Provincia);
         $("#txtTelefono").val(Datos.Telefono);
        $("#txtObs").val(Datos.Observaciones);
    }
}


$("#btnGuardar").click(function () {
    if (InternacionId != 0) {
        var Datos = {};
        Datos.NroInternacion = InternacionId;
        Datos.Nombre = $("#txtNombre").val().trim().toUpperCase();
        Datos.TipoDoc = $("#cboTipo :selected").text().trim().toUpperCase();
        if ($("#txtDNI").val().trim().length > 0)
            Datos.DNI = $("#txtDNI").val().trim().toUpperCase();
        else Datos.DNI = 0;
        Datos.Calle = $("#txtCalle").val().trim().toUpperCase();
        Datos.Numero = $("#txtNro").val().trim().toUpperCase();
        Datos.Piso = $("#txtPiso").val().trim().toUpperCase();
        Datos.CP = $("#txtCP").val().trim().toUpperCase();
        Datos.Localidad = $("#txtLocalidad").val().trim().toUpperCase();
        Datos.Provincia = $("#txtProv").val().trim().toUpperCase();
        Datos.Telefono = $("#txtTelefono").val().trim().toUpperCase();
        Datos.Observaciones = $("#txtObs").val().trim().toUpperCase();
        var json = JSON.stringify({ "a": Datos });
        $.ajax({
            type: "POST",
            url: "../Json/Internaciones/IntSSC.asmx/Insert_DatosAcompa",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: Insert_DatosAcompa_Cargado,
            error: errores
        });
    }
});

    function Insert_DatosAcompa_Cargado(Resultado) {
        var r = Resultado.d;
        if (r > 0) {
            alert("Datos Guardados Correctamente");
        }
        else alert("Error al Guardar Datos");
    }

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }