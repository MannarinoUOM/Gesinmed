<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MostrarProtocolo.aspx.cs" Inherits="Laboratorio_MostrarProtocolo" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <%
        
        string Cargar = "";
        Cargar = Request.QueryString["Protocolo"].ToString();
        if (!System.IO.File.Exists(Server.MapPath(".") + "\\Resultado\\" + Cargar + ".pdf"))
        {
            Response.Write("<div style='text-align: center;'>");
            Response.Write("<img src='../img/documento_borrado.jpg'/></br>");
            Response.Write("<b>No se ha encontrado el protocolo solicitado, intente nuevamente en los próximos días.</b>");
            Response.Write("</div>");
            Response.End();
        }
        
    %>
    <object data="Resultado/<%=Cargar %>.pdf" type="application/pdf" width="100%" height="500px">
 
  <p>It appears you don't have a PDF plugin for this browser.
  No biggie... you can <a href="<%=Server.MapPath(".") + "\\Resultado\\" + Cargar + ".pdf" %>">click here to
  download the PDF file.</a></p>
  
</object>
    </div>
    </form>
</body>
</html>
