using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ConsultorioBLL
/// </summary>
namespace Hospital
{
    public class ConsultoriosBLL
    {
        public ConsultoriosBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<consultorio> Consultorios(int Id, string Activo)
        { 
            ConsultoriosDALTableAdapters.H2_Consultorios_ListaTableAdapter adapter = new ConsultoriosDALTableAdapters.H2_Consultorios_ListaTableAdapter();
            ConsultoriosDAL.H2_Consultorios_ListaDataTable aTable = adapter.GetData(Id, Activo);

            List<consultorio> Lista = new List<consultorio>();

            foreach (ConsultoriosDAL.H2_Consultorios_ListaRow row in aTable.Rows)
            {
                consultorio c = new consultorio();
                c.Consultorio = row.Descripcion;
                c.ConsultorioID = row.Id;
                if (row.IsActive == "A")
                {
                    c.Estado = "Activo";
                }
                else
                {
                    c.Estado = "Cerrado";
                }
                Lista.Add(c);
            }
            return Lista;
        }

        public int CerrarConsultorio(int id, string Activo)
        {
            ConsultoriosDALTableAdapters.QueriesTableAdapter adapter = new ConsultoriosDALTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adapter.H2_Turnos_Consultorio_Cerrar(id, Activo));
        }

        public int EliminarConsultorio(int id)
        {
            ConsultoriosDALTableAdapters.QueriesTableAdapter adapter = new ConsultoriosDALTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adapter.H2_Turnos_Consultorio_Eliminar(id));
        }

        public int GuardarConsultorio(int id, string Descripcion)
        {
            ConsultoriosDALTableAdapters.QueriesTableAdapter adapter = new ConsultoriosDALTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adapter.H2_Turnos_Consultorio_Guardar(id,Descripcion,0,0));
        }

    }
}