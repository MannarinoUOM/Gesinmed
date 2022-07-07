using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using Hospital;

/// <summary>
/// Summary description for Hemoterapia
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class HemoterapiaASMX : System.Web.Services.WebService {

    public HemoterapiaASMX()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long GuardaActualizarSolicitudTransfusion(solicitudTransfusion sol)
    {
        if (Session["Usuario"] != null)
        {
            HemoterapiaBLL H = new HemoterapiaBLL();
            sol.usuario = Convert.ToInt32(((usuarios)Session["Usuario"]).id); 
            return H.GuardaActualizarSolicitudTransfusion(sol);
        }
        else { return 0;}
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long GuardaActualizarUnidadestransfundir(List<unidadesTransfundir> uni)
    {
        if (Session["Usuario"] != null)
        {
            HemoterapiaBLL H = new HemoterapiaBLL();
            foreach (unidadesTransfundir item in uni)
            {
                 H.GuardaActualizarUnidadestransfundir(item);
            }

            return 1;
        }
        else { return 0;}
    }
    
}
