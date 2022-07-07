using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de compras
/// </summary>
public class compras
{
	public compras()
	{
		//
		// TODO: Agregar aquí la lógica del constructor
		//
	}
}

public class com_ins_gastos_ext
{
    public long COM_INS_GASTOS_EXT_ID { get; set; }
    public string COM_INS_GATOS_EXT_DESC { get; set; }
    public bool COM_INS_GATOS_EXT_BAJA { get; set; }
}

public class com_gastos_ext_cab
{
    public long COM_GASTOS_EXT_CAB_ID { get; set; }
    public long COM_GASTOS_EXT_CAB_PACIENTE_ID { get; set; }
    public string COM_GASTOS_EXT_CAB_FECHA_SOL { get; set; }
    public string COM_GASTOS_EXT_CAB_FECHA_AUT { get; set; }
    public string COM_GASTOS_EXT_CAB_FECHA_CIR { get; set; }
    public long COM_GASTOS_EXT_CAB_MED_SOL { get; set; }
    public long COM_GASTOS_EXT_CAB_SERV_ID { get; set; }
    public long COM_GASTOS_EXT_CAB_USU_ID { get; set; }
    public string COM_GASTOS_OBSERVACIONES { get; set; }
}

public class com_gastos_ext_det
{
    public long COM_GASTOS_EXT_DET_CAB_ID { get; set; }
    public long COM_GASTOS_EXT_DET_INS_ID { get; set; }
    public int COM_GASTOS_EXT_DET_PRV_ID { get; set; }
    public int COM_GASTOS_EXT_DET_CANTIDAD { get; set; }
    public decimal COM_GASTOS_EXT_DET_PRECIO_PRESU { get; set; }
    public decimal COM_GASTOS_EXT_DET_PRECIO_FACT { get; set; }
    public bool COM_GASTOS_EXT_DET_USADO { get; set; }
    public string COM_INS_GASTOS_EXT_DESC { get; set; }
    public string COM_GASTOS_EXT_DET_PRV_NOMBRE { get; set; }
    public string COM_GASTOS_EXT_DET_NRO_FACTURA { get; set; }
    public string COM_GASTOS_EXT_DET_FECHA_FACT { get; set; }
}


public class com_gastos_ext_cab_list
{
    public long COM_GASTOS_EXT_CAB_ID { get; set; }
    public string COM_GASTOS_EXT_CAB_FECHA_SOL { get; set; }
    public string COM_GASTOS_EXT_CAB_FECHA_AUT { get; set; }
    public string COM_GASTOS_EXT_CAB_FECHA_CIR { get; set; }
    public string Paciente { get; set; }
    public string Servicio { get; set; }
    public string Usuario { get; set; }
    public string NHC { get; set; }
}

public class com_gastos_ext_listar
{
    public long COM_GASTOS_EXT_CAB_ID { get; set; }
    public string COM_GASTOS_EXT_CAB_FECHA_SOL { get; set; }
    public string COM_GASTOS_EXT_CAB_FECHA_AUT { get; set; }
    public string COM_GASTOS_EXT_CAB_FECHA_CIR { get; set; }
    public string COM_GASTOS_EXT_DET_FECHA_FACT { get; set; }
    public string Paciente { get; set; }
    public string Servicio { get; set; }
    public string Usuario { get; set; }
    public string NHC { get; set; }
    public string Seccional { get; set; }
    public int COM_GASTOS_EXT_DET_CANTIDAD { get; set; }
    public decimal COM_GASTOS_EXT_DET_PRECIO_PRESU { get; set; }
    public decimal COM_GASTOS_EXT_DET_PRECIO_FACT { get; set; }
    public string COM_INS_GASTOS_EXT_DESC { get; set; }
    public string COM_GASTOS_OBSERVACIONES { get; set; }
}

public class Compras_Adjuntos
{
    public Compras_Adjuntos() { }

    public long IdDetalle { get; set; }
    public long ExpId { get; set; }
    public string RutaArchivo { get; set; }
    public bool Estado { get; set; }
    public string FechaSistema { get; set; }
    public long ExpPedId { get; set; }
    public long ExpPreDetId { get; set; }
    public long RemId { get; set; }
    public string rutaArchivoConfig { get; set; }
    /////reclamos
    public long IdReclamo { get; set; }
    public string nombreArchivo { get; set; }
}

public class Pacientes_Adjuntos
{
    public Pacientes_Adjuntos() { }


    public long afiliadoId { get; set; }
    public string nombreArchivo { get; set; }
    public string rutaArchivo { get; set; }
    public int tipo { get; set; }
}


public class Compras_Reporte_Gastos
{
    public Compras_Reporte_Gastos() { }

    public string FechaPedido { get; set; }
    public string InsumoDescripción { get; set; }
    public string Proveedor { get; set; }
    public int CantidadRecibida { get; set; }
    public decimal PrecioUnitario { get; set; }
    public decimal PrecioTotal { get; set; }
    public string FechaRemitoFactura { get; set; }
}

public class Compras_Det_Presupuesto
{
    public Compras_Det_Presupuesto() { }

    public string tipo { get; set; }
    public int cantidad { get; set; }
    public decimal importe { get; set; }
    public int proveedor { get; set; }
}

public class compras_insumos_combo
{
    public int INS_ID { get; set; }
    public string INS_DESCRIPCION { get; set; }
    public int INS_RUBRO { get; set; }
    public int INS_ALTO_COSTO { get; set; }

    public compras_insumos_combo(int _INS_ID, string _INS_DESCRIPCION, int _INS_RUBRO = 0)
    {
        INS_ID = _INS_ID;
        INS_DESCRIPCION = _INS_DESCRIPCION;
        INS_RUBRO = _INS_RUBRO; 
    }

    public compras_insumos_combo(int _INS_ID, string _INS_DESCRIPCION, int _INS_RUBRO = 0,int _INS_ALTO_COSTO = 0)
    {
        INS_ID = _INS_ID;
        INS_DESCRIPCION = _INS_DESCRIPCION;
        INS_RUBRO = _INS_RUBRO;
        INS_ALTO_COSTO = _INS_ALTO_COSTO;
    }
}

public class compras_insumo_info
{
    public decimal INS_ULT_PRECIO { get; set; }
    public int STO_CANTIDAD { get; set; }
    public int INS_RUBRO { get; set; }

    public compras_insumo_info(decimal _INS_ULT_PRECIO, int _STO_CANTIDAD, int _INS_RUBRO)
    {
        INS_ULT_PRECIO = _INS_ULT_PRECIO;
        STO_CANTIDAD = _STO_CANTIDAD;
        INS_RUBRO = _INS_RUBRO;
    }
}


public class compras_deposito
{
    public int ID { get; set; }
    public string DEPOSITO { get; set; }
    public bool ESTADO { get; set; }

    public compras_deposito(int _ID, string _DEPOSITO, bool _ESTADO)
    {
        ID = _ID;
        DEPOSITO = _DEPOSITO;
        ESTADO = _ESTADO;
    }
}

public class compras_remito_buscar
{
    public int REM_I_ID { get; set; }
    public string REM_I_LETRA { get; set; }
    public int REM_I_SUCURSAL { get; set; }
    public int REM_I_NUMERO { get; set; }
    public int REM_I_PRV_ID { get; set; }
    public string REM_I_FECHA { get; set; }
    public string REM_I_OBS { get; set; }
    public string RAZON_SOCIAL { get; set; }
    public string REM_I_LETRA_FACT { get; set; }
    public int REM_I_SUCURSAL_FACT { get; set; }
    public int REM_I_NUMERO_FACT { get; set; }
    public int Ncompra { get; set; }
    public string REM_TIPO { get; set; }
    public decimal total { get; set; }
    public decimal totalADM { get; set; }

    public compras_remito_buscar() { }

    public compras_remito_buscar(int _REM_I_ID, string _REM_I_LETRA, int _REM_I_SUCURSAL, int _REM_I_NUMERO, int _REM_I_PRV_ID, string _REM_I_FECHA, string _REM_I_OBS,
        string _RAZON_SOCIAL, string _REM_I_LETRA_FACT, int _REM_I_SUCURSAL_FACT, int _REM_I_NUMERO_FACT, int _Ncompra = 0, string _REM_TIPO = "",decimal _total = 0, decimal _totalADM = 0)
    {
        REM_I_ID = _REM_I_ID;
        REM_I_LETRA = _REM_I_LETRA;
        REM_I_SUCURSAL = _REM_I_SUCURSAL;
        REM_I_NUMERO = _REM_I_NUMERO;
        REM_I_PRV_ID = _REM_I_PRV_ID;
        REM_I_FECHA = _REM_I_FECHA;
        REM_I_OBS = _REM_I_OBS;
        RAZON_SOCIAL = _RAZON_SOCIAL;
        REM_I_LETRA_FACT = _REM_I_LETRA_FACT;
        REM_I_SUCURSAL_FACT = _REM_I_SUCURSAL_FACT;
        REM_I_NUMERO_FACT = _REM_I_NUMERO_FACT;
        Ncompra = _Ncompra;
        REM_TIPO = _REM_TIPO;
        total = _total;
        totalADM = _totalADM;
    }
}

public class compras_remito_cabecera
{ 
    public int REM_I_ID {get;set;}
    public string REM_I_LETRA {get;set;}
    public int REM_I_SUCURSAL {get;set;}
    public int REM_I_NUMERO {get;set;}
    public int REM_I_PRV_ID {get;set;}
    public string REM_I_FECHA {get;set;}
    public long REM_I_USUARIO {get;set;}
    public string REM_I_OBS {get;set;}
    public long REM_USUARIO_MOD { get; set; }
    public string REM_I_LETRA_FACT { get; set; }
    public int REM_I_SUCURSAL_FACT { get; set; }
    public int REM_I_NUMERO_FACT { get; set; }
    public int REM_I_NUMERO_ORDEN_COMPRA { get; set; }
    public string REM_TIPO { get; set; }

    public compras_remito_cabecera () { }

    public compras_remito_cabecera(int _REM_I_ID, string _REM_I_LETRA, int _REM_I_SUCURSAL, int _REM_I_NUMERO, int _REM_I_PRV_ID, string _REM_I_FECHA,
        long _REM_I_USUARIO, string _REM_I_OBS, long _REM_USUARIO_MOD, string _REM_I_LETRA_FACT, int _REM_I_SUCURSAL_FACT, int _REM_I_NUMERO_FACT) 
    {
        REM_I_ID = _REM_I_ID;
        REM_I_LETRA = _REM_I_LETRA;
        REM_I_SUCURSAL = _REM_I_SUCURSAL;
        REM_I_NUMERO = _REM_I_NUMERO;
        REM_I_PRV_ID = _REM_I_PRV_ID;
        REM_I_FECHA = _REM_I_FECHA;
        REM_I_USUARIO = _REM_I_USUARIO;
        REM_I_OBS = _REM_I_OBS;
        REM_USUARIO_MOD = _REM_USUARIO_MOD;
        REM_I_LETRA_FACT = _REM_I_LETRA_FACT;
        REM_I_SUCURSAL_FACT = _REM_I_SUCURSAL_FACT;
        REM_I_NUMERO_FACT = _REM_I_NUMERO_FACT;
    }
}

public class compras_remito
{
    public int RED_ID { get; set; }
    public decimal RED_PRECIO { get; set; }

}

public class compras_remito_detalle
{ 
    
    public int RED_ID {get;set;}
    public int RED_REM_ID {get;set;}
    public int RED_INS_ID {get;set;}
    public int RED_CANTIDAD {get;set;}
    public decimal RED_PRECIO {get;set;}
    public int RED_DEP_ID {get;set;}
    public string NRO_LOTE { get; set; }
    public string INSUMO { get; set; }
    public string FechaVencimiento { get; set; }
    public int RED_INS_RUBRO { get; set; }
    public int InsumoInternacion { get; set; }
    public decimal RED_PRECIOADM { get; set; }
    public int RED_ID_REAL { get; set; }

    public compras_remito_detalle() { }

    public compras_remito_detalle(int _RED_REM_ID, int _RED_INS_ID, int _RED_CANTIDAD, decimal _RED_PRECIO, int _RED_DEP_ID, string _NRO_LOTE,
        string _INSUMO, string _FechaVencimiento, int _RED_INS_RUBRO, int _InsumoInternacion, decimal _RED_PRECIOADM, int _RED_ID)
    {
        RED_REM_ID = _RED_REM_ID;
        RED_INS_ID = _RED_INS_ID;
        RED_CANTIDAD = _RED_CANTIDAD;
        RED_PRECIO = _RED_PRECIO;
        RED_DEP_ID = _RED_DEP_ID;
        NRO_LOTE = _NRO_LOTE;
        INSUMO = _INSUMO;
        FechaVencimiento = _FechaVencimiento;
        RED_INS_RUBRO = _RED_INS_RUBRO;
        InsumoInternacion = _InsumoInternacion;
        RED_PRECIOADM = _RED_PRECIOADM;
        RED_ID = _RED_ID;
    }

    public compras_remito_detalle(int _RED_REM_ID, int _RED_INS_ID, int _RED_CANTIDAD, decimal _RED_PRECIO, int _RED_DEP_ID, string _NRO_LOTE,
    string _INSUMO, string _FechaVencimiento, int _RED_INS_RUBRO, int _InsumoInternacion, decimal _RED_PRECIOADM, int _RED_ID, int _RED_ID_REAL)
    {
        RED_REM_ID = _RED_REM_ID;
        RED_INS_ID = _RED_INS_ID;
        RED_CANTIDAD = _RED_CANTIDAD;
        RED_PRECIO = _RED_PRECIO;
        RED_DEP_ID = _RED_DEP_ID;
        NRO_LOTE = _NRO_LOTE;
        INSUMO = _INSUMO;
        FechaVencimiento = _FechaVencimiento;
        RED_INS_RUBRO = _RED_INS_RUBRO;
        InsumoInternacion = _InsumoInternacion;
        RED_PRECIOADM = _RED_PRECIOADM;
        RED_ID = _RED_ID;
        RED_ID_REAL = _RED_ID_REAL;
    }

    public compras_remito_detalle(int _RED_REM_ID, int _RED_INS_ID, int _RED_CANTIDAD, decimal _RED_PRECIO, int _RED_DEP_ID, string _NRO_LOTE,
    string _INSUMO, string _FechaVencimiento, int _RED_INS_RUBRO)
    {
        RED_REM_ID = _RED_REM_ID;
        RED_INS_ID = _RED_INS_ID;
        RED_CANTIDAD = _RED_CANTIDAD;
        RED_PRECIO = _RED_PRECIO;
        RED_DEP_ID = _RED_DEP_ID;
        NRO_LOTE = _NRO_LOTE;
        INSUMO = _INSUMO;
        FechaVencimiento = _FechaVencimiento;
        RED_INS_RUBRO = _RED_INS_RUBRO;
    }
}


public class compras_remito_detalle_internacion
{
    public int RED_ID { get; set; }
    public int RED_REM_ID { get; set; }
    public int RED_INS_ID { get; set; }
    public int RED_CANTIDAD_PEDIDA { get; set; }
    public int RED_CANTIDAD_RECIBIDA { get; set; }
    public int RED_CANTIDAD_SALDO { get; set; }
    public decimal RED_PRECIO { get; set; }
    public int RED_DEP_ID { get; set; }
    public string NRO_LOTE { get; set; }
    public string RED_INSUMO_DESCRIPCION { get; set; }
    public string FechaVencimiento { get; set; }
    public int RED_INS_RUBRO { get; set; }
    public long PDT_ID { get; set; }
    public int Tipo { get; set; }
    public int RED_CANTIDAD_SALDO_TOTAL { get; set; }
    public long EXP_PED_ID { get; set; }
    public long EXP_PED_EXP_ID { get; set; }

    public compras_remito_detalle_internacion() { }

    public compras_remito_detalle_internacion(int _RED_REM_ID, int _RED_INS_ID, int _RED_CANTIDAD, decimal _RED_PRECIO, int _RED_DEP_ID, string _NRO_LOTE,
        string _INSUMO, string _FechaVencimiento, int _RED_INS_RUBRO)
    {
        RED_REM_ID = _RED_REM_ID;
        RED_INS_ID = _RED_INS_ID;
        RED_CANTIDAD_PEDIDA = _RED_CANTIDAD;
        RED_PRECIO = _RED_PRECIO;
        RED_DEP_ID = _RED_DEP_ID;
        NRO_LOTE = _NRO_LOTE;
        RED_INSUMO_DESCRIPCION = _INSUMO;
        FechaVencimiento = _FechaVencimiento;
        RED_INS_RUBRO = _RED_INS_RUBRO;
    }
}



public class compras_remito_detalle_administracion
{
    public long COM_REMITO_ID { get; set; }
    public long COM_ADM_INS_PEDIR_ID { get; set; }
    public long COM_ADM_INS_PEDIR_ORD_CAB_ID { get; set; }
    public long  COM_ADM_INS_PEDIR_PED_ID { get; set; }
    public int  COM_ADM_INS_PEDIR_PRV_ID { get; set; }
    public int  COM_ADM_INS_PEDIR_CANT_PED { get; set; }
    public long  COM_ADM_INS_PEDIR_USU_ID { get; set; }
    public long  COM_ADM_INS_PEDIR_INS_ID { get; set; }
    public string  COM_ADM_INS_PEDIR_INS_NOM { get; set; }
    public bool enviado { get; set; }
    public int COM_ADM_CANTIDAD_RECIBIDA { get; set; }
    public decimal COM_ADM_CANTIDAD_SALDO { get; set; }
    public decimal COM_ADM_INS_PRECIO { get; set; }
    public int COM_ADM_INS_PEDIR_CANTIDAD_RECIBIDA { get; set; }
    public int COM_ADM_INS_PEDIR_CANTIDAD_SALDO { get; set; }
    public int Tipo { get; set; }
    public decimal COM_ADM_INS_PEDIR_PRECIO_COMPRA_ACTUAL { get; set; }
    public string PDT_LOTE { get; set; }
    public string PDT_FECHA_VENCIMIENTO { get; set; }



    public compras_remito_detalle_administracion() { }

    public compras_remito_detalle_administracion(long _COM_REMITO_ID, long _COM_ADM_INS_PEDIR_ID, long _COM_ADM_INS_PEDIR_ORD_CAB_ID, long _COM_ADM_INS_PEDIR_PED_ID, int _COM_ADM_INS_PEDIR_PRV_ID, int _COM_ADM_INS_PEDIR_CANT_PED,
        long _COM_ADM_INS_PEDIR_USU_ID, long _COM_ADM_INS_PEDIR_INS_ID, string _COM_ADM_INS_PEDIR_INS_NOM, bool _enviado)
    {
        COM_REMITO_ID = _COM_REMITO_ID;
        COM_ADM_INS_PEDIR_ID = _COM_ADM_INS_PEDIR_ID;
        COM_ADM_INS_PEDIR_ORD_CAB_ID = _COM_ADM_INS_PEDIR_ORD_CAB_ID;
        COM_ADM_INS_PEDIR_PED_ID = _COM_ADM_INS_PEDIR_PED_ID;
        COM_ADM_INS_PEDIR_PRV_ID = _COM_ADM_INS_PEDIR_PRV_ID;
        COM_ADM_INS_PEDIR_CANT_PED = _COM_ADM_INS_PEDIR_CANT_PED;
        COM_ADM_INS_PEDIR_USU_ID = _COM_ADM_INS_PEDIR_USU_ID;
        COM_ADM_INS_PEDIR_INS_ID = _COM_ADM_INS_PEDIR_INS_ID;
        COM_ADM_INS_PEDIR_INS_NOM = _COM_ADM_INS_PEDIR_INS_NOM;
        enviado = _enviado;
    }
}

public class compras_remito_cabecera_list
{
    public long REM_I_ID { get; set; }
    public string REM_I_LETRA { get; set; }
    public int REM_I_SUCURSAL { get; set; }
    public int REM_I_NUMERO { get; set; }
    public int REM_I_PRV_ID { get; set; }
    public string REM_I_FECHA { get; set; }
    public long REM_I_USUARIO { get; set; }
    public string REM_I_OBS { get; set; }
    public string PROVEEDOR { get; set; }
    public string USUARIO { get; set; }
    public string REM_I_LETRA_FACT { get; set; }
    public int REM_I_SUCURSAL_FACT { get; set; }
    public int REM_I_NUMERO_FACT { get; set; }
    public int REM_I_NUMERO_ORDEN_COMPRA { get; set; }
    public string REM_I_TIPO { get; set; }
    public long? EXP_ID { get; set; }
    public long? EXP_PED_ID { get; set; }

    public compras_remito_cabecera_list() { }

    public compras_remito_cabecera_list(long _REM_I_ID, string _REM_I_LETRA, int _REM_I_SUCURSAL, int _REM_I_NUMERO, int _REM_I_PRV_ID, string _REM_I_FECHA,
    long _REM_I_USUARIO, string _REM_I_OBS, string _PROVEEDOR, string _USUARIO, string _REM_I_LETRA_FACT, int _REM_I_SUCURSAL_FACT, int _REM_I_NUMERO_FACT, int _REM_I_NUMERO_ORDEN_COMPRA = 0, string _REM_I_TIPO = "")
    {
        REM_I_ID = _REM_I_ID;
        REM_I_LETRA = _REM_I_LETRA;
        REM_I_SUCURSAL = _REM_I_SUCURSAL;
        REM_I_NUMERO = _REM_I_NUMERO;
        REM_I_PRV_ID = _REM_I_PRV_ID;
        REM_I_FECHA = _REM_I_FECHA;
        REM_I_USUARIO = _REM_I_USUARIO;
        REM_I_OBS = _REM_I_OBS;
        PROVEEDOR = _PROVEEDOR;
        USUARIO = _USUARIO;
        REM_I_LETRA_FACT = _REM_I_LETRA_FACT;
        REM_I_SUCURSAL_FACT = _REM_I_SUCURSAL_FACT;
        REM_I_NUMERO_FACT = _REM_I_NUMERO_FACT;
        REM_I_NUMERO_ORDEN_COMPRA = _REM_I_NUMERO_ORDEN_COMPRA;
        REM_I_TIPO = _REM_I_TIPO;

    }

    public compras_remito_cabecera_list(long? _EXP_ID,long? _EXP_PED_ID, long _REM_I_ID, string _REM_I_LETRA, int _REM_I_SUCURSAL, int _REM_I_NUMERO, int _REM_I_PRV_ID, string _REM_I_FECHA,
        long _REM_I_USUARIO, string _REM_I_OBS, string _PROVEEDOR, string _USUARIO, string _REM_I_LETRA_FACT, int _REM_I_SUCURSAL_FACT, int _REM_I_NUMERO_FACT, int _REM_I_NUMERO_ORDEN_COMPRA = 0, string _REM_I_TIPO = "")
    {
        REM_I_ID = _REM_I_ID;
        REM_I_LETRA = _REM_I_LETRA;
        REM_I_SUCURSAL = _REM_I_SUCURSAL;
        REM_I_NUMERO = _REM_I_NUMERO;
        REM_I_PRV_ID = _REM_I_PRV_ID;
        REM_I_FECHA = _REM_I_FECHA;
        REM_I_USUARIO = _REM_I_USUARIO;
        REM_I_OBS = _REM_I_OBS;
        PROVEEDOR = _PROVEEDOR;
        USUARIO = _USUARIO;
        REM_I_LETRA_FACT = _REM_I_LETRA_FACT;
        REM_I_SUCURSAL_FACT = _REM_I_SUCURSAL_FACT;
        REM_I_NUMERO_FACT = _REM_I_NUMERO_FACT;
        REM_I_NUMERO_ORDEN_COMPRA = _REM_I_NUMERO_ORDEN_COMPRA;
        REM_I_TIPO = _REM_I_TIPO;
        EXP_ID = _EXP_ID;
        EXP_PED_ID = _EXP_PED_ID;

    }
}


public class compras_expediente_estado
{
    public int Expediente_Estado_Id  { get; set; }
    public string Expediente_Estado_Desc  { get; set; }
    public bool Expediente_Estado_Baja { get; set; }

    public compras_expediente_estado() { }

    public compras_expediente_estado(int _Expediente_Estado_Id, string _Expediente_Estado_Desc, bool _Expediente_Estado_Baja) 
    {
        Expediente_Estado_Id = _Expediente_Estado_Id;
        Expediente_Estado_Desc = _Expediente_Estado_Desc;
        Expediente_Estado_Baja = _Expediente_Estado_Baja;
    }
}

public class compras_expediente_diagnostico
{ 
    public int Diagnostico_Id { get; set; }
	public string Diagnostico_Desc { get; set; }
    public bool Diagnostico_Baja { get; set; }

    public compras_expediente_diagnostico() { }

    public compras_expediente_diagnostico(int _Diagnostico_Id, string _Diagnostico_Desc, bool _Diagnostico_Baja) 
    {
        Diagnostico_Id = _Diagnostico_Id;
        Diagnostico_Desc = _Diagnostico_Desc;
        Diagnostico_Baja = _Diagnostico_Baja;
    }
}

public class expediente_cab
{ 
    public long EXP_ID { get; set; }
    public string EXP_TIPO_DOC { get; set; }
    public long EXP_NRO_DOC { get; set; }
    public string EXP_NOMBRE { get; set; }
    public string EXP_DIRECCION { get; set; }
    public string EXP_COD_POST { get; set; }
    public string EXP_NHC { get; set; }
    public int EXP_SEC_ID { get; set; }
    public string EXP_OBS { get; set; }
    public int EXP_GRU_ID { get; set; }
    public string EXP_TRAB_EMPR { get; set; }
    public long EXP_TRAB_CUIT { get; set; }
    public string EXP_TRAB_DIR { get; set; }
    public decimal EXP_SUELDO { get; set; }
    public int EXP_DIS_ID { get; set; }
    public bool EXP_DOC_DISCA { get; set; }
    public bool EXP_DOC_SUEL { get; set; }
    public bool EXP_DOC_DNI { get; set; }
    public bool EXP_DOC_CERT { get; set; }
    public bool EXP_SUEL_QUIN { get; set; }
    public string EXP_TELEFONO { get; set; }
    public int EXP_EST_ID { get; set; }
    public string EXP_FECHA { get; set; }
    public long EXP_USUARIO { get; set; }
    public string EXP_FEC_NAC { get; set; }
    public string EXP_VENC_FECHA { get; set; }
    public int EXP_TSO_ID { get; set; }
    public bool EXP_CRONICO { get; set; }
    public string EXP_FECHA_SIST { get; set; }

    public string Calle { get; set; }
    public string Numero { get; set; }
    public string Piso { get; set; }
    public string Depto { get; set; }
    public string CP { get; set; }
    public string Localidad { get; set; }
    public int Provincia { get; set; }
    public string Celular { get; set; }
    public string Telefono { get; set; }
    public string Edad_Format { get; set; }
    public long EXP_AFILIADO_ID { get; set; }

    public expediente_cab() { }

    public expediente_cab(long _EXP_ID, string _EXP_TIPO_DOC, long _EXP_NRO_DOC, string _EXP_NOMBRE, string _EXP_DIRECCION, string _EXP_COD_POST,
        string _EXP_NHC, int _EXP_SEC_ID, string _EXP_OBS, int _EXP_GRU_ID, string _EXP_TRAB_EMPR, long _EXP_TRAB_CUIT, string _EXP_TRAB_DIR,
        int _EXP_DIS_ID, bool _EXP_DOC_DISCA, bool _EXP_DOC_SUEL, bool _EXP_DOC_DNI, bool _EXP_DOC_CERT, string _EXP_TELEFONO, int _EXP_EST_ID,
        string _EXP_FECHA, long _EXP_USUARIO, string _EXP_FEC_NAC, string _EXP_VENC_FECHA, string _Calle = "", string _Numero = "", string _Piso = "",
        string _Depto = "", string _CP = "", string _Localidad = "", int _Provincia = 0, string _Celular = "", string _Telefono = "", string _Edad_Format = "", long _EXP_AFILIADO_ID = 0)
    {
        EXP_ID = _EXP_ID;
        EXP_TIPO_DOC = _EXP_TIPO_DOC;
        EXP_NRO_DOC = _EXP_NRO_DOC;
        EXP_NOMBRE = _EXP_NOMBRE;
        EXP_DIRECCION = _EXP_DIRECCION;
        EXP_COD_POST = _EXP_COD_POST;
        EXP_NHC = _EXP_NHC;
        EXP_SEC_ID = _EXP_SEC_ID;
        EXP_OBS = _EXP_OBS;
        EXP_GRU_ID = _EXP_GRU_ID;
        EXP_TRAB_EMPR = _EXP_TRAB_EMPR;
        EXP_TRAB_CUIT = _EXP_TRAB_CUIT;
        EXP_TRAB_DIR = _EXP_TRAB_DIR;
        EXP_DIS_ID = _EXP_DIS_ID;
        EXP_DOC_DISCA = _EXP_DOC_DISCA;
        EXP_DOC_SUEL = _EXP_DOC_SUEL;
        EXP_DOC_DNI = _EXP_DOC_DNI;
        EXP_DOC_CERT = _EXP_DOC_CERT;
        EXP_TELEFONO = _EXP_TELEFONO;
        EXP_EST_ID = _EXP_EST_ID;
        EXP_FECHA = _EXP_FECHA;
        EXP_USUARIO = _EXP_USUARIO;
        if (!string.IsNullOrEmpty(_EXP_FEC_NAC))
            EXP_FEC_NAC = _EXP_FEC_NAC;
        else EXP_FEC_NAC = string.Empty;
        if (!string.IsNullOrEmpty(_EXP_VENC_FECHA))
            EXP_VENC_FECHA = _EXP_VENC_FECHA;
        else EXP_VENC_FECHA = string.Empty;
        Calle = _Calle;
        Numero = _Numero;
        Piso = _Piso;
        Depto = _Depto;
        CP = _CP;
        Localidad = _Localidad;
        Provincia = _Provincia;
        Celular = _Celular;
        Telefono = _Telefono;
        Edad_Format = _Edad_Format;
        EXP_AFILIADO_ID = _EXP_AFILIADO_ID;
    }

}

public class expediente_extras
{
        public long EXP_EXT_EXP_ID { get; set; }
        public string EXP_EXT_PMI_DESDE { get; set; }
        public string EXP_EXT_PMI_HASTA { get; set; }
        public string EXP_EXT_CODEM_DESDE { get; set; }
        public string EXP_EXT_CODEM_HASTA { get; set; }
        public string EXP_EXT_SSS_DESDE { get; set; }
        public string EXP_EXT_SSS_HASTA { get; set; }
        public string EXP_EXT_PM_DESDE { get; set; }
        public string EXP_EXT_PM_HASTA { get; set; }
        public string EXP_EXT_CERT_DESDE { get; set; }
        public string EXP_EXT_CERT_HASTA { get; set; }
        public string EXP_EXT_VENC_PAT { get; set; }
        public string EXP_EXT_TUTOR { get; set; }
        public int EXP_EXT_EST_LEGAL { get; set; }
        public string EXP_EXT_EST_LEGAL_DESCRIPCION { get; set; }

        public expediente_extras() { }

        public expediente_extras(long _EXP_EXT_EXP_ID, string _EXP_EXT_PMI_DESDE, string _EXP_EXT_PMI_HASTA, string _EXP_EXT_CODEM_DESDE, string _EXP_EXT_CODEM_HASTA,
            string _EXP_EXT_SSS_DESDE, string _EXP_EXT_SSS_HASTA, string _EXP_EXT_PM_DESDE, string _EXP_EXT_PM_HASTA, string _EXP_EXT_CERT_DESDE, string _EXP_EXT_CERT_HASTA,
            string _EXP_EXT_VENC_PAT, string _EXP_EXT_TUTOR, int _EXP_EXT_EST_LEGAL)
        {
            EXP_EXT_EXP_ID = _EXP_EXT_EXP_ID;
            EXP_EXT_PMI_DESDE = _EXP_EXT_PMI_DESDE;
            EXP_EXT_PMI_HASTA = _EXP_EXT_PMI_HASTA;
            EXP_EXT_CODEM_DESDE = _EXP_EXT_CODEM_DESDE;
            EXP_EXT_CODEM_HASTA = _EXP_EXT_CODEM_HASTA;
            EXP_EXT_SSS_DESDE = _EXP_EXT_SSS_DESDE;
            EXP_EXT_SSS_HASTA = _EXP_EXT_SSS_HASTA;
            EXP_EXT_PM_DESDE = _EXP_EXT_PM_DESDE;
            EXP_EXT_PM_HASTA = _EXP_EXT_PM_HASTA;
            EXP_EXT_CERT_DESDE = _EXP_EXT_CERT_DESDE;
            EXP_EXT_CERT_HASTA = _EXP_EXT_CERT_HASTA;
            EXP_EXT_VENC_PAT = _EXP_EXT_VENC_PAT;
            EXP_EXT_TUTOR = _EXP_EXT_TUTOR;
            EXP_EXT_EST_LEGAL = _EXP_EXT_EST_LEGAL;
        }

        public expediente_extras(long _EXP_EXT_EXP_ID, string _EXP_EXT_PMI_DESDE, string _EXP_EXT_PMI_HASTA, string _EXP_EXT_CODEM_DESDE, string _EXP_EXT_CODEM_HASTA,
    string _EXP_EXT_SSS_DESDE, string _EXP_EXT_SSS_HASTA, string _EXP_EXT_PM_DESDE, string _EXP_EXT_PM_HASTA, string _EXP_EXT_CERT_DESDE, string _EXP_EXT_CERT_HASTA,
    string _EXP_EXT_VENC_PAT, string _EXP_EXT_TUTOR,int _q, string _EXP_EXT_EST_LEGAL_DESCRIPCION)
        {
            EXP_EXT_EXP_ID = _EXP_EXT_EXP_ID;
            EXP_EXT_PMI_DESDE = _EXP_EXT_PMI_DESDE;
            EXP_EXT_PMI_HASTA = _EXP_EXT_PMI_HASTA;
            EXP_EXT_CODEM_DESDE = _EXP_EXT_CODEM_DESDE;
            EXP_EXT_CODEM_HASTA = _EXP_EXT_CODEM_HASTA;
            EXP_EXT_SSS_DESDE = _EXP_EXT_SSS_DESDE;
            EXP_EXT_SSS_HASTA = _EXP_EXT_SSS_HASTA;
            EXP_EXT_PM_DESDE = _EXP_EXT_PM_DESDE;
            EXP_EXT_PM_HASTA = _EXP_EXT_PM_HASTA;
            EXP_EXT_CERT_DESDE = _EXP_EXT_CERT_DESDE;
            EXP_EXT_CERT_HASTA = _EXP_EXT_CERT_HASTA;
            EXP_EXT_VENC_PAT = _EXP_EXT_VENC_PAT;
            EXP_EXT_TUTOR = _EXP_EXT_TUTOR;
            EXP_EXT_EST_LEGAL_DESCRIPCION = _EXP_EXT_EST_LEGAL_DESCRIPCION;
        }
}

public class expediente_buscar
{
    public long EXP_ID { get; set; }
    public int EXP_NRO_DOC { get; set; }
    public string EXP_NOMBRE { get; set; }
    public string EXP_SECCIONAL { get; set; }
    public string EXP_VENC_FECHA { get; set; }
    public string EXP_PATOLOGIAS { get; set; }
    public string EXP_EST_DESC { get; set; }
    public string EXP_FEC_NAC { get; set; }
    public string EXP_OBS { get; set; }
    public string Foto { get; set; }

    public expediente_buscar() { }

    public expediente_buscar(long _EXP_ID, int _EXP_NRO_DOC, string _EXP_NOMBRE, string _EXP_SECCIONAL, string _EXP_VENC_FECHA, string _EXP_PATOLOGIAS, string _EXP_EST_DESC,
        string _EXP_FEC_NAC, string _EXP_OBS)
    {
        EXP_ID = _EXP_ID;
        EXP_NRO_DOC = _EXP_NRO_DOC;
        EXP_NOMBRE = _EXP_NOMBRE;
        EXP_SECCIONAL = _EXP_SECCIONAL;
        EXP_VENC_FECHA = _EXP_VENC_FECHA;
        EXP_PATOLOGIAS = _EXP_PATOLOGIAS;
        EXP_EST_DESC = _EXP_EST_DESC;
        EXP_FEC_NAC = _EXP_FEC_NAC;
        EXP_OBS = _EXP_OBS;
    }

    public expediente_buscar(long _EXP_ID, int _EXP_NRO_DOC, string _EXP_NOMBRE, string _EXP_SECCIONAL, string _EXP_VENC_FECHA, string _EXP_PATOLOGIAS, string _EXP_EST_DESC,
    string _EXP_FEC_NAC, string _EXP_OBS,string _Foto)
    {
        EXP_ID = _EXP_ID;
        EXP_NRO_DOC = _EXP_NRO_DOC;
        EXP_NOMBRE = _EXP_NOMBRE;
        EXP_SECCIONAL = _EXP_SECCIONAL;
        EXP_VENC_FECHA = _EXP_VENC_FECHA;
        EXP_PATOLOGIAS = _EXP_PATOLOGIAS;
        EXP_EST_DESC = _EXP_EST_DESC;
        EXP_FEC_NAC = _EXP_FEC_NAC;
        EXP_OBS = _EXP_OBS;
        Foto = _Foto;
    }

}


public class expediente_pedidos_cab
{
    public long EXP_PED_ID { get; set; }
    public int EXP_PED_EPA_ID { get; set; }
    public string EXP_PED_FECHA { get; set; }
    public string EXP_PED_FECHA_RECETA { get; set; }
    public string EXP_PED_OBS { get; set; }
    public int EXP_PED_DURACION { get; set; }
    public long EXP_PED_USUARIO { get; set; }
    public string EXP_PED_FECHA_ING { get; set; }
    public string EXP_PED_FEC_AUTORIZ { get; set; }
    public bool EXP_PED_URGENTE { get; set; }
    public string EXP_PED_FEC_AUDIT { get; set; }
    public long EXP_PED_USU_AUDIT { get; set; }
    public bool EXP_PED_ESTADO { get; set; }
    public string EXP_PED_OBS_AUDIT { get; set; }
    public long EXP_PED_EXP_ID { get; set; }
    public string EXP_PED_USU_NOM { get; set; }
    public string EXP_PED_USU_AA_NOM { get; set; }
    public int EXP_PED_ES_60_90 { get; set; }
    public bool EXP_PED_EDITABLE { get; set; }
    public long EXP_PED_ID_ORIGEN { get; set; }
    public string INSUMOS { get; set; }
    public bool EXP_PENDIENTE { get; set; }
    public int idCirugia { get; set; }

    public expediente_pedidos_cab() { }

    public expediente_pedidos_cab(long _EXP_PED_ID, int _EXP_PED_EPA_ID, string _EXP_PED_FECHA, string _EXP_PED_FECHA_RECETA, string _EXP_PED_OBS, int _EXP_PED_DURACION,
        long _EXP_PED_USUARIO, string _EXP_PED_FECHA_ING, string _EXP_PED_FEC_AUTORIZ, bool _EXP_PED_URGENTE, string _EXP_PED_FEC_AUDIT, long _EXP_PED_USU_AUDIT,
        bool _EXP_PED_ESTADO, string _EXP_PED_OBS_AUDIT, long _EXP_PED_EXP_ID, string _EXP_PED_USU_NOM, string _EXP_PED_USU_AA_NOM, int _EXP_PED_ES_60_90,
        bool _EXP_PED_EDITABLE, long _EXP_PED_ID_ORIGEN, string _INSUMOS = "", bool _EXP_PENDIENTE = true) 
    {
        EXP_PED_ID = _EXP_PED_ID;
        EXP_PED_EPA_ID = _EXP_PED_EPA_ID;
        EXP_PED_FECHA = _EXP_PED_FECHA;
        EXP_PED_FECHA_RECETA = _EXP_PED_FECHA_RECETA;
        EXP_PED_OBS = _EXP_PED_OBS;
        EXP_PED_DURACION = _EXP_PED_DURACION;
        EXP_PED_USUARIO = _EXP_PED_USUARIO;
        EXP_PED_FECHA_ING = _EXP_PED_FECHA_ING;
        EXP_PED_FEC_AUTORIZ = _EXP_PED_FEC_AUTORIZ;
        EXP_PED_URGENTE = _EXP_PED_URGENTE;
        EXP_PED_FEC_AUDIT = _EXP_PED_FEC_AUDIT;
        EXP_PED_USU_AUDIT = _EXP_PED_USU_AUDIT;
        EXP_PED_ESTADO = _EXP_PED_ESTADO;
        EXP_PED_OBS_AUDIT = _EXP_PED_OBS_AUDIT;
        EXP_PED_EXP_ID = _EXP_PED_EXP_ID;
        EXP_PED_USU_NOM = _EXP_PED_USU_NOM;
        EXP_PED_USU_AA_NOM = _EXP_PED_USU_AA_NOM;
        EXP_PED_ES_60_90 = _EXP_PED_ES_60_90;
        EXP_PED_EDITABLE = _EXP_PED_EDITABLE;
        EXP_PED_ID_ORIGEN = _EXP_PED_ID_ORIGEN;
        INSUMOS = _INSUMOS;
        EXP_PENDIENTE = _EXP_PENDIENTE;
    }

}

public class expediente_pedidos_det
{ 
      public long PDT_ID { get; set; }
      public long PDT_PED_ID { get; set; }
      public int PDT_INS_ID { get; set; }
      public int PDT_CANTIDAD { get; set; }
      public decimal PDT_POR_DESC { get; set; }
      public long PDT_USUARIO { get; set; }
      public bool PDT_NOENTREGAR { get; set; }
      public int PDT_SALDO { get; set; }
      public long PDT_USU_AUDIT { get; set; }
      public string PDT_FEC_AUDIT { get; set; }
      public string PDT_OBS { get; set; }
      public int PDT_PLAN { get; set; }
      public string PDT_INS_NOM { get; set; }
      public string PDT_USUARIO_NOM { get; set; }
      public string PDT_USU_AUDIT_NOM { get; set; }

      public expediente_pedidos_det() { }

      public expediente_pedidos_det(long _PDT_ID,long _PDT_PED_ID, int _PDT_INS_ID, int _PDT_CANTIDAD, decimal _PDT_POR_DESC, long _PDT_USUARIO, bool _PDT_NOENTREGAR,
          int _PDT_SALDO, long _PDT_USU_AUDIT, string _PDT_FEC_AUDIT, string _PDT_OBS, int _PDT_PLAN, string _PDT_INS_NOM, string _PDT_USUARIO_NOM, string _PDT_USU_AUDIT_NOM)
      {
          PDT_ID = _PDT_ID;
          PDT_PED_ID = _PDT_PED_ID;
          PDT_INS_ID = _PDT_INS_ID;
          PDT_CANTIDAD = _PDT_CANTIDAD;
          PDT_POR_DESC = _PDT_POR_DESC;
          PDT_USUARIO = _PDT_USUARIO;
          PDT_NOENTREGAR = _PDT_NOENTREGAR;
          PDT_SALDO = _PDT_SALDO;
          PDT_USU_AUDIT = _PDT_USU_AUDIT;
          PDT_FEC_AUDIT = _PDT_FEC_AUDIT;
          PDT_OBS = _PDT_OBS;
          PDT_PLAN = _PDT_PLAN;
          PDT_INS_NOM = _PDT_INS_NOM;
          PDT_USUARIO_NOM = _PDT_USUARIO_NOM;
          PDT_USU_AUDIT_NOM = _PDT_USU_AUDIT_NOM;
      }
}

public class expediente_rubros
{ 
    public int COMPRAS_RUBROS_ID { get; set; }
	public string COMPRAS_RUBROS_DESC { get; set; }
    public bool COMPRAS_RUBROS_BAJA { get; set; }

    public expediente_rubros() { }

    public expediente_rubros(int _COMPRAS_RUBROS_ID, string _COMPRAS_RUBROS_DESC, bool _COMPRAS_RUBROS_BAJA) 
    {
        COMPRAS_RUBROS_ID = _COMPRAS_RUBROS_ID;
        COMPRAS_RUBROS_DESC = _COMPRAS_RUBROS_DESC;
        COMPRAS_RUBROS_BAJA = _COMPRAS_RUBROS_BAJA;
    }
}


public class expediente_entregas_det
{
    public long PDT_ID { get; set; }
    public long PDT_PED_ID { get; set; }
    public int PDT_INS_ID { get; set; }
    public int PDT_CANTIDAD { get; set; }
    public decimal PDT_POR_DESC { get; set; }
    public int PDT_SALDO { get; set; }
    public string PDT_OBS { get; set; }
    public string PDT_INS_NOM { get; set; }
    public string PDT_USUARIO_NOM { get; set; }
    public decimal PEE_PRE_UNI { get; set; }
    public int PEE_CANT_ENTR { get; set; }
    public int PEE_DEP_ID { get; set; }
    public string PEE_FEC_ENTREGA { get; set; }
    public string DEPOSITO_DESC { get; set; }
    public decimal INS_ULT_PRECIO { get; set; }
    public long PEE_ID { get; set; }
    public long PEE_NUMERO_REM { get; set; }
    public bool PEE_MARCA { get; set; }
    public long USU_MED { get; set; }
    public long Nremito { get; set; }

    public expediente_entregas_det() { }

    public expediente_entregas_det(long _PDT_ID, long _PDT_PED_ID, int _PDT_INS_ID, int _PDT_CANTIDAD, decimal _PDT_POR_DESC, int _PDT_SALDO, string _PDT_OBS,
        string _PDT_INS_NOM, string _PDT_USUARIO_NOM, decimal _PEE_PRE_UNI, int _PEE_CANT_ENTR, int _PEE_DEP_ID, string _PEE_FEC_ENTREGA, string _DEPOSITO_DESC,
        decimal _INS_ULT_PRECIO, long _PEE_ID, long _USU_MED, long _Nremito = 0)
    {
        PDT_ID = _PDT_ID;
        PDT_PED_ID = _PDT_PED_ID;
        PDT_INS_ID = _PDT_INS_ID;
        PDT_CANTIDAD = _PDT_CANTIDAD;
        PDT_POR_DESC = _PDT_POR_DESC;
        PDT_SALDO = _PDT_SALDO;
        PDT_OBS = _PDT_OBS;
        PDT_INS_NOM = _PDT_INS_NOM;
        PDT_USUARIO_NOM = _PDT_USUARIO_NOM;
        PEE_PRE_UNI = _PEE_PRE_UNI;
        PEE_CANT_ENTR = _PEE_CANT_ENTR;
        PEE_DEP_ID = _PEE_DEP_ID;
        PEE_FEC_ENTREGA = _PEE_FEC_ENTREGA;
        DEPOSITO_DESC = _DEPOSITO_DESC;
        INS_ULT_PRECIO = _INS_ULT_PRECIO;
        PEE_ID = _PEE_ID;
        USU_MED = _USU_MED;
        Nremito = _Nremito;
    }

    public expediente_entregas_det(long _PEE_ID, long _PEE_NUMERO_REM, int _PEE_PDT_ID, int _PEE_CANTIDAD, bool _PEE_MARCA, decimal _PEE_DESC_ENTR, string _PEE_FEC_ENTREGA,
        string _PEE_OBS, decimal _PEE_PRE_UNI, int _PEE_CANT_ENTR, int _PEE_DEP_ID, int _PDT_SALDO)
    {
        PEE_ID = _PEE_ID;
        PEE_NUMERO_REM = _PEE_NUMERO_REM;
        PDT_ID = _PEE_PDT_ID;
        PDT_CANTIDAD = _PEE_CANTIDAD;
        PEE_FEC_ENTREGA = _PEE_FEC_ENTREGA;
        PDT_OBS = _PEE_OBS;
        PEE_PRE_UNI = _PEE_PRE_UNI;
        PEE_MARCA = _PEE_MARCA;
        PEE_CANT_ENTR = _PEE_CANT_ENTR;
        PDT_POR_DESC = _PEE_DESC_ENTR;
        PEE_DEP_ID = _PEE_DEP_ID;
        PEE_FEC_ENTREGA = _PEE_FEC_ENTREGA;
        PDT_SALDO = _PDT_SALDO;
    }
}

public class expediente_entregas_cab
{ 
    public long PEE_NUMERO_REM { get; set; }
    public long PEE_EXP_ID { get; set; }
    public string PEE_FECHA { get; set; }
    public long PEE_USUARIO { get; set; }
    public long PEE_PED_ID { get; set; }
    public bool PEE_IMPRESO { get; set; }
    public bool PEE_IMPRESO_PERMISO { get; set; }

    public expediente_entregas_cab() { }

    public expediente_entregas_cab(long _PEE_NUMERO_REM, long _PEE_PED_ID)
    {
        PEE_NUMERO_REM = _PEE_NUMERO_REM;
        PEE_PED_ID = _PEE_PED_ID;
    }

    public expediente_entregas_cab(long _PEE_NUMERO_REM, long _PEE_EXP_ID, string _PEE_FECHA, long _PEE_USUARIO, long _PEE_PED_ID, bool _PEE_IMPRESO)
    {
        PEE_NUMERO_REM = _PEE_NUMERO_REM;
        PEE_EXP_ID = _PEE_EXP_ID;
        PEE_FECHA = _PEE_FECHA;
        PEE_USUARIO = _PEE_USUARIO;
        PEE_PED_ID = _PEE_PED_ID;
        PEE_IMPRESO = _PEE_IMPRESO;
        PEE_IMPRESO_PERMISO = false;
    }
}

public class expedientes_auditar_pedidos
{
    public long ExpId { get; set; }
    public string Afiliado { get; set; }
    public long NroPed { get; set; }
    public string PedAnt { get; set; }
    public string FReceta { get; set; }
    public string Insumo { get; set; }
    public int Pedido { get; set; }
    public bool Urgente {get;set; }
    public int Duracion { get; set; }
    public decimal Descuento {get;set;}
    public string FAuditado { get; set; }
    public string Auditor { get; set; }
    public string FIngreso { get; set; }
    public string Usu_Ing { get; set; }
    public string Observaciones { get; set; }
    public string Usu_AA { get; set; }
    public string FechaAA { get; set; }
    public long PedidoDetId { get; set; }
    public int PDT_ESTADO { get; set; }

    public expedientes_auditar_pedidos() { }

    public expedientes_auditar_pedidos(long _ExpId, string _Afiliado, long _NroPed, string _PedAnt,string _FReceta, string _Insumo, int _Pedido, bool _Urgente,
        int _Duracion, decimal _Descuento, string _FAuditado, string _Auditor, string _FIngreso, string _Usu_Ing, string _Observaciones,
        long _PedidoDetId, int _PDT_ESTADO = -1)
    {
        ExpId = _ExpId;
        Afiliado = _Afiliado;
        NroPed = _NroPed;
        PedAnt = _PedAnt;
        FReceta = _FReceta;
        Insumo = _Insumo;
        Pedido = _Pedido;
        Urgente = _Urgente;
        Duracion = _Duracion;
        Descuento = _Descuento;
        FAuditado = _FAuditado;
        Auditor = _Auditor;
        FIngreso = _FIngreso;
        Usu_Ing = _Usu_Ing;
        Observaciones = _Observaciones;
        PedidoDetId = _PedidoDetId;
        PDT_ESTADO = _PDT_ESTADO;
    }
}

public class expedientes_informe_global
{
    public long NroExp { get; set; }
    public string Insumo { get; set; }
    public int Pedido { get; set; }
    public decimal Descuento { get; set; }
    public string Fecha { get; set; }
    public int FarCant { get; set; }
    public decimal FarPrecio { get; set; }
    public decimal FarDesc { get; set; }
    public int Saldo { get; set; }
    public int Entregado { get; set; }
    public string Deposito { get; set; }
    public long NroRemitoEnt { get; set; }
    public long EntDetId { get; set; }

    public expedientes_informe_global() { }

    public expedientes_informe_global(long _ExpId, string _Insumo, int _Pedido, decimal _Descuento, string _Fecha, int _FarCant, decimal _FarPrecio, decimal _FarDesc,
        int _Saldo, int _Entregado, string _Deposito, long _NroRemitoEnt, long _EntDetId)
    {
        NroExp = _ExpId;
        Insumo = _Insumo;
        Pedido = _Pedido;
        Descuento = _Descuento;
        Fecha = _Fecha;
        FarCant = _FarCant;
        FarPrecio = _FarPrecio;
        FarDesc = _FarDesc;
        Saldo = _Saldo;
        Entregado = _Entregado;
        Deposito = _Deposito;
        NroRemitoEnt = _NroRemitoEnt;
        EntDetId = _EntDetId;
    }
}

public class expediente_historial_insumo
{
    public string Insumo { get; set; }
    public int CantidadPedida { get; set; }
    public long NroPedido { get; set; }
    public int CantidadEntregada { get; set; }
    public string FechaEntrega { get; set; }

    public expediente_historial_insumo() { }

    public expediente_historial_insumo(string _Insumo, int _CantidadPedida, long _NroPedido, int _CantidadEntregada, string _FechaEntrega)
    {
        Insumo = _Insumo;
        CantidadPedida = _CantidadPedida;
        NroPedido = _NroPedido;
        CantidadEntregada = _CantidadEntregada;
        FechaEntrega = _FechaEntrega;
    }
}

public class compras_reporte_amb_caba
{
    public string Paciente { get; set; }
    public long Documento { get; set; }
    public string NHC { get; set; }
    public long ExpId { get; set; }
    public long NroPedido { get; set; }
    public string Insumo { get; set; }
    public int Pedido { get; set; }
    public decimal Descuento { get; set; }
    public int Entregado { get; set; }
    public long NroRemito { get; set; }
    public int Saldo { get; set; }  
    public string Deposito { get; set; }
    public string FechaPedido { get; set; }
    public string Seccional { get; set; }
    public string area { get; set; }
    public string proveedor { get; set; }

    public compras_reporte_amb_caba() { }

    public compras_reporte_amb_caba(long _ExpId, string _Paciente, long _Documento, string _NHC, long _NroPedido, string _Insumo, int _Pedido,
        decimal _Descuento, int _Entregado, long _NroRemito, int _Saldo, string _Deposito, string _FechaPedido, string _Seccional, string _area = "", string _proveedor = "")
    {
        ExpId = _ExpId;
        Paciente = _Paciente;
        Documento = _Documento;
        NHC = _NHC;
        NroPedido = _NroPedido;
        Insumo = _Insumo;
        Pedido = _Pedido;
        Descuento = _Descuento;
        Entregado = _Entregado;
        NroRemito = _NroRemito;
        Saldo = _Saldo;
        Deposito = _Deposito;
        FechaPedido = _FechaPedido;
        Seccional = _Seccional;
        area = _area;
        proveedor = _proveedor;
    }
}

public class compras_reporte_int
{
    public string FECHA_PEDIDO { get; set; }
    public string SERVICIO { get; set; }
    public string PACIENTE { get; set; }
    public long DOCUMENTO { get; set; }
    public string NHC { get; set; }
    public string SECCIONAL { get; set; }
    public long NPEDIDO { get; set; }
    public int CANTIDAD { get; set; }
    public string INSUMO { get; set; }
    public string OBSERVACION { get; set; }
    public string FEC_ENTREGA { get; set; }
    public string usuario { get; set; }
    public long NEXP { get; set; }

    public compras_reporte_int() { }

    public compras_reporte_int(string _FECHA_PEDIDO, string _SERVICIO, string _PACIENTE, long _DOCUMENTO, string _NHC, string _SECCIONAL, long _NPEDIDO,
        int _CANTIDAD, string _INSUMO, string _OBSERVACION, string _FEC_ENTREGA, string _usuario, long _NEXP)
    {
    FECHA_PEDIDO = _FECHA_PEDIDO;
    SERVICIO = _SERVICIO;
    PACIENTE = _PACIENTE;
    DOCUMENTO = _DOCUMENTO;
    NHC = _NHC;
    SECCIONAL = _SECCIONAL;
    NPEDIDO = _NPEDIDO;
    CANTIDAD = _CANTIDAD;
    INSUMO = _INSUMO;
    OBSERVACION = _OBSERVACION;
    FEC_ENTREGA = _FEC_ENTREGA;
    usuario = _usuario;
    NEXP = _NEXP;
    }
}

public class compras_constancia_entrega
{
    public long COMPRAS_CDE_ID { get; set; }
    public string COMPRAS_CDE_FECHA_RECETA { get; set; }
    public long COMPRAS_CDE_PAC_ID { get; set; }
    public string COMPRAS_CDE_PACIENTE { get; set; }
    public long COMPRAS_CDE_NRODOC { get; set; }
    public int COMPRAS_CDE_SECC { get; set; }
    public bool COMPRAS_CDE_ACTIVO { get; set; }
    public long COMPRAS_CDE_USU_ID { get; set; }
    public bool COMPRAS_CDE_QUIROFANO { get; set; }
    public string COMPRAS_CDE_FECHA_QUIRO { get; set; }
    public string COMPRAS_CDE_SECCIONAL_NOM { get; set; }

    public compras_constancia_entrega() { }

    public compras_constancia_entrega(long _COMPRAS_CDE_ID, string _COMPRAS_CDE_FECHA_RECETA, long _COMPRAS_CDE_PAC_ID, string _COMPRAS_CDE_PACIENTE,
        long _COMPRAS_CDE_NRODOC, int _COMPRAS_CDE_SECC, bool _COMPRAS_CDE_ACTIVO, long _COMPRAS_CDE_USU_ID, string _COMPRAS_CDE_FECHA_QUIRO, bool _COMPRAS_CDE_QUIROFANO,
        string _COMPRAS_CDE_SECCIONAL_NOM = "")
    {
        COMPRAS_CDE_ID = _COMPRAS_CDE_ID;
        COMPRAS_CDE_FECHA_RECETA = _COMPRAS_CDE_FECHA_RECETA;
        COMPRAS_CDE_PAC_ID = _COMPRAS_CDE_PAC_ID;
        COMPRAS_CDE_PACIENTE = _COMPRAS_CDE_PACIENTE;
        COMPRAS_CDE_NRODOC = _COMPRAS_CDE_NRODOC;
        COMPRAS_CDE_SECC = _COMPRAS_CDE_SECC;
        COMPRAS_CDE_ACTIVO = _COMPRAS_CDE_ACTIVO;
        COMPRAS_CDE_USU_ID = _COMPRAS_CDE_USU_ID;
        COMPRAS_CDE_FECHA_QUIRO = _COMPRAS_CDE_FECHA_QUIRO;
        COMPRAS_CDE_QUIROFANO = _COMPRAS_CDE_QUIROFANO;
        COMPRAS_CDE_SECCIONAL_NOM = _COMPRAS_CDE_SECCIONAL_NOM;
    }
}

public class compras_Servicio
{
    public int id { get; set; }
    public string descripcion { get; set; }
    public int activo { get; set; }

    public compras_Servicio() { }
    public compras_Servicio(int _id, string _descripcion, int _activo) {
        id = _id;
        descripcion = _descripcion;
        activo = _activo;
    }
}

public class compras_Cirugia
{   
    public int id { get; set; }
    public string fecha { get; set; }
    public string cirugias { get; set; }
    public string motivo { get; set; }
    public string cirujanoName { get; set; }
    public string cirujanoEspecialidad { get; set; }
    public long cirujanoId { get; set; }
    public long EspecialidadId { get; set; }
    
    public compras_Cirugia() { }
    public compras_Cirugia(int _id, string _fecha, string _cirugias, string _motivo, string _cirujanoName = "", string _cirujanoEspecialidad = "",long _cirujanoId = 0,long _EspecialidadId = 0)
    {
        id = _id;
        fecha = _fecha;
        cirugias = _cirugias;
        motivo = _motivo;
        cirujanoName = _cirujanoName;
        cirujanoEspecialidad = _cirujanoEspecialidad;
        cirujanoId = _cirujanoId;
        EspecialidadId = _EspecialidadId;
    
    }
}

public class expediente_pedidos_cab_internacion
{
    private long p;
    private int p_2;
    private string p_3;
    private string p_4;
    private string OBS_PED;
    private int p_5;
    private int p_6;
    private string p_7;
    private string EXP_PED_FEC_AUTORIZ_2;
    private bool p_8;
    private string EXP_PED_FEC_AUTORIZ_3;
    private int p_9;
    private bool p_10;
    private string OBS_AA;
    private long p_11;
    private string UsuarioPed;
    private string UsuarioAA;
    private int p_12;
    private bool p_13;
    private long _PED_ORIGEN;
    private string p_14;
    private string p_15;
    private string p_16;
    private string p_17;
    private int p_18;
    private bool p_19;
    private int p_20;
    private int p_21;
    private string p_22;

    public long EXP_PED_ID { get; set; }
    public int EXP_PED_EPA_ID { get; set; }
    public string EXP_PED_FECHA { get; set; }
    public string EXP_PED_FECHA_RECETA { get; set; }
    public string EXP_PED_OBS { get; set; }
    public int EXP_PED_DURACION { get; set; }
    public long EXP_PED_USUARIO { get; set; }
    public string EXP_PED_FECHA_ING { get; set; }
    public string EXP_PED_FEC_AUTORIZ { get; set; }
    public bool EXP_PED_URGENTE { get; set; }
    public string EXP_PED_FEC_AUDIT { get; set; }
    public long EXP_PED_USU_AUDIT { get; set; }
    public bool EXP_PED_ESTADO { get; set; }
    public string EXP_PED_OBS_AUDIT { get; set; }
    public long EXP_PED_EXP_ID { get; set; }
    public string EXP_PED_USU_NOM { get; set; }
    public string EXP_PED_USU_AA_NOM { get; set; }
    public int EXP_PED_ES_60_90 { get; set; }
    public bool EXP_PED_EDITABLE { get; set; }
    public long EXP_PED_ID_ORIGEN { get; set; }
    public string INSUMOS { get; set; }
    public bool EXP_PENDIENTE { get; set; }
    public int idCirugia { get; set; }
    public int areaId { get; set; }
    public string area { get; set; }
    public string cirugias { get; set; }
    public string fechaCirugiaNew { get; set; }
    public string cirugiaNew { get; set; }
    public string motivoNew { get; set; }
    public long cirujanoNew { get; set; }
    public long especialidadNew { get; set; }

    public string motivo { get; set; }
    public string fechaInternvension { get; set; }
    public bool borrar_S_N { get; set; }
    public int EXP_PED_MED { get; set; }
    public int entregado { get; set; }

    public expediente_pedidos_cab_internacion() { }

     //public expediente_pedidos_cab_internacion(long p, int p_2, string p_3, string p_4, string OBS_PED, int p_5, int p_6, string p_7, string EXP_PED_FEC_AUTORIZ_2, bool p_8
     //    , string EXP_PED_FEC_AUTORIZ_3, int p_9, bool p_10, string OBS_AA, long p_11, string UsuarioPed, string UsuarioAA, int p_12, bool p_13, long _PED_ORIGEN, string p_14,
     //    string p_15, string p_16, string p_17, int p_18, bool p_19, int p_20, int p_21, string p_22)

    public expediente_pedidos_cab_internacion(
        long _EXP_PED_ID, 
        int _EXP_PED_EPA_ID, 
        string _EXP_PED_FECHA, 
        string _EXP_PED_FECHA_RECETA, 
        string _EXP_PED_OBS, 
        int _EXP_PED_DURACION,
        int _EXP_PED_USUARIO, 
        string _EXP_PED_FECHA_ING, 
        string _EXP_PED_FEC_AUTORIZ, 
        bool _EXP_PED_URGENTE, 
        string _EXP_PED_FEC_AUDIT, 
        int _EXP_PED_USU_AUDIT,
        bool _EXP_PED_ESTADO, 
        string _EXP_PED_OBS_AUDIT, 
        long _EXP_PED_EXP_ID, 
        string _EXP_PED_USU_NOM, 
        string _EXP_PED_USU_AA_NOM, 
        int _EXP_PED_ES_60_90,
        bool _EXP_PED_EDITABLE, 
        long _EXP_PED_ID_ORIGEN, 
        string _area, 
        string _cirugias, 
        string _motivo, 
        string _fechaInternvension, 
        int _areaId, 
        bool _borrar_S_N,
        //int _borrar_S_N,
        int _EXP_PED_MED, 
        int _entregado, 
        string _INSUMOS = "")
    {
        EXP_PED_ID = _EXP_PED_ID;
        EXP_PED_EPA_ID = _EXP_PED_EPA_ID;
        EXP_PED_FECHA = _EXP_PED_FECHA;
        EXP_PED_FECHA_RECETA = _EXP_PED_FECHA_RECETA;
        EXP_PED_OBS = _EXP_PED_OBS;
        EXP_PED_DURACION = _EXP_PED_DURACION;
        EXP_PED_USUARIO = _EXP_PED_USUARIO;
        EXP_PED_FECHA_ING = _EXP_PED_FECHA_ING;
        EXP_PED_FEC_AUTORIZ = _EXP_PED_FEC_AUTORIZ;
        EXP_PED_URGENTE = _EXP_PED_URGENTE;
        EXP_PED_FEC_AUDIT = _EXP_PED_FEC_AUDIT;
        EXP_PED_USU_AUDIT = _EXP_PED_USU_AUDIT;
        EXP_PED_ESTADO = _EXP_PED_ESTADO;
        EXP_PED_OBS_AUDIT = _EXP_PED_OBS_AUDIT;
        EXP_PED_EXP_ID = _EXP_PED_EXP_ID;
        EXP_PED_USU_NOM = _EXP_PED_USU_NOM;
        EXP_PED_USU_AA_NOM = _EXP_PED_USU_AA_NOM;
        EXP_PED_ES_60_90 = _EXP_PED_ES_60_90;
        EXP_PED_EDITABLE = _EXP_PED_EDITABLE;
        EXP_PED_ID_ORIGEN = _EXP_PED_ID_ORIGEN;
        INSUMOS = _INSUMOS;
        // EXP_PENDIENTE = _EXP_PENDIENTE;
        area = _area;
        cirugias = _cirugias;
        motivo = _motivo;
        fechaInternvension = _fechaInternvension;
        areaId = _areaId;
        borrar_S_N = _borrar_S_N;
        EXP_PED_MED = _EXP_PED_MED;
        entregado = _entregado;

    }


    public expediente_pedidos_cab_internacion(long _EXP_PED_ID, int _EXP_PED_EPA_ID, string _EXP_PED_FECHA, string _EXP_PED_FECHA_RECETA, string _EXP_PED_OBS, int _EXP_PED_DURACION,
        long _EXP_PED_USUARIO, string _EXP_PED_FECHA_ING, string _EXP_PED_FEC_AUTORIZ, bool _EXP_PED_URGENTE, string _EXP_PED_FEC_AUDIT, long _EXP_PED_USU_AUDIT,
        bool _EXP_PED_ESTADO, string _EXP_PED_OBS_AUDIT, long _EXP_PED_EXP_ID, string _EXP_PED_USU_NOM, string _EXP_PED_USU_AA_NOM, int _EXP_PED_ES_60_90,
        bool _EXP_PED_EDITABLE, long _EXP_PED_ID_ORIGEN, int _areaId, string _area, string _cirugias, string _motivo, string _INSUMOS = "", bool _EXP_PENDIENTE = true, int _idCirugia = 0)
    {
        EXP_PED_ID = _EXP_PED_ID;
        EXP_PED_EPA_ID = _EXP_PED_EPA_ID;
        EXP_PED_FECHA = _EXP_PED_FECHA;
        EXP_PED_FECHA_RECETA = _EXP_PED_FECHA_RECETA;
        EXP_PED_OBS = _EXP_PED_OBS;
        EXP_PED_DURACION = _EXP_PED_DURACION;
        EXP_PED_USUARIO = _EXP_PED_USUARIO;
        EXP_PED_FECHA_ING = _EXP_PED_FECHA_ING;
        EXP_PED_FEC_AUTORIZ = _EXP_PED_FEC_AUTORIZ;
        EXP_PED_URGENTE = _EXP_PED_URGENTE;
        EXP_PED_FEC_AUDIT = _EXP_PED_FEC_AUDIT;
        EXP_PED_USU_AUDIT = _EXP_PED_USU_AUDIT;
        EXP_PED_ESTADO = _EXP_PED_ESTADO;
        EXP_PED_OBS_AUDIT = _EXP_PED_OBS_AUDIT;
        EXP_PED_EXP_ID = _EXP_PED_EXP_ID;
        EXP_PED_USU_NOM = _EXP_PED_USU_NOM;
        EXP_PED_USU_AA_NOM = _EXP_PED_USU_AA_NOM;
        EXP_PED_ES_60_90 = _EXP_PED_ES_60_90;
        EXP_PED_EDITABLE = _EXP_PED_EDITABLE;
        EXP_PED_ID_ORIGEN = _EXP_PED_ID_ORIGEN;
        INSUMOS = _INSUMOS;
        EXP_PENDIENTE = _EXP_PENDIENTE;
        idCirugia = _idCirugia;
        areaId = _areaId;
        area = _area;
        cirugias = _cirugias;
        motivo = _motivo;
  
    }


    public expediente_pedidos_cab_internacion(long _EXP_PED_ID, int _EXP_PED_EPA_ID, string _EXP_PED_FECHA, string _EXP_PED_FECHA_RECETA, string _EXP_PED_OBS, int _EXP_PED_DURACION,
    long _EXP_PED_USUARIO, string _EXP_PED_FECHA_ING, string _EXP_PED_FEC_AUTORIZ, bool _EXP_PED_URGENTE, string _EXP_PED_FEC_AUDIT, long _EXP_PED_USU_AUDIT,
    bool _EXP_PED_ESTADO, string _EXP_PED_OBS_AUDIT, long _EXP_PED_EXP_ID, string _EXP_PED_USU_NOM, string _EXP_PED_USU_AA_NOM, int _EXP_PED_ES_60_90,
    bool _EXP_PED_EDITABLE, long _EXP_PED_ID_ORIGEN, string _area, string _cirugias, string _motivo, string _fechaInternvension, int _areaId, bool _borrar_S_N, int _EXP_PED_MED, string _INSUMOS = "", bool _EXP_PENDIENTE = true)
    {
        EXP_PED_ID = _EXP_PED_ID;
        EXP_PED_EPA_ID = _EXP_PED_EPA_ID;
        EXP_PED_FECHA = _EXP_PED_FECHA;
        EXP_PED_FECHA_RECETA = _EXP_PED_FECHA_RECETA;
        EXP_PED_OBS = _EXP_PED_OBS;
        EXP_PED_DURACION = _EXP_PED_DURACION;
        EXP_PED_USUARIO = _EXP_PED_USUARIO;
        EXP_PED_FECHA_ING = _EXP_PED_FECHA_ING;
        EXP_PED_FEC_AUTORIZ = _EXP_PED_FEC_AUTORIZ;
        EXP_PED_URGENTE = _EXP_PED_URGENTE;
        EXP_PED_FEC_AUDIT = _EXP_PED_FEC_AUDIT;
        EXP_PED_USU_AUDIT = _EXP_PED_USU_AUDIT;
        EXP_PED_ESTADO = _EXP_PED_ESTADO;
        EXP_PED_OBS_AUDIT = _EXP_PED_OBS_AUDIT;
        EXP_PED_EXP_ID = _EXP_PED_EXP_ID;
        EXP_PED_USU_NOM = _EXP_PED_USU_NOM;
        EXP_PED_USU_AA_NOM = _EXP_PED_USU_AA_NOM;
        EXP_PED_ES_60_90 = _EXP_PED_ES_60_90;
        EXP_PED_EDITABLE = _EXP_PED_EDITABLE;
        EXP_PED_ID_ORIGEN = _EXP_PED_ID_ORIGEN;
        INSUMOS = _INSUMOS;
        EXP_PENDIENTE = _EXP_PENDIENTE;
        area = _area;
        cirugias = _cirugias;
        motivo = _motivo;
        fechaInternvension = _fechaInternvension;
        areaId = _areaId;
        borrar_S_N = _borrar_S_N;
        EXP_PED_MED = _EXP_PED_MED;
 
    }

    //public expediente_pedidos_cab_internacion(long p, int p_2, string p_3, string p_4, string OBS_PED, int p_5, int p_6, string p_7, string EXP_PED_FEC_AUTORIZ_2, bool p_8, string EXP_PED_FEC_AUTORIZ_3, int p_9, bool p_10, string OBS_AA, long p_11, string UsuarioPed, string UsuarioAA, int p_12, bool p_13, long _PED_ORIGEN, string p_14, string p_15, string p_16, string p_17, int p_18, bool p_19, int p_20, int p_21, string p_22)
    //{
    //    // TODO: Complete member initialization
    //    this.p = p;
    //    this.p_2 = p_2;
    //    this.p_3 = p_3;
    //    this.p_4 = p_4;
    //    this.OBS_PED = OBS_PED;
    //    this.p_5 = p_5;
    //    this.p_6 = p_6;
    //    this.p_7 = p_7;
    //    this.EXP_PED_FEC_AUTORIZ_2 = EXP_PED_FEC_AUTORIZ_2;
    //    this.p_8 = p_8;
    //    this.EXP_PED_FEC_AUTORIZ_3 = EXP_PED_FEC_AUTORIZ_3;
    //    this.p_9 = p_9;
    //    this.p_10 = p_10;
    //    this.OBS_AA = OBS_AA;
    //    this.p_11 = p_11;
    //    this.UsuarioPed = UsuarioPed;
    //    this.UsuarioAA = UsuarioAA;
    //    this.p_12 = p_12;
    //    this.p_13 = p_13;
    //    this._PED_ORIGEN = _PED_ORIGEN;
    //    this.p_14 = p_14;
    //    this.p_15 = p_15;
    //    this.p_16 = p_16;
    //    this.p_17 = p_17;
    //    this.p_18 = p_18;
    //    this.p_19 = p_19;
    //    this.p_20 = p_20;
    //    this.p_21 = p_21;
    //    this.p_22 = p_22;
    //}


}





public class expediente_pedidos_det_internacion
{
    public long PDT_ID { get; set; }
    public long PDT_PED_ID { get; set; }
    public string PDT_INS { get; set; }//
    public int PDT_CANTIDAD { get; set; }
    public string PDT_TIPO { get; set; }
    public long PDT_USUARIO { get; set; }
    public int PDT_PROVEEDOR { get; set; }
    public string PDT_PROVEEDOR_NAME { get; set; }
    public int PDT_SALDO { get; set; }
    public long PDT_USU_AUDIT { get; set; }
    public string PDT_FEC_AUDIT { get; set; }
    public decimal PDT_IMPORTE { get; set; }
    public int PDT_PLAN { get; set; }
    public string PDT_INS_NOM { get; set; }
    public string PDT_USUARIO_NOM { get; set; }
    public string PDT_USU_AUDIT_NOM { get; set; }
    public string area { get; set; }
    public string cirugias { get; set; }
    public string motivo { get; set; }
    public int ?PDT_ESTADO { get; set; }
    public int areaId { get; set; }
    public int borrar_S_N { get; set; }
    public string USU_ENT { get; set; }
    public string FEC_ENT { get; set; }

    public expediente_pedidos_det_internacion() { }

    public expediente_pedidos_det_internacion(long _PDT_ID, long _PDT_PED_ID, string _PDT_INS, int _PDT_CANTIDAD, string _PDT_TIPO, long _PDT_USUARIO, int _PDT_PROVEEDOR,
        int _PDT_SALDO, long _PDT_USU_AUDIT, string _PDT_FEC_AUDIT, decimal _PDT_IMPORTE, int _PDT_PLAN, string _PDT_INS_NOM, string _PDT_USUARIO_NOM, string _PDT_USU_AUDIT_NOM
        , string _area, string _cirugias, string _motivo, string _PDT_PROVEEDOR_NAME, int _areaId, int _PDT_ESTADO, int _borrar_S_N, string _USU_ENT = "", string _FEC_ENT = "")
    {
        PDT_ID = _PDT_ID;
        PDT_PED_ID = _PDT_PED_ID;
        PDT_INS = _PDT_INS;
        PDT_CANTIDAD = _PDT_CANTIDAD;
        PDT_TIPO = _PDT_TIPO;
        PDT_USUARIO = _PDT_USUARIO;
        PDT_PROVEEDOR = _PDT_PROVEEDOR;
        PDT_SALDO = _PDT_SALDO;
        PDT_USU_AUDIT = _PDT_USU_AUDIT;
        PDT_FEC_AUDIT = _PDT_FEC_AUDIT;
        PDT_IMPORTE = _PDT_IMPORTE;
        PDT_PLAN = _PDT_PLAN;
        PDT_INS_NOM = _PDT_INS_NOM;
        PDT_USUARIO_NOM = _PDT_USUARIO_NOM;
        PDT_USU_AUDIT_NOM = _PDT_USU_AUDIT_NOM;
        area = _area;
        cirugias = _cirugias;
        motivo = _motivo;
        PDT_PROVEEDOR_NAME = _PDT_PROVEEDOR_NAME;
        areaId = _areaId;
        PDT_ESTADO = _PDT_ESTADO;
        borrar_S_N = _borrar_S_N;
        USU_ENT = _USU_ENT;
        FEC_ENT = _FEC_ENT;
    }
}


public class pedidoInternacion {
    public pedidoInternacion() { }

    public int PED_COM_ID { get; set; }
    public string PED_COM_DET_INS_DESC { get; set; }
    public int PED_COM_DET_CANTIDAD { get; set; }
    public int PED_COM_DET_PRV_ID { get; set; }

}

public class idsOrden {
    public idsOrden() { }

    public long id { get; set; }
}


public class InsumoInternacion
{
    public InsumoInternacion() { }

    public long id { get; set; }
    public string descripcion { get; set; }
    public bool activo { get; set; }
    public int cantidad { get; set; }
    public string observacion { get; set; }
    public string insumo { get; set; }
    public long ENTREGA_DETALLE_ID { get; set; }
    public long ENTREGA_ID { get; set; }
    public int ENTREGADO { get; set; }
    public long USU_ENTREGA { get; set; }
    public string FECHA_ENTREGA { get; set; }
    public decimal PRECIO { get; set; }
    public long PDT_ID { get; set; }
}

public class COM_ORDEN_CAB_INTERNACION
{
    public COM_ORDEN_CAB_INTERNACION() { }


    public COM_ORDEN_CAB_INTERNACION(long? _EXP_ID, long? _EXP_PED_ID, long _ORDEN_COM_CAB_ID, string _ORDEN_COM_CAB_FECHA, long _ORDEN_COM_CAB_USU_ID, long _ORDEN_COM_CAB_PRV_ID, int _ORDEN_COM_CAB_SECTOR = 0,
bool _ORDEN_COM_CAB_ENVIADO = false, string _ORDEN_COM_CAB_PRV_NOMBRE = "", string _ORDEN_COM_CAB_USU_NOMBRE = "", bool _PENDIENTE = true, bool _ORDEN_COM_CAB_BAJA = false)
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
        ORDEN_COM_CAB_BAJA = _ORDEN_COM_CAB_BAJA;
    }


    public COM_ORDEN_CAB_INTERNACION(long? _EXP_ID, long? _EXP_PED_ID, long _ORDEN_COM_CAB_ID, string _ORDEN_COM_CAB_FECHA, long _ORDEN_COM_CAB_USU_ID, long _ORDEN_COM_CAB_PRV_ID, int _ORDEN_COM_CAB_SECTOR = 0,
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

    public long ORDEN_COM_CAB_ID { get; set; }
    public string ORDEN_COM_CAB_FECHA { get; set; }
    public long ORDEN_COM_CAB_USU_ID { get; set; }
    public int ORDEN_COM_CAB_SECTOR { get; set; }
    public bool ORDEN_COM_CAB_ENVIADO { get; set; }
    public long ORDEN_COM_CAB_PRV_ID { get; set; }
    public string ORDEN_COM_CAB_PRV_NOMBRE { get; set; }
    public string ORDEN_COM_CAB_USU_NOMBRE { get; set; }
    public bool PENDIENTE { get; set; }
    public long? EXP_ID { get; set; }
    public long? EXP_PED_ID { get; set; }
    public bool ORDEN_COM_CAB_BAJA { get; set; }
}