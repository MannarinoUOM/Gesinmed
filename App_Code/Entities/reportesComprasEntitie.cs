using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de reportesCompras
/// </summary>
public class reportesComprasEntitie
{
    public reportesComprasEntitie()
	{
		//
		// TODO: Agregar aquí la lógica del constructor
		//
	}
}

public class itemCombo
{
    public int id { get; set; }
    public string descripcion { get; set; }
}

public class reporteCABA
{
    public string afiliado { get; set; }
    public long dni { get; set; }
    public string nhc { get; set; }
    public string seccional { get; set; }
    public long pedido { get; set; }
    public string insumo { get; set; }
    public decimal pocentaje { get; set; }
    public decimal gatoUOM { get; set; }
    public long remito { get; set; }
    public string fechaPedido { get; set; }
    public int cantidadPedida { get; set; }
    public int cantidadEntregada { get; set; }
    public int saldo { get; set; }
    public string deposito { get; set; }
}

public class reporteGastosAdministraciónInternación
{
    public string FECHA { get; set; }
    public string INSUMO { get; set; }
    public string PROVEEDOR { get; set; }
    public decimal PRECIO { get; set; }
    public int PEDIDA { get; set; }
    public int RECIBIDA { get; set; }
    public int PENDIENTE { get; set; }
    public string TIPO_ORDEN { get; set; }
    public int NUMERO_ORDEN_COMPRA { get; set; }
    public string REMITO { get; set; }
    public string FACTURA { get; set; }
}