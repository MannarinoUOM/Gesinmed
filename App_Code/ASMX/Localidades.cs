using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Localidades
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Localidades : System.Web.Services.WebService {

    public Localidades () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }


    [WebMethod]
    public List<localidades> Localidades_Lista(int Estado)
    {
        Hospital.LocalidadesBLL L = new Hospital.LocalidadesBLL();
        return L.Localidades_Lista(Estado);
    }

    [WebMethod(EnableSession=true)]
    public int Localidades_Guardar(localidades l)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.LocalidadesBLL L = new Hospital.LocalidadesBLL();
            return L.Localidades_Guardar(l);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
}
