using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;

public partial class Impresiones_Patologia_PAP_Estudio_Viejo : System.Web.UI.Page
{
    public bool Existe = true;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Hospital.CentroBLL Centro = new Hospital.CentroBLL();
            centro C = Centro.elCentro();

            ReportParameter[] parameters = new ReportParameter[27];
            parameters[0] = new ReportParameter("imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[1] = new ReportParameter("Usuario", "Impreso por " + ((usuarios)Session["Usuario"]).nombre + " el " + DateTime.Now.ToString("dd/MM/yyyy HH:mm."));
            parameters[2] = new ReportParameter("seccional", Request.QueryString["seccional"]);
            parameters[3] = new ReportParameter("protocolo", Request.QueryString["protocolo"]);
            parameters[4] = new ReportParameter("apellido", Request.QueryString["apellido"]);
            parameters[5] = new ReportParameter("tipo_doc", Request.QueryString["tipo_doc"]);
            parameters[6] = new ReportParameter("documento_real", Request.QueryString["documento_real"]);
            parameters[7] = new ReportParameter("hc", Request.QueryString["hc"]);
            parameters[8] = new ReportParameter("medico", Request.QueryString["medico"]);
            parameters[9] = new ReportParameter("fechaCarga", Request.QueryString["fechaCarga"]);
            parameters[10] = new ReportParameter("fecha_entrega", Request.QueryString["fecha_entrega"]);
            parameters[11] = new ReportParameter("condicionMuestra", Request.QueryString["condicionMuestra"]);
            parameters[12] = new ReportParameter("evaluacion", Request.QueryString["evaluacion"]);
            parameters[13] = new ReportParameter("vinculable", Request.QueryString["vinculable"]);
            parameters[14] = new ReportParameter("diagnostico", Request.QueryString["diagnostico"]);
            parameters[15] = new ReportParameter("glandulares", Request.QueryString["glandulares"]);
            parameters[16] = new ReportParameter("escamosas", Request.QueryString["escamosas"]);
            parameters[17] = new ReportParameter("comentarioDiagnostico", Request.QueryString["comentarioDiagnostico"]);
            parameters[18] = new ReportParameter("otros_comentario", Request.QueryString["otros_comentario"]);
            parameters[19] = new ReportParameter("otrosElementos", Request.QueryString["otrosElementos"]);
            parameters[20] = new ReportParameter("superficiales", Request.QueryString["superficiales"]);
            parameters[21] = new ReportParameter("intermedias", Request.QueryString["intermedias"]);
            parameters[22] = new ReportParameter("parabasales", Request.QueryString["parabasales"]);
            parameters[23] = new ReportParameter("aspecto", Request.QueryString["aspecto"]);
            parameters[24] = new ReportParameter("presencia", Request.QueryString["presencia"]);
            parameters[25] = new ReportParameter("elementos", Request.QueryString["elementos"]);
            parameters[26] = new ReportParameter("extInt", Request.QueryString["extInt"]);



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