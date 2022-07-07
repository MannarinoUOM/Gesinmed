using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using System.Globalization;

public partial class Impresiones_Endoscopia_Cir_Suspendidas : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportParameter rParam = new ReportParameter();

            DateTime Fecha = Convert.ToDateTime(Request.QueryString["Fecha"]);
            CultureInfo ci = new CultureInfo("Es-Es");

            rParam = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            ReportParameter rParam1 = new ReportParameter();
            ReportParameter rParam2 = new ReportParameter();
            rParam1 = new ReportParameter("Usuario", ((usuarios)Session["Usuario"]).nombre);
            rParam2 = new ReportParameter("Fecha", ci.DateTimeFormat.GetDayName(Fecha.DayOfWeek) + ", " + Fecha.Day + " de " + ci.DateTimeFormat.GetMonthName(Fecha.Month) + " de " + Fecha.Year);
            ReportViewer1.LocalReport.SetParameters(rParam);
            ReportViewer1.LocalReport.SetParameters(rParam1);
            ReportViewer1.LocalReport.SetParameters(rParam2);
            ReportViewer1.LocalReport.Refresh();
        }
    }

    public void Crearpdf()
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=Quirofano_Datos_Internacion." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}