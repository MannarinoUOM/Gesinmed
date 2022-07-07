using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Hospital;
using System.Web.Script.Services;

/// <summary>
/// Descripción breve de PPSP
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
[System.Web.Script.Services.ScriptService]
public class PPSPS : System.Web.Services.WebService {

    public PPSPS () {

        //Eliminar la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public List<Farmacia_Rubros> TraerRubrosCombo(long servicioId)
    {
        Hospital.PPSPBLL ppsp = new Hospital.PPSPBLL();
        return ppsp.Traer_Rubros_Combo(servicioId);
    }
    
        [WebMethod(EnableSession = true)]
    public List<Farmacia_Insumo> TraerPlantilla(long servicioId, int rubroId)
    {
        Hospital.PPSPBLL ppsp = new Hospital.PPSPBLL();
        return ppsp.Traer_Plantilla(servicioId, rubroId);
    }

            [WebMethod(EnableSession = true)]
        public long GuardarActualizarBorrarPlantilla(Farmacia_Insumo insumo, int qHace)
    {
        Hospital.PPSPBLL ppsp = new Hospital.PPSPBLL();
        return ppsp.Guardar_Actualizar_Borrar_Plantilla(insumo, qHace);
    }


            [WebMethod(EnableSession = true)]
            [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
            public int Insert_PPS_Det(int IdPedido, List<Farmacia_Insumo> objMedicamentos, int Modifica)
            {
                if (Session["Usuario"] != null)
                {
                    PPSPBLL a = new PPSPBLL();
                    if (Modifica > 0)
                        a.Update_UsuarioModifica(1, IdPedido, ((usuarios)HttpContext.Current.Session["Usuario"]).id); //Pedido Modificado, Guardo usuario que modifico.
                    objMedicamentos.ForEach(delegate(Farmacia_Insumo f)
                    {
                        if (f.cantidad > 0)
                        {
                            f.id = IdPedido;
                            f.usuarioId = ((usuarios)Session["Usuario"]).id;
                            a.Insert_PPS_Det(f);
                        }
                    });
                    return IdPedido;
                }
                else throw new Exception("Inicie Sesión Nuevamente");
            }
}



