using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using HospitalBLL.Entities;

/// <summary>
/// Descripción breve de EstudiosComplementarios
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class EstudiosComplementarios : System.Web.Services.WebService
{

    public EstudiosComplementarios()
    {

        //Elimine la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<EstudiosComp> Estudios_Complementarios_listar()
    {
        Hospital.EstudiosComplementariosBLL estudios = new Hospital.EstudiosComplementariosBLL();
        return estudios.Estudios_Complementarios_listar();
    }
    [WebMethod]
    public List<TipoEstudioComp> Filtro_Estudios_Complementarios(string Descripcion)
    {
        Hospital.EstudiosComplementariosBLL estudios = new Hospital.EstudiosComplementariosBLL();
        return estudios.Filtro_Estudios_Complementarios(Descripcion);
    }

    [WebMethod(EnableSession = true)]
    //[WebMethod]
    public void Insertar_Historial_Practicas_Complementarias(int idAfiliado,int Id_Medico, int idPractica, string TipoPractica, DateTime fechaPractica, int internado, string columna1, string columna2, 
        string columna3, string columna4, string columna5, string columna6, string columna7,string Link_Pdf, string Observaciones, DateTime Fecha_Sistema, string titulo, string tituloB, DateTime fechaYHora)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.EstudiosComplementariosBLL historial = new Hospital.EstudiosComplementariosBLL();
            historial.Insertar_Historial_Practicas_Complementarias(idAfiliado, Id_Medico, idPractica, TipoPractica, fechaPractica, internado,
                columna1, columna2, columna3, columna4, columna5, columna6, columna7, Link_Pdf, Observaciones, Fecha_Sistema, titulo, tituloB, fechaYHora);
          
        }
        else throw new Exception("Inicie Sesión Nuevamente.");

    }
}
