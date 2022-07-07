using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using HospitalBLL.Entities;

/// <summary>
/// Summary description for CancelarTurnos
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class CancelarTurnos : System.Web.Services.WebService
{

    public CancelarTurnos()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 

    }

    [WebMethod(EnableSession = true)]
    public List<TurnosListaenTurnos> Buscar_Turnos(int Especialidad, int Medico, string FechaInicio, string FechaFin, string HoraInicio, string HoraFin, bool Libres)
    {
        int especialidadId = Especialidad;
        int medicoId = Medico;
        DateTime? desde = Convert.ToDateTime(FechaInicio);
        DateTime? hasta = Convert.ToDateTime(FechaFin).AddDays(1);
        
        if (HoraInicio == "") { HoraInicio = "00:00"; }
        if (HoraFin == "") { HoraFin = "23:59"; }

        Time horainicio = Convert.ToDateTime(HoraInicio);
        Time horafin = Convert.ToDateTime(HoraFin);


        if (!desde.HasValue || !hasta.HasValue)
            throw new Exception("Verifique los Datos");

        if (desde > hasta) throw new Exception("La Fecha de inicio tiene que ser menor a la fecha final.");

        Hospital.TurnosBLL turnos = new Hospital.TurnosBLL();
        return turnos.Turnos_Resevados(Especialidad, Medico, desde, hasta, horainicio, horafin, Libres, null, true);

    }

    [WebMethod(EnableSession = true)]
    public void CancelarTurno(int medicoId, int especialidadId, string fecha, int Motivo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ConfirmarAtencionBLL c = new Hospital.ConfirmarAtencionBLL();
            DateTime F = Convert.ToDateTime(fecha);
            c.CancelarAtencion(medicoId, especialidadId, F, Motivo, ((usuarios)Session["Usuario"]).id);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod(EnableSession = true)] //Levanta cancelacion de un turno...
    public void DescancelarTurno(int medicoId, int especialidadId, long documento, string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ConfirmarAtencionBLL c = new Hospital.ConfirmarAtencionBLL();
            DateTime f;
            if (!DateTime.TryParse(fecha, out f)) throw new Exception("Error en fecha.");
            c.DescancelarTurno(medicoId, especialidadId, documento, f);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void CancelarTurno_Varios(List<TurnosListaenTurnos> objTurnos, int EspecialidadId, int Motivo)
    {
        if (Session["Usuario"] != null)
        {
            objTurnos.ForEach(delegate(TurnosListaenTurnos obj)
            {
                Hospital.ConfirmarAtencionBLL c = new Hospital.ConfirmarAtencionBLL();
                DateTime F = Convert.ToDateTime(obj.Fecha);
                c.CancelarAtencion(obj.MedicoId, EspecialidadId, F, Motivo, ((usuarios)Session["Usuario"]).id);
            });
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

}
