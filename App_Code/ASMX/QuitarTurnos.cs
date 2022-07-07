using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for QuitarTurnos
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class QuitarTurnos : System.Web.Services.WebService {

    public QuitarTurnos () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession=true)]
    public void QuitarlosTurnos(string horaInicio, string horaFin, string desde, string hasta, int Medico, int Especialidad, int Todos)
    {
        if (Session["Usuario"] != null)
        {
            DateTime Desde = Convert.ToDateTime(desde);
            DateTime Hasta = Convert.ToDateTime(hasta);
            TimeSpan HoraInicio, HoraFin;
            Hospital.ConfirmarAtencionBLL c = new Hospital.ConfirmarAtencionBLL();
            if (TimeSpan.TryParse(horaInicio, out HoraInicio) && TimeSpan.TryParse(horaFin, out HoraFin))
            {
                if (Desde <= Hasta)
                    c.CancelarTurnosByDayAndHour(Desde, Hasta, Medico, Especialidad, Todos, HoraInicio, HoraFin);
                else throw new Exception("Verifique las fechas");
            }
            else
            {
                if (Desde <= Hasta)
                    c.CancelarTurnosByRange(Desde, Hasta, Medico, Especialidad, Todos);
                else throw new Exception("Verifique las fechas");
            }
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void QuitarTurno(string FechayHora, int Medico, int Especialidad)
    {
        if (Session["Usuario"] != null)
        {
            DateTime Desde;
            if (DateTime.TryParse(FechayHora, out Desde))
            {
                Hospital.ConfirmarAtencionBLL c = new Hospital.ConfirmarAtencionBLL();
                c.CancelarTurno(Desde, Medico, Especialidad);
            }
            else throw new Exception("Verifique la Fecha");
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }
    
}
