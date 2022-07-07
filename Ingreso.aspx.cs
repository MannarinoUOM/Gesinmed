using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Inicio : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (Session["Usuario"] != null)
            {
                usuarios u = new usuarios();
                u = ((usuarios)Session["Usuario"]);
                lblSeccional.Text = u.seccional.ToUpper();
                LiteralUsuario.Text = u.usuario;
                LiteralUsuario2.Text = u.usuario;
            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

    }
}
