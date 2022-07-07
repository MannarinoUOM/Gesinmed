using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization;
using Hospital;

/// <summary>
/// Summary description for Guardia
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Guardia : System.Web.Services.WebService {

    public Guardia () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<guardia> GuardiaListado(string FechaIni, string FechaFin, bool Especialidad, string Apellido, string objBusquedaLista, int Estado)
    {
        if (Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            DateTime Ini, Fin;
            if (!DateTime.TryParse(FechaIni, out Ini)) throw new Exception("La Fecha no es válida.");
            if (!DateTime.TryParse(FechaFin, out Fin)) throw new Exception("La Fecha no es válida.");
            return g.GuardiaListado(Ini, Fin, Especialidad, Apellido, objBusquedaLista, Estado);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_PPS_Det_List> ListPlantillaforPedido()
    {
        if (Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            return g.ListPlantillaforPedido();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Farmacia_PPS_Det_List> GuardiaConsumoSN(string Desde, string Hasta)
    {
        if (Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            DateTime Desde_, Hasta_;
            if (DateTime.TryParse(Desde, out Desde_) && DateTime.TryParse(Hasta, out Hasta_))
                return g.GuardiaConsumo(Desde_, Hasta_);
            else throw new Exception("Verifique las Fechas");
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<guardia> GuardiaListadobyId(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            return g.GuardiaListadobyId(Id);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<pedidosenfermeria> GuardiaListaEnfermeria(int MedicoId, bool Todos)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            int usuario = (int)((usuarios)Session["Usuario"]).id;
            return g.Enfermeria_Cargar_Guardia(MedicoId, usuario, Todos);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    public int GuardiaSaveEnfermeria(pedidosenfermeria p)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            p.UsuarioId = (int)((usuarios)Session["Usuario"]).id;
            return g.Enfermeria_Guardar(p);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public int GuardiaDeleteEnfermeria(int MedicoId, string fecha)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            int Usuario = (int)((usuarios)Session["Usuario"]).id;
            return g.Enfermeria_Borrar(MedicoId, fecha, Usuario);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void EntregarGuardiaEnfermeria(int MedicoId, int ConsultorioId,string fecha)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            Int32 Usuario = (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id;
            DateTime Fecha;
            if (!DateTime.TryParse(fecha, out Fecha)) throw new Exception("Fecha no válida.");
            g.EntregarGuardiaEnfermeria(Fecha, MedicoId, Usuario, ConsultorioId, 1);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    public void CancelarGuardiaEnfermeria(int MedicoId, int ConsultorioId, string fecha)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            Int32 Usuario = (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id;
            DateTime Fecha;
            if (!DateTime.TryParse(fecha, out Fecha)) throw new Exception("Fecha no válida.");
            g.EntregarGuardiaEnfermeria(Fecha, MedicoId, Usuario, ConsultorioId, 0);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<pedidosenfermeria> Enfermeria_Cargar_Todos_Guardia(int MedicoId, int ConsultorioId, int Cuales)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            return g.Enfermeria_Cargar_Todos_Guardia(MedicoId, ConsultorioId, Cuales);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int GuardiaSave(int? BonoId, string NHC, int? MedicoId, int EspecialidadId, string FechaBono, int? id, int Box, int? MEgreso, int? Diagnostico, int? IC10, bool? Accidente, int? MotivoAccidenteId, string Obs, int? Espfinal, int Estado)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            DateTime Fecha;
            if (!string.IsNullOrEmpty(FechaBono)) Fecha = DateTime.Parse(FechaBono);
            else Fecha = DateTime.Parse("01/01/1900");
            return g.Save(BonoId, NHC, MedicoId, EspecialidadId, Fecha, id, Box, MEgreso, Diagnostico, IC10, Accidente, MotivoAccidenteId, Obs, Espfinal,Estado);
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public int Atencion_GuardiaSave(Guardia_Atencion g)
    {
        if (Session["Usuario"] != null)
        {
            GuardiaBLL gbll = new GuardiaBLL();
            g.UsuarioId = ((usuarios)Session["Usuario"]).id;
            return gbll.Atencion_Save(g);
        }
        else return -1;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<especialidades> Especialidades_Lista(int Todas)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            return g.Especialidades_Lista(Todas);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<medicos> MedicosGuardiabyEsp(int Especialidad)
    {
        if (Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            return g.MedicosGuardiabyEsp(Especialidad);
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<medicos> MedicosXusuario()
    {
        if (Session["Usuario"] != null)
        {
            usuarios U = (usuarios)Session["Usuario"];
            GuardiaBLL g = new GuardiaBLL();
            return g.MedicosXusuario(Convert.ToInt32(U.id));
        }
        else return null;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Boxes> BoxesList(string FechaIni, string HoraIni, string FechaFin, string HoraFin)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            return g.BoxesList(FechaIni, HoraIni, FechaFin, HoraFin);
        }
        else return null;
    }
    
    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Guardia_Enfermeria> EnfermeriaList(string FechaIni, int Estado)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            return g.EnfermeriaList(FechaIni,Estado);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Historial(string Texto, int? MedicoId, string NHC, int? Protocolo, int GuardiaId)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            g.Historial(Texto, MedicoId, NHC, Protocolo,GuardiaId);
        }
    }

    [WebMethod(EnableSession = true)]
    public long MedicoId_by_Usuario()
    {
        if (Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            return g.MedicoId_by_Usuario(((usuarios)Session["Usuario"]).id);
        }
        return 0;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void GuardiaAusente(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            g.Ausente(Id);
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void DeleteMedicamentos(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            g.Guardia_Med_Delete(Id);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void GuardiaOcuparBox(int Box, int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            g.OcuparBox(Box, Id);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void BoxDelete(int Id)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            g.BoxDelete(Id);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void CambiarEstado(int Id, bool Estado)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            g.CambiarEstado(Id, Estado);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<MotivoEgreso_Guardia> List_Egreso()
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            return g.List_Egreso();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Guardia_Plantilla_Med> List_Plantilla_Med()
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            return g.List_Plantilla_Med();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Guardia_Plantilla_Prac> List_Plantilla_Prac()
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            return g.List_Plantilla_Prac();
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void List_Plantilla_Med_Insert(List<Guardia_Plantilla_Med> objMedicamentos)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL gbll = new GuardiaBLL();
            objMedicamentos.ForEach(delegate (Guardia_Plantilla_Med g) {
                gbll.List_Plantilla_Med_Insert(g);
            });
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void List_Plantilla_Prac_Insert(List<Guardia_Plantilla_Prac> objPracticas)
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL gbll = new GuardiaBLL();
            objPracticas.ForEach(delegate(Guardia_Plantilla_Prac g)
            {
                gbll.List_Plantilla_Prac_Insert(g);
            });
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Guardia_Plantilla_Med_Delete()
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            g.Guardia_Plantilla_Med_Delete();
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Guardia_Plantilla_Prac_Delete()
    {
        if (HttpContext.Current.Session["Usuario"] != null)
        {
            GuardiaBLL g = new GuardiaBLL();
            g.Guardia_Plantilla_Prac_Delete();
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_Pedido_Cab(Guardia_Pedido_Medicamentos f)
    {
        if (Session["Usuario"] != null)
        {
            GuardiaBLL a = new GuardiaBLL();
            f.Usuario_Id = ((usuarios)Session["Usuario"]).id;
            return a.Insert_Pedido_Cab(f);
        }
        else throw new Exception("Inicie Sesión Nuevamente.");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public int Insert_Pedido_Det(int PedidoId,int GuardiaId, List<Guardia_Plantilla_Med> objMedicamentos)
    {
        if (Session["Usuario"] != null)
        {
            objMedicamentos.ForEach(delegate(Guardia_Plantilla_Med g)
            {
                if (g.Cantidad > 0)
                {
                    Farmacia_Pedido_Pac_Det f = new Farmacia_Pedido_Pac_Det();
                    f.Cantidad = g.Cantidad;
                    f.Insumo_Id = g.Id;
                    f.Pedido_Id = PedidoId;
                    f.Usuario_Id = ((usuarios)Session["Usuario"]).id;
                    GuardiaBLL a = new GuardiaBLL();
                    a.Insert_Pedido_Det(f, GuardiaId);
                }
            });
            return PedidoId;
        }
        else throw new Exception("Inicie Sesión Nuevamente");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Insert_Guardia_Medicamentos(int PedidoId, int GuardiaId, List<Guardia_Plantilla_Med> objMedicamentos)
    {
        if (Session["Usuario"] != null)
        {
            objMedicamentos.ForEach(delegate(Guardia_Plantilla_Med g)
            {
                if (g.Cantidad > 0)
                {
                    Guardia_Medicamentos gm = new Guardia_Medicamentos();
                    gm.InsumoId = Convert.ToInt32(g.Id);
                    gm.Cantidad = Convert.ToInt32(g.Cantidad);
                    gm.IdGuardia = GuardiaId;
                    gm.PedidoFarmaciaId = PedidoId;
                    GuardiaBLL a = new GuardiaBLL();
                    a.Insert_Guardia_Medicamentos(gm);
                }
            });
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Insert_Guardia_Practicas(int GuardiaId, List<Guardia_Plantilla_Prac> objPracticas)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        if (Session["Usuario"] != null)
        {
            objPracticas.ForEach(delegate(Guardia_Plantilla_Prac g)
            {
                if (g.Cantidad > 0)
                {
                    GuardiaBLL a = new GuardiaBLL();
                    a.Insert_Guardia_Practicas(g, GuardiaId);
                }
            });
        }
    }

     [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Delete_Guardia_Practicas(int GuardiaId)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        if (Session["Usuario"] != null)
        {
            GuardiaBLL a = new GuardiaBLL();
            a.Delete_Guardia_Practicas(GuardiaId);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public List<Guardia_Plantilla_Prac> List_Practicas_byId(long GuardiaId)
    {
        if (Session["Usuario"] != null)
        {
            GuardiaBLL a = new GuardiaBLL();
            return a.List_Practicas_byId(GuardiaId);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Guardia_Plantilla_Med> List_Medicamentos_byId(long GuardiaId)
    {
        if (Session["Usuario"] != null)
        {
            GuardiaBLL a = new GuardiaBLL();
            return a.List_Medicamentos_byId(GuardiaId);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<HistorialGuardia> List_Historial_Guardia(string FDesde, string FHasta, int MedicoId, string NHC)
    {
        JavaScriptSerializer js = new JavaScriptSerializer();
        if (Session["Usuario"] != null)
        {
            GuardiaBLL a = new GuardiaBLL();
            return a.List_Historial_Guardia(FDesde, FHasta, MedicoId, NHC);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public Guardia_Atencion List_GuardiaAtencionbyId(int GuardiaId)
    {
        if (Session["Usuario"] != null)
        {
            GuardiaBLL a = new GuardiaBLL();
            return a.List_GuardiaAtencionbyId(GuardiaId);
        }
        else return null;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public List<Guardia_Box> GuardiaBoxesList(bool Estado)
    {
        if (Session["Usuario"] != null)
        {
            GuardiaBLL a = new GuardiaBLL();
            return a.GuardiaBoxesList(Estado);
        }
        else return null;
    }

     [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void BoxGuardar(int Id, string Box)
    {
        if (Session["Usuario"] != null)
        {
            GuardiaBLL a = new GuardiaBLL();
            a.BoxGuardar(Id, Box);
        }
    }

     [WebMethod(EnableSession = true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public List<Medicamentos> GuardiaListaMedicamentos()
     {
         if (Session["Usuario"] != null)
         {
             CargaDeInsumosGuardiaBLL a = new CargaDeInsumosGuardiaBLL();
             return a.TraerDatos();
         }
         else return null;
     }

     [WebMethod(EnableSession = true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public void actualizarMedicamentos(int id, float precioUOM, float precioOS, string nombre, Int64 codKike)
     {
         if (Session["Usuario"] != null)
         {
             CargaDeInsumosGuardiaBLL a = new CargaDeInsumosGuardiaBLL();
            //a.ModificarMedicamento(id, precioUOM, precioOS, nombre, codKike);
             a.ModificarMedicamento(id, precioUOM, precioOS, nombre, codKike);
         }
     }

     [WebMethod(EnableSession = true)]//para cargar tabla de busqueda
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public List<MedicamentosSeleccionar> GuardiaListaMedicamentosBusqueda(string Nombre)
     {
         if (Session["Usuario"] != null)
         {
             CargaDeInsumosGuardiaBLL a = new CargaDeInsumosGuardiaBLL();
             return a.TraerDatosBusqueda(Nombre);
         }
         else return null;
     }


         [WebMethod(EnableSession = true)]//para cargar tabla de busqueda
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public List<mensajeGuardia> VerificarAtencionFinalizada(long MedicoId)
     {
         if (Session["Usuario"] != null)
         {
             GuardiaBLL g = new GuardiaBLL();
             return g.Verificar_Atencion_Finalizada(MedicoId);
         }
         else return null;
     }
    
     [WebMethod(EnableSession = true)]//verificar modificacion atencion
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
         public long VerificarModificacion(long Consulta)
     {
         if (Session["Usuario"] != null)
         {
             GuardiaBLL g = new GuardiaBLL();
             return g.Verificar_Modificacion(Consulta);
         }
         else return 0;
     }


     [WebMethod(EnableSession = true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public long guardarSospechaCOVID(long medico, long afiliado, List<itemCOVID> lista)
     
     {
         if (Session["Usuario"] != null)
         {
             GuardiaBLL g = new GuardiaBLL();
             return g.guardar_Sospecha_COVID(medico,afiliado,lista);
         }
         else return 0;
     }

     [WebMethod(EnableSession = true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public List<PDFCOVID> SospechaCOVIDTraer(long afiliadoId)
     {
         //if (Session["Usuario"] != null)
         //{
             GuardiaBLL g = new GuardiaBLL();
             return g.SospechaCOVIDTraer(afiliadoId);
         //}
     }

     [WebMethod(EnableSession = true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public List<MedicoCOVID> TraerMedicosCOVID(string medico)
     {
         //if (Session["Usuario"] != null)
         //{
         GuardiaBLL g = new GuardiaBLL();
         return g.TraerMedicosCOVID(medico);
         //}
     }

     [WebMethod(EnableSession = true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public long SeguimientoCOVIDGuardar(long id,long afiliadoId,string nombre,string dni ,string pediatrico
    ,string direccion,string localidad,string uom,string telefono,string fechaIsopado
    ,string resultado,string destino,string internacion,string alta,string Mseguimiento
    ,string hisopadoControl,string fechaEpidemilogica,string donate,int obito )
     {
         if (Session["Usuario"] != null)
         {
             GuardiaBLL g = new GuardiaBLL();
             return g.Seguimiento_COVID_Guardar(id, afiliadoId, nombre, dni, pediatrico
           , direccion, localidad, uom, telefono, fechaIsopado
           , resultado, destino, internacion, alta, Mseguimiento
           , hisopadoControl, fechaEpidemilogica, donate, obito, (int)((usuarios)Session["Usuario"]).id);
         }
         else { return 0; }

     }

     [WebMethod(EnableSession = true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public SeguimientoCOVID BuscarafiliadoSeguimientoCOVID(string dni)
     {

         GuardiaBLL g = new GuardiaBLL();
         return g.BuscarafiliadoSeguimientoCOVID(dni);

     }


     [WebMethod(EnableSession = true)]
     [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
     public List<SeguimientoCOVID> TraerSeguimientoCOVID(long id, string desde, string hasta)
     {
         //if (Session["Usuario"] != null)
         //{
         GuardiaBLL g = new GuardiaBLL();
         return g.TraerSeguimientoCOVID(id,desde, hasta);
         //}
     }


}
