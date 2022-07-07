<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ranking_SN.aspx.cs" Inherits="ranking_SN" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
        <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" />
    <link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" href="../css/barra.css" />
    <link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
        <div class="contenedor_1" style="width:900px; height:350px; margin-top:150px; margin-left:auto; margin-right:auto">
        <div id="contenedorFiltros" class="contenedor_2" style="margin-left:30px; height:300px;width:840px; padding-bottom:0px">
        <div class="titulo_seccion" style="text-align:center; margin-left:0px"><span style=" text-align:center" id="titulo">Ranking de Prácticas</span></div>

        <div id="fechas">
        <label style="display:inline; margin:50px">Fecha</label><label style="margin-left:50px; display:inline">Desde
        <input id="txtDesde" type="text" maxlength="0" style="width:100px; text-align:center" class="desde" runat="server" /></label>
        <label style="margin-left:50px; display:inline">Hasta
        <input id="txtHasta" type="text" maxlength="0" style="width:100px; margin-left:2px ; text-align:center" class="hasta" runat="server"/></label>
        <label style="display:inline; margin:10px" class="numeroEntero">Cantidad
        <input id="txtCantidad" type="text" maxlength="2" style="text-align:center" class="input-mini" value="20" runat="server"/></label>
        </div>
  

        <div>
        <label style="display:inline; margin:50px">Ordenar por</label>
        <label style="display:inline; margin:10px" for="rdoOs">Obra Social</label>
        <input id="rdoOs" type="radio" name="por"  style=" margin:0px" runat="server"/>
        <label style="display:inline; margin:10px" for="rdoP">Cantidad</label>
        <input id="rdoP" type="radio" name="por" style=" margin:0px" checked="checked"/>
        <label style="display:inline; margin:10px" for="rdoAsc">Ascendente</label>
        <input id="rdoAsc" type="radio" name="como" style=" margin:0px" runat="server"/>
        <label style="display:inline; margin:10px" for="rdoDes">Descendente</label>
        <input id="rdoDes" type="radio" name="como" checked="checked" style=" margin:0px"/>
        </div>

        <div style="width:90%; height:150px ;margin:auto; margin-top:5px; border-color:#F3F3F3; border-width:1px; border-style:solid">
        <div>
        <div style="height:30px; width:50%;float:left"><label style="width:25%; display:inline">Incluye<input type="checkbox"  style="margin:0px" checked="checked" id="chkIncOs" runat="server"/></label><label style=" margin-left:50%; display:inline">Seleccionar todas<input type="checkbox" style="margin:0px" checked="checked" id="chkTodOs"/></label></div> 
        <div style="height:30px; width:50%;float:left"><label style="width:25%; display:inline">Incluye<input type="checkbox" style="margin:0px" checked="checked" id="chkIncPr" runat="server"/></label><label style=" margin-left:50%; display:inline">Seleccionar todas<input type="checkbox" style="margin:0px" checked="checked" id="chkTdcpr"/></label></div>
        </div>
        <div id="img1" style=" text-align:center; height:5px; width:50%; float:left; position:relative; z-index:10"><img src="../img/esperar.gif" height="40px" width="40px"/><br />Espere por favor</div>
        <div id="img2" style=" text-align:center; height:5px;width:50%; float:left; position:relative; z-index:10"><img src="../img/esperar.gif" height="40px" width="40px" /><br />Espere por favor</div>
        
        <div style="height:120px; width:50%; overflow:auto; float:left"><div id="obrasSociales" style="margin:auto" runat="server"></div></div>   
        <div style="height:120px; width:50%; overflow:auto; float:left"><div id="practicas" style="margin:auto"  runat="server"></div></div>    
        </div>

        <div style=" margin-top:5px"><a class="btn btn-info pull-right imprimir"  style=" margin-left:4px;margin-right:4px" id="btnPDF">PDF</a>
        <a class="btn btn-info pull-right imprimir"  style=" margin-right:4px; display:none" id="btnEXCEL">EXCEL</a>
        <asp:Button class="btn btn-info pull-right" style=" margin-right:4px" ID="btnExcel" runat="server" Text="Descargar a EXCEL"  onclick="H2_Gen_List"/>
        </div>
            
    <asp:TextBox ID="idsObrasSociales" runat="server"  style="display:none"></asp:TextBox>
    <asp:TextBox ID="idsPracticas" runat="server" style="display:none"></asp:TextBox>

        </div>
            
        </div>
    </form>
</body>
</html>
<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script> 
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>   
<script src="../js/Hospitales/ranking_SN/ranking_SN.js" type="text/javascript"></script>
<%--<script type="text/javascript">
    parent.document.getElementById("DondeEstoy").innerHTML = "<strong>Ranking de prácticas</strong>";
</script>--%>