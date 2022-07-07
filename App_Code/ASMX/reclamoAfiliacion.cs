using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for reclamoAfiliacion
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class reclamoAfiliacion : System.Web.Services.WebService {

    public reclamoAfiliacion () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }


    [WebMethod(EnableSession = true)]
    public long InsertarErrorAfiliacion(long IdReclamo, string titulo, long servicio, string telefono, string reclamo, long afiliadoID, int estado)
    {
        if (Session["Usuario"] != null)
        {
            long usuario = ((usuarios)Session["Usuario"]).id;
            reclamoAfiliacionesBLL recla = new reclamoAfiliacionesBLL();
            return recla.Insertar_Error_Afiliacion(IdReclamo, titulo, servicio, telefono, reclamo, afiliadoID, usuario, estado);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public List<reclamo> ReclamoAfiliacionBuscar(reclamo obj)
    {
        if (Session["Usuario"] != null)
        {
            reclamoAfiliacionesBLL rec = new reclamoAfiliacionesBLL();
            return rec.Reclamo_Afiliacion_Buscar(obj);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public long ReclamoAfiliacionCerrar(long IdReclamo, string soluccion)
    {
        if (Session["Usuario"] != null)
        {
            long usuarioResolucion = ((usuarios)Session["Usuario"]).id;
            reclamoAfiliacionesBLL rec = new reclamoAfiliacionesBLL();
            return rec.Reclamo_Afiliaciones_Cerrar(IdReclamo, usuarioResolucion, soluccion);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

}
