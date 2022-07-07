using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
/// <summary>
/// Summary description for InicioBLL
/// </summary>
namespace Hospital
{
    public class InicioBLL
    {
        public InicioBLL()
        {

        }

        public List<version> ListComentarios_Fecha(DateTime Fecha)
        {
            List<version> list = new List<version>();
            InicioDALTableAdapters.H2_INICIO_VERSION_LISTTableAdapter adapter = new InicioDALTableAdapters.H2_INICIO_VERSION_LISTTableAdapter();
            InicioDAL.H2_INICIO_VERSION_LISTDataTable aTable = adapter.GetData(Fecha);
            foreach (InicioDAL.H2_INICIO_VERSION_LISTRow row in aTable.Rows)
            {
                version v = new version();
                v.Comentario = row.Version_Comentario;
                list.Add(v);
            }
            return list;
         }

        public List<version> ListVersiones()
        {
            List<version> list = new List<version>();
            InicioDALTableAdapters.H2_INICIO_VERSION_FECHASTableAdapter adapter = new InicioDALTableAdapters.H2_INICIO_VERSION_FECHASTableAdapter();
            InicioDAL.H2_INICIO_VERSION_FECHASDataTable aTable = adapter.GetData();
            foreach (InicioDAL.H2_INICIO_VERSION_FECHASRow row in aTable.Rows)
            {
                version v = new version();
                v.Fecha = row.Version_Fecha.ToShortDateString();
                v.Version = row.Version_Id;
                list.Add(v);
            }
            return list;
        }

        public List<version> ListVersionComentarios()
        {
            List<version> list = new List<version>();
            InicioDALTableAdapters.H2_INICIO_VERSIONES_COMENTARIOS_LISTTableAdapter adapter = new InicioDALTableAdapters.H2_INICIO_VERSIONES_COMENTARIOS_LISTTableAdapter();
            InicioDAL.H2_INICIO_VERSIONES_COMENTARIOS_LISTDataTable aTable = adapter.GetData();
            foreach (InicioDAL.H2_INICIO_VERSIONES_COMENTARIOS_LISTRow row in aTable.Rows)
            {
                version v = new version();
                v.Id = row.Id;
                v.Fecha = row.Version_Fecha.ToShortDateString();
                v.Version = row.Version_Id;
                v.Comentario = row.Version_Comentario;
                list.Add(v);
            }
            return list;
        }

        public void InsertComentarioVersion(version v)
        {
            InicioDALTableAdapters.QueriesTableAdapter adapter = new InicioDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_INICIO_INSERT_COMENTARIO_VERSION(v.Id, v.Version, v.Comentario, DateTime.Parse(v.Fecha));
            }
            catch (SqlException ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public void DeleteComentarioVersion(long Id)
        {
            InicioDALTableAdapters.QueriesTableAdapter adapter = new InicioDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_INICIO_VERSION_COMENTARIO_DELETE(Id);
            }
            catch (SqlException ex) 
            {
                throw new Exception(ex.Message);
            }
        }
    }
}