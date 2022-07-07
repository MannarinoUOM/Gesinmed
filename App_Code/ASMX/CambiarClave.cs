using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Text.RegularExpressions;

/// <summary>
/// Summary description for CambiarClave
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class CambiarClave : System.Web.Services.WebService {

    public CambiarClave () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public int CambiarLaClave(string ClaveAnt, string ClaveNueva, string ClaveNuevaRep)
    {
        if (Session["Usuario"] != null)
        {


            if (ClaveNueva.Length < 10 || ClaveNuevaRep.Length < 10) throw new Exception("Las claves deben contener 10 caracteres mínimo.");

            if (ClaveNueva.Length > 20 || ClaveNuevaRep.Length > 20) throw new Exception("Las claves no pueden superar los 20 caracteres.");

            Match numeros = Regex.Match(ClaveNueva, "(\\d+)");
            Match numerosR = Regex.Match(ClaveNuevaRep, "(\\d+)");
            if (!numeros.Success || !numerosR.Success) throw new Exception("Las claves deben contener almenos un número.");

            Match letras = Regex.Match(ClaveNueva, "([a-z A-Z])");
            Match letrasR = Regex.Match(ClaveNuevaRep, "([a-z A-Z])");
            if (!letras.Success || !letrasR.Success) throw new Exception("Las claves deben contener almenos una letra.");

            //Match especiales = Regex.Match(ClaveNueva, "\\d+[^\\w\\s.!@$%^&*()\\-\\//]+");
            //Match especialesR = Regex.Match(ClaveNueva, "\\d+[^\\w\\s.!@$%^&*()\\-\\//]+");
            Match especiales = Regex.Match(ClaveNueva, "[!¡@$%^&*()<>_]");
            Match especialesR = Regex.Match(ClaveNuevaRep, "[!¡@$%^&*()<>_]");
            if (!especiales.Success || !especialesR.Success) throw new Exception("Las claves deben contener almenos un carácter especial.");

            if (!string.Equals(ClaveNueva, ClaveNuevaRep, StringComparison.OrdinalIgnoreCase)) throw new Exception("Las claves no coinciden.");

           

            usuarios u = new usuarios();
            Hospital.AdministracionBLL adm = new Hospital.AdministracionBLL();          
            return adm.Administracion_Cambiar_Clave(Convert.ToInt32(((usuarios)Session["Usuario"]).id), ClaveAnt, ClaveNueva);
        }
        else return 0;
    }
    
}
