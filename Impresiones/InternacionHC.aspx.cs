using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Microsoft.Reporting.WebForms;

public partial class Impresiones_InternacionHC : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {

            string lb_ayn = "";
            string lb_fi = "";
            string lb_hora = "";

            string lb_servicio = "";
            string lb_Cama = "";
            string lb_Sala = "";
            string FNacimiento = "";
            string documento = "";
            string edad = "";
            string domicilio = "";
            string osocial = "";
            long AfiliadoId = 0;
            long nroNHC = -1;
            int IntId;

            if (!int.TryParse(Request.QueryString["IntId"], out IntId))  throw new Exception("Error en Nro. de Internación.");
            Hospital.PacientesBLL pacientes = new Hospital.PacientesBLL();
            pacientes p = new pacientes();
            int_ingreso i = new int_ingreso();
            


            try
            {
                Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
                i = h.Ingreso_Id(IntId);
                lb_fi = i.fecha.ToShortDateString();
                lb_hora = i.hora.ToString();
                nroNHC = i.NHC;
                AfiliadoId = i.AfiliadoId;
            }
            catch
            {

            }



            try
            {
                p = pacientes.Paciente_ID(AfiliadoId)[0];
                lb_ayn = p.Paciente;
                FNacimiento = p.fecha_nacimiento.ToShortDateString();
                documento = p.documento_real.ToString();
                edad = p.Edad_Format;
                domicilio = p.calle;
                if (p.Nro_Seccional != "998") osocial = "Seccional: " + p.Seccional;
                else osocial = "Obra Social: " + p.ObraSocial;

            }
            catch
            {

            }


            try
            {
                Hospital.SalasBLL s = new Hospital.SalasBLL();
                List<sala> ls = s.Salas_Lista(null, i.servicioId);
            }
            catch
            {

            }

            try
            {
                List<buscarinternacion> ls = new List<buscarinternacion>();
                Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();
                ls = h.Buscar_Internacion_Id(IntId);
                if (ls.Count > 0)
                {
                    lb_servicio = ls[0].Servicio;
                    lb_Cama = ls[0].Cama;
                    lb_Sala = ls[0].Sala;
                }
            }
            catch
            {
            }


            ReportParameter[] parameters = new ReportParameter[14];
            parameters[0] = new ReportParameter("NroIngreso", Request.QueryString["IntId"]);
            parameters[1] = new ReportParameter("FIngreso", lb_fi);
            parameters[2] = new ReportParameter("Hora", lb_hora);
            parameters[3] = new ReportParameter("Sector", lb_servicio);
            parameters[4] = new ReportParameter("Cama", lb_Cama);
            parameters[5] = new ReportParameter("Habitacion", lb_Sala);
            parameters[6] = new ReportParameter("Apellido", lb_ayn);
            parameters[7] = new ReportParameter("FNacimiento", FNacimiento);
            parameters[8] = new ReportParameter("Documento", documento);
            parameters[9] = new ReportParameter("Edad", edad);
            parameters[10] = new ReportParameter("Domicilio", domicilio);
            parameters[11] = new ReportParameter("OSocial", osocial);
            parameters[12] = new ReportParameter("Imagen", "http://" + Request.Url.Host + ":" + Request.Url.Port + HttpContext.Current.Request.ApplicationPath + "/img/logoprint.jpg");
            parameters[13] = new ReportParameter("NHC", nroNHC.ToString());
            

            
          
                
            //parameters[0] = new ReportParameter("Apellido", lb_ayn);

            

            ReportViewer1.LocalReport.EnableExternalImages = true;
            ReportViewer1.LocalReport.SetParameters(parameters);
            ReportViewer1.LocalReport.Refresh();
        }
    }

    public void Crear_pdf()
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
        HttpContext.Current.Response.AddHeader("content-disposition", ("inline; filename=InternacionNHC." + "PDF"));
        HttpContext.Current.Response.BinaryWrite(byteArray);
        HttpContext.Current.Response.Flush();
        HttpContext.Current.Response.End();
    }
}