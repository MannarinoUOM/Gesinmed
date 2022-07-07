using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Est_PacienteMovBLL
/// </summary>
namespace Estadisticas
{
    public class Est_PacienteMovBLL
    {
        public Est_PacienteMovBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public void EstPacMov(long P, int E, int U, string D)
        {
            Est_Pacientes_MovTableAdapters.QueriesTableAdapter adapter = new Est_Pacientes_MovTableAdapters.QueriesTableAdapter();
            adapter.Est_Paciente_Mov(P, E, D, U);
        }
    }
}