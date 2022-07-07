using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for PatologiasBLL
/// </summary>
namespace Hospital
{
    public class PatologiasBLL
    {
        public PatologiasBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<patologia> Patologia_Lista()
        {
            PatologiaDALTableAdapters.H2_Patologia_ListaTableAdapter adapter = new PatologiaDALTableAdapters.H2_Patologia_ListaTableAdapter();
            PatologiaDAL.H2_Patologia_ListaDataTable aTable = adapter.GetData(0);

            List<patologia> list = new List<patologia>();

            foreach (PatologiaDAL.H2_Patologia_ListaRow row in aTable)
            {
                patologia p = new patologia();
                p.id = row.F1;
                p.patologias = row.ACV;
                list.Add(p);
            }
            return list;
        }

        public List<patologia> List_Patologias(int Id)
        {
            PatologiaDALTableAdapters.H2_PATOLOGIA_LISTTableAdapter adapter = new PatologiaDALTableAdapters.H2_PATOLOGIA_LISTTableAdapter();
            PatologiaDAL.H2_PATOLOGIA_LISTDataTable aTable = adapter.GetData(Id);

            List<patologia> list = new List<patologia>();

            foreach (PatologiaDAL.H2_PATOLOGIA_LISTRow row in aTable)
            {
                patologia p = new patologia();
                p.id = row.Id;
                if (!row.IsDescripcionNull())
                    p.patologias = row.Descripcion;
                else p.patologias = string.Empty;
                if (!row.IsPagaBonoNull())
                    p.pagobono = row.PagaBono;
                else p.pagobono = "S";
                list.Add(p);
            }
            return list;
        }
        

        public patologia Patologia_Id(int Id)
        {
            PatologiaDALTableAdapters.H2_Patologia_Lista_IdTableAdapter adapter = new PatologiaDALTableAdapters.H2_Patologia_Lista_IdTableAdapter();
            PatologiaDAL.H2_Patologia_Lista_IdDataTable aTable = adapter.GetData(0);

            patologia p = new patologia();

            if (aTable.Rows.Count > 0)
            {
                p.id = aTable[0].F1;
                p.patologias = aTable[0].ACV;
            }
           
            return p;
        }

    }
}