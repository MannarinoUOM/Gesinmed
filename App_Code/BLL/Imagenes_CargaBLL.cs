using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de Imagenes_CargaBLL
/// </summary>
public class Imagenes_CargaBLL
{
	public Imagenes_CargaBLL()
	{
		//
		// TODO: Agregar aquí la lógica del constructor
		//
	}

    public List<IMG_Tipo_Imagen> Tipos()
    {
        List<IMG_Tipo_Imagen> Lista = new List<IMG_Tipo_Imagen>();
        ImagenesDALTableAdapters.H2_IMG_TIP_IMAGEN_LISTADOTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_TIP_IMAGEN_LISTADOTableAdapter();
        ImagenesDAL.H2_IMG_TIP_IMAGEN_LISTADODataTable aTable = adapter.GetData();
        foreach (ImagenesDAL.H2_IMG_TIP_IMAGEN_LISTADORow row in aTable)
        {
            IMG_Tipo_Imagen t = new IMG_Tipo_Imagen();
            t.TIMG_DESCRIPCION = row.TIMG_DESCRIPCION;
            t.TIMG_ID = row.TIMG_ID;
            Lista.Add(t);
        }
        return Lista;
    }


    public List<IMG_Tipo_Protocolo> Tipos_Protocolo(int TI)
    {
        List<IMG_Tipo_Protocolo> Lista = new List<IMG_Tipo_Protocolo>();
        ImagenesDALTableAdapters.H2_IMG_TIPO_PROTOCOLOSTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_TIPO_PROTOCOLOSTableAdapter();
        ImagenesDAL.H2_IMG_TIPO_PROTOCOLOSDataTable aTable = adapter.GetData(TI);
        foreach (ImagenesDAL.H2_IMG_TIPO_PROTOCOLOSRow row in aTable)
        {
            IMG_Tipo_Protocolo t = new IMG_Tipo_Protocolo();
            t.TPRO_DESCRIPCION = row.TPRO_DESCRIPCION;
            t.TPRO_ID = row.TPRO_ID;
            t.TPRO_PATH = row.TPRO_PATH;
            t.TPRO_TIMG_ID = row.TPRO_TIMG_ID;
            Lista.Add(t);
        }
        return Lista;
    }


    public IMG_Protocolo_Estudio Cargar_Protocolo(int Protocolo_ID)
    {
        List<IMG_Protocolo_Estudio> Lista = new List<IMG_Protocolo_Estudio>();
        ImagenesDALTableAdapters.H2_IMG_ESTUDIO_CARGARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_ESTUDIO_CARGARTableAdapter();
        ImagenesDAL.H2_IMG_ESTUDIO_CARGARDataTable aTable = adapter.GetData(Protocolo_ID);
        foreach (ImagenesDAL.H2_IMG_ESTUDIO_CARGARRow row in aTable)
        {
            IMG_Protocolo_Estudio t = new IMG_Protocolo_Estudio();
            if (!row.IsIMG_ESPECIALIDAD_IDNull()) t.IMG_ESPECIALIDAD_ID = row.IMG_ESPECIALIDAD_ID; else t.IMG_ESPECIALIDAD_ID = 0;
            if (!row.IsIMG_FECHA_INICIONull()) t.IMG_FECHA_INICIO = row.IMG_FECHA_INICIO.ToShortDateString(); else DateTime.Now.ToShortDateString();
            t.IMG_ID = row.IMG_ID;
            if (!row.IsIMG_MEDICO_IDNull()) t.IMG_MEDICO_ID = row.IMG_MEDICO_ID; else t.IMG_MEDICO_ID = 0;
            t.IMG_NUMERO = row.IMG_NUMERO;
            if (!row.IsIMG_PATHNull()) t.IMG_PATH = row.IMG_PATH; else t.IMG_PATH = "";
            if (!row.IsIMG_SOC_IDNull()) t.IMG_SOC_ID = row.IMG_SOC_ID; else t.IMG_SOC_ID = 0;
            if (!row.IsIMG_TIMG_IDNull()) t.IMG_TIMG_ID = row.IMG_TIMG_ID; else t.IMG_TIMG_ID = 0; 
            if (!row.IsIMG_TPRO_IDNull()) t.IMG_TPRO_ID = row.IMG_TPRO_ID; else t.IMG_TPRO_ID = 0;
            if (!row.IsIMG_URGENCIANull()) t.IMG_URGENCIA = row.IMG_URGENCIA; else t.IMG_URGENCIA = "N";
            t.IMG_PACIENTE = row.apellido;
            t.IMG_NHC = row.HC_UOM_CENTRAL;
            t.PACIENTE_ID = row.documento;

            Lista.Add(t);
        }
        return Lista[0];
    }

    public int Guardar(IMG_Protocolo_Estudio c)
    { 
        ImagenesDALTableAdapters.QueriesTableAdapter adatper = new ImagenesDALTableAdapters.QueriesTableAdapter();
        object R = adatper.H2_IMG_GUARDAR_PROTOCOLO_RESULTADO(c.IMG_FECHA_INICIO, c.IMG_TIMG_ID, c.IMG_TPRO_ID, c.IMG_USUARIO, c.IMG_SOC_ID, c.IMG_URGENCIA, c.IMG_ESPECIALIDAD_ID, c.IMG_MEDICO_ID, c.IMG_MEDICO_ID);
        return Convert.ToInt32(R);
    }



    public IMG_Protocolo_Estudio Cargar_Afiliado(int Afiliado_id)
    {
        List<IMG_Protocolo_Estudio> Lista = new List<IMG_Protocolo_Estudio>();
        ImagenesDALTableAdapters.H3_DATOS_GENTETableAdapter adapter = new ImagenesDALTableAdapters.H3_DATOS_GENTETableAdapter();
        ImagenesDAL.H3_DATOS_GENTEDataTable aTable = adapter.GetData(Afiliado_id);
        foreach (ImagenesDAL.H3_DATOS_GENTERow row in aTable)
        {
            IMG_Protocolo_Estudio t = new IMG_Protocolo_Estudio();            
            t.IMG_PACIENTE = row.apellido;
            t.IMG_NHC = row.HC_UOM_CENTRAL;
            t.PACIENTE_ID = row.documento;
            Lista.Add(t);
        }
        return Lista[0];
    }


    internal List<IMG_Protocolos_Buscar> Buscar(IMG_Protocolos_Buscar b)
    {
        List<IMG_Protocolos_Buscar> Lista = new List<IMG_Protocolos_Buscar>();
        ImagenesDALTableAdapters.H2_IMG_ESTUDIOS_BUSCARTableAdapter adapter = new ImagenesDALTableAdapters.H2_IMG_ESTUDIOS_BUSCARTableAdapter();
        ImagenesDAL.H2_IMG_ESTUDIOS_BUSCARDataTable aTable = adapter.GetData(Convert.ToDateTime(b.Fecha_Desde), Convert.ToDateTime(b.Fecha_Hasta), b.apellido, b.IMG_NUMERO);
        foreach (ImagenesDAL.H2_IMG_ESTUDIOS_BUSCARRow row in aTable)
        {
            try
            {
                IMG_Protocolos_Buscar t = new IMG_Protocolos_Buscar();
                t.apellido = row.apellido;
                if (!row.IsHC_UOM_CENTRALNull()) t.HC_UOM_CENTRAL = row.HC_UOM_CENTRAL;
                if (!row.IsIMG_FECHA_ACTUALNull()) t.IMG_FECHA_ACTUAL = row.IMG_FECHA_ACTUAL.ToShortDateString();
                t.IMG_ID = row.IMG_ID;
                t.IMG_NUMERO = row.IMG_NUMERO;
                t.TIMG_DESCRIPCION = row.TIMG_DESCRIPCION;
                if (!row.IsTPRO_DESCRIPCIONNull()) t.TPRO_DESCRIPCION = row.TPRO_DESCRIPCION;

                Lista.Add(t);
            }
            catch (Exception ex)
            { 
                //No hago nada
                int e = 1;
            }
        }
        return Lista;
    }
}