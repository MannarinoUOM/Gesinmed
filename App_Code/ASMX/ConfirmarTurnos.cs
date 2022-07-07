using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for ConfirmarTurnos
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class ConfirmarTurnos : System.Web.Services.WebService
{

    private bool Error = false;

    public ConfirmarTurnos()
    {

    }

    [WebMethod(EnableSession = true)]
    public practicaLista Practicas_Listas_Total()
    {

        try
        {
            long id = ((usuarios)(Context.Session["Usuario"])).id;
        }
        catch
        {
            Error = true;
        }

        if (!Error)
        {
            Hospital.PracticasBLL practicas = new Hospital.PracticasBLL();
            return practicas.Lista_Practicas_Todas();
        }
        else
        {
            return null;
        }

    }

    [WebMethod(EnableSession = true)]
    public practicaLista Lista_Practicas_by_Esp(int EspecialidadId)
    {

        Hospital.PracticasBLL practicas = new Hospital.PracticasBLL();
        return practicas.Lista_Practicas_by_Esp(EspecialidadId);
    }

    [WebMethod(EnableSession = true)]
    public List<practicas> Practica_Listar_Guardia()
    {
            Hospital.PracticasBLL practicas = new Hospital.PracticasBLL();
            return practicas.Practica_Listar_Guardia();
    }

    [WebMethod(EnableSession = true)]
    public int Practicas_Codigo_ID(int Codigo)
    {

        try
        {
            long id = ((usuarios)(Context.Session["Usuario"])).id;
        }
        catch
        {
            Error = true;
        }


        if (!Error)
        {
            Hospital.PracticasBLL practicas = new Hospital.PracticasBLL();
            return practicas.Practica_Codigo_Id(Codigo);
        }
        else
        {
            return -1;
        }
    }

    public List<DateTime> Fechasenlista(string Fechas)
    {
        List<DateTime> listfechas = new List<DateTime>();
        foreach (string str in Fechas.Split(','))
        {
            DateTime aux;
            if (DateTime.TryParse(str, out aux)) listfechas.Add(aux);
        }
        return listfechas;
    }


    private string GenerarCodigo(int length)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var random = new Random();
        return new string(Enumerable.Repeat(chars, length)
          .Select(s => s[random.Next(s.Length)]).ToArray());
    }




    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]                                                                                                                                                                                                                                                                          //TELECONSULTA BORRAR PARA SUBIR VERSION                                                  
    public List<int> GuardarTurno(List<Confirmarturnos> objPracticas, int Documento, int MedicoId, int EspecialidadId, string Dia, string Hora, bool Telefonico, int AutorizanteId, bool PrimeraVez, bool EmiteBono, bool EmiteComprobante, string Verificado, string Comentario, bool Sobreturno, bool SinAgenda, string Fechas, int TLC, int Seccional, int Monotributo)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        List<DateTime> listfechas = Fechasenlista(Fechas);
        //if (Sobreturno) listfechas.Add(Convert.ToDateTime(Dia + " " + Hora));
        List<int> idsTurnos = new List<int>();

        if (V.Permiso("12"))
        {
            DateTime _fecha;
            if (!DateTime.TryParse(Dia + " " + Hora, out _fecha)) throw new Exception("Fecha no válida.");

            long id = 0;

            try
            {
                id = ((usuarios)(Context.Session["Usuario"])).id;
            }
            catch
            {
                Error = true;
            }


            if (!Error)
            {
                JavaScriptSerializer ser = new JavaScriptSerializer();
                Hospital.TurnosBLL practicas = new Hospital.TurnosBLL();
                string Resultado = "1";
                //Creo un Sobreturno
                if (Sobreturno || SinAgenda)
                {
                    if (Sobreturno)
                    {
                        Hospital.TurnosBLL t = new Hospital.TurnosBLL();
                        if (!t.SobreTurnosLibres(MedicoId, EspecialidadId, Convert.ToDateTime(Dia + " " + Hora)))
                        {
                            throw new Exception("Error Al Intentar dar un sobreturno, se ha superado el Nro de Sobreturnos Máximos");
                        }
                    }

                    DateTime elDia;
                    DateTime laHora;
                    if (DateTime.TryParse(Dia, out elDia) && DateTime.TryParse(Hora, out laHora))
                    {
                        int Aux;
                        if (int.TryParse(practicas.Crear_Un_Turno(MedicoId, EspecialidadId, Convert.ToDateTime(Dia + " " + Hora), 0, Sobreturno, SinAgenda), out Aux))
                        {
                            Resultado = Aux.ToString();
                        }
                        else throw new Exception("Error Al Intentar dar un sobreturno");
                    }
                    else
                    {
                        throw new Exception("Error Al Intentar dar un sobreturno");
                    }
                }

                if (Resultado == "1")
                {
                    foreach (DateTime current in listfechas)
                    {
                        Hospital.TurnosBLL t = new Hospital.TurnosBLL();
                        bool AtiendeMedico = false;
                        AtiendeMedico = t.Atiende_El_Dia(MedicoId, EspecialidadId, current);

                        if (!AtiendeMedico)
                        {
                            if (t.Medico_Tiene_Turnos_Generados_Dia(MedicoId, EspecialidadId, current))
                            {                                                                                                                                                                                                                                               //TELECONSULTA
                                idsTurnos.Add(practicas.Guardar_Turno(objPracticas, Documento, MedicoId, EspecialidadId, current.ToShortTimeString(), current.ToShortDateString(), Telefonico, AutorizanteId, PrimeraVez, EmiteBono, EmiteComprobante, Verificado, Comentario, (Int32)id ,TLC,Seccional,Monotributo));
                            }
                            else
                            {
                                throw new Exception("En ese día el médico no Atiende.");
                            }


                        }
                        else
                        {
                            throw new Exception("En ese día el médico no Atiende.");
                        }
                    }
                    return idsTurnos;
                }
                else
                {
                    return idsTurnos;
                }

            }
            else
            {
                throw new Exception("Error Al Intentar dar el turno.");
            }
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]                                                                                                                                                                                                                                                                        ///TELECONSULTA
    public List<int> GuardarTurno_IMG(List<Confirmarturnos> objPracticas, int Documento, int MedicoId, int EspecialidadId, string Dia, string Hora, bool Telefonico, int AutorizanteId, bool PrimeraVez, bool EmiteBono, bool EmiteComprobante, string Verificado, string Comentario, bool Sobreturno, bool SinAgenda, string Fechas,int TLC)
    {
        Hospital.VerificadorBLL V = new Hospital.VerificadorBLL();
        List<DateTime> listfechas = Fechasenlista(Fechas);
        //if (Sobreturno) listfechas.Add(Convert.ToDateTime(Dia + " " + Hora));
        List<int> idsTurnos = new List<int>();

        if (V.Permiso("112"))
        {
            DateTime _fecha;
            if (!DateTime.TryParse(Dia + " " + Hora, out _fecha)) throw new Exception("Fecha no válida.");

            long id = 0;

            try
            {
                id = ((usuarios)(Context.Session["Usuario"])).id;
            }
            catch
            {
                Error = true;
            }


            if (!Error)
            {
                JavaScriptSerializer ser = new JavaScriptSerializer();
                Hospital.TurnosBLL practicas = new Hospital.TurnosBLL();
                string Resultado = "1";
                //Creo un Sobreturno
                if (Sobreturno || SinAgenda)
                {
                    if (Sobreturno)
                    {
                        Hospital.TurnosBLL t = new Hospital.TurnosBLL();
                        if (!t.SobreTurnosLibres(MedicoId, EspecialidadId, Convert.ToDateTime(Dia + " " + Hora)))
                        {
                            throw new Exception("Error Al Intentar dar un sobreturno, se ha superado el Nro de Sobreturnos Máximos");
                        }
                    }

                    DateTime elDia;
                    DateTime laHora;
                    if (DateTime.TryParse(Dia, out elDia) && DateTime.TryParse(Hora, out laHora))
                    {
                        int Aux;
                        if (int.TryParse(practicas.Crear_Un_Turno(MedicoId, EspecialidadId, Convert.ToDateTime(Dia + " " + Hora), 0, Sobreturno, SinAgenda), out Aux))
                        {
                            Resultado = Aux.ToString();
                        }
                        else throw new Exception("Error Al Intentar dar un sobreturno");
                    }
                    else
                    {
                        throw new Exception("Error Al Intentar dar un sobreturno");
                    }
                }

                if (Resultado == "1")
                {
                    //Aca tengo que generar un codigo unico...
                    //usuario_fecha_letras   
                    string codigo_generado = id.ToString().PadLeft(3, '0') + "_" + DateTime.Now.ToString("yyyyMMddHHmmss") + "_" + GenerarCodigo(4);

                    foreach (DateTime current in listfechas)
                    {
                        Hospital.TurnosBLL t = new Hospital.TurnosBLL();
                        bool AtiendeMedico = false;
                        AtiendeMedico = t.Atiende_El_Dia(MedicoId, EspecialidadId, current);

                        if (!AtiendeMedico)
                        {
                            if (t.Medico_Tiene_Turnos_Generados_Dia(MedicoId, EspecialidadId, current))
                            {
                                idsTurnos.Add(practicas.Guardar_Turno_IMG(objPracticas, Documento, MedicoId, EspecialidadId, current.ToShortTimeString(), current.ToShortDateString(), Telefonico, AutorizanteId, PrimeraVez, EmiteBono, EmiteComprobante, Verificado, Comentario, (Int32)id, codigo_generado,TLC));
                            }
                            else
                            {
                                throw new Exception("En ese día el médico no Atiende.");
                            }


                        }
                        else
                        {
                            throw new Exception("En ese día el médico no Atiende.");
                        }
                    }
                    return idsTurnos;
                }
                else
                {
                    return idsTurnos;
                }

            }
            else
            {
                throw new Exception("Error Al Intentar dar el turno.");
            }
        }
        else
        {
            throw new Exception("Error de Usuario");
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public void Crear_un_Turno(int MedicoId, int EspecialidadId, string Dia, string Hora)
    {
        try
        {
            Hospital.TurnosBLL practicas = new Hospital.TurnosBLL();
            string Resultado = "";
            Resultado = practicas.Crear_Un_Turno_Automaticamente_IMG(MedicoId, EspecialidadId, Dia, Hora).ToString();
        }
        catch
        { 
            throw new Exception("No se ha podido generar el turno");
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public FactValorPracticasEspecialidad verificaConvenio(int Seccional, int EspecialidadId, int Practica, int Nomenclador)
    {
         Hospital.FacturacionBLL F = new Hospital.FacturacionBLL();

         return F.ValorPracticaporConvenio(Seccional, EspecialidadId, Practica, Nomenclador);   
    }
}
