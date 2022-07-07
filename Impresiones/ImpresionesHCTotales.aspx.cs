using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using Hospital;

public partial class Impresiones_ImpresionesHCTotales : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {

            PacientesBLL p = new PacientesBLL();
            ReportParameter[] parameters = new ReportParameter[5];
            parameters[0] = new ReportParameter("Logo", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[1] = new ReportParameter("Usuario", ((usuarios)Session["Usuario"]).nombre);
            parameters[2] = new ReportParameter("Paciente", p.Paciente_ID(Convert.ToInt64(Request.QueryString["NHC"]))[0].Paciente);
            parameters[3] = new ReportParameter("NHC" , p.Paciente_ID(Convert.ToInt64(Request.QueryString["NHC"]))[0].NHC_UOM);
            parameters[4] = new ReportParameter("PacienteImg", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/pacientes/" + Request.QueryString["NHC"].ToString() + ".jpg");
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=HCTotal." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}