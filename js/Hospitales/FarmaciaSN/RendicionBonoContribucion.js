

$(document).ready(function () {

    Usuarios_Lista();
    $("#desde").mask("99/99/9999", { placeholder: "-" });
    $("#hasta").mask("99/99/9999", { placeholder: "-" });

    $("#desde").datepicker();
    $("#hasta").datepicker();

    var currentDt = new Date();
    var mm = currentDt.getMonth() + 1;
    mm = (mm < 10) ? '0' + mm : mm;
    var yyyy = currentDt.getFullYear();
    var d = currentDt.getDate() + '/' + mm + '/' + yyyy;
    var p = '01' + '/' + mm + '/' + yyyy;
    $("#desde").val(p);
    $("#hasta").val(d);

   List_Rendicion_BonoContribucion();

    $("#frm_Main").validate({
        rules: {
            'desde': { required: true, dateES: true },
            'hasta': { required: true, dateES: true }
        },

        messages: {
            'desde': { required: '', dateES: '' },
            'hasta': { required: '', dateES: '' }
        },
        invalidHandler: function (e, validator) {
            var list = validator.invalidElements();
            $("#controldesde").removeClass("error");
            $("#controlhasta").removeClass("error");
            for (var i = 0; i < list.length; i++) {
                var name_element = $(list[i]).attr("name");
                $("#control" + name_element).addClass("error");
            }
        }
    });

});

function Usuarios_Lista() {
    $.ajax({
        type: "POST",
        url: "../Json/Farmacia/Farmacia.asmx/Usuarios_Lista",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: Usuarios_Lista_Cargada,
        error: errores
    });
}

function Usuarios_Lista_Cargada(Resultado) {
    var Lista = Resultado.d;
    $.each(Lista, function (index, Usuario) {
        $("#cbo_Usuarios").append($("<option></option>").val(Usuario.Usuario).html(Usuario.Nombre));
    });
}


function errores(msg) {
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}

$("#btnBuscar").click(function () {
    var valid = $("#frm_Main").valid();
    if (valid) {
        $("#controldesde").removeClass("error");
        $("#controlhasta").removeClass("error");
        $("#controlnroBono").removeClass("error");
        List_Rendicion_BonoContribucion();
    }
});

function List_Rendicion_BonoContribucion() {
    var f_desde = $("#desde").val();
    var f_hasta = $("#hasta").val();
    var Usuario = $("#cbo_Usuarios :selected").text();
    //alert(Usuario);
    $.ajax({
        type: "POST",
        data: '{desde: "' + f_desde + '", hasta: "' + f_hasta + '", Usuario: "' + Usuario + '"}',
        url: "../Json/Farmacia/Farmacia.asmx/List_Rendicion_BonoContribucion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: List_Rendicion_BonoContribucion_Cargada,
        error: errores,
         beforeSend: function () {
            $("#cargando").show();
            $("#TablaRendicion_div").hide();
        },
        complete: function () {
            $("#cargando").hide();
            $("#TablaRendicion_div").show();
        }
    });
}

function List_Rendicion_BonoContribucion_Cargada(Resultado) {
    var Lista = Resultado.d;
    var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;'><thead><tr><th>Afiliado</th><th>NHC</th><th>Insumo</th><th>Cantidad</th><th>Total</th><th style='display:none;'>Descuento</th><th>Fecha</th></tr></thead><tbody>";
    var Contenido = "";
    $.each(Lista, function (index, Row) {
        if (index != Lista.length - 1){
            Contenido = Contenido + "<tr><td>" + Row.Afiliado + " </td><td> " + Row.NHC + " </td><td>" + Row.Medicamento + " </td><td> " + Row.Cantidad + " </td><td> $" + parseFloat(Row.Total).toFixed(2) + " </td><td style='display:none;'> " + Row.Descuento + "% </td><td> " + Fecha(parseJsonDate(Row.Ped_Fecha)) + " </td></tr>";
            //alert(Contenido);
            }
        else $("#Total").html(Row.Acumulado.toFixed(2));
    });
    var Pie = "</tbody></table>";
    $("#TablaRendicion_div").html(Encabezado + Contenido + Pie);

}

function Ventana(url) {

    $.fancybox(
        {
            'autoDimensions': false,
            'href': url,
            'width': '75%',
            'height': '75%',
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'type': 'iframe',
            'hideOnOverlayClick': false,
            'enableEscapeButton': false,
        });
}

$("#btnImprimir").click(function (){
var frmValid = $("#frm_Main").valid();
    if(frmValid)
    {
        $("#controldesde").removeClass("error");
        $("#controlhasta").removeClass("error");
        $("#controlnroBono").removeClass("error");
        var f_desde = $("#desde").val();
        var f_hasta = $("#hasta").val();
        var Usuario = $("#cbo_Usuarios option:selected").text();
        //var url = '../Impresiones/RendicionFarmacia.aspx?Fecha=' + f_desde + '&Usuario='+ Usuario + '&Hasta='+ f_hasta;
        var url = '../Impresiones/ImpresionRendicionFarmacia.aspx?Desde=' + f_desde + '&Usuario='+ Usuario + '&Hasta='+ f_hasta;
        Ventana(url);
    }
});