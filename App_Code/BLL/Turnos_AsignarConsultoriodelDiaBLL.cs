using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Descripción breve de Turnos_AsignarConsultoriodelDia
/// </summary>
public class Turnos_AsignarConsultoriodelDiaBLL
{
	public Turnos_AsignarConsultoriodelDiaBLL()
	{
		//
		// TODO: Agregar aquí la lógica del constructor
		//
	}

    public long ConsultoriodelDia_Insertar(ConsultoriodelDia datos)
    {
        try
        {
            Turnos_AsignarDiaConsultorioDALTableAdapters.QueriesTableAdapter adapter = new Turnos_AsignarDiaConsultorioDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_TURNOS_CONSULTORIODIA_INSERT(datos.ConsultorioDia_Id, datos.ConsultorioDia_MedicoId, datos.ConsultorioDia_EspecialidadId, datos.ConsultorioDia_ConsultorioId,
                Convert.ToDateTime(datos.ConsultorioDia_Fecha), datos.ConsultorioDia_Baja, datos.ConsultorioDia_UsuarioId);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<ConsultoriodelDia> ConsultoriodelDia_List(string Fecha, int ConsultorioId, int EspecialidadId, int MedicoId)
    {
        try
        {
            List<ConsultoriodelDia> lista = new List<ConsultoriodelDia>();
            Turnos_AsignarDiaConsultorioDALTableAdapters.H2_TURNOS_CONSULTORIODIA_LISTTableAdapter adapter = new Turnos_AsignarDiaConsultorioDALTableAdapters.H2_TURNOS_CONSULTORIODIA_LISTTableAdapter();
            Turnos_AsignarDiaConsultorioDAL.H2_TURNOS_CONSULTORIODIA_LISTDataTable aTable = adapter.GetData(Convert.ToDateTime(Fecha),ConsultorioId,EspecialidadId,MedicoId);
            foreach (Turnos_AsignarDiaConsultorioDAL.H2_TURNOS_CONSULTORIODIA_LISTRow row in aTable.Rows)
            {
                ConsultoriodelDia d = new ConsultoriodelDia();
                d.ConsultorioDia_Baja = false;
                d.ConsultorioDia_ConsultorioId = row.ConsultorioId;
                d.ConsultorioDia_EspecialidadId = row.EspecialidadId;
                d.ConsultorioDia_Fecha = row.ConsultorioDia_Fecha.ToShortDateString();
                d.ConsultorioDia_Id = row.ConsultorioDia_Id;
                d.ConsultorioDia_MedicoId = row.MedicoId;
                d.ConsultorioDia_MedicoNombre = row.Medico;
                d.ConsultorioDia_EspecialidadNombre = row.Especialidad;
                d.ConsultorioDia_ConsultorioNombre = row.Consultorio;
                lista.Add(d);
            }
            return lista;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }
}