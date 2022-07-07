using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for vacum
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class vacum : System.Web.Services.WebService {

    public vacum () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<vacunas> TraerVacunas(int tipo)
    {
        Hospital.vacunacionBLL v = new Hospital.vacunacionBLL();
        return v.TraerVacunas(tipo);
    }

    [WebMethod]
    public List<tipovacunas> TraerTipoVacuna()
    {   
        Hospital.vacunacionBLL v = new Hospital.vacunacionBLL();
        return v.TraerTipoVacuna();
    }

    [WebMethod(EnableSession = true)]
    public long InsertarAplicacionVacuna(aplicacion apli)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.vacunacionBLL v = new Hospital.vacunacionBLL();
            usuarios u = ((usuarios)(Context.Session["Usuario"]));
            apli.usuario = u.id;             
            return v.Insertar_Aplicacion_Vacuna(apli);
        }
        else throw new Exception("No se pudo guardar. Inicie Sesión Nuevamente.");
    }

    [WebMethod]
    public List<aplicacion> TraerAplicacionesVacuna(aplicacion apli)
    {
        Hospital.vacunacionBLL v = new Hospital.vacunacionBLL();
        return v.Traer_Aplicaciones_Vacuna(apli);
    }

    [WebMethod]
    public List<grupoFactor> TraerGrupoFactorSaguineo(long afiliadoId)
    {
        Hospital.vacunacionBLL v = new Hospital.vacunacionBLL();
        return v.Traer_Grupo_Factor_Saguineo(afiliadoId);
    }

    [WebMethod(EnableSession = true)]
    public long EliminarAplicacionVacuna(long id)
    {
        if (Session["Usuario"] != null)
        {
        Hospital.vacunacionBLL v = new Hospital.vacunacionBLL();
        usuarios u = ((usuarios)(Context.Session["Usuario"]));
        return v.Eliminar_Aplicacion_Vacuna(id, u.id);
        }
                else throw new Exception("No se pudo borrar. Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public long GuardarGrupoSanguineo(long afiliadoId, int grupoFactor)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.vacunacionBLL v = new Hospital.vacunacionBLL();
            usuarios u = ((usuarios)(Context.Session["Usuario"]));
            return v.Guardar_Grupo_Sanguineo(afiliadoId, grupoFactor, u.id);
        }
        else throw new Exception("No se pudo guardar el Grupo Sanguíneo. Inicie Sesión Nuevamente.");
    }

}
