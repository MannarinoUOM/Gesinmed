using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using Hospital;

public partial class Impresion_ImpresionGuardiaHistorial : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {

            ReportParameter[] parameters = new ReportParameter[5];
            parameters[0] = new ReportParameter("Usuario", "" + ((usuarios)Session["Usuario"]).nombre);
            parameters[1] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[2] = new ReportParameter("RangoFecha", Request.QueryString["Desde"] + " - " + Request.QueryString["Hasta"]);
            if (!string.IsNullOrEmpty(Request.QueryString["NHC"]))
            parameters[3] = new ReportParameter("NHC", Request.QueryString["NHC"]);
            else
            parameters[3] = new ReportParameter("NHC", "Todos");
            if (Request.QueryString["Medico"] != "0")
            {
                MedicosBLL med = new MedicosBLL();
                medicos_Buscar_Info m = med.Medicos_Buscar_Info(int.Parse(Request.QueryString["Medico"]));
                parameters[4] = new ReportParameter("Medico", m.Medico);
            }
            else parameters[4] = new ReportParameter("Medico", "Todos");
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            FuenteHistorialGuardia.DataBind();
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=HIstorialGuardia." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }

}