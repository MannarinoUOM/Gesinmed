using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Practicas
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Practicas : System.Web.Services.WebService {

    public Practicas () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public Int32 Practicas_Id_Codigo(int Id)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.PracticasBLL DiaAtencion = new Hospital.PracticasBLL();
            return DiaAtencion.Practica_Id_Codigo(Id);
        }
        else
        {
            return 0;
        }
    }

    [WebMethod(EnableSession = true)]
        public List<practicas_edicion> Practicas_Listar(string Practica, int? Codigo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.PracticasBLL Practicas = new Hospital.PracticasBLL();
            return Practicas.Practica_Listar(Practica, Codigo);
        }
        else
        {
            return null;
        }
    }


    [WebMethod(EnableSession = true)]
    public List<FactPracticasDetalles> Practicas_Listar_Facturacion(string Practica, int? Codigo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.PracticasBLL Practicas = new Hospital.PracticasBLL();
            return Practicas.Practica_Listar_Facturacion(Practica, Codigo);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    
    [WebMethod(EnableSession = true)]
    public int Practicas_Guardar(string Practica, int Codigo, string FE, string FG, int Id, int Estado)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.PracticasBLL Practicas = new Hospital.PracticasBLL();
            decimal PrecioE = Convert.ToDecimal(FE.Replace(".", ","));
            decimal PrecioG = Convert.ToDecimal(FG.Replace(".", ","));

            return Practicas.Practica_Guardar(Id, Practica, Codigo, PrecioE, ((usuarios)(Context.Session["Usuario"])).usuario, PrecioG, Estado);
        }
        else
        {
            return 0;
        }
    }

    [WebMethod(EnableSession = true)]
    public void Practica_Nueva(int Codigo, string Practica, string FE, string FG)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.PracticasBLL Practicas = new Hospital.PracticasBLL();
            decimal PrecioE = Convert.ToDecimal(FE.Replace(".", ","));
            decimal PrecioG = Convert.ToDecimal(FG.Replace(".", ","));
            Practicas.Practica_Nueva(Practica, Codigo, PrecioE, PrecioG, ((usuarios)(Context.Session["Usuario"])).usuario);
        }
        else throw new Exception("Inicie Sesion Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public List<listarEspecialidadPracticarelacion> Practicas_Listar_Facturacion_PracticaEspecialidad(long PracticaId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.FacturacionBLL f = new Hospital.FacturacionBLL();
            return f.ListadePracticasyEspecialidades(PracticaId);
        }
        else
        {
            return null;
        }
    }

    [WebMethod(EnableSession = true)]
    public List<IMG_Practicas> H2_IMAGENES_PRACTICAS_LISTAR(long PracticaId, long EspecialidadId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.PracticasBLL p = new Hospital.PracticasBLL();
            return p.Imagenes_ListarPracticas(PracticaId, EspecialidadId);
        }
        else
        {
            return null;
        }
    }

}
