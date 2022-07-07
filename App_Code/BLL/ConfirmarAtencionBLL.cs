using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for ConfirmarAtencionBLL
/// </summary>
namespace Hospital
{
    public class ConfirmarAtencionBLL
    {
        public ConfirmarAtencionBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public void ConfirmarAtencion(int medicoId, int especialidadId, DateTime fecha)
        {
            ConfirmarAtencionDALTableAdapters.QueriesTableAdapter adapter = new ConfirmarAtencionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_AfiliadoTurno_Confirmar(medicoId, especialidadId, fecha);
        }

        public void DesconfirmarAtencion(int medicoId, int especialidadId, DateTime fecha)
        {
            ConfirmarAtencionDALTableAdapters.QueriesTableAdapter adapter = new ConfirmarAtencionDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_TURNOS_DESCONFIRMAR_ATENCION(fecha, especialidadId, medicoId);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void DescancelarTurno(int medicoId, int especialidadId, long documento ,DateTime fecha)
        {
            ConfirmarAtencionDALTableAdapters.QueriesTableAdapter adapter = new ConfirmarAtencionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_TURNOS_DESCANCELAR_TURNO(medicoId, especialidadId, documento ,fecha);
        }

        public void CancelarAtencion(int medicoId, int especialidadId, DateTime fecha, int Motivo, long UsuarioId)
        {
            ConfirmarAtencionDALTableAdapters.QueriesTableAdapter adapter = new ConfirmarAtencionDALTableAdapters.QueriesTableAdapter();
            if (!EsConfirmado(adapter, especialidadId, medicoId, fecha))
            {
                if (Motivo == 3)
                {
                    InsertarPacienteMovimiento(medicoId, especialidadId, fecha);
                    adapter.H2_AfiliadoTurno_Delete(medicoId, especialidadId, fecha);
                }
                else
                {
                    adapter.H2_AfiliadoTurno_Cancelar(medicoId, especialidadId, fecha, Motivo, UsuarioId);
                }
            }
            else
            {
                throw new Exception("No se puede cancelar un turno CONFIRMADO");
            }

        }

        public void InsertarPacienteMovimiento(int medicoId, int especialidadId, DateTime fecha)
        {
            try
            {
                TurnosBLL tbll = new TurnosBLL();
                TurnoInfo t_inf = tbll.TURNO_BUSCAR_POR_MED_ESP_FEC(medicoId, especialidadId, fecha);
                usuarios U = (usuarios)HttpContext.Current.Session["Usuario"];
                Estadisticas.Est_PacienteMovBLL E = new Estadisticas.Est_PacienteMovBLL();
                //Estado = 7 Turno Eliminado...
                E.EstPacMov(t_inf.PacienteId, 7 , (Int32)U.id, "Turno Eliminado // TurnoId: " + t_inf.Turno_Id.ToString() +" // Médico: " + medicoId.ToString() + " // Especialista: " + especialidadId.ToString() + " // Fecha: " + fecha.ToString());
            }
            catch (Exception ex)
            { 
                throw new Exception(ex.Message);
            }
        }

        private bool EsConfirmado(ConfirmarAtencionDALTableAdapters.QueriesTableAdapter adapter, int especialidadId, int medicoId, DateTime fecha)
        {
            return Convert.ToBoolean(adapter.H2_Turno_EsConfirmado(medicoId, especialidadId, fecha));
        }

        public void CancelarTurnosByRange(DateTime Desde, DateTime Hasta, int Medico, int Especialidad, int Todos)
        {
            ConfirmarAtencionDALTableAdapters.QueriesTableAdapter adapter = new ConfirmarAtencionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Turnos_Turno_EliminarbyRange(Desde, Hasta, Medico, Especialidad, Todos);
        }

        public void CancelarTurnosByDayAndHour(DateTime Desde, DateTime Hasta, int Medico, int Especialidad, int Todos, TimeSpan HoraInicio, TimeSpan HoraFin)
        {
            ConfirmarAtencionDALTableAdapters.QueriesTableAdapter adapter = new ConfirmarAtencionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Turnos_Turno_EliminarbyDayAndHour(Desde, Hasta, Medico, Especialidad, Todos, HoraInicio, HoraFin);
        }

        public void CancelarTurno(DateTime Desde, int Medico, int Especialidad)
        {

            ConfirmarAtencionDALTableAdapters.QueriesTableAdapter adapter = new ConfirmarAtencionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Turnos_EliminarTurno(Desde, Medico, Especialidad);
        }
    }
}