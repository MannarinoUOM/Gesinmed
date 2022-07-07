using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using System.IO;

/// <summary>
/// Summary description for HistoriaClinicaFacturacionBLL
/// </summary>

namespace Hospital
{
    public class HistoriaClinicaFacturacionBLL
    {
        public HistoriaClinicaFacturacionBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<labo_protocolos> Labo_Protocolos_Bacterio_by_Anio(string Doc, string Anio,string mes,string desde, string hasta)
        {
            long _PacienteID;
            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Protocolos_Bacterio_Laboratorio_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Protocolos_Bacterio_Laboratorio_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Protocolos_Bacterio_Laboratorio_FacturacionDataTable aTable = adapter.GetData(_PacienteID, int.Parse(Anio),int.Parse(mes) ,desde,hasta);
            List<labo_protocolos> protocolos = new List<labo_protocolos>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Protocolos_Bacterio_Laboratorio_FacturacionRow row in aTable)
            {
                labo_protocolos p = new labo_protocolos();
                p.archivo = row.Archivo;
                p.fecha = row.Archivo.Substring(31, 2) + "/" + row.Archivo.Substring(29, 2) + "/" + row.Anio.ToString();
                p.protocolo = row.Archivo.Substring(10, 10);
                p.ruta = "http://10.10.8.71/pdfs/" + row.Dire + "/" + row.Archivo;
                p.tipoorden = row.TipoOrden;
                p.complejidad = row.Complejidad;
                protocolos.Add(p);
            }
            return protocolos;
        }


        public List<otras> Otras_by_Anio(string Doc, string Anio,int Mes, int interno)
        {
            long _PacienteID;
            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaFacturacionDALTableAdapters.H2_Traer_Adjuntos_Externos_Todos_DatosTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Traer_Adjuntos_Externos_Todos_DatosTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Traer_Adjuntos_Externos_Todos_DatosDataTable aTable = adapter.GetData(_PacienteID, int.Parse(Anio),Mes,interno );
            List<otras> protocolos = new List<otras>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Traer_Adjuntos_Externos_Todos_DatosRow row in aTable)
            {
                otras p = new otras();
                p.id = row.id;
                //p.fecha = row.Archivo.Substring(31, 2) + "/" + row.Archivo.Substring(29, 2) + "/" + row.Anio.ToString();
                //p.protocolo = row.Archivo.Substring(10, 10);
                //p.ruta = "http://10.10.8.71/pdfs/" + row.Dire + "/" + row.Archivo;
                p.documentacion_tipo = row.documentacion_tipo;
                p.documentacion_autorizacion_id = row.documentacion_autorizacion_id;
                p.documentacion_archivo = row.documentacion_archivo;
                p.documentacion_fecha = row.documentacion_fecha.ToShortDateString();
                p.nombre = row.nombre;
                protocolos.Add(p);
            }
            return protocolos;
        }


        public List<otras> Inrernos_by_Anio(string Doc, string Anio, int? tipo, int? agrupado)
        {
            long _PacienteID;
            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaDALTableAdapters.H2_Traer_Adjuntos_Internos_Todos_AnoTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Traer_Adjuntos_Internos_Todos_AnoTableAdapter();
            HistoriaClinicaDAL.H2_Traer_Adjuntos_Internos_Todos_AnoDataTable aTable = adapter.GetData(_PacienteID, int.Parse(Anio), tipo, agrupado);
            List<otras> protocolos = new List<otras>();

            foreach (HistoriaClinicaDAL.H2_Traer_Adjuntos_Internos_Todos_AnoRow row in aTable)
            {
                otras p = new otras();
                p.id = row.id;
                //p.fecha = row.Archivo.Substring(31, 2) + "/" + row.Archivo.Substring(29, 2) + "/" + row.Anio.ToString();
                //p.protocolo = row.Archivo.Substring(10, 10);
                //p.ruta = "http://10.10.8.71/pdfs/" + row.Dire + "/" + row.Archivo;

                if (!row.Isdocumentacion_tipoNull()) { p.documentacion_tipo = row.documentacion_tipo; }
                if (!row.Isdocumentacion_autorizacion_idNull()) { p.documentacion_autorizacion_id = row.documentacion_autorizacion_id; }
                if (!row.Isdocumentacion_archivoNull()) { p.documentacion_archivo = row.documentacion_archivo; }
                if (!row.Isdocumentacion_fechaNull()) { p.documentacion_fecha = row.documentacion_fecha.ToShortDateString(); }
                p.nombre = row.nombre;
                protocolos.Add(p);
            }
            return protocolos;
        }


        public List<historiaclinica> HistoriaClinica(long NHC, DateTime FechaDesde, DateTime FechaHasta, string EspecialidadesId, bool Diabetologia, bool Internacion, bool Cirugia)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_TotalTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_TotalTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_TotalDataTable aTable = adapter.GetData(NHC, FechaDesde, FechaHasta, EspecialidadesId, Diabetologia, Internacion, Cirugia);
            List<historiaclinica> Lista = new List<historiaclinica>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_TotalRow row in aTable.Rows)
            {
                historiaclinica h = new historiaclinica();
                h.HClinica = row.HC;
                Lista.Add(h);
            }
            return Lista;

        }

        public List<lista_anios> Internaciones_Anios(long NHC,string desde,string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Internaciones_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Internaciones_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Internaciones_FacturacionDataTable aTable = adapter.GetData(NHC, desde, hasta);
            List<lista_anios> Lista = new List<lista_anios>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Internaciones_FacturacionRow row in aTable.Rows)
            {
                lista_anios i = new lista_anios();
                i.anio = row.Anio.ToString();
                Lista.Add(i);
            }
            return Lista;

        }

        public List<lista_anios> Recetas_Anios(long NHC,string desde , string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_RecetasFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_RecetasFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_RecetasFacturacionDataTable aTable = adapter.GetData(NHC,desde,hasta);
            List<lista_anios> Lista = new List<lista_anios>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_RecetasFacturacionRow row in aTable.Rows)
            {
                lista_anios i = new lista_anios();
                i.anio = row.Anio.ToString();
                Lista.Add(i);
            }
            return Lista;

        }

        public List<lista_anios> Guardia_Anios(long NHC,string desde,string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_GuardiaFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_GuardiaFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_GuardiaFacturacionDataTable aTable = adapter.GetData(NHC,desde,hasta);
            List<lista_anios> Lista = new List<lista_anios>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_GuardiaFacturacionRow row in aTable.Rows)
            {
                lista_anios i = new lista_anios();
                i.anio = row.Anio.ToString();
                Lista.Add(i);
            }
            return Lista;

        }

        //LABO
        public List<lista_anios> Labo_Anios(string Doc,string desde,string hasta)
        {
            long _PacienteID;
            List<lista_anios> list_anios = new List<lista_anios>();

            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_LaboratorioFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_LaboratorioFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Anio_LaboratorioFacturacionDataTable aTable = adapter.GetData(_PacienteID,desde,hasta);
            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Anio_LaboratorioFacturacionRow row in aTable.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row.Anio.ToString();
                list_anios.Add(a);
            }
            return list_anios;
        }

        //LABO BACTERIO
        public List<lista_anios> LaboBacterio_Anios(string Doc, string desde, string hasta)
        {
            long _PacienteID;
            List<lista_anios> list_anios = new List<lista_anios>();

            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_LaboratorioBacterioFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_LaboratorioBacterioFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Anio_LaboratorioBacterioFacturacionDataTable aTable = adapter.GetData(_PacienteID, desde, hasta);
            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Anio_LaboratorioBacterioFacturacionRow row in aTable.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row.Anio.ToString();
                list_anios.Add(a);
            }
            return list_anios;
        }

        //odonto

        public List<lista_anios> Odonto_Anios(string Doc,string desde,string hasta)
        {
            long _PacienteID;
            List<lista_anios> list_anios = new List<lista_anios>();

            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_OdontoFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_OdontoFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Anio_OdontoFacturacionDataTable aTable = adapter.GetData(_PacienteID,desde,hasta);
            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Anio_OdontoFacturacionRow row in aTable.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row.anio.ToString();
                list_anios.Add(a);
            }
            return list_anios;
        }

        //odonto


        //otras instituciones

        public List<lista_anios> Otras_Anios(string Doc,string desde, string hasta)
        {
            long _PacienteID;
            List<lista_anios> list_anios = new List<lista_anios>();

            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_Otras_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_Otras_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Anio_Otras_FacturacionDataTable aTable = adapter.GetData(_PacienteID, desde, hasta);
            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Anio_Otras_FacturacionRow row in aTable.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row.anio.ToString();
                list_anios.Add(a);
            }
            return list_anios;
        }

        //otras instituciones


        public List<labo_protocolos> Labo_Protocolos_by_Anio(string Doc, string Anio,string mes,string desde,string hasta)
        {
            long _PacienteID;
            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Protocolos_LaboratorioFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Protocolos_LaboratorioFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Protocolos_LaboratorioFacturacionDataTable aTable = adapter.GetData(int.Parse(mes),_PacienteID, int.Parse(Anio), desde,hasta);
            List<labo_protocolos> protocolos = new List<labo_protocolos>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Protocolos_LaboratorioFacturacionRow row in aTable)
            {
                labo_protocolos p = new labo_protocolos();
                p.archivo = row.Archivo;
                p.fecha = row.Archivo.Substring(31, 2) + "/" + row.Archivo.Substring(29, 2) + "/" + row.Anio.ToString();
                p.protocolo = row.Archivo.Substring(10, 10);
                p.ruta = "http://10.10.8.71/pdfs/" + row.Dire + "/" + row.Archivo;
                p.tipoorden = row.TipoOrden;
                p.complejidad = row.Complejidad;
                protocolos.Add(p);
            }
            return protocolos;
        }

        public List<lista_anios> Interconsultas_Anios(string NHC,string desde,string hasta)
        {
            long _PacienteID;
            List<lista_anios> list_anios = new List<lista_anios>();
            if (!long.TryParse(NHC, out _PacienteID)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Interconsulta_Anios_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Interconsulta_Anios_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Interconsulta_Anios_FacturacionDataTable aTable = adapter.GetData(_PacienteID,desde,hasta);
            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Interconsulta_Anios_FacturacionRow row in aTable.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row.Anio.ToString();
                list_anios.Add(a);
            }
            return list_anios;
        }


        public List<lista_anios> AnatomiaPatologica_Anios(string Soc_Id,string desde,string hasta)
        {
            int _Soc_Id;
            List<lista_anios> list_anios = new List<lista_anios>();
            if (!int.TryParse(Soc_Id, out _Soc_Id)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaFacturacionDALTableAdapters.Axion_Historia_Clinica_Anio_AnatomiaPatologicaFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.Axion_Historia_Clinica_Anio_AnatomiaPatologicaFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.Axion_Historia_Clinica_Anio_AnatomiaPatologicaFacturacionDataTable aTable = adapter.GetData(_Soc_Id, desde, hasta);
            foreach (HistoriaClinicaFacturacionDAL.Axion_Historia_Clinica_Anio_AnatomiaPatologicaFacturacionRow row in aTable.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row.Anio.ToString();
                list_anios.Add(a);
            }
            return list_anios;
        }

        public List<lista_anios> Imagenes_Anios_ORIGINAL(string Soc_Id, string PacienteId,string desde,string hasta)
        {
            int _Soc_Id;
            List<lista_anios> list_anios = new List<lista_anios>();
            if (Soc_Id != "")
            {
                if (!int.TryParse(Soc_Id, out _Soc_Id)) throw new Exception("Error en Paciente ID.");

                HistoriaClinicaFacturacionDALTableAdapters.Axion_Historia_Clinica_Anio_ImagenesFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.Axion_Historia_Clinica_Anio_ImagenesFacturacionTableAdapter();
                HistoriaClinicaFacturacionDAL.Axion_Historia_Clinica_Anio_ImagenesFacturacionDataTable aTable = adapter.GetData(Convert.ToInt64(Soc_Id),desde,hasta);
                foreach (HistoriaClinicaFacturacionDAL.Axion_Historia_Clinica_Anio_ImagenesFacturacionRow row in aTable.Rows)
                {
                    lista_anios a = new lista_anios();
                    a.anio = row.Anio.ToString();
                    list_anios.Add(a);
                }
            }

            HistoriaClinicaFacturacionDALTableAdapters._71_GesInMed_Historia_Clinica_Anio_ImagenesFacrturacionTableAdapter adapter_img = new HistoriaClinicaFacturacionDALTableAdapters._71_GesInMed_Historia_Clinica_Anio_ImagenesFacrturacionTableAdapter();
            HistoriaClinicaFacturacionDAL._71_GesInMed_Historia_Clinica_Anio_ImagenesFacrturacionDataTable aTable_img = adapter_img.GetData(desde,hasta,Convert.ToInt64(Soc_Id));
            foreach (HistoriaClinicaFacturacionDAL._71_GesInMed_Historia_Clinica_Anio_ImagenesFacrturacionRow row_img in aTable_img.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row_img.Anio.ToString();
                bool esta = false;
                foreach (lista_anios anios in list_anios)
                {
                    if (int.Parse(anios.anio) == int.Parse(a.anio))
                    {
                        esta = true;
                    }
                }
                if (!esta)
                {
                    list_anios.Add(a);
                }
            }

            list_anios.OrderByDescending(p => p.anio).ToList();
            return list_anios;
        }





        public List<lista_anios> Imagenes_Anios(string Soc_Id, string PacienteId,string desde,string hasta)
        {
            int _Soc_Id;
            List<lista_anios> list_anios = new List<lista_anios>();
            if (Soc_Id != "")
            {
                if (!int.TryParse(Soc_Id, out _Soc_Id)) throw new Exception("Error en Paciente ID.");

                HistoriaClinicaFacturacionDALTableAdapters.Axion_Historia_Clinica_Anio_ImagenesFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.Axion_Historia_Clinica_Anio_ImagenesFacturacionTableAdapter();
                HistoriaClinicaFacturacionDAL.Axion_Historia_Clinica_Anio_ImagenesFacturacionDataTable aTable = adapter.GetData(Convert.ToInt64(Soc_Id), desde,hasta);
                foreach (HistoriaClinicaFacturacionDAL.Axion_Historia_Clinica_Anio_ImagenesFacturacionRow row in aTable.Rows)
                {
                    lista_anios a = new lista_anios();
                    a.anio = row.Anio.ToString();
                    list_anios.Add(a);
                }
            }

            HistoriaClinicaFacturacionDALTableAdapters._71_GesInMed_Historia_Clinica_Anio_ImagenesFacrturacionTableAdapter adapter_img = new HistoriaClinicaFacturacionDALTableAdapters._71_GesInMed_Historia_Clinica_Anio_ImagenesFacrturacionTableAdapter();
            HistoriaClinicaFacturacionDAL._71_GesInMed_Historia_Clinica_Anio_ImagenesFacrturacionDataTable aTable_img = adapter_img.GetData(desde,hasta, Convert.ToInt64(Soc_Id));
            foreach (HistoriaClinicaFacturacionDAL._71_GesInMed_Historia_Clinica_Anio_ImagenesFacrturacionRow row_img in aTable_img.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row_img.Anio.ToString();
                bool esta = false;
                foreach (lista_anios anios in list_anios)
                {
                    if (int.Parse(anios.anio) == int.Parse(a.anio))
                    {
                        esta = true;
                    }
                }
                if (!esta)
                {
                    list_anios.Add(a);
                }
            }

            list_anios.OrderByDescending(p => p.anio).ToList();
            return list_anios;
        }





        public List<lista_anios> Imagenes_AnatomiaPatologica(string Soc_Id,string desde, string hasta)
        {
            int _Soc_Id;
            List<lista_anios> list_anios = new List<lista_anios>();
            if (!int.TryParse(Soc_Id, out _Soc_Id)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaFacturacionDALTableAdapters.Axion_Historia_Clinica_Anio_ImagenesFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.Axion_Historia_Clinica_Anio_ImagenesFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.Axion_Historia_Clinica_Anio_ImagenesFacturacionDataTable aTable = adapter.GetData(Convert.ToInt64(Soc_Id),desde,hasta);
            foreach (HistoriaClinicaFacturacionDAL.Axion_Historia_Clinica_Anio_ImagenesFacturacionRow row in aTable.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row.Anio.ToString();
                list_anios.Add(a);
            }
            return list_anios;
        }



        public List<hc_anatomiapatologica> AnatomiaPatologica_Datos(string Soc_Id, string Anio,int Mes,string desde,string hasta)
        {
            int _Soc_Id;
            if (!int.TryParse(Soc_Id, out _Soc_Id)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaFacturacionDALTableAdapters.Axion_Historia_Clinica_AnatomiaPatologicaFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.Axion_Historia_Clinica_AnatomiaPatologicaFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.Axion_Historia_Clinica_AnatomiaPatologicaFacturacionDataTable aTable = adapter.GetData(_Soc_Id,Convert.ToInt32(Anio),Mes,desde, hasta);
            List<hc_anatomiapatologica> imagenes = new List<hc_anatomiapatologica>();

            foreach (HistoriaClinicaFacturacionDAL.Axion_Historia_Clinica_AnatomiaPatologicaFacturacionRow row in aTable)
            {
                hc_anatomiapatologica i = new hc_anatomiapatologica();
                i.PAT_NUMERO = row.PAT_NUMERO;
                i.MED_APELLIDO_NOMBRE = row.APELLIDOYNOMBRE;
                if (!row.IsPAT_FECHA_INICIONull()) i.PAT_FECHA_INICIO = row.PAT_FECHA_INICIO.ToShortDateString();
                if (!row.IsPMAT_DESCRIPCIONNull()) i.PMAT_DESCRIPCION = row.PMAT_DESCRIPCION;
                imagenes.Add(i);
            }
            return imagenes;
        }



        public List<hc_imagenes> Imagenes_Datos(string Soc_Id, string Anio, string PacienteId, string AxionHC,int mes,string desde,string hasta)
        {
            int _Soc_Id;
            int _AxionHC;
            List<hc_imagenes> imagenes = new List<hc_imagenes>();
            if (Soc_Id != null)
            {
                if (!int.TryParse(Soc_Id, out _Soc_Id)) throw new Exception("Error en Paciente ID.");
                if (AxionHC == "") { AxionHC = _Soc_Id.ToString(); }
                if (!int.TryParse(AxionHC, out _AxionHC)) throw new Exception("Error en Paciente Axion ID.");
                if (_Soc_Id != 0)
                {
                    //HistoriaClinicaFacturacionDALTableAdapters.Axion_Historia_Clinica_Anio_ImagenesFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.Axion_Historia_Clinica_Anio_ImagenesFacturacionTableAdapter();
                    //HistoriaClinicaFacturacionDAL.Axion_Historia_Clinica_Anio_ImagenesFacturacionDataTable aTable = adapter.GetData(Convert.ToInt64(Soc_Id) ,Anio,mes ,desde,hasta);

                    //foreach (HistoriaClinicaFacturacionDAL.Axion_Historia_Clinica_Anio_ImagenesFacturacionRow row in aTable)
                    HistoriaClinicaFacturacionDALTableAdapters.Axion_Historia_Clinica_Datos_ImagenesFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.Axion_Historia_Clinica_Datos_ImagenesFacturacionTableAdapter();
                    HistoriaClinicaFacturacionDAL.Axion_Historia_Clinica_Datos_ImagenesFacturacionDataTable aTable = adapter.GetData(Convert.ToInt64(Soc_Id),Convert.ToInt32(Anio), mes, desde, hasta);

                    foreach (HistoriaClinicaFacturacionDAL.Axion_Historia_Clinica_Datos_ImagenesFacturacionRow row in aTable)
                    {
                        hc_imagenes i = new hc_imagenes();
                        if (!row.IsIMG_FECHA_INICIONull()) i.IMG_FECHA_INICIO = row.IMG_FECHA_INICIO.ToShortDateString();
                        i.IMG_ID = row.IMG_ID;
                        i.IMG_NUMERO = row.IMG_NUMERO.ToString();
                        //if (!row.IsIMG_PATH_CONVERTIDONull()) i.IMG_PATH = row.IMG_PATH_CONVERTIDO;
                        if (!row.IsIMG_PATHNull()) i.IMG_PATH = row.IMG_PATH;
                        if (!row.IsIMG_USUARIONull()) i.IMG_USUARIO = row.IMG_USUARIO;
                        i.TIMG_DESCRIPCION = row.TIMG_DESCRIPCION;
                        imagenes.Add(i);
                    }
                }
            }

            //ACA TENGO QUE CARGAR TAMBIEN LOS NUESTROS....

            HistoriaClinicaFacturacionDALTableAdapters.H2_IMG_HC_DETALLESFacturacionTableAdapter adapter_ges = new HistoriaClinicaFacturacionDALTableAdapters.H2_IMG_HC_DETALLESFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_IMG_HC_DETALLESFacturacionDataTable aTable_ges = adapter_ges.GetData(int.Parse(PacienteId), int.Parse(Anio),mes,desde,hasta);

            foreach (HistoriaClinicaFacturacionDAL.H2_IMG_HC_DETALLESFacturacionRow row in aTable_ges)
            {
                hc_imagenes i = new hc_imagenes();
                i.IMG_FECHA_INICIO = row.IMG_TURNO_FECHA.ToShortDateString();
                i.IMG_ID = row.IMG_TURNO_ID;
                i.IMG_NUMERO = row.IMG_TURNO_ESTADO.ToString();
                i.IMG_PATH = row.IMG_TURNO_ID.ToString();
                i.IMG_USUARIO = "";
                i.TIMG_DESCRIPCION = row.Descripcion;
                if (!row.Isna_accessionnumberNull()) i.WORK_LIST_NUMERO = row.na_accessionnumber.ToString(); else i.WORK_LIST_NUMERO = "";
                imagenes.Add(i);
            }

            imagenes.OrderByDescending(p => p.IMG_FECHA_INICIO).ToList();
            return imagenes;
        }



        public List<interconsulta> Interconsultas_Datos(string NHC, string Anio)
        {
            long _PacienteID;
            if (!long.TryParse(NHC, out _PacienteID)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_InterconsultaTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_InterconsultaTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_InterconsultaDataTable aTable = adapter.GetData(_PacienteID, int.Parse(Anio));
            List<interconsulta> interconsultas = new List<interconsulta>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_InterconsultaRow row in aTable)
            {
                interconsulta i = new interconsulta();
                i.espinter = row.EspInter;
                i.fecha = row.Fecha.ToShortDateString();
                i.id = row.IdInterconsulta;
                i.medinter = row.MedInter;
                i.medsol = row.MedSol;
                if (!row.IsMotivoNull())
                    i.motivo = row.Motivo;
                interconsultas.Add(i);
            }
            return interconsultas;
        }

        public List<lista_anios> Cirugias_Anios(long NHC,string desde,string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_CirugiasFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_CirugiasFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_CirugiasFacturacionDataTable aTable = adapter.GetData(NHC,desde,hasta);
            List<lista_anios> Lista = new List<lista_anios>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_CirugiasFacturacionRow row in aTable.Rows)
            {
                lista_anios i = new lista_anios();
                i.anio = row.Anio.ToString();
                Lista.Add(i);
            }
            return Lista;
        }


        public List<lista_anios> Ambulatorio_Anios(long NHC,string desde,string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_Antecedentes_Ambulatorios_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_Antecedentes_Ambulatorios_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Anio_Antecedentes_Ambulatorios_FacturacionDataTable aTable = adapter.GetData(NHC ,desde,hasta);
            List<lista_anios> Lista = new List<lista_anios>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Anio_Antecedentes_Ambulatorios_FacturacionRow row in aTable.Rows)
            {
                lista_anios i = new lista_anios();
                i.anio = row.Anio.ToString();
                Lista.Add(i);
            }
            return Lista;

        }



        public List<lista_meses> Ambulatorio_Meses(long NHC, int Anio,string desde,string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Antecedentes_Ambulatorios_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Antecedentes_Ambulatorios_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Antecedentes_Ambulatorios_FacturacionDataTable aTable = adapter.GetData(NHC,Anio, desde, hasta);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Antecedentes_Ambulatorios_FacturacionRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.Mes.ToString();
                Lista.Add(m);
            }
            return Lista;

        }


        public List<lista_meses> Cirugias_Meses(long NHC, int Anio, string desde, string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Cirugias_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Cirugias_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Cirugias_FacturacionDataTable aTable = adapter.GetData(NHC, desde, hasta, Anio.ToString());
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Cirugias_FacturacionRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.Mes.ToString();
                Lista.Add(m);
            }
            return Lista;

        }


        public List<registro_internacion> Internacion_Datos(long NHC, int Anio,int mes,string desde,string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_InternacionFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_InternacionFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_InternacionFacturacionDataTable aTable = adapter.GetData(Anio,mes, NHC,desde,hasta);
            List<registro_internacion> Lista = new List<registro_internacion>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_InternacionFacturacionRow row in aTable.Rows)
            {
                registro_internacion i = new registro_internacion();
                if (!row.IsEgresoFechaNull()) { i.egreso = row.EgresoFecha.ToString(); } else { i.egreso = ""; }
                if (!row.IsEspecialidadNull()) { i.especialidad = row.Especialidad; } else { i.especialidad = ""; }
                i.id = row.Id.ToString(); ;
                // i.ingreso = row.Fecha.ToShortDateString();


                i.ingreso = String.Format("{0:d/M/yyyy </br> HH:mm}", row.Fecha) + " Hs.";

                if (!row.IsMedicoNull()) { i.medico = row.Medico; } else { i.medico = ""; }
                if (!row.IsMotivoEgresoNull()) { i.motivoegreso = row.MotivoEgreso; } else { i.motivoegreso = ""; }
                if (!row.IsMotivoIngresoNull()) { i.motivoingreso = row.MotivoIngreso; } else { i.motivoingreso = ""; }
                if (!row.IsServicioNull()) { i.servicio = row.Servicio; } else { i.servicio = ""; }
                Lista.Add(i);
            }
            return Lista;

        }



        public List<registro_cirugias> Cirugia_Datos(long NHC, int Anio,int mes,string desde,string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_CirugiasFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_CirugiasFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_CirugiasFacturacionDataTable aTable = adapter.GetData(Anio, mes,NHC,desde,hasta);
            List<registro_cirugias> Lista = new List<registro_cirugias>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_CirugiasFacturacionRow row in aTable.Rows)
            {
                registro_cirugias c = new registro_cirugias();
                if (!row.IsCirugiaNull()) { c.cirugia = row.Cirugia; } else { c.cirugia = ""; }
                if (!row.IsDiagnosticoNull()) { c.diagnostico = row.Diagnostico; } else { c.diagnostico = ""; }
                if (!row.IsEspecialidadNull()) { c.especialidad = row.Especialidad; } else { c.especialidad = ""; }
                //c.fecha = row.fecha.ToShortDateString();

                c.fecha = String.Format("{0:d/M/yyyy </br> HH:mm}", row.fecha) + " Hs.";

                c.id = row.id.ToString();
                if (!row.IsCirujanoNull()) { c.medico = row.Cirujano; } else { c.medico = ""; }
                Lista.Add(c);
            }
            return Lista;

        }

        public List<registro_recetas> Recetas_Datos(long NHC, int Anio,int mes,string desde,string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_RecetasFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_RecetasFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_RecetasFacturacionDataTable aTable = adapter.GetData(Anio,mes,NHC,desde,hasta);
            List<registro_recetas> Lista = new List<registro_recetas>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_RecetasFacturacionRow row in aTable.Rows)
            {
                registro_recetas c = new registro_recetas();
                c.diagnostico = row.Diagnostico;
                c.especialidad = row.Especialidad;
                c.fecha = row.FechaInicio.ToShortDateString();
                c.id = row.Protocolo.ToString();
                c.medico = row.Medico;
                Lista.Add(c);
            }
            return Lista;

        }

        public List<registro_recetas> Guardia_Datos(long NHC, int Anio,int Mes,string desde,string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_GuardiaFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_GuardiaFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_GuardiaFacturacionDataTable aTable = adapter.GetData(NHC, Anio,Mes,desde,hasta);
            List<registro_recetas> Lista = new List<registro_recetas>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_GuardiaFacturacionRow row in aTable.Rows)
            {
                registro_recetas c = new registro_recetas();
                c.diagnostico = row.Diagnostico;
                c.especialidad = row.Especialidad;
                //c.fecha = row.Fecha.ToShortDateString();

                c.fecha = String.Format("{0:d/M/yyyy </br> HH:mm}", row.Fecha) + " Hs.";

                c.id = row.Id.ToString();
                c.medico = row.Medico;
                Lista.Add(c);
            }
            return Lista;

        }

        public List<registro_ambulatorio> Ambulatorio_Datos(long NHC, int Anio, int Mes,string desde,string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_AmbulatorioFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_AmbulatorioFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_AmbulatorioFacturacionDataTable aTable = adapter.GetData(Anio, NHC, Mes,desde,hasta);
            List<registro_ambulatorio> Lista = new List<registro_ambulatorio>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_AmbulatorioFacturacionRow row in aTable.Rows)
            {
                registro_ambulatorio a = new registro_ambulatorio();

                if (!row.IsDiagnosticoNull()) { a.diagnostico = row.Diagnostico; } else { a.diagnostico = ""; }
                if (!row.IsEspecialidadNull()) { a.especialidad = row.Especialidad; } else { a.especialidad = ""; }
                // a.fecha = row.Fecha_Atencion.ToShortDateString();


                a.fecha = String.Format("{0:d/M/yyyy </br> HH:mm}", row.Fecha_Atencion) + " Hs.";
                a.id = row.Id.ToString();
                if (!row.IsMedicoNull()) { a.medico = row.Medico; } else { a.medico = ""; }
                if (!row.IsTipoNull()) { a.tipo = row.Tipo; } else { a.tipo = ""; }

                Lista.Add(a);
            }
            return Lista;

        }



        public List<HC_Compacta> Historia_Clinica_Compacta(long NHC,string desde,string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_CompactaFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_CompactaFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_CompactaFacturacionDataTable aTable = adapter.GetData(NHC.ToString(),desde,hasta);
            List<HC_Compacta> Lista = new List<HC_Compacta>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_CompactaFacturacionRow row in aTable.Rows)
            {
                HC_Compacta i = new HC_Compacta();
                if (!row.IsHCNull()) { i.HC = row.HC; }
                else i.HC = "";
                if (!row.IsFechaNull()) { i.fecha = row.Fecha.ToShortDateString(); }
                Lista.Add(i);
            }
            return Lista;

        }

        public void HC_Movimiento_Insert(HC_Movimiento h)
        {
            HistoriaClinicaDALTableAdapters.QueriesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_HC_MOVIMIENTO_INSERT(h.Id, DateTime.Parse(h.Fecha), h.OrigenId, h.DestinoId, h.UsuarioId, h.NHC, h.Observaciones);
        }

        public void HC_Movimiento_Delete(long Id, long UsuarioId)
        {
            HistoriaClinicaDALTableAdapters.QueriesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_HC_MOVIMIENTOS_DELETE(Id, UsuarioId);
        }


        public int Actualizar_Tomo_HC(long nhc, long afiliafoId, long usuario, int tomos)
        {
            HistoriaClinicaDALTableAdapters.QueriesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Actualizar_Tomo_HC(nhc, afiliafoId, usuario, tomos);
            return Convert.ToInt32(obj);
        }

        public int Traer_Tomo_NHC(long nhc, long afiliafoId)
        {
            HistoriaClinicaDALTableAdapters.QueriesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Traer_Tomo_NHC(nhc, afiliafoId);
            return Convert.ToInt32(obj);
        }

        public List<HC_Movimiento> HC_Movimiento_Listar(long NHC)
        {
            HistoriaClinicaDALTableAdapters.H2_HC_MOVIMIENTOS_LIST_BY_NHCTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_HC_MOVIMIENTOS_LIST_BY_NHCTableAdapter();
            HistoriaClinicaDAL.H2_HC_MOVIMIENTOS_LIST_BY_NHCDataTable aTable = adapter.GetData(NHC.ToString());
            List<HC_Movimiento> Lista = new List<HC_Movimiento>();
            foreach (HistoriaClinicaDAL.H2_HC_MOVIMIENTOS_LIST_BY_NHCRow row in aTable.Rows)
            {
                HC_Movimiento i = new HC_Movimiento();
                i.Destino = row.Destino;
                i.DestinoId = row.DestinoId;
                i.Fecha = row.Fecha.ToString();
                i.Id = row.Id;
                i.NHC = row.NHC;
                i.Origen = row.Origen;
                i.OrigenId = row.OrigenId;
                if (!row.IsUsuarioNull())
                    i.Usuario = row.Usuario;
                else i.Usuario = string.Empty;
                i.UsuarioId = row.UsuarioId;
                if (!row.IsObservacionesNull())
                    i.Observaciones = row.Observaciones;
                else i.Observaciones = string.Empty;
                Lista.Add(i);
            }
            return Lista;
        }

        public List<IM_Buscar> BuscarIM_by_Internacion(string IdInternacion)
        {
            long Id;

            if (!long.TryParse(IdInternacion, out Id)) throw new Exception("Error en Nro. de Internación.");

            HistoriaClinicaDALTableAdapters.H2_HC_LISTARIM_BY_NROINTTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_HC_LISTARIM_BY_NROINTTableAdapter();
            HistoriaClinicaDAL.H2_HC_LISTARIM_BY_NROINTDataTable aTable = adapter.GetData(Id);
            List<IM_Buscar> lista = new List<IM_Buscar>();
            foreach (HistoriaClinicaDAL.H2_HC_LISTARIM_BY_NROINTRow row in aTable.Rows)
            {
                IM_Buscar i = new IM_Buscar();
                i.Cama = row.Cama;
                i.Sala = row.Sala;
                i.Servicio = row.Servicio;
                i.IM_Id = row.Id.ToString();
                i.AfiliadoId = row.NHC;
                i.Medico = row.Medico;
                i.Fecha = row.Fecha.ToShortDateString();
                lista.Add(i);
            }
            return lista;
        }

        public long MedicoporUsuario(long UsuarioId)
        {
            HistoriaClinicaDALTableAdapters.QueriesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.QueriesTableAdapter();

            object id = adapter.H2_MEDICO_POR_USUARIOID(UsuarioId);
            if (id != null) return Convert.ToInt64(id.ToString());
            else return 0;
        }

        public List<lista_anios> Endoscopia_Anios(long NHC,string desde,string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_EndoscopiasFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_EndoscopiasFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_EndoscopiasFacturacionDataTable aTable = adapter.GetData(NHC,desde,hasta);
            List<lista_anios> Lista = new List<lista_anios>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_EndoscopiasFacturacionRow row in aTable.Rows)
            {
                lista_anios i = new lista_anios();
                i.anio = row.Anio.ToString();
                Lista.Add(i);
            }
            return Lista;

        }


        public List<registro_cirugias> Endoscopia_Datos(long NHC, int Anio,int Mes,string desde,string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_EndoscopiasFacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_EndoscopiasFacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_EndoscopiasFacturacionDataTable aTable = adapter.GetData(Anio, Mes, NHC,desde,hasta);
            List<registro_cirugias> Lista = new List<registro_cirugias>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_EndoscopiasFacturacionRow row in aTable.Rows)
            {
                registro_cirugias c = new registro_cirugias();
                if (!row.IsCirugiaNull()) { c.cirugia = row.Cirugia; } else { c.cirugia = ""; }
                if (!row.IsDiagnosticoNull()) { c.diagnostico = row.Diagnostico; } else { c.diagnostico = ""; }
                if (!row.IsEspecialidadNull()) { c.especialidad = row.Especialidad; } else { c.especialidad = ""; }
                c.fecha = row.fecha.ToShortDateString();
                c.id = row.id.ToString();
                if (!row.IsCirujanoNull()) { c.medico = row.Cirujano; } else { c.medico = ""; }
                Lista.Add(c);
            }
            return Lista;

        }


        public List<HC_Movimiento> HC_MOVIMIENTOS_POR_COLUMNA(string desde, string hasta, string columna)
        {


            Impresion_HC_MovimientosTableAdapters.H2_HC_MOVIMIENTOS_POR_COLUMNATableAdapter adapter = new Impresion_HC_MovimientosTableAdapters.H2_HC_MOVIMIENTOS_POR_COLUMNATableAdapter();
            Impresion_HC_Movimientos.H2_HC_MOVIMIENTOS_POR_COLUMNADataTable aTable = adapter.GetData(desde, hasta, columna);
            List<HC_Movimiento> Lista = new List<HC_Movimiento>();

            foreach (Impresion_HC_Movimientos.H2_HC_MOVIMIENTOS_POR_COLUMNARow row in aTable.Rows)
            {
                HC_Movimiento c = new HC_Movimiento();
                c.Fecha = row.Fecha.ToShortDateString();
                c.Origen = row.Origen;
                c.Destino = row.Destino;
                c.NHC = row.NHC;
                c.Usuario = row.Paciente;
                c.Observaciones = row.Observaciones;
                Lista.Add(c);
            }
            return Lista;

        }


        public int Verificar_Turno_Existente(long afiliadoId, long? usuario)
        {
            HistoriaClinicaDALTableAdapters.QueriesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.QueriesTableAdapter();
            Object obj = adapter.H2_Verificar_Turno_Existente(afiliadoId, usuario);
            return Convert.ToInt32(obj);
        }


        public int VerificarHcExistente(string hc)
        {
            HistoriaClinicaDALTableAdapters.QueriesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.QueriesTableAdapter();
            Object obj = adapter.H2_Verificar_Hc_Existente(hc);
            int retorno = 0;
            if (obj != null)
            {
                retorno = Convert.ToInt32(obj);
            }
            return retorno;
        }


        public string Estudios_Externos_Cant(long HC, int documentacion_tipo)
        {
            string cantidad;
            HistoriaClinicaDALTableAdapters.QueriesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.QueriesTableAdapter();
            try
            {
                Object R = adapter.H2_Paciente_Estudios_Externos_Cant(documentacion_tipo, HC);
                if (R == null)
                {
                    throw new Exception("No se ha podido calcular nro de imágenes - Línea 332");
                }
                else
                {
                    return cantidad = Convert.ToString(R);
                    //    Nombre = Nombre + "-" + cantidad.ToString().PadLeft(4, '0') + ".jpg";
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }



        public void Documentacion_Estudios_Externos_Guardar(string tipo, string HC, string cant, string EXTENSION, int interno)
        {
            //sd.FileName = System.Configuration.ConfigurationSettings.AppSettings["Servidor"] + "\\" + NOMBRE;

            HistoriaClinicaDALTableAdapters.QueriesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Documentacion_Estudios_Externos_Guardar(Convert.ToInt32(tipo), Convert.ToInt64(HC), Convert.ToInt32(cant), @"Gesinmed_DOCUMENTATCION_EXT\" + tipo + "-" + HC + "-" + cant + EXTENSION, interno);
        }


        public List<lista_meses> Internacion_Mes(long NHC, int Anio, string desde, string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Internacion_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Internacion_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Internacion_FacturacionDataTable aTable = adapter.GetData(NHC,Anio, desde, hasta);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Internacion_FacturacionRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.mes.ToString();
                m.numMes = row.mesName.ToString();  
                Lista.Add(m);
            }
            return Lista;

        }


        public List<lista_meses> Imagenes_Mes(long NHC, int Anio, string desde, string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Imagenes_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Imagenes_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Imagenes_FacturacionDataTable aTable = adapter.GetData(NHC, Anio, desde, hasta);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Imagenes_FacturacionRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.mes.ToString();
                m.numMes = row.mesName.ToString();
                Lista.Add(m);
            }


            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Imagenes_Axion_FacturacionTableAdapter adapter_img = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Imagenes_Axion_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Imagenes_Axion_FacturacionDataTable aTable_img = adapter_img.GetData(NHC, Anio,desde, hasta);
            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Imagenes_Axion_FacturacionRow row_img in aTable_img.Rows)
            {
                lista_meses me = new lista_meses();
                me.mes = row_img.mes.ToString();
                me.numMes = row_img.mesName.ToString();
                bool esta = false;
                foreach (lista_meses m in Lista)
                {
                    if (int.Parse(m.numMes) == int.Parse(me.numMes))
                    {
                        esta = true;
                    }
                }
                if (!esta)
                {
                    Lista.Add(me);
                }
            }

            Lista.OrderByDescending(p => p.numMes).ToList();
           // return list_anios;


            return Lista;

        }


        public List<lista_meses> Anatomia_Mes(long NHC, int Anio, string desde, string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Patologia_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Patologia_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Patologia_FacturacionDataTable aTable = adapter.GetData(NHC, Anio, desde, hasta);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Patologia_FacturacionRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.mes.ToString();
                m.numMes = row.mesName.ToString();
                Lista.Add(m);
            }
            return Lista;

        }

        public List<lista_meses> Endoscopia_Mes(long NHC, int Anio, string desde, string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Endoscopia_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Endoscopia_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Endoscopia_FacturacionDataTable aTable = adapter.GetData(NHC, Anio, desde, hasta);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Endoscopia_FacturacionRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.mes.ToString();
                m.numMes = row.mesName.ToString();
                Lista.Add(m);
            }
            return Lista;

        }

        public List<lista_meses> Laboratorio_Mes(long NHC, int Anio, string desde, string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Laboratorio_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Laboratorio_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Laboratorio_FacturacionDataTable aTable = adapter.GetData(NHC, Anio, desde, hasta);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Laboratorio_FacturacionRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.mes.ToString();
                m.numMes = row.mesName.ToString();
                Lista.Add(m);
            }
            return Lista;

        }


        public List<lista_meses> Guardia_Mes(long NHC, int Anio, string desde, string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Guardia_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Guardia_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Guardia_FacturacionDataTable aTable = adapter.GetData(NHC, Anio, desde, hasta);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Guardia_FacturacionRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.mes.ToString();
                m.numMes = row.mesName.ToString();
                Lista.Add(m);
            }
            return Lista;

        }


        public List<lista_meses> Recetas_Mes(long NHC, int Anio, string desde, string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Recetas_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Recetas_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Recetas_FacturacionDataTable aTable = adapter.GetData(NHC, Anio, desde, hasta);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Recetas_FacturacionRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.mes.ToString();
                m.numMes = row.mesName.ToString();
                Lista.Add(m);
            }
            return Lista;

        }


        public List<lista_meses> LaboratorioBacterio_Mes(long NHC, int Anio, string desde, string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_LaboratorioBactereo_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_LaboratorioBactereo_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_LaboratorioBactereo_FacturacionDataTable aTable = adapter.GetData(NHC, Anio, desde, hasta);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_LaboratorioBactereo_FacturacionRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.mes.ToString();
                m.numMes = row.mesName.ToString();
                Lista.Add(m);
            }
            return Lista;

        }


        public List<lista_meses> Odontologia_Mes(long NHC, int Anio, string desde, string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Odontologia_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Odontologia_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Odontologia_FacturacionDataTable aTable = adapter.GetData(NHC, Anio, desde, hasta);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Odontologia_FacturacionRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.mes.ToString();
                m.numMes = row.mesName.ToString();
                Lista.Add(m);
            }
            return Lista;

        }

        public List<lista_meses> Otras_Mes(long NHC, int Anio, string desde, string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Otras_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Otras_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Otras_FacturacionDataTable aTable = adapter.GetData(NHC, Anio, desde, hasta);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Otras_FacturacionRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.mes.ToString();
                m.numMes = row.mesName.ToString();
                Lista.Add(m);
            }
            return Lista;

        }

        public List<lista_meses> Interconsulta_Mes(long NHC, int Anio, string desde, string hasta)
        {
            HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Interconsulta_FacturacionTableAdapter adapter = new HistoriaClinicaFacturacionDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Interconsulta_FacturacionTableAdapter();
            HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Interconsulta_FacturacionDataTable aTable = adapter.GetData(NHC, Anio, desde, hasta);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaFacturacionDAL.H2_Historia_Clinica_Arbol_Meses_Interconsulta_FacturacionRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.mes.ToString();
                m.numMes = row.mesName.ToString();
                Lista.Add(m);
            }
            return Lista;

        }

    }
}