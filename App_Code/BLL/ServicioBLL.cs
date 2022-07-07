using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ServicioBLL
/// </summary>
namespace Hospital
{
    public class ServicioBLL
    {
        public ServicioBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<servicio> Servicio_Lista(int? Id, string Servicio)
        {
            ServicioDALTableAdapters.H2_Servicio_ListaTableAdapter adapter = new ServicioDALTableAdapters.H2_Servicio_ListaTableAdapter();
            ServicioDAL.H2_Servicio_ListaDataTable aTable = adapter.GetData(Id, Servicio);
            List<servicio> Lista = new List<servicio>();

            foreach (ServicioDAL.H2_Servicio_ListaRow row in aTable.Rows)
            {
                servicio s = new servicio();
                s.estado = (row.state_id == 1) ? true: false;
                s.clase = (row.state_id == 1) ? "btn-success" : "btn-danger";
                s.claseD = (row.state_id == 1) ? "Activo" : "No Activo";
                s.id = row.Id;
                s.descripcion = row.Descripcion;
                Lista.Add(s);
            }
            return Lista;
        }

        public List<servicio> Servicio_Lista_Solo_Fact(int? Id, string Servicio)
        {
            ServicioDALTableAdapters.H2_Servicio_Lista_Solo_FactTableAdapter adapter = new ServicioDALTableAdapters.H2_Servicio_Lista_Solo_FactTableAdapter();
            ServicioDAL.H2_Servicio_Lista_Solo_FactDataTable aTable = adapter.GetData(Id, Servicio);
            List<servicio> Lista = new List<servicio>();

            foreach (ServicioDAL.H2_Servicio_Lista_Solo_FactRow row in aTable.Rows)
            {
                servicio s = new servicio();
                s.estado = (row.state_id == 1) ? true: false;
                s.clase = (row.state_id == 1) ? "btn-success" : "btn-danger";
                s.claseD = (row.state_id == 1) ? "Activo" : "No Activo";
                s.id = row.Id;
                s.descripcion = row.Descripcion;
                Lista.Add(s);
            }
            return Lista;
        }
        

        public List<servicio> Servicio_Lista_A(int? Id, string Servicio)
        {
            ServicioDALTableAdapters.H2_Servicio_Lista_ATableAdapter adapter = new ServicioDALTableAdapters.H2_Servicio_Lista_ATableAdapter();
            ServicioDAL.H2_Servicio_Lista_ADataTable aTable = adapter.GetData(Id, Servicio);
            List<servicio> Lista = new List<servicio>();

            foreach (ServicioDAL.H2_Servicio_Lista_ARow row in aTable.Rows)
            {
                servicio s = new servicio();
                s.id = row.Id;
                s.descripcion = row.Descripcion;
                Lista.Add(s);
            }
            return Lista;
        }

        public List<servicio> Servicio_Lista_A_At_Internados(int? Id, string Servicio)
        {
            ServicioDALTableAdapters.H2_Servicio_Lista_A_At_InternadosTableAdapter adapter = new ServicioDALTableAdapters.H2_Servicio_Lista_A_At_InternadosTableAdapter();
            ServicioDAL.H2_Servicio_Lista_A_At_InternadosDataTable aTable = adapter.GetData(Id, Servicio);
            List<servicio> Lista = new List<servicio>();

            foreach (ServicioDAL.H2_Servicio_Lista_A_At_InternadosRow row in aTable.Rows)
            {
                servicio s = new servicio();
                s.id = row.Id;
                s.descripcion = row.Descripcion;
                Lista.Add(s);
            }
            return Lista;
        }

        public List<servicio> Servicios_Archivo(int? Id, string Servicio) //SERVICIOS PARA ARCHIVO
        {
            ServicioDALTableAdapters.H2_ARCHIVO_LIST_SERVICIOSTableAdapter adapter = new ServicioDALTableAdapters.H2_ARCHIVO_LIST_SERVICIOSTableAdapter();
            ServicioDAL.H2_ARCHIVO_LIST_SERVICIOSDataTable aTable = adapter.GetData(Id, Servicio);
            List<servicio> Lista = new List<servicio>();

            foreach (ServicioDAL.H2_ARCHIVO_LIST_SERVICIOSRow row in aTable.Rows)
            {
                servicio s = new servicio();
                s.id = row.Id;
                s.descripcion = row.Descripcion;
                Lista.Add(s);
            }
            return Lista;
        }
        

        public void CambiarEstado(int Id, bool Estado)
        {
            ServicioDALTableAdapters.QueriesTableAdapter adapter = new ServicioDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Servicio_CambiarEstado(Id, Estado);
        }

        public void GuardarServicio(int Id, string Servicio)
        {
            ServicioDALTableAdapters.QueriesTableAdapter adapter = new ServicioDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Servicio_Guardar(Id, Servicio);
        }

        public int CambiarEstado(int Id, string Descripcion, bool Estado)
        {
            bool e = (Estado) ? true : false;
            ServicioDALTableAdapters.QueriesTableAdapter adapter = new ServicioDALTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adapter.H2_Servicio_CambiarEstado(Id, e));
        }

        public int ServicioEliminar(int Id)
        {            
            ServicioDALTableAdapters.QueriesTableAdapter adapter = new ServicioDALTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adapter.H2_Servicio_Eliminar(Id));
        }

    }

    

    
}