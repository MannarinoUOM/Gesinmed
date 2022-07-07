using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using HospitalBLL.Entities;
using System.Globalization;
using System.Data.SqlClient;

/// <summary>
/// Summary description for vacunacionBLL
/// </summary>
/// 


namespace Hospital
{
    public class vacunacionBLL
    {
        public vacunacionBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }


        public List<vacunas> TraerVacunas(int tipo)
        {
            vacunacionTableAdapters.H2_Traer_VacunasTableAdapter adapter = new vacunacionTableAdapters.H2_Traer_VacunasTableAdapter();
            vacunacion.H2_Traer_VacunasDataTable aTable = adapter.GetData(tipo);
            List<vacunas> Lista = new List<vacunas>();

            foreach (vacunacion.H2_Traer_VacunasRow row in aTable.Rows)
            {
                vacunas v = new vacunas();
                v.id = row.id;
                v.tipo = row.Tipo;
                v.descripcion = row.Vacuna;
                v.activa = row.activa;
                Lista.Add(v);
            }
            return Lista;
        }

        public List<tipovacunas> TraerTipoVacuna()
        {
            vacunacionTableAdapters.H2_Traer_Tipo_VacunaTableAdapter adapter = new vacunacionTableAdapters.H2_Traer_Tipo_VacunaTableAdapter();
            vacunacion.H2_Traer_Tipo_VacunaDataTable aTable = adapter.GetData();
            List<tipovacunas> Lista = new List<tipovacunas>();

            foreach (vacunacion.H2_Traer_Tipo_VacunaRow row in aTable.Rows)
            {
                tipovacunas t = new tipovacunas();
                t.id = row.id;
                t.tipo = row.tipo;
                if (!row.IsdescripcionNull()) { t.descripcion = row.descripcion; }              
                t.activo = row.activo;
                Lista.Add(t);
            }
            return Lista;
        }

        public List<grupoFactor> Traer_Grupo_Factor_Saguineo(long afiliadoId)
        {
            vacunacionTableAdapters.H2_Traer_Grupo_Factor_SaguineoTableAdapter adapter = new vacunacionTableAdapters.H2_Traer_Grupo_Factor_SaguineoTableAdapter();
            vacunacion.H2_Traer_Grupo_Factor_SaguineoDataTable aTable = adapter.GetData(afiliadoId);
            List<grupoFactor> Lista = new List<grupoFactor>();

            foreach (vacunacion.H2_Traer_Grupo_Factor_SaguineoRow row in aTable.Rows)
            {
                grupoFactor g = new grupoFactor();
                g.id = row.id;
                g.descripcion = row.descripcion;
                if (!row.IstipoCargadoNull()) {g.seleccionado = row.tipoCargado; }
                Lista.Add(g);
            }
            return Lista;
        }

        public long Insertar_Aplicacion_Vacuna(aplicacion apli){
            vacunacionTableAdapters.QueriesTableAdapter adapter = new vacunacionTableAdapters.QueriesTableAdapter();
            object obj = new object();
             obj = adapter.H2_Insertar_Aplicacion_Vacuna(apli.afiliadoId, apli.vacuna, apli.usuario, apli.fecha,apli.grupoFactor);
             if (obj != null) return Convert.ToInt64(obj.ToString());
             else return -1; 
        }

        public List<aplicacion> Traer_Aplicaciones_Vacuna(aplicacion apli)
        {
            vacunacionTableAdapters.H2_Traer_Aplicaciones_VacunaTableAdapter adapter = new vacunacionTableAdapters.H2_Traer_Aplicaciones_VacunaTableAdapter();
            vacunacion.H2_Traer_Aplicaciones_VacunaDataTable aTable = adapter.GetData(apli.afiliadoId,apli.vacuna,apli.usuario,apli.fecha);
            List<aplicacion> Lista = new List<aplicacion>();

            foreach (vacunacion.H2_Traer_Aplicaciones_VacunaRow row in aTable.Rows)
            {
                aplicacion ap = new aplicacion();
                ap.apellido = row.apellido;
                ap.tipo = row.tipo;
                ap.vacunaName = row.vacuna;
                ap.usuarioName = row.usuario; 
                ap.fecha = row.fecha;
                ap.id = row.id;
                Lista.Add(ap);
            }
            return Lista;
        }

        public long Eliminar_Aplicacion_Vacuna(long id, long usuario)
        {
            vacunacionTableAdapters.QueriesTableAdapter adapter = new vacunacionTableAdapters.QueriesTableAdapter();
            object obj = new object();
            obj = adapter.H2_Eliminar_Aplicacion_Vacuna(id,usuario);
            if (obj != null) return Convert.ToInt64(obj.ToString());
            else return -1;
        }

        public long Guardar_Grupo_Sanguineo(long afiliadoId, int grupoFactor, long usuario)
        {
            vacunacionTableAdapters.QueriesTableAdapter adapter = new vacunacionTableAdapters.QueriesTableAdapter();
            object obj = new object();
            obj = adapter.H2_Guardar_GrupoSanguineo(afiliadoId, grupoFactor, usuario);
            if (obj != null) return Convert.ToInt64(obj.ToString());
            else return -1;
        }


    }
}