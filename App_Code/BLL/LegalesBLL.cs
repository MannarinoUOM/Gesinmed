using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Descripción breve de LegalesBLL
/// </summary>
namespace Hospital
{
    public class LegalesBLL
    {
        public LegalesBLL()
        {
            //
            // TODO: Agregar aquí la lógica del constructor
            //
        }

        public long Legales_Cabecera_Insert (Legales_Cabecera o)
        {
            LegalesDALTableAdapters.QueriesTableAdapter adapter = new LegalesDALTableAdapters.QueriesTableAdapter();
            try
            {
                object obj = adapter.H2_LEGALES_CABECERA_INSERT(o.IdReq, o.AfiliadoId,DateTime.Parse(o.Fecha), o.NHC_UOM, o.Afiliado_Nombre, o.Es_UOM, o.IdReqTipo, o.UsuarioId, o.Baja);
                return Convert.ToInt64(obj.ToString());
            }
            catch (SqlException ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public void Legales_Detalle_Insert(Legales_Detalle o)
        {
            LegalesDALTableAdapters.QueriesTableAdapter adapter = new LegalesDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_LEGALES_DETALLE_INSERT(o.IdReq, o.IdDetalle, o.PedidoPor, o.NroNota, o.EsSecuestro, o.Observaciones,o.EsObito,o.EsART);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Legales_Adjunto_Insert(Legales_Adjuntos adjunto)
        {
            LegalesDALTableAdapters.QueriesTableAdapter adapter = new LegalesDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_Legales_Adjuntos_Insert(adjunto.IdDetalle, adjunto.IdReq, adjunto.RutaArchivo, adjunto.Estado);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Legales_Cabecera Legales_List_Cabecera(long IdReq)
        {
            Legales_Cabecera o = new Legales_Cabecera();
            LegalesDALTableAdapters.H2_LEGALES_LIST_REQTableAdapter adapter = new LegalesDALTableAdapters.H2_LEGALES_LIST_REQTableAdapter();
            LegalesDAL.H2_LEGALES_LIST_REQDataTable aTable = adapter.GetData(IdReq, string.Empty, string.Empty, 0, string.Empty, 0, 
                DateTime.Parse("01/01/1900"), DateTime.Parse("01/01/1900"), false, string.Empty,false,false);
            foreach (LegalesDAL.H2_LEGALES_LIST_REQRow row in aTable.Rows)
            {
                o.Afiliado_Nombre = row.Afiliado_Nombre;
                o.AfiliadoId = row.AfiliadoId;
                o.Baja = row.Baja;
                o.Es_UOM = row.Es_UOM;
                o.Fecha = row.Fecha.ToShortDateString();
                o.IdReq = row.IdReq;
                o.IdReqTipo = row.IdReqTipo;
                o.NHC_UOM = row.NHC_UOM;
                o.UsuarioId = row.UsuarioId;
            }
            return o;
        }

        public List<Legales_Buscar_Req> Legales_List_Cabecera(string NHC, long NroDoc, string Paciente, string NroNota, int TipoReq, string PedidoPor, 
            string Desde, string Hasta, bool EsSecuestro, bool EsObito, bool EsART)
        {
            List<Legales_Buscar_Req> list = new List<Legales_Buscar_Req>();
            LegalesDALTableAdapters.H2_LEGALES_LIST_REQTableAdapter adapter = new LegalesDALTableAdapters.H2_LEGALES_LIST_REQTableAdapter();
            LegalesDAL.H2_LEGALES_LIST_REQDataTable aTable = adapter.GetData(0, NHC, Paciente, NroDoc, NroNota, TipoReq, DateTime.Parse(Desde), DateTime.Parse(Hasta), 
            EsSecuestro,PedidoPor,EsObito,EsART);
            foreach (LegalesDAL.H2_LEGALES_LIST_REQRow row in aTable.Rows)
            {
                Legales_Buscar_Req o = new Legales_Buscar_Req();
                o.Afiliado_Nombre = row.Afiliado_Nombre;
                o.Fecha = row.Fecha.ToShortDateString();
                o.IdReq = row.IdReq;
                o.Requerimiento = row.Requerimiento;
                o.NHC_UOM = row.NHC_UOM;
                o.PedidoPor = row.PedidoPor;
                o.NroNota = row.NroNota;
                list.Add(o);
            }
            return list;
        }

        public Legales_Detalle Legales_List_Detalles(long IdReq)
        {
            //List<Legales_Detalle> list = new List<Legales_Detalle>();
            Legales_Detalle o = new Legales_Detalle();
            LegalesDALTableAdapters.H2_LEGALES_DETALLES_LIST_IDREQTableAdapter adapter = new LegalesDALTableAdapters.H2_LEGALES_DETALLES_LIST_IDREQTableAdapter();
            LegalesDAL.H2_LEGALES_DETALLES_LIST_IDREQDataTable aTable = adapter.GetData(IdReq);
            foreach (LegalesDAL.H2_LEGALES_DETALLES_LIST_IDREQRow row in aTable.Rows)
            {
                
                o.EsSecuestro = row.EsSecuestro;
                o.IdDetalle = row.IdDetalle;
                o.IdReq = row.IdReq;
                if (!row.IsNroNotaNull()) o.NroNota = row.NroNota;
                else o.NroNota = string.Empty;
                if (!row.IsObservacionesNull()) o.Observaciones = row.Observaciones;
                else o.Observaciones = string.Empty;
                o.PedidoPor = row.PedidoPor;
                o.EsART = row.EsART;
                o.EsObito = row.EsObito;
                //list.Add(o);
            }
            return o;
        }

        public List<Legales_TipoRequerimiento> Tipo_Requerimiento_List(bool Todos)
        { 
            List<Legales_TipoRequerimiento> list = new List<Legales_TipoRequerimiento>();
            LegalesDALTableAdapters.H2_LEGALES_TIPOREQ_LISTTableAdapter adapter = new LegalesDALTableAdapters.H2_LEGALES_TIPOREQ_LISTTableAdapter();
            LegalesDAL.H2_LEGALES_TIPOREQ_LISTDataTable aTable = adapter.GetData(Todos);
            foreach (LegalesDAL.H2_LEGALES_TIPOREQ_LISTRow row in aTable.Rows)
            {
                Legales_TipoRequerimiento o = new Legales_TipoRequerimiento();
                o.Activo = row.Activo;
                o.IdReqTipo = row.IdReqTipo;
                o.Requerimiento = row.Requerimiento;
                list.Add(o);
            }
            return list;
        }

        public List<Legales_Adjuntos> Adjuntos_List(long IdReq)
        {
            LegalesDALTableAdapters.H2_LEGALES_ADJUNTOS_LISTTableAdapter adapter = new LegalesDALTableAdapters.H2_LEGALES_ADJUNTOS_LISTTableAdapter();
            LegalesDAL.H2_LEGALES_ADJUNTOS_LISTDataTable aTable = adapter.GetData(IdReq);
            List<Legales_Adjuntos> Lista = new List<Legales_Adjuntos>();
            foreach (LegalesDAL.H2_LEGALES_ADJUNTOS_LISTRow row in aTable.Rows)
            {
                Legales_Adjuntos adjunto = new Legales_Adjuntos();
                adjunto.IdDetalle = row.IdDetalle;
                adjunto.IdReq = row.IdReq;
                adjunto.RutaArchivo = row.RutaArchivo;
                adjunto.Estado = row.Estado;
                adjunto.FechaSistema = row.FechaSistema.ToString();
                Lista.Add(adjunto);
            }
            return Lista;
        }

        public List<documentacion> Legales_TipoDoc_List()
        {
            LegalesDALTableAdapters.H2_LEGALES_DOCU_LISTTableAdapter adapter = new LegalesDALTableAdapters.H2_LEGALES_DOCU_LISTTableAdapter();
            LegalesDAL.H2_LEGALES_DOCU_LISTDataTable aTable = adapter.GetData();
            List<documentacion> Lista = new List<documentacion>();
            foreach (LegalesDAL.H2_LEGALES_DOCU_LISTRow row in aTable.Rows)
            {
                documentacion d = new documentacion();
                d.descripcion = row.descri;
                d.id = row.id;
                Lista.Add(d);
            }
            return Lista;
        }

        public void BajaPedido(long idReq)
        {
            LegalesDALTableAdapters.QueriesTableAdapter adapter = new LegalesDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_Legales_BajaPedido(idReq);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void BajaAdjunto(long idArchivo)
        {
            LegalesDALTableAdapters.QueriesTableAdapter adapter = new LegalesDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_Legales_BajaAdjunto(idArchivo);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Imagenes_Obito_Insert(string afiliadoId, string NombreArchivo_Actual, int usuario)
        {
            LegalesDALTableAdapters.QueriesTableAdapter adapter = new LegalesDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_Insertar_IMG_Obito(Convert.ToInt64(afiliadoId), NombreArchivo_Actual, usuario);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Imagenes_Obito_Delete(long imgID, int usuario)
        {
            LegalesDALTableAdapters.QueriesTableAdapter adapter = new LegalesDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_Baja_IMG_Obito(imgID, usuario);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public List<ovbitos_IMG> Traer_IMG_Obitos(long afiliadoId)
        {
            LegalesDALTableAdapters.H2_Traer_IMG_ObitosTableAdapter adapter = new LegalesDALTableAdapters.H2_Traer_IMG_ObitosTableAdapter();
            LegalesDAL.H2_Traer_IMG_ObitosDataTable aTable = adapter.GetData(afiliadoId);
            List<ovbitos_IMG> Lista = new List<ovbitos_IMG>();
            foreach (LegalesDAL.H2_Traer_IMG_ObitosRow row in aTable.Rows)
            {
                ovbitos_IMG o = new ovbitos_IMG();
                o.idIMG = row.id;
                o.afiliadoId = row.afiliadoId;
                o.archivo = row.archivo;
                o.fecha = row.fecha.ToShortDateString();
                o.usuarioId = row.usuario;
                o.baja = row.baja;
                Lista.Add(o);
            }
            return Lista;
        }

    }
}