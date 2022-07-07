using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Administracion_CambiarClave : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        usuarios u = new usuarios();
        u = (usuarios)Session["Usuario"];
        lbl_Usuario.Text = u.usuario;
    }
}