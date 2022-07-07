using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;


/// <summary>
/// Summary description for DiasAtencion
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class DiasAtencion : System.Web.Services.WebService {

    public DiasAtencion () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public diasdeatencion_Vista_Lista Dias_Atencion_Lista_Medicos_Vista(int MedicoId)
    {
        Hospital.DiasdeAtencionBLL DiaAtencion = new Hospital.DiasdeAtencionBLL();
        return DiaAtencion.DiasAtencionVista(MedicoId);
    }

    [WebMethod]
    public int CantSobreturnos(int MedicoId)
    {
        Hospital.DiasdeAtencionBLL DiaAtencion = new Hospital.DiasdeAtencionBLL();
        return DiaAtencion.CantSobreturnos(MedicoId);
    }



    
}
