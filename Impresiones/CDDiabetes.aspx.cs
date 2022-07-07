using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;

public partial class Impresiones_CDDiabetes : System.Web.UI.Page
{
    bool Existe = false;

    protected void Page_Load(object sender, EventArgs e)
    {
        int Protocolo = 0;
        if (!string.IsNullOrEmpty(Request.QueryString["Protocolo"]))
        {
            try
            {
                Protocolo = Convert.ToInt32(Request.QueryString["Protocolo"]);
                txtProtocolo.Text = Protocolo.ToString();
                Existe = true;
            }
            catch
            {
                Protocolo = 0;
            }

        }

        if (Protocolo != 0)
        {
            
            Hospital.CentroBLL Centro = new Hospital.CentroBLL();
            centro C = Centro.elCentro();

            ReportParameter[] parameters = new ReportParameter[2];
            parameters[0] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[1] = new ReportParameter("Protocolo", Protocolo.ToString());
            
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


            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ContentType = mimeType;
            HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=Autorizacion." + "PDF"));
            HttpContext.Current.Response.BinaryWrite(byteArray);
            HttpContext.Current.Response.Flush();
            HttpContext.Current.Response.End();
        }
    }
}