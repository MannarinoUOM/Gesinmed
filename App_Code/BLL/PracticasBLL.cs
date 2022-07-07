using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for PracticasBLL
/// </summary>
namespace Hospital
{
    public class PracticasBLL
    {
        public PracticasBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public practicaLista Lista_Practicas_Todas()
        {
            PracticasDALTableAdapters.Practica_List_CodigoTableAdapter adapter = new PracticasDALTableAdapters.Practica_List_CodigoTableAdapter();
            PracticasDAL.Practica_List_CodigoDataTable aTable = adapter.GetData(null, null);

            practicaLista Lista = new practicaLista();

            foreach (PracticasDAL.Practica_List_CodigoRow row in aTable.Rows)
            {
                practicas p = new practicas();
                if (!row.IsCodigoNull()) p.Codigo = row.Codigo;
                p.Practica = row.Descripcion;
                p.Id = row.Id;
                Lista.Add(p);
            }

            return Lista;
        }

        public practicaLista Lista_Practicas_by_Esp(int EspecialidadId)
        {
            PracticasDALTableAdapters.H2_PRACTICAS_BY_ESPECIALIDADTableAdapter adapter = new PracticasDALTableAdapters.H2_PRACTICAS_BY_ESPECIALIDADTableAdapter();
            PracticasDAL.H2_PRACTICAS_BY_ESPECIALIDADDataTable aTable = adapter.GetData(EspecialidadId);

            practicaLista Lista = new practicaLista();

            foreach (PracticasDAL.H2_PRACTICAS_BY_ESPECIALIDADRow row in aTable.Rows)
            {
                practicas p = new practicas();
                if (!row.IsCodigoNull()) p.Codigo = row.Codigo;
                p.Practica = row.Descripcion;
                p.Id = row.Id;
                Lista.Add(p);
            }

            return Lista;
        }

        public practicaLista Lista_Practicas_Facturacion_por_OS(int Codigo, int Id) //Excluye laboratorio y todo lo que no esta valorizado
        {
            PracticasDALTableAdapters.Practica_List_Codigo_FacturacionTableAdapter adapter = new PracticasDALTableAdapters.Practica_List_Codigo_FacturacionTableAdapter();
            PracticasDAL.Practica_List_Codigo_FacturacionDataTable aTable = adapter.GetData(Codigo,Id);

            practicaLista Lista = new practicaLista();

            foreach (PracticasDAL.Practica_List_Codigo_FacturacionRow row in aTable.Rows)
            {
                practicas p = new practicas();
                if (!row.IsCodigoNull()) p.Codigo = row.Codigo;
                p.Practica = row.Descripcion;
                p.Id = row.Id;
                Lista.Add(p);
            }

            return Lista;
        }

        public int Practica_Codigo_Id(int Codigo)
        {
            PracticasDALTableAdapters.H2_Practica_codigo_idTableAdapter adapter = new PracticasDALTableAdapters.H2_Practica_codigo_idTableAdapter();
            PracticasDAL.H2_Practica_codigo_idDataTable aTable = adapter.GetData(Codigo);
            practicas p = new practicas();

            if (aTable.Rows.Count > 0)
            {
                p.Id = aTable[0].Id;
            }
            else
            {
                p.Id = 0;
            }

            return p.Id;
        }

        public List<practicas_edicion> Practica_Listar(string Descripcion, int? Codigo)
        {
            PracticasDALTableAdapters.QueriesTableAdapter Qadapter = new PracticasDALTableAdapters.QueriesTableAdapter();

            PracticasDALTableAdapters.H2_Practicas_ListarTableAdapter adapter = new PracticasDALTableAdapters.H2_Practicas_ListarTableAdapter();
            PracticasDAL.H2_Practicas_ListarDataTable aTable = adapter.GetData(Descripcion, Codigo);
            List<practicas_edicion> Lista = new List<practicas_edicion>();
            foreach (PracticasDAL.H2_Practicas_ListarRow row in aTable.Rows)
            {
                practicas_edicion p = new practicas_edicion();
                if (!row.IsCodigoNull()) p.Codigo = row.Codigo;
                p.Descripcion = row.Descripcion;
                if (!row.IsIsActiveNull())
                {
                    if (row.IsActive.Equals("A"))
                        p.Activa = "Activa";
                    else p.Activa = "No Activa";
                } 
                p.Id = row.Id;
                //try
                //{
                //    p.PF = (string.Format("{0:#,#.00}", Qadapter.H2_Practica_PrecioFacturado(p.Id))).Replace(",", ".");
                //    if (p.PF == "") p.PF = "0";
                //}
                //catch
                //{
                //    p.PF = "0";
                //}

                //try
                //{
                //    p.PG = (string.Format("{0:#,#.00}", Qadapter.H2_Practica_Precio_Guardia(p.Id))).Replace(",", ".");
                //    if (p.PG == "") p.PG = "0";
                //}
                //catch
                //{
                //    p.PG = "0";
                //}
                Lista.Add(p);
            }
            return Lista;
        }

        public List<practicas> Practica_Listar_Guardia()
        {
            PracticasDALTableAdapters.QueriesTableAdapter Qadapter = new PracticasDALTableAdapters.QueriesTableAdapter();

            PracticasDALTableAdapters.H2_BONOS_PRACTICAS_SOLO_GUARDIA_SNTableAdapter adapter = new PracticasDALTableAdapters.H2_BONOS_PRACTICAS_SOLO_GUARDIA_SNTableAdapter();
            PracticasDAL.H2_BONOS_PRACTICAS_SOLO_GUARDIA_SNDataTable aTable = adapter.GetData();
            List<practicas> Lista = new List<practicas>();
                foreach (PracticasDAL.H2_BONOS_PRACTICAS_SOLO_GUARDIA_SNRow row in aTable.Rows)
                {
                    practicas p = new practicas();
                    p.Codigo = (int)row.Codigo;
                    p.Id = (int)row.Codigo;
                    p.Practica = row.Descripcion;
                    Lista.Add(p);
                }
                return Lista;
         }
          

        public int Practica_Id_Codigo(int Id)
        {
            PracticasDALTableAdapters.H2_Practica_id_codigoTableAdapter adapter = new PracticasDALTableAdapters.H2_Practica_id_codigoTableAdapter();
            PracticasDAL.H2_Practica_id_codigoDataTable aTable = adapter.GetData(Id);
            practicas p = new practicas();

            if (aTable.Rows.Count > 0)
            {
                p.Id = aTable[0].Codigo;
            }
            else
            {
                p.Id = 0;
            }

            return p.Id;
        }

        public int Practica_Guardar(int? id, string Descripcion, int? Codigo, decimal Precio, string Usuario, decimal Precio_Guardia, int Estado)
        {
            string Est = "F";
            if (Estado == 1) Est = "A";
            if (Estado == 0) Est = "F";

            try
            {
                PracticasDALTableAdapters.QueriesTableAdapter adapter = new PracticasDALTableAdapters.QueriesTableAdapter();
                adapter.H2_Practica_Guardar(id, Descripcion, Codigo, Est);
                adapter.H2_Practica_Guardar_Precio(id, Precio, Usuario, Precio_Guardia);
                return 1;
            }
            catch(Exception e)
            {
                throw new Exception();
				throw new Exception("Error al intentar agregar/modifcar una práctica, el código ingresado puede estar duplicado. \nPor favor informe el siguiente error a Sistemas: " +e.Message);
            }

        }

        public bool Practica_Existe(int Codigo)
        {
            PracticasDALTableAdapters.QueriesTableAdapter adapter = new PracticasDALTableAdapters.QueriesTableAdapter();
            object R = adapter.H2_Practica_Existe(Codigo);
            if (R != null) return true;
            return false;
        }


        public void Practica_Nueva(string Practica, int Codigo, decimal FE, decimal FG, string Usuario)
        {
            if (!Practica_Existe(Codigo))
            {
                PracticasDALTableAdapters.QueriesTableAdapter adapter = new PracticasDALTableAdapters.QueriesTableAdapter();
                adapter.H2_Practica_Nueva(Codigo, Practica);
                adapter.H2_Practica_Guardar_Precio(Codigo, FE, Usuario, FG);                

            }
            else
            {
                throw new Exception("Ya existe una práctica con el Codigo " + Codigo.ToString());
            }
        }





        public List<FactPracticasDetalles> Practica_Listar_Facturacion(string Descripcion, int? Codigo)
        {
            PracticasDALTableAdapters.QueriesTableAdapter Qadapter = new PracticasDALTableAdapters.QueriesTableAdapter();

            PracticasDALTableAdapters.H2_Practicas_ListarTableAdapter adapter = new PracticasDALTableAdapters.H2_Practicas_ListarTableAdapter();
            PracticasDAL.H2_Practicas_ListarDataTable aTable = adapter.GetData(Descripcion, Codigo);
            List<FactPracticasDetalles> Lista = new List<FactPracticasDetalles>();
            foreach (PracticasDAL.H2_Practicas_ListarRow row in aTable.Rows)
            {
                FactPracticasDetalles p = new FactPracticasDetalles();
                if (!row.IsCodigoNull()) p.Codigo = row.Codigo;
                if (!row.IscarenciasNull()) p.carenciaId = row.carencias.ToString();
                if (!row.IsCobraHonorarioNull()) p.cobraHono = row.CobraHonorario;
                if (!row.IscomplejidadNull()) p.complejidadId = row.complejidad.ToString();
                if (!row.IsIsActiveNull()) p.IsActive = row.IsActive;
                p.descripcion = row.Descripcion;
                if (!row.IsNoAfectaValorizacionGlobalNull()) { p.noafectavaloracionglobal = row.NoAfectaValorizacionGlobal; } else { p.noafectavaloracionglobal = false; }
                if (!row.IsSeFacturoOSNull()) { p.SFOS = row.SeFacturoOS; } else { p.SFOS = false; }
                if (!row.IsSugerenciaNull()) { p.sugerenciasId = row.Sugerencia.ToString(); }
                else p.sugerenciasId = "0";
                if (!row.IsTopeAnualNull()) { p.topeAnual = row.TopeAnual.ToString(); }
                else p.topeAnual = "0";
                if (!row.IsTopeMensualNull()) { p.topeMensual = row.TopeMensual.ToString(); }
                else p.topeMensual = "0";
                Lista.Add(p);
            }
            return Lista;
        }



        public FactPracticasDetalles FacPrecioPractica(int Id)
        { 
            FacturacionDALTableAdapters.H2_Fac_Practica_PreciosTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fac_Practica_PreciosTableAdapter();
            FacturacionDAL.H2_Fac_Practica_PreciosDataTable aTable = adapter.GetData(Id);
            FactPracticasDetalles p = new FactPracticasDetalles();
            if (aTable.Rows.Count > 0)
            {
                if (!aTable[0].IscobraporHonorarioNull()) { p.cobraHono = aTable[0].cobraporHonorario; } else { p.cobraHono = false; };
                if (!aTable[0].IssefacturaOSNull()) { p.SFOS = aTable[0].sefacturaOS; } else { p.SFOS = false; };
                if (!aTable[0].Isprecio_valorNull()) { p.valornomenclador = string.Format("{0:#,#0.00}", aTable[0].precio_facturado); } else { p.valornomenclador = "0,00"; };
                if (!aTable[0].Isprecio_guardiaNull()) { p.valorguardia = string.Format("{0:#,#0.00}", aTable[0].precio_guardia); } else { p.valorguardia = "0,00"; };
                if (!aTable[0].Isprecio_gastosNull()) { p.valorgastos = string.Format("{0:#,#0.00}", aTable[0].precio_gastos); } else { p.valorgastos = "0,00"; };
                if (!aTable[0].Isprecio_honorarioNull()) { p.valorhonorarios = string.Format("{0:#,#0.00}", aTable[0].precio_honorario); } else { p.valorhonorarios = "0,00"; };
            }
            else
            { 
            p.cobraHono = false;
            p.SFOS = false;
            p.valornomenclador = "0.00";
            p.valorguardia = "0.00";
            p.valorgastos = "0.00";
            p.valorhonorarios = "0.00";
            }
            return p;
        }

        public FactPracticasDetalles FacPrecioPracticaNN(string Id)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object Obj = adapter.H2_FACT_VALORPRACTICA_NN(Id);
            FactPracticasDetalles p = new FactPracticasDetalles();
            if (Obj != null)
                p.valornomenclador = Obj.ToString();
            else
                p.valornomenclador = "0.00";
            return p;
        }


        //Esto es para listar las prácticas de Imagenes
        public List<IMG_Practicas> Imagenes_ListarPracticas(long PracticaId, long Especialidad) {
            List<IMG_Practicas> lista = new List<IMG_Practicas>();
            PracticasDALTableAdapters.H2_IMAGENES_PRACTICAS_LISTARTableAdapter adapter = new PracticasDALTableAdapters.H2_IMAGENES_PRACTICAS_LISTARTableAdapter();
            PracticasDAL.H2_IMAGENES_PRACTICAS_LISTARDataTable aTable = adapter.GetData(PracticaId, Especialidad);
            foreach (PracticasDAL.H2_IMAGENES_PRACTICAS_LISTARRow row in aTable)
            {
                IMG_Practicas practica = new IMG_Practicas();
                if (!row.IsCodigoNull()) practica.PracticaCodigo = row.Codigo;
                if (!row.IsDuracionNull()) practica.PracticaDuracion = row.Duracion;
                if (!row.IsIMG_IND_INDICACIONNull()) practica.Indicacion = row.IMG_IND_INDICACION; else practica.Indicacion = "";
                if (!row.IsIAP_ABREVIACIONNull()) practica.Abreviacion = row.IAP_ABREVIACION; else practica.Abreviacion = "";
                if (!row.IsSeInformaNull()) { if (row.SeInforma == 1) practica.SeInforma = true; else practica.SeInforma = false; } else practica.SeInforma = false;
                practica.PracticaId = row.Id;
                practica.PracticaNombre = row.Practica;
                lista.Add(practica);
            }
            return lista;
        }


    }
}