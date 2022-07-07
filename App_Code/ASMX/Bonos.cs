using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using HospitalBLL.Entities;

/// <summary>
/// Summary description for Bonos
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Bonos : System.Web.Services.WebService {

    public Bonos () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool EstadoBono(long NroBono)
    {
        bool Estado = true;
        if (Session["Usuario"] != null)
        {
            Hospital.BonosBLL B = new Hospital.BonosBLL();
            bono_estado_usado b = B.EstadodelBono(NroBono);
            if (b.id == null) { Estado = false; throw new Exception("Atención. El Bono No Existe"); }
            if (b.id != null && b.usado) { Estado = false; throw new Exception("Atención. El Bono ha sido utilizado el " + b.fecha); }            
        }
        return Estado;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<bonos_encabezado> Existe_Turno(long AfiliadoId)
    {
            Hospital.BonosBLL B = new Hospital.BonosBLL();
            return B.Existe_Turno(AfiliadoId);
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<bono_cajavale_conceptos> Bono_CajaVale_Conceptos_List()
    {
        Hospital.BonosBLL B = new Hospital.BonosBLL();
        return B.Bono_CajaVale_Conceptos_List();
    }

    [WebMethod(EnableSession=true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long Bono_CajaVale_Insert(bono_cajavale b)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.BonosBLL B = new Hospital.BonosBLL();
            b.usuarioid = ((usuarios)Session["Usuario"]).id;
            return B.Bono_CajaVale_Insert(b);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<bono_terminal> List_Terminales_Bonos()
    {
        Hospital.BonosBLL B = new Hospital.BonosBLL();
        return B.List_Terminales_Bonos();
    }

    
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool EstadoBonoProvi(string NroBono)
    {
        bool Estado = true;
        if (Session["Usuario"] != null)
        {
            Hospital.BonosBLL B = new Hospital.BonosBLL();
            bool b = B.EstadodelBonoProvi(NroBono);            
            if (b) { Estado = false; throw new Exception("Atención. El Bono ha sido utilizado"); }            
        }
        return Estado;
    }


    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public rendicion_bono BonoInfo(long NroBono)
    {
         Hospital.BonosBLL B = new Hospital.BonosBLL();
         return B.BonoInfo(NroBono);
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int verificarDeuda(long afiliado)
    {
        Hospital.BonosBLL B = new Hospital.BonosBLL();
        return B.verificarDeuda(afiliado);
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<mov_Bono> traerHistorialMovimoentosCC(long afiliado)
    {
        Hospital.BonosBLL B = new Hospital.BonosBLL();
        return B.traer_historial_movimoentos_CC(afiliado);
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<mov_Bono_CC> CuentaCorrienteAfiliadosINFORME(decimal mayores, string deudasAl, int seccional, string afiliado, string doc, string nhc, string dia,int usuario)
        {
        Hospital.BonosBLL B = new Hospital.BonosBLL();
        return B.CuentaCorrienteAfiliadosINFORME(mayores,deudasAl,seccional, afiliado, doc, nhc, dia,usuario);
    }
}
