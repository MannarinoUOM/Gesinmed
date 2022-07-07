using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing;
using System.IO;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using Hospital;

public partial class Impresiones_Quirofano_Listado_Control_Facturacion : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {

            ReportParameter[] parameters = new ReportParameter[8];
            parameters[0] = new ReportParameter("imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[1] = new ReportParameter("Usuario", "Impreso Por: " + ((usuarios)Session["Usuario"]).nombre + ". Fecha: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
            parameters[2] = new ReportParameter("desde", Request.QueryString["desde"] );
            parameters[3] = new ReportParameter("hasta", Request.QueryString["hasta"]);
            parameters[4] = new ReportParameter("tipo", Request.QueryString["tipo"]);
            parameters[5] = new ReportParameter("prioridad", Request.QueryString["prioridad"]);
            parameters[6] = new ReportParameter("PDF", Request.QueryString["PDF"]);
            parameters[7] = new ReportParameter("T", Request.QueryString["T"]);

            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();

        }
    }

    public void pdf_Click()
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=ProtesisyOtros." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}