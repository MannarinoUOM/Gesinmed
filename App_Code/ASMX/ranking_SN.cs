using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for ranking_SN
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ranking_S : System.Web.Services.WebService {

    public ranking_S () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public List<rank_SNI> ObraSocial_List()
    {
        ranking_SNBLL SN = new ranking_SNBLL();
      return SN.ObraSocial_List();
    }

    [WebMethod(EnableSession = true)]
    public List<rank_SNI> Practica_List_Codigo()
    {
        ranking_SNBLL SN = new ranking_SNBLL();
        return SN.H2_Practica_List_Codigo();
    }
}
