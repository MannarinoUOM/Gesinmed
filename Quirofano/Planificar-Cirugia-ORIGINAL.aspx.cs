﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Quirofano_Planificar_Cirugia_ORIGINAL : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.Permiso("91")) { Response.Redirect("Login.aspx"); } 
    }
}