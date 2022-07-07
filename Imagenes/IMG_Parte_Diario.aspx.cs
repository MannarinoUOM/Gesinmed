using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Imagenes_Imagenes_Parte_Diario : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.Permiso("16")) { Response.Redirect("Login.aspx"); }
        if (!IsPostBack)
        {
            Hospital.QuirofanoReporte E = new Hospital.QuirofanoReporte();
            Hospital.QuirofanoReporte M = new Hospital.QuirofanoReporte();

            List<especialidades> esp = E.Especialidades_Lista_Parte_Imagenes(false, null, true);
            List<medicos> med = M.Medicos_Por_Especialidad_Imagenes("341,342,356,339,354,340,343");

            foreach (especialidades ESPE in esp)
            {
                LEspecialidad.Text = LEspecialidad.Text + "<label style='text-align:left;' class='checkbox'><input id='cbo_esp" + ESPE.Id + "' class='cbE' type='checkbox' value='" + ESPE.Id + "' checked>" + ESPE.Especialidad + "</label>";
            }

            foreach (medicos MEDI in med)
            {
                LMedicos.Text = LMedicos.Text + "<label style='text-align:left;' class='checkbox'><input id='cbo_medi" + MEDI.Id + "' class='cbM' type='checkbox' value='" + MEDI.Id + "' checked>" + MEDI.Medico + "</label>";
            }


        }
    }
}
