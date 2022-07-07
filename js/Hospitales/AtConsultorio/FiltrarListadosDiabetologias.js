$("#btnListar").click(function () {
    //    alert("entro en el click");
    if ($("#txtDesde").val() == "" || $("#txtHasta").val() == "") {
        alert("Ingre un Rango de Fecha!");
        return;
    }

    var tipo = $('#CbotipoDiabetes option:selected').val();
    var filtro = $('#CboFiltro option:selected').val();
    var desde = $("#txtDesde").val();
    var hasta = $("#txtHasta").val();
    var usuario = 0;

//    $.ajax({
//        type: "POST",
//        url: "../Json/AtConsultorio/AtConsultorio.asmx/DiabetesCargarConsultas",
//        //        data: '{NHC: "' + NHC2 + '"}',
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        //        beforeSend: function () {
//        //            $("#cargando").show();
//        //            $("#TablaMedicamentos_div").empty();
//        //            $("#TablaMedicamentos_div").hide();
//        //        },
//        //        complete: function () {
//        //            $("#cargando").hide();
//        //            $("#TablaMedicamentos_div").show();
//        //        },
//        success: pasarUsuario,
//        error: errores
//    });

//    function errores(msg) {
//        var jsonObj = JSON.parse(msg.responseText);
//        alert('Error: ' + jsonObj.Message);
//    }


//    function pasarUsuario(resultado) {
//        var r = resultado.d;
//        usuario = r.id;
//    }

    switch (filtro) {
        case "0":
            //            alert("entro al 0");
            $.fancybox({
                'href': "../Impresiones/ImpresionDiabeticaListados0.aspx?tipo=" + tipo + "&filtro=" + filtro + "&desde=" + desde + "&hasta=" + hasta,
                'width': '100%',
                'height': '75%',
                'autoScale': false,
                'transitionIn': 'elastic',
                'transitionOut': 'none',
                'type': 'iframe',
                'hideOnOverlayClick': false,
                'enableEscapeButton': false,
                'preload': true,
                'onComplete': function f() {
                    jQuery.fancybox.showActivity();
                    jQuery('#fancybox-frame').load(function () {
                        jQuery.fancybox.hideActivity();
                    });
                }


            });

            break;
        case "1":
            //            alert("entro al 1");
            $.fancybox({
                'autoDimensions': false,
                'href': "../Impresiones/ImpresionDiabeticaListados1.aspx?tipo=" + tipo + "&filtro=" + filtro + "&desde=" + desde + "&hasta=" + hasta,
                'width': '100%',
                'height': '75%',
                'autoScale': false,
                'transitionIn': 'elastic',
                'transitionOut': 'none',
                'type': 'iframe',
                'hideOnOverlayClick': false,
                'enableEscapeButton': false,
                'preload': true,
                'onComplete': function f() {
                    jQuery.fancybox.showActivity();
                    jQuery('#fancybox-frame').load(function () {
                        jQuery.fancybox.hideActivity();
                    });
                }


            });
            break;
        case "2":
            //            alert("entro al 2");
            $.fancybox({
                'autoDimensions': false,
                'href': "../Impresiones/ImpresionDiabeticaListados2.aspx?tipo=" + tipo + "&filtro=" + filtro + "&desde=" + desde + "&hasta=" + hasta,
                'width': '100%',
                'height': '75%',
                'autoScale': false,
                'transitionIn': 'elastic',
                'transitionOut': 'none',
                'type': 'iframe',
                'hideOnOverlayClick': false,
                'enableEscapeButton': false,
                'preload': true,
                'onComplete': function f() {
                    jQuery.fancybox.showActivity();
                    jQuery('#fancybox-frame').load(function () {
                        jQuery.fancybox.hideActivity();
                    });
                }


            });
            break;
        case "3":
            //            alert("entro al 3");
            $.fancybox({
                'autoDimensions': false,
                'href': "../Impresiones/ImpresionDiabeticaListados3.aspx?tipo=" + tipo + "&filtro=" + filtro + "&desde=" + desde + "&hasta=" + hasta,
                'width': '100%',
                'height': '75%',
                'autoScale': false,
                'transitionIn': 'elastic',
                'transitionOut': 'none',
                'type': 'iframe',
                'hideOnOverlayClick': false,
                'enableEscapeButton': false,
                'preload': true,
                'onComplete': function f() {
                    jQuery.fancybox.showActivity();
                    jQuery('#fancybox-frame').load(function () {
                        jQuery.fancybox.hideActivity();
                    });
                }


            });
            break;
    }
});


$("#txtHasta").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //        minDate: '0d,0m',
    maxDate: '0m',
        onClose: function (selectedDate) {
            $("#txtDesde").datepicker("option", "maxDate", selectedDate);
        }
});

$("#txtDesde").datepicker({
    dateFormat: 'dd/mm/yy',
    changeMonth: true,
    changeYear: true,
    //        minDate: '0d,0m',
    maxDate: '0m',
        onClose: function (selectedDate) {
            $("#txtHasta").datepicker("option", "minDate", selectedDate);
        }
});
//$("#txtHasta)