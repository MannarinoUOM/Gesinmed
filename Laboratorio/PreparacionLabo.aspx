<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PreparacionLabo.aspx.cs" Inherits="Bonos_PreparacionLabo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <title></title>



</head>
<body>
    <div class="clearfix">
    </div>
    <script>
        parent.document.getElementById("DondeEstoy").innerHTML = "Laboratorio > <strong>Preparación de Estudios</strong>";
    </script>
    <form id="form1" runat="server" class="form-horizontal">
    <div class="container" style="padding-top: 30px; height: 1496px;">
        <div class="contenedor_1">
            <div class="contenedor_2" style="width: 600px; margin-left: 20%; height: 90px;">
                <div class="titulo_seccion">
                    <img src="../img/1.jpg">
                    <span>Preparaciones Prácticas</span>
                </div>
                <div class="control-group">
                    <label class="control-label" for="txtCodigo">
                        Código</label>
                    <div class="controls">
                        <input id="txtCodigo" type="text" class="input-small">                        

                        <input type="text" id="txt_Buscar" class="span3" style="margin: 0 auto;" data-provide="typeahead" data-items="4" data-source="[&quot;Prueba&quot;,&quot;Prueba2&quot;]">

                        <a id="btn_Agregar" class="btn"> <i class="icon-ok"></i></a>
                    </div>
                </div>

            </div>
            <div class="clearfix">
            </div>
            <div class="contenedor_3" style="height:340px;">

            
            <div style="display:none;">
            <div id="Frase">
            <img alt="Logo" src="../img/logoprint.png" />
            <br />
            <b>Indicaciones de Laboratorio</b><br />
            Señor/a afililiado/a debe tener en cuenta: <br />
            <br />
            </div>
            </div>

                
                <div id="Contenido" class="minicontenedor100">

            <textarea id="txt_Preparaciones" style="height: 280px; width: 96%; margin-left: 1%"></textarea>

                <%--<div class="contenedor_5" style="width:95%; padding-top:5px;" >--%>
                    

                    <div class="pie_gris" style="margin-left:-22px;"> 
                             <a id="btnAgregarPractica" class="btn btn-info pull-right">Imprimir</a>
                             <a  href="PreparacionLabo.aspx" id="btn_Cancelar" class="btn pull-right">Cancelar</a>                                                 
                    <div class="clearfix"></div>
                    </div>
                </div>
                
            </div>
            
        </div>
    </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/Hospitales/Laboratorio/PreparacionLabo.js" type="text/javascript"></script>


<script>
    $("#txtCodigo").focus();    
</script>