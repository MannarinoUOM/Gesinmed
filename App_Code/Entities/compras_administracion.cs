using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de compras_administracion
/// </summary>
public class compras_administracion
{
	public compras_administracion()
	{
		//
		// TODO: Agregar aquí la lógica del constructor
		//
	}
}


public class compras_reporte_administracion
{
    public string FechaPedido { get; set; }
    public string Servicio { get; set; }
    public long NroPedido { get; set; }
    public string Insumo { get; set; }
    public int Pedido { get; set; }
    public long NroOrdenCompra { get; set; }
    public long NroRemito { get; set; }
    public int Saldo { get; set; }

    public compras_reporte_administracion() { }

    public compras_reporte_administracion(string _FechaPedido, string _Servicio, long _NroPedido, string _Insumo, int _Pedido, long _NroOrdenCompra, long _NroRemito,
        int _Saldo)
    {
        FechaPedido = _FechaPedido;
        Servicio = _Servicio;
        NroPedido = _NroPedido;
        Insumo = _Insumo;
        NroPedido = _NroPedido;
        Insumo = _Insumo;
        Pedido = _Pedido;
        NroOrdenCompra = _NroOrdenCompra;
        NroRemito = _NroRemito;
        NroRemito = _NroRemito;
        Saldo = _Saldo;
    }
}


public class COM_PED_CAB
{
    public COM_PED_CAB() { }

    public COM_PED_CAB(long _PED_COM_ID, long _PED_COM_SERV_ID, string _PED_COM_FECHA, long _PED_COM_USUARIO_ID,
        bool _PED_COM_BAJA, int _PED_COM_ESTADO, string _PED_COM_SERV_DESC = "",string _PED_COM_USUARIO_NOM = "")
    {
        PED_COM_ID = _PED_COM_ID;
        PED_COM_SERV_ID = _PED_COM_SERV_ID;
        PED_COM_FECHA = _PED_COM_FECHA;
        PED_COM_USUARIO_ID = _PED_COM_USUARIO_ID;
        PED_COM_BAJA = _PED_COM_BAJA;
        PED_COM_ESTADO = _PED_COM_ESTADO;
        PED_COM_SERV_DESC = _PED_COM_SERV_DESC;
        PED_COM_USUARIO_NOM = _PED_COM_USUARIO_NOM;
    }

    public long PED_COM_ID { get; set; }
    public long PED_COM_SERV_ID { get; set; }
    public string PED_COM_FECHA { get; set; }
    public long PED_COM_USUARIO_ID { get; set; }
    public bool PED_COM_BAJA { get; set; }
    public int PED_COM_ESTADO { get; set; }
    public string PED_COM_SERV_DESC { get; set; }
    public string PED_COM_USUARIO_NOM { get; set; }
}

public class COM_PED_DET
{
    public COM_PED_DET() { }

    public COM_PED_DET(long _PED_COM_DET_ID, long _PED_COM_ID, long _PED_COM_DET_INS_ID, string _PED_COM_DET_INS_DESC, int _PED_COM_DET_CANTIDAD,
        long _PED_COM_DET_PRV_ID, string _PED_COM_DET_OBS)
    {
        PED_COM_DET_ID = _PED_COM_DET_ID;
        PED_COM_ID = _PED_COM_ID;
        PED_COM_DET_INS_ID = _PED_COM_DET_INS_ID;
        PED_COM_DET_INS_DESC = _PED_COM_DET_INS_DESC;
        PED_COM_DET_CANTIDAD = _PED_COM_DET_CANTIDAD;
        PED_COM_DET_PRV_ID = _PED_COM_DET_PRV_ID;
        PED_COM_DET_OBS = _PED_COM_DET_OBS;
    }

    public long PED_COM_DET_ID { get; set; }
    public long PED_COM_ID { get; set; }
    public long PED_COM_DET_INS_ID { get; set; }
    public string PED_COM_DET_INS_DESC { get; set; }
    public int PED_COM_DET_CANTIDAD { get; set; }
    public long PED_COM_DET_PRV_ID { get; set; }
    public string PED_COM_DET_OBS { get; set; }
}

public class COM_ADM_INS
{
    public COM_ADM_INS() { }

    public COM_ADM_INS(long _COM_ADM_INS_INS_ID,string _COM_ADM_INS_INS_DESC,bool _COM_ADM_INS_BAJA = false)
    {
        COM_ADM_INS_INS_ID = _COM_ADM_INS_INS_ID;
        COM_ADM_INS_INS_DESC = _COM_ADM_INS_INS_DESC;
        COM_ADM_INS_BAJA = _COM_ADM_INS_BAJA;
    }

    public long COM_ADM_INS_INS_ID { get; set; }
    public string COM_ADM_INS_INS_DESC { get; set; }
    public bool COM_ADM_INS_BAJA { get; set; }
}

public class COM_ADM_LIST_DET_ORDEN
{
    public COM_ADM_LIST_DET_ORDEN () {}

    public COM_ADM_LIST_DET_ORDEN(long _PED_COM_ID, string _SERV_DESCRIPCION, string _PED_COM_FECHA, bool _PED_PENDIENTE = true)
    {
        PED_COM_ID = _PED_COM_ID;
        SERV_DESCRIPCION = _SERV_DESCRIPCION;
        PED_COM_FECHA = _PED_COM_FECHA;
        PED_PENDIENTE = _PED_PENDIENTE;
    }

    public COM_ADM_LIST_DET_ORDEN (long _PED_COM_DET_ID, long _PED_COM_ID, long _PED_COM_DET_INS_ID, string _PED_COM_DET_INS_DESC,
        int _PED_COM_DET_CANTIDAD, long _PED_COM_DET_PRV_ID, string _SERV_DESCRIPCION, string _PED_COM_FECHA,
        int _COM_ADM_INS_PEDIR_CANT_PED, int _SALDO, string _PED_COM_DET_OBS, decimal _PED_ULTIMO_PRECIO,
        decimal _PRECIO_COMPRA_ACTUAL)
    {
        PED_COM_DET_ID = _PED_COM_DET_ID;
        PED_COM_ID = _PED_COM_ID;
        PED_COM_DET_INS_ID = _PED_COM_DET_INS_ID;
        PED_COM_DET_INS_DESC = _PED_COM_DET_INS_DESC;
        PED_COM_DET_CANTIDAD = _PED_COM_DET_CANTIDAD;
        PED_COM_DET_PRV_ID = _PED_COM_DET_PRV_ID;
        SERV_DESCRIPCION = _SERV_DESCRIPCION;
        PED_COM_FECHA = _PED_COM_FECHA;
        COM_ADM_INS_PEDIR_CANT_PED = _COM_ADM_INS_PEDIR_CANT_PED;
        SALDO = _SALDO;
        PED_COM_DET_OBS = _PED_COM_DET_OBS;
        PED_ULTIMO_PRECIO = _PED_ULTIMO_PRECIO;
        PRECIO_COMPRA_ACTUAL = _PRECIO_COMPRA_ACTUAL;
        TOTAL = PRECIO_COMPRA_ACTUAL * COM_ADM_INS_PEDIR_CANT_PED;
    }

    public long PED_COM_DET_ID { get; set; }
    public long PED_COM_ID { get; set; }
    public long PED_COM_DET_INS_ID { get; set; }
    public string PED_COM_DET_INS_DESC { get; set; }
    public int PED_COM_DET_CANTIDAD { get; set; }
    public long PED_COM_DET_PRV_ID { get; set; }
    public string SERV_DESCRIPCION { get; set; }
    public string PED_COM_FECHA { get; set; }
    public int COM_ADM_INS_PEDIR_CANT_PED { get; set; }
    public int SALDO { get; set; }
    public string PED_COM_DET_OBS { get; set; }
    public bool PED_PENDIENTE { get; set; }
    public decimal PED_ULTIMO_PRECIO { get; set; }
    public decimal PRECIO_COMPRA_ACTUAL { get; set; }
    public decimal TOTAL { get; set; }
}



public class COM_ADM_INS_PEDIR
{
    public COM_ADM_INS_PEDIR() { }

    public COM_ADM_INS_PEDIR(long _COM_ADM_INS_PEDIR_ID, long _COM_ADM_INS_PEDIR_ORD_CAB_ID, long _COM_ADM_INS_PEDIR_PED_ID, int _COM_ADM_INS_PEDIR_PRV_ID,
        int _COM_ADM_INS_PEDIR_CANT_PED, long _COM_ADM_INS_PEDIR_USU_ID, long _COM_ADM_INS_PEDIR_INS_ID, string _COM_ADM_INS_PEDIR_INS_NOM,
        decimal _COM_ADM_INS_PEDIR_PRECIO_COMPRA_ACTUAL)
    {
        COM_ADM_INS_PEDIR_ID = _COM_ADM_INS_PEDIR_ID;
        COM_ADM_INS_PEDIR_ORD_CAB_ID = _COM_ADM_INS_PEDIR_ORD_CAB_ID;
        COM_ADM_INS_PEDIR_PED_ID = _COM_ADM_INS_PEDIR_PED_ID;
        COM_ADM_INS_PEDIR_PRV_ID = _COM_ADM_INS_PEDIR_PRV_ID;
        COM_ADM_INS_PEDIR_CANT_PED = _COM_ADM_INS_PEDIR_CANT_PED;
        COM_ADM_INS_PEDIR_USU_ID = _COM_ADM_INS_PEDIR_USU_ID;
        COM_ADM_INS_PEDIR_INS_ID = _COM_ADM_INS_PEDIR_INS_ID;
        COM_ADM_INS_PEDIR_INS_NOM = _COM_ADM_INS_PEDIR_INS_NOM;
        COM_ADM_INS_PEDIR_PRECIO_COMPRA_ACTUAL = _COM_ADM_INS_PEDIR_PRECIO_COMPRA_ACTUAL;
        COM_ADM_INS_PEDIR_TOTAL = COM_ADM_INS_PEDIR_PRECIO_COMPRA_ACTUAL * COM_ADM_INS_PEDIR_CANT_PED;
    }

    public long COM_ADM_INS_PEDIR_ID { get; set; }
    public long COM_ADM_INS_PEDIR_ORD_CAB_ID { get; set; }
    public long COM_ADM_INS_PEDIR_PED_ID { get; set; }
    public int COM_ADM_INS_PEDIR_PRV_ID { get; set; }
    public int COM_ADM_INS_PEDIR_CANT_PED { get; set; }
    public long COM_ADM_INS_PEDIR_USU_ID { get; set; }
    public long COM_ADM_INS_PEDIR_INS_ID { get; set; }
    public string COM_ADM_INS_PEDIR_INS_NOM { get; set; }
    public decimal COM_ADM_INS_PEDIR_PRECIO_COMPRA_ACTUAL { get; set; }
    public decimal COM_ADM_INS_PEDIR_TOTAL { get; set; }
    public string @TIPO_ORDEN_COMPRA { get; set; }
}


public class COM_ORDEN_CAB
{
    public COM_ORDEN_CAB() {}


    public COM_ORDEN_CAB( long _ORDEN_COM_CAB_ID, string _ORDEN_COM_CAB_FECHA, long _ORDEN_COM_CAB_USU_ID, long _ORDEN_COM_CAB_PRV_ID, int _ORDEN_COM_CAB_SECTOR = 0,
    bool _ORDEN_COM_CAB_ENVIADO = false, string _ORDEN_COM_CAB_PRV_NOMBRE = "", string _ORDEN_COM_CAB_USU_NOMBRE = "", bool _PENDIENTE = true, decimal _TOTAL = 0)
    {
        ORDEN_COM_CAB_ID = _ORDEN_COM_CAB_ID;
        ORDEN_COM_CAB_FECHA = _ORDEN_COM_CAB_FECHA;
        ORDEN_COM_CAB_USU_ID = _ORDEN_COM_CAB_USU_ID;
        ORDEN_COM_CAB_SECTOR = _ORDEN_COM_CAB_SECTOR;
        ORDEN_COM_CAB_ENVIADO = _ORDEN_COM_CAB_ENVIADO;
        ORDEN_COM_CAB_PRV_ID = _ORDEN_COM_CAB_PRV_ID;
        ORDEN_COM_CAB_PRV_NOMBRE = _ORDEN_COM_CAB_PRV_NOMBRE;
        ORDEN_COM_CAB_USU_NOMBRE = _ORDEN_COM_CAB_USU_NOMBRE;
        PENDIENTE = _PENDIENTE;
        ORDEN_COM_CAB_TOTAL = _TOTAL; 
    }

    public COM_ORDEN_CAB(long _EXP_ID, long _EXP_PED_ID, long _ORDEN_COM_CAB_ID, string _ORDEN_COM_CAB_FECHA, long _ORDEN_COM_CAB_USU_ID, long _ORDEN_COM_CAB_PRV_ID, int _ORDEN_COM_CAB_SECTOR = 0,
        bool _ORDEN_COM_CAB_ENVIADO = false, string _ORDEN_COM_CAB_PRV_NOMBRE = "", string _ORDEN_COM_CAB_USU_NOMBRE = "", bool _PENDIENTE = true)
    {
        ORDEN_COM_CAB_ID = _ORDEN_COM_CAB_ID;
        ORDEN_COM_CAB_FECHA = _ORDEN_COM_CAB_FECHA;
        ORDEN_COM_CAB_USU_ID = _ORDEN_COM_CAB_USU_ID;
        ORDEN_COM_CAB_SECTOR = _ORDEN_COM_CAB_SECTOR;
        ORDEN_COM_CAB_ENVIADO = _ORDEN_COM_CAB_ENVIADO;
        ORDEN_COM_CAB_PRV_ID = _ORDEN_COM_CAB_PRV_ID;
        ORDEN_COM_CAB_PRV_NOMBRE = _ORDEN_COM_CAB_PRV_NOMBRE;
        ORDEN_COM_CAB_USU_NOMBRE = _ORDEN_COM_CAB_USU_NOMBRE;
        PENDIENTE = _PENDIENTE;
        EXP_ID = _EXP_ID;
        EXP_PED_ID = _EXP_PED_ID;
    }


    public COM_ORDEN_CAB(long _ORDEN_COM_CAB_ID, string _ORDEN_COM_CAB_FECHA, long _ORDEN_COM_CAB_USU_ID, long _ORDEN_COM_CAB_PRV_ID,string _TIPO_ORDEN, int _ORDEN_COM_CAB_SECTOR = 0,
bool _ORDEN_COM_CAB_ENVIADO = false, string _ORDEN_COM_CAB_PRV_NOMBRE = "", string _ORDEN_COM_CAB_USU_NOMBRE = "", bool _PENDIENTE = true, decimal _TOTAL = 0)
    {
        ORDEN_COM_CAB_ID = _ORDEN_COM_CAB_ID;
        ORDEN_COM_CAB_FECHA = _ORDEN_COM_CAB_FECHA;
        ORDEN_COM_CAB_USU_ID = _ORDEN_COM_CAB_USU_ID;
        ORDEN_COM_CAB_SECTOR = _ORDEN_COM_CAB_SECTOR;
        ORDEN_COM_CAB_ENVIADO = _ORDEN_COM_CAB_ENVIADO;
        ORDEN_COM_CAB_PRV_ID = _ORDEN_COM_CAB_PRV_ID;
        ORDEN_COM_CAB_PRV_NOMBRE = _ORDEN_COM_CAB_PRV_NOMBRE;
        ORDEN_COM_CAB_USU_NOMBRE = _ORDEN_COM_CAB_USU_NOMBRE;
        PENDIENTE = _PENDIENTE;
        ORDEN_COM_CAB_TOTAL = _TOTAL;
        TIPO_ORDEN = _TIPO_ORDEN;
    }

    public long ORDEN_COM_CAB_ID { get; set; }
    public string ORDEN_COM_CAB_FECHA { get; set; }
    public long ORDEN_COM_CAB_USU_ID { get; set; }
    public int ORDEN_COM_CAB_SECTOR { get; set; }
    public bool ORDEN_COM_CAB_ENVIADO { get; set; }
    public long ORDEN_COM_CAB_PRV_ID { get; set; }
    public string ORDEN_COM_CAB_PRV_NOMBRE { get; set; }
    public string ORDEN_COM_CAB_USU_NOMBRE { get; set; }
    public bool PENDIENTE { get; set; }
    public long EXP_ID { get; set; }
    public long EXP_PED_ID { get; set; }
    public decimal ORDEN_COM_CAB_TOTAL { get; set; }
    public string TIPO_ORDEN { get; set; }
}

public class COM_ORDEN_DET
{
    public COM_ORDEN_DET() { }

    public COM_ORDEN_DET(long _COM_ADM_INS_PEDIR_ID, long _COM_ADM_INS_PEDIR_ORD_CAB_ID, long _COM_ADM_INS_PEDIR_PED_ID, long _COM_ADM_INS_PEDIR_PRV_ID,
        int _COM_ADM_INS_PEDIR_CANT_PED, long _COM_ADM_INS_PEDIR_USU_ID, string _PED_COM_DET_INS_DESC, long _PED_COM_DET_INS_ID,
        decimal _PRECIO_COMPRA_ACTUAL)
    {
        COM_ADM_INS_PEDIR_ID = _COM_ADM_INS_PEDIR_ID;
        COM_ADM_INS_PEDIR_ORD_CAB_ID = _COM_ADM_INS_PEDIR_ORD_CAB_ID;
        COM_ADM_INS_PEDIR_PED_ID = _COM_ADM_INS_PEDIR_PED_ID;
        COM_ADM_INS_PEDIR_PRV_ID = _COM_ADM_INS_PEDIR_PRV_ID;
        COM_ADM_INS_PEDIR_CANT_PED = _COM_ADM_INS_PEDIR_CANT_PED;
        COM_ADM_INS_PEDIR_USU_ID = _COM_ADM_INS_PEDIR_USU_ID;
        PED_COM_DET_INS_DESC = _PED_COM_DET_INS_DESC;
        PED_COM_DET_INS_ID = _PED_COM_DET_INS_ID;
        PRECIO_COMPRA_ACTUAL = _PRECIO_COMPRA_ACTUAL;
        TOTAL = PRECIO_COMPRA_ACTUAL * COM_ADM_INS_PEDIR_CANT_PED;
    }


    public COM_ORDEN_DET(long _COM_ADM_INS_PEDIR_ID, long _COM_ADM_INS_PEDIR_ORD_CAB_ID, long _COM_ADM_INS_PEDIR_PED_ID, long _COM_ADM_INS_PEDIR_PRV_ID,
    int _COM_ADM_INS_PEDIR_CANT_PED, long _COM_ADM_INS_PEDIR_USU_ID, string _PED_COM_DET_INS_DESC, long _PED_COM_DET_INS_ID,
    decimal _PRECIO_COMPRA_ACTUAL, string _TIPO_ORDEN_COMPRA)
    {
        COM_ADM_INS_PEDIR_ID = _COM_ADM_INS_PEDIR_ID;
        COM_ADM_INS_PEDIR_ORD_CAB_ID = _COM_ADM_INS_PEDIR_ORD_CAB_ID;
        COM_ADM_INS_PEDIR_PED_ID = _COM_ADM_INS_PEDIR_PED_ID;
        COM_ADM_INS_PEDIR_PRV_ID = _COM_ADM_INS_PEDIR_PRV_ID;
        COM_ADM_INS_PEDIR_CANT_PED = _COM_ADM_INS_PEDIR_CANT_PED;
        COM_ADM_INS_PEDIR_USU_ID = _COM_ADM_INS_PEDIR_USU_ID;
        PED_COM_DET_INS_DESC = _PED_COM_DET_INS_DESC;
        PED_COM_DET_INS_ID = _PED_COM_DET_INS_ID;
        PRECIO_COMPRA_ACTUAL = _PRECIO_COMPRA_ACTUAL;
        TOTAL = PRECIO_COMPRA_ACTUAL * COM_ADM_INS_PEDIR_CANT_PED;
        TIPO_ORDEN_COMPRA = _TIPO_ORDEN_COMPRA;
    }


    public COM_ORDEN_DET(long _COM_ADM_INS_PEDIR_ID, long _COM_ADM_INS_PEDIR_ORD_CAB_ID, long _COM_ADM_INS_PEDIR_PED_ID, long _COM_ADM_INS_PEDIR_PRV_ID,
int _COM_ADM_INS_PEDIR_CANT_PED, long _COM_ADM_INS_PEDIR_USU_ID, string _PED_COM_DET_INS_DESC, long _PED_COM_DET_INS_ID,
decimal _PRECIO_COMPRA_ACTUAL, string _TIPO_ORDEN_COMPRA, int _REMITO)
    {
        COM_ADM_INS_PEDIR_ID = _COM_ADM_INS_PEDIR_ID;
        COM_ADM_INS_PEDIR_ORD_CAB_ID = _COM_ADM_INS_PEDIR_ORD_CAB_ID;
        COM_ADM_INS_PEDIR_PED_ID = _COM_ADM_INS_PEDIR_PED_ID;
        COM_ADM_INS_PEDIR_PRV_ID = _COM_ADM_INS_PEDIR_PRV_ID;
        COM_ADM_INS_PEDIR_CANT_PED = _COM_ADM_INS_PEDIR_CANT_PED;
        COM_ADM_INS_PEDIR_USU_ID = _COM_ADM_INS_PEDIR_USU_ID;
        PED_COM_DET_INS_DESC = _PED_COM_DET_INS_DESC;
        PED_COM_DET_INS_ID = _PED_COM_DET_INS_ID;
        PRECIO_COMPRA_ACTUAL = _PRECIO_COMPRA_ACTUAL;
        TOTAL = PRECIO_COMPRA_ACTUAL * COM_ADM_INS_PEDIR_CANT_PED;
        TIPO_ORDEN_COMPRA = _TIPO_ORDEN_COMPRA;
        REMITO = _REMITO;
    }

    public COM_ORDEN_DET(long _COM_ADM_INS_PEDIR_ID, long _COM_ADM_INS_PEDIR_ORD_CAB_ID, long _COM_ADM_INS_PEDIR_PED_ID, long _COM_ADM_INS_PEDIR_PRV_ID,
int _COM_ADM_INS_PEDIR_CANT_PED, long _COM_ADM_INS_PEDIR_USU_ID, string _PED_COM_DET_INS_DESC, long _PED_COM_DET_INS_ID,
decimal _PRECIO_COMPRA_ACTUAL, string _TIPO_ORDEN_COMPRA, int _REMITO, int _CANTIDAD_TOTAL_RECIBIDA)
    {
        COM_ADM_INS_PEDIR_ID = _COM_ADM_INS_PEDIR_ID;
        COM_ADM_INS_PEDIR_ORD_CAB_ID = _COM_ADM_INS_PEDIR_ORD_CAB_ID;
        COM_ADM_INS_PEDIR_PED_ID = _COM_ADM_INS_PEDIR_PED_ID;
        COM_ADM_INS_PEDIR_PRV_ID = _COM_ADM_INS_PEDIR_PRV_ID;
        COM_ADM_INS_PEDIR_CANT_PED = _COM_ADM_INS_PEDIR_CANT_PED;
        COM_ADM_INS_PEDIR_USU_ID = _COM_ADM_INS_PEDIR_USU_ID;
        PED_COM_DET_INS_DESC = _PED_COM_DET_INS_DESC;
        PED_COM_DET_INS_ID = _PED_COM_DET_INS_ID;
        PRECIO_COMPRA_ACTUAL = _PRECIO_COMPRA_ACTUAL;
        TOTAL = PRECIO_COMPRA_ACTUAL * COM_ADM_INS_PEDIR_CANT_PED;
        TIPO_ORDEN_COMPRA = _TIPO_ORDEN_COMPRA;
        REMITO = _REMITO;
        CANTIDAD_TOTAL_RECIBIDA = _CANTIDAD_TOTAL_RECIBIDA;
    }

    public long COM_ADM_INS_PEDIR_ID { get; set; }
    public long COM_ADM_INS_PEDIR_ORD_CAB_ID { get; set; }
    public long COM_ADM_INS_PEDIR_PED_ID { get; set; }
    public long COM_ADM_INS_PEDIR_PRV_ID { get; set; }
    public int COM_ADM_INS_PEDIR_CANT_PED { get; set; }
    public long COM_ADM_INS_PEDIR_USU_ID { get; set; }
    public string PED_COM_DET_INS_DESC { get; set; }
    public long PED_COM_DET_INS_ID { get; set; }
    public decimal PRECIO_COMPRA_ACTUAL { get; set; }
    public decimal TOTAL { get; set; }
    public string TIPO_ORDEN_COMPRA { get; set; }
    public int REMITO { get; set; }
    public int CANTIDAD_TOTAL_RECIBIDA { get; set; }

}

public class COM_ADM_ENT_CAB
{
    public long COM_ADM_ENT_CAB_ID { get; set; }
    public long COM_ADM_ENT_CAB_PED_ID { get; set; }
    public string COM_ADM_ENT_CAB_PED_FEC { get; set; }
    public long COM_ADM_ENT_CAB_USU_ID { get; set; }
    public bool COM_ADM_ENT_CAB_BAJA { get; set; }
    public string COM_ADM_ENT_CAB_BAJA_FEC { get; set; }
    public long COM_ADM_ENT_CAB_BAJA_USU_ID { get; set; }

    public COM_ADM_ENT_CAB() { }

    public COM_ADM_ENT_CAB(long _COM_ADM_ENT_CAB_ID, long _COM_ADM_ENT_CAB_PED_ID, string _COM_ADM_ENT_CAB_PED_FEC, long _COM_ADM_ENT_CAB_USU_ID, bool _COM_ADM_ENT_CAB_BAJA = false,
        string _COM_ADM_ENT_CAB_BAJA_FEC = "01/01/1900", long _COM_ADM_ENT_CAB_BAJA_USU_ID = 0)
    {
        COM_ADM_ENT_CAB_ID = _COM_ADM_ENT_CAB_ID;
        COM_ADM_ENT_CAB_PED_ID = _COM_ADM_ENT_CAB_PED_ID;
        COM_ADM_ENT_CAB_PED_FEC = _COM_ADM_ENT_CAB_PED_FEC;
        COM_ADM_ENT_CAB_USU_ID = _COM_ADM_ENT_CAB_USU_ID;
        COM_ADM_ENT_CAB_BAJA = _COM_ADM_ENT_CAB_BAJA;
        COM_ADM_ENT_CAB_BAJA_FEC = _COM_ADM_ENT_CAB_BAJA_FEC;
        COM_ADM_ENT_CAB_BAJA_USU_ID = _COM_ADM_ENT_CAB_BAJA_USU_ID;
    }
}

public class COM_ADM_ENT_DET
{
    public long COM_ADM_ENT_DET_ID {get;set;}
	public long COM_ADM_ENT_DET_CAB_ID {get;set;}
	public long COM_ADM_ENT_PED_COM_DET_ID {get;set;}
    public int COM_ADM_ENT_CANT_ENT { get; set; }
    public string COM_ADM_ENT_FEC { get; set; }
    public string COM_ADM_ENT_USU { get; set; }
    public string COM_ADM_ENT_INS { get; set; }

    public COM_ADM_ENT_DET () {}

    public COM_ADM_ENT_DET(long _COM_ADM_ENT_DET_ID, long _COM_ADM_ENT_DET_CAB_ID, long _COM_ADM_ENT_PED_COM_DET_ID, int _COM_ADM_ENT_CANT_ENT,
        string _COM_ADM_ENT_FEC = "", string _COM_ADM_ENT_USU = "", string _COM_ADM_ENT_INS = "") 
    {
        COM_ADM_ENT_DET_ID = _COM_ADM_ENT_DET_ID;
        COM_ADM_ENT_DET_CAB_ID = _COM_ADM_ENT_DET_CAB_ID;
        COM_ADM_ENT_PED_COM_DET_ID = _COM_ADM_ENT_PED_COM_DET_ID;
        COM_ADM_ENT_CANT_ENT = _COM_ADM_ENT_CANT_ENT;
        COM_ADM_ENT_FEC = _COM_ADM_ENT_FEC;
        COM_ADM_ENT_USU = _COM_ADM_ENT_USU;
        COM_ADM_ENT_INS = _COM_ADM_ENT_INS;
    }
}

public class COM_FAR_INSUMOS_SERV
{ 
    public int COM_ISE_ID {get;set;}
	public int COM_ISE_SERV_ID {get;set;}
	public int COM_ISE_INS_ID {get;set;}
	public int COM_ISE_CANT {get;set;}
	public string COM_ISE_FECHA {get;set;}
    public long COM_ISE_USU_ID { get; set; }
    public string COM_ISE_INS_DESC { get; set; }

    public COM_FAR_INSUMOS_SERV() { }

    public COM_FAR_INSUMOS_SERV(int _COM_ISE_ID, int _COM_ISE_SERV_ID, int _COM_ISE_INS_ID, int _COM_ISE_CANT,
       string _COM_ISE_INS_DESC = "", string _COM_ISE_FECHA = "", long _COM_ISE_USU_ID = 0) 
    {
        COM_ISE_ID = _COM_ISE_ID;
        COM_ISE_SERV_ID = _COM_ISE_SERV_ID;
        COM_ISE_INS_ID = _COM_ISE_INS_ID;
        COM_ISE_CANT = _COM_ISE_CANT;
        COM_ISE_FECHA = _COM_ISE_FECHA;
        COM_ISE_USU_ID = _COM_ISE_USU_ID;
        COM_ISE_INS_DESC = _COM_ISE_INS_DESC;
    }
}

public class COM_ADM_REPORTE_FINAL
{
    public COM_ADM_REPORTE_FINAL()
    {
 
    }

    public COM_ADM_REPORTE_FINAL(string _FechaPedido, string _Insumo, int _CantidadPedida, string _Proveedor,
        int _CantidadRecibida, decimal _PrecioUnitario, decimal _PrecioTotal, string _FechaFactura)
    {
        FechaPedido = _FechaPedido;
        Insumo = _Insumo;
        CantidadPedida = _CantidadPedida;
        Proveedor = _Proveedor;
        CantidadRecibida = _CantidadRecibida;
        PrecioUnitario = _PrecioUnitario;
        PrecioTotal = _PrecioTotal;
        FechaFactura = _FechaFactura;
    }

    public COM_ADM_REPORTE_FINAL(string _FechaPedido, string _Insumo, int _CantidadPedida, string _Proveedor,
    int _CantidadRecibida, decimal _PrecioUnitario, decimal _PrecioTotal, string _FechaFactura,string _ordenComra)
    {
        FechaPedido = _FechaPedido;
        Insumo = _Insumo;
        CantidadPedida = _CantidadPedida;
        Proveedor = _Proveedor;
        CantidadRecibida = _CantidadRecibida;
        PrecioUnitario = _PrecioUnitario;
        PrecioTotal = _PrecioTotal;
        FechaFactura = _FechaFactura;
        ordenCompra = _ordenComra;
    }

    public string FechaPedido {get;set;}
    public string Insumo {get;set;}
    public int CantidadPedida {get;set;}
    public string Proveedor {get;set;}
    public int CantidadRecibida {get;set;}
    public decimal PrecioUnitario { get; set; }
    public decimal PrecioTotal {get;set;}
    public string FechaFactura { get; set; }
    public string ordenCompra { get; set; }
}