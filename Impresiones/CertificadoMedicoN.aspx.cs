using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;
using Hospital;

public partial class Impresiones_CertificadoMedicoN : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            long IdPaciente;
            int Medico;
            string NombreMed, Paciente;
            if (!long.TryParse(Request.QueryString["ID"], out IdPaciente)) throw new Exception("Error en Paciente.");
            if (!int.TryParse(Request.QueryString["MedicoID"], out Medico)) throw new Exception("Error en Medico.");

            PacientesBLL pbll = new PacientesBLL();
            pacientes p = pbll.Paciente_ID(IdPaciente)[0];
            MedicosBLL mbll = new MedicosBLL();
            medicos_Buscar_Info m = mbll.Medicos_Buscar_Info(Medico);

            if (m.Sexo != null)
            {
                if (m.Sexo.Equals("1")) NombreMed = "El Dr. " + m.Medico;
                else NombreMed = "La Dra. " + m.Medico;
            }
            else NombreMed = "Dr. " + m.Medico;

            if (p.sexo != null)
            {
                if (p.sexo.Equals("1")) Paciente = "El SR  " + p.Paciente;
                else Paciente = "LA SRA " + p.Paciente;
            }
            else Paciente = "El SR " + p.Paciente;

            certificadosmedicosImpresion ce = new certificadosmedicosImpresion();
            Hospital.ImpresionesBLL cer = new Hospital.ImpresionesBLL();
            ce = cer.CertificadoMedico_Impresion(Convert.ToInt64(Request.QueryString["IdCertificado"]));


            ReportParameter[] parameters = new ReportParameter[7];
            parameters[0] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[1] = new ReportParameter("Medico", NombreMed);
            parameters[2] = new ReportParameter("Paciente", Paciente);
            parameters[3] = new ReportParameter("NHC", p.NHC_UOM);
            parameters[4] = new ReportParameter("Observaciones", ce.Indicaciones);
            parameters[5] = new ReportParameter("imagenFirma", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/firmaImagen/");
            parameters[6] = new ReportParameter("dni", Request.QueryString["dni"]);
            //parameters[5] = new ReportParameter("internacion",Request.QueryString["internacion"]); 
            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=CertificadoMedicoN." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}