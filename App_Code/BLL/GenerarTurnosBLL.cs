using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for GenerarTurnosBLL
/// </summary>
namespace Hospital
{
    public class GenerarTurnosBLL
    {
        public GenerarTurnosBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public int GenerateTurnosByRange_IMG(int MedicoId, int EspecialidadId, DateTime FechaInicio, DateTime FechaFin, long Usuario)
        {
            GenerarTurnosDALTableAdapters.QueriesTableAdapter adapter = new GenerarTurnosDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Turnos_Turno_GenerarByRange_IMG(MedicoId, EspecialidadId, FechaInicio, FechaFin,Usuario);
            int Cant = int.Parse(obj.ToString());
            if (MedicoId != 0 && Cant < 0) throw new Exception("Verifique la agenda de médicos.");
            else return Cant;
        }

        public int GenerateTurnosByRange(int MedicoId, int EspecialidadId, DateTime FechaInicio, DateTime FechaFin, long Usuario)
        {
            GenerarTurnosDALTableAdapters.QueriesTableAdapter adapter = new GenerarTurnosDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Turnos_Turno_GenerarByRange(MedicoId, EspecialidadId, FechaInicio, FechaFin, Usuario);
            int Cant = int.Parse(obj.ToString());
            if (MedicoId != 0 && Cant < 0) throw new Exception("Verifique la agenda de médicos.");
            else return Cant;
        }

        public int GenerateTurnosByRange_TodoslosMedicos(int MedicoId, int EspecialidadId, DateTime FechaInicio, DateTime FechaFin, long Usuario)
        {
            int Cant = 0;
            GenerarTurnosDALTableAdapters.H2_TURNOS_AGENDA_TODOS_MEDICOSTableAdapter adapter = new GenerarTurnosDALTableAdapters.H2_TURNOS_AGENDA_TODOS_MEDICOSTableAdapter();
            GenerarTurnosDAL.H2_TURNOS_AGENDA_TODOS_MEDICOSDataTable aTable = adapter.GetData(EspecialidadId, MedicoId);
            foreach (GenerarTurnosDAL.H2_TURNOS_AGENDA_TODOS_MEDICOSRow row in aTable.Rows)
            {
                try
                {
                    //26-10-2015
                    //esto evita que se generen de manera automatica la agenda para IMAGENES                    
                    if (row.EspecialidadId != 339 && row.EspecialidadId != 340 && row.EspecialidadId != 341 && row.EspecialidadId != 342 && row.EspecialidadId != 343)
                    {
                        //esto evita que se generen de manera automatica la agenda para IMAGENES
                        Cant += GenerateTurnosByRange(row.Id, row.EspecialidadId, FechaInicio, FechaFin, Usuario);
                        //esto evita que se generen de manera automatica la agenda para IMAGENES
                    }
                    //esto evita que se generen de manera automatica la agenda para IMAGENES
                }
                catch (SqlException ex) 
                {
                    throw new Exception(ex.Message);
                }
            }
            return Cant;
        }


        public int GenerateTurnosByRange_TodoslosMedicos_IMG(int MedicoId, int EspecialidadId, DateTime FechaInicio, DateTime FechaFin, long Usuario)
        {
            int Cant = 0;
            GenerarTurnosDALTableAdapters.H2_TURNOS_AGENDA_TODOS_MEDICOSTableAdapter adapter = new GenerarTurnosDALTableAdapters.H2_TURNOS_AGENDA_TODOS_MEDICOSTableAdapter();
            GenerarTurnosDAL.H2_TURNOS_AGENDA_TODOS_MEDICOSDataTable aTable = adapter.GetData(EspecialidadId, MedicoId);
            foreach (GenerarTurnosDAL.H2_TURNOS_AGENDA_TODOS_MEDICOSRow row in aTable.Rows)
            {
                try
                {
                    //26-10-2015
                    //esto evita que se generen de manera automatica la agenda para IMAGENES                                        
                    if (row.EspecialidadId == 339 || row.EspecialidadId == 340 || row.EspecialidadId == 341 || row.EspecialidadId == 342 || row.EspecialidadId == 343)
                    {
                        //esto evita que se generen de manera automatica la agenda para IMAGENES
                        Cant += GenerateTurnosByRange_IMG(row.Id, row.EspecialidadId, FechaInicio, FechaFin, Usuario);
                        //esto evita que se generen de manera automatica la agenda para IMAGENES
                    }
                    //esto evita que se generen de manera automatica la agenda para IMAGENES
                }
                catch (SqlException ex)
                {
                    throw new Exception(ex.Message);
                }
            }
            return Cant;
        }



        public int GenerateTurnosByDay(int MedicoId, int EspecialidadId, DateTime DiaYHoraInicio, DateTime DiaYHoraFin, int Duracion, int ConsultorioId)
        {
            GenerarTurnosDALTableAdapters.QueriesTableAdapter adapter = new GenerarTurnosDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Turnos_Turno_GenerarByDiaYHorario(MedicoId, EspecialidadId, DiaYHoraInicio, DiaYHoraFin, Duracion, ConsultorioId);
            return Convert.ToInt32(obj);
        }

        public int QuitarTurnosFeriados(int MedicoID, int Especialidad)
        {
            GenerarTurnosDALTableAdapters.QueriesTableAdapter adapter = new GenerarTurnosDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Feriado_EliminarTurnosConFeriados(MedicoID, Especialidad);
            return Convert.ToInt32(obj);
        }
    }

}