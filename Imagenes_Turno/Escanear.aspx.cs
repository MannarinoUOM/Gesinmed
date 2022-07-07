using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Imagenes_Turno_Escanear : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string TurnoId = Request.QueryString["turno"];
        string PacienteId = Request.QueryString["paciente"];

        Literal1.Text = "<script>var turno = " + TurnoId + "; var paciente=" + PacienteId + ";</script>";

    }
}