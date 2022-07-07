using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.IO;
using System.Data;
using System.Text;
using System.Net;
using Newtonsoft.Json;

/// <summary>
/// Trae listado de permisos que tiene los usuarios.
/// Este listado es una sumatoria de los permisos que tiene por grupo de 
/// </summary>

namespace Hospital
{
    public class MenuDinamicoPermisosBLL
    {
        public MenuDinamicoPermisosBLL()
	    {
		    //
		    // TODO: Add constructor logic here
		    //
	    }
        
        //se le pasa el id del usuario para traer todos los permisos que tiene para ver los menues disponible para ese usuario
        public List<MenuDinamicoLista> TraerListadoItemsMenues(int id)
        {
            MenuDinamicoPermisosDALTableAdapters.traerPermisosUsuariosTableAdapter adapter = new MenuDinamicoPermisosDALTableAdapters.traerPermisosUsuariosTableAdapter();
            MenuDinamicoPermisosDAL.traerPermisosUsuariosDataTable tabla = new MenuDinamicoPermisosDAL.traerPermisosUsuariosDataTable();
            tabla = adapter.GetData(id);
            List<MenuDinamicoLista> lista = new List<MenuDinamicoLista>();
            foreach (MenuDinamicoPermisosDAL.traerPermisosUsuariosRow row in tabla.Rows)
            {
                MenuDinamicoLista i = new MenuDinamicoLista();
                i.Cod = row.Cod; 
                i.id = row.id;
                if (!row.IsNombreNull()) { i.Nombre = row.Nombre; } else { i.Nombre = ""; }
                if (!row.IsPrincipalNull()) { i.Principal = row.Principal.Trim(); } else { i.Principal = ""; }//se coloca trim para sacar los espacios en blanco que trae
                if (!row.IsSubmenuNull()) { i.SubMenu = row.Submenu; } else { i.SubMenu = ""; }
                if (!row.IsactivoNull()) { i.activo = row.activo; } else { i.activo = ""; }
                if (!row.IsLinkPaginasNull()) { i.LinkPaginas = row.LinkPaginas; } else { i.LinkPaginas = ""; }                

                lista.Add(i);
            }
            return lista;
         }

        public List<MenuDinamicoLista> TraerListadoMenuesPrincipales()
        {
            MenuDinamicoPermisosDALTableAdapters.traerListaMenuesPrincipalesTableAdapter adapter = new MenuDinamicoPermisosDALTableAdapters.traerListaMenuesPrincipalesTableAdapter();
            MenuDinamicoPermisosDAL.traerListaMenuesPrincipalesDataTable tabla = new MenuDinamicoPermisosDAL.traerListaMenuesPrincipalesDataTable();
            tabla = adapter.GetData();
            List<MenuDinamicoLista> lista = new List<MenuDinamicoLista>();
            foreach (MenuDinamicoPermisosDAL.traerListaMenuesPrincipalesRow row in tabla.Rows)
            {
                MenuDinamicoLista i = new MenuDinamicoLista();
                i.Cod = row.Cod;
                i.id = row.id;
                if (!row.IsNombreNull()) { i.Nombre = row.Nombre; } else { i.Nombre = ""; }
                if (!row.IsPrincipalNull()) { i.Principal = row.Principal; } else { i.Principal = ""; }
                if (!row.IsSubmenuNull()) { i.SubMenu = row.Submenu; } else { i.SubMenu = ""; }
                if (!row.IsactivoNull()) { i.activo = row.activo; } else { i.activo = ""; }
                if (!row.IsLinkPaginasNull()) { i.LinkPaginas = row.LinkPaginas; } else { i.LinkPaginas = ""; } 

                lista.Add(i);
            }
            return lista;
        }
        
    }
}