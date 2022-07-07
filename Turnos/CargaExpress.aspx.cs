using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Turnos_CargaExpress : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.Permiso("12")) { Response.Redirect("Login.aspx"); }
           
            if (v.PermisoOK("20")) lbl_Sobreturno.Visible = true;   
            else lbl_Sobreturno.Visible = false;
        }

        
    }
}