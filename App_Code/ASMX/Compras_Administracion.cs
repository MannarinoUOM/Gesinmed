using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Descripción breve de Compras_Administracion
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
[System.Web.Script.Services.ScriptService]
public class Compras_Administracion : System.Web.Services.WebService {

    public Compras_Administracion () {

        //Eliminar la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public long COM_ADM_PED_CAB_INSERT(COM_PED_CAB cab)
    {
        if (Session["Usuario"] != null)
        {
            Compras_AdministracionBLL lbll = new Compras_AdministracionBLL();
            cab.PED_COM_USUARIO_ID = ((usuarios)Session["Usuario"]).id;
            return lbll.PED_COM_CAB_INSERT(cab);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public List<compras_reporte_administracion> COMPRAS_REPORTE_ADM(string Desde, string Hasta, int Filtro)
    {
        /*  Fecha: 16/05/2017 - Autor: Fede
        *  Tabla de pantalla reportes ambulatorio caba, busca por fecha desde-hasta (H2_COMPRAS_REPORTE_ADM)
        *  Params:
        *  Fecha Desde, Fecha Hasta, Filtro: Segun radio: 0 (Todos), 1 (PEDIDOS), 2 (NO PEDIDOS)
        */
        if (Session["Usuario"] != null)
        {
            Compras_AdministracionBLL comprasBLL = new Compras_AdministracionBLL();
            return comprasBLL.COMPRAS_REPORTE_ADM(Desde, Hasta, Filtro);
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod]
    public long COM_ADM_PED_DET_INSERT(List<COM_PED_DET> objPedidos, long NroPedidoCab)
    {
            objPedidos.ForEach(delegate(COM_PED_DET det)
            {
                Compras_AdministracionBLL lbll = new Compras_AdministracionBLL();
                det.PED_COM_ID = NroPedidoCab;
                lbll.PED_COM_DET_INSERT(det);
            });
            return NroPedidoCab;
    }

    [WebMethod]
    public void PED_COM_DET_DELETE(long NroPedidoCab)
    {
            Compras_AdministracionBLL lbll = new Compras_AdministracionBLL();
            lbll.PED_COM_DET_DELETE(NroPedidoCab);
    }

    [WebMethod]
    public List<COM_ADM_INS> COM_ADM_INS_LIST(bool Todos)
    {
        Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
        return cbll.COM_ADM_INS_LIST(Todos);
    }

    [WebMethod]
    public List<COM_ADM_INS> COM_ADM_INS_LIST_COMBO()
    {
        Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
        return cbll.COM_ADM_INS_LIST_COMBO();
    }

    [WebMethod]
    public void COM_ADM_INS_UPDATE(COM_ADM_INS ins)
    {
        Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
        cbll.COM_ADM_INS_UPDATE(ins);
    }

    [WebMethod]
    public List<COM_PED_CAB> COM_ADM_PEDIDOS_BUSCAR(string Desde, string Hasta, long Ped_Id, long ServicioId = 0)
    {
        Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
        return cbll.COM_ADM_PEDIDOS_BUSCAR(Desde, Hasta, Ped_Id,ServicioId);
    }

    [WebMethod]
    public List<COM_ADM_LIST_DET_ORDEN> COM_ADM_LIST_DET_ORDEN(string Desde, string Hasta, long ServicioId, long NroPedido, bool Todos)
    {
        Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
        return cbll.COM_ADM_LIST_DET_ORDEN(Desde, Hasta, ServicioId, NroPedido, Todos);
    }

    [WebMethod]
    public List<COM_ADM_LIST_DET_ORDEN> COM_ADM_LIST_DET_ORDEN_DET(long NroPedido)
    {
        Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
        return cbll.COM_ADM_LIST_DET_ORDEN_DET(NroPedido);
    }

    [WebMethod]
    public List<COM_ADM_LIST_DET_ORDEN> COM_ADM_ENT_LIST_DET(long NroPedido)
    {
        Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
        return cbll.COM_ADM_ENT_LIST_DET(NroPedido);
    }

    [WebMethod(EnableSession=true)]   
    public long COM_ADM_INS_PEDIR_INSERT(List<COM_ADM_INS_PEDIR> objPedidos, long NroOrdenCAB)
    {
        if (Session["Usuario"] != null)
        {
            objPedidos.ForEach(delegate (COM_ADM_INS_PEDIR p) {
                if (p.COM_ADM_INS_PEDIR_CANT_PED > 0)
                {
                    Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
                    p.COM_ADM_INS_PEDIR_ORD_CAB_ID = NroOrdenCAB;
                    p.COM_ADM_INS_PEDIR_USU_ID = ((usuarios)Session["Usuario"]).id;
                    cbll.COM_ADM_INS_PEDIR_INSERT(p); //Asigna PRV a detalles
                }
            });
            Compras_AdministracionBLL c = new Compras_AdministracionBLL();
            c.COM_ADM_ORDEN_CAB_INSERT_BY_PRV(((usuarios)Session["Usuario"]).id); //Crea orden cabecera por PRV y vincula detalles con Orden CAB
            return NroOrdenCAB;
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public long COM_ORDEN_CAB_INSERT(COM_ORDEN_CAB cab)
    {
        if (Session["Usuario"] != null)
        {
                Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
                cab.ORDEN_COM_CAB_USU_ID = ((usuarios)Session["Usuario"]).id;
                return cbll.COM_ORDEN_CAB_INSERT(cab);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public int COM_ORDEN_CAB_DAR_BAJA(long ORD_CAB_ID)
    {
        if (Session["Usuario"] != null)
        {
            Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
            return cbll.COM_ORDEN_CAB_DAR_BAJA(ORD_CAB_ID, ((usuarios)Session["Usuario"]).id);
        }
        else throw new Exception("Inicie sesión nuevamente."); return 1;
    }

    [WebMethod(EnableSession = true)]
    public List<COM_ORDEN_CAB> COM_ORDEN_CAB_LIST(long ORD_CAB_ID, string Desde = "01/01/1900", string Hasta = "01/01/1900", long ProveedorId = 0, int Estado = 1)
        {
        if (Session["Usuario"] != null)
        {
            Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
            return cbll.COM_ORDEN_CAB_LIST(ORD_CAB_ID, Desde, Hasta, ProveedorId, Estado);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }  
    
    [WebMethod]
    public List<COM_ORDEN_DET> COM_ORDEN_DET_LIST_BY_CAB(long ORD_CAB_ID)
    {
            Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
            return cbll.COM_ORDEN_DET_LIST_BY_CAB(ORD_CAB_ID);
    }


    [WebMethod]
    public List<COM_ORDEN_CAB> Verificar_Estado_Orden_Compra_Cabecera(string ordenes)
    {
        Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
        return cbll.Verificar_Estado_Orden_Compra_Cabecera(ordenes);
    }

    [WebMethod]
    public List<COM_ORDEN_DET> Actualizar_Estado_Orden_Compra(long PDT_ID)
    {
        Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
        return cbll.Actualizar_Estado_Orden_Compra(PDT_ID);
    }

    [WebMethod(EnableSession = true)]
    public long COM_ADM_INS_PEDIR_INSERT_DET(COM_ADM_INS_PEDIR det)
    {
        if (Session["Usuario"] != null)
        {
           Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
           det.COM_ADM_INS_PEDIR_USU_ID = ((usuarios)Session["Usuario"]).id;
           return cbll.COM_ADM_INS_PEDIR_INSERT(det); //Asigna PRV a detalles
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }


    [WebMethod(EnableSession = true)]
    public void COM_ADM_MARCAR_CLOSE(int G_PedCAB)
    {
        if (Session["Usuario"] != null)
        {
            Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
            cbll.COM_ADM_MARCAR_CLOSE(G_PedCAB); //marca como cerrada la orden de compra
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void COM_ADM_ELIMINAR_INSUMO(int G_PDT_ID)
    {
        if (Session["Usuario"] != null)
        {
            Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
            cbll.COM_ADM_ELIMINAR_INSUMO(G_PDT_ID); //elimina un insumo de la orden de compra
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void COM_ADM_INS_PEDIR_DELETE_BY_ID(long DET_ID)
    {
        if (Session["Usuario"] != null)
        {
            Compras_AdministracionBLL cbll = new Compras_AdministracionBLL();
            cbll.COM_ADM_INS_PEDIR_DELETE_BY_ID(DET_ID);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void COMPRAS_REMITOS_ING_CAB_INTERNACION_UPDATE(long REM_ID, string LETRA, string SUC, string NUMERO, int tipo)
    {
        if (Session["Usuario"] != null)
        {
            Compras_AdministracionBLL lbll = new Compras_AdministracionBLL();
            lbll.COMPRAS_REMITOS_ING_CAB_INTERNACION_UPDATE(REM_ID,LETRA,SUC,NUMERO, tipo);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public long COM_ADM_ENT_CAB_INSERT(COM_ADM_ENT_CAB oData)
    {
        if (Session["Usuario"] != null)
        {
            Compras_AdministracionBLL lbll = new Compras_AdministracionBLL();
            oData.COM_ADM_ENT_CAB_USU_ID = ((usuarios)Session["Usuario"]).id;
            return lbll.COM_ADM_ENT_CAB_INSERT(oData);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public long COM_ADM_ENT_DET_INSERT(List<COM_ADM_ENT_DET> objPedidos, long NroEntregaCAB)
    {
        if (Session["Usuario"] != null)
        {
            objPedidos.ForEach(delegate(COM_ADM_ENT_DET oData)
            {
                Compras_AdministracionBLL lbll = new Compras_AdministracionBLL();
                oData.COM_ADM_ENT_DET_CAB_ID = NroEntregaCAB;
                lbll.COM_ADM_ENT_DET_INSERT(oData);
            });
            return NroEntregaCAB;
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }
    
    [WebMethod]
    public List<COM_ADM_ENT_DET> COM_ADM_ENT_DETALLE_BY_PEDIDO_ID(long PEDIDO_CAB_ID)
    {
        Compras_AdministracionBLL lbll = new Compras_AdministracionBLL();
        return lbll.COM_ADM_ENT_DETALLE_BY_PEDIDO_ID(PEDIDO_CAB_ID);
    }

    [WebMethod]
    public List<COM_ADM_LIST_DET_ORDEN> COM_ADM_PED_LIST(string Desde, string Hasta, long ServicioId, long NroPedido, int Pendiente)
    {
        Compras_AdministracionBLL lbll = new Compras_AdministracionBLL();
        return lbll.COM_ADM_PED_LIST(Desde, Hasta, ServicioId, NroPedido, Pendiente);
    }

    [WebMethod(EnableSession=true)]
    public int COM_FAR_INSUMOS_SERV_INSERT(List<COM_FAR_INSUMOS_SERV> objMedicamentos)
    {
        if (Session["Usuario"] != null)
        {
            int Id = 0;
            objMedicamentos.ForEach(delegate(COM_FAR_INSUMOS_SERV ins)
            {
                Compras_AdministracionBLL lbll = new Compras_AdministracionBLL();
                ins.COM_ISE_USU_ID = ((usuarios)Session["Usuario"]).id;
                Id = lbll.COM_FAR_INSUMOS_SERV_INSERT(ins);
            });
            return Id;
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod(EnableSession = true)]
    public int COM_FAR_INSUMOS_SERV_DELETE_BY_SRV(long SRV_ID)
    {
        if (Session["Usuario"] != null)
        {
            Compras_AdministracionBLL lbll = new Compras_AdministracionBLL();
            return lbll.COM_FAR_INSUMOS_SERV_DELETE_BY_SRV(SRV_ID);
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod(EnableSession = true)]
    public List<COM_FAR_INSUMOS_SERV> COM_FAR_INSUMOS_SERV_LIST_BY_SRVID(long SRV_ID)
    {
        if (Session["Usuario"] != null)
        {
            Compras_AdministracionBLL lbll = new Compras_AdministracionBLL();
            return lbll.COM_FAR_INSUMOS_SERV_LIST_BY_SRVID(SRV_ID);
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod(EnableSession = true)]
    public List<COM_ADM_REPORTE_FINAL> COM_ADM_REPORTE_FINAL(string Desde, string Hasta, string Insumo, int ProveedorId, string OrdenCompra)
    {
        if (Session["Usuario"] != null)
        {
            Compras_AdministracionBLL lbll = new Compras_AdministracionBLL();
            return lbll.COM_ADM_REPORTE_FINAL(Desde, Hasta, Insumo, ProveedorId,OrdenCompra);
        }
        else throw new Exception("Inicie Sesion.");
    }
    
}
