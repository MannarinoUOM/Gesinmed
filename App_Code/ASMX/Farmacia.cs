using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Hospital;
using System.Web.Script.Services;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for Farmacia
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[ScriptService]
public class Farmacia : System.Web.Services.WebService {

    public Farmacia () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    [ScriptMethod]
    public decimal INSUMOS_PRECIO_ALFABETA_BY_ID(long REM_ID_CENTRAL)
    {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.INSUMOS_PRECIO_ALFABETA_BY_ID(REM_ID_CENTRAL);
    }

    [WebMethod]
    [ScriptMethod]
    public List<PED_COMPRAS_CAB> COMPRAS_PED_CAB_LIST_BY_ID(long PED_COM_ID, string FechaDesde, string FechaHasta, int ServicioId)
    {
        FarmaciaBLL a = new FarmaciaBLL();
        return a.COMPRAS_PED_CAB_LIST_BY_ID(PED_COM_ID, FechaDesde, FechaHasta, ServicioId);
    }

    [WebMethod]
    [ScriptMethod]
    public List<PED_COMPRAS_DET> COMPRAS_PED_DET_LIST_BY_ID(long PED_COM_ID)
    {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.COMPRAS_PED_DET_LIST_BY_ID(PED_COM_ID);
    }
    

    [WebMethod(EnableSession=true)]
    [ScriptMethod]
    public void PED_COM_DET_DELETE(long Pedido_Id)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            a.PED_COM_DET_DELETE(Pedido_Id);
        }
        else throw new Exception("Inicie sesion nuevamente.");
    }

    [WebMethod]
    [ScriptMethod]
    public long PED_COM_DET_INSERT(List<PED_COMPRAS_DET> objMedicamentos, long Pedido_Id)
    {
          FarmaciaBLL a = new FarmaciaBLL();
          objMedicamentos.ForEach(delegate(PED_COMPRAS_DET p)
          {
              p.PED_COM_ID = Pedido_Id;
              a.PED_COM_DET_INSERT(p);
          });
          return Pedido_Id;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public long PED_COM_CAB_INSERT(PED_COMPRAS_CAB p)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            p.PED_COM_USUARIO_ID = ((usuarios)Session["Usuario"]).id;
            return a.PED_COM_CAB_INSERT(p);
        }
        else throw new Exception("Inicie sesión nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insumo_Eliminado(int Id)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Insumo_Eliminado(Id);
        }
        else return -1;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public farmacia Insumo_StockInfo(int IdInsumo, string NroLote)
    {
         FarmaciaBLL a = new FarmaciaBLL();
         return a.Insumo_StockInfo(IdInsumo, NroLote);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Combo> Medicamentos_Lista_Guardia_SN()
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Medicamentos_Lista_Guardia_SN();
        }
        else return null;
    }


    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<farmacia> ListControlVencimientos(int InsumoId, int RubroId, string Desde, string Hasta, int Todos)
    {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.ListControlVencimientos(InsumoId, RubroId, Desde, Hasta, Todos);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long INSUMOS_CODIGO_SN_A_CODIGO_ALFA(long Codigo_kike)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.INSUMOS_CODIGO_SN_A_CODIGO_ALFA(Codigo_kike);
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public long INSUMOS_CODIGO_ALFA_A_CODIGO_SN(long Codigo_alfa)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.INSUMOS_CODIGO_ALFA_A_CODIGO_SN(Codigo_alfa);
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public decimal Precio_Guardia_by_OS(long InsumoId, long OS)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Precio_Guardia_by_OS(InsumoId, OS);
        }
        else return 0;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public FarmaciaList Medicamentos_Lista(bool Todos)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Medicamentos_Lista(Todos);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Combo> Medicamentos_Lista_Combo(bool Todos)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Medicamentos_Lista_Combo(Todos);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Combo> Medicamentos_Lista_by_Mono(int MonoId)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Medicamentos_Lista_by_Mono(MonoId);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Combo> Medicamentos_Lista_by_Mono_PrecioMax(int MonoId)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Medicamentos_Lista_by_Mono_PrecioMax(MonoId);
        }
        else return null;
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public farmacia Get_Insumo_by_Id(int Id)
    {
        FarmaciaBLL a = new FarmaciaBLL();
        return a.Get_Insumo_by_Id(Id);
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public farmacia Get_StockbyId(int Id)
    {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Get_StockbyId(Id);
    }


     [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int DarBajaInsumo(int STO_INS_ID,string NRO_LOTE)
    {
        if (Session["Usuario"] != null)
        {
            
            FarmaciaBLL a = new FarmaciaBLL();
           string usuario = ((usuarios)Session["Usuario"]).id.ToString();
           object obj = a.DarBajaInsumo(STO_INS_ID, NRO_LOTE, int.Parse(usuario));

            if (obj != null)
                return Convert.ToInt32(obj);
            else return 0;
        }
        else return 0;
    }


    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int TraerStockPorLote(int insumo, string lote)
    {
        FarmaciaBLL a = new FarmaciaBLL();
        return a.Traer_Stock_Por_Lote(insumo,lote);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<farmacia> List_Lotes_by_Insumo(int Id)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.List_Lotes_by_Insumo(Id);
        }
        else return null;
    }
    

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Pedido_Pac_Buscar> Pendientes_Pac(string Desde, string Hasta, int Pendiente)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Pendientes_Pac(Desde,Hasta,Pendiente);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Laboratorio> Laboratorio_Lista()
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Laboratorios_Lista();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Pedido_Pac_Buscar> Pendientes_Serv(string Desde, string Hasta, int Pendiente)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Pendientes_Serv(Desde, Hasta, Pendiente);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Pedido_Pac_Buscar> Pendientes_IM(string Desde, string Hasta, int Pendiente)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Pendientes_IM(Desde, Hasta,Pendiente);
        }
        else return null;
    }



    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_Bono_Contribucion_Cabecera(string Afiliado_Nombre, string NHC, int Cod_Auditor)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Insert_Publico_Cabecera(Afiliado_Nombre, NHC, Cod_Auditor);
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_Bono_Contribucion_Detalle( Int32 NroPedido, List<Bono_Contribucion_Detalles> objMedicamentos)
    {
        Int32 Contramov = Convert.ToInt32(Context.Request["Contramov"]);
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            objMedicamentos.ForEach(delegate(Bono_Contribucion_Detalles f)
            {
                    a.Insert_Publico_Detalle(NroPedido, f.Codigo, f.Cantidad, f.Precio, f.Descuento, f.CANT_UNIDADES, Contramov,f.NroLote);
            });
            return NroPedido;
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Bono_Contribucion_Cabecera> List_BonoContribucion(Int32 NroBono, string Desde, string Hasta)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.List_BonoContribucion(NroBono, Desde, Hasta);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Usuarios_Farmacia> Usuarios_Lista()
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Usuarios_Lista();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Rendicion_BonoContribucion> List_Rendicion_BonoContribucion(string desde, string hasta, string Usuario)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.List_Rendicion_BonoContribucion(Convert.ToDateTime(desde), Convert.ToDateTime(hasta), Usuario);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Medicamento_Rubro> List_Medicamentos_Rubro()
        {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.List_Medicamentos_Rubro();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public List<ControlStock> List_ControlStock(int Nombre, int Rubro, bool Todos)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.List_ControlStock(Nombre, Rubro, Todos);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Medicamento_Presentacion> List_Medicamento_Presentacion()
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.List_Medicamento_Presentacion();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Medicamento_Deposito> List_Medicamento_Deposito()
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.List_Medicamento_Deposito();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Medicamento_Medidas> List_Medicamento_Medidas()
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.List_Medicamento_Medidas();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Insumo_Via> List_Via()
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.List_InsumoVia();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Medicamento_Save(farmacia f)
    {
        if (Session["Usuario"] != null)
        {
            f.Usuario = ((usuarios)Session["Usuario"]).id;
            FarmaciaBLL a = new FarmaciaBLL();
            decimal Precio_Venta, Precio_Compra;
            if (!decimal.TryParse(f.REM_PRECIO.ToString().Replace(".", ","), out Precio_Venta)) throw new Exception("Verifique Precio de Venta");
            if (!decimal.TryParse(f.REM_PRECOMPRA.ToString().Replace(".", ","), out Precio_Compra)) throw new Exception("Verifique Precio de Compra");
            f.REM_PRECIO = Precio_Venta;
            f.REM_PRECOMPRA = Precio_Compra;
            return a.Medicamento_Save(f);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<farmacia> List_Insumos(string Nombre, string Rubro, string Presentacion, string Medida)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            if (string.IsNullOrEmpty(Rubro)) Rubro = "0";
            if (string.IsNullOrEmpty(Presentacion)) Presentacion = "0";

            if (Medida == "undefined") { Medida = "0"; }

            return a.Insumos_List(Nombre, int.Parse(Rubro), int.Parse(Presentacion), int.Parse(Medida));
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<farmacia> Insumos_List_by_Labo_Presen(string Nombre, string Laboratorio, string Presentacion)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            if (string.IsNullOrEmpty(Laboratorio)) Laboratorio = "0";
            if (string.IsNullOrEmpty(Presentacion)) Presentacion = "0";
            return a.Insumos_List_by_Labo_Presen(Nombre, int.Parse(Laboratorio), int.Parse(Presentacion));
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public farmacia Insumos_List_byId(int Id)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.Insumos_List_byId(Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public List<Farmacia_Proveedores> List_Proveedores(string Todos)
    {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.List_Proveedores(Todos);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_Remitos_Cab(Farmacia_Remito_Cab f)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            f.Usuario = ((usuarios)Session["Usuario"]).id.ToString();
            int remito = a.Insert_Remitos_Cab(f);
            if (remito > 0) return remito;
            else throw new Exception("El numero de remito ingresado ya se encuentra cargado.");
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_Remitos_Det(int Id, List<Farmacia_Remito_Det> objMedicamentos)
    {
        if (Session["Usuario"] != null)
        {
            objMedicamentos.ForEach(delegate(Farmacia_Remito_Det f)
            {
                FarmaciaBLL a = new FarmaciaBLL();
                try
                {
                    a.Insert_Remitos_Det(Id, f);
                }
                catch {
                    throw new Exception("Ya existe el Insumo " + f.Insumo_Id + " - Lote: " + f.NroLote);
                }
            });
            return Id;
        }
        return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Delete_Remitos_Det(int Id)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            a.Delete_Remitos_Det(Id);
        }
    }

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    //public List<Farmacia_Remito_Cab> List_Remitos_byLetraNumeroSuc(string letra, string numero, string sucursal, string Proveedor)
    //{ 
    //    if (Session["Usuario"] != null)
    //    {
    //        FarmaciaBLL a = new FarmaciaBLL();
    //        List<Farmacia_Remito_Cab> lista = new List<Farmacia_Remito_Cab>();
    //        lista = a.List_Remitos_byLetraNumeroSuc(letra, numero, sucursal,Proveedor);
    //        return lista;
    //    }
    //    else return null;
    //}


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Remito_Cab> List_Remitos(string letra, string numero, string sucursal, string Proveedor, string Desde, string Hasta)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            List<Farmacia_Remito_Cab> lista = new List<Farmacia_Remito_Cab>();
            lista = a.List_Remitos(letra, sucursal, Proveedor, numero, Desde, Hasta);
            return lista;
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Farmacia_Remito_Cab List_RemitoCab_byRemId(int Id)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.List_Remitos_CabecerabyId(Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Remito_Det> List_Remitos_DetallebyId(int Id)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.List_Remitos_DetallebyId(Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Delete_Remitos_Detalles(int Id, List<Farmacia_Remito_Det> objMedicamentos)
    {
        if (Session["Usuario"] != null)
        {
            objMedicamentos.ForEach(delegate(Farmacia_Remito_Det f)
            {
                FarmaciaBLL a = new FarmaciaBLL();
                f.Remito_Id = Id;
                a.Delete_Remitos_DetallesbyId(f.Remito_Id, f.Insumo_Id);
            });
           
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Delete_PPP_Detalles(int PedidoId)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            try
            {
                a.Delete_PPP_DetallesbyId(PedidoId);
            }
            catch {
                throw new Exception("Problema al Grabar Pedido.");
            }
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }



    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<servicio> List_Servicios()
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        if (Session["Usuario"] != null)
        {
            ServicioBLL s = new ServicioBLL();
            return s.Servicio_Lista(null, null);
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<servicio> List_Servicios_SoloFact()
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        if (Session["Usuario"] != null)
        {
            ServicioBLL s = new ServicioBLL();
            return s.Servicio_Lista_Solo_Fact(null, null);
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_Pedidos_Pac_Cab(Farmacia_Pedido_Pac_Cab f)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            return farm.Insert_Pedidos_Pac_Cab(f);
        }
        return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_Pedidos_Pac_Det(int IdPedido , List<Farmacia_Pedido_Pac_Det> objMedicamentos)
    {
        if (Session["Usuario"] != null)
        {
            objMedicamentos.ForEach(delegate(Farmacia_Pedido_Pac_Det f)
            {
                FarmaciaBLL farm = new FarmaciaBLL();
                f.Pedido_Id = IdPedido;
                farm.Insert_Pedidos_Pac_Det(f);
            });
            return IdPedido;
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_Pedidos_Pac_Det_PPP(int IdPedido, List<Farmacia_PPP_Det> objMedicamentos, int Modifica)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            if (Modifica == 1)
                farm.Update_UsuarioModifica(1,IdPedido, ((usuarios)HttpContext.Current.Session["Usuario"]).id); //Pedido Modificado, Guardo usuario que modifico.
            objMedicamentos.ForEach(delegate(Farmacia_PPP_Det f)
            {
                f.Pedido_Id = IdPedido;
                farm.Insert_Pedidos_Pac_Det(f);
            });
            return IdPedido;
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Pedido_Pac_Buscar> BuscarPPP(string NHC, string Id, string Apellido, string Desde, string Hasta, string objBusquedaLista)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            if (!string.IsNullOrEmpty(objBusquedaLista))
                return farm.Buscar_PPP(NHC, Id, Apellido, Desde, Hasta, objBusquedaLista);
            else return null;
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
        
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Pedido_Pac_Buscar> BuscarPPS(string Id, string Desde, string Hasta, string objBusquedaLista)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            if (!string.IsNullOrEmpty(objBusquedaLista))
                return farm.Buscar_PPS(Id, Desde, Hasta, objBusquedaLista);
            else return null;
        }
        else throw new Exception("Inicie Sesión Nuevamente.");

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public List<Farmacia_Pedido_Pac_Buscar> BuscarDevolucionesporPrestamo(string Id, string Desde, string Hasta)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            return farm.BuscarDevolucionesporPrestamo(Id, Desde, Hasta);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public List<Farmacia_Pedido_Pac_Buscar> BuscarPedidosporPrestamo(string Id, string Desde, string Hasta)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            return farm.BuscarPedidosporPrestamo(Id, Desde, Hasta);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Pedido_Pac_Buscar> BuscarDevPac(string NHC, string Id, string Apellido, string Desde, string Hasta, string objBusquedaLista)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            if (!string.IsNullOrEmpty(objBusquedaLista))
                return farm.Buscar_Dev_Pac(NHC, Id, Apellido, Desde, Hasta, objBusquedaLista);
            else if (!string.IsNullOrEmpty(Id))
                return farm.Buscar_Dev_Pac(NHC, Id, Apellido, Desde, Hasta, objBusquedaLista);
            else return null;
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Pedido_Pac_Buscar> BuscarPPP_ENT(string NHC, string Id, string Desde, string Hasta, string ServicioId, int Pendiente)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            return farm.Buscar_PPP_ENT(NHC, Id, Desde, Hasta, ServicioId, Pendiente);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public List<Farmacia_Pedido_Pac_Buscar> BuscarPPS_ENT(string Id, string Desde, string Hasta, string ServicioId, int Pendiente)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            return farm.Buscar_PPS_ENT(Id, Desde, Hasta, ServicioId, Pendiente);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Pedido_Pac_Buscar> BuscarDevSer(string Id, string Desde, string Hasta, string ServicioId)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            return farm.Buscar_Dev_Ser(Id, Desde, Hasta, ServicioId);
        }
        else return null;

    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Dev_Pac_Det> Buscar_Dev_PacDet(string PedidoId)
    {
            FarmaciaBLL farm = new FarmaciaBLL();
            return farm.Buscar_Dev_PacDet(PedidoId);
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Farmacia_PPP_Cab BuscarPPP_byPedidoid(string Id)
    {
        if (Session["Usuario"] != null)
        {
                FarmaciaBLL farm = new FarmaciaBLL();
                return farm.Buscar_PPP_by_PedidoId(Id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod]
    [ScriptMethod]
    public Farmacia_PPP_Cab Buscar_PPS_by_PedidoId(string Id)
    {
        //Obtiene Pedido Cabecera de PPS//
        //Se agrego campo pendiente y nro de entrega cabecera.
          FarmaciaBLL farm = new FarmaciaBLL();
          return farm.Buscar_PPS_by_PedidoId(Id);
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_PPP_Det> BuscarPPP_byPedidoid_Det(string Id)
    {
            FarmaciaBLL farm = new FarmaciaBLL();
            return farm.Buscar_PPP_by_PedidoId_Det(Id);
    }

        [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_PPP_Det> BuscarPPP_byPedidoid_Det_para_ambulatorios(string Id)
    {
            FarmaciaBLL farm = new FarmaciaBLL();
            return farm.Buscar_PPP_by_PedidoId_Det_para_pacientes_ambulatorios(Id);
    }


    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_PPP_Det> BuscarPPP_byPedidoid_Det_Entregas(string Id)
    {
        FarmaciaBLL farm = new FarmaciaBLL();
        return farm.Buscar_PPP_by_PedidoId_Det_Entregas(Id);
    }


    [WebMethod]
    [ScriptMethod]
    public void FARMACIA_PED_DET_UPDATE(int PedidoID, int InsumoID,int NuevoInsumoID, int Cantidad_Pedida)
    {
        FarmaciaBLL farm = new FarmaciaBLL();
        farm.FARMACIA_PED_DET_UPDATE(PedidoID, InsumoID,NuevoInsumoID, Cantidad_Pedida);
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_PPP_Det> Buscar_PPS_List_Nro_Entrega(int NroEntregaCab, int NroEntrega) 
    //Lista los items pertenecientes a una entrega en particular. (Para modificar entrega).
    //NroEntregaCab: Id de Cabecera Entrega.
    //NroEntrega: Id de las distintas entregas parciales de NroEntregaCab.
    {
        FarmaciaBLL farm = new FarmaciaBLL();
        return farm.Buscar_PPS_List_Nro_Entrega(NroEntregaCab, NroEntrega);
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void PPS_DeleteItems_Modifica(int NroEntregaCab, int NroEntrega)
    //Elimina todos los items de esa entrega, para luego insertar lo modificado.
    //NroEntregaCab: Id de Cabecera Entrega.
    //NroEntrega: Id de las distintas entregas parciales de NroEntregaCab.
    {
        FarmaciaBLL farm = new FarmaciaBLL();
        farm.PPS_DeleteItems_Modifica(NroEntregaCab, NroEntrega);
    }


    [WebMethod]
    [ScriptMethod]
    public Farmacia_Egr_Detalle Buscar_Egr_Det(string DetalleId, string InsumoId)
    {
            FarmaciaBLL farm = new FarmaciaBLL();
            return farm.Buscar_Egr_Det(DetalleId, InsumoId);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_Egr_Cab(Farmacia_Egr_Cab f)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            f.REM_USU_INGRESO = ((usuarios)Session["Usuario"]).id.ToString();
            return farm.Insert_Egr_Cab(f);
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public List<Farmacia_Egr_Detalle> VerHistorialdeEntrega(string RemitoId)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            return farm.Entregas_by_RemitoId(RemitoId);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
    

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Get_RemitoId(string PedidoId)
    {
        if (Session["Usuario"] != null)
        {
            int _PedidoId;
            if (!int.TryParse(PedidoId, out _PedidoId)) throw new Exception("Pedido ID no válido");
            FarmaciaBLL farm = new FarmaciaBLL();
            return farm.Get_RemitoId(_PedidoId);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }
    

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void UpdatePedidoPendiente(int Id, bool Pendiente)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            farm.UpdatePedidosPendiente(Id,Pendiente);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool PedidoPendiente(int Id)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            return farm.PedidoPendiente(Id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }       

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public bool IMPendiente(int Id)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            if (farm.IMPendiente(Id) == 1) return true;
            else return false;
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public void UpdateIMPendiente(int Id, bool Pendiente)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            farm.UpdateIMPendiente(Id, Pendiente);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public void FARMACIA_ENT_DET_INSERT(int PedidoCAB_ID, int InsumoID,int Cantidad_Entregada,string Observaciones, bool Etiqueta,int NroEntrega)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL farm = new FarmaciaBLL();
            farm.FARMACIA_ENT_DET_INSERT(PedidoCAB_ID, InsumoID, Cantidad_Entregada, Observaciones, Etiqueta, NroEntrega);
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void PPS_Modificar_Items(List<Farmacia_PPP_Det> objMedicamentos, string Tipo, int NroEnt, int Pedido_Id)
    {
        if (Session["Usuario"] != null)
        {
            //Paso lista de pedidos a entregados...
            List<Farmacia_Egr_Detalle> objEntregados = new List<Farmacia_Egr_Detalle>();
            objMedicamentos.ForEach(delegate(Farmacia_PPP_Det fe) 
            {
                Farmacia_Egr_Detalle f = new Farmacia_Egr_Detalle();
                f.RED_REM_ID = Pedido_Id; //Pedido_Id: Id gral de pedido
                f.INSUMO_ID = fe.Insumo_Id; 
                f.CANTIDAD = fe.Entregado;
                f.Cant_Entrega = fe.Entregado;
                f.OBSERVACIONES = string.Empty;
                f.Etiqueta = false;
                objEntregados.Add(f);
            });
            //Inserto los items entregados...
            Insert_Egr_Det_Modifica(objEntregados, Tipo, NroEnt);
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public void Insert_Egr_Det_Modifica(List<Farmacia_Egr_Detalle> objEntregados, string Tipo, int NroEnt)
    {
        if (Session["Usuario"] != null)
        {
            objEntregados.ForEach(delegate(Farmacia_Egr_Detalle f)
            {
                if (f != null && f.Cant_Entrega > 0)
                {
                    FarmaciaBLL farm = new FarmaciaBLL();
                    f.NRO_ENTREGA = NroEnt;
                    f.USUARIO_ID = ((usuarios)Session["Usuario"]).id;
                    farm.Insert_Egr_Det_Modifica(f, Tipo);
                }
            });
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public void Insert_Egr_Det(List<Farmacia_Egr_Detalle> objEntregados, string Tipo, int NroEnt)
    {
        if (Session["Usuario"] != null)
        {
            objEntregados.ForEach(delegate(Farmacia_Egr_Detalle f)
            {
                if (f != null && f.Cant_Entrega > 0 && f.lote != null)
                {
                    FarmaciaBLL farm = new FarmaciaBLL();
                    f.NRO_ENTREGA = NroEnt;
                    f.USUARIO_ID = ((usuarios)Session["Usuario"]).id;
                    farm.Insert_Egr_Det(f,Tipo);
                }
            });
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int GetLastEntregaId(int RemitoId)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.GetLastNroEntregabyRemito(RemitoId);
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public int GetNroEntregaforRemito(int RemitoId)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.GetNroEntregaforRemito(RemitoId);
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public int Insert_PPS_Cab(Farmacia_Pedido_Pac_Cab f)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            f.Usuario_Id = ((usuarios)Session["Usuario"]).id;
            return a.Insert_PPS_Cab(f);
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public int Insert_PPS_Det(int IdPedido, List<Farmacia_Pedido_Pac_Det> objMedicamentos, int Modifica)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            if (Modifica > 0)
                a.Update_UsuarioModifica(1, IdPedido, ((usuarios)HttpContext.Current.Session["Usuario"]).id); //Pedido Modificado, Guardo usuario que modifico.
            objMedicamentos.ForEach(delegate(Farmacia_Pedido_Pac_Det f)
            {
                if (f.Cantidad > 0)
                {
                    f.Pedido_Id = IdPedido;
                    f.Usuario_Id = ((usuarios)Session["Usuario"]).id;
                    a.Insert_PPS_Det(f);
                }
            });
            return IdPedido;
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public int Insert_DevolucionPrestamo_Cab(Farmacia_Pedido_Pac_Cab f)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            f.Usuario_Id = ((usuarios)Session["Usuario"]).id;
            return a.INSERT_FAR_DEVOLUCION_PRESTAMO_CAB(f);
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public int INSERT_FAR_DEVOLUCION_PRESTAMO_DET(int IdPedido, List<Farmacia_Pedido_Pac_Det> objMedicamentos, int Modifica)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            if (Modifica > 0)
                a.FAR_DEVOLUCION_PRESTAMO_CAB_UPDATE_USUARIO_MODIFICA(IdPedido, ((usuarios)Session["Usuario"]).id); //Pedido Modificado, Guardo usuario que modifico.
            objMedicamentos.ForEach(delegate(Farmacia_Pedido_Pac_Det f)
            {
                if (f.Cantidad > 0)
                {
                    f.Pedido_Id = IdPedido;
                    f.Usuario_Id = ((usuarios)Session["Usuario"]).id;
                    a.INSERT_FAR_DEVOLUCION_PRESTAMO_DET(f);
                }
            });
            return IdPedido;
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public int INSERT_FAR_SOLICITAR_PRESTAMO_CAB(Farmacia_Pedido_Pac_Cab f)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            f.Usuario_Id = ((usuarios)Session["Usuario"]).id;
            return a.INSERT_FAR_SOLICITAR_PRESTAMO_CAB(f);
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public int INSERT_FAR_SOLICITAR_PRESTAMO_DET(int IdPedido, List<Farmacia_Pedido_Pac_Det> objMedicamentos, int Modifica)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            if (Modifica > 0)
                a.FAR_SOLICITAR_PRESTAMO_CAB_UPDATE_USUARIO_MODIFICA(IdPedido, ((usuarios)Session["Usuario"]).id); //Pedido Modificado, Guardo usuario que modifico.
            objMedicamentos.ForEach(delegate(Farmacia_Pedido_Pac_Det f)
            {
                if (f.Cantidad > 0)
                {
                    f.Pedido_Id = IdPedido;
                    f.Usuario_Id = ((usuarios)Session["Usuario"]).id;
                    a.INSERT_FAR_SOLICITAR_PRESTAMO_DET(f);
                }
            });
            return IdPedido;
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public List<Farmacia_PPS_Det_List> List_PPS_Det(string Id)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.List_Det_PPS(Id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public List<Farmacia_PPS_Det_List> BUSCAR_FAR_PEDIDO_PRESTAMO_DET_BY_ID(string Id)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.BUSCAR_FAR_PEDIDO_PRESTAMO_DET_BY_ID(Id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public List<Farmacia_PPS_Det_List> BUSCAR_FAR_DEVOLUCION_PRESTAMO_DET_BY_ID(string Id)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.BUSCAR_FAR_DEVOLUCION_PRESTAMO_DET_BY_ID(Id);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public Farmacia_PPP_Cab List_PPS_Cab(string Id)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.List_Cab_PPS(int.Parse(Id));
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public Farmacia_PPP_Cab BUSCAR_FAR_PEDIDO_PRESTAMO_CAB_BY_ID(string Id)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.BUSCAR_FAR_PEDIDO_PRESTAMO_CAB_BY_ID(int.Parse(Id));
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public Farmacia_PPP_Cab BUSCAR_FAR_DEVOLUCION_PRESTAMO_CAB_BY_ID(string Id)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            return a.BUSCAR_FAR_DEVOLUCION_PRESTAMO_CAB_BY_ID(int.Parse(Id));
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public void Delete_PPS_Det(int PedidoId)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            try
            {
                a.Delete_PPS_Det(PedidoId);
            }
            catch 
            {
                throw new Exception("Error al Grabar el Pedido.");
            }
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public void FAR_DEVOLUCION_PRESTAMO_DET_DELETE(int PedidoId)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            try
            {
                a.FAR_DEVOLUCION_PRESTAMO_DET_DELETE(PedidoId);
            }
            catch
            {
                throw new Exception("Error al Grabar el Pedido.");
            }
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public void FAR_SOLICITAR_PRESTAMO_DET_DELETE(int PedidoId)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            try
            {
                a.FAR_SOLICITAR_PRESTAMO_DET_DELETE(PedidoId);
            }
            catch
            {
                throw new Exception("Error al Grabar el Pedido.");
            }
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Delete_Dev_Det(string Id)
    {
        if (Session["Usuario"] != null)
        {
                FarmaciaBLL a = new FarmaciaBLL();
                a.Delete_Dev_Det(Id);
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_DevPP_Cab(Farmacia_Pedido_Pac_Cab f)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            f.Usuario_Id = ((usuarios)Session["Usuario"]).id;
            return a.Insert_DevPP_Cab(f);
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_DevPP_Det(string IdPedido, List<Farmacia_Dev_Pac_Det> objMedicamentos, int Modifica, long Servicio_Id)
    {
        int Id = 0;
        if (Session["Usuario"] != null)
        {
            long UsuarioId = ((usuarios)Session["Usuario"]).id;
            FarmaciaBLL a = new FarmaciaBLL();
            int editarUsuario = 0;

            objMedicamentos.ForEach(delegate(Farmacia_Dev_Pac_Det f)
            {   // si el usuario selecciono el check en patalla
                if (f.chk == 1) { editarUsuario = 1; }
            });
                             // si el usuario selecciono el check en patalla
            if (Modifica > 0 && editarUsuario == 1) a.Update_UsuarioModifica(3, int.Parse(IdPedido), UsuarioId);

            objMedicamentos.ForEach(delegate(Farmacia_Dev_Pac_Det f)
            {
                if (f.chk == 1)// si el usuario selecciono el check en patalla
                {
                    f.Pedido_Id = IdPedido;
                    f.Usuario_Id = UsuarioId.ToString();
                    Id = a.Insert_DevPP_Det(f);
                }
            });
            if (editarUsuario == 1)// si el usuario selecciono el check en patalla
            {
                //Buscar devoluciones por vencimiento para nuevo pedido
                FarmaciaBLL b = new FarmaciaBLL();
                b.Buscar_Devoluciones_Vencimiento(objMedicamentos, Servicio_Id, UsuarioId);
            }
            return int.Parse(IdPedido); //Retorno Id CAB de la devolucion
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_DevPP_Det_Pac(string IdPedido, List<Farmacia_Dev_Pac_Det> objMedicamentos, int Modifica)
    {
        int Id = 0;
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL a = new FarmaciaBLL();
            if (Modifica > 0) a.Update_UsuarioModifica(3, int.Parse(IdPedido), ((usuarios)Session["Usuario"]).id);
            objMedicamentos.ForEach(delegate(Farmacia_Dev_Pac_Det f)
            {
                f.Pedido_Id = IdPedido;
                f.Usuario_Id = ((usuarios)Session["Usuario"]).id.ToString();
                Id = a.Insert_DevPP_Det(f);
            });
            return int.Parse(IdPedido);
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public internacion_paciente List_Internacion_Pac_byDoc(string Documento)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL i = new FarmaciaBLL();
            return i.List_PacienteInt_byDoc(Documento);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void InsertMovimientoCtaCteInsumos(Farmacia_Movimiento_CtaCte m)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL i = new FarmaciaBLL();
            if (string.IsNullOrEmpty(m.Fecha)) m.Fecha = DateTime.Now.ToString();
            m.UsuarioId = Convert.ToInt32(((usuarios)Session["Usuario"]).id);
            i.InsertMovimientoCtaCteInsumos(m);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Movimiento_CtaCte_Buscar> List_Mov_by_Insumo(int InsumoId, string Desde, string Hasta, bool Inventario)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL i = new FarmaciaBLL();
            return i.List_Mov_by_Insumo(InsumoId,Desde,Hasta, Inventario);
        }
        else return null;
    }
    
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_Movimiento_CtaCte_Buscar> List_Mov_by_Rubro(int RubroId, string Desde, string Hasta, bool Inventario)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL i = new FarmaciaBLL();
            return i.List_Mov_by_Rubro(RubroId, Desde, Hasta, Inventario);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<farmacia> FARMACIALISTLOTESBYINSUMO(int idInsumo)
    {
        if (Session["Usuario"] != null)
        {
            FarmaciaBLL i = new FarmaciaBLL();
            return i.List_Lotes_by_Insumo(idInsumo);
        }
        else return null;
    }
}
