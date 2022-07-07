using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Consultorios
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Consultorios : System.Web.Services.WebService {

    public Consultorios () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 

    }

    [WebMethod]
    public List<consultorio> Consultorio_Lista(int Id, string Activo)
    {
        Hospital.ConsultoriosBLL Consultorios = new Hospital.ConsultoriosBLL();
        return Consultorios.Consultorios(Id, Activo);
    }

    [WebMethod]
    public List<consultorio> Consultorio_Lista_E()
    {
        Hospital.ConsultoriosBLL Consultorios = new Hospital.ConsultoriosBLL();
        return Consultorios.Consultorios(0, null);
    }

    [WebMethod]
    public List<consultorio> Consultorio_Lista_DA()
    {
        Hospital.ConsultoriosBLL Consultorios = new Hospital.ConsultoriosBLL();
        return Consultorios.Consultorios(0, "A");
    }

    [WebMethod(EnableSession = true)]
    public int CerrarConsultorio(int id, string activo)
    {        
         Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
         if (V.Permiso("20"))
         {
             Hospital.ConsultoriosBLL Consultorios = new Hospital.ConsultoriosBLL();
             string Activo = "N";
             if (activo.ToString().TrimEnd().TrimStart() != "Cerrar Consultorio") Activo = "A";
             return Consultorios.CerrarConsultorio(id, Activo);
         }
         else
         {
             throw new Exception("Error de Usuario");
         }
    }

    [WebMethod(EnableSession = true)]
    public int EliminarConsultorio(int id)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (V.Permiso("20"))
        {
            Hospital.ConsultoriosBLL Consultorios = new Hospital.ConsultoriosBLL();
            return Consultorios.EliminarConsultorio(id);
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }

    [WebMethod(EnableSession = true)]
    public int GuardarConsultorio(int id, string Descripcion)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        if (V.Permiso("20"))
        {
            if (Descripcion.Length > 0 && Descripcion != "")
            {
                Hospital.ConsultoriosBLL Consultorios = new Hospital.ConsultoriosBLL();
                return Consultorios.GuardarConsultorio(id, Descripcion);
            }
            else
            {
                throw new Exception("Falta Consultorio");
            }
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }
        
}
