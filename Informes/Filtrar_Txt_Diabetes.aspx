<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Filtrar_Txt_Diabetes.aspx.cs" Inherits="Informes_Filtrar_Txt_Diabetes" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

    <link rel="stylesheet" type="text/css" href="../css/bootstrap.css" /><link rel="stylesheet" type="text/css" href="../css/barra.css" /><link href="../css/jquery-ui.css" rel="stylesheet" type="text/css" />

<script src="../js/jquery-1.8.3.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/bootstrap.js"></script>
<script src="../js/General.js" type="text/javascript"></script>
<script src="../js/GeneralG.js" type="text/javascript"></script>
<script src="../js/jquery-ui-1.9.2.custom.js" type="text/javascript"></script>
<script src="../js/ui-datepicker-es.js" type="text/javascript"></script>
<script src="../js/jquery.fancybox-1.3.4.pack.js" type="text/javascript"></script>
<link href="../css/jquery.fancybox-1.3.4.css" rel="stylesheet" type="text/css" />
<script src="../js/jquery.maskedinput-1.3.js" type="text/javascript"></script>

<style>
.btnCnetrado
{
    margin-right:125px;
    }
</style>


</head>
<body>
    <form id="form1" runat="server">
    <div>
    
     
    <div class="contenedor_1" style="width:660px; height:292px; margin-top:150px; margin-left:320px">
    <div class="contenedor_2" style="margin-left:125px; height:210px;width:400px">
    <div class="titulo_seccion" style="text-align:center; margin-left:0px">
    <span style=" text-align:center" id="titulo">Archivo SSS</span>
    </div>
    <div class="control-group" style="margin-top:30px">

    </div>


       
       <%--<input id="txtDesde" type="text" maxlength="0" style="width:100px" /><br />--%>
       <div>
       <label style="margin-left:110px; display:inline">Desde</label>
        <asp:TextBox ID="txtDesde" runat="server" Width="100px"></asp:TextBox>
        <label style="margin-left:112px; display:inline">Hasta</label>
        <asp:TextBox ID="txtHasta" runat="server" Width="100px"></asp:TextBox>
        </div>
        
       
       <%--<input id="txtHasta" type="text" maxlength="0" style="width:100px; margin-left:2px"/>--%>
  
            <div class="control-group" style=" float:right">

                <asp:Button ID="btnTxt" runat="server" Text="Generar Archivo" 
                    onclick="btnTxt_Click" CssClass="btn btn-info btnCnetrado"/>

            <%-- <a id="btnGenerarTxt" class="btn btn-info" style="width:100px; margin-right:127px; margin-top:0px; float:right"></a>--%>
             </div>

    </div>
    </div>

    </div>
    </form>
</body>
</html>
<script src="../js/Hospitales/Informes/Generar_Txt_Diabetes.js" type="text/javascript"></script>
