using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de AtConsultorio_IMG
/// </summary>
public class AtConsultorio_IMGBLL
{
	public AtConsultorio_IMGBLL()
	{
		//
		// TODO: Agregar aquí la lógica del constructor
		//
	}


    public void Guardar_General_Items_IMG(
            long Protocolo, string txt_1_cant, string txt_2_cant, string txt_3_cant, string txt_4_cant, string txt_5_cant, string txt_6_cant
        , string txt_7_cant, string txt_8_cant, string txt_9_cant, string txt_10_cant, string txt_otros_desc_1, string txt_otros_desc_2,
        string txt_otros_1, string txt_otros_2, string txt_cant_placas, string cbo_realizalopedido, string txt_fundamentar
    )
    {

        AtConsultorio_IMGDALTableAdapters.QueriesTableAdapter adapter = new AtConsultorio_IMGDALTableAdapters.QueriesTableAdapter();        
        try
        {
            adapter.H2_AT_Consultorio_IMG_Guardar_Item(Protocolo, DateTime.Today, txt_1_cant, txt_2_cant, txt_3_cant,
                txt_4_cant, txt_5_cant, txt_6_cant, txt_7_cant, txt_8_cant, txt_9_cant, txt_otros_desc_1, txt_otros_desc_2, txt_otros_1,
                txt_otros_2, txt_10_cant, txt_cant_placas, cbo_realizalopedido, txt_fundamentar
            );
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

    }



    public long Guardar_IMG_Cabecera(
            long Protocolo, string Patologia, string ICD10_Det_Id, string Observaciones, int Especialidad_Id, long NHC, string MotivoModificacion, int MedicoId, string Alias
    )
    {
        AtConsultorio_IMGDALTableAdapters.QueriesTableAdapter adapter = new AtConsultorio_IMGDALTableAdapters.QueriesTableAdapter();        
        try
        {
            object R = adapter.H2_AtConsultorio_Guardar_IMG_Cabecera(Protocolo, Patologia, ICD10_Det_Id, Observaciones, Especialidad_Id, NHC, MotivoModificacion, MedicoId, Alias);
            if (R != null) return Convert.ToInt64(R);
            else throw new Exception("Error al guardar protocolo.");
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

    }





    public AtConsultorioIMG_item Cargar_IMG_item(long Protocolo)
    {
        AtConsultorio_IMGDALTableAdapters.H2_AT_Consultorio_Carga_IMG_ItemsTableAdapter adapter = new AtConsultorio_IMGDALTableAdapters.H2_AT_Consultorio_Carga_IMG_ItemsTableAdapter();
        AtConsultorio_IMGDAL.H2_AT_Consultorio_Carga_IMG_ItemsDataTable aTable = adapter.GetData(Protocolo);
        if (aTable.Rows.Count > 0)
        {
            AtConsultorioIMG_item c = new AtConsultorioIMG_item();
            AtConsultorio_IMGDAL.H2_AT_Consultorio_Carga_IMG_ItemsRow row = aTable[0];

            if (!row.IsCGRM_CARDIOLOGIANull()) c.txt_10_cant = row.CGRM_CARDIOLOGIA;
            if (!row.IsCGRM_DOPPLERNull()) c.txt_9_cant = row.CGRM_DOPPLER;
            if (!row.IsCGRM_FUNDAMENTONull()) c.txt_fundamentar = row.CGRM_FUNDAMENTO;
            if (!row.IsCGRM_GASTROENNull()) c.txt_6_cant = row.CGRM_GASTROEN;
            if (!row.IsCGRM_MAMONull()) c.txt_7_cant = row.CGRM_MAMO;
            if (!row.IsCGRM_MED_NUCNull()) c.txt_8_cant = row.CGRM_MED_NUC;
            if (!row.IsCGRM_NEURONull()) c.txt_4_cant = row.CGRM_NEURO;
            if (!row.IsCGRM_O_TIT1Null()) c.txt_otros_desc_1 = row.CGRM_O_TIT1;
            if (!row.IsCGRM_O_TIT2Null()) c.txt_otros_desc_2 = row.CGRM_O_TIT2;
            if (!row.IsCGRM_OTRO1Null()) c.txt_otros_1 = row.CGRM_OTRO1;
            if (!row.IsCGRM_OTRO2Null()) c.txt_otros_2 = row.CGRM_OTRO2;
            if (!row.IsCGRM_PLACASNull()) c.txt_cant_placas = row.CGRM_PLACAS;
            if (!row.IsCGRM_RADIOLOGNull()) c.txt_5_cant = row.CGRM_RADIOLOG;
            if (!row.IsCGRM_REALIZALO_LO_PEDIDONull()) c.cbo_realizalopedido = row.CGRM_REALIZALO_LO_PEDIDO;
            if (!row.IsCGRM_RES_MAGNull()) c.txt_1_cant = row.CGRM_RES_MAG;
            if (!row.IsCGRM_TOM_COMPUNull()) c.txt_3_cant = row.CGRM_TOM_COMPU;
            if (!row.IsCGRM_UROLOGIANull()) c.txt_2_cant = row.CGRM_UROLOGIA;

            return c;
        }

        return null;

    }




    public AtConsultorioIMG_CAB CargarAtencion_IMG_CAB(long Protocolo)
    {
        AtConsultorio_IMGDALTableAdapters.H2_AtConsultorio_IMG_Cargar_CABTableAdapter adapter = new AtConsultorio_IMGDALTableAdapters.H2_AtConsultorio_IMG_Cargar_CABTableAdapter();
        AtConsultorio_IMGDAL.H2_AtConsultorio_IMG_Cargar_CABDataTable aTable = adapter.GetData(Protocolo);
        if (aTable.Rows.Count > 0)
        {
            AtConsultorioIMG_CAB c = new AtConsultorioIMG_CAB();
            if (!aTable[0].IsICD10_Det_IdNull()) c.diagnostico_cod = aTable[0].ICD10_Det_Id;
            if (!aTable[0].IsFecha_AtencionNull()) c.fecha = aTable[0].Fecha_Atencion.ToShortDateString();
            if (!aTable[0].IsMotivoModificacionNull()) c.modificacion = aTable[0].MotivoModificacion;
            if (!aTable[0].IsNHCNull()) c.NHC = aTable[0].NHC;
            if (!aTable[0].IsObservacionesNull()) c.observaciones = aTable[0].Observaciones;
            if (!aTable[0].IsPatologiaNull()) c.patologia = aTable[0].Patologia;
            if (!aTable[0].IsAliasNull()) c.alias = aTable[0].Alias;
            c.medico = aTable[0].Medico;
            c.especialidad = aTable[0].Especialidad;
            c.diagnostico_desc = aTable[0].ICD10;
            c.protocolo = aTable[0].ConsultaIMGid;
            return c;
        }

        return null;

    }


    public int At_Consultorio_Existe_Atencion_by_NHC(int MedicoId, int EspecialidadId, long NHC)
    {
        AtConsultorio_IMGDALTableAdapters.QueriesTableAdapter adapter = new AtConsultorio_IMGDALTableAdapters.QueriesTableAdapter();
        try
        {
            object obj = adapter.H2_ATCONSULTORIO_IMG_EXISTE_ATENCION_BY_NHC(MedicoId, EspecialidadId, NHC);
            if (obj != null) return Convert.ToInt32(obj.ToString());
            else return -1;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public long Ultimo_Protocolo_by_NHC_Medico(long NHC, int EspecialidadId, int MedicoId)
    {
        AtConsultorio_IMGDALTableAdapters.QueriesTableAdapter adapter = new AtConsultorio_IMGDALTableAdapters.QueriesTableAdapter();        
        try
        {
            object R = adapter.H2_AtConsultorio_IMG_Ultimo_Protocolo_by_NHC_Medico(NHC, EspecialidadId, MedicoId);
            if (R != null) return Convert.ToInt64(R);
            else throw new Exception("No existe un protocolo anterior.");
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }


    public int Cambiar_Estado(long Turno_Id, int Nuevo_Estado)
    {
        AtConsultorio_IMGDALTableAdapters.QueriesTableAdapter adapter = new AtConsultorio_IMGDALTableAdapters.QueriesTableAdapter();
        adapter.H3_Actualizar_Estado(Nuevo_Estado, Turno_Id);
        return Nuevo_Estado;
    }


    public void AtConsultorio_IMG_Guardar(int Tipo, long Turno_Id, int Usuario, string Comentario, string Alias, string Ruta_Voz)
    {
        AtConsultorio_IMGDALTableAdapters.QueriesTableAdapter adapter = new AtConsultorio_IMGDALTableAdapters.QueriesTableAdapter();
        adapter.H2_AtConsultorio_IMG_Guardar(Tipo, Turno_Id, Usuario, Comentario, Alias, Ruta_Voz);        
    }


    public AtConsultorioIMG_subconsulta AtConsultorio_IMG_Cargar(int Tipo, long Turno_Id)
    {
        AtConsultorio_IMGDALTableAdapters.H2_AtConsultorio_IMG_CargarTableAdapter adapter = new AtConsultorio_IMGDALTableAdapters.H2_AtConsultorio_IMG_CargarTableAdapter();
        AtConsultorio_IMGDAL.H2_AtConsultorio_IMG_CargarDataTable aTable = adapter.GetData(Tipo, Turno_Id);
        AtConsultorioIMG_subconsulta c = new AtConsultorioIMG_subconsulta();            
        if (aTable.Rows.Count > 0)
        {            
            c.ATIMG_Turno_Id = aTable[0].ATIMG_Turno_Id;
            c.ATIMG_Fecha_Carga = aTable[0].ATIMG_Fecha_Carga.ToString();
            if (!aTable[0].IsATIMG_ComentarioNull()) c.ATIMG_Comentario = aTable[0].ATIMG_Comentario;
            if (!aTable[0].IsATIMG_AliasNull()) c.ATIMG_Alias = aTable[0].ATIMG_Alias;
            c.ATIMG_Tipo = aTable[0].ATIMG_Tipo;
            if (!aTable[0].IsATIMG_VozNull()) c.ATIMG_Voz = aTable[0].ATIMG_Voz;                     
        }
        return c;
    }


    public List<listapacientes> At_Consultorio_ListaPacientes_IMG(int MedicoId, int Especialidad, DateTime Fecha)
    {
        AtConsultorio_IMGDALTableAdapters.H2_AtConsultorio_ListaPacientes_IMGTableAdapter adapter = new AtConsultorio_IMGDALTableAdapters.H2_AtConsultorio_ListaPacientes_IMGTableAdapter();

        AtConsultorio_IMGDAL.H2_AtConsultorio_ListaPacientes_IMGDataTable aTable = adapter.GetData(Especialidad, MedicoId, Fecha);

        List<listapacientes> Lista = new List<listapacientes>();

        foreach (AtConsultorio_IMGDAL.H2_AtConsultorio_ListaPacientes_IMGRow row in aTable.Rows)
        {
            listapacientes l = new listapacientes();
            l.Fecha = row.TurnoFecha.ToString("dd/MM/yyyy HH:mm");
            l.NHC = row.NHC.ToString();
            l.documento = row.documento;
            if (!row.IsEstadoNull()) { l.Estado = row.Estado; } else { l.Estado = "0"; }
            if (!row.IsFInicioNull()) { l.LLamadoI = row.FInicio.ToShortTimeString(); }
            if (!row.IsFFinNull()) { l.LLamadoF = row.FFin.ToShortTimeString(); }
            l.Paciente = row.Paciente;

            if (!row.IsRecepNull()) l.HoraRecep = "(" + row.Recep + "hs.)";
            else l.HoraRecep = string.Empty;

            if (!row.IsSeccionalNull()) { l.Seccional = row.Seccional; }
            if (!row.IsEstado_IMGNull()) { l.Estado_IMG = row.Estado_IMG; } else { l.Estado_IMG = 0; }

            l.Turno_Id = row.Turno_Id;

            Lista.Add(l);
        }

        return Lista;
    }

    public int AtConsultorio_Turno_Estado(long Turno_Id)
    {
        AtConsultorio_IMGDALTableAdapters.H2_AtConsultorio_IMG_EstadoTableAdapter adapter = new AtConsultorio_IMGDALTableAdapters.H2_AtConsultorio_IMG_EstadoTableAdapter();
        AtConsultorio_IMGDAL.H2_AtConsultorio_IMG_EstadoDataTable aTable = adapter.GetData(Turno_Id);
        int Estado = 0;
        if (aTable.Count > 0) { if (!aTable[0].IsEstadoNull()) Estado = aTable[0].Estado; }                
        return Estado;
    }


    public List<Chequeo_gral_carga_Lista_Practicas> Cargar_gral_carga_practicas(long TurnoId)
    {
        List<Chequeo_gral_carga_Lista_Practicas> lista = new List<Chequeo_gral_carga_Lista_Practicas>();
        AtConsultorio_IMGDALTableAdapters.H2_AtConsultorio_Recepcion_Cargar_PracticasTableAdapter adapter = new AtConsultorio_IMGDALTableAdapters.H2_AtConsultorio_Recepcion_Cargar_PracticasTableAdapter();
        AtConsultorio_IMGDAL.H2_AtConsultorio_Recepcion_Cargar_PracticasDataTable aTable = adapter.GetData(TurnoId);

        foreach (AtConsultorio_IMGDAL.H2_AtConsultorio_Recepcion_Cargar_PracticasRow row in aTable)
        {
            Chequeo_gral_carga_Lista_Practicas datos = new Chequeo_gral_carga_Lista_Practicas();
            datos.Detalle = row.Descripcion;
            datos.Practica_Id = row.PracticaId;
            datos.Turno_Id = row.Turno_Id;
            lista.Add(datos);
        }



        return lista;

    }


}