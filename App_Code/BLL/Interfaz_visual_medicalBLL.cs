using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;

/// <summary>
/// Descripción breve de Interfaz_visual_medicalBLL
/// </summary>
public class Interfaz_visual_medicalBLL
{
    public Interfaz_visual_medicalBLL()
	{
		//
		// TODO: Agregar aquí la lógica del constructor
		//
	}

    public void Generar_TXT(int Paciente_ID)
    {
        string nombreArchivo = System.Configuration.ConfigurationManager.AppSettings.Get("Interfaz_visual_medical") + @"\" + DateTime.Now.ToString("yyyyMMdd") + "_" + Paciente_ID.ToString() + ".TXT";

        using (FileStream flujoArchivo = new FileStream(nombreArchivo, FileMode.Create, FileAccess.Write, FileShare.None))
        {

            using (StreamWriter escritor = new StreamWriter(flujoArchivo))
            {
                
                Interfaz_visual_medicaDALTableAdapters.TraerDatosTableAdapter adapter = new Interfaz_visual_medicaDALTableAdapters.TraerDatosTableAdapter();
                Interfaz_visual_medicaDAL.TraerDatosDataTable aTable = adapter.GetData(Paciente_ID);


                foreach (Interfaz_visual_medicaDAL.TraerDatosRow row in aTable)
                {

                    string ID_SOCIO = "";
                    string TIPO_DOCUMENTO = "";
                    string NRO_DOCUMENTO = "";
                    string NRO_HISTORIA_CLINICA = "";
                    string APELLIDO = "";
                    string NOMBRES = "";
                    string SEXO = "";
                    string FECHA_NACIMIENTO = "";
                    string NRO_TELEFONO  = "";
                    string CALLE = "";
                    string NRO_CALLE = "";
                    string PISO = "";
                    string OBSERVACIONES_DIRECCION = "";
                    string LOCALIDAD = "";
                    string CODIGO_POSTAL = "";
                    string SECCIONAL = "";
                    string INSTITUCION = "";
                    string FECHA_BAJA = "";
                    string MOTIVO_BAJA = "";

                    ID_SOCIO = row.ID_SOCIO.ToString();
                    TIPO_DOCUMENTO = row.TIPO_DOCUMENTO;
                    NRO_DOCUMENTO = row.NRO_DOCUMENTO.ToString();
                    if (!row.IsNRO_HISTORIA_CLINICANull()) { NRO_HISTORIA_CLINICA = row.NRO_HISTORIA_CLINICA; }
                    APELLIDO = row.APELLIDO;
                    if (!row.IsSEXONull()) { SEXO = row.SEXO; }
                    if (!row.IsFECHA_NACIMIENTONull()) { FECHA_NACIMIENTO = row.FECHA_NACIMIENTO.ToShortDateString(); }
                    if (!row.IsNRO_TELEFONONull()) { NRO_TELEFONO = row.NRO_TELEFONO; }
                    if (!row.IsCALLENull()) { CALLE = row.CALLE; }
                    if (!row.IsNRO_CALLENull()) { NRO_CALLE = row.NRO_CALLE; }
                    if (!row.IsPISONull()) { PISO = row.PISO; }
                    if (!row.IsLOCALIDADNull()) { LOCALIDAD = row.LOCALIDAD; }
                    if (!row.IsCODIGO_POSTALNull()) { CODIGO_POSTAL = row.CODIGO_POSTAL; }
                    if (!row.IsSECCIONALNull()) { SECCIONAL = row.SECCIONAL.ToString(); }
                    if (!row.IsINSTITUCIONNull()) { INSTITUCION = row.INSTITUCION.ToString(); }
                    if (!row.IsFECHA_BAJANull()) { FECHA_BAJA = row.FECHA_BAJA.ToShortDateString(); }

                    escritor.WriteLine((
                        ID_SOCIO.PadRight(10) + TIPO_DOCUMENTO.PadRight(5) + NRO_DOCUMENTO.PadRight(10) + NRO_HISTORIA_CLINICA.PadRight(15) + APELLIDO.PadRight(50) + NOMBRES.PadRight(50) +
                        SEXO.PadRight(10) + FECHA_NACIMIENTO.PadRight(10) + NRO_TELEFONO.PadRight(30) + CALLE.PadRight(100) + PISO.PadRight(4) +
                        OBSERVACIONES_DIRECCION.PadRight(40) + LOCALIDAD.PadRight(15) + CODIGO_POSTAL.PadRight(4) + SECCIONAL.PadRight(3) + INSTITUCION.PadRight(9) +
                        FECHA_BAJA.PadRight(10) + MOTIVO_BAJA.PadRight(50)
                        ).ToUpper());
                
                }

                escritor.Close();
                flujoArchivo.Close();

            }

        }
    }
}