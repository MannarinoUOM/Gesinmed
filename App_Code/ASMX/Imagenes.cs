using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Descripción breve de Imagenes
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
[System.Web.Script.Services.ScriptService]
public class Imagenes : System.Web.Services.WebService {

    public Imagenes () {

        //Eliminar la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    [WebMethod]
    public List<IMG_Tipo_Imagen> Cargar_Tipo_Imagen()
    {
        Imagenes_CargaBLL img = new Imagenes_CargaBLL();
        return img.Tipos();
    }

    [WebMethod]
    public List<IMG_Tipo_Protocolo> Cargar_Tipo_Protocolo(int TI)
    {
        Imagenes_CargaBLL img = new Imagenes_CargaBLL();
        return img.Tipos_Protocolo(TI);
    }


    [WebMethod]
    public IMG_Protocolo_Estudio Cargar_Protocolo(int Protocolo_ID)
    {
        Imagenes_CargaBLL img = new Imagenes_CargaBLL();
        return img.Cargar_Protocolo(Protocolo_ID);
    }

    [WebMethod]
    public IMG_Protocolo_Estudio Cargar_Afiliado(int AfiliadoID)
    {
        Imagenes_CargaBLL img = new Imagenes_CargaBLL();
        return img.Cargar_Afiliado(AfiliadoID);
    }

    

    [WebMethod]
    public int Guardar_Protocolo(IMG_Protocolo_Estudio c)
    {                   
            Imagenes_CargaBLL img = new Imagenes_CargaBLL();
            return img.Guardar(c);
    }


    [WebMethod(EnableSession = true)]
    public List<especialidades> Imagenes_Especialidades(long EspecialidadId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.EspecialidadesBLL esp = new Hospital.EspecialidadesBLL();
            return esp.Imagenes_Especialidades(EspecialidadId);
        }
        else
        {
            return null;
        }
    }
    

    
    [WebMethod]
    public List<IMG_Protocolos_Buscar> Buscar_Protocolo(string Afiliado, string Desde, string Hasta, string NroComprobante, string nroHC)    
    {
        try
        {
            //expression ? value if true : value if false

            //DateTime desde = Convert.ToDateTime(Desde);
            //DateTime hasta = Convert.ToDateTime(Hasta);           

            IMG_Protocolos_Buscar b = new IMG_Protocolos_Buscar();

            if (NroComprobante == "") { NroComprobante = "0"; }
            

            b.Fecha_Desde = Desde;
            b.Fecha_Hasta = Hasta;
            b.HC_UOM_CENTRAL = nroHC;
            b.IMG_NUMERO = Convert.ToInt32(NroComprobante);
            b.apellido = Afiliado;

            //return b.Bono_Buscar(Afiliado, desde, hasta, NroComprobante, nroHC, PracticaIds);   

            Imagenes_CargaBLL img = new Imagenes_CargaBLL();
            return img.Buscar(b);
               
        }
        catch (Exception ex)
        {
            throw new Exception("Intente nuevamente, o comuníquese con Soporte.");
        }
    }

    [WebMethod]
    public string Listar_Turnos(int Especialidad,int Medico,string Dia, bool SoloHoras) {
        ImagenesDALTableAdapters.H2_Imagenes_Turnos_ListarTableAdapter adapter = new ImagenesDALTableAdapters.H2_Imagenes_Turnos_ListarTableAdapter();
        ImagenesDAL.H2_Imagenes_Turnos_ListarDataTable aTable = adapter.GetData(Especialidad, Medico, Convert.ToDateTime(Dia));
        string Hora_Anterior = "0";
        string Turno_Anterior = "0";
        string Turno_Id = "0";
        string Estado = "libre";
        string Estado_anterior = Estado;
        string tabla = "";
        string Comentario = "";
        string Comentario_Anterior = "";
        string Practica = "";
        //string Practica_Anterior = "";


        string Hora_Fin = "";

        foreach (ImagenesDAL.H2_Imagenes_Turnos_ListarRow row in aTable)
        {
            Estado = "libre";
            Practica = "";
            if (!row.IsTurnoIdNull()){Turno_Id = row.TurnoId.ToString();}else{Turno_Id = "0";}
            if (!row.IsComentarioNull()){Comentario = row.Comentario;}else{Comentario = "";}
            if (!row.IsPracticaNull()) { Practica = row.Practica; } else { Practica = ""; }
            

            if (!row.IsApellidoNull()) Estado = "ocupado";
            if (row.Estado == "-1") Estado = "cancelado";
            if (!row.IsSobreturnoNull()) {if (row.Sobreturno && row.Estado != "-1"){Estado = "sobreturno";}}
            if (!row.IsTurnoForzadoNull()) { if (row.TurnoForzado && row.Estado != "-1") { Estado = "forzado"; } }

            if (row.Estado == "2") Estado = "recepcionado";
            if (row.Estado == "3") Estado = "llamado";
            if (row.Estado == "4") Estado = "ausente";
            if (row.Estado == "5") Estado = "enconsultorio";
            if (row.Estado == "6") Estado = "atendido";
            if (row.Estado == "7") Estado = "noatendido";
            

            string Apellido = "";            
            //string Hora = "";            

            if (!row.IsApellidoNull()) { Apellido = row.Apellido; } else { Practica = ""; }

            if (!row.IsHora_FinNull())
            {
                Hora_Fin = row.Hora_Fin;
            }
            else
            {
                if (Convert.ToDateTime("03/06/2016 " + row.Hora) > Convert.ToDateTime("03/06/2016 " + Hora_Fin))
                {
                    //Estado = "libre";
                    Hora_Fin = row.Hora;
                }
                else
                {
                    //Estado = "ocupado";
                    Estado = Estado_anterior;
                    Turno_Id = Turno_Anterior;
                    Comentario = Comentario_Anterior;
                    //Practica = Practica_Anterior;
                }
            }

            
                string Hora = "&nbsp;";

                if (Turno_Id == "0")
                {
                    Hora = row.Hora;
                }
                else
                {
                    if (Apellido != "")
                    {
                        Hora = row.Hora;
                    }
                }
                if (!SoloHoras)
                {
                    tabla = tabla + "<tr class='" + Estado + "' data-motivo='" + Comentario + "' data-dia='" + Dia + "' data-turno='" + Turno_Id + "'><td>" + Hora + "</td><td>" + Apellido + "</td><td>" + Practica + "</td></tr>";
                }
                else
                {
                    tabla = tabla + "<span class='" + Estado + " bloque Texto_Centrado' data-dia='" + Dia + "' data-motivo='" + Comentario + "' data-turno='" + Turno_Id + "'>" + Hora + "</span>";
                }
                

            Turno_Anterior = Turno_Id;
            Hora_Anterior = row.Hora;
            Estado_anterior = Estado;
            Comentario_Anterior = Comentario;
            //Practica_Anterior = Practica;
        }

        return tabla;
    }

    [WebMethod]
    public List<IMG_ATENCION> IMG_TURNO_CONSULTORIO_LISTAR(int Especialidad, int Medico, string Desde, string Hasta, int Tipo, string HNC, string Paciente, string Documento)
    {
        List<IMG_ATENCION> lista = new List<IMG_ATENCION>();
        Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
        lista = img.IMG_TURNO_CONSULTORIO_LISTAR(Especialidad, Medico, Desde, Hasta, Tipo, HNC, Paciente, Documento);
        return lista;
    }


    [WebMethod]
    public List<IMG_ATENCION> IMG_TURNO_CONSULTORIO_LISTAR_HORARIO(int Especialidad, int Medico, string Desde, string Hasta, int Tipo, string HNC, string Paciente, string Documento, string HoraInicio, string HoraFin)
    {
        List<IMG_ATENCION> lista = new List<IMG_ATENCION>();
        Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
        lista = img.IMG_TURNO_CONSULTORIO_LISTAR_HORARIO(Especialidad, Medico, Desde, Hasta, Tipo, HNC, Paciente, Documento, HoraInicio, HoraFin);
        return lista;
    }


    [WebMethod]
    public List<IMG_ATENCION> Listar_Turnos_Consultorio_No_USAR(int Especialidad, int Medico, string Dia, bool SoloHoras)
    {
        List<IMG_ATENCION> Lista = new List<IMG_ATENCION>();
        ImagenesDALTableAdapters.H2_Imagenes_Turnos_ListarTableAdapter adapter = new ImagenesDALTableAdapters.H2_Imagenes_Turnos_ListarTableAdapter();
        ImagenesDAL.H2_Imagenes_Turnos_ListarDataTable aTable = adapter.GetData(Especialidad, Medico, Convert.ToDateTime(Dia));
        string Hora_Anterior = "0";
        string Turno_Anterior = "0";
        string Turno_Id = "0";
        string Estado = "libre";
        string Estado_anterior = Estado;
        string tabla = "";
        string Comentario = "";
        string Comentario_Anterior = "";
        string Practica = "";
        //string Practica_Anterior = "";


        string Hora_Fin = "";

        foreach (ImagenesDAL.H2_Imagenes_Turnos_ListarRow row in aTable)
        {

            IMG_ATENCION turno = new IMG_ATENCION();

            Estado = "libre";
            Practica = "";
            if (!row.IsTurnoIdNull()) { Turno_Id = row.TurnoId.ToString(); } else { Turno_Id = "0";  }
            if (!row.IsComentarioNull()) { Comentario = row.Comentario; } else { Comentario = ""; }
            if (!row.IsPracticaNull()) { Practica = row.Practica; } else { Practica = ""; }


            if (!row.IsApellidoNull()) Estado = "ocupado";
            if (row.Estado == "-1") Estado = "cancelado";
            if (!row.IsSobreturnoNull()) { if (row.Sobreturno && row.Estado != "-1") { Estado = "sobreturno"; } }
            if (!row.IsTurnoForzadoNull()) { if (row.TurnoForzado) { Estado = "forzado"; } }

            if (row.Estado == "2") Estado = "recepcionado";
            if (row.Estado == "3") Estado = "llamado";
            if (row.Estado == "4") Estado = "ausente";
            if (row.Estado == "5") Estado = "enconsultorio";
            if (row.Estado == "6") Estado = "atendido";
            if (row.Estado == "7") Estado = "noatendido";

            turno.estado = Estado;

            string Apellido = "";
            turno.paciente = "";
            //string Hora = "";            

            if (!row.IsApellidoNull()) { Apellido = row.Apellido; } else { Practica = ""; }

            if (!row.IsHora_FinNull())
            {
                Hora_Fin = row.Hora_Fin;                
            }
            else
            {
                if (Convert.ToDateTime("03/06/2016 " + row.Hora) > Convert.ToDateTime("03/06/2016 " + Hora_Fin))
                {
                    //Estado = "libre";
                    Hora_Fin = row.Hora;
                }
                else
                {
                    //Estado = "ocupado";
                    Estado = Estado_anterior;
                    Turno_Id = Turno_Anterior;
                    Comentario = Comentario_Anterior;                    
                    //Practica = Practica_Anterior;
                }
            }


            string Hora = "&nbsp;";

            if (Turno_Id == "0")
            {
                Hora = row.Hora;                
            }
            else
            {
                if (Apellido != "")
                {
                    Hora = row.Hora;                    
                }
            }
            if (!SoloHoras)
            {
                turno.estado = Estado;
                turno.fecha = Dia;
                turno.comentario = Comentario;
                turno.nro_turno = Turno_Id;
                turno.hora_turno = Hora;
                turno.paciente = Apellido;
                turno.practicas = Practica;
                Lista.Add(turno);
                //tabla = tabla + "<tr class='" + Estado + "' data-motivo='" + Comentario + "' data-dia='" + Dia + "' data-turno='" + Turno_Id + "'><td>" + Hora + "</td><td>" + Apellido + "</td><td>" + Practica + "</td></tr>";
            }
            else
            {
                turno.comentario = Comentario;
                turno.estado = Estado;
                turno.fecha = Dia;
                turno.nro_turno = Turno_Id;
                turno.hora_turno = Hora;                                
                Lista.Add(turno);
                //tabla = tabla + "<span class='" + Estado + " bloque Texto_Centrado' data-dia='" + Dia + "' data-motivo='" + Comentario + "' data-turno='" + Turno_Id + "'>" + Hora + "</span>";
            }


            Turno_Anterior = Turno_Id;
            Hora_Anterior = row.Hora;
            Estado_anterior = Estado;
            Comentario_Anterior = Comentario;
            //Practica_Anterior = Practica;
        }

        return Lista;
    }





    [WebMethod(EnableSession = true)]
    public long IMG_DarTurno(string Fecha, string Hora, int Minutos, int EspecialidadId, int MedicoId, long PacienteId, bool SobreTurno, bool TurnoForzado, bool MinutosFijos, long TurnoId, bool TurnoXEmail, bool Urgencia, int Tipo, string HoraVisible, string Comentario, int MedicoDerivante)
    {
        if (Session["Usuario"] != null)
        {
            try
            {
                if ((int)Minutos > 0)
                {
                    Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
                    int usuario = (int)((usuarios)Session["Usuario"]).id;
                    return img.IMG_DarTurno(Fecha, Hora, Minutos, EspecialidadId, MedicoId, PacienteId, SobreTurno, TurnoForzado, MinutosFijos, TurnoId, usuario, TurnoXEmail, Urgencia, Tipo, HoraVisible, Comentario, MedicoDerivante);
                }
                else
                {
                    throw new Exception("Los minutos no pueden ser menores a cero.");
                }
            }
            catch(Exception ex){
                throw new Exception(ex.Message);
            }
        }
        else
        {
            return 0;
        }
    }


    [WebMethod(EnableSession = true)]
    public void IMG_ActualizarPracticas(long TurnoId, List<IMG_Practicas> Practicas)
    {
        if (Session["Usuario"] != null)
        {
            //Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            //foreach (IMG_Practicas pract in Practicas)
            //{
            //    if (pract.Eliminado == 1)
            //    {
            //        img.IMG_QuitarPractica(TurnoId, Convert.ToInt32(pract.PracticaId));
            //    }
            //}
            
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_QuitarTodasLasPractica(TurnoId);

            foreach (IMG_Practicas pract in Practicas)
            {
                if (pract.Eliminado == 0)
                {
                    img.IMG_AgregarPractica(TurnoId, Convert.ToInt32(pract.PracticaId), pract.Comentario, pract.PracticaDuracion);
                }
            }

            //ACA TENGO QUE CORRER UN PROCEDIMIENTO QUE GUARDE LOS NOMBRES DE LAS PRACTICAS INSERTADAS...
            img.IMG_TURNOPRACTICARESUMEN_INSERTAR(TurnoId);       
            
        }        
    }


       [WebMethod(EnableSession = true)]
    public IMG_Turno_Info IMG_Turno_Info(long TurnoId) {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            IMG_Turno_Info info = img.IMG_Turno_Info(TurnoId);
            return info;
        }
        else
        {
            return null;
        }
    }

           [WebMethod(EnableSession = true)]
       public List<IMG_Practicas> H2_IMG_Practicas_Detalle_Cargar(long TurnoId)
       {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            List<IMG_Practicas> pract = img.H2_IMG_Practicas_Detalle_Cargar(TurnoId);
            return pract;
        }
        else
        {
            return null;
        }
    }
    

       [WebMethod(EnableSession = true)]
       public bool Actualizar_Paciente_Info(long PacienteId, string Email, string Telefono, string Celular, int Seccional, string Apellido)
       {
        if (Session["Usuario"] != null)
        {
            try
            {
                Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
                img.Actualizar_Paciente_Info(PacienteId, Telefono, Celular, Email, Seccional, Apellido);
                return true;
            }
            catch 
            {
                return false;
            }            
        }
        else
        {
            return false;
        }
    }



       [WebMethod(EnableSession = true)]
       public IMG_Pacientes_Info Cargar_Paciente_Info(long PacienteId)
       {
           if (Session["Usuario"] != null)
           {
               Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
               return img.Cargar_Paciente_Info(PacienteId);
           }
           else
           {
               return null;
           }
       }

           
    
    [WebMethod(EnableSession = true)]
       public void ElimiarTurnosDe48Hs()
       {
           if (Session["Usuario"] != null)
           {
               Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
               img.ElimiarTurnosDe48Hs();
           }          
           
       }


    [WebMethod(EnableSession = true)]
    public void ElimiarTurno(long TurnoId)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.ElimiarTurno(TurnoId, usuario);
        }
    }

   
    [WebMethod(EnableSession = true)]
    public List<IMG_Escaneado> H2_IMG_ESCANEAR_CARGAR(long TurnoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.H2_IMG_ESCANEAR_CARGAR(TurnoId);
        }
        else
        {
            return null;
        }
    }

    [WebMethod(EnableSession = true)]
    public void H2_IMG_Practica_Duracion_Actualizar(List<IMG_Practicas> Practicas, int EspecialidadId, List<IMG_Practicas> Indicaciones, List<IMG_Practicas> Abreviaciones)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.H2_IMG_Practica_Duracion_Actualizar(Practicas, EspecialidadId, Indicaciones, usuario, Abreviaciones);
        }              

    }


    [WebMethod(EnableSession = true)]
    public void H2_IMG_Practica_Duracion_Actualizar_2(List<IMG_Practicas> Practicas, int EspecialidadId)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.H2_IMG_Practica_Actualizar(Practicas, EspecialidadId);
        }

    }



    //Días de atención
    [WebMethod(EnableSession = true)]
    public List<diasdeatencion_Vista> ListarDiaAtencion(int EspecialidadId, int MedicoId)
    {
        if (Session["Usuario"] != null)
        {            
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_DIA_ATENCION_X_MED_ESP_LISTAR(EspecialidadId, MedicoId);
        }
        else
        {
            return null;
        }

    }


    [WebMethod(EnableSession = true)]
    public void ModificarDiaAtencion(diasdeatencion_Vista dia)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_DIA_ATENCION_MODIFICAR(dia, usuario);
        }        

    }


    [WebMethod(EnableSession = true)]
    public void EliminarDiaAtencion(int Id)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_DIA_ATENCION_ELIMINAR(Id);
        }
    }







    //Días de no atención
    [WebMethod(EnableSession = true)]
    public List<IMG_diasdenoatencion> ListarDiaNoAtencion(int EspecialidadId, int MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.H2_IMG_DIA_NO_ATENCION_LISTAR(EspecialidadId, MedicoId);
        }
        else
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    public void ModificarDiaNoAtencion(IMG_diasdenoatencion dia)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_DIA_NO_ATENCION_MODIFICAR(dia, usuario);
        }

    }


    [WebMethod(EnableSession = true)]
    public void EliminarDiaNoAtencion(int Id)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_DIA_NO_ATENCION_ELIMINAR(Id);
        }
    }






    //Días Extraordinario
    [WebMethod(EnableSession = true)]
    public List<IMG_Dias_Extraordinario> ListarDiaExtraordinario(int EspecialidadId, int MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.H2_IMG_DIA_EXTRAORDINARIO_ATENCION_LISTAR(EspecialidadId, MedicoId);
        }
        else
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    public void ModificarDiaExtraordinario(IMG_Dias_Extraordinario dia)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_DIA_EXTRAORDINARIO_MODIFICAR(dia, usuario);
        }

    }


    [WebMethod(EnableSession = true)]
    public void EliminarDiaExtraordinario(int Id)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_DIA_EXTRAORDINARIO_ELIMINAR(Id);
        }
    }

    

    //BONO!!!
    
    [WebMethod(EnableSession = true)]
    public List<IMG_Bono_Practica> IMG_BONO_CARGAR_PRACTICAS(long TurnoId, bool Monotributista)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_BONO_CARGAR_PRACTICAS(TurnoId, Monotributista);
        }
        else
        {
            return null;
        }
    }



    [WebMethod(EnableSession = true)]
    public void IMG_BONO_RELACIONAR_CON_TURNO(long TurnoId, string Bono)
    {
        if (Session["Usuario"] != null)
        {
            long Id = Convert.ToInt64(Bono.Split('&')[0].Remove(0, 3));
            string Fecha = Bono.Split('&')[1].Remove(0, 6);
                        
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_BONO_RELACIONAR_CON_TURNO(TurnoId,Fecha, Id );
        }        
    }    

    [WebMethod(EnableSession = true)]
    public void IMG_BONO_ESTADO(long TurnoId)
    {
        if (Session["Usuario"] != null)
        {               
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_BONO_ESTADO(TurnoId);
        }        
    }


    [WebMethod(EnableSession = true)]
    public bool IMG_BONO_RELACIONAR_CON_TURNO_X_ID(long TurnoId, long BonoId)
    {
        if (Session["Usuario"] != null)
        {    
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_BONO_RELACIONAR_CON_TURNO(TurnoId, BonoId);
            return true;
        }
        return false;
    }


    [WebMethod(EnableSession = true)]
    public bool IMG_TURNO_RECEPCIONAR(long TurnoId)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_TURNO_RECEPCIONAR(TurnoId, usuario);
            return true;
        }
        return false;
    } 

    
    [WebMethod(EnableSession = true)]
    public int IMAGENES_TURNO_CAMBIARESTADO(long TurnoId, int Estado)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMAGENES_TURNO_CAMBIARESTADO(TurnoId, Estado, usuario);            
        }
        return 0;
    }


    [WebMethod(EnableSession = true)]
    public List<IMG_Plantilla> IMG_PLANTILLA_ESPECIALIDAD_LISTAR(long TurnoId, int Especialidad)
    {
        if (Session["Usuario"] != null)
        {            
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_PLANTILLA_ESPECIALIDAD_LISTAR(TurnoId, Especialidad);
        }
        return null;
    }


    [WebMethod(EnableSession = true)]
    public void IMG_PLANTILLA_ESPECIALIDAD_GUARDAR(long TurnoId, int Especialidad, List<IMG_Plantilla> Practicas, string Comentario, int InformarProblema, bool Recitar)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            int usuario = (int)((usuarios)Session["Usuario"]).id;

            img.IMG_PLANTILLA_ESPECIALIDAD_CAB_GUARDAR(TurnoId, usuario, Comentario, InformarProblema, Recitar);

            foreach (IMG_Plantilla p in Practicas)
            {
                img.IMG_PLANTILLA_ESPECIALIDAD_GUARDAR(TurnoId, p.InsumoId, p.Cantidad, usuario);                
            }            
        }        
    }


    [WebMethod(EnableSession = true)]
    public void IMG_WORKLIST_GUARDAR(long TurnoId)
    {
        if (Session["Usuario"] != null)
        {
            //int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_WORKLIST_GUARDAR(TurnoId);
        }
    }


    [WebMethod(EnableSession = true)]
    public void IMG_WORKLIST_MODALIDAD_GUARDAR(long TurnoId, string Modalidad)
    {
        if (Session["Usuario"] != null)
        {
            //int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_WORKLIST_MODALIDAD_GUARDAR(TurnoId, Modalidad);
        }
    }
       
    
    [WebMethod(EnableSession = true)]
    public IMG_COM_PROBLEMA IMG_PLANTILLA_ESPECIALIDAD_CAB_LISTAR(long TurnoId)
    {
        if (Session["Usuario"] != null)
        {
            //int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_PLANTILLA_ESPECIALIDAD_CAB_LISTAR(TurnoId);
        }
        return null;
    }



    [WebMethod(EnableSession = true)]
    public void IMG_PLANTILLA_ESPECIALIDAD_CAB_GUARDAR(long TurnoId, string Comentario, int InformarProblema, bool Recitar)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            img.IMG_PLANTILLA_ESPECIALIDAD_CAB_GUARDAR(TurnoId, usuario, Comentario, InformarProblema, Recitar);
        }
    }


    [WebMethod(EnableSession = true)]
    public string IMG_TURNO_SIN_ATENDER_LISTADO(int Especialidad, int Medico, long Turno)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            return img.IMG_TURNO_SIN_ATENTER_LISTADO(Especialidad, Medico, Turno, usuario);
        }
        return "";
    }

    
    [WebMethod(EnableSession = true)]
    public List<IMG_BONO_LISTAR_X_TURNO> IMG_TURNO_CONSULTORIO_LISTAR_BONO(long Turno)
    {
        if (Session["Usuario"] != null)
        {            
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            return img.IMG_TURNO_CONSULTORIO_LISTAR_BONO(Turno);
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    public bool H2_IMG_BONO_USAR(long Turno, long BonoId)
    {
        if (Session["Usuario"] != null)
        {            
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            return img.H2_IMG_BONO_USAR(Turno, BonoId, usuario);
        }
        return false;
    }


    [WebMethod(EnableSession = true)]
    public List<IMG_BONO_BUSCAR_PACIENTE> IMG_BONO_BUSCAR_PACIENTE(string DOCUMENTO, string NHC, string PACIENTE)
    {
        if (Session["Usuario"] != null)
        {            
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            //int usuario = (int)((usuarios)Session["Usuario"]).id;
            long Docu = 0;
            if (DOCUMENTO.Length > 0)
            {
                Docu = long.Parse(DOCUMENTO);
            }
            return img.IMG_BONO_BUSCAR_PACIENTE(PACIENTE.Trim(), Docu, NHC);
        }
        return null;
    }


    [WebMethod(EnableSession = true)]
    public List<IMG_PREPARACION> IMG_PREPARACION_LISTA(long Practica)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            //int usuario = (int)((usuarios)Session["Usuario"]).id;            
            return img.IMG_PREPARACION_LISTA(Practica);
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    public bool IMG_PREPARACION_ACTUALIZAR(long Practica,int PreparacionId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            //int usuario = (int)((usuarios)Session["Usuario"]).id;            
            return img.IMG_PREPARACION_ACTUALIZAR(Practica, PreparacionId);
        }
        return false;
    }

    [WebMethod(EnableSession = true)]
    public List<INFORME_LISTA_ATENDIDO> H2_IMG_INFORME_LISTA_PACIENTES(int EspecialidadId, string DiaInicio, string DiaFin)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.H2_IMG_INFORME_LISTA_PACIENTES(EspecialidadId, DiaInicio, DiaFin);
        }
        return null;
    }
    
    [WebMethod(EnableSession = true)]
    public void INFORME_CAMBIAR_ESTADO(long TurnoId, int Estado)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            img.INFORME_CAMBIAR_ESTADO(TurnoId, Estado, usuario);
        }
    }


    [WebMethod(EnableSession = true)]
    public void INFORME_CAMBIAR_PRACTICA_ESTADO(long TurnoId, int Estado, int MedicoInforma)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            img.INFORME_CAMBIAR_PRACTICA_ESTADO(TurnoId, Estado, usuario, MedicoInforma);
        }
    }

    [WebMethod(EnableSession = true)]
    public void INFORME_CAMBIAR_PRACTICA_ESTADO_LISTA(string Listado, int Estado, int MedicoInforma)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            string[] Listados = Listado.Split(',');
            foreach (string dato in Listados)
            {
                if (dato != "")
                {
                    string Detalle = dato.Split('-')[1];
                    if (Detalle != "")
                    {
                        img.INFORME_CAMBIAR_PRACTICA_ESTADO(Convert.ToInt64(Detalle), Estado, usuario, MedicoInforma);
                    }
                }
            }            
        }
    }
    

    [WebMethod(EnableSession = true)]
    public List<INFORME_PLANTILLA_TITULO> INFORME_CARGAR_TITULOS(int ESPECIALIDAD_ID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();            
            return img.INFORME_CARGAR_TITULOS(ESPECIALIDAD_ID);
        }
        return null;
    }

    
    [WebMethod(EnableSession = true)]
    public List<INFORME_PLANTILLA_TITULO> INFORME_CARGAR_TITULOS_X_MEDICO(int ESPECIALIDAD_ID, int MEDICOID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.INFORME_CARGAR_TITULOS_X_MEDICO(ESPECIALIDAD_ID, MEDICOID);
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    public INFORME_PLANTILLA_DETALLE CARGAR_INFORME_DETALLE(int PLANTILLAID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.CARGAR_INFORME_DETALLE(PLANTILLAID);
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    public INFORME_PLANTILLA_DETALLE CARGAR_INFORME(int TurnoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.CARGAR_INFORME(TurnoId);
        }
        return null;
    }


    [WebMethod(EnableSession = true)]
    public INFORME_PLANTILLA_DETALLE CARGAR_INFORME_PRACTICA(int TurnoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.CARGAR_INFORME_PRACTICA(TurnoId);
        }
        return null;
    }
    

    [WebMethod(EnableSession = true)]
    public bool INFORME_GUARDAR(long TurnoId, int estado, string informe )
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.INFORME_GUARDAR(TurnoId, estado, usuario, informe);
            return true;
        }
        return false;
    }


    [WebMethod(EnableSession = true)]
    public bool INFORME_PRACTICA_GUARDAR(long TurnoId, int estado, string informe)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.INFORME_PRACTICA_GUARDAR(TurnoId, estado, usuario, informe);
            return true;
        }
        return false;
    }


    [WebMethod(EnableSession = true)]
    public bool INFORME_GUARDAR_PLANTILLA(int Especialidad, string Titulo, string Informe, int Id, int MedicoID)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.INFORME_GUARDAR_PLANTILLA(Especialidad, Titulo, Informe, Id, MedicoID);
            return true;
        }
        return false;
    }


    [WebMethod(EnableSession = true)]
    public string DarHoraFueraDeHorario(string Fecha, int MedicoId, int EspecialidadId)
    {
        if (Session["Usuario"] != null)
        {
            try
            {
                DateTime Dia = DateTime.Parse(Fecha);
                //int usuario = (int)((usuarios)Session["Usuario"]).id;
                Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
                return img.DarHoraFueraDeHorario(Dia, MedicoId, EspecialidadId).Substring(0,5);
            }
            catch (Exception ex)
            { 
                throw new Exception(ex.Message.ToString());
            }
        }
        return "";
    }

    [WebMethod(EnableSession = true)]
    public void LlamarTurnera(int MedicoId, int Especialidad, long NHC)
    {
        Hospital.AtConsultorioBLL Confirmar = new Hospital.AtConsultorioBLL();
        string ConsultorioId = ((usuarios)(Context.Session["Usuario"])).ip;
        Confirmar.Llamar_Paciente_Turnera(MedicoId, Especialidad, NHC, ConsultorioId);
    }

    [WebMethod(EnableSession = true)]
    public void MoverEscaneado(long TurnoViejo, long TurnoNuevo)
    {
        Hospital.ImagenesBLL Imagenes = new Hospital.ImagenesBLL();
        Imagenes.MoverEscaneado(TurnoViejo, TurnoNuevo);
    }


    [WebMethod(EnableSession = true)]
    public List<INFORME_LISTA_ATENDIDO> H2_IMG_INFORME_LISTADO(int EspecialidadId, string DiaInicio, string DiaFin, int MedicoID, bool SoloMedicoSeleccionado, int MedicoValidar, int TipoOrden)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();            
            if (!SoloMedicoSeleccionado)
            {
                MedicoValidar = 0;
            }
            return img.H2_IMG_INFORME_LISTADO(EspecialidadId, DiaInicio, DiaFin, MedicoID, MedicoValidar, TipoOrden);
        }
        return null;
    }


    [WebMethod(EnableSession = true)]
    public List<PracticaxMedico> H2_IMAGENES_PRACTICAS_X_MEDICO_X_ESPECIALIDAD(long EspecialidadId, int MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.H2_IMAGENES_PRACTICAS_X_MEDICO_X_ESPECIALIDAD(EspecialidadId, MedicoId);
        }
        return null;       
    }


    [WebMethod(EnableSession = true)]
    public List<PracticaxMedico> H2_IMAGENES_PRACTICAS_X_MEDICO_X_ESPECIALIDAD_ACTIVAS(long EspecialidadId, int MedicoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            List<PracticaxMedico> auxilista = new List<PracticaxMedico>();
            List<PracticaxMedico> lista = new List<PracticaxMedico>();
            auxilista = img.H2_IMAGENES_PRACTICAS_X_MEDICO_X_ESPECIALIDAD(EspecialidadId, MedicoId);
            foreach (PracticaxMedico p in auxilista)
            {
                if (p.PracticaUtiliza) { lista.Add(p); }
            }
            return lista;
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    public void H2_IMAGENES_PRACTICAS_X_MEDICO_X_ESPECIALIDAD_ACTUALIZAR(long EspecialidadId, long MedicoId, long PracticaId, bool Realiza)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.H2_IMAGENES_PRACTICAS_X_MEDICO_X_ESPECIALIDAD_ACTUALIZAR(EspecialidadId, MedicoId, PracticaId, Realiza);
        }        
    }


    [WebMethod(EnableSession = true)]
    public void GuardarComentario(long TurnoId, string Comentario)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.H2_IMG_COMENTARIO_GUARDAR(TurnoId, Comentario);
        }
    }

    [WebMethod(EnableSession = true)]
    public void IMAGENES_TURNO_RECHAZAR_MOTIVO(long TurnoID, int MotivoID, string MotivoDetalle)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMAGENES_TURNO_RECHAZAR_MOTIVO(TurnoID, MotivoID, MotivoDetalle, usuario);
        }
    }


    [WebMethod(EnableSession = true)]
    public void IMG_LIBERAR_BONO(long TurnoID, string Motivo, long TurnoNuevoId)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_LIBERAR_BONO(TurnoID, Motivo, TurnoNuevoId);
        }
    }


    [WebMethod(EnableSession = true)]
    public bool IMAGENES_TURNO_SEPUEDESALVARBONO(long TurnoID)
    {
        if (Session["Usuario"] != null)
        {            
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            if (img.IMAGENES_TURNO_SEPUEDESALVARBONO(TurnoID) != 6)
            {
                return true;
            }
            else return false;            
        }
        return false;
    }

    



    [WebMethod(EnableSession = true)]
    public void IMG_MEDICO_FIRMA_AGREGAR(int MedicoID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_MEDICO_FIRMA_AGREGAR(MedicoID);
        }
    }

    [WebMethod(EnableSession = true)]
    public void IMG_MEDICO_FIRMA_QUITAR(int MedicoID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_MEDICO_FIRMA_QUITAR(MedicoID);
        }
    }

    [WebMethod(EnableSession = true)]
    public void IMG_MEDICO_FIRMA_ACTUALIZAR(int MedicoID, string Abreviacion, int USUARIO, string SOBREFIRMA)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_MEDICO_FIRMA_ACTUALIZAR(MedicoID, Abreviacion, USUARIO, SOBREFIRMA);
        }
    }


    [WebMethod(EnableSession = true)]
    public List<IMG_MEDICO_FIRMA> IMG_MEDICO_FIRMA_INFO(int MedicoID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_MEDICO_FIRMA_INFO(MedicoID);
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    public List<IMG_USUARIO> IMG_LISTAR_USUARIOS()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_LISTAR_USUARIOS();
        }
        return null;
    }


    [WebMethod(EnableSession = true)]
    public void IMG_MEDICO_FIRMA_ELIMINARFIRMA(int MedicoID)
    {
        if (Session["Usuario"] != null)
        {
            if ((System.IO.File.Exists("~/img/Firmas_IMG/" + MedicoID + ".png")))
            {
                System.IO.File.Delete("~/img/Firmas_IMG/" + MedicoID + ".png");
            }
        }
    }

    [WebMethod(EnableSession = true)]
    public List<IMG_COM_PROBLEMA> IMG_TURNO_LISTAR_PROBLEMAS_ITEMS(int ProblemaID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_TURNO_LISTAR_PROBLEMAS_ITEMS(ProblemaID);
        }
        return null;
    }


    [WebMethod(EnableSession = true)]
    public string IMG_INFORME_MEDICOVALIDA_X_ID(long TurnoDetalleId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_INFORME_MEDICOVALIDA_X_ID(TurnoDetalleId);            
        }
        else
        {
            return null;
        }
    }
    

    [WebMethod(EnableSession = true)]
    public List<INFORME_PLANTILLA_TITULO> IMG_MEDICO_CON_FIRMA_LISTAR()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_MEDICO_CON_FIRMA_LISTAR();
        }
        else
        {
            return null;
        }
    }


    [WebMethod(EnableSession = true)]
    public List<IMG_AUDIO> IMG_AUDIO_LISTAR(long TURNO_DETALLE_ID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_AUDIO_LISTAR(TURNO_DETALLE_ID);        
        }
        else
        {
            return null;
        }
    }


    [WebMethod(EnableSession = true)]
    public void IMG_AUDIO_ELIMINAR(long ID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.IMG_AUDIO_ELIMINAR(ID);
        }
    }


    [WebMethod(EnableSession = true)]
    public void MEDICO_DERIVANTE_ACTUALIZAR(IMG_MEDICO_DERIVANTE Medico)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.MEDICO_DERIVANTE_ACTUALIZAR(Medico);
        }
    }



    [WebMethod(EnableSession = true)]
    public List<IMG_MEDICO_DERIVANTE> MEDICO_DERIVANTE_LISTAR(int MedicoID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.MEDICO_DERIVANTE_LISTAR(MedicoID);
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    public string TURNOMASPROXIMO(string FECHA_TURNO, int MINUTOSNECESARIOS, int ESPECIALIDAD, int MEDICO, string HORA_DESDE)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            if (HORA_DESDE == "") { HORA_DESDE = null; }
            return img.TURNOMASPROXIMO(FECHA_TURNO, MINUTOSNECESARIOS, ESPECIALIDAD, MEDICO, HORA_DESDE);
        }
        return null;
    }
   

    [WebMethod(EnableSession = true)]
    public string OBTENER_NA_X_TURNODETALLEID(long TurnoDetalleId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.OBTENER_NA_X_TURNODETALLEID(TurnoDetalleId);
        }
        return null;
    }



    [WebMethod(EnableSession = true)]
    public List<IMG_FAR_PEDIDO> IMG_FAR_PEDIDO_CREAR(string Desde, string Hasta, int Especialidad)
    {
        try
        {
            if (Session["Usuario"] != null)
            {
                int usuario = (int)((usuarios)Session["Usuario"]).id;
                Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
                return img.IMG_FAR_PEDIDO_CREAR(usuario, Convert.ToDateTime(Desde), Convert.ToDateTime(Hasta), Especialidad);
            }
            return null;
        }
        catch(Exception ex){
            throw new Exception(ex.Message);
        }
    }


    [WebMethod(EnableSession = true)]
    public long IMG_FAR_PEDIDO_GUARDAR(List<IMG_FAR_PEDIDO> Insumos, long PedidoID, string FechaDesde, string FechaHasta, int Cargado)
    {
        try
        {
            if (Session["Usuario"] != null)
            {
                int usuario = (int)((usuarios)Session["Usuario"]).id;
                Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
                return img.IMG_FAR_PEDIDO_GUARDAR(Insumos, PedidoID, usuario, FechaDesde, FechaHasta, Cargado);
            }
            return 0;
        }
        catch(Exception ex){
            throw new Exception(ex.Message);
        }
    }



    [WebMethod(EnableSession = true)]
    public List<IMG_FAR_PEDIDO> IMG_MEDICAMENTOS_LISTA(long Practica, int Especialidad)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            //int usuario = (int)((usuarios)Session["Usuario"]).id;            
            return img.IMG_MEDICAMENTOS_LISTA(Practica, Especialidad);
        }
        return null;
    }



    [WebMethod(EnableSession = true)]
    public bool IMG_MEDICAMENTO_ACTUALIZAR(long Practica, int MedicamentoId, int Especialidad)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_MEDICAMENTO_ACTUALIZAR(Practica, MedicamentoId, Especialidad);
        }
        return false;
    }


    [WebMethod(EnableSession = true)]
    public bool IMG_TURNO_INSUMO_GUARDAR(List<IMG_FAR_PEDIDO> Insumos, long TurnoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            return img.IMG_TURNO_INSUMO_GUARDAR(Insumos, TurnoId, usuario);
        }
        return false;
    }


    [WebMethod(EnableSession = true)]
    public List<IMG_FAR_PEDIDO> IMG_TURNO_INSUMO_CARGAR(long TurnoId)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_TURNO_INSUMO_CARGAR(TurnoId);
        }
        return null;
    }


    [WebMethod(EnableSession = true)]
    public IMG_FAR_INFORME_RAPIDO IMG_CARGARINFORME_RAPIDO(long TurnoPracticaID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_CARGARINFORME_RAPIDO(TurnoPracticaID);
        }
        return null;
    }

    
    [WebMethod(EnableSession = true)]
    public bool INFORME_RAPIDO_GUARDAR(long TurnoPracticaID, string Informe, int MedicoInforma)
    {
        if (Session["Usuario"] != null)
        {
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_INFORMERAPIDO_GUARDAR(TurnoPracticaID, Informe, usuario, MedicoInforma);
        }
        return false;
    }


    [WebMethod(EnableSession = true)]
    public bool IMG_WORKLIST_EXISTE(long TurnoId)
    {
        if (Session["Usuario"] != null)
        {            
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_WORKLIST_EXISTE(TurnoId);
        }
        return false;
    }
    
    [WebMethod(EnableSession = true)]
    public void INDICACION_BORRAR(long ID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.INDICACION_BORRAR(ID);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void INDICACION_GUARDAR(long ID, string TITULO, string CONTENIDO, int EDAD)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            img.INDICACION_GUARDAR(ID, TITULO, CONTENIDO, EDAD);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }



    [WebMethod(EnableSession = true)]
    public IMG_INDICACION INDICACION_CARGAR(long ID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.INDICACION_CARGAR(ID);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


    [WebMethod]
    public List<IMG_ATENCION> IMG_TURNO_CONSULTORIO_LISTAR_x_USUARIOID(int Especialidad, int Medico, string Desde, string Hasta, int Tipo, string HNC, string Paciente, string Documento, int UsuarioID)
    {
        List<IMG_ATENCION> lista = new List<IMG_ATENCION>();
        Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
        lista = img.IMG_TURNO_CONSULTORIO_LISTAR(Especialidad, Medico, Desde, Hasta, Tipo, HNC, Paciente, Documento, UsuarioID);
        return lista;
    }

    [WebMethod(EnableSession = true)]
    public bool IMG_RELACION_PRACTICA_NOMENCLADOR_AGREGAR(int Practica, int Nomenclador, int Especialidad)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_RELACION_PRACTICA_NOMENCLADOR_AGREGAR(Practica, Nomenclador, Especialidad);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


    [WebMethod(EnableSession = true)]
    public bool IMG_RELACION_PRACTICA_NOMENCLADOR_ELIMINAR(int ID)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_RELACION_PRACTICA_NOMENCLADOR_ELIMINAR(ID);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


    [WebMethod(EnableSession = true)]
    public List<IMG_PRACTICA_NOMENCLADOR> IMG_RELACION_PRACTICA_NOMENCLADOR_LISTAR(int Especialidad, int Practica)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_RELACION_PRACTICA_NOMENCLADOR_LISTAR(Especialidad, Practica);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }


    [WebMethod(EnableSession = true)]
    public List<IMG_PRACTICA_NOMENCLADOR> IMG_PRACTICAS_X_ESPECIALIDAD(int Especialidad)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.ImagenesBLL img = new Hospital.ImagenesBLL();
            return img.IMG_PRACTICAS_X_ESPECIALIDAD(Especialidad);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    

}
