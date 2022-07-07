using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for MensajesBLL
/// </summary>
namespace Hospital
{
    public class MensajesBLL
    {
        public MensajesBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        //public void MensajeLeido(int Usuario, int Numero)
        //{
        //    ConfirmarAtencionDALTableAdapters.QueriesTableAdapter adapter = new ConfirmarAtencionDALTableAdapters.QueriesTableAdapter();
        //    adapter.H2_AfiliadoTurno_Confirmar(medicoId, especialidadId, fecha);
        //}

        public mensajes LeerMensaje(int Usuario, int Numero)
        {
            MensajesDALTableAdapters.H2_Mensajes_LeerTableAdapter adapter = new MensajesDALTableAdapters.H2_Mensajes_LeerTableAdapter();
            MensajesDAL.H2_Mensajes_LeerDataTable aTable = adapter.GetData(Usuario, Numero);

            mensajes m = new mensajes();
            if (aTable.Rows.Count > 0)
            {
            
                if (!aTable[0].IsencabezadoNull()) { m.encabezado = aTable[0].encabezado; }
                if (!aTable[0].IsNumeroNull()) { m.numero = aTable[0].Numero.ToString(); }
                if (!aTable[0].IsMensajeNull()) { m.mensaje = aTable[0].Mensaje; }

            }

            return m;

        }


        public mensajes LeerMensajeSinLeer(int Usuario)
        {
            MensajesDALTableAdapters.H2_Mensaje_Ultimo_Sin_LeerTableAdapter adapter = new MensajesDALTableAdapters.H2_Mensaje_Ultimo_Sin_LeerTableAdapter();
            MensajesDAL.H2_Mensaje_Ultimo_Sin_LeerDataTable aTable = adapter.GetData(Usuario);

            mensajes m = new mensajes();
            if (aTable.Rows.Count > 0)
            {

                if (!aTable[0].IsencabezadoNull()) { m.encabezado = aTable[0].encabezado; }
                if (!aTable[0].IsNumeroNull()) { m.numero = aTable[0].Numero.ToString(); }
                if (!aTable[0].IsMensajeNull()) { m.mensaje = aTable[0].Mensaje; }
                if (!aTable[0].IsEnviadoPorNull()) { m.UsuarioEnviado = aTable[0].EnviadoPor; }
                if (!aTable[0].IsrespuestaNull()) { m.respuesta = aTable[0].respuesta; }
                if (!aTable[0].IsimporanteNull()) { m.importante = aTable[0].imporante; }    
            }

            return m;

        }

        public void MensajeLeido(int Usuario, int Numero)
        {
            MensajesDALTableAdapters.QueriesTableAdapter adapter = new MensajesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Mensaje_Leido(Usuario, Numero);
        }

        public void MensajeResponder(int Usuario, int Numero, string Respuesta)
        {
            MensajesDALTableAdapters.QueriesTableAdapter adapter = new MensajesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Mensaje_Responder(Usuario, Numero, Respuesta);
        }

        public int PedidosPendientesCount()
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_FARMACIA_PEDIDOSPENDIENTES();
            return Convert.ToInt32(Id.ToString());
        }

        public void MensajeEnviar(string Mensaje, int GrupoId, string Encabezado, string EnviadoPor)
        {
            try
            {
                Mensaje += "<br><a href='javascript:CerrarNotiBoxContenedor();'>Cerrar Mensaje</a>";
                MensajesDALTableAdapters.QueriesTableAdapter adapter = new MensajesDALTableAdapters.QueriesTableAdapter();
                adapter.H2_MENSAJES_ENVIAR(Mensaje, GrupoId, Encabezado, EnviadoPor);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}