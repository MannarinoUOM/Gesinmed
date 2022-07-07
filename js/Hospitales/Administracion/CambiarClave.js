var Cambio = 0;

$(document).ready(function () {
    var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });
    if (GET["Cambio"] != null) Cambio = 1;

});

function verificarCampos() {
    var retorno = true;
    $(".pass").each(function (index, item) {
        if ($(this).val().trim().length == 0) {
            $(this).css("border-color", "red");
            retorno = false;
            var data = $(this).data("item");
            var input = $(this);
            $(".errorVacio").each(function (index, item) {
                if (data == $(this).data("item"))
                    $(this).css('visibility', 'visible');
                $(input).data("check", "1");

                var intervalo = 900;
                var cont = 1;
                setInterval(function () {
                    cont++;
                    $(".errorVacio").toggleClass("animacion");

                    if (cont == 4) { intervalo = 0; }
                }, intervalo)
            });
        }
    });
    return retorno;
}

$(".pass").on("hover", function () {
    if ($(this).data("check") == 1)
    var data = $(this).data("item");
    $(".errorVacio").each(function (index, item) {
        if (data == $(this).data("item"))
            $(this).css('visibility', 'hidden');
    });
 });

$(".pass").on("mouseleave", function () {
    if ($(this).data("check") == 1)
    var data = $(this).data("item");
    $(".errorVacio").each(function (index, item) {
        if (data == $(this).data("item"))
            $(this).css('visibility', 'visible');
    });
});

$(".pass").on("focus", function () {
    $(this).data("check","0");
    $(this).css("border-color", "#cccccc");
    var data = $(this).data("item");
    $(".errorVacio").each(function (index, item) {
        if (data == $(this).data("item"))
            $(this).css('visibility', 'hidden');
    });
});

$("#btnGuardar").click(function () {

    if (!verificarCampos())
        return false;


    var json = JSON.stringify({
        "ClaveAnt": $("#txtCAnterior").val().trim(),
        "ClaveNueva": $("#txtCNueva").val().trim(),
        "ClaveNuevaRep": $("#txtCRNueva").val().trim()
    });

    $.ajax({
        type: "POST",
        data: json,
        url: "../Json/Administracion/CambiarClave.asmx/CambiarLaClave",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: CambiarLaClaveCambiada,
        error: errores
    });
})

function CambiarLaClaveCambiada(Resultado) {
    if (Resultado.d == 1) {
        alert("Clave Cambiada");
        //window.location.href = '...';
        if(Cambio == 0)
            window.location.replace('CambiarClave.aspx');
        else window.location.replace('../Login.aspx');
    } 
    else {
        alert("Error al intentar cambiar la clave");
    }



}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}


function Cancelar()
{
window.location.replace('CambiarClave.aspx');
}
