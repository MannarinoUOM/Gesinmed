using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Hospital;

/// <summary>
/// Summary description for OrdenesEstudio_Plantilla
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class OrdenesEstudio_Plantilla : System.Web.Services.WebService {

    public OrdenesEstudio_Plantilla () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<ordenes_estudio_cabecera> ListarPlantillas(bool Todos) 
    {
        OrdenesdeEstudio_Plantilla_BLL obll = new OrdenesdeEstudio_Plantilla_BLL();
        return obll.Listar_Plantillas(Todos);
    }

    [WebMethod]
    public List<ordenes_estudio_detalle> ListarPlantillasDetalle(int IdPlantilla, bool Todos)
    {
        OrdenesdeEstudio_Plantilla_BLL obll = new OrdenesdeEstudio_Plantilla_BLL();
        return obll.Listar_PlantillasDetalle(IdPlantilla, Todos);
    }

    [WebMethod(EnableSession=true)]
    public void Insert_Servicio_Plantilla(ordenes_estudio_cabecera obj)
    {
        if (Session["Usuario"] != null)
        {
            OrdenesdeEstudio_Plantilla_BLL obll = new OrdenesdeEstudio_Plantilla_BLL();
            obll.Insert_Servicio_Plantilla(obj);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void Insert_Servicio_PlantillaDetalle(ordenes_estudio_detalle obj)
    {
        if (Session["Usuario"] != null)
        {
            OrdenesdeEstudio_Plantilla_BLL obll = new OrdenesdeEstudio_Plantilla_BLL();
            obll.Insert_Servicio_Plantilla_Det(obj);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }
    
}
