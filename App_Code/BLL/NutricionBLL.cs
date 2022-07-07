using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for NutricionBLL
/// </summary>
namespace Hospital
{
    public class NutricionBLL
    {
        public NutricionBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<Menus> cargar_Combo_Menus()
        {
            NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_Combo_DietasTableAdapter adater = new NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_Combo_DietasTableAdapter();
            NutricionDAL.H2_Internacion_Nutricion_Traer_Combo_DietasDataTable atable = new NutricionDAL.H2_Internacion_Nutricion_Traer_Combo_DietasDataTable();
           
            atable = adater.GetData();
            List<Menus> L = new List<Menus>();
            foreach (NutricionDAL.H2_Internacion_Nutricion_Traer_Combo_DietasRow row in atable.Rows)
            {
                Menus M = new Menus();


                M.id = (int)row.id;
                M.apodo = row.Dieta;

                //if (!row.IsDietaNull())
                //    M.descripcion = row.Tipificacion;

                if (!row.IsTipificacionNull())
                    M.descripcion = row.Tipificacion;

                L.Add(M);
            }
            return L;

        }

        public encabezadoNutricion cargar_Encabezado(long idInternacion)
        {
            NutricionDALTableAdapters.H2_Internacion_Nutricion_Datos_EncabezadoTableAdapter adapter = new NutricionDALTableAdapters.H2_Internacion_Nutricion_Datos_EncabezadoTableAdapter();
            NutricionDAL.H2_Internacion_Nutricion_Datos_EncabezadoDataTable atable = new NutricionDAL.H2_Internacion_Nutricion_Datos_EncabezadoDataTable();

            atable = adapter.GetData(idInternacion);
            encabezadoNutricion E = new encabezadoNutricion();

            foreach (NutricionDAL.H2_Internacion_Nutricion_Datos_EncabezadoRow row in atable.Rows)
            {

                if (!row.Isfecha_nacimientoNull()) E.fecha_nacimiento = row.fecha_nacimiento;
                TimeSpan ts = DateTime.Now.Date - E.fecha_nacimiento;

                int anios = ts.Days / 365;
                int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                //int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
                string str_anios, str_meses;

                if (anios != 1) str_anios = " Años ";
                else str_anios = " Año ";
                if (meses != 1) str_meses = " Meses ";
                else str_meses = " Mes ";

                E.Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

                if (!row.IsPATOLOGIANull())
                    E.patologia = row.PATOLOGIA;
                //if(!row.IsapellidoNull())
                E.apellido = row.apellido;

                E.documento = row.documento.ToString();

                //if(!row.Isdocumento_realNull())
                E.documento_real = row.documento_real;

                if (!row.IsEDADNull())
                    E.edad = row.EDAD;

                if (!row.IsHC_UOM_CENTRALNull())
                    E.NHC_UOM = row.HC_UOM_CENTRAL.ToString();

                if (!row.IslocalidadNull())
                    E.localidad = row.localidad;

                if (!row.IsSECCIONAL1Null())
                    E.seccional = row.SECCIONAL1;

                if (!row.IstelefonoNull())
                    E.telefono = row.telefono;

                //if(!row.IsSERVICIONull())
                E.servicio = row.SERVICIO;

                //if(!row.isDescripcionNUll())
                E.cama = row.CAMA;
                E.sala = row.SALA;
                E.fehcaInternacion = row.INGRESO.ToShortDateString();

                if (!row.IsfotoNEWNull()) { E.foto = row.fotoNEW; } else { E.foto = "../img/silueta.jpg"; }


                if (!row.IsEGRESONull())
                    E.fecha_Egreso = row.EGRESO.ToShortDateString() + " a las " + row.EGRESO.ToShortTimeString();
            }
            return E;
        }


        public List<indicacionesNutricion> cargar_Indicaciones(long idInternacion, string fecha)
        {
            NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_IndicacionesTableAdapter adapter = new NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_IndicacionesTableAdapter();
            NutricionDAL.H2_Internacion_Nutricion_Traer_IndicacionesDataTable atable = new NutricionDAL.H2_Internacion_Nutricion_Traer_IndicacionesDataTable();

            atable = adapter.GetData(idInternacion, fecha);
            List<indicacionesNutricion> L = new List<indicacionesNutricion>();

            foreach (NutricionDAL.H2_Internacion_Nutricion_Traer_IndicacionesRow row in atable.Rows)
            {
                indicacionesNutricion I = new indicacionesNutricion();

                if (!row.IsREM_NOMBRENull())
                    // I.REM_NOMBRE = row.REM_NOMBRE + " -Monodroga: " + row.MonoDroga1 + " -Presentacion: " + row.Presentacion + " -Unidad: " + row.Unidad + " -Cantidad: " + row.Cantidad + " Cada " + row.Frecuencia + " Horas";
                    // I.REM_NOMBRE = row.REM_NOMBRE + " -- " + row.MonoDroga1 + " -- " + row.Presentacion + " -- " + row.Unidad + " -- " + row.Cantidad + " Cada " + row.Frecuencia + " Horas";
                    I.REM_NOMBRE = row.REM_NOMBRE;
                else
                    I.REM_NOMBRE = "";

                if (!row.IsMonoDroga1Null())
                    I.REM_NOMBRE = I.REM_NOMBRE + " -- " + row.MonoDroga1;

                if (!row.IsMonoDroga1Null())
                    I.REM_NOMBRE = I.REM_NOMBRE + " -- " + row.Presentacion;

                if (!row.IsMonoDroga1Null())
                    I.REM_NOMBRE = I.REM_NOMBRE + " -- " + row.Unidad;

                if (!row.IsMonoDroga1Null())
                    I.REM_NOMBRE = I.REM_NOMBRE + " -- " + row.Cantidad + " Cada ";

                if (!row.IsMonoDroga1Null())
                    I.REM_NOMBRE = I.REM_NOMBRE + " -- " + row.Frecuencia + " Horas";



                if (!row.IsIndicacionNull())
                    I.indicacion = row.Indicacion;
                else
                    I.indicacion = "";

                L.Add(I);
            }
            return L;
        }


        public long guardar_Nutricion1(long idNutricion, long idInternacion, long documento, string codAlmuerzo, string codCena, int usuario, string fecha, int idAlmuero, int idCena)
        //, int AIdalmuerzo, string Aalmuerzo, int AIdcena, string Acena)
        // string descAlmuerzo,string descCena,
        {

            //InternacionDALTableAdapters.QueriesTableAdapter adapter = new InternacionDALTableAdapters.QueriesTableAdapter();
            //InternacionDALTableAdapters.H2_Internacion_Nutrcion_GuardarTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Nutrcion_GuardarTableAdapter();
            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();


            object obj = adapter.H2_Internacion_Nutrcion_Guardar(idNutricion, idInternacion, documento, usuario, codAlmuerzo, codCena, fecha, idAlmuero, idCena);
            //, AIdalmuerzo, Aalmuerzo, AIdcena, Acena);
            //descAlmuerzo,descCena,

            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;


        }

        public List<Menus> cargar_Menus(long idInternacion, string fecha, string tipo)
        {
            NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_DietaTableAdapter adapter = new NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_DietaTableAdapter();
            NutricionDAL.H2_Internacion_Nutricion_Traer_DietaDataTable table = new NutricionDAL.H2_Internacion_Nutricion_Traer_DietaDataTable();
            table = adapter.GetData(idInternacion, fecha, tipo);
            List<Menus> L = new List<Menus>();
            foreach (NutricionDAL.H2_Internacion_Nutricion_Traer_DietaRow row in table.Rows)
            {
                //indicacionesNutricion I = new indicacionesNutricion();
                Menus M = new Menus();


                if (!row.IsdietaNull())
                    M.apodo = row.dieta;

                if (!row.IsidDietaNull())
                    M.id = row.idDieta;

                if (!row.IstipoNull())
                    M.Es = row.tipo;

                L.Add(M);
            }
            return L;
        }


        public long Guardar_Pedido_Encabezado(long idPedido, int idUsuario, DateTime fecha)
        {
            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Internacion_Nutricion_Guardar_Pedido_Encavezado(idPedido, idUsuario, fecha);

            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;
        }

        public long Guardar_Pedido_Detalle(List<pedidoNutricion> pedidos, long idPedido)
        {
            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Internacion_Nutricion_Limpiar_Pedido_Detalle(idPedido);

            object obj = null;
            foreach (pedidoNutricion item in pedidos)
            {
                obj = adapter.H2_Internacion_Nutricion_Guardar_Pedido_Detalle(idPedido, item.tipificacion, item.dieta, item.cantidad, item.dietaId);
            }
            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;

        }

        public List<pedidoNutricion> traer_Pedido(string fecha)
        {
            NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_PedidoTableAdapter adapter1 = new NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_PedidoTableAdapter();
            NutricionDAL.H2_Internacion_Nutricion_Traer_PedidoDataTable table = new NutricionDAL.H2_Internacion_Nutricion_Traer_PedidoDataTable();

            table = adapter1.GetData(fecha);

            List<pedidoNutricion> L = new List<pedidoNutricion>();

            foreach (NutricionDAL.H2_Internacion_Nutricion_Traer_PedidoRow row in table.Rows)
            {
                pedidoNutricion P = new pedidoNutricion();

                //P.tipificacion = row.tipificacion;
                P.dieta = row.comida;
                // P.fecha = row.fechaPedido.ToShortDateString();
                P.cantidad = row.cantidad;
                //P.idPedido = row.id;
                //P.dietaId = row.idDieta;
                L.Add(P);
            }

            return L;
        }


        public List<pedidoNutricion> traer_Pedidos_Internados(DateTime fecha, int imprime)
        {

            NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_Menus_InternadosTableAdapter adapter = new NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_Menus_InternadosTableAdapter();
            NutricionDAL.H2_Internacion_Nutricion_Traer_Menus_InternadosDataTable table = new NutricionDAL.H2_Internacion_Nutricion_Traer_Menus_InternadosDataTable();

            table = adapter.GetData(fecha);

            List<pedidoNutricion> L = new List<pedidoNutricion>();


            foreach (NutricionDAL.H2_Internacion_Nutricion_Traer_Menus_InternadosRow row in table.Rows)
            {
                pedidoNutricion P = new pedidoNutricion();

                NutricionDALTableAdapters.QueriesTableAdapter adapter2 = new NutricionDALTableAdapters.QueriesTableAdapter();

                string f = fecha.ToShortDateString();

                object obj = null;

                obj = adapter2.H2_Internacion_Nutricion_Traer_Acompañante_Comida_Totales(f);

                P.cantidadAcompañante = (int)obj;

                if (!row.IsDietaNull())
                    P.dieta = row.Dieta;

                P.cantidad = row.cantidad;

                P.piso = row.serv_descripcion;
                if (!row.IsDietaNull())
                    L.Add(P);
            }


            return L;
        }

        //H2_Internacon_Nutricion_Traer_Totales_DietasTableAdapter
        //public List<pedidoNutricion> traer_Totales_Pedidos(DateTime fecha)
        //{
        //    NutricionDALTableAdapters.H2_Internacon_Nutricion_Traer_Totales_DietasTableAdapter adapter = new NutricionDALTableAdapters.H2_Internacon_Nutricion_Traer_Totales_DietasTableAdapter();
        //    NutricionDAL.H2_Internacon_Nutricion_Traer_Totales_DietasDataTable table = new NutricionDAL.H2_Internacon_Nutricion_Traer_Totales_DietasDataTable();

        //    table = adapter.GetData(fecha);

        //    List<pedidoNutricion> L = new List<pedidoNutricion>();


        //    foreach (NutricionDAL.H2_Internacon_Nutricion_Traer_Totales_DietasRow row in table.Rows)
        //    {
        //        pedidoNutricion P = new pedidoNutricion();


        //        P.tipificacion = row.Comida;
        //        P.cantidad = row.Total;

        //        L.Add(P);
        //    }

        //    return L;
        //}


        public List<long> traer_Ids_Internacion(string fecha)
        {
            NutricionDALTableAdapters.H2_Internacion_Traer_IdsTableAdapter adapter = new NutricionDALTableAdapters.H2_Internacion_Traer_IdsTableAdapter();
            NutricionDAL.H2_Internacion_Traer_IdsDataTable table = new NutricionDAL.H2_Internacion_Traer_IdsDataTable();

            table = adapter.GetData(fecha);
            List<long> L = new List<long>();


            foreach (NutricionDAL.H2_Internacion_Traer_IdsRow row in table.Rows)
            {
                internacionIds P = new internacionIds();

                L.Add(row.ID);
            }
                
                    return L;
        }

        public List<pedidoNutricion> listsar_Pacientes_Comidas(string fecha)
        {
            NutricionDALTableAdapters.H2_Internacion_Nutricion_ListarTableAdapter adapter = new NutricionDALTableAdapters.H2_Internacion_Nutricion_ListarTableAdapter();
            NutricionDAL.H2_Internacion_Nutricion_ListarDataTable table = new NutricionDAL.H2_Internacion_Nutricion_ListarDataTable();

            table = adapter.GetData(fecha);
            List<pedidoNutricion> L = new List<pedidoNutricion>();

            foreach (NutricionDAL.H2_Internacion_Nutricion_ListarRow row in table.Rows)
            {
                pedidoNutricion P = new pedidoNutricion();
                //  P.nInt = row.NRO_INT;
                P.servicio = row.SERVICIO;
                P.sala = row.SALA;
                P.cama = row.CAMA;

                P.idInternacion = row.idInternacion;
                P.idPaciente = row.idPaciente;
                P.idAcompanante = row.idAcompañante;

                if(!row.IsAlmuerzoConfirmNull())
                P.AlmuerzoConfirm = row.AlmuerzoConfirm;

                if(!row.IscenaConfirmNull())
                P.cenaConfirm = row.cenaConfirm;

                if(!row.IsacompConfirmadoNull())
                P.acompConfirmado = row.acompConfirmado;

                if (!row.IsACOMP_ID_ALMUERZONull())
                    P.acomp_id_almuerzo = row.ACOMP_ID_ALMUERZO;
                else
                    P.acomp_id_almuerzo = 0;

                if (!row.IsACOMP_ID_CENANull())
                    P.acomp_id_cena = row.ACOMP_ID_CENA;
                else
                    P.acomp_id_cena = 0;

                if (!row.IsegresoNull())
                    P.fechaEgreso = "El paciente egreso el " + row.egreso.ToShortDateString() + " a las " + row.egreso.ToShortTimeString();

                if (!row.IsidsAlmuerzosNull())
                    P.idsAlmuerzo = row.idsAlmuerzos;

                if (!row.IsidsCenasNull())
                    P.idsCena = row.idsCenas;

                if (!row.IsconfirmadoNull())
                    P.confirmado = row.confirmado;
                else P.confirmado = 3;

                if (!row.IsNHCNull())
                    P.nhc = row.NHC;

                if (!row.IsAFILIADONull())
                    P.afiliado = row.AFILIADO;

                if (!row.IsACOMP_ALMUERZONull())
                    P.aAlmuerzo = row.ACOMP_ALMUERZO;
                else
                    P.aAlmuerzo = "";

                if (!row.IsACOMP_CENANull())
                    P.aCena = row.ACOMP_CENA;
                else
                    P.aCena = "";

                if (!row.IsALMUERZONull())
                    P.codAlmuerzo = row.ALMUERZO;
                else
                    P.codAlmuerzo = "";

                if (!row.IsCENANull())
                    P.codCena = row.CENA;
                else
                    P.codCena = "";


                L.Add(P);
            }
            return L;
        }


        public long Internacion_Nutrcion_Eliminar_Acompañante(long idInternacion, string fecha)
        {
            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();
            object obj = null;
            obj = adapter.H2_Internacion_Nutrcion_Eliminar_Acompañante(idInternacion, fecha);

            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;
        }
        public long Internacion_Nutricion_Guardar_Acompañante(long idInternacion, string fecha, int idalmuerzo, string codAlmuerzo, int idCena, string codCena)
        {
            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();
            object obj = null;

            obj = adapter.H2_Internacion_Nutricion_Guardar_Acompañante(idInternacion, fecha, idalmuerzo, codAlmuerzo, idCena, codCena);

            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;
        }

        public nutricionAcompañante Internacion_Nutricion_Traer_Acompañante_Comida(string fecha, long idIntenacion)
        {
            NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_Acompañante_ComidaTableAdapter adapter = new NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_Acompañante_ComidaTableAdapter();
            NutricionDAL.H2_Internacion_Nutricion_Traer_Acompañante_ComidaDataTable table = new NutricionDAL.H2_Internacion_Nutricion_Traer_Acompañante_ComidaDataTable();
            table = adapter.GetData(idIntenacion, fecha);

            nutricionAcompañante P = new nutricionAcompañante();
            foreach (NutricionDAL.H2_Internacion_Nutricion_Traer_Acompañante_ComidaRow row in table.Rows)
            {

                P.hay = 1;

                if (!row.IsidInternacionNull())
                    P.idIntenacion = row.idInternacion;

                if (!row.IsfechaCargaNull())
                    P.fecha = row.fechaCarga.ToShortDateString();

                if (!row.IsidAlmuerzoNull())
                    P.idalmuerzo = row.idAlmuerzo;

                if (!row.IscodAlmuerzoNull())
                    P.codAlmuerzo = row.codAlmuerzo;

                if (!row.IsidCenaNull())
                    P.idCena = row.idCena;

                if (!row.IscodCenaNull())
                    P.codCena = row.codCena;

                P.id = row.id;

            }
            return P;
        }


        public List<Menus> Internacion_Nutricion_Traer_Dietas()
        {

            NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_DietasTableAdapter adapter = new NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_DietasTableAdapter();
            NutricionDAL.H2_Internacion_Nutricion_Traer_DietasDataTable aTable = new NutricionDAL.H2_Internacion_Nutricion_Traer_DietasDataTable(); 

            aTable = adapter.GetData();
            List<Menus> L = new List<Menus>();

            foreach (NutricionDAL.H2_Internacion_Nutricion_Traer_DietasRow row in aTable.Rows)
            {
                Menus M = new Menus();

                M.id = row.id;
                M.apodo = row.Dieta;
                M.quetabla = row.que_tabla;
                if (!row.IsTipificacionNull())
                    M.descripcion = row.Tipificacion;
                else
                    M.descripcion = "";
                L.Add(M);

            }
            return L;
        }


        public long Nutricion_Guardar_Comidas_Temporales(int idComida, string codigoComida, string tipificaciolnComida, string Es, int idInternacion)
        {
            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();

            object obj = null;

            obj = adapter.H2_Internacion_Nutricion_Guardar_Comidas_Temporales(idComida, codigoComida, tipificaciolnComida, Es, idInternacion);

            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;
        }


        public List<Menus> Nutricion_Traer_Comidas_Temporales(int idInternacion, string tipo)
        {
            NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_Comidas_TemporalesTableAdapter adapter = new NutricionDALTableAdapters.H2_Internacion_Nutricion_Traer_Comidas_TemporalesTableAdapter();
            NutricionDAL.H2_Internacion_Nutricion_Traer_Comidas_TemporalesDataTable aTable = new NutricionDAL.H2_Internacion_Nutricion_Traer_Comidas_TemporalesDataTable();
            List<Menus> L = new List<Menus>();

            aTable = adapter.GetData(idInternacion, tipo);

            foreach (NutricionDAL.H2_Internacion_Nutricion_Traer_Comidas_TemporalesRow row in aTable.Rows)
            {
                Menus m = new Menus();
                m.id = row.idComida;
                m.apodo = row.codigoComida;
                m.Es = row.Es;
                if (!row.IstipificacionComidaNull())
                    m.descripcion = row.tipificacionComida;
                else
                    m.descripcion = "";


                L.Add(m);
            }

            return L;
        }

        public long Nutricion_Borrar_Un_Detalle(int idNutricion, string fecha, Menus comida, string cuantos)
        {
            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();
            //DateTime f = Convert.ToDateTime(fecha);
            object obj = null;

            obj = adapter.H2_Internacion_Nutricion_Borrar_Un_Detalle(idNutricion, fecha, comida.Es, comida.id, cuantos);

            //obj = adapter.H2_Internacion_Nutricion_Eliminar_Comidas_Temporales();
            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;
        }


        public long Nutricion_Borrar_Detalle_Todo(int idInternacion, string fechaComida)
        {
            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();
            //DateTime f = Convert.ToDateTime(fechaComida);
            object obj = null;
            obj = adapter.H2_Internacion_Nutricion_Borrar_Detalle_Todo(idInternacion, fechaComida);
            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;
        }


        public long Nutricion_Guardar_Encabezado(long idNutricion, int idInternacion, int idUsuario, int idPaciente, string fecha)
        {
            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();
            DateTime f = Convert.ToDateTime(fecha);
            object obj = null;
            obj = adapter.H2_Internacion_Nutricion_Guardar_Encabezado(idNutricion, idInternacion, idUsuario, idPaciente, f);
            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;
        }


        public long Nutricion_Guardar_Detalle(long idNutricion, string fechaComida, Menus comida)
        {
            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();
            DateTime f = Convert.ToDateTime(fechaComida);
            object obj = null;
            if (comida.id == 29 || comida.id == 30 || comida.id == 35)
            {
                adapter.H2_Internacion_Nutricion_Borrar_Detalle(comida.Es, idNutricion, f, comida.id);
            }
            obj = adapter.H2_Internacion_Nutricion_Guardar_Detalle(idNutricion, f, comida.id, comida.apodo, comida.descripcion, comida.Es);
            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;
        }


        public long Nutricion_Guardar_Detalle_Confirmar(long idInternacion, string fechaComida,List<string> idsAlmuerzo,List<string> idsCena)
        {
            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();
            DateTime f = Convert.ToDateTime(fechaComida);
            object obj = null;

            foreach (string item in idsAlmuerzo)
            {
                obj = adapter.H2_Internacion_Nutricion_Guardar_Detalle_Confirmar(idInternacion, f, "almuerzo",Convert.ToInt32(item) );
            }

            foreach (string item in idsCena)
            {
                obj = adapter.H2_Internacion_Nutricion_Guardar_Detalle_Confirmar(idInternacion, f, "cena", Convert.ToInt32(item));
            }

            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;
        }

        public long Internacion_Nutricion_Guardar_Comidas_Acompañante(long id, int idInternacion, int usuario, string fechaCarga, int idAlmuerzo, string codAlmuerzo, string tipificacionAlmuerzo
        , int idCena, string codCena, string tipificacionCena)
        {
            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();
            DateTime f = Convert.ToDateTime(fechaCarga);
            object obj = null;

          obj = adapter.H2_Internacion_Nutricion_Guardar_Comidas_Acompañante(id, idInternacion, usuario, f, idAlmuerzo, codAlmuerzo, tipificacionAlmuerzo, idCena, codCena, tipificacionCena);

            if (obj != null)
                return Convert.ToInt64(obj);
            else return -1;
        }
      
        public cantidades Nutricion_Contar_Comidas(string fechaComida)
        {

            NutricionDALTableAdapters.H2_Internacion_Nutricion_Contar_ComidasTableAdapter adapter = new NutricionDALTableAdapters.H2_Internacion_Nutricion_Contar_ComidasTableAdapter();
            NutricionDAL.H2_Internacion_Nutricion_Contar_ComidasDataTable aTable = new NutricionDAL.H2_Internacion_Nutricion_Contar_ComidasDataTable();

            aTable = adapter.GetData(fechaComida);
            cantidades cantidad = new cantidades();
            foreach (NutricionDAL.H2_Internacion_Nutricion_Contar_ComidasRow row in aTable.Rows)
            {
                cantidad.sin_cargar = row.sin_cargar;
                cantidad.cargados = row.cargados;
                cantidad.pacientes = row.pacientes;
                cantidad.acompañante = row.acompañante;
                cantidad.totalPacientes = row.totalInternados;
            }
            return cantidad;
        }


        public nutricionAcompañante Nutrcion_Traer_Comidas_Acompañante_New(int idInternacion,string fecha)
        {
            NutricionDALTableAdapters.H2_Nutrcion_Traer_Comidas_Acompañante_NewTableAdapter adapter = new NutricionDALTableAdapters.H2_Nutrcion_Traer_Comidas_Acompañante_NewTableAdapter();
            NutricionDAL.H2_Nutrcion_Traer_Comidas_Acompañante_NewDataTable aTable = new NutricionDAL.H2_Nutrcion_Traer_Comidas_Acompañante_NewDataTable();

            aTable = adapter.GetData(idInternacion,fecha);
            nutricionAcompañante acompanante = new nutricionAcompañante();
            foreach (NutricionDAL.H2_Nutrcion_Traer_Comidas_Acompañante_NewRow row in aTable.Rows)
            {
                acompanante.idIntenacion = row.idInternacion;
                acompanante.fecha = row.fechaCarga.ToShortDateString();
                acompanante.idalmuerzo = row.idAlmuerzo;
                acompanante.codAlmuerzo = row.codAlmuerzo;
                acompanante.idCena = row.idCena;
                acompanante.codCena = row.codCena;
            }
            return acompanante;
        }

        public void Nutricion_Total_de_Comidas_Diarias_Guardar_Editar(List<nutricionTotalDiarias> lista)
        {

            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();

            foreach (nutricionTotalDiarias item in lista)
            {
                object obj = adapter.H2_Nutricion_Total_de_Comidas_Diarias_Guardar_Editar(Convert.ToDateTime(item.fecha), item.tipo, item.personalComedor, item.ambulatorio, item.medicos, item.dietasEspeciales,item.usuario);
            }

        }

        public void Nutricion_Total_de_Comidas_Diarias_Borrar(string fecha)
        {
            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Nutricion_Total_de_Comidas_Diarias_Borrar(Convert.ToDateTime(fecha));

        }

        public List<nutricionTotalDiarias> Nutricion_Total_de_Comidas_Diarias_Imprimir(string fecha, int imprimir)
        {
            NutricionDALTableAdapters.H2_Nutricion_Total_de_Comidas_Diarias_ImprimirTableAdapter adapter = new NutricionDALTableAdapters.H2_Nutricion_Total_de_Comidas_Diarias_ImprimirTableAdapter();
            NutricionDAL.H2_Nutricion_Total_de_Comidas_Diarias_ImprimirDataTable aTable = new NutricionDAL.H2_Nutricion_Total_de_Comidas_Diarias_ImprimirDataTable();

            aTable = adapter.GetData(Convert.ToDateTime(fecha), imprimir);
            List<nutricionTotalDiarias> lista = new List<nutricionTotalDiarias>();

            foreach(NutricionDAL.H2_Nutricion_Total_de_Comidas_Diarias_ImprimirRow row in aTable.Rows){
            nutricionTotalDiarias comida = new nutricionTotalDiarias();
            comida.tipoNombre = row.tipo;
            comida.personalComedor = row.personal_comedor;
            comida.ambulatorio = row.ambulatorio;
            comida.medicos = row.medicos;
            comida.dietasEspeciales = row.dietas_especiales;
            comida.existe = row.existe;           
            lista.Add(comida);
            }
            return lista;   
        }

        public int Nutricion_Pedido_De_Catering_Guardar_Editar(List<itemCatering> lista)
        {

            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();
            object obj = null;
            foreach (itemCatering item in lista)
            {
                obj = adapter.H2_Nutricion_Pedido_De_Catering_Guardar_Editar(item.id,item.dietaId,item.dieta,item.cantidad,Convert.ToDateTime(item.fecha));
            }

            if (obj != null)
                return Convert.ToInt32(obj);
            else return -1;
        }

        public int Nutricion_Pedido_De_catering_Borrar(string fecha)
        {
            NutricionDALTableAdapters.QueriesTableAdapter adapter = new NutricionDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Nutricion_Pedido_Catering_Borrar(Convert.ToDateTime(fecha));

            if (obj != null)
                return Convert.ToInt32(obj);
            else return -1;
        }

        public List<itemCatering> Nutricion_Pedido_Catering_Traer_Menus()
        {
            NutricionDALTableAdapters.H2_Nutricion_Pedido_Catering_Traer_MenusTableAdapter adapter = new NutricionDALTableAdapters.H2_Nutricion_Pedido_Catering_Traer_MenusTableAdapter();
            NutricionDAL.H2_Nutricion_Pedido_Catering_Traer_MenusDataTable aTable = new NutricionDAL.H2_Nutricion_Pedido_Catering_Traer_MenusDataTable();

            aTable = adapter.GetData();
            List<itemCatering> lista = new List<itemCatering>();

            foreach (NutricionDAL.H2_Nutricion_Pedido_Catering_Traer_MenusRow row in aTable.Rows)
            {
                itemCatering comida = new itemCatering();
                comida.dietaId = row.idDieta;
                comida.dieta = row.tipificacion;
                lista.Add(comida);
            }
            return lista;
        }

        public List<itemCatering> Nutricion_Pedido_De_Catering_Imprimir(string fecha, int imprimir)
        {
            NutricionDALTableAdapters.H2_Nutricion_Pedido_De_Catering_ImprimirTableAdapter adapter = new NutricionDALTableAdapters.H2_Nutricion_Pedido_De_Catering_ImprimirTableAdapter();
            NutricionDAL.H2_Nutricion_Pedido_De_Catering_ImprimirDataTable aTable = new NutricionDAL.H2_Nutricion_Pedido_De_Catering_ImprimirDataTable();

            aTable = adapter.GetData(Convert.ToDateTime(fecha), imprimir);
            List<itemCatering> lista = new List<itemCatering>();

            foreach (NutricionDAL.H2_Nutricion_Pedido_De_Catering_ImprimirRow row in aTable.Rows)
            {
                itemCatering comida = new itemCatering();
                comida.dietaId = row.cat_dieta;
                comida.dieta = row.cat_tipificacion;
                comida.cantidad = row.cat_cantidad;
                comida.fecha = row.fecha.ToShortDateString();
                comida.existe = row.existe;
                lista.Add(comida);
            }
            return lista;
        }
    }
}


