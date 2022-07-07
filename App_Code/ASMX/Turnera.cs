using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Turnera
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Turnera : System.Web.Services.WebService {

    public Turnera () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public turneraAC CargarAC(long TurneraId)
    {
        Hospital.TurneraBLL T = new Hospital.TurneraBLL();
        //long UsuarioId = ((usuarios)(Context.Session["Usuario"])).id;        
        //TurneraId = 22;
        return T.LeerTurnosAC(Convert.ToInt32(TurneraId));
    }

    [WebMethod]
    public List<consultorio> ListaConsultorioEnTurnera(long Turnera)
    {
        Hospital.TurneraBLL T = new Hospital.TurneraBLL();
        return T.ListaConsultorioEnTurnera(Turnera);
    }


    [WebMethod]
    public void GuardarConsultorios(int Turnera, string Consultorios)
    {
        Hospital.TurneraBLL T = new Hospital.TurneraBLL();
        T.Guardar_Turnera_Permisos(Turnera, Consultorios);
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    //public void SaveG(string NHC, int? Medico, int? Box)
    public void SaveG(int MedicoId,long NHC, string ConsultorioId,string Paciente, int EspecialidadId)
    {
        if (Session["Usuario"] != null)
        {
            //Hospital.TurneraBLL t = new Hospital.TurneraBLL();
            //t.SaveG(NHC, Medico, Box);
            Hospital.AtConsultorioBLL Confirmar = new Hospital.AtConsultorioBLL();
            Confirmar.Llamar_Paciente_Turnera(MedicoId, EspecialidadId, NHC, ConsultorioId);
            Confirmar.At_Consultorio_Historial_Guardar("Se llama al paciente " + Paciente, MedicoId, NHC, EspecialidadId);
        }
    }
    

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Turnera_Nueva(string Nombre)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {   
            Hospital.TurneraBLL t = new Hospital.TurneraBLL();
            t.Turnera_Nueva(Nombre);
        }
    }

    
}
