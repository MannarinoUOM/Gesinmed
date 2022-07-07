using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de AnatomiaPatologicaTrueBLL
/// </summary>


namespace Hospital
{
    public class AnatomiaPatologicaTrueBLL
    {
        public AnatomiaPatologicaTrueBLL()
        {
            //
            // TODO: Agregar aquí la lógica del constructor
            //
        }

        public List<topografias> Pato_Material_Topografias_Listado(int tipo, string busqueda)
        
        {
            AnatomiaPatologicaTrueTableAdapters.H2_Pato_Material_Topografias_ListadoTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Pato_Material_Topografias_ListadoTableAdapter();
            AnatomiaPatologicaTrue.H2_Pato_Material_Topografias_ListadoDataTable aTable = adapter.GetData(tipo,busqueda);

            List<topografias> list = new List<topografias>();
            foreach (AnatomiaPatologicaTrue.H2_Pato_Material_Topografias_ListadoRow row in aTable.Rows)
            {
                topografias top = new topografias();

                top.id = row.id;
                if(!row.IsCodigoNull())
                top.codigo = row.Codigo;

                if(!row.IsDescripcionNull())
                top.descripcion = row.Descripcion;

                list.Add(top);
            }
            return list;
        }

        public int eliminar_Topografias(int id)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adaper.H2_Pato_Topografias_E(id));
        }


        public int guardar_Editar_Topografias(int id,string codigo,string descripcion)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adaper.H2_Pato_Topografias_AM( id,codigo,descripcion));
        }
/// <summary>
/// ////////////////////////////////
/// </summary>
/// <param name="tipo"></param>
/// <param name="busqueda"></param>
/// <returns></returns>
        public List<procedimientos> Pato_Procedimientos_Listado(int tipo, string busqueda)
        {
            AnatomiaPatologicaTrueTableAdapters.H2_Pato_Procedimientos_ListadoTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Pato_Procedimientos_ListadoTableAdapter();
            AnatomiaPatologicaTrue.H2_Pato_Procedimientos_ListadoDataTable aTable = adapter.GetData(tipo, busqueda);

            List<procedimientos> list = new List<procedimientos>();
            foreach (AnatomiaPatologicaTrue.H2_Pato_Procedimientos_ListadoRow row in aTable.Rows)
            {
                procedimientos top = new procedimientos();

                top.id = row.id;

                if(!row.IsCodigoNull())
                top.codigo = row.Codigo;

                if(!row.IsDescripcionNull())
                top.descripcion = row.Descripcion;

                list.Add(top);
            }
            return list;
        }

        public int eliminar_Procedimientos(int id)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adaper.H2_Pato_Procedimientos_E(id));
        }


        public int guardar_Editar_Procedimientos(int id, string codigo, string descripcion)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adaper.H2_Pato_Procedimientos_AM(id, codigo, descripcion));
        }

        /// <summary>
        /// ////////////////////////////////
        /// </summary>
        /// <param name="tipo"></param>
        /// <param name="busqueda"></param>
        /// <returns></returns>
        public List<metodos> Pato_Metodos_Listado(int tipo, string busqueda)
        {
            AnatomiaPatologicaTrueTableAdapters.H2_Pato_Metodos_ListadoTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Pato_Metodos_ListadoTableAdapter();
            AnatomiaPatologicaTrue.H2_Pato_Metodos_ListadoDataTable aTable = adapter.GetData(tipo, busqueda);

            List<metodos> list = new List<metodos>();
            foreach (AnatomiaPatologicaTrue.H2_Pato_Metodos_ListadoRow row in aTable.Rows)
            {
                metodos top = new metodos();

                top.id = row.id;
                top.codigo = row.Codigo;

                if(!row.IsDescripcionNull())
                top.descripcion = row.Descripcion;

                list.Add(top);
            }
            return list;
        }

        public int eliminar_Metodos(int id)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adaper.H2_Pato_Metodos_E(id));
        }


        public int guardar_Editar_Metodos(int id, string descripcion)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adaper.H2_Pato_Metodos_AM(id, descripcion));
        }




        /// <summary>
        /// //////////////////////////////////////////////////////////////////////////////////////
        /// </summary>
        /// <param name="tipo"></param>
        /// <param name="busqueda"></param>
        /// <returns></returns>
        public List<metodos> Pato_Diagnosticos_Listado(int tipo, string busqueda)
        {
            AnatomiaPatologicaTrueTableAdapters.H2_Pato_Diagnosticos_ListadoTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Pato_Diagnosticos_ListadoTableAdapter();
            AnatomiaPatologicaTrue.H2_Pato_Diagnosticos_ListadoDataTable aTable = adapter.GetData(tipo, busqueda);

            List<metodos> list = new List<metodos>();
            foreach (AnatomiaPatologicaTrue.H2_Pato_Diagnosticos_ListadoRow row in aTable.Rows)
            {
                metodos top = new metodos();

                top.id = row.id;
                top.codigo = row.Codigo;

                if (!row.IsDescripcionNull())
                    top.descripcion = row.Descripcion;

                list.Add(top);
            }
            return list;
        }

        //public int eliminar_Metodos(int id)
        //{
        //    AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
        //    return Convert.ToInt32(adaper.H2_Pato_Metodos_E(id));
        //}


        public int guardar_Editar_Diagnosticos(int id, string descripcion)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adaper.H2_Pato_Diagnosticos_AM(id, descripcion));
        }

        /// <summary>
        /// /////////////////////////////////////////////////////////////////////////////////////////////////////
        /// </summary>
        /// <returns></returns>

        public List<Patologos> Pato_Medicos_Cent_Listado()
        {
            AnatomiaPatologicaTrueTableAdapters.H2_Pato_medicos_Cent_ListadoTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Pato_medicos_Cent_ListadoTableAdapter();
            AnatomiaPatologicaTrue.H2_Pato_medicos_Cent_ListadoDataTable tabla = new AnatomiaPatologicaTrue.H2_Pato_medicos_Cent_ListadoDataTable();
            tabla = adapter.GetData();
            List<Patologos> lista = new List<Patologos>();
            foreach (AnatomiaPatologicaTrue.H2_Pato_medicos_Cent_ListadoRow row in tabla.Rows)
            {
                Patologos med = new Patologos();
                med.descripcion = row.ApellidoYNombre;
                med.id = row.Id;
                lista.Add(med);
            }
            return lista;
        }

        public List<Patologos> Pato_Medicos_Ext_Listado()
        {
            AnatomiaPatologicaTrueTableAdapters.H2_Pato_Medicos_Ext_ListadoTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Pato_Medicos_Ext_ListadoTableAdapter();
            AnatomiaPatologicaTrue.H2_Pato_Medicos_Ext_ListadoDataTable tabla = new AnatomiaPatologicaTrue.H2_Pato_Medicos_Ext_ListadoDataTable();
            tabla = adapter.GetData();
            List<Patologos> lista = new List<Patologos>();
            foreach (AnatomiaPatologicaTrue.H2_Pato_Medicos_Ext_ListadoRow row in tabla.Rows)
            {
                Patologos med = new Patologos();
                med.descripcion = row.PMED_APE_NOM;
                med.id = row.PMED_ID;
                lista.Add(med);
            }
            return lista;
        }

        public List<sericiosPato> Traer_Servicios_Ext_Anatomia_Patologica()
        {
            AnatomiaPatologicaTrueTableAdapters.H2_Pato_Servicios_Ext_listadoTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Pato_Servicios_Ext_listadoTableAdapter();
            AnatomiaPatologicaTrue.H2_Pato_Servicios_Ext_listadoDataTable aTable = adapter.GetData();
            List<sericiosPato> Lista = new List<sericiosPato>();

            foreach (AnatomiaPatologicaTrue.H2_Pato_Servicios_Ext_listadoRow row in aTable.Rows)
            {
                sericiosPato s = new sericiosPato();
                s.id = row.PSER_ID;
                s.descripcion = row.PSER_DESCRIPCION;
                Lista.Add(s);
            }
            return Lista;
        }

        public List<sericiosPato> Traer_Servicios_Cent_Anatomia_Patologica()
        {
            AnatomiaPatologicaTrueTableAdapters.H2_Pato_Traer_Servicios_CentTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Pato_Traer_Servicios_CentTableAdapter();
            AnatomiaPatologicaTrue.H2_Pato_Traer_Servicios_CentDataTable aTable = adapter.GetData();
            List<sericiosPato> Lista = new List<sericiosPato>();

            foreach (AnatomiaPatologicaTrue.H2_Pato_Traer_Servicios_CentRow row in aTable.Rows)
            {
                sericiosPato s = new sericiosPato();
                s.id = row.SERV_ID;
                s.descripcion = row.SERV_DESCRIPCION;
                Lista.Add(s);
            }
            return Lista;
        }

        public List<nomenclador> traer_Nomenclador(int tipo,string busqueda)
        {
            AnatomiaPatologicaTrueTableAdapters.H2_Pato_Nomencaldor_ListarTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Pato_Nomencaldor_ListarTableAdapter();
            AnatomiaPatologicaTrue.H2_Pato_Nomencaldor_ListarDataTable aTable = adapter.GetData(tipo,busqueda);

            List<nomenclador> list = new List<nomenclador>();
            foreach (AnatomiaPatologicaTrue.H2_Pato_Nomencaldor_ListarRow row in aTable.Rows)
            {
                nomenclador top = new nomenclador();

                top.id = row.id;
                top.descripcion = row.descripcion;
                if (!row.IsprecioNull())
                    top.precio = row.precio;

                list.Add(top);
            }
            return list;
        }


        public int guardar_Editar_Nomenclador(int id, string descripcion, decimal precio)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adaper.H2_Pato_Nomencaldor_AM(id, descripcion, precio));
        }

        public int eliminar_Nomenclador(int id)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adaper.H2_Pato_Nomenclador_E(id));
        }


        public List<tecnicas> traer_Tecnicas(int tipo , string busqueda)
        {
            AnatomiaPatologicaTrueTableAdapters.H2_Pato_Tecnicas_ListadoTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Pato_Tecnicas_ListadoTableAdapter();
            AnatomiaPatologicaTrue.H2_Pato_Tecnicas_ListadoDataTable aTable = adapter.GetData(tipo,busqueda);

            List<tecnicas> list = new List<tecnicas>();
            foreach (AnatomiaPatologicaTrue.H2_Pato_Tecnicas_ListadoRow row in aTable.Rows)
            {
                tecnicas top = new tecnicas();

                top.id = row.id;
                top.descripcion = row.descripcion;
                list.Add(top);
            }
            return list;
        }

        public int guardar_Editar_Tecnicas(int id, string descripcion)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adaper.H2_Pato_Tecnicas_AM(id, descripcion));
        }

        public int eliminar_Tecnicas(int id)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adaper.H2_Pato_Tecnicas_E(id));
        }

        public List<especialidades> Traer_Especialidades_Combo_Anatomia(int id)
        {
            AutorizacionesDALTableAdapters.H2_Autorizaciones_Traer_Especilidades_ComboTableAdapter adapter = new AutorizacionesDALTableAdapters.H2_Autorizaciones_Traer_Especilidades_ComboTableAdapter();
            AutorizacionesDAL.H2_Autorizaciones_Traer_Especilidades_ComboDataTable tabla = new AutorizacionesDAL.H2_Autorizaciones_Traer_Especilidades_ComboDataTable();
            tabla = adapter.GetData(id);
            List<especialidades> lista = new List<especialidades>();
            foreach (AutorizacionesDAL.H2_Autorizaciones_Traer_Especilidades_ComboRow row in tabla.Rows)
            {
                especialidades esp = new especialidades();
                esp.descripcion = row.especialidad;
                esp.id = row.id;
                lista.Add(esp);
            }
            return lista;
        }

        public List<diagnosticoPat> Traer_Diagnosticos_Combo_Anatomia(int cuantos,int id)
        {
            AnatomiaPatologicaTrueTableAdapters.H2_Patologia_Traer_DiagnosticosTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Patologia_Traer_DiagnosticosTableAdapter();
            AnatomiaPatologicaTrue.H2_Patologia_Traer_DiagnosticosDataTable aTable = adapter.GetData(cuantos,id);

            List<diagnosticoPat> list = new List<diagnosticoPat>();
            foreach (AnatomiaPatologicaTrue.H2_Patologia_Traer_DiagnosticosRow row in aTable.Rows)
            {
                diagnosticoPat top = new diagnosticoPat();

                top.id = row.id;
                top.descripcion = row.descripcion;
                list.Add(top);
            }
            return list;
        }

        public List<seccionalPato> SeccionalListar()
        {
            List<seccionalPato> list = new List<seccionalPato>();
            SeccionalesDALTableAdapters.Seccional_ListTableAdapter adapter = new SeccionalesDALTableAdapters.Seccional_ListTableAdapter();
            SeccionalesDAL.Seccional_ListDataTable aTable = adapter.GetData(null);
            foreach (SeccionalesDAL.Seccional_ListRow row in aTable.Rows)
            {
                seccionalPato s = new seccionalPato();
                if (!row.IsIdNull()) s.id = int.Parse(row.Id);
                if (!row.IsDescripcionNull()) s.descripcion = row.Descripcion;
                list.Add(s);
            }
            return list;
        }



        public List<estudioPato> buscar_Estudios(busquedaPato b)
        {
            List<estudioPato> list = new List<estudioPato>();
            AnatomiaPatologicaTrueTableAdapters.H2_Pato_Supreme_SearchTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Pato_Supreme_SearchTableAdapter();
            AnatomiaPatologicaTrue.H2_Pato_Supreme_SearchDataTable aTable = adapter.GetData(b.desdeIng,b.hastaIng,b.paciente,b.dni,b.hc,b.seccional,b.tipoEstudio,b.medicoCentral,
                b.servicio,b.medicoExt,b.servicioExt,b.cDiagnostico,b.material,b.protocolo,b.pacienteExterno,b.nhcExterno);
            foreach (AnatomiaPatologicaTrue.H2_Pato_Supreme_SearchRow row in aTable.Rows)
            {
                estudioPato estudio = new estudioPato();

                estudio.id = row.id;
                estudio.fechaInicio = row.fecha_inicio.ToShortDateString();
                estudio.externo = row.externo;
  

if(!row.IspacienteInternoNull())
    estudio.pacienteInterno = row.pacienteInterno;
 
     if(!row.IsdocumentoInternoNull())
         estudio.documentoInterno = row.documentoInterno;

     if(!row.IshcInternoNull())
         estudio.hcInterno = row.hcInterno; 

if(!row.IsseccionalInternoNull())
    estudio.seccionalInterno = row.seccionalInterno;
 
if(!row.IshcExternoNull())
    estudio.hcExterno = row.hcExterno; 

if(!row.IspacienteExternoNull())
    estudio.pacienteExterno = row.pacienteExterno;
 
if(!row.IsseccionalExternaNull())
    estudio.seccionalExterna = row.seccionalExterna;

if(!row.IstipoEstudioNull())
    estudio.tipoEstudio = row.tipoEstudio;
 
if(!row.IsmedicoInternoNull())
    estudio.medicoInterno = row.medicoInterno;
 
if(!row.IsservicioInternoNull())
    estudio.servicioInterno = row.servicioInterno;
 

if(!row.IsmedicoExternoNull())
    estudio.medicoExterno = row.medicoExterno;

if(!row.IsservioExternoNull())
    estudio.servicioExterno = row.servioExterno;
 
if(!row.IsdiagnosticoNull())
    estudio.diagnosticos = row.diagnostico;

if(!row.IsmaterialNull())
    estudio.material = row.material;


estudio.pendiente = row.pendiente;

estudio.protocolo = row.protocolo;
     
//if(!row.IstenicasEspecialesNull())
//    estudio.tecnicasEspeciales = row.tenicasEspeciales;

list.Add(estudio);
            }
            return list;
        }



        public estudioPato Pato_Traer_Carga_Por_Id(int id)
        {
           // List<estudioPato> list = new List<estudioPato>();
            estudioPato estudio = new estudioPato();
            AnatomiaPatologicaTrueTableAdapters.H2_Pato_Traer_Carga_Por_IdTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Pato_Traer_Carga_Por_IdTableAdapter();
            AnatomiaPatologicaTrue.H2_Pato_Traer_Carga_Por_IdDataTable aTable = adapter.GetData(id);
            
            foreach (AnatomiaPatologicaTrue.H2_Pato_Traer_Carga_Por_IdRow row in aTable.Rows)
            {
               
                estudio.id = row.PAT_ID;
                estudio.fechaInicio = row.PAT_FECHA_INICIO.ToShortDateString();
                if (!row.IsPAT_SOC_NUMNull())
                    estudio.afiliadoId = row.PAT_SOC_ID;

                if(!row.IsPAT_FECHA_SALIDANull())
                    estudio.fechaSalida = row.PAT_FECHA_SALIDA.ToShortDateString();

                if (!row.IsapellidoNull())
                    estudio.pacienteInterno = row.apellido;
 
     if(!row.Isdocumento_realNull())
         estudio.documentoInterno = row.documento_real;

     if(!row.IsHC_UOM_CENTRALNull())
         estudio.hcInterno = row.HC_UOM_CENTRAL; 

if(!row.IsSeccional1Null())
    estudio.seccionalInterno = row.Seccional1;
if (!row.IsSeccionalNull())
    estudio.seccionalInternoId = row.Seccional;
 
if(!row.IsPAT_SOC_HCNull())
    estudio.hcExterno = row.PAT_SOC_HC; 

if(!row.IsPAT_SOC_APE_NOMNull())
    estudio.pacienteExterno = row.PAT_SOC_APE_NOM;
 
if(!row.IsPAT_SOC_SECCNull())
    estudio.seccionalExternaId = row.PAT_SOC_SECC;

if(!row.IsPAT_TIPO_ESTUDIONull())
    estudio.tipoEstudioId = row.PAT_TIPO_ESTUDIO;
 
if(!row.IsPAT_MED_IDNull())
    estudio.medicoInternoId = row.PAT_MED_ID;
 
if(!row.IsPAT_SERV_IDNull())
    estudio.servicioInternoId = row.PAT_SERV_ID;
 
if(!row.IsPAT_ESP_IDNull())
    estudio.especialidadId = row.PAT_ESP_ID; 

if(!row.IsPAT_MED_EXT_IDNull())
    estudio.medicoExternoId = row.PAT_MED_EXT_ID;

if(!row.IsPAT_SERV_EXT_IDNull())
    estudio.servicioExternoId = row.PAT_SERV_EXT_ID;
 
if(!row.IsPAT_DIA_IDNull())
    estudio.diagnosticos = row.PAT_DIA_ID;

                if(!row.IsPAT_MAT_IDNull())
    estudio.materialId = row.PAT_MAT_ID;
 
if(!row.IsPAT_PRO_IDNull())
    estudio.procedimientoId = row.PAT_PRO_ID;

if(!row.IsPAT_MET_IDNull())
    estudio.metodoId = row.PAT_MET_ID;

estudio.protocolo = row.PAT_NUMERO;
     
if(!row.IsPAT_TEC_ESPNull())
    estudio.tecnicasEspeciales = row.PAT_TEC_ESP;
if (!row.IsPAT_NOM_IDNull())
    estudio.nomencladorId = row.PAT_NOM_ID;

if (!row.IsPAT_MACRONull())
    estudio.macro = row.PAT_MACRO;

if (!row.IsPAT_MICRONull())
    estudio.micro = row.PAT_MICRO;

if (!row.IsdiagnosticosDescripcionNull())
    estudio.diagnostico = row.diagnosticosDescripcion;


if (!row.IsPAT_NRO_TACOSNull())
    estudio.tacos = row.PAT_NRO_TACOS;

if (!row.IsPAT_NRO_PREPARANull())
    estudio.preparados = row.PAT_NRO_PREPARA;

if (!row.IsPAT_HORMONALESNull())
    estudio.receptoresHormonales = row.PAT_HORMONALES;

if (!row.IsPAT_PLACANull())
    estudio.placa = row.PAT_PLACA;

if (!row.IsPAT_NRO_TEC_ESPNull())
    estudio.tecEspCantidad = row.PAT_NRO_TEC_ESP;

if (!row.IsPAT_NRO_TEC_IHQNull())
    estudio.tecIhqCantidad = row.PAT_NRO_TEC_IHQ;

if(!row.IsPAT_SOC_IDNull())
 estudio.afiliadoId = row.PAT_SOC_ID;

if (!row.IsPAT_TEC_ESPNull())
    estudio.tecnicasEspecialesIds = row.PAT_TEC_ESP;
else
    estudio.tecnicasEspecialesIds = "";

if (!row.IsPAT_DIA_IDNull())
    estudio.diagnosticosIds = row.PAT_DIA_ID;

if (!row.IstecnicasDescipcionNull())
    estudio.tecnicasEspeciales = row.tecnicasDescipcion;

   estudio.externo = row.externo;

   if (!row.Isdocumento_realNull())
       estudio.documentoInterno = row.documento_real;

   if (!row.IsHC_UOM_CENTRALNull())
       estudio.hcInterno = row.HC_UOM_CENTRAL;

   if (!row.IstelefonoNull())
       estudio.telefono = row.telefono;

   if (!row.IsPAT_SOC_SECCNull())
       estudio.seccionalExternaId = row.PAT_SOC_SECC;

   if (!row.IsPAT_SECCIONAL_EXTNull())
       estudio.seccionalExterna = row.PAT_SECCIONAL_EXT;

   if (!row.Istipo_docNull())
       estudio.tipoDoc = row.tipo_doc;

   if (!row.IsPAT_DIAGNOSTICADORNull())
       estudio.diagnosticador = row.PAT_DIAGNOSTICADOR;

   if (!row.IsPAT_ESPECIALESNull())
       estudio.tecnicasEspViejas = row.PAT_ESPECIALES;

   if (!row.IsPAT_DIAGNull())
       estudio.diagnosticoTab = row.PAT_DIAG;

   if (!row.IsprocedimientoCodNull())
       estudio.procedimientoCod = row.procedimientoCod;

   if (!row.IsmaterialCodNull())
       estudio.materialCod = row.materialCod;

   if (!row.IsmetodoCodNull())
       estudio.metodoCod = row.metodoCod.ToString();


   if (!row.IsinfComplementarioNull())
       estudio.informeComplementario = row.infComplementario;
   else
       estudio.informeComplementario = "";

            }
            return estudio;
        }

        public int Pato_Guardar_Editar(estudioPato obj)
        {
            //int retorno = 0;
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
            //if (Convert.ToInt32(adaper.H2_Pato_Verificar_Existencia_Protocolo(obj.protocolo)) == 0)
            //{
                   return Convert.ToInt32(adaper.H2_Pato_Guardar_Editar(obj.id, obj.fechaInicio, obj.materialId, obj.protocolo, obj.hcExterno, obj.medicoExternoId, obj.servicioInternoId, obj.procedimientoId,
                    obj.metodoId, obj.macro, obj.micro, obj.diagnostico, obj.diagnosticosIds, obj.nomencladorId, obj.fechaSalida, obj.tacos, obj.preparados, obj.tecEspCantidad, obj.tecIhqCantidad,
                    obj.receptoresHormonales, obj.pacienteExterno, obj.afiliadoId, obj.servicioExternoId, obj.medicoInternoId, obj.especialidadId, obj.placa, obj.diagnosticador, obj.tecnicasEspecialesIds,
                    obj.seccionalExterna, obj.tipoEstudioId, obj.seccionalExternaId,obj.usuario, obj.informeComplementario));
            //}
            //return retorno;
        }



        ///////farmacia
        public List<farmaciaPedido> Entregas_Por_Servicio_Cantidad(string desde,string hasta,int servicio){
            ReportesEndoscopiaDALTableAdapters.H2_Entregas_Por_Servicio_CantidadTableAdapter adapter = new ReportesEndoscopiaDALTableAdapters.H2_Entregas_Por_Servicio_CantidadTableAdapter();
            ReportesEndoscopiaDAL.H2_Entregas_Por_Servicio_CantidadDataTable table = new ReportesEndoscopiaDAL.H2_Entregas_Por_Servicio_CantidadDataTable();
            table = adapter.GetData(Convert.ToDateTime(desde),Convert.ToDateTime(hasta),servicio);
            List<farmaciaPedido> lista = new List<farmaciaPedido>();
            foreach (ReportesEndoscopiaDAL.H2_Entregas_Por_Servicio_CantidadRow row in table.Rows)
            {
                farmaciaPedido pedido = new farmaciaPedido();

                if (!row.IscantidadNull())
                    pedido.cantidad = row.cantidad;
                else
                    pedido.cantidad = 0;

                if (!row.IsREM_NOMBRENull())
                    pedido.insumo = row.REM_NOMBRE;
                else
                    pedido.insumo = "";

                if (!row.IsREM_GRAMAJENull())
                    pedido.gramaje = row.REM_GRAMAJE;
                else
                    pedido.gramaje = "";

                if (!row.IspresentacionNull())
                    pedido.presentacion = row.presentacion;
                else
                    pedido.presentacion = "";

                if (!row.IsmedidaNull())
                    pedido.medida = row.medida;
                else
                    pedido.medida = "";

                if (!row.IsMARCANull())
                    pedido.marca = row.MARCA;
                else
                    pedido.marca = "";

                pedido.servicio = row.servicio;

                lista.Add(pedido);
            }
            return lista;
        }

        public int Pato_Verificar_Existencia_Protocolo(int protocolo,int tipo)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adaper.H2_Pato_Verificar_Existencia_Protocolo(protocolo,tipo));
        }

        public int Pato_ReasignarProtocolo(reasinarProtocolo obj)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();

            return Convert.ToInt32(adaper.H2_Pato_ReasignarProtocolo(obj.internoExterno, obj.nhc, obj.seccionalId, obj.seccionalName, obj.afiliadoname, obj.idEstudio));
        }

        public reasinarProtocolo H2_Pato_Traer_Paciente_Encabezado_Reasignado(int pacienteId)
        {
            AnatomiaPatologicaTrueTableAdapters.H2_Pato_Traer_Paciente_Encabezado_ReasignadoTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Pato_Traer_Paciente_Encabezado_ReasignadoTableAdapter();
            AnatomiaPatologicaTrue.H2_Pato_Traer_Paciente_Encabezado_ReasignadoDataTable table = new AnatomiaPatologicaTrue.H2_Pato_Traer_Paciente_Encabezado_ReasignadoDataTable();
            table = adapter.GetData(pacienteId);
            reasinarProtocolo paciente = new reasinarProtocolo();
            foreach (AnatomiaPatologicaTrue.H2_Pato_Traer_Paciente_Encabezado_ReasignadoRow row in table.Rows)
            {

                TimeSpan ts = DateTime.Now.Date - row.fecha_nacimiento;
                
                int anios = ts.Days / 365;
                int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                string str_anios,str_meses;

                if (anios != 1) str_anios = " Años ";
                else str_anios = " Año ";
                if (meses != 1) str_meses = " Meses ";
                else str_meses = " Mes ";

                paciente.edad = anios.ToString() + str_anios + meses.ToString() + str_meses;
                paciente.pacienteInternoName = row.apellido;
                paciente.dni = row.documento_real;
                paciente.telefono = row.telefono;
                paciente.seccionalName = row.Seccional1;
                paciente.nhc = row.HC_UOM_CENTRAL;
                paciente.afiliadoId = row.documento;
                if (!row.IsfotoNEWNull()) { paciente.foto = row.fotoNEW; } else { paciente.foto = "../img/silueta.jpg"; }
            }
            return paciente;
        }

        ///////////////////PAP///////////////////////////////////////////////////////////////////////////////

        public List<PAP_Item> PAP_Traer_Combos(int tipo)
        {
            AnatomiaPatologicaTrueTableAdapters.H2_PAP_Traer_CombosTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_PAP_Traer_CombosTableAdapter();
            AnatomiaPatologicaTrue.H2_PAP_Traer_CombosDataTable table = new AnatomiaPatologicaTrue.H2_PAP_Traer_CombosDataTable();
           
            table = adapter.GetData(tipo);
            List<PAP_Item> lista = new List<PAP_Item>();
            foreach (AnatomiaPatologicaTrue.H2_PAP_Traer_CombosRow row in table.Rows)
            {
                PAP_Item item = new PAP_Item();

                item.id = row.id;
                item.descripcion = row.descripcion;
                item.tipo = row.tipo;
                lista.Add(item);
            }
            return lista;
        }


        public int PAP_Guardar_Editar(PAP_Estudio obj)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();

            return Convert.ToInt32(adaper.H2_PAP_Guardar_Editar(obj.id, obj.pacienteId, obj.usuario, obj.adecuacionMuestra, obj.categoriaGeneral, obj.servicio, obj.fechaIngreso, obj.protocolo,
             obj.flora, obj.microorganismosIds, obj.noNeoplasticos, obj.celulasEscamosas, obj.celulasGladulares, obj.ValoracionHormonal, obj.comentario, obj.fechaDiagnostico, obj.fechaEntrega, obj.fechaNotificacion,
             obj.diagnosticador,obj.pacienteExterno,obj.hcExterno,obj.SeccionalExterna,obj.seccionalExternaName, obj.medicoInternoId,obj.medicoExternoId));
        }


        public List<PAP_Estudio> buscar_PAP(PAP_Estudio pap)
        {
            List<PAP_Estudio> list = new List<PAP_Estudio>();
            AnatomiaPatologicaTrueTableAdapters.H2_PAP_Supreme_ShearchTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_PAP_Supreme_ShearchTableAdapter();
            AnatomiaPatologicaTrue.H2_PAP_Supreme_ShearchDataTable aTable = adapter.GetData(pap.paciente, pap.documento_real, pap.pacienteExterno, pap.hc, pap.hcExterno, pap.SeccionalExterna, pap.adecuacionMuestraIdS, pap.categoriaGeneral, pap.servicio,
                pap.fechaIngresoDesde, pap.fechaIngresoHasta, pap.protocolo, pap.flora, pap.microorganismos, pap.noNeoplasticosIdS, pap.celulasEscamosasIds, pap.celulasGladulares,
                pap.ValoracionHormonal, pap.comentario, pap.fehcaDiagnosticoDesde, pap.fechaDiagnosticoHasta, pap.fechaEntregaDesde, pap.fechaEntregaHasta, pap.fechaNotificacionDesde, pap.fechaNotificacionHasta, pap.diagnosticador, pap.medicoInternoId, pap.medicoExternoId);
            foreach (AnatomiaPatologicaTrue.H2_PAP_Supreme_ShearchRow row in aTable.Rows)
            {
                PAP_Estudio estudio = new PAP_Estudio();
                if (!row.IspacienteIdNull())
                    estudio.pacienteId = row.pacienteId;

                estudio.id = row.id;

                if (!row.IsfechaIngresoNull())
                    estudio.fechaIngreso = row.fechaIngreso.ToShortDateString();

                estudio.externo = row.externo;
                if (!row.IsfechaIngresoNull())
                    estudio.fechaIngreso = row.fechaIngreso.ToShortDateString();

                if (!row.IsfechaEntregaNull())
                    estudio.fechaEntrega = row.fechaEntrega.ToShortDateString();

                if (!row.IsfechaNotificacionNull())
                    estudio.fechaNotificacion = row.fechaNotificacion.ToShortDateString();

                if (!row.IsfechaDiagnosticoNull())
                    estudio.fechaDiagnostico = row.fechaDiagnostico.ToShortDateString();

                if (!row.IspacienteNull())
                    estudio.paciente = row.paciente;

                if (!row.Isdocumento_realNull())
                    estudio.documento_real = row.documento_real;

                if (!row.IshcNull())
                    estudio.hc = row.hc;

                //estudio.seccional = row;

                if (!row.IsseccionalNameNull())
                    estudio.seccionalName = row.seccionalName;

                if (!row.IsseccionalExternaNameNull())
                    estudio.seccionalExternaName = row.seccionalExternaName;

                if (!row.IspacienteExternoNull())
                    estudio.pacienteExterno = row.pacienteExterno;

                if (!row.IshcExternoNull())
                    estudio.hcExterno = row.hcExterno;

                if (!row.IsservicioNombreNull())
                    estudio.servicioName = row.servicioNombre;

                if (!row.IsadecuacionMuestraNombreNull())
                    estudio.adecuacionMuestraName = row.adecuacionMuestraNombre;

                if (!row.IscategoriaGeneralNombreNull())
                    estudio.categoriaGeneralName = row.categoriaGeneralNombre;

                if (!row.IsservicioNull())
                    estudio.servicio = row.servicio;


                if (!row.IsnoNeoplasticosNombreNull())
                    estudio.noNeoplasticosName = row.noNeoplasticosNombre;

                if (!row.IsmicroorganismosNull())
                    estudio.microorganismosIds = row.microorganismos;

                if (!row.IsmicroorganismosNombreNull())
                    estudio.microorganismosName = row.microorganismosNombre;

                if (!row.IscelulasGladularesNull())
                    estudio.celulasGladulares = row.celulasGladulares;

                if (!row.IscelulasGladularesNombreNull())
                    estudio.celulasGladularesName = row.celulasGladularesNombre;

                if (!row.IsValoracionHormonalNull())
                    estudio.ValoracionHormonal = row.ValoracionHormonal;

                if (!row.IsValoracionHormonalNombreNull())
                    estudio.ValoracionHormonalName = row.ValoracionHormonalNombre;


                estudio.protocolo = row.protocolo;
                estudio.diagnosticador = row.diagnosticador;

                if (!row.IsdiagnosticadorNombreNull())
                    estudio.diagnosticadorName = row.diagnosticadorNombre;

                //if (!row.IscelulasEscamosasNull())
                //    estudio.celulasEscamosas = row.celulasEscamosas;

                if (!row.IscelulasEscamosasNombreNull())
                    estudio.celulasEscamosasName = row.celulasEscamosasNombre;

                if (!row.IsmedicoInterno1Null())
                    estudio.medicoInternoName = row.medicoInterno1;

                if (!row.IsmedicoExterno1Null())
                    estudio.medicoExternoName = row.medicoExterno1;

                list.Add(estudio);
            }
            return list;
        }


        public PAP_Estudio PAP_Traer_Carga_Por_Id(int id)
        {
            // List<estudioPato> list = new List<estudioPato>();
            PAP_Estudio estudio = new PAP_Estudio();
            AnatomiaPatologicaTrueTableAdapters.H2_PAP_Traer_Carga_Por_IdTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_PAP_Traer_Carga_Por_IdTableAdapter();
            AnatomiaPatologicaTrue.H2_PAP_Traer_Carga_Por_IdDataTable aTable = adapter.GetData(id);

            foreach (AnatomiaPatologicaTrue.H2_PAP_Traer_Carga_Por_IdRow row in aTable.Rows)
            {

                estudio.id = row.id;
                estudio.externo = row.externo;

                if (!row.IspacienteIdNull())
                    estudio.pacienteId = row.pacienteId;

                if (!row.IspacienteExternoNull())
                    estudio.pacienteExterno = row.pacienteExterno;

                if (!row.IshcExternoNull())
                    estudio.hcExterno = row.hcExterno;

                if (!row.IsseccionalExternaNameNull())
                    estudio.seccionalExternaName = row.seccionalExternaName;

                estudio.fechaIngreso = row.fechaIngreso.ToShortDateString();

                if (!row.IsfechaDiagnosticoNull())
                    estudio.fechaDiagnostico = row.fechaDiagnostico.ToShortDateString();

                if (!row.IsfechaNotificacionNull())
                    estudio.fechaNotificacion = row.fechaNotificacion.ToShortDateString();

                if (!row.IsfechaEntregaNull())
                    estudio.fechaEntrega = row.fechaEntrega.ToShortDateString();

                if (!row.IsadecuacionMuestraNamesNull())
                    estudio.adecuacionMuestraName = row.adecuacionMuestraNames;

                if (!row.IsadecuacionMuestraNull())
                    estudio.adecuacionMuestra = row.adecuacionMuestra;

                if (!row.IscategoriaGeneralNull())
                    estudio.categoriaGeneral = row.categoriaGeneral;

                if (!row.IsservicioNull())
                    estudio.servicio = row.servicio;

                if (!row.IsprotocoloNull())
                    estudio.protocolo = row.protocolo;

                if (!row.IsfloraNull())
                    estudio.flora = row.flora;

                if (!row.IsmicroorganismosNull())
                    estudio.microorganismosIds = row.microorganismos;


                if (!row.IsmicroorganismosNamesNull())
                    estudio.microorganismosName = row.microorganismosNames;

                if (!row.IsnoNeoplasticosNull())
                    estudio.noNeoplasticos = row.noNeoplasticos;

                if (!row.IshallazgosNoNeoplasicosNull())
                    estudio.noNeoplasticosName = row.hallazgosNoNeoplasicos;

                if (!row.IscelulasEscamosas1Null())
                    estudio.celulasEscamosas = row.celulasEscamosas1;


                if (!row.IscelulasEscamosasNamesNull())
                    estudio.celulasEscamosasName = row.celulasEscamosasNames;

                if (!row.IscelulasGladularesNull())
                    estudio.celulasGladulares = row.celulasGladulares;

                if (!row.IsValoracionHormonalNull())
                    estudio.ValoracionHormonal = row.ValoracionHormonal;

                if (!row.IscomentarioNull())
                    estudio.comentario = row.comentario;

                if (!row.IsdiagnosticadorNull())
                    estudio.diagnosticador = row.diagnosticador;

                if (!row.IsmedicoInternoNull())
                    estudio.medicoInternoId = row.medicoInterno;

                if (!row.IsmedicoExternoNull())
                    estudio.medicoExternoId = row.medicoExterno;

            }
            return estudio;
        }

        public List<PAP_Estudio_Viejo> PAP_Traer_Estudio_Viejo(int idPaciente, string nombrePacienteExt, int extInt)
        {
            List<PAP_Estudio_Viejo> lista = new List<PAP_Estudio_Viejo>();
            
            AnatomiaPatologicaTrueTableAdapters.H2_PAP_Traer_Estudios_ViejosTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_PAP_Traer_Estudios_ViejosTableAdapter();
            AnatomiaPatologicaTrue.H2_PAP_Traer_Estudios_ViejosDataTable aTable = adapter.GetData(idPaciente,nombrePacienteExt,extInt);

            foreach (AnatomiaPatologicaTrue.H2_PAP_Traer_Estudios_ViejosRow row in aTable.Rows)
            {
                PAP_Estudio_Viejo estudio = new PAP_Estudio_Viejo();
                estudio.id = row.id;

                if (!row.IsseccionalNull())
                    estudio.seccional = row.seccional;

                if (!row.IsprotocoloNull())
                    estudio.protocolo = row.protocolo;

                if (!row.IsapellidoNull())
                    estudio.apellido = row.apellido;

                if (!row.Istipo_docNull())
                    estudio.tipo_doc = row.tipo_doc;

                if (!row.IsidPacienteNull())
                    estudio.idPaciente = row.idPaciente;

                if(!row.Isdocumento_realNull())
                    estudio.documento_real = row.documento_real;

                if (!row.IshcNull())
                    estudio.hc = row.hc;

                if (!row.IsmedicoNull())
                    estudio.medico = row.medico;
                else
                    estudio.medico = "";

                if (!row.IsfechaCargaNull())
                    estudio.fechaCarga = row.fechaCarga.ToShortDateString();

                if (!row.Isfecha_entregaNull())
                    estudio.fecha_entrega = row.fecha_entrega.ToShortDateString();

                if (!row.IscondicionMuestraNull())
                    estudio.condicionMuestra = row.condicionMuestra;
                else
                    estudio.condicionMuestra = "";

                if (!row.IsevaluacionNull())
                    estudio.evaluacion = row.evaluacion;
                else
                    estudio.evaluacion = "";


                if (!row.IsvinculableNull())
                    estudio.vinculable = row.vinculable;
                else
                    estudio.vinculable = "";

                if (!row.IsdiagnosticoNull())
                    estudio.diagnostico = row.diagnostico;
                else
                    estudio.diagnostico = "";

                if (!row.IsglandularesNull())
                    estudio.glandulares = row.glandulares;
                else
                    estudio.glandulares = "";

                if (!row.IsescamosasNull())
                    estudio.escamosas = row.escamosas;
                else
                    estudio.escamosas = "";

                if (!row.IscomentarioDiagnosticoNull())
                    estudio.comentarioDiagnostico = row.comentarioDiagnostico;
                else
                    estudio.comentario = "";

                if (!row.Isotros_comentarioNull())
                    estudio.otros_comentario = row.otros_comentario;
                else
                    estudio.comentario = "";

                if (!row.IsotrosElementosNull())
                    estudio.otrosElementos = row.otrosElementos;
                else
                    estudio.otrosElementos = "";

                if (!row.IssuperficialesNull())
                    estudio.superficiales = row.superficiales;

                if (!row.IsintermediasNull())
                    estudio.intermedias = row.intermedias;

                if (!row.IsparabasalesNull())
                    estudio.parabasales = row.parabasales;

                if (!row.IsaspectoNull())
                    estudio.aspecto = row.aspecto;


                if (!row.IspresenciaNull())
                    estudio.presencia = row.presencia;

                if (!row.IselementosNull())
                    estudio.elementos = row.elementos;


                lista.Add(estudio);
            }
            return lista;
        }

        public int PATO_Borrar(int protocolo)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();

            return Convert.ToInt32(adaper.H2_Pato_Eliminar_Protocolo(protocolo));
        }

        public int PAP_Borrar(int protocolo)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();

            return Convert.ToInt32(adaper.H2_PAP_Eliminar_Protocolo(protocolo));
        }


        public int Pap_ReasignarProtocolo(reasinarProtocolo obj)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();

            return Convert.ToInt32(adaper.H2_Pap_ReasignarProtocolo(obj.internoExterno, obj.nhc, obj.seccionalId, obj.seccionalName, obj.afiliadoname, obj.idEstudio));
        }

        public reasinarProtocolo H2_Pap_Traer_Paciente_Encabezado_Reasignado(int pacienteId)
        {
            AnatomiaPatologicaTrueTableAdapters.H2_Pap_Traer_Paciente_Encabezado_ReasignadoTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Pap_Traer_Paciente_Encabezado_ReasignadoTableAdapter();
            AnatomiaPatologicaTrue.H2_Pap_Traer_Paciente_Encabezado_ReasignadoDataTable table = new AnatomiaPatologicaTrue.H2_Pap_Traer_Paciente_Encabezado_ReasignadoDataTable();
            table = adapter.GetData(pacienteId);
            reasinarProtocolo paciente = new reasinarProtocolo();
            foreach (AnatomiaPatologicaTrue.H2_Pap_Traer_Paciente_Encabezado_ReasignadoRow row in table.Rows)
            {

                TimeSpan ts = DateTime.Now.Date - row.fecha_nacimiento;

                int anios = ts.Days / 365;
                int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                string str_anios, str_meses;

                if (anios != 1) str_anios = " Años ";
                else str_anios = " Año ";
                if (meses != 1) str_meses = " Meses ";
                else str_meses = " Mes ";

                paciente.edad = anios.ToString() + str_anios + meses.ToString() + str_meses;
                paciente.pacienteInternoName = row.apellido;
                paciente.dni = row.documento_real;
                paciente.telefono = row.telefono;
                paciente.seccionalName = row.Seccional1;
                paciente.nhc = row.HC_UOM_CENTRAL;
                paciente.afiliadoId = row.documento;
            }
            return paciente;
        }


        public List<reasinarProtocolo> H2_PAP_Traer_Paciente_Externo(string paciente, string nhc, int tipo)
        {
            AnatomiaPatologicaTrueTableAdapters.H2_PAP_Traer_Paciente_ExternoTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_PAP_Traer_Paciente_ExternoTableAdapter();
            AnatomiaPatologicaTrue.H2_PAP_Traer_Paciente_ExternoDataTable table = new AnatomiaPatologicaTrue.H2_PAP_Traer_Paciente_ExternoDataTable();
            table = adapter.GetData(paciente, nhc, tipo);
            List<reasinarProtocolo> lista = new  List<reasinarProtocolo>();
            foreach (AnatomiaPatologicaTrue.H2_PAP_Traer_Paciente_ExternoRow row in table.Rows)
            {
                reasinarProtocolo p = new reasinarProtocolo();

                if (!row.IspacienteExternoNull())
                    p.afiliadoname = row.pacienteExterno;
                else
                    p.afiliadoname = "";

                if (!row.IshcExternoNull())
                    p.nhc = row.hcExterno;
                else
                    p.nhc = "";

                if (!row.IsSeccionalExternaNull())
                    p.seccionalId = row.SeccionalExterna;
                else
                    p.seccionalId = 0;

                if (!row.IsseccionalExternaNameNull())
                    p.seccionalName = row.seccionalExternaName;
                else
                    p.seccionalName = "";

                lista.Add(p);
            }
            return lista;
        }


        public List<busquedaPato> Traer_Estudios_Patologia_Externos()
        {
            AnatomiaPatologicaTrueTableAdapters.H2_Traer_Estudios_Patologia_ExternosTableAdapter adapter = new AnatomiaPatologicaTrueTableAdapters.H2_Traer_Estudios_Patologia_ExternosTableAdapter();
            AnatomiaPatologicaTrue.H2_Traer_Estudios_Patologia_ExternosDataTable table = new AnatomiaPatologicaTrue.H2_Traer_Estudios_Patologia_ExternosDataTable();
            table = adapter.GetData();
            List<busquedaPato> lista = new List<busquedaPato>();
            foreach (AnatomiaPatologicaTrue.H2_Traer_Estudios_Patologia_ExternosRow row in table.Rows)
            {
                busquedaPato p = new busquedaPato();

                    p.PAT_ID = row.PAT_ID;
                    p.protocolo = row.PAT_NUMERO;

                    if (!row.IsPAT_SOC_APE_NOMNull())
                    p.pacienteExterno = row.PAT_SOC_APE_NOM;
                else
                        p.pacienteExterno = "";

                if (!row.IsPAT_SOC_HCNull())
                    p.hc = row.PAT_SOC_HC;
                else
                    p.hc = "";

                lista.Add(p);
            }
            return lista;
        }


        public int Actualizar_Seccional_Externa_Patologia(long PAT_ID, string pat_seccional_ext)
        {
            AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter adaper = new AnatomiaPatologicaTrueTableAdapters.QueriesTableAdapter();
            return Convert.ToInt32(adaper.H2_Actualizar_Seccional_Externa_Patologia(PAT_ID, pat_seccional_ext));
        }


    }
}
