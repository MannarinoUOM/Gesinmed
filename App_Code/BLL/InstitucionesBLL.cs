using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for InstitucionesBLL
/// </summary>
namespace Hospital
{
    public class InstitucionesBLL
    {
        public InstitucionesBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<Listainstituciones> InstitucionesLista()
        {
            InstitucionesDALTableAdapters.H2_Fact_InstitucionesListaTableAdapter adapter = new InstitucionesDALTableAdapters.H2_Fact_InstitucionesListaTableAdapter();
            InstitucionesDAL.H2_Fact_InstitucionesListaDataTable aTable = adapter.GetData();

            List<Listainstituciones> Lista = new List<Listainstituciones>();


            foreach (InstitucionesDAL.H2_Fact_InstitucionesListaRow row in aTable.Rows)
            {
                Listainstituciones i = new Listainstituciones();
                i.id = row.id;
                i.insti = row.institucion;
                Lista.Add(i);
            }
            return Lista;

        }
    }
}