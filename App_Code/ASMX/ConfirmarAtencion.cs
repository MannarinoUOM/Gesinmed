using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using HospitalBLL.Entities;

/// <summary>
/// Summary description for ConfirmarAtencion
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class ConfirmarAtencion : System.Web.Services.WebService {

    public ConfirmarAtencion () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 

    }

    [WebMethod]
    public List<TurnosListaenTurnos> Buscar_Turnos(int Especialidad, int Medico, string FechaInicio, string FechaFin)
    {
        int especialidadId = Especialidad;
        int medicoId = Medico;
        DateTime? desde = Convert.ToDateTime(FechaInicio);
        DateTime? hasta = Convert.ToDateTime(FechaFin);

        Time horainicio = Convert.ToDateTime("00:00");
        Time horafin = Convert.ToDateTime("23:59");

        if (!desde.HasValue || !hasta.HasValue)
            throw new Exception("Verifique los Datos");

        Hospital.TurnosBLL turnos = new Hospital.TurnosBLL();
        return turnos.Turnos_Resevados(Especialidad, Medico, desde, hasta, horainicio, horafin, true, null, true);
                
    }

    [WebMethod(EnableSession = true)]
    public void Guardar(List<turnoconfirmaratencion> Turnos, int Medico, int Especialidad)
    {
        if (Session["Usuario"] != null)
        {
            foreach (turnoconfirmaratencion t in Turnos)
            {
                try
                {
                    DateTime f = Convert.ToDateTime(t.Fecha + " " + t.Hora);
                    Hospital.ConfirmarAtencionBLL c = new Hospital.ConfirmarAtencionBLL();
                    c.ConfirmarAtencion(Medico, Especialidad, f);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void DesconfirmarAtencion(string Fecha, int Medico, int Especialidad)
    {
        if (Session["Usuario"] != null)
        {
                try
                {
                    DateTime f = Convert.ToDateTime(Fecha);
                    Hospital.ConfirmarAtencionBLL c = new Hospital.ConfirmarAtencionBLL();
                    c.DesconfirmarAtencion(Medico, Especialidad, f);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }
    
    
}
