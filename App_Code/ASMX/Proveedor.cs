using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Hospital;
using System.Web.Script.Services;


[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[ScriptService]
public class Proveedor : System.Web.Services.WebService
{
	public Proveedor()
	{
	}

    [WebMethod(EnableSession=true)]
    [ScriptMethod]
    public int Insert_Proveedores(Farmacia_Proveedores p)
    {
        if (Session["Usuario"] != null)
        {
            ProveedoresBLL _p = new ProveedoresBLL();
            return _p.Proveedores_Insert(p);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
}