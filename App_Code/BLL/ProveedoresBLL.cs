using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de Proveedores
/// </summary>
namespace Hospital
{
    public class ProveedoresBLL
    {
        public ProveedoresBLL()
        {
        }

        public int Proveedores_Insert(Farmacia_Proveedores p)
        {
            //Si Id <> 0 se actualizan los datos del proveedor, sino inserta uno nuevo
            ProveedoresTableAdapters.QueriesTableAdapter adapter = new ProveedoresTableAdapters.QueriesTableAdapter();
            object id = adapter.H2_FARMACIA_PROVEEDORES_INSERT(int.Parse(p.Id), p.Nombre, p.Telefono, p.Direccion, p.Cuit, p.EnUso,p.Rubro,p.Contacto,p.Localidad,p.Celular);
            if (id.ToString() != null)
                return int.Parse(id.ToString());
            else return -1;
        }
    }
}