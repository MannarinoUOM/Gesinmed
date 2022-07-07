using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_GuardiaAtencionPrint : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ReportParameter rParam = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");

            ReportParameter[] param2 = new ReportParameter[2];
            if (((usuarios)Session["Usuario"]).permisos.Contains("141")) param2[0] = new ReportParameter("Usuario", string.Empty); //Legales
            else param2[0] = new ReportParameter("Usuario", "Impreso por: " + ((usuarios)Session["Usuario"]).nombre + " - " + DateTime.Now);

            param2[1] = new ReportParameter("imagenFirma", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/firmaImagen/");
            
            //ReportParameter rParam2 = new ReportParameter("Usuario", ((usuarios)Session["Usuario"]).nombre);
            ReportViewer1.LocalReport.SetParameters(rParam);
            ReportViewer1.LocalReport.SetParameters(param2);
            ReportViewer1.LocalReport.Refresh();
        }
    }

    public void PDF()
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=GuardiaAtencion." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}