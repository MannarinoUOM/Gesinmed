using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Est_UsuarioMovBLL
/// </summary>
namespace Estadisticas
{
    public class Est_UsuarioMovBLL
    {
        public Est_UsuarioMovBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public void EstUsuMov(int U, string D)
        {
            EST_UsuarioMovDALTableAdapters.QueriesTableAdapter adapter = new EST_UsuarioMovDALTableAdapters.QueriesTableAdapter();
            adapter.Est_Guardar_Usuarios_Ingreso(U, D);
        }
    }
}