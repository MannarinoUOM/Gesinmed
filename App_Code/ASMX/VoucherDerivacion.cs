using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using Hospital;
using System.IO;

/// <summary>
/// Summary description for VoucherDerivacion
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class VoucherDerivacion : System.Web.Services.WebService {

    public VoucherDerivacion () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }


    //------listar vauchers guardados en DB-------------------
    //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    [WebMethod(EnableSession = true)]
    
    public List<VoucherEntities> VoucherListarASMX(DateTime fechaDesde, DateTime fechaHasta)
    {
        if (Session["Usuario"] != null)
        {
            long idUsuario = ((usuarios)Session["Usuario"]).id;
            Hospital.Autorizaciones aut = new Hospital.Autorizaciones();

            return aut.VoucherListarBLL(fechaDesde, fechaHasta);
        }
        else
        {
            //perdida de sesion
            return null;
        }
    }

}
