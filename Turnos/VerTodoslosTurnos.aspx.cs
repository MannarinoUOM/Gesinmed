using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Turnos_VerTodoslosTurnos : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.Permiso("16")) { Response.Redirect("Login.aspx"); }
        if (!IsPostBack)
        {
            Hospital.EspecialidadesBLL E = new Hospital.EspecialidadesBLL();
            Hospital.MedicosBLL M = new Hospital.MedicosBLL();

            List<especialidades> esp = E.Especialidades_Lista_Parte(true, null, true);
            //List<medicos> med = M.Medicos_Por_Especialidad(0);
            List<medicos> med = M.Medicos_Por_Especialidad_SoloActivos(0, "A");

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