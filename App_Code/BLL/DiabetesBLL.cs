using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for DiabetesBLL
/// </summary>
/// 
namespace Hospital
{
    public class DiabetesBLL
    {
        public DiabetesBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<pacientes> Paciente_ID(long ID)
        {
            List<pacientes> lista = new List<pacientes>();
            DiabetesDALL2TableAdapters.H2_Afiliado_Encabezado_ID_ManuelTableAdapter adapter = new DiabetesDALL2TableAdapters.H2_Afiliado_Encabezado_ID_ManuelTableAdapter();
            DiabetesDALL2.H2_Afiliado_Encabezado_ID_ManuelDataTable aTable = new DiabetesDALL2.H2_Afiliado_Encabezado_ID_ManuelDataTable(); 
      
            aTable = adapter.GetData(ID);

            int pos = 0;
            pacientes p = new pacientes();
            foreach (DiabetesDALL2.H2_Afiliado_Encabezado_ID_ManuelRow row in aTable.Rows)
            {
                pos++;
                p.Nro_Busqueda = pos;
                p.cuil_titu = row.cuil_titu;
                p.cuil = row.cuil;
                p.cod_pariente = row.Cod_Pariente.ToString();
                if (!row.IsCarnetNull()) { p.carnet = row.Carnet; }
               

                if (!row.IsFecha_BajaNull())
                    p.Fecha_Baja = row.Fecha_Baja;
                else p.Fecha_Baja = Convert.ToDateTime("01/01/1900");

                if (p.Fecha_Baja <= DateTime.Now && !p.Fecha_Baja.ToShortDateString().Equals("01/01/1900")) p.Vencido = true;
                else p.Vencido = false;

                p.FechaVencido = p.Fecha_Baja.ToShortDateString();

                if (!row.IsLocalidadNull()) { p.localidad = row.Localidad; }

                if (!row.Isfecha_nacimientoNull()) p.fecha_nacimiento = row.fecha_nacimiento;
                if (!row.IsSeccionalNull()) p.Seccional = row.Seccional;
                if (!row.IsNro_SeccionalNull()) p.Nro_Seccional = row.Nro_Seccional.ToString(); else p.Nro_Seccional = "999";

                if (!row.IscalleNull())
                {
                    if (!row.IsnumeroNull())
                    {
                        p.calle = row.calle + " " + row.numero;
                    }
                    p.calle = row.calle;
                }

                TimeSpan ts = DateTime.Now.Date - p.fecha_nacimiento;
                p.fec = p.fecha_nacimiento.Year;

                int anios = ts.Days / 365;
                int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                //int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
                string str_anios, str_meses;

                if (anios != 1) str_anios = " Años ";
                else str_anios = " Año ";
                if (meses != 1) str_meses = " Meses ";
                else str_meses = " Mes ";

                p.Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

                p.Paciente = row.apellido;
                p.documento = row.documento;

                p.documento_real = row.documento_real;
                p.TipoDoc = row.cod_tipo;

                if (!row.IstelefonoNull()) p.Telefono = row.telefono;

                p.Titular = "";
                p.NHC = row.cuil;

                p.ObraSocial = row.OS;
                p.OSId = row.OSId;

                if (!row.IsPMINull()) { p.PMI = row.PMI; } else { p.PMI = false; }
                if (!row.IsPINull()) { p.PI = row.PI; } else { p.PI = false; }

                if (!row.IsDiscapacidadNull())
                {
                    p.Discapacidad = Convert.ToInt32(row.Discapacidad);

                }
                else
                {
                    p.Discapacidad = 0;
                }

                if (!row.IsHC_UOM_CENTRALNull())
                    p.NHC_UOM = row.HC_UOM_CENTRAL;
                else p.NHC_UOM = string.Empty;

                if (!row.IsObservacionesNull()) p.Observaciones = row.Observaciones;
                else p.Observaciones = string.Empty;

            

                lista.Add(p);
            }

            return lista;
        }

        public List<DiagnosticoYclinica> Traer_Diagnostico_Y_clinica()
        {
            List<DiagnosticoYclinica> lista = new List<DiagnosticoYclinica>();
            DiabetesDALL2TableAdapters.H2_Diabetes_Traer_Diagnostico_Y_ClinicaTableAdapter adapter = new DiabetesDALL2TableAdapters.H2_Diabetes_Traer_Diagnostico_Y_ClinicaTableAdapter();
            DiabetesDALL2.H2_Diabetes_Traer_Diagnostico_Y_ClinicaDataTable table = new DiabetesDALL2.H2_Diabetes_Traer_Diagnostico_Y_ClinicaDataTable();
            table = adapter.GetData();

            foreach(DiabetesDALL2.H2_Diabetes_Traer_Diagnostico_Y_ClinicaRow row in table.Rows)
            {
                DiagnosticoYclinica diagnostico = new DiagnosticoYclinica();
                diagnostico.Diag_Cli_Items_Id = row.Diag_Cli_Items_Id;
                diagnostico.nombre = row.Diag_Cli_Items_Descripcion;
                lista.Add(diagnostico);
            }
            return lista;
        }

        public List<complicaciones> Traer_Complicaciones()
        {
            List<complicaciones> lista = new List<complicaciones>();
            DiabetesDALL2TableAdapters.H2_Diabetes_Traer_ComplicacionesTableAdapter adapter = new DiabetesDALL2TableAdapters.H2_Diabetes_Traer_ComplicacionesTableAdapter();
            DiabetesDALL2.H2_Diabetes_Traer_ComplicacionesDataTable table = new DiabetesDALL2.H2_Diabetes_Traer_ComplicacionesDataTable();
            table = adapter.GetData();

            foreach (DiabetesDALL2.H2_Diabetes_Traer_ComplicacionesRow row in table.Rows)
            {
                complicaciones diagnostico = new complicaciones ();
                diagnostico.Complicaciones_Items_Id = row.Complicaciones_Items_Id;
                diagnostico.nombre = row.Complicaciones_Items_Descripcion;
                lista.Add(diagnostico);
            }
            return lista;
        }

        public List<Estudios> Traer_Estudios()
        {
            List<Estudios> lista = new List<Estudios>();
            DiabetesDALL2TableAdapters.H2_Diabetes_Traer_EstudiosTableAdapter adapter = new DiabetesDALL2TableAdapters.H2_Diabetes_Traer_EstudiosTableAdapter();
            DiabetesDALL2.H2_Diabetes_Traer_EstudiosDataTable table = new DiabetesDALL2.H2_Diabetes_Traer_EstudiosDataTable();
            table = adapter.GetData();

            foreach (DiabetesDALL2.H2_Diabetes_Traer_EstudiosRow row in table.Rows)
            {
                Estudios diagnostico = new Estudios();
                diagnostico.id = row.Estudios_Items_Id;
                diagnostico.nombre = row.Estudios_Items_Descripcion;
                lista.Add(diagnostico);
            }
            return lista;
        }

        public List<Tratamiento> Traer_Tratamiento()
        {
            List<Tratamiento> lista = new List<Tratamiento>();
            DiabetesDALL2TableAdapters.H2_Diabetes_Traer_TratamientoTableAdapter adapter = new DiabetesDALL2TableAdapters.H2_Diabetes_Traer_TratamientoTableAdapter();
            DiabetesDALL2.H2_Diabetes_Traer_TratamientoDataTable table = new DiabetesDALL2.H2_Diabetes_Traer_TratamientoDataTable();
            table = adapter.GetData();

            foreach (DiabetesDALL2.H2_Diabetes_Traer_TratamientoRow row in table.Rows)
            {
                Tratamiento diagnostico = new Tratamiento();
                diagnostico.id = row.Tratamiento_Items_Id;
                diagnostico.nombre = row.Tratamiento_Items_Descripcion;
                lista.Add(diagnostico);
            }
            return lista;
        }

        public List<Insulinas> Traer_Insulinas()
        {
            List<Insulinas> lista = new List<Insulinas>();
            DiabetesDALL2TableAdapters.H2_Diabetes_Traer_InsulinasTableAdapter adapter = new DiabetesDALL2TableAdapters.H2_Diabetes_Traer_InsulinasTableAdapter();
            DiabetesDALL2.H2_Diabetes_Traer_InsulinasDataTable table = new DiabetesDALL2.H2_Diabetes_Traer_InsulinasDataTable();
            table = adapter.GetData();

            foreach (DiabetesDALL2.H2_Diabetes_Traer_InsulinasRow row in table.Rows)
            {
                Insulinas insulina = new Insulinas();
                insulina.id = row.IdInsulina;
                insulina.nombre = row.Descripcion;
                insulina.basal = row.basal;
                insulina.correccion = row.correccion;
                insulina.codigo = row.codigo;
                insulina.nombreComercial = row.nombreComercial;
                lista.Add(insulina);
            }
            return lista;
        }

        public List<EstudiosExtras> Traer_Estudios_Extras()
        {
            List<EstudiosExtras> lista = new List<EstudiosExtras>();
            DiabetesDALL2TableAdapters.H2_Diabetes_Traer_Estudios_ExtrasTableAdapter adapter = new DiabetesDALL2TableAdapters.H2_Diabetes_Traer_Estudios_ExtrasTableAdapter();
            DiabetesDALL2.H2_Diabetes_Traer_Estudios_ExtrasDataTable table = new DiabetesDALL2.H2_Diabetes_Traer_Estudios_ExtrasDataTable();
            table = adapter.GetData();

            foreach (DiabetesDALL2.H2_Diabetes_Traer_Estudios_ExtrasRow row in table.Rows)
            {
                EstudiosExtras Estudio = new EstudiosExtras();
                Estudio.Estudios_Id = row.Estudios_Id;
                Estudio.Descripcion = row.Descripcion;
                Estudio.Microalbuminuria = row.Microalbumiura;
                Estudio.FondoDeOjo = row.FondoDeOjo;
                Estudio.Visible = row.Visible;

                lista.Add(Estudio);
            }
            return lista;
        }

        //guardar cabecera
        public long Guardar_Diabetes_Encabezado(Diabetes_Cabecera objCabeceraDiabetes)
        {
            DiabetesDALL2TableAdapters.QueriesTableAdapter adapter = new DiabetesDALL2TableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Diabetes_Guardar_Cabecera(objCabeceraDiabetes.Diabetes_Gral_Id, objCabeceraDiabetes.Diabetes_Gral_PacienteId, Convert.ToInt32( objCabeceraDiabetes.Diabetes_Gral_Edad),objCabeceraDiabetes.UsuarioId,false );
            return Convert.ToInt64(obj);           
        }

        //guardar diagnostico y clinica cabecera
        public long Diabetes_Diagnostico_Y_Clinica_Cabecera(Diabetes_Diagnostico_Y_Clinica_Cabecera DiabetesDiagnosticoYClinicaCabecera)
        {
            DiabetesDALL2TableAdapters.QueriesTableAdapter adapter = new DiabetesDALL2TableAdapters.QueriesTableAdapter();

            object obj = adapter.H2_Diabetes_Guardar_Diagnostico_y_Clinica_Cabecera(DiabetesDiagnosticoYClinicaCabecera.Diabetes_Gral_Id, DiabetesDiagnosticoYClinicaCabecera.DiagYclinica_Id, DiabetesDiagnosticoYClinicaCabecera.DiagYclinica_Fecha,DiabetesDiagnosticoYClinicaCabecera.DiagYclinica_Edad_Diagno);
            return Convert.ToInt64(obj);
        }

        //guardar diagnostico y clinica detalle
        public long Diabetes_Diagnostico_Y_Clinica_Detalle(List<DiagnosticoYclinica> listaDiagnosticoYclinica, long DiabetesCabecerID)
        {
            DiabetesDALL2TableAdapters.QueriesTableAdapter adapter = new DiabetesDALL2TableAdapters.QueriesTableAdapter();

            adapter.H2_Diabetes_Borrar_Diagnostico_Y_Clinica_Resultados(DiabetesCabecerID);

            object obj = new object();
            foreach (DiagnosticoYclinica item in listaDiagnosticoYclinica) { 
            
             obj = adapter.H2_Diabetes_Guardar_Diagnostico_Y_Clinica_Resultados(item.Diag_Cli_Resultados_Id, item.Diabetes_Gral_Id, item.Diag_Cli_Items_Id, item.Diag_Cli_Items_Resultado,false);
            }
            return Convert.ToInt64(obj);
        }

        //guardar complicaciones detalle
        public long Diabetes_Compicaciones_Detalle(List<complicaciones> ListaComplicaciones, long DiabetesCabecerID)
        {
            DiabetesDALL2TableAdapters.QueriesTableAdapter adapter = new DiabetesDALL2TableAdapters.QueriesTableAdapter();

            adapter.H2_Diabetes_Borrar_Complicaciones_Resultados(DiabetesCabecerID);

            object obj = new object();
            foreach (complicaciones item in ListaComplicaciones)
            {

                obj = adapter.H2_Diabetes_Guardar_Complicaciones_Resultados(item.Complicaciones_Id, item.Diabetes_Gral_Id, item.Complicaciones_Items_Id, item.Complicaciones_Resultado,item.Complicaciones_Resultado_Fecha,false);
            }
            return Convert.ToInt64(obj.ToString());
        }

        //guardar tratamiento  cabecera
        public long Diabetes_Tratamiento_Cabecera(tratamiento TratamientoCabecera)
        {
            DiabetesDALL2TableAdapters.QueriesTableAdapter adapter = new DiabetesDALL2TableAdapters.QueriesTableAdapter();

            object obj = adapter.H2_Diabetes_Guardar_Tratamieto(TratamientoCabecera.Diabetes_Gral_Id,TratamientoCabecera.Tratamiento_Id, TratamientoCabecera.Tratamiento_InsulinaBasal, TratamientoCabecera.Tratamiento_Insulina_Correccion, TratamientoCabecera.MarcaComercial_Basal,TratamientoCabecera.MarcaComercial_Correcion);
            return Convert.ToInt64(obj);
        }

        //guardar tratamieto detalle
        public long Diabetes_Tratamiento_Detalle(List<trataientoDetalle> ListaTratamiento, long DiabetesCabecerID)
        {
            DiabetesDALL2TableAdapters.QueriesTableAdapter adapter = new DiabetesDALL2TableAdapters.QueriesTableAdapter();

            adapter.H2_Diabetes_Borrar_Tratamiento_Resultados(DiabetesCabecerID);

            object obj = new object();
            foreach (trataientoDetalle item in ListaTratamiento)
            {

                obj = adapter.H2_Diabetes_Guardar_Tratamiento_Detalles(item.Diabetes_Gral_Id, item.Tratamiento_Items_Id, item.Tratamiento_Resultados,false);
            }
            return Convert.ToInt64(obj.ToString());
        }

        //guardar estudio detalle
        public long Diabetes_Estudio_Detalle(List<EstudiosDetalle> ListaEstudios, long DiabetesCabecerID)
        {
            DiabetesDALL2TableAdapters.QueriesTableAdapter adapter = new DiabetesDALL2TableAdapters.QueriesTableAdapter();

            adapter.H2_Diabetes_Borar_Estudios_Resultados(DiabetesCabecerID);

            object obj = new object();
            foreach (EstudiosDetalle item in ListaEstudios)
            {

                
                obj = adapter.H2_Diabetes_Guardar_Estudios_Detalles(item.Diabetes_Gral_Id, item.Estudios_Items_Id, item.Estudios_Resultados, item.Estudios_Fecha, item.Estudios_Combo,false);
            }
            return Convert.ToInt64(obj.ToString());
        }


        public List<PacienteDiabetico> Existe_Paciente(string nombre, long DNI, string Tdni, string NHC)
        {
            DiabetesDALL2TableAdapters.H2_Diabetes_Buscar_PacientesTableAdapter adapter = new DiabetesDALL2TableAdapters.H2_Diabetes_Buscar_PacientesTableAdapter();
            DiabetesDALL2.H2_Diabetes_Buscar_PacientesDataTable atable = new DiabetesDALL2.H2_Diabetes_Buscar_PacientesDataTable();

            List<PacienteDiabetico> P = new List<PacienteDiabetico>();

            atable = adapter.GetData(NHC, DNI, nombre, Tdni);

            foreach (DiabetesDALL2.H2_Diabetes_Buscar_PacientesRow row in atable.Rows)
            {
                PacienteDiabetico pa = new PacienteDiabetico();
                pa.PacienteId = row.documento;
                pa.Nombre = row.apellido;
                pa.dni = row.documento_real;
                pa.seccional = row.seccional; 

                P.Add(pa);
            }

            return P;
        }


        public List<PacienteDiabetico> Traer_Consultas(long NHC)
        {
            DiabetesDALL2TableAdapters.H2_Diabetes_Traer_ConsultasTableAdapter adapter = new DiabetesDALL2TableAdapters.H2_Diabetes_Traer_ConsultasTableAdapter();
            DiabetesDALL2.H2_Diabetes_Traer_ConsultasDataTable atable = new DiabetesDALL2.H2_Diabetes_Traer_ConsultasDataTable();

            List<PacienteDiabetico> L = new List<PacienteDiabetico>();

            atable = adapter.GetData(NHC);

            foreach (DiabetesDALL2.H2_Diabetes_Traer_ConsultasRow row in atable.Rows)
            {
                PacienteDiabetico P = new PacienteDiabetico();
                P.PacienteId = row.Diabetes_Gral_PacienteId;
                P.Diabetes_Gral_Id = row.Diabetes_Gral_Id;
                P.Nombre = row.apellido;
                P.FechaConsulta = row.Diabetes_Gral_Fecha_Guardado.ToShortDateString();
                P.FechaModificacion = row.Diabetes_Gral_Fecha_Actualizado.ToShortDateString();
                if(!row.IsnombreNull())
                P.Doctor = row.nombre;

                L.Add(P);
            }

            return L;
        }


        public ConsultaDiabetes Traer_Una_Consulta(long IdConsulta)
        {
            ConsultaDiabetes C = new ConsultaDiabetes();
            //cabecera
            DiabetesDALL2TableAdapters.H2_Diabetes_Mostrar_CabeceraTableAdapter Acabecera = new DiabetesDALL2TableAdapters.H2_Diabetes_Mostrar_CabeceraTableAdapter();
            DiabetesDALL2.H2_Diabetes_Mostrar_CabeceraDataTable Tcabecera = new DiabetesDALL2.H2_Diabetes_Mostrar_CabeceraDataTable();
            Tcabecera = Acabecera.GetData(IdConsulta);
            foreach (DiabetesDALL2.H2_Diabetes_Mostrar_CabeceraRow row in Tcabecera.Rows) 
            {
                C.Diabetes_Cabecera_obj.UsuarioId = row.Usuario;
                C.Diabetes_Cabecera_obj.Diabetes_Gral_Edad = row.Diabetes_Gral_Edad.ToString();
            }


            //dignostico y clinica cabecera
            DiabetesDALL2TableAdapters.H2_Diabetes_Mostrar_Diagnostico_Y_Clinica_CabeceraTableAdapter AdiagYcliCabecera = new DiabetesDALL2TableAdapters.H2_Diabetes_Mostrar_Diagnostico_Y_Clinica_CabeceraTableAdapter();
            DiabetesDALL2.H2_Diabetes_Mostrar_Diagnostico_Y_Clinica_CabeceraDataTable TdiagYcliCabecera = new DiabetesDALL2.H2_Diabetes_Mostrar_Diagnostico_Y_Clinica_CabeceraDataTable();
            TdiagYcliCabecera = AdiagYcliCabecera.GetData(IdConsulta);
            foreach (DiabetesDALL2.H2_Diabetes_Mostrar_Diagnostico_Y_Clinica_CabeceraRow row in TdiagYcliCabecera.Rows)
            {
                Diabetes_Diagnostico_Y_Clinica_Cabecera dycCabecera = new Diabetes_Diagnostico_Y_Clinica_Cabecera();

                dycCabecera.DiagYclinica_Edad_Diagno = row.DiagYclinica_Edad_Diagno;
                dycCabecera.DiagYclinica_Fecha = row.DiagYclinica_Fecha;


                C.Diabetes_Diagnostico_Y_Clinica_Cabecera_obj = dycCabecera;
            }

            //dignostico y clinica detalles
            DiabetesDALL2TableAdapters.H2_Diabetes_Mostrar_Diagnostico_Y_ClinicaTableAdapter AdiagYcli = new DiabetesDALL2TableAdapters.H2_Diabetes_Mostrar_Diagnostico_Y_ClinicaTableAdapter();
            DiabetesDALL2.H2_Diabetes_Mostrar_Diagnostico_Y_ClinicaDataTable TdiagYcli = new DiabetesDALL2.H2_Diabetes_Mostrar_Diagnostico_Y_ClinicaDataTable();
            TdiagYcli = AdiagYcli.GetData(IdConsulta);
            foreach (DiabetesDALL2.H2_Diabetes_Mostrar_Diagnostico_Y_ClinicaRow row in TdiagYcli.Rows)
            {
                Diabetes_Diagnostico_Y_Clinica_Resultados dyc = new Diabetes_Diagnostico_Y_Clinica_Resultados();
                 
                dyc.Diag_Cli_Items_Id = row.Diag_Cli_Items_Id;

                //if(!row.IsDiag_Cli_Items_ResultadoNull())
                //bool? aux = row.Diag_Cli_Items_Resultado;
                if (!row.IsDiag_Cli_Items_ResultadoNull())
                    dyc.Diag_Cli_Items_Resultado = row.Diag_Cli_Items_Resultado;
                else dyc.Diag_Cli_Items_Resultado = null;

                dyc.nombre = row.Diag_Cli_Items_Descripcion;

                C.Diabetes_Diagnostico_Y_Clinica_Resultados_obj.Add(dyc);
            }

            //complicaciones
            DiabetesDALL2TableAdapters.H2_Diabetes_Mostrar_ComplicacionesTableAdapter Acomplicaciones = new DiabetesDALL2TableAdapters.H2_Diabetes_Mostrar_ComplicacionesTableAdapter();
            DiabetesDALL2.H2_Diabetes_Mostrar_ComplicacionesDataTable Tcomplicaciones = new DiabetesDALL2.H2_Diabetes_Mostrar_ComplicacionesDataTable();
            Tcomplicaciones = Acomplicaciones.GetData(IdConsulta);
            foreach (DiabetesDALL2.H2_Diabetes_Mostrar_ComplicacionesRow row in Tcomplicaciones.Rows)
            {
                complicaciones compl = new complicaciones();

                compl.Complicaciones_Items_Id = row.Complicaciones_Items_Id;

                if (!row.IsComplicaciones_ResultadoNull())
                    compl.Complicaciones_Resultado = row.Complicaciones_Resultado;
                else compl.Complicaciones_Resultado = null;

                compl.Complicaciones_Resultado_Fecha = row.Complicaciones_Resultado_Fecha;
                compl.nombre = row.Complicaciones_Items_Descripcion;
                C.complicaciones_obj.Add(compl);
            }


            //estudios 
            DiabetesDALL2TableAdapters.H2_Diabetes_Mostrar_EstudiosTableAdapter Aestudios = new DiabetesDALL2TableAdapters.H2_Diabetes_Mostrar_EstudiosTableAdapter();
            DiabetesDALL2.H2_Diabetes_Mostrar_EstudiosDataTable Testudios = new DiabetesDALL2.H2_Diabetes_Mostrar_EstudiosDataTable();
            Testudios = Aestudios.GetData(IdConsulta);
            foreach (DiabetesDALL2.H2_Diabetes_Mostrar_EstudiosRow row in Testudios.Rows)
            {
                EstudiosDetalle estu = new EstudiosDetalle();

                estu.Estudios_Items_Id = row.Estudios_Items_Id;
                estu.Estudios_Resultados = row.Estudios_Resultados;
                estu.Estudios_Fecha = row.Estudios_Fecha;
                estu.Estudios_Combo = row.Estudios_Combo;
                C.EstudiosDetalle_obj.Add(estu);
            }


            //tratamiento
            DiabetesDALL2TableAdapters.H2_Diabetes_Mostrar_TratamientoTableAdapter Atratamiento = new DiabetesDALL2TableAdapters.H2_Diabetes_Mostrar_TratamientoTableAdapter();
            DiabetesDALL2.H2_Diabetes_Mostrar_TratamientoDataTable Ttratamiento = new DiabetesDALL2.H2_Diabetes_Mostrar_TratamientoDataTable();
            Ttratamiento = Atratamiento.GetData(IdConsulta);
            foreach (DiabetesDALL2.H2_Diabetes_Mostrar_TratamientoRow row in Ttratamiento.Rows)
            {

                
                tratamiento trat = new tratamiento();
             
                trat.Tratamiento_InsulinaBasal = row.Tratamiento_InsulinaBasal;
                trat.MarcaComercial_Basal = row.MarcaComercial_Basal;
                trat.Tratamiento_Insulina_Correccion = row.Tratamiento_Insulina_Correccion;
                trat.MarcaComercial_Correcion = row.MarcaComercial_Correcion;
                C.tratamiento_obj = trat;
            }

            //tratamiento detalle
            DiabetesDALL2TableAdapters.H2_Diabetes_Mostrar_Tratamiento_ResultadosTableAdapter AtratamientoDet = new DiabetesDALL2TableAdapters.H2_Diabetes_Mostrar_Tratamiento_ResultadosTableAdapter();
            DiabetesDALL2.H2_Diabetes_Mostrar_Tratamiento_ResultadosDataTable TtratamientoDet = new DiabetesDALL2.H2_Diabetes_Mostrar_Tratamiento_ResultadosDataTable();
            TtratamientoDet = AtratamientoDet.GetData(IdConsulta);
            foreach (DiabetesDALL2.H2_Diabetes_Mostrar_Tratamiento_ResultadosRow row in TtratamientoDet.Rows)
            {
                trataientoDetalle tratDet = new trataientoDetalle();

                tratDet.Tratamiento_Items_Id = row.Tratamiento_Items_Id;
                if (!row.IsTratamiento_ResultadosNull())
                    tratDet.Tratamiento_Resultados = row.Tratamiento_Resultados;
                else tratDet.Tratamiento_Resultados = null;

                tratDet.nombre = row.Tratamiento_Items_Descripcion;
                C.trataientoDetalle_obj.Add(tratDet);
            }
        return C;
        }

        public List<PacienteDiabetico> Traer_Pacientes_Todos()
        {
            DiabetesDALL2TableAdapters.H2_Diabetes_Traer_PacientesTableAdapter adapter = new DiabetesDALL2TableAdapters.H2_Diabetes_Traer_PacientesTableAdapter();
            DiabetesDALL2.H2_Diabetes_Traer_PacientesDataTable atable = new DiabetesDALL2.H2_Diabetes_Traer_PacientesDataTable();

            List<PacienteDiabetico> L = new List<PacienteDiabetico>();

            atable = adapter.GetData();

            foreach (DiabetesDALL2.H2_Diabetes_Traer_PacientesRow row in atable.Rows)
            {
                PacienteDiabetico P = new PacienteDiabetico();
                P.PacienteId = row.pacienteId;
                P.Nombre = row.apellido;
                P.dni = row.documento_real;
                if (!row.IsseccionalNull())
                    P.seccional = row.seccional;
                else
                    P.seccional = "Sin Seccionalizar";
                L.Add(P);
            }

            return L;
        }


        public List<fichaDiabetes> Traer_Fichas_Todas()
        {

            ReportesDALTableAdapters.H2_Traer_Todos_Los_Pacientes_DiabetesTableAdapter adapter = new ReportesDALTableAdapters.H2_Traer_Todos_Los_Pacientes_DiabetesTableAdapter();
            ReportesDAL.H2_Traer_Todos_Los_Pacientes_DiabetesDataTable table = new ReportesDAL.H2_Traer_Todos_Los_Pacientes_DiabetesDataTable();
            List<fichaDiabetes> L = new List<fichaDiabetes>();
            table = adapter.GetData();

            foreach (ReportesDAL.H2_Traer_Todos_Los_Pacientes_DiabetesRow row in table.Rows)
            {
                fichaDiabetes P = new fichaDiabetes();
                P.id = row.id;
                L.Add(P);
            }

            return L;
        }

        public long Traer_Id_X_Cuil_DBT(long afiliadoCuil)
        {
            DiabetesDALL2TableAdapters.QueriesTableAdapter adapter = new DiabetesDALL2TableAdapters.QueriesTableAdapter();
            
            object obj = adapter.H2_Traer_Id_X_Cuil_DBT(afiliadoCuil);
            return Convert.ToInt64(obj);   
        }


        public int VerificarDBT(long ID)
        {
            DiabetesDALL2TableAdapters.H2_Pacientes_Atrsados_ConsultasTableAdapter adapter = new DiabetesDALL2TableAdapters.H2_Pacientes_Atrsados_ConsultasTableAdapter();
            DiabetesDALL2.H2_Pacientes_Atrsados_ConsultasDataTable table = new DiabetesDALL2.H2_Pacientes_Atrsados_ConsultasDataTable();
            table = adapter.GetData(ID,1);
            int i = -1;
            foreach (DiabetesDALL2.H2_Pacientes_Atrsados_ConsultasRow row in table.Rows) { i = row.Column1; }

            return Convert.ToInt32(i);
        }
    }
}