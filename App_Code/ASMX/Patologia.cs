using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Patologia
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
    public class Patologia : System.Web.Services.WebService {

    public Patologia () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<patologia> Patologia_Lista(int Id)
    
{
        Hospital.PatologiasBLL Patologia = new Hospital.PatologiasBLL();
        return Patologia.List_Patologias(Id);
    }

   [WebMethod]
    public List<patologia> Patologia_Lista_AtConsultorio()
    {
        Hospital.PatologiasBLL Patologia = new Hospital.PatologiasBLL();
        return Patologia.Patologia_Lista();
    }
    

    [WebMethod]
    public patologia Patologia_Id(int Id)
    {
        Hospital.PatologiasBLL Patologia = new Hospital.PatologiasBLL();
        return Patologia.Patologia_Id(Id);
    }
    
}
