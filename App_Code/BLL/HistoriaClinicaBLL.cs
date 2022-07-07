using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using System.IO;

/// <summary>
/// Summary description for HistoriaClinicaBLL
/// </summary>
namespace Hospital
{
    public class HistoriaClinicaBLL
    {
        public HistoriaClinicaBLL()
        {
            //
            // TODO: Add constructor logic here
            //


        }

        public List<labo_protocolos> Labo_Protocolos_Bacterio_by_Anio(string Doc, string Anio)
        {
            long _PacienteID;
            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Protocolos_Bacterio_LaboratorioTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Protocolos_Bacterio_LaboratorioTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Protocolos_Bacterio_LaboratorioDataTable aTable = adapter.GetData(_PacienteID, int.Parse(Anio));
            List<labo_protocolos> protocolos = new List<labo_protocolos>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Protocolos_Bacterio_LaboratorioRow row in aTable)
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


        public List<otras> Otras_by_Anio(string Doc, string Anio)
        {
            long _PacienteID;
            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaDALTableAdapters.H2_Traer_Adjuntos_Externos_Todos_AnoTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Traer_Adjuntos_Externos_Todos_AnoTableAdapter();
            HistoriaClinicaDAL.H2_Traer_Adjuntos_Externos_Todos_AnoDataTable aTable = adapter.GetData(_PacienteID, int.Parse(Anio));
            List<otras> protocolos = new List<otras>();

            foreach (HistoriaClinicaDAL.H2_Traer_Adjuntos_Externos_Todos_AnoRow row in aTable)
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


        public List<EstudiosComp> Complementarios_by_Anio(string Doc, string Anio)
        {
            long _PacienteID;
            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaDALTableAdapters.H2_Traer_Adjuntos_Complementarios_Todos_AnoTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Traer_Adjuntos_Complementarios_Todos_AnoTableAdapter();
            HistoriaClinicaDAL.H2_Traer_Adjuntos_Complementarios_Todos_AnoDataTable aTable = adapter.GetData(_PacienteID, int.Parse(Anio));
            List<EstudiosComp> protocolos = new List<EstudiosComp>();

            foreach (HistoriaClinicaDAL.H2_Traer_Adjuntos_Complementarios_Todos_AnoRow row in aTable)
            {
                EstudiosComp p = new EstudiosComp();
                p.Id = row.Id;
                p.fecha = row.Fecha_Practica.ToShortDateString();
                p.Medico = row.Medico;
                p.id_practica = row.Id_Practica;
                p.id_medico = row.Id_Medico;
                p.fechaHora = row.Fecha_Y_Hora.ToString();

                switch (row.Id_Practica) { 
                    case 1:
                        p.tipo = "Electromiografia";
                        break;
                    case 2:
                        p.tipo = "Polisomnografia";
                        break;
                    case 3:
                        p.tipo = "Electroencefalograma";
                        break;
                    case 4:
                        p.tipo = "Monitoreo Ambulatorio de Tension Arterial";
                        break;
                    case 5:
                        p.tipo = "Holter";
                        break;
                    case 6:
                        p.tipo = "Riesgo Quirurgico";
                        break;
                    case 7:
                        p.tipo = "Reflujo Gástrico";
                        break;
                }

                protocolos.Add(p);
            }
            return protocolos;
        }


        public List<otras> Inrernos_by_Anio(string Doc, string Anio,int? tipo ,int? agrupado)
        {
            long _PacienteID;
            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaDALTableAdapters.H2_Traer_Adjuntos_Internos_Todos_AnoTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Traer_Adjuntos_Internos_Todos_AnoTableAdapter();
            HistoriaClinicaDAL.H2_Traer_Adjuntos_Internos_Todos_AnoDataTable aTable = adapter.GetData(_PacienteID, int.Parse(Anio),tipo,agrupado);
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

        public List<lista_anios> Internaciones_Anios(long NHC)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_InternacionesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_InternacionesTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_InternacionesDataTable aTable = adapter.GetData(NHC);
            List<lista_anios> Lista = new List<lista_anios>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_InternacionesRow row in aTable.Rows)
            {
                lista_anios i = new lista_anios();
                i.anio = row.Anio.ToString();
                Lista.Add(i);
            }
            return Lista;

        }

        public List<lista_anios> Recetas_Anios(long NHC)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_RecetasTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_RecetasTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_RecetasDataTable aTable = adapter.GetData(NHC);
            List<lista_anios> Lista = new List<lista_anios>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_RecetasRow row in aTable.Rows)
            {
                lista_anios i = new lista_anios();
                i.anio = row.Anio.ToString();
                Lista.Add(i);
            }
            return Lista;

        }

        public List<lista_anios> Guardia_Anios(long NHC)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_GuardiaTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_GuardiaTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_GuardiaDataTable aTable = adapter.GetData(NHC);
            List<lista_anios> Lista = new List<lista_anios>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_GuardiaRow row in aTable.Rows)
            {
                lista_anios i = new lista_anios();
                i.anio = row.Anio.ToString();
                Lista.Add(i);
            }
            return Lista;

        }

        public List<lista_anios> Labo_Anios(string Doc)
        {
            long _PacienteID;
            List<lista_anios> list_anios = new List<lista_anios>();

            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_LaboratorioTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_LaboratorioTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Anio_LaboratorioDataTable aTable = adapter.GetData(_PacienteID);
            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Anio_LaboratorioRow row in aTable.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row.Anio.ToString();
                list_anios.Add(a);
            }
            return list_anios;
        }

        //odonto

        public List<lista_anios> Odonto_Anios(string Doc)
        {
            long _PacienteID;
            List<lista_anios> list_anios = new List<lista_anios>();

            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_OdontoTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_OdontoTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Anio_OdontoDataTable aTable = adapter.GetData(_PacienteID);
            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Anio_OdontoRow row in aTable.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row.anio.ToString();
                list_anios.Add(a);
            }
            return list_anios;
        }

        //odonto


        //otras instituciones

        public List<lista_anios> Otras_Anios(string Doc)
        {
            long _PacienteID;
            List<lista_anios> list_anios = new List<lista_anios>();

            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_OtrasTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_OtrasTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Anio_OtrasDataTable aTable = adapter.GetData(_PacienteID);
            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Anio_OtrasRow row in aTable.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row.anio.ToString();
                list_anios.Add(a);
            }
            return list_anios;
        }

        //otras instituciones


        //complementarios

        public List<lista_anios> Complementarios_Anios(string Doc)
        {
            long _PacienteID;
            List<lista_anios> list_anios = new List<lista_anios>();

            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_ComplementariosTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_ComplementariosTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Anio_ComplementariosDataTable aTable = adapter.GetData(_PacienteID);
            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Anio_ComplementariosRow row in aTable.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row.anio.ToString();
                list_anios.Add(a);
            }
            return list_anios;
        }

        //complementarios

        public List<labo_protocolos> Labo_Protocolos_by_Anio(string Doc, string Anio)
        {
            long _PacienteID;
            if (!long.TryParse(Doc, out _PacienteID)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Protocolos_LaboratorioTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Protocolos_LaboratorioTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Protocolos_LaboratorioDataTable aTable = adapter.GetData(_PacienteID, int.Parse(Anio));
            List<labo_protocolos> protocolos = new List<labo_protocolos>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Protocolos_LaboratorioRow row in aTable)
            {
                labo_protocolos p = new labo_protocolos();
                p.archivo = row.Archivo;
                p.fecha =  row.Archivo.Substring(31,2) + "/" + row.Archivo.Substring(29,2) + "/" + row.Anio.ToString();
                p.protocolo = row.Archivo.Substring(10,10);
                p.ruta = "http://10.10.8.71/pdfs/" + row.Dire + "/" + row.Archivo;
                p.tipoorden = row.TipoOrden;
                p.complejidad = row.Complejidad;
                protocolos.Add(p);
            }
            return protocolos;
        }

        public List<lista_anios> Interconsultas_Anios(string NHC)
        {
            long _PacienteID;
            List<lista_anios> list_anios = new List<lista_anios>();
            if (!long.TryParse(NHC, out _PacienteID)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Interconsulta_AniosTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Interconsulta_AniosTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Interconsulta_AniosDataTable aTable = adapter.GetData(_PacienteID);
            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Interconsulta_AniosRow row in aTable.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row.Anio.ToString();
                list_anios.Add(a);
            }
            return list_anios;
        }


        public List<lista_anios> AnatomiaPatologica_Anios(string Soc_Id)
        {
            int _Soc_Id;
            List<lista_anios> list_anios = new List<lista_anios>();
            if (!int.TryParse(Soc_Id, out _Soc_Id)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaDALTableAdapters.Axion_Historia_Clinica_Anio_AnatomiaPatologicaTableAdapter adapter = new HistoriaClinicaDALTableAdapters.Axion_Historia_Clinica_Anio_AnatomiaPatologicaTableAdapter();
            HistoriaClinicaDAL.Axion_Historia_Clinica_Anio_AnatomiaPatologicaDataTable aTable = adapter.GetData(_Soc_Id);
            foreach (HistoriaClinicaDAL.Axion_Historia_Clinica_Anio_AnatomiaPatologicaRow row in aTable.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row.Anio.ToString();
                list_anios.Add(a);
            }
            return list_anios;
        }

        public List<lista_anios> Imagenes_Anios_ORIGINAL(string Soc_Id, string PacienteId)
        {
            int _Soc_Id;
            List<lista_anios> list_anios = new List<lista_anios>();
            if (Soc_Id != "")
            {
                if (!int.TryParse(Soc_Id, out _Soc_Id)) throw new Exception("Error en Paciente ID.");

                HistoriaClinicaDALTableAdapters.Axion_Historia_Clinica_Anio_ImagenesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.Axion_Historia_Clinica_Anio_ImagenesTableAdapter();
                HistoriaClinicaDAL.Axion_Historia_Clinica_Anio_ImagenesDataTable aTable = adapter.GetData(_Soc_Id);
                foreach (HistoriaClinicaDAL.Axion_Historia_Clinica_Anio_ImagenesRow row in aTable.Rows)
                {
                    lista_anios a = new lista_anios();
                    a.anio = row.Anio.ToString();
                    list_anios.Add(a);
                }
            }

            HistoriaClinicaDALTableAdapters._71_GesInMed_Historia_Clinica_Anio_ImagenesTableAdapter adapter_img = new HistoriaClinicaDALTableAdapters._71_GesInMed_Historia_Clinica_Anio_ImagenesTableAdapter();
            HistoriaClinicaDAL._71_GesInMed_Historia_Clinica_Anio_ImagenesDataTable aTable_img = adapter_img.GetData(int.Parse(PacienteId));
            foreach (HistoriaClinicaDAL._71_GesInMed_Historia_Clinica_Anio_ImagenesRow row_img in aTable_img.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row_img.Anio.ToString();
                bool esta = false;
                foreach (lista_anios anios in list_anios)
                {
                    if (int.Parse(anios.anio)  == int.Parse(a.anio))
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





        public List<lista_anios> Imagenes_Anios(string Soc_Id, string PacienteId)
        {
            int _Soc_Id;
            List<lista_anios> list_anios = new List<lista_anios>();
            if (Soc_Id != "")
            {
                if (!int.TryParse(Soc_Id, out _Soc_Id)) throw new Exception("Error en Paciente ID.");

                HistoriaClinicaDALTableAdapters.Axion_Historia_Clinica_Anio_ImagenesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.Axion_Historia_Clinica_Anio_ImagenesTableAdapter();
                HistoriaClinicaDAL.Axion_Historia_Clinica_Anio_ImagenesDataTable aTable = adapter.GetData(_Soc_Id);
                foreach (HistoriaClinicaDAL.Axion_Historia_Clinica_Anio_ImagenesRow row in aTable.Rows)
                {
                    lista_anios a = new lista_anios();
                    a.anio = row.Anio.ToString();
                    list_anios.Add(a);
                }
            }

            HistoriaClinicaDALTableAdapters._71_GesInMed_Historia_Clinica_Anio_ImagenesTableAdapter adapter_img = new HistoriaClinicaDALTableAdapters._71_GesInMed_Historia_Clinica_Anio_ImagenesTableAdapter();
            HistoriaClinicaDAL._71_GesInMed_Historia_Clinica_Anio_ImagenesDataTable aTable_img = adapter_img.GetData(int.Parse(PacienteId));
            foreach (HistoriaClinicaDAL._71_GesInMed_Historia_Clinica_Anio_ImagenesRow row_img in aTable_img.Rows)
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





        public List<lista_anios> Imagenes_AnatomiaPatologica(string Soc_Id)
        {
            int _Soc_Id;
            List<lista_anios> list_anios = new List<lista_anios>();
            if (!int.TryParse(Soc_Id, out _Soc_Id)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaDALTableAdapters.Axion_Historia_Clinica_Anio_ImagenesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.Axion_Historia_Clinica_Anio_ImagenesTableAdapter();
            HistoriaClinicaDAL.Axion_Historia_Clinica_Anio_ImagenesDataTable aTable = adapter.GetData(_Soc_Id);
            foreach (HistoriaClinicaDAL.Axion_Historia_Clinica_Anio_ImagenesRow row in aTable.Rows)
            {
                lista_anios a = new lista_anios();
                a.anio = row.Anio.ToString();
                list_anios.Add(a);
            }
            return list_anios;            
        }



        public List<hc_anatomiapatologica> AnatomiaPatologica_Datos(string Soc_Id, string Anio)
        {
            int _Soc_Id;
            if (!int.TryParse(Soc_Id, out _Soc_Id)) throw new Exception("Error en Paciente ID.");

            HistoriaClinicaDALTableAdapters.Axion_Historia_Clinica_AnatomiaPatologicaTableAdapter adapter = new HistoriaClinicaDALTableAdapters.Axion_Historia_Clinica_AnatomiaPatologicaTableAdapter();
            HistoriaClinicaDAL.Axion_Historia_Clinica_AnatomiaPatologicaDataTable aTable = adapter.GetData(_Soc_Id, int.Parse(Anio));
            List<hc_anatomiapatologica> imagenes = new List<hc_anatomiapatologica>();

            foreach (HistoriaClinicaDAL.Axion_Historia_Clinica_AnatomiaPatologicaRow row in aTable)
            {
                hc_anatomiapatologica i = new hc_anatomiapatologica();
                i.PAT_NUMERO = row.PAT_NUMERO;
                i.MED_APELLIDO_NOMBRE = row.APELLIDOYNOMBRE;
                if (!row.IsPAT_FECHA_INICIONull()) i.PAT_FECHA_INICIO = row.PAT_FECHA_INICIO.ToShortDateString();
                if(!row.IsPMAT_DESCRIPCIONNull()) i.PMAT_DESCRIPCION = row.PMAT_DESCRIPCION;
                imagenes.Add(i);
            }
            return imagenes;
        }


        
        public List<hc_imagenes> Imagenes_Datos(string Soc_Id, string Anio, string PacienteId, string AxionHC)
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
                    HistoriaClinicaDALTableAdapters.Axion_Historia_Clinica_ImagenesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.Axion_Historia_Clinica_ImagenesTableAdapter();
                    HistoriaClinicaDAL.Axion_Historia_Clinica_ImagenesDataTable aTable = adapter.GetData(_AxionHC, int.Parse(Anio));

                    foreach (HistoriaClinicaDAL.Axion_Historia_Clinica_ImagenesRow row in aTable)
                    {
                        hc_imagenes i = new hc_imagenes();
                        if (!row.IsIMG_FECHA_INICIONull()) i.IMG_FECHA_INICIO = row.IMG_FECHA_INICIO.ToShortDateString();
                        i.IMG_ID = row.IMG_ID;
                        i.IMG_NUMERO = row.IMG_NUMERO.ToString();
                        if (!row.IsIMG_PATH_CONVERTIDONull()) i.IMG_PATH = row.IMG_PATH_CONVERTIDO;
                        if (!row.IsIMG_USUARIONull()) i.IMG_USUARIO = row.IMG_USUARIO;
                        i.TIMG_DESCRIPCION = row.TIMG_DESCRIPCION;
                        imagenes.Add(i);
                    }
                }
            }

            //ACA TENGO QUE CARGAR TAMBIEN LOS NUESTROS....

            HistoriaClinicaDALTableAdapters.H2_IMG_HC_DETALLESTableAdapter adapter_ges = new HistoriaClinicaDALTableAdapters.H2_IMG_HC_DETALLESTableAdapter();
            HistoriaClinicaDAL.H2_IMG_HC_DETALLESDataTable aTable_ges = adapter_ges.GetData(int.Parse(PacienteId), int.Parse(Anio));

            foreach (HistoriaClinicaDAL.H2_IMG_HC_DETALLESRow row in aTable_ges)
            {
                hc_imagenes i = new hc_imagenes();
                i.IMG_FECHA_INICIO = row.IMG_TURNO_FECHA.ToShortDateString();
                i.IMG_ID = row.IMG_TURNO_ID;
                i.IMG_NUMERO = row.IMG_TURNO_ESTADO.ToString();
                i.IMG_PATH = row.IMG_TURNO_ID.ToString();
                i.IMG_USUARIO = "";
                i.TIMG_DESCRIPCION = row.Descripcion;
                if (!row.Isna_accessionnumberNull()) i.WORK_LIST_NUMERO = row.na_accessionnumber.ToString(); else i.WORK_LIST_NUMERO = "";
                if (!row.IsanestesiaNull()) { i.TIENE_ANESTESIA = row.anestesia; }
                i.IMG_TURNO_ID_CAB = row.IMG_TURNO_ID_CAB;
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

        public List<lista_anios> Cirugias_Anios(long NHC)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_CirugiasTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_CirugiasTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_CirugiasDataTable aTable = adapter.GetData(NHC);
            List<lista_anios> Lista = new List<lista_anios>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_CirugiasRow row in aTable.Rows)
            {
                lista_anios i = new lista_anios();
                i.anio = row.Anio.ToString();
                Lista.Add(i);
            }
            return Lista;
        }


        public List<lista_anios> Ambulatorio_Anios(long NHC)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_Antecedentes_AmbulatoriosTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_Antecedentes_AmbulatoriosTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Anio_Antecedentes_AmbulatoriosDataTable aTable = adapter.GetData(NHC);
            List<lista_anios> Lista = new List<lista_anios>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Anio_Antecedentes_AmbulatoriosRow row in aTable.Rows)
            {
                lista_anios i = new lista_anios();
                i.anio = row.Anio.ToString();
                Lista.Add(i);
            }
            return Lista;

        }

        //PRACTICA ESPECIALISTA
        public List<lista_anios> Especialista_Anios(long NHC)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_Practica_EspecialistaTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_Practica_EspecialistaTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Anio_Practica_EspecialistaDataTable aTable = adapter.GetData(NHC);
            List<lista_anios> Lista = new List<lista_anios>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Anio_Practica_EspecialistaRow row in aTable.Rows)
            {
                lista_anios i = new lista_anios();
                i.anio = row.Anio.ToString();
                Lista.Add(i);
            }
            return Lista;

        }

        public List<lista_meses> Especialista_Meses(long NHC, int Anio)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Evolucion_EspecialistaTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Evolucion_EspecialistaTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Meses_Evolucion_EspecialistaDataTable aTable = adapter.GetData(Anio, NHC);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Meses_Evolucion_EspecialistaRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.Mes.ToString();
                Lista.Add(m);
            }
            return Lista;

        }
        //PRACTICA ESPECIALISTA

        public List<lista_meses> Ambulatorio_Meses(long NHC, int Anio)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Antecedentes_AmbulatoriosTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_Antecedentes_AmbulatoriosTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Meses_Antecedentes_AmbulatoriosDataTable aTable = adapter.GetData(Anio, NHC);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Meses_Antecedentes_AmbulatoriosRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.Mes.ToString();
                Lista.Add(m);
            }
            return Lista;

        }


        public List<registro_internacion> Internacion_Datos(long NHC, int Anio)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_InternacionTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_InternacionTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_InternacionDataTable aTable = adapter.GetData(Anio, NHC);
            List<registro_internacion> Lista = new List<registro_internacion>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_InternacionRow row in aTable.Rows)
            {
                registro_internacion i = new registro_internacion();
                if (!row.IsEgresoFechaNull()) { i.egreso = row.EgresoFecha.ToString(); } else { i.egreso = ""; }
                if (!row.IsEspecialidadNull()) { i.especialidad = row.Especialidad; } else { i.especialidad = ""; }
                i.id = row.Id.ToString();;
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



        public List<registro_cirugias> Cirugia_Datos(long NHC, int Anio)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_CirugiasTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_CirugiasTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_CirugiasDataTable aTable = adapter.GetData(Anio, NHC);
            List<registro_cirugias> Lista = new List<registro_cirugias>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_CirugiasRow row in aTable.Rows)
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

        public List<registro_recetas> Recetas_Datos(long NHC, int Anio)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_RecetasTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_RecetasTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_RecetasDataTable aTable = adapter.GetData(Anio, NHC);
            List<registro_recetas> Lista = new List<registro_recetas>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_RecetasRow row in aTable.Rows)
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

        public List<registro_recetas> Guardia_Datos(long NHC, int Anio)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_GuardiaTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_GuardiaTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_GuardiaDataTable aTable = adapter.GetData(NHC, Anio);
            List<registro_recetas> Lista = new List<registro_recetas>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_GuardiaRow row in aTable.Rows)
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

        public List<registro_ambulatorio> Ambulatorio_Datos(long NHC, int Anio, int Mes)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_AmbulatorioTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_AmbulatorioTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_AmbulatorioDataTable aTable = adapter.GetData(Anio, NHC, Mes);
            List<registro_ambulatorio> Lista = new List<registro_ambulatorio>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_AmbulatorioRow row in aTable.Rows)
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


        //PRACTICA ESPECIALISTA
        public List<registro_especialista> Especialista_Datos(long NHC, int Anio, int Mes)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_EspecialistaTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_EspecialistaTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_EspecialistaDataTable aTable = adapter.GetData(Anio, NHC, Mes);
            List<registro_especialista> Lista = new List<registro_especialista>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_EspecialistaRow row in aTable.Rows)
            {
                registro_especialista a = new registro_especialista();

                if (!row.IsDiagnosticoNull()) { a.diagnostico = row.Diagnostico; } else { a.diagnostico = ""; }
                if (!row.IsEspecialidadNull()) { a.especialidad = row.Especialidad; } else { a.especialidad = ""; }
                // a.fecha = row.Fecha_Atencion.ToShortDateString();


                a.fecha = String.Format("{0:d/M/yyyy </br> HH:mm}", row.Fecha) + " Hs.";
                a.id = row.Id.ToString();
                if (!row.IsMedicoNull()) { a.medico = row.Medico; } else { a.medico = ""; }
                if (!row.IsTipoNull()) { a.tipo = row.Tipo; } else { a.tipo = ""; }

                Lista.Add(a);
            }
            return Lista;
        }
        //PRACTICA ESPECIALISTA


        //HEMODINAMIA
        public List<registro_especialista> Hemodinamia_Datos(long NHC, int Anio, int Mes, int tipo)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_HemodinamiaTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_HemodinamiaTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_HemodinamiaDataTable aTable = adapter.GetData(Anio, NHC, Mes, tipo);
            List<registro_especialista> Lista = new List<registro_especialista>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_HemodinamiaRow row in aTable.Rows)
            {
                registro_especialista a = new registro_especialista();

                if (!row.IsDiagnosticoNull()) { a.diagnostico = row.Diagnostico; } else { a.diagnostico = ""; }
                if (!row.IsEspecialidadNull()) { a.especialidad = row.Especialidad; } else { a.especialidad = ""; }
                // a.fecha = row.Fecha_Atencion.ToShortDateString();


                a.fecha = String.Format("{0:d/M/yyyy </br> HH:mm}", row.Fecha) + " Hs.";
                a.id = row.Id.ToString();
                if (!row.IsMedicoNull()) { a.medico = row.Medico; } else { a.medico = ""; }
                if (!row.IsTipoNull()) { a.tipo = row.Tipo; } else { a.tipo = ""; }

                Lista.Add(a);
            }
            return Lista;
        }
        //HEMODINAMIA

        public List<HC_Compacta> Historia_Clinica_Compacta(long NHC)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_CompactaTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_CompactaTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_CompactaDataTable aTable = adapter.GetData(NHC.ToString());
            List<HC_Compacta> Lista = new List<HC_Compacta>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_CompactaRow row in aTable.Rows)
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
            adapter.H2_HC_MOVIMIENTO_INSERT(h.Id,DateTime.Parse(h.Fecha), h.OrigenId, h.DestinoId, h.UsuarioId, h.NHC, h.Observaciones);
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

        public List<lista_anios> Endoscopia_Anios(long NHC)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_EndoscopiasTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_EndoscopiasTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_EndoscopiasDataTable aTable = adapter.GetData(NHC);
            List<lista_anios> Lista = new List<lista_anios>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_EndoscopiasRow row in aTable.Rows)
            {
                lista_anios i = new lista_anios();
                i.anio = row.Anio.ToString();
                Lista.Add(i);
            }
            return Lista;

        }


        public List<registro_cirugias> Endoscopia_Datos(long NHC, int Anio)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_EndoscopiasTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_EndoscopiasTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_EndoscopiasDataTable aTable = adapter.GetData(Anio, NHC);
            List<registro_cirugias> Lista = new List<registro_cirugias>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_EndoscopiasRow row in aTable.Rows)
            {
                registro_cirugias c = new registro_cirugias();
                if (!row.IsCirugiaNull()) { c.cirugia = row.Cirugia; } else { c.cirugia = ""; }
                if (!row.IsDiagnosticoNull()) { c.diagnostico = row.Diagnostico; } else { c.diagnostico = ""; }
                if (!row.IsEspecialidadNull()) { c.especialidad = row.Especialidad; } else { c.especialidad = ""; }
                c.fecha = row.fecha.ToShortDateString();
                c.id = row.id.ToString();
                if (!row.IsSuspNull()) { c.susp = row.Susp; }
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
              Object R = adapter.H2_Paciente_Estudios_Externos_Cant(documentacion_tipo,HC);
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


        public long GuardarPedidoMaterial(pedidoMaterial pedido,int usuario)
          {
            HistoriaClinicaDALTableAdapters.QueriesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.QueriesTableAdapter();
            Object obj = adapter.H2_Guardar_Pedido_Material(pedido.idCarga,pedido.prioridad,pedido.equipos,pedido.insumos,pedido.diagnostico,pedido.fechaCirugia,pedido.servicio,pedido.auditoria,pedido.afiliadoId,usuario,
                pedido.antecedentes,pedido.tratamiento,pedido.actual,pedido.funcional,pedido.Complicaciones);
            int retorno = 0;
            if (obj != null)
            {
                retorno = Convert.ToInt32(obj);
            }
            return retorno;
        }

        public List<seccional> SeccionalLista ()
        {
            HistoriaClinicaDALTableAdapters.H2_Seccional_ListaTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Seccional_ListaTableAdapter();
            HistoriaClinicaDAL.H2_Seccional_ListaDataTable aTable = adapter.GetData(0);
            List<seccional> Lista = new List<seccional>();

            foreach (HistoriaClinicaDAL.H2_Seccional_ListaRow row in aTable.Rows)
            {
                seccional c = new seccional();
                c.id = Convert.ToInt32(row.Id);
                c.descripcion = row.Descripcion;
                Lista.Add(c);
            }
            return Lista;
        }

        public List<pedidoMaterial> BuscarPedidoMaterial(string paciente,int nhc,int dni,string desde,string hasta,int seccional,int auditoria)
        {
            HistoriaClinicaDALTableAdapters.H2_Buscar_Pedido_MaterialTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Buscar_Pedido_MaterialTableAdapter();
            HistoriaClinicaDAL.H2_Buscar_Pedido_MaterialDataTable aTable = adapter.GetData(paciente, nhc, dni, desde, hasta, seccional, auditoria);
            List<pedidoMaterial> Lista = new List<pedidoMaterial>();

            foreach (HistoriaClinicaDAL.H2_Buscar_Pedido_MaterialRow row in aTable.Rows)
            {
                pedidoMaterial c = new pedidoMaterial();
                c.idCarga = row.idCarga;
                c.fechaCirugia = row.fechaCreacion.ToShortDateString();
                c.afiliado = row.apellido;
                if (!row.IsestadoNull()) { c.estado = row.estado; } else { c.estado = 1; }
                if (!row.IsUsuarioEstadoNull()) { c.usuarioEstado = row.UsuarioEstado; } else { c.usuarioEstado = 0; }
                
                Lista.Add(c);
            }
            return Lista;
        }


        public int ActualizarEstadoPedido(int estado, long id, int usuario)
        {
            try
            {
                HistoriaClinicaDALTableAdapters.QueriesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.QueriesTableAdapter();
                Object obj = adapter.H2_Actualizar_Estado_Pedido(estado, id, usuario);
                return 1;
            }
            catch { return 0; }
        }

        public pedidoMaterial traerPedidoMaterial(long id)
        {
            HistoriaClinicaDALTableAdapters.H2_traer_Pedido_MaterialTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_traer_Pedido_MaterialTableAdapter();
            HistoriaClinicaDAL.H2_traer_Pedido_MaterialDataTable aTable = adapter.GetData(id);
            pedidoMaterial c = new pedidoMaterial();

            foreach (HistoriaClinicaDAL.H2_traer_Pedido_MaterialRow row in aTable.Rows)
            {           
                c.idCarga = row.idCarga;
                if (!row.IsafiliadoIdNull()) { c.afiliadoId = row.afiliadoId; }
                if (!row.IsprioridadNull()) { c.prioridad = row.prioridad; }
                if(!row.IsequiposNull()) {c.equipos = row.equipos;}
                if(!row.IsinsumosNull()) {c.insumos = row.insumos;}
                if(!row.IsdiagnosticoNull()) {c.diagnostico = row.diagnostico;}
                if(!row.IsfechaCirugiaNull()) {c.fechaCirugia = row.fechaCirugia;}
                if(!row.IsservicioNull()) {c.servicio = row.servicio;}
                if(!row.IsauditoriaNull()){c.auditoria = row.auditoria;}
                if(!row.IsfechaAuditoriaNull()) { c.fechaAuditoria = row.fechaAuditoria.ToShortDateString(); }
                if(!row.IseditarNull()) { c.edita = row.editar; }
                if(!row.IsantecedentesNull()) { c.antecedentes = row.antecedentes; }               
                if(!row.IstratamientoNull()) { c.tratamiento = row.tratamiento; }  
                if(!row.IsactualNull()) { c.actual = row.actual; }  
                if(!row.IsfuncionalNull()) { c.funcional = row.funcional; } 
                if(!row.IsComplicacionesNull()) { c.Complicaciones = row.Complicaciones; } 

            }
            return c;
        }


        public void EliminarAuditoriaPedidoMaterial(int idCarga)
        {
            HistoriaClinicaDALTableAdapters.QueriesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.QueriesTableAdapter();
            Object obj = adapter.H2_Eliminar_Auditoria_Pedido_Material(idCarga);
        }

        public long TraerEspecialidadxMedico(long MedicoId)
        {
            HistoriaClinicaDALTableAdapters.QueriesTableAdapter adapter = new HistoriaClinicaDALTableAdapters.QueriesTableAdapter();
            Object obj = adapter.H2_Traer_Especialidad_x_Medico(MedicoId);
            long retorno = 0;
            if (obj != null)
            {
                retorno = Convert.ToInt64(obj);
            }
            return retorno;
        }

        public verificarInternado VerificarInternado(long afiliadoId)
        {
            HistoriaClinicaDALTableAdapters.H2_Verificar_InternadoTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Verificar_InternadoTableAdapter();

            HistoriaClinicaDAL.H2_Verificar_InternadoDataTable aTable = adapter.GetData(afiliadoId);
            verificarInternado c = new verificarInternado();

            foreach (HistoriaClinicaDAL.H2_Verificar_InternadoRow row in aTable.Rows)
            {
                if (!row.IsinternadoNull()) { c.internado = row.internado; }
                c.internacion = row.id;
            }
            return c;
        }


        //HEMODINAMIA
        public List<lista_anios> Hemodinamia_Anios(long NHC, int tipo)
        {

            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_HemodinamiaTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Anio_HemodinamiaTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Anio_HemodinamiaDataTable aTable = adapter.GetData(NHC,tipo);
            List<lista_anios> Lista = new List<lista_anios>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Anio_HemodinamiaRow row in aTable.Rows)
            {
                lista_anios i = new lista_anios();
                i.anio = row.Anio.ToString();
                Lista.Add(i);
            }
            return Lista;

        }

        public List<lista_meses> Hemodinamia_Meses(long NHC, int Anio, int tipo)
        {
            HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_HemodinamiaTableAdapter adapter = new HistoriaClinicaDALTableAdapters.H2_Historia_Clinica_Arbol_Meses_HemodinamiaTableAdapter();
            HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Meses_HemodinamiaDataTable aTable = adapter.GetData(Anio, NHC,tipo);
            List<lista_meses> Lista = new List<lista_meses>();

            foreach (HistoriaClinicaDAL.H2_Historia_Clinica_Arbol_Meses_HemodinamiaRow row in aTable.Rows)
            {
                lista_meses m = new lista_meses();
                m.mes = row.Mes.ToString();
                Lista.Add(m);
            }
            return Lista;

        }
        //HEMODINAMIA
    }
}