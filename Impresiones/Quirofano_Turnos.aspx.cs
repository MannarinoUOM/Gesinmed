using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using System.Globalization;

public partial class Impresion_Quirofano_Turnos : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (!string.IsNullOrEmpty(Request.QueryString["Fecha"]))
            {
                txtFecha.Text = Request.QueryString["Fecha"].ToString();
            }
            else
            {
                txtFecha.Text = DateTime.Now.ToShortDateString();
            }

            DateTime Fecha = Convert.ToDateTime(txtFecha.Text);

            CultureInfo ci = new CultureInfo("Es-Es");

            ReportParameter[] parameters = new ReportParameter[4];
            parameters[0] = new ReportParameter("Fecha", ci.DateTimeFormat.GetDayName(Fecha.DayOfWeek) + ", " + Fecha.Day + " de " + ci.DateTimeFormat.GetMonthName(Fecha.Month) + " de " + Fecha.Year);
            parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[2] = new ReportParameter("Usuario", "" + ((usuarios)Session["Usuario"]).nombre);
            parameters[3] = new ReportParameter("imagenFirma", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/firmaImagen/");
            //parameters[3] = new ReportParameter("imagenFirma", "http://10.10.8.66/documentacion_new/firmas/");
            
            
       
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=Turnos." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}