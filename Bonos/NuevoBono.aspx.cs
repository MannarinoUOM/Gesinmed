using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Bonos_NuevoBono : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.Permiso("21")) { Response.Redirect("Login.aspx"); }

         usuarios u = new usuarios();
         u = (usuarios)Session["Usuario"];

         if (u.perfil == "83") { perfil.Value = "83"; }
        
    }
}