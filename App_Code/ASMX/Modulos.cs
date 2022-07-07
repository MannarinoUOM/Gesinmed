using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Modulos
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Modulos : System.Web.Services.WebService {

    public Modulos () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }


    [WebMethod(EnableSession = true)]
    public List<FactModulosDetalles> ListarModulos(string Codigo, string Descripcion)
    {
        if (Session["Usuario"] != null)
        {
            long c = 0;
            if (!long.TryParse(Codigo, out c)) c = 0;
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.ListadoModulos(c, Descripcion);
        }
        else throw new Exception("Inicie Sesión Nuevamente."); 
    }


   [WebMethod(EnableSession = true)]
   public void EliminarModulos(long Codigo)
   {
       if (Session["Usuario"] != null)
       {
           Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
           f.QuitarModulos(Codigo);
       }
       
   }


   [WebMethod(EnableSession = true)]
   public void GuardarModulos(FactModulosDetalles modulo)
   {
       if (Session["Usuario"] != null)
       {
           Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
           modulo.UsuarioId = ((usuarios)Session["Usuario"]).id;
           f.GuardarModulos(modulo);
       }
       else throw new Exception("Inicie Sesión Nuevamente.");

   }
    
}
