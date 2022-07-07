using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;


/// <summary>
/// Summary description for reclamoAfiliacionesBLL
/// </summary>
public class reclamoAfiliacionesBLL
{
	public reclamoAfiliacionesBLL()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public long Insertar_Error_Afiliacion(long IdReclamo, string titulo, long servicio, string telefono, string reclamo, long afiliadoID, long usuario, int estado)
    {
        try
        {
            reclamosAfiliacionesTableAdapters.QueriesTableAdapter adapter = new reclamosAfiliacionesTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Insertar_Error_Afiliacion(IdReclamo, titulo, servicio, telefono, reclamo, afiliadoID, usuario, estado);

            return Convert.ToInt64(obj);

        }
        catch (SqlException ex)
        {
            return -1;
            throw new Exception(ex.Message);
        }
    }

    public void Reclamo_Afiliacion_Adjunto_Insert(Compras_Adjuntos adjunto)
    {

        reclamosAfiliacionesTableAdapters.QueriesTableAdapter adapter = new reclamosAfiliacionesTableAdapters.QueriesTableAdapter();
        try
        {
            adapter.H2_ErrorAfiliacion_Adjuntos(adjunto.IdReclamo, adjunto.RutaArchivo, adjunto.nombreArchivo);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public List<reclamo> Reclamo_Afiliacion_Buscar(reclamo obj)
        {
        try
        {
            reclamosAfiliacionesTableAdapters.H2_ErrorAfiliacion_BuscarTableAdapter adapter = new reclamosAfiliacionesTableAdapters.H2_ErrorAfiliacion_BuscarTableAdapter();
            reclamosAfiliaciones.H2_ErrorAfiliacion_BuscarDataTable table = new reclamosAfiliaciones.H2_ErrorAfiliacion_BuscarDataTable();
            table = adapter.GetData(obj.reclamoId, obj.afiliadoId, obj.afiliado, obj.dni, obj.nhc, obj.fechaReclamo, obj.fechaResolucion, obj.estado, obj.servId, obj.seccId, obj.retraso,obj.unoTdos);

            List<reclamo> l = new List<reclamo>();
            foreach (reclamosAfiliaciones.H2_ErrorAfiliacion_BuscarRow row in table.Rows)
            {
                reclamo r = new reclamo();

                if (!row.IsAfiliadoIdNull())
                    r.afiliadoId = row.AfiliadoId;

                r.reclamoId = row.IdReclamo;

                if (!row.IstituloNull())
                    r.titulo = row.titulo;

                r.servDescripcion = row.servicio;

                if (!row.IsreclamoNull())
                    r.reclamoDescripcion = row.reclamo;

                r.servId = row.servId;

                if (!row.IssoluccionNull())
                    r.resolucion = row.soluccion;

                r.afiliado = row.afiliado;
                r.dni = row.documento_real.ToString();

                if (!row.IsHC_UOM_CENTRALNull())
                    r.nhc = row.HC_UOM_CENTRAL;

                r.usuApertura = row.usuApertura;
                r.fechaReclamo = row.fechaApertura.ToShortDateString();

                if (!row.IsusuResolucionNull())
                    r.usuResolucion = row.usuResolucion;

                if (!row.IsfechaResolucionNull())
                    r.fechaResolucion = row.fechaResolucion.ToShortDateString();

                if (!row.IsadjuntoNull())
                    r.adjunto = row.adjunto;

                if (!row.IsestadoNull())
                    r.estado = row.estado;

                l.Add(r);
            }

            return l;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long Reclamo_Afiliaciones_Cerrar(long IdReclamo, long usuarioResolucion, string soluccion)
    {
        try
        {
            reclamosAfiliacionesTableAdapters.QueriesTableAdapter adapter = new reclamosAfiliacionesTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_ErrorAfiliacion_Cerrar(IdReclamo, usuarioResolucion, soluccion);

            return Convert.ToInt64(obj);

        }
        catch (SqlException ex)
        {
            return -1;
            throw new Exception(ex.Message);
        }
    }
}