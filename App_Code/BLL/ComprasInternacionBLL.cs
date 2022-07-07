using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;

/// <summary>
/// Descripción breve de ComprasInternacionBLL
/// </summary>
public class ComprasInternacionBLL
{
	public ComprasInternacionBLL()
	{
		//
		// TODO: Agregar aquí la lógica del constructor
		//
	}

     public void BajaAdjunto(long idArchivo)
    {
        ComprasDALTableAdapters.QueriesTableAdapter adapter = new ComprasDALTableAdapters.QueriesTableAdapter();
        try
        {
            adapter.H2_Compras_BajaAdjunto(idArchivo);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


     public void BajaAdjuntoPresupuesto(long idArchivo)
     {

         ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
         try
         {
             adapter.H2_Compras_BajaAdjunto_Internacion(idArchivo);
         }
         catch (SqlException ex)
         {
             throw new Exception(ex.Message);
         }
     }

    public List<Compras_Adjuntos> Adjuntos_List(long ExpId)
    {
        ComprasDALTableAdapters.H2_COMPRAS_ADJUNTOS_LISTTableAdapter adapter = new ComprasDALTableAdapters.H2_COMPRAS_ADJUNTOS_LISTTableAdapter();
        ComprasDAL.H2_COMPRAS_ADJUNTOS_LISTDataTable aTable = adapter.GetData(ExpId);
        List<Compras_Adjuntos> Lista = new List<Compras_Adjuntos>();
        foreach (ComprasDAL.H2_COMPRAS_ADJUNTOS_LISTRow row in aTable.Rows)
        {
            Compras_Adjuntos adjunto = new Compras_Adjuntos();
            adjunto.IdDetalle = row.IdDetalle;
            adjunto.ExpId = row.ExpId;
            adjunto.RutaArchivo = row.RutaArchivo;
            adjunto.Estado = row.Estado;
            adjunto.FechaSistema = row.FechaSistema.ToString();
            Lista.Add(adjunto);
        }
        return Lista;
    }


    /// <summary>
    ///trae las imagenes del presupuesto 
    /// </summary>
    /// <param name="ExpPreDetId">id del presupuesto</param>
    /// <returns></returns>
    public List<Compras_Adjuntos> Adjuntos_List_Internacion(long ExpPreDetId, int tipo)
    {

        ComprasInternacionTableAdapters.H2_COMPRAS_ADJUNTOS_LIST_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_COMPRAS_ADJUNTOS_LIST_INTERNACIONTableAdapter();
        ComprasInternacion.H2_COMPRAS_ADJUNTOS_LIST_INTERNACIONDataTable aTable = adapter.GetData(ExpPreDetId,tipo);
        List<Compras_Adjuntos> Lista = new List<Compras_Adjuntos>();
        foreach (ComprasInternacion.H2_COMPRAS_ADJUNTOS_LIST_INTERNACIONRow row in aTable.Rows)
        {
            Compras_Adjuntos adjunto = new Compras_Adjuntos();
            adjunto.IdDetalle = row.IdDetalle;
            adjunto.ExpId = row.ExpId;
            adjunto.ExpPedId = row.ExpPedId;
            adjunto.ExpPreDetId = row.ExpPreDetId;
            adjunto.RutaArchivo = row.RutaArchivo;
            adjunto.Estado = row.Estado;
            adjunto.FechaSistema = row.FechaSistema.ToString();
            //adjunto.rutaArchivoConfig = System.Web.HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings.Get("rutaArchivosComprasInternacion"));

            String direcionIPfirmas = ConfigurationManager.AppSettings.Get("direcionIPfirmas");
            String Ruta = ConfigurationManager.AppSettings.Get("rutaArchivosComprasInternacion");
            adjunto.rutaArchivoConfig = Ruta;
            //adjunto.rutaArchivoConfig = ConfigurationManager.AppSettings.Get("rutaArchivosComprasInternacion");
            Lista.Add(adjunto);
        }
        return Lista;
    }

    public List<Compras_Reporte_Gastos> REPORTE_DE_GASTOS_COMPRAS_INTERNACION(string desde, string hasta, int proveedor, string insumo)
    {

        ComprasInternacionTableAdapters.H2_REPORTE_DE_GASTOS_COMPRAS_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_REPORTE_DE_GASTOS_COMPRAS_INTERNACIONTableAdapter();
        ComprasInternacion.H2_REPORTE_DE_GASTOS_COMPRAS_INTERNACIONDataTable aTable = adapter.GetData(desde, hasta, proveedor, insumo);
        List<Compras_Reporte_Gastos> Lista = new List<Compras_Reporte_Gastos>();
        foreach (ComprasInternacion.H2_REPORTE_DE_GASTOS_COMPRAS_INTERNACIONRow row in aTable.Rows)
        {
            Compras_Reporte_Gastos adjunto = new Compras_Reporte_Gastos();

            if(!row.IsFechaPedidoNull())
            adjunto.FechaPedido = row.FechaPedido.ToShortDateString();

            adjunto.InsumoDescripción = row.InsumoDescripción;
            adjunto.Proveedor = row.Proveedor;
            adjunto.CantidadRecibida = row.CantidadRecibida;

            if(!row.IsPrecioUnitarioNull())
            adjunto.PrecioUnitario = row.PrecioUnitario;

            if(!row.IsPrecioTotalNull())
            adjunto.PrecioTotal = row.PrecioTotal;

            if(!row.IsFechaRemitoFacturaNull())
                adjunto.FechaRemitoFactura = row.FechaRemitoFactura.ToShortDateString();

            Lista.Add(adjunto);
        }
        return Lista;
    }
    //guarda la ruta e info del archivo que se sube en la BD
    //este metodo se usabapara compras internacion, pero como no se implemento se modifico para usarse en reclamos
    public void Compras_Adjunto_Insert(Compras_Adjuntos adjunto)
    {

        ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
        try
        {
            adapter.H2_Reclamos_Adjuntos(adjunto.IdReclamo, adjunto.RutaArchivo, adjunto.nombreArchivo);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    //guarda la ruta e info del archivo que se sube en la BD
    // este se genero para volver a implemenatar compras internaicon
    public void Compras_Internacion_Adjunto_Insert(Compras_Adjuntos adjunto)
    {

        ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
        try
        {
            adapter.H2_Compras_Adjuntos_Receta_Presupuesto_Insert_Internacion(adjunto.IdDetalle,adjunto.ExpId,adjunto.ExpPedId,adjunto.ExpPreDetId,adjunto.RutaArchivo,adjunto.Estado,adjunto.RemId);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<compras_insumos_combo> List_InsumosCombo(bool Todos)
    {
        List<compras_insumos_combo> list = new List<compras_insumos_combo>();
        try
        {
            ComprasDALTableAdapters.H2_COMPRAS_LIST_INSUMOS_COMBOTableAdapter adapter = new ComprasDALTableAdapters.H2_COMPRAS_LIST_INSUMOS_COMBOTableAdapter();
            ComprasDAL.H2_COMPRAS_LIST_INSUMOS_COMBODataTable aTable = adapter.GetData(Todos);
            foreach (ComprasDAL.H2_COMPRAS_LIST_INSUMOS_COMBORow row in aTable.Rows)
                list.Add(new compras_insumos_combo(row.INS_ID, row.INS_DESCRIPCION.Trim(),row.INS_RUBRO));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<compras_insumos_combo> List_InsumosCombo_by_Desc(string Descripcion)
    {
        List<compras_insumos_combo> list = new List<compras_insumos_combo>();
        try
        {
            ComprasDALTableAdapters.H2_COMPRAS_LIST_INSUMOS_COMBO_BY_DESCTableAdapter adapter = new ComprasDALTableAdapters.H2_COMPRAS_LIST_INSUMOS_COMBO_BY_DESCTableAdapter();
            ComprasDAL.H2_COMPRAS_LIST_INSUMOS_COMBO_BY_DESCDataTable aTable = adapter.GetData(Descripcion);
            foreach (ComprasDAL.H2_COMPRAS_LIST_INSUMOS_COMBO_BY_DESCRow row in aTable.Rows)
                list.Add(new compras_insumos_combo(row.INS_ID, row.INS_DESCRIPCION.Trim(),row.INS_RUBRO));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public compras_insumo_info List_Insumo_byId(int IdInsumo)
    {
        try
        {
            ComprasDALTableAdapters.H2_COMPRAS_INSUMO_BY_IDTableAdapter adapter = new ComprasDALTableAdapters.H2_COMPRAS_INSUMO_BY_IDTableAdapter();
            ComprasDAL.H2_COMPRAS_INSUMO_BY_IDDataTable aTable = adapter.GetData(IdInsumo);
            foreach (ComprasDAL.H2_COMPRAS_INSUMO_BY_IDRow row in aTable.Rows)
                return new compras_insumo_info(row.UltimoPrecio, row.StockActual,row.INS_RUBRO);
            return null;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }      
    }

    public List<compras_deposito> List_Depositos(bool Todos)
    {
        try
        {
            List<compras_deposito> list = new List<compras_deposito>();
            ComprasDALTableAdapters.H2_COMPRAS_DEPOSITOS_LISTTableAdapter adapter = new ComprasDALTableAdapters.H2_COMPRAS_DEPOSITOS_LISTTableAdapter();
            ComprasDAL.H2_COMPRAS_DEPOSITOS_LISTDataTable aTable = adapter.GetData(Todos);
            foreach (ComprasDAL.H2_COMPRAS_DEPOSITOS_LISTRow row in aTable.Rows)
                list.Add(new compras_deposito(row.id, row.deposito, row.Estado));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void DeleteDetallesRemito(long RemitoId)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_COMPRAS_REMITOS_DET_DELETE_INTERNACION(RemitoId);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void DeleteDetallesRemito_ADM(long RemitoId)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_COMPRAS_REMITOS_DET_DELETE_ADM(RemitoId);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long Insert_Remitos_Cabecera(compras_remito_cabecera cab)
    {
        try
        {
            if (cab.REM_I_ID > 0) DeleteDetallesRemito(cab.REM_I_ID); //Modificacion

            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_COMPRAS_REMITOS_ING_CAB_INSERT_INTERNACION(cab.REM_I_ID, cab.REM_I_LETRA, cab.REM_I_SUCURSAL, cab.REM_I_NUMERO, cab.REM_I_PRV_ID, Convert.ToDateTime(cab.REM_I_FECHA),
                cab.REM_I_USUARIO, cab.REM_I_OBS, cab.REM_USUARIO_MOD, cab.REM_I_LETRA_FACT,cab.REM_I_SUCURSAL_FACT,cab.REM_I_NUMERO_FACT,cab.REM_I_NUMERO_ORDEN_COMPRA);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else throw new Exception("Error al insertar cabecera.");
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public long Insert_Remitos_Cabecera_ADM(compras_remito_cabecera cab)
    {
        try
        {
            //if (cab.REM_I_ID > 0) DeleteDetallesRemito_ADM(cab.REM_I_ID); //Modificacion

            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_COMPRAS_REMITOS_ING_CAB_INSERT_ADM(cab.REM_I_ID, cab.REM_I_LETRA, cab.REM_I_SUCURSAL, cab.REM_I_NUMERO, cab.REM_I_PRV_ID, Convert.ToDateTime(cab.REM_I_FECHA),
                cab.REM_I_USUARIO, cab.REM_I_OBS, cab.REM_USUARIO_MOD, cab.REM_I_LETRA_FACT, cab.REM_I_SUCURSAL_FACT, cab.REM_I_NUMERO_FACT, cab.REM_I_NUMERO_ORDEN_COMPRA,cab.REM_TIPO);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else throw new Exception("Error al insertar cabecera.");
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public long Insert_Remitos_Detalle(compras_remito_detalle_internacion det)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_COMPRA_FAR_REMITOS_ING_DET_INSERT_INTERNACION(det.RED_REM_ID, det.PDT_ID, det.RED_CANTIDAD_PEDIDA,det.RED_CANTIDAD_RECIBIDA , det.RED_CANTIDAD_SALDO,det.RED_PRECIO, det.RED_DEP_ID,
                "0", Convert.ToDateTime(det.FechaVencimiento), det.RED_INS_RUBRO, det.RED_INSUMO_DESCRIPCION,det.Tipo,det.RED_PRECIO);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else throw new Exception("Error al insertar detalle.");
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long Insert_Remitos_Detalle_ADM(compras_remito_detalle_administracion det)
    {   
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_COMPRA_FAR_REMITOS_ING_DET_INSERT_ADM(det.COM_REMITO_ID, det.COM_ADM_INS_PEDIR_ID, det.COM_ADM_INS_PEDIR_CANT_PED, 
                det.COM_ADM_CANTIDAD_RECIBIDA, det.COM_ADM_CANTIDAD_SALDO, det.COM_ADM_INS_PRECIO, 0

                //,"0",Convert.ToDateTime("01/01/1900")
                ,det.PDT_LOTE, Convert.ToDateTime(det.PDT_FECHA_VENCIMIENTO)
                , 0, det.COM_ADM_INS_PEDIR_INS_NOM,det.Tipo,0);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else throw new Exception("Error al insertar detalle.");
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    /// <summary>
    /// verifica si un insumo pedido esta auditado o no de a uno a la vez
    /// </summary>
    /// <param name="PDT_ID">id del insumo pedido en la tabla [EXP_PEDIDOS_DET_INTERNACION]</param>
    /// <returns>0 no esta auditado 1 si</returns>
    public long COMPRAS_CHEKEAR_AUDITORIA_INTERNACION(long PDT_ID)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_COMPRAS_CHEKEAR_AUDITORIA_INTERNACION(PDT_ID);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else throw new Exception("Error al comprobar auditoria.");
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }



    /// <summary>
    /// verifica si un insumo pedido esta auditado o no de a varios a la vez
    /// </summary>
    /// <param name="idsPedidos">lista de ids pedidos en la tabla [EXP_PEDIDOS_DET_INTERNACION]</param>
    /// <returns>string con los ids auditados</returns>
    public List<idsOrden> COMPRAS_CHEKEAR_AUDITORIA_INTERNACION_TODOS(string idsPedidos)
    {
        try
        {
            List<idsOrden> lista = new List<idsOrden>();
            ComprasInternacionTableAdapters.H2_COMPRAS_CHEKEAR_AUDITORIA_INTERNACION_TODOSTableAdapter adapter = new ComprasInternacionTableAdapters.H2_COMPRAS_CHEKEAR_AUDITORIA_INTERNACION_TODOSTableAdapter();
            ComprasInternacion.H2_COMPRAS_CHEKEAR_AUDITORIA_INTERNACION_TODOSDataTable table = new ComprasInternacion.H2_COMPRAS_CHEKEAR_AUDITORIA_INTERNACION_TODOSDataTable();
            table = adapter.GetData(idsPedidos);
            foreach (ComprasInternacion.H2_COMPRAS_CHEKEAR_AUDITORIA_INTERNACION_TODOSRow row in table.Rows)
            {
                idsOrden id = new idsOrden();
                id.id = Convert.ToInt64(row.PDT_ID);
                lista.Add(id);
            }
            return lista;
            //object Ids = adapter.H2_COMPRAS_CHEKEAR_AUDITORIA_INTERNACION_TODOS(idsPedidos);
            //if (Ids != null) return Convert.ToString(Ids.ToString());
            //else throw new Exception("Error al comprobar auditoria.");
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long COMPRAS_CHEKEAR_SI_BORRA_PRESUPUESTO_INTERNACION(long EXP_PED_ID)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_COMPRAS_CHEKEAR_SI_BORRA_PRESUPUESTO_INTERNACION(EXP_PED_ID);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else throw new Exception("Error al comprobar auditoria.");
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long COMPRAS_CHEKEAR_PRESUPUESTO_ENVIADO_INTERNACION(long PDT_ID)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_COMPRAS_CHEKEAR_PRESUPUESTO_ENVIADO_INTERNACION(PDT_ID);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else throw new Exception("Error al comprobar auditoria.");
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public int Existe_Remito(compras_remito_cabecera cab)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_COMPRAS_EXISTE_REMITO_INTERNACION(cab.REM_I_LETRA, cab.REM_I_SUCURSAL, cab.REM_I_NUMERO, cab.REM_I_PRV_ID);
            if (Id != null) return Convert.ToInt32(Id.ToString());
            else return 0;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public int Existe_Orden_Compra(int NordenCompra, int tipo)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_Existe_Orden_Compra(NordenCompra, tipo);
            if (Id != null) return Convert.ToInt32(Id.ToString());
            else return 0;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<compras_remito_buscar> Remitos_List(string Desde, string Hasta, int ProveedorId,string Letra, int Sucursal, int Numero,
        string Letra_Fact, int Sucursal_Fact, int Numero_Fact, int Ncompra, int Farmacia)
    
{
        try
        {
            List<compras_remito_buscar> list = new List<compras_remito_buscar>();

            ComprasInternacionTableAdapters.H2_COMPRAS_LIST_REMITOS_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_COMPRAS_LIST_REMITOS_INTERNACIONTableAdapter();
            ComprasInternacion.H2_COMPRAS_LIST_REMITOS_INTERNACIONDataTable aTable = adapter.GetData(Convert.ToDateTime(Desde), Convert.ToDateTime(Hasta), ProveedorId, Letra, Sucursal, Numero,
                Letra_Fact, Sucursal_Fact, Numero_Fact,Ncompra,Farmacia);
            foreach (ComprasInternacion.H2_COMPRAS_LIST_REMITOS_INTERNACIONRow row in aTable.Rows)
                list.Add(new compras_remito_buscar((int)row.Remito_ID,row.Letra,row.Sucursal,row.Numero,row.NroProveedor,
                    row.Fecha.ToShortDateString(), row.Observaciones, row.Proveedor, row.Letra_Fact, row.Sucursal_Fact, row.Numero_Fact, row.Ncompra,row.REM_TIPO,row.total, row.totalADM));
            return list;
        }
        catch(SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    //public List<expediente_pedidos_det_internacion> Traer_Detalles_Orden_Compra(int NordenCompra)
         public List<compras_remito_detalle_internacion> Traer_Detalles_Orden_Compra(int NordenCompra)
    {
        try
        {
            List<compras_remito_detalle_internacion> list = new List<compras_remito_detalle_internacion>();

            ComprasInternacionTableAdapters.H2_Traer_Detalles_Orden_Compra_InternacionTableAdapter adapter = new ComprasInternacionTableAdapters.H2_Traer_Detalles_Orden_Compra_InternacionTableAdapter();
            ComprasInternacion.H2_Traer_Detalles_Orden_Compra_InternacionDataTable aTable = adapter.GetData(NordenCompra);
            foreach (ComprasInternacion.H2_Traer_Detalles_Orden_Compra_InternacionRow row in aTable.Rows)
            {

                compras_remito_detalle_internacion item = new compras_remito_detalle_internacion();
                //item.PDT_ID = row.PDT_ID;
                //item.RED_PRECIO = row.PDT_IMPORTE;
                //item.RED_INSUMO_DESCRIPCION = row.PDT_INS;
                //item.RED_CANTIDAD_PEDIDA = row.PDT_CANTIDAD;
                //item.Tipo = row.Tipo;


                //if (!row.IsRED_CANTIDAD_SALDO_TOTALNull())
                //    item.RED_CANTIDAD_SALDO_TOTAL = row.RED_CANTIDAD_SALDO_TOTAL;

                //if (!row.IsRED_CANTIDAD_SALDONull())
                //    item.RED_CANTIDAD_SALDO = row.RED_CANTIDAD_SALDO;
                //else
                //    item.RED_CANTIDAD_SALDO = -1;

                //if (!row.IsRED_CANTIDAD_RECIBIDANull())
                //    item.RED_CANTIDAD_RECIBIDA = row.RED_CANTIDAD_RECIBIDA;
                //else
                //    item.RED_CANTIDAD_RECIBIDA = 0;
                item.PDT_ID = row.INSUMO;
                item.RED_CANTIDAD_PEDIDA = row.CANTIDAD_PEDIDA;
                item.RED_CANTIDAD_RECIBIDA = row.CANTIDAD_RECIBIDA;
                item.RED_PRECIO = row.PRECIO_POR_UNIDAD;
                item.RED_CANTIDAD_SALDO = row.SALDO;
                item.Tipo = row.TIPO;
                item.EXP_PED_ID = row.EXP_PED_ID;
                item.EXP_PED_EXP_ID = row.EXP_PED_EXP_ID;
                item.NRO_LOTE = "0";

                if (!row.IsPRECIONull())
                    item.RED_PRECIO = row.PRECIO;

                list.Add(item);
            }
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    //trae detalle de ordenes de compra de administracion
         public List<compras_remito_detalle_administracion> Traer_Detalles_Orden_Compra_administracion(int NordenCompra)
         {
             try
             {
                 List<compras_remito_detalle_administracion> list = new List<compras_remito_detalle_administracion>();

                 ComprasInternacionTableAdapters.H2_Traer_Detalles_Orden_Compra_administracionTableAdapter adapter = new ComprasInternacionTableAdapters.H2_Traer_Detalles_Orden_Compra_administracionTableAdapter();
                 ComprasInternacion.H2_Traer_Detalles_Orden_Compra_administracionDataTable aTable = adapter.GetData(NordenCompra);
                 foreach (ComprasInternacion.H2_Traer_Detalles_Orden_Compra_administracionRow row in aTable.Rows)
                 {

                     compras_remito_detalle_administracion item = new compras_remito_detalle_administracion();
                     item.COM_ADM_INS_PEDIR_ID = row.COM_ADM_INS_PEDIR_ID;
                     item.COM_ADM_INS_PEDIR_ORD_CAB_ID = row.COM_ADM_INS_PEDIR_ORD_CAB_ID;
                     item.COM_ADM_INS_PEDIR_PED_ID = row.COM_ADM_INS_PEDIR_PED_ID;
                     item.COM_ADM_INS_PEDIR_PRV_ID = row.COM_ADM_INS_PEDIR_PRV_ID;
                     item.COM_ADM_INS_PEDIR_CANT_PED = row.COM_ADM_INS_PEDIR_CANT_PED;

                     if (!row.IsRED_CANTIDAD_RECIBIDANull()) { item.COM_ADM_INS_PEDIR_CANTIDAD_RECIBIDA = row.RED_CANTIDAD_RECIBIDA; } else { item.COM_ADM_INS_PEDIR_CANTIDAD_RECIBIDA = 0; }
                     
                     item.COM_ADM_INS_PEDIR_CANTIDAD_SALDO = row.RED_CANTIDAD_SALDO;

                     item.COM_ADM_INS_PEDIR_USU_ID = row.COM_ADM_INS_PEDIR_USU_ID;
                     item.COM_ADM_INS_PEDIR_INS_ID = row.COM_ADM_INS_PEDIR_INS_ID;
                     item.COM_ADM_INS_PEDIR_INS_NOM = row.COM_ADM_INS_PEDIR_INS_NOM;
                     item.enviado = Convert.ToBoolean(row.enviado);
                     item.Tipo = row.Tipo;

                     if(!row.IsprecioNull())
                     item.COM_ADM_INS_PEDIR_PRECIO_COMPRA_ACTUAL = Convert.ToDecimal(row.precio);
                     
                     if (!row.IsprecioNull())
                         item.COM_ADM_INS_PRECIO = row.precio;
                     else
                         item.COM_ADM_INS_PRECIO = 0;

                     list.Add(item);
                 }
                 return list;
             }
             catch (SqlException ex)
             {
                 throw new Exception(ex.Message);
             }
         }

    public compras_remito_cabecera_list Remito_List_Cab_Id(long RemitoId)
    {
        compras_remito_cabecera_list obj = new compras_remito_cabecera_list();
        long EXP_ID = 0;
        long EXP_PED_ID = 0;
        //try
        //{
            ComprasInternacionTableAdapters.H2_COMPRAS_REMITO_CAB_LIST_ID_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_COMPRAS_REMITO_CAB_LIST_ID_INTERNACIONTableAdapter();
            ComprasInternacion.H2_COMPRAS_REMITO_CAB_LIST_ID_INTERNACIONDataTable aTable = adapter.GetData(RemitoId);
            foreach (ComprasInternacion.H2_COMPRAS_REMITO_CAB_LIST_ID_INTERNACIONRow row in aTable.Rows)
            {
                if (!row.IsEXP_IDNull()) { EXP_ID = row.EXP_ID; }
                if (!row.IsEXP_PED_IDNull()) { EXP_PED_ID = row.EXP_PED_ID; }

                obj = new compras_remito_cabecera_list(EXP_ID, EXP_PED_ID, row.RemitoId, row.Letra, row.Sucursal, row.Numero, row.ProveedorId, row.Fecha.ToShortDateString(), row.UsuarioId,
                    row.Observaciones, row.Proveedor, row.Usuario, row.Letra_Fact, row.Sucursal_Fact, row.Numero_Fact, row.Numero_Orden_Compra, row.TIPO);
            }
            return obj;
            
        
        //catch (SqlException ex)
        //{
        //    throw new Exception(ex.Message);
        //}
    }


    public compras_remito_cabecera_list traer_exp_ped_from_ord_comp(long ordenComp)
    {
        compras_remito_cabecera_list obj = new compras_remito_cabecera_list();
        long EXP_ID = 0;
        long EXP_PED_ID = 0;
        //try
        //{
        ComprasInternacionTableAdapters.SP_traer_exp_ped_from_ord_compTableAdapter adapter = new ComprasInternacionTableAdapters.SP_traer_exp_ped_from_ord_compTableAdapter();
        ComprasInternacion.SP_traer_exp_ped_from_ord_compDataTable aTable = adapter.GetData(ordenComp);
        foreach (ComprasInternacion.SP_traer_exp_ped_from_ord_compRow row in aTable.Rows)
        {
            if (!row.IsEXP_IDNull()) { EXP_ID = row.EXP_ID; }
            if (!row.IsEXP_PED_IDNull()) { EXP_PED_ID = row.EXP_PED_ID; }

            obj.EXP_ID = EXP_ID;
            obj.EXP_PED_ID = EXP_PED_ID;
        }
        return obj;


        //catch (SqlException ex)
        //{
        //    throw new Exception(ex.Message);
        //}
    }

    public List<compras_remito_detalle> Remito_List_Det_Id(long RemitoId)
    {
        try
        {
            List<compras_remito_detalle> list = new List<compras_remito_detalle>();
            ComprasInternacionTableAdapters.H2_COMPRAS_REMITO_DET_ID_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_COMPRAS_REMITO_DET_ID_INTERNACIONTableAdapter();
            ComprasInternacion.H2_COMPRAS_REMITO_DET_ID_INTERNACIONDataTable aTable = adapter.GetData(RemitoId);
            int InsumoInternacion;
            string InsumoAdministracion;

            foreach (ComprasInternacion.H2_COMPRAS_REMITO_DET_ID_INTERNACIONRow row in aTable.Rows)
            {
                if (!row.IsInsumoInternacionNull()){ InsumoInternacion = row.InsumoInternacion; }
                else { InsumoInternacion = 0; }

                if (!row.IsInsumoNull()) { InsumoAdministracion = row.Insumo; }
                else { InsumoAdministracion = ""; }
                decimal precio = 0;

                if (!row.IsPrecioNull())
                    precio = row.Precio;
                list.Add(new compras_remito_detalle(row.RemitoId, row.InsumoId, row.CantidadUnidades, precio, row.DepositoId, row.NroLote, InsumoAdministracion, row.FechaVencimiento.ToShortDateString(), row.RUBRO_ID, InsumoInternacion,row.PrecioADM,row.RED_ID,row.RED_ID_REAL));
            }
                   
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void Remito_Baja(long RemitoId, long UsuarioMod)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_COMPRAS_REMITOS_BAJA_INTERNACION(RemitoId, UsuarioMod);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public void actualizarPrecioRemito(List<compras_remito> lista)// aca
    {
        try
        {

            foreach (compras_remito item in lista)
            {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_ACTUALIZAR_PRECIO_REMITO(item.RED_ID,item.RED_PRECIO);
            }
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<compras_expediente_estado> Expediente_Estado_List(bool Todos)
    {
        try
        {
            List<compras_expediente_estado> list = new List<compras_expediente_estado>();
            ComprasDALTableAdapters.H2_COMPRAS_EXPEDIENTE_ESTADO_LISTTableAdapter adapter = new ComprasDALTableAdapters.H2_COMPRAS_EXPEDIENTE_ESTADO_LISTTableAdapter();
            ComprasDAL.H2_COMPRAS_EXPEDIENTE_ESTADO_LISTDataTable aTable = adapter.GetData(Todos);
            foreach (ComprasDAL.H2_COMPRAS_EXPEDIENTE_ESTADO_LISTRow row in aTable.Rows)
                list.Add(new compras_expediente_estado(row.Expediente_Estado_Id, row.Expediente_Estado_Desc, row.Expediente_Estado_Baja));
            return list;              
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<compras_expediente_diagnostico> Expediente_Diagnostico_List(bool Todos)
    {
        try
        {
            List<compras_expediente_diagnostico> list = new List<compras_expediente_diagnostico>();
            ComprasDALTableAdapters.H2_COMPRAS_DIAGNOSTICOS_LISTTableAdapter adapter = new ComprasDALTableAdapters.H2_COMPRAS_DIAGNOSTICOS_LISTTableAdapter();
            ComprasDAL.H2_COMPRAS_DIAGNOSTICOS_LISTDataTable aTable = adapter.GetData(Todos);
            foreach (ComprasDAL.H2_COMPRAS_DIAGNOSTICOS_LISTRow row in aTable.Rows)
                list.Add(new compras_expediente_diagnostico((int)row.Diagnostico_Id, row.Diagnostico_Desc, row.Diagnostico_Baja));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public expediente_cab Expediente_Cab_List_byId(long ExpId)
    {
        try
        {

            ComprasInternacionTableAdapters.H2_EXPEDIENTES_LIST_BY_ID_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_EXPEDIENTES_LIST_BY_ID_INTERNACIONTableAdapter();
            ComprasInternacion.H2_EXPEDIENTES_LIST_BY_ID_INTERNACIONDataTable aTable = adapter.GetData(ExpId);
            foreach (ComprasInternacion.H2_EXPEDIENTES_LIST_BY_ID_INTERNACIONRow row in aTable.Rows)
            {
                string EXP_FEC_NAC = string.Empty;
                string EXP_VENC_FECHA = string.Empty;
                if (!row.IsEXP_FEC_NACNull()) EXP_FEC_NAC = row.EXP_FEC_NAC.ToShortDateString();
                if (!row.IsEXP_VENC_FECHANull()) EXP_VENC_FECHA = row.EXP_VENC_FECHA.ToShortDateString();

                TimeSpan ts = DateTime.Now.Date - row.EXP_FEC_NAC;

                int anios = ts.Days / 365;
                int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                //int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
                string str_anios, str_meses;

                if (anios != 1) str_anios = " Años ";
                else str_anios = " Año ";
                if (meses != 1) str_meses = " Meses ";
                else str_meses = " Mes ";

                 var Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

                return new expediente_cab(row.EXP_ID, row.EXP_TIPO_DOC, row.EXP_NRO_DOC, row.EXP_NOMBRE, row.EXP_DIRECCION, row.EXP_COD_POST, row.EXP_NHC, row.EXP_SEC_ID,
                    row.EXP_OBS, row.EXP_GRU_ID, row.EXP_TRAB_EMPR, row.EXP_TRAB_CUIT, row.EXP_TRAB_DIR, row.EXP_DIS_ID, row.EXP_DOC_DISCA, row.EXP_DOC_SUEL,
                    row.EXP_DOC_DNI, row.EXP_DOC_CERT, row.EXP_TELEFONO, row.EXP_EST_ID, row.EXP_FECHA.ToShortDateString(), row.EXP_USUARIO,
                    EXP_FEC_NAC, EXP_VENC_FECHA, row.Calle, row.Numero, row.Piso, row.Depto, row.CP, row.Localidad, row.Provincia, row.Celular, row.Telefono, Edad_Format, row.AfiliadoID);
            }
            return null;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        } 
    }

    public List<int> Expediente_Patologias_List_by_ExpId(long ExpId)
    {
        try
        {
            List<int> list = new List<int>();
            ComprasInternacionTableAdapters.H2_EXPEDIENTES_PATOLOGIAS_LIST_BY_EXPID_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_EXPEDIENTES_PATOLOGIAS_LIST_BY_EXPID_INTERNACIONTableAdapter();
            ComprasInternacion.H2_EXPEDIENTES_PATOLOGIAS_LIST_BY_EXPID_INTERNACIONDataTable aTable = adapter.GetData(ExpId);
            foreach (ComprasInternacion.H2_EXPEDIENTES_PATOLOGIAS_LIST_BY_EXPID_INTERNACIONRow row in aTable.Rows)
                list.Add(row.EXP_PAT_PAT_ID);
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long Expediente_Cab_Insert(expediente_cab expediente)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object ExpId = adapter.H2_EXPEDIENTES_CAB_INSERT_INTERNACION(expediente.EXP_ID, expediente.EXP_TIPO_DOC, expediente.EXP_NRO_DOC, expediente.EXP_NOMBRE, expediente.EXP_DIRECCION, expediente.EXP_COD_POST,
                expediente.EXP_NHC, expediente.EXP_SEC_ID, expediente.EXP_OBS, expediente.EXP_GRU_ID, expediente.EXP_TRAB_EMPR, expediente.EXP_TRAB_CUIT, expediente.EXP_TRAB_DIR, 0,
                1, expediente.EXP_DOC_DISCA, expediente.EXP_DOC_SUEL, expediente.EXP_DOC_DNI, expediente.EXP_DOC_CERT, false, expediente.EXP_TELEFONO, expediente.EXP_EST_ID,
                DateTime.Parse(expediente.EXP_FECHA), expediente.EXP_USUARIO, DateTime.Parse(expediente.EXP_FEC_NAC), DateTime.Parse(expediente.EXP_VENC_FECHA),expediente.EXP_AFILIADO_ID);
            if (ExpId != null) return Convert.ToInt64(ExpId.ToString());
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void Expediente_Patologia_Insert(long ExpId, int PatologiaId)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_EXPEDIENTES_PATOLOGIA_INSERT_INTERNACION(ExpId, PatologiaId);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void Expediente_Patologia_Delete(long ExpId)
    {
        try
        {

            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_EXPEDIENTES_PATOLOGIAS_DELETE_INTERNACION(ExpId);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void Expediente_Baja(long ExpId, long UsuarioBajaId)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_EXPEDIENTES_CAB_BAJA_INTERNACION(ExpId, UsuarioBajaId);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public int Chekiar_Borrar_Expediente_Compras_Internacion(long ExpId)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object obj = new object();
       obj = adapter.H2_Chekiar_Borrar_Expediente_Compras_Internacion(ExpId);
       return Convert.ToInt32(obj);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void Expediente_Extras_Insert(expediente_extras extra)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_EXPEDIENTE_EXTRAS_INSERT_INTERNACION(extra.EXP_EXT_EXP_ID, DateTime.Parse(extra.EXP_EXT_PMI_DESDE), DateTime.Parse(extra.EXP_EXT_PMI_HASTA), 
                DateTime.Parse(extra.EXP_EXT_CODEM_DESDE), DateTime.Parse(extra.EXP_EXT_CODEM_HASTA),
                DateTime.Parse(extra.EXP_EXT_SSS_DESDE), DateTime.Parse(extra.EXP_EXT_SSS_HASTA), DateTime.Parse(extra.EXP_EXT_PM_DESDE), DateTime.Parse(extra.EXP_EXT_PM_HASTA),
                DateTime.Parse(extra.EXP_EXT_CERT_DESDE), DateTime.Parse(extra.EXP_EXT_CERT_HASTA), DateTime.Parse(extra.EXP_EXT_VENC_PAT), extra.EXP_EXT_TUTOR, extra.EXP_EXT_EST_LEGAL_DESCRIPCION);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public expediente_extras Expediente_Extras_List_byExpId(long ExpId)
    {
        try
        {

            ComprasInternacionTableAdapters.H2_EXPEDIENTE_EXTRAS_SELECT_EXPID_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_EXPEDIENTE_EXTRAS_SELECT_EXPID_INTERNACIONTableAdapter();
            
            ComprasInternacion.H2_EXPEDIENTE_EXTRAS_SELECT_EXPID_INTERNACIONDataTable aTable = adapter.GetData(ExpId);
            foreach (ComprasInternacion.H2_EXPEDIENTE_EXTRAS_SELECT_EXPID_INTERNACIONRow row in aTable.Rows)
            {
                string _EXP_EXT_PMI_DESDE = string.Empty;
                if(!row.IsEXP_EXT_PMI_DESDENull()) _EXP_EXT_PMI_DESDE =  row.EXP_EXT_PMI_DESDE.ToShortDateString();

                string _EXP_EXT_PMI_HASTA = string.Empty;
                if (!row.IsEXP_EXT_PMI_HASTANull()) _EXP_EXT_PMI_HASTA = row.EXP_EXT_PMI_DESDE.ToShortDateString();

                string _EXP_EXT_CODEM_DESDE = string.Empty;
                if (!row.IsEXP_EXT_CODEM_DESDENull()) _EXP_EXT_CODEM_DESDE = row.EXP_EXT_CODEM_DESDE.ToShortDateString();

                string _EXP_EXT_CODEM_HASTA = string.Empty;
                if (!row.IsEXP_EXT_CODEM_HASTANull()) _EXP_EXT_CODEM_HASTA = row.EXP_EXT_CODEM_HASTA.ToShortDateString();

                string _EXP_EXT_SSS_DESDE = string.Empty;
                if (!row.IsEXP_EXT_SSS_DESDENull()) _EXP_EXT_SSS_DESDE = row.EXP_EXT_SSS_DESDE.ToShortDateString();

                string _EXP_EXT_SSS_HASTA = string.Empty;
                if (!row.IsEXP_EXT_SSS_HASTANull()) _EXP_EXT_SSS_HASTA = row.EXP_EXT_SSS_HASTA.ToShortDateString();

                string _EXP_EXT_PM_DESDE = string.Empty;
                if (!row.IsEXP_EXT_PM_DESDENull()) _EXP_EXT_PM_DESDE = row.EXP_EXT_PM_DESDE.ToShortDateString();

                string _EXP_EXT_PM_HASTA = string.Empty;
                if (!row.IsEXP_EXT_PM_HASTANull()) _EXP_EXT_PM_HASTA = row.EXP_EXT_PM_HASTA.ToShortDateString();

                string _EXP_EXT_CERT_DESDE = string.Empty;
                if (!row.IsEXP_EXT_CERT_DESDENull()) _EXP_EXT_CERT_DESDE = row.EXP_EXT_CERT_DESDE.ToShortDateString();

                string _EXP_EXT_CERT_HASTA = string.Empty;
                if (!row.IsEXP_EXT_CERT_HASTANull()) _EXP_EXT_CERT_HASTA = row.EXP_EXT_CERT_HASTA.ToShortDateString();

                string _EXP_EXT_VENC_PAT = string.Empty;
                if (!row.IsEXP_EXT_VENC_PATNull()) _EXP_EXT_VENC_PAT = row.EXP_EXT_VENC_PAT.ToShortDateString();

                return new expediente_extras(row.EXP_EXT_EXP_ID, _EXP_EXT_PMI_DESDE, _EXP_EXT_PMI_HASTA, _EXP_EXT_CODEM_DESDE, _EXP_EXT_CODEM_HASTA,
                    _EXP_EXT_SSS_DESDE, _EXP_EXT_SSS_HASTA, _EXP_EXT_PM_DESDE, _EXP_EXT_PM_HASTA, _EXP_EXT_CERT_DESDE, _EXP_EXT_CERT_HASTA,
                    _EXP_EXT_VENC_PAT, row.EXP_EXT_TUTOR,0,row.EXP_EXT_EST_LEGAL1);
            }
            return null;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void Expediente_Diagnosticos_Insert(long ExpId, int DiagnosticoId)
    {
        try
        {
            
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_EXPEDIENTE_DIAGNOSTICOS_INSERT_INTERNACION(ExpId, DiagnosticoId);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void Expediente_Diagnosticos_Delete(long ExpId)
    {
        try
        {
            
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_EXPEDIENTE_DIAGNOSTICOS_DELETE_BY_EXPID_INTERNACION(ExpId);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<int> Expediente_Diagnosticos_List(long ExpId)
    {
        try
        {
            List<int> list = new List<int>();

            ComprasInternacionTableAdapters.H2_EXPEDIENTE_DIAGNOSTICOS_LIST_BY_EXPID_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_EXPEDIENTE_DIAGNOSTICOS_LIST_BY_EXPID_INTERNACIONTableAdapter();
            ComprasInternacion.H2_EXPEDIENTE_DIAGNOSTICOS_LIST_BY_EXPID_INTERNACIONDataTable aTable = adapter.GetData(ExpId);
            foreach (ComprasInternacion.H2_EXPEDIENTE_DIAGNOSTICOS_LIST_BY_EXPID_INTERNACIONRow row in aTable.Rows)
                list.Add(row.EXP_DIAG_DIAG_ID);
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<expediente_buscar> Expediente_Buscar(long EXP_ID, int EXP_ESTADO, string EXP_NOMBRE, int EXP_DIAG_ID, int EXP_NRO_DOC, string EXP_VENC_FECHA_DESDE,
        string EXP_VENC_FECHA_HASTA, bool EXP_CERT_CASAM, bool EXP_CERT_DNI, bool EXP_CERT_DISC, bool EXP_CERT_SUELDO, string SeccionalesIds, string PatologiasIds,
        long NroPedidoId)
    {
        try
        {
            List<expediente_buscar> list = new List<expediente_buscar>();
            ComprasInternacionTableAdapters.H2_EXPEDIENTES_BUSCAR_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_EXPEDIENTES_BUSCAR_INTERNACIONTableAdapter();
            ComprasInternacion.H2_EXPEDIENTES_BUSCAR_INTERNACIONDataTable aTable = adapter.GetData(EXP_ID, EXP_ESTADO, EXP_NOMBRE, EXP_DIAG_ID, EXP_NRO_DOC,
                DateTime.Parse(EXP_VENC_FECHA_DESDE), DateTime.Parse(EXP_VENC_FECHA_HASTA), EXP_CERT_CASAM, EXP_CERT_DNI, EXP_CERT_DISC, EXP_CERT_SUELDO,
                SeccionalesIds, PatologiasIds, NroPedidoId);
            foreach (ComprasInternacion.H2_EXPEDIENTES_BUSCAR_INTERNACIONRow row in aTable.Rows)
            {
                string Fecha_venc = string.Empty;
                if (!row.IsEXP_VENC_FECHANull()) Fecha_venc = row.EXP_VENC_FECHA.ToShortDateString();

                string EXP_FEC_NAC = string.Empty;
                if (!row.IsEXP_FEC_NACNull()) EXP_FEC_NAC = row.EXP_FEC_NAC.ToShortDateString();
                list.Add(new expediente_buscar(row.EXP_ID, (int)row.EXP_NRO_DOC, row.EXP_NOMBRE, row.Seccional, Fecha_venc, row.Patologias, row.Estado, EXP_FEC_NAC,
                    row.EXP_OBS));
            }
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<expediente_buscar> COMPRAS_INTERNACION_BUSCAR_EXPEDIENTES(long EXP_ID, int EXP_ESTADO, string EXP_NOMBRE, int EXP_DIAG_ID, int EXP_NRO_DOC, string EXP_VENC_FECHA_DESDE,
    string EXP_VENC_FECHA_HASTA, bool EXP_CERT_CASAM, bool EXP_CERT_DNI, bool EXP_CERT_DISC, bool EXP_CERT_SUELDO, string SeccionalesIds, string PatologiasIds,
    long NroPedidoId)
    {
        try
        {
            List<expediente_buscar> list = new List<expediente_buscar>();
            ComprasInternacionTableAdapters.H2_COMPRAS_INTERNACION_BUSCAR_EXPEDIENTESTableAdapter adapter = new ComprasInternacionTableAdapters.H2_COMPRAS_INTERNACION_BUSCAR_EXPEDIENTESTableAdapter();
            ComprasInternacion.H2_COMPRAS_INTERNACION_BUSCAR_EXPEDIENTESDataTable aTable = adapter.GetData(EXP_ID, EXP_ESTADO, EXP_NOMBRE, EXP_DIAG_ID, EXP_NRO_DOC,
                DateTime.Parse(EXP_VENC_FECHA_DESDE), DateTime.Parse(EXP_VENC_FECHA_HASTA), EXP_CERT_CASAM, EXP_CERT_DNI, EXP_CERT_DISC, EXP_CERT_SUELDO,
                SeccionalesIds, PatologiasIds, NroPedidoId);
            foreach (ComprasInternacion.H2_COMPRAS_INTERNACION_BUSCAR_EXPEDIENTESRow row in aTable.Rows)
            {
                string Fecha_venc = string.Empty;
                if (!row.IsEXP_VENC_FECHANull()) Fecha_venc = row.EXP_VENC_FECHA.ToShortDateString();

                string EXP_FEC_NAC = string.Empty;
                if (!row.IsEXP_FEC_NACNull()) EXP_FEC_NAC = row.EXP_FEC_NAC.ToShortDateString();
                string estado = "";
                if (!row.IsEstadoNull())
                    estado = row.Estado;
                list.Add(new expediente_buscar(row.EXP_ID, (int)row.EXP_NRO_DOC, row.EXP_NOMBRE, row.Seccional, Fecha_venc, row.Patologias, estado, EXP_FEC_NAC,row.EXP_OBS));
            }
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long EXP_PEDIDOS_CAB_INSERT(expediente_pedidos_cab_internacion pedido)
    {
        try
        {

            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object PedidoId = adapter.H2_EXP_PEDIDOS_CAB_INSERT_INTERNACION(pedido.EXP_PED_ID, pedido.EXP_PED_EPA_ID, DateTime.Parse(pedido.EXP_PED_FECHA), DateTime.Parse(pedido.EXP_PED_FECHA_RECETA), pedido.EXP_PED_OBS, pedido.EXP_PED_DURACION,
                pedido.EXP_PED_USUARIO, DateTime.Parse(pedido.EXP_PED_FEC_AUTORIZ), pedido.EXP_PED_URGENTE, DateTime.Parse(pedido.EXP_PED_FEC_AUDIT), pedido.EXP_PED_USU_AUDIT, pedido.EXP_PED_ESTADO, pedido.EXP_PED_OBS_AUDIT,
                pedido.EXP_PED_EXP_ID, pedido.idCirugia,pedido.fechaCirugiaNew , pedido.cirugiaNew,pedido.motivoNew ,pedido.areaId, pedido.EXP_PED_MED,pedido.cirujanoNew,pedido.especialidadNew);
            if (PedidoId != null) return Convert.ToInt64(PedidoId.ToString());
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long EXP_PEDIDOS_DET_INSERT(expediente_pedidos_det_internacion detalle)
    { 
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object PedidoId = adapter.H2_EXP_PEDIDOS_DET_INSERT_INTERNACION(detalle.PDT_ID, detalle.PDT_PED_ID, detalle.PDT_INS, detalle.PDT_CANTIDAD, detalle.PDT_TIPO, detalle.PDT_USUARIO,
                detalle.PDT_PROVEEDOR, detalle.PDT_SALDO, detalle.PDT_USU_AUDIT, DateTime.Parse(detalle.PDT_FEC_AUDIT),Convert.ToDecimal(detalle.PDT_IMPORTE), detalle.PDT_PLAN );
            if (PedidoId != null) return Convert.ToInt64(PedidoId.ToString());
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void EXP_PEDIDOS_DET_DELETE(long PDT_PED_ID)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_EXP_PEDIDOS_DET_DELETE_INTERNACION(PDT_PED_ID);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }



    public long Compras_Guardar_CAB_Entrega_Internacion(long ENTREGA_ID, long EXP_ID, long EXP_PED_ID, long PEE_USUARIO, long P_ID)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
           object id = adapter.H2_Compras_Insert_Entregas_CAB_Internacion(ENTREGA_ID, EXP_ID, EXP_PED_ID, PEE_USUARIO,P_ID);
           if (id != null) return Convert.ToInt64(id.ToString());
           else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public List<string> Compras_Guardar_DET_Entrega_Internacion(long ENTREGA_ID, long PDT_ID, List<InsumoInternacion> lista,long USU_ENTREGA)
    {

        List<string> l = new List<string>();
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            //adapter.H2_Compras_Delete_Entregas_DET_Internacion(ENTREGA_ID);
            object id = new object();

            foreach(InsumoInternacion item in lista){
            id = adapter.H2_Compras_Insert_Entregas_DET_Internacion(ENTREGA_ID, item.PDT_ID,item.cantidad,item.observacion,item.id,item.insumo,item.ENTREGADO,USU_ENTREGA,item.ENTREGA_DETALLE_ID,Convert.ToDecimal(item.PRECIO));
            l.Add(id.ToString());
            }
            
            
             return l;
        }
        catch (SqlException ex)
        {
                throw new Exception(ex.Message);
        }
    }


    public void relacionarDesgloceRemitoInternacion(List<string> idsDesgloce, long NroRemito)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();

            foreach (string item in idsDesgloce)
            {
                adapter.H2_relacionarDesgloceRemitoInternacion(NroRemito,item);    
            }
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public expediente_pedidos_cab EXP_PED_CAB_LIST_ID(long PDT_PED_ID)
     {
        try
        {
            ComprasDALTableAdapters.H2_EXP_PED_CAB_LIST_IDTableAdapter adapter = new ComprasDALTableAdapters.H2_EXP_PED_CAB_LIST_IDTableAdapter();
            ComprasDAL.H2_EXP_PED_CAB_LIST_IDDataTable aTable = adapter.GetData(PDT_PED_ID);
            foreach (ComprasDAL.H2_EXP_PED_CAB_LIST_IDRow row in aTable.Rows)
            {
                string EXP_PED_FEC_AUDIT = string.Empty;
                if(!row.IsEXP_PED_FEC_AUDITNull()) EXP_PED_FEC_AUDIT = row.EXP_PED_FEC_AUDIT.ToShortDateString();

                string EXP_PED_FEC_AUTORIZ = string.Empty;
                if(!row.IsEXP_PED_FEC_AUTORIZNull()) EXP_PED_FEC_AUTORIZ = row.EXP_PED_FEC_AUTORIZ.ToShortDateString();

                string OBS_AA = string.Empty;
                if(!row.IsOBS_AANull()) OBS_AA = row.OBS_AA;

                string OBS_PED = string.Empty;
                if(!row.IsOBS_PEDNull()) OBS_PED = row.OBS_PED;

                string UsuarioAA = string.Empty;
                if(!row.IsUsuarioAANull()) UsuarioAA = row.UsuarioAA;

                string UsuarioPed = string.Empty;
                if(!row.IsUsuarioPedNull()) UsuarioPed = row.UsuarioPed;

                return new expediente_pedidos_cab(row.PedidoId, 0, row.EXP_PED_FECHA.ToShortDateString(), row.EXP_PED_FECHA_RECETA.ToShortDateString(), OBS_PED, row.EXP_PED_DURACION,
                    0, row.EXP_PED_FECHA.ToShortDateString(), EXP_PED_FEC_AUTORIZ, row.EXP_PED_URGENTE, EXP_PED_FEC_AUTORIZ, 0, row.EXP_PED_ESTADO,
                    OBS_AA, row.ExpedienteId, UsuarioPed, UsuarioAA,30,true,0);
            }
            return null;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
     }


    public List<InsumoInternacion> Compras_Traer_Entregas_DET_Internacion(long PDT_ID, int TIPO)
    {
        try
        {

            ComprasInternacionTableAdapters.H2_Compras_Traer_Entregas_DET_InternacionTableAdapter adapter = new ComprasInternacionTableAdapters.H2_Compras_Traer_Entregas_DET_InternacionTableAdapter();
            ComprasInternacion.H2_Compras_Traer_Entregas_DET_InternacionDataTable aTable = adapter.GetData(PDT_ID,TIPO);
            List<InsumoInternacion> lista = new List<InsumoInternacion>();

            foreach (ComprasInternacion.H2_Compras_Traer_Entregas_DET_InternacionRow row in aTable.Rows)
            {
                InsumoInternacion obj = new InsumoInternacion();
                obj.cantidad = row.CANTIDAD;
                obj.insumo = row.descripcion;
                obj.id = row.INSUMO_ID;
                obj.ENTREGA_DETALLE_ID = row.ENTREGA_DETALLE_ID;
                obj.ENTREGA_ID = row.ENTREGA_ID;

                if(row.IsENTREGADONull())
                    obj.ENTREGADO = 0;
                else
                   obj.ENTREGADO = row.ENTREGADO;

                if (!row.IsPEE_OBSNull())
                    obj.observacion = row.PEE_OBS;

                if (!row.IsPRECIONull())
                    obj.PRECIO = row.PRECIO;
                
                lista.Add(obj);
            }
            return lista;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public void compras_eliminiar_entrega_detalle_internacion(long ENTREGA_DETALLE_ID)
    {
        try
        {

            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_compras_eliminiar_entrega_detalle_internacion(ENTREGA_DETALLE_ID);
          
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    //trae los detalles de todos los presupuesto de un pedido
    public List<expediente_pedidos_det_internacion> EXP_PED_DET_LIST_ID(long PDT_PED_ID)
    {
        try
        {
            List<expediente_pedidos_det_internacion> list = new List<expediente_pedidos_det_internacion>();
            ComprasInternacionTableAdapters.H2_EXP_PEDIDOS_DET_LIST_BY_ID_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_EXP_PEDIDOS_DET_LIST_BY_ID_INTERNACIONTableAdapter();
            ComprasInternacion.H2_EXP_PEDIDOS_DET_LIST_BY_ID_INTERNACIONDataTable aTable = adapter.GetData(PDT_PED_ID);
            foreach (ComprasInternacion.H2_EXP_PEDIDOS_DET_LIST_BY_ID_INTERNACIONRow row in aTable.Rows)
            {
                string PDT_FEC_AUDIT = string.Empty;
                string PDT_INS = string.Empty;
                if (!row.IsPDT_FEC_AUDITNull()) { PDT_FEC_AUDIT = row.PDT_FEC_AUDIT.ToShortDateString(); }
                if (!row.IsPDT_INSNull()) { PDT_INS = row.PDT_INS; }

                list.Add(new expediente_pedidos_det_internacion(row.PDT_ID, row.PDT_PED_ID, PDT_INS, row.PDT_CANTIDAD, row.PDT_TIPO, 0, row.ProveedorID, row.PDT_SALDO, 0, PDT_FEC_AUDIT,
                    row.PDT_IMPORTE, row.PDT_PLAN, row.PDT_INS, "", "", "", "", "", row.Proveedor, row.area, row.estadoPedido, row.borrar_S_N));
            }
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }
    //trae los detalles de todos los presupuesto de un pedido


    //trae los detalles de todos los presupuesto de un pedido para generar entregas
    public List<expediente_pedidos_det_internacion> EXP_PEDIDOS_DET_LIST_ENTREGAS_INTERNACION(long PDT_PED_ID)
    {
        try
        {
            List<expediente_pedidos_det_internacion> list = new List<expediente_pedidos_det_internacion>();
            ComprasInternacionTableAdapters.H2_EXP_PEDIDOS_DET_LIST_ENTREGAS_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_EXP_PEDIDOS_DET_LIST_ENTREGAS_INTERNACIONTableAdapter();
            ComprasInternacion.H2_EXP_PEDIDOS_DET_LIST_ENTREGAS_INTERNACIONDataTable aTable = adapter.GetData(PDT_PED_ID);
            foreach (ComprasInternacion.H2_EXP_PEDIDOS_DET_LIST_ENTREGAS_INTERNACIONRow row in aTable.Rows)
            {
                string PDT_FEC_AUDIT = string.Empty;
                string PDT_INS = string.Empty;
                if (!row.IsPDT_FEC_AUDITNull()) { PDT_FEC_AUDIT = row.PDT_FEC_AUDIT.ToShortDateString(); }
                if (!row.IsPDT_INSNull()) { PDT_INS = row.PDT_INS; }

                list.Add(new expediente_pedidos_det_internacion(row.PDT_ID, row.PDT_PED_ID, PDT_INS, row.PDT_CANTIDAD, row.PDT_TIPO, 0, row.ProveedorID, row.PDT_SALDO, 0, PDT_FEC_AUDIT,
                    row.PDT_IMPORTE, row.PDT_PLAN, row.PDT_INS, "", "", "", "", "", row.Proveedor, row.area, row.estadoPedido, row.borrar_S_N,row.USU_ENT,row.FEC_ENT.ToShortDateString()));
            }
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }
    //trae los detalles de todos los presupuesto de un pedido para generar entregas



    //trae los insumos que se generan para internacion
    public List<InsumoInternacion> buscar_Insumo(string busqueda)
    {
        try
        {
            List<InsumoInternacion> list = new List<InsumoInternacion>();
            ComprasInternacionTableAdapters.H2_Compras_Traer_insumos_InternacionTableAdapter adapter = new ComprasInternacionTableAdapters.H2_Compras_Traer_insumos_InternacionTableAdapter();
            ComprasInternacion.H2_Compras_Traer_insumos_InternacionDataTable aTable = adapter.GetData(busqueda);
            foreach (ComprasInternacion.H2_Compras_Traer_insumos_InternacionRow row in aTable.Rows)
            {
                InsumoInternacion obj = new InsumoInternacion();
                obj.id = row.id;
                obj.descripcion = row.descripcion;
                obj.activo = row.activo;

                list.Add(obj);
            }
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }
    //trae los insumos que se generan para internacion

    //trae los detalles de un presupuesto
    public Compras_Det_Presupuesto EXP_PRESUPUESTO_TRAER_DATOS_DET(long PDT_ID)
    {
        try
        {
            List<expediente_pedidos_det_internacion> list = new List<expediente_pedidos_det_internacion>();
            ComprasInternacionTableAdapters.H2_EXP_PRESUPUESTO_DETTableAdapter adapter = new ComprasInternacionTableAdapters.H2_EXP_PRESUPUESTO_DETTableAdapter();
            ComprasInternacion.H2_EXP_PRESUPUESTO_DETDataTable aTable = adapter.GetData(PDT_ID);
            Compras_Det_Presupuesto det = new Compras_Det_Presupuesto();
            foreach (ComprasInternacion.H2_EXP_PRESUPUESTO_DETRow row in aTable.Rows)
            {
                det.tipo = row.PDT_TIPO;
                det.cantidad = row.PDT_CANTIDAD;
                det.proveedor = row.PDT_PROVEEDOR;
                det.importe = row.PDT_IMPORTE;
            }
            return det;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }
    //trae los detalles de un presupuesto


    public List<expediente_pedidos_cab_internacion> EXP_PED_CAB_LIST_EXPID(long EXP_ID)
    {
        try
        {
            List<expediente_pedidos_cab_internacion> list = new List<expediente_pedidos_cab_internacion>();
            ComprasInternacionTableAdapters.H2_EXP_PED_CAB_LIST_EXPID_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_EXP_PED_CAB_LIST_EXPID_INTERNACIONTableAdapter();
            ComprasInternacion.H2_EXP_PED_CAB_LIST_EXPID_INTERNACIONDataTable aTable = adapter.GetData(EXP_ID);
            foreach (ComprasInternacion.H2_EXP_PED_CAB_LIST_EXPID_INTERNACIONRow row in aTable.Rows)
            {
                string EXP_PED_FEC_AUDIT = string.Empty;
                if (!row.IsEXP_PED_FEC_AUDITNull()) EXP_PED_FEC_AUDIT = row.EXP_PED_FEC_AUDIT.ToShortDateString();

                string EXP_PED_FEC_AUTORIZ = string.Empty;
                if (!row.IsEXP_PED_FEC_AUTORIZNull()) EXP_PED_FEC_AUTORIZ = row.EXP_PED_FEC_AUTORIZ.ToShortDateString();

                string OBS_AA = string.Empty;
                if (!row.IsOBS_AANull()) OBS_AA = row.OBS_AA;

                string OBS_PED = string.Empty;
                if (!row.IsOBS_PEDNull()) OBS_PED = row.OBS_PED;

                string UsuarioAA = string.Empty;
                if (!row.IsUsuarioAANull()) UsuarioAA = row.UsuarioAA;

                string UsuarioPed = string.Empty;
                if (!row.IsUsuarioPedNull()) UsuarioPed = row.UsuarioPed;

                long _PED_ORIGEN = 0;
                if (!row.IsPED_ORIGENNull()) _PED_ORIGEN = Convert.ToInt64(row.PED_ORIGEN);

                list.Add(new expediente_pedidos_cab_internacion(row.PedidoId, 0, row.EXP_PED_FECHA.ToShortDateString(), row.EXP_PED_FECHA_RECETA.ToShortDateString(), OBS_PED, row.EXP_PED_DURACION,
                    0, row.EXP_PED_FECHA.ToShortDateString(), EXP_PED_FEC_AUTORIZ, row.EXP_PED_URGENTE, EXP_PED_FEC_AUTORIZ, 0, row.EXP_PED_ESTADO,
                    OBS_AA, row.ExpedienteId, UsuarioPed, UsuarioAA, row.EXP_PED_ES_60_90, Convert.ToBoolean(row.EXP_PED_EDITABLE), _PED_ORIGEN, row.area, row.cirugias, row.motivo, row.fechaInternvension.ToShortDateString(), row.areaId, row.borrar_S_N, row.EXP_PED_MED,row.entregado, row.Insumos));
            }
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public List<expediente_rubros> EXP_RUBROS_LIST(bool Todos)
    {
        try
        {
            List<expediente_rubros> list = new List<expediente_rubros>();
            ComprasDALTableAdapters.H2_COMPRAS_EXP_RUBROS_LISTTableAdapter adapter = new ComprasDALTableAdapters.H2_COMPRAS_EXP_RUBROS_LISTTableAdapter();
            ComprasDAL.H2_COMPRAS_EXP_RUBROS_LISTDataTable aTable = adapter.GetData(Todos);
            foreach (ComprasDAL.H2_COMPRAS_EXP_RUBROS_LISTRow row in aTable.Rows)
                list.Add(new expediente_rubros(row.COMPRAS_RUBROS_ID, row.COMPRAS_RUBROS_DESC, row.COMPRAS_RUBROS_BAJA));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void EXP_PEDIDOS_DET_AUDITAR(int Tarea, long PDT_PED_ID, long PDT_ID, long PDT_USU_AUDIT, DateTime PDT_FEC_AUDIT, string PDT_OBS)
    {
        try
        {
            ComprasDALTableAdapters.QueriesTableAdapter adapter = new ComprasDALTableAdapters.QueriesTableAdapter();
            adapter.H2_EXP_PEDIDOS_DET_AUDITAR(Tarea, PDT_PED_ID, PDT_ID, PDT_USU_AUDIT, PDT_FEC_AUDIT, PDT_OBS);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public long Compras_Traer_ENTREGA_ID_Internacion(long PDT_ID)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object id = adapter.H2_Compras_Traer_ENTREGA_ID_Internacion(PDT_ID); //adapter.h2_compras_(PDT_ID);

            if (id != null)
                return Convert.ToInt64(id.ToString());
            else
                return 0;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long Traer_Paciente_Id(long Documento, string T_Doc)
    {
      
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();          
            object Id = adapter.H2_Traer_Paciente_Id(Documento, T_Doc);
            //if (Id != null)
                return Convert.ToInt64(Id.ToString());
     
    }

    public List<expediente_entregas_det> EXP_PEDIDOS_ENTREGAS_DET_BY_PED_ID(long PDT_PED_ID)
    {
        try
        {
            List<expediente_entregas_det> list = new List<expediente_entregas_det>();
            ComprasInternacionTableAdapters.H2_EXP_PEDIDOS_ENTREGAS_DET_BY_PED_ID_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_EXP_PEDIDOS_ENTREGAS_DET_BY_PED_ID_INTERNACIONTableAdapter();
            ComprasInternacion.H2_EXP_PEDIDOS_ENTREGAS_DET_BY_PED_ID_INTERNACIONDataTable aTable = adapter.GetData(PDT_PED_ID);
            foreach (ComprasInternacion.H2_EXP_PEDIDOS_ENTREGAS_DET_BY_PED_ID_INTERNACIONRow row in aTable.Rows)
            {
                list.Add(new expediente_entregas_det(row.PDT_ID, row.PDT_PED_ID, 0, row.CANT_PEDIDA, row.DESCUENTO, row.ENT_SALDO, row.OBS, row.Insumo, row.Usuario,
                    row.PRE_UNI, row.CANT_ENTR, row.DEP_ID, row.ENT_FEC_ENT.ToShortDateString(), row.Deposito, 0, row.EntDet_Id, row.USU_MED, row.Nremito));
            }
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long EXP_PEDIDOS_ENTREGAS_CAB_INSERT(expediente_entregas_cab cab)
    {
        try
        {
            ComprasDALTableAdapters.QueriesTableAdapter adapter = new ComprasDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_EXP_PEDIDOS_ENTREGAS_CAB_INSERT(cab.PEE_NUMERO_REM, cab.PEE_EXP_ID, DateTime.Now.Date, cab.PEE_USUARIO,cab.PEE_PED_ID);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long EXP_PEDIDOS_ENTREGAS_DET_INSERT(expediente_entregas_det ent)
    { 
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_EXP_PEDIDOS_ENTREGAS_DET_INSERT_INTERNACION(ent.PEE_ID, ent.PEE_NUMERO_REM, ent.PDT_ID, ent.PEE_CANT_ENTR, ent.PEE_DEP_ID, DateTime.Parse(ent.PEE_FEC_ENTREGA), ent.PDT_OBS, ent.PEE_PRE_UNI,
                ent.PEE_MARCA, 0, ent.PDT_POR_DESC);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void EXP_PEDIDOS_ENTREGAS_DET_DELETE(long PEE_ID)
    {
        try
        {
            ComprasDALTableAdapters.QueriesTableAdapter adapter = new ComprasDALTableAdapters.QueriesTableAdapter();
            adapter.H2_EXP_PEDIDOS_ENTREGAS_DET_DELETE(PEE_ID);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<expedientes_auditar_pedidos> COMPRAS_AUDITAR_PEDIDOS_LIST(string FechaDesde, string FechaHasta, long NroPedDesde, long NroPedHasta,
        string Insumo_nom, string Paciente, int Seccional, bool ConAuditoriaMed)
    {
        try
        {
            List<expedientes_auditar_pedidos> list = new List<expedientes_auditar_pedidos>();

            ComprasInternacionTableAdapters.H2_COMPRAS_AUDITAR_PEDIDOS_LIST_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_COMPRAS_AUDITAR_PEDIDOS_LIST_INTERNACIONTableAdapter();
            ComprasInternacion.H2_COMPRAS_AUDITAR_PEDIDOS_LIST_INTERNACIONDataTable aTable = adapter.GetData(DateTime.Parse(FechaDesde), DateTime.Parse(FechaHasta),
                NroPedDesde, NroPedHasta, Insumo_nom, Paciente, Seccional, ConAuditoriaMed);
            foreach (ComprasInternacion.H2_COMPRAS_AUDITAR_PEDIDOS_LIST_INTERNACIONRow row in aTable.Rows)
            {
                //string _FechaAA = string.Empty;
                //if(!row.IsFechaAANull()) _FechaAA = row.FechaAA.ToShortDateString();

                string _FAuditado = string.Empty;
                if (!row.IsFAuditadoNull()) _FAuditado = row.FAuditado.ToShortDateString();

                int PDT_ESTADO = -1;
                if (!row.IsPDT_ESTADONull()) PDT_ESTADO = row.PDT_ESTADO;

                list.Add(new expedientes_auditar_pedidos(row.ExpId, row.Afiliado, row.NroPed, row.PedAnt.ToShortDateString(), row.FReceta.ToShortDateString(), row.Insumo, row.Pedido, row.Urgente, row.Duracion, row.Descuento,
                   _FAuditado, row.Auditor, row.FIngreso.ToShortDateString(), row.USU_ING, row.Observaciones, row.DetalleID,PDT_ESTADO));
            }
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void COMPRAS_CONFIRMAR_AUDITORIA(long Usuario_Auditor, long PedidoID, bool Confirma, decimal Porcentaje)
    {
        try
        {

            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_COMPRAS_CONFIRMAR_AUDITORIA_INTERNACION(Usuario_Auditor, PedidoID, Confirma, Porcentaje);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public int COMPRAS_COMPROBAR_AUDITORIA(int id)
    {
        try
        {

          ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
          return Convert.ToInt32(adapter.H2_COMPRAS_COMPROBAR_ENVIO_PROVEEDOR_INTERNACOION(id));
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<expedientes_informe_global> COMPRAS_INFORME_GLOBAL_LIST(string FechaRemito_Desde, string FechaRemito_Hasta, long Nro_Remito_Desde, long Nro_Remito_Hasta, string Nom_Insumo, 
        long NroPedido_Desde, long NroPedido_Hasta, bool Pendientes, bool Entregados,string Paciente,int Seccional, int Deposito)
    {
        try
        {
            List<expedientes_informe_global> list = new List<expedientes_informe_global>();
            ComprasDALTableAdapters.H2_COMPRAS_INFORME_GLOBAL_LISTTableAdapter adapter = new ComprasDALTableAdapters.H2_COMPRAS_INFORME_GLOBAL_LISTTableAdapter();
            ComprasDAL.H2_COMPRAS_INFORME_GLOBAL_LISTDataTable aTable = adapter.GetData(DateTime.Parse(FechaRemito_Desde), DateTime.Parse(FechaRemito_Hasta), Nro_Remito_Desde, Nro_Remito_Hasta, Nom_Insumo, NroPedido_Desde,
                NroPedido_Hasta, Pendientes, Entregados,Paciente,Seccional,Deposito);
            foreach (ComprasDAL.H2_COMPRAS_INFORME_GLOBAL_LISTRow row in aTable.Rows)
            {
                list.Add(new expedientes_informe_global(row.NroExpedienteCAB, row.Insumo, row.Pedido, row.Descuento, row.Fecha.ToShortDateString(), row.FarCant, row.FarPrecio, row.FarDesc, row.Saldo, row.Entregado,
                    row.Deposito, row.NroRemitoEnt, row.ENT_DET_ID));
            }
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long EXP_PEDIDOS_CAB_COPIAR(long PedidoId, int UsuarioId, int Duracion, bool Es_a_60_90)
    {
        try
        {
            ComprasDALTableAdapters.QueriesTableAdapter adapter = new ComprasDALTableAdapters.QueriesTableAdapter();
            object PedidoId_Nuevo = adapter.H2_COMPRAS_EXP_PEDIDOS_CAB_COPIAR(PedidoId, UsuarioId,Duracion);
            if (PedidoId_Nuevo != null) 
            {
                EXP_PEDIDOS_DET_COPIAR(PedidoId, Convert.ToInt64(PedidoId_Nuevo.ToString()), UsuarioId, Es_a_60_90);
                return Convert.ToInt64(PedidoId_Nuevo.ToString());
            }
            else throw new Exception("Error al crear copia del pedido.");        
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public bool verificarBajaAuditoria(string PDT_IDS)
    {

        ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
        object respuesta = adapter.H2_COMPRAS_VERIFICAR_BAJA_AUDITORIA(PDT_IDS);
        return Convert.ToBoolean(respuesta);
 
    }

    private void EXP_PEDIDOS_DET_COPIAR(long PedidoId_CAB_Origen, long PedidoId_CAB_Nuevo, int UsuarioId, bool Es_a_60_90)
    { 
        try
        {
            ComprasDALTableAdapters.QueriesTableAdapter adapter = new ComprasDALTableAdapters.QueriesTableAdapter();
            adapter.H2_COMPRAS_EXP_PEDIDOS_DET_COPIAR(PedidoId_CAB_Origen, PedidoId_CAB_Nuevo, UsuarioId, Es_a_60_90);    
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<expediente_historial_insumo> EXP_ENTREGAS_HISTORIAL_INSUMO_100(long NroExpediente, long InsumoID)
    {
        try
        {
            List<expediente_historial_insumo> list = new List<expediente_historial_insumo>();
            ComprasDALTableAdapters.H2_EXP_ENTREGAS_HISTORIAL_INSUMO_100TableAdapter adapter = new ComprasDALTableAdapters.H2_EXP_ENTREGAS_HISTORIAL_INSUMO_100TableAdapter();
            ComprasDAL.H2_EXP_ENTREGAS_HISTORIAL_INSUMO_100DataTable aTable = adapter.GetData(NroExpediente, InsumoID);
            foreach (ComprasDAL.H2_EXP_ENTREGAS_HISTORIAL_INSUMO_100Row row in aTable.Rows)
            {
                string _FechaEntrega = string.Empty;
                if (!row.IsFechaEntregaNull()) _FechaEntrega = row.FechaEntrega.ToShortDateString();

                list.Add(new expediente_historial_insumo(row.Insumo, row.CantidadPedida, row.NroPedido, row.CantidadEntregada, _FechaEntrega));
            }
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public expediente_entregas_cab EXP_ENTREGA_CAB_BY_PED_CAB_ID(long PED_CAB_ID)
    {
        try
        {
            expediente_entregas_cab cab = new expediente_entregas_cab();
            ComprasDALTableAdapters.H2_EXP_ENTREGA_CAB_BY_PED_CAB_IDTableAdapter adapter = new ComprasDALTableAdapters.H2_EXP_ENTREGA_CAB_BY_PED_CAB_IDTableAdapter();
            ComprasDAL.H2_EXP_ENTREGA_CAB_BY_PED_CAB_IDDataTable aTable = adapter.GetData(PED_CAB_ID);
            if (aTable.Rows.Count > 0)
                return (new expediente_entregas_cab(aTable[0].PEE_NUMERO_REM, aTable[0].PEE_EXP_ID, aTable[0].PEE_FECHA.ToShortDateString(), 0, PED_CAB_ID,aTable[0].IMPRESO));
            else return null;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
        
    }

    public void COMPRAS_ENTREGAS_CAB_IMPRESO(long PEE_REMITO_CAB)
    {
        try
        {
            ComprasDALTableAdapters.QueriesTableAdapter adapter = new ComprasDALTableAdapters.QueriesTableAdapter();
            adapter.H2_COMPRAS_ENTREGAS_CAB_IMPRESO(PEE_REMITO_CAB);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void COMPRAS_ENT_CONTROL_DET_UPDATE(long EntDetId, decimal PrecioFarUni, int CantFarEnt, decimal DescFarEnt)
    {
        try
        {
            ComprasDALTableAdapters.QueriesTableAdapter adapter = new ComprasDALTableAdapters.QueriesTableAdapter();
            adapter.H2_COMPRAS_ENT_CONTROL_DET_UPDATE(EntDetId, PrecioFarUni, CantFarEnt, DescFarEnt);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void COMPRAS_EXP_PEDIDOS_CAB_BAJA(long NroPedidoCAB, long usuario)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_COMPRAS_EXP_PEDIDOS_CAB_BAJA_INTERNACION(NroPedidoCAB,usuario);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<expediente_entregas_cab> EXP_PEDIDOS_ENTREGAS_IDS_DURACION(long NroEntregaID)
    {
        try
        {
            List<expediente_entregas_cab> list = new List<expediente_entregas_cab>();
            ComprasDALTableAdapters.H2_EXP_PEDIDOS_ENTREGAS_IDS_DURACIONTableAdapter adapter = new ComprasDALTableAdapters.H2_EXP_PEDIDOS_ENTREGAS_IDS_DURACIONTableAdapter();
            ComprasDAL.H2_EXP_PEDIDOS_ENTREGAS_IDS_DURACIONDataTable aTable = adapter.GetData(NroEntregaID);
            foreach (ComprasDAL.H2_EXP_PEDIDOS_ENTREGAS_IDS_DURACIONRow row in aTable.Rows)
                list.Add(new expediente_entregas_cab(row.PEE_NUMERO_REM,row.PED_ID));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<long> EXP_PEDIDOS_CAB_ID_POR_CAB_ORIGEN(long NroPedidoID_Origen)
    {
        try
        {
            List<long> list = new List<long>();
            list.Add(NroPedidoID_Origen);
            ComprasDALTableAdapters.H2_EXP_PEDIDOS_CAB_ID_POR_CAB_ORIGENTableAdapter adapter = new ComprasDALTableAdapters.H2_EXP_PEDIDOS_CAB_ID_POR_CAB_ORIGENTableAdapter();
            ComprasDAL.H2_EXP_PEDIDOS_CAB_ID_POR_CAB_ORIGENDataTable aTable = adapter.GetData(NroPedidoID_Origen);
            foreach (ComprasDAL.H2_EXP_PEDIDOS_CAB_ID_POR_CAB_ORIGENRow row in aTable.Rows)
                list.Add(row.PedidoCabID);
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long EXP_COMPRAS_ENTREGA_TOTAL_POR_PEDIDO(long PedidoIdOrigen, long PEE_USUARIO, long PEE_EXP_ID, int PEE_DEP_ID, DateTime PEE_FECHA_ENTREGA)
    {
        try
        {
            ComprasDALTableAdapters.QueriesTableAdapter adapter = new ComprasDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_EXP_COMPRAS_ENTREGA_TOTAL_POR_PEDIDO(PedidoIdOrigen, PEE_USUARIO, PEE_EXP_ID, PEE_DEP_ID, PEE_FECHA_ENTREGA);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long EXP_COMPRAS_ENTREGA_PARCIAL_POR_PEDIDO(long PedidoIdOrigen, long PEE_USUARIO, long PEE_EXP_ID, int PEE_DEP_ID, DateTime PEE_FECHA_ENTREGA,
        int PEE_CANTIDAD, int PDT_INS_ID, long PDT_ID, decimal PDT_PORC_DESC)
    {
        try
        {
            ComprasDALTableAdapters.QueriesTableAdapter adapter = new ComprasDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_EXP_COMPRAS_ENTREGA_PARCIAL_POR_PEDIDO(PedidoIdOrigen, PEE_USUARIO, PEE_EXP_ID, PEE_DEP_ID, PEE_FECHA_ENTREGA,PEE_CANTIDAD,
                PDT_INS_ID,PDT_ID,PDT_PORC_DESC);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public long EXP_COMPRAS_ENTREGA_INTERNACION(long PedidoIdOrigen, long PEE_USUARIO, long PEE_EXP_ID, int PEE_DEP_ID, DateTime PEE_FECHA_ENTREGA,
        int PEE_CANTIDAD, int PDT_INS_ID, long PDT_ID, decimal PDT_PORC_DESC)
    {
        try
        {

            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_EXP_COMPRAS_ENTREGA_INTERNACION(PedidoIdOrigen, PEE_USUARIO, PEE_EXP_ID, PEE_DEP_ID, PEE_FECHA_ENTREGA, PEE_CANTIDAD,
                PDT_INS_ID, PDT_ID, PDT_PORC_DESC);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<compras_reporte_amb_caba> COMPRAS_REPORTE_INTERNACION_CABA(string Desde, string Hasta, int Filtro)
    {
        try
        {
            List<compras_reporte_amb_caba> list = new List<compras_reporte_amb_caba>();
            ComprasInternacionTableAdapters.H2_COMPRAS_REPORTE_INTERNACION_CABATableAdapter adapter = new ComprasInternacionTableAdapters.H2_COMPRAS_REPORTE_INTERNACION_CABATableAdapter();
            ComprasInternacion.H2_COMPRAS_REPORTE_INTERNACION_CABADataTable aTable = adapter.GetData(DateTime.Parse(Desde), DateTime.Parse(Hasta), Filtro);
            foreach (ComprasInternacion.H2_COMPRAS_REPORTE_INTERNACION_CABARow row in aTable.Rows)
                list.Add(new compras_reporte_amb_caba(row.NroExpediente, row.Paciente, row.Documento, row.NHC, row.NroPedido, row.Insumo, row.Cantidad_Pedida,
                    row.Porcentaje_Audit, row.Cantidad_Entregada, row.NroRemito, row.Saldo, row.Deposito, row.FechaPedido.ToShortDateString(), row.Seccional, row.area, row.proveedor));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public List<compras_reporte_int> Reporte_Compras_Internacion(string Desde, string Hasta, int Filtro, string afiliado)
    {
        try
        {
            List<compras_reporte_int> list = new List<compras_reporte_int>();
            ComprasInternacionTableAdapters.H2_Reporte_Compras_InternacionTableAdapter adapter = new ComprasInternacionTableAdapters.H2_Reporte_Compras_InternacionTableAdapter();
            ComprasInternacion.H2_Reporte_Compras_InternacionDataTable aTable = adapter.GetData(Desde, Hasta, Filtro,afiliado);
            foreach (ComprasInternacion.H2_Reporte_Compras_InternacionRow row in aTable.Rows)
                list.Add(new compras_reporte_int(row.FECHA_PEDIDO.ToShortDateString(), row.SERVICIO, row.PACIENTE, row.DOCUMENTO, row.NHC, row.SECCIONAL, row.NPEDIDO,
                    row.CANTIDAD, row.INSUMO, row.OBSERVACION, row.FEC_ENTREGA.ToShortDateString(), row.usuario, row.NEXP));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void COMPRAS_INSUMOS_UPDATE(long INS_ID, string INS_DESCRIPCION, int INS_RUBRO)
    {
        try
        {
            ComprasDALTableAdapters.QueriesTableAdapter adapter = new ComprasDALTableAdapters.QueriesTableAdapter();
            adapter.H2_COMPRAS_INSUMOS_UPDATE(INS_ID, INS_DESCRIPCION, INS_RUBRO);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public decimal COMPRAS_PEDIDOS_DESCUENTO_INSUMO_PAC(int INS_ID, long NRO_DOC)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object res = adapter.H2_COMPRAS_PEDIDOS_PORCENTAJE_POR_INSUMO_PAC_INTERNACION(INS_ID, NRO_DOC);
            if (res != null) return Convert.ToDecimal(res.ToString());
            else return 0;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long COMPRAS_CONSTANCIA_ENTREGA_INSERT(compras_constancia_entrega constancia)
    {
        try
        {
            ComprasDALTableAdapters.QueriesTableAdapter adapter = new ComprasDALTableAdapters.QueriesTableAdapter();
            object res = adapter.H2_COMPRAS_CONSTANCIA_ENTREGA_INSERT(constancia.COMPRAS_CDE_ID, Convert.ToDateTime(constancia.COMPRAS_CDE_FECHA_RECETA), constancia.COMPRAS_CDE_PAC_ID,constancia.COMPRAS_CDE_PACIENTE,
                constancia.COMPRAS_CDE_NRODOC, constancia.COMPRAS_CDE_SECC, constancia.COMPRAS_CDE_ACTIVO, constancia.COMPRAS_CDE_USU_ID, constancia.COMPRAS_CDE_QUIROFANO,DateTime.Parse(constancia.COMPRAS_CDE_FECHA_QUIRO));
            if (res != null) return Convert.ToInt64(res.ToString());
            else return 0;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void COMPRAS_CONSTANCIA_ENTREGA_BAJA(long CDE_ID)
    {
        try
        {
            ComprasDALTableAdapters.QueriesTableAdapter adapter = new ComprasDALTableAdapters.QueriesTableAdapter();
            adapter.H2_COMPRAS_CONSTANCIA_ENTREGA_BAJA(CDE_ID);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<compras_constancia_entrega> COMPRAS_CONSTANCIA_ENTREGA_LIST(string Desde, string Hasta)
    {
        try
        {
            List<compras_constancia_entrega> list = new List<compras_constancia_entrega>();
            ComprasDALTableAdapters.H2_COMPRAS_CONSTANCIA_ENTREGA_LISTTableAdapter adapter = new ComprasDALTableAdapters.H2_COMPRAS_CONSTANCIA_ENTREGA_LISTTableAdapter();
            ComprasDAL.H2_COMPRAS_CONSTANCIA_ENTREGA_LISTDataTable aTable = adapter.GetData(DateTime.Parse(Desde), DateTime.Parse(Hasta));
            foreach (ComprasDAL.H2_COMPRAS_CONSTANCIA_ENTREGA_LISTRow row in aTable.Rows)
            {
                string _FECHA_QUIRO = string.Empty;
                if(!row.IsCOMPRAS_CDE_FECHA_QUIRONull()) _FECHA_QUIRO = row.COMPRAS_CDE_FECHA_QUIRO.ToShortDateString();
                list.Add(new compras_constancia_entrega(row.CDE_ID, row.FechaReceta.ToShortDateString(), row.PacienteID, row.Paciente, row.NroDoc, row.SeccionalID,
                        true, 0, _FECHA_QUIRO, row.COMPRAS_CDE_QUIROFANO, row.Seccional));
            }         
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<compras_Servicio> COMPRAS_SERVICIO_TIPO()
    {
        try
        {
            List<compras_Servicio> list = new List<compras_Servicio>();

            ComprasInternacionTableAdapters.H2_Compras_Traer_Tipo_ServicioTableAdapter adapter = new ComprasInternacionTableAdapters.H2_Compras_Traer_Tipo_ServicioTableAdapter();
            ComprasInternacion.H2_Compras_Traer_Tipo_ServicioDataTable aTable = adapter.GetData();
            foreach (ComprasInternacion.H2_Compras_Traer_Tipo_ServicioRow row in aTable.Rows)
            {
                list.Add(new compras_Servicio(row.id, row.Descripcion,row.activo));
            }
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<compras_Cirugia> COMPRAS_CIRUGIAS(int afiliadoId)
    {
        try
        {
            List<compras_Cirugia> list = new List<compras_Cirugia>();

            ComprasInternacionTableAdapters.H2_Traer_Cirugias_ComprasTableAdapter adapter = new ComprasInternacionTableAdapters.H2_Traer_Cirugias_ComprasTableAdapter();
            ComprasInternacion.H2_Traer_Cirugias_ComprasDataTable aTable = adapter.GetData(afiliadoId);
            foreach (ComprasInternacion.H2_Traer_Cirugias_ComprasRow row in aTable.Rows)
            {
                list.Add(new compras_Cirugia(row.id, row.fecha.ToShortDateString(), row.cirugias, row.motivo, row.medico, row.especialidad, row.medicoId, row.especialidadId));
            }
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long COM_ORDEN_CAB_INSERT_INTERNACION(long G_PedCAB, long ORDEN_COM_CAB_ID, long ORDEN_COM_CAB_USU_ID, int ORDEN_COM_CAB_SECTOR, bool ORDEN_COM_CAB_ENVIADO, string idsPedidos)
    {
        //try
        //{

            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_COM_ORDEN_CAB_INSERT_INTERNACION(G_PedCAB, ORDEN_COM_CAB_ID, ORDEN_COM_CAB_USU_ID, ORDEN_COM_CAB_SECTOR, ORDEN_COM_CAB_ENVIADO, idsPedidos);
            //if (Id != null) 
                return Convert.ToInt64(Id.ToString());
            //else throw new Exception("Error al insertar cabecera.");
        //}
        //catch (SqlException ex)
        //{
        //    throw new Exception(ex.Message);
        //}
    }

    public void RECORDAR_SELECCION(long id)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            //object Id = 
                adapter.H2_COMRECORDAR_SELECCION(id);
            //if (Id != null) return Convert.ToInt64(Id.ToString());
            //else throw new Exception("Error al recordar selección.");
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void COMPRAS_PEDIDO_DET_INSERT_INTERNACION(int PED_COM_ID, List<pedidoInternacion> listaPedidos)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_COMPRAS_BORRAR_ORDEN_DE_COMPRA_INTERNACION_DET(PED_COM_ID);

            foreach(pedidoInternacion item in listaPedidos)
            {
                adapter.H2_COMPRAS_INSERTAR_BORRAR_ORDEN_DE_COMPRA_INTERNACION_DET(PED_COM_ID, item.PED_COM_DET_INS_DESC, item.PED_COM_DET_CANTIDAD, item.PED_COM_DET_PRV_ID);
            }
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    //public void COMPRAS_PEDIDO_INTERMEDIO_INSERT_INTERNACION(int idPedido, int idPedido_PED_COM_CAB, int guradarBorrar)
    //{
    //    try
    //    {
    //            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
    //            adapter.H2_COMPRAS_INSERTAR_BORRAR_ORDEN_DE_COMPRA_INTERNACION(idPedido, idPedido_PED_COM_CAB, guradarBorrar);
        
    //    }
    //    catch (SqlException ex)
    //    {
    //        throw new Exception(ex.Message);
    //    }
    //}


    public void RELACIONAR_PEDIDO_ORDEN_COMPRA(int idCAB_PRIMARIO, int idCAB_ORDEN, string idsDET_ITEMS)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_RELACIONAR_PEDIDO_ORDEN_COMPRA(idCAB_PRIMARIO, idCAB_ORDEN, idsDET_ITEMS);

        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public int EXP_PEDIDOS_DESPEDIR_INTERNACION(int id)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object reseteo =  adapter.H2_EXP_PEDIDOS_DESPEDIR_INTERNACION(id);
            if (reseteo != null) return Convert.ToInt32(reseteo);
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }



    public int Compras_Chekiar_Elimina_Orden_Compra_Internacion(long id)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object reseteo = adapter.H2_Compras_Chekiar_Elimina_Orden_Compra_Internacion(id);
            if (reseteo != null) return Convert.ToInt32(reseteo);
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public int Recibir_Orden_Compras_Internacion(long id)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            object reseteo = adapter.H2_Recibir_Orden_Compras_Internacion(id);
            if (reseteo != null) return Convert.ToInt32(reseteo);
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }
    public List<COM_ORDEN_CAB_INTERNACION> COM_ORDEN_CAB_LIST(long ORD_CAB_ID, int Tipo, string Desde, string Hasta, long ProveedorId)
    {
        try
        {
            List<COM_ORDEN_CAB_INTERNACION> list = new List<COM_ORDEN_CAB_INTERNACION>();

            long EXP_ID = 0;
            long EXP_PED_ID = 0;
            ComprasInternacionTableAdapters.H2_COM_ORDEN_CAB_LIST_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_COM_ORDEN_CAB_LIST_INTERNACIONTableAdapter();
            ComprasInternacion.H2_COM_ORDEN_CAB_LIST_INTERNACIONDataTable aTable = adapter.GetData(ORD_CAB_ID, DateTime.Parse(Desde), DateTime.Parse(Hasta), ProveedorId, Tipo);
            foreach (ComprasInternacion.H2_COM_ORDEN_CAB_LIST_INTERNACIONRow row in aTable.Rows)
            {
                if (!row.IsEXP_IDNull()) { EXP_ID = row.EXP_ID; }
                if (!row.IsEXP_PED_IDNull()) { EXP_PED_ID = row.EXP_PED_ID; }
                list.Add(new COM_ORDEN_CAB_INTERNACION(EXP_ID, EXP_PED_ID, row.ORDEN_COM_CAB_ID, row.ORDEN_COM_CAB_FECHA.ToShortDateString(), row.ORDEN_COM_CAB_USU_ID, row.ORDEN_COM_CAB_PRV_ID,
                        row.ORDEN_COM_CAB_SECTOR, row.ORDEN_COM_CAB_ENVIADO, row.Proveedor, row.Usuario, Convert.ToBoolean(row.ORDEN_COM_CAB_RECIBIDO),Convert.ToBoolean(row.ORDEN_COM_CAB_BAJA)));
            }
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public List<COM_ORDEN_DET> COM_ORDEN_DET_LIST_BY_CAB(long ORD_CAB_ID)
    {
        try
        {
            List<COM_ORDEN_DET> list = new List<COM_ORDEN_DET>();

            ComprasInternacionTableAdapters.H2_COM_ORDEN_DET_LIST_BY_CAB_INTERNACIONTableAdapter adapter = new ComprasInternacionTableAdapters.H2_COM_ORDEN_DET_LIST_BY_CAB_INTERNACIONTableAdapter();
            ComprasInternacion.H2_COM_ORDEN_DET_LIST_BY_CAB_INTERNACIONDataTable aTable = adapter.GetData(ORD_CAB_ID);
            foreach (ComprasInternacion.H2_COM_ORDEN_DET_LIST_BY_CAB_INTERNACIONRow row in aTable.Rows)
                list.Add(new COM_ORDEN_DET(row.COM_ADM_INS_PEDIR_ID, row.COM_ADM_INS_PEDIR_ORD_CAB_ID, row.COM_ADM_INS_PEDIR_PED_ID, row.COM_ADM_INS_PEDIR_PRV_ID,
                    row.COM_ADM_INS_PEDIR_CANT_PED, row.COM_ADM_INS_PEDIR_USU_ID, row.PED_COM_DET_INS_DESC, row.PED_COM_DET_INS_ID,0));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public void COM_ORDEN_CAB_DAR_BAJA(long OrdenCABID, long UsuarioID)
    {
        try
        {
            ComprasInternacionTableAdapters.QueriesTableAdapter adapter = new ComprasInternacionTableAdapters.QueriesTableAdapter();
            adapter.H2_COM_ORDEN_CAB_DAR_BAJA_INTERNACION(OrdenCABID, UsuarioID);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public List<pacientes> Paciente_NHC_UOM(string NHC)
    {
        List<pacientes> lista = new List<pacientes>();
        PacientesDALTableAdapters.H2_Afiliado_Encabezado_NHC_UOM_HOSPTableAdapter adapter = new PacientesDALTableAdapters.H2_Afiliado_Encabezado_NHC_UOM_HOSPTableAdapter();
        PacientesDAL.H2_Afiliado_Encabezado_NHC_UOM_HOSPDataTable aTable = adapter.GetData(NHC);

        int pos = 0;
        //pacientes p = new pacientes();
        foreach (PacientesDAL.H2_Afiliado_Encabezado_NHC_UOM_HOSPRow row in aTable.Rows)
        {
            pacientes p = new pacientes();
            pos++;
            p.Nro_Busqueda = pos;
            p.cuil_titu = row.cuil_titu;
            p.cuil = row.cuil;

            if (!row.IsCuitNull())
            { p.CUIT = row.Cuit; }
            else
            { p.CUIT = 0; }

            if (!row.IsLocalidadNull()) { p.localidad = row.Localidad; }

            if (!row.Isfecha_nacimientoNull()) p.fecha_nacimiento = row.fecha_nacimiento;
            if (!row.IsSeccionalNull()) p.Seccional = row.Seccional;
            if (!row.IsNro_SeccionalNull()) p.Nro_Seccional = row.Nro_Seccional.ToString(); else p.Nro_Seccional = "999";

            if (!row.IscalleNull())
            {
                if (!row.IsnumeroNull())
                {
                    p.calle = row.calle + " " + row.numero;
                }
                p.calle = row.calle;
            }

            TimeSpan ts = DateTime.Now.Date - p.fecha_nacimiento;

            int anios = ts.Days / 365;
            int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
            //int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
            string str_anios, str_meses;

            if (anios != 1) str_anios = " Años ";
            else str_anios = " Año ";
            if (meses != 1) str_meses = " Meses ";
            else str_meses = " Mes ";

            p.Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

            p.Paciente = row.apellido;
            p.documento = row.documento;

            p.documento_real = row.documento_real;
            p.TipoDoc = row.cod_tipo;

            if (!row.IstelefonoNull()) p.Telefono = row.telefono;
            if (!row.IsCelularNull()) p.Celular = row.Celular;

            p.Titular = "";
            p.NHC = row.cuil;

            p.ObraSocial = row.OS;
            p.OSId = row.OSId;

            if (!row.IsFV_PMINull())
                p.FechaPMI = row.FV_PMI.ToShortDateString();
            else p.FechaPMI = string.Empty;

            if (!row.IsPMINull()) { p.PMI = row.PMI; } else { p.PMI = false; p.FechaPMI = string.Empty; }
            if (!row.IsPINull()) { p.PI = row.PI; } else { p.PI = false; }


            p.PagaBono = true;

            if (anios == 0) p.PagaBono = false; //Menor a 1 año, no paga
            if (!row.IsFV_PMINull())
                if (row.FV_PMI >= DateTime.Now) p.PagaBono = false; //tiene PMI, no paga

            if (!row.IsDiscapacidadNull())
            {
                p.Discapacidad = Convert.ToInt32(row.Discapacidad);
                p.PagaBono = false; //No paga discapacitado
            }
            else
            {
                p.Discapacidad = 0;
            }

            if (!row.IsHC_UOM_CENTRALNull())
                p.NHC_UOM = row.HC_UOM_CENTRAL;
            else p.NHC_UOM = string.Empty;

            if (!row.IsObservacionesNull())
                p.Observaciones = row.Observaciones;
            else p.Observaciones = string.Empty;

            if (!row.IsFecha_BajaNull())
            {
                p.FechaVencido = row.Fecha_Baja.ToShortDateString();
                if (DateTime.Parse(p.FechaVencido) <= DateTime.Now) p.Vencido = true;
                else p.Vencido = false;
            }
            else p.Vencido = false;

            if (!row.IsfotoNull()) p.Foto = row.foto;
            if (!row.IsSoc_IdNull()) p.Soc_Id = row.Soc_Id;

            if (!row.IsCod_ParienteNull()) p.cod_pariente = row.Cod_Pariente.ToString();

            if (!row.IsEstadoCivilNull()) { p.estado_civil_descripcion = ""; } else { p.estado_civil_descripcion = row.EstadoCivil; }


            lista.Add(p);
        }

        return lista;
    }

    public List<pacientes> Paciente_DOC(Int32 DOC, string T_Doc)
    {
        List<pacientes> lista = new List<pacientes>();
        PacientesDALTableAdapters.H2_Afiliado_Encabezado_DOCTableAdapter adapter = new PacientesDALTableAdapters.H2_Afiliado_Encabezado_DOCTableAdapter();
        PacientesDAL.H2_Afiliado_Encabezado_DOCDataTable aTable = adapter.GetData(DOC, T_Doc);

        int pos = 0;

        foreach (PacientesDAL.H2_Afiliado_Encabezado_DOCRow row in aTable.Rows)
        {
            pacientes p = new pacientes();
            pos++;
            p.Nro_Busqueda = pos;
            p.cuil_titu = row.cuil_titu;
            p.cuil = row.cuil;
            if (!row.IsFecha_BajaNull())
                p.Fecha_Baja = row.Fecha_Baja;
            else p.Fecha_Baja = DateTime.Parse("01/01/1900");

            if (p.Fecha_Baja <= DateTime.Now && !p.Fecha_Baja.ToShortDateString().Equals("01/01/1900")) p.Vencido = true;
            else p.Vencido = false;

            p.FechaVencido = p.Fecha_Baja.ToShortDateString();

            if (!row.IsCod_ParienteNull())
                p.cod_pariente = row.Cod_Pariente.ToString();
            else p.cod_pariente = string.Empty;

            if (!row.IsTipo_docNull()) p.TipoDoc = row.cod_tipo;
            else p.TipoDoc = string.Empty;

            if (!row.Isfecha_nacimientoNull()) p.fecha_nacimiento = row.fecha_nacimiento;

            TimeSpan ts = DateTime.Now.Date - p.fecha_nacimiento;
            p.fec = p.fecha_nacimiento.Year;

            int anios = ts.Days / 365;
            int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
            //int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
            string str_anios, str_meses;

            if (anios != 1) str_anios = " Años ";
            else str_anios = " Año ";
            if (meses != 1) str_meses = " Meses ";
            else str_meses = " Mes ";

            p.Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

            p.PagaBono = true;

            if (anios == 0) p.PagaBono = false; //Menor a 1 año, no paga
            if (!row.IsFV_PMINull())
                if (row.FV_PMI >= DateTime.Now) p.PagaBono = false; //tiene PMI, no paga

            p.documento_real = row.documento_real;

            p.documento = row.documento;
            if (!row.IsSeccionalNull()) p.Seccional = row.Seccional;

            if (!row.IsLocalidadNull()) { p.localidad = row.Localidad; }

            p.Paciente = row.apellido;

            if (!row.IsNro_SeccionalNull()) p.Nro_Seccional = row.Nro_Seccional.ToString(); else p.Nro_Seccional = "999";

            if (!row.IstelefonoNull()) p.Telefono = row.telefono;
            if (!row.IsCelularNull()) p.Celular = row.Celular;
            p.Titular = "";

            if (!row.IsOSNull())
                p.ObraSocial = row.OS;
            else p.ObraSocial = string.Empty;

            if (!row.IsOSIdNull())
                p.OSId = row.OSId;
            else p.OSId = 0;

            if (!row.IsPMINull()) { p.PMI = row.PMI; } else { p.PMI = false; }
            if (!row.IsPINull()) { p.PI = row.PI; } else { p.PI = false; }

            if (!row.IsDiscapacidadNull())
            {
                p.Discapacidad = Convert.ToInt32(row.Discapacidad);
                p.PagaBono = false; //No paga discapacitado
            }
            else
            {
                p.Discapacidad = 0;
            }

            if (!row.IsFV_PMINull()) p.FechaPMI = row.FV_PMI.ToShortDateString();
            else p.FechaPMI = string.Empty;

            p.NHC = row.cuil;
            if (!row.IsHC_UOM_CENTRALNull())
                p.NHC_UOM = row.HC_UOM_CENTRAL;
            else p.NHC_UOM = string.Empty;

            if (!row.IsObservacionesNull()) p.Observaciones = row.Observaciones;
            else p.Observaciones = string.Empty;

            if (!row.IsfotoNull()) p.Foto = row.foto;
            if (!row.IsSoc_IdNull()) p.Soc_Id = row.Soc_Id;

            p.CUIT = row.Cuit;

            lista.Add(p);
        }                      

        return lista;
    }

}

