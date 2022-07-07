<%@ Page Language="C#" AutoEventWireup="true" CodeFile="IMG_Informe_html_rapido.aspx.cs" Inherits="Impresiones_Impresiones_IMG_Informe_html_rapido" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>    
    <link rel="stylesheet" type="text/css" href="../../css/bootstrap.css">

    <style>
     body {font-family: Arial; font-size:15px !important;}
    .DatosInstitucion {  width:100%; line-height: 110%;}    
    .Encabezado u{padding-top:20px;}
    .Encabezado img{width:100px; margin-left: 160px; margin-right:20px;}
    .Cuerpo {margin-top:30px; border: 1px solid black; padding:10px;}
    .Pie {margin-top:20px; }
    .Pie img {max-height:110px; float:left;}
    
    table { border-collapse: collapse; }
    table, th, td { border: 1px solid black; }
    .Informe {margin-top:20px; }
    
@media screen {
  #pageFooter {
    display: none;
  }
}

    
body {
  background: white; 
}

hr
{
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1em 0;
    padding: 0; 
    }
    
    
    </style>

</head>
<body onload="javascript:window.print();">
    <form id="form1" runat="server">
    <page size="A4">
    <div>
        <div class="Encabezado">
            <div style="float:left;">            
                <img src="../../img/logoprint.jpg"/>
            </div>
            
            <div class="DatosInstitucion">
            <b>Unión Obrera Metalúrgica de la R. A.</b><br />
            Policlínico Central<br />
            Hipólito Yrigoyen 3352 - Ciudad de Bs. As.<br />
            Teléfono: 4014-6900 int. 214 - 291<br />
            <b><u>Departamento de Imágenes</u></b><br />
            </div>
        </div>

        <div style="clear:both;"></div>
                
        <div class="Cuerpo">            
            <div>Apellido y Nombre: <b><asp:Literal ID="lit_apellido_nombre" runat="server"></asp:Literal></b></div>
            <div>Fecha de ingreso: <asp:Literal ID="lit_fecha" runat="server"></asp:Literal></div>
            <div>HC: <asp:Literal ID="lit_hc" runat="server"></asp:Literal></div>
            <div>Tipo Orden: <asp:Literal ID="lit_tipoorden" runat="server"></asp:Literal></div>
        </div>

        <hr/>

        <div class="Informe">
            <asp:Literal ID="lit_informe" runat="server"></asp:Literal>
        </div>

        <div class="Pie">
            <div style="float:left;">
                <div>                
                    <div><asp:Literal ID="lit_sobrefirma1" runat="server"></asp:Literal></div>
                    <div><img src="<asp:Literal ID="lit_firma1" runat="server"></asp:Literal>" onerror="this.src='../img/Firmas_IMG/0.png.gif';"/></div>                    
                </div>
            </div>

            <div style="float:left; margin-left:200px;">
                    <div><asp:Literal ID="lit_sobrefirma2" runat="server"></asp:Literal></div>
                    <div><img src="<asp:Literal ID="lit_firma2" runat="server"></asp:Literal>" onerror="this.src='../img/Firmas_IMG/0.png.gif';"/></div>
            </div>



    </div>

    <div style="clear:both;"></div>

    <div id="content">
    <div id="pageFooter"></div>        
    </div>
    </div>
    </page>
    </form>
</body>
</html>
