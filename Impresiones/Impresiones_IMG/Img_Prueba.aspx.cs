using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_Impresiones_IMG_Prueba : System.Web.UI.Page
{
    private string TurnoId;
    
    protected void Page_Load(object sender, EventArgs e)
    {        
        TurnoId = Request.QueryString["TurnoId"].PadLeft(10,'0');
        if (!IsPostBack)
        {
            //ReportParameter[] parameters = new ReportParameter[3];
            //parameters[0] = new ReportParameter("Logo", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            //string RutaCodigo = "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + string.Format(@"/fonts/code.ashx?code={0}&format={1}" + "&width=500&height=20&size=60", TurnoId, "0");
            //parameters[1] = new ReportParameter("ImgBono", RutaCodigo);
            //parameters[2] = new ReportParameter("TurnoId", TurnoId);

            //ReportViewer1.LocalReport.EnableExternalImages = true;
            //ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();

        }

    }

    public void pdf()
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=IMG_Turno_" + TurnoId + ".PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}