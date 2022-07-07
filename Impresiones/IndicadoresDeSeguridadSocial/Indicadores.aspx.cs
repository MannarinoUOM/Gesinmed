using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;

public partial class Impresiones_IndicadoresDeSeguridadSocial_Indicadores : System.Web.UI.Page
{
    public bool Existe = true;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Hospital.CentroBLL Centro = new Hospital.CentroBLL();
            centro C = Centro.elCentro();

            ReportParameter[] parameters = new ReportParameter[4];
            parameters[0] = new ReportParameter("imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[1] = new ReportParameter("Usuario", "Impreso Por: " + ((usuarios)Session["Usuario"]).nombre + ". Fecha: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
            parameters[2] = new ReportParameter("desde", Request.QueryString["desde"]);
            parameters[3] = new ReportParameter("hasta", Request.QueryString["hasta"]);
            //parameters[4] = new ReportParameter("hasta", Request.QueryString["hasta"]);

            //parameters[5] = new ReportParameter("a5", Request.QueryString["a5"]);
            //parameters[6] = new ReportParameter("a6", Request.QueryString["a6"]);
            //parameters[7] = new ReportParameter("a7", Request.QueryString["a7"]);
            //parameters[8] = new ReportParameter("a8", Request.QueryString["a8"]);
            //parameters[9] = new ReportParameter("a9", Request.QueryString["a9"]);

            //parameters[10] = new ReportParameter("b11", Request.QueryString["b11"]);
            //parameters[11] = new ReportParameter("b12", Request.QueryString["b12"]);

            //parameters[12] = new ReportParameter("b21", Request.QueryString["b21"]);
            //parameters[13] = new ReportParameter("b22", Request.QueryString["b22"]);
            //parameters[14] = new ReportParameter("b23", Request.QueryString["b23"]);
            //parameters[15] = new ReportParameter("b24", Request.QueryString["b24"]);
            //parameters[16] = new ReportParameter("b25", Request.QueryString["b25"]);

            //parameters[17] = new ReportParameter("b31", Request.QueryString["b31"]);
            //parameters[18] = new ReportParameter("b32", Request.QueryString["b32"]);

            //parameters[19] = new ReportParameter("b41", Request.QueryString["b41"]);
            //parameters[20] = new ReportParameter("b42", Request.QueryString["b42"]);

            //parameters[21] = new ReportParameter("c1", Request.QueryString["c1"]);
            //parameters[22] = new ReportParameter("c2", Request.QueryString["c2"]);
            //parameters[23] = new ReportParameter("c3", Request.QueryString["c3"]);
            //parameters[24] = new ReportParameter("c4", Request.QueryString["c4"]);

            //parameters[25] = new ReportParameter("d1", Request.QueryString["d1"]);
            //parameters[26] = new ReportParameter("d2", Request.QueryString["d2"]);

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