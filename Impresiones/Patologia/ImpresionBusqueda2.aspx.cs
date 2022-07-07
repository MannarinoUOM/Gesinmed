using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.IO;

public partial class Impresiones_Patologia_ImpresionBusqueda2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Hospital.CentroBLL Centro = new Hospital.CentroBLL();
            centro C = Centro.elCentro();

            ReportParameter[] parameters = new ReportParameter[19];
            parameters[0] = new ReportParameter("imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[1] = new ReportParameter("Usuario", "Impreso Por: " + ((usuarios)Session["Usuario"]).nombre + ". Fecha: " + DateTime.Now.ToString("dd/MM/yyyy HH:mm"));
            parameters[2] = new ReportParameter("PDF", Request.QueryString["PDF"]);

            parameters[3] = new ReportParameter("desdeIng", Request.QueryString["desdeIng"]);
            parameters[4] = new ReportParameter("hastaIng", Request.QueryString["hastaIng"]);
            parameters[5] = new ReportParameter("paciente", Request.QueryString["paciente"]);
            parameters[6] = new ReportParameter("dni", Request.QueryString["dni"]);
            parameters[7] = new ReportParameter("hc", Request.QueryString["hc"]);
            parameters[8] = new ReportParameter("seccional", Request.QueryString["seccional"]);
            parameters[9] = new ReportParameter("tipoEstudio", Request.QueryString["tipoEstudio"]);
            parameters[10] = new ReportParameter("medicoCentral", Request.QueryString["medicoCentral"]);
            parameters[11] = new ReportParameter("servicio", Request.QueryString["servicio"]);
            parameters[12] = new ReportParameter("medicoExt", Request.QueryString["medicoExt"]);
            parameters[13] = new ReportParameter("servicioExt", Request.QueryString["servicioExt"]);
            parameters[14] = new ReportParameter("cDiagnostico", Request.QueryString["cDiagnostico"]);
            parameters[15] = new ReportParameter("protocolo", Request.QueryString["protocolo"]);
            parameters[16] = new ReportParameter("pacienteExterno", Request.QueryString["pacienteExterno"]);
            parameters[17] = new ReportParameter("nhcExterno", Request.QueryString["nhcExterno"]);
            parameters[18] = new ReportParameter("material", Request.QueryString["material"]);

            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();
            //ReportViewer1.ShowExportControls = false;
        }
    }

    public void pdf()
    {
        //ReportViewer1.LocalReport.ReportPath = "Impresion/ConfirmacionTurnos.rdlc";

        Warning[] warnings;
        string[] streamids;
        string mimeType;
        string encoding;
        string extension;
        //Session.Timeout = 10;
        byte[] byteArray = ReportViewer1.LocalReport.Render("PDF", null, out mimeType, out encoding, out extension, out streamids, out warnings);


        HttpContext.Current.Response.Buffer = true;
        HttpContext.Current.Response.Clear();
        HttpContext.Current.Response.ContentType = mimeType;
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=GuardiaAtencion." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();

    }

}
