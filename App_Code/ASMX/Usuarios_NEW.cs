using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for Usuarios_NEW
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Usuarios_NEW : System.Web.Services.WebService {

    public Usuarios_NEW () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<usuarios> TraerUsuarioParaActualizacion(string usuario, string nombre, string fechaAlta)
    {
        Usuarios_NEWBLL U = new Usuarios_NEWBLL();
        return U.Traer_Usuario_Para_Actualizacion(usuario, nombre, fechaAlta);
    }
    
}
