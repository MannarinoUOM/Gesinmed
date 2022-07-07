using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.IO;

/// <summary>
/// Summary description for Gente
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
[ScriptService]
public class Gente : System.Web.Services.WebService {

    public Gente () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public int Actualizar_Telefono_Seccional(string Telefono, int Seccional, int Documento, int CodOs)
    {
        Hospital.PacientesBLL Pacientes = new Hospital.PacientesBLL();
        return Pacientes.Actualizar_telefono_seccional(Telefono, Seccional, Documento, CodOs);
    }

    [WebMethod]
    public void Update_Alto_Riesgo(long PacienteId, bool Alto_Riesgo)
    {
        Hospital.GenteBLL Pacientes = new Hospital.GenteBLL();
        Pacientes.Update_AltoRiesgo(PacienteId, Alto_Riesgo);
    }

    [WebMethod]
    public long HC_UOM_Provisoria()
    {
        Hospital.GenteBLL Pacientes = new Hospital.GenteBLL();
        return Pacientes.HC_UOM_Provisoria();
    }

    [WebMethod]
    public string Vencido(string CUIL)
    {
        string str_cuil = CUIL;
        if (CUIL.Length < 7) str_cuil = CUIL.PadLeft(8, '0');
        Hospital.SecretariadoPadronBLL Vencimiento = new Hospital.SecretariadoPadronBLL();
        return Vencimiento.Vencido(str_cuil);
    }

    //Obtiene el documento para un recien nacido, busca un numero disponible a partir del 80000000
    [WebMethod]
    public long Gente_UltimoDocumento_RecienNacido()
    {
        Hospital.PacientesBLL Pacientes = new Hospital.PacientesBLL();
        return Pacientes.Gente_UltimoDocumento_RecienNacido();
    }

    [WebMethod]
    public bool UltimoAporte_OK(int Documento)
    {
        Hospital.SecretariadoPadronBLL Secre = new Hospital.SecretariadoPadronBLL();
        return Secre.UltimoAporte_OK(Documento);
    }


    [WebMethod]
    public void Renombrar(string Capturado, string Paciente_Id)
    {
        string Anio = DateTime.Now.ToString("yy");
        int mes = Convert.ToInt32(DateTime.Now.ToString("MM"));
        string[] Mes = { "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" };

        string Directorio = Anio + "" + Mes[mes - 1].ToLower();
        Directory.CreateDirectory(@"\\10.10.8.66\Files\Software\Aplicaciones\documentacion_new\Gesinmed\" + Directorio);

        try
        {
            File.Move(@"\\10.10.8.66\Files\Software\Aplicaciones\documentacion_new\Gesinmed\" + Directorio + @"\2_" + Paciente_Id + ".jpg", @"\\10.10.8.66\Files\Software\Aplicaciones\documentacion_new\Gesinmed\" + Directorio + @"\2_" + Paciente_Id.Replace(".jpg", "") + "_" + DateTime.Now.ToString("yyyyMMddhhmmss") + ".jpg");
        }
        catch (Exception ex)
        {
            //No pasa nada        
        }

        try
        {
            File.Move(@"\\10.10.8.66\Files\Software\Aplicaciones\documentacion_new\Gesinmed\" + Capturado, @"\\10.10.8.66\Files\Software\Aplicaciones\documentacion_new\Gesinmed\" + Directorio + @"\2_" + Paciente_Id + ".jpg");
            GenteDALTableAdapters.QueriesTableAdapter adapter = new GenteDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Gente_Foto_Guardar(Convert.ToInt64(Paciente_Id), @"\Gesinmed\" + Directorio + @"\2_" + Paciente_Id + ".jpg");
        }
        catch
        {
            throw new Exception ("Error al guardar la foto");
        }

    }


    [WebMethod]
    public void Foto_Gente_DB_Guardar(string Capturado, string Paciente_Id)
    {
        GenteDALTableAdapters.QueriesTableAdapter adapter = new GenteDALTableAdapters.QueriesTableAdapter();
        adapter.H2_Gente_Foto_Guardar(Convert.ToInt64(Paciente_Id), @"/Local/" + Capturado);
    }

    //Documento de Julio 26395277


    [WebMethod]
    public void subirFoto(Array[] file)
    {
        GenteDALTableAdapters.QueriesTableAdapter adapter = new GenteDALTableAdapters.QueriesTableAdapter();
        //adapter.H2_Gente_Foto_Guardar(Convert.ToInt64(Paciente_Id), @"/Local/" + Capturado);
    }

    //verifica si el ultimo recibo de suledo exede sus dias de vencimiento 
    [WebMethod]
    public int VerificarVencimientoReciboSueldo(long afiliadoId)
    {
        Hospital.PacientesBLL Pacientes = new Hospital.PacientesBLL();
        return Pacientes.Verificar_Vencimiento_Recibo_Sueldo(afiliadoId);
    }


    [WebMethod]
    public void subirFotoTest(string strEncoded,long idAfiliado)
    {
        Hospital.PacientesBLL Pacientes = new Hospital.PacientesBLL();
        Pacientes.subir_Foto_Test(strEncoded, idAfiliado);
    }


    [WebMethod]
    public List<PatologiasAltoRiesgo> AltoRiesgoMOSTRAR(long AfiliadoId, int accion)
    {
        Hospital.GenteBLL Pacientes = new Hospital.GenteBLL();
        return Pacientes.AltoRiesgoMOSTRAR(AfiliadoId, accion);
    }


        [WebMethod]
    public int AltoRiesgoABM(long AfiliadoId, int accion, string Patologia)
    {
        Hospital.GenteBLL Pacientes = new Hospital.GenteBLL();
        return Pacientes.AltoRiesgoABM(AfiliadoId, accion, Patologia);
    }


        [WebMethod(EnableSession=true)]
        public int ActualizarCelular(long AfiliadoId, string celular)
        {
            if (Session["Usuario"] != null)
            {
                Hospital.GenteBLL Pacientes = new Hospital.GenteBLL();
                return Pacientes.ActualizarCelular(AfiliadoId, celular);
            }
            else { return 0; }
        }

            [WebMethod(EnableSession=true)]
        public int logCelInsert(long afiliadoId, string celular, string sector)
        {
            if (Session["Usuario"] != null)
            {
                int UsuarioId = int.Parse(((usuarios)Session["Usuario"]).id.ToString());
                Hospital.GenteBLL Pacientes = new Hospital.GenteBLL();
                return Pacientes.logCelInsert(afiliadoId, celular,UsuarioId,sector);
            }
            else { return 0; }
        }
}
