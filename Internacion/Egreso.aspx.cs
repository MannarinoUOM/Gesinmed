﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Internacion_Egreso : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.Permiso("52")) { Response.Redirect("Login.aspx"); }
        if (v.Permiso("53"))
        {
            btnLimpiarEgreso.Visible = true;
            btnGuardarEgreso.Visible = true;
        }
        else {
            btnLimpiarEgreso.Visible = false;
            btnGuardarEgreso.Visible = false;
        }
    }
}