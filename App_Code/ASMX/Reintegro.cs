using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Reintegro
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Reintegro : System.Web.Services.WebService {

    public Reintegro () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public reintegro Reintegro_Estado(string Fecha, int Usuario, int NroBono)
    {
        Hospital.ReintegroBLL R = new Hospital.ReintegroBLL();
        reintegro rr = new reintegro();
        rr = R.ReintegroEstado(Fecha, Usuario, NroBono);
        if (rr.Reintegro != null)
        {
            throw new Exception("El Bono ya ha sido Reintegrado Anteriormente");
        }
        return rr;
    }

    [WebMethod]
    public reintegro Reintegro_Estado_SN(string NroBono)
    {
        Hospital.ReintegroBLL R = new Hospital.ReintegroBLL();
        reintegro rr = new reintegro();
        long _nro;
        if (long.TryParse(NroBono, out _nro))
        {
            rr = R.ReintegroEstadoSN(_nro);
            if (rr.Reintegro != null)
            {
                throw new Exception("El Bono ya ha sido Reintegrado Anteriormente");
            }
        }
        else throw new Exception("Ingrese Nro. de Bono");
        return rr;
    }
        
    [WebMethod(EnableSession = true)]
    public void Reintegrar_X(string Fecha, int Usuario, int NroBono, string Cual, string Cantidad)
    {
        if (Session["Usuario"] != null)
        {
        Cantidad = Cantidad.Replace("%", "");
        if (Cual == "1") Cantidad = "100";
        if (Cual == "2") Cantidad = "75";
        if (Cual == "3") Cantidad = "50";

        try
        {
            int result = int.Parse(Cantidad);
        }
        catch
        {
            throw new Exception("El Porcentaje ingresado no es valido");
        }
            

        if (Cantidad != "")
        {
            if (Convert.ToDouble(Cantidad) < 1) Cantidad = (Convert.ToDouble(Cantidad) * -1).ToString();
        }

        //if (Cual == "4") Cantidad = Cantidad;

        Hospital.ReintegroBLL R = new Hospital.ReintegroBLL();
        R.Reintegrar(Convert.ToDateTime(Fecha), Usuario, NroBono, Cantidad, (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id);
        }
    }








    [WebMethod(EnableSession = true)]
    public void Reintegrar_X_SN(long NroBono, string Cual, string Cantidad)
    {
        if (Session["Usuario"] != null)
        {
            Cantidad = Cantidad.Replace("%", "");
            if (Cual == "1") Cantidad = "100";
            if (Cual == "2") Cantidad = "75";
            if (Cual == "3") Cantidad = "50";

            
            try
            {
                float result = float.Parse(Cantidad);
            }
            catch
            {
                throw new Exception("El Porcentaje ingresado no es valido");
            }

            if (Convert.ToDouble(Cantidad) > 100) throw new Exception("El Porcentaje ingresado no es valido");
            if (Convert.ToDouble(Cantidad) <= 0) throw new Exception("El Porcentaje ingresado no es valido");
            
            if (Cantidad != "")
            {
                if (Convert.ToDouble(Cantidad) < 1) Cantidad = (Convert.ToDouble(Cantidad) * -1).ToString();
            }

            //if (Cual == "4") Cantidad = Cantidad;

            Hospital.ReintegroBLL R = new Hospital.ReintegroBLL();
            R.Reintegrar_SN(NroBono, Cantidad, (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id);
        }
    }





    
    
}
