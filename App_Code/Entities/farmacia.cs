using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for farmacia
/// </summary>
public class farmacia
{

        private string rem_id;
        private string rem_nro_registro;
        private string rem_nombre;
        private string rem_desc_comp;
        private string rem_gramaje;
        private int rem_gramaje_id;
        private string rem_gramaje_desc; //Gramaje Pres
        private string rem_presentacion_c; //cant pres
        private string rem_presentacion; //id pres
        private string rem_presentacion_desc; //pres descripcion
        private decimal rem_precio;
        //private DateTime rem_fecha_vigencia_precio;
        private string rem_fecha_vigencia_precio;
        private string rem_importado;
        private string rem_baja;
        private string rem_unidades;
        private string rem_baja_especial;
        private string rem_estado;
        private string rem_rubro;
        private decimal rem_precompra;
        private string rem_ape;
        private string rem_fact;
        private string rem_lista;
        private string rem_desc_compra;
        private string rem_multidosis;
        private string rem_rubro_id;
        private string rem_unidades_id;
        private string sto_cantidad;
        //private string sto_vencimiento;
        private string sto_vencimiento;
        private string sto_minimo;
        private string rem_presentacion_id;
        private string rubro;
        private string medida;
        private string presentacion;
        private bool cAPE;
        private bool cDadodeBaja;
        private string cRequiereAuto;
        private bool cSeFactura;
        private bool cTrazabilidad;
        private string sto_dep_id;
        private string nro_lote;
        private string nro_serie;
        private string cant_blister;
        private string rem_i_letra;
        private string rem_i_sucursal;
        private string rem_i_numero;
        private string lab_descripcion;
        private string lab_id;
        //private DateTime rem_i_fecha;
        private string rem_i_fecha;
        private string rem_i_obs;
        private string rem_i_id;
        private int monodroga;
        private bool eliminado;
        private string _Laboratorio;
        private string gln;
        private string gtin;
        private int vencimiento_diasaviso;
        private int stockmax;
        private long usuario;

        public farmacia()
        {
            //
            // TODO: Add constructor logic here
            //
        }

    #region Properties
        public string REM_PRESENTACION_C
        { get { return rem_presentacion_c; } set { rem_presentacion_c = value; } }

        public int REM_GRAMAJE_ID
        { get { return rem_gramaje_id; } set { rem_gramaje_id = value; } }
        
        public string REM_GRAMAJE_DESC
        { get { return rem_gramaje_desc; } set { rem_gramaje_desc = value; } }

        public string REM_PRESENTACION_DESC
        { get { return rem_presentacion_desc; } set { rem_presentacion_desc = value; } }

        public string REM_APE
        { get { return rem_ape; } set { rem_ape = value; } }

        public int MONODROGA
        { get { return monodroga; } set { monodroga = value; } }

        public string REM_ID
        { get { return rem_id; } set { rem_id = value; } }

        public string REM_BAJA
        { get { return rem_baja; } set { rem_baja = value; } }

        public string REM_BAJA_ESPECIAL
        { get { return rem_baja_especial; } set { rem_baja_especial = value; } }

        public string REM_DESC_COMPRA
        { get { return rem_desc_compra; } set { rem_desc_compra = value; } }

        public string REM_ESTADO
        { get { return rem_estado; } set { rem_estado = value; } }

        public string REM_FACT
        { get { return rem_fact; } set { rem_fact = value; } }

        public string REM_FECHA_VIGENCIA_PRECIO
        { get { return rem_fecha_vigencia_precio; } set { rem_fecha_vigencia_precio = value; } }

        public string REM_GRAMAJE
        { get { return rem_gramaje; } set { rem_gramaje = value; } }

        public string REM_IMPORTADO
        { get { return rem_importado; } set { rem_importado = value; } }

        public string CANT_BLISTER
        { get { return cant_blister; } set { cant_blister = value; } }

        public string REM_LISTA
        { get { return rem_lista; } set { rem_lista = value; } }

        public string REM_MULTIDOSIS
        { get { return rem_multidosis; } set { rem_multidosis = value; } }

        public string REM_NOMBRE
        { get { return rem_nombre; } set { rem_nombre = value; } }

        public string REM_NRO_REGISTRO
        { get { return rem_nro_registro; } set { rem_nro_registro = value; } }

        public decimal REM_PRECIO
        { get { return rem_precio; } set { rem_precio = value; } }

        public decimal REM_PRECOMPRA
        { get { return rem_precompra; } set { rem_precompra = value; } }

        public string REM_PRESENTACION
        { get { return rem_presentacion; } set { rem_presentacion = value; } }

        public string REM_PRESENTACION_ID
        { get { return rem_presentacion_id; } set { rem_presentacion_id = value; } }

        public string REM_RUBRO
        { get { return rem_rubro; } set { rem_rubro = value; } }

        public string REM_RUBRO_ID
        { get { return rem_rubro_id; } set { rem_rubro_id = value; } }

        public string REM_UNIDADES
        { get { return rem_unidades; } set { rem_unidades = value; } }

        public string REM_UNIDADES_ID
        { get { return rem_unidades_id; } set { rem_unidades_id = value; } }

        public string STO_CANTIDAD
        { get { return sto_cantidad ; } set { sto_cantidad = value; } }

        public string STO_VENCIMIENTO
        { get { return sto_vencimiento; } set { sto_vencimiento = value; } }

        public string STO_MINIMO
        { get { return sto_minimo; } set { sto_minimo = value; } }

        public string REM_DESC_COMP
        { get { return rem_desc_comp; } set { rem_desc_comp = value; } }

        public string Rubro
        { get { return rubro; } set { rubro = value; } }

        public string Medida
        { get { return medida; } set { medida = value; } }

        public string Presentacion
        { get { return presentacion; } set { presentacion = value; } }

        public bool CAPE
        { get { return cAPE; } set { cAPE = value; } }
        
        public bool CDadodeBaja
        { get { return cDadodeBaja; } set { cDadodeBaja = value; } }
        
        public string CRequiereAuto
        { get { return cRequiereAuto; } set { cRequiereAuto = value; } }
        
        public bool CSeFactura
        { get { return cSeFactura; } set { cSeFactura = value; } }
        
        public bool CTrazabilidad
        { get { return cTrazabilidad; } set { cTrazabilidad = value; } }

        public string NROSERIE
        { get { return nro_serie; } set { nro_serie = value; } }

        public string NROLOTE
        { get { return nro_lote; } set { nro_lote = value; } }

        public string REM_I_LETRA
        { get { return rem_i_letra; } set { rem_i_letra = value; } }

        public string REM_I_SUCURSAL
        { get { return rem_i_sucursal; } set { rem_i_sucursal = value; } }

        public string REM_I_NUMERO
        { get { return rem_i_numero; } set { rem_i_numero = value; } }
        
        public string LAB_DESCRIPCION
        { get { return lab_descripcion; } set { lab_descripcion = value; } }

        public string LAB_ID
        { get { return lab_id; } set { lab_id = value; } }

        public string REM_I_FECHA
        { get { return rem_i_fecha; } set { rem_i_fecha = value; } }
        
        public string REM_I_OBS
        { get { return rem_i_obs; } set { rem_i_obs = value; } }

        public string REM_I_ID
        { get { return rem_i_id; } set { rem_i_id = value; } }

        public string STO_DEP_ID
        { get { return sto_dep_id; } set { sto_dep_id = value; } }

        public bool ELIMINADO
        { get { return eliminado; } set { eliminado = value; } }

        public string Laboratorio
        {
            get { return _Laboratorio; }
            set { _Laboratorio = value; }
        }

        public string GLN
        {
            get { return gln; }
            set { gln = value; }
        }

        public string GTIN
        {
            get { return gtin; }
            set { gtin = value; }
        }

        public int Vencimiento_Diasaviso
        {
            get { return vencimiento_diasaviso; }
            set { vencimiento_diasaviso = value; }
        }

        public int StockMax
        {
            get { return stockmax; }
            set { stockmax = value; }
        }

        public long Usuario
        {
            get { return usuario; }
            set { usuario = value; }
        }

    #endregion

    
}

public class Farmacia_Combo
{
    public int REM_ID { get; set; }
    public string REM_NOMBRE { get; set; }
    public string Medida { get; set; }
    public string Presentacion { get; set; }
    public string REM_GRAMAJE { get; set; }

    public Farmacia_Combo() { }

}

public class Bono_Contribucion_Cabecera
{
    public Bono_Contribucion_Cabecera()
    { 
    
    }

#region Properties
    public int Pedido_Id {get; set;}
    public string Nombre_Cliente {get; set;}
    public DateTime Pedido_Fecha {get; set;}
    public int Pedido_UsuarioId {get;set;}
    public string NHC {get;set;}
    public int Cod_Auditor { get; set; }
    public string Usuario { get; set; }
#endregion

}

public class Bono_Contribucion_Detalles
{
    public Bono_Contribucion_Detalles()
    {

    }

    #region Properties
    public string Pedido_Id { get; set; }
    public string Codigo { get; set; }
    public string CANT_UNIDADES { get; set; } //CANT_UNIDADES es la cantidad de blister que llevan
    public string Cantidad { get; set; } // Cantidad es la cantidad total de unidades .... cant_unidades * unidades_por_blister
    public string Precio { get; set; }
    public string Descuento { get; set; }
    public string NroLote { get; set; }
    #endregion

}

public class Usuarios_Farmacia
{
    public string Usuario { get; set; }
    public string Nombre { get; set; }
    public long id { get; set; }

    public Usuarios_Farmacia()
    { 
    
    }
}

public class Rendicion_BonoContribucion
{
    public string Afiliado { get; set; }
    public string NHC { get; set; }
    public string Medicamento { get; set; }
    public int Cantidad { get; set; }
    public decimal Total { get; set; }
    public int Descuento { get; set; }
    public decimal Acumulado { get; set; }
    public DateTime Ped_Fecha { get; set; } 
}

public class Medicamento_Rubro
{
    private int id;
    private string rubro;

    #region Properties
    public int Id
    {
        get { return id; }
        set { id = value; }
    }

    public string Rubro
    {
        get { return rubro; }
        set { rubro = value; }
    }
    #endregion

}

public class Medicamento_Presentacion
{
    private int id;
    private string presentacion;

    #region Properties
    public int Id {
        get { return id; }
        set { id = value; }
    }
    public string Presentacion
    {
        get { return presentacion; }
        set { presentacion = value; }
    }

    #endregion
}

public class Medicamento_Deposito
{
    private int id;
    private string deposito;
    private bool _estado;

    #region Properties
    public int Id {
        get { return id; }
        set { id = value; }
    }

    public string Deposito {
        get { return deposito; }
        set { deposito = value; }
    }

    public bool Estado {
        get { return _estado; }
        set { _estado = value; }
    }

    #endregion
}

public class Medicamento_Medidas
{
    private int id;
    private string medida;

    #region Properties

    public int Id {
        get { return id; }
        set { id = value; }
    }

    public string Medida {
        get { return medida; }
        set { medida = value; }
    }

    #endregion
}

public class ControlStock
{
    private int stockMin;
    private int stockMax;
    private string medicamento;
    private string gramaje;
    private string presentacion;
    private string rubro;
    private string medida;
    private string deposito;
    private int stock;
    private int id;
    public string lote {get; set;}
    public long Insumo_Id { get; set; }
    public string STO_VCTO { get; set; }

    #region Properties
    public int StockMin
    {
        get { return stockMin; }
        set { stockMin = value; }
    }

    public string Medicamento
    {
        get { return medicamento; }
        set { medicamento = value; }
    }

    public string Gramaje
    {
        get { return gramaje; }
        set { gramaje = value; }
    }

    public string Presentacion
    {
        get { return presentacion; }
        set { presentacion = value; }
    }

    public string Rubro
    {
        get { return rubro; }
        set { rubro = value; }
    }

    public string Medida
    {
        get { return medida; }
        set { medida = value; }
    }

    public string Deposito
    {
        get { return deposito; }
        set { deposito = value; }
    }

    public int Stock
    {
        get { return stock; }
        set { stock = value; }
    }

    public int Id
    {
        get { return id; }
        set { id = value; }
    }

    public int StockMax
    {
        get { return stockMax; }
        set { stockMax = value; }
    }
    #endregion
}

public class Farmacia_Proveedores
{
    public string Id { get; set; }
    public string Nombre { get; set; }
    public string Telefono {get; set;}
    public string Direccion { get; set; }
    public string Cuit { get; set; }
    public string EnUso { get; set; }

    public string Rubro {get; set;}
    public string Contacto { get; set; }
    public string Localidad { get; set; }
    public string Celular { get; set; }

    public Farmacia_Proveedores() { }

    public Farmacia_Proveedores(string _Id, string _Nombre, string _Cuit = "99-99999999-9", string _Telefono = "9999-9999", string _Direccion = "S/N",
        string _EnUso = "N", string _Rubro = "")
    {
        Id = _Id;
        Nombre = _Nombre;
        Cuit = _Cuit;
        Telefono = _Telefono;
        Direccion = _Direccion;
        EnUso = _EnUso;
        Rubro = _Rubro;
    }
}

public class Farmacia_Remito_Cab
{
    public string Remito_Id { get; set; }
    public string Letra {get; set;}
    public string Sucursal {get;set;}
    public string Numero {get; set;}
    public string Proveedor {get; set;}
    public string Fecha {get; set;}
    public string Fecha_Carga {get; set;}
    public string Usuario {get;set;}
    public string Observaciones {get; set;}
}

public class Farmacia_Remito_Det
{
    public string Detalle_Id {get;set;}
    public int Remito_Id {get; set;}
    public int Insumo_Id {get; set;}
    public int Cantidad {get; set;}
    public decimal Precio_Compra {get; set;}
    public decimal Precio_Venta { get; set; }
    public int Deposito_Id {get; set;}
    public long Usuario {get; set;}
    public string FechaCompra {get; set;}
    public string FechaVencimiento { get; set; }
    public string Gramaje {get;set;}
    public string Medida {get; set;}
    public string Nombre {get;set;}
    public decimal Subtotal {get; set;}
    public string NroLote { get; set; }

    public Farmacia_Remito_Det() { }
}

public class Farmacia_Pedido_Pac_Cab
{

    private int _Pedido_Id;
    private long _NHC;
    private long _Servicio_Id;
    private long _Usuario_Id;
    private int _Sala_Id;
    private int _Cama_Id;
    private int _Internacion_Id;
    private string _Servicio_Nombre;

#region Properties

    public int Pedido_Id 
    {
        get { return _Pedido_Id; }
        set { _Pedido_Id = value ; }
    }

    public string Servicio_Nombre
    {
        get { return _Servicio_Nombre; }
        set { _Servicio_Nombre = value; }
    }

    public long NHC 
    {
        get { return _NHC; }
        set { _NHC = value; }
    }

    public long Servicio_Id
    {
        get { return _Servicio_Id; }
        set { _Servicio_Id = value; }
    }

    public long Usuario_Id
    {
        get { return _Usuario_Id; }
        set { _Usuario_Id = value; }
    }

    public int Sala_Id
    {
        get { return _Sala_Id; }
        set { _Sala_Id = value; }
    }

    public int Cama_Id
    {
        get { return _Cama_Id; }
        set { _Cama_Id = value; }
    }

    public int Internacion_Id
    {
        get { return _Internacion_Id; }
        set { _Internacion_Id = value; }
    }

#endregion

    public Farmacia_Pedido_Pac_Cab() 
    { 
    
    }

    public Farmacia_Pedido_Pac_Cab(int _PED_ID, long _SERV_ID, long _USU_ID)
    {
        Pedido_Id = _PED_ID;
        Servicio_Id = _SERV_ID;
        Usuario_Id = _USU_ID;
    }

}

public class Farmacia_Pedido_Pac_Det
{
    private int _Pedido_Id;
    private int _Insumo_Id;
    private int _Cantidad;
    private decimal _Precio;
    private int _Deposito_Id;
    private long _Usuario_Id;
    private string _Fecha;
    public string lote { get; set; }

    #region Properties

    public int Pedido_Id
    {
        get { return _Pedido_Id; }
        set { _Pedido_Id = value; }
    }

    public int Insumo_Id
    {
        get { return _Insumo_Id; }
        set { _Insumo_Id = value; }
    }

    public int Cantidad
    {
        get { return _Cantidad; }
        set { _Cantidad = value; }
    }

    public decimal Precio
    {
        get { return _Precio; }
        set { _Precio = value; }
    }

    public int Deposito_Id
    {
        get { return _Deposito_Id; }
        set { _Deposito_Id = value; }
    }

    public long Usuario_Id
    {
        get { return _Usuario_Id; }
        set { _Usuario_Id = value; }
    }

    public string Fecha
    {
        get { return _Fecha; }
        set { _Fecha = value; }
    }
    #endregion

    public Farmacia_Pedido_Pac_Det()
    { 
    
    }

    public Farmacia_Pedido_Pac_Det(int _PED_ID, int _INS_ID, int _CANT, int _DEP_ID, int _USU_ID, decimal _PRE)
    {
        Pedido_Id = _PED_ID;
        Insumo_Id = _INS_ID;
        Cantidad = _CANT;
        Deposito_Id = _DEP_ID;
        Usuario_Id = _USU_ID;
        Precio = _PRE;
    }
}

public class Farmacia_Pedido_Pac_Buscar
{
    private int _Pedido_Id;
    private long _NHC;
    private string _Servicio;
    private string _Sala;
    private string _Cama;
    private string _Paciente { get; set; }
    private string _Usuario { get; set; }
    private string _Fecha { get; set; }
    private int _Estado { get; set; }
//    private bool _Pendiente { get; set; }
    private int _Pendiente { get; set; }

    #region Properties
    public int Pedido_Id 
    {
        get { return _Pedido_Id; }
        set { _Pedido_Id = value; } 
    }

    public int Estado
    {
        get { return _Estado; }
        set { _Estado = value; }
    }

    public long NHC
    {
        get { return _NHC; }
        set { _NHC = value; }
    }

    public string Servicio
    {
        get { return _Servicio; }
        set { _Servicio = value; }
    }

    public string Sala
    {
        get { return _Sala; }
        set { _Sala = value; }
    }

    public string Cama
    {
        get { return _Cama; }
        set { _Cama = value; }
    }

    public string Paciente
    {
        get { return _Paciente; }
        set { _Paciente = value; }
    }

    public string Usuario
    {
        get { return _Usuario; }
        set { _Usuario = value; }
    }

    public string Fecha
    {
        get { return _Fecha; }
        set { _Fecha = value; }
    }

    //public bool Pendiente
    //{
    //    get { return _Pendiente; }
    //    set { _Pendiente = value; }
    //}

    public int Pendiente
    {
        get { return _Pendiente; }
        set { _Pendiente = value; }
    }


#endregion

    public Farmacia_Pedido_Pac_Buscar() { }
}

public class Farmacia_PPP_Cab
{ 
    public string Pedido_Id {get;set;}
    public string NHC  {get;set;}
    public string Fecha {get;set;}
    public string Paciente {get;set;}
    public string Servicio {get;set;}
    public string Sala_Id {get;set;}
    public string Cama_Id {get;set;}
    public string Cama {get;set;}
    public string Sala {get;set;}
    public string Servicio_Id {get;set;}
    public string Documento {get;set;}
    public string Telefono {get;set;}
    public long EntregaCabID { get; set; } //Nro de remito de la entrega
    public bool Pendiente { get; set; } //1 (true) Si el pedido esta pendiente, caso contrario 0
    public string foto { get; set; }
}

public class Farmacia_PPP_Det
{
    private int _Cantidad;
    private decimal _Precio;
    private string _Nombre;
    private string _Gramaje;
    private string _Medida;
    private string _Presentacion;
    private decimal _Subtotal;
    private int _Insumo_Id;
    private int _Pedido_Id;
    private int _Deposito_Id;
    private int _EnStock;
    private int _Entregado;
    public string Observaciones { get; set; }
    public bool Etiqueta { get; set; }
    public int Saldo { get; set; }
    public string NRO_LOTE { get; set; }
    #region Properties

    public int Cantidad 
    {
        get { return _Cantidad; }
        set { _Cantidad = value; }
    }

    public decimal Precio
    {
        get { return _Precio; }
        set { _Precio = value; }
    }

    public string Nombre
    {
        get { return _Nombre; }
        set { _Nombre = value; }
    }

    public string Gramaje
    {
        get { return _Gramaje; }
        set { _Gramaje = value; }
    }

    public string Medida
    {
        get { return _Medida; }
        set { _Medida = value; }
    }
    public string Presentacion
    {
        get { return _Presentacion; }
        set { _Presentacion = value; }
    }

    public decimal Subtotal
    {
        get { return _Subtotal; }
        set { _Subtotal = value; }
    }

    public int Insumo_Id
    {
        get { return _Insumo_Id; }
        set { _Insumo_Id = value; }
    }

    public int Pedido_Id
    {
        get { return _Pedido_Id; }
        set { _Pedido_Id = value; }
    }

    public int Deposito_Id
    {
        get { return _Deposito_Id; }
        set { _Deposito_Id = value; }
    }

    public int EnStock
    {
        get { return _EnStock; }
        set { _EnStock = value; }
    }

    public int Entregado
    {
        get { return _Entregado; }
        set { _Entregado = value; }
    }

    #endregion

    public Farmacia_PPP_Det() { }
    public string VENCIMIENTO { get; set; }
}

public class Farmacia_Egr_Cab { 
  public string REM_ID {get;set;}
  public string REM_NUMERO {get;set;}
  public string REM_SER_ID {get;set;}
  public string REM_SOC_ID {get;set;}
  public string REM_FECHA {get;set;}
  public string REM_FEC_INGRESO {get;set;}
  public string REM_USU_INGRESO {get;set;}
  public string PED_ID {get;set;}
  public string CAMA_ID {get;set;}
  public string SALA_ID { get; set; }
  public bool PENDIENTE { get; set; }
}

public class Farmacia_Egr_Detalle {

    private int _RED_REM_ID;
    private int _RED_ID;
    private int _DEPOSITO_ID;
    private int _INSUMO_ID;
    private int _CANTIDAD;
    private decimal _PRECIO;
    private string _OBSERVACIONES;
    private long _USUARIO_ID;
    private string _USUARIO;
    private string _RED_TIPO;
    private string _FECHA;
    private string _ESTADO;
    private int _NRO_ENTREGA;
    private int _Cant_Entrega;
    private bool _Etiqueta;
    public string lote;

    #region Properties

    public int NRO_ENTREGA
    {
        get { return _NRO_ENTREGA; }
        set { _NRO_ENTREGA = value; }
    }

    public int Cant_Entrega
    {
        get { return _Cant_Entrega; }
        set { _Cant_Entrega = value; }
    }

    public int CANTIDAD
    {
        get { return _CANTIDAD; }
        set { _CANTIDAD = value; }
    }

    public decimal PRECIO
    {
        get { return _PRECIO; }
        set { _PRECIO = value; }
    }

    public int RED_REM_ID
    {
        get { return _RED_REM_ID; }
        set { _RED_REM_ID = value; }
    }

    public int RED_ID
    {
        get { return _RED_ID; }
        set { _RED_ID = value; }
    }

    public int DEPOSITO_ID
    {
        get { return _DEPOSITO_ID; }
        set { _DEPOSITO_ID = value; }
    }
    public int INSUMO_ID
    {
        get { return _INSUMO_ID; }
        set { _INSUMO_ID = value; }
    }

    public string OBSERVACIONES
    {
        get { return _OBSERVACIONES; }
        set { _OBSERVACIONES = value; }
    }

    public long USUARIO_ID
    {
        get { return _USUARIO_ID; }
        set { _USUARIO_ID = value; }
    }

    public string USUARIO
    {
        get { return _USUARIO; }
        set { _USUARIO = value; }
    }

    public string RED_TIPO
    {
        get { return _RED_TIPO; }
        set { _RED_TIPO = value; }
    }

    public string FECHA
    {
        get { return _FECHA; }
        set { _FECHA = value; }
    }

    public string ESTADO
    {
        get { return _ESTADO; }
        set { _ESTADO = value; }
    }

    public bool Etiqueta
    {
        get { return _Etiqueta; }
        set { _Etiqueta = value; }
    }

    #endregion

    public Farmacia_Egr_Detalle() { }
}

public class Farmacia_PPS_Det_List
{
    public string DET_PED_ID { get; set; }
    public string DET_CANTIDAD { get; set; }
    public string STO_CANTIDAD { get; set; }
    public string STO_MINIMO { get; set; }
    public string DET_INS_ID { get; set; }
    public string REM_NOMBRE { get; set; }
    public string REM_GRAMAJE { get; set; }
    public string PRESENTACION { get; set; }
    public string MEDIDA { get; set; }
    public string MONODROGA { get; set; }
    public string LOTE { get; set; }
}

public class Farmacia_Dev_Pac_Det
{ 
    public string Detalle_Id {get;set;}
    public string Pedido_Id {get;set;}
    public string Insumo_Id {get;set;}
    public string Cantidad {get;set;}
    public string Precio {get;set;}
    public string Deposito_Id {get;set;}
    public string Usuario_Id {get;set;}
    public string Fecha {get;set;}
    public string Motivo { get; set; }
    public string Observacion { get; set; }
    public string Nombre { get; set; }
    public string NroLote { get; set; }
    public string Vencimiento { get; set; }
    public string Presentacion { get; set; }
    public int chk { get; set; }
}

public class Insumo_Via
{
    public int Id { get; set; }
    public string Via { get; set; }
    public int Estado { get; set; }
}

public class IM_Cab
{
    public string IM_Id { get; set; }
    public string NHC {get;set;}
    public string IdServicio {get;set;}
    public string IdCama {get;set;}
    public string IdMedico {get;set;}
    public string Fecha {get;set;}
    public bool StateId {get;set;}
    public string IdSala {get;set;}
    public string IdInternacion { get; set; }
}

public class IM_Det
{
    public string IM_Id { get; set; }
    public string Insumo_Id {get;set;}
    public string Presentacion {get;set;}
    public string Presentacion_Id {get;set;}
    public string Medida {get;set;}
    public string Medida_Id {get;set;}
    public string Via {get;set;}
    public string Via_Id {get;set;}
    public string Cantidad {get;set;}
    public string Cantidad_gr { get; set; }
    public string Horas {get;set;}
    public string Nombre {get;set;}
    public bool Ocultar {get;set;}
    public bool Vademe { get; set; }
    public bool EnHoras { get; set; }
    public string Observaciones { get; set; }
    public string Indicacion { get; set; }
    public int Estado { get; set; }
    public long idDetalleIndicacion { get; set; }
}

public class IM_Buscar {
    public string IM_Id { get; set; }
    public string Fecha { get; set; }
    public string Documento { get; set; }
    public string NHC { get; set; }
    public long AfiliadoId { get; set; }
    public string Servicio { get; set; }
    public string Nombre { get; set; }
    public string IdServicio { get; set; }
    public string IdCama { get; set; }
    public string IdSala { get; set; }
    public string Cama { get; set; }
    public string Sala { get; set; }
    public string IdMedico { get; set; }
    public string IdInternacion { get; set; }
    public string Telefono { get; set; }
    public string NroEntrega { get; set; }
    public string Medico { get; set; }
    public int Pendiente { get; set; }
    public string Diagnostico { get; set; }
}

public class IM_Ent_Det { 
    public string IM_Id { get; set; }
    public string Insumo_Id {get;set;}
    public string Nombre { get; set; }
    public string Medida {get;set;}
    public string Presentacion {get;set;}
    public decimal Cantidad {get;set;}
    public string Horas {get;set;}
    public decimal Total {get;set;}
    public string UnidadEnt {get;set;}
    public int Unidad_aEnt { get; set; }
    public int Cantidad_aEnt { get; set; }
    public string CantEnt {get;set;}
    public decimal Saldo {get;set;}
    public string Stock {get;set;}
    public string Indicacion { get; set; }
    public string Observacion { get; set; }
    public string Gramaje { get; set; }
    public int NroEntrega { get; set; }
    public bool Etiqueta { get; set; }
    public long DetalleId { get; set; }
    public string NRO_LOTE { get; set; }
    public int Cantidad_E { get; set; }
    public string VENCIMIENTO { get; set; }
    public string FEC_VENC { get; set; }
    public Lote[] NRO_LOTE_ARRAY { get; set; }
}


public class Lote
{
    public string FEC_VENC { get; set; }
    public string VENCIMIENTO { get; set; }
    public int comboId { get; set; }
    public string descripcion { get; set; }
    public string valor { get; set; }
    public string STO_VCTO { get; set; }
    public int Stock { get; set; }
    public string lote { get; set; }
}


public class internacion_paciente
{
    public string Apellido { get; set; }
    public string Documento { get; set; }
    public string Cuil { get; set; }
    public string ServicioId { get; set; }
    public string SalaId { get; set; }
    public string CamaId { get; set; }
    public string Sala { get; set; }
    public string Cama { get; set; }
    public string Servicio { get; set; }
    public string InternacionId { get; set; }
}


public class Farmacia_Movimiento_CtaCte {
    public Farmacia_Movimiento_CtaCte() { }

    public long Id { get; set; }
    public int CodigoMovimiento { get; set; }	//1 ingreso, 2 egreso, 3 inventario
    public string Descripcion { get; set; }
    public string NroLote { get; set; }
    public int InsumoId { get; set; }
    public int Cantidad { get; set; }
    public string Fecha { get; set; }
    public long PedidoId { get; set; }
    public int PedidoTipo { get; set; }
    public int UsuarioId { get; set; }
}

public class Farmacia_Movimiento_CtaCte_Buscar {

    public Farmacia_Movimiento_CtaCte_Buscar() { }

    public string Fecha { get; set; }
    public string Hora { get; set; }
    public int InsumoId { get; set; }
    public string Insumo { get; set; }
    public int Cantidad { get; set; }
    public long IdInventario { get; set; }
    public string lote { get; set; }
}

public class Farmacia_Laboratorio {
    public Farmacia_Laboratorio() { }

    private int _Id;
    private string _Laboratorio;
    private bool _Estado;

    #region Properties

    public int Id
    {
        get { return _Id; }
        set { _Id = value; }
    }

    public string Laboratorio
    {
        get { return _Laboratorio; }
        set { _Laboratorio = value; }
    }

    public bool Estado
    {
        get { return _Estado; }
        set { _Estado = value; }
    }

    #endregion 

}

public class PED_COMPRAS_CAB
{
    public long PED_COM_ID { get; set; }
    public long PED_COM_SERV_ID { get; set; } 
    public string PED_COM_FECHA { get; set; }
    public long PED_COM_USUARIO_ID { get; set; } 
    public bool PED_COM_BAJA { get; set; } 
    public int PED_COM_ESTADO { get; set; }
    public string PED_COM_SERV_DESC { get; set; }
    public string PED_COM_USU_DESC { get; set; }
    public bool PED_COM_PENDIENTE { get; set; }

    public PED_COMPRAS_CAB() { }

    public PED_COMPRAS_CAB(long _PED_COM_ID, long _PED_COM_SERV_ID, string _PED_COM_FECHA, long _PED_COM_USUARIO_ID,
        bool _PED_COM_BAJA, int _PED_COM_ESTADO,string _PED_COM_SERV_DESC = "" ,string _PED_COM_USU_DESC = "", bool _PED_COM_PENDIENTE = true)
    {
        PED_COM_ID = _PED_COM_ID;
        PED_COM_SERV_ID = _PED_COM_SERV_ID;
        PED_COM_FECHA = _PED_COM_FECHA;
        PED_COM_USUARIO_ID = _PED_COM_USUARIO_ID;
        PED_COM_BAJA = _PED_COM_BAJA;
        PED_COM_ESTADO = _PED_COM_ESTADO;
        PED_COM_SERV_DESC = _PED_COM_SERV_DESC;
        PED_COM_USU_DESC = _PED_COM_USU_DESC;
        PED_COM_PENDIENTE = _PED_COM_PENDIENTE;
    }
}

public class PED_COMPRAS_DET
{
    public long PED_COM_DET_ID { get; set; }
    public long PED_COM_ID { get; set; }
    public long PED_COM_DET_INS_ID { get; set; }
    public string PED_COM_DET_INS_DESC { get; set; }
    public int PED_COM_DET_CANTIDAD { get; set; }
    public string PED_COM_DET_OBS { get; set; }

    public PED_COMPRAS_DET() { }

    public PED_COMPRAS_DET(long _PED_COM_DET_ID, long _PED_COM_ID, long _PED_COM_DET_INS_ID, string _PED_COM_DET_INS_DESC, int _PED_COM_DET_CANTIDAD,
        string _PED_COM_DET_OBS)
    {
        PED_COM_DET_ID = _PED_COM_DET_ID;
        PED_COM_ID = _PED_COM_ID;
        PED_COM_DET_INS_ID = _PED_COM_DET_INS_ID;
        PED_COM_DET_INS_DESC = _PED_COM_DET_INS_DESC;
        PED_COM_DET_CANTIDAD = _PED_COM_DET_CANTIDAD;
        PED_COM_DET_OBS = _PED_COM_DET_OBS;
    }
}


public class FarmaciaList:List<farmacia>
{

}

public class BonoContribucionCabecera_List : List<Bono_Contribucion_Cabecera>
{

}

public class BonoContribucionDetalles_List : List<Bono_Contribucion_Detalles>
{

}