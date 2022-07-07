using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de ImagenesBLL
/// </summary>
///
namespace Hospital
{
    public class ImagenesBLL
    {
        public ImagenesBLL()
        {
            //
            // TODO: Agregar aquí la lógica del constructor
            //
        }


        public long IMG_DarTurno(string Fecha, string Hora, int Minutos, int Especialidad, int Medico, long Paciente, bool SobreTurno, bool TurnoForzado, bool MinutosFijos, long TurnoId, int Usuario, bool TurnoXEmail, bool Urgencia, int Tipo, string HoraVisible, string Comentario, int MedicoDerivante)
        {
            object resultado = null;
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            try
            {
                resultado = adapter.H2_IMG_DarTurno(DateTime.Parse(Fecha), TimeSpan.Parse(Hora), Minutos, Especialidad, Medico, Paciente, SobreTurno, TurnoForzado, MinutosFijos, TurnoId, Usuario, TurnoXEmail, Urgencia, Tipo, HoraVisible, Comentario, MedicoDerivante);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return Convert.ToInt64(resultado);
        }


        public long IMG_AgregarPractica(long TurnoId, int PracticaId, string Comentario, int Duracion)
        {
            object resultado = null;
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            try
            {
                resultado = adapter.H2_IMG_Turnos_Detalle_Agregar(TurnoId, PracticaId, Comentario, Duracion);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return Convert.ToInt64(resultado);
        }

        public long IMG_QuitarTodasLasPractica(long TurnoId)
        {
            object resultado = null;
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            try
            {
                resultado = adapter.H2_IMG_Turnos_Eliminar_Practicas(TurnoId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return Convert.ToInt64(resultado);
        }

        public long IMG_QuitarPractica(long TurnoId, int PracticaId)
        {
            object resultado = null;
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            try
            {
                resultado = adapter.H2_IMG_Turnos_Detalle_Quitar(TurnoId, PracticaId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return Convert.ToInt64(resultado);
        }


        public List<IMG_Practicas> H2_IMG_Practicas_Detalle_Cargar(long Turno){
            List<IMG_Practicas> lista = new List<IMG_Practicas>();
            ImagenesDALTableAdapters.H2_IMG_Practicas_Detalle_CargarTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_Practicas_Detalle_CargarTableAdapter();
            ImagenesDAL.H2_IMG_Practicas_Detalle_CargarDataTable aTable = adapter.GetData(Turno);
            foreach (ImagenesDAL.H2_IMG_Practicas_Detalle_CargarRow row in aTable) {
                IMG_Practicas prac = new IMG_Practicas();
                if(!row.IsITD_COMENTARIONull()) prac.Comentario = row.ITD_COMENTARIO;
                prac.Eliminado = 0;
                prac.PracticaCodigo = row.PracticaId;
                if(!row.IsDuracionNull()) prac.PracticaDuracion = row.Duracion;
                prac.PracticaCodigo = row.PracticaId;
                prac.PracticaNombre = row.Descripcion;
                lista.Add(prac);
            }
            return lista;
        }


        public IMG_Turno_Info IMG_Turno_Info(long TurnoId)
        {
            IMG_Turno_Info info = new IMG_Turno_Info();
            try
            {                
                ImagenesDALTableAdapters.H2_IMG_Turno_InfoTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_Turno_InfoTableAdapter();
                ImagenesDAL.H2_IMG_Turno_InfoDataTable aTable = adapter.GetData(TurnoId);                
                if (aTable.Count > 0) {
                    ImagenesDAL.H2_IMG_Turno_InfoRow row = aTable[0];

                    if (row.IMG_TURNO_VENCIDO) { throw new Exception("El turno ha sido elimiado, porque no pagó el bono dentro de las 48hs."); }
                    if (row.IMG_TURNO_ELIMINADO) { throw new Exception("El turno ha sido elimiado."); }

                    info.documento_real = row.documento_real.ToString();
                    if(!row.IsHC_UOM_CENTRALNull())info.HC_UOM_CENTRAL = row.HC_UOM_CENTRAL.ToString();
                    if(!row.IsIMG_TURNO_BONO_IDNull()) info.IMG_TURNO_BONO_ID = row.IMG_TURNO_BONO_ID.ToString();
                    info.IMG_TURNO_ELIMINADO = row.IMG_TURNO_ELIMINADO;
                    info.IMG_TURNO_ESPECIALIDAD = row.IMG_TURNO_ESPECIALIDAD;
                    info.IMG_TURNO_ESTADO = row.IMG_TURNO_ESTADO;
                    info.IMG_TURNO_FECHA = row.IMG_TURNO_FECHA.ToShortDateString();
                    info.IMG_TURNO_FECHA_FIN = row.IMG_TURNO_FECHA_FIN.ToShortDateString();
                    info.IMG_TURNO_FECHA_HORA_GUARDADO = row.IMG_TURNO_FECHA_HORA_GUARDADO.ToString();
                    info.IMG_TURNO_FORZADO = row.IMG_TURNO_FORZADO;
                    info.IMG_TURNO_HORA_FIN = row.IMG_TURNO_HORA_FIN.ToString();
                    info.IMG_TURNO_HORA_INICIO = row.IMG_TURNO_HORA_INICIO.ToString();
                    info.IMG_TURNO_ID = row.IMG_TURNO_ID;
                    info.IMG_TURNO_MEDICO = row.IMG_TURNO_MEDICO;
                    info.IMG_TURNO_MINUTOS = row.IMG_TURNO_MINUTOS.ToString();
                    if (!row.IsIMG_TURNO_MINUTOSFIJOSNull()) info.IMG_TURNO_MINUTOSFIJOS = row.IMG_TURNO_MINUTOSFIJOS; else info.IMG_TURNO_MINUTOSFIJOS = false;
                    info.IMG_TURNO_PACIENTE_ID = row.IMG_TURNO_PACIENTE_ID;
                    info.Paciente = row.Paciente;
                    info.IMG_TURNO_SOBRETURNO = row.IMG_TURNO_SOBRETURNO;
                    if (!row.IsIMG_TURNO_VENCIDONull()) info.IMG_TURNO_VENCIDO = row.IMG_TURNO_VENCIDO; else info.IMG_TURNO_VENCIDO = false;
                    info.Medico = row.Medico;
                    info.Especialidad = row.Especialidad;
                    info.IMG_TURNO_X_EMAIL = row.IMG_TURNO_X_EMAIL;
                    info.Mostrar48hs = row.Mostrar48Hs;
                    if (!row.IsIMG_TURNO_COMENTARIONull()) info.IMG_TURNO_COMENTARIO = row.IMG_TURNO_COMENTARIO; else info.IMG_TURNO_COMENTARIO = "";
                    if (!row.IsIMG_TURNO_URGNull()) info.IMG_TURNO_URG = row.IMG_TURNO_URG; else info.IMG_TURNO_URG = false;
                    info.IMG_TURNO_TIPO = row.IMG_TURNO_TIPO.ToString();
                    if (!row.IsIMG_TURNO_HORAVISIBLENull()) info.IMG_TURNO_HORAVISIBLE = row.IMG_TURNO_HORAVISIBLE;
                    if (!row.IsMotivoNull()) info.MOTIVO_CANCELACION = row.Motivo;
                    if (!row.IsITEC_RECITARNull()) info.IMG_RECITAR = row.ITEC_RECITAR; else info.IMG_RECITAR = false;

                    if (!row.IsCOMENTARIO_MEDICONull()) info.COMENTARIO_MEDICO = row.COMENTARIO_MEDICO; else info.COMENTARIO_MEDICO = "";
                    

                    if (!row.IsMD_IDNull() && row.MD_ID != 0)
                    {
                        info.MEDICODERIVANTE_ID = row.MD_ID;
                        info.MEDICODERIVANTE_NOMBRE = row.MD_MEDICO;
                    }
                    else
                    {
                        info.MEDICODERIVANTE_NOMBRE = "";
                        info.MEDICODERIVANTE_ID = 0;
                    }

                    if (Convert.ToDateTime(row.IMG_TURNO_FECHA) == Convert.ToDateTime(DateTime.Today.ToShortDateString()))
                    {
                        info.TurnoHoy = true;
                    }
                    else
                    {
                        info.TurnoHoy = false;
                    }
                                        
                }                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return info;
        }


        public void Actualizar_Paciente_Info(long PacienteId, string Telefono, string Celular, string Email, int Seccional, string Apellido)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IMG_Pacientes_Info_Extra_Actualizar(PacienteId, Telefono, Celular, Email, Seccional, Apellido);
        }

        public IMG_Pacientes_Info Cargar_Paciente_Info(long PacienteId)
        {
            IMG_Pacientes_Info info = new IMG_Pacientes_Info();
            ImagenesDALTableAdapters.H2_IMG_Pacientes_Info_ExtraTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_Pacientes_Info_ExtraTableAdapter();
            ImagenesDAL.H2_IMG_Pacientes_Info_ExtraDataTable aTable = adapter.GetData(PacienteId);             
            foreach(ImagenesDAL.H2_IMG_Pacientes_Info_ExtraRow row in aTable){
                if(!row.IsCelularNull()) info.Celular = row.Celular;
                if (!row.IsCorreo_ElectronicoNull()) info.Email = row.Correo_Electronico;
                if (!row.IstelefonoNull()) info.Telefono = row.telefono;
            }
            return info;

        }

        public void ElimiarTurnosDe48Hs() {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IMG_ELIMINARTURNOS48HS();
        }

        public void ElimiarTurno(long TurnoId, int Usuario)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IMG_ELIMINAR_TURNO(TurnoId, Usuario);
        }

        public List<IMG_Escaneado> H2_IMG_ESCANEAR_CARGAR(long TurnoId)
        {
            List<IMG_Escaneado> lista = new List<IMG_Escaneado>();
            
            ImagenesDALTableAdapters.H2_IMG_ESCANEAR_CARGARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_ESCANEAR_CARGARTableAdapter();
            ImagenesDAL.H2_IMG_ESCANEAR_CARGARDataTable aTable = adapter.GetData(TurnoId);
            foreach (ImagenesDAL.H2_IMG_ESCANEAR_CARGARRow row in aTable)
            {
                IMG_Escaneado info = new IMG_Escaneado();
                info.Id = row.IMG_IMAGEN_ID;
                if (!row.IsIMG_ARCHIVONull()) {
                    //para mostrar adjuntos
                    if (row.IMG_IMAGEN_ID == 1) {
                        info.esAdjunto = 1;
                        info.Archivo = "../adjuntosimg/" + row.IMG_ARCHIVO; } 
                        // para mostras escaneos
                    else { info.Archivo = row.IMG_ARCHIVO.Replace("Gesinmed_IMAGENES", "IMG_Escaneada"); }
                     }
                lista.Add(info);
            }
            return lista;
        }
        
        
        public void H2_IMG_Practica_Actualizar(List<IMG_Practicas> Practicas, int EspecialidadId)
        {
            try
            {
                foreach (IMG_Practicas prac in Practicas)
                {
                    ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
                    adapter.H2_IMG_Practica_Actualizar(EspecialidadId, (int)prac.PracticaCodigo, prac.PracticaDuracion, prac.Abreviacion, prac.SeInforma);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public void H2_IMG_Practica_Duracion_Actualizar(List<IMG_Practicas> Practicas, int EspecialidadId, List<IMG_Practicas> Indicaciones, int usuario, List<IMG_Practicas> Abreviaciones)
        {
            foreach(IMG_Practicas prac in Practicas)
            {
                ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
                adapter.H2_IMG_Practica_Duracion_Actualizar(EspecialidadId, (int)prac.PracticaCodigo, prac.PracticaDuracion);    
            }

            foreach (IMG_Practicas prac in Indicaciones)
            {
                ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
                adapter.H2_IMG_TURNO_INDICACIONES_MODIFICAR((int)prac.PracticaCodigo, EspecialidadId, prac.Indicacion, false, usuario);
            }

            foreach (IMG_Practicas abre in Abreviaciones)
            {
                PracticasDALTableAdapters.QueriesTableAdapter adapter = new PracticasDALTableAdapters.QueriesTableAdapter();
                adapter.H2_IMG_Practica_Abreviacion_Actualizar(EspecialidadId, (int)abre.PracticaCodigo, abre.Abreviacion);
            }  

            
        }





        public List<diasdeatencion_Vista> IMG_DIA_ATENCION_X_MED_ESP_LISTAR(int Especialidad, int Medico)
        {
            List<diasdeatencion_Vista> dias = new List<diasdeatencion_Vista>();

            
            ImagenesDALTableAdapters.H2_IMG_MEDICO_DIAATENCION_LISTARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_MEDICO_DIAATENCION_LISTARTableAdapter();
            ImagenesDAL.H2_IMG_MEDICO_DIAATENCION_LISTARDataTable aTable = adapter.GetData(Medico, Especialidad);
            foreach (ImagenesDAL.H2_IMG_MEDICO_DIAATENCION_LISTARRow row in aTable)
            {
                diasdeatencion_Vista dia = new diasdeatencion_Vista();
                dia.Inicio = row.HoraInicio.ToString("HH:mm");
                dia.Fin = row.HoraFin.ToString("HH:mm"); 
                dia.Dia = row.DiaDeAtencion.ToString();
                dia.Duracion = row.DuracionMinutos.ToString();
                dia.Id = row.Id;
                dias.Add(dia);
            }
            return dias;
        }


        public void IMG_DIA_ATENCION_MODIFICAR(diasdeatencion_Vista dia, int usuario)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_MEDICO_DIAATENCION_MODIFICAR(dia.Id, Convert.ToInt32(dia.Medico), Convert.ToInt32(dia.Dia), Convert.ToDateTime("01/01/1900 " + dia.Inicio), Convert.ToDateTime("01/01/1900 " + dia.Fin), Convert.ToInt32(dia.Duracion), Convert.ToInt32(dia.Especialidad), usuario);
        }


        public void IMG_DIA_ATENCION_ELIMINAR(int Id)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_MEDICO_DIAATENCION_ELIMINAR(Id);
        }










        public List<IMG_diasdenoatencion> H2_IMG_DIA_NO_ATENCION_LISTAR(int Especialidad, int Medico)
        {
            List<IMG_diasdenoatencion> dias = new List<IMG_diasdenoatencion>();
                        
            ImagenesDALTableAdapters.H2_IMG_MEDICO_DIANOATENCION_LISTARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_MEDICO_DIANOATENCION_LISTARTableAdapter();
            ImagenesDAL.H2_IMG_MEDICO_DIANOATENCION_LISTARDataTable aTable = adapter.GetData(Medico, Especialidad);
            foreach (ImagenesDAL.H2_IMG_MEDICO_DIANOATENCION_LISTARRow row in aTable)
            {
                IMG_diasdenoatencion dia = new IMG_diasdenoatencion();
                dia.Id = row.IMG_DIA_NO_ATENCION_ID;
                dia.FechaDesde = row.IMG_DIA_NO_ATENCION_DIA_INICIO;
                dia.HoraDesde = row.IMG_DIA_NO_ATENCION_HORA_INICIO;
                dia.FechaHasta = row.IMG_DIA_NO_ATENCION_DIA_FIN;
                dia.HoraHasta = row.IMG_DIA_NO_ATENCION_HORA_FIN;
                dia.MotivoAusencia = row.IMG_DIA_NO_ATENCION_MOTIVO;
                
                dias.Add(dia);
            }
            return dias;
        }


        public void IMG_DIA_NO_ATENCION_MODIFICAR(IMG_diasdenoatencion dia, int usuario)
        {
            try
            {
                ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
                query.H2_IMG_MEDICO_DIANOATENCION_MODIFICAR(dia.Medico, dia.Especialidad, Convert.ToInt32(dia.Id), dia.FechaDesde, dia.FechaHasta, dia.HoraDesde, dia.HoraHasta, dia.MotivoAusencia);
            }
            catch (Exception ex)
            { 
                throw new Exception (ex.Message);
            }
        }


        public void IMG_DIA_NO_ATENCION_ELIMINAR(int Id)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_MEDICO_DIANOATENCION_ELIMINAR(Id);
        }








        public List<IMG_Dias_Extraordinario> H2_IMG_DIA_EXTRAORDINARIO_ATENCION_LISTAR(int Especialidad, int Medico)
        {
            List<IMG_Dias_Extraordinario> dias = new List<IMG_Dias_Extraordinario>();

            
            ImagenesDALTableAdapters.H2_IMG_MEDICO_DIAEXTRAORDINARIO_LISTARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_MEDICO_DIAEXTRAORDINARIO_LISTARTableAdapter();
            ImagenesDAL.H2_IMG_MEDICO_DIAEXTRAORDINARIO_LISTARDataTable aTable = adapter.GetData(Medico, Especialidad);
            foreach (ImagenesDAL.H2_IMG_MEDICO_DIAEXTRAORDINARIO_LISTARRow row in aTable)
            {
                IMG_Dias_Extraordinario dia = new IMG_Dias_Extraordinario();
                dia.Id = row.Id;
                dia.Dia = row.DiaDeAtencion.ToString();
                dia.Duracion = row.DuracionMinutos.ToString();
                dia.Inicio = row.Fecha_desde;
                dia.Fin = row.Fecha_hasta;
                dia.HoraInicio = row.HoraInicio;
                dia.HoraFin = row.HoraFin;
                dias.Add(dia);
            }
            return dias;
        }



        public void IMG_DIA_EXTRAORDINARIO_MODIFICAR(IMG_Dias_Extraordinario dia, int usuario)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_MEDICO_DIAEXTRAORDINARIO_MODIFICAR(Convert.ToInt32(dia.Medico), Convert.ToInt32(dia.Especialidad), Convert.ToInt32(dia.Id), Convert.ToInt32(dia.Dia), dia.Inicio, dia.Fin, dia.HoraInicio, dia.HoraFin,Convert.ToInt32(dia.Duracion), usuario);
        }


        public void IMG_DIA_EXTRAORDINARIO_ELIMINAR(int Id)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_MEDICO_DIAEXTRAORDINARIO_ELIMINAR(Id);
        }


        public List<IMG_Bono_Practica> IMG_BONO_CARGAR_PRACTICAS(long TurnoId, bool Monotributista)
        {
            List<IMG_Bono_Practica> practicas = new List<IMG_Bono_Practica>();

            ImagenesDALTableAdapters.H2_IMG_Bono_Cargar_PracticasTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_Bono_Cargar_PracticasTableAdapter();
            ImagenesDAL.H2_IMG_Bono_Cargar_PracticasDataTable aTable = adapter.GetData(TurnoId);
            foreach(ImagenesDAL.H2_IMG_Bono_Cargar_PracticasRow row in aTable)
            {
                IMG_Bono_Practica practica = new IMG_Bono_Practica();
                practica.Practica_Codigo = row.Id;
                practica.Practica_Nombre = row.Practica;
                if (!Monotributista)
                {
                    if (!row.IsvbonoNull())
                        practica.Valor = row.vbono.ToString();
                    else
                        practica.Valor = "0";
                }
                else
                {
                    if (!row.IsvcargoafiliadoNull())
                    {
                        practica.Valor = row.vcargoafiliado.ToString();   
                    }
                    else
                    {
                        practica.Valor = "0";
                    }
                }
                practicas.Add(practica);
            }
            return practicas;
        }



        public void IMG_BONO_RELACIONAR_CON_TURNO(long TurnoId, string Fecha, long Id)
        {            
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IMG_BONO_RELACIONARCONTURNO(TurnoId, Fecha, Id);
        }

        public void IMG_BONO_RELACIONAR_CON_TURNO(long TurnoId, long BonoId)
        {
            if (VerificarBonoyTurno(TurnoId, BonoId))
            {
                ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
                adapter.H2_IMG_BONO_RELACIONARCONTURNO_X_ID(TurnoId, BonoId);
            }
        }

        

        public IMG_Bono_Info IMG_BONO_ESTADO(long TurnoId)
        {
            IMG_Bono_Info b = new IMG_Bono_Info();
            ImagenesDALTableAdapters.H2_IMG_BONO_INFOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_BONO_INFOTableAdapter();
            ImagenesDAL.H2_IMG_BONO_INFODataTable aTable = adapter.GetData(TurnoId);
            if (aTable.Count > 0)
            {   

                if (!aTable[0].Isfecha_usadoNull()) b.fecha_usado = aTable[0].fecha_usado.ToString("dd/MM/yyyy HH:mm:ss");
                if (!aTable[0].IsUsadoNull()) b.usado = aTable[0].Usado;
                b.cancelado  = aTable[0].EstaCancelado;

                if (b.cancelado) { throw new Exception("El Bono se encuentra cancelado."); }
                if (b.usado) { throw new Exception("El Bono fue usado el " + b.fecha_usado); }

                return b;
            }
            return null;            
        }



        public bool VerificarBonoyTurno(long Turno, long Bono)
        {
            IMG_Bono_Info b = IMG_BONO_ESTADO_DET_CAB(Bono);
            IMG_Turno_Info i = IMG_Turno_Info(Turno);

            if (b.usado) { throw new Exception("El bono ya se encuentra utilizado."); }
            if (b.cancelado) { throw new Exception("El bono se encuentra cancelado."); }
            if (b.Especialidad != i.IMG_TURNO_ESPECIALIDAD) { throw new Exception("Las especialidades no coinciden."); }
            if (b.Medico != i.IMG_TURNO_MEDICO) { throw new Exception("Los médico no inciden."); }
            if (b.Paciente != i.IMG_TURNO_PACIENTE_ID.ToString()) { throw new Exception("Los pacientes no inciden."); }
            return true;
        }

        public IMG_Bono_Info IMG_BONO_ESTADO_DET_CAB(long BonoId)
        {
            IMG_Bono_Info b = new IMG_Bono_Info();
            ImagenesDALTableAdapters.H2_IMG_BONO_DET_CABECERATableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_BONO_DET_CABECERATableAdapter();
            ImagenesDAL.H2_IMG_BONO_DET_CABECERADataTable aTable = adapter.GetData(BonoId);
            if (aTable.Count > 0)
            {
                
                if (!aTable[0].IsUsadoNull()) b.usado = aTable[0].Usado;
                b.Medico = aTable[0].MedicoId;
                b.Especialidad = aTable[0].EspecialidadId;
                b.Paciente = aTable[0].Paciente.ToString();
                b.cancelado = aTable[0].EstaCancelado;

                return b;
            }
            return null;
        }


        public void IMG_TURNO_RECEPCIONAR(long TurnoId, int Usuario)
        {
            
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IMG_TURNO_RECEPCIONAR(TurnoId, Usuario);
            
        }


        public int IMAGENES_TURNO_CAMBIARESTADO(long TurnoId, int Estado, int usuario)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMAGENES_TURNO_CAMBIARESTADO(TurnoId, Estado, usuario);
            return Estado;
        }



        public List<IMG_Plantilla> IMG_PLANTILLA_ESPECIALIDAD_LISTAR(long TurnoId, int especialidad)
        {
            List<IMG_Plantilla> lista = new List<IMG_Plantilla>();
            ImagenesDALTableAdapters.H2_IMG_PLANTILLA_ESPECIALIDAD_LISTARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_PLANTILLA_ESPECIALIDAD_LISTARTableAdapter();
            ImagenesDAL.H2_IMG_PLANTILLA_ESPECIALIDAD_LISTARDataTable aTable = adapter.GetData(especialidad, TurnoId);
            foreach (ImagenesDAL.H2_IMG_PLANTILLA_ESPECIALIDAD_LISTARRow row in aTable)
            {
                IMG_Plantilla pract = new IMG_Plantilla();
                pract.InsumoId = row.insumo;
                if(!row.IsREM_NOMBRENull())pract.Insumo = row.REM_NOMBRE;
                pract.Cantidad = row.cantidad;
                lista.Add(pract);
            }
            return lista;
        }


        public void IMG_PLANTILLA_ESPECIALIDAD_CAB_GUARDAR(long TurnoId, int usuario, string Comentario, int InformarProblema, bool Recitar)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IMG_PLANTILLA_ESPECIALIDAD_CAB_GUARDAR(TurnoId, Comentario, usuario, InformarProblema, Recitar);
        }

        public IMG_COM_PROBLEMA IMG_PLANTILLA_ESPECIALIDAD_CAB_LISTAR(long TurnoId)
        {
            IMG_COM_PROBLEMA dato = new IMG_COM_PROBLEMA();
            ImagenesDALTableAdapters.H2_IMG_PLANTILLA_ESPECIALIDAD_CAB_LISTARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_PLANTILLA_ESPECIALIDAD_CAB_LISTARTableAdapter();
            ImagenesDAL.H2_IMG_PLANTILLA_ESPECIALIDAD_CAB_LISTARDataTable aTable = adapter.GetData(TurnoId);
            if (aTable.Count > 0)
            {
                dato.COMENTARIO = aTable[0].ITEC_COMENTARIO;
                if (!aTable[0].IsITEC_PROBLEMAIDNull()) dato.MOTIVO_PROBLEMA = aTable[0].ITEC_PROBLEMAID; else dato.MOTIVO_PROBLEMA = 0;
                if (!aTable[0].IsITEC_RECITARNull()) dato.MOTIVO_RECITAR = aTable[0].ITEC_RECITAR; else dato.MOTIVO_RECITAR = false;
            }
            return dato;
        }

        public void IMG_PLANTILLA_ESPECIALIDAD_GUARDAR(long TurnoId, int insumo, int cantidad, int usuario)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IMG_PLANTILLA_ESPECIALIDAD_GUARDAR(TurnoId, insumo, cantidad, DateTime.Now, usuario);      
        }

        public void IMG_WORKLIST_MODALIDAD_GUARDAR(long TurnoId, string Modalidad)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IMG_WORKLIST_MODALIDAD_GUARDAR(TurnoId, Modalidad);
        }

        public void IMG_WORKLIST_GUARDAR(long TurnoId)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IMG_WORKLIST_GUARDAR(TurnoId);
        }


        public string IMG_TURNO_SIN_ATENTER_LISTADO(int Especialidad, int Medico, long Turno, int UsuarioID)
        {
            ImagenesDALTableAdapters.H2_IMG_TURNO_SIN_ATENTER_LISTADOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_TURNO_SIN_ATENTER_LISTADOTableAdapter();
            ImagenesDAL.H2_IMG_TURNO_SIN_ATENTER_LISTADODataTable aTable = adapter.GetData(Medico, Especialidad, Turno, UsuarioID);
            if (aTable.Count > 0)
            {
                return aTable[0].Horario.ToString();                    
            }
            return "";
        }


        public List<IMG_ATENCION> IMG_TURNO_CONSULTORIO_LISTAR(int Especialidad, int Medico, string Desde, string Hasta, int Tipo, string HNC, string Paciente, string Documento)
        {
            List<IMG_ATENCION> lista = new List<IMG_ATENCION>();
            ImagenesDALTableAdapters.H2_IMG_TURNOS_AT_CONSULTORIO_LISTARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_TURNOS_AT_CONSULTORIO_LISTARTableAdapter();
            ImagenesDAL.H2_IMG_TURNOS_AT_CONSULTORIO_LISTARDataTable aTable = adapter.GetData(Especialidad, Medico, Desde, Hasta, Tipo, HNC, Paciente, Documento);
            foreach (ImagenesDAL.H2_IMG_TURNOS_AT_CONSULTORIO_LISTARRow row in aTable)            
            {
                IMG_ATENCION dato = new IMG_ATENCION();
                if (!row.IsfotoNull()) dato.foto = row.foto; else dato.foto = "..\\img\\silueta.jpg";
                if (!row.Istipo_descripcionNull()) dato.tipo = row.tipo_descripcion;
                dato.nro_turno = row.IMG_TURNO_ID.ToString();
                if (!row.IsurgNull()) dato.urgencia = row.urg; else dato.urgencia = false;
                dato.paciente = row.apellido;
                dato.documento = row.documento.ToString();
                dato.nhc = row.nhc;
                if (!row.IsestudiosNull()) dato.estudio = row.estudios;
                dato.estado = row.estado.ToString();
                if (!row.IsEscaneadoNull()) dato.escaneado = true; else dato.escaneado = false;
                dato.hora_turno = row.hora;
                if (!row.IsarriboNull()) dato.arribo = row.arribo.ToString("HH:mm"); else dato.arribo = "";
                if (!row.IsinicioNull()) dato.inicio = row.inicio.ToString("HH:mm"); else dato.inicio = "";
                if (!row.Isusuario_inicioNull()) dato.usuario_inicio = row.usuario_inicio; else dato.usuario_inicio = "";
                if (!row.IsfinNull()) dato.fin = row.fin.ToString("HH:mm"); else dato.fin = "";
                if (!row.Isusuario_finNull()) dato.usuario_fin = row.usuario_fin; else dato.usuario_fin = "";
                dato.fecha = row.IMG_TURNO_FECHA.ToShortDateString();
                if(!row.IsMedicoNull()) dato.medico = row.Medico;
                if(!row.IsEspecialidadNull()) dato.especialidad = row.Especialidad;
                if(!row.IsIMG_TURNO_COMENTARIONull()) dato.comentario = row.IMG_TURNO_COMENTARIO;

                dato.PacienteId = row.PacienteId;

                dato.estado = "ocupado";
                dato.estado_numero = row.estado;
                
                dato.sobreturno = row.SobreTurno;
                dato.turnoforzado = row.Forzado;

                if (dato.sobreturno) { dato.estado = "sobreturno"; }
                if (dato.turnoforzado) { dato.estado = "forzado"; }

                if (row.estado == -1) dato.estado = "cancelado";

                if (row.estado == 2) dato.estado = "recepcionado";
                if (row.estado == 3) dato.estado = "llamado";
                if (row.estado == 4) dato.estado = "ausente";
                if (row.estado == 5) dato.estado = "enconsultorio";
                if (row.estado == 6) dato.estado = "atendido";
                if (row.estado == 7) dato.estado = "noatendido";

                lista.Add(dato);
            }
            return lista;
        }



        public List<IMG_BONO_LISTAR_X_TURNO> IMG_TURNO_CONSULTORIO_LISTAR_BONO(long TurnoId)
        {

            List<IMG_BONO_LISTAR_X_TURNO> lista = new List<IMG_BONO_LISTAR_X_TURNO>();
            ImagenesDALTableAdapters.H2_IMG_BONO_LISTAR_X_TURNOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_BONO_LISTAR_X_TURNOTableAdapter();
            ImagenesDAL.H2_IMG_BONO_LISTAR_X_TURNODataTable aTable = adapter.GetData(TurnoId);
            foreach (ImagenesDAL.H2_IMG_BONO_LISTAR_X_TURNORow row in aTable)
            { 
                IMG_BONO_LISTAR_X_TURNO dato = new IMG_BONO_LISTAR_X_TURNO();
                dato.Bono_Id = row.Bono_Id.ToString();
                dato.Fecha = row.Fecha.ToShortDateString();
                lista.Add(dato);
            }
            return lista;
        }


        public bool H2_IMG_BONO_USAR(long TurnoId, long BonoId, int usuario)
        {
            try
            {
                ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
                adapter.H2_IMG_BONO_USAR(BonoId, usuario, TurnoId);
                return true;
            }
            catch
            {
                return false;
            }


        }




        public List<IMG_BONO_BUSCAR_PACIENTE> IMG_BONO_BUSCAR_PACIENTE(string Paciente, long Documento, string nhc)
        {
            List<IMG_BONO_BUSCAR_PACIENTE> lista = new List<IMG_BONO_BUSCAR_PACIENTE>();
            ImagenesDALTableAdapters.H2_IMG_BONO_BUSCAR_PACIENTETableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_BONO_BUSCAR_PACIENTETableAdapter();
            ImagenesDAL.H2_IMG_BONO_BUSCAR_PACIENTEDataTable aTable = adapter.GetData(Documento, nhc, Paciente);
            foreach (ImagenesDAL.H2_IMG_BONO_BUSCAR_PACIENTERow row in aTable)
            {
                IMG_BONO_BUSCAR_PACIENTE dato = new IMG_BONO_BUSCAR_PACIENTE();

                dato.NROTURNO = row.IMG_TURNO_ID.ToString();
                dato.PACIENTE = row.Paciente;
                dato.DNI = row.DNI.ToString();
                dato.NHC = row.NHC;
                dato.FECHA = row.IMG_TURNO_FECHA.ToShortDateString();
                dato.HORA = row.IMG_TURNO_HORA_INICIO.ToString();
                dato.ESPECIALIDAD = row.Esepecialidad;
                lista.Add(dato);
            }
            return lista;
        }



        public List<IMG_PREPARACION> IMG_PREPARACION_LISTA(long Practica)
        {
            List<IMG_PREPARACION> lista = new List<IMG_PREPARACION>();
            ImagenesDALTableAdapters.H2_IMG_PREPARACION_LISTA_X_INSUMOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_PREPARACION_LISTA_X_INSUMOTableAdapter();
            ImagenesDAL.H2_IMG_PREPARACION_LISTA_X_INSUMODataTable aTable = adapter.GetData(Practica);
            foreach (ImagenesDAL.H2_IMG_PREPARACION_LISTA_X_INSUMORow row in aTable)
            {
                IMG_PREPARACION dato = new IMG_PREPARACION();
                                
                dato.ID = row.IMG_INFO_ID;
                dato.TITULO = row.img_info_titulo;
                if (!row.IsIEI_IDNull()) dato.ESTADO = true; else dato.ESTADO = false;                 
                
                lista.Add(dato);
            }
            return lista;
        }


        public bool IMG_PREPARACION_ACTUALIZAR(long Practica, int PreparacionId)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_IMG_PREPARACION_ACTUALIZAR_X_PRACTICA(Practica, PreparacionId);
            if (Convert.ToInt32(obj) == 1)
            {
                return true;
            }
            else            
            {
                return false;
            }
        }

        public List<INFORME_LISTA_ATENDIDO> H2_IMG_INFORME_LISTA_PACIENTES(int EspecialidadId, string DiaInicio, string DiaFin)
        {
            List<INFORME_LISTA_ATENDIDO> lista = new List<INFORME_LISTA_ATENDIDO>();
            ImagenesDALTableAdapters.H2_IMG_INFORME_LISTA_PACIENTESTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_INFORME_LISTA_PACIENTESTableAdapter();
            ImagenesDAL.H2_IMG_INFORME_LISTA_PACIENTESDataTable aTable = adapter.GetData(EspecialidadId,0, DiaInicio , DiaFin );
            foreach (ImagenesDAL.H2_IMG_INFORME_LISTA_PACIENTESRow row in aTable)
            {
                INFORME_LISTA_ATENDIDO dato = new INFORME_LISTA_ATENDIDO();
                dato.apellido = row.apellido;
                if (!row.IsarriboNull()) dato.arribo = row.arribo.ToString();
                dato.documento = row.documento.ToString();
                if (!row.IsEscaneadoNull()) dato.Escaneado = true; else dato.Escaneado = false;
                dato.estado = row.estado.ToString();
                if (!row.IsestudiosNull()) dato.estudios = row.estudios;
                if (!row.IsfinNull()) dato.fin = row.fin.ToString();
                dato.Forzado = row.Forzado;
                if(!row.IsfotoNull()) dato.foto = row.foto;
                dato.hora = row.hora;
                if(!row.IsIMG_INFORME_ESTADO_DESCRIPCIONNull()) dato.IMG_INFORME_ESTADO_DESCRIPCION = row.IMG_INFORME_ESTADO_DESCRIPCION;
                dato.IMG_TURNO_FECHA = row.IMG_TURNO_FECHA.ToShortDateString();
                dato.IMG_TURNO_HORA_INICIO = row.IMG_TURNO_HORA_INICIO;
                dato.IMG_TURNO_ID = row.IMG_TURNO_ID.ToString();
                if(!row.IsIMG_TURNO_TIPONull()) dato.IMG_TURNO_TIPO = row.IMG_TURNO_TIPO.ToString();
                if(!row.IsinicioNull()) dato.inicio = row.inicio.ToString();
                if(row.IsnhcNull()) dato.nhc = row.nhc;
                dato.SobreTurno = row.SobreTurno;
                if(!row.Istipo_descripcionNull()) dato.tipo_descripcion = row.tipo_descripcion;
                if (!row.IsurgNull()) dato.urg = row.urg;
                if (!row.Isusuario_finNull()) dato.usuario_fin = row.usuario_fin;
                if (!row.Isusuario_inicioNull()) dato.usuario_inicio = row.usuario_inicio;
                if (!row.IsIMG_INFORME_ESTADO_IDNull()) dato.IMG_INFORME_ESTADO_ID = row.IMG_INFORME_ESTADO_ID.ToString();
                if (!row.IsMedicoNull()) dato.Medico = row.Medico;  
                lista.Add(dato);
            }
            return lista;
        }


        public void INFORME_CAMBIAR_ESTADO(long TurnoId, int Estado, int UsuarioId)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IMG_INFORME_CAMBIAR_ESTADO(TurnoId, Estado, UsuarioId);            
        }

        public void INFORME_CAMBIAR_PRACTICA_ESTADO(long TurnoId, int Estado, int UsuarioId, int MedicoInforma)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IMG_INFORME_CAMBIAR_PRACTICA_ESTADO(TurnoId, Estado, UsuarioId, MedicoInforma);
        }


        public void INFORME_GUARDAR(long TurnoId, int Estado, int UsuarioId, string Informe)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IMG_INFORME_GUARDAR_INFORME(UsuarioId, TurnoId, Informe, Estado);
        }


        public void INFORME_PRACTICA_GUARDAR(long TurnoId, int Estado, int UsuarioId, string Informe)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IMG_INFORME_GUARDAR_PRACTICA_INFORME(UsuarioId, TurnoId, Informe, Estado);
        }

        public void INFORME_GUARDAR_PLANTILLA(int Especialidad, string Titulo, string Informe, int Id, int MedicoID)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            adapter.H2_IMG_INFORME_GUARDAR_PLANTILLA(Especialidad, Informe, Titulo, Id, MedicoID);
        }

        public List<INFORME_PLANTILLA_TITULO> INFORME_CARGAR_TITULOS(int ESPECIALIDAD_ID)
        {
            List<INFORME_PLANTILLA_TITULO> lista = new List<INFORME_PLANTILLA_TITULO>();
            ImagenesDALTableAdapters.H2_IMG_INFORME_PLANTILLA_LISTAR_TITULOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_INFORME_PLANTILLA_LISTAR_TITULOTableAdapter();
            ImagenesDAL.H2_IMG_INFORME_PLANTILLA_LISTAR_TITULODataTable aTable = adapter.GetData(ESPECIALIDAD_ID);
            foreach (ImagenesDAL.H2_IMG_INFORME_PLANTILLA_LISTAR_TITULORow row in aTable)
            {
                INFORME_PLANTILLA_TITULO dato = new INFORME_PLANTILLA_TITULO();
                dato.ID = row.IMG_INFO_PLANT_ID;
                dato.TITULO = row.IMG_INFO_PLANT_TITULO;
                lista.Add(dato);
            }
            return lista;
        }


        public List<INFORME_PLANTILLA_TITULO> INFORME_CARGAR_TITULOS_X_MEDICO(int ESPECIALIDAD_ID, int MEDICOID)
        {
            List<INFORME_PLANTILLA_TITULO> lista = new List<INFORME_PLANTILLA_TITULO>();
            ImagenesDALTableAdapters.H2_IMG_INFORME_PLANTILLA_LISTAR_TITULO_X_MEDICOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_INFORME_PLANTILLA_LISTAR_TITULO_X_MEDICOTableAdapter();
            ImagenesDAL.H2_IMG_INFORME_PLANTILLA_LISTAR_TITULO_X_MEDICODataTable aTable = adapter.GetData(ESPECIALIDAD_ID, MEDICOID);
            foreach (ImagenesDAL.H2_IMG_INFORME_PLANTILLA_LISTAR_TITULO_X_MEDICORow row in aTable)
            {
                INFORME_PLANTILLA_TITULO dato = new INFORME_PLANTILLA_TITULO();
                dato.ID = row.IMG_INFO_PLANT_ID;
                dato.TITULO = row.IMG_INFO_PLANT_TITULO;
                lista.Add(dato);
            }
            return lista;
        }

        

        public INFORME_PLANTILLA_DETALLE CARGAR_INFORME_DETALLE(int PLANTILLAID)
        {
            INFORME_PLANTILLA_DETALLE dato = new INFORME_PLANTILLA_DETALLE();
            ImagenesDALTableAdapters.H2_IMG_INFORME_PLANTILLA_CARGARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_INFORME_PLANTILLA_CARGARTableAdapter();
            ImagenesDAL.H2_IMG_INFORME_PLANTILLA_CARGARDataTable aTable = adapter.GetData(PLANTILLAID);
            foreach (ImagenesDAL.H2_IMG_INFORME_PLANTILLA_CARGARRow row in aTable)
            {                
                dato.ID = row.IMG_INFO_PLANT_ID;
                dato.TITULO = row.IMG_INFO_PLANT_TITULO;
                dato.INFORME = row.IMG_INFO_PLANT_INFORME;
                if (!row.IsIMG_INFO_MEDICOIDNull()) { dato.MEDICOID = row.IMG_INFO_MEDICOID; } else { dato.MEDICOID = 0; }
            }
            return dato;
        }

         
        public INFORME_PLANTILLA_DETALLE CARGAR_INFORME(int TurnoId)
        {
            INFORME_PLANTILLA_DETALLE dato = new INFORME_PLANTILLA_DETALLE();
            ImagenesDALTableAdapters.H2_IMG_INFORME_CARGARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_INFORME_CARGARTableAdapter();
            ImagenesDAL.H2_IMG_INFORME_CARGARDataTable aTable = adapter.GetData(TurnoId);
            foreach (ImagenesDAL.H2_IMG_INFORME_CARGARRow row in aTable)
            {
                dato.INFORME = row.IMG_INFORME_TEXTO;
            }
            return dato;
        }

        public INFORME_PLANTILLA_DETALLE CARGAR_INFORME_PRACTICA(int TurnoId)
        {
            INFORME_PLANTILLA_DETALLE dato = new INFORME_PLANTILLA_DETALLE();
            ImagenesDALTableAdapters.H2_IMG_INFORME_PRACTICA_CARGARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_INFORME_PRACTICA_CARGARTableAdapter();
            ImagenesDAL.H2_IMG_INFORME_PRACTICA_CARGARDataTable aTable = adapter.GetData(TurnoId);
            foreach (ImagenesDAL.H2_IMG_INFORME_PRACTICA_CARGARRow row in aTable)
            {
                dato.INFORME = row.IMG_INFORME_TEXTO;
            }
            return dato;
        }

        public void Noticia_Actualizar(string Titulo, string Noticia)
        {
            TurneraDALTableAdapters.QueriesTableAdapter adapter = new TurneraDALTableAdapters.QueriesTableAdapter();            
            adapter.H2_Turnera_Noticias_Insertar(Titulo, Noticia);
        }


        public string DarHoraFueraDeHorario(DateTime Dia, int MedicoId,int EspecialidadId) { 
            ImagenesDALTableAdapters.H2_IMG_HORARIO_LIBRE_FUERA_HORARIOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_HORARIO_LIBRE_FUERA_HORARIOTableAdapter();
            ImagenesDAL.H2_IMG_HORARIO_LIBRE_FUERA_HORARIODataTable aTable = adapter.GetData(Dia, MedicoId, EspecialidadId);
            if (aTable.Count > 0)
            {
                return aTable[0].Hora.ToString();
            }            
            return "00:00";
        }

        public void MoverEscaneado(long TurnoViejo, long TurnoNuevo)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_MOVER_IMAGEN(TurnoNuevo, TurnoViejo);            
        }



        public List<PracticaxMedico> H2_IMAGENES_PRACTICAS_X_MEDICO_X_ESPECIALIDAD(long EspecialidadId, int MedicoId)
        {
            List<PracticaxMedico> lista = new List<PracticaxMedico>();
            ImagenesDALTableAdapters.H2_IMAGENES_PRACTICAS_X_MEDICO_X_ESPECIALIDADTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMAGENES_PRACTICAS_X_MEDICO_X_ESPECIALIDADTableAdapter();
            ImagenesDAL.H2_IMAGENES_PRACTICAS_X_MEDICO_X_ESPECIALIDADDataTable aTable = adapter.GetData(EspecialidadId, MedicoId);
            foreach (ImagenesDAL.H2_IMAGENES_PRACTICAS_X_MEDICO_X_ESPECIALIDADRow row in aTable)
            {
                PracticaxMedico dato = new PracticaxMedico();
                dato.PracticaDetalle = row.Descripcion;
                dato.PracticaId = row.Id;
                dato.PracticaDuracion = row.Duracion;
                if (!row.IsPME_REALIZANull()) dato.PracticaUtiliza = row.PME_REALIZA; else dato.PracticaUtiliza = false;
                lista.Add(dato);
            }
            return lista;
        }


        public void H2_IMAGENES_PRACTICAS_X_MEDICO_X_ESPECIALIDAD_ACTUALIZAR(long EspecialidadId, long MedicoId, long PracticaId, bool Realiza)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMAGENES_PRACTICAS_X_MEDICO_X_ESPECIALIDAD_ACTUALIZAR(EspecialidadId, MedicoId, PracticaId, Realiza);
        }



        public List<INFORME_LISTA_ATENDIDO> H2_IMG_INFORME_LISTADO(int EspecialidadId, string DiaInicio, string DiaFin, int MedicoId, int MedicoSeleccionado, int TipoOrden)
        {
            List<INFORME_LISTA_ATENDIDO> lista = new List<INFORME_LISTA_ATENDIDO>();
            ImagenesDALTableAdapters.H2_IMG_INFORME_LISTADOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_INFORME_LISTADOTableAdapter();
            ImagenesDAL.H2_IMG_INFORME_LISTADODataTable aTable = adapter.GetData(EspecialidadId, MedicoId, DiaInicio, DiaFin, MedicoSeleccionado, TipoOrden);
            foreach (ImagenesDAL.H2_IMG_INFORME_LISTADORow row in aTable)
            {
                INFORME_LISTA_ATENDIDO dato = new INFORME_LISTA_ATENDIDO();
                dato.apellido = row.Paciente;
                dato.TurnoDetalleId = row.TurnoDetalleId.ToString();             
                if (!row.IsEscaneadoNull()) dato.Escaneado = true; else dato.Escaneado = false;
                if (!row.IsIMG_INFORME_ESTADO_IDNull()) dato.estado = row.IMG_INFORME_ESTADO_ID.ToString(); else dato.estado = "0";
                dato.estudios = row.Practica;                                
                if (!row.IsIMG_INFORME_ESTADO_DESCRIPCIONNull()) dato.IMG_INFORME_ESTADO_DESCRIPCION = row.IMG_INFORME_ESTADO_DESCRIPCION;
                dato.IMG_TURNO_FECHA = row.Fecha.ToShortDateString();
                dato.IMG_TURNO_ID = row.NroTurno.ToString();               
                if (!row.IsIMG_INFORME_ESTADO_IDNull()) dato.IMG_INFORME_ESTADO_ID = row.IMG_INFORME_ESTADO_ID.ToString();
                dato.Medico = row.Medico;
                if (!row.IsComentarioNull()) dato.comentario = row.Comentario.ToString();
                if (!row.IsMI_ABREVIATURANull()) dato.MI = row.MI_ABREVIATURA; else dato.MI = "";
                if (!row.IsMV_ABREVIATURANull()) dato.MV = row.MV_ABREVIATURA; else dato.MV = "";
                dato.IMG_TURNO_TIPO = row.TIPO;
                lista.Add(dato);
            }
            return lista;
        }


        public void H2_IMG_COMENTARIO_GUARDAR(long TurnoId, string Comentario)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_COMENTARIO_GUARDAR(TurnoId, Comentario);
        }


        public void IMAGENES_TURNO_RECHAZAR_MOTIVO(long TurnoID, int MotivoID, string MotivoDetalle, int UsuarioId)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_TURNO_CANCELAR_MOTIVO(TurnoID, MotivoID, MotivoDetalle, UsuarioId);          
        }



        public IMPRESION_INFORME CARGAR_INFORME_PRACTICA_HTML(int TurnoId)
        {
            IMPRESION_INFORME dato = new IMPRESION_INFORME();
            ImagenesDALTableAdapters.H2_IMG_IMPRESION_INFORME_PRACTICA_CARGARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_IMPRESION_INFORME_PRACTICA_CARGARTableAdapter();
            ImagenesDAL.H2_IMG_IMPRESION_INFORME_PRACTICA_CARGARDataTable aTable = adapter.GetData(TurnoId);
            foreach (ImagenesDAL.H2_IMG_IMPRESION_INFORME_PRACTICA_CARGARRow row in aTable)
            {
                dato.Fecha = row.FECHA.ToShortDateString();
                dato.HC = row.HC_UOM_CENTRAL.ToString();
                dato.Informe = row.IMG_INFORME_TEXTO;
                dato.ObraSocial = row.Descripcion;
                if (!row.IsnombreNull()) { dato.Paciente = row.Paciente; }
            }
            return dato;
        }

        public void IMG_LIBERAR_BONO(long TurnoID, string Motivo, long TurnoNuevoId)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_LIBERAR_BONO(TurnoID, Motivo, TurnoNuevoId);
        }


        public int IMAGENES_TURNO_SEPUEDESALVARBONO(long TurnoId)
        {
            ImagenesDALTableAdapters.H2_IMG_TURNO_SEPUEDESALVARBONOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_TURNO_SEPUEDESALVARBONOTableAdapter();
            ImagenesDAL.H2_IMG_TURNO_SEPUEDESALVARBONODataTable aTable = adapter.GetData(TurnoId);
            foreach (ImagenesDAL.H2_IMG_TURNO_SEPUEDESALVARBONORow row in aTable)            
            {
                return row.IMG_TURNO_ESTADO;
            }
            return 0;
        }

        public void IMG_MEDICO_FIRMA_AGREGAR(int MedicoID)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_MEDICO_FIRMA_INSERTAR(MedicoID);
        }

        public void IMG_MEDICO_FIRMA_QUITAR(int MedicoID)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_MEDICO_FIRMA_ELIMINAR(MedicoID);
        }

        public void IMG_MEDICO_FIRMA_ACTUALIZAR(int MedicoID, string ABREVIATURA, int USUARIO, string SOBREFIRMA)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_MEDICO_FIRMA_ACTUALIZAR(MedicoID, ABREVIATURA,USUARIO, SOBREFIRMA);
        }

        public List<IMG_MEDICO_FIRMA> IMG_MEDICO_FIRMA_INFO(int MedicoID)
        {
            List<IMG_MEDICO_FIRMA> LISTA = new List<IMG_MEDICO_FIRMA>();
            ImagenesDALTableAdapters.H2_IMG_MEDICO_FIRMA_INFOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_MEDICO_FIRMA_INFOTableAdapter();
            ImagenesDAL.H2_IMG_MEDICO_FIRMA_INFODataTable aTable = adapter.GetData(MedicoID);
            foreach (ImagenesDAL.H2_IMG_MEDICO_FIRMA_INFORow row in aTable)            
            {
                IMG_MEDICO_FIRMA FIRMA = new IMG_MEDICO_FIRMA();
                if (!row.IsIMF_ABREVIATURANull()) { FIRMA.ABREVIACION = row.IMF_ABREVIATURA; } else { FIRMA.ABREVIACION = ""; }
                FIRMA.MEDICO = row.Medico;
                FIRMA.IMF_MEDICOID = row.IMF_MEDICOID;
                if (!row.IsUsuarioNull()) FIRMA.USUARIO_USUARIO  = row.Usuario; else FIRMA.USUARIO_USUARIO  = "";
                if (!row.IsUsuarioIDNull()) FIRMA.USUARIO_ID  = row.UsuarioID;
                if (!row.IsUsuNombreNull()) FIRMA.USUARIO_NOMBRE = row.UsuNombre; else FIRMA.USUARIO_NOMBRE = "";
                if (!row.IsIMF_SOBREFIRMANull()) FIRMA.SOBREFIRMA = row.IMF_SOBREFIRMA; else FIRMA.SOBREFIRMA = "";
                LISTA.Add(FIRMA);
            }
            return LISTA;
        }

        public List<IMG_USUARIO> IMG_LISTAR_USUARIOS()
        {
            List<IMG_USUARIO> LISTA = new List<IMG_USUARIO>();
            ImagenesDALTableAdapters.H2_IMG_MEDICO_FIRMA_LISTARUSUARIOS_IMGTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_MEDICO_FIRMA_LISTARUSUARIOS_IMGTableAdapter();
            ImagenesDAL.H2_IMG_MEDICO_FIRMA_LISTARUSUARIOS_IMGDataTable aTable = adapter.GetData();
            foreach (ImagenesDAL.H2_IMG_MEDICO_FIRMA_LISTARUSUARIOS_IMGRow row in aTable)            
            {
                IMG_USUARIO USUARIO = new IMG_USUARIO();
                if (!row.IsnombreNull()) { USUARIO.NOMBRE = row.nombre; }
                USUARIO.ID = row.id;
                USUARIO.USUARIO = row.usuario;
                LISTA.Add(USUARIO);
            }
            return LISTA;
        }

        public IMG_PROTOCOLO_FIRMA IMG_FIRMA_PROTOCOLO(long TurnoId)
        {
            IMG_PROTOCOLO_FIRMA FIRMA = new IMG_PROTOCOLO_FIRMA();
            ImagenesDALTableAdapters.H2_IMG_FIRMA_PROTOCOLOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_FIRMA_PROTOCOLOTableAdapter();
            ImagenesDAL.H2_IMG_FIRMA_PROTOCOLODataTable aTable = adapter.GetData(TurnoId);
            foreach (ImagenesDAL.H2_IMG_FIRMA_PROTOCOLORow row in aTable)
            {
                if (!row.IsMI_MEDICOIDNull()) { FIRMA.MI_MEDICOID = row.MI_MEDICOID.ToString(); } else FIRMA.MI_MEDICOID = "";
                if (!row.IsMI_SOBREFIRMANull()) { FIRMA.MI_SOBREFIRMA = row.MI_SOBREFIRMA; } else { FIRMA.MI_SOBREFIRMA = ""; }
                if (!row.IsMV_MEDICOIDNull()) { FIRMA.MV_MEDICOID = row.MV_MEDICOID.ToString(); } else { FIRMA.MV_MEDICOID = ""; }
                if (!row.IsMV_MEDICOSOBREFIRMANull()) { FIRMA.MV_SOBREFIRMA = row.MV_MEDICOSOBREFIRMA; } else { FIRMA.MV_SOBREFIRMA = ""; }
                return FIRMA;
            }
            return FIRMA;
        }


        public IMG_PROTOCOLO_FIRMA IMG_FIRMA_PROTOCOLO_EXTERNO(long TurnoId)
        {
            IMG_PROTOCOLO_FIRMA FIRMA = new IMG_PROTOCOLO_FIRMA();
            ImagenesDALTableAdapters.H2_IMG_FIRMA_PROTOCOLOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_FIRMA_PROTOCOLOTableAdapter();
            ImagenesDAL.H2_IMG_FIRMA_PROTOCOLODataTable aTable = adapter.GetData(TurnoId);
            foreach (ImagenesDAL.H2_IMG_FIRMA_PROTOCOLORow row in aTable)
            {
                if (!row.IsMI_MEDICOIDNull()) { FIRMA.MI_MEDICOID = row.MI_MEDICOID.ToString(); } else FIRMA.MI_MEDICOID = "";
                if (!row.IsMI_SOBREFIRMANull()) { FIRMA.MI_SOBREFIRMA = row.MI_SOBREFIRMA; } else { FIRMA.MI_SOBREFIRMA = ""; }
                if (!row.IsMV_MEDICOIDNull()) { FIRMA.MV_MEDICOID = row.MV_MEDICOID.ToString(); } else { FIRMA.MV_MEDICOID = ""; }
                if (!row.IsMV_MEDICOSOBREFIRMANull()) { FIRMA.MV_SOBREFIRMA = row.MV_MEDICOSOBREFIRMA; } else { FIRMA.MV_SOBREFIRMA = ""; }
                return FIRMA;
            }
            return FIRMA;
        }


        public IMG_PROTOCOLO_FIRMA IMG_FIRMA_PROTOCOLORAPIDO(long TurnoId)
        {
            IMG_PROTOCOLO_FIRMA FIRMA = new IMG_PROTOCOLO_FIRMA();
            ImagenesDALTableAdapters.H2_IMG_FIRMA_PROTOCOLORAPIDOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_FIRMA_PROTOCOLORAPIDOTableAdapter();
            ImagenesDAL.H2_IMG_FIRMA_PROTOCOLORAPIDODataTable aTable = adapter.GetData(TurnoId);
            foreach (ImagenesDAL.H2_IMG_FIRMA_PROTOCOLORAPIDORow row in aTable)
            {
                if (!row.IsMI_MEDICOIDNull()) { FIRMA.MI_MEDICOID = row.MI_MEDICOID.ToString(); } else FIRMA.MI_MEDICOID = "";
                if (!row.IsMI_SOBREFIRMANull()) { FIRMA.MI_SOBREFIRMA = row.MI_SOBREFIRMA; } else { FIRMA.MI_SOBREFIRMA = ""; }                
                return FIRMA;
            }
            return FIRMA;
        }
        


        public List<IMG_COM_PROBLEMA> IMG_TURNO_LISTAR_PROBLEMAS_ITEMS(int ProblemaID)
        {
            List<IMG_COM_PROBLEMA> lista = new List<IMG_COM_PROBLEMA>();
            ImagenesDALTableAdapters.H2_IMG_TURNO_LISTAR_PROBLEMAS_ITEMSTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_TURNO_LISTAR_PROBLEMAS_ITEMSTableAdapter();
            ImagenesDAL.H2_IMG_TURNO_LISTAR_PROBLEMAS_ITEMSDataTable aTable = adapter.GetData(ProblemaID);
            foreach (ImagenesDAL.H2_IMG_TURNO_LISTAR_PROBLEMAS_ITEMSRow row in aTable)
            {
                IMG_COM_PROBLEMA dato = new IMG_COM_PROBLEMA();
                dato.COMENTARIO = row.ITP_DESCRIPCION;
                dato.MOTIVO_PROBLEMA = row.ITP_ID;
                lista.Add(dato);
            }
            return lista;
        }

        public string IMG_INFORME_MEDICOVALIDA_X_ID(long Turno)
        { 
            ImagenesDALTableAdapters.H2_IMG_INFORME_MEDICOVALIDA_X_IDTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_INFORME_MEDICOVALIDA_X_IDTableAdapter();
            ImagenesDAL.H2_IMG_INFORME_MEDICOVALIDA_X_IDDataTable aTable = adapter.GetData(Turno);
            if (aTable.Count == 1)
            {
                return aTable[0].MEDICO;
            }
                return "";            
        }



        public List<INFORME_PLANTILLA_TITULO> IMG_MEDICO_CON_FIRMA_LISTAR()
        {
            List<INFORME_PLANTILLA_TITULO> lista = new List<INFORME_PLANTILLA_TITULO>();
            ImagenesDALTableAdapters.H2_IMG_MEDICO_CON_FIRMA_LISTARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_MEDICO_CON_FIRMA_LISTARTableAdapter();
            ImagenesDAL.H2_IMG_MEDICO_CON_FIRMA_LISTARDataTable aTable = adapter.GetData();
            foreach (ImagenesDAL.H2_IMG_MEDICO_CON_FIRMA_LISTARRow row in aTable)
            {
                INFORME_PLANTILLA_TITULO Medico = new INFORME_PLANTILLA_TITULO();
                Medico.ID = row.MedicoId;
                Medico.TITULO = row.Medico_Medico;
                lista.Add(Medico);
            }
            return lista;
        }


        public List<IMG_AUDIO> IMG_AUDIO_LISTAR(long TURNO_DETALLE_ID)
        {
            List<IMG_AUDIO> lista = new List<IMG_AUDIO>();
            ImagenesDALTableAdapters.H2_IMG_AUDIO_LISTARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_AUDIO_LISTARTableAdapter();
            ImagenesDAL.H2_IMG_AUDIO_LISTARDataTable aTable = adapter.GetData(TURNO_DETALLE_ID);
            foreach (ImagenesDAL.H2_IMG_AUDIO_LISTARRow row in aTable)
            {
                IMG_AUDIO Audio = new IMG_AUDIO();
                Audio.Audio_ID = row.Audio_ID;
                Audio.DetalleID = row.DetalleID;
                Audio.Fecha = row.Fecha.ToShortDateString();
                Audio.Ruta = row.Ruta;
                Audio.TurnoId = row.TurnoId;
                lista.Add(Audio);
            }
            return lista;
        }


        public void IMG_AUDIO_INSERTAR(long TURNO_ID, long TURNO_DETALLE_ID, string RUTA)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_AUDIO_INSERTAR(TURNO_ID, TURNO_DETALLE_ID, RUTA);
        }


        public void IMG_AUDIO_ELIMINAR(long AUDIO_ID)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_AUDIO_ELIMINAR(AUDIO_ID);
        }


        public List<IMG_MEDICO_DERIVANTE> MEDICO_DERIVANTE_LISTAR(int MedicoID)
        {
            List<IMG_MEDICO_DERIVANTE> lista = new List<IMG_MEDICO_DERIVANTE>();
            ImagenesDALTableAdapters.H2_IMG_MEDICO_DERIVANTE_LISTARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_MEDICO_DERIVANTE_LISTARTableAdapter();
            ImagenesDAL.H2_IMG_MEDICO_DERIVANTE_LISTARDataTable aTable = adapter.GetData(MedicoID);
            foreach (ImagenesDAL.H2_IMG_MEDICO_DERIVANTE_LISTARRow row in aTable)
            {
                IMG_MEDICO_DERIVANTE m = new IMG_MEDICO_DERIVANTE();
                m.MEDICOID = row.MD_ID;
                m.MEDICO = row.MD_MEDICO;
                if (!row.IsMD_MNNull()) m.MN = row.MD_MN;
                if (!row.IsMD_MPNull()) m.MP = row.MD_MP;
                lista.Add(m);
            }
            return lista;
        }


        public void MEDICO_DERIVANTE_ACTUALIZAR(IMG_MEDICO_DERIVANTE MEDICO)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter QUERY = new ImagenesDALTableAdapters.QueriesTableAdapter();
            QUERY.H2_IMG_MEDICO_DERIVANTE_ACTUALIZAR(MEDICO.MEDICOID, MEDICO.MEDICO, MEDICO.MN, MEDICO.MP);
        }

        public string TURNOMASPROXIMO(string FECHA_TURNO, int MINUTOSNECESARIOS,int ESPECIALIDAD, int MEDICO,string HORA_DESDE) {

            ImagenesDALTableAdapters.H2_IMG_TURNOMASPROXIMOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_TURNOMASPROXIMOTableAdapter();
            ImagenesDAL.H2_IMG_TURNOMASPROXIMODataTable aTable = adapter.GetData(FECHA_TURNO, MINUTOSNECESARIOS, ESPECIALIDAD, MEDICO,HORA_DESDE);
            foreach (ImagenesDAL.H2_IMG_TURNOMASPROXIMORow row in aTable)
            {
                if (!row.IsDISPONIBLENull())
                {
                    return row.DISPONIBLE.ToString("HH:mm");
                }
                else {
                    return "";
                }
            }
            return "";
        }

        public string OBTENER_NA_X_TURNODETALLEID(long TurnoDetalleId)
        {
            ImagenesDALTableAdapters.H2_IMG_OBTENER_NA_X_DETALLEIDTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_OBTENER_NA_X_DETALLEIDTableAdapter();
            ImagenesDAL.H2_IMG_OBTENER_NA_X_DETALLEIDDataTable aTable = adapter.GetData(TurnoDetalleId);
            foreach (ImagenesDAL.H2_IMG_OBTENER_NA_X_DETALLEIDRow row in aTable)
            {                
                {
                    return row.na_accessionnumber.ToString();
                }
            }
            return "";
        }

        public List<IMG_FAR_PEDIDO> IMG_FAR_PEDIDO_CREAR(long Usuario, DateTime Desde, DateTime Hasta, int Especialidad)
        {
            List<IMG_FAR_PEDIDO> lista = new List<IMG_FAR_PEDIDO>();
            ImagenesDALTableAdapters.H2_IMG_FAR_PEDIDO_CREARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_FAR_PEDIDO_CREARTableAdapter();
            ImagenesDAL.H2_IMG_FAR_PEDIDO_CREARDataTable aTable = adapter.GetData(Usuario, Desde, Hasta, Especialidad);
            foreach (ImagenesDAL.H2_IMG_FAR_PEDIDO_CREARRow row in aTable)
            {
                IMG_FAR_PEDIDO pedido = new IMG_FAR_PEDIDO();
                pedido.CAB_ID = row.CAB_ID;
                if (!row.IsREM_GRAMAJENull()) pedido.GRAMAJE = row.REM_GRAMAJE; else pedido.GRAMAJE = "";
                if (!row.IsMEDIDANull()) pedido.MEDIDA = row.MEDIDA; else pedido.MEDIDA = "";
                if (!row.IsPRESENTACIONNull()) pedido.PRESENTACION = row.PRESENTACION; else pedido.PRESENTACION = "";
                pedido.REM_ID = row.REM_ID;
                if (!row.IsREM_NOMBRENull()) pedido.REM_NOMBRE = row.REM_NOMBRE; else pedido.REM_NOMBRE = "";
                if (!row.IsRUBRONull()) pedido.RUBRO = row.RUBRO; else pedido.RUBRO = "";
                if (!row.IsCANTIDADNull()) pedido.CANTIDAD = row.CANTIDAD; else pedido.CANTIDAD = 0;
                lista.Add(pedido);
            }
            return lista;
        }


        public long IMG_FAR_PEDIDO_GUARDAR(List<IMG_FAR_PEDIDO> Insumos, long PedidoID, int Usuario, string Desde, string Hasta, int Cargado)
        {
            try
            {
                ImagenesDALTableAdapters.QueriesTableAdapter QUERY = new ImagenesDALTableAdapters.QueriesTableAdapter();
                object Pedido = QUERY.H2_IMG_FARMACIA_PEDIDO_CAB_GUARDAR(Usuario);

                foreach (IMG_FAR_PEDIDO Insumo in Insumos)
                {
                    if (!Insumo.ELIMINADO)
                    {
                        QUERY.H2_IMG_FARMACIA_PEDIDO_DET_GUARDAR(Convert.ToInt64(Pedido), Convert.ToInt32(Insumo.REM_ID), Insumo.CANTIDAD, Usuario);
                    }
                }

                QUERY.H2_IMG_FARMACIA_PEDIDO_CERRAR(PedidoID);
                if (Cargado == 1)
                {
                    if (PedidoID != 0)
                    {
                        //REVISAR ESTO, PORQUE PUEDE PASAR QUE NO SE CARGE NADA!!!
                        if (Desde != "" && Hasta != "")
                        {
                            QUERY.H2_IMG_FARMACIA_PEDIDO_CERRAR_X_FECHAS(Convert.ToDateTime(Desde), Convert.ToDateTime(Hasta));
                        }
                    }
                }

                return Convert.ToInt64(Pedido);
            }
            catch (Exception ex) {
                throw new Exception(ex.Message);
            }            
        }




        public List<IMG_FAR_PEDIDO> IMG_MEDICAMENTOS_LISTA(long Practica, int Especialidad)
        {
            List<IMG_FAR_PEDIDO> lista = new List<IMG_FAR_PEDIDO>();
            ImagenesDALTableAdapters.H2_IMG_MEDICAMENTOS_LISTA_X_PRACTICATableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_MEDICAMENTOS_LISTA_X_PRACTICATableAdapter();
            ImagenesDAL.H2_IMG_MEDICAMENTOS_LISTA_X_PRACTICADataTable aTable = adapter.GetData(Practica, Especialidad);
            foreach (ImagenesDAL.H2_IMG_MEDICAMENTOS_LISTA_X_PRACTICARow row in aTable)
            {
                IMG_FAR_PEDIDO pedido = new IMG_FAR_PEDIDO();                
                if (!row.IsREM_GRAMAJENull()) pedido.GRAMAJE = row.REM_GRAMAJE; else pedido.GRAMAJE = "";
                if (!row.IsmedidaNull()) pedido.MEDIDA = row.medida; else pedido.MEDIDA = "";
                if (!row.IspresentacionNull()) pedido.PRESENTACION = row.presentacion; else pedido.PRESENTACION = "";
                pedido.REM_ID = row.REM_ID;
                if (!row.IsREM_NOMBRENull()) pedido.REM_NOMBRE = row.REM_NOMBRE; else pedido.REM_NOMBRE = "";
                if (!row.IsrubroNull()) pedido.RUBRO = row.rubro; else pedido.RUBRO = "";
                if (!row.IsPI_INSUMONull()) pedido.ELIMINADO = true; else pedido.ELIMINADO = false;
                lista.Add(pedido);
            }
            return lista;
        }

        public bool IMG_MEDICAMENTO_ACTUALIZAR(long Practica, int MedicamentoId, int Especialidad)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_IMG_MEDICAMENTOS_ACTUALIZAR_X_PRACTICA(Practica, MedicamentoId, Especialidad);
            if (Convert.ToInt32(obj) == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool IMG_TURNO_INSUMO_GUARDAR(List<IMG_FAR_PEDIDO> Insumos, long TurnoId, int Usuario)
        {
            try
            {
                ImagenesDALTableAdapters.QueriesTableAdapter QUERY = new ImagenesDALTableAdapters.QueriesTableAdapter();

                foreach (IMG_FAR_PEDIDO Insumo in Insumos)
                {
                    if (Insumo.ELIMINADO)
                    {
                        QUERY.H2_IMG_CONSULTA_INSUMO_ELIMINAR(Convert.ToInt32(Insumo.REM_ID), Convert.ToInt64(TurnoId));
                    }
                }

                foreach (IMG_FAR_PEDIDO Insumo in Insumos)
                {
                    if (!Insumo.ELIMINADO)
                    {
                        QUERY.H2_IMG_CONSULTA_INSUMO_INSERTAR(Convert.ToInt32(Insumo.REM_ID), Convert.ToInt64(TurnoId), Insumo.CANTIDAD, Usuario);
                    }
                }
                return true;                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }  
        }

        public List<IMG_FAR_PEDIDO> IMG_TURNO_INSUMO_CARGAR(long TurnoId)
        {
            List<IMG_FAR_PEDIDO> lista = new List<IMG_FAR_PEDIDO>();
            ImagenesDALTableAdapters.H2_IMG_CONSULTA_INSUMO_CARGAR_X_TURNOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_CONSULTA_INSUMO_CARGAR_X_TURNOTableAdapter();
            ImagenesDAL.H2_IMG_CONSULTA_INSUMO_CARGAR_X_TURNODataTable aTable = adapter.GetData(TurnoId);
            foreach (ImagenesDAL.H2_IMG_CONSULTA_INSUMO_CARGAR_X_TURNORow row in aTable)
            {
                IMG_FAR_PEDIDO pedido = new IMG_FAR_PEDIDO();
                pedido.REM_ID = row.REM_ID;
                if (!row.IsREM_NOMBRENull()) pedido.REM_NOMBRE = row.REM_NOMBRE; else pedido.REM_NOMBRE = "";
                if (!row.IsMEDIDANull()) pedido.MEDIDA = row.MEDIDA; else pedido.MEDIDA = "";
                if (!row.IsPRESENTACIONNull()) pedido.PRESENTACION = row.PRESENTACION; else pedido.PRESENTACION = "";
                if (!row.IsRUBRONull()) pedido.RUBRO = row.RUBRO; else pedido.RUBRO = "";
                if (!row.IsREM_GRAMAJENull()) pedido.GRAMAJE = row.REM_GRAMAJE; else pedido.GRAMAJE = "";                
                pedido.CANTIDAD = row.Cantidad;
                lista.Add(pedido);
            }
            return lista;
        }


        public IMG_FAR_INFORME_RAPIDO IMG_CARGARINFORME_RAPIDO(long TurnoPracticaID)
        {
            IMG_FAR_INFORME_RAPIDO INFORME = new IMG_FAR_INFORME_RAPIDO();
            ImagenesDALTableAdapters.H2_IMG_CARGARINFORME_RAPIDOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_CARGARINFORME_RAPIDOTableAdapter();
            ImagenesDAL.H2_IMG_CARGARINFORME_RAPIDODataTable aTable = adapter.GetData(TurnoPracticaID);
            foreach (ImagenesDAL.H2_IMG_CARGARINFORME_RAPIDORow row in aTable)
            {
                INFORME.Especialidad = row.Especialidad;
                if (!row.IsHCNull()) INFORME.HC = row.HC; else INFORME.HC = "";
                if (!row.IsIMG_INFORME_TEXTONull()) INFORME.IMG_INFORME_TEXTO = row.IMG_INFORME_TEXTO; else INFORME.IMG_INFORME_TEXTO = "";
                INFORME.Medico = row.Medico;
                INFORME.Paciente = row.Paciente;
                if (!row.IsProblemaIDNull()) INFORME.ProblemaID = row.ProblemaID.ToString(); else INFORME.ProblemaID = "0";
                if (!row.IsMEDICOINFORMANull()) INFORME.MedicoInformaId = row.MEDICOINFORMA.ToString(); else INFORME.MedicoInformaId = "-1";
                
            }
            return INFORME;
        }

        public bool IMG_INFORMERAPIDO_GUARDAR(long TurnoPracticaID, string Informe, int usuario, int MedicoInforma)
        {
            try {
                ImagenesDALTableAdapters.QueriesTableAdapter QUERY = new ImagenesDALTableAdapters.QueriesTableAdapter();
                QUERY.H2_IMG_INFORMERAPIDO_GUARDAR(TurnoPracticaID, usuario, Informe, MedicoInforma);
                return true;
            }
            catch(Exception ex){
                throw new Exception(ex.Message);
            }
            
        }

        public bool IMG_TURNOPRACTICARESUMEN_INSERTAR(long TurnoId)
        {            
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_IMG_TURNOPRACTICARESUMEN_INSERTAR(TurnoId);
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }         
        }

        public bool IMG_WORKLIST_EXISTE(long TurnoId) {
            ImagenesDALTableAdapters.H2_IMG_WORKLIST_EXISTETableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_WORKLIST_EXISTETableAdapter();
            ImagenesDAL.H2_IMG_WORKLIST_EXISTEDataTable aTable = adapter.GetData(TurnoId);
            if (aTable.Count > 0){
            if (!aTable[0].IsExisteNull()) { return true; } else { return false; }
            }
            else {
            return false;
            }
        }

        public void INDICACION_BORRAR(long ID)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_INDICACION_BORRAR(ID);
        }

        public void INDICACION_GUARDAR(long ID, string TITULO, string CONTENIDO, int EDAD)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
            query.H2_IMG_INDICACION_GUARDAR(ID, CONTENIDO, EDAD, TITULO);
        }



        internal IMG_INDICACION INDICACION_CARGAR(long ID)
        {
            IMG_INDICACION I = new IMG_INDICACION();
            ImagenesDALTableAdapters.H2_IMG_INDICACION_CARGARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_INDICACION_CARGARTableAdapter();
            ImagenesDAL.H2_IMG_INDICACION_CARGARDataTable aTable = adapter.GetData(ID);
            foreach (ImagenesDAL.H2_IMG_INDICACION_CARGARRow row in aTable)
            {
                I.ID = row.IMG_INFO_ID;
                if (!row.IsIMG_INFO_TEXTONull()) I.IMG_INFO_TEXTO = row.IMG_INFO_TEXTO;
                if (!row.IsIMG_INFO_TITULONull()) I.IMG_INFO_TITULO = row.IMG_INFO_TITULO;
                if (!row.IsIMG_MENOR_EDADNull())
                {
                    if (row.IMG_MENOR_EDAD) I.IMG_MENOR_EDAD = 1; else I.IMG_MENOR_EDAD = 0;
                }
                else
                {
                    I.IMG_MENOR_EDAD = -1;
                }
            }
            return I;
        }

        public List<IMG_ATENCION> IMG_TURNO_CONSULTORIO_LISTAR(int Especialidad, int Medico, string Desde, string Hasta, int Tipo, string HNC, string Paciente, string Documento, int usuarioID)
        {
            List<IMG_ATENCION> lista = new List<IMG_ATENCION>();
            ImagenesDALTableAdapters.H2_IMG_TURNOS_AT_CONSULTORIO_LISTAR_x_USUARIOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_TURNOS_AT_CONSULTORIO_LISTAR_x_USUARIOTableAdapter();
            ImagenesDAL.H2_IMG_TURNOS_AT_CONSULTORIO_LISTAR_x_USUARIODataTable aTable = adapter.GetData(Especialidad, Medico, Desde, Hasta, Tipo, HNC, Paciente, Documento, usuarioID);
            foreach (ImagenesDAL.H2_IMG_TURNOS_AT_CONSULTORIO_LISTAR_x_USUARIORow row in aTable)
            {
                IMG_ATENCION dato = new IMG_ATENCION();
                ///if (!row.IsfotoNull()) dato.foto = row.foto; else dato.foto = "..\\img\\silueta.jpg";
                if (!row.IsfotoNEWNull()) { dato.foto = row.fotoNEW; } else { dato.foto = "..\\img\\silueta.jpg"; }


                if (!row.Istipo_descripcionNull()) dato.tipo = row.tipo_descripcion;
                dato.nro_turno = row.IMG_TURNO_ID.ToString();
                if (!row.IsurgNull()) dato.urgencia = row.urg; else dato.urgencia = false;
                dato.paciente = row.apellido;
                dato.documento = row.documento.ToString();
                dato.nhc = row.nhc;
                if (!row.IsestudiosNull()) dato.estudio = row.estudios;
                dato.estado = row.estado.ToString();
                if (!row.IsEscaneadoNull()) dato.escaneado = true; else dato.escaneado = false;
                dato.hora_turno = row.hora;
                if (!row.IsarriboNull()) dato.arribo = row.arribo.ToString("HH:mm"); else dato.arribo = "";
                if (!row.IsinicioNull()) dato.inicio = row.inicio.ToString("HH:mm"); else dato.inicio = "";
                if (!row.Isusuario_inicioNull()) dato.usuario_inicio = row.usuario_inicio; else dato.usuario_inicio = "";
                if (!row.IsfinNull()) dato.fin = row.fin.ToString("HH:mm"); else dato.fin = "";
                if (!row.Isusuario_finNull()) dato.usuario_fin = row.usuario_fin; else dato.usuario_fin = "";
                dato.fecha = row.IMG_TURNO_FECHA.ToShortDateString();
                if (!row.IsMedicoNull()) dato.medico = row.Medico;
                if (!row.IsEspecialidadNull()) dato.especialidad = row.Especialidad;
                if (!row.IsIMG_TURNO_COMENTARIONull()) dato.comentario = row.IMG_TURNO_COMENTARIO;

                dato.PacienteId = row.PacienteId;

                dato.estado = "ocupado";
                dato.estado_numero = row.estado;

                dato.sobreturno = row.SobreTurno;
                dato.turnoforzado = row.Forzado;

                if (dato.sobreturno) { dato.estado = "sobreturno"; }
                if (dato.turnoforzado) { dato.estado = "forzado"; }

                if (row.estado == -1) dato.estado = "cancelado";

                if (row.estado == 2) dato.estado = "recepcionado";
                if (row.estado == 3) dato.estado = "llamado";
                if (row.estado == 4) dato.estado = "ausente";
                if (row.estado == 5) dato.estado = "enconsultorio";
                if (row.estado == 6) dato.estado = "atendido";
                if (row.estado == 7) dato.estado = "noatendido";

                if (!row.IsNOTIFICACIONNull() && row.NOTIFICACION.Length > 0) dato.NOTIFICACION = row.NOTIFICACION.Remove(row.NOTIFICACION.Length - 1,1);

                dato.adjunto = row.adjunto;

                lista.Add(dato);
            }
            return lista;
        }

        internal bool IMG_RELACION_PRACTICA_NOMENCLADOR_AGREGAR(int Practica, int Nomenclador, int Especialidad)
        {
            try
            {
                ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
                query.H2_IMG_RELACION_PRACTICA_NOMENCLADOR_AGREGAR(Practica, Nomenclador, Especialidad);
                return true;
            }
            catch (Exception ex) {
                return false;
            }
        }

        internal bool IMG_RELACION_PRACTICA_NOMENCLADOR_ELIMINAR(int id)
        {
            try
            {
                ImagenesDALTableAdapters.QueriesTableAdapter query = new ImagenesDALTableAdapters.QueriesTableAdapter();
                query.H2_IMG_RELACION_PRACTICA_NOMENCLADOR_ELIMINAR(id);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        internal List<IMG_PRACTICA_NOMENCLADOR> IMG_RELACION_PRACTICA_NOMENCLADOR_LISTAR(int EspecialidadID, int PracticaID)
        {
            List<IMG_PRACTICA_NOMENCLADOR> Lista = new List<IMG_PRACTICA_NOMENCLADOR>();
            ImagenesDALTableAdapters.H2_IMG_RELACION_PRACTICA_NOMENCLADOR_LISTARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_RELACION_PRACTICA_NOMENCLADOR_LISTARTableAdapter();
            ImagenesDAL.H2_IMG_RELACION_PRACTICA_NOMENCLADOR_LISTARDataTable aTable = adapter.GetData(EspecialidadID, PracticaID);
            foreach (ImagenesDAL.H2_IMG_RELACION_PRACTICA_NOMENCLADOR_LISTARRow row in aTable)
            {
                IMG_PRACTICA_NOMENCLADOR I = new IMG_PRACTICA_NOMENCLADOR();
                I.ID = row.ID;
                I.COD_IMG = row.CODIGO_IMG.ToString();
                I.COD_NOMENCLADOR = row.CODIGO_NOMENCLADOR.ToString();
                I.PRACTICA = row.PRACTICA;
                Lista.Add(I);
            }
            return Lista;           
        }


        internal List<IMG_PRACTICA_NOMENCLADOR> IMG_PRACTICAS_X_ESPECIALIDAD(int EspecialidadID)
        {
            List<IMG_PRACTICA_NOMENCLADOR> Lista = new List<IMG_PRACTICA_NOMENCLADOR>();
            ImagenesDALTableAdapters.H2_IMG_LISTARPRACTICAS_X_ESPECIALIDADTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_LISTARPRACTICAS_X_ESPECIALIDADTableAdapter();
            ImagenesDAL.H2_IMG_LISTARPRACTICAS_X_ESPECIALIDADDataTable aTable = adapter.GetData(EspecialidadID);
            foreach (ImagenesDAL.H2_IMG_LISTARPRACTICAS_X_ESPECIALIDADRow row in aTable)
            {
                IMG_PRACTICA_NOMENCLADOR I = new IMG_PRACTICA_NOMENCLADOR();
                I.ID = row.ID;
                I.PRACTICA = row.Descripcion;                                
                Lista.Add(I);
            }
            return Lista;
        }




        public List<IMG_ATENCION> IMG_TURNO_CONSULTORIO_LISTAR_HORARIO(int Especialidad, int Medico, string Desde, string Hasta, int Tipo, string HNC, string Paciente, string Documento, string HoraInicio, string HoraFin)
        {
            List<IMG_ATENCION> lista = new List<IMG_ATENCION>();
            ImagenesDALTableAdapters.H2_IMG_TURNOS_AT_CONSULTORIO_LISTAR_HORARIOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_TURNOS_AT_CONSULTORIO_LISTAR_HORARIOTableAdapter();
            ImagenesDAL.H2_IMG_TURNOS_AT_CONSULTORIO_LISTAR_HORARIODataTable aTable = adapter.GetData(Especialidad, Medico, Desde, Hasta, Tipo, HNC, Paciente, Documento, HoraInicio, HoraFin);
            foreach (ImagenesDAL.H2_IMG_TURNOS_AT_CONSULTORIO_LISTAR_HORARIORow row in aTable)
            {
                IMG_ATENCION dato = new IMG_ATENCION();
                //if (!row.IsfotoNull()) dato.foto = row.foto; else dato.foto = "..\\img\\silueta.jpg";
                if (!row.IsfotoNEWNull()) { dato.foto = row.fotoNEW; } else { dato.foto = "..\\img\\silueta.jpg"; }
                
                if (!row.Istipo_descripcionNull()) dato.tipo = row.tipo_descripcion;
                dato.nro_turno = row.IMG_TURNO_ID.ToString();
                if (!row.IsurgNull()) dato.urgencia = row.urg; else dato.urgencia = false;
                dato.paciente = row.apellido;
                dato.documento = row.documento.ToString();
                dato.nhc = row.nhc;
                if (!row.IsestudiosNull()) dato.estudio = row.estudios;
                dato.estado = row.estado.ToString();
                if (!row.IsEscaneadoNull()) dato.escaneado = true; else dato.escaneado = false;
                dato.hora_turno = row.hora;
                if (!row.IsarriboNull()) dato.arribo = row.arribo.ToString("HH:mm"); else dato.arribo = "";
                if (!row.IsinicioNull()) dato.inicio = row.inicio.ToString("HH:mm"); else dato.inicio = "";
                if (!row.Isusuario_inicioNull()) dato.usuario_inicio = row.usuario_inicio; else dato.usuario_inicio = "";
                if (!row.IsfinNull()) dato.fin = row.fin.ToString("HH:mm"); else dato.fin = "";
                if (!row.Isusuario_finNull()) dato.usuario_fin = row.usuario_fin; else dato.usuario_fin = "";
                dato.fecha = row.IMG_TURNO_FECHA.ToShortDateString();
                if (!row.IsMedicoNull()) dato.medico = row.Medico;
                if (!row.IsEspecialidadNull()) dato.especialidad = row.Especialidad;
                if (!row.IsIMG_TURNO_COMENTARIONull()) dato.comentario = row.IMG_TURNO_COMENTARIO;

                dato.PacienteId = row.PacienteId;

                dato.estado = "ocupado";
                dato.estado_numero = row.estado;

                dato.sobreturno = row.SobreTurno;
                dato.turnoforzado = row.Forzado;

                if (dato.sobreturno) { dato.estado = "sobreturno"; }
                if (dato.turnoforzado) { dato.estado = "forzado"; }

                if (row.estado == -1) dato.estado = "cancelado";

                if (row.estado == 2) dato.estado = "recepcionado";
                if (row.estado == 3) dato.estado = "llamado";
                if (row.estado == 4) dato.estado = "ausente";
                if (row.estado == 5) dato.estado = "enconsultorio";
                if (row.estado == 6) dato.estado = "atendido";
                if (row.estado == 7) dato.estado = "noatendido";

                lista.Add(dato);
            }
            return lista;
        }


        public void Imagenes_Adjunto_Insert(string NombreArchivo_Actual, string Id)
        {
            ImagenesDALTableAdapters.QueriesTableAdapter adapter = new ImagenesDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_Insert_Adjunto_IMG(NombreArchivo_Actual,Id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}