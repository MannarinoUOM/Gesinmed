using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for InternacionMenus
/// </summary>
/// [WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class InternacionMenus : System.Web.Services.WebService 
{
	public InternacionMenus()
	{
		//
		// TODO: Add constructor logic here
		//
	}
[WebMethod(EnableSession = true) ]
    public List<Menus> cargarComboMenus()
{
    if (Session["Usuario"] != null)
    {
        Hospital.InternacionesBLL Menus = new Hospital.InternacionesBLL();
        return Menus.cargar_Combo_Menus();
    }
    else
    { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }

}

}