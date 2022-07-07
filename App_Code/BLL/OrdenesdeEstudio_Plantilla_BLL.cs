using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for OrdenesdeEstudio_Plantilla_BLL
/// </summary>
namespace Hospital
{
    public class OrdenesdeEstudio_Plantilla_BLL
    {
        public OrdenesdeEstudio_Plantilla_BLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public int Insert_Servicio_Plantilla(ordenes_estudio_cabecera o)
        {
            OrdenesdeEstudio_Plantilla_DALTableAdapters.QueriesTableAdapter adapter = new OrdenesdeEstudio_Plantilla_DALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Ordenes_Estudio_Plantilla_Cab_Insert(o.IdPlantilla, o.Servicio, o.Estado);
            if (obj.ToString() != null) return Convert.ToInt32(obj.ToString());
            else return -1;
        }

        public int Insert_Servicio_Plantilla_Det(ordenes_estudio_detalle o)
        {
            OrdenesdeEstudio_Plantilla_DALTableAdapters.QueriesTableAdapter adapter = new OrdenesdeEstudio_Plantilla_DALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Ordenes_Estudio_Plantilla_Det_Insert(o.IdPlantilla, o.IdDetalle, o.Estudio, o.Estado);
            if (obj.ToString() != null) return Convert.ToInt32(obj.ToString());
            else return -1;
        }

        public List<ordenes_estudio_cabecera> Listar_Plantillas(bool Todos)
        {
            OrdenesdeEstudio_Plantilla_DALTableAdapters.H2_Ordenes_Estudio_Plantilla_Cab_ListTableAdapter adapter = new OrdenesdeEstudio_Plantilla_DALTableAdapters.H2_Ordenes_Estudio_Plantilla_Cab_ListTableAdapter();
            OrdenesdeEstudio_Plantilla_DAL.H2_Ordenes_Estudio_Plantilla_Cab_ListDataTable aTable = adapter.GetData(Todos);
            List<ordenes_estudio_cabecera> list = new List<ordenes_estudio_cabecera>();
            foreach (OrdenesdeEstudio_Plantilla_DAL.H2_Ordenes_Estudio_Plantilla_Cab_ListRow row in aTable.Rows)
            {
                ordenes_estudio_cabecera o = new ordenes_estudio_cabecera();
                o.IdPlantilla = row.IdPlantilla;
                o.Servicio = row.Servicio;
                if (!row.IsEstadoNull())
                    o.Estado = row.Estado;
                else o.Estado = false;
                list.Add(o);
            }
            return list;
        }

        public List<ordenes_estudio_detalle> Listar_PlantillasDetalle(int IdPlantilla, bool Todos)
        {
            OrdenesdeEstudio_Plantilla_DALTableAdapters.H2_Ordenes_Estudio_Plantilla_Det_ListTableAdapter adapter = new OrdenesdeEstudio_Plantilla_DALTableAdapters.H2_Ordenes_Estudio_Plantilla_Det_ListTableAdapter();
            OrdenesdeEstudio_Plantilla_DAL.H2_Ordenes_Estudio_Plantilla_Det_ListDataTable aTable = adapter.GetData(IdPlantilla, Todos);
            List<ordenes_estudio_detalle> list = new List<ordenes_estudio_detalle>();
            foreach (OrdenesdeEstudio_Plantilla_DAL.H2_Ordenes_Estudio_Plantilla_Det_ListRow row in aTable.Rows)
            {
                ordenes_estudio_detalle o = new ordenes_estudio_detalle();
                o.IdPlantilla = row.IdPlantilla;
                o.IdDetalle = row.IdDetalle;
                o.Estudio = row.Estudio;
                if (!row.IsEstadoNull())
                    o.Estado = row.Estado;
                else o.Estado = false;
                list.Add(o);
            }
            return list;
        }

    }
}