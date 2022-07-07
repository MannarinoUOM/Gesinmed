using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using System.Net;

public partial class Impresiones_ImpresionTodoslosTurnos : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if(!IsPostBack)
        {
            Hospital.CentroBLL C = new Hospital.CentroBLL();
            centro c = C.elCentro();

            ReportParameter[] parameters = new ReportParameter[5];
            parameters[0] = new ReportParameter("RazonSocial", c.RazonSocial);
            parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[2] = new ReportParameter("Usuario", "Impreso por: " + ((usuarios)Session["Usuario"]).nombre + " - Fecha: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
            parameters[3] = new ReportParameter("DiaInicio", Request.QueryString["FechaInicio"]);
            parameters[4] = new ReportParameter("DiaFin", Request.QueryString["FechaFin"]);
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();
        }
    }

    public void pdf_crear()
    {
        //ReportViewer1.LocalReport.ReportPath = "Impresion/ConfirmacionTurnos.rdlc";

        Warning[] warnings;
        string[] streamids;
        string mimeType;
        string encoding;
        string extension;
        try
        {
            byte[] byteArray = ReportViewer1.LocalReport.Render("PDF", null, out mimeType, out encoding, out extension, out streamids, out warnings);
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ContentType = mimeType;
            HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=TurnosdelDia." + "PDF"));
            HttpContext.Current.Response.BinaryWrite(byteArray);
            HttpContext.Current.Response.Flush();
            HttpContext.Current.Response.End();
        }
        catch
        {
             //throw new Exception("Información que deseo incluir", ex);
            //Response.End();
            Response.Redirect("ErrorImpresionTotales.html");
        }



    }
}