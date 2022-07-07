using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_Reporte_Supreme__Hc : System.Web.UI.Page
{
    public bool Existe = true;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Hospital.CentroBLL Centro = new Hospital.CentroBLL();
            centro C = Centro.elCentro();

            ReportParameter[] parameters = new ReportParameter[17];
            parameters[0] = new ReportParameter("imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[1] = new ReportParameter("Usuario", "Impreso por " + ((usuarios)Session["Usuario"]).nombre + " el " + DateTime.Now.ToString("dd/MM/yyyy HH:mm."));
            parameters[2] = new ReportParameter("desde", Request.QueryString["desde"].ToString());
            parameters[3] = new ReportParameter("hasta", Request.QueryString["hasta"].ToString());
           

            parameters[4] = new ReportParameter("checkTodos", Request.QueryString["checkTodos"]);
            parameters[5] = new ReportParameter("checkInternaciones", Request.QueryString["checkInternaciones"]);
            parameters[6] = new ReportParameter("checkCirugias", Request.QueryString["checkCirugias"]);
            parameters[7] = new ReportParameter("checkInterconsultas", Request.QueryString["checkInterconsultas"]);
            parameters[8] = new ReportParameter("checkMH", Request.QueryString["checkMH"]);
            parameters[9] = new ReportParameter("checkCA", Request.QueryString["checkCA"]);
            parameters[10] = new ReportParameter("checkAL", Request.QueryString["checkAL"]);
            parameters[11] = new ReportParameter("checkDI", Request.QueryString["checkDI"]);
            parameters[12] = new ReportParameter("checkEndoscopia", Request.QueryString["checkEndoscopia"]);
            parameters[13] = new ReportParameter("checkAP", Request.QueryString["checkAP"]);
            parameters[14] = new ReportParameter("checkAG", Request.QueryString["checkAG"]);
            parameters[15] = new ReportParameter("checkMA", Request.QueryString["checkMA"]);
            parameters[16] = new ReportParameter("PDF", Request.QueryString["PDF"].ToString());

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
            HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=FichaDeConsumo(NHC-" + Request.QueryString["HC"].ToString() + "-desde-" + Request.QueryString["desde"].ToString() + "-hasta-" + Request.QueryString["hasta"].ToString() + ")" + "PDF"));
            HttpContext.Current.Response.BinaryWrite(byteArray);
            HttpContext.Current.Response.Flush();
            HttpContext.Current.Response.End();
        }
    }
}