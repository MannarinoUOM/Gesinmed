using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Internacion_HistoriaClinicadeIngreso : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            long nroNHC = Convert.ToInt64(Request.QueryString["HNC"]);
            Int32 IntId = Convert.ToInt32(Request.QueryString["IntId"]);
            Hospital.PacientesBLL pacientes = new Hospital.PacientesBLL();
            pacientes p = new pacientes();
            int_ingreso i = new int_ingreso();
            try
            {
                p = pacientes.Paciente_NHC(nroNHC)[0];
                lb_ayn.Text = p.Paciente;
                lb_edad.Text = (DateTime.Now.Year - p.fecha_nacimiento.Year).ToString();
                lb_fn.Text = p.fecha_nacimiento.ToShortDateString();
                lb_dni.Text = p.documento.ToString();
                lb_domicilio.Text = p.calle + " " + p.numero;
                lb_OS.Text = p.ObraSocial;
                lb_nhc.Text = IntId.ToString();

            }
            catch
            { 
            
            }


            try
            {
                Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();                
                i = h.Ingreso_Id(IntId);
                lb_fi.Text = i.fecha.ToShortDateString();
                lb_hora.Text = i.hora.ToString();
                lb_servicio.Text = "";
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

            try {
                List<buscarinternacion> ls = new List<buscarinternacion>();
                Hospital.InternacionesBLL h = new Hospital.InternacionesBLL();                
                ls = h.Buscar_Internacion_Id(IntId);
                if (ls.Count > 0)
                {
                    lb_servicio.Text = ls[0].Servicio;
                    lb_Cama.Text = ls[0].Cama;
                    lb_Sala.Text = ls[0].Sala;
                }
            }
            catch { 
            }

        }
    }
}