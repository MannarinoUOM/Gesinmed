using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for PedidosEnfermeria
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class PedidosEnfermeria : System.Web.Services.WebService {

    public PedidosEnfermeria () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public int Guardar_Pedido(int MedicoId, int ConsultorioId, string Pedido, string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL Enfermeria = new Hospital.AtConsultorioBLL();
            Int32 Usuario = (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id;

            //VERIFICO SI EL USUARIOID PERTENECE AL MEDICO
            if (!Enfermeria.MedicoUsuarioExiste(MedicoId, Usuario))
            {
                throw new Exception("El Usuario no está relacionado con el Médico");
            }

            if (MedicoId != 0)
            {
                if (fecha == "") { fecha = DateTime.Now.ToString(); }
                DateTime Fecha = Convert.ToDateTime(fecha);
                Enfermeria.Pedido_Enfermeria_Guardar(MedicoId, ConsultorioId, Pedido, Fecha, Usuario);
            }
            else
            {
                throw new Exception("Error Codigo Médico.");
            }
            return 1;
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public List<pedidosenfermeria> Cargar_Pedido(int MedicoId,bool Todos)
    {
        if (Session["Usuario"] != null)
        { 
            Int32 Usuario = (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id;
            Hospital.AtConsultorioBLL Enfermeria = new Hospital.AtConsultorioBLL();
            return Enfermeria.Enfermeria_Cargar(MedicoId, Usuario,Todos);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
     }

     [WebMethod(EnableSession = true)]
     public List<pedidosenfermeria> Cargar_Pedido_Todos(int MedicoId, int ConsultorioId, int Cuales)
     {
         if (Session["Usuario"] != null)
         { 
             Hospital.AtConsultorioBLL Enfermeria = new Hospital.AtConsultorioBLL();
             return Enfermeria.Enfermeria_Cargar_Todos(MedicoId, ConsultorioId, Cuales);
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }

     [WebMethod(EnableSession = true)]
     public void Borrar(int MedicoId, string fecha)
     {
         if (Session["Usuario"] != null)
         {
             Int32 Usuario = (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id;
             DateTime Fecha;
             if (!DateTime.TryParse(fecha, out Fecha)) throw new Exception("Fecha no válida.");

             Hospital.AtConsultorioBLL Enfermeria = new Hospital.AtConsultorioBLL();
             Enfermeria.Borrar_Pedido(Fecha, MedicoId, Usuario);
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }

     [WebMethod(EnableSession = true)]
     public void PedidoEntregar(int MedicoId, int ConsultorioId, string fecha)
     {
         if (Session["Usuario"] != null)
         {
             Int32 Usuario = (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id;
             DateTime Fecha;
             if (!DateTime.TryParse(fecha, out Fecha)) throw new Exception("Fecha no válida.");

             Hospital.AtConsultorioBLL Enfermeria = new Hospital.AtConsultorioBLL();
             Enfermeria.PedidoEntrgaCambiarEstado(Fecha, MedicoId, Usuario, ConsultorioId,1);
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }

     [WebMethod(EnableSession = true)]
     public void PedidoCancelar(int MedicoId, int ConsultorioId, string fecha)
     {
         if (Session["Usuario"] != null)
         {
             Int32 Usuario = (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id;
             DateTime Fecha;
             if (!DateTime.TryParse(fecha, out Fecha)) throw new Exception("Fecha no válida.");

             Hospital.AtConsultorioBLL Enfermeria = new Hospital.AtConsultorioBLL();
             Enfermeria.PedidoEntrgaCambiarEstado(Fecha, MedicoId, Usuario, ConsultorioId, 0);
         }
         else throw new Exception("Inicie Sesión Nuevamente.");
     }
}
