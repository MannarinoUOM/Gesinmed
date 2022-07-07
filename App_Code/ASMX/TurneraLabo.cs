using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for TurneraLabo
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class TurneraLabo : System.Web.Services.WebService {

    public TurneraLabo () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }


    [WebMethod]
    public turneraAC CargarTurnos()
    {
        Hospital.TurneraBLL T = new Hospital.TurneraBLL();
        return T.ProximoTurnoLaboratorio();
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void CambiarEstadoTurno(string NroLlamado)
    {        
            Hospital.TurneraBLL t = new Hospital.TurneraBLL();
            t.CambiarEstadoTurneraLaboratorio(NroLlamado);        
    }

       
}
