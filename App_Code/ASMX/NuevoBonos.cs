using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for NuevoBonos
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class NuevoBonos : System.Web.Services.WebService {

    public NuevoBonos () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public bonos_encabezado Buscar_por_Turno(int NroTurno)
    {
        Hospital.TurnosBLL T = new Hospital.TurnosBLL();
        object R = T.TurnoEstadoporId(NroTurno);
        int rr = Convert.ToInt32(R);
        if ( rr== 0)
        {
            Hospital.BonosBLL Bono = new Hospital.BonosBLL();
            return Bono.Cargar_Bono_por_Turno(NroTurno);
        }
        else
        {
            throw new Exception("El Nro de Turno ingresado ha sido utilizado con el Bono " + rr.ToString() + ".");
        }
        
    }

    [WebMethod]
    public string Ultimo_Nro_ReservaAhora()
    {
        Hospital.BonosBLL Bono = new Hospital.BonosBLL();
        return Bono.Nro_Reserva_Ahora();
    }

    [WebMethod(EnableSession=true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GuardarPracticasBono(List<Confirmarturnos> objPracticas, Int32 Documento, bool EsPrimeraVez, string Verificado, bool EmiteComprobante, 
        Int32 AutorizanteId, Int32 MedicoId, Int32 EspecialidadId, bool EsAtencionSinTurno, bool EsUrgencia, bool ReservaTurnoAhora,
        string FechaTurno, bool Recepcionaturno, int AutorizaBono, int MotivoAutorizaBono, string Observaciones, int TLC, int chkNobody, decimal ImportePaga, int S, string observacion)
    {
        int idMovimientoSaldo = 0;

        if (objPracticas.Count <= 0) { throw new Exception("Atención. NO se puede emitir un bono sin prácticas"); }

        bool Existe = false;
        foreach (Confirmarturnos o in objPracticas)
        {
            if (o.Estado != 0) { Existe = true; }    
        }

        if (Existe == false) { throw new Exception("Atención. NO se puede emitir un bono sin prácticas"); }


        Int32 Usuario = (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id;
        string IP = ((usuarios)HttpContext.Current.Session["Usuario"]).ip;

        object Turno = "";
        DateTime FechadelTurno = DateTime.Now;
        if (EsAtencionSinTurno)
        {
            Hospital.TurnosBLL practicas = new Hospital.TurnosBLL();
            string Resultado = "";
            Resultado = practicas.Crear_Un_Turno_Automaticamente(MedicoId, EspecialidadId).ToString();

            string Dia = "";
            string Hora = "";

            if (Resultado.Length > 0 && Resultado != "0")
            {
                Dia = Convert.ToDateTime(Resultado).ToShortDateString();
                Hora = Convert.ToDateTime(Resultado).ToShortTimeString();
                FechadelTurno = Convert.ToDateTime(Dia + " " + Hora);

                Hospital.TurnosBLL t = new Hospital.TurnosBLL();
                List<Confirmarturnos> C = new List<Confirmarturnos>();                                                                                                                  //TELECONSULTA
                Turno = practicas.Guardar_Turno(C, Documento, MedicoId, EspecialidadId, Hora, Dia, false, AutorizanteId, false, true, EmiteComprobante, Verificado, "Turno SIN AGENDA", Usuario,TLC,0,null);
            }
            else
            {
                throw new Exception("En ese día el médico no Atiende.");
            }

        }


        

        JavaScriptSerializer ser = new JavaScriptSerializer();
        Hospital.BonosBLL Bono = new Hospital.BonosBLL();
        string Direccion = Bono.GuardarBono(objPracticas, Documento, EsPrimeraVez, Verificado, EmiteComprobante, AutorizanteId, MedicoId, EspecialidadId, EsAtencionSinTurno,
            EsUrgencia, ReservaTurnoAhora, Usuario, IP, AutorizaBono, MotivoAutorizaBono, Observaciones, TLC, chkNobody,ImportePaga, false);
        string id = "";
        string fecha = "";


        string[] Datos = Direccion.Split('&');

        for (int i = 0; i < Datos.Length; i++)
        {
            switch (i)
            {
                case 0:
                    id = Datos[i].Substring(3);
                    break;
                case 1:
                    fecha = Datos[i].Substring(6);
                    break;
                default:
                    break;
            }

        }


        if (chkNobody == 1 && ImportePaga > 0) {

           idMovimientoSaldo = acentarPago(Documento, S, ImportePaga, observacion,Convert.ToInt32(id));
            
        }


        if (EsAtencionSinTurno)
        {
            Hospital.ConfirmacionBLL c = new Hospital.ConfirmacionBLL();
            c.UsarBono(Convert.ToDateTime(fecha), Convert.ToInt32(id));
            c.RecepcionaryConfirmardesdeBono(Convert.ToDateTime(fecha), Convert.ToInt32(id), MedicoId, EspecialidadId, FechadelTurno);
        }
        else
        {
            if (Recepcionaturno)
            {
                Hospital.ConfirmacionBLL c = new Hospital.ConfirmacionBLL();
                //c.UsarBono(Convert.ToDateTime(fecha), Convert.ToInt32(id));                
                c.RecepcionaryConfirmardesdeBono(Convert.ToDateTime(fecha), Convert.ToInt32(id), MedicoId, EspecialidadId, Convert.ToDateTime(FechaTurno));
                //En AfiliadoTurno
                //Paso por ventanilla Tiene que pasar a 1
                //ConfirmadoBono tiene que ir el Nro de Bono, el Bono_Id
                //select Bono_Id from Hospital..Bono where Fecha = '16/12/2012 00:00' and bono.Id = 2
            }
        }

        if (idMovimientoSaldo > 0) { return Direccion + "_" + idMovimientoSaldo.ToString(); }
        else
        {
            return Direccion;
        }
    }


    [WebMethod(EnableSession = true)]
    public List<saldo> cargarSaldos(long NHC)
    {
        if (Session["Usuario"] != null) {
        Hospital.BonosBLL Bono = new Hospital.BonosBLL();
        return Bono.cargarSaldos(NHC);
        }
         else throw new Exception("Inicie Sesión Nuevamente.");
    }
    
        [WebMethod(EnableSession = true)]
    public int acentarPago(long NHC, int Sector, decimal Importe, string Observacion, int bono)
    {
        if (Session["Usuario"] != null) {
        Hospital.BonosBLL Bono = new Hospital.BonosBLL();
        Int32 Usuario = (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id;
        return Bono.acentarPago(NHC,Sector,Importe,Usuario, Observacion,((usuarios)HttpContext.Current.Session["Usuario"]).ip, bono);
        }
         else throw new Exception("Inicie Sesión Nuevamente.");
    }


        [WebMethod(EnableSession = true)]
        public int RegistrarEntregaComprobante(int Estado, long Id)
        {
            if (Session["Usuario"] != null)
            {
                Hospital.BonosBLL Bono = new Hospital.BonosBLL();
                Int32 Usuario = (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id;
                return Bono.RegistrarEntregaComprobante(Estado,Usuario,Id);
            }
            else throw new Exception("Inicie Sesión Nuevamente.");
        }


        [WebMethod(EnableSession = true)]
        public string VerficarExisteBono(long Documento, int EspecialidadId)
        {
            if (Session["Usuario"] != null)
            {
                Hospital.BonosBLL Bono = new Hospital.BonosBLL();
                Int32 Usuario = (Int32)((usuarios)HttpContext.Current.Session["Usuario"]).id;
                return Bono.VerficarExisteBono(Documento, EspecialidadId);
            }
            else throw new Exception("Inicie Sesión Nuevamente.");
        }
   
}
