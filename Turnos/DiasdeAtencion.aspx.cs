using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Turnos_DiasdeAtencion : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
       // Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.Permiso("992")) { Response.Redirect("Login.aspx"); }

        if (!IsPostBack)
        { 
            if (!string.IsNullOrEmpty(Request.QueryString["MedicoId"]))
            {
                txtMedicoId.Value = Request.QueryString["MedicoId"].ToString();
                NombreMedico.Text = Request.QueryString["NombreMedico"].ToString();
            }
            
        }
    }
}