using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using Hospital;

public partial class Impresiones_ImpresionFarmacia_HistorialporPaciente : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            ReportParameter[] parameters = new ReportParameter[6];
            parameters[0] = new ReportParameter("Usuario", "" + ((usuarios)Session["Usuario"]).nombre);
            parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[2] = new ReportParameter("Desde", Request.QueryString["Desde"]);
            parameters[3] = new ReportParameter("Hasta", Request.QueryString["Hasta"]);
            
            long _id;
            if (!long.TryParse(Request.QueryString["Id"], out _id)) throw new Exception("Paciente Incorrecto.");
            parameters[4] = new ReportParameter("PacienteId", Request.QueryString["Id"]);

            PacientesBLL pbll = new PacientesBLL();
            parameters[5] = new ReportParameter("Seccional", pbll.Paciente_ID(_id)[0].Seccional);
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();
        }
    }

    public void Crearpdf()
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=HistorialFarmacia." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}