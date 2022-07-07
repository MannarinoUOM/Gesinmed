using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_ReportesImagenes_Reporte_IMG_Tomografia_Mensual_Seccional : System.Web.UI.Page
{
    public bool Existe = true;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ReportParameter[] parameters = new ReportParameter[6];
            usuarios u = (usuarios)Session["Usuario"];
            parameters[0] = new ReportParameter("Usuario", "Impreso Por: " + ((usuarios)Session["Usuario"]).nombre + ". Fecha: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
            parameters[1] = new ReportParameter("imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[2] = new ReportParameter("desde", Request.QueryString["desde"].ToString());
            parameters[3] = new ReportParameter("hasta", Request.QueryString["hasta"].ToString());
            parameters[4] = new ReportParameter("PDF", Request.QueryString["PDF"].ToString());
            parameters[5] = new ReportParameter("especialidadId", Request.QueryString["especialidadId"].ToString());

            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();
        }
    }


    public void pdf()
    {
        if (Existe)
        {
            Warning[] warnings;
            string[] streamids;
            string mimeType;
            string encoding;
            string extension;

            byte[] byteArray = ReportViewer1.LocalReport.Render("PDF", null, out mimeType, out encoding, out extension, out streamids, out warnings);
            //byte[] byteArray = ReportViewer1.LocalReport.Render("PDF");
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ContentType = mimeType;
            HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=ConsultaDiabetica." + "PDF"));
            HttpContext.Current.Response.BinaryWrite(byteArray);
            HttpContext.Current.Response.Flush();
            HttpContext.Current.Response.End();
        }
    }
}