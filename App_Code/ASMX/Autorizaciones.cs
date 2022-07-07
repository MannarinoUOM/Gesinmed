using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Autorizaciones
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
    [ScriptService]
public class Autorizaciones : System.Web.Services.WebService {

    public Autorizaciones () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

     [WebMethod(EnableSession = true)]
    public List<especialidades> TraerEspecialidadesCombo(int id) 
     {
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
        return aut.Traer_Especialidades_Combo(id);
    }

     [WebMethod(EnableSession = true)]
     public List<especialidades> TraerEspecialidadesComboAnatomia(int id)
     {
         Hospital.AnatomiaPatologicaTrueBLL aut = new Hospital.AnatomiaPatologicaTrueBLL();
         return aut.Traer_Especialidades_Combo_Anatomia(id);
     }

     [WebMethod(EnableSession = true)]
     public List<especialidades> TraerEspecialidadesComboDT(int id)
     {
         Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
         return aut.Traer_Especialidades_ComboDT(id);
     }

    [WebMethod(EnableSession = true)]
    public List<medicos> TraerMedicosCombo(int id)
    {
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
        return aut.Traer_Medicos_Combo(id);
    }
    [WebMethod(EnableSession = true)]
    public List<medicos> TraerMedicosComboDT(int id)
    {
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
        return aut.Traer_Medicos_ComboDT(id);
    }

    [WebMethod(EnableSession = true)]
    public List<practicas> TraerPracticasCombo(int tipo)
    {
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
        return aut.Traer_Practicas_Combo(tipo);
    }

         [WebMethod(EnableSession = true)]
    public List<Modulo> TraerModulosCombo()
    {
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
        return aut.Traer_Modulos_Combo();
    }

            [WebMethod(EnableSession = true)]
        public List<Estado> TraerEstadosCombo()
    {
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
        return aut.Traer_Estados_Combo();
    }

                [WebMethod(EnableSession = true)]
            public List<SubRubro> TraerSubrubrosCombo()
    {
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
        return aut.Traer_Subrubros_Combo();
    }

                     [WebMethod(EnableSession = true)]
                public List<Prestador> TraerPrestadoresCombo()
    {
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
        return aut.Traer_Prestadores_Combo();
    }

            [WebMethod(EnableSession = true)]
                    public Precios_Prestadores TraerPreciosPrestadoresLista(int prestador,int practica)
    {
                                  if (Session["Usuario"] != null)
        {
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
        return aut.Traer_Precios_Prestadores_Lista(prestador,practica);
        }
                                  else throw new Exception("Inicie Sesión Nuevamente.");
    }

       [WebMethod(EnableSession = true)]
    public int GuardarValorPractica( int idpractica,int idprestador, decimal valor)
    {
         if (Session["Usuario"] != null)
        {
            long idUsuario = ((usuarios)Session["Usuario"]).id;
            DateTime fecha = DateTime.Now;
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();

        return aut.Guardar_Valor_Practica(idpractica, idprestador,valor,idUsuario,fecha);
        }
                  else throw new Exception("Inicie Sesión Nuevamente.");
    }

       [WebMethod(EnableSession = true)]
       public int GuardarActulizarEncabezado(long id, long numero, long idPaciente, string intAmbu,string fecha, int idEspecialidad,int idMedico, string observacion,
                                                int estado, string medicoExterno, string fechaTurno, string fechaAuditado, string fechaRetirado)
       {
           if (Session["Usuario"] != null)
           {
               string Usuario = ((usuarios)Session["Usuario"]).usuario;
               Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
               if (fechaTurno == "") { fechaTurno = "1900-01-01 00:00:00.000"; }
               if (fechaAuditado == "") { fechaAuditado = "1900-01-01 00:00:00.000"; }
               if (fechaRetirado == "") { fechaRetirado = "1900-01-01 00:00:00.000"; }
               return aut.Guardar_Actulizar_Encabezado(id, 1, idPaciente, intAmbu,Convert.ToDateTime(fecha), idEspecialidad, idMedico, observacion, estado, Usuario, medicoExterno, Convert.ToDateTime(fechaTurno),Convert.ToDateTime(fechaAuditado),Convert.ToDateTime(fechaRetirado));
           }
           else throw new Exception("Inicie Sesión Nuevamente.");
       }

          [WebMethod(EnableSession = true)]
       public int GuardarDetalle(List<Practica_Autorizacion> lista, int id, int estado)
       {
           if (Session["Usuario"] != null)
           {
               Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
               aut.Autorizacion_Borrar_Detalle(id);

               string Usuario = ((usuarios)Session["Usuario"]).usuario;
               DateTime fecha = DateTime.Now;

               foreach (Practica_Autorizacion item in lista){
                   item.usuario = Usuario;
                   item.fecha = fecha.ToShortDateString();
                   item.idEncabezado = id;

                   aut.Guardar_Detalle(item);
               }


               return id;
           }
           else throw new Exception("Inicie Sesión Nuevamente.");
       }


          [WebMethod(EnableSession = true)]
          public void GuardarLogAutorizaciones(long idAutorizacion, int estado)
          {
              if (Session["Usuario"] != null)
              {
                  Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                  long Usuario = ((usuarios)Session["Usuario"]).id;

                  aut.Guardar_Log_Autorizaciones(idAutorizacion,estado,Usuario);
              }
              else throw new Exception("Inicie Sesión Nuevamente.");
          }


          [WebMethod(EnableSession = true)]
          public void insertarEnTxt(long id)
          {
              if (Session["Usuario"] != null)
              {
                  Hospital.Autorizaciones aut = new Hospital.Autorizaciones();

                  aut.insertar_En_Txt(id);
              }
              else throw new Exception("Inicie Sesión Nuevamente.");
          }



            [WebMethod(EnableSession = true)]
          public List<Encabezado_autorizacion> TraerEncabezado(int id,int cuantos)
    {
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
        return aut.Traer_Encabezado(id,cuantos);
    }

            [WebMethod(EnableSession = true)]
            public List<Encabezado_autorizacion> ChekearPendientes(int id)
            {
                Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                return aut.Chekear_Pendientes(id);
            }

                [WebMethod(EnableSession = true)]
            public List<Encabezado_autorizacion> TraerUnEncabezado(int id)
                {
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
        return aut.Traer_Un_Encabezado(id);
    }
    
            [WebMethod(EnableSession = true)]
          public List<Detalle_Autorizacion> TraerDetalle(int id)
    {
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
        return aut.Traer_Detalle(id);
    }

            [WebMethod(EnableSession = true)]
            public List<Practica_Autorizacion> TraerDetalleplantilla(int id)
            {
                Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                return aut.Traer_Detalle_Plantilla(id);
            }

                [WebMethod(EnableSession = true)]
            public List<Detalle_Autorizacion> TraerUnDetalle(int id)
    {
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
        return aut.Traer_Un_Detalle(id);
    }
        
            [WebMethod(EnableSession = true)]
            public int ActualizarEstadoEncabezado(int id)
    {
        long UsuarioId = ((usuarios)Session["Usuario"]).id;
        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
        return aut.Actualizar_Estado_Encabezado(id,UsuarioId);
    }

            [WebMethod(EnableSession = true)]
            public Detalle_Autorizacion AutorizacionesMostrarUnEncabezado(int id)
            {
                    Hospital.Autorizaciones aut = new Hospital.Autorizaciones();

                    return aut.Autorizaciones_Mostrar_Un_Encabezado(id);
            }
    ////////////////////////////////////modificaciones

            [WebMethod]
            public List<PracticaAutoComplete> CargarPractica_Autocomplete(string str)
            {
                Hospital.Autorizaciones autorizacion = new Hospital.Autorizaciones();
                return autorizacion.CargarPracticaAutocomplete(str);
            }


            [WebMethod]
            public string TraerPracticaPorCodigo(int id)
            {
                Hospital.Autorizaciones autorizacion = new Hospital.Autorizaciones();
                return autorizacion.Traer_Practica_Por_Codigo(id);
            }
    ////////////////////////////////////////////////////////////////////////////////////////////////////DYT

            [WebMethod(EnableSession = true)]
            public long TraerPacientePorNCarga(int NumeroCarga)
            {
                Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                return aut.Traer_Paciente_Por_N_Carga(NumeroCarga);
            }

            [WebMethod(EnableSession = true)]
            public List<DYT_Centro> TraerCombos(int tipo)
            {
                Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                return aut.Traer_Combos(tipo);
            }

            [WebMethod(EnableSession = true)]
            public int GuardarActulizarDYT(int id,DYT_Item item )
            {
                if (Session["Usuario"] != null)
                {
                    item.usuario = ((usuarios)Session["Usuario"]).usuario;
                    Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                    return aut.Guardar_Actulizar_DYT(id, item);
                }
                else throw new Exception("Inicie Sesión Nuevamente.");
            }

            [WebMethod(EnableSession = true)]
            public List<DYT_Item> BuscarDYT(string donde, string FechaDesde, string FechaHasta, string HC, int centroOrigen, int especialidadOrigen, int solicitadoPor
        , int centroDestino, int especialidadDestino, int medicoDestino, int trasladadoPor, int prestacion, int seguimiento, int rechazos, int estado)
            {
                Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                return aut.Buscar_DYT(donde, FechaDesde, FechaHasta, HC, centroOrigen, especialidadOrigen, solicitadoPor
        , centroDestino, especialidadDestino, medicoDestino, trasladadoPor, prestacion, seguimiento, rechazos, estado);
            }

                [WebMethod(EnableSession = true)]
            public List<DYT_Item> TraerTodasDYTPaciente(int idPaciente)
            {
                Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                return aut.Traer_Todas_DYT_Paciente(idPaciente);
            }


                [WebMethod(EnableSession = true)]
                public DYT_Item TraerUnaDYT(int idDYT)
                
                {
                    Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                    return aut.Traer_Una_DYT(idDYT);
                }

                    [WebMethod(EnableSession = true)]
                public DYT_Item TraerUnaDYTDetalle(int idDYT)
                {
                    Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                    return aut.Traer_Una_DYT_Detalle(idDYT);
                }

    
                    [WebMethod(EnableSession = true)]
                    public int GuardarActulizarSubrubro(int id, string descripcion,int externo)
                {
                    Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                    return aut.Guardar_Actulizar_Subrubro(id,descripcion,externo);
                }

                    [WebMethod(EnableSession = true)]
                    public int GuardarActulizarPrestadores(int id, string descripcion)
                    {
                        Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                        return aut.Guardar_Actulizar_Prestadores(id, descripcion);
                    }
    ///////////////////////////////EXPRESSSSS


        [WebMethod(EnableSession = true)]
        public int GuardarActulizarEncabezadoAutorizacionExpress(int id, string fecha, long idPaciente, string observacion,string email)
       {
           if (Session["Usuario"] != null)
           {
               long Usuario = ((usuarios)Session["Usuario"]).id;
               Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
               return aut.Guardar_Actulizar_Encabezado_Autorizacion_Express(id, fecha,idPaciente, observacion,Convert.ToInt32(Usuario), email);
           }
           else throw new Exception("Inicie Sesión Nuevamente.");
       }

              [WebMethod(EnableSession = true)]
        public int GuardarDetalleAutorizacionExpress(List<Practica_Autorizacion_Express> lista, int id)
       {
           if (Session["Usuario"] != null)
           {
               Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
               return aut.Guardar_Detalle_Autorizacion_Express(lista, id);
           }
           else throw new Exception("Inicie Sesión Nuevamente.");
       }

        [WebMethod(EnableSession = true)]
        public string TraerEmail(long id)
       {
               Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
               return aut.Traer_Email(id);
       }

           [WebMethod(EnableSession = true)]
        public List<Encabezado_Autorizacion_Express> BuscarExpress(int idEncabezado, int tipo, string desde, string hasta,string documento)
       {
           if (Session["Usuario"] != null)
           {
               Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
               return aut.Buscar_Express(idEncabezado, tipo, desde, hasta,documento);
           }
           else throw new Exception("Inicie Sesión Nuevamente.");
       }

           [WebMethod(EnableSession = true)]
           public List<Practica_Autorizacion_Express> TraerDetalleExpress(int idEncabezado)
       {
           if (Session["Usuario"] != null)
           {
               Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
               return aut.Traer_Detalle_Express(idEncabezado);
           }
           else throw new Exception("Inicie Sesión Nuevamente.");
       }

              [WebMethod(EnableSession = true)]
           public int BorrarAutorizacionExpress(int idEncabezado)
       {
           if (Session["Usuario"] != null)
           {
               long idUsuario = ((usuarios)Session["Usuario"]).id;
               Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
               return aut.Borrar_Autorizacion_Express(idEncabezado,idUsuario);
           }
           else throw new Exception("Inicie Sesión Nuevamente.");
       }


              [WebMethod(EnableSession = true)]
              public void pasarSAP(string URL, string DATA, string USUARIO, string PASS, long idAutorizacion, long Prestador)
              
{
                      if (Session["Usuario"] != null)
                      {
                          long idUsuario = ((usuarios)Session["Usuario"]).id;
                          Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                          aut.pasarSAP(URL, DATA, USUARIO, PASS,idAutorizacion,Prestador);
                      }
                      else
                      {
                          Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                          aut.salvarSAP("Prédida de sesión",idAutorizacion,DATA,Prestador);
                      }                
              }



              [WebMethod(EnableSession = true)]
              public int GenerarVoucher(long idDerivacion)
              {
                  Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
                  return aut.Generar_Voucher(idDerivacion);
              }


//------grabacion para el vaucher-------------------
    [WebMethod(EnableSession = true)]
    public void VoucherGuardarASMX(long numeroCarga, string nombre, long dni, long nhc, string destino, DateTime fechaActual, DateTime fechaTurno, DateTime fechaAuditado, string nombreAutorizador, long derivacion, string practicaNombre, string comentarios, string observaciones, long practicaCod )
    {
        if (Session["Usuario"] != null)
        {
            long idUsuario = ((usuarios)Session["Usuario"]).id;
            Hospital.Autorizaciones aut = new Hospital.Autorizaciones();
            aut.VoucherGuardarBLL( numeroCarga,  nombre, dni, nhc,  destino, fechaActual, fechaTurno,  fechaAuditado,  nombreAutorizador, derivacion, practicaNombre, comentarios, observaciones, practicaCod);

            
        }
        else
        {
            //perdida de sesion

        }
    }


//------listar vauchers guardados en DB-------------------
    [WebMethod(EnableSession = true)]

    public List<VoucherEntities> VoucherListarASMX(DateTime fechaDesde, DateTime fechaHasta)
    {
        if (Session["Usuario"] != null)
        {
            long idUsuario = ((usuarios)Session["Usuario"]).id;
            Hospital.Autorizaciones aut = new Hospital.Autorizaciones();

            return aut.VoucherListarBLL(fechaDesde, fechaHasta);
        }
        else
        {
           //perdida de sesion
            return null;
        }


            

    }

//------traer datos de un solo vaucher por NC guardado en DB-------------------
    [WebMethod(EnableSession = true)]
    public void VoucherListarASMX(long nc)
    {
        if (Session["Usuario"] != null)
        {
            long idUsuario = ((usuarios)Session["Usuario"]).id;
            Hospital.Autorizaciones aut = new Hospital.Autorizaciones();

            aut.VoucherDatosBLL(nc);

        }
        else
        {
            Hospital.Autorizaciones aut = new Hospital.Autorizaciones();

        }
    }

}

