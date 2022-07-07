using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Centro
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Centro : System.Web.Services.WebService
{

    public Centro()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 

    }

    [WebMethod]
    public centro CentroUnico()
    {
        Hospital.CentroBLL centro = new Hospital.CentroBLL();
        return centro.elCentro();
    }

    [WebMethod(EnableSession = true)]
    public int Guardar_Centro(string RazonSocial, string Calle, string Nro, string Piso,string Depto, string CodigoPostal, int LocalidadId, string Provincia, string Observaciones, string Director, string NroCuit, string Observacioens2, string Telefono, string Fax, string NroInscripcion)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (V.Permiso("20"))
        {
            Hospital.CentroBLL centro = new Hospital.CentroBLL();
            return centro.Guardar_Centro(RazonSocial, Calle, Nro, Piso, Depto, CodigoPostal, LocalidadId, Provincia, Observaciones, Director, NroCuit, Observacioens2, Telefono, Fax, NroInscripcion);
        }
        else
        {
            throw new Exception("Error de Usuario");
        }

    }
}
