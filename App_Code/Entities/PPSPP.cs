using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de PPSP
/// </summary>
public class PPSPP
{
	public PPSPP()
	{
		//
		// TODO: Agregar aquí la lógica del constructor
		//
	}

}

public class Farmacia_Rubros {
   public int id { get; set; }
   public string descripcion { get; set; }
   public long servicioId { get; set; }
}

public class Farmacia_Insumo
{
    public long id { get; set; }
    public string servicio { get; set; }
    public long servicioId { get; set; }
    public int stock_minimo { get; set; }
    public int stock_actual { get; set; }
    public int insumoId { get; set; }
    public int idPlantilla { get; set; }
    public int ruboId { get; set; }
    public int cantidad { get; set; }
    public long usuarioId { get; set; }
    public int pedido { get; set; }
}