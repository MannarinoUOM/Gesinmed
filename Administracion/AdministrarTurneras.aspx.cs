using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Administracion_AdministrarTurneras : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.Permiso("997")) { Response.Redirect("Login.aspx"); }

        Hospital.TurneraBLL T = new Hospital.TurneraBLL();
        List<turnera_administracion> l = new List<turnera_administracion>();
        l =  T.TurneraLista();
        foreach(turnera_administracion tur in l)
        {
            LTurneras.Text = LTurneras.Text + "<tr onclick='javascript:CargarTurneras(" + tur.id + ");'><td>" + tur.id + "</td><td>" + tur.turnera + "</td></tr>";
        }
        
    }
}