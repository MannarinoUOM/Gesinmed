using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ObraSocialBLL
/// </summary>
namespace Hospital
{
    public class ObraSocialBLL
    {
        public ObraSocialBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }


        public List<obrasocial> ObraSocial(int? Id)
        {
            ObraSocialDALTableAdapters.H2_ObraSocial_Buscar_IdTableAdapter adapter = new ObraSocialDALTableAdapters.H2_ObraSocial_Buscar_IdTableAdapter();
            ObraSocialDAL.H2_ObraSocial_Buscar_IdDataTable aTable = adapter.GetData(Id);

            List<obrasocial> Lista = new List<obrasocial>();

            foreach (ObraSocialDAL.H2_ObraSocial_Buscar_IdRow row in aTable.Rows)
            {
                obrasocial o = new obrasocial();
                o.id = row.Id;
                o.OS = row.Descripcion;
                if (!row.IsRendicionAcindarNull())
                    o.TipoAcindar = row.RendicionAcindar;
                else o.TipoAcindar = false;
                Lista.Add(o);
            }
            return Lista;
        }

        public List<obrasocial> List_ObraSociales(bool Todas)
        {
            List<obrasocial> lista = new List<obrasocial>();
            FacturacionDALTableAdapters.H2_Facturacion_ObraSocial_ListTableAdapter adapter = new FacturacionDALTableAdapters.H2_Facturacion_ObraSocial_ListTableAdapter();
            FacturacionDAL.H2_Facturacion_ObraSocial_ListDataTable aTable = adapter.GetData(Todas);
            foreach (FacturacionDAL.H2_Facturacion_ObraSocial_ListRow row in aTable.Rows)
            {
                lista.Add(CreateRowFromObraSocial(row));
            }
            return lista;
        }

        public List<ObraSocialesListar> Listar_ObraSociales(string Descripcion, int? Codigo)
        {
            List<ObraSocialesListar> lista = new List<ObraSocialesListar>();
            ObraSocialDALTableAdapters.H2_Fact_OSocial_ListarTableAdapter adapter = new ObraSocialDALTableAdapters.H2_Fact_OSocial_ListarTableAdapter();
            ObraSocialDAL.H2_Fact_OSocial_ListarDataTable aTable = adapter.GetData(Descripcion, Codigo);
            foreach (ObraSocialDAL.H2_Fact_OSocial_ListarRow row in aTable.Rows)
            {
                lista.Add(CreateRowFromObraSocialListar(row));
            }
            return lista;
        }

        private obrasocial CreateRowFromObraSocial(FacturacionDAL.H2_Facturacion_ObraSocial_ListRow row)
        {
            obrasocial o = new obrasocial();
            o.id = row.Id;
            o.OS = row.Descripcion;
            return o;
        }

        private ObraSocialesListar CreateRowFromObraSocialListar(ObraSocialDAL.H2_Fact_OSocial_ListarRow row)
        {
            ObraSocialesListar o = new ObraSocialesListar();
            o.id = row.Id;
            o.OS = row.Descripcion;
            if (!row.IsActivoNull())
            {
                if (row.Activo)
                {
                    o.Estado ="A";
                }
                else
                {
                    o.Estado = "N";
                }
            }
            else
            {
                o.Estado = "N";
            }
            if (!row.IsCUITNull()) { o.CUIT = row.CUIT.ToString(); } else { o.CUIT = ""; }
            if (!row.IsDireccionNull()) { o.Direccion = row.Direccion; } else { o.Direccion = ""; }
            return o;
        }


        public void ObraSocial_Nueva(string Descripcion, int? Codigo, long? CUIT, string Direccion, int Estado,int Editando)
        {
            ObraSocialDALTableAdapters.QueriesTableAdapter adapter = new ObraSocialDALTableAdapters.QueriesTableAdapter();
            object newId = adapter.H2_Fact_OS_Nueva(Codigo, Descripcion, Direccion, CUIT, Estado,Editando);
            if (Convert.ToInt32(newId.ToString()) == 0) throw new Exception("La Obra Social ya Existe");
        }


    }
}