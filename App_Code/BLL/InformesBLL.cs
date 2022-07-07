using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


/// <summary>
/// Summary description for InformesBLL
/// </summary>
namespace Hospital
{
    public class InformesBLL
    {
        public InformesBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }
    public List<informes> TraerSeccionalesEspecialidades(int tipo) {
        ReportesDALTableAdapters.H2_Listados_Traer_Seccionales_Especialidad_ComboTableAdapter adapter = new ReportesDALTableAdapters.H2_Listados_Traer_Seccionales_Especialidad_ComboTableAdapter();
        ReportesDAL.H2_Listados_Traer_Seccionales_Especialidad_ComboDataTable table = new ReportesDAL.H2_Listados_Traer_Seccionales_Especialidad_ComboDataTable();

        table = adapter.GetData(tipo);
        List<informes> lista = new List<informes>();
        foreach (ReportesDAL.H2_Listados_Traer_Seccionales_Especialidad_ComboRow row in table.Rows)
        {
            informes informe = new informes();
            informe.id = row.id;
            informe.descripcion = row.descripcion;

            lista.Add(informe);
        }
        return lista;
    }
    }   
}