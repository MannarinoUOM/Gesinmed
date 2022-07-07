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
        Hospital.VerificadorBLL v = new Hospital.VerificadorBLL(); if (!v.Permiso("114")) { Response.Redirect("Login.aspx"); }
        if (!IsPostBack)
        {
            Hospital.EspecialidadesBLL E = new Hospital.EspecialidadesBLL();
            Hospital.MedicosBLL M = new Hospital.MedicosBLL();

            //List<especialidades> esp = E.Especialidades_Lista_Parte(true, null, true);
            //List<medicos> med = M.Medicos_Por_Especialidad(0);

            //List<especialidades> esp = E.Especialidades_Lista_Parte(false, 326, true);

            especialidades especialidad1 = new especialidades(); especialidad1.Especialidad = "ECOGRAFIA"; especialidad1.Id = 343;
            especialidades especialidad2 = new especialidades(); especialidad2.Especialidad = "MAMOGRAFIA"; especialidad2.Id = 339;
            especialidades especialidad3 = new especialidades(); especialidad3.Especialidad = "RADIOLOGIA"; especialidad3.Id = 341;
            especialidades especialidad4 = new especialidades(); especialidad4.Especialidad = "RESONANCIA MAGNETICA"; especialidad4.Id = 340;
            especialidades especialidad5 = new especialidades(); especialidad5.Especialidad = "TOMOGRAFIA"; especialidad5.Id = 342;


            List<especialidades> esp = new List<especialidades>();
            esp.Add(especialidad1);
            esp.Add(especialidad2);
            esp.Add(especialidad3);
            esp.Add(especialidad4);
            esp.Add(especialidad5);

            List<medicos> med = M.Medicos_Por_Especialidad_IMG(0);

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