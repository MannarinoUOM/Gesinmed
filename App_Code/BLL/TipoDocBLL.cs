using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for TipoDocBLL
/// </summary>
namespace Hospital
{
    public class TipoDocBLL
    {
        public TipoDocBLL()
        {
            //
            // TODO: Add constructor logic here
            //


        }

        public TipoDocList List()
        {
            TipoDocList list = new TipoDocList();
            TipoDocDALTableAdapters.Turnos_TipoDoc_ListTableAdapter adapter = new TipoDocDALTableAdapters.Turnos_TipoDoc_ListTableAdapter();
            TipoDocDAL.Turnos_TipoDoc_ListDataTable aTable = adapter.GetData(null);
            foreach (TipoDocDAL.Turnos_TipoDoc_ListRow row in aTable.Rows)
            {
                list.Add(CreateFromRow(row));
            }
            return list;
        }

        private TipoDoc CreateFromRow(TipoDocDAL.Turnos_TipoDoc_ListRow row)
        {
            TipoDoc l = new TipoDoc(row.Id, row.Descripcion);
            return l;
        }

        public TipoDoc GetById(string id)
        {
            TipoDoc t = null;
            TipoDocDALTableAdapters.Turnos_TipoDoc_ListTableAdapter adapter = new TipoDocDALTableAdapters.Turnos_TipoDoc_ListTableAdapter();
            TipoDocDAL.Turnos_TipoDoc_ListDataTable aTable = adapter.GetData(id);
            foreach (TipoDocDAL.Turnos_TipoDoc_ListRow row in aTable.Rows)
            {
                t = CreateFromRow(row);
            }
            return t;
        }
    }
}