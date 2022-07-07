$(document).ready(function () {

    $(".fecha").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true
    });



    //    $(".fecha").attr('style', 'width: 95px');
    //    $(".fecha").attr('style', 'text-align: center, width: 95px');

    //checkbox
    //radio
    //text
    //select-one

    $("#btnGuardar").click(function () {
        //                var mensaje = "";
        //                for (var i = 1; i <= 186; i++) {
        //                    mensaje = mensaje +"["+ i + "]"+" AS C" + i + " ,";
        //                }
        //                alert(mensaje);
        //                return false;

        var cantidad = 0;
        var lista = [];
        $(".dato").each(function (index, item) {
            var obj = {};

            switch (item.type) {
                case "checkbox":
                    // alert($(this).prop('checked'));
                    //   if ($(this).prop('checked')) {
                    obj.valor = $(this).prop('checked');
                    obj.dato = $(this).prop('id');
                    //   }
                    break;

                case "radio":
                      if ($(this).prop('checked')) {
                    if ($(this).data('valor') == "NO") {
                        obj.valor = "0";
                    } else { obj.valor = "1"; }
                    obj.dato = $(this).prop('name');
                   // alert($(this).data('valor') + "    " +   obj.valor    +"    " +$(this).prop('name'));
                    }
                    break;

                case "text":
                    //  if ($(this).val().trim().length > 0) {

                    obj.valor = $(this).val();
                    obj.dato = $(this).prop('id');

                    //  }
                    //  alert(obj.valor);
                    break;

                case "select-one":
                    obj.valor = $(this).val();
                    obj.dato = $(this).prop('id');
                    break;
            }
            lista.push(obj);
        });
        console.log(lista);
        //  return false;


        //     var json = JSON.stringify({ "medico": parent.$("#cbo_medicos").val(), "afiliado": + $("#AfiliadoId").val() ,"lista": lista });
        var json = JSON.stringify({ "medico": 1000, "afiliado": 2000, "lista": lista });
        $.ajax({
            type: "POST",
            url: "../Json/Guardia/Guardia.asmx/guardarSospechaCOVID",
            data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //beforeSend: function () { },
            success: function (Resultado) {

            },
            error: errores
        });

    });
});

function errores(msg) {
    Impreso = 0;
    var jsonObj = JSON.parse(msg.responseText);
    alert('Error: ' + jsonObj.Message);
}





