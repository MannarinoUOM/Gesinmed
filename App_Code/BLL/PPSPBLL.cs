using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;    

/// <summary>
/// Descripción breve de PPSP
/// </summary>
/// 
namespace Hospital
{
    public class PPSPBLL
    {
        public PPSPBLL()
        {
            //
            // TODO: Agregar aquí la lógica del constructor
            //
        }

        public List<Farmacia_Rubros> Traer_Rubros_Combo(long servicioId) 
        {
            PPSP_DALTableAdapters.H2_Farmacia_Traer_Rubros_ComboTableAdapter adapter = new PPSP_DALTableAdapters.H2_Farmacia_Traer_Rubros_ComboTableAdapter();
            PPSP_DAL.H2_Farmacia_Traer_Rubros_ComboDataTable tabla = new PPSP_DAL.H2_Farmacia_Traer_Rubros_ComboDataTable();

            List<Farmacia_Rubros> lista = new List<Farmacia_Rubros>();
            tabla = adapter.GetData(servicioId);
            foreach (PPSP_DAL.H2_Farmacia_Traer_Rubros_ComboRow row in tabla.Rows) {
                Farmacia_Rubros item = new Farmacia_Rubros();
                item.id = row.RUS_ID;
                item.descripcion = row.RUS_DESCRIPCION;
                item.servicioId = row.RUS_SERV_ID;
                lista.Add(item);
            }
            return lista;
        }

        public List<Farmacia_Insumo> Traer_Plantilla(long servicioId, int rubroId)
        {
            PPSP_DALTableAdapters.H2_Farmacia_Traer_Plantilla_PPSTableAdapter adapter = new PPSP_DALTableAdapters.H2_Farmacia_Traer_Plantilla_PPSTableAdapter();
            PPSP_DAL.H2_Farmacia_Traer_Plantilla_PPSDataTable tabla = new PPSP_DAL.H2_Farmacia_Traer_Plantilla_PPSDataTable();

            List<Farmacia_Insumo> lista = new List<Farmacia_Insumo>();
            tabla = adapter.GetData(servicioId,rubroId);
            foreach (PPSP_DAL.H2_Farmacia_Traer_Plantilla_PPSRow row in tabla.Rows)
            {
                Farmacia_Insumo item = new Farmacia_Insumo();
                item.idPlantilla = row.id;
                item.insumoId = row.idInsumo;
                item.pedido = 0;
                item.stock_actual = 0;
                string gramaje;
                if (!row.IsREM_GRAMAJENull()) { gramaje = row.REM_GRAMAJE; } else { gramaje = ""; }
                string medida;
                if (!row.IsmedidaNull()) { medida = row.medida; } else { medida = ""; }
                string presentacion;
                if (!row.IsPresentacionNull()) { presentacion = row.Presentacion; } else { presentacion = ""; }


                item.servicio = row.servicio + " - " + gramaje + row.medida + " - " + row.Presentacion;
                
                if (!row.Isstock_minimoNull())
                    item.stock_minimo = row.stock_minimo;
                else item.stock_minimo = 0;
                lista.Add(item);
            }
            return lista;
        }

        public long Guardar_Actualizar_Borrar_Plantilla(Farmacia_Insumo insumo, int qHace)
        {
            PPSP_DALTableAdapters.QueriesTableAdapter adapter = new PPSP_DALTableAdapters.QueriesTableAdapter();

            object obj = adapter.H2_Farmacia_Guardar_Actualizar_Borrar_Plantilla_PPSP(qHace,insumo.idPlantilla,insumo.insumoId,insumo.servicioId,insumo.stock_minimo,insumo.ruboId);
            if (obj != null) return Convert.ToInt64(obj.ToString());
            else throw new Exception("Error al generar bono cabecera.");
        }

        public void Insert_PPS_Det(Farmacia_Insumo f)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            //decimal _precio;
            //if (!decimal.TryParse(f.Precio.ToString(), out _precio)) _precio = 0;
            //int _deposito;
            //if (!int.TryParse(f.Deposito_Id.ToString(), out _deposito)) _deposito = 0;
            adapter.H2_INSERT_PEDIDOS_SERV_DET(f.id, f.insumoId, f.cantidad, 1, f.usuarioId, 0);
        }
        public void Update_UsuarioModifica(int Tipo, int Id, long Usuario_Modifica)
        {
            FarmaciaDALTableAdapters.QueriesTableAdapter adapter = new FarmaciaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FARMACIA_UPDATE_USUARIO_MODIFICA(Tipo, Id, Usuario_Modifica); //Tipo Pedido: 1(PPP,PPS), 2 (IM)
        }

    }
}