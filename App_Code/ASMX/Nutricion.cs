using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Summary description for Nutricion
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Nutricion : System.Web.Services.WebService {

    public Nutricion () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public encabezadoNutricion cargarEncabezado(long idInternacion)
    {
        if ( Session["Usuario"] != null)
        {
            Hospital.NutricionBLL Menus = new Hospital.NutricionBLL();
            encabezadoNutricion P = new encabezadoNutricion();
            P = Menus.cargar_Encabezado(idInternacion);
            usuarios obj = (usuarios)Session["Usuario"];

            P.medico = obj.nombre;

            return P;
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<indicacionesNutricion> cargarIndicaciones(long idInternacion, string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL Menus = new Hospital.NutricionBLL();

            return Menus.cargar_Indicaciones(idInternacion, fecha);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public long guardarNutricion(long idNutricion, long idInternacion, long documento, string codAlmuerzo, string codCena, string fecha, int idAlmuerzo, int idCena)
    //, int AIdalmuerzo, string Aalmuerzo, int AIdcena, string Acena)
    //string descAlmuerzo,string descCena,
    {
        if (Session["Usuario"] != null)
        {
            usuarios obj = (usuarios)Session["Usuario"];
            int usuario = (int)obj.id;

            Hospital.NutricionBLL Menus = new Hospital.NutricionBLL();
            return Menus.guardar_Nutricion1(idNutricion, idInternacion, documento, codAlmuerzo, codCena, usuario, fecha, idAlmuerzo, idCena);
            //,AIdalmuerzo,Aalmuerzo,AIdcena,Acena);
            //descAlmuerzo,descCena, 
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public List<Menus> cargarMenus(long idInternacion, string fecha, string tipo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL Menus = new Hospital.NutricionBLL();
            return Menus.cargar_Menus(idInternacion, fecha, tipo);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public long GuardarPedidoEncabezado(long idPedido, string fecha)
    {
        usuarios obj = (usuarios)Session["Usuario"];
        int idUsuario = (int)obj.id;

        if (Session["Usuario"] != null)
        {
            DateTime F = new DateTime();
            F = Convert.ToDateTime(fecha);
            Hospital.NutricionBLL Menus = new Hospital.NutricionBLL();
            return Menus.Guardar_Pedido_Encabezado(idPedido, idUsuario, F);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }

    }

    [WebMethod(EnableSession = true)]
    public long GuardarPedidoDetalle(List<pedidoNutricion> pedidos, long idPedido)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL Menus = new Hospital.NutricionBLL();
            return Menus.Guardar_Pedido_Detalle(pedidos, idPedido);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public List<pedidoNutricion> traerPedido(string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL Menus = new Hospital.NutricionBLL();
            return Menus.traer_Pedido(fecha);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public List<pedidoNutricion> traerPedidosInternados(string fecha, int imprime)
    {
        if (Session["Usuario"] != null)
        {
            DateTime f = new DateTime();
            f = Convert.ToDateTime(fecha);

            Hospital.NutricionBLL Menus = new Hospital.NutricionBLL();
            return Menus.traer_Pedidos_Internados(f, imprime);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }



    [WebMethod(EnableSession = true)]
    public List<Menus> cargarComboMenus()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL Menus = new Hospital.NutricionBLL();
            return Menus.cargar_Combo_Menus();
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }

    }


    //[WebMethod(EnableSession = true)]
    //public List<pedidoNutricion> traerTotalesPedidos(string fecha)
    //{
    //    if (Session["Usuario"] != null)
    //    {
    //        DateTime f = new DateTime();
    //        f = Convert.ToDateTime(fecha);

    //        Hospital.NutricionBLL Menus = new Hospital.NutricionBLL();
    //        return Menus.traer_Totales_Pedidos(f);
    //    }
    //    else
    //    { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    //}

    [WebMethod(EnableSession = true)]
    public List<PresentacionesDiabetes> traerPresentacionesDiabetes(string seCorresponde)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.AtConsultorioBLL diabetes = new Hospital.AtConsultorioBLL();
            return diabetes.traer_Presentaciones_Diabetes(seCorresponde);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<long> traerIdsInternacion(string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.traer_Ids_Internacion(fecha);
        }
        else
        { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<pedidoNutricion> listsarPacientesComidas(string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.listsar_Pacientes_Comidas(fecha);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public long InternacionNutrcionEliminarAcompañante(long idInternacion, string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Internacion_Nutrcion_Eliminar_Acompañante(idInternacion, fecha);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public long InternacionNutricionGuardarAcompañante(long idInternacion, string fecha, int idalmuerzo, string codAlmuerzo, int idCena, string codCena)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Internacion_Nutricion_Guardar_Acompañante(idInternacion, fecha, idalmuerzo, codAlmuerzo, idCena, codCena);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public nutricionAcompañante InternacionNutricionTraerAcompañanteComida(string fecha, long idIntenacion)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Internacion_Nutricion_Traer_Acompañante_Comida(fecha, idIntenacion);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<Menus> InternacionNutricionTraerDietas()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Internacion_Nutricion_Traer_Dietas();
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }



    [WebMethod(EnableSession = true)]
    public long NutricionGuardarComidasTemporales(int idComida, string codigoComida, string tipificaciolnComida, string Es, int idInternacion, int id)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Nutricion_Guardar_Comidas_Temporales(idComida, codigoComida, tipificaciolnComida, Es, idInternacion);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<Menus> NutricionTraerComidasTemporales(int idInternacion, string tipo)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Nutricion_Traer_Comidas_Temporales(idInternacion, tipo);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public long NutricionBorrarUnDetalle(int idNutricion, string fecha, Menus comida, string cuantos)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Nutricion_Borrar_Un_Detalle(idNutricion, fecha, comida, cuantos);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public long NutricionBorrarDetalle(int idInternacion, string fechaComida)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Nutricion_Borrar_Detalle_Todo(idInternacion, fechaComida);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public long NutricionGuardarEncabezado(long idNutricion, int idInternacion, int idPaciente, string fecha)
    {
        usuarios obj = (usuarios)Session["Usuario"];
        int usuario = (int)obj.id;

        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Nutricion_Guardar_Encabezado(idNutricion, idInternacion, usuario, idPaciente, fecha);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public long NutricionGuardarDetalle(long idNutricion, string fechaComida, Menus comida)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Nutricion_Guardar_Detalle(idNutricion, fechaComida, comida);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public long NutricionGuardarDetalleConfirmar(long idNutricion, string fechaComida, List<string> idsAlmuerzo, List<string> idsCena)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Nutricion_Guardar_Detalle_Confirmar(idNutricion, fechaComida, idsAlmuerzo,idsCena);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public long InternacionNutricionGuardarComidasAcompañante(long id, int idInternacion, string fechaCarga, int idAlmuerzo, string codAlmuerzo, string tipificacionAlmuerzo
        , int idCena, string codCena, string tipificacionCena)
    {
        usuarios obj = (usuarios)Session["Usuario"];
        int usuario = (int)obj.id;


        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Internacion_Nutricion_Guardar_Comidas_Acompañante(id, idInternacion, usuario, fechaCarga, idAlmuerzo, codAlmuerzo, tipificacionAlmuerzo
        , idCena, codCena, tipificacionCena);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }



    [WebMethod(EnableSession = true)]
    public nutricionAcompañante NutrcionTraerComidasAcompañanteNew(int idInternacion, string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Nutrcion_Traer_Comidas_Acompañante_New(idInternacion,fecha);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }


    [WebMethod(EnableSession = true)]
    public cantidades NutricionContarComidas(string fechaComida)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Nutricion_Contar_Comidas(fechaComida);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public void NutricionTotaldeComidasDiariasGuardarEditar(List<nutricionTotalDiarias> lista)
    {
        if (Session["Usuario"] != null)
        {
            foreach (nutricionTotalDiarias item in lista)
            {
                usuarios obj = (usuarios)Session["Usuario"];
                item.usuario = (int)obj.id;
            }
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            nutricion.Nutricion_Total_de_Comidas_Diarias_Guardar_Editar(lista);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public void NutricionTotaldeComidasDiariasBorrar(string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            nutricion.Nutricion_Total_de_Comidas_Diarias_Borrar(fecha);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<nutricionTotalDiarias> NutricionTotaldeComidasDiariasImprimir(string fecha, int imprimir)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
           return nutricion.Nutricion_Total_de_Comidas_Diarias_Imprimir(fecha, imprimir);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<itemCatering> NutricionPedidoCateringTraerMenus()
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Nutricion_Pedido_Catering_Traer_Menus();
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public void NutricionPedidoDeCateringGuardarEditar(List<itemCatering> lista)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            nutricion.Nutricion_Pedido_De_Catering_Guardar_Editar(lista);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public int NutricionPedidoDecateringBorrar(string fecha)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Nutricion_Pedido_De_catering_Borrar(fecha);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }

    [WebMethod(EnableSession = true)]
    public List<itemCatering> NutricionPedidoDeCateringImprimir(string fecha, int imprimir)
    {
        if (Session["Usuario"] != null)
        {
            Hospital.NutricionBLL nutricion = new Hospital.NutricionBLL();
            return nutricion.Nutricion_Pedido_De_Catering_Imprimir(fecha, imprimir);
        }
        else { throw new Exception("Ha Perdido Sesión!. Vuelva a Loguearse."); }
    }
}
