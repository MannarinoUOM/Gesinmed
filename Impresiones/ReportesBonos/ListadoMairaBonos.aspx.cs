using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Impresiones_ReportesBonos_ListadoMairaBonos : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            //Hospital.CentroBLL Centro = new Hospital.CentroBLL();
            //centro C = Centro.elCentro();

            //ReportParameter[] parameters = new ReportParameter[3];
            //parameters[0] = new ReportParameter("imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            //parameters[1] = new ReportParameter("Usuario", "Impreso Por: " + ((usuarios)Session["Usuario"]).nombre + ". Fecha: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
            //parameters[2] = new ReportParameter("PDF", Request.QueryString["PDF"]);

            //ReportViewer1.LocalReport.EnableExternalImages = true;
            //ReportViewer1.LocalReport.SetParameters(parameters);
            //ReportViewer1.LocalReport.Refresh();
        }
    }
}