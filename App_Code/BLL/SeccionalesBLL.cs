using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for SeccionalesBLL
/// </summary>
namespace Hospital
{
    public class SeccionalesBLL
    {
        public SeccionalesBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public seccionalesListas SeccionalList()
        {
            seccionalesListas list = new seccionalesListas();
            SeccionalesDALTableAdapters.Seccional_ListTableAdapter adapter = new SeccionalesDALTableAdapters.Seccional_ListTableAdapter();
            SeccionalesDAL.Seccional_ListDataTable aTable = adapter.GetData(null);
            foreach (SeccionalesDAL.Seccional_ListRow row in aTable.Rows)
            {
                seccionales s = new seccionales();
                if (!row.IsIdNull()) s.Nro = row.Id;
                if (!row.IsDescripcionNull()) s.Seccional = row.Descripcion;
                list.Add(s);
            }
            return list;
        }

        public List<seccional> List_Seccionales()
        {
            List<seccional> list = new List<seccional>();
            SeccionalesDALTableAdapters.Seccional_ListTableAdapter adapter = new SeccionalesDALTableAdapters.Seccional_ListTableAdapter();
            SeccionalesDAL.Seccional_ListDataTable aTable = adapter.GetData(null);
            foreach (SeccionalesDAL.Seccional_ListRow row in aTable.Rows)
            {
                seccional s = new seccional();
                if (!row.IsIdNull()) s.id = Convert.ToInt32(row.Id);
                if (!row.IsDescripcionNull()) s.descripcion = row.Descripcion;
                list.Add(s);
            }
            return list;
        }


        public seccionales SeccionalPorNro(int Nro)
        {
            
            SeccionalesDALTableAdapters.Seccional_ListTableAdapter adapter = new SeccionalesDALTableAdapters.Seccional_ListTableAdapter();
            SeccionalesDAL.Seccional_ListDataTable aTable = adapter.GetData(Nro);
            seccionales s = new seccionales();
            if (aTable.Rows.Count > 0)
            {
                s.Nro = aTable[0].Id;
                s.Seccional = aTable[0].Descripcion;
                
            }
            return s;
        }
    }

}