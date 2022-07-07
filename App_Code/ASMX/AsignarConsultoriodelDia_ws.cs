using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Descripción breve de AsignarConsultoriodelDia_ws
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
[System.Web.Script.Services.ScriptService]
public class AsignarConsultoriodelDia_ws : System.Web.Services.WebService {

    public AsignarConsultoriodelDia_ws () {

        //Eliminar la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession=true)]
    public long AsignarConsultoriodelDia(ConsultoriodelDia datos) 
    {
        if (Session["Usuario"] != null)
        {
            Turnos_AsignarConsultoriodelDiaBLL t = new Turnos_AsignarConsultoriodelDiaBLL();
            datos.ConsultorioDia_UsuarioId = ((usuarios)Session["Usuario"]).id;
            return t.ConsultoriodelDia_Insertar(datos);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod]
    public List<ConsultoriodelDia> ListarConsultoriodelDia(string Fecha, int ConsultorioId, int EspecialidadId, int MedicoId)
    {
            Turnos_AsignarConsultoriodelDiaBLL t = new Turnos_AsignarConsultoriodelDiaBLL();
            return t.ConsultoriodelDia_List(Fecha, ConsultorioId, EspecialidadId, MedicoId);
    }
    
}
