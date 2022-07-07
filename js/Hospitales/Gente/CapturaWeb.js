var Capturar = 0;

function GenerarId() {
    var now = new Date();
    var seed = now.getMilliseconds();

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random(seed) * possible.length));

    return text;
}

var dateDiv = document.getElementById('divDate');

Object.defineProperty(Date.prototype, 'YYYYMMDDHHMMSS', {
    value: function () {
        function pad2(n) {  // always returns a string
            return (n < 10 ? '0' : '') + n;
        }

        return this.getFullYear() +
               pad2(this.getMonth() + 1) +
               pad2(this.getDate()) +
               pad2(this.getHours()) +
               pad2(this.getMinutes()) +
               pad2(this.getSeconds());
    }
});


var DyH = new Date().YYYYMMDDHHMMSS();

var Nombre_Inicial = GenerarId() + "_" + DyH + ".jpg";
var Nombre_Final = "";

function Actualizar_Imagen() {

    var json = JSON.stringify({"Capturado": Nombre_Inicial, "Paciente_Id" : $("#afiliadoID").val()});

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "../Json/Gente.asmx/Foto_Gente_DB_Guardar",
        contentType: "application/json; charset=utf-8",
        data: json,
        success: function () { window.close(); },
        error: function () { alert("Error al guardar la foto"); }
    });
}



