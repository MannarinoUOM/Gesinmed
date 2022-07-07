using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for AltaComplejidad_IMG_BLL
/// </summary>
public class AltaComplejidad_IMG_BLL
{
	public AltaComplejidad_IMG_BLL()
	{
		//
		// TODO: Add constructor logic here
		//
	}


    public long IMG_EST_ALT_COMP_ULT_BY_PAC(long PacienteId)
    {
        try
        {
            AltaComplejidad_IMG_DALTableAdapters.QueriesTableAdapter adapter = new AltaComplejidad_IMG_DALTableAdapters.QueriesTableAdapter();
            
            object id = adapter.H2_IMG_EST_ALT_COMP_ULT_BY_PAC(PacienteId);
            if (id != null) return Convert.ToInt64(id.ToString());
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public altacomplejidad AltaComplejidad_IMG_byID(long Protocolo)
    {
        AltaComplejidad_IMG_DALTableAdapters.H2_IMG_ALTA_COMPLEJIDAD_LIST_IDTableAdapter adapter = new AltaComplejidad_IMG_DALTableAdapters.H2_IMG_ALTA_COMPLEJIDAD_LIST_IDTableAdapter();
        AltaComplejidad_IMG_DAL.H2_IMG_ALTA_COMPLEJIDAD_LIST_IDDataTable table = adapter.GetData(Protocolo);
        altacomplejidad od = new altacomplejidad();
        foreach (AltaComplejidad_IMG_DAL.H2_IMG_ALTA_COMPLEJIDAD_LIST_IDRow row in table.Rows)
        {
            od.Practica_Estudios = row.Practicas_Estudios;
            od.Relacion_Algoritmo = row.Relacion_Algoritmo;
            od.Resultados = row.Resultados;
            od.Resumen_HC = row.Resumen_HC;
            od.Fecha = row.Fecha.ToShortDateString();
            od.medicoid = row.MedId;
            od.nhc = row.PacienteId;
        }
        return od;
    }

    public long IMG_AltaComplejidad_Guardar(altacomplejidad obj)
    {
        AltaComplejidad_IMG_DALTableAdapters.QueriesTableAdapter adapter = new AltaComplejidad_IMG_DALTableAdapters.QueriesTableAdapter();
        try
        {
            object o = adapter.H2_IMG_EstudiosAltaComplejidad_Guardar(obj.id, obj.medicoid, obj.nhc, DateTime.Parse(obj.Fecha), obj.Practica_Estudios, obj.Resumen_HC, obj.Relacion_Algoritmo,
                obj.Resultados, obj.UsuarioId,obj.intGuar);
            if (o != null) return Convert.ToInt64(o.ToString());
            else throw new Exception("No se ha podido guardar la orden.");
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<ordenesdeestudiosbuscar> OrdenesdeEstudios_AltaComplejidad_Buscar_IMG(string NHC, string Afiliado, DateTime FechaInicio, DateTime FechaFinal)
    {
        AltaComplejidad_IMG_DALTableAdapters.H2_IMG_LISTAR_EST_ALTA_COMPLEJIDADTableAdapter adapter = new AltaComplejidad_IMG_DALTableAdapters.H2_IMG_LISTAR_EST_ALTA_COMPLEJIDADTableAdapter();
        AltaComplejidad_IMG_DAL.H2_IMG_LISTAR_EST_ALTA_COMPLEJIDADDataTable table = new AltaComplejidad_IMG_DAL.H2_IMG_LISTAR_EST_ALTA_COMPLEJIDADDataTable();
    
        List<ordenesdeestudiosbuscar> Lista = new List<ordenesdeestudiosbuscar>();

        table = adapter.GetData(NHC, Afiliado, FechaInicio, FechaFinal);

        foreach (AltaComplejidad_IMG_DAL.H2_IMG_LISTAR_EST_ALTA_COMPLEJIDADRow row in table.Rows)
        {
            ordenesdeestudiosbuscar od = new ordenesdeestudiosbuscar();
            od.documento = row.PacienteId.ToString();
            od.medicoid = row.MedicoId.ToString();
            od.fechaingreso = row.Fecha.ToShortDateString();
            od.NHC = row.NHC.ToString();
            od.paciente = row.Paciente;
            od.protocolo = row.EstId;
            od.medico = row.Medico;
            od.HC_UOM = row.NHC;
            Lista.Add(od);
        }

        return Lista;
    }

}