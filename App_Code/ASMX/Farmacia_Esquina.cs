using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Farmacia_Esquina
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Farmacia_Esquina : System.Web.Services.WebService {

    public Farmacia_Esquina () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public List<Farmacia_Esq> buscar(Farmacia_Esq obj)
    {
        if (Session["Usuario"] != null)
        {
            Farmacia_EsquinaBLL Farmacia = new Farmacia_EsquinaBLL();
            return Farmacia.buscar(obj);
        }
        else throw new Exception("Ha Perdido Sesión!!!");
    }
    
}
