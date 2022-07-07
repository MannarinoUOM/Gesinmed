using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for FarmaciaBLL
/// </summary>
/// 
namespace Hospital
{
    public class FarmaciaBLL
    {
        public FarmaciaBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<PED_COMPRAS_DET> COMPRAS_PED_DET_LIST_BY_ID(long PED_COM_ID)
        {
            List<PED_COMPRAS_DET> list = new List<PED_COMPRAS_DET>();
            FarmaciaDALTableAdapters.H2_COMPRAS_PED_DET_LIST_BY_IDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_COMPRAS_PED_DET_LIST_BY_IDTableAdapter();
            FarmaciaDAL.H2_COMPRAS_PED_DET_LIST_BY_IDDataTable aTable = adapter.GetData(PED_COM_ID);
            foreach (FarmaciaDAL.H2_COMPRAS_PED_DET_LIST_BY_IDRow row in aTable.Rows)
                list.Add(new PED_COMPRAS_DET(row.DET_ID, row.PED_ID, row.INS_ID, row.DESCRIPCION, row.CANTIDAD,row.PED_COM_DET_OBS));
            return list;
        }

        public List<PED_COMPRAS_CAB> COMPRAS_PED_CAB_LIST_BY_ID(long PED_COM_ID, string FechaDesde, string FechaHasta, int ServicioId)
        {
            List<PED_COMPRAS_CAB> list = new List<PED_COMPRAS_CAB>();
            FarmaciaDALTableAdapters.H2_COMPRAS_PED_CAB_LIST_BY_IDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_COMPRAS_PED_CAB_LIST_BY_IDTableAdapter();
            FarmaciaDAL.H2_COMPRAS_PED_CAB_LIST_BY_IDDataTable aTable = adapter.GetData(PED_COM_ID, Convert.ToDateTime(FechaDesde), Convert.ToDateTime(FechaHasta),
                ServicioId);
            foreach (FarmaciaDAL.H2_COMPRAS_PED_CAB_LIST_BY_IDRow row in aTable.Rows)
                list.Add(new PED_COMPRAS_CAB(row.CAB_ID, row.SERV_ID, row.FECHA.ToShortDateString(), row.USU_ID, false, row.ESTADO, row.SERV_NOM, row.USU_NOM,row.Pendiente));
            return list;
        }

        public void PED_COM_DET_DELETE(long PED_COM_ID)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                adapter.H2_PED_COM_DET_DELETE(PED_COM_ID);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void FARMACIA_ENT_DET_INSERT(int PedidoCAB_ID, int InsumoID, int Cantidad_Entregada, string Observaciones, bool Etiqueta, int NroEntrega) 
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                adapter.H2_FARMACIA_ENT_DET_INSERT(PedidoCAB_ID, InsumoID, Cantidad_Entregada, Observaciones, Etiqueta, NroEntrega);
            }
            catch (SqlException ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public long PED_COM_CAB_INSERT(PED_COMPRAS_CAB p)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                object o = adapter.H2_PED_COM_CAB_INSERT(p.PED_COM_ID, p.PED_COM_SERV_ID, p.PED_COM_USUARIO_ID, p.PED_COM_BAJA, p.PED_COM_ESTADO);
                if (o != null) return Convert.ToInt64(o.ToString());
                else return -1;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public long PED_COM_DET_INSERT(PED_COMPRAS_DET p)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                object o = adapter.H2_PED_COM_DET_INSERT(p.PED_COM_ID, p.PED_COM_DET_INS_ID, p.PED_COM_DET_INS_DESC, p.PED_COM_DET_CANTIDAD);
                if (o != null) return Convert.ToInt64(o.ToString());
                else return -1;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Farmacia_Laboratorio> Laboratorios_Lista()
        {
            List<Farmacia_Laboratorio> list = new List<Farmacia_Laboratorio>();
            FarmaciaDALTableAdapters.H2_FARMACIA_LABORATORIOS_LISTTableAdapter adapter = new FarmaciaDALTableAdapters.H2_FARMACIA_LABORATORIOS_LISTTableAdapter();
            FarmaciaDAL.H2_FARMACIA_LABORATORIOS_LISTDataTable aTable = adapter.GetData();
            foreach (FarmaciaDAL.H2_FARMACIA_LABORATORIOS_LISTRow row in aTable.Rows)
            {
                Farmacia_Laboratorio l = new Farmacia_Laboratorio();
                l.Id = row.LAB_ID;
                l.Laboratorio = row.LAB_DESCRIPCION;
                if (!row.IsESTADONull()) l.Estado = row.ESTADO;                                 
                list.Add(l);
            }
            return list;
        }


        public decimal INSUMOS_PRECIO_ALFABETA_BY_ID(long REM_ID_CENTRAL)
        {
            try
            {
                List<Farmacia_Laboratorio> list = new List<Farmacia_Laboratorio>();
                FarmaciaDALTableAdapters.H2_INSUMOS_PRECIO_ALFABETA_BY_IDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_INSUMOS_PRECIO_ALFABETA_BY_IDTableAdapter();
                FarmaciaDAL.H2_INSUMOS_PRECIO_ALFABETA_BY_IDDataTable aTable = adapter.GetData(REM_ID_CENTRAL);
                foreach (FarmaciaDAL.H2_INSUMOS_PRECIO_ALFABETA_BY_IDRow row in aTable.Rows)
                    return Convert.ToDecimal(row.PRECIO_ALFA);
                return 0;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public FarmaciaList Medicamentos_Lista (bool Todos)
        {
            FarmaciaList Medicamentos = new FarmaciaList();
            FarmaciaDALTableAdapters.H2_Insumos_ListTableAdapter adapter = new FarmaciaDALTableAdapters.H2_Insumos_ListTableAdapter();
            FarmaciaDAL.H2_Insumos_ListDataTable aTable = adapter.GetData(Todos);
            foreach (FarmaciaDAL.H2_Insumos_ListRow row in aTable.Rows)
            {
                Medicamentos.Add(CreateFromRow(row));
            }
            return Medicamentos;
        }

        public List<Farmacia_Combo> Medicamentos_Lista_Combo(bool Todos)
        {
            List<Farmacia_Combo> Medicamentos = new List<Farmacia_Combo>();
            FarmaciaDALTableAdapters.H2_Insumos_List_ComboTableAdapter adapter = new FarmaciaDALTableAdapters.H2_Insumos_List_ComboTableAdapter();
            FarmaciaDAL.H2_Insumos_List_ComboDataTable aTable = adapter.GetData(Todos);
            foreach (FarmaciaDAL.H2_Insumos_List_ComboRow row in aTable.Rows)
            {
                Farmacia_Combo f = new Farmacia_Combo();
                f.REM_ID = (int)row.REM_ID;
                if (!row.IsmedidaNull())
                    f.Medida = row.medida;
                else f.Medida = string.Empty;
                if (!row.IspresentacionNull())
                    f.Presentacion = row.presentacion;
                else f.Presentacion = string.Empty;
                if (!row.IsREM_GRAMAJENull())
                    f.REM_GRAMAJE = row.REM_GRAMAJE;
                else f.REM_GRAMAJE = string.Empty;
                f.REM_NOMBRE = row.REM_NOMBRE;
                Medicamentos.Add(f);
            }
            return Medicamentos;
        }

        public List<Farmacia_Combo> Medicamentos_Lista_by_Mono_PrecioMax(int MonoId)
        {
            List<Farmacia_Combo> Medicamentos = new List<Farmacia_Combo>();
            FarmaciaDALTableAdapters.H2_Insumos_List_by_Mono_PrecioMaxTableAdapter adapter = new FarmaciaDALTableAdapters.H2_Insumos_List_by_Mono_PrecioMaxTableAdapter();
            FarmaciaDAL.H2_Insumos_List_by_Mono_PrecioMaxDataTable aTable = adapter.GetData(MonoId);
            foreach (FarmaciaDAL.H2_Insumos_List_by_Mono_PrecioMaxRow row in aTable.Rows)
            {
                Farmacia_Combo f = new Farmacia_Combo();
                f.REM_ID = (int)row.REM_ID;
                if (!row.IsmedidaNull())
                    f.Medida = row.medida;
                else f.Medida = string.Empty;
                if (!row.IspresentacionNull())
                    f.Presentacion = row.presentacion;
                else f.Presentacion = string.Empty;
                if (!row.IsREM_GRAMAJENull())
                    f.REM_GRAMAJE = row.REM_GRAMAJE;
                else f.REM_GRAMAJE = string.Empty;
                f.REM_NOMBRE = row.REM_NOMBRE;
                Medicamentos.Add(f);
            }
            return Medicamentos;
        }

        public List<Farmacia_Combo> Medicamentos_Lista_Guardia_SN()
        {
            List<Farmacia_Combo> Medicamentos = new List<Farmacia_Combo>();
            FarmaciaDALTableAdapters.H2_GUARDIA_LISTA_INSUMOS_SNTableAdapter adapter = new FarmaciaDALTableAdapters.H2_GUARDIA_LISTA_INSUMOS_SNTableAdapter();
            FarmaciaDAL.H2_GUARDIA_LISTA_INSUMOS_SNDataTable aTable = adapter.GetData();
            foreach (FarmaciaDAL.H2_GUARDIA_LISTA_INSUMOS_SNRow row in aTable.Rows)
            {
                Farmacia_Combo f = new Farmacia_Combo();
                f.REM_ID = (int)row.InsumoId;
                f.REM_NOMBRE = row.REM_NOMBRE;
                Medicamentos.Add(f);
            }
            return Medicamentos;
        }


        public List<Farmacia_Combo> Medicamentos_Lista_by_Mono (int MonoId)
        {
            List<Farmacia_Combo> Medicamentos = new List<Farmacia_Combo>();
            FarmaciaDALTableAdapters.H2_Insumos_List_by_MonoTableAdapter adapter = new FarmaciaDALTableAdapters.H2_Insumos_List_by_MonoTableAdapter();
            FarmaciaDAL.H2_Insumos_List_by_MonoDataTable aTable = adapter.GetData(MonoId);
            foreach (FarmaciaDAL.H2_Insumos_List_by_MonoRow row in aTable.Rows)
            {
                Farmacia_Combo f = new Farmacia_Combo();
                f.REM_ID = (int)row.REM_ID;
                if (!row.IsmedidaNull())
                    f.Medida = row.medida;
                else f.Medida = string.Empty;
                if (!row.IspresentacionNull())
                    f.Presentacion = row.presentacion;
                else f.Presentacion = string.Empty;
                if (!row.IsREM_GRAMAJENull())
                    f.REM_GRAMAJE = row.REM_GRAMAJE;
                else f.REM_GRAMAJE = string.Empty;
                f.REM_NOMBRE = row.REM_NOMBRE;
                Medicamentos.Add(f);
            }
            return Medicamentos;
        }

        public farmacia Insumo_StockInfo(int IdInsumo, string NroLote)
        {
            FarmaciaList Medicamentos = new FarmaciaList();
            FarmaciaDALTableAdapters.H2_FARMACIA_LIST_STOCK_BY_INSUMOTableAdapter adapter = new FarmaciaDALTableAdapters.H2_FARMACIA_LIST_STOCK_BY_INSUMOTableAdapter();
            FarmaciaDAL.H2_FARMACIA_LIST_STOCK_BY_INSUMODataTable aTable = adapter.GetData(IdInsumo, NroLote);
            foreach (FarmaciaDAL.H2_FARMACIA_LIST_STOCK_BY_INSUMORow row in aTable.Rows)
            {
                farmacia f = new farmacia();
                f.STO_CANTIDAD = row.Cantidad.ToString();
                f.STO_DEP_ID = row.DepositoId.ToString();
                f.STO_VENCIMIENTO = row.FechaVenc.ToShortDateString();
                f.NROLOTE = row.NroLote;
                return f;
            }
            return null;
        }

        public farmacia Get_StockbyId(int Id)
        {
            FarmaciaList Medicamentos = new FarmaciaList();
            FarmaciaDALTableAdapters.H2_FARMACIA_STOCK_BY_INSUMOTableAdapter adapter = new FarmaciaDALTableAdapters.H2_FARMACIA_STOCK_BY_INSUMOTableAdapter();
            FarmaciaDAL.H2_FARMACIA_STOCK_BY_INSUMODataTable aTable = adapter.GetData(Id);
            foreach (FarmaciaDAL.H2_FARMACIA_STOCK_BY_INSUMORow row in aTable.Rows)
            {
                farmacia f = new farmacia();
                f.STO_CANTIDAD = row.Cantidad.ToString();
                f.STO_DEP_ID = row.DepositoId.ToString();
                f.STO_VENCIMIENTO = row.Vencimiento.ToShortDateString();
                f.NROLOTE = row.Lote;
                f.REM_PRECOMPRA = row.PrecioCompra;
                if (!row.IsStockMinimoNull())
                    f.STO_MINIMO = row.StockMinimo.ToString();
                else f.STO_MINIMO = "0";
                if (!row.IsPrecioVentaNull())
                    f.REM_PRECIO = row.PrecioVenta;
                else f.REM_PRECIO = 0;
                return f;
            }
            return null;
        }

        public int Traer_Stock_Por_Lote(int insumo, string lote)
        {
        FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Traer_Stock_Por_Lote(insumo,lote);

            if (obj != null)
                return Convert.ToInt32(obj);
            else return 0;
        }

        public int DarBajaInsumo(int STO_INS_ID, string NRO_LOTE, int USUARIO_BAJA)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Dar_Baja_Insumo(STO_INS_ID, NRO_LOTE, USUARIO_BAJA);

            if (obj != null)
                return Convert.ToInt32(obj);
            else return 0;
        }

        public List<farmacia> ListControlVencimientos(int InsumoId, int RubroId, string Desde, string Hasta, int Todos)
        {

            List<farmacia> Medicamentos = new List<farmacia>();
            FarmaciaDALTableAdapters.H2_FARMACIA_CONTROL_STOCK_VENC_LISTTableAdapter adapter = new FarmaciaDALTableAdapters.H2_FARMACIA_CONTROL_STOCK_VENC_LISTTableAdapter();
            FarmaciaDAL.H2_FARMACIA_CONTROL_STOCK_VENC_LISTDataTable aTable = adapter.GetData(InsumoId, RubroId, DateTime.Parse(Desde), DateTime.Parse(Hasta), Todos);
            foreach (FarmaciaDAL.H2_FARMACIA_CONTROL_STOCK_VENC_LISTRow row in aTable.Rows)
            {
                farmacia f = new farmacia();
                f.STO_CANTIDAD = row.Cantidad.ToString();
                f.STO_VENCIMIENTO = row.Vencimiento.ToShortDateString();
                f.NROLOTE = row.Lote;
                f.REM_NOMBRE = row.Insumo;
                if (!row.IsPresentacionDescNull()) { f.Presentacion = row.PresentacionDesc; } else { f.Presentacion = ""; }
                
                f.Rubro = row.Rubro;
                Medicamentos.Add(f);
            }
            return Medicamentos;
        }

        public List<farmacia> List_Lotes_by_Insumo(int Id)
        {
            FarmaciaList Medicamentos = new FarmaciaList();
            FarmaciaDALTableAdapters.H2_FARMACIA_LIST_LOTES_BY_INSUMOTableAdapter adapter = new FarmaciaDALTableAdapters.H2_FARMACIA_LIST_LOTES_BY_INSUMOTableAdapter();
            FarmaciaDAL.H2_FARMACIA_LIST_LOTES_BY_INSUMODataTable aTable = adapter.GetData(Id);
            List<farmacia> list = new List<farmacia>();
            foreach (FarmaciaDAL.H2_FARMACIA_LIST_LOTES_BY_INSUMORow row in aTable.Rows)
            {
                farmacia f = new farmacia();
                f.NROLOTE = row.NRO_LOTE;
                list.Add(f);
            }
            return list;
        }

        public void Update_UsuarioModifica(int Tipo,int Id, long Usuario_Modifica)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                adapter.H2_FARMACIA_UPDATE_USUARIO_MODIFICA(Tipo, Id, Usuario_Modifica); //Tipo Pedido: 1(PPP,PPS), 2 (IM)
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void FAR_DEVOLUCION_PRESTAMO_CAB_UPDATE_USUARIO_MODIFICA(int Id, long Usuario_Modifica)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                adapter.H2_FAR_DEVOLUCION_PRESTAMO_CAB_UPDATE_USUARIO_MODIFICA(Id, Usuario_Modifica);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void FAR_SOLICITAR_PRESTAMO_CAB_UPDATE_USUARIO_MODIFICA(int Id, long Usuario_Modifica)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                adapter.H2_FAR_SOLICITAR_PRESTAMO_CAB_UPDATE_USUARIO_MODIFICA(Id, Usuario_Modifica);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void H2_IM_ACTUALIZAR_MEDICO(int Id, int MedicoId)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IM_ACTUALIZAR_MEDICO(Id, MedicoId);
        }

        public long INSUMOS_CODIGO_SN_A_CODIGO_ALFA(long CodigoKike)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object cod_alfa = adapter.H2_INSUMOS_CODIGO_SN_A_CODIGO_ALFA(CodigoKike);
            if (cod_alfa != null) return Convert.ToInt64(cod_alfa.ToString());
            else throw new Exception("Código no válido");
        }

        public long INSUMOS_CODIGO_ALFA_A_CODIGO_SN(long CodigoAlfa)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object cod_kike = adapter.H2_INSUMOS_CODIGO_ALFA_A_CODIGO_SN(CodigoAlfa);
            if (cod_kike != null) return Convert.ToInt64(cod_kike.ToString());
            else throw new Exception("Código no válido");
        }

        public List<Usuarios_Farmacia> Usuarios_Lista()
        {
            List<Usuarios_Farmacia> Usuarios_List = new List<Usuarios_Farmacia>();
            FarmaciaDALTableAdapters.H2_USUARIOS_SELECTTableAdapter adapter = new FarmaciaDALTableAdapters.H2_USUARIOS_SELECTTableAdapter();
            FarmaciaDAL.H2_USUARIOS_SELECTDataTable aTable = adapter.GetData();
            foreach (FarmaciaDAL.H2_USUARIOS_SELECTRow row in aTable.Rows)
            {
                Usuarios_List.Add(CreateFromRowUsuarios_Farmacia(row));
            }
            return Usuarios_List;
        }

        public farmacia Get_Insumo_by_Id(int Id)
        {
            farmacia f = new farmacia();
            FarmaciaDALTableAdapters.H2_Item_Insumos_ListTableAdapter adapter = new FarmaciaDALTableAdapters.H2_Item_Insumos_ListTableAdapter();
            FarmaciaDAL.H2_Item_Insumos_ListDataTable aTable = adapter.GetData(Id, null, null, null,null);
            if (aTable.Rows.Count > 0)
            {
                f = CreateFromRowInsumos_List(aTable[0]);
            }
            return f;
        }

        public void Insert_Insumo_Lote(farmacia f)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            DateTime _f;
            if (!DateTime.TryParse(f.STO_VENCIMIENTO, out _f)) throw new Exception("Fecha de vencimiento no válida");
            adapter.H2_FAR_INSUMOS_LOTE_INSERT(int.Parse(f.REM_ID), f.NROLOTE, f.NROSERIE, int.Parse(f.STO_DEP_ID), _f);
        }

        public int Insert_Publico_Cabecera(string Afiliado_Nombre, string NHC, int Cod_Auditor)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            usuarios U = (usuarios)HttpContext.Current.Session["Usuario"];
            object Id = adapter.H2_Insert_Pedidos_Publico_Cab(Afiliado_Nombre, U.id.ToString(), NHC, Cod_Auditor);
            return Convert.ToInt32(Id.ToString());
        }

        public decimal Precio_Guardia_by_OS(long InsumoId, long OS)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_GUARDIA_PRECIOS_BY_OS(OS, InsumoId);
            return Convert.ToDecimal(Id.ToString());
        }

        public int Insumo_Eliminado(int InsumoId)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object id = adapter.H2_INSUMOS_ELIMINADO_BY_ID(InsumoId);
            if (id != null)
                return Convert.ToInt32(id.ToString());
            else return -1;
        }

        public int Insert_Publico_Detalle(Int32 NroPedido, string InsumoId, string Cantidad, string InsumoPrecio, string Descuento, string CANT_UNIDADES, Int32 Contramov,string NroLote)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            if (Contramov != 1)
            {
                adapter.H2_Insert_Pedidos_Publico_Det_SIN_STOCK(NroPedido, int.Parse(InsumoId), int.Parse(Cantidad), decimal.Parse(InsumoPrecio.Replace(".", ",")), Descuento, int.Parse(CANT_UNIDADES), Convert.ToInt32(((usuarios)HttpContext.Current.Session["Usuario"]).id), NroLote);
            }
            else //Contramovimiento sumo stock y resto total
            {
                adapter.H2_Insert_Pedidos_Publico_Det_SIN_STOCK(NroPedido, int.Parse(InsumoId), int.Parse(Cantidad), -decimal.Parse(InsumoPrecio), Descuento, int.Parse(CANT_UNIDADES), Convert.ToInt32(((usuarios)HttpContext.Current.Session["Usuario"]).id), NroLote);
            }
            return NroPedido;
        }

        public List<Bono_Contribucion_Cabecera> List_BonoContribucion(Int32 NroBono, string Desde, string Hasta)
        {
            List<Bono_Contribucion_Cabecera> Lista = new List<Bono_Contribucion_Cabecera>();
            FarmaciaDALTableAdapters.H2_PEDIDOS_PUBLICO_SELECTTableAdapter adapter = new FarmaciaDALTableAdapters.H2_PEDIDOS_PUBLICO_SELECTTableAdapter();
            FarmaciaDAL.H2_PEDIDOS_PUBLICO_SELECTDataTable aTable = adapter.GetData(NroBono, Desde, Hasta);
            foreach (FarmaciaDAL.H2_PEDIDOS_PUBLICO_SELECTRow row in aTable.Rows)
            {
                Lista.Add(CreateFromRowCabecera(row));
            }
            return Lista;
        }

   

        public List<Rendicion_BonoContribucion> List_Rendicion_BonoContribucion(DateTime desde, DateTime hasta, string Usuario)
        {
            List<Rendicion_BonoContribucion> lista = new List<Rendicion_BonoContribucion>();
            FarmaciaDALTableAdapters.H2_PEDIDOS_PUBLICO_RENDICIONTableAdapter adapter = new FarmaciaDALTableAdapters.H2_PEDIDOS_PUBLICO_RENDICIONTableAdapter();
            FarmaciaDAL.H2_PEDIDOS_PUBLICO_RENDICIONDataTable aTable = adapter.GetData(desde, Usuario, hasta);
            Rendicion_BonoContribucion r = new Rendicion_BonoContribucion();
            foreach (FarmaciaDAL.H2_PEDIDOS_PUBLICO_RENDICIONRow row in aTable.Rows)
            {
                Rendicion_BonoContribucion ren = CreateFromRowRendicion(row);
                lista.Add(ren);
                r.Acumulado += ren.Total;
            }
            lista.Add(r);
            return lista;
        }

        public List<Medicamento_Rubro> List_Medicamentos_Rubro()
        {
            List<Medicamento_Rubro> lista = new List<Medicamento_Rubro>();
            FarmaciaDALTableAdapters.H2_RUBROS_LISTTableAdapter adapter = new FarmaciaDALTableAdapters.H2_RUBROS_LISTTableAdapter();
            FarmaciaDAL.H2_RUBROS_LISTDataTable aTable = adapter.GetData();
            foreach (FarmaciaDAL.H2_RUBROS_LISTRow row in aTable.Rows)
            {
                lista.Add(CreateFromRowRubro(row));
            }
            return lista;
        }

        public List<Medicamento_Presentacion> List_Medicamento_Presentacion()
        {
            List<Medicamento_Presentacion> lista = new List<Medicamento_Presentacion>();
            FarmaciaDALTableAdapters.H2_PRESENTACION_LISTTableAdapter adapter = new FarmaciaDALTableAdapters.H2_PRESENTACION_LISTTableAdapter();
            FarmaciaDAL.H2_PRESENTACION_LISTDataTable aTable = adapter.GetData();
            foreach (FarmaciaDAL.H2_PRESENTACION_LISTRow row in aTable.Rows)
            {
                lista.Add(CreateFromRowPresentacion(row));
            }
            return lista;
        }

        public List<ControlStock> List_ControlStock(int Nombre, int Rubro, bool Todos)
        {
            List<ControlStock> lista = new List<ControlStock>();
            FarmaciaDALTableAdapters.H2_Farmacia_Control_de_StockTableAdapter adapter = new FarmaciaDALTableAdapters.H2_Farmacia_Control_de_StockTableAdapter();
            FarmaciaDAL.H2_Farmacia_Control_de_StockDataTable aTable = adapter.GetData(Nombre, Rubro, Todos);
            foreach (FarmaciaDAL.H2_Farmacia_Control_de_StockRow row in aTable.Rows)
            {
                lista.Add(CreateFromRowControlStock(row));
            }
            return lista;
        }

        public List<Medicamento_Deposito> List_Medicamento_Deposito()
        {
            List<Medicamento_Deposito> lista = new List<Medicamento_Deposito>();
            FarmaciaDALTableAdapters.H2_DEPOSITOS_LISTTableAdapter adapter = new FarmaciaDALTableAdapters.H2_DEPOSITOS_LISTTableAdapter();
            FarmaciaDAL.H2_DEPOSITOS_LISTDataTable aTable = adapter.GetData();
            foreach (FarmaciaDAL.H2_DEPOSITOS_LISTRow row in aTable.Rows)
            {
                lista.Add(CreateFromRowDeposito(row));
            }
            return lista;
        }

        public List<Medicamento_Medidas> List_Medicamento_Medidas()
        {
            List<Medicamento_Medidas> lista = new List<Medicamento_Medidas>();
            FarmaciaDALTableAdapters.H2_MEDIDAS_LISTTableAdapter adapter = new FarmaciaDALTableAdapters.H2_MEDIDAS_LISTTableAdapter();
            FarmaciaDAL.H2_MEDIDAS_LISTDataTable aTable = adapter.GetData();
            foreach (FarmaciaDAL.H2_MEDIDAS_LISTRow row in aTable.Rows)
            {
                lista.Add(CreateFromRowMedidas(row));
            }
            return lista;
        }

        public List<farmacia> Insumos_List(string Nombre, int Rubro, int Presentacion, int Medida)
        {
            List<farmacia> lista = new List<farmacia>();
            FarmaciaDALTableAdapters.H2_Item_Insumos_ListTableAdapter adapter = new FarmaciaDALTableAdapters.H2_Item_Insumos_ListTableAdapter();
                FarmaciaDAL.H2_Item_Insumos_ListDataTable aTable = adapter.GetData(0, Nombre, Presentacion, Rubro, Medida);
            foreach (FarmaciaDAL.H2_Item_Insumos_ListRow row in aTable.Rows)
            {
                lista.Add(CreateFromRowInsumos_List(row));
            }
            return lista;
        }

        public List<farmacia> Insumos_List_by_Labo_Presen(string Nombre, int Laboratorio, int Presentacion)
        {
            List<farmacia> lista = new List<farmacia>();
            FarmaciaDALTableAdapters.H2_Insumos_List_by_Labo_PresenTableAdapter adapter = new FarmaciaDALTableAdapters.H2_Insumos_List_by_Labo_PresenTableAdapter();
            FarmaciaDAL.H2_Insumos_List_by_Labo_PresenDataTable aTable = adapter.GetData(0, Nombre, Presentacion, Laboratorio);
            foreach (FarmaciaDAL.H2_Insumos_List_by_Labo_PresenRow row in aTable.Rows)
            {
                lista.Add(CreateFromRowInsumos_List_by_Labo_Presen(row));
            }
            return lista;
        }

        private farmacia CreateFromRowInsumos_List_by_Labo_Presen(FarmaciaDAL.H2_Insumos_List_by_Labo_PresenRow row)
        {
            farmacia f = new farmacia();
            if (!row.IsCant_BlisterNull())
                f.CANT_BLISTER = row.Cant_Blister.ToString();
            else f.CANT_BLISTER = "";
            f.NROLOTE = row.Lote;
            if (!row.IsMedidaNull())
                f.Medida = row.Medida;
            else f.Medida = "";
            f.NROSERIE = row.NroSerie.ToString();
            if (!row.IsPresentacionNull())
                f.Presentacion = row.Presentacion;
            else f.Presentacion = "";
            f.REM_APE = row.REM_APE;
            if (!row.IsREM_BAJA_ESPECIALNull())
                f.REM_BAJA_ESPECIAL = "N";
            else f.REM_BAJA_ESPECIAL = "";
            if (!row.IsREM_BAJANull())
                f.REM_BAJA = row.REM_BAJA;
            else f.REM_BAJA = "";
            f.REM_DESC_COMP = row.REM_DESC_COMP;
            f.REM_ESTADO = row.REM_ESTADO;
            f.REM_FACT = row.REM_FACT;
            if (!row.IsREM_FECHA_VIGENCIA_PRECIONull())
                f.REM_FECHA_VIGENCIA_PRECIO = row.REM_FECHA_VIGENCIA_PRECIO.ToString();
            else f.REM_FECHA_VIGENCIA_PRECIO = "";
            if (!row.IsREM_GRAMAJENull())
                f.REM_GRAMAJE = row.REM_GRAMAJE;
            else f.REM_GRAMAJE = "";
            f.REM_IMPORTADO = row.REM_IMPORTADO;
            f.REM_LISTA = row.REM_LISTA;
            f.REM_MULTIDOSIS = row.REM_MULTIDOSIS;
            if (!row.IsREM_NOMBRENull())
                f.REM_NOMBRE = row.REM_NOMBRE;
            else f.REM_NOMBRE = "";
            if (!row.IsREM_PRECIONull())
                f.REM_PRECIO = row.REM_PRECIO;
            else f.REM_PRECIO = Convert.ToDecimal("0.00");
            if (!row.IsREM_PRECOMPRANull())
                f.REM_PRECOMPRA = row.REM_PRECOMPRA;
            else f.REM_PRECOMPRA = Convert.ToDecimal("0.00");
            if (!row.Isrem_presentacion_idNull())
                f.REM_PRESENTACION_ID = row.rem_presentacion_id.ToString();
            else f.REM_PRESENTACION_ID = "";
            if (!row.IsREM_PRESENTACIONNull())
                f.REM_PRESENTACION = row.REM_PRESENTACION.ToString();
            else f.REM_PRESENTACION = "";
            if (!row.IsREM_RUBRONull())
                f.REM_RUBRO = row.REM_RUBRO.ToString();
            else f.REM_RUBRO = "";
            if (!row.Isrem_rubros_idNull())
                f.REM_RUBRO_ID = row.rem_rubros_id.ToString();
            else f.REM_RUBRO_ID = "";
            if (!row.Isrem_unidades_idNull())
                f.REM_UNIDADES_ID = row.rem_unidades_id.ToString();
            else f.REM_UNIDADES_ID = "";
            if (!row.IsREM_UNIDADESNull())
                f.REM_UNIDADES = row.REM_UNIDADES.ToString();
            else f.REM_UNIDADES = "";
            if (!row.IsRubroNull())
                f.Rubro = row.Rubro;
            else f.Rubro = "";
            if (!row.IsSTO_CANTIDADNull())
                f.STO_CANTIDAD = row.STO_CANTIDAD.ToString();
            else f.STO_CANTIDAD = "";
            if (!row.IsSTO_DEP_IDNull())
                f.STO_DEP_ID = row.STO_DEP_ID.ToString();
            else f.STO_DEP_ID = "";
            if (!row.IsSTO_MINIMONull())
                f.STO_MINIMO = row.STO_MINIMO.ToString();
            else f.STO_MINIMO = "";
            if (!row.IsSTO_VCTONull())
                f.STO_VENCIMIENTO = row.STO_VCTO.ToString();
            else f.STO_VENCIMIENTO = "";
            f.CTrazabilidad = false;
            f.REM_ID = row.REM_ID.ToString();
            f.ELIMINADO = false;
            f.MONODROGA = row.Monodroga;
            f.CRequiereAuto = row.Req_Auto;
            if (!row.IsLabIdNull())
                f.LAB_ID = row.LabId.ToString();
            else f.LAB_ID = "0";
            f.Laboratorio = row.Laboratorio;
            return f;
        }

        public farmacia Insumos_List_byId(int Id)
        {
            farmacia f = new farmacia();
            FarmaciaDALTableAdapters.H2_Item_Insumos_ListTableAdapter adapter = new FarmaciaDALTableAdapters.H2_Item_Insumos_ListTableAdapter();
            FarmaciaDAL.H2_Item_Insumos_ListDataTable aTable = adapter.GetData(Id, null, null, null,null);
            f = CreateFromRowInsumos_List(aTable[0]);
            return f;
        }

        public int Medicamento_Save(farmacia f)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                object obj = adapter.H2_Medicamento_Save(int.Parse(f.REM_ID), f.REM_NOMBRE, f.REM_DESC_COMP, f.REM_GRAMAJE, int.Parse(f.REM_PRESENTACION_ID), f.REM_PRECIO, f.REM_BAJA, int.Parse(f.REM_UNIDADES_ID), f.REM_BAJA_ESPECIAL, int.Parse(f.REM_RUBRO_ID), f.REM_APE, f.REM_FACT, f.REM_MULTIDOSIS, 0, f.CTrazabilidad,
                int.Parse(f.STO_MINIMO), int.Parse(f.CANT_BLISTER), f.ELIMINADO, f.MONODROGA, f.CRequiereAuto, int.Parse(f.LAB_ID), f.REM_GRAMAJE_ID,
                decimal.Parse(f.REM_PRESENTACION_C), f.GLN, f.GTIN, f.Vencimiento_Diasaviso, f.StockMax,f.Usuario);
                if (obj != null) return Convert.ToInt32(obj);
                else return -1;
            }
            catch(SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Farmacia_Proveedores> List_Proveedores(string Todos)
        {
            List<Farmacia_Proveedores> lista = new List<Farmacia_Proveedores>();
            FarmaciaDALTableAdapters.H2_LIST_PROVEEDORESTableAdapter adapter = new FarmaciaDALTableAdapters.H2_LIST_PROVEEDORESTableAdapter();
            FarmaciaDAL.H2_LIST_PROVEEDORESDataTable aTable = adapter.GetData(Todos);
            foreach (FarmaciaDAL.H2_LIST_PROVEEDORESRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_FarmaciaProveedores(row));
            }
            return lista;
        }

        public int Insert_Remitos_Cab(Farmacia_Remito_Cab f)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_INSERT_REMITO_CAB(f.Letra, f.Sucursal, f.Numero, int.Parse(f.Proveedor), f.Usuario, f.Observaciones);
            return Convert.ToInt32(Id.ToString());
        }

        public List<Farmacia_Pedido_Pac_Buscar> Pendientes_Pac(string Desde, string Hasta, int Pendiente)
        {
            List<Farmacia_Pedido_Pac_Buscar> lista = new List<Farmacia_Pedido_Pac_Buscar>();
            FarmaciaDALTableAdapters.H2_PENDIENTES_PAC_LISTTableAdapter adapter = new FarmaciaDALTableAdapters.H2_PENDIENTES_PAC_LISTTableAdapter();
            FarmaciaDAL.H2_PENDIENTES_PAC_LISTDataTable aTable = adapter.GetData(DateTime.Parse(Desde),DateTime.Parse(Hasta),Pendiente);
            foreach (FarmaciaDAL.H2_PENDIENTES_PAC_LISTRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_Pendientes_Pac(row));
            }
            return lista;
        }

        public List<Farmacia_Pedido_Pac_Buscar> Pendientes_Serv(string Desde, string Hasta, int Pendiente)
        {
            List<Farmacia_Pedido_Pac_Buscar> lista = new List<Farmacia_Pedido_Pac_Buscar>();
            FarmaciaDALTableAdapters.H2_PENDIENTES_SERV_LISTTableAdapter adapter = new FarmaciaDALTableAdapters.H2_PENDIENTES_SERV_LISTTableAdapter();
            FarmaciaDAL.H2_PENDIENTES_SERV_LISTDataTable aTable = adapter.GetData(DateTime.Parse(Desde), DateTime.Parse(Hasta), Pendiente);
            foreach (FarmaciaDAL.H2_PENDIENTES_SERV_LISTRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_Pendientes_Serv(row));
            }
            return lista;
        }

        public List<Farmacia_Pedido_Pac_Buscar> Pendientes_IM(string Desde, string Hasta, int Pendiente)
        {
            List<Farmacia_Pedido_Pac_Buscar> lista = new List<Farmacia_Pedido_Pac_Buscar>();
            FarmaciaDALTableAdapters.H2_PENDIENTES_IM_LISTTableAdapter adapter = new FarmaciaDALTableAdapters.H2_PENDIENTES_IM_LISTTableAdapter();
            FarmaciaDAL.H2_PENDIENTES_IM_LISTDataTable aTable = adapter.GetData(DateTime.Parse(Desde), DateTime.Parse(Hasta),Pendiente);
            foreach (FarmaciaDAL.H2_PENDIENTES_IM_LISTRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_Pendientes_IM(row));
            }
            return lista;
        }

         private Farmacia_Pedido_Pac_Buscar CreateFromRow_Pendientes_IM(FarmaciaDAL.H2_PENDIENTES_IM_LISTRow row)
        {
            Farmacia_Pedido_Pac_Buscar f = new Farmacia_Pedido_Pac_Buscar();
            f.Paciente = row.Paciente;
            f.Pedido_Id = row.Id;
            f.Fecha = row.Fecha.ToShortDateString();
            f.NHC = Convert.ToInt64(row.NHC);
            f.Estado = row.Estado;
            f.Sala = row.Sala;
            f.Servicio = row.Servicio;
            f.Cama = row.Cama;
            return f;
        }

        private Farmacia_Pedido_Pac_Buscar CreateFromRow_Pendientes_Serv(FarmaciaDAL.H2_PENDIENTES_SERV_LISTRow row)
        {
            Farmacia_Pedido_Pac_Buscar f = new Farmacia_Pedido_Pac_Buscar();
            f.Servicio = row.Servicio;
            f.Pedido_Id = Convert.ToInt32(row.PED_ID);
            f.Fecha = row.Fecha.ToShortDateString();
            f.Estado = row.Estado;
            f.Usuario = row.Usuario;
            return f;
        }

        private Farmacia_Pedido_Pac_Buscar CreateFromRow_Pendientes_Pac(FarmaciaDAL.H2_PENDIENTES_PAC_LISTRow row)
        {
            Farmacia_Pedido_Pac_Buscar f = new Farmacia_Pedido_Pac_Buscar();
             f.Paciente = row.Paciente;
             f.Pedido_Id = Convert.ToInt32(row.PED_ID);
             f.Fecha = row.Fecha.ToShortDateString();
             f.NHC = Convert.ToInt64(row.NHC);
             f.Servicio = row.Servicio;
             f.Estado = row.Estado;
             return f;
        }

        public void Insert_Remitos_Det(int Id, Farmacia_Remito_Det f)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_INSERT_REMITO_DET(Id, f.Insumo_Id, f.Cantidad, f.Deposito_Id,DateTime.Parse(f.FechaVencimiento),f.NroLote,f.Precio_Compra,((usuarios)HttpContext.Current.Session["Usuario"]).id,f.Precio_Venta);
        }

        public void Delete_Remitos_Det(int Id)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FARMACIA_REMITOS_DET_DELETE(Id);
        }


        public List<Farmacia_Remito_Cab> List_Remitos_byAll(string letra, string numero, string sucursal, string Proveedor, string Desde, string Hasta)
        {
            List<Farmacia_Remito_Cab> lista = new List<Farmacia_Remito_Cab>();
            FarmaciaDALTableAdapters.H2_LIST_REMITOSTableAdapter adapter = new FarmaciaDALTableAdapters.H2_LIST_REMITOSTableAdapter();
            FarmaciaDAL.H2_LIST_REMITOSDataTable aTable = adapter.GetData(letra,  numero,sucursal, Proveedor,Convert.ToDateTime(Desde).Date,Convert.ToDateTime(Hasta).Date);
            foreach (FarmaciaDAL.H2_LIST_REMITOSRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_List_Remitos_byLetraNumeroSuc(row));
            }
            return lista;
        }


        public List<Farmacia_Egr_Detalle> Entregas_by_RemitoId(string RemitoId)
        {
            try
            {
                int _RemitoId;
                if (!int.TryParse(RemitoId, out _RemitoId)) throw new Exception("Remito no válido");
                List<Farmacia_Egr_Detalle> lista = new List<Farmacia_Egr_Detalle>();
                FarmaciaDALTableAdapters.H2_FARMACIA_ENTREGAS_BY_REMITOIDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_FARMACIA_ENTREGAS_BY_REMITOIDTableAdapter();
                FarmaciaDAL.H2_FARMACIA_ENTREGAS_BY_REMITOIDDataTable aTable = adapter.GetData(_RemitoId);
                foreach (FarmaciaDAL.H2_FARMACIA_ENTREGAS_BY_REMITOIDRow row in aTable.Rows)
                {
                    Farmacia_Egr_Detalle f = new Farmacia_Egr_Detalle();
                    f.NRO_ENTREGA = row.NRO_ENTREGA;
                    f.USUARIO = row.Usuario;
                    f.FECHA = row.Fecha.ToString();
                    lista.Add(f);
                }
                return lista;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Farmacia_Remito_Cab> List_Remitos(string letra,string sucursal ,string Proveedor,string numero,string Desde, string Hasta)
        {
            List<Farmacia_Remito_Cab> lista = new List<Farmacia_Remito_Cab>();
            FarmaciaDALTableAdapters.H2_LIST_REMITOSTableAdapter adapter = new FarmaciaDALTableAdapters.H2_LIST_REMITOSTableAdapter();
            FarmaciaDAL.H2_LIST_REMITOSDataTable aTable = adapter.GetData(letra, sucursal, numero,Proveedor, Convert.ToDateTime(Desde), Convert.ToDateTime(Hasta));
            foreach (FarmaciaDAL.H2_LIST_REMITOSRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_List_Remitos_byLetraNumeroSuc(row));
            }
            return lista;
        }

        public Farmacia_Remito_Cab List_Remitos_CabecerabyId(int Id) 
        {
            FarmaciaDALTableAdapters.H2_LIST_REMITO_CAB_BY_REMIDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_LIST_REMITO_CAB_BY_REMIDTableAdapter();
            FarmaciaDAL.H2_LIST_REMITO_CAB_BY_REMIDDataTable aTable = adapter.GetData(Id);
            return CreateFromRow_List_Remitos_CabecerabyId(aTable[0]);
        }

        public List<Farmacia_Remito_Det> List_Remitos_DetallebyId(int Id)
        {
            FarmaciaDALTableAdapters.H2_LIST_REMITO_DET_BY_REMIDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_LIST_REMITO_DET_BY_REMIDTableAdapter();
            FarmaciaDAL.H2_LIST_REMITO_DET_BY_REMIDDataTable aTable = adapter.GetData(Id);
            List<Farmacia_Remito_Det> lista = new List<Farmacia_Remito_Det>();
            foreach (FarmaciaDAL.H2_LIST_REMITO_DET_BY_REMIDRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_List_Remitos_DetallebyId(row));
            }
            return lista;
        }

        public List<Farmacia_PPS_Det_List> List_Det_PPS(string PedidoId)
        {
            int _PedidoId;
            if (!int.TryParse(PedidoId, out _PedidoId)) throw new Exception("Número de pedido no válido.");
            FarmaciaDALTableAdapters.H2_PPS_DET_BY_IDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_PPS_DET_BY_IDTableAdapter();
            FarmaciaDAL.H2_PPS_DET_BY_IDDataTable aTable = adapter.GetData(_PedidoId);
            List<Farmacia_PPS_Det_List> lista = new List<Farmacia_PPS_Det_List>();
            foreach (FarmaciaDAL.H2_PPS_DET_BY_IDRow row in aTable.Rows)
            {
               lista.Add (CreateFromRow_List_Det_PPS(row));
            }
            if (lista.Count > 0)
                return lista;
            else
            return null;
        }

        public List<Farmacia_PPS_Det_List> BUSCAR_FAR_PEDIDO_PRESTAMO_DET_BY_ID(string PedidoId)
        {
            int _PedidoId;
            if (!int.TryParse(PedidoId, out _PedidoId)) throw new Exception("Número de pedido no válido.");
            FarmaciaDALTableAdapters.H2_BUSCAR_FAR_PEDIDO_PRESTAMO_DET_BY_IDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_BUSCAR_FAR_PEDIDO_PRESTAMO_DET_BY_IDTableAdapter();
            FarmaciaDAL.H2_BUSCAR_FAR_PEDIDO_PRESTAMO_DET_BY_IDDataTable aTable = adapter.GetData(_PedidoId);
            List<Farmacia_PPS_Det_List> lista = new List<Farmacia_PPS_Det_List>();
            foreach (FarmaciaDAL.H2_BUSCAR_FAR_PEDIDO_PRESTAMO_DET_BY_IDRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_BUSCAR_FAR_PEDIDO_PRESTAMO_DET_BY_ID(row));
            }
            if (lista.Count > 0)
                return lista;
            else
            return null;
        }

        public List<Farmacia_PPS_Det_List> BUSCAR_FAR_DEVOLUCION_PRESTAMO_DET_BY_ID(string PedidoId)
        {
            int _PedidoId;
            if (!int.TryParse(PedidoId, out _PedidoId)) throw new Exception("Número de pedido no válido.");
            FarmaciaDALTableAdapters.H2_BUSCAR_FAR_DEVOLUCION_PRESTAMO_DET_BY_IDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_BUSCAR_FAR_DEVOLUCION_PRESTAMO_DET_BY_IDTableAdapter();
            FarmaciaDAL.H2_BUSCAR_FAR_DEVOLUCION_PRESTAMO_DET_BY_IDDataTable aTable = adapter.GetData(_PedidoId);
            List<Farmacia_PPS_Det_List> lista = new List<Farmacia_PPS_Det_List>();
            foreach (FarmaciaDAL.H2_BUSCAR_FAR_DEVOLUCION_PRESTAMO_DET_BY_IDRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_BUSCAR_FAR_DEVOLUCION_PRESTAMO_DET_BY_ID(row));
            }
            if (lista.Count > 0)
                return lista;
            else
            return null;
        }
        

        public Farmacia_PPP_Cab List_Cab_PPS(int PedidoId)
        {
            FarmaciaDALTableAdapters.H2_PPS_CAB_BY_IDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_PPS_CAB_BY_IDTableAdapter();
            FarmaciaDAL.H2_PPS_CAB_BY_IDDataTable aTable = adapter.GetData(PedidoId);
            foreach (FarmaciaDAL.H2_PPS_CAB_BY_IDRow row in aTable.Rows)
            {
                return CreateFromRow_PPS_Cab(row);
            }
            
                return null;
        }



        public Farmacia_PPP_Cab BUSCAR_FAR_PEDIDO_PRESTAMO_CAB_BY_ID(int PedidoId)
        {
            FarmaciaDALTableAdapters.H2_BUSCAR_FAR_PEDIDO_PRESTAMO_CAB_BY_IDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_BUSCAR_FAR_PEDIDO_PRESTAMO_CAB_BY_IDTableAdapter();
            FarmaciaDAL.H2_BUSCAR_FAR_PEDIDO_PRESTAMO_CAB_BY_IDDataTable aTable = adapter.GetData(PedidoId);
            foreach (FarmaciaDAL.H2_BUSCAR_FAR_PEDIDO_PRESTAMO_CAB_BY_IDRow row in aTable.Rows)
            {
                return CreateFromRow_PPS_Cab(row);
            }

            return null;
        }

        public Farmacia_PPP_Cab BUSCAR_FAR_DEVOLUCION_PRESTAMO_CAB_BY_ID(int PedidoId)
        {
            FarmaciaDALTableAdapters.H2_BUSCAR_FAR_DEVOLUCION_PRESTAMO_CAB_BY_IDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_BUSCAR_FAR_DEVOLUCION_PRESTAMO_CAB_BY_IDTableAdapter();
            FarmaciaDAL.H2_BUSCAR_FAR_DEVOLUCION_PRESTAMO_CAB_BY_IDDataTable aTable = adapter.GetData(PedidoId);
            foreach (FarmaciaDAL.H2_BUSCAR_FAR_DEVOLUCION_PRESTAMO_CAB_BY_IDRow row in aTable.Rows)
            {
                return CreateFromRow_PPS_Cab(row);
            }

            return null;
        }

        private Farmacia_PPS_Det_List CreateFromRow_BUSCAR_FAR_PEDIDO_PRESTAMO_DET_BY_ID(FarmaciaDAL.H2_BUSCAR_FAR_PEDIDO_PRESTAMO_DET_BY_IDRow row)
        {
            Farmacia_PPS_Det_List f = new Farmacia_PPS_Det_List();
            f.DET_CANTIDAD = row.DET_CANTIDAD.ToString();
            if (!row.IsDET_DEP_IDNull()) f.DET_PED_ID = row.DET_DEP_ID.ToString();
            f.DET_INS_ID = row.DET_INS_ID.ToString();
            if (!row.IsmedidaNull()) f.MEDIDA = row.medida.ToString();
            if(!row.IspresentacionNull()) f.PRESENTACION = row.presentacion.ToString();
            if(!row.IsREM_GRAMAJENull()) f.REM_GRAMAJE = row.REM_GRAMAJE.ToString();
            if(!row.IsREM_NOMBRENull()) f.REM_NOMBRE = row.REM_NOMBRE.ToString();
            if (!row.IsSTO_MINIMONull()) f.STO_MINIMO = row.STO_MINIMO.ToString();
            else f.STO_MINIMO = "0";
            if (!row.IsSTO_CANTIDADNull()) f.STO_CANTIDAD = row.STO_CANTIDAD.ToString();
            else f.STO_CANTIDAD = "0";
            if (!row.IsMonodrogaNull()) f.MONODROGA = row.Monodroga.ToString();
            else f.MONODROGA = "0";

            if (!row.IsLOTENull()) { f.LOTE = row.LOTE; }
            

            return f;
        }

        private Farmacia_PPS_Det_List CreateFromRow_BUSCAR_FAR_DEVOLUCION_PRESTAMO_DET_BY_ID(FarmaciaDAL.H2_BUSCAR_FAR_DEVOLUCION_PRESTAMO_DET_BY_IDRow row)
        {
            Farmacia_PPS_Det_List f = new Farmacia_PPS_Det_List();
            f.DET_CANTIDAD = row.DET_CANTIDAD.ToString();
            if (!row.IsDET_DEP_IDNull()) f.DET_PED_ID = row.DET_DEP_ID.ToString();
            f.DET_INS_ID = row.DET_INS_ID.ToString();
            if (!row.IsmedidaNull()) f.MEDIDA = row.medida.ToString();
            if(!row.IspresentacionNull()) f.PRESENTACION = row.presentacion.ToString();
            if(!row.IsREM_GRAMAJENull()) f.REM_GRAMAJE = row.REM_GRAMAJE.ToString();
            if(!row.IsREM_NOMBRENull()) f.REM_NOMBRE = row.REM_NOMBRE.ToString();
            if (!row.IsSTO_MINIMONull()) f.STO_MINIMO = row.STO_MINIMO.ToString();
            else f.STO_MINIMO = "0";
            if (!row.IsSTO_CANTIDADNull()) f.STO_CANTIDAD = row.STO_CANTIDAD.ToString();
            else f.STO_CANTIDAD = "0";
            if (!row.IsMonodrogaNull()) f.MONODROGA = row.Monodroga.ToString();
            else f.MONODROGA = "0";

            //agregado de lote
            if (!row.IsLOTENull()) { f.LOTE = row.LOTE; }

            return f;
        }

        private Farmacia_PPS_Det_List CreateFromRow_List_Det_PPS(FarmaciaDAL.H2_PPS_DET_BY_IDRow row)
        {
            Farmacia_PPS_Det_List f = new Farmacia_PPS_Det_List();
            f.DET_CANTIDAD = row.DET_CANTIDAD.ToString();
            if (!row.IsDET_DEP_IDNull()) f.DET_PED_ID = row.DET_DEP_ID.ToString();
            f.DET_INS_ID = row.DET_INS_ID.ToString();
            if (!row.IsmedidaNull()) f.MEDIDA = row.medida.ToString();
            if(!row.IspresentacionNull()) f.PRESENTACION = row.presentacion.ToString();
            if(!row.IsREM_GRAMAJENull()) f.REM_GRAMAJE = row.REM_GRAMAJE.ToString();
            if(!row.IsREM_NOMBRENull()) f.REM_NOMBRE = row.REM_NOMBRE.ToString();
            if (!row.IsSTO_MINIMONull()) f.STO_MINIMO = row.STO_MINIMO.ToString();
            else f.STO_MINIMO = "0";
            if (!row.IsSTO_CANTIDADNull()) f.STO_CANTIDAD = row.STO_CANTIDAD.ToString();
            else f.STO_CANTIDAD = "0";
            if (!row.IsMonodrogaNull()) f.MONODROGA = row.Monodroga.ToString();
            else f.MONODROGA = "0";
            return f;
        }

        public List<Farmacia_Pedido_Pac_Buscar> Buscar_PPP(string NHC, string Id, string Apellido, string Desde, string Hasta, string objBusquedaLista)
        {
            int Pedido_Id;
            long _NHC;
            DateTime f_Desde, f_Hasta;

            if (string.IsNullOrEmpty(NHC)) _NHC = 0;
            else _NHC = long.Parse(NHC);

            if (string.IsNullOrEmpty(Id)) Pedido_Id = 0;
            else Pedido_Id = int.Parse(Id);

            if (string.IsNullOrEmpty(Desde)) f_Desde = DateTime.MinValue.Date;
            else f_Desde = DateTime.Parse(Desde).Date;

            if (string.IsNullOrEmpty(Hasta)) f_Hasta = DateTime.MinValue.Date;
            else f_Hasta = DateTime.Parse(Hasta).Date;

            FarmaciaDALTableAdapters.H2_BUSCAR_PPPTableAdapter adapter = new FarmaciaDALTableAdapters.H2_BUSCAR_PPPTableAdapter();
            FarmaciaDAL.H2_BUSCAR_PPPDataTable aTable = adapter.GetData(_NHC, Pedido_Id, Apellido, f_Desde, f_Hasta, objBusquedaLista);
            List<Farmacia_Pedido_Pac_Buscar> lista = new List<Farmacia_Pedido_Pac_Buscar>();
            foreach (FarmaciaDAL.H2_BUSCAR_PPPRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_BuscarPPP(row));
            }
            return lista;
        }

        public List<Farmacia_Pedido_Pac_Buscar> Buscar_PPS(string Id, string Desde, string Hasta, string objBusquedaLista)
        {
            int Pedido_Id;
            DateTime f_Desde, f_Hasta;

            if (string.IsNullOrEmpty(Id)) Pedido_Id = 0;
            else Pedido_Id = int.Parse(Id);


            if (DateTime.TryParse(Desde, out f_Desde) && DateTime.TryParse(Hasta, out f_Hasta))
            {
                if (f_Desde <= f_Hasta)
                {
                    FarmaciaDALTableAdapters.H2_BUSCAR_PPSTableAdapter adapter = new FarmaciaDALTableAdapters.H2_BUSCAR_PPSTableAdapter();
                    FarmaciaDAL.H2_BUSCAR_PPSDataTable aTable = adapter.GetData(Pedido_Id, f_Desde, f_Hasta, objBusquedaLista);
                    List<Farmacia_Pedido_Pac_Buscar> lista = new List<Farmacia_Pedido_Pac_Buscar>();
                    foreach (FarmaciaDAL.H2_BUSCAR_PPSRow row in aTable.Rows)
                    {
                        lista.Add(CreateFromRow_BuscarPPS(row));
                    }
                    return lista;
                }
                else throw new Exception("Verifique las fechas.");
            }
            else throw new Exception("Verifique las fechas.");
        }

        public List<Farmacia_Pedido_Pac_Buscar> BuscarPedidosporPrestamo(string Id, string Desde, string Hasta)
        {
            int Pedido_Id;
            DateTime f_Desde, f_Hasta;

            if (string.IsNullOrEmpty(Id)) Pedido_Id = 0;
            else Pedido_Id = int.Parse(Id);

            if (DateTime.TryParse(Desde, out f_Desde) && DateTime.TryParse(Hasta, out f_Hasta))
            {
                if (f_Desde <= f_Hasta)
                {
                    FarmaciaDALTableAdapters.H2_BuscarPedidosporPrestamoTableAdapter adapter = new FarmaciaDALTableAdapters.H2_BuscarPedidosporPrestamoTableAdapter();
                    FarmaciaDAL.H2_BuscarPedidosporPrestamoDataTable aTable = adapter.GetData(Pedido_Id, f_Desde, f_Hasta);
                    List<Farmacia_Pedido_Pac_Buscar> lista = new List<Farmacia_Pedido_Pac_Buscar>();
                    foreach (FarmaciaDAL.H2_BuscarPedidosporPrestamoRow row in aTable.Rows)
                    {
                        lista.Add(CreateFromRow_BuscarBuscarPedidosporPrestamo(row));
                    }
                    return lista;
                }
                else throw new Exception("Verifique las fechas.");
            }
            else throw new Exception("Verifique las fechas.");
        }

        public List<Farmacia_Pedido_Pac_Buscar> BuscarDevolucionesporPrestamo(string Id, string Desde, string Hasta)
        {
            int Pedido_Id;
            DateTime f_Desde, f_Hasta;

            if (string.IsNullOrEmpty(Id)) Pedido_Id = 0;
            else Pedido_Id = int.Parse(Id);

            if (DateTime.TryParse(Desde, out f_Desde) && DateTime.TryParse(Hasta, out f_Hasta))
            {
                if (f_Desde <= f_Hasta)
                {
                    FarmaciaDALTableAdapters.H2_BuscarDevolucionesporPrestamoTableAdapter adapter = new FarmaciaDALTableAdapters.H2_BuscarDevolucionesporPrestamoTableAdapter();
                    FarmaciaDAL.H2_BuscarDevolucionesporPrestamoDataTable aTable = adapter.GetData(Pedido_Id, f_Desde, f_Hasta);
                    List<Farmacia_Pedido_Pac_Buscar> lista = new List<Farmacia_Pedido_Pac_Buscar>();
                    foreach (FarmaciaDAL.H2_BuscarDevolucionesporPrestamoRow row in aTable.Rows)
                    {
                        lista.Add(CreateFromRow_BuscarBuscarDevolucionesporPrestamo(row));
                    }
                    return lista;
                }
                else throw new Exception("Verifique las fechas.");
            }
            else throw new Exception("Verifique las fechas.");
        }

        public List<Farmacia_Pedido_Pac_Buscar> Buscar_Dev_Pac(string NHC, string Id, string Apellido, string Desde, string Hasta, string objBusquedaLista)
        {
            int Pedido_Id;
            DateTime f_Desde, f_Hasta;

            if (string.IsNullOrEmpty(Id)) Pedido_Id = 0;
            else Pedido_Id = int.Parse(Id);

            if (string.IsNullOrEmpty(Desde)) f_Desde = DateTime.MinValue.Date;
            else f_Desde = DateTime.Parse(Desde).Date;

            if (string.IsNullOrEmpty(Hasta)) f_Hasta = DateTime.MinValue.Date;
            else f_Hasta = DateTime.Parse(Hasta).Date;

            FarmaciaDALTableAdapters.H2_BUSCAR_DEV_PACTableAdapter adapter = new FarmaciaDALTableAdapters.H2_BUSCAR_DEV_PACTableAdapter();
            FarmaciaDAL.H2_BUSCAR_DEV_PACDataTable aTable = adapter.GetData(NHC, Pedido_Id, Apellido, f_Desde, f_Hasta, objBusquedaLista);
            List<Farmacia_Pedido_Pac_Buscar> lista = new List<Farmacia_Pedido_Pac_Buscar>();
            foreach (FarmaciaDAL.H2_BUSCAR_DEV_PACRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_BuscarPPP(row));
            }
            return lista;
        }

        public List<Farmacia_Pedido_Pac_Buscar> Buscar_PPP_ENT(string NHC, string Id ,string Desde, string Hasta, string ServicioId, int Pendiente)
        {
            int Pedido_Id, Serv;
            DateTime f_Desde, f_Hasta;

            if (string.IsNullOrEmpty(Id)) Pedido_Id = 0;
            else Pedido_Id = int.Parse(Id);

             if (string.IsNullOrEmpty(ServicioId)) Serv = 0;
            else Serv = int.Parse(ServicioId);

            if (string.IsNullOrEmpty(Desde)) f_Desde = DateTime.MinValue.Date;
            else f_Desde = DateTime.Parse(Desde).Date;

            if (string.IsNullOrEmpty(Hasta)) f_Hasta = DateTime.MinValue.Date;
            else f_Hasta = DateTime.Parse(Hasta).Date;

            FarmaciaDALTableAdapters.H2_BUSCAR_PPP_ENTTableAdapter adapter = new FarmaciaDALTableAdapters.H2_BUSCAR_PPP_ENTTableAdapter();
            FarmaciaDAL.H2_BUSCAR_PPP_ENTDataTable aTable = adapter.GetData(NHC, Pedido_Id, f_Desde, f_Hasta, Serv, Pendiente);
            List<Farmacia_Pedido_Pac_Buscar> lista = new List<Farmacia_Pedido_Pac_Buscar>();
            foreach (FarmaciaDAL.H2_BUSCAR_PPP_ENTRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_BuscarPPP(row));
            }
            return lista;
        }

        public List<Farmacia_Pedido_Pac_Buscar> Buscar_PPS_ENT(string Id, string Desde, string Hasta, string ServicioId, int Pendiente)
        {
            int Pedido_Id, Serv;
            DateTime f_Desde, f_Hasta;

            if (string.IsNullOrEmpty(Id)) Pedido_Id = 0;
            else Pedido_Id = int.Parse(Id);

            if (string.IsNullOrEmpty(ServicioId)) Serv = 0;
            else Serv = int.Parse(ServicioId);


            if (DateTime.TryParse(Desde, out f_Desde) && DateTime.TryParse(Hasta, out f_Hasta))
            {
                if (f_Desde <= f_Hasta)
                {
                    FarmaciaDALTableAdapters.H2_BUSCAR_PPS_ENTTableAdapter adapter = new FarmaciaDALTableAdapters.H2_BUSCAR_PPS_ENTTableAdapter();
                    FarmaciaDAL.H2_BUSCAR_PPS_ENTDataTable aTable = adapter.GetData(Pedido_Id, f_Desde, f_Hasta, Serv,Pendiente);
                    List<Farmacia_Pedido_Pac_Buscar> lista = new List<Farmacia_Pedido_Pac_Buscar>();
                    foreach (FarmaciaDAL.H2_BUSCAR_PPS_ENTRow row in aTable.Rows)
                    {
                        lista.Add(CreateFromRow_BuscarPPS(row));
                    }
                    return lista;
                }
                else throw new Exception("Verifique las fechas");
            }
            else throw new Exception("Verifique las fechas");
        }

        public List<Farmacia_Pedido_Pac_Buscar> Buscar_Dev_Ser(string Id, string Desde, string Hasta, string ServicioId)
        {
            int Pedido_Id, Serv;
            DateTime f_Desde, f_Hasta;

            if (string.IsNullOrEmpty(Id)) Pedido_Id = 0;
            else Pedido_Id = int.Parse(Id);

            if (string.IsNullOrEmpty(ServicioId)) Serv = 0;
            else Serv = int.Parse(ServicioId);

            if (string.IsNullOrEmpty(Desde)) f_Desde = DateTime.MinValue.Date;
            else f_Desde = DateTime.Parse(Desde).Date;

            if (string.IsNullOrEmpty(Hasta)) f_Hasta = DateTime.MinValue.Date;
            else f_Hasta = DateTime.Parse(Hasta).Date;

            FarmaciaDALTableAdapters.H2_BUSCAR_DEV_SERTableAdapter adapter = new FarmaciaDALTableAdapters.H2_BUSCAR_DEV_SERTableAdapter();
            FarmaciaDAL.H2_BUSCAR_DEV_SERDataTable aTable = adapter.GetData(Pedido_Id, f_Desde, f_Hasta, Serv);
            List<Farmacia_Pedido_Pac_Buscar> lista = new List<Farmacia_Pedido_Pac_Buscar>();
            foreach (FarmaciaDAL.H2_BUSCAR_DEV_SERRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_BuscarPPS(row));
            }
            return lista;
        }

        private Farmacia_Pedido_Pac_Buscar CreateFromRow_BuscarPPP(FarmaciaDAL.H2_BUSCAR_PPPRow row)
        {
            Farmacia_Pedido_Pac_Buscar f = new Farmacia_Pedido_Pac_Buscar();
            f.Paciente = row.apellido;
            if (!row.IsPED_SOC_IDNull()) f.NHC = row.PED_SOC_ID;
            if(!row.IsSERV_DESCRIPCIONNull()) f.Servicio = row.SERV_DESCRIPCION;
            if (!row.IsusuarioNull()) f.Usuario = row.usuario;
            f.Fecha = row.PED_FECHA.ToShortDateString();
            f.Pedido_Id = (int)row.PED_ID;
            return f;
        }

        private Farmacia_Pedido_Pac_Buscar CreateFromRow_BuscarPPS(FarmaciaDAL.H2_BUSCAR_PPS_ENTRow row)
        {
            Farmacia_Pedido_Pac_Buscar f = new Farmacia_Pedido_Pac_Buscar();
            if (!row.IsSERV_DESCRIPCIONNull()) f.Servicio = row.SERV_DESCRIPCION;
            if (!row.IsusuarioNull()) f.Usuario = row.usuario;
            f.Fecha = row.PED_FECHA.ToShortDateString();
            f.Pedido_Id = (int)row.PED_ID;
            if (!row.IsPendienteNull())
                f.Pendiente = row.Pendiente;
            //else f.Pendiente = true;
            return f;
        }

        private Farmacia_Pedido_Pac_Buscar CreateFromRow_BuscarPPS(FarmaciaDAL.H2_BUSCAR_DEV_SERRow row)
        {
            Farmacia_Pedido_Pac_Buscar f = new Farmacia_Pedido_Pac_Buscar();
            if (!row.IsSERV_DESCRIPCIONNull()) f.Servicio = row.SERV_DESCRIPCION;
            if (!row.IsusuarioNull()) f.Usuario = row.usuario;
            f.Fecha = row.REM_FECHA.ToShortDateString();
            f.Pedido_Id = (int)row.REM_ID;
            return f;
        }

        private Farmacia_Pedido_Pac_Buscar CreateFromRow_BuscarPPS(FarmaciaDAL.H2_BUSCAR_PPSRow row)
        {
            Farmacia_Pedido_Pac_Buscar f = new Farmacia_Pedido_Pac_Buscar();
            if (!row.IsSERV_DESCRIPCIONNull()) f.Servicio = row.SERV_DESCRIPCION;
            if (!row.IsusuarioNull()) f.Usuario = row.usuario;
            f.Fecha = row.PED_FECHA.ToShortDateString();
            f.Pedido_Id = (int)row.PED_ID;
            return f;
        }

        private Farmacia_Pedido_Pac_Buscar CreateFromRow_BuscarBuscarPedidosporPrestamo(FarmaciaDAL.H2_BuscarPedidosporPrestamoRow row)
        {
            Farmacia_Pedido_Pac_Buscar f = new Farmacia_Pedido_Pac_Buscar();
            f.Servicio = row.SERV_DESCRIPCION;
            if (!row.IsusuarioNull()) f.Usuario = row.usuario;
            f.Fecha = row.PED_FECHA.ToShortDateString();
            f.Pedido_Id = (int)row.PED_ID;
            return f;
        }

        private Farmacia_Pedido_Pac_Buscar CreateFromRow_BuscarBuscarDevolucionesporPrestamo(FarmaciaDAL.H2_BuscarDevolucionesporPrestamoRow row)
        {
            Farmacia_Pedido_Pac_Buscar f = new Farmacia_Pedido_Pac_Buscar();
            f.Servicio = row.SERV_DESCRIPCION;
            if (!row.IsusuarioNull()) f.Usuario = row.usuario;
            f.Fecha = row.PED_FECHA.ToShortDateString();
            f.Pedido_Id = (int)row.PED_ID;
            return f;
        }

        private Farmacia_Pedido_Pac_Buscar CreateFromRow_BuscarPPP(FarmaciaDAL.H2_BUSCAR_PPP_ENTRow row)
        {
            Farmacia_Pedido_Pac_Buscar f = new Farmacia_Pedido_Pac_Buscar();
            f.Paciente = row.apellido;
            if (!row.IsPED_SOC_IDNull()) f.NHC = row.PED_SOC_ID;
            if (!row.IsSERV_DESCRIPCIONNull()) f.Servicio = row.SERV_DESCRIPCION;
            if (!row.IsusuarioNull()) f.Usuario = row.usuario;
            f.Fecha = row.PED_FECHA.ToShortDateString();
            f.Pedido_Id = (int)row.PED_ID;
            if (!row.IsPendienteNull())
                f.Pendiente = Convert.ToInt32(row.Pendiente);
            //else f.Pendiente = true;
            return f;
        }

        private Farmacia_Pedido_Pac_Buscar CreateFromRow_BuscarPPP(FarmaciaDAL.H2_BUSCAR_DEV_PACRow row)
        {
            Farmacia_Pedido_Pac_Buscar f = new Farmacia_Pedido_Pac_Buscar();
            if (!row.IsapellidoNull()) f.Paciente = row.apellido;
            if (!row.IsREM_SOC_IDNull()) f.NHC = row.REM_SOC_ID;
            if (!row.IsSERV_DESCRIPCIONNull()) f.Servicio = row.SERV_DESCRIPCION;
            if (!row.IsusuarioNull()) f.Usuario = row.usuario;
            f.Fecha = row.REM_FECHA.ToShortDateString();
            f.Pedido_Id = row.REM_NUMERO;
            return f;
        }

        public void Delete_Remitos_DetallesbyId(int Id, int InsumoId)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_DELETE_REMITOS_DETALLES_BYREMID(Id, InsumoId);
        }

        public void Delete_PPP_DetallesbyId(int Id)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_DELETE_PPP_DETALLES_BYPEDID(Id);
        }

        public void UpdatePedidosPendiente(int Id, bool Pendiente)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FARMACIA_PEDIDOS_UPD_PENDIENTE(Id, Pendiente);
        }

        public void UpdateIMPendiente(int Id, bool Pendiente)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FARMACIA_IM_UPD_PENDIENTE(Id, Pendiente);
        }

        public int Insert_Pedidos_Pac_Cab(Farmacia_Pedido_Pac_Cab f)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            f.Usuario_Id = ((usuarios)HttpContext.Current.Session["Usuario"]).id;
            object Ped_Id = adapter.H2_INSERT_PEDIDOS_PAC_CAB(0, f.NHC, f.Servicio_Id, f.Usuario_Id, f.Sala_Id, f.Cama_Id, f.Internacion_Id);
           return Convert.ToInt32(Ped_Id.ToString());
        }

        public void Insert_Pedidos_Pac_Det(Farmacia_Pedido_Pac_Det f)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            f.Usuario_Id = ((usuarios)HttpContext.Current.Session["Usuario"]).id;
            adapter.H2_INSERT_PEDIDOS_PAC_DET(f.Pedido_Id,f.Insumo_Id,f.Cantidad,f.Precio,f.Deposito_Id,f.Usuario_Id);
        }

        public void Insert_Pedidos_Pac_Det(Farmacia_PPP_Det f)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            long Usuario = ((usuarios)HttpContext.Current.Session["Usuario"]).id;
            adapter.H2_INSERT_PEDIDOS_PAC_DET(f.Pedido_Id, f.Insumo_Id, f.Cantidad, f.Precio, f.Deposito_Id, Usuario);
        }

        public bool PedidoPendiente(int Id)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object Pendiente = adapter.H2_PED_PENDIENTE(Id);
            if (Pendiente != null)
                return Convert.ToBoolean(Pendiente.ToString());
            else return true;
        }

        public int IMPendiente(int Id)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                object Pendiente = adapter.H2_IM_PENDIENTE(Id);
                if (Pendiente != null)
                    return Convert.ToInt32(Pendiente.ToString());
                else return 1;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Farmacia_PPP_Cab Buscar_PPP_by_PedidoId(string PedidoId)
        {
            int _PedidoId;
            if (!int.TryParse(PedidoId, out _PedidoId)) throw new Exception("Número de pedido no válido.");
            FarmaciaDALTableAdapters.H2_BUSCAR_PPP_CAB_BY_IDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_BUSCAR_PPP_CAB_BY_IDTableAdapter();
            FarmaciaDAL.H2_BUSCAR_PPP_CAB_BY_IDDataTable aTable = adapter.GetData(_PedidoId);
            if (aTable.Count > 0)
                return CreateFromRow_PPP_Cab(aTable[0]);
            else return null;
        }

        public Farmacia_PPP_Cab Buscar_PPS_by_PedidoId(string PedidoId)
        {
            try
            {
                int _PedidoId;
                if (!int.TryParse(PedidoId, out _PedidoId)) throw new Exception("Número de pedido no válido.");
                FarmaciaDALTableAdapters.H2_BUSCAR_PPS_CAB_BY_IDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_BUSCAR_PPS_CAB_BY_IDTableAdapter();
                FarmaciaDAL.H2_BUSCAR_PPS_CAB_BY_IDDataTable aTable = adapter.GetData(_PedidoId);
                if (aTable.Count > 0)
                    return CreateFromRow_PPS_Cab(aTable[0]);
                else return null;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Farmacia_PPP_Det> Buscar_PPP_by_PedidoId_Det (string PedidoId)
        {
            try
            {
                int _PedidoId;
                if (!int.TryParse(PedidoId, out _PedidoId)) throw new Exception("Número de pedido no válido.");
                FarmaciaDALTableAdapters.H2_LIST_PEDIDOS_PAC_DET_BY_PED_ID_PARA_PEDIDOSTableAdapter adapter = new FarmaciaDALTableAdapters.H2_LIST_PEDIDOS_PAC_DET_BY_PED_ID_PARA_PEDIDOSTableAdapter();
                FarmaciaDAL.H2_LIST_PEDIDOS_PAC_DET_BY_PED_ID_PARA_PEDIDOSDataTable aTable = adapter.GetData(_PedidoId);
                List<Farmacia_PPP_Det> lista = new List<Farmacia_PPP_Det>();
                foreach (FarmaciaDAL.H2_LIST_PEDIDOS_PAC_DET_BY_PED_ID_PARA_PEDIDOSRow row in aTable.Rows)
                {
                    lista.Add(CreateFromRow_PPP_Det(row));
                }
                if (lista.Count > 0) return lista;
                else return null;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public List<Farmacia_PPP_Det> Buscar_PPP_by_PedidoId_Det_para_pacientes_ambulatorios(string PedidoId)
        {
            try
            {
                int _PedidoId;
                if (!int.TryParse(PedidoId, out _PedidoId)) throw new Exception("Número de pedido no válido.");
                FarmaciaDALTableAdapters.H2_LIST_PEDIDOS_PAC_DET_BY_PED_ID_PARA_PEDIDOS_POR_PACIENTES_AMBULATORIOTableAdapter adapter = new FarmaciaDALTableAdapters.H2_LIST_PEDIDOS_PAC_DET_BY_PED_ID_PARA_PEDIDOS_POR_PACIENTES_AMBULATORIOTableAdapter();
                FarmaciaDAL.H2_LIST_PEDIDOS_PAC_DET_BY_PED_ID_PARA_PEDIDOS_POR_PACIENTES_AMBULATORIODataTable aTable = adapter.GetData(_PedidoId);
                List<Farmacia_PPP_Det> lista = new List<Farmacia_PPP_Det>();
                foreach (FarmaciaDAL.H2_LIST_PEDIDOS_PAC_DET_BY_PED_ID_PARA_PEDIDOS_POR_PACIENTES_AMBULATORIORow row in aTable.Rows)
                {
                    lista.Add(CreateFromRow_PPP_Det_para_ambulatorios(row));
                }
                if (lista.Count > 0) return lista;
                else return null;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // nuevo por que pedidos x paciente ambulatorio y entregas por paciente ambulatorio usaban el mismo y en pedido x paciente duplicaba por la inclusion del lote
        //este quedo exclusivo para entregas por pacientes ambulatorios
        public List<Farmacia_PPP_Det> Buscar_PPP_by_PedidoId_Det_Entregas(string PedidoId)
        {
            try
            {
                int _PedidoId;
                if (!int.TryParse(PedidoId, out _PedidoId)) throw new Exception("Número de pedido no válido.");
                FarmaciaDALTableAdapters.H2_LIST_PEDIDOS_PAC_DET_BY_PED_IDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_LIST_PEDIDOS_PAC_DET_BY_PED_IDTableAdapter();
                FarmaciaDAL.H2_LIST_PEDIDOS_PAC_DET_BY_PED_IDDataTable aTable = adapter.GetData(_PedidoId);
                List<Farmacia_PPP_Det> lista = new List<Farmacia_PPP_Det>();
                foreach (FarmaciaDAL.H2_LIST_PEDIDOS_PAC_DET_BY_PED_IDRow row in aTable.Rows)
                {
                    lista.Add(CreateFromRow_PPP_Det_Entregas(row));
                }
                if (lista.Count > 0) return lista;
                else return null;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Farmacia_PPP_Det> Buscar_PPS_List_Nro_Entrega(int NroEntregaCab, int NroEntrega)
        {
            FarmaciaDALTableAdapters.H2_FARMACIA_LIST_PPS_NROENTREGATableAdapter adapter = new FarmaciaDALTableAdapters.H2_FARMACIA_LIST_PPS_NROENTREGATableAdapter();
            FarmaciaDAL.H2_FARMACIA_LIST_PPS_NROENTREGADataTable aTable = adapter.GetData(NroEntregaCab, NroEntrega);
            List<Farmacia_PPP_Det> lista = new List<Farmacia_PPP_Det>();
            foreach (FarmaciaDAL.H2_FARMACIA_LIST_PPS_NROENTREGARow row in aTable.Rows)
            {
                Farmacia_PPP_Det f = new Farmacia_PPP_Det();
                f.Cantidad = row.CANTIDAD;
                if (!row.IsGRAMAJENull()) f.Gramaje = row.GRAMAJE;
                if (!row.IsMEDIDANull()) f.Medida = row.MEDIDA;
                if (!row.IsNOMBRENull()) f.Nombre = row.NOMBRE;
                f.Precio = row.PRECIO;
                if (!row.IsPRESENTACIONNull()) f.Presentacion = row.PRESENTACION;
                if (!row.IsSUBTOTALNull()) f.Subtotal = row.SUBTOTAL;
                f.Insumo_Id = row.DET_INS_ID;
                f.Pedido_Id = (int)row.Pedido_Id;
                f.Deposito_Id = row.DepositoId;
                if (!row.IsSTO_CANTIDADNull())
                    f.EnStock = row.STO_CANTIDAD;
                else f.EnStock = 0;
                f.Entregado = row.ENTREGADO;
                lista.Add(f);
            }
            return lista;
        }

        public void FARMACIA_PED_DET_UPDATE(int PedidoID, int InsumoID,int NuevoInsumoID, int Cantidad_Pedida)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                adapter.H2_FARMACIA_PED_DET_UPDATE(PedidoID, InsumoID,NuevoInsumoID, Cantidad_Pedida);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
            
        }

        public void PPS_DeleteItems_Modifica(int NroEntregaCab, int NroEntregaDet)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                adapter.H2_FARMACIA_PPS_DELETEITEMS_MODIFICA(NroEntregaCab, NroEntregaDet);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Delete_Dev_Det(string Id)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            int _Id;
            if (int.TryParse(Id, out _Id)) adapter.H2_DELETE_DEV_DET(_Id);
            else throw new Exception("No se pueden eliminar los detalles.");
        }

        public int Get_RemitoId(int PedidoId)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object _id = adapter.H2_FARMACIA_REMITOID_BY_PEDIDO_ID(PedidoId);
            return int.Parse(_id.ToString());
        }

        public List<Farmacia_Dev_Pac_Det> Buscar_Dev_PacDet(string PedidoId)
        {
            ImpresionDEVTableAdapters.H2_LIST_DEV_PAC_DET_PRINTTableAdapter adapter = new ImpresionDEVTableAdapters.H2_LIST_DEV_PAC_DET_PRINTTableAdapter();
            ImpresionDEV.H2_LIST_DEV_PAC_DET_PRINTDataTable aTable = adapter.GetData(int.Parse(PedidoId));
            List<Farmacia_Dev_Pac_Det> lista = new List<Farmacia_Dev_Pac_Det>();
            foreach (ImpresionDEV.H2_LIST_DEV_PAC_DET_PRINTRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_Buscar_Dev_PacDet(row));
            }
            return lista;
        }

        public Farmacia_Egr_Detalle Buscar_Egr_Det(string DetalleId, string InsumoId)
        {
            FarmaciaDALTableAdapters.H2_LIST_EGR_DETALLETableAdapter adapter = new FarmaciaDALTableAdapters.H2_LIST_EGR_DETALLETableAdapter();
            FarmaciaDAL.H2_LIST_EGR_DETALLEDataTable aTable = adapter.GetData(int.Parse(InsumoId), int.Parse(DetalleId));
            Farmacia_Egr_Detalle f = new Farmacia_Egr_Detalle();
            if (aTable.Count > 0)
            {
                foreach (FarmaciaDAL.H2_LIST_EGR_DETALLERow row in aTable.Rows)
                {
                    f = CreateFromRow_Egr_Det(row);
                }
                return f;
            }
            else return null;
        }

        public List<Insumo_Via> List_InsumoVia()
        {
            FarmaciaDALTableAdapters.H2_LIST_VIATableAdapter adapter = new FarmaciaDALTableAdapters.H2_LIST_VIATableAdapter();
            FarmaciaDAL.H2_LIST_VIADataTable aTable = adapter.GetData();
            List<Insumo_Via> lista = new List<Insumo_Via>();
            if (aTable.Count > 0)
            {
                foreach (FarmaciaDAL.H2_LIST_VIARow row in aTable.Rows)
                {
                    lista.Add(CreateFromRow_Via(row));
                }
                return lista;
            }
            else return null;
        }

        private Insumo_Via CreateFromRow_Via(FarmaciaDAL.H2_LIST_VIARow row)
        {
            Insumo_Via i = new Insumo_Via();
            i.Estado = row.StateId;
            i.Id = row.Id;
            i.Via = row.Descripcion;
            return i;
        }

        public int Insert_Egr_Cab(Farmacia_Egr_Cab f)
        {
            object Id;
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            if (string.IsNullOrEmpty(f.CAMA_ID)) f.CAMA_ID = "0";
            if (string.IsNullOrEmpty(f.SALA_ID)) f.SALA_ID = "0";
            if (!string.IsNullOrEmpty(f.REM_SOC_ID))
                Id = adapter.H2_INSERT_EGR_PEDIDOS_CAB(Convert.ToInt64(f.REM_SER_ID), Convert.ToInt64(f.REM_SOC_ID), int.Parse(f.REM_USU_INGRESO), int.Parse(f.PED_ID), int.Parse(f.CAMA_ID), int.Parse(f.SALA_ID));
            else
                Id = adapter.H2_INSERT_EGR_PEDIDOS_CAB(Convert.ToInt64(f.REM_SER_ID), null, int.Parse(f.REM_USU_INGRESO), int.Parse(f.PED_ID), null, null);
            if (Id != null)
                return Convert.ToInt32(Id.ToString());
            else return -1;
        }

        public int Insert_Egr_Det(Farmacia_Egr_Detalle f, string Tipo)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object _NroEntrega = adapter.H2_INSERT_EGR_PEDIDOS_DET(f.RED_REM_ID, f.INSUMO_ID, f.NRO_ENTREGA, f.CANTIDAD, (int)f.USUARIO_ID, f.OBSERVACIONES, NumTipo(Tipo).ToString(),f.Etiqueta,f.lote);
            return int.Parse(_NroEntrega.ToString());
        }

        public int Insert_Egr_Det_Modifica(Farmacia_Egr_Detalle f, string Tipo)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object _NroEntrega = adapter.H2_INSERT_EGR_PEDIDOS_DET_MODIFICA(f.RED_REM_ID, f.INSUMO_ID, f.NRO_ENTREGA, f.CANTIDAD, (int)f.USUARIO_ID, f.OBSERVACIONES, NumTipo(Tipo).ToString(), f.Etiqueta,f.lote);
            return int.Parse(_NroEntrega.ToString());
        }

        public int NumTipo(string Tipo)
        {
            switch (Tipo)
            {
                case "PPP": return 1;
                case "PPS": return 2;
                case "IM": return 3;
                default: return -1;
            }
        }

        public void InsertMovimientoCtaCteInsumos(Farmacia_Movimiento_CtaCte m) {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_INSUMOS_CTACTE_INSERT(m.CodigoMovimiento, m.Descripcion, m.InsumoId, m.Cantidad, DateTime.Parse(m.Fecha), m.PedidoId, m.PedidoTipo, m.UsuarioId, m.NroLote);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int GetLastNroEntregabyRemito(int RemitoId)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_FARMACIA_GET_LAST_NROENTREGA_BY_REMITOID(RemitoId);
            if (Id != null)
                return Convert.ToInt32(Id.ToString());
            else return -1;
        }

        public int GetNroEntregaforRemito(int RemitoId)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                object Id = adapter.H2_FARMACIA_GET_NROENTREGA_FOR_REMITO(RemitoId);
                if (Id != null)
                    return Convert.ToInt32(Id.ToString());
                else return -1;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public int Insert_PPS_Cab(Farmacia_Pedido_Pac_Cab f)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_INSERT_PEDIDOS_SERV_CAB(f.Pedido_Id, f.Servicio_Id, f.Usuario_Id);
            if (Id != null)
                return Convert.ToInt32(Id.ToString());
            else return -1;
        }

        public int INSERT_FAR_SOLICITAR_PRESTAMO_CAB(Farmacia_Pedido_Pac_Cab f)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                object Id = adapter.H2_INSERT_FAR_SOLICITAR_PRESTAMO_CAB(f.Pedido_Id, f.Servicio_Nombre, f.Usuario_Id);
                if (Id != null)
                    return Convert.ToInt32(Id.ToString());
                else return -1;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void INSERT_FAR_SOLICITAR_PRESTAMO_DET(Farmacia_Pedido_Pac_Det f)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                decimal _precio;
                if (!decimal.TryParse(f.Precio.ToString(), out _precio)) _precio = 0;
                int _deposito;
                if (!int.TryParse(f.Deposito_Id.ToString(), out _deposito)) _deposito = 0;
                adapter.H2_INSERT_FAR_SOLICITAR_PRESTAMO_DET(f.Pedido_Id, f.Insumo_Id, f.Cantidad, f.Deposito_Id, f.Usuario_Id, f.Precio,f.lote);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int INSERT_FAR_DEVOLUCION_PRESTAMO_CAB(Farmacia_Pedido_Pac_Cab f)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                object Id = adapter.H2_INSERT_FAR_DEVOLUCION_PRESTAMO_CAB(f.Pedido_Id, f.Servicio_Nombre, f.Usuario_Id);
                if (Id != null)
                    return Convert.ToInt32(Id.ToString());
                else return -1;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void INSERT_FAR_DEVOLUCION_PRESTAMO_DET(Farmacia_Pedido_Pac_Det f)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                decimal _precio;
                if (!decimal.TryParse(f.Precio.ToString(), out _precio)) _precio = 0;
                int _deposito;
                if (!int.TryParse(f.Deposito_Id.ToString(), out _deposito)) _deposito = 0;
                adapter.H2_INSERT_FAR_DEVOLUCION_PRESTAMO_DET(f.Pedido_Id, f.Insumo_Id, f.Cantidad, f.Deposito_Id, f.Usuario_Id, f.Precio,f.lote);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int Insert_DevPP_Cab(Farmacia_Pedido_Pac_Cab f)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_INSERT_DEV_PAC_CAB(f.Pedido_Id,f.NHC, f.Servicio_Id, f.Usuario_Id);
            if (Id != null)
                return Convert.ToInt32(Id.ToString());
            else return -1;
        }

        public int Insert_DevPP_Det(Farmacia_Dev_Pac_Det f)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                if (string.IsNullOrEmpty(f.Precio)) f.Precio = "0";
                object Id = adapter.H2_INSERT_DEV_PAC_DET(int.Parse(f.Pedido_Id), int.Parse(f.Insumo_Id), int.Parse(f.Cantidad), decimal.Parse(f.Precio), int.Parse(f.Deposito_Id), int.Parse(f.Usuario_Id), int.Parse(f.Motivo), f.Observacion, f.NroLote);
                if (Id != null)
                    return Convert.ToInt32(Id.ToString());
                else return -1;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Buscar_Devoluciones_Vencimiento(List<Farmacia_Dev_Pac_Det> Devoluciones, long Servicio_Id, long Usuario_Id)
        { 
            List<Farmacia_Dev_Pac_Det> list_venc = Devoluciones.FindAll(delegate (Farmacia_Dev_Pac_Det obj) {
                return obj.Motivo == "1"; //Motivo Vencimiento
            });
            if (list_venc.Count > 0) Generar_Pedido_por_Servicio(list_venc, Servicio_Id, Usuario_Id);
        }

        public void Generar_Pedido_por_Servicio(List<Farmacia_Dev_Pac_Det> ListaVencimientos, long Servicio_Id, long Usuario_Id)
        {
            Farmacia_Pedido_Pac_Cab cab = new Farmacia_Pedido_Pac_Cab(0,Servicio_Id,Usuario_Id);
            int Pedido_cab_id = Insert_PPS_Cab(cab);
            if (Pedido_cab_id > 0) Insertar_Pedido_Detalles(Pedido_cab_id, ListaVencimientos);
            else return;
        }

        public void Insertar_Pedido_Detalles(int Pedido_cab_id, List<Farmacia_Dev_Pac_Det> ListaVencimientos)
        {
            ListaVencimientos.ForEach(delegate(Farmacia_Dev_Pac_Det obj) {
                if (obj.chk == 1)// si el usuario selecciono el check en patalla
                {
                    Insert_PPS_Det(new Farmacia_Pedido_Pac_Det(Pedido_cab_id, int.Parse(obj.Insumo_Id), int.Parse(obj.Cantidad), int.Parse(obj.Deposito_Id),
                        int.Parse(obj.Usuario_Id), decimal.Parse(obj.Precio)));
                }
            });
        }

        public void Delete_PPS_Det(int PedidoId)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                adapter.H2_DELETE_PPS_DET(PedidoId);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void FAR_DEVOLUCION_PRESTAMO_DET_DELETE(int PedidoId)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                adapter.H2_FAR_DEVOLUCION_PRESTAMO_DET_DELETE(PedidoId);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void FAR_SOLICITAR_PRESTAMO_DET_DELETE(int PedidoId)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                adapter.H2_FAR_SOLICITAR_PRESTAMO_DET_DELETE(PedidoId);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Insert_PPS_Det(Farmacia_Pedido_Pac_Det f)
        {
            try
            {
                FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
                decimal _precio;
                if (!decimal.TryParse(f.Precio.ToString(), out _precio)) _precio = 0;
                int _deposito;
                if (!int.TryParse(f.Deposito_Id.ToString(), out _deposito)) _deposito = 0;
                adapter.H2_INSERT_PEDIDOS_SERV_DET(f.Pedido_Id, f.Insumo_Id, f.Cantidad, f.Deposito_Id, f.Usuario_Id, f.Precio);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Farmacia_Movimiento_CtaCte_Buscar> List_Mov_by_Insumo(int InsumoId, string Desde, string Hasta, bool Inventario)
        {
            List<Farmacia_Movimiento_CtaCte_Buscar> lista = new List<Farmacia_Movimiento_CtaCte_Buscar>();
            FarmaciaDALTableAdapters.H2_INSUMOS_CTACTE_LIST_MOV_BYINSUMOTableAdapter adapter = new FarmaciaDALTableAdapters.H2_INSUMOS_CTACTE_LIST_MOV_BYINSUMOTableAdapter();
            FarmaciaDAL.H2_INSUMOS_CTACTE_LIST_MOV_BYINSUMODataTable aTable = adapter.GetData(InsumoId, DateTime.Parse(Desde), DateTime.Parse(Hasta), Inventario);
            foreach (FarmaciaDAL.H2_INSUMOS_CTACTE_LIST_MOV_BYINSUMORow row in aTable.Rows)
            {
                lista.Add(CreateRowFromList_Mov_by_Insumo(row));
            }
            return lista;
        }

        public List<Farmacia_Movimiento_CtaCte_Buscar> List_Mov_by_Rubro(int RubroId, string Desde, string Hasta, bool Inventario)
        {
            List<Farmacia_Movimiento_CtaCte_Buscar> lista = new List<Farmacia_Movimiento_CtaCte_Buscar>();
            FarmaciaDALTableAdapters.H2_INSUMOS_CTACTE_LIST_MOV_BYRUBROTableAdapter adapter = new FarmaciaDALTableAdapters.H2_INSUMOS_CTACTE_LIST_MOV_BYRUBROTableAdapter();
            FarmaciaDAL.H2_INSUMOS_CTACTE_LIST_MOV_BYRUBRODataTable aTable = adapter.GetData(RubroId, DateTime.Parse(Desde), DateTime.Parse(Hasta), Inventario);
            foreach (FarmaciaDAL.H2_INSUMOS_CTACTE_LIST_MOV_BYRUBRORow row in aTable.Rows)
            {
                lista.Add(CreateRowFromList_Mov_by_Rubro(row));
            }
            return lista;
        }

        public List<Medicamento_Rubro> ListRubrobyId(int RubroId)
        {
            List<Medicamento_Rubro> lista = new List<Medicamento_Rubro>();
            FarmaciaDALTableAdapters.H2_FARMACIA_LIST_RUBROS_BY_IDTableAdapter adapter = new FarmaciaDALTableAdapters.H2_FARMACIA_LIST_RUBROS_BY_IDTableAdapter();
            FarmaciaDAL.H2_FARMACIA_LIST_RUBROS_BY_IDDataTable aTable = adapter.GetData(RubroId);
            foreach (FarmaciaDAL.H2_FARMACIA_LIST_RUBROS_BY_IDRow row in aTable.Rows)
            {
                Medicamento_Rubro r = new Medicamento_Rubro();
                r.Id = row.id;
                r.Rubro = row.rubro;
                lista.Add(r);
            }
            return lista;
        }

        private Farmacia_Movimiento_CtaCte_Buscar CreateRowFromList_Mov_by_Rubro(FarmaciaDAL.H2_INSUMOS_CTACTE_LIST_MOV_BYRUBRORow row)
        {
            Farmacia_Movimiento_CtaCte_Buscar f = new Farmacia_Movimiento_CtaCte_Buscar();
            f.Cantidad = row.Cantidad;
            if (!row.IsFechaNull())
                f.Fecha = row.Fecha.ToShortDateString();
            if (!row.IsHoraNull())
                f.Hora = row.Hora;
            if (!row.IsIdInventarioNull())
                f.IdInventario = row.IdInventario;
            else f.IdInventario = 0;
            if (!row.IsInsumoNull())
                f.Insumo = row.Insumo;
            if (!row.IsInsumoIdNull())
                f.InsumoId = row.InsumoId;
            else f.InsumoId = 0;
            return f;
        }


        private Farmacia_Movimiento_CtaCte_Buscar CreateRowFromList_Mov_by_Insumo(FarmaciaDAL.H2_INSUMOS_CTACTE_LIST_MOV_BYINSUMORow row)
        {
            Farmacia_Movimiento_CtaCte_Buscar f = new Farmacia_Movimiento_CtaCte_Buscar();
            f.Cantidad = row.Cantidad;
            if (!row.IsFechaNull())
            f.Fecha = row.Fecha.ToShortDateString();
            if (!row.IsHoraNull())
            f.Hora = row.Hora;
            if (!row.IsIdInventarioNull())
            f.IdInventario = row.IdInventario;
            if (!row.IsInsumoNull())
            f.Insumo = row.Insumo;
            f.InsumoId = row.InsumoId;

            f.lote = row.lote;

            return f;
        }

        private Farmacia_Dev_Pac_Det CreateFromRow_Buscar_Dev_PacDet(ImpresionDEV.H2_LIST_DEV_PAC_DET_PRINTRow row)
        {
            Farmacia_Dev_Pac_Det f = new Farmacia_Dev_Pac_Det();
            f.Cantidad = row.RED_CANTIDAD.ToString();
            if(!row.IsRED_DEP_IDNull()) f.Deposito_Id = row.RED_DEP_ID.ToString();
            f.Fecha = row.RED_FEC_ING.ToShortDateString();
            f.Insumo_Id = row.RED_INS_ID.ToString();
            f.Motivo = row.RED_MOTIVO.ToString();
            if(!row.IsRED_OBSERVACIONESNull()) f.Observacion = row.RED_OBSERVACIONES;
            f.Precio = row.RED_PRECIO.ToString();
            if(!row.IsRED_REM_IDNull()) f.Pedido_Id = row.RED_REM_ID.ToString();
            f.Usuario_Id = row.RED_USU_ING.ToString();
            if(!row.IsREM_NOMBRENull()) f.Nombre = row.REM_NOMBRE;
            if(!row.IsREM_GRAMAJENull()) f.Nombre = f.Nombre + "-" + row.REM_GRAMAJE;
            if(!row.IsmedidaNull()) f.Nombre = f.Nombre + row.medida;
            if (!row.IspresentacionNull()) f.Nombre = f.Nombre + "-" + row.presentacion;
            if (!row.IspresentacionNull())
                f.Presentacion = row.presentacion;
            else f.Presentacion = string.Empty;
            f.NroLote = row.NRO_LOTE;
            f.Vencimiento = row.FechaVencimiento.ToShortDateString();
            return f;
        }

        private Farmacia_PPP_Cab CreateFromRow_PPS_Cab(FarmaciaDAL.H2_BUSCAR_PPP_CAB_BY_IDRow row)
        {
            Farmacia_PPP_Cab f = new Farmacia_PPP_Cab();
            if (!row.IsapellidoNull()) f.Paciente = row.apellido;
            if (!row.IsCamaNull()) f.Cama = row.Cama;
            f.Sala = row.Sala;
            if (!row.IsdocumentoNull()) f.Documento = row.documento.ToString();
            if (!row.IsPED_SOC_IDNull()) f.NHC = row.PED_SOC_ID.ToString();
            if (!row.IsSERV_DESCRIPCIONNull()) f.Servicio = row.SERV_DESCRIPCION;
            if (!row.IstelefonoNull()) f.Telefono = row.telefono;
            f.Fecha = row.PED_FECHA.ToShortDateString();
            f.Servicio_Id = row.PED_SER_ID.ToString();
            f.Pedido_Id = row.PED_ID.ToString();
            return f;
        }

        private Farmacia_PPP_Cab CreateFromRow_PPS_Cab(FarmaciaDAL.H2_PPS_CAB_BY_IDRow row)
        {
            Farmacia_PPP_Cab f = new Farmacia_PPP_Cab();
            if (!row.IsPED_CAMAIDNull()) f.Cama_Id = row.PED_CAMAID.ToString();
            if (!row.IsPED_SALAIDNull()) f.Sala_Id = row.PED_SALAID.ToString();
            if (!row.IsPED_SOC_IDNull()) f.NHC = row.PED_SOC_ID.ToString();
            f.Servicio = row.SERV_DESCRIPCION.ToString();
            f.Fecha = row.PED_FECHA.ToShortDateString();
            f.Servicio_Id = row.PED_SER_ID.ToString();
            f.Pedido_Id = row.PED_ID.ToString();
            return f;
        }



        private Farmacia_PPP_Cab CreateFromRow_PPS_Cab(FarmaciaDAL.H2_BUSCAR_FAR_PEDIDO_PRESTAMO_CAB_BY_IDRow row)
        {
            Farmacia_PPP_Cab f = new Farmacia_PPP_Cab();
            f.Servicio = row.SERV_DESCRIPCION.ToString();
            f.Fecha = row.PED_FECHA.ToShortDateString();
            f.Pedido_Id = row.PED_ID.ToString();
            return f;
        }

        private Farmacia_PPP_Cab CreateFromRow_PPS_Cab(FarmaciaDAL.H2_BUSCAR_FAR_DEVOLUCION_PRESTAMO_CAB_BY_IDRow row)
        {
            Farmacia_PPP_Cab f = new Farmacia_PPP_Cab();
            f.Servicio = row.SERV_DESCRIPCION.ToString();
            f.Fecha = row.PED_FECHA.ToShortDateString();
            f.Pedido_Id = row.PED_ID.ToString();
            return f;
        }

        private Farmacia_PPP_Cab CreateFromRow_PPP_Cab(FarmaciaDAL.H2_BUSCAR_PPP_CAB_BY_IDRow row)
        {
            Farmacia_PPP_Cab f = new Farmacia_PPP_Cab();
            if (!row.IsapellidoNull()) f.Paciente = row.apellido;
            if (!row.IsCamaNull()) f.Cama = row.Cama;
            if (!row.IsSalaNull()) f.Sala = row.Sala;
            if (!row.IsdocumentoNull()) f.Documento = row.documento.ToString();
            if (!row.IsPED_SOC_IDNull()) f.NHC = row.PED_SOC_ID.ToString();
            if (!row.IsSERV_DESCRIPCIONNull()) f.Servicio = row.SERV_DESCRIPCION;
            if (!row.IstelefonoNull()) f.Telefono = row.telefono;
            f.Fecha = row.PED_FECHA.ToShortDateString();
            f.Servicio_Id = row.PED_SER_ID.ToString();
            f.Pedido_Id = row.PED_ID.ToString();
            if (!row.IsfotoNEWNull()) { f.foto = row.fotoNEW; } else { f.foto = "../img/silueta.jpg"; }

            return f;
        }

        private Farmacia_PPP_Cab CreateFromRow_PPS_Cab(FarmaciaDAL.H2_BUSCAR_PPS_CAB_BY_IDRow row)
        {
            Farmacia_PPP_Cab f = new Farmacia_PPP_Cab();
            if (!row.IsSERV_DESCRIPCIONNull()) f.Servicio = row.SERV_DESCRIPCION;
            f.Fecha = row.PED_FECHA.ToShortDateString();
            f.Servicio_Id = row.PED_SER_ID.ToString();
            f.Pedido_Id = row.PED_ID.ToString();
            f.EntregaCabID = row.ENT_CAB_ID;
            f.Pendiente = row.PENDIENTE;
            return f;
        }

        private Farmacia_Egr_Detalle CreateFromRow_Egr_Det(FarmaciaDAL.H2_LIST_EGR_DETALLERow row)
        {
            Farmacia_Egr_Detalle f = new Farmacia_Egr_Detalle();
            if (!row.IsOBSERVACIONESNull()) f.OBSERVACIONES = row.OBSERVACIONES;
            f.DEPOSITO_ID = row.RED_DEP_ID;
            if (!row.IsRED_FEC_INGNull()) f.FECHA = row.RED_FEC_ING.ToShortDateString();
            if (!row.IsRED_PRECIONull()) f.PRECIO = row.RED_PRECIO;
            if (!row.IsRED_TIPONull()) f.RED_TIPO = row.RED_TIPO;
            f.USUARIO_ID = row.RED_USU_ING;
            f.CANTIDAD = row.RED_CANTIDAD;
            f.INSUMO_ID = row.RED_INS_ID;
            if (!row.IsEtiquetaNull()) f.Etiqueta = row.Etiqueta;
            else f.Etiqueta = false;
            f.RED_REM_ID = (int)row.RED_REM_ID;
            f.ESTADO = "1";
            return f;
        }

        private Farmacia_PPP_Det CreateFromRow_PPP_Det(FarmaciaDAL.H2_LIST_PEDIDOS_PAC_DET_BY_PED_ID_PARA_PEDIDOSRow row)
        {
            Farmacia_PPP_Det f = new Farmacia_PPP_Det();
            if (!row.IsVENCIMIENTONull()) { f.VENCIMIENTO = row.VENCIMIENTO; }
            f.Cantidad = row.CANTIDAD;
            if (!row.IsGRAMAJENull()) f.Gramaje = row.GRAMAJE;
            if (!row.IsMEDIDANull()) f.Medida = row.MEDIDA;
            if (!row.IsNOMBRENull()) f.Nombre = row.NOMBRE;
            f.Precio = row.PRECIO;
            if (!row.IsPRESENTACIONNull()) f.Presentacion = row.PRESENTACION;
            if (!row.IsSUBTOTALNull()) f.Subtotal = row.SUBTOTAL;
            f.Insumo_Id = row.DET_INS_ID;
            f.Pedido_Id = (int)row.Pedido_Id;
            f.Deposito_Id = row.DepositoId;
            if (!row.IsSTO_CANTIDADNull())
                f.EnStock = row.STO_CANTIDAD;
            else f.EnStock = 0;
            f.Entregado = row.RED_CANTIDAD;
            f.Etiqueta = row.Etiqueta;
            if (!row.IsOBSERVACIONESNull())
                f.Observaciones = row.OBSERVACIONES;
            else f.Observaciones = string.Empty;
            f.Saldo = f.Cantidad - f.Entregado;

            if (!row.IsNRO_LOTENull()) {
                f.NRO_LOTE = row.NRO_LOTE;
            }
            return f;
        }

        private Farmacia_PPP_Det CreateFromRow_PPP_Det_para_ambulatorios(FarmaciaDAL.H2_LIST_PEDIDOS_PAC_DET_BY_PED_ID_PARA_PEDIDOS_POR_PACIENTES_AMBULATORIORow row)
        {
            Farmacia_PPP_Det f = new Farmacia_PPP_Det();
            f.Cantidad = row.CANTIDAD;
            if (!row.IsGRAMAJENull()) f.Gramaje = row.GRAMAJE;
            if (!row.IsMEDIDANull()) f.Medida = row.MEDIDA;
            if (!row.IsNOMBRENull()) f.Nombre = row.NOMBRE;
            f.Precio = row.PRECIO;
            if (!row.IsPRESENTACIONNull()) f.Presentacion = row.PRESENTACION;
            if (!row.IsSUBTOTALNull()) f.Subtotal = row.SUBTOTAL;
            f.Insumo_Id = row.DET_INS_ID;
            f.Pedido_Id = (int)row.Pedido_Id;
            f.Deposito_Id = row.DepositoId;

            f.Entregado = row.RED_CANTIDAD;
            f.Etiqueta = row.Etiqueta;
            if (!row.IsOBSERVACIONESNull())
                f.Observaciones = row.OBSERVACIONES;
            else f.Observaciones = string.Empty;
            f.Saldo = f.Cantidad - f.Entregado;

            return f;
        }


        

        // nuevo exclusivo para entregas por paciente ambulatorio
        private Farmacia_PPP_Det CreateFromRow_PPP_Det_Entregas(FarmaciaDAL.H2_LIST_PEDIDOS_PAC_DET_BY_PED_IDRow row)
        {
            Farmacia_PPP_Det f = new Farmacia_PPP_Det();
            if (!row.IsVENCIMIENTONull()) { f.VENCIMIENTO = row.VENCIMIENTO; }
            f.Cantidad = row.CANTIDAD;
            if (!row.IsGRAMAJENull()) f.Gramaje = row.GRAMAJE;
            if (!row.IsMEDIDANull()) f.Medida = row.MEDIDA;
            if (!row.IsNOMBRENull()) f.Nombre = row.NOMBRE;
            f.Precio = row.PRECIO;
            if (!row.IsPRESENTACIONNull()) f.Presentacion = row.PRESENTACION;
            if (!row.IsSUBTOTALNull()) f.Subtotal = row.SUBTOTAL;
            f.Insumo_Id = row.DET_INS_ID;
            f.Pedido_Id = (int)row.Pedido_Id;
            f.Deposito_Id = row.DepositoId;
            if (!row.IsSTO_CANTIDADNull())
                f.EnStock = row.STO_CANTIDAD;
            else f.EnStock = 0;
            f.Entregado = row.RED_CANTIDAD;
            f.Etiqueta = row.Etiqueta;
            if (!row.IsOBSERVACIONESNull())
                f.Observaciones = row.OBSERVACIONES;
            else f.Observaciones = string.Empty;
            f.Saldo = f.Cantidad - f.Entregado;

            if (!row.IsNRO_LOTENull())
            {
                f.NRO_LOTE = row.NRO_LOTE;
            }
            return f;
        }

        private Farmacia_Remito_Det CreateFromRow_List_Remitos_DetallebyId(FarmaciaDAL.H2_LIST_REMITO_DET_BY_REMIDRow row)
        { 
            Farmacia_Remito_Det f = new Farmacia_Remito_Det();
            if (!row.IsmedidaNull()) f.Medida = row.medida;
            else f.Medida = string.Empty;
            f.Precio_Compra = row.PRECIO_COMPRA;
            if (!row.IsREM_GRAMAJENull()) f.Gramaje = row.REM_GRAMAJE;
            else f.Gramaje = string.Empty;
            if (!row.IsREM_NOMBRENull()) f.Nombre = row.REM_NOMBRE;
            f.FechaVencimiento = row.FECHAVENCIMIENTO.ToShortDateString();
            f.NroLote = row.NROLOTE;
            f.Deposito_Id = row.Deposito_Id;
            f.Cantidad = row.RED_CANTIDAD;
            f.Remito_Id = row.RemitoId;
            f.Insumo_Id = row.InsumoId;
            f.Precio_Venta = row.PrecioVenta;
            return f;
        }

        private Farmacia_Remito_Cab CreateFromRow_List_Remitos_CabecerabyId(FarmaciaDAL.H2_LIST_REMITO_CAB_BY_REMIDRow row)
        {
            Farmacia_Remito_Cab f = new Farmacia_Remito_Cab();
            if (!row.IsPRV_NOMBRENull()) f.Proveedor = row.PRV_NOMBRE;
            if (!row.IsREM_I_LETRANull()) f.Letra = row.REM_I_LETRA;
            if (!row.IsREM_I_OBSNull()) f.Observaciones = row.REM_I_OBS;
            f.Fecha = row.REM_I_FECHA.ToString();
            f.Fecha_Carga = row.REM_I_FECHA.ToString();
            f.Remito_Id = row.REM_I_ID.ToString();
            f.Sucursal = row.REM_I_SUCURSAL.ToString();
            f.Numero = row.REM_I_NUMERO.ToString();
            return f;
        }

        private Farmacia_Remito_Cab CreateFromRow_List_Remitos_byLetraNumeroSuc(FarmaciaDAL.H2_LIST_REMITOSRow row)
        {
            Farmacia_Remito_Cab f = new Farmacia_Remito_Cab();
            if (!row.IsPRV_NOMBRENull()) f.Proveedor = row.PRV_NOMBRE;
            if (!row.IsREM_I_LETRANull()) f.Letra = row.REM_I_LETRA;
            if (!row.IsREM_I_OBSNull()) f.Observaciones = row.REM_I_OBS;
            f.Fecha = row.REM_I_FECHA.ToString();
            f.Fecha_Carga = row.REM_I_FECHA.ToString();
            f.Remito_Id = row.REM_I_ID.ToString();
            f.Sucursal = row.REM_I_SUCURSAL.ToString();
            f.Numero = row.REM_I_NUMERO.ToString();
            return f;
        }

        private Farmacia_Proveedores CreateFromRow_FarmaciaProveedores(FarmaciaDAL.H2_LIST_PROVEEDORESRow row)
        {
            Farmacia_Proveedores f = new Farmacia_Proveedores();
            if (!row.IsPRV_TELEFONONull())
                f.Telefono = row.PRV_TELEFONO;
            else f.Telefono = string.Empty;
            if (!row.IsPRV_EN_USONull())
                if (row.PRV_EN_USO.Equals("S")) f.EnUso = "Activo";
                else f.EnUso = "Inactivo";
            else f.EnUso = "Activo";
            if (!row.IsPRV_DIRECCIONNull())
                f.Direccion = row.PRV_DIRECCION;
            else f.Direccion = string.Empty;
            if (!row.IsPRV_CUITNull())
                f.Cuit = row.PRV_CUIT;
            else f.Cuit = string.Empty;
            f.Id = row.PRV_ID.ToString();
            f.Nombre = row.PRV_NOMBRE;
            if (!row.IsPRV_CELULARNull()) f.Celular = row.PRV_CELULAR;
            else f.Celular = string.Empty;
            if (!row.IsPRV_RUBRONull()) f.Rubro = row.PRV_RUBRO;
            else f.Rubro = string.Empty;
            if (!row.IsPRV_CONTACTONull()) f.Contacto = row.PRV_CONTACTO;
            else f.Contacto = string.Empty;
            if (!row.IsPRV_LOCALIDADNull()) f.Localidad = row.PRV_LOCALIDAD;
            else f.Localidad = string.Empty;

            return f;
        }



        private farmacia CreateFromRowInsumos_List(FarmaciaDAL.H2_Item_Insumos_ListRow row)
        {
            farmacia f = new farmacia();
            if (!row.IsCant_BlisterNull())
                f.CANT_BLISTER = row.Cant_Blister.ToString();
            else f.CANT_BLISTER = "";
                f.NROLOTE = row.Lote;
                //if (!row.IsFormaFarmaNull())
                    
                //f.Medida = row.FormaFarma;
                //else f.Medida = "";
                f.NROSERIE = row.NroSerie.ToString();
            if (!row.IsPresentacionNull())
                f.Presentacion = row.Presentacion;
            else f.Presentacion = "";
            if (!row.IsREM_APENull())
                f.REM_APE = row.REM_APE;
            if (!row.IsREM_BAJA_ESPECIALNull())
                f.REM_BAJA_ESPECIAL = "N";
            else f.REM_BAJA_ESPECIAL = "";
            if (!row.IsREM_BAJANull())
                f.REM_BAJA = row.REM_BAJA;
            else f.REM_BAJA = "";
                f.REM_DESC_COMP = row.REM_DESC_COMP;
                f.REM_ESTADO = row.REM_ESTADO;
                f.REM_FACT = row.REM_FACT;
            if (!row.IsREM_FECHA_VIGENCIA_PRECIONull())
                f.REM_FECHA_VIGENCIA_PRECIO = row.REM_FECHA_VIGENCIA_PRECIO.ToString();
            else f.REM_FECHA_VIGENCIA_PRECIO = "";
            if (!row.IsREM_GRAMAJENull())
                f.REM_GRAMAJE = row.REM_GRAMAJE;
            else f.REM_GRAMAJE = "";
                f.REM_IMPORTADO = row.REM_IMPORTADO;
            if (!row.IsREM_LISTANull())
                f.REM_LISTA = row.REM_LISTA;
            if (!row.IsREM_MULTIDOSISNull())
                f.REM_MULTIDOSIS = row.REM_MULTIDOSIS;
            else f.REM_MULTIDOSIS = "N";
            if (!row.IsREM_NOMBRENull())
                f.REM_NOMBRE = row.REM_NOMBRE;
            else f.REM_NOMBRE = "";
            if (!row.IsREM_PRECIONull())
                f.REM_PRECIO = row.REM_PRECIO;
            else f.REM_PRECIO = Convert.ToDecimal("0.00");
            if (!row.IsREM_PRECOMPRANull())
                f.REM_PRECOMPRA = row.REM_PRECOMPRA;
            else f.REM_PRECOMPRA = Convert.ToDecimal("0.00");
            if (!row.Isrem_presentacion_idNull())
                f.REM_PRESENTACION_ID = row.rem_presentacion_id.ToString();
            else f.REM_PRESENTACION_ID = "";
            if (!row.IsREM_PRESENTACIONNull())
                f.REM_PRESENTACION = row.REM_PRESENTACION.ToString();
            else f.REM_PRESENTACION = "";
            if (!row.IsREM_RUBRONull())
                f.REM_RUBRO = row.REM_RUBRO.ToString();
            else f.REM_RUBRO = "";
            if (!row.Isrem_rubros_idNull())
                f.REM_RUBRO_ID = row.rem_rubros_id.ToString();
            else f.REM_RUBRO_ID = "";
            if (!row.Isrem_unidades_idNull())
                f.REM_UNIDADES_ID = row.rem_unidades_id.ToString();
            else f.REM_UNIDADES_ID = "";
            if (!row.IsREM_UNIDADESNull())
                f.REM_UNIDADES = row.REM_UNIDADES.ToString();
            else f.REM_UNIDADES = "";
            if (!row.IsRubroNull())
                f.Rubro = row.Rubro;
            else f.Rubro = "";
            if (!row.IsSTO_CANTIDADNull())
                f.STO_CANTIDAD = row.STO_CANTIDAD.ToString();
            else f.STO_CANTIDAD = "";
            if (!row.IsSTO_DEP_IDNull())
                f.STO_DEP_ID = row.STO_DEP_ID.ToString();
            else f.STO_DEP_ID = "";
            if (!row.IsSTO_MINIMONull())
                f.STO_MINIMO = row.STO_MINIMO.ToString();
            else f.STO_MINIMO = "";
            if (!row.IsSTO_VCTONull())
                f.STO_VENCIMIENTO = row.STO_VCTO.ToString();
            else f.STO_VENCIMIENTO = "";

            if (row.Trazabilidad)
            f.CTrazabilidad = true;
            else f.CTrazabilidad = false;

            f.REM_ID = row.REM_ID.ToString();
            if (row.Eliminado)
                f.ELIMINADO = false;
            else f.ELIMINADO = true;

            f.MONODROGA = row.Monodroga;

            if (!row.IsREM_LISTANull()) 
            f.CRequiereAuto = row.Req_Auto;

            if (!row.IsLabIdNull())
                f.LAB_ID = row.LabId.ToString();
            else f.LAB_ID = "0";
            f.Laboratorio = row.Laboratorio;

            if (!row.IsPRESENTACION_CNull())
                f.REM_PRESENTACION_C = row.PRESENTACION_C.ToString();
            else f.REM_PRESENTACION_C = string.Empty;

            if (!row.IsGRAMAJE_IDNull()) f.REM_GRAMAJE_ID = row.GRAMAJE_ID;
            else f.REM_GRAMAJE_ID = 0;

            if (!row.IsDosisUNull()) { f.REM_GRAMAJE_DESC = row.DosisU; f.Medida = row.DosisU; }
            else f.REM_GRAMAJE_DESC = string.Empty;

            if (!row.IsFormaFarmaNull()) f.REM_UNIDADES = row.FormaFarma; 
            else f.REM_UNIDADES = string.Empty;

            if (!row.IsPresentacionDescNull()) { f.REM_PRESENTACION_DESC = row.PresentacionDesc; f.Presentacion = row.PresentacionDesc; }
            else f.REM_PRESENTACION_DESC = string.Empty;

            //Nuevos Campos agregados
            f.Vencimiento_Diasaviso = row.Vencimiento_Diasaviso;
            f.GTIN = row.GTIN;
            f.GLN = row.GLN;
            f.StockMax = row.StockMax;

            return f;
        }

        private Medicamento_Medidas CreateFromRowMedidas(FarmaciaDAL.H2_MEDIDAS_LISTRow row)
        {
            Medicamento_Medidas d = new Medicamento_Medidas();
            if (!row.IsmedidaNull())
                d.Medida = row.medida;
            d.Id = row.id;
            return d;
        }

        private Medicamento_Deposito CreateFromRowDeposito(FarmaciaDAL.H2_DEPOSITOS_LISTRow row)
        {
            Medicamento_Deposito d = new Medicamento_Deposito();
            if (!row.IsdepositoNull())
                d.Deposito = row.deposito;
            d.Id = row.id;
            
            return d;
        }

        private Medicamento_Presentacion CreateFromRowPresentacion(FarmaciaDAL.H2_PRESENTACION_LISTRow row)
        {
            Medicamento_Presentacion m = new Medicamento_Presentacion();
            if (!row.IspresentacionNull())
                m.Presentacion = row.presentacion;
            m.Id = row.id;
            return m;
        }

        private ControlStock CreateFromRowControlStock(FarmaciaDAL.H2_Farmacia_Control_de_StockRow row)
        {
            ControlStock c = new ControlStock();
            if (!row.IsdepositoNull())
                c.Deposito = row.deposito;
            if (!row.IsREM_GRAMAJENull())
                c.Gramaje = row.REM_GRAMAJE;
            c.Id = row.id;
            if (!row.IsREM_NOMBRENull())
                c.Medicamento = row.REM_NOMBRE;
            if (!row.IsmedidaNull())
                c.Medida = row.medida;
            if (!row.IspresentacionNull())
                c.Presentacion = row.presentacion;
            if (!row.IsrubroNull())
                c.Rubro = row.rubro;
            c.Stock = row.STO_CANTIDAD;
            if (!row.IsSTO_MINIMONull())
                c.StockMin = row.STO_MINIMO;

            c.Insumo_Id = row.Insumo_Id;

            c.StockMax = row.StockMax;

            c.STO_VCTO = row.STO_VCTO.ToShortDateString();

            if (!row.IsNRO_LOTENull()) { c.lote = row.NRO_LOTE; } else { c.lote = ""; }
            return c;
        }

        private Medicamento_Rubro CreateFromRowRubro(FarmaciaDAL.H2_RUBROS_LISTRow row)
        {
            Medicamento_Rubro r = new Medicamento_Rubro();
            if (!row.IsrubroNull())
                r.Rubro = row.rubro;
            r.Id = row.id;
            return r;
        }

        private Bono_Contribucion_Cabecera CreateFromRowCabecera(FarmaciaDAL.H2_PEDIDOS_PUBLICO_SELECTRow row)
        {
            Bono_Contribucion_Cabecera cab = new Bono_Contribucion_Cabecera();
            if(!row.IsNHCNull())
            cab.NHC = row.NHC;
            cab.Nombre_Cliente = row.Afiliado;
            cab.Pedido_Fecha = row.Fecha;
            cab.Pedido_Id = row.NroBono;
            cab.Usuario = row.Usuario;
            return cab;
        }

        private Rendicion_BonoContribucion CreateFromRowRendicion(FarmaciaDAL.H2_PEDIDOS_PUBLICO_RENDICIONRow row)
        {
            Rendicion_BonoContribucion r = new Rendicion_BonoContribucion();
            if (!row.IsDescuentoNull())
                r.Descuento = Convert.ToInt32(row.Descuento);
            if (!row.IsMedicamentoNull())
                r.Medicamento = row.Medicamento;
            if (!row.IsNHCNull())
                r.NHC = row.NHC;
            if (!row.IsTotalNull())
                r.Total = row.Total;
            r.Ped_Fecha = row.PED_FECHA;
            r.Afiliado = row.Afiliado;
            r.Cantidad = row.Cantidad;
            decimal desc = 1 - (r.Descuento / decimal.Parse("100"));
            r.Total = r.Total * desc;
            return r;
        }

        private Usuarios_Farmacia CreateFromRowUsuarios_Farmacia(FarmaciaDAL.H2_USUARIOS_SELECTRow row)
        {
            Usuarios_Farmacia u = new Usuarios_Farmacia();
            if (!row.IsNombreNull())
                u.Nombre = row.Nombre;
            u.Usuario = row.Usuario;
            u.id = row.id;
            return u;
        }

        private farmacia CreateFromRow(FarmaciaDAL.H2_Insumos_ListRow row)
        {
            farmacia f = new farmacia();
            f.REM_ID = row.REM_ID.ToString();
            if (!row.IsREM_NOMBRENull())
                //f.REM_NOMBRE = row.REM_NOMBRE + " - " + row.REM_DESC_COMP; 
                f.REM_NOMBRE = row.REM_NOMBRE;
            if (!row.IsREM_GRAMAJENull())
                f.REM_GRAMAJE = row.REM_GRAMAJE;
            if (!row.IsmedidaNull())
                f.Medida = row.medida;
            if (!row.IspresentacionNull())
                f.Presentacion = row.presentacion;
            if (!row.IsREM_UNIDADESNull())
                f.REM_UNIDADES = row.REM_UNIDADES.ToString();
            if (!row.IsREM_PRECOMPRANull())
                f.REM_PRECOMPRA = row.REM_PRECOMPRA;
            if (!row.IsREM_PRECIONull())
                f.REM_PRECIO = row.REM_PRECIO;
            if (!row.IsREM_APENull())
                f.REM_APE = row.REM_APE;
            if (!row.IsREM_FACTNull())
                f.REM_FACT = row.REM_FACT;
            if (!row.IsREM_MULTIDOSISNull())
                f.REM_MULTIDOSIS = row.REM_MULTIDOSIS;
            if (!row.IsREM_TRAZABILIDADNull())
                //f.CTrazabilidad = row.REM_TRAZABILIDAD;
                f.CTrazabilidad = false;
            if (!row.IsREM_BAJANull())
                f.REM_BAJA = row.REM_BAJA;
            if (!row.IsREM_NROSERIENull())
                f.NROSERIE = row.REM_NROSERIE.ToString();
            if (!row.IsREM_LOTENull())
                f.NROLOTE = row.REM_LOTE;
            if (!row.IsCANT_BLISTERNull())
                f.CANT_BLISTER = row.CANT_BLISTER.ToString();
            return f;
        }

        public internacion_paciente List_PacienteInt_byDoc(string Documento)
        {
            FarmaciaDALTableAdapters.H2_LIST_PACIENTE_INT_BYDOCTableAdapter adapter = new FarmaciaDALTableAdapters.H2_LIST_PACIENTE_INT_BYDOCTableAdapter();
            long _Id;
            if (!long.TryParse(Documento, out _Id)) throw new Exception("Numero de Afiliado incorrecto");
            FarmaciaDAL.H2_LIST_PACIENTE_INT_BYDOCDataTable aTable = adapter.GetData(_Id);
            if (aTable.Count > 0)
                return CreateRowFrom_PacienteInt(aTable[0]);
            else return null;
        }


        private internacion_paciente CreateRowFrom_PacienteInt(FarmaciaDAL.H2_LIST_PACIENTE_INT_BYDOCRow row)
        {
            internacion_paciente p = new internacion_paciente();
            p.Apellido = row.apellido;
            p.CamaId = row.CamaId.ToString();
            p.Cuil = row.cuil.ToString();
            p.Documento = row.documento.ToString();
            p.SalaId = row.SalaId.ToString();
            p.ServicioId = row.ServicioId.ToString();
            p.InternacionId = row.Internacion_Id.ToString();
            p.Servicio = row.Servicio;
            p.Cama = row.Cama;
            p.Sala = row.Sala;
            return p;
        }
    }
}