<%@ Page Language="C#" AutoEventWireup="true" CodeFile="UvY6qDfJDtWAyjfWJZbCa3b.aspx.cs" Inherits="Impresiones_Impresiones_IMG_IMG_Informe_html" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>    
    <link rel="stylesheet" type="text/css" href="../../css/bootstrap.css">

    <style>
    .DatosInstitucion {left:100px; font-size:20px; float:left; margin-left:150px; width:100%;}
    .Encabezado {position:relative;}
    .Encabezado u{font-size:25px;padding-top:20px;}
    .Encabezado img{width:120px;}
    .Cuerpo {margin-top:20px;}
    .Pie {margin-top:20px;}
    .Pie img{width:110px;}
    
    table { border-collapse: collapse; }
    table, th, td { border: 1px solid black; }
    .Informe {margin-top:20px;}
    


    
body {
  background: white; 
}


    
    </style>

</head>
<body onload="javascript:window.print();">
    <form id="form1" runat="server">
    <page size="A4">
    <div>
        <div class="Encabezado" id="encabezadoDiv" runat="server">
            <div style="float:left; position:absolute;">            
                <img src="../../img/logoprint.jpg"/>
            </div>
            
            <div class="DatosInstitucion" id="DatosInstitucion" runat="server">
            <b>Unión Obrera Metalúrgica de la R. A.</b><br />
            Policlínico Central<br />
            Hipólito Yrigoyen 3352 - Ciudad de Bs. As.<br />
            Teléfono: 4014-6900 int. 214 - 291<br />
            <b><u>Departamento de Imágenes</u></b><br />
            </div>
        </div>

        <div style="clear:both;"></div>
                
        <div class="Cuerpo" id="cuerpoDiv" runat="server">            
            <div>Apellido y Nombre: <asp:Literal ID="lit_apellido_nombre" runat="server"></asp:Literal></div>
            <div>Fecha: <asp:Literal ID="lit_fecha" runat="server"></asp:Literal></div>
            <div>HC: <asp:Literal ID="lit_hc" runat="server"></asp:Literal></div>
        </div>

        <div class="Informe" id="informeDiv" runat="server">
            <asp:Literal ID="lit_informe" runat="server"></asp:Literal>
        </div>

        <div class="Pie" id="pieDiv" runat="server">
            <div style="float:left;">
                <div>                
                    <div><asp:Literal ID="lit_sobrefirma1" runat="server"></asp:Literal></div>
                    <div><img src="<asp:Literal ID="lit_firma1" runat="server"></asp:Literal>" /></div>                    
                </div>
            </div>

            <div style="float:left; margin-left:200px;" id="firmasDiv" runat="server">
                    <div><asp:Literal ID="lit_sobrefirma2" runat="server"></asp:Literal></div>
                    <div><img src="<asp:Literal ID="lit_firma2" runat="server"></asp:Literal>" /></div>
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
