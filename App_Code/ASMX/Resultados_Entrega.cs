using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

/// <summary>
/// Descripción breve de Resultados_Entrega
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// Para permitir que se llame a este servicio Web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
[System.Web.Script.Services.ScriptService]
public class Resultados_Entrega : System.Web.Services.WebService {

    public Resultados_Entrega () {

        //Eliminar la marca de comentario de la línea siguiente si utiliza los componentes diseñados 
        //InitializeComponent(); 
    }

  [WebMethod]
    public List<pacientes> Cargar_Paciente_Documento_Entrega_De_Resultados(string Documento, string T_Doc)
    {
        try
        {
            int nrodoc = Convert.ToInt32(Documento);
            if (nrodoc != 0)
            {
                Hospital.Entrega_De_ResultadosBLL pacientes = new Hospital.Entrega_De_ResultadosBLL();
                return pacientes.Paciente_DOC_Entrega_De_Resultados(nrodoc, T_Doc);
            }
            else
            {
                return null;
            }

        }
        catch (Exception e)
        {
            return null;
        }
    }

    [WebMethod]
    public List<pacientes> CargarPacienteNHC_UOM_Entrega_De_Resultados(string NHC)
    {
        try
        {
            Hospital.Entrega_De_ResultadosBLL pacientes = new Hospital.Entrega_De_ResultadosBLL();
            return pacientes.Paciente_NHC_UOM_Entrega_De_Resultados(NHC);
        }
        catch (Exception e)
        {
            return null;
        }
    }


    [WebMethod]
    public List<pacientes> CargarPacienteID_Entrega_De_Resultados(string ID)
    {
        try
        {
            long id = Convert.ToInt64(ID);
            Hospital.Entrega_De_ResultadosBLL pacientes = new Hospital.Entrega_De_ResultadosBLL();
            return pacientes.Paciente_ID_Entrega_De_Resultados(id);
        }
        catch (Exception e)
        {
            return null;
        }

    }


    [WebMethod]
    public List<estudios> TraerEstudiosTodos(long id, int tipo)
    {
        try
        {
            Hospital.Entrega_De_ResultadosBLL pacientes = new Hospital.Entrega_De_ResultadosBLL();
            return pacientes.Traer_Estudios_Todos(id,tipo);
        }
        catch (Exception e)
        {
            return null;
        }

    }

    [WebMethod]
    public int EliminarEntrega(long id)
    {
        try
        {
            Hospital.Entrega_De_ResultadosBLL pacientes = new Hospital.Entrega_De_ResultadosBLL();
            return pacientes.Entrega_Resultados_Eliminar(id);
        }
        catch (Exception e)
        {
            return 0;
        }

    }

    [WebMethod(EnableSession = true)]
    public long GuardarEditarEntregas(long estudioId, long especialidadId, string fechaIngreso, string fechaEntrega, string fechaDevolucion, string observacion, long pacienteId)
    {
        estudios entrega = new estudios();
        entrega.estudioId = estudioId;
        entrega.especialidadId = especialidadId;
        if (fechaIngreso == "") { fechaIngreso = "01/01/1900"; }
        entrega.fechaIngreso = fechaIngreso;

        if (fechaEntrega == "") { fechaEntrega = "01/01/1900"; }
        entrega.fechaEntrega = fechaEntrega;

        if (fechaDevolucion == "") { fechaDevolucion = "01/01/1900"; }
        entrega.fechaDevolucion = fechaDevolucion;

        entrega.observacion = observacion;
        entrega.pacienteId = pacienteId;
        entrega.usuario = ((usuarios)Session["Usuario"]).usuario;
        try
        {
            Hospital.Entrega_De_ResultadosBLL pacientes = new Hospital.Entrega_De_ResultadosBLL();
            return pacientes.Entrega_Resultados_Guardar_Editar(entrega);
        }
        catch (Exception e)
        {
            return 0;
        }

    }
}

