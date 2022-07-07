using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_ImpresionEstadisticasMedicosEsp : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ReportParameter [] parametros = new ReportParameter[5];
            parametros[0] = new ReportParameter("Quilmes", Request.QueryString["Quilmes"]);
            parametros[1] = new ReportParameter("Desde", Request.QueryString["Desde"]);
            parametros[2] = new ReportParameter("Hasta", Request.QueryString["Hasta"]);
            parametros[3] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parametros[4] = new ReportParameter("Usuario", ((usuarios)Session["Usuario"]).nombre);
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parametros);
            ReportViewer1.LocalReport.Refresh();
        }
    }

    public void pdf_Click(object sender, EventArgs e)
    {
        //ReportViewer1.LocalReport.ReportPath = "Impresion/ConfirmacionTurnos.rdlc";

        Warning[] warnings;
        string[] streamids;
        string mimeType;
        string encoding;
        string extension;

        byte[] byteArray = ReportViewer1.LocalReport.Render("PDF", null, out mimeType, out encoding, out extension, out streamids, out warnings);


        HttpContext.Current.Response.Buffer = true;
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.ContentType = mimeType;
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=EstadisticaporEspecialidad." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}