using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Imagenes_Turno_Informe_Cargar : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.Permiso("115")) { Response.Redirect("Login.aspx"); }
        else
        {
            string fecharestada = DateTime.Now.AddMonths(-2).ToShortDateString();
            scriptliteral.Text = "<script> $('#txt_fecha_desde').val('" + fecharestada + "'); $('#txt_fecha_hasta').val('" + DateTime.Now.ToShortDateString() + "');</script>";
        }
    }
}