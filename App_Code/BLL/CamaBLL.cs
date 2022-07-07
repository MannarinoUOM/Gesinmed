using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for CamaBLL
/// </summary>
namespace Hospital
{
    public class CamaBLL
    {
        public CamaBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<cama> Cama_Lista(int? Id, int SalaId)
        {
            CamaDALTableAdapters.H2_Cama_ListaTableAdapter adapter = new CamaDALTableAdapters.H2_Cama_ListaTableAdapter();
            CamaDAL.H2_Cama_ListaDataTable aTable = adapter.GetData(Id, SalaId);
            List<cama> Lista = new List<cama>();

            foreach (CamaDAL.H2_Cama_ListaRow row in aTable.Rows)
            {
                cama c = new cama();
                c.estado = (row.state_id == 1) ? true : false;
                c.clase = (row.state_id == 1) ? "btn-success" : "btn-danger";
                c.claseD = (row.state_id == 1) ? "Activo" : "No Activo";
                c.id = row.Id;
                c.descripcion = row.Descripcion;
                c.sala = SalaId;
                Lista.Add(c);
            }
            return Lista;
        }

        public List<cama_A> Cama_Lista_A(int? Id, int SalaId)
        {
            CamaDALTableAdapters.H2_Cama_Lista_ATableAdapter adapter = new CamaDALTableAdapters.H2_Cama_Lista_ATableAdapter();
            CamaDAL.H2_Cama_Lista_ADataTable aTable = adapter.GetData(Id, SalaId);
            List<cama_A> Lista = new List<cama_A>();

            foreach (CamaDAL.H2_Cama_Lista_ARow row in aTable.Rows)
            {
                cama_A c = new cama_A();
                c.id = row.Id;
                c.descripcion = row.Descripcion;
                c.sala = SalaId;
                string Disp = Disponibilidad_Det(c.id, DateTime.Now);
                if (!string.IsNullOrEmpty(Disp))
                {
                    c.Paciente = Disp;
                }
                else
                {
                    c.Paciente = "";
                }
                Lista.Add(c);
            }
            return Lista;
        }


        public string Disponibilidad_Det(int Cama, DateTime Fecha)
        {
            CamaDALTableAdapters.H2_Cama_Disponibilidad_DetTableAdapter adapter = new CamaDALTableAdapters.H2_Cama_Disponibilidad_DetTableAdapter();
            CamaDAL.H2_Cama_Disponibilidad_DetDataTable aTable = adapter.GetData(Cama, Fecha);
            
            if (aTable.Rows.Count > 0)
            {            
                return aTable[0].apellido;    
            }
            return null;
        }

        public int CambiarEstado(int Id, bool Estado)
        {
            bool e = (Estado) ? true : false;
            CamaDALTableAdapters.QueriesTableAdapter adapter = new CamaDALTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adapter.H2_Cama_CambiarEstado(Id, e));
        }

        public void Guardar(int Id, string Cama, int SalaId)
        {
            CamaDALTableAdapters.QueriesTableAdapter adapter = new CamaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Cama_Guardar(Id, Cama, SalaId);
        }

        public void Eliminar(int Id)
        {
            CamaDALTableAdapters.QueriesTableAdapter adapter = new CamaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Cama_Eliminar(Id);
        }

    }
}