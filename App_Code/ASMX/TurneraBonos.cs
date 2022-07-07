using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Descripción breve de TurneraTurno
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
[System.Web.Script.Services.ScriptService]
public class TurneraBonos : System.Web.Services.WebService {

    public TurneraBonos()
    {

        //Eliminar la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    [WebMethod]
    public turnera_bonos H2_Turnera_Turnos_Leer(int TurneraId)
    {
        Hospital.TurneraBLL T = new Hospital.TurneraBLL();
        return T.ProximoTurnoBono(TurneraId);
    }

    [WebMethod(EnableSession = true)]
    public void Asignar_Box_Bonos_Turnos(string Box)
    {
        if (Session["Usuario"] != null)
        {
            ((usuarios)Session["Usuario"]).Box_Turno_Bono = Box;
        }
    }


    [WebMethod(EnableSession = true)]
    public turnera_bonos Turnera_Turno_Llamar_Bonos()
    {
        Hospital.TurneraBLL T = new Hospital.TurneraBLL();
        if (Session["Usuario"] != null)
        {
            try
            {
                //return T.Llamar_Turno_Bono(((usuarios)Session["Usuario"]).Box_Turno_Bono, Convert.ToInt32(((usuarios)Session["Usuario"]).id), ((usuarios)Session["Usuario"]).ip );
                return T.Llamar_Turno_Bono("0", Convert.ToInt32(((usuarios)Session["Usuario"]).id), ((usuarios)Session["Usuario"]).ip);
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        else
        {
            throw new Exception("Ha perdido sesión en el Sistema, por favor vuelva a iniciar sesión.");
        }
        return null;
    }

    //PARA QUE SOLO LLAME A LOS BONOS GENERADOS EN LAS IPS DE ADMISION
    [WebMethod(EnableSession = true)]
    public turnera_bonos Turnera_Turno_Llamar_Bonos_Internacion()
    {
        Hospital.TurneraBLL T = new Hospital.TurneraBLL();
        if (Session["Usuario"] != null)
        {
            try
            {
                //return T.Llamar_Turno_Bono(((usuarios)Session["Usuario"]).Box_Turno_Bono, Convert.ToInt32(((usuarios)Session["Usuario"]).id), ((usuarios)Session["Usuario"]).ip );
                return T.Llamar_Turno_Bono_Internacion("0", Convert.ToInt32(((usuarios)Session["Usuario"]).id), ((usuarios)Session["Usuario"]).ip);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        else
        {
            throw new Exception("Ha perdido sesión en el Sistema, por favor vuelva a iniciar sesión.");
        }
        return null;
    }
    //PARA QUE SOLO LLAME A LOS BONOS GENERADOS EN LAS IPS DE ADMISION


    [WebMethod(EnableSession = true)]
    public turnera_bonos Turnera_Turno_Forzar_Llamar_Bonos(string Box)
    {
        Hospital.TurneraBLL T = new Hospital.TurneraBLL();
        if (Session["Usuario"] != null)
        {
            try
            {
                Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
                if (V.PermisoSM("9928"))
                {
                    return T.Turnera_Turno_Forzar_Llamar_Bonos(Convert.ToInt32(((usuarios)Session["Usuario"]).id), Box);
                }
                return null;                
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        else
        {
            throw new Exception("Ha perdido sesión en el Sistema, por favor vuelva a iniciar sesión.");
        }        
    }


    [WebMethod(EnableSession = true)]
    public int verificarTeleConsultaDisponible(int espId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.TurneraBLL T = new Hospital.TurneraBLL();
            return T.verificarTeleConsultaDisponible(espId);
        }
        else { return 0; }
    }

    [WebMethod]
    public turnera_bonos H2_Turnera_Turnos_Leer_Unificada(int TurneraId)
    {
        Hospital.TurneraBLL T = new Hospital.TurneraBLL();
        return T.ProximoTurnoBonosDos(TurneraId);
    }
}
