using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Net;

/// <summary>
/// Summary description for Usuarios
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Usuarios : System.Web.Services.WebService
{

    public Usuarios()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public string Ingreso(string Usuario, string Clave, string PC)
    {   
            Context.Session["Usuario"] = null;
            Hospital.UsuariosBLL u = new Hospital.UsuariosBLL();

            //System.Net.IPHostEntry host;
            //System.Net.IPHostEntry addr;
            //addr = System.Net.Dns.GetHostByAddress(HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"]);
            //host = System.Net.Dns.GetHostByAddress(HttpContext.Current.Request.ServerVariables["REMOTE_HOST"]);

            return u.Login(Usuario, Clave, PC);
    }

    [WebMethod(EnableSession = true)]
    public List<usuarios> Lista_T()
    {   
            Hospital.UsuariosBLL u = new Hospital.UsuariosBLL();
            return u.Lista_T(true);
    }

    [WebMethod(EnableSession = true)]
    public List<usuarios> UsuariobyId()
    {
        if (Session["Usuario"] != null)
        {
            long U = ((usuarios)Session["Usuario"]).id;
            Hospital.UsuariosBLL u = new Hospital.UsuariosBLL();
            return u.UsuariobyId(U);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    public usuarios UsuarioActual()
    {
        if (Session["Usuario"] != null)
        {
            usuarios u = ((usuarios)Session["Usuario"]);
            return u;
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    public bool Activo()
    {
        if (Session["Usuario"] != null)
        {
            return true;
        }
        else return false;
    }


    [WebMethod(EnableSession = true)]
    public List<Usuarios_Farmacia> Listar_x_Perfil(string Permiso)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.UsuariosBLL u = new Hospital.UsuariosBLL();
            return u.Lista_x_Permiso(Permiso);
        }
        else return null;
    }


}
