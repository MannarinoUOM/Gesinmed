using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Especialidad
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[ScriptService]
public class _Especialidad : System.Web.Services.WebService
{
	public _Especialidad()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    [WebMethod(EnableSession=true)]
    public List<Especialidad> ListEspecialidades ()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.EspecialidadesBLL e = new Hospital.EspecialidadesBLL();
            return e.Especialidades_Lista();
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public string GuardarEspecialidad(Especialidad e)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.EspecialidadesBLL e_ = new Hospital.EspecialidadesBLL();
            e_.Especialidad_Guardar(e);
            return "Especialidad Guardada";
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

}
