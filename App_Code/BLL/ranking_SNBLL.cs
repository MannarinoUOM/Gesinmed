using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Web.UI;
using System.Web.UI.WebControls;
/// <summary>
/// Summary description for ranking_SNBLL
/// </summary>
public class ranking_SNBLL
{
    public ranking_SNBLL()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public List<rank_SNI> ObraSocial_List()
    {
        ranking_SNDALTableAdapters.ObraSocial_ListTableAdapter adapter = new ranking_SNDALTableAdapters.ObraSocial_ListTableAdapter();

        ranking_SNDAL.ObraSocial_ListDataTable aTable = adapter.GetData(0);
        List<rank_SNI> Lista = new List<rank_SNI>();
        foreach (ranking_SNDAL.ObraSocial_ListRow row in aTable.Rows)
        {
            rank_SNI item = new rank_SNI();
            item.obraSocialId = row.Id;
            item.obraSocial = row.Descripcion;
            Lista.Add(item);
        }
        return Lista;
    }

    public List<rank_SNI> H2_Practica_List_Codigo()
    {
        ranking_SNDALTableAdapters.H2_Practica_List_CodigoTableAdapter adapter = new ranking_SNDALTableAdapters.H2_Practica_List_CodigoTableAdapter();

        ranking_SNDAL.H2_Practica_List_CodigoDataTable aTable = adapter.GetData(0, 0);
        List<rank_SNI> Lista = new List<rank_SNI>();
        foreach (ranking_SNDAL.H2_Practica_List_CodigoRow row in aTable.Rows)
        {
            rank_SNI item = new rank_SNI();
            item.practicaId = row.Id;
            item.practica = row.Descripcion;
            Lista.Add(item);
        }
        return Lista;
    }
}


