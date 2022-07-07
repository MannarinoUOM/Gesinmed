<%@ Page Language="C#" AutoEventWireup="true" CodeFile="verEscaneos.aspx.cs" Inherits="DerivacionyTraslado_Default2" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
            <div class="container" style="text-align:center">
                <img id="cargando" src="../img/Espere3.gif" />
                <label id="lblMensaje" style="font-size:large; display:none">NO SE ENCONTRARON ARCHIVOS</label>
            <div id="archivos"></div>
            </div>
    </form>
</body>
</html>
    <script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
        <script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript">
    var id = 0;
    $(document).ready(function () {
        var GET = {};
        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
            function decode(s) {
                return decodeURIComponent(s.split("+").join(" "));
            }
            GET[decode(arguments[1])] = decode(arguments[2]);
        });
        if (GET["id"] != "" && GET["id"] != null) {
            id = GET["id"];
            cargarAdjuntos(GET["id"]);
        }
    });


    function cargarAdjuntos(id) {
        var informar = 0;
        $.ajax({
            type: "POST",
            url: "../Json/Documentacion.asmx/DocumentacionArchivosAutorizaciones",
            data: '{id: "' + id + '"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (Resultado) {
                var lista = Resultado.d;
                informar = lista.length;
                $("#archivos").empty();

                if (lista.length > 0) {
                    var encabezado = "<table style='margin-left:200px'>";
                    var fila = "";
                    var colum = 0;
                    var pie = "</table>";

                    $.each(lista, function (index, item) {
                        //alert("\\10.10.8.66\\Files\\Software\\Aplicaciones\\" + item.archivo);
                        //desarrollo
                        //fila = "<tr><td><img onclick='image()' src='//10.10.8.66/Files/Software/Aplicaciones/" + item.archivo + "' href='//10.10.8.66/Files/Software/Aplicaciones/" + item.archivo + "'/></td></tr>";
                        //produccion
                        var linea = "";
                        if (item.archivo.toString().substr(-3, item.archivo.toString().length - 3).toUpperCase() == "PDF") {
                            linea = "<td><embed src='../EscaneoAutorizacion/" + item.archivo + "' width='300' height='400' type='application/pdf' id='pdf' style='cursor:pointer' class='imprimir' />" +
                         "<img id='" + item.idArchivo + "' class='imprimir' style='width:20px;cursor:pointer' src='../EscaneoAutorizacion/" + item.archivo + "'  title='IMPRIMIR ;)'/>" +
                        "<img id='" + item.idArchivo + "' class='borrar' style='width:20px;cursor:pointer' src='../img/error.jpg' title='CLICK PARA ELIMINAR ARCHIVO'/></td>";
                         } else {
                            linea = "<td><img style='width:300px; cursor:pointer' title='IMPRIMIR ;)' class='imprimir' src='../EscaneoAutorizacion/" + item.archivo + "'  />" +
                        "<img id='" + item.idArchivo + "' class='borrar' style='width:20px;cursor:pointer' src='../img/error.jpg' title='CLICK PARA ELIMINAR ARCHIVO'/></td>";
                        }
                        colum = parseInt(colum) + 1;
                        if (parseInt(colum) <= 3) {//title='CLICK PARA AGRANDAR EL ARCHIVO'
                            fila = fila + linea;
                        }
                        else
                        { fila = fila + "</tr><tr>"; colum = 0; }
                    });
                    $("#archivos").html(encabezado + fila + pie);
                }
            },
            complete: function () { $("#cargando").hide(); if (informar <= 0) { $("#lblMensaje").show(); } },
            error: errores
        });

    }

    $(".imprimir").live("click", function () {
        window.open("escaneoImprimir.aspx?ruta=" + $(this).attr("src"), '_blank');
    });

//    $(".descarga").live('click', function () {
//        //alert();
//        // var i = $(this).attr('data'); $("#descarga" + i).click(); 
//        //e.preventDefault();  //stop the browser from following
//        window.location.href = '\\10.10.8.66\Files\Software\Aplicaciones\Gesinmed_AUTORIZACIONES\22-116633-0001.jpg';
//    });

    $(".borrar").live('click', function () {

        var r = confirm("Desea eliminar el archivo?");

        if (r) {
            $.ajax({
                type: "POST",
                url: "../Json/Documentacion.asmx/Documentacion_Autorizacion_Eliminar",
                data: '{id: "' + $(this).attr('id') + '"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (Resultado) {
                    cargarAdjuntos(id);
                },
                //complete: function () { cargarAdjuntos(id); },
                error: errores

            });
        }
    });


    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }
</script>