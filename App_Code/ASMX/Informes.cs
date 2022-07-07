using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Hospital;

/// <summary>
/// Summary description for Informes
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Informes : System.Web.Services.WebService {

    public Informes () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<informes> Traer_Seccionales_Especialidades(int tipo)
    {
        InformesBLL obj = new InformesBLL();
        return obj.TraerSeccionalesEspecialidades(tipo);
    }
    
}
