using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de EstudiosComplementarios
/// </summary>
public class EstudiosComp
{
    public EstudiosComp()
    {
        //
        // TODO: Agregar aquí la lógica del constructor
        //
    }

    public long Id { get; set; }
    public string Descripcion { get; set; }
    public string fecha { get; set; }
    public string fechaHora { get; set; }
    public string Medico { get; set; }
    public int id_medico { get; set; }
    public int id_practica { get; set; }
    public string tipo { get; set; }
}