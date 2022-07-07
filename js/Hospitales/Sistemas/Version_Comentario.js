var Edita = 0;

$(document).ready(function () {
    $("#txtFecha").val(FechaActual());
    $("#txtFecha").datepicker();
    $("#txtFecha").mask("99/99/9999", { placeholder: "-" });
    ListVersionesComentarios();
});

function ListVersionesComentarios() {
    $.ajax({
        type: "POST",
        url: "../Json/Sistemas.asmx/ListComentariosVersion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (Resultado) {
            var lista = Resultado.d;
            var Contenido = "";
            $("#TComentarios").empty();
            $.each(lista, function (i, Detalle) {
                Contenido += "<tr><td><a id='Editar" + Detalle.Id + "' onclick='Editar(" + Detalle.Id + ");' class='btn btn-mini' rel='tooltip' title='Editar Comentario'><i class='icon-edit'></i></a><a id='Elminar" + Detalle.Id + "'onclick='Eliminar(" + Detalle.Id + ");' class='btn btn-mini btn-danger' rel='tooltip' title='Eliminar Comentario'><i class='icon-remove-circle icon-white'></i></a></td><td id='Version" + Detalle.Id + "'>" + Detalle.Version + "</td><td id='Fecha" + Detalle.Id + "'>" + Detalle.Fecha + "</td><td id='Comentario" + Detalle.Id + "'>" + Detalle.Comentario + "</td></tr>";
            });
            var Pie = "</tbody></table>";
            $("#TComentarios").html(Contenido);
        },
        error: errores
    });
}

function Editar(i) {
    $("#txtVersion").val($("#Version" + i).html());
    $("#txtFecha").val($("#Fecha" + i).html());
    $("#txtComentario").val($("#Comentario" + i).html());
    Edita = i;
}

function LimpiarControles() {
    $("#txtVersion").val("");
    $("#txtFecha").val("");
    $("#txtComentario").val("");
    Edita = 0;
}


function LoadData() {
    var v = {};
    v.Id = Edita;
    v.Version = $("#txtVersion").val().trim();
    v.Comentario = $("#txtComentario").val().trim().toUpperCase();
    v.Fecha = $("#txtFecha").val();
    return v;
}

function Validar() {
    if ($("#txtVersion").val().trim().length == 0) {alert("Ingrese Version."); return false; }
    if ($("#txtFecha").val().trim().length == 0) {alert("Ingrese Fecha."); return false; }
    if ($("#txtComentario").val().trim().length == 0) {alert("Ingrese Comentario."); return false; }
    return true;
}

$("#btnGuardar").click(function () {
    if (!Validar()) return false;

    var json = JSON.stringify({ "v": LoadData() });
    $.ajax({
        type: "POST",
        url: "../Json/Sistemas.asmx/InsertComentarioVersion",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            LimpiarControles();
            ListVersionesComentarios();
        },
        error: errores
    });
});

$("#btnCancelar").click(function () {
    LimpiarControles();
});

function Eliminar(i) {
    if (confirm("¿Desea eliminar el comentario?")) {
        var json = JSON.stringify({ "Id": i });
        $.ajax({
            type: "POST",
            url: "../Json/Sistemas.asmx/DeleteComentarioVersion",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function () {
                LimpiarControles();
                ListVersionesComentarios();
            },
            error: errores
        });
    }
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}