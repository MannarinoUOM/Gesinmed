using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using HospitalBLL.Entities;

/// <summary>
/// Summary description for GenerarTurnos
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class GenerarTurnos : System.Web.Services.WebService {

    public GenerarTurnos () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession=true)]
    public string Guardar_Dias_Atencion(int medicoId, int EspecialidadId, string FechaDesde, string FechaHasta, string HoraInicio, string HoraFin, string Duracion, int ConsultorioId, int Tipo)
    {
        if (Session["Usuario"] != null)
        {
            int cantidadDeTurnosGenerados = 0;
            int cantidadDeTurnosEliminados = 0;
            //Rango
            long UsuarioId = ((usuarios)Session["Usuario"]).id;

            if (Tipo == 1)
            {

                if (FechaDesde == "") { throw new Exception("El rango de días a generar tiene ingresadas fechas incorrectas."); }
                if (FechaHasta == "") { throw new Exception("El rango de días a generar tiene ingresadas fechas incorrectas."); }

                DateTime? DiaYHoraInicio = Convert.ToDateTime(FechaDesde);
                DateTime? DiaYHoraFin = Convert.ToDateTime(FechaHasta).AddHours(23).AddMinutes(59).AddMilliseconds(99);

                if (DiaYHoraInicio > DiaYHoraFin) { throw new Exception("El rango de días a generar tiene ingresadas fechas incorrectas."); }

                if (medicoId == 0 || EspecialidadId == 0)
                {
                    try
                    {
                        Hospital.GenerarTurnosBLL gt = new Hospital.GenerarTurnosBLL();
                        cantidadDeTurnosGenerados = gt.GenerateTurnosByRange_TodoslosMedicos(medicoId, EspecialidadId, DiaYHoraInicio.Value, DiaYHoraFin.Value, UsuarioId);
                    }
                    catch (Exception ex)
                    {

                    }
                    return "Se han generados los turnos correctamente.";
                }
                else
                {
                    try
                    {
                        Hospital.GenerarTurnosBLL gt = new Hospital.GenerarTurnosBLL();
                        cantidadDeTurnosGenerados = gt.GenerateTurnosByRange(medicoId, EspecialidadId, DiaYHoraInicio.Value, DiaYHoraFin.Value, UsuarioId);
                        cantidadDeTurnosEliminados = gt.QuitarTurnosFeriados(medicoId, EspecialidadId);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(ex.Message);
                    }
                }
            }

            if (Tipo == 2)
            {
                DateTime FechaP = DateTime.Now;
                if (FechaDesde == "" || !DateTime.TryParse(FechaDesde, out FechaP)) { throw new Exception("El rango de días a generar tiene ingresadas fechas incorrectas."); }
                if (HoraInicio == "" || !DateTime.TryParse("01/01/2013 " + HoraInicio, out FechaP)) { throw new Exception("El rango de días a generar tiene ingresadas fechas incorrectas."); }
                if (HoraFin == "" || !DateTime.TryParse("01/01/2013 " + HoraFin, out FechaP)) { throw new Exception("Revise la hora final"); }

                DateTime? Fecha = Convert.ToDateTime(FechaDesde);
                Time DiaYHoraInicio = Convert.ToDateTime(HoraInicio);
                Time DiaYHoraFin = Convert.ToDateTime(HoraFin);
                int duracion = Convert.ToInt32(Duracion);

                DateTime fechaInicio = Fecha.Value.AddHours(DiaYHoraInicio.Hour).AddMinutes(DiaYHoraInicio.Minutes);
                DateTime fechaFin = Fecha.Value.AddHours(DiaYHoraFin.Hour).AddMinutes(DiaYHoraFin.Minutes);

                try
                {
                    int dur = Convert.ToInt32(Duracion);
                    Hospital.GenerarTurnosBLL gt = new Hospital.GenerarTurnosBLL();
                    Hospital.TurnosBLL T = new Hospital.TurnosBLL();

                    Hospital.TurnosBLL t = new Hospital.TurnosBLL();
                    bool AtiendeMedico = false;
                    AtiendeMedico = t.Atiende_El_Dia(medicoId, EspecialidadId, fechaInicio);
                    if (AtiendeMedico)
                    {
                        throw new Exception("El Médico no atiende ese día");
                    }

                    cantidadDeTurnosGenerados = gt.GenerateTurnosByDay(medicoId, EspecialidadId, fechaInicio, fechaFin, dur, ConsultorioId);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }

                try
                {
                    Hospital.GenerarTurnosBLL gt = new Hospital.GenerarTurnosBLL();
                    cantidadDeTurnosEliminados = gt.QuitarTurnosFeriados(medicoId, EspecialidadId);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }


            return string.Format("Se generaron {0} turnos", Convert.ToInt32(cantidadDeTurnosGenerados) - Convert.ToInt32(cantidadDeTurnosEliminados));

        }
        else throw new Exception("Inicie Sesión Nuevamente.");
        
    }



    //26/10/2015
    //ESTO ES PARA IMAGENES, LO HAGO POR SEPARADO PARA EVITAR MODIFICAR LAS COSAS DE FEDE....
    [WebMethod(EnableSession = true)]
    public string Guardar_Dias_Atencion_IMG(int medicoId, int EspecialidadId, string FechaDesde, string FechaHasta, string HoraInicio, string HoraFin, string Duracion, int ConsultorioId, int Tipo)
    {
        if (Session["Usuario"] != null)
        {
            int cantidadDeTurnosGenerados = 0;
            int cantidadDeTurnosEliminados = 0;
            //Rango
            long UsuarioId = ((usuarios)Session["Usuario"]).id;

            if (Tipo == 1)
            {

                if (FechaDesde == "") { throw new Exception("El rango de días a generar tiene ingresadas fechas incorrectas."); }
                if (FechaHasta == "") { throw new Exception("El rango de días a generar tiene ingresadas fechas incorrectas."); }

                DateTime? DiaYHoraInicio = Convert.ToDateTime(FechaDesde);
                DateTime? DiaYHoraFin = Convert.ToDateTime(FechaHasta).AddHours(23).AddMinutes(59).AddMilliseconds(99);

                if (DiaYHoraInicio > DiaYHoraFin) { throw new Exception("El rango de días a generar tiene ingresadas fechas incorrectas."); }

                if (medicoId == 0 || EspecialidadId == 0)
                {
                    try
                    {
                        Hospital.GenerarTurnosBLL gt = new Hospital.GenerarTurnosBLL();
                        cantidadDeTurnosGenerados = gt.GenerateTurnosByRange_TodoslosMedicos_IMG(medicoId, EspecialidadId, DiaYHoraInicio.Value, DiaYHoraFin.Value, UsuarioId);
                    }
                    catch (Exception ex)
                    {

                    }
                    return "Se han generados los turnos correctamente.";
                }
                else
                {
                    try
                    {
                        Hospital.GenerarTurnosBLL gt = new Hospital.GenerarTurnosBLL();
                        cantidadDeTurnosGenerados = gt.GenerateTurnosByRange_IMG(medicoId, EspecialidadId, DiaYHoraInicio.Value, DiaYHoraFin.Value, UsuarioId);
                        cantidadDeTurnosEliminados = gt.QuitarTurnosFeriados(medicoId, EspecialidadId);
                    }
                    catch (Exception ex)
                    {
                        throw new Exception(ex.Message);
                    }
                }
            }

            if (Tipo == 2)
            {
                DateTime FechaP = DateTime.Now;
                if (FechaDesde == "" || !DateTime.TryParse(FechaDesde, out FechaP)) { throw new Exception("El rango de días a generar tiene ingresadas fechas incorrectas."); }
                if (HoraInicio == "" || !DateTime.TryParse("01/01/2013 " + HoraInicio, out FechaP)) { throw new Exception("El rango de días a generar tiene ingresadas fechas incorrectas."); }
                if (HoraFin == "" || !DateTime.TryParse("01/01/2013 " + HoraFin, out FechaP)) { throw new Exception("Revise la hora final"); }

                DateTime? Fecha = Convert.ToDateTime(FechaDesde);
                Time DiaYHoraInicio = Convert.ToDateTime(HoraInicio);
                Time DiaYHoraFin = Convert.ToDateTime(HoraFin);
                int duracion = Convert.ToInt32(Duracion);

                DateTime fechaInicio = Fecha.Value.AddHours(DiaYHoraInicio.Hour).AddMinutes(DiaYHoraInicio.Minutes);
                DateTime fechaFin = Fecha.Value.AddHours(DiaYHoraFin.Hour).AddMinutes(DiaYHoraFin.Minutes);

                try
                {
                    int dur = Convert.ToInt32(Duracion);
                    Hospital.GenerarTurnosBLL gt = new Hospital.GenerarTurnosBLL();
                    Hospital.TurnosBLL T = new Hospital.TurnosBLL();

                    Hospital.TurnosBLL t = new Hospital.TurnosBLL();
                    bool AtiendeMedico = false;
                    AtiendeMedico = t.Atiende_El_Dia(medicoId, EspecialidadId, fechaInicio);
                    if (AtiendeMedico)
                    {
                        throw new Exception("El Médico no atiende ese día");
                    }

                    cantidadDeTurnosGenerados = gt.GenerateTurnosByDay(medicoId, EspecialidadId, fechaInicio, fechaFin, dur, ConsultorioId);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }

                try
                {
                    Hospital.GenerarTurnosBLL gt = new Hospital.GenerarTurnosBLL();
                    cantidadDeTurnosEliminados = gt.QuitarTurnosFeriados(medicoId, EspecialidadId);
                }
                catch (Exception ex)
                {
                    throw new Exception(ex.Message);
                }
            }


            return string.Format("Se generaron {0} turnos", Convert.ToInt32(cantidadDeTurnosGenerados) - Convert.ToInt32(cantidadDeTurnosEliminados));

        }
        else throw new Exception("Inicie Sesión Nuevamente.");

    }
    
}
