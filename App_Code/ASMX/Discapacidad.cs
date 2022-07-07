using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using HospitalBLL.Entities;

/// <summary>
/// Summary description for Discapacidad
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Discapacidad : System.Web.Services.WebService {

    public Discapacidad () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public void VerificarFechaCertificado(int DNI)
    {
        Hospital.DiscapacidadBLL discapacidad = new Hospital.DiscapacidadBLL();
        string Resultado = discapacidad.CertificadoVencido(DNI);
        if (Resultado != "")
        {
            throw new Exception(Resultado);
        }
    }
    
}
