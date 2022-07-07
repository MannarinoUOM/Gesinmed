var EditandoId = 0;
var DepositoId = 0;
var objDepositos = new Array();

$(document).ready(function () {
    List_Depositos();
    $("#frm_Main").validate({
        rules: {
            'txtDeposito': { required: true }
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

function List_Depositos() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Deposito.asmx/List_Depositos",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Depositos_Cargado,
        error: errores
    });
}

function List_Depositos_Cargado(Resultado) {
    var Depositos = Resultado.d;
    var Tabla_Datos = "";
    $("#TConvenios").empty();
    $.each(Depositos, function (index, Deposito) {
        var Estado = "N";
        if (Deposito.Estado) Estado = "S";
        Tabla_Datos = Tabla_Datos + "<tr";
        Tabla_Datos = Tabla_Datos + " onclick=Editar(" + index + ");"
        Tabla_Datos = Tabla_Datos + "><td></td><td>" + Deposito.Deposito + "</td><td>" + Estado + "</td></tr>";
        objDepositos[index] = Deposito;
    });
    $("#TConvenios").html(Tabla_Datos);
}

function Editar(Id) {
    EditandoId = Id;
    DepositoId = objDepositos[EditandoId].Id;
    $("#txtDeposito").val(objDepositos[EditandoId].Deposito);
    $("#btnQuitar").show();
}

function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


$("#btnQuitar").click(function () {
        if (confirm("Desea dar de baja el Deposito?")) {
            if ($("#frm_Main").valid()) {
                if (ExisteDeposito($("#txtDeposito").val())) return;
                p = {};
                p.Id = DepositoId;
                p.Deposito = $("#txtDeposito").val().trim().toUpperCase();
                p.Estado = false;
                var json = JSON.stringify({ "p": p });
                $.ajax({
                    type: "POST",
                    url: "../Json/Farmacia/Deposito.asmx/Insert_Deposito",
                    data: json,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: QuitadoDeposito_Guardado,
                    error: errores
                });
            }
        }
});

function QuitadoDeposito_Guardado() {
    alert("Deposito Dado de baja");
    List_Depositos();
    Limpiar();
}

function Limpiar() {
    $("#txtDeposito").val('');
    EditandoId = 0;
    DepositoId = 0;
    $("#btnQuitar").hide();
}

$("#btnCancelar").click(function () {
    Limpiar();
});

function ExisteDeposito(Algo) {
    for (var i = 0; i <= objDepositos.length - 1; i++) {
        if (objDepositos[i].Deposito.toUpperCase().trim() == Algo.toUpperCase().trim() && EditandoId == 0) {
            alert("Ya ha cargado el Deposito: " + Algo);
            return true;
        }
    }
    return false;
}


$("#btnGuardar").click(function () {
    if (confirm("Desea guardar el Deposito?")) {
        if ($("#frm_Main").valid()) {
            if (ExisteDeposito($("#txtDeposito").val())) return;
            p = {};
            p.Id = DepositoId;
            p.Deposito = $("#txtDeposito").val().trim().toUpperCase();
            p.Estado = true;
            var json = JSON.stringify({ "p": p });
            $.ajax({
                type: "POST",
                url: "../Json/Farmacia/Deposito.asmx/Insert_Deposito",
                data: json,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: GuardarDeposito_Guardado,
                error: errores
            });
        }
    }
});



function GuardarDeposito_Guardado(Resultado) {
    alert("Deposito Guardado");
    Limpiar();
    List_Depositos();
}




