using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using Hospital;

public partial class Impresiones_ImpresionHistoricoTurnosporPaciente : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
                ReportParameter[] parameters = new ReportParameter[6];
                parameters[0] = new ReportParameter("Usuario", "" + ((usuarios)Session["Usuario"]).nombre);
                parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
                parameters[2] = new ReportParameter("Desde", "" + Request.QueryString["Desde"].ToString());
                parameters[3] = new ReportParameter("Hasta", "" + Request.QueryString["Hasta"].ToString());
                PacientesBLL pbll = new PacientesBLL();
                long ID;
                if (!long.TryParse(Request.QueryString["NHC"].ToString(), out ID)) throw new Exception("Error en Nro. HC");
                pacientes objP = pbll.Paciente_ID(ID)[0];
                parameters[4] = new ReportParameter("NHC", "" + objP.NHC_UOM);
                parameters[5] = new ReportParameter("Seccional", "" + objP.Seccional);
                ReportViewer1.LocalReport.EnableExternalImages = true;
                ReportViewer1.LocalReport.SetParameters(parameters);
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=HistoricoTurnos." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}