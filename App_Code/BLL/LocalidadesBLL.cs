using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for LocalidadesBLL
/// </summary>
namespace Hospital
{
    public class LocalidadesBLL
    {
        public LocalidadesBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<localidades> Localidades_Lista(int Estado)
        {
            LocalidadesDALTableAdapters.H2_LocalidadesTableAdapter adapter = new LocalidadesDALTableAdapters.H2_LocalidadesTableAdapter();
            LocalidadesDAL.H2_LocalidadesDataTable aTable = adapter.GetData(Estado);
            
            List<localidades> lista = new List<localidades>();
            foreach (LocalidadesDAL.H2_LocalidadesRow row in aTable.Rows)
            {
                localidades l = new localidades();
                l.id = row.Id;
                l.localidad = row.Descripcion;
                l.estado = row.Estado;
                lista.Add(l);
            }
            return lista;
        }

        public int Localidades_Guardar(localidades l)
        {
            LocalidadesDALTableAdapters.QueriesTableAdapter adapter = new LocalidadesDALTableAdapters.QueriesTableAdapter();
            try
            {
                object id = adapter.H2_Localidades_Guardar(l.id, l.localidad, l.estado);
                if (id != null) return Convert.ToInt32(id.ToString());
                else throw new Exception("No se ha guardado la localidad.");
            }
            catch (Exception ex) {
                throw new Exception(ex.Message);
            }
        }

    }
}