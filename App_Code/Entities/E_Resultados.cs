using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de Entrega_De_Resultados
/// </summary>
public class E_Resultados
{
    public E_Resultados()
    {
        //
        // TODO: Agregar aquí la lógica del constructor
        //
    }
}

public class estudios
{
    public long estudioId { get; set; }
    public long especialidadId { get; set; }
    public long pacienteId { get; set; }
    public string fechaIngreso { get; set; }
    public string fechaEntrega { get; set; }
    public string fechaDevolucion { get; set; }
    public string estudio { get; set; }
    public string afiliado { get; set; }
    public string observacion { get; set; }
    public string usuario { get; set; }
}
