using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Especialidad
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[ScriptService]
public class MenuDinamicoItems : System.Web.Services.WebService
{
    public MenuDinamicoItems()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    [WebMethod(EnableSession = true)]
    public List<MenuDinamicoLista> ListadoPermisosUsuarios(int id)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.MenuDinamicoPermisosBLL e = new Hospital.MenuDinamicoPermisosBLL();
            return e.TraerListadoItemsMenues(id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


    [WebMethod(EnableSession = true)]
    public List<MenuDinamicoLista> ListadoMenuesPrincipales()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.MenuDinamicoPermisosBLL e = new Hospital.MenuDinamicoPermisosBLL();
            return e.TraerListadoMenuesPrincipales();
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
}