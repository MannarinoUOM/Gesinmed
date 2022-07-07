using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_Impresion_Ingreso_Ambulatorio : System.Web.UI.Page
{
    public void pdf()
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=Ingreso_Ambulatorio" + Request.QueryString["Id"] + "." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (!string.IsNullOrEmpty(Request.QueryString["Id"]))
            {
                Hospital.CentroBLL c = new Hospital.CentroBLL();
                ReportParameter[] parameters = new ReportParameter[3];
                //parameters[0] = new ReportParameter("Usuario", "" + ((usuarios)Session["Usuario"]).nombre);
                parameters[0] = new ReportParameter("NroInternacion", Request.QueryString["Id"]);
                parameters[1] = new ReportParameter("Logo", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
                parameters[2] = new ReportParameter("Policlinico", c.UnicoCentro()[0].RazonSocial);

                ReportViewer1.LocalReport.EnableExternalImages = true;

                ReportViewer1.LocalReport.SetParameters(parameters);
                ReportViewer1.LocalReport.Refresh();
            }
            else
            {
                Response.End();
            }
        }
    }
}