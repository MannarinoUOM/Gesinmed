using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


using Microsoft.Reporting.WebForms;
using System.Web.Configuration;

using HospitalBLL.Entities;
using Hospital;

public partial class Impresion_Resolucion28 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (!string.IsNullOrEmpty(Request.QueryString["Id"]))
            {
            ViewState["Id"] = Request.QueryString["Id"];
            }
            pacientes p = new pacientes();
            PacientesBLL pbll = new PacientesBLL();
            Resolucion28 r = new Resolucion28();
            QuirofanoBLL q = new QuirofanoBLL();
            MedicosBLL m = new MedicosBLL();
            r = q.CargarResolucion(Convert.ToInt32(Request.QueryString["Id"].ToString()));

            //HospitalBLL.Entities.Quirofano c = new HospitalBLL.Entities.Quirofano();
            //c = DatosCirugia(Convert.ToInt32(Request.QueryString["Id"].ToString()));

            
            Quirofano c = new Quirofano();
            c = q.Quirofano_CirugiaList(Convert.ToInt32(Request.QueryString["Id"]), null, false)[0];



            p = pbll.Paciente_ID(Convert.ToInt64(r.nhc))[0];

            ReportParameter[] parameters = new ReportParameter[51];


            
            parameters[0] = new ReportParameter("C1", Valor(r.A1) );
            parameters[1] = new ReportParameter("C2", Valor(r.A2));
            parameters[2] = new ReportParameter("C3", Valor(r.A3));
            parameters[3] = new ReportParameter("C4", Valor(r.A4));
            parameters[4] = new ReportParameter("C5", Valor(r.A5));
            parameters[5] = new ReportParameter("C6", Valor(r.A6));
            parameters[6] = new ReportParameter("C7", Valor(r.A7));
            parameters[7] = new ReportParameter("C8", Valor(r.A8));
            parameters[8] = new ReportParameter("C9", Valor(r.A9));
            parameters[9] = new ReportParameter("C10", Valor(r.A10));
            parameters[10] = new ReportParameter("C11", Valor(r.A11));
            parameters[11] = new ReportParameter("C12", Valor(r.A12));
            parameters[12] = new ReportParameter("C13", Valor(r.A13));
            parameters[13] = new ReportParameter("C14", Valor(r.A14));
            
            parameters[14] = new ReportParameter("D1", Valor(r.B1));
            parameters[15] = new ReportParameter("D2", Valor(r.B2));
            parameters[16] = new ReportParameter("D3", Valor(r.B3));
            parameters[17] = new ReportParameter("D4", Valor(r.B4));
            parameters[18] = new ReportParameter("D5", Valor(r.B5));
            parameters[19] = new ReportParameter("D6", Valor(r.B6));

            parameters[20] = new ReportParameter("E1", Valor(r.C1));
            parameters[21] = new ReportParameter("E2", Valor(r.C2));
            parameters[22] = new ReportParameter("E3", Valor(r.C3));
            parameters[23] = new ReportParameter("E4", Valor(r.C4));
            parameters[24] = new ReportParameter("E5", Valor(r.C5));
            parameters[25] = new ReportParameter("E6", Valor(r.C6));
            parameters[26] = new ReportParameter("E7", Valor(r.C7));
            
            parameters[27] = new ReportParameter("E8", Valor(r.C8));
            parameters[28] = new ReportParameter("E9", Valor(r.C9));

            parameters[29] = new ReportParameter("Observaciones", "Observaciones: " + r.observaciones);
            try
            {
                if (c.Circulante_id != 0)
                {
                    parameters[30] = new ReportParameter("Circulante", m.Medicos_Buscar_Info_Con_Baja(c.Circulante_id).Medico);
                }
                else
                {
                    parameters[30] = new ReportParameter("Circulante", "");
                }
            }
            catch
            {
                parameters[30] = new ReportParameter("Circulante", "");
            }


            try
            {
                if (c.anestesista_id != 0)
                {
                    parameters[31] = new ReportParameter("Anestesista", m.Medicos_Buscar_Info_Con_Baja(c.anestesista_id).Medico);
                }
                else {
                    parameters[31] = new ReportParameter("Anestesista", "");
                }
            }
            catch
            {
                parameters[31] = new ReportParameter("Anestesista", "");
            }

            try
            {
                if (c.cirujano_id != 0)
                {
                    parameters[32] = new ReportParameter("Cirujano", m.Medicos_Buscar_Info_Con_Baja(c.cirujano_id).Medico);
                }
                else {
                    parameters[32] = new ReportParameter("Cirujano", "");
                }
            }
            catch
            {
                parameters[32] = new ReportParameter("Cirujano", "");
            }


            parameters[33] = new ReportParameter("Paciente", "<b>Paciente:</b> " + p.Paciente);
            parameters[34] = new ReportParameter("Procedimiento", "<b>Procedimiento:</b> " + q.Cirugia_Tipo_x_CirugiaId(c.id));
            parameters[35] = new ReportParameter("DNI", "<b>Documento:</b> " + p.documento_real);
            parameters[36] = new ReportParameter("nhc", "<b>NHC:</b> " + p.NHC_UOM);
            parameters[37] = new ReportParameter("Fecha", "<b>Fecha:</b> " + c.fecha);



            try
            {
                if (c.cirujano_id != 0)
                {
                    parameters[38] = new ReportParameter("nombreFirmaC", m.Medicos_Buscar_Info_Con_Baja(c.cirujano_id).nombreFirmaC);
                    parameters[39] = new ReportParameter("especialidadNombreC", m.Medicos_Buscar_Info_Con_Baja(c.cirujano_id).especialidadNombreC);
                    parameters[40] = new ReportParameter("matriculaNacionalC", m.Medicos_Buscar_Info_Con_Baja(c.cirujano_id).matriculaNacionalC);
                    parameters[41] = new ReportParameter("imagenRutaC", m.Medicos_Buscar_Info_Con_Baja(c.cirujano_id).imagenRutaC);
                }
                else
                {
                    parameters[38] = new ReportParameter("nombreFirmaC", "");
                    parameters[39] = new ReportParameter("especialidadNombreC", "");
                    parameters[40] = new ReportParameter("matriculaNacionalC", "");
                    parameters[41] = new ReportParameter("imagenRutaC", "");
                }
            }
            catch
            {
                parameters[38] = new ReportParameter("nombreFirmaC", "");
                parameters[39] = new ReportParameter("especialidadNombreC", "");
                parameters[40] = new ReportParameter("matriculaNacionalC", "");
                parameters[41] = new ReportParameter("imagenRutaC", "");
            }


            try
            {
                if (c.anestesista_id != 0)
                {
                    parameters[42] = new ReportParameter("nombreFirmaA", m.Medicos_Buscar_Info_Con_Baja(c.anestesista_id).nombreFirmaA);
                    parameters[43] = new ReportParameter("especialidadNombreA", m.Medicos_Buscar_Info_Con_Baja(c.anestesista_id).especialidadNombreA);
                    parameters[44] = new ReportParameter("matriculaNacionalA", m.Medicos_Buscar_Info_Con_Baja(c.anestesista_id).matriculaNacionalA);
                    parameters[45] = new ReportParameter("imagenRutaA", m.Medicos_Buscar_Info_Con_Baja(c.anestesista_id).imagenRutaA);
                }
                else
                {
                    parameters[42] = new ReportParameter("nombreFirmaA", "");
                    parameters[43] = new ReportParameter("especialidadNombreA", "");
                    parameters[44] = new ReportParameter("matriculaNacionalA", "");
                    parameters[45] = new ReportParameter("imagenRutaA", "");
                }
            }
            catch
            {
                parameters[42] = new ReportParameter("nombreFirmaA", "");
                parameters[43] = new ReportParameter("especialidadNombreA", "");
                parameters[44] = new ReportParameter("matriculaNacionalA", "");
                parameters[45] = new ReportParameter("imagenRutaA", "");
            }


            try
            {
                if (c.Circulante_id != 0)
                {
                    parameters[46] = new ReportParameter("nombreFirmaCC", m.Medicos_Buscar_Info_Con_Baja(c.Circulante_id).nombreFirmaCC);
                    parameters[47] = new ReportParameter("especialidadNombreCC", m.Medicos_Buscar_Info_Con_Baja(c.Circulante_id).especialidadNombreCC);
                    parameters[48] = new ReportParameter("matriculaNacionalCC", m.Medicos_Buscar_Info_Con_Baja(c.Circulante_id).matriculaNacionalCC);
                    parameters[49] = new ReportParameter("imagenRutaCC", m.Medicos_Buscar_Info_Con_Baja(c.Circulante_id).imagenRutaCC);
                }
                else
                {
                    parameters[46] = new ReportParameter("nombreFirmaCC", "");
                    parameters[47] = new ReportParameter("especialidadNombreCC", "");
                    parameters[48] = new ReportParameter("matriculaNacionalCC", "");
                    parameters[49] = new ReportParameter("imagenRutaCC", "");
                }
            }
            catch
            {
                parameters[46] = new ReportParameter("nombreFirmaCC", "");
                parameters[47] = new ReportParameter("especialidadNombreCC", "");
                parameters[48] = new ReportParameter("matriculaNacionalCC", "");
                parameters[49] = new ReportParameter("imagenRutaCC", "");
            }

            parameters[50] = new ReportParameter("imagenFirma", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/firmaImagen/");

            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();

        }
    }

    private string Valor(int p)
    {
        switch (p){
            case 1:
                return "SI";
                //break;
            case 2:
                return "NO";
                //break;
            case 3:
                return "N/A";
                //break;
            default:
                return "";
                }
    }


    public void CrerPDF()
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
            HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=Resolucion28." + "PDF"));
            HttpContext.Current.Response.BinaryWrite(byteArray);
            HttpContext.Current.Response.Flush();
            HttpContext.Current.Response.End();
        
    }

}