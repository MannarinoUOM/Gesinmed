using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Hospital;

public partial class LoginSeccional : System.Web.UI.Page
{
    //instancia de verificador de permisos en backend
    protected Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();

    //referencia a la clase que se encarga de ejecutar el llamado webService
    protected MenuDinamicoPermisosBLL menuDinamicoPermisos = new MenuDinamicoPermisosBLL();

    //listado para guardar los contenidos que trajo de la base de datos.
    protected List<MenuDinamicoLista> menuDinamicoLista = new List<MenuDinamicoLista>();


    protected List<string> menues = new List<string>();
    protected List<string> submenues = new List<string> { "1", "1", "2", "3", "4", "4", "555", "666" };


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
               
                //guarda todo los datos de los items que arman los menues y submenues
                //que trajo de la base de datos segun el id del usuario. (revisar por que trae solo 22)
                menuDinamicoLista = menuDinamicoPermisos.TraerListadoItemsMenues(Convert.ToInt32(u.id));
                //--------------
                foreach (var _listaMenues in menuDinamicoLista)
                {
                    menues.Add(_listaMenues.Cod.ToString());
                }
               
            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

    }

}