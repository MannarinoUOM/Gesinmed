using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hospital;

public partial class Inicio2 : System.Web.UI.Page
{
    //instancia de verificador de permisos en backend
    protected Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();

    //referencia a la clase que se encarga de ejecutar el llamado webService
    protected MenuDinamicoPermisosBLL menuDinamicoPermisos = new MenuDinamicoPermisosBLL();

    //listado para guardar los datos de los items que componen los submenues que trajo de la base de datos.
    protected List<MenuDinamicoLista> submenuesDinamicoLista = new List<MenuDinamicoLista>();

    //listado de los menues principales que trajo de la base de datos
    protected List<MenuDinamicoLista> menuesPrincipalLista = new List<MenuDinamicoLista>();

    

    //nombre del perfil (laboratorio, administrativo, doctor, etc) para buscar los permisos que tiene ese perfil
    protected string perfilUsuario = "";
    //nombre de la seccional a la cual pertenece, para buscar los permisos que esa seccional tiene.
    protected string seccionalUsuario = "";
    
    //datos del usuario
    protected usuarios u = new usuarios();


    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["Usuario"] != null)
            {
                CentroBLL cbll = new CentroBLL();
                centro c = cbll.elCentro();

                u = ((usuarios)Session["Usuario"]);
                lblSeccional.Text = c.RazonSocial.ToUpper();
                LiteralUsuario.Text = u.usuario;
                LiteralUsuario2.Text = u.usuario;
                AtInternadosBLL at = new AtInternadosBLL();
                cantidad.Value = at.Interconsultas_Pendientes_by_Usuario(((usuarios)Session["Usuario"]).id).ToString();

                //guarda todos los datos de los items para los MENUES PRINCIPALES, independientemenete del id del usuario
                menuesPrincipalLista = menuDinamicoPermisos.TraerListadoMenuesPrincipales();

                //guarda todo los datos de los items que arman los SUBMENUES que trajo de la base de datos segun el id del usuario.
                submenuesDinamicoLista = menuDinamicoPermisos.TraerListadoItemsMenues(Convert.ToInt32(u.id));


                InicioBLL i = new InicioBLL();
                List<version> list = i.ListVersiones();
                if (list.Count > 0) Version.InnerHtml = "<strong>GesInMed</strong> Versión " + list[0].Version + " - " + list[0].Fecha;

                string Nro_Box = "-1";
                if (((usuarios)Session["Usuario"]).Box_Turno_Bono != null)
                {
                    Nro_Box = ((usuarios)Session["Usuario"]).Box_Turno_Bono;
                }

                lit_java_script.Text = "<script>$('#span_nro_box').html('" + Nro_Box + "'); Nro_Box = " + Nro_Box + " ;</script>";

            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }
    }
}


