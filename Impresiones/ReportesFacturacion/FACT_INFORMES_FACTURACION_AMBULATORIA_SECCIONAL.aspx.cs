using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_ReportesFacturacion_FACT_INFORMES_FACTURACION_AMBULATORIA_SECCIONAL : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ReportParameter[] parameters = new ReportParameter[4];
            usuarios u = (usuarios)Session["Usuario"];
            parameters[0] = new ReportParameter("Usuario", u.nombre);
            parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[2] = new ReportParameter("Desde", Request.QueryString["Desde"]);
            parameters[3] = new ReportParameter("Hasta", Request.QueryString["Hasta"]);
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();
        }
    }

    public void pdf_Click(object sender, EventArgs e)
    {
        Warning[] warnings;
        string[] streamids;
        string mimeType;
        string encoding;
        string extension;

        byte[] byteArray = ReportViewer1.LocalReport.Render("PDF", null, out mimeType, out encoding, out extension, out streamids, out warnings);


        HttpContext.Current.Response.Buffer = true;
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.ContentType = mimeType;
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=ReportesFacturacion_Facturacion_Ambulatorio_Sec_Fec" + DateTime.Now.ToShortDateString() + ".PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}