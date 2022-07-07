using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for ObraSocial
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class ObraSocial : System.Web.Services.WebService {

    public ObraSocial () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<obrasocial> CargarObraSocial(int Id) {
        Hospital.ObraSocialBLL O = new Hospital.ObraSocialBLL();
        return O.ObraSocial(Id);
    }
	
	    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<obrasocial> ListObraSociales(bool Todas)
    {
        Hospital.ObraSocialBLL O = new Hospital.ObraSocialBLL();
        return O.List_ObraSociales(Todas);
    }



    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<ObraSocialesListar> OS_Listar(string Descripcion, int? Codigo)
    {
        if (Codigo == null)
        {
            Codigo = 0;
        }

        Hospital.ObraSocialBLL O = new Hospital.ObraSocialBLL();
        return O.Listar_ObraSociales(Descripcion, Codigo);
    }

    
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void ObraSocial_Nueva(string Descripcion, int? Codigo, long? CUIT, string Direccion, int Estado, int Editando) //Si editando es = 0, nueva OS, sino es edicion.
    {
        if (Codigo == null)
        {
            Codigo = 0;
        }

        if (CUIT == null)
        {
            CUIT = 0;
        }

        Hospital.ObraSocialBLL O = new Hospital.ObraSocialBLL();
        O.ObraSocial_Nueva(Descripcion, Codigo, CUIT, Direccion, Estado,Editando);
    }
    

}
