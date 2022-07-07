using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for SalasBLL
/// </summary>
namespace Hospital
{
    public class SalasBLL
    {
        public SalasBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<sala> Salas_Lista(int? Id, int Servicio)
        {
            SalasDALTableAdapters.H2_Sala_ListaTableAdapter adapter = new SalasDALTableAdapters.H2_Sala_ListaTableAdapter();
            SalasDAL.H2_Sala_ListaDataTable aTable = adapter.GetData(Id, Servicio);
            List<sala> Lista = new List<sala>();

            foreach (SalasDAL.H2_Sala_ListaRow row in aTable.Rows)
            {
                sala s = new sala();
                s.estado = (row.state_id == 1) ? true : false;
                s.clase = (row.state_id == 1) ? "btn-success" : "btn-danger";
                s.claseD = (row.state_id == 1) ? "Activo" : "No Activo";
                s.id = row.Id;
                s.descripcion = row.Descripcion;
                s.servicio = Servicio;
                Lista.Add(s);
            }
            return Lista;
        }

        public List<sala_A> Salas_Lista_A(int? Id, int Servicio)
        {
            SalasDALTableAdapters.H2_Sala_Lista_ATableAdapter adapter = new SalasDALTableAdapters.H2_Sala_Lista_ATableAdapter();
            SalasDAL.H2_Sala_Lista_ADataTable aTable = adapter.GetData(Id, Servicio);
            List<sala_A> Lista = new List<sala_A>();

            foreach (SalasDAL.H2_Sala_Lista_ARow row in aTable.Rows)
            {
                sala_A s = new sala_A();
                s.id = row.Id;
                s.descripcion = row.Descripcion;
                s.servicio = Servicio;
                disponibilidadsala disp = new disponibilidadsala();
                disp = Disponibilidad(s.id, DateTime.Now);
                s.Ocupadas = disp.Ocupadas;
                s.Libres = disp.Libres;
                s.Totales = disp.Totales;
                Lista.Add(s);
            }
            return Lista;
        }

        public void Guardar(int Id, string Sala, int Servicioid )
        {
            SalasDALTableAdapters.QueriesTableAdapter adapter = new SalasDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Sala_Guardar(Id, Sala, Servicioid);
        }

        public disponibilidadsala Disponibilidad(int salaId, DateTime fecha)
        {
            disponibilidadsala disp = new disponibilidadsala();
            SalasDALTableAdapters.H2_Sala_DisponibilidadTableAdapter adapter = new SalasDALTableAdapters.H2_Sala_DisponibilidadTableAdapter();

            foreach (SalasDAL.H2_Sala_DisponibilidadRow r in adapter.GetData(salaId, fecha))
            {
                if (r.Ocupada != 0)
                    disp.Ocupadas = disp.Ocupadas + 1;
                else
                    disp.Libres = disp.Libres + 1;
            }
            disp.Totales = disp.Ocupadas + disp.Libres;
            return disp;
        }

        public int CambiarEstado(int Id, bool Estado)
        {
            bool e = (Estado) ? true : false;
            SalasDALTableAdapters.QueriesTableAdapter adapter = new SalasDALTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adapter.H2_Sala_CambiarEstado(Id, e));
        }

        public void Eliminar(int Id)
        {
            SalasDALTableAdapters.QueriesTableAdapter adapter = new SalasDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Sala_Eliminar(Id);
        }

    }
}