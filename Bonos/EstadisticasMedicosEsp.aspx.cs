using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Bonos_EstadisticasMedicosEsp : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.Permiso("25")) { Response.Redirect("Login.aspx"); }
        if (!IsPostBack)
        {
            Hospital.EspecialidadesBLL E = new Hospital.EspecialidadesBLL();
            Hospital.MedicosBLL M = new Hospital.MedicosBLL();
            Hospital.PracticasBLL P = new Hospital.PracticasBLL();

            List<especialidades> esp = E.Especialidades_Lista(true, null, true);
            List<medicos> med = M.Medicos_Por_Especialidad(0);
            List<practicas> pract = P.Lista_Practicas_Todas();

            foreach (especialidades ESPE in esp)
            {
                LEspecialidad.Text = LEspecialidad.Text + "<label style='text-align:left;' class='checkbox'><input id='cbo_esp" + ESPE.Id + "' class='checks' checked disabled type='checkbox' value='" + ESPE.Id + "'>" + ESPE.Especialidad + "</label>";
            }

            foreach (medicos MEDI in med)
            {
                LMedicos.Text = LMedicos.Text + "<label style='text-align:left;' class='checkbox'><input id='cbo_medi" + MEDI.Id + "' type='checkbox' value='" + MEDI.Id + "' disabled='disabled'>" + MEDI.Medico + "</label>";
            }

            foreach (practicas PRACT in pract)
            {
                LPracticas.Text = LPracticas.Text + "<label style='text-align:left;' class='checkbox'><input id='cbo_pract" + PRACT.Codigo + "' type='checkbox' value='" + PRACT.Codigo + "' disabled='disabled'>" + PRACT.Practica + "</label>";
            }

        }
    }
}