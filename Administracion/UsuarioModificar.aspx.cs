using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Administracion_UsuarioModificar : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
            if (!V.Permiso("990")) { Response.Redirect("../Error.aspx"); }

            if (!string.IsNullOrEmpty(Request.QueryString["Id"]))
            {
                Hospital.AdministracionBLL A = new Hospital.AdministracionBLL();
                if (A.EsAdministrador(Convert.ToInt64(Request.QueryString["Id"])))
                {
                    //Literal1.Text = "<option value='Administrador'>Administrador</option><option value='Usuario'>Usuario</option><option value='Supervisor'>Supervisor</option>";
                    Literal1.Text = "<option value='Administrador'>Administrador</option><option value='Usuario'>Usuario</option>";
                    //Literal2.Text = "<input id='txtUsuario' type='hidden' /><td><span id='span_Usuario'>NombreUsuario</span></td>";
                    Literal3.Text = "<td><span id='span_seccional'></span></td>";
                }
                else
                {
                    //Literal1.Text = "<option value='Usuario'>Usuario</option><option value='Supervisor'>Supervisor</option>";
                    Literal1.Text = "<option value='Usuario'>Usuario</option>";
                    //Literal2.Text = "<input id='txtUsuario' type='hidden' /><td><input id='span_Usuario' placeholder ='NombreUsuario'></input></td>";
                    //Literal2.Text = "<input id='txtUsuario' type='hidden' /><td><span id='span_Usuario'>NombreUsuario</span></td>";
                    Literal3.Text = "<td><span id='span_seccional'></span></td>";
                }
            }
            else
            {
                //Literal1.Text = "<option value='Usuario'>Usuario</option><option value='Supervisor'>Supervisor</option>";
                Literal1.Text = "<option value='Usuario'>Usuario</option>";
                //Literal2.Text = "<td><input id='txtUsuario' maxlength='20' runat='server' class='span5 datos' type='text' /></td><span style='display:none;' id='span_Usuario'>NombreUsuario</span>";
                if ((Session["Usuario"]) == null)
                {
                    Response.Redirect("../Error.aspx");
                }

                Literal3.Text = "<td><span id='span_seccional'>" + ((usuarios)Session["Usuario"]).seccional + "</span></td>";
            }

        }
        
    }
}