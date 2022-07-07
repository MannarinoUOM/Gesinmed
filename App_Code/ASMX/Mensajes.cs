using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using Hospital;

/// <summary>
/// Summary description for Mensajes
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Mensajes : System.Web.Services.WebService {

    public Mensajes () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public mensajes CargarMensajes(int Numero) {
        long UsuarioId = ((usuarios)(Context.Session["Usuario"])).id;
        Hospital.MensajesBLL M = new Hospital.MensajesBLL();
        return M.LeerMensaje((Int32)UsuarioId, Numero);
    }
    
    [WebMethod(EnableSession = true)]
    public mensajes RevisarMensajes()
    {
        if ((usuarios)(Context.Session["Usuario"]) != null)
        {
            long UsuarioId = ((usuarios)(Context.Session["Usuario"])).id;
            Hospital.MensajesBLL M = new Hospital.MensajesBLL();
            return M.LeerMensajeSinLeer((Int32)UsuarioId);
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    public mensajes Pedidos()
    {
        //long UsuarioId = ((usuarios)(Context.Session["Usuario"])).id;
        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();
        MensajesBLL mbll = new MensajesBLL();
        mensajes M = new mensajes();
        if (v.PermisoMensajes("18"))
        {
            int Pedidos = mbll.PedidosPendientesCount();
            if (Pedidos > 0)
            {
                M.encabezado = "Pedidos Pendientes";
                M.mensaje = "Tenes " + Pedidos.ToString() + " pedidos pendientes";
                M.UsuarioEnviado = "Sistema";
                return M;
            }
            else return M;
        }
        else
        {
            return M;
        }
    }

    [WebMethod(EnableSession = true)]
    public void MensajeLeido(int Numero)
    {
        long UsuarioId = ((usuarios)(Context.Session["Usuario"])).id;
        Hospital.MensajesBLL M = new Hospital.MensajesBLL();
        M.MensajeLeido((Int32)UsuarioId, Numero);
    }

    [WebMethod(EnableSession = true)]
    public void MensajeResponder(int Numero, string Respuesta)
    {
        long UsuarioId = ((usuarios)(Context.Session["Usuario"])).id;
        Hospital.MensajesBLL M = new Hospital.MensajesBLL();
        M.MensajeResponder((Int32)UsuarioId, Numero, Respuesta);
    }
    
}
