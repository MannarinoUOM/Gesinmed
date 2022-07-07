using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class HistoriaClinica_VerInternacionVarios : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        esLegales.Value = "SI";
        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.PermisoOK("141")) { esLegales.Value = "NO"; } //NO Permiso Legales
    }
}