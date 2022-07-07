var tipodeInforme = 0;
var tipo = 0;
    var GET = {};

        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
            function decode(s) {
                return decodeURIComponent(s.split("+").join(" "));
            }

            GET[decode(arguments[1])] = decode(arguments[2]);
        });


        cargarSeccionales();

        function cargarSeccionales() {
            var json = JSON.stringify({ "tipo": 1 });
            $.ajax({
                type: "POST",
                data: json,
                url: "../Json/QuirofanoReporte.asmx/TraerFiltros",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: CargarFiltros,
                error: errores
                //complete: cargarEspecialidades
            });
        }


        function CargarFiltros(resultado) {
            var tabla = "Seccionales";
            var lista = resultado.d;
           
            $("#" + tabla).empty();
            var Encabezado = "<table class='table table-hover table-condensed' style='width: 100%;overflow:auto'><thead><tr><th></th></tr></thead><tbody>";
            var Contenido = "";
            $.each(lista, function (index, item) {
                if (index == 0) {

                    Contenido = Contenido + "<tr style='height:20px;'><td style='width:2%'><input type='checkbox' checked='checked'  id='" + item.id + "' onChange='Seleccionar(" + item.id + ")' disabled='disabled'/></td>" +
        "<td style='cursor:auto;width:82%; text-align:left'><label for='" + item.id + "'><strong>" + item.nombre + "</strong></label></td>"
                } else {
                    Contenido = Contenido + "<tr style='height:20px;'><td style='width:2%'><input type='checkbox' class='" + tabla + "' name='" + tabla + "' id='" + item.id + "'  onChange='Seleccionar(" + item.id + ")'/></td>" +
        "<td style='cursor:auto;width:82%; text-align:left'><label for='" + item.id + "'><strong>" + item.nombre + "</label></strong></td>"
                }
            });
            var Pie = "</tbody></table>";
            $("#" + tabla).html(Encabezado + Contenido + Pie);
            tipo = tipo + 1;
        }
       
        function errores(msg) {
            var jsonObj = JSON.parse(msg.responseText);
            alert('Error: ' + jsonObj.Message);
        }
        
       
        if (GET["tipodeInforme"] != "" && GET["tipodeInforme"] != null) {
            tipodeInforme = GET["tipodeInforme"];
        
            switch (tipodeInforme) {
            case "1":
                $("#titulo_prev").html("Reportes de Guardia");
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Guardia</strong>";
                break;
            case "2": 
                $("#titulo_prev").html("Reportes de Producción");
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Producción</strong>";
                break;
            case "3":
                $("#titulo_prev").html("Reportes de Turnos");
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Turnos</strong>";
                break;
            case "4":
                $("#titulo_prev").html("Reportes de Laboratorio");
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Laboratorio</strong>";
                break;
            case "5":
                $("#titulo_prev").html("Reportes de Diabetología");
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Diabetología</strong>";
                break;
            case "6":
                $("#titulo_prev").html("Reportes de ART");
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de ART</strong>";
                break;
            case "7":
                $("#titulo_prev").html("Reportes de Bonos");
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Bonos</strong>";
                break;
            case "8":
                $("#titulo_prev").html("Reportes de Autorizaciones");
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Autorizaciones</strong>";
                break;
            case "9":
                $("#titulo_prev").html("Reportes de Quirófano");
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Quirófano</strong>";
                break;
            case "10":
                $("#titulo_prev").html("Reportes de Internación");
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Internación</strong>";
                break;
            case "11":
                $("#titulo_prev").html("Reportes de Patología");
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Patología</strong>";
                break;
            case "12":
                $("#titulo_prev").html("Reportes de Imágenes");
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Imágenes</strong>";
                break;
            case "13":
                $("#titulo_prev").html("Reportes de Nutrición");
                parent.document.getElementById("DondeEstoy").innerHTML = "Informes > <strong>Reportes de Nutrición</strong>";
                break;
            case "14":
                document.location = "../Informes/reporteCC.aspx";
                break;
        }
    }


    if (GET["tipo"] != "" && GET["tipo"] != null) {
        tipo = GET["tipo"];
//        $("#titulo_diabetes").css('text-aling', 'center');
        switch (tipo) {
            case "1":
                $("#titulo_diabetes").html("DIABETES EXAMENES COMPLEMENTARIOS");
                //$(".titulo_seccion").css('text-align', 'center');
                break;

            case "2":
                $("#titulo_diabetes").html("DIABETES TRATAMIENTO");
                $("#titulo_diabetes").css('text-align', 'center');
                break;

            case "3":
                $("#titulo_diabetes").html("DIABETES COMPLICACIONES");
                $("#titulo_diabetes").css('text-align', 'center');
                break;

            case "4":
                $("#titulo_diabetes").html("IMPRESION FICHA DIABETES");
                $("#titulo_diabetes").css('text-align', 'center');
                break;
        }
        }



        $("#btnVolver").click(function () {
            switch (tipodeInforme) {
                case "1":
                    document.location = "../Informes/ReportesDeGuardia.aspx?tipodeInforme=" + tipodeInforme;
                    break;
                case "2":
                    document.location = "../Informes/ReportesDeProduccion.aspx?tipodeInforme=" + tipodeInforme;
                    break;
                case "3":
                    document.location = "../Informes/ReportesDeTurnos.aspx?tipodeInforme=" + tipodeInforme;
                    break;
                case "4":
                    document.location = "../Informes/ReportesDeLaboratorio.aspx?tipodeInforme=" + tipodeInforme;
                    break;
                case "5":
                    document.location = "../Informes/ReportesDeDiabetologia.aspx?tipodeInforme=" + tipodeInforme;
                    break;
                case "6":
                    document.location = "../Informes/ReportesDeART.aspx?tipodeInforme=" + tipodeInforme;
                    break;
                case "7":
                    document.location = "../Informes/ReportesDeBonos.aspx?tipodeInforme=" + tipodeInforme;
                    break;
                case "8":
                    document.location = "../Informes/ReportesDeAutorizaciones.aspx?tipodeInforme=" + tipodeInforme;
                    break;
                case "9":
                    document.location = "../Informes/ReportesDeQuirofano.aspx?tipodeInforme=" + tipodeInforme;
                    break;
                case "10":
                    document.location = "../Informes/ReportesDeInternacion.aspx?tipodeInforme=" + tipodeInforme;
                    break;
                case "11":
                    document.location = "../Informes/ReportesDePatologia.aspx?tipodeInforme=" + tipodeInforme;
                    break;
                case "12":
                    document.location = "../Informes/ReportesDeImagenes.aspx?tipodeInforme=" + tipodeInforme;
                    break;
                case "13":
                    document.location = "../Informes/ReportesDeNutricion.aspx?tipodeInforme=" + tipodeInforme;
                    break;
            }

        });