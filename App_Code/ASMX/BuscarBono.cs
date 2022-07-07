using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using HospitalBLL.Entities;

/// <summary>
/// Summary description for BuscarBono
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class BuscarBono : System.Web.Services.WebService {

    public BuscarBono () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 

    }

    [WebMethod]
    public List<impresion_bono> BonoBuscar(string Afiliado, string Desde, string Hasta, int? NroComprobante, string nroHC, string PracticaIds, bool Todos)
    {
        try
        {
            DateTime desde = Convert.ToDateTime(Desde);
            DateTime hasta = Convert.ToDateTime(Hasta);
            Hospital.BonosBLL b = new Hospital.BonosBLL();
            if (Todos)
                return b.Bono_Buscar(Afiliado, desde, hasta, NroComprobante, nroHC, string.Empty);
            else
            {
                if (!string.IsNullOrEmpty(PracticaIds))
                    return b.Bono_Buscar(Afiliado, desde, hasta, NroComprobante, nroHC, PracticaIds);
                else return null;
            }
        }
        catch
        {
            throw new Exception("Intente nuevamente, o comuníquese con Soporte.");
        }
    }

    [WebMethod]
    public List<impresion_bono> BonoBuscar_Con_Cancelados(string Afiliado, string Desde, string Hasta, int? NroComprobante, string nroHC, string PracticaIds, bool Todos)
    {
        try
        {
            DateTime desde = Convert.ToDateTime(Desde);
            DateTime hasta = Convert.ToDateTime(Hasta);
            Hospital.BonosBLL b = new Hospital.BonosBLL();
            if (Todos)
                return b.Bono_Buscar_Con_Cancelados(Afiliado, desde, hasta, NroComprobante, nroHC, string.Empty);
            else
            {
                if (!string.IsNullOrEmpty(PracticaIds))
                    return b.Bono_Buscar_Con_Cancelados(Afiliado, desde, hasta, NroComprobante, nroHC, PracticaIds);
                else return null;
            }
        }
        catch
        {
            throw new Exception("Intente nuevamente, o comuníquese con Soporte.");
        }
    }
    
}
