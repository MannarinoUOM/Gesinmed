using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ConfirmacionBLL
/// </summary>
namespace Hospital
{
    public class ConfirmacionBLL
    {
        public ConfirmacionBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public void RecepcionaryConfirmardesdeBono(DateTime FechaBono, int IdBono, int MedicoId, int EspecialidadId, DateTime Fecha)
        {
            ConfirmacionDALTableAdapters.QueriesTableAdapter adapter = new ConfirmacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Recepcionar_Turno_Desde_Bono(FechaBono, IdBono, MedicoId, EspecialidadId, Fecha);

            Hospital.BonosBLL B = new BonosBLL();
            long Doc = B.Documento_Del_Bono(FechaBono, IdBono);

            usuarios U = (usuarios)HttpContext.Current.Session["Usuario"];
            Estadisticas.Est_PacienteMovBLL E = new Estadisticas.Est_PacienteMovBLL();
            E.EstPacMov(Doc, 4, (Int32)U.id, "Recepción Paciente desde el Bono: " + IdBono + " // Fecha: " + FechaBono);
        }

        public void UsarBono(DateTime FechaBono, int IdBono)
        {
            ConfirmacionDALTableAdapters.QueriesTableAdapter adapter = new ConfirmacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Nro_Bono_Usar(IdBono, FechaBono);

            Hospital.BonosBLL B = new BonosBLL();
            long Doc = B.Documento_Del_Bono(FechaBono, IdBono);

            usuarios U = (usuarios)HttpContext.Current.Session["Usuario"];
            Estadisticas.Est_PacienteMovBLL E = new Estadisticas.Est_PacienteMovBLL();
            E.EstPacMov(Doc, 4, (Int32)U.id, "Bono Usado // Recepción Paciente desde el Bono: " + IdBono + " // Fecha: " + FechaBono);
        }



    }
}