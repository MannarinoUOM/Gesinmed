using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Descripción breve de Compras_AdministracionBLL
/// </summary>
public class Compras_AdministracionBLL
{
	public Compras_AdministracionBLL()
	{
		//
		// TODO: Agregar aquí la lógica del constructor
		//
	}

    public long PED_COM_CAB_INSERT(COM_PED_CAB cab)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_PED_COM_CAB_INSERT(cab.PED_COM_ID, cab.PED_COM_SERV_ID, cab.PED_COM_USUARIO_ID, cab.PED_COM_BAJA, cab.PED_COM_ESTADO);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else return -1;
            
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<COM_PED_CAB> COM_ADM_PEDIDOS_BUSCAR(string Desde, string Hasta, long Ped_Id, long ServicioId)
    {
        try
        {
            List<COM_PED_CAB> list = new List<COM_PED_CAB>();
            Compras_AdministracionDALTableAdapters.H2_COM_ADM_PEDIDOS_BUSCARTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_COM_ADM_PEDIDOS_BUSCARTableAdapter();
            Compras_AdministracionDAL.H2_COM_ADM_PEDIDOS_BUSCARDataTable aTable = adapter.GetData(DateTime.Parse(Desde), DateTime.Parse(Hasta), Ped_Id, ServicioId);
            foreach (Compras_AdministracionDAL.H2_COM_ADM_PEDIDOS_BUSCARRow row in aTable.Rows)
                list.Add(new COM_PED_CAB(row.PED_COM_ID, row.SERV_ID, row.PED_FECHA.ToShortDateString(), 0, false, 0, row.SERVICIO, row.USUARIO));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void PED_COM_DET_INSERT(COM_PED_DET det)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_PED_COM_DET_INSERT(det.PED_COM_DET_ID, det.PED_COM_ID, det.PED_COM_DET_INS_ID, det.PED_COM_DET_INS_DESC, det.PED_COM_DET_CANTIDAD, 
                det.PED_COM_DET_PRV_ID, det.PED_COM_DET_OBS);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void PED_COM_DET_DELETE(long PED_COM_ID)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_PED_COM_DET_DELETE(PED_COM_ID);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void COM_ADM_INS_UPDATE(COM_ADM_INS ins)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_COM_ADM_INS_UPDATE(ins.COM_ADM_INS_INS_ID, ins.COM_ADM_INS_INS_DESC, ins.COM_ADM_INS_BAJA);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<COM_ADM_INS> COM_ADM_INS_LIST(bool Todos)
    {
        try
        {
            List<COM_ADM_INS> list = new List<COM_ADM_INS>();
            Compras_AdministracionDALTableAdapters.H2_COM_ADM_INS_LISTTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_COM_ADM_INS_LISTTableAdapter();
            Compras_AdministracionDAL.H2_COM_ADM_INS_LISTDataTable aTable = adapter.GetData(Todos);
            foreach (Compras_AdministracionDAL.H2_COM_ADM_INS_LISTRow row in aTable.Rows)
                list.Add(new COM_ADM_INS(row.COM_ADM_INS_INS_ID, row.COM_ADM_INS_INS_DESC, row.COM_ADM_INS_BAJA));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public List<COM_ADM_INS> COM_ADM_INS_LIST_COMBO()
    {
        try
        {
            List<COM_ADM_INS> list = new List<COM_ADM_INS>();
            Compras_AdministracionDALTableAdapters.H2_COM_ADM_INS_LIST_COMBOTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_COM_ADM_INS_LIST_COMBOTableAdapter();
            Compras_AdministracionDAL.H2_COM_ADM_INS_LIST_COMBODataTable aTable = adapter.GetData();
            foreach (Compras_AdministracionDAL.H2_COM_ADM_INS_LIST_COMBORow row in aTable.Rows)
                list.Add(new COM_ADM_INS(row.COM_ADM_INS_INS_ID, row.COM_ADM_INS_INS_DESC, false));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<COM_ADM_LIST_DET_ORDEN> COM_ADM_LIST_DET_ORDEN(string Desde, string Hasta, long ServicioId, long NroPedido, bool Todos)
    {
        try
        {
            List<COM_ADM_LIST_DET_ORDEN> list = new List<COM_ADM_LIST_DET_ORDEN>();
            Compras_AdministracionDALTableAdapters.H2_COM_ADM_LIST_DET_ORDENTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_COM_ADM_LIST_DET_ORDENTableAdapter();
            Compras_AdministracionDAL.H2_COM_ADM_LIST_DET_ORDENDataTable aTable = adapter.GetData(Convert.ToDateTime(Desde), Convert.ToDateTime(Hasta), ServicioId, NroPedido, Todos);
            foreach (Compras_AdministracionDAL.H2_COM_ADM_LIST_DET_ORDENRow row in aTable.Rows)
                list.Add(new COM_ADM_LIST_DET_ORDEN(row.PED_COM_ID,row.SERV_DESC, row.PED_COM_FECHA.ToShortDateString()));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<COM_ADM_LIST_DET_ORDEN> COM_ADM_LIST_DET_ORDEN_DET(long NroPedido)
    {
        try
        {
            List<COM_ADM_LIST_DET_ORDEN> list = new List<COM_ADM_LIST_DET_ORDEN>();
            Compras_AdministracionDALTableAdapters.H2_COM_ADM_LIST_DET_ORDEN_DETTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_COM_ADM_LIST_DET_ORDEN_DETTableAdapter();
            Compras_AdministracionDAL.H2_COM_ADM_LIST_DET_ORDEN_DETDataTable aTable = adapter.GetData(NroPedido);
            foreach (Compras_AdministracionDAL.H2_COM_ADM_LIST_DET_ORDEN_DETRow row in aTable.Rows)
                list.Add(new COM_ADM_LIST_DET_ORDEN(row.PED_COM_DET_ID, row.PED_COM_ID, row.PED_COM_DET_INS_ID, row.PED_COM_DET_INS_DESC,
                    row.PED_COM_DET_CANTIDAD, row.PED_COM_DET_PRV_ID, row.SERV_DESC, row.PED_COM_FECHA.ToShortDateString(),
                    0, row.SALDO, row.PED_COM_DET_OBS,row.PED_ULTIMO_PRECIO,row.PRECIO_COMPRA_ACTUAL));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<COM_ADM_LIST_DET_ORDEN> COM_ADM_ENT_LIST_DET(long NroPedido)
    {
        try
        {
            List<COM_ADM_LIST_DET_ORDEN> list = new List<COM_ADM_LIST_DET_ORDEN>();
            Compras_AdministracionDALTableAdapters.H2_COM_ADM_ENT_LIST_DETTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_COM_ADM_ENT_LIST_DETTableAdapter();
            Compras_AdministracionDAL.H2_COM_ADM_ENT_LIST_DETDataTable aTable = adapter.GetData(NroPedido);
            foreach (Compras_AdministracionDAL.H2_COM_ADM_ENT_LIST_DETRow row in aTable.Rows)
                list.Add(new COM_ADM_LIST_DET_ORDEN(row.PED_COM_DET_ID, row.PED_COM_ID, row.PED_COM_DET_INS_ID, row.PED_COM_DET_INS_DESC,
                    row.PED_COM_DET_CANTIDAD, row.PED_COM_DET_PRV_ID, row.SERV_DESC, row.PED_COM_FECHA.ToShortDateString(),
                    row.COM_ADM_INS_PEDIR_CANT_PED, row.SALDO, row.PED_COM_DET_OBS,0,0));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long COM_ADM_INS_PEDIR_INSERT(COM_ADM_INS_PEDIR pedido)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_COM_ADM_INS_PEDIR_INSERT(pedido.COM_ADM_INS_PEDIR_ID, pedido.COM_ADM_INS_PEDIR_ORD_CAB_ID, pedido.COM_ADM_INS_PEDIR_PED_ID,
                pedido.COM_ADM_INS_PEDIR_PRV_ID, pedido.COM_ADM_INS_PEDIR_CANT_PED, pedido.COM_ADM_INS_PEDIR_USU_ID,pedido.COM_ADM_INS_PEDIR_INS_ID,
                pedido.COM_ADM_INS_PEDIR_INS_NOM,pedido.COM_ADM_INS_PEDIR_PRECIO_COMPRA_ACTUAL,pedido.TIPO_ORDEN_COMPRA);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void COM_ADM_ORDEN_CAB_INSERT_BY_PRV(long UsuarioID)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_COM_ADM_ORDEN_CAB_INSERT_BY_PRV(UsuarioID);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public void COM_ADM_MARCAR_CLOSE(int G_PedCAB)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_COM_ADM_MARCAR_CLOSE(G_PedCAB);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void COM_ADM_ELIMINAR_INSUMO(int G_PDT_ID)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_COM_ADM_ELIMINAR_INSUMO(G_PDT_ID);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long COM_ORDEN_CAB_INSERT(COM_ORDEN_CAB cab)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_COM_ORDEN_CAB_INSERT(cab.ORDEN_COM_CAB_ID, cab.ORDEN_COM_CAB_USU_ID, cab.ORDEN_COM_CAB_SECTOR, cab.ORDEN_COM_CAB_ENVIADO, cab.ORDEN_COM_CAB_PRV_ID, DateTime.Parse(cab.ORDEN_COM_CAB_FECHA));
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public int COM_ORDEN_CAB_DAR_BAJA(long OrdenCABID, long UsuarioID)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_COM_ORDEN_CAB_DAR_BAJA(OrdenCABID, UsuarioID);
            if (Id != null) return Convert.ToInt32(Id.ToString()); else return 1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public List<compras_reporte_administracion> COMPRAS_REPORTE_ADM(string Desde, string Hasta, int Filtro)
    {
        try
        {
            List<compras_reporte_administracion> list = new List<compras_reporte_administracion>();
            Compras_AdministracionDALTableAdapters.H2_COMPRAS_REPORTE_ADMTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_COMPRAS_REPORTE_ADMTableAdapter();
            Compras_AdministracionDAL.H2_COMPRAS_REPORTE_ADMDataTable aTable = adapter.GetData(DateTime.Parse(Desde), DateTime.Parse(Hasta), Filtro);
            foreach (Compras_AdministracionDAL.H2_COMPRAS_REPORTE_ADMRow row in aTable.Rows)
                list.Add(new compras_reporte_administracion(row.FechaPedido.ToShortDateString(), row.Servicios, row.NroPedido, row.Insumo, row.CantidadPedida, row.NroOrdenCompra,
                    row.NroRemito, row.Saldo));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public List<COM_ORDEN_CAB> COM_ORDEN_CAB_LIST(long ORD_CAB_ID, string Desde, string Hasta, long ProveedorId, int Estado)
    {
        try
        {
            List<COM_ORDEN_CAB> list = new List<COM_ORDEN_CAB>();
            Compras_AdministracionDALTableAdapters.H2_COM_ORDEN_CAB_LISTTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_COM_ORDEN_CAB_LISTTableAdapter();
            Compras_AdministracionDAL.H2_COM_ORDEN_CAB_LISTDataTable aTable = adapter.GetData(ORD_CAB_ID, DateTime.Parse(Desde), DateTime.Parse(Hasta), ProveedorId, Estado);
            foreach (Compras_AdministracionDAL.H2_COM_ORDEN_CAB_LISTRow row in aTable.Rows)
                list.Add(new COM_ORDEN_CAB(row.ORDEN_COM_CAB_ID, row.ORDEN_COM_CAB_FECHA.ToShortDateString(), row.ORDEN_COM_CAB_USU_ID, row.ORDEN_COM_CAB_PRV_ID,row.TIPO_ORDEN,
                    row.ORDEN_COM_CAB_SECTOR, row.ORDEN_COM_CAB_ENVIADO, row.Proveedor, row.Usuario,Convert.ToBoolean(row.Pendiente),row.Total));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public List<COM_ORDEN_CAB> Verificar_Estado_Orden_Compra_Cabecera(string ordenes)
    {
        try
        {
            List<COM_ORDEN_CAB> list = new List<COM_ORDEN_CAB>();
            Compras_AdministracionDALTableAdapters.H2_Verificar_Estado_Orden_Compra_CabeceraTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_Verificar_Estado_Orden_Compra_CabeceraTableAdapter();
            Compras_AdministracionDAL.H2_Verificar_Estado_Orden_Compra_CabeceraDataTable aTable = adapter.GetData(ordenes);
            foreach (Compras_AdministracionDAL.H2_Verificar_Estado_Orden_Compra_CabeceraRow row in aTable.Rows)
            {
                COM_ORDEN_CAB c = new COM_ORDEN_CAB();
                c.ORDEN_COM_CAB_ID = row.ORDEN_COM_CAB_ID;
                c.PENDIENTE = row.estado;
                list.Add(c);
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
            Compras_AdministracionDALTableAdapters.H2_COM_ORDEN_DET_LIST_BY_CABTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_COM_ORDEN_DET_LIST_BY_CABTableAdapter();
            Compras_AdministracionDAL.H2_COM_ORDEN_DET_LIST_BY_CABDataTable aTable = adapter.GetData(ORD_CAB_ID);
            foreach (Compras_AdministracionDAL.H2_COM_ORDEN_DET_LIST_BY_CABRow row in aTable.Rows)
                list.Add(new COM_ORDEN_DET(row.COM_ADM_INS_PEDIR_ID, row.COM_ADM_INS_PEDIR_ORD_CAB_ID, row.COM_ADM_INS_PEDIR_PED_ID, row.COM_ADM_INS_PEDIR_PRV_ID,
                    row.COM_ADM_INS_PEDIR_CANT_PED, row.COM_ADM_INS_PEDIR_USU_ID, row.PED_COM_DET_INS_DESC, row.PED_COM_DET_INS_ID, row.PRECIO_COMPRA_ACTUAL, row.TIPO_ORDEN_COMPRA,row.REMITO,row.CANTIDAD_TOTAL_RECIBIDA));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


        public List<COM_ORDEN_DET> Actualizar_Estado_Orden_Compra(long PDT_ID)
    {
        try
        {
            List<COM_ORDEN_DET> list = new List<COM_ORDEN_DET>();
            Compras_AdministracionDALTableAdapters.H2_Actualizar_Estado_Orden_CompraTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_Actualizar_Estado_Orden_CompraTableAdapter();
            Compras_AdministracionDAL.H2_Actualizar_Estado_Orden_CompraDataTable aTable = adapter.GetData(PDT_ID);
            foreach (Compras_AdministracionDAL.H2_Actualizar_Estado_Orden_CompraRow row in aTable.Rows)
                list.Add(new COM_ORDEN_DET(row.COM_ADM_INS_PEDIR_ID, row.COM_ADM_INS_PEDIR_ORD_CAB_ID, row.COM_ADM_INS_PEDIR_PED_ID, row.COM_ADM_INS_PEDIR_PRV_ID,
                    row.COM_ADM_INS_PEDIR_CANT_PED, row.COM_ADM_INS_PEDIR_USU_ID, row.PED_COM_DET_INS_DESC, row.PED_COM_DET_INS_ID, row.PRECIO_COMPRA_ACTUAL, row.TIPO_ORDEN_COMPRA, row.REMITO, row.CANTIDAD_TOTAL_RECIBIDA));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void COM_ADM_INS_PEDIR_DELETE_BY_ID(long DET_ID)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_COM_ADM_INS_PEDIR_DELETE_BY_ID(DET_ID);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void COMPRAS_REMITOS_ING_CAB_INTERNACION_UPDATE(long REM_ID, string LETRA, string SUC, string NUMERO, int tipo)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_COMPRAS_REMITOS_ING_CAB_INTERNACION_UPDATE(REM_ID, LETRA, SUC, NUMERO, tipo);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public long COM_ADM_ENT_CAB_INSERT(COM_ADM_ENT_CAB oData)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_COM_ADM_ENT_CAB_INSERT(oData.COM_ADM_ENT_CAB_ID, oData.COM_ADM_ENT_CAB_PED_ID, oData.COM_ADM_ENT_CAB_USU_ID);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public void COM_ADM_ENT_DET_INSERT(COM_ADM_ENT_DET oData)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_COM_ADM_ENT_DET_INSERT(oData.COM_ADM_ENT_DET_ID, oData.COM_ADM_ENT_DET_CAB_ID, oData.COM_ADM_ENT_PED_COM_DET_ID, oData.COM_ADM_ENT_CANT_ENT);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public int COM_FAR_INSUMOS_SERV_INSERT(COM_FAR_INSUMOS_SERV oData)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            object id = adapter.H2_COM_FAR_INSUMOS_SERV_INSERT(oData.COM_ISE_ID, oData.COM_ISE_INS_ID, oData.COM_ISE_SERV_ID, oData.COM_ISE_CANT, oData.COM_ISE_USU_ID);
            if (id != null) return Convert.ToInt32(id.ToString());
            else return -1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public int COM_FAR_INSUMOS_SERV_DELETE_BY_SRV(long SRV_ID)
    {
        try
        {
            Compras_AdministracionDALTableAdapters.QueriesTableAdapter adapter = new Compras_AdministracionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_COM_FAR_INSUMOS_SERV_DELETE_BY_SRV(SRV_ID);
            return 1;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<COM_FAR_INSUMOS_SERV> COM_FAR_INSUMOS_SERV_LIST_BY_SRVID(long SRV_ID)
    {
        try
        {
            List<COM_FAR_INSUMOS_SERV> list = new List<COM_FAR_INSUMOS_SERV>();
            Compras_AdministracionDALTableAdapters.H2_COM_FAR_INSUMOS_SERV_LIST_BY_SRVIDTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_COM_FAR_INSUMOS_SERV_LIST_BY_SRVIDTableAdapter();
            Compras_AdministracionDAL.H2_COM_FAR_INSUMOS_SERV_LIST_BY_SRVIDDataTable aTable = adapter.GetData(SRV_ID);
            foreach (Compras_AdministracionDAL.H2_COM_FAR_INSUMOS_SERV_LIST_BY_SRVIDRow row in aTable.Rows)
                list.Add(new COM_FAR_INSUMOS_SERV(0, (int)SRV_ID, row.COM_ISE_INS_ID, row.COM_ISE_CANT, row.COM_ISE_INS_NOM));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }
    

    public List<COM_ADM_ENT_DET> COM_ADM_ENT_DETALLE_BY_PEDIDO_ID(long PEDIDO_CAB_ID)
    {
        try
        {
            List<COM_ADM_ENT_DET> list = new List<COM_ADM_ENT_DET>();
            Compras_AdministracionDALTableAdapters.H2_COM_ADM_ENT_DETALLE_BY_PEDIDO_IDTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_COM_ADM_ENT_DETALLE_BY_PEDIDO_IDTableAdapter();
            Compras_AdministracionDAL.H2_COM_ADM_ENT_DETALLE_BY_PEDIDO_IDDataTable aTable = adapter.GetData(PEDIDO_CAB_ID);
            foreach (Compras_AdministracionDAL.H2_COM_ADM_ENT_DETALLE_BY_PEDIDO_IDRow row in aTable.Rows)
                list.Add(new COM_ADM_ENT_DET(0, row.ENT_CAB_ID, 0, row.CANT_ENT, row.ENT_FECHA.ToShortDateString(), row.USU_ENT, row.INSUMO));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<COM_ADM_LIST_DET_ORDEN> COM_ADM_PED_LIST(string Desde, string Hasta, long ServicioId, long NroPedido, int Pendiente)
    {
        try
        {
            List<COM_ADM_LIST_DET_ORDEN> list = new List<COM_ADM_LIST_DET_ORDEN>();
            Compras_AdministracionDALTableAdapters.H2_COM_ADM_PED_LISTTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_COM_ADM_PED_LISTTableAdapter();
            Compras_AdministracionDAL.H2_COM_ADM_PED_LISTDataTable aTable = adapter.GetData(Convert.ToDateTime(Desde), Convert.ToDateTime(Hasta), ServicioId, NroPedido, Pendiente);
            foreach (Compras_AdministracionDAL.H2_COM_ADM_PED_LISTRow row in aTable.Rows)
                list.Add(new COM_ADM_LIST_DET_ORDEN(row.PED_COM_ID, row.SERV_DESC, row.PED_COM_FECHA.ToShortDateString(),row.PENDIENTE));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public List<COM_ADM_REPORTE_FINAL> COM_ADM_REPORTE_FINAL(string Desde, string Hasta, string Insumo, int ProveedorId, string OrdenCompra)
    {
        try
        {
            List<COM_ADM_REPORTE_FINAL> list = new List<COM_ADM_REPORTE_FINAL>();
            Compras_AdministracionDALTableAdapters.H2_COM_ADM_REPORTE_FINALTableAdapter adapter = new Compras_AdministracionDALTableAdapters.H2_COM_ADM_REPORTE_FINALTableAdapter();
            Compras_AdministracionDAL.H2_COM_ADM_REPORTE_FINALDataTable aTable = adapter.GetData(Convert.ToDateTime(Desde), Convert.ToDateTime(Hasta), Insumo, ProveedorId, OrdenCompra);
            foreach (Compras_AdministracionDAL.H2_COM_ADM_REPORTE_FINALRow row in aTable.Rows)
                list.Add(new COM_ADM_REPORTE_FINAL(row.FechaPedido.ToShortDateString(),row.Insumo,row.CantidadPedida,row.Proveedor,row.CantidadRecibida,
                    row.PrecioUnitario,row.PrecioTotal,row.FechaFactura.ToShortDateString(), row.OrdenCompra));
            return list;
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }
}