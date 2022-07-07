using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for SecretariadoPadronBLL
/// </summary>
namespace Hospital
{
    public class SecretariadoPadronBLL
    {
        public SecretariadoPadronBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public titular Titular(string cuil)
        {
            SecretariadoPadronDALTableAdapters.PadronTableAdapter adapter = new SecretariadoPadronDALTableAdapters.PadronTableAdapter();
            SecretariadoPadronDAL.PadronDataTable aTable = adapter.GetData(cuil);
            titular t = new titular();
            if (aTable.Rows.Count > 0)
            { 
               if (!aTable[0].Iscod_osNull()) {t.cod_os = Convert.ToInt32(aTable[0].cod_os);}
               if (!aTable[0].IscuitNull()) {t.cuit = Convert.ToInt64(aTable[0].cuit);}
               if (!aTable[0].IsSeccionalNull()) {t.seccional = Convert.ToInt32(aTable[0].Seccional);}
               if (!aTable[0].Iscuil_tituNull()) {t.cuil_titu = Convert.ToInt64(aTable[0].cuil_titu);}
               if (!aTable[0].IsFecha_altaNull()) {t.fechaalta = aTable[0].Fecha_alta.ToShortDateString();}
               if (!aTable[0].IsFecha_actualizacionNull()) { t.fechaactualizacion = aTable[0].Fecha_actualizacion.ToShortDateString(); }
               if (!aTable[0].IsFecha_bajaNull()) { t.fechabaja = aTable[0].Fecha_baja.ToShortDateString(); }
               if (!aTable[0].IsdocumentoNull()) {t.documento = Convert.ToInt32(aTable[0].documento);}
               if (!aTable[0].IsapellidoNull()) { t.apellido =aTable[0].apellido; }
               if (!aTable[0].IsSeccionalNombreNull()) { t.SeccionalNombre = aTable[0].SeccionalNombre; }
               if (!aTable[0].IsRazon_SocialNull()) { t.RazonSocial = aTable[0].Razon_Social; }

            }
            return t;
        }


        public titular Titular_Local(long cuil)
        {
            SecretariadoPadronDALTableAdapters.H2_Padron_Gente_LocalTableAdapter adapter = new SecretariadoPadronDALTableAdapters.H2_Padron_Gente_LocalTableAdapter();
            SecretariadoPadronDAL.H2_Padron_Gente_LocalDataTable aTable = adapter.GetData(cuil);
            titular t = new titular();
            if (aTable.Rows.Count > 0)
            {
                if (!aTable[0].IsCodOSNull()) { t.cod_os = Convert.ToInt32(aTable[0].CodOS); }
                if (!aTable[0].IscuitNull()) { t.cuit = Convert.ToInt64(aTable[0].cuit); }
                if (!aTable[0].IsSeccionalNull()) { t.seccional = Convert.ToInt32(aTable[0].Seccional); }
                t.cuil_titu = Convert.ToInt64(aTable[0].cuil_titu); 
                if (!aTable[0].IsFecha_AltaNull()) { t.fechaalta = aTable[0].Fecha_Alta.ToShortDateString(); }
                if (!aTable[0].IsFecha_ActualizacionNull()) { t.fechaactualizacion = aTable[0].Fecha_Actualizacion.ToShortDateString(); }
                if (!aTable[0].IsFecha_BajaNull()) { t.fechabaja = aTable[0].Fecha_Baja.ToShortDateString(); }
                t.documento = Convert.ToInt32(aTable[0].documento);
                t.apellido = aTable[0].apellido;                
                if (!aTable[0].IsRazon_SocialNull()) { t.RazonSocial = aTable[0].Razon_Social; }

            }
            return t;
        }



        public personas Persona(string Documento)
        {
            SecretariadoPadronDALTableAdapters.PersonasTableAdapter adapter = new SecretariadoPadronDALTableAdapters.PersonasTableAdapter();
            SecretariadoPadronDAL.PersonasDataTable aTable = adapter.GetData(Documento);
            personas p = new personas();
            if (aTable.Rows.Count > 0)
            {
                if (!aTable[0].Iscuil_tituNull()) {p.cuil_titu = Convert.ToInt64(aTable[0].cuil_titu);}
                if (!aTable[0].Iscod_parienteNull()) {p.cod_pariente = Convert.ToInt32(aTable[0].cod_pariente);}
                if (!aTable[0].IscuilNull()) { p.cuil = Convert.ToInt64(aTable[0].cuil); }
                if (!aTable[0].IsdocumentoNull()) {p.documento = Convert.ToInt32(aTable[0].documento);}
                if (!aTable[0].IsapellidoNull()) {p.apellido = aTable[0].apellido;}
                if (!aTable[0].IssexoNull()) { p.sexo = Convert.ToInt32(aTable[0].sexo); }
                if (!aTable[0].Isfecha_nacimientoNull()) { p.fecha_nacimiento = aTable[0].fecha_nacimiento.ToShortDateString(); }
                if (!aTable[0].IscalleNull()) { p.calle = aTable[0].calle; }
                if (!aTable[0].IsnumeroNull()) { p.numero = aTable[0].numero; }
                if (!aTable[0].IspisoNull()) { p.piso = aTable[0].piso; }
                if (!aTable[0].IsdeptoNull()) { p.depto = aTable[0].depto; }
                if (!aTable[0].IslocalidadNull()) { p.localidad = aTable[0].localidad; }
                if (!aTable[0].Iscod_posNull()) { p.cod_pos = aTable[0].cod_pos; }
                if (!aTable[0].IsprovinciaNull()) { p.provincia = Convert.ToInt32(aTable[0].provincia); }
                if (!aTable[0].IstelefonoNull()) { p.telefono = aTable[0].telefono; }
                if (!aTable[0].IsFecha_AltaNull()) { p.fechaalta = aTable[0].Fecha_Alta.ToShortDateString(); }
                if (!aTable[0].IsFecha_ActualizacionNull()) { p.fechaactualizacion = aTable[0].Fecha_Actualizacion.ToShortDateString(); }
                if (!aTable[0].IsFecha_BajaNull()) { p.fechabaja = aTable[0].Fecha_Baja.ToShortDateString(); }
                if (!aTable[0].IsfechaaltapadronNull()) { p.fechaaltapadron = aTable[0].fechaaltapadron.ToShortDateString(); }
                if (!aTable[0].IsusuarioNull()) { p.usuario = aTable[0].usuario; }
                if (!aTable[0].IsfotoNull()) { p.Foto = aTable[0].foto; }
                p.email = "";
            }
            return p;
        }



        public List<personas> Persona_Local(int Documento)
        {
            SecretariadoPadronDALTableAdapters.H2_Personas_Gente_LocalTableAdapter adapter = new SecretariadoPadronDALTableAdapters.H2_Personas_Gente_LocalTableAdapter();
            SecretariadoPadronDAL.H2_Personas_Gente_LocalDataTable aTable = adapter.GetData(Documento);
            List<personas> list = new List<personas>();
            foreach (SecretariadoPadronDAL.H2_Personas_Gente_LocalRow row in aTable.Rows)
            {
                personas p = new personas();
                p.cuil_titu = Convert.ToInt64(row.cuil_titu);
                if (!row.IsCod_ParienteNull()) { p.cod_pariente = Convert.ToInt32(row.Cod_Pariente); }
                p.cuil = Convert.ToInt64(row.cuil);
                p.documento = row.documento;
                p.documento_real = row.documento_real;
                p.tipo_docu = row.tipo_doc;
                if (!row.IsSeccionalNull()) p.SeccionalId = row.Seccional;
                else p.SeccionalId = 0;

                p.apellido = row.apellido;
                if (!row.IssexoNull()) { p.sexo = Convert.ToInt32(row.sexo); }
                if (!row.Isfecha_nacimientoNull()) 
                { 
                    p.fecha_nacimiento = row.fecha_nacimiento.ToShortDateString();
                    if (string.IsNullOrEmpty(p.fecha_nacimiento)) p.fecha_nacimiento = DateTime.Now.ToShortDateString();
                }
                else p.fecha_nacimiento = DateTime.Now.ToShortDateString();
                if (!row.IscalleNull()) { p.calle = row.calle; }
                if (!row.IsnumeroNull()) { p.numero = row.numero; }
                if (!row.IspisoNull()) { p.piso = row.piso; }
                if (!row.IsdeptoNull()) { p.depto = row.depto; }
                if (!row.IslocalidadNull()) { p.localidad = row.localidad; }
                if (!row.IsCodPostalNull()) { p.cod_pos = row.CodPostal; }
                if (!row.IsprovinciaNull()) { p.provincia = Convert.ToInt32(row.provincia); }
                if (!row.IstelefonoNull()) { p.telefono = row.telefono; }
                if (!row.IsFecha_AltaNull()) { p.fechaalta = row.Fecha_Alta.ToShortDateString(); }
                if (!row.IsFecha_ActualizacionNull()) { p.fechaactualizacion = row.Fecha_Actualizacion.ToShortDateString(); }
                if (!row.IsFecha_BajaNull()) { p.fechabaja = row.Fecha_Baja.ToShortDateString(); }
                if (!row.IsFecha_AltaNull()) { p.fechaaltapadron = row.Fecha_Alta.ToShortDateString(); }
                if (!row.IsusuarioNull()) { p.usuario = row.usuario; }
                if (!row.IsemailNull()) { p.email = row.email; }
                if (!row.IsDiscapacidadNull())
                {
                    p.discapacidad = Convert.ToInt32(row.Discapacidad);
                }
                else
                {
                    p.discapacidad = 0;
                }
                if (!row.IsFVDiscapacidadNull()) { p.FVDiscapacidad = row.FVDiscapacidad.ToShortDateString(); }
                else p.FVDiscapacidad = DateTime.Now.ToShortDateString();

                if (!row.IsCertificadoEstudianteAnioNull()) { p.AnioCertificado = row.CertificadoEstudianteAnio.ToString(); }

                if (!row.IsfotoNEWNull()) { p.Foto = row.fotoNEW; } else { p.Foto = "../img/silueta.jpg"; }

                if (!row.IsCertificadoEstudiante1Null())
                {
                    p.C1 = row.CertificadoEstudiante1;
                }
                else
                {
                    p.C1 = false;
                }

                if (!row.IsCertificadoEstudiante2Null())
                {
                    p.C2 = row.CertificadoEstudiante2;
                }
                else
                {
                    p.C2 = false;
                }


                if (!row.IsEsEstudianteNull())
                {
                    p.EsEstudiante = row.EsEstudiante;
                }
                else
                {
                    p.EsEstudiante = false;
                }


                if (!row.IsCertificadoEstudianteAnioNull()) { p.AnioCertificado = row.CertificadoEstudianteAnio.ToString(); }


                if (!row.IsPINull())
                {
                    p.PI = row.PI;
                }
                else
                {
                    p.PI = false;
                }

                if (!row.IsPMINull())
                {
                    p.PMI = row.PMI;
                }
                else
                {
                    p.PMI = false;
                }
                if (!row.IsHC_UOM_CENTRALNull())
                    p.NHC_UOM = row.HC_UOM_CENTRAL;
                else p.NHC_UOM = string.Empty;

                if (!aTable[0].IsUsu_AltaNull()) p.UsuAlta = aTable[0].Usu_Alta;
                else p.UsuAlta = string.Empty;

                if (!aTable[0].IsUsu_ActualizoNull()) p.UsuModi = aTable[0].Usu_Actualizo;
                else p.UsuModi = string.Empty;

                if (!aTable[0].IsEstadoCivilNull()) p.EstadoCivil = aTable[0].EstadoCivil;
                else p.EstadoCivil = string.Empty;
                if (!aTable[0].IsNacionalidadNull()) p.Nacionalidad = aTable[0].Nacionalidad;
                else p.Nacionalidad = string.Empty;

                if (!aTable[0].IsNroCarnetNull()) p.NroCarnet = aTable[0].NroCarnet;
                else p.NroCarnet = string.Empty;

                if (!aTable[0].IscelularNull()) p.Celular = aTable[0].celular;
                else p.Celular = string.Empty;

                TimeSpan ts = DateTime.Now.Date - DateTime.Parse(p.fecha_nacimiento);
                //p.fec = DateTime.Parse(p.fecha_nacimiento).Year;

                int anios = ts.Days / 365;
                int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                //int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
                string str_anios, str_meses;

                if (anios != 1) str_anios = " Años ";
                else str_anios = " Año ";
                if (meses != 1) str_meses = " Meses ";
                else str_meses = " Mes ";

                p.Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

                list.Add(p);
            }
            return list;
        }


        public personas Persona_Local_ID(long Id)
        {
            try
            {
                SecretariadoPadronDALTableAdapters.H2_Personas_Gente_Local_IDTableAdapter adapter = new SecretariadoPadronDALTableAdapters.H2_Personas_Gente_Local_IDTableAdapter();
                SecretariadoPadronDAL.H2_Personas_Gente_Local_IDDataTable aTable = adapter.GetData(Id);
                personas p = new personas();
                if (aTable.Rows.Count > 0)
                {
                    p.cuil_titu = Convert.ToInt64(aTable[0].cuil_titu);
                    if (!aTable[0].IsCod_ParienteNull()) { p.cod_pariente = Convert.ToInt32(aTable[0].Cod_Pariente); }
                    p.cuil = Convert.ToInt64(aTable[0].cuil);
                    p.documento = aTable[0].documento;
                    p.documento_real = aTable[0].documento_real;
                    p.tipo_docu = aTable[0].tipo_doc;

                    if (!aTable[0].IsSeccionalNull())
                        p.SeccionalId = aTable[0].Seccional;
                    else p.SeccionalId = 998;

                    if (!aTable[0].IsCodOSNull())
                        p.ObraSocialId = aTable[0].CodOS;
                    else p.ObraSocialId = 0;

                    p.apellido = aTable[0].apellido;
                    if (!aTable[0].IssexoNull()) { p.sexo = Convert.ToInt32(aTable[0].sexo); }

                    if (!aTable[0].Isfecha_nacimientoNull()) { p.fecha_nacimiento = aTable[0].fecha_nacimiento.ToShortDateString(); }
                    else p.fecha_nacimiento = DateTime.Now.ToShortDateString();

                    if (!aTable[0].IscalleNull()) { p.calle = aTable[0].calle; }
                    if (!aTable[0].IsnumeroNull()) { p.numero = aTable[0].numero; }
                    if (!aTable[0].IspisoNull()) { p.piso = aTable[0].piso; }
                    if (!aTable[0].IsdeptoNull()) { p.depto = aTable[0].depto; }
                    if (!aTable[0].IslocalidadNull()) { p.localidad = aTable[0].localidad; }
                    if (!aTable[0].IsCodPostalNull()) { p.cod_pos = aTable[0].CodPostal; }
                    if (!aTable[0].IsprovinciaNull()) { p.provincia = Convert.ToInt32(aTable[0].provincia); }
                    if (!aTable[0].IstelefonoNull()) { p.telefono = aTable[0].telefono; }
                    if (!aTable[0].IsFecha_AltaNull()) { p.fechaalta = aTable[0].Fecha_Alta.ToShortDateString(); }
                    if (!aTable[0].IsFecha_ActualizacionNull()) { p.fechaactualizacion = aTable[0].Fecha_Actualizacion.ToShortDateString(); }
                    if (!aTable[0].IsFecha_BajaNull()) { p.fechabaja = aTable[0].Fecha_Baja.ToShortDateString(); }
                    if (!aTable[0].IsFecha_AltaNull()) { p.fechaaltapadron = aTable[0].Fecha_Alta.ToShortDateString(); }
                    if (!aTable[0].IsusuarioNull()) { p.usuario = aTable[0].usuario; }
                    if (!aTable[0].IsemailNull()) { p.email = aTable[0].email; }
                    if (!aTable[0].IsDiscapacidadNull())
                    {
                        p.discapacidad = Convert.ToInt32(aTable[0].Discapacidad);
                    }
                    else
                    {
                        p.discapacidad = 0;
                    }
                    if (!aTable[0].IsFVDiscapacidadNull()) { p.FVDiscapacidad = aTable[0].FVDiscapacidad.ToShortDateString(); }
                    else p.FVDiscapacidad = DateTime.Now.ToShortDateString();

                    if (!aTable[0].IsCertificadoEstudianteAnioNull()) { p.AnioCertificado = aTable[0].CertificadoEstudianteAnio.ToString(); }
                    // aca la foto
                    //if (!aTable[0].IsfotoNull()) { p.Foto = aTable[0].foto; }
                    if (!aTable[0].IsfotoNEWNull()) { p.Foto = aTable[0].fotoNEW; }

                    if (!aTable[0].IsCertificadoEstudiante1Null())
                    {
                        p.C1 = aTable[0].CertificadoEstudiante1;
                    }
                    else
                    {
                        p.C1 = false;
                    }

                    if (!aTable[0].IsCertificadoEstudiante2Null())
                    {
                        p.C2 = aTable[0].CertificadoEstudiante2;
                    }
                    else
                    {
                        p.C2 = false;
                    }


                    if (!aTable[0].IsEsEstudianteNull())
                    {
                        p.EsEstudiante = aTable[0].EsEstudiante;
                    }
                    else
                    {
                        p.EsEstudiante = false;
                    }


                    if (!aTable[0].IsCertificadoEstudianteAnioNull()) { p.AnioCertificado = aTable[0].CertificadoEstudianteAnio.ToString(); }


                    if (!aTable[0].IsPINull())
                    {
                        p.PI = aTable[0].PI;
                    }
                    else
                    {
                        p.PI = false;
                    }

                    if (!aTable[0].IsPMINull())
                    {
                        p.PMI = aTable[0].PMI;
                    }
                    else
                    {
                        p.PMI = false;
                        p.FechaPMI = string.Empty;
                    }

                    if (!aTable[0].IsFV_PMINull()) p.FechaPMI = aTable[0].FV_PMI.ToShortDateString();
                    else p.FechaPMI = string.Empty;

                    if (!aTable[0].IsHC_UOM_CENTRALNull())
                        p.NHC_UOM = aTable[0].HC_UOM_CENTRAL;
                    else p.NHC_UOM = string.Empty;

                    if (!aTable[0].IsEstadoCivilNull()) p.EstadoCivil = aTable[0].EstadoCivil;
                    else p.EstadoCivil = string.Empty;
                    if (!aTable[0].IsNacionalidadNull()) p.Nacionalidad = aTable[0].Nacionalidad;
                    else p.Nacionalidad = string.Empty;

                    if (!aTable[0].IsNroCarnetNull()) p.NroCarnet = aTable[0].NroCarnet;
                    else p.NroCarnet = string.Empty;

                    if (!aTable[0].IscelularNull()) p.Celular = aTable[0].celular;
                    else p.Celular = string.Empty;

                    if (!aTable[0].IsUsu_AltaNull()) p.UsuAlta = aTable[0].Usu_Alta;
                    else p.UsuAlta = string.Empty;

                    if (!aTable[0].IsUsu_ActualizoNull()) p.UsuModi = aTable[0].Usu_Actualizo;
                    else p.UsuModi = string.Empty;

                    if (!aTable[0].IscuitNull()) p.cuit = aTable[0].cuit;
                    else p.cuit = 0;

                    TimeSpan ts = DateTime.Now.Date - DateTime.Parse(p.fecha_nacimiento);
                    //.fec = p.fecha_nacimiento.Year;

                    int anios = ts.Days / 365;
                    int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                    string str_anios, str_meses;

                    if (anios != 1) str_anios = " Años ";
                    else str_anios = " Año ";
                    if (meses != 1) str_meses = " Meses ";
                    else str_meses = " Mes ";

                    p.Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

                    if (!aTable[0].IsAlto_RiesgoNull()) p.Alto_Riesgo = aTable[0].Alto_Riesgo;
                    else p.Alto_Riesgo = false;

                }
                return p;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }



        public List<personas> PersonaXApellido(string Apellido)
        {
            List<personas> Lista = new List<personas>();
            if (Apellido.Length > 5)
            {
                SecretariadoPadronDALTableAdapters.BuscarPersonasApellidoTableAdapter adapter = new SecretariadoPadronDALTableAdapters.BuscarPersonasApellidoTableAdapter();
                SecretariadoPadronDAL.BuscarPersonasApellidoDataTable aTable = adapter.GetData(Apellido);
                
                foreach (SecretariadoPadronDAL.BuscarPersonasApellidoRow row in aTable.Rows)
                {
                    personas p = new personas();
                    if (!row.IsapellidoNull()) p.apellido = row.apellido;
                    p.documento = Convert.ToInt32(row.documento);
                    if (!row.IstelefonoNull() && row.telefono.Length > 5) p.telefono = row.telefono; else p.telefono = "";
                    if (!row.IsTitularNull()) p.titular = row.Titular; else p.titular = "";
                    p.cuil = Convert.ToInt64(row.cuil);
                    Lista.Add(p);
                }
                
            }
            return Lista;
        }

        public List<personas> PersonaXApellidoSN(string Apellido)
        {
            List<personas> Lista = new List<personas>();
            if (Apellido.Length > 5)
            {
                SecretariadoPadronDALTableAdapters.BuscarPersonasApellidoSNTableAdapter adapter = new SecretariadoPadronDALTableAdapters.BuscarPersonasApellidoSNTableAdapter();
                SecretariadoPadronDAL.BuscarPersonasApellidoSNDataTable aTable = adapter.GetData(Apellido);

                foreach (SecretariadoPadronDAL.BuscarPersonasApellidoSNRow row in aTable.Rows)
                {
                    personas p = new personas();
                    p.apellido = row.apellido;
                    p.ObraSocial = row.Os;
                    p.documento = Convert.ToInt32(row.documento);
                    if (!row.IstelefonoNull() && row.telefono.Length > 5) p.telefono = row.telefono; else p.telefono = "";
                    if (!row.IsTitularNull()) p.titular = row.Titular; else p.titular = "";
                    p.cuil = Convert.ToInt64(row.cuil);
                    Lista.Add(p);
                }

            }
            return Lista;
        }



        public personas PersonaXCUIL(string CUIL)
        {
            personas p = new personas();
            List<personas> Lista = new List<personas>();
            if (CUIL.Length > 9)
            {
                SecretariadoPadronDALTableAdapters.BuscarPersonasCUILTableAdapter adapter = new SecretariadoPadronDALTableAdapters.BuscarPersonasCUILTableAdapter();
                SecretariadoPadronDAL.BuscarPersonasCUILDataTable aTable = adapter.GetData(CUIL);
                
                if (aTable.Rows.Count > 0)
                {
                    if (!aTable[0].IsapellidoNull()) p.apellido = aTable[0].apellido;
                    p.documento = Convert.ToInt32(aTable[0].documento);
                    if (!aTable[0].IstelefonoNull() && aTable[0].telefono.Length > 5) p.telefono = aTable[0].telefono; else p.telefono = "";
                    if (!aTable[0].IsTitularNull()) p.titular = aTable[0].Titular; else p.titular = "";
                    p.cuil = Convert.ToInt64(aTable[0].cuil);                    
                }
              }
            return p;
        }


        public personas PersonaXCUIL_Local(Int64 CUIL)
        {
            personas p = new personas();
            if (CUIL > 0)
            {
                SecretariadoPadronDALTableAdapters.H2_Persona_Gente_Local_NHCTableAdapter adapter = new SecretariadoPadronDALTableAdapters.H2_Persona_Gente_Local_NHCTableAdapter();
                SecretariadoPadronDAL.H2_Persona_Gente_Local_NHCDataTable aTable = adapter.GetData(CUIL);

                if (aTable.Rows.Count > 0)
                {
                    p.apellido = aTable[0].apellido;
                    p.documento = Convert.ToInt32(aTable[0].documento);
                    if (!aTable[0].IstelefonoNull() && aTable[0].telefono.Length > 5) p.telefono = aTable[0].telefono; else p.telefono = "";
                    if (!aTable[0].IsTitularNull()) p.titular = aTable[0].Titular; else p.titular = "";
                    p.cuil = Convert.ToInt64(aTable[0].cuil);
                }
            }
            return p;
        }



        public personas PersonaXDOCUMENTO(string DOCUMENTO)
        {
            personas p = new personas();
            List<personas> Lista = new List<personas>();
            if (DOCUMENTO.Length > 6)
            {
                SecretariadoPadronDALTableAdapters.BuscarPersonasDocumentoTableAdapter adapter = new SecretariadoPadronDALTableAdapters.BuscarPersonasDocumentoTableAdapter();
                SecretariadoPadronDAL.BuscarPersonasDocumentoDataTable aTable = adapter.GetData(DOCUMENTO);

                if (aTable.Rows.Count > 0)
                {
                    if (!aTable[0].IsapellidoNull()) p.apellido = aTable[0].apellido;
                    p.documento = Convert.ToInt32(aTable[0].documento);
                    if (!aTable[0].IstelefonoNull() && aTable[0].telefono.Length > 5) p.telefono = aTable[0].telefono; else p.telefono = "";
                    if (!aTable[0].IsTitularNull()) p.titular = aTable[0].Titular; else p.titular = "";
                    p.cuil = Convert.ToInt64(aTable[0].cuil);
                }
            }
            return p;
        }


        public List<codpariente> Parentesco(int Cod)
        {
            List<codpariente> Lista = new List<codpariente>();

            SecretariadoPadronDALTableAdapters.H2_Padron_ParentescoTableAdapter adapter = new SecretariadoPadronDALTableAdapters.H2_Padron_ParentescoTableAdapter();
            SecretariadoPadronDAL.H2_Padron_ParentescoDataTable aTable = adapter.GetData(Cod);

                foreach (SecretariadoPadronDAL.H2_Padron_ParentescoRow row in aTable.Rows)
                {
                    codpariente c = new codpariente();
                    c.codigo = Convert.ToInt32(row.cod);
                    c.descripcion = row.descri;
                    Lista.Add(c);
                }

            return Lista;
        }


        public List<codprovincias> Provincias(int Cod)
        {
            List<codprovincias> Lista = new List<codprovincias>();

            SecretariadoPadronDALTableAdapters.H2_Padron_ProvinciaTableAdapter adapter = new SecretariadoPadronDALTableAdapters.H2_Padron_ProvinciaTableAdapter();
            SecretariadoPadronDAL.H2_Padron_ProvinciaDataTable aTable = adapter.GetData(Cod);

            foreach (SecretariadoPadronDAL.H2_Padron_ProvinciaRow row in aTable.Rows)
            {
                codprovincias c = new codprovincias();
                c.codigo = Convert.ToInt32(row.cod);
                c.descripcion = row.descri;
                Lista.Add(c);
            }

            return Lista;
        }


        public empresas Empresa(string CUIT)
        {
            SecretariadoPadronDALTableAdapters.H2_Empresas_CUITTableAdapter adapter = new SecretariadoPadronDALTableAdapters.H2_Empresas_CUITTableAdapter();
            SecretariadoPadronDAL.H2_Empresas_CUITDataTable aTable = adapter.GetData(CUIT);

            empresas e = new empresas();
            if (aTable.Rows.Count > 0)
            {
                if (!aTable[0].IsCuitNull()) { e.cuit = aTable[0].Cuit; }
                if (!aTable[0].IsNUMERONull()) {e.numero = Convert.ToInt32(aTable[0].NUMERO);}
                if (!aTable[0].IsRazon_SocialNull()) { e.razonsocial = aTable[0].Razon_Social; }         
            }

            return e;
        }

        public string Vencido(string CUIL)
        {

            SecretariadoPadronDALTableAdapters.QueriesTableAdapter adapter = new SecretariadoPadronDALTableAdapters.QueriesTableAdapter();
            object R = adapter.Vencimiento(CUIL);
            DateTime Fecha = DateTime.Now;
            if (R != null)
            {
                if (DateTime.TryParse(R.ToString(), out Fecha))
                {
                    return Fecha.ToShortDateString();
                }
                else
                {
                    return "";
                }
            }
            else
            {
                return "";
            }

        }

        public bool UltimoAporte_OK(int Documento) //true = si esta ok 0 a 3 meses, false = si es null (no existe) o supero los 3 meses de dif.
        {
            SecretariadoPadronDALTableAdapters.QueriesTableAdapter adapter = new SecretariadoPadronDALTableAdapters.QueriesTableAdapter();
            object Dif_Meses = null;
            try
            {
                Dif_Meses = adapter.UltimoAporte_OK(Documento);
            }
            catch
            {
                Dif_Meses = 3;
            }
            int meses;
            if (Dif_Meses != null)
            {
                if (int.TryParse(Dif_Meses.ToString(), out meses))
                {
                    if (meses > 3) return false;
                    else return true;
                }
                else return false;
            }
            else return false;
        }

    }
}


