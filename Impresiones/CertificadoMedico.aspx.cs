using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using Microsoft.Reporting.WebForms;
using System.Web.Configuration;
using HospitalBLL.Entities;


public partial class Impresion_CertificadoMedico : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Request.QueryString["Id"] != null)
            {
                txtId.Text = Request.QueryString["Id"].ToString();

                centro_unico centro = new centro_unico();
                Hospital.CentroBLL c = new Hospital.CentroBLL();
                centro =  c.UnicoCentro()[0];

                certificadosmedicosImpresion ce = new certificadosmedicosImpresion();
                Hospital.ImpresionesBLL cer = new Hospital.ImpresionesBLL();
                ce = cer.CertificadoMedico_Impresion(Convert.ToInt64(txtId.Text));

                ReportParameter[] parameters = new ReportParameter[10];
                parameters[0] = new ReportParameter("Nombre", "Obra Social de la Unión Metalúrgica de la República Argentina");
                parameters[1] = new ReportParameter("Inscripcion", "Nro de Inscripción " + centro.NroInscripcion);
                parameters[2] = new ReportParameter("Direccion", "" + centro.RazonSocial + " - Tel. " + centro.Telefono.ToString());

                parameters[4] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");

                parameters[5] = new ReportParameter("Titulo", "OSUOMRA");
                parameters[6] = new ReportParameter("Medico", "MÉDICO: " + ce.Medico);

                if (!string.IsNullOrEmpty(ce.Seccional))
                {
                    parameters[7] = new ReportParameter("Seccional", "Seccional: " + ce.Seccional);
                }
                else
                {
                    parameters[7] = new ReportParameter("Seccional", "Seccional: ");
                }
                parameters[8] = new ReportParameter("Fecha", "FECHA: " + ce.Fecha);
                parameters[3] = new ReportParameter("Paciente", "Paciente: " + ce.Paciente + "      Nro. Doc: " + ce.NHC);
                parameters[9] = new ReportParameter("Certificado", ce.Indicaciones);


                ReportViewer1.LocalReport.EnableExternalImages = true;
                ReportViewer1.LocalReport.SetParameters(parameters);
                ReportViewer1.LocalReport.Refresh();
            }
        }
    }

    public void Crear_PDF()
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=CertificadoMedico." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }

}