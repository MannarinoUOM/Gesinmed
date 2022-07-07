using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for firmaDigitalBLL
/// </summary>
public class firmaDigitalBLL
{
	public firmaDigitalBLL()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public long Compras_Adjunto_Insert(firma firma)
    {
        FirmaDigitalDALTableAdapters.QueriesTableAdapter adapter = new FirmaDigitalDALTableAdapters.QueriesTableAdapter();
        try
        {
           object obj = adapter.H2_InsertarEditarFirma( firma.id,firma.medicoId, firma.especialidadId,firma.especialidadNombre,firma.matriculaNacional,firma.matriculaProvincial,firma.imagenRuta,Convert.ToDateTime("1900-01-01"),firma.usuario,firma.activo,firma.nombreFirma,firma.nombreArchivo,firma.confirmada,firma.nombreConfirma);
           return Convert.ToInt64(obj);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public firma Traer_Firma_Medico(long idMedico)
    {
        FirmaDigitalDALTableAdapters.H2_Traer_Firma_medicoTableAdapter adapter = new FirmaDigitalDALTableAdapters.H2_Traer_Firma_medicoTableAdapter();
        FirmaDigitalDAL.H2_Traer_Firma_medicoDataTable table = new FirmaDigitalDAL.H2_Traer_Firma_medicoDataTable();

        table = adapter.GetData(idMedico);
        firma f = new firma();

        foreach (FirmaDigitalDAL.H2_Traer_Firma_medicoRow row in table.Rows)
        {
            f.id = row.id;
            if (!row.IsimagenRutaNull()) { f.imagenRuta = row.imagenRuta; }
            if (!row.IsmatriculaNacionalNull()) { f.matriculaNacional = row.matriculaNacional; }
            if (!row.IsmatriculaProvincialNull()) { f.matriculaProvincial = row.matriculaProvincial; }
            if (!row.IsnombreFirmaNull()) { f.nombreFirma = row.nombreFirma; }
            if (!row.IsnombreArchivoNull()) { f.nombreArchivo = row.nombreArchivo; }
            if (!row.IsconfirmadaNull()) { f.confirmada = row.confirmada; } else { f.confirmada = 0; }
            if (!row.IsespecialidadNombreNull()) { f.especialidadNombre = row.especialidadNombre; } else { f.nombreConfirma = ""; }
            if (!row.IsfechaNull()) { f.fecha = row.fecha.ToString(); } else { f.fecha = ""; }
        }
        return f;
    }


    public long AtConsultorioCargadePGeneralImpresion(long protocolo)
    {
        ImpresionCargadeAtencionTableAdapters.H2_AtConsultorio_CargadePGeneral_ImpresionTableAdapter adapter = new ImpresionCargadeAtencionTableAdapters.H2_AtConsultorio_CargadePGeneral_ImpresionTableAdapter();
        ImpresionCargadeAtencion.H2_AtConsultorio_CargadePGeneral_ImpresionDataTable table = new ImpresionCargadeAtencion.H2_AtConsultorio_CargadePGeneral_ImpresionDataTable();

        table = adapter.GetData(protocolo);
        long retorno = 0;

        foreach (ImpresionCargadeAtencion.H2_AtConsultorio_CargadePGeneral_ImpresionRow row in table.Rows)
        {
            retorno = row.MedicoId;
        }
        return retorno;
    }

    public long atinternadosimpresionevolucion(string Ids)
    {
        Impresion_At_Int_EvolucionTableAdapters.H2_AtInternados_Impresion_EvolucionTableAdapter adapter = new Impresion_At_Int_EvolucionTableAdapters.H2_AtInternados_Impresion_EvolucionTableAdapter();
        Impresion_At_Int_Evolucion.H2_AtInternados_Impresion_EvolucionDataTable table = new Impresion_At_Int_Evolucion.H2_AtInternados_Impresion_EvolucionDataTable();

        table = adapter.GetData(Ids);
        long retorno = 0;

        foreach (Impresion_At_Int_Evolucion.H2_AtInternados_Impresion_EvolucionRow row in table.Rows)
        {
            retorno = row.MedicoId;
        }
        return retorno;
    }


    public long IMCABPRINT(int id)
    {
        ImpresionIMTableAdapters.H2_IM_CAB_PRINTTableAdapter adapter = new ImpresionIMTableAdapters.H2_IM_CAB_PRINTTableAdapter();
        ImpresionIM.H2_IM_CAB_PRINTDataTable table = new ImpresionIM.H2_IM_CAB_PRINTDataTable();

        table = adapter.GetData(id);
        long retorno = 0;

        foreach (ImpresionIM.H2_IM_CAB_PRINTRow row in table.Rows)
        {
            retorno = row.IdMedico;
        }
        return retorno;
    }

    public long ImpresionEpicrisis(int id)
    {

        ImpresionEpicrisisTableAdapters.H2_Impresion_EpicrisisTableAdapter adapter = new ImpresionEpicrisisTableAdapters.H2_Impresion_EpicrisisTableAdapter();
        ImpresionEpicrisis.H2_Impresion_EpicrisisDataTable table = new ImpresionEpicrisis.H2_Impresion_EpicrisisDataTable();

        table = adapter.GetData(id);
        long retorno = 0;

        foreach (ImpresionEpicrisis.H2_Impresion_EpicrisisRow row in table.Rows)
        {
            retorno = row.MedicoId;
        }
        return retorno;
    }


    public long InternacionAltaTraer(int id)
    {
        InternacionDALTableAdapters.H2_Internacion_Alta_TraerTableAdapter adapter = new InternacionDALTableAdapters.H2_Internacion_Alta_TraerTableAdapter();
        InternacionDAL.H2_Internacion_Alta_TraerDataTable table = new InternacionDAL.H2_Internacion_Alta_TraerDataTable();

        table = adapter.GetData(id);
        long retorno = 0;

        foreach (InternacionDAL.H2_Internacion_Alta_TraerRow row in table.Rows)
        {
            retorno = row.MedicoId;
        }
        return retorno;
    }

    public long AtInternadosHCPRACTICASQUIRURGICASImpresion(int id)
    {
        Impresion_At_HojaQuirurgica_UTITableAdapters.H2_At_Internados_HC_PRACTICAS_QUIRURGICAS_ImpresionTableAdapter adapter = new Impresion_At_HojaQuirurgica_UTITableAdapters.H2_At_Internados_HC_PRACTICAS_QUIRURGICAS_ImpresionTableAdapter();
        Impresion_At_HojaQuirurgica_UTI.H2_At_Internados_HC_PRACTICAS_QUIRURGICAS_ImpresionDataTable table = new Impresion_At_HojaQuirurgica_UTI.H2_At_Internados_HC_PRACTICAS_QUIRURGICAS_ImpresionDataTable();

        table = adapter.GetData(id);
        long retorno = 0;

        foreach (Impresion_At_HojaQuirurgica_UTI.H2_At_Internados_HC_PRACTICAS_QUIRURGICAS_ImpresionRow row in table.Rows)
        {
            retorno = row.MedicoId;
        }
        return retorno;
    }

    public string VerificarDeclaracionFirmaConfirmada(long id)
    {
        FirmaDigitalDALTableAdapters.QueriesTableAdapter adapter = new FirmaDigitalDALTableAdapters.QueriesTableAdapter();
        try
        {
            object obj = adapter.H2_Verificar_Declaracion_Firma_Confirmada(id);
            return Convert.ToString(obj);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public void ConfirmarFirmaLogin(long id)
    {
        FirmaDigitalDALTableAdapters.QueriesTableAdapter adapter = new FirmaDigitalDALTableAdapters.QueriesTableAdapter();
        try
        {
            adapter.H2_Confirmar_Firma_Login(id);
        }
        catch (SqlException ex)
        {
            throw new Exception(ex.Message);
        }
    }

}