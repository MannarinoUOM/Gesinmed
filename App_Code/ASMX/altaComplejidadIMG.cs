using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for altaComplejidadIMG
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class altaComplejidadIMG : System.Web.Services.WebService {

    public altaComplejidadIMG () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public long IMG_EST_ALT_COMP_ULT_BY_PAC(long PacienteId)
    {
        AltaComplejidad_IMG_BLL alta = new AltaComplejidad_IMG_BLL();
        return alta.IMG_EST_ALT_COMP_ULT_BY_PAC(PacienteId);    
    }

    [WebMethod]
    public altacomplejidad AltaComplejidad_IMG_byId(long Protocolo)
    {
        AltaComplejidad_IMG_BLL ac = new AltaComplejidad_IMG_BLL();
        return ac.AltaComplejidad_IMG_byID(Protocolo);
    }

    [WebMethod(EnableSession = true)]
    public long IMG_AltaComplejidad_Guardar(altacomplejidad obj)
    {
        if (Session["Usuario"] != null)
        {
            AltaComplejidad_IMG_BLL ac = new AltaComplejidad_IMG_BLL();
            obj.UsuarioId = ((usuarios)Session["Usuario"]).id;
            return ac.IMG_AltaComplejidad_Guardar(obj);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod]
    public List<ordenesdeestudiosbuscar> BuscarOrdesnesdeEstudios_AltaComplejidad_IMG(string nhc, string Afiliado, string fechainicio, string fechafinal)
    {

        if (fechainicio == "") { fechainicio = "01/01/1900"; }
        if (fechafinal == "") { fechafinal = "01/01/1900"; }
        DateTime FechaInicio = Convert.ToDateTime(fechainicio);
        DateTime FechaFinal = Convert.ToDateTime(fechafinal);

        AltaComplejidad_IMG_BLL buscar = new AltaComplejidad_IMG_BLL();
        return buscar.OrdenesdeEstudios_AltaComplejidad_Buscar_IMG(nhc, Afiliado, FechaInicio, FechaFinal);
    }
}
