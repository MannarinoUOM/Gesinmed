using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Descripción breve de reportesCompras
/// </summary>


namespace Hospital
{
    public class reportesComprasBLL
    {
        public reportesComprasBLL()
        {
            //
            // TODO: Agregar aquí la lógica del constructor
            //
        }

        public List<itemCombo> Reportes_Compras_Traer_Patologias()
        {

            ReportesComprasTableAdapters.H2_Reportes_Compras_Traer_PatologiasTableAdapter adapter = new ReportesComprasTableAdapters.H2_Reportes_Compras_Traer_PatologiasTableAdapter();
            ReportesCompras.H2_Reportes_Compras_Traer_PatologiasDataTable aTable = adapter.GetData();

            List<itemCombo> list = new List<itemCombo>();
            foreach (ReportesCompras.H2_Reportes_Compras_Traer_PatologiasRow row in aTable.Rows)
            {
                itemCombo item = new itemCombo();

                item.id = row.id;
                item.descripcion = row.Descripcion;
                list.Add(item);
            }

            return list;
        }

        public List<itemCombo> Reportes_Compras_Traer_Insumos()
        {

            ReportesComprasTableAdapters.H2_Reportes_Compras_Traer_InsumosTableAdapter adapter = new ReportesComprasTableAdapters.H2_Reportes_Compras_Traer_InsumosTableAdapter();
            ReportesCompras.H2_Reportes_Compras_Traer_InsumosDataTable aTable = adapter.GetData();

            List<itemCombo> list = new List<itemCombo>();
            foreach (ReportesCompras.H2_Reportes_Compras_Traer_InsumosRow row in aTable.Rows)
            {
                itemCombo item = new itemCombo();

                item.id = row.id;
                item.descripcion = row.descripcion;
                list.Add(item);
            }

            return list;
        }

        public List<reporteCABA> ReporteAmbulatorioCABANuevo(string desde,string hasta, string afiliado ,int dni, int nhc, int seccional, int pedido, string insumo, int pocentaje, string gastoUOM, int remito )
        {
            ComprasDALTableAdapters.H2_Reporte_Ambulatorio_CABA_NuevoTableAdapter adapter = new ComprasDALTableAdapters.H2_Reporte_Ambulatorio_CABA_NuevoTableAdapter();
            ComprasDAL.H2_Reporte_Ambulatorio_CABA_NuevoDataTable aTable = adapter.GetData(desde,hasta, afiliado , dni, nhc, seccional, pedido, insumo, pocentaje, gastoUOM, remito );

            List<reporteCABA> list = new List<reporteCABA>();
            foreach (ComprasDAL.H2_Reporte_Ambulatorio_CABA_NuevoRow row in aTable.Rows)
            {
                reporteCABA item = new reporteCABA();

                
                item.fechaPedido = row.FechaPedido.ToShortDateString();
                item.afiliado = row.Paciente;
                item.dni = row.Documento;
                item.nhc = row.NHC;
                if (!row.IsSeccionalNull()) { item.seccional = row.Seccional; }
                item.pedido = row.NroPedido;
               
                item.insumo = row.Insumo;
                item.cantidadPedida = row.Cantidad_Pedida;
                item.pocentaje = row.Porcentaje_Audit;
                if (!row.IsCantidad_EntregadaNull()) { item.cantidadEntregada = row.Cantidad_Entregada; }
                if (!row.IsNroRemitoNull()) { item.remito = row.NroRemito; }
                item.saldo = row.Cantidad_Pedida - row.Cantidad_Entregada;
                item.deposito = row.Deposito;
                if (!row.IsGastoUOMNull()) { item.gatoUOM = row.GastoUOM; }
                
                list.Add(item);
            }

            return list;
        }

        public List<reporteGastosAdministraciónInternación> GastosAdministraciónInternacion(string desde, string hasta, int proveedor,  string tipoOrden, int nroOrden,string insumo,string remito,string factura)
        {
            ReportesComprasTableAdapters.H2_Gastos_de_Administración_e_InternacionTableAdapter adapter = new ReportesComprasTableAdapters.H2_Gastos_de_Administración_e_InternacionTableAdapter();
            ReportesCompras.H2_Gastos_de_Administración_e_InternacionDataTable aTable = adapter.GetData(desde,hasta,proveedor,tipoOrden,nroOrden,insumo,remito,factura);


            List<reporteGastosAdministraciónInternación> list = new List<reporteGastosAdministraciónInternación>();
            foreach (ReportesCompras.H2_Gastos_de_Administración_e_InternacionRow row in aTable.Rows)
            {
                reporteGastosAdministraciónInternación item = new reporteGastosAdministraciónInternación();


                item.FECHA = row.FECHA.ToShortDateString();
                item.INSUMO = row.COM_ADM_INS_PEDIR_INS_NOM;
                item.PROVEEDOR = row.PRV_NOMBRE;
                item.PRECIO = row.RED_PRECIO;
                item.PEDIDA = row.PEDIDA;
                item.RECIBIDA = row.RECIBIDA;
                item.PENDIENTE = row.CANTIDAD_PENDIENTE;
                item.TIPO_ORDEN = row.TIPO_ORDEN;
                item.NUMERO_ORDEN_COMPRA = row.REM_I_NUMERO_ORDEN_COMPRA;
                item.REMITO = row.REMITO;
                item.FACTURA = row.FACTURA; 

                list.Add(item);
            }

            return list;
        }

    }
}