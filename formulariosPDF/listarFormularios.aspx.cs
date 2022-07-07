using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;


public partial class formulariosPDF_listarFormularios : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        DirectoryInfo di = new DirectoryInfo(@"\\\\10.10.8.66\\Files\\DocParaFirmar\\");
        //Console.WriteLine("No search pattern returns:");
        //StringWriter w = new StringWriter();
        //HtmlTextWriter writer = new HtmlTextWriter(w);
        Response.Write("<div class='container' style='margin-top:5%'>");
        Response.Write("<div class='titulo_seccion' style='margin-left:40%'>Formularios PDF</div>");
        Response.Write("<div class='contenedor_bono' style='overflow:auto'>");
        Response.Write("<table class='table table-hover' >");
        int id = 1;
        foreach (var fi in di.GetFiles())
        {
            Response.Write("<tr class='seleccionar' id='"+ id +"'><td style='cursor:pointer'>" + fi.Name + "</td><td style='display:none' id='ruta"+ id +"'>" + fi.FullName + "</td></tr>");
            id++;
        }
        Response.Write("</table>");
        Response.Write("</div>");
        Response.Write("</div>");
    }
}