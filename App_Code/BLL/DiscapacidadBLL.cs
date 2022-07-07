using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for DiscapacidadBLL
/// </summary>

namespace Hospital
{
    public class DiscapacidadBLL
    {
        public DiscapacidadBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public string CertificadoVencido(int dni)
        {
            DiscapacidadDALTableAdapters.QueriesTableAdapter adapter = new DiscapacidadDALTableAdapters.QueriesTableAdapter();
            object Fecha = adapter.H2_Discapacidad_VerificarVencimiento(dni);
            if (Fecha != null)
            {
                
                if (Convert.ToInt32(Convert.ToDateTime(Fecha).ToString("yyyyMMdd")) < Convert.ToInt32(DateTime.Today.ToString("yyyyMMdd")))
                {
                    return "El certificado de discapacidad ha vencido el día: " + Convert.ToDateTime(Fecha).ToShortDateString();
                }
                

            }
            
            return "";
        }

    }
}