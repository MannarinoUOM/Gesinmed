<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Obitos.aspx.cs" Inherits="Legales_Obitos" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
      <%--  <asp:Label ID="mensaje" runat="server" style="color:Lime; display:none" Text="ARCHIVO ADJUNTADO"></asp:Label>--%>
        <asp:FileUpload ID='btnAdjuntarObito' runat='server' AllowMultiple='true'/>
        <asp:Button ID='btnSubir' onclick="btnSubir_Click" runat='server' Text='Subir Archivo' UseSubmitBehavior='false'/>
        <input type="hidden" id="AfiliadoId" runat="server"/>
        
    </div>
    <div id="archivos"></div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script> 

<script type="text/javascript">
    $(document).ready(function () {
        var GET = {};
        document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
            function decode(s) {
                return decodeURIComponent(s.split("+").join(" "));
            }

            GET[decode(arguments[1])] = decode(arguments[2]);
        });

        if (GET["AfiliadoId"] != "" && GET["AfiliadoId"] != null) {
            $("#AfiliadoId").val(GET["AfiliadoId"]);
            cargarAdjuntos($("#AfiliadoId").val());
        }
    });



    function cargarAdjuntos(afiliadoId) {
        var informar = 0;
        $.ajax({
            type: "POST",
            url: "../Json/Legales/Legales.asmx/TraerIMGObitos",
            data: '{afiliadoId: "' + afiliadoId + '"}',
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
                        var formato = "";
                        colum = parseInt(colum) + 1;
                        if (parseInt(colum) <= 3) {//title='CLICK PARA AGRANDAR EL ARCHIVO'


                            if (item.archivo.substr(-3, item.archivo.length).toLowerCase() == "pdf") { formato = "embed"; } else { formato = "img" }

                            fila = fila + "<td><a class='btn ' href='../obitos/" + item.archivo + "' target='_blank'>VER ARCHIVO</a><" + formato + " style='width:300px; cursor:pointer' src='../obitos/" + item.archivo + "'/></td>";
                            //"<a id='descarga" + item.idArchivo + "' href='../EscaneoAutorizacion/" + item.archivo + "' class='thumbnail btn' download>
                            //"<img class='descarga' data='" + item.idArchivo + "' src='../img/download.png' style='width:20px' style='cursor:pointer' title='CLICK DESCARGAR EL ARCHIVO'/>" +
                            //</a>" +
                            //"<img class='descarga' data='" + item.idArchivo + "' src='../img/ok4.jpg' style='width:20px' style='cursor:pointer' title='CLICK DESCARGAR EL ARCHIVO'/>" +
                      // "<" + formato + " id='" + item.idArchivo + "' class='borrar' style='width:20px;cursor:pointer' src='../img/error.jpg' title='CLICK PARA ELIMINAR ARCHIVO'/></td>";
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

    function errores(msg) {
        var jsonObj = JSON.parse(msg.responseText);
        alert('Error: ' + jsonObj.Message);
    }

</script>