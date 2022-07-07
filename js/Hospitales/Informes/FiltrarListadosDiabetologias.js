
var GET = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        GET[decode(arguments[1])] = decode(arguments[2]);
    });


    if (GET["tipo"] != "" && GET["tipo"] != null) {
        cual = GET["tipo"];
        if (cual == 4) {
            $(".ocultar").hide();
        }
    }

    var PDF = 0;
    $("#btnPDF").click(function () {  PDF = 1; $("#btnListar").click(); });
    $("#btnEXECL").click(function () { PDF = 0; $("#btnListar").click(); });

    $("#btnListar").click(function () {
        //    alert("entro en el click");
        if (cual != 4) {

            if ($("#txtDesde").val() == "" || $("#txtHasta").val() == "") {
                alert("Ingre un Rango de Fecha!");
                return;
            }
        }
        var tipo = $('#CbotipoDiabetes option:selected').val();
        // var filtro = $('#CboFiltro option:selected').val();
        var desde = $("#txtDesde").val();
        var hasta = $("#txtHasta").val();
        var usuario = 0;



        switch (cual) {

            case "1":
                //            alert("entro al 1");
                $.fancybox({
                    'autoDimensions': false,
                    'href': "../Impresiones/Listado_Diabetes_Examenes_Complementarios.aspx?tipo=" + tipo + "&desde=" + desde + "&hasta=" + hasta + "&PDF=" + PDF,
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
                    'href': "../Impresiones/Listado_Diabetes_Tratamiento.aspx?tipo=" + tipo + "&desde=" + desde + "&hasta=" + hasta + "&PDF=" + PDF,
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
                    'href': "../Impresiones/Listado_Diabetes_Complicaciones.aspx?tipo=" + tipo + "&desde=" + desde + "&hasta=" + hasta + "&PDF=" + PDF,
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

            case "4":
                //      para generar todas las ultimas fichas de pacientes

                TraerDiagnosticoYclinica();

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

    function TraerDiagnosticoYclinica() {
        $.ajax({
            type: "POST",
            url: "../Json/Diabetes.asmx/Traer_Fichas_Todas",
            //data: json,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                alert(Resultado.d);

            },
            error: errores
        });
    }


//    $.fancybox({
//        'autoDimensions': false,
//        'href': "../Impresiones/Listado_Diabetes_Complicaciones.aspx?tipo=" + tipo + "&desde=" + desde + "&hasta=" + hasta + "&PDF=" + PDF,
//        'width': '100%',
//        'height': '75%',
//        'autoScale': false,
//        'transitionIn': 'elastic',
//        'transitionOut': 'none',
//        'type': 'iframe',
//        'hideOnOverlayClick': false,
//        'enableEscapeButton': false,
//        'preload': true,
//        'onComplete': function f() {
//            jQuery.fancybox.showActivity();
//            jQuery('#fancybox-frame').load(function () {
//                jQuery.fancybox.hideActivity();
//            });
//        }
//    });