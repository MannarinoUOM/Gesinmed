using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_ImpresionIQB_Epicrisis : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["Usuario"] != null)
            {
                Hospital.ImpresionesBLL ii = new Hospital.ImpresionesBLL();
                usuarios u = ((usuarios)Session["Usuario"]);


                ReportParameter[] parameters = new ReportParameter[3];
                parameters[0] = new ReportParameter("Logo", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");


                //if (u.permisos.Contains("141")) parameters[1] = new ReportParameter("Usuario", string.Empty); //Legales
                parameters[1] = new ReportParameter("Usuario", u.nombre);
                parameters[2] = new ReportParameter("imagenFirma", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/firmaImagen/");

                ReportViewer1.LocalReport.EnableExternalImages = true;
                ReportViewer1.LocalReport.SetParameters(parameters);
                ReportViewer1.LocalReport.Refresh();
            }
        }
    }

    public void PDF()
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=IQB_Epicrisis." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}