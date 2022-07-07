using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for pedidosenfermeria
/// </summary>
public class pedidosenfermeria
{
	public pedidosenfermeria()
	{
		//
		// TODO: Add constructor logic here
		//

	}

    public string Fecha { get; set; }
    public int MedicoId { get; set; }
    public int ConsultorioId { get; set; }
    public string Pedido { get; set; }
    public int UsuarioId { get; set; }
    public string Estado { get; set; }
    public string Clase { get; set; }
    public string FechaEntregado { get; set; }
    public string Consultorio { get; set; }
    public string Medico { get; set; }

}