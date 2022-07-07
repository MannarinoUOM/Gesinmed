using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for confirmarturnos
/// </summary>
public class Confirmarturnos
{
    public Confirmarturnos()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    //GLUCEMIA *,2,2,1,,1910.

    
    public int Codigo { get; set; }
    public string Practica { get; set; }
    public string Precio { get; set; }
    public string PrecioReal { get; set; }
    public int Pos { get; set; }
    public string ComentarioPractica { get; set; }
    public int PracticaId { get; set; }
    public int Estado { get; set; }
    public string valorMonotributo { get; set; }
}


public class ConfirmarturnosLista : List<Confirmarturnos>
{
}