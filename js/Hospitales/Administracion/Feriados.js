parent.document.getElementById("DondeEstoy").innerHTML = "Administración > <strong>Feriados</strong>";

function CargarFeriados() {
    $.ajax({
        type: "POST",
        url: "../Json/Administracion/Administracion.asmx/Feriados_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CargarFeriados_Encontrados,
        error: errores
    });
}

function CargarFeriados_Encontrados(Resultado) {
    var Feriados = Resultado.d;
    var Datos = "";
    $.each(Feriados, function (index, fer) { Datos = Datos + "<tr><td><a id='Editar" + index + "' onclick='Editar(" + index + ");' class='btn btn-mini' title='Editar'><i class='icon-edit'></i></a></td><td id='f" + index + "'>" + fer.fecha + " </td><td id='d" + index + "'>" + fer.descripcion + "</td></tr>"; });
    $('#TFeriados').html(Datos);
}

CargarFeriados();
$("#txt_Fecha").datepicker();

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

function Editar(Id) {
    $("#btn_txt_Agregar").html('Actualizar');
    $("#txt_Fecha").val($("#f"+Id).html());
    $("#txt_Descripcion").val($("#d" + Id).html());
}

function limpiar() {
    $("#btn_txt_Agregar").html('Agregar');
    $("#txt_Fecha").val('');
    $("#txt_Descripcion").val('');
}

function Guardar() {
    var json = JSON.stringify({
        "fecha": $("#txt_Fecha").val(),
        "descri": $("#txt_Descripcion").val()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/Guardar_Feriados",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            limpiar();
            CargarFeriados();
        },
        error: errores
    });
}

function Quitar() {
    var json = JSON.stringify({
        "fecha": $("#txt_Fecha").val()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/Administracion.asmx/Quitar_Feriado",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            limpiar();
            CargarFeriados();
        },
        error: errores
    });
}

