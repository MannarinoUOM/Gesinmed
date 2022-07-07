using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Descripción breve de Compras
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
[System.Web.Script.Services.ScriptService]
public class Compras : System.Web.Services.WebService {

    public Compras () {

        //Eliminar la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    

    [WebMethod(EnableSession = true)]
    public com_gastos_ext_cab COM_GASTOS_EXT_CAB_LIST_BY_ID(long COM_GASTOS_EXT_CAB_ID)
    {
        if (Session["Usuario"] != null)
        {
            ComprasBLL lbll = new ComprasBLL();
            return lbll.COM_GASTOS_EXT_CAB_LIST_BY_ID(COM_GASTOS_EXT_CAB_ID);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public List<com_gastos_ext_det> COM_GASTOS_EXT_DET_LIST_BY_ID(long COM_GASTOS_EXT_CAB_ID)
    {
        if (Session["Usuario"] != null)
        {
            ComprasBLL lbll = new ComprasBLL();
            return lbll.COM_GASTOS_EXT_DET_LIST_BY_ID(COM_GASTOS_EXT_CAB_ID);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }
    

    [WebMethod(EnableSession = true)]
    public void BajaAdjunto(long idArchivo)
    {
        if (Session["Usuario"] != null)
        {
            ComprasBLL lbll = new ComprasBLL();
            lbll.BajaAdjunto(idArchivo);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public long COM_GASTOS_EXT_CAB_INSERT(com_gastos_ext_cab cab)
    {
        if (Session["Usuario"] != null)
        {
            cab.COM_GASTOS_EXT_CAB_USU_ID = ((usuarios)Session["Usuario"]).id;
            ComprasBLL lbll = new ComprasBLL();
            if (cab.COM_GASTOS_EXT_CAB_ID > 0) lbll.COM_GASTOS_EXT_DET_DELETE(cab.COM_GASTOS_EXT_CAB_ID);
            return lbll.COM_GASTOS_EXT_CAB_INSERT(cab);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public long COM_GASTOS_EXT_DET_INSERT(List<com_gastos_ext_det> arr_Data, long CabeceraId)
    {
        if (Session["Usuario"] != null)
        {
            arr_Data.ForEach(p => ComprasBLL.COM_GASTOS_EXT_DET_INSERT(p,CabeceraId));
            return CabeceraId;
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod]
    public List<Compras_Adjuntos> Adjuntos_List(long ExpId)
    {
        ComprasBLL lbll = new ComprasBLL();
        return lbll.Adjuntos_List(ExpId);
    }

    [WebMethod]
    public List<com_ins_gastos_ext> COMPRAS_INSUMOS_INTERNACION_EXTRAORD(bool Todos)
    {
        ComprasBLL lbll = new ComprasBLL();
        return lbll.COMPRAS_INSUMOS_INTERNACION_EXTRAORD(Todos);
    }

    [WebMethod]
    public List<compras_insumos_combo> List_InsumosCombo(bool Todos) 
    {
        ComprasBLL comprasBLL = new ComprasBLL();
        return comprasBLL.List_InsumosCombo(Todos);
    }

    [WebMethod]
    public int AsiganarInsumoAltoCosto(long id)
    {
        ComprasBLL comprasBLL = new ComprasBLL();
        return comprasBLL.Asiganar_Insumo_Alto_Costo(id);
    }


    //[WebMethod]
    //public List<compras_insumos_combo> List_InsumosCombo_by_Desc(string Descripcion)
    //{
    //    ComprasBLL comprasBLL = new ComprasBLL();
    //    return comprasBLL.List_InsumosCombo_by_Desc(Descripcion);
    //}

    [WebMethod]
    public compras_insumo_info List_Insumo_byId(int IdInsumo) 
    {
        ComprasBLL comprasBLL = new ComprasBLL();
        return comprasBLL.List_Insumo_byId(IdInsumo);
    }
    
    [WebMethod]
    public List<compras_deposito> List_Depositos(bool Todos) 
    {
        ComprasBLL comprasBLL = new ComprasBLL();
        return comprasBLL.List_Depositos(Todos);
    }

    [WebMethod(EnableSession=true)]
    public long Insert_Remitos_Cabecera(compras_remito_cabecera cab)
    {
        if (Session["Usuario"] != null)
        {
            cab.REM_I_USUARIO = ((usuarios)Session["Usuario"]).id;
            cab.REM_USUARIO_MOD = ((usuarios)Session["Usuario"]).id;
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.Insert_Remitos_Cabecera(cab);
        }
        else throw new Exception("Inicie sesion nuevamente.");
    }

    [WebMethod]
    public long Insert_Remitos_Detalle(List<compras_remito_detalle> detalles, int NroRemito)
    {
        ComprasBLL comprasBLL = new ComprasBLL();
        foreach (compras_remito_detalle d in detalles)
        {
            d.RED_REM_ID = NroRemito;
            comprasBLL.Insert_Remitos_Detalle(d);
        }
        return NroRemito;
    }

    [WebMethod(EnableSession=true)]
    public List<compras_remito_buscar> List_Remitos(string Desde, string Hasta, int ProveedorId, string Letra, int Sucursal, int Numero,
        string Letra_Fact, int Sucursal_Fact, int Numero_Fact)
    {
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.Remitos_List(Desde, Hasta, ProveedorId, Letra, Sucursal, Numero, Letra_Fact, Sucursal_Fact, Numero_Fact);
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod]
    public bool Existe_Remito(compras_remito_cabecera cab)
    {
            ComprasBLL comprasBLL = new ComprasBLL();
            if (comprasBLL.Existe_Remito(cab) == 1) return true;
            else return false;
    }

    [WebMethod(EnableSession=true)]
    public compras_remito_cabecera_list Remito_List_Cab_Id(long RemitoId)
    {
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.Remito_List_Cab_Id(RemitoId);
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod]
    public List<compras_remito_detalle> Remito_List_Det_Id(long RemitoId)
    {
           ComprasBLL comprasBLL = new ComprasBLL();
           return comprasBLL.Remito_List_Det_Id(RemitoId);
    }

    [WebMethod(EnableSession=true)]
    public void Remito_Baja(long RemitoId)
    {
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            comprasBLL.Remito_Baja(RemitoId, ((usuarios)Session["Usuario"]).id);
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod]
    public List<compras_expediente_estado> Expediente_Estado_List(bool Todos)
    {
          ComprasBLL comprasBLL = new ComprasBLL();
          return comprasBLL.Expediente_Estado_List(Todos);
    }

    [WebMethod]
    public List<compras_expediente_diagnostico> Expediente_Diagnostico_List(bool Todos)
    {
        ComprasBLL comprasBLL = new ComprasBLL();
        return comprasBLL.Expediente_Diagnostico_List(Todos);
    }

    [WebMethod(EnableSession=true)]
    public expediente_cab Expediente_Cab_List_byId(long ExpId)
    {
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.Expediente_Cab_List_byId(ExpId);
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod]
    public List<int> Expediente_Patologias_List_by_ExpId(long ExpId)
    {
         ComprasBLL comprasBLL = new ComprasBLL();
         return comprasBLL.Expediente_Patologias_List_by_ExpId(ExpId);
    }

    [WebMethod(EnableSession=true)]
    public long Expediente_Cab_Insert(expediente_cab expediente, string PatologiasIds, expediente_extras extra, string DiagnosticosIds)
    {
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            expediente.EXP_USUARIO = ((usuarios)Session["Usuario"]).id;

            Expediente_Patologia_Delete(expediente.EXP_ID); //Si existen patologias del ExpId se borran (solo para modificacion)
            Expediente_Diagnostico_Delete(expediente.EXP_ID); //Si existe diags del ExpId se borran (solo en mod)

            long ExpId = comprasBLL.Expediente_Cab_Insert(expediente); //Inserto Cabecera
            Expediente_Patologias_Insert(ExpId, PatologiasIds); //Luego las patologias seleccionadas
            Expediente_Diagnosticos_Insert(ExpId, DiagnosticosIds); //Luego los diag seleccionados

            extra.EXP_EXT_EXP_ID = ExpId; //extras
            comprasBLL.Expediente_Extras_Insert(extra); //Inserto extras
            return ExpId;
        }
        else throw new Exception("Inicie Sesion.");
    }

    private void Expediente_Patologia_Delete(long ExpId) //Borro patologias anteriores
    {
        if (ExpId > 0)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            comprasBLL.Expediente_Patologia_Delete(ExpId);
        }
    }

    private void Expediente_Diagnostico_Delete(long ExpId) //Borro Diagnosticos anteriores
    {
        if (ExpId > 0)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            comprasBLL.Expediente_Diagnosticos_Delete(ExpId);
        }
    }

    private void Expediente_Patologias_Insert(long ExpId, string PatologiasIds)
    {
        ComprasBLL comprasBLL = new ComprasBLL();
        string[] PatIds = PatologiasIds.Split(',');
        foreach (string Id in PatIds)
        {
            int _ID;
            if (int.TryParse(Id, out _ID)) comprasBLL.Expediente_Patologia_Insert(ExpId, _ID);
        }
    }

    private void Expediente_Diagnosticos_Insert(long ExpId, string DiagnosticosIds)
    {
        ComprasBLL comprasBLL = new ComprasBLL();
        string[] DiagIds = DiagnosticosIds.Split(',');
        foreach (string Id in DiagIds)
        {
            int _ID;
            if (int.TryParse(Id, out _ID)) comprasBLL.Expediente_Diagnosticos_Insert(ExpId, _ID);
        }
    }

    [WebMethod(EnableSession = true)]
    public void Expediente_Baja(long ExpId)
    {
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            comprasBLL.Expediente_Baja(ExpId, ((usuarios)Session["Usuario"]).id);            
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod]
    public expediente_extras Expediente_Extras_List_byExpId(long ExpId)
    {
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.Expediente_Extras_List_byExpId(ExpId);
    }

    [WebMethod]
    public List<int> Expediente_Diagnosticos_List(long ExpId)
    {
        ComprasBLL comprasBLL = new ComprasBLL();
        return comprasBLL.Expediente_Diagnosticos_List(ExpId);
    }

    [WebMethod]
    public List<expediente_buscar> Expediente_Buscar(long EXP_ID, int EXP_ESTADO, string EXP_NOMBRE, int EXP_DIAG_ID, int EXP_NRO_DOC, string EXP_VENC_FECHA_DESDE,
        string EXP_VENC_FECHA_HASTA, bool EXP_CERT_CASAM, bool EXP_CERT_DNI, bool EXP_CERT_DISC, bool EXP_CERT_SUELDO, string SeccionalesIds, string PatologiasIds,
        long NroPedidoId)
    {
        ComprasBLL comprasBLL = new ComprasBLL();
        return comprasBLL.Expediente_Buscar(EXP_ID, EXP_ESTADO, EXP_NOMBRE, EXP_DIAG_ID, EXP_NRO_DOC, EXP_VENC_FECHA_DESDE, EXP_VENC_FECHA_HASTA, EXP_CERT_CASAM,
            EXP_CERT_DNI, EXP_CERT_DISC, EXP_CERT_SUELDO, SeccionalesIds, PatologiasIds, NroPedidoId);
    }

    [WebMethod(EnableSession=true)]
    public long Expediente_Pedido_Cab_Insert(expediente_pedidos_cab pedido_cabecera)
    {
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            pedido_cabecera.EXP_PED_USUARIO = ((usuarios)Session["Usuario"]).id;
            return comprasBLL.EXP_PEDIDOS_CAB_INSERT(pedido_cabecera);
        }
        throw new Exception("Inicie sesion.");
    }

    [WebMethod]
    public List<expediente_pedidos_cab> EXP_PED_CAB_LIST_EXPID(long EXP_ID)
    {
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.EXP_PED_CAB_LIST_EXPID(EXP_ID);
    }

    [WebMethod]
    public List<expediente_pedidos_det> EXP_PED_DET_LIST_ID(long PDT_ID)
    {
        ComprasBLL comprasBLL = new ComprasBLL();
        return comprasBLL.EXP_PED_DET_LIST_ID(PDT_ID);
    }

    [WebMethod(EnableSession=true)]
    public long EXP_PEDIDOS_CAB_INSERT(expediente_pedidos_cab PedidoCAB)
    {
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            PedidoCAB.EXP_PED_USUARIO = ((usuarios)Session["Usuario"]).id;
            return comprasBLL.EXP_PEDIDOS_CAB_INSERT(PedidoCAB);
        }
        else throw new Exception("Inicie sesión");
    }
    
    [WebMethod(EnableSession=true)]
    public long EXP_PEDIDOS_DET_INSERT(expediente_pedidos_det PedidoDet)
    {
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            PedidoDet.PDT_USUARIO = ((usuarios)Session["Usuario"]).id;
            return comprasBLL.EXP_PEDIDOS_DET_INSERT(PedidoDet);
        }
        else throw new Exception("Inicie sesión");
    }
    

    [WebMethod]
    public List<expediente_rubros> EXP_RUBROS_LIST(bool Todos)
    {
        ComprasBLL comprasBLL = new ComprasBLL();
        return comprasBLL.EXP_RUBROS_LIST(Todos);
    }

    [WebMethod(EnableSession=true)]
    public void EXP_PEDIDOS_DET_DELETE(long PDT_ID)
    {
        if (Session["Usuario"] != null)
        {
            //EXP_PEDIDOS_DET_DELETE elimina un insumo del pedido
            //PDT_ID Pedido DET Id
            ComprasBLL comprasBLL = new ComprasBLL();
            comprasBLL.EXP_PEDIDOS_DET_DELETE(PDT_ID);
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod(EnableSession = true)]
    public void EXP_PEDIDOS_DET_AUDITAR(int Tarea, long PDT_PED_ID, long PDT_ID, string PDT_OBS)
    {
        if (Session["Usuario"] != null)
        {
            //Modifica estado de auditado segun valor de tarea.
            //Tarea ? 1 Audita : Desaudita
            //PDT_PED_ID Pedido CAB ID
            //PDT_ID Pedido DET ID
            //PDT_USU_AUDIT_MED UsuarioID
            //PDT_FEC_AUDIT_MED Fecha Audita (Fecha del dia)
            ComprasBLL comprasBLL = new ComprasBLL();
            comprasBLL.EXP_PEDIDOS_DET_AUDITAR(Tarea, PDT_PED_ID, PDT_ID, ((usuarios)Session["Usuario"]).id, DateTime.Now.Date, PDT_OBS);
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod]
    public List<expediente_entregas_det> EXP_PEDIDOS_ENTREGAS_DET_BY_PED_ID(long PDT_PED_ID)
    {
            //EXP_PEDIDOS_ENTREGAS_DET_BY_PED_ID lista entregas detalles de un pedido
            //PDT_PED_ID Pedido CAB Id
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.EXP_PEDIDOS_ENTREGAS_DET_BY_PED_ID(PDT_PED_ID);
    }

    [WebMethod(EnableSession = true)]
    public long EXP_PEDIDOS_ENTREGAS_CAB_INSERT(expediente_entregas_cab EntregaCAB, List<expediente_entregas_det> ListaEntregas, int Es_a_60_90)
    {
        if (Session["Usuario"] != null)
        {
            //if (Es_a_60_90 > 30)
            //{ //Se deben entregar todos los pedidos vinculados. Son pedidos con duracion de 60 o 90 días.
            //    ComprasBLL comprasBLL = new ComprasBLL();
            //    return comprasBLL.EXP_COMPRAS_ENTREGA_TOTAL_POR_PEDIDO(EntregaCAB.PEE_PED_ID,
            //        ((usuarios)Session["Usuario"]).id, EntregaCAB.PEE_EXP_ID, ListaEntregas[0].PEE_DEP_ID, DateTime.Parse(ListaEntregas[0].PEE_FEC_ENTREGA));
            //}
            //else
            //{
                //Pedidos de 30 dias.
                //EXP_PEDIDOS_ENTREGAS_CAB_INSERT inserta o actualiza cabecera y luego inserta detalles.
                //Params:
                //Entrega_CAB, objeto expediente_entregas_cab contiene datos de la cabecera a insertar.
                //List<expediente_entregas_det> ListaEntregas, lista con todos los insumos a entregar.
                //Return: 
                //PEE_NUMERO_REM, Nro. Entrega CAB generado. 
                ComprasBLL comprasBLL = new ComprasBLL();
                EntregaCAB.PEE_USUARIO = ((usuarios)Session["Usuario"]).id;

                long PEE_NUMERO_REM = comprasBLL.EXP_PEDIDOS_ENTREGAS_CAB_INSERT(EntregaCAB);
                if (PEE_NUMERO_REM > 0)
                {
                    long EntregaDet_Id;
                    ListaEntregas.ForEach(delegate(expediente_entregas_det det)
                    {
                        det.PEE_NUMERO_REM = PEE_NUMERO_REM; //Vinculo al detalle, el numero de cabecera creado.
                        EntregaDet_Id = comprasBLL.EXP_PEDIDOS_ENTREGAS_DET_INSERT(det);
                    });
                    return PEE_NUMERO_REM;
                }
                else throw new Exception("Error al grabar cabecera.");
           // }           
        }
        else throw new Exception("Inicie sesion.");
    }

    //[WebMethod(EnableSession = true)]
    //public long EXP_PEDIDOS_ENTREGAS_DET_INSERT(expediente_entregas_cab EntregaCAB, expediente_entregas_det EntregaDet)
    //{
    //    if (Session["Usuario"] != null)
    //    {
    //        //EXP_PEDIDOS_ENTREGAS_DET_INSERT inserta o actualiza cabecera y luego el detalle del insumo
    //        //PDT_ID Pedido DET Id
    //        ComprasBLL comprasBLL = new ComprasBLL();
    //        EntregaCAB.PEE_USUARIO = ((usuarios)Session["Usuario"]).id;
    //        long PEE_NUMERO_REM = comprasBLL.EXP_PEDIDOS_ENTREGAS_CAB_INSERT(EntregaCAB);
    //        if (PEE_NUMERO_REM > 0)
    //        {
    //            EntregaDet.PEE_NUMERO_REM = PEE_NUMERO_REM;
    //            comprasBLL.EXP_PEDIDOS_ENTREGAS_DET_INSERT(EntregaDet);
    //            return PEE_NUMERO_REM; //Retorno Remito Cab ID
    //        }
    //        else throw new Exception("Error al grabar cabecera.");
    //    }
    //    else throw new Exception("Inicie sesion.");
    //}

    [WebMethod(EnableSession = true)]
    public long EXP_PEDIDOS_ENTREGAS_DET_INSERT(expediente_entregas_cab EntregaCAB, expediente_entregas_det EntregaDet)
    {
        if (Session["Usuario"] != null)
        {
            //EXP_PEDIDOS_ENTREGAS_DET_INSERT inserta o actualiza cabecera y luego el detalle del insumo
            //PDT_ID Pedido DET Id
            ComprasBLL comprasBLL = new ComprasBLL();
            EntregaCAB.PEE_USUARIO = ((usuarios)Session["Usuario"]).id;
            if (EntregaDet.PDT_POR_DESC == 100)
                return comprasBLL.EXP_COMPRAS_ENTREGA_PARCIAL_100(EntregaCAB.PEE_PED_ID, EntregaCAB.PEE_USUARIO, EntregaCAB.PEE_EXP_ID, EntregaDet.PEE_DEP_ID,
                Convert.ToDateTime(EntregaDet.PEE_FEC_ENTREGA), EntregaDet.PEE_CANT_ENTR, EntregaDet.PDT_INS_ID, EntregaDet.PDT_ID, EntregaDet.PDT_POR_DESC);
            else return comprasBLL.EXP_COMPRAS_ENTREGA_PARCIAL_POR_PEDIDO(EntregaCAB.PEE_PED_ID, EntregaCAB.PEE_USUARIO, EntregaCAB.PEE_EXP_ID, EntregaDet.PEE_DEP_ID,
                Convert.ToDateTime(EntregaDet.PEE_FEC_ENTREGA), EntregaDet.PEE_CANT_ENTR, EntregaDet.PDT_INS_ID, EntregaDet.PDT_ID,EntregaDet.PDT_POR_DESC);
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod(EnableSession = true)]
    public void EXP_PEDIDOS_ENTREGAS_DET_DELETE(long PEE_ID)
    {
        if (Session["Usuario"] != null)
        {
            //EXP_PEDIDOS_ENTREGAS_DET_DELETE elimina un insumo de la entrega, vuelve saldo en PedidoDet igual a cantidad pedida.
            //PEE_ID Entrega DET Id
            ComprasBLL comprasBLL = new ComprasBLL();
            comprasBLL.EXP_PEDIDOS_ENTREGAS_DET_DELETE(PEE_ID);
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<expedientes_auditar_pedidos> COMPRAS_AUDITAR_PEDIDOS_LIST(string FechaDesde, string FechaHasta, long NroPedDesde, long NroPedHasta,
        string Insumo_nom, string Paciente, int Seccional, bool ConAuditoriaMed)
    {
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.COMPRAS_AUDITAR_PEDIDOS_LIST(FechaDesde, FechaHasta, NroPedDesde, NroPedHasta, Insumo_nom, Paciente, Seccional
                , ConAuditoriaMed);
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod(EnableSession = true)]
    public int COMPRAS_CONFIRMAR_AUDITORIA(string objDetallesIds, bool Confirma, decimal Porcentaje)
    {
        /*  Fecha: 30/08/2016 - Autor: Fede
         *  Params:
         *  objDetallesIds: Pedidos marcados en la pantalla separados por comas.
         *  Confirma: 1 - Confirma , 0 - Desconfirma
         *  Porcentaje: Nuevo porcentaje ingresado para los medicamentos seleccionados.
         */        
        if (Session["Usuario"] != null)
        {
            int contador_confirmados = 0;
            string[] Detalles = objDetallesIds.Split(',');
            foreach (string PedidoId in Detalles)
            {
                ComprasBLL comprasBLL = new ComprasBLL();
                long _PedidoId;
                if (long.TryParse(PedidoId, out _PedidoId))
                {
                    comprasBLL.COMPRAS_CONFIRMAR_AUDITORIA(((usuarios)Session["Usuario"]).id, _PedidoId, Confirma, Porcentaje);
                    contador_confirmados++;
                }        
            }
            return contador_confirmados;
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod(EnableSession = true)]
    public List<expedientes_informe_global> COMPRAS_INFORME_GLOBAL_LIST(string FechaRemito_Desde, string FechaRemito_Hasta, long Nro_Remito_Desde, long Nro_Remito_Hasta,
        string Nom_Insumo, long NroPedido_Desde, long NroPedido_Hasta, bool Pendientes, bool Entregados, string Paciente, int Seccional, int Deposito)
    {
        /*
         *  Fecha: 29/08/2016 - Autor: Fede
         *  Stored Procedure: H2_COMPRAS_INFORME_GLOBAL_LIST
         *  Params:
         *  FechaRemito_Desde: Fecha desde del pedido (01/01/1900 si no especifica)
         *  FechaRemito_Hasta: Fecha hasta del pedido (01/01/1900 si no especifica)
         *  Nro_Remito_Desde: Numero del remito desde (0 si no especifica)
         *  Nro_Remito_Hasta: Numero del remito hasta (0 si no especifica)
         *  Nom_Insumo: Nombre del insumo a buscar
         *  NroPedido_Desde: Numero desde del pedido cabecera (0 si no especifica)
         *  NroPedido_Hasta: Numero hasta del pedido cabecera (0 si no especifica)
         *  Pedientes: Igual a true, muestra solo pedidos pendientes (con saldo)
         *  Entregados: Igual a true, muestra solo pedidos entregados (sin saldo)
         *  Paciente: Buscar pedidos que coincidan con el paciente ingresado.
         *  Seccional: Buscar por numero de seccional (0 Todas las seccionales)
         *  Deposito: Deposito ID a buscar. (0 todos)
         */
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.COMPRAS_INFORME_GLOBAL_LIST(FechaRemito_Desde, FechaRemito_Hasta, Nro_Remito_Desde, Nro_Remito_Hasta, Nom_Insumo, NroPedido_Desde, NroPedido_Hasta,
                Pendientes, Entregados,Paciente,Seccional,Deposito);
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod(EnableSession = true)]
    public long EXP_PEDIDOS_COPIAR(long PedidoId, int Duracion, bool Es_a_60_90)
    {
        /*  Fecha: 02/09/2016 - Autor: Fede
        *  Copia de manera completa un pedido a uno nuevo.
        *  Params:
        *  PedidoId: Numero de Pedido a copiar.
        *  Return: Id del nuevo pedido copiado.
        */
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.EXP_PEDIDOS_CAB_COPIAR(PedidoId, (int)((usuarios)Session["Usuario"]).id, Duracion, Es_a_60_90);
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod(EnableSession = true)]
    public List<expediente_historial_insumo> EXP_ENTREGAS_HISTORIAL_INSUMO_100(long NroExpediente, long InsumoID)
    {
        /*  Fecha: 05/09/2016 - Autor: Fede
        *  Lista el historial de pedido y entrega de un insumo que fue pedido con descuento al 100%.
        *  Params:
        *  NroExpediente: Nro de Expediente sobre el cual se busca.
        *  InsumoID : Insumo Id a Buscar.
        *  Return: Lista de pedidos del insumo.
        */
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.EXP_ENTREGAS_HISTORIAL_INSUMO_100(NroExpediente, InsumoID);
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod(EnableSession = true)]
    public expediente_entregas_cab EXP_ENTREGA_CAB_BY_PED_CAB_ID(long PED_CAB_ID)
    {
        /*  Fecha: 06/09/2016 - Autor: Fede
        *  Lista entrega cabecera 
        *  Params:
        *  PED_CAB_ID: Nro. Pedido Cabecera
        *  Return: Entrega cabecera expediente_entregas_cab
        */
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            expediente_entregas_cab cab = comprasBLL.EXP_ENTREGA_CAB_BY_PED_CAB_ID(PED_CAB_ID);
            if (cab != null)
            { //El pedido no tiene una entrega realizada...
                Hospital.VerificadorBLL v = new Hospital.VerificadorBLL();
                if (v.PermisoSM("166")) cab.PEE_IMPRESO_PERMISO = true; //tiene permiso para reimprimir una entrega...
                else cab.PEE_IMPRESO_PERMISO = false;
            }
            return cab;
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod(EnableSession = true)]
    public void COMPRAS_ENTREGAS_CAB_IMPRESO(long PEE_REMITO_CAB)
    {
        /*  Fecha: 08/09/2016 - Autor: Fede
        *  Marca entrega como impresa, para que no sea reimpresa. 
        *  Params:
        *  PEE_REMITO_CAB: Nro Entrega Cabecera
        */
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            comprasBLL.COMPRAS_ENTREGAS_CAB_IMPRESO(PEE_REMITO_CAB);
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod(EnableSession = true)]
    public void COMPRAS_ENT_CONTROL_DET_UPDATE(List<expedientes_informe_global> objLista)
    {
        /*  Fecha: 13/09/2016 - Autor: Fede
        *  Actualiza en entrega detalle el precio, la cantidad y el descuento con el valor del remito de la farmacia.
        *  Params:
        *  objLista: Lista con los registros a actualizar (EntDetId, FarPrecio, FarCant, FarDesc)
        *  FarPrecio: Precio del insumo en farmacia
        *  FarCant: Cantidad que entrego la farmacia.
        *  FarDesc: Descuento de la farmacia (en %)
        */
        if (Session["Usuario"] != null)
        {
            objLista.ForEach(delegate(expedientes_informe_global det) {
                ComprasBLL comprasBLL = new ComprasBLL();
                comprasBLL.COMPRAS_ENT_CONTROL_DET_UPDATE(det.EntDetId, det.FarPrecio, det.FarCant, det.FarDesc);
            }); 
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod(EnableSession = true)]
    public void COMPRAS_EXP_PEDIDOS_CAB_BAJA(long NroPedidoCAB)
    {
        /*  Fecha: 16/09/2016 - Autor: Fede
        *  Da de baja un pedido en compras. Campo [EXP_PED_ESTADO] = 0 en [EXP_PEDIDOS_CAB]
        *  Params:
        *  NroPedidoCAB: Nro de Pedido cabecera.
        *  UsuarioId: Usuario que da de baja el pedido. (Modificado: 11/05/17)
        */
        if (Session["Usuario"] != null)
        {
             ComprasBLL comprasBLL = new ComprasBLL();
             comprasBLL.COMPRAS_EXP_PEDIDOS_CAB_BAJA(NroPedidoCAB,((usuarios)Session["Usuario"]).id);
        }
        else throw new Exception("Inicie sesion.");
    }

    [WebMethod(EnableSession = true)]
    public List<compras_reporte_amb_caba> COMPRAS_REPORTE_AMB_CABA(string Desde, string Hasta, int Filtro)
    {
        /*  Fecha: 22/09/2016 - Autor: Fede
        *  Tabla de pantalla reportes ambulatorio caba, busca por fecha desde-hasta (H2_COMPRAS_REPORTE_AMB_CABA)
        *  Params:
        *  Fecha Desde, Fecha Hasta, Filtro: Segun radio: 0 (Todos), 1 (Entregados), 2 (Pendientes)
        */
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.COMPRAS_REPORTE_AMB_CABA(Desde, Hasta, Filtro);
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod(EnableSession = true)]
    public void COMPRAS_INSUMOS_UPDATE(long INS_ID, string INS_DESCRIPCION, int INS_RUBRO)
    {
        /*  Fecha: 23/09/2016 - Autor: Fede
        *  Actualiza el nombre del insumo en la tabla de insumos de compra.
        *  Params:
        *  ID del Insumo, Descripcion del Insumo
        */
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            comprasBLL.COMPRAS_INSUMOS_UPDATE(INS_ID, INS_DESCRIPCION, INS_RUBRO);
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod]
    public decimal COMPRAS_PEDIDOS_DESCUENTO_INSUMO_PAC(int INS_ID, long NRO_DOC)
    {
        /*  Fecha: 04/10/2016 - Autor: Fede
        *  Busca el ultimo porcentaje por insumo y paciente.
        *  Params:
        *  INS_ID - Insumo ID
        *  NRO_DOC - Nro Documento del Paciente  
        */
        ComprasBLL comprasBLL = new ComprasBLL();
        return comprasBLL.COMPRAS_PEDIDOS_DESCUENTO_INSUMO_PAC(INS_ID, NRO_DOC);
    }

    [WebMethod(EnableSession=true)]
    public long COMPRAS_CONSTANCIA_ENTREGA_INSERT(compras_constancia_entrega constancia)
    {
        /*  Fecha: 05/10/2016 - Autor: Fede
        *  Inserta registro en la tabla COMPRAS_CONSTANCIA_ENTREGA, si COMPRAS_CDE_ID = 0: reg nuevo, caso contrario modifica reg.
        *  Params:
        *  compras_constancia_entrega objeto, datos de la constancia a insertar
        *  Return:
        *  ID del registro ingresado/modificado.
        */
        if (Session["Usuario"] != null)
        {
            constancia.COMPRAS_CDE_USU_ID = ((usuarios)Session["Usuario"]).id;
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.COMPRAS_CONSTANCIA_ENTREGA_INSERT(constancia);
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod(EnableSession=true)]
    public List<compras_constancia_entrega> COMPRAS_CONSTANCIA_ENTREGA_LIST(string Desde, string Hasta)
    {
        /*  Fecha: 05/10/2016 - Autor: Fede
        *  Lista las constancias con fecha desde-hasta, no lista los dados de baja.
        *  Params:
        *  Fecha desde, Fecha hasta para la busqueda.
        *  Return:
        *  Lista constancias.
        */
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.COMPRAS_CONSTANCIA_ENTREGA_LIST(Desde,Hasta);
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod(EnableSession=true)]
    public void COMPRAS_CONSTANCIA_ENTREGA_BAJA(long CDE_ID)
    {
        /*  Fecha: 05/10/2016 - Autor: Fede
        *  Lista las constancias con fecha desde-hasta, no lista los dados de baja.
        *  Params:
        *  Fecha desde, Fecha hasta para la busqueda.
        *  Return:
        *  Lista constancias.
        */
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            comprasBLL.COMPRAS_CONSTANCIA_ENTREGA_BAJA(CDE_ID);
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod(EnableSession = true)]
    public List<com_gastos_ext_listar> COM_GASTOS_EXT_CAB_BUSCAR(long COM_GASTOS_EXT_CAB_ID, string Paciente, string NHC, string Desde, 
        string Hasta, int? Seccional, string Insumo)
    {
        /*  Fecha: 05/02/2019 - Autor: Fede
        *  Lista cabecera de gastos extraordinarios
        *  Params:
        *  Fecha desde, Fecha hasta, Id cabecera, NHC de Paciente, Nombre de Paciente
        *  Return:
        *  Lista de cabeceras.
        */
        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.COM_GASTOS_EXT_CAB_BUSCAR(COM_GASTOS_EXT_CAB_ID, Paciente, NHC, Desde, Hasta, Seccional, Insumo);
        }
        else throw new Exception("Inicie Sesion.");
    }

    [WebMethod(EnableSession = true)]
    public List<com_gastos_ext_det> AdministrarInsumosExtras(int tipo, string busqueda, long id)
    {

        if (Session["Usuario"] != null)
        {
            ComprasBLL comprasBLL = new ComprasBLL();
            return comprasBLL.Administrar_Insumos_Extras(tipo,busqueda,id);
        }
        else throw new Exception("Inicie Sesion.");
    }

}
