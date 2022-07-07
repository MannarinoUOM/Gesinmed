using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for IndicacionMedicaBLL
/// </summary>
namespace Hospital
{
    public class IndicacionMedicaBLL
    {
        public IndicacionMedicaBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<long> IM_VER_ANTIOBIOTICO(long IMId)
        {
            try
            {
                IMTableAdapters.H2_AT_INTERNADOS_IM_VER_ANTIOBIOTICOTableAdapter adapter = new IMTableAdapters.H2_AT_INTERNADOS_IM_VER_ANTIOBIOTICOTableAdapter();
                IM.H2_AT_INTERNADOS_IM_VER_ANTIOBIOTICODataTable aTable = adapter.GetData(IMId);
                List<long> lista = new List<long>();
                foreach (IM.H2_AT_INTERNADOS_IM_VER_ANTIOBIOTICORow row in aTable.Rows)
                    lista.Add(row.InsumoId);
                return lista;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public long ExisteIM_Hoy_by_NHC(long NHC)
        {
            IMTableAdapters.QueriesTableAdapter adapter = new IMTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_FARMACIA_IM_BY_NHC_EXISTE_HOY(NHC);
            long _Id;
            if (Id != null)
            {
                if (!long.TryParse(Id.ToString(), out _Id)) throw new Exception("Nro. IM no válido");
                return _Id;
            }
            else return -1;
        }

        public int Insert_IM_Cab(IM_Cab I)
        {
            IMTableAdapters.QueriesTableAdapter adapter = new IMTableAdapters.QueriesTableAdapter();
            long U = ((usuarios)(HttpContext.Current.Session["Usuario"])).id;
            object Id = adapter.H2_IndicacionMedica_Save(Convert.ToInt64(I.NHC), int.Parse(I.IdServicio), int.Parse(I.IdCama), int.Parse(I.IdMedico), int.Parse(I.IdSala), int.Parse(I.IdInternacion), U, Convert.ToDateTime(I.Fecha));
            if (Id != null)
            {
                return int.Parse(Id.ToString());
            }
            else return -1;
        }

        public int Get_NroEntrega_for_Remito(int IdIM)
        {
            IMTableAdapters.QueriesTableAdapter adapter = new IMTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_IM_GET_NROENTREGA_FOR_REMITO(IdIM);
            if (Id != null)
            {
                return int.Parse(Id.ToString());
            }
            else return -1;
        }

        public List<Farmacia_Egr_Detalle> VerHistorialEntregasIM(int IdIM)
        {
            IMTableAdapters.H2_IM_HISTORIAL_BY_IMTableAdapter adapter = new IMTableAdapters.H2_IM_HISTORIAL_BY_IMTableAdapter();
            IM.H2_IM_HISTORIAL_BY_IMDataTable aTable = adapter.GetData(IdIM);
            List<Farmacia_Egr_Detalle> lista = new List<Farmacia_Egr_Detalle>();
            foreach (IM.H2_IM_HISTORIAL_BY_IMRow row in aTable.Rows)
            {
                Farmacia_Egr_Detalle f = new Farmacia_Egr_Detalle();
                f.NRO_ENTREGA = row.NroEntrega;
                f.USUARIO = row.Usuario;
                f.FECHA = row.Fecha.ToString();
                lista.Add(f);
            }
            return lista;
        }

        private int CalcularUnidades(decimal Cantidadgr, int InsumoId, int Hs)
        {
            FarmaciaBLL f = new FarmaciaBLL();
            decimal gramaje;
            if (decimal.TryParse(f.Get_Insumo_by_Id(InsumoId).REM_GRAMAJE.Replace('.', ','), out gramaje))
            {
                if (Hs == 0) Hs = 24;

                decimal r = (Cantidadgr * (24 / Hs)) / gramaje;
                if (r - (int)r > 0) return (int)++r;
                else return (int)r;
            }
            else return 1;
        }


        public int Insert_IM_Det(IM_Det I)
        {
            IMTableAdapters.QueriesTableAdapter adapter = new IMTableAdapters.QueriesTableAdapter();
            if (string.IsNullOrEmpty(I.Horas)) I.Horas = "0";
            if (string.IsNullOrEmpty(I.Via_Id)) I.Via_Id = "0";
            I.Cantidad_gr = I.Cantidad_gr.Replace('.', ',');
            if (int.Parse(I.Insumo_Id) > 0) I.Cantidad = CalcularUnidades(decimal.Parse(I.Cantidad_gr), int.Parse(I.Insumo_Id), int.Parse(I.Horas)).ToString();
            if (I.Medida_Id == null) { I.Medida_Id = "0"; }
            if (I.Presentacion_Id == null) { I.Presentacion_Id = "0"; }
            if (I.Nombre == null) { I.Nombre = I.Indicacion; }
            if (I.Via == "IM") { I.Via = ""; }

            object Id = adapter.H2_IndicacionMedica_Detalle_Save(int.Parse(I.IM_Id), Convert.ToInt64(I.Insumo_Id), null, int.Parse(I.Via_Id),
                Convert.ToInt32(Convert.ToDouble(I.Cantidad)), I.Indicacion, I.Observaciones, null, I.Ocultar, int.Parse(I.Horas), I.EnHoras, I.Vademe,
                false, 1, null, I.Presentacion, I.Medida, decimal.Parse(I.Cantidad_gr),I.idDetalleIndicacion);

            //FarmaciaBLL f = new FarmaciaBLL();
            //if (f.Get_Insumo_by_Id(int.Parse(I.Insumo_Id)).REM_MULTIDOSIS.Equals("S"))
            //{
            HistorialAntibioticos_Insert(long.Parse(I.IM_Id), Convert.ToInt64(I.Insumo_Id)); //Si el insumo es un antibiotico, lo agrego al historial...
            //}

            if (Id != null)
            {
                return int.Parse(Id.ToString());
            }
            else return -1;
        }

        public void HistorialAntibioticos_Insert(long At_Internados_Antibioticos_NroIM, long At_Internados_Antibioticos_InsumoId)
        {
            try
            {
                IMTableAdapters.QueriesTableAdapter adapter = new IMTableAdapters.QueriesTableAdapter();
                adapter.H2_At_Internados_Antibioticos_Insert(At_Internados_Antibioticos_NroIM, At_Internados_Antibioticos_InsumoId, 1, true, false);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<IM_Buscar> BuscarIM(string NHC, string Id, string Apellido, string Desde, string Hasta, string objBusquedaLista, string MedicoId)
        {
            int Pedido_Id, Medico;
            DateTime f_Desde, f_Hasta;

            if (string.IsNullOrEmpty(Id)) Pedido_Id = 0;
            else Pedido_Id = int.Parse(Id);

            if (string.IsNullOrEmpty(MedicoId)) Medico = 0;
            else Medico = int.Parse(MedicoId);

            if (string.IsNullOrEmpty(Desde)) f_Desde = DateTime.MinValue.Date;
            else f_Desde = DateTime.Parse(Desde).Date;

            if (string.IsNullOrEmpty(Hasta)) f_Hasta = DateTime.MinValue.Date;
            else f_Hasta = DateTime.Parse(Hasta).Date;

            IMTableAdapters.H2_BUSCAR_IMTableAdapter adapter = new IMTableAdapters.H2_BUSCAR_IMTableAdapter();
            IM.H2_BUSCAR_IMDataTable aTable = adapter.GetData(NHC, Pedido_Id, Apellido, f_Desde, f_Hasta, objBusquedaLista, Medico);
            List<IM_Buscar> lista = new List<IM_Buscar>();
            foreach (IM.H2_BUSCAR_IMRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_BuscarIM(row));
            }
            return lista;
        }

        public List<IM_Buscar> Buscar_IM_ENT(string NHC, string Id, string Desde, string Hasta, string ServicioId, int Pendiente)
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

            IMTableAdapters.H2_BUSCAR_IM_ENTTableAdapter adapter = new IMTableAdapters.H2_BUSCAR_IM_ENTTableAdapter();
            IM.H2_BUSCAR_IM_ENTDataTable aTable = adapter.GetData(NHC, Pedido_Id, f_Desde, f_Hasta, Serv, Pendiente);
            List<IM_Buscar> lista = new List<IM_Buscar>();
            foreach (IM.H2_BUSCAR_IM_ENTRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_BuscarIM_ENT(row));
            }
            return lista;
        }

        public List<IM_Det> BuscarIM_Det(string Id)
        {
            try
            {
                IMTableAdapters.H2_IM_DET_BYIDTableAdapter adapter = new IMTableAdapters.H2_IM_DET_BYIDTableAdapter();
                IM.H2_IM_DET_BYIDDataTable aTable = adapter.GetData(int.Parse(Id));
                List<IM_Det> lista = new List<IM_Det>();
                foreach (IM.H2_IM_DET_BYIDRow row in aTable.Rows)
                {
                    lista.Add(CreateFromRow_BuscarIM_Det(row));
                }
                return lista;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void IM_DeleteItems_Modifica(int IMId, int NroEntregaDet)
        {
            IMTableAdapters.QueriesTableAdapter adapter = new IMTableAdapters.QueriesTableAdapter();
            adapter.H2_IM_ENT_DELETEITEMS_MODIFICA(IMId, NroEntregaDet);
        }

        public List<IM_Ent_Det> BuscarIM_ENT_Det_Modifica(int IdIM, int NroEntregaDet)
        {
            IMTableAdapters.H2_IM_ENT_DET_BY_ENTREGA_MODIFICATableAdapter adapter = new IMTableAdapters.H2_IM_ENT_DET_BY_ENTREGA_MODIFICATableAdapter();
            IM.H2_IM_ENT_DET_BY_ENTREGA_MODIFICADataTable aTable = adapter.GetData(IdIM, NroEntregaDet);
            List<IM_Ent_Det> lista = new List<IM_Ent_Det>();
            foreach (IM.H2_IM_ENT_DET_BY_ENTREGA_MODIFICARow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_BuscarIM_ENT_Det_Modifica(row));
            }
            return lista;
        }

        private IM_Ent_Det CreateFromRow_BuscarIM_ENT_Det_Modifica(IM.H2_IM_ENT_DET_BY_ENTREGA_MODIFICARow row)
        {
            IM_Ent_Det i = new IM_Ent_Det();
            if (row.IdInsumo > 0)
            {
                if (!row.Iscantidad_ENull()) i.CantEnt = row.cantidad_E.ToString();
                else i.CantEnt = "0";
                i.Cantidad = row.Cantidad;
                if (!row.IsFrecuenciaNull()) i.Horas = row.Frecuencia.ToString();
                else i.Horas = "0";
                if (!row.IsIdIndicacionMedicaNull()) i.IM_Id = row.IdIndicacionMedica.ToString();
                if (!row.IsIdInsumoNull()) i.Insumo_Id = row.IdInsumo.ToString();
                if (!row.IsIndicacionNull()) i.Indicacion = row.Indicacion;
                if (!row.IsObservacionNull()) i.Observacion = row.Observacion;
                if (!row.IsPresentacionNull()) i.Presentacion = row.Presentacion;
                if (!row.IsREM_GRAMAJENull()) i.Gramaje = row.REM_GRAMAJE;
                if (!row.IsREM_NOMBRENull()) i.Nombre = row.REM_NOMBRE;
                if (!row.IsUnidadNull()) i.Medida = row.Unidad;
                if (!row.IsSTO_CANTIDADNull()) i.Stock = row.STO_CANTIDAD.ToString();
                else i.Stock = "0";
                if (!row.IsentregaNull()) i.Cantidad_aEnt = row.entrega;
                else i.Cantidad_aEnt = 0;
                if (!row.IsEtiquetaNull()) i.Etiqueta = row.Etiqueta;
                else i.Etiqueta = false;
                if (i.Horas != "0" && (!string.IsNullOrEmpty(i.Gramaje)))
                {
                    int UnidadEnt = (int)(Convert.ToDecimal(i.Cantidad_aEnt) * Convert.ToDecimal(i.Gramaje.Replace('.', ',')));
                    i.UnidadEnt = UnidadEnt.ToString();
                    decimal CanH = (24 / decimal.Parse(i.Horas));
                    //i.Total = ((double)(CanH * double.Parse(i.Cantidad))).ToString();
                    i.Total = CanH * i.Cantidad;
                    i.CantEnt = ((double)((double.Parse(i.UnidadEnt) * double.Parse(i.Gramaje)))).ToString();
                    i.Unidad_aEnt = row.Unidad_aEnt;
                }
                else
                {
                    i.Total = i.Cantidad;
                    i.CantEnt = double.Parse(i.UnidadEnt).ToString();
                    i.Unidad_aEnt = Convert.ToInt32(i.Unidad_aEnt);
                    i.Cantidad_aEnt = Convert.ToInt32(i.UnidadEnt);
                }
                //i.Saldo = ((decimal)(decimal.Parse(i.Total) - (i.Cantidad_aEnt * Convert.ToDecimal(i.Gramaje.Replace('.', ','))))).ToString();
                i.Saldo = i.Total - (i.Cantidad_aEnt * Convert.ToDecimal(i.Gramaje.Replace('.', ',')));
                //i.Saldo = (Convert.ToDecimal(i.Total) - Convert.ToDecimal(i.UnidadEnt)).ToString();
            }
            else
            {
                i.UnidadEnt = "";
                i.Cantidad = 0;
                i.Horas = "";
                if (!row.IsIdIndicacionMedicaNull()) i.IM_Id = row.IdIndicacionMedica.ToString();
                if (!row.IsIdInsumoNull()) i.Insumo_Id = row.IdInsumo.ToString();
                if (!row.IsIndicacionNull()) i.Indicacion = row.Indicacion;
                if (!row.IsObservacionNull()) i.Observacion = row.Observacion;
                i.Presentacion = "";
                i.Gramaje = "";
                i.Nombre = "";
                i.Cantidad = 0;
                i.Medida = "";
                i.Stock = "";
                i.Total = 0;
                i.CantEnt = "";
                i.Saldo = 0;
            }
            return i;
        }

        public List<IM_Ent_Det> BuscarIM_ENT_Det(string Id)
        {
            try
            {
                IMTableAdapters.H2_IM_ENT_DETTableAdapter adapter = new IMTableAdapters.H2_IM_ENT_DETTableAdapter();
                IM.H2_IM_ENT_DETDataTable aTable = adapter.GetData(int.Parse(Id));
                List<IM_Ent_Det> lista = new List<IM_Ent_Det>();
                foreach (IM.H2_IM_ENT_DETRow row in aTable.Rows)
                {
                    lista.Add(CreateFromRow_BuscarIM_ENT_Det(row));
                }
                return lista;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private IM_Ent_Det CreateFromRow_BuscarIM_ENT_Det(IM.H2_IM_ENT_DETRow row)
        {
            IM_Ent_Det i = new IM_Ent_Det();
            if (row.IdInsumo > 0)
            {
                if (!row.IsVENCIMIENTONull()) { i.VENCIMIENTO = row.VENCIMIENTO; }
                if (!row.Iscantidad_ENull()) { i.Cantidad_E = row.cantidad_E; }


                if (!row.Iscantidad_ENull()) i.CantEnt = row.cantidad_E.ToString();
                else i.CantEnt = "0";
                //if (row.Cantidad < 1) i.Cantidad = "1";
                //else 
                i.Cantidad = row.Cantidad;
                //i.Cantidad.Replace(',', '.');
                if (!row.IsFrecuenciaNull()) i.Horas = row.Frecuencia.ToString();
                else i.Horas = "0";

                if (i.Horas == "0") i.Horas = "24";

                i.DetalleId = row.DetalleId;
                if (!row.IsIdIndicacionMedicaNull()) i.IM_Id = row.IdIndicacionMedica.ToString();
                if (!row.IsIdInsumoNull()) i.Insumo_Id = row.IdInsumo.ToString();
                if (!row.IsIndicacionNull()) i.Indicacion = row.Indicacion;
                if (!row.IsObservacionNull()) i.Observacion = row.Observacion;
                if (!row.IsPresentacionNull()) i.Presentacion = row.Presentacion;
                if (!row.IsREM_GRAMAJENull()) i.Gramaje = row.REM_GRAMAJE;
                if (!row.IsREM_NOMBRENull()) i.Nombre = row.REM_NOMBRE;
                if (!row.IsUnidadNull()) i.Medida = row.Unidad;
                if (!row.IsNRO_LOTENull()) { i.NRO_LOTE = row.NRO_LOTE; } else { i.NRO_LOTE = ""; }

                if (!row.IsSTO_CANTIDADNull()) i.Stock = row.STO_CANTIDAD.ToString();
                else i.Stock = "0";
                if (!row.IsentregaNull()) i.Cantidad_aEnt = row.entrega;
                else i.Cantidad_aEnt = 0;
                if (!row.IsEtiquetaNull()) i.Etiqueta = Convert.ToBoolean(row.Etiqueta);
                else i.Etiqueta = true;
                if (i.Horas != "0" && (!string.IsNullOrEmpty(i.Gramaje)))  //Si no es descartable o no viene en unidades... && (!string.Equals(i.Medida,"UNIDADES"))
                {
                    decimal UnidadEnt = Convert.ToDecimal(i.Cantidad_aEnt) * Convert.ToDecimal(i.Gramaje.Replace('.', ',')); //(int)(Convert.ToDecimal(i.Cantidad_aEnt) * Convert.ToDecimal(i.Gramaje.Replace('.', ',')));
                    i.UnidadEnt = UnidadEnt.ToString().Replace(',', '.');
                    decimal CanH = (24 / decimal.Parse(i.Horas));
                    //i.Total = ((double)(CanH * double.Parse(i.Cantidad))).ToString().Replace(',', '.');
                    i.Total = CanH * i.Cantidad;
                    i.CantEnt = ((double)((double.Parse(i.UnidadEnt) * double.Parse(i.Gramaje)))).ToString().Replace(',', '.');
                    if (row.Unidad_aEnt == 0) i.Unidad_aEnt = 1;
                    else i.Unidad_aEnt = row.Unidad_aEnt;
                }
                else
                {
                    i.Total = i.Cantidad;
                    i.CantEnt = double.Parse(i.UnidadEnt).ToString();
                    i.Unidad_aEnt = Convert.ToInt32(i.Unidad_aEnt);
                    i.Cantidad_aEnt = Convert.ToInt32(i.UnidadEnt);
                }
                //i.Saldo = ((decimal)(decimal.Parse(i.Total.Replace('.', ',')) - (i.Cantidad_aEnt * Convert.ToDecimal(i.Gramaje.Replace('.', ','))))).ToString().Replace(',', '.');
                i.Saldo = i.Total - i.Cantidad_aEnt * Convert.ToDecimal(i.Gramaje.Replace('.', ','));

                if(!row.IsFEC_VENCNull()) i.FEC_VENC = row.FEC_VENC.ToShortDateString();
            }
            else
            {
                i.UnidadEnt = "";
                //i.Cantidad = "";
                i.Cantidad = 0;
                i.Horas = "";
                if (!row.IsIdIndicacionMedicaNull()) i.IM_Id = row.IdIndicacionMedica.ToString();
                if (!row.IsIdInsumoNull()) i.Insumo_Id = row.IdInsumo.ToString();
                if (!row.IsIndicacionNull()) i.Indicacion = row.Indicacion;
                if (!row.IsObservacionNull()) i.Observacion = row.Observacion;
                i.Presentacion = "";
                i.Gramaje = "";
                i.Nombre = "";
                i.Cantidad = 0;
                i.Medida = "";
                i.Stock = "";
                i.Total = 0;
                i.CantEnt = "";
                i.Saldo = 0;
            }
            return i;
        }


        public void Delete_IM_Det(string IdPedido)
        {
            IMTableAdapters.QueriesTableAdapter adapter = new IMTableAdapters.QueriesTableAdapter();
            adapter.H2_DELETE_IM_DET(int.Parse(IdPedido));
        }

        public void Delete_IM_ENT(int Id)
        {
            IMTableAdapters.QueriesTableAdapter adapter = new IMTableAdapters.QueriesTableAdapter();
            adapter.H2_IM_ENT_DELETE(Id);
        }

        public int Insert_IM_Ent(IM_Ent_Det f, int SalaId, int CamaId, string Tipo, long Usuario)
        {
            try
            {
                IMTableAdapters.QueriesTableAdapter adapter = new IMTableAdapters.QueriesTableAdapter();
                if (f.Insumo_Id != "0" && decimal.Parse(f.UnidadEnt) > 0)
                {
                    f.NRO_LOTE_ARRAY = (from item in f.NRO_LOTE_ARRAY orderby item.FEC_VENC ascending select item).ToArray();

                   var stockActual = 0;
                  // var unidadesAux = f.Unidad_aEnt;
                   var unidadesAux = f.Cantidad_aEnt;
                   foreach (var item in f.NRO_LOTE_ARRAY) {
                           stockActual = item.Stock;

                       if (item.valor == "ENT. POR SUPERVISIÓN") {
                           adapter.H2_IM_ENT_INSERT(decimal.Parse(f.UnidadEnt), int.Parse(f.IM_Id), int.Parse(f.Insumo_Id), f.Cantidad_aEnt, SalaId, CamaId, f.NroEntrega,
                           Usuario, f.Unidad_aEnt, f.Etiqueta, f.DetalleId, item.valor);
                                                    //                       f.NRO_LOTE
                       }
                           else
                       if (stockActual <= unidadesAux && unidadesAux > 0 && stockActual > 0) {

                                unidadesAux =  unidadesAux - stockActual;
                                //Console.WriteLine($"Entregue {stockActual} unidades del lote { item._nroLote}");

                                adapter.H2_IM_ENT_INSERT(decimal.Parse(f.UnidadEnt), int.Parse(f.IM_Id), int.Parse(f.Insumo_Id), f.Cantidad_aEnt, SalaId, CamaId, f.NroEntrega,
                                Usuario, stockActual, f.Etiqueta, f.DetalleId, item.valor);
                                       //f.Unidad_aEnt                        f.NRO_LOTE
                              }
                              else
                          if (stockActual > unidadesAux && unidadesAux > 0 && stockActual > 0){

                               //Console.WriteLine($"Entregue {unidadesAux} unidades del lote { item._nroLote}");

                               adapter.H2_IM_ENT_INSERT(decimal.Parse(f.UnidadEnt), int.Parse(f.IM_Id), int.Parse(f.Insumo_Id), f.Cantidad_aEnt, SalaId, CamaId, f.NroEntrega,
                               Usuario, unidadesAux, f.Etiqueta, f.DetalleId, item.valor);
                               unidadesAux = 0;

                             }
                          }
                }
                else return 1;
                return 1;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        private IM_Det CreateFromRow_BuscarIM_Det(IM.H2_IM_DET_BYIDRow row)
        {
            IM_Det i = new IM_Det();

            i.idDetalleIndicacion = row.Id;
            i.Cantidad = row.Cantidad.ToString();
            i.Cantidad_gr = row.Cantidad.ToString();
            if (!row.IsDescripcionNull()) i.Via = row.Descripcion;
            if (!row.IsFrecuenciaNull()) i.Horas = row.Frecuencia.ToString();
            if (!row.IsIdIndicacionMedicaNull()) i.IM_Id = row.IdIndicacionMedica.ToString();
            if (!row.IsIdInsumoNull()) i.Insumo_Id = row.IdInsumo.ToString();
            if (!row.IsIdViaNull()) i.Via_Id = row.IdVia.ToString();
            if (!row.IsIndicacionNull()) i.Indicacion = row.Indicacion;
            if (!row.IsObservacionNull()) i.Observaciones = row.Observacion;
            if (!row.IsPresentacionNull()) i.Presentacion = row.Presentacion;
            if (!row.IsUnidadNull()) i.Medida = row.Unidad;
            i.EnHoras = row.EnHoras;
            i.Vademe = row.FueraVademecum;
            i.Ocultar = row.OcultarIM;
            i.Estado = 1;
            if (!row.IsREM_NOMBRENull()) i.Nombre = row.REM_NOMBRE;
            return i;
        }

        private IM_Buscar CreateFromRow_BuscarIM_ENT(IM.H2_BUSCAR_IM_ENTRow row)
        {
            IM_Buscar i = new IM_Buscar();
            i.Nombre = row.apellido;
            if (!row.IsSERV_DESCRIPCIONNull()) i.Servicio = row.SERV_DESCRIPCION;
            i.Fecha = row.Fecha.ToShortDateString();
            i.IM_Id = row.Id.ToString();
            i.NHC = row.NHC.ToString();
            i.Sala = row.Sala;
            i.Cama = row.Cama;
            if (!row.IsPendienteNull()) i.Pendiente = row.Pendiente;
            else i.Pendiente = 0;
            return i;
        }

        private IM_Buscar CreateFromRow_BuscarIM(IM.H2_BUSCAR_IMRow row)
        {
            IM_Buscar i = new IM_Buscar();
            i.Nombre = row.apellido;
            if (!row.IsSERV_DESCRIPCIONNull()) i.Servicio = row.SERV_DESCRIPCION;
            i.Documento = row.documento.ToString();
            i.Fecha = row.Fecha.ToShortDateString();
            i.IM_Id = row.Id.ToString();
            i.NHC = row.NHC.ToString();
            i.AfiliadoId = row.IdAfiliado;
            if (!row.IsIdInternacionNull()) i.IdInternacion = row.IdInternacion.ToString();
            if (!row.IsIdSalaNull()) i.IdSala = row.IdSala.ToString();
            if (!row.IstelefonoNull()) i.Telefono = row.telefono;
            i.IdCama = row.IdCama.ToString();
            i.IdMedico = row.IdMedico.ToString();
            i.IdServicio = row.IdServicio.ToString();
            i.Cama = row.Cama;
            i.Sala = row.Sala;
            if (!row.IsNroEntregaNull()) i.NroEntrega = row.NroEntrega.ToString();
            else i.NroEntrega = "Provisorio";
            i.Medico = row.Medico;
            i.Diagnostico = row.Diagnostico;
            return i;
        }


        public int Duplicar_IM(int Id, string Fecha, long usuario_id)
        {
            IMTableAdapters.QueriesTableAdapter adapter = new IMTableAdapters.QueriesTableAdapter();
            object id = adapter.H2_IndicacionMedica_Duplicar(Convert.ToInt32(usuario_id), Id, Convert.ToDateTime(Fecha));
            int id_nuevo = Convert.ToInt32(id.ToString());
            adapter.H2_IndicacionMedica_Duplicar_DET(Id, id_nuevo);
            return id_nuevo;
        }


        public long H2_IndicacionMedica_TraerLaUltima(int PacienteId)
        {
            IMTableAdapters.H2_IndicacionMedica_TraerLaUltimaTableAdapter adapter = new IMTableAdapters.H2_IndicacionMedica_TraerLaUltimaTableAdapter();
            IM.H2_IndicacionMedica_TraerLaUltimaDataTable aTable = adapter.GetData(PacienteId);
            if (aTable.Count > 0)
            {
                return aTable[0].Id;
            }
            return 0;
        }

        public void IM_DETALLE_UPDATE(long IdIndicacionMedica, long IdIMDetalle, long IdInsumo, decimal Cantidad, int Frecuencia, decimal DosisEntregada,
            int UnidadesEntregada, long UsuarioId)
        {
            try
            {
                IMTableAdapters.QueriesTableAdapter adapter = new IMTableAdapters.QueriesTableAdapter();
                adapter.H2_IM_DETALLE_UPDATE(IdIndicacionMedica, IdIMDetalle, IdInsumo, Cantidad, Frecuencia, DosisEntregada, UnidadesEntregada, UsuarioId);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<IM_Det> VerificarBajaInsumo(string bajas)
        {
            FarmaciaDALTableAdapters.H2_Verificar_Baja_InsumoTableAdapter adapter = new FarmaciaDALTableAdapters.H2_Verificar_Baja_InsumoTableAdapter();
            FarmaciaDAL.H2_Verificar_Baja_InsumoDataTable table = new FarmaciaDAL.H2_Verificar_Baja_InsumoDataTable();
            table = adapter.GetData(bajas.ToString());
            List<IM_Det> L = new List<IM_Det>();
            foreach (FarmaciaDAL.H2_Verificar_Baja_InsumoRow row in table.Rows)
            {
                IM_Det obj = new IM_Det();
                obj.Insumo_Id = row.REM_ID.ToString();
                if (!row.IsREM_NOMBRENull()) { obj.Nombre = row.REM_NOMBRE; }                
                L.Add(obj);
            }
            return L;
        }

        public void CerrarIM(int Id)
        {
            IMTableAdapters.QueriesTableAdapter adapter = new IMTableAdapters.QueriesTableAdapter();
            adapter.H2_Cerrar_IM(Id);
        }

    }  
}