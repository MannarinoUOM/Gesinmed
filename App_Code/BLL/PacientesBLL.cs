using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;


/// <summary>
/// Summary description for PacientesBLL
/// </summary>
namespace Hospital
{
    public class PacientesBLL
    {
        public PacientesBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<TipoDoc> ListTipo_Doc()
        {
            List<TipoDoc> lista = new List<TipoDoc>();
            PacientesDALTableAdapters.H2_GENTE_TIPO_DOCTableAdapter adapter = new PacientesDALTableAdapters.H2_GENTE_TIPO_DOCTableAdapter();
            PacientesDAL.H2_GENTE_TIPO_DOCDataTable aTable = adapter.GetData();
            foreach (PacientesDAL.H2_GENTE_TIPO_DOCRow row in aTable.Rows)
            {
                TipoDoc o = new TipoDoc();
                o.Descripcion = row.Tipo;
                o.Id = row.Codigo;
                lista.Add(o);
            }
            return lista;
        }

        public List<pacientes> Paciente_NHC(long NHC)
        {
            List<pacientes> lista = new List<pacientes>();
            PacientesDALTableAdapters.H2_Afiliado_Encabezado_NHCTableAdapter adapter = new PacientesDALTableAdapters.H2_Afiliado_Encabezado_NHCTableAdapter();
            PacientesDAL.H2_Afiliado_Encabezado_NHCDataTable aTable = adapter.GetData(NHC);

            int pos = 0;
            pacientes p = new pacientes();
            foreach (PacientesDAL.H2_Afiliado_Encabezado_NHCRow row in aTable.Rows)
            {
                pos++;
                p.Nro_Busqueda = pos;
                p.cuil_titu = row.cuil_titu;
                p.cuil = row.cuil;
                if (!row.IsfotoNEWNull()) { p.Foto = row.fotoNEW; }

                if (!row.IsLocalidadNull()) { p.localidad = row.Localidad; }

                if (!row.Isfecha_nacimientoNull()) p.fecha_nacimiento = row.fecha_nacimiento;
                if (!row.IsSeccionalNull()) p.Seccional = row.Seccional;
                if (!row.IsNro_SeccionalNull()) p.Nro_Seccional = row.Nro_Seccional.ToString(); else p.Nro_Seccional = "999";

                if (!row.IscalleNull())
                {
                    if (!row.IsnumeroNull())
                    {
                        p.calle = row.calle + " " + row.numero;
                    }
                    p.calle = row.calle;
                }

                TimeSpan ts = DateTime.Now.Date - p.fecha_nacimiento;

                int anios = ts.Days / 365;
                int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                //int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
                string str_anios, str_meses;

                if (anios != 1) str_anios = " Años ";
                else str_anios = " Año ";
                if (meses != 1) str_meses = " Meses ";
                else str_meses = " Mes ";

                p.Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

                p.Paciente = row.apellido;
                p.documento = row.documento;

                p.documento_real = row.documento_real;
                p.TipoDoc = row.cod_tipo;

                if (!row.IstelefonoNull()) p.Telefono = row.telefono;

                p.Titular = "";
                p.NHC = row.cuil;

                p.ObraSocial = row.OS;
                p.OSId = row.OSId;

                if (!row.IsPMINull()) { p.PMI = row.PMI; } else { p.PMI = false; }
                if (!row.IsPINull()) { p.PI = row.PI; } else { p.PI = false; }

                if (!row.IsDiscapacidadNull())
                {
                    p.Discapacidad = Convert.ToInt32(row.Discapacidad);

                }
                else
                {
                    p.Discapacidad = 0;
                }

                if (!row.IsfotoNEWNull()) { p.Foto = row.fotoNEW; }
                lista.Add(p);
            }

            return lista;
        }

        public List<pacientes> Paciente_NHC_UOM(string NHC)
            
{
            List<pacientes> lista = new List<pacientes>();
            PacientesDALTableAdapters.H2_Afiliado_Encabezado_NHC_UOM_HOSPTableAdapter adapter = new PacientesDALTableAdapters.H2_Afiliado_Encabezado_NHC_UOM_HOSPTableAdapter();
            PacientesDAL.H2_Afiliado_Encabezado_NHC_UOM_HOSPDataTable aTable = adapter.GetData(NHC);

            int pos = 0;
            //pacientes p = new pacientes();
            foreach (PacientesDAL.H2_Afiliado_Encabezado_NHC_UOM_HOSPRow row in aTable.Rows)
            {
                pacientes p = new pacientes();
                pos++;
                p.Nro_Busqueda = pos;
                p.cuil_titu = row.cuil_titu;
                p.cuil = row.cuil;
                p.CUIT = row.Cuit;

                if (!row.IsLocalidadNull()) { p.localidad = row.Localidad; }

                if (!row.Isfecha_nacimientoNull()) p.fecha_nacimiento = row.fecha_nacimiento;
                if (!row.IsSeccionalNull()) p.Seccional = row.Seccional;
                if (!row.IsNro_SeccionalNull()) p.Nro_Seccional = row.Nro_Seccional.ToString(); else p.Nro_Seccional = "999";

                if (!row.IscalleNull())
                {
                    if (!row.IsnumeroNull())
                    {
                        p.calle = row.calle + " " + row.numero;
                    }
                    p.calle = row.calle;
                }

                TimeSpan ts = DateTime.Now.Date - p.fecha_nacimiento;

                int anios = ts.Days / 365;
                int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                //int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
                string str_anios, str_meses;

                if (anios != 1) str_anios = " Años ";
                else str_anios = " Año ";
                if (meses != 1) str_meses = " Meses ";
                else str_meses = " Mes ";

                p.Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

                p.Paciente = row.apellido;
                p.documento = row.documento;

                p.documento_real = row.documento_real;
                p.TipoDoc = row.cod_tipo;

                if (!row.IstelefonoNull()) p.Telefono = row.telefono;
                if (!row.IsCelularNull()) p.Celular = row.Celular;

                p.Titular = "";
                p.NHC = row.cuil;

                p.ObraSocial = row.OS;
                p.OSId = row.OSId;

                if (!row.IsFV_PMINull())
                    p.FechaPMI = row.FV_PMI.ToShortDateString();
                else p.FechaPMI = string.Empty;

                if (!row.IsPMINull()) { p.PMI = row.PMI; } else { p.PMI = false; p.FechaPMI = string.Empty; }
                if (!row.IsPINull()) { p.PI = row.PI; } else { p.PI = false; }


                p.PagaBono = true;

                if (anios == 0) p.PagaBono = false; //Menor a 1 año, no paga
                if (!row.IsFV_PMINull())
                    if (row.FV_PMI >= DateTime.Now) p.PagaBono = false; //tiene PMI, no paga

                if (!row.IsDiscapacidadNull())
                {
                    p.Discapacidad = Convert.ToInt32(row.Discapacidad);
                    p.PagaBono = false; //No paga discapacitado
                }
                else
                {
                    p.Discapacidad = 0;
                }

                if (!row.IsHC_UOM_CENTRALNull())
                    p.NHC_UOM = row.HC_UOM_CENTRAL;
                else p.NHC_UOM = string.Empty;

                if (!row.IsObservacionesNull())
                    p.Observaciones = row.Observaciones;
                else p.Observaciones = string.Empty;

                if (!row.IsFecha_BajaNull())
                {
                    p.FechaVencido = row.Fecha_Baja.ToShortDateString();
                   // if (DateTime.Parse(p.FechaVencido) <= DateTime.Now) p.Vencido = true;
                    if (DateTime.Parse(p.FechaVencido) <= DateTime.Now && DateTime.Parse(p.FechaVencido).ToShortDateString() != DateTime.Parse("01/01/1900").ToShortDateString()) p.Vencido = true;
                    else p.Vencido = false;
                }
                else p.Vencido = false;

                if (!row.IsfotoNull()) p.Foto = row.foto;
                if (!row.IsSoc_IdNull()) p.Soc_Id = row.Soc_Id;

                if (!row.IsAlto_RiesgoNull()) { p.Alto_Riesgo = row.Alto_Riesgo; } else { p.Alto_Riesgo = false; }

                if (!row.IsfotoNEWNull()) { p.Foto = row.fotoNEW; }

                p.deuda = row.deuda.ToString();

                lista.Add(p);
            }

            return lista;
        }

        public List<pacientes> Paciente_ID_Diabetes(long ID)
        {
            List<pacientes> lista = new List<pacientes>();
            PacientesDALTableAdapters.H2_Afiliado_Encabezado_ID1TableAdapter adapter = new PacientesDALTableAdapters.H2_Afiliado_Encabezado_ID1TableAdapter();
            PacientesDAL.H2_Afiliado_Encabezado_ID1DataTable aTable = adapter.GetData(ID);

            int pos = 0;
            pacientes p = new pacientes();
            foreach (PacientesDAL.H2_Afiliado_Encabezado_ID1Row row in aTable.Rows)
            {
                pos++;
                p.Nro_Busqueda = pos;
                p.cuil_titu = row.cuil_titu;
                p.cuil = row.cuil;
                if (!row.IsFecha_BajaNull())
                    p.Fecha_Baja = row.Fecha_Baja;
                else p.Fecha_Baja = Convert.ToDateTime("01/01/1900");

                if (p.Fecha_Baja <= DateTime.Now && !p.Fecha_Baja.ToShortDateString().Equals("01/01/1900")) p.Vencido = true;
                else p.Vencido = false;

                p.FechaVencido = p.Fecha_Baja.ToShortDateString();

                if (!row.IsLocalidadNull()) { p.localidad = row.Localidad; }

                if (!row.Isfecha_nacimientoNull()) p.fecha_nacimiento = row.fecha_nacimiento;
                if (!row.IsSeccionalNull()) p.Seccional = row.Seccional;
                if (!row.IsNro_SeccionalNull()) p.Nro_Seccional = row.Nro_Seccional.ToString(); else p.Nro_Seccional = "999";

                if (!row.IscalleNull())
                {
                    if (!row.IsnumeroNull())
                    {
                        p.calle = row.calle + " " + row.numero;
                    }
                    p.calle = row.calle;
                }

                TimeSpan ts = DateTime.Now.Date - p.fecha_nacimiento;

                int anios = ts.Days / 365;
                int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                //int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
                string str_anios, str_meses;

                if (anios != 1) str_anios = " Años ";
                else str_anios = " Año ";
                if (meses != 1) str_meses = " Meses ";
                else str_meses = " Mes ";

                p.Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

                p.Paciente = row.apellido;
                p.documento = row.documento;

                p.documento_real = row.documento_real;
                p.TipoDoc = row.cod_tipo;

                if (!row.IstelefonoNull()) p.Telefono = row.telefono;

                p.Titular = "";
                p.NHC = row.cuil;

                p.ObraSocial = row.OS;
                p.OSId = row.OSId;

                if (!row.IsPMINull()) { p.PMI = row.PMI; } else { p.PMI = false; }
                if (!row.IsPINull()) { p.PI = row.PI; } else { p.PI = false; }

                if (!row.IsDiscapacidadNull())
                {
                    p.Discapacidad = Convert.ToInt32(row.Discapacidad);

                }
                else
                {
                    p.Discapacidad = 0;
                }

                if (!row.IsHC_UOM_CENTRALNull())
                    p.NHC_UOM = row.HC_UOM_CENTRAL;
                else p.NHC_UOM = string.Empty;


                lista.Add(p);
            }

            return lista;
        }



        public List<pacientes> Paciente_ID(long ID)
            {
            List<pacientes> lista = new List<pacientes>();
            PacientesDALTableAdapters.H2_Afiliado_Encabezado_IDTableAdapter adapter = new PacientesDALTableAdapters.H2_Afiliado_Encabezado_IDTableAdapter();
            PacientesDAL.H2_Afiliado_Encabezado_IDDataTable aTable = adapter.GetData(ID);

            int pos = 0;
            pacientes p = new pacientes();
            foreach (PacientesDAL.H2_Afiliado_Encabezado_IDRow row in aTable.Rows)
            {
                pos++;
                p.Nro_Busqueda = pos;
                p.cuil_titu = row.cuil_titu;
                p.cuil = row.cuil;
                p.cod_pariente = row.Cod_Pariente.ToString();
                p.CUIT = row.Cuit;

                if (!row.IsFecha_BajaNull())
                    p.Fecha_Baja = row.Fecha_Baja;
                else p.Fecha_Baja = Convert.ToDateTime("01/01/1900");

                //if (p.Fecha_Baja <= DateTime.Now && !p.Fecha_Baja.ToShortDateString().Equals("01/01/1900")) p.Vencido = true;


                if (p.Fecha_Baja <= DateTime.Now && p.Fecha_Baja.ToShortDateString() != DateTime.Parse("01/01/1900").ToShortDateString()) p.Vencido = true;
                else p.Vencido = false;

                p.FechaVencido = p.Fecha_Baja.ToShortDateString();

                if (!row.IsLocalidadNull()) { p.localidad = row.Localidad; }

                if (!row.Isfecha_nacimientoNull()) p.fecha_nacimiento = row.fecha_nacimiento;
                if (!row.IsSeccionalNull()) p.Seccional = row.Seccional;
                if (!row.IsNro_SeccionalNull()) p.Nro_Seccional = row.Nro_Seccional.ToString(); else p.Nro_Seccional = "999";

                if (!row.IscalleNull())
                {
                    if (!row.IsnumeroNull())
                    {
                        p.calle = row.calle + " " + row.numero;
                    }
                    p.calle = row.calle;
                }

                TimeSpan ts = DateTime.Now.Date - p.fecha_nacimiento;
                p.fec = p.fecha_nacimiento.Year;

                int anios = ts.Days / 365;
                int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                //int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
                string str_anios, str_meses;

                if (anios != 1) str_anios = " Años ";
                else str_anios = " Año ";
                if (meses != 1) str_meses = " Meses ";
                else str_meses = " Mes ";

                p.Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

                p.Paciente = row.apellido;
                p.documento = row.documento;

                p.documento_real = row.documento_real;
                p.TipoDoc = row.cod_tipo;

                if (!row.IstelefonoNull()) p.Telefono = row.telefono;
                if (!row.IsCelularNull()) p.Celular = row.Celular;

                p.Titular = "";
                p.NHC = row.cuil;

                p.ObraSocial = row.OS;
                p.OSId = row.OSId;

                if (!row.IsPMINull()) { p.PMI = row.PMI; } else { p.PMI = false; }
                if (!row.IsPINull()) { p.PI = row.PI; } else { p.PI = false; }

                p.PagaBono = true;

                if (anios == 0) p.PagaBono = false; //Menor a 1 año, no paga
                if (!row.IsFV_PMINull())
                    if (row.FV_PMI >= DateTime.Now) p.PagaBono = false; //tiene PMI, no paga

                if (!row.IsDiscapacidadNull())
                {
                    p.Discapacidad = Convert.ToInt32(row.Discapacidad);
                    p.PagaBono = false; //No paga discapacitado
                }
                else
                {
                    p.Discapacidad = 0;
                }

                if (!row.IsHC_UOM_CENTRALNull())
                    p.NHC_UOM = row.HC_UOM_CENTRAL;
                else p.NHC_UOM = string.Empty;

                if (!row.IsObservacionesNull()) p.Observaciones = row.Observaciones;
                else p.Observaciones = string.Empty;

                if (!row.IssexoNull()) p.sexo = row.sexo;
                else p.sexo = string.Empty;

                if (!row.IsfotoNull()) p.Foto = row.foto;
                if (!row.IsSoc_IdNull()) p.Soc_Id = row.Soc_Id;
                if (!row.IsAlto_RiesgoNull()) { p.Alto_Riesgo = row.Alto_Riesgo; } else { p.Alto_Riesgo = false; }

                if (!row.IsfotoNEWNull()) { p.Foto = row.fotoNEW; }

                p.deuda = row.deuda.ToString();

                lista.Add(p);
            }

            return lista;
        }


        public int Actualizar_telefono_seccional(string Telefono, int Seccional, int documento, int CodOS)
        {
            PacientesDALTableAdapters.QueriesTableAdapter adapter = new PacientesDALTableAdapters.QueriesTableAdapter();
            object resultado = adapter.H2_Gente_Actualizar_Tel_Secc(Telefono, Seccional, documento, CodOS);
            return Convert.ToInt32(resultado);
        }

        public long Gente_UltimoDocumento_RecienNacido()
        {
            GenteDALTableAdapters.QueriesTableAdapter adapter = new GenteDALTableAdapters.QueriesTableAdapter();
            object documento_obj = adapter.H2_Gente_UltimoDocumento_RecienNacido();
            if (documento_obj != null)
                return Convert.ToInt64(documento_obj.ToString());
            else throw new Exception("Error al obtener número de documento");
        }



        public List<pacientes> Paciente_DOC(Int32 DOC, string T_Doc)
        {
            List<pacientes> lista = new List<pacientes>();
            PacientesDALTableAdapters.H2_Afiliado_Encabezado_DOCTableAdapter adapter = new PacientesDALTableAdapters.H2_Afiliado_Encabezado_DOCTableAdapter();
            PacientesDAL.H2_Afiliado_Encabezado_DOCDataTable aTable = adapter.GetData(DOC, T_Doc);

            int pos = 0;
            pacientes p = new pacientes();
            foreach (PacientesDAL.H2_Afiliado_Encabezado_DOCRow row in aTable.Rows)
            {
                pos++;
                p.Nro_Busqueda = pos;
                p.cuil_titu = row.cuil_titu;
                p.cuil = row.cuil;
                if (!row.IsFecha_BajaNull())
                    p.Fecha_Baja = row.Fecha_Baja;
                else p.Fecha_Baja =  DateTime.Parse("01/01/1900");

                if ((p.Fecha_Baja <= DateTime.Now && p.Fecha_Baja.ToShortDateString().ToString() != DateTime.Parse("01/01/1900").ToShortDateString())) { p.Vencido = true; }
                else { p.Vencido = false; }

                p.FechaVencido = p.Fecha_Baja.ToShortDateString();

                if (!row.IsCod_ParienteNull())
                    p.cod_pariente = row.Cod_Pariente.ToString();
                else p.cod_pariente = string.Empty;

                if (!row.IsTipo_docNull()) p.TipoDoc = row.cod_tipo;
                else p.TipoDoc = string.Empty;

                if (!row.Isfecha_nacimientoNull()) p.fecha_nacimiento = row.fecha_nacimiento;

                TimeSpan ts = DateTime.Now.Date - p.fecha_nacimiento;
                p.fec = p.fecha_nacimiento.Year;

                int anios = ts.Days / 365;
                int meses = Convert.ToInt32((ts.Days - (anios * 365)) / 30.4167);
                //int Dias = Convert.ToInt32((ts.Days - (anios * 365)) - (meses * 30.4167));
                string str_anios, str_meses;

                if (anios != 1) str_anios = " Años ";
                else str_anios = " Año ";
                if (meses != 1) str_meses = " Meses ";
                else str_meses = " Mes ";

                p.Edad_Format = anios.ToString() + str_anios + meses.ToString() + str_meses;

                p.PagaBono = true;

                if (anios == 0) p.PagaBono = false; //Menor a 1 año, no paga
                if (!row.IsFV_PMINull())
                    if (row.FV_PMI >= DateTime.Now) p.PagaBono = false; //tiene PMI, no paga

                p.documento_real = row.documento_real;

                p.documento = row.documento;
                if (!row.IsSeccionalNull()) p.Seccional = row.Seccional;

                if (!row.IsLocalidadNull()) { p.localidad = row.Localidad; }

                p.Paciente = row.apellido;

                if (!row.IsNro_SeccionalNull()) p.Nro_Seccional = row.Nro_Seccional.ToString(); else p.Nro_Seccional = "999";

                if (!row.IstelefonoNull()) p.Telefono = row.telefono;
                if (!row.IsCelularNull()) p.Celular = row.Celular;
                p.Titular = "";

                if (!row.IsOSNull())
                    p.ObraSocial = row.OS;
                else p.ObraSocial = string.Empty;

                if (!row.IsOSIdNull())
                    p.OSId = row.OSId;
                else p.OSId = 0;

                if (!row.IsPMINull()) { p.PMI = row.PMI; } else { p.PMI = false; }
                if (!row.IsPINull()) { p.PI = row.PI; } else { p.PI = false; }

                if (!row.IsDiscapacidadNull())
                {
                    p.Discapacidad = Convert.ToInt32(row.Discapacidad);
                    p.PagaBono = false; //No paga discapacitado
                }
                else
                {
                    p.Discapacidad = 0;
                }

                if (!row.IsFV_PMINull()) p.FechaPMI = row.FV_PMI.ToShortDateString();
                else p.FechaPMI = string.Empty;

                p.NHC = row.cuil;
                if (!row.IsHC_UOM_CENTRALNull())
                    p.NHC_UOM = row.HC_UOM_CENTRAL;
                else p.NHC_UOM = string.Empty;

                if (!row.IsObservacionesNull()) p.Observaciones = row.Observaciones;
                else p.Observaciones = string.Empty;

                if (!row.IsfotoNull()) p.Foto = row.foto;
                if (!row.IsSoc_IdNull()) p.Soc_Id = row.Soc_Id;
                if (!row.IsAlto_RiesgoNull()) { p.Alto_Riesgo = row.Alto_Riesgo; } else { p.Alto_Riesgo = false; }

                p.CUIT = row.Cuit;

                if (!row.IsfotoNEWNull()) { p.Foto = row.fotoNEW; }

                p.deuda = row.deuda.ToString();

                lista.Add(p);
            }

            return lista;
        }





        public int Verificar_Vencimiento_Recibo_Sueldo(long afiliadoId)
        {
            GenteDALTableAdapters.QueriesTableAdapter adapter = new GenteDALTableAdapters.QueriesTableAdapter();
            object documento_obj = adapter.H2_Verificar_Vencimiento_ReciboSueldo(afiliadoId);
            if (documento_obj != null)
                return Convert.ToInt32(documento_obj.ToString());
            else throw new Exception("Error al verificar vencimiento de recibo");
        }



        public void subir_Foto_Test(string strEncoded, long afiliadoId)
        {

            //DateTime fecha = DateTime.Now;
            DateTime d = DateTime.Now;
            int aa = d.Year;
            int mm = d.Date.Month;
            int dd = d.Date.Day;
            try
            {
                string nombre = afiliadoId + "_fotoPerfil.jpg";
                string ruta = @"\\10.10.8.66\documentacion_new\imgPerfilAfiliado\" +  aa + "\\" + mm + "\\" + dd;

                GenteDALTableAdapters.QueriesTableAdapter adapter = new GenteDALTableAdapters.QueriesTableAdapter();
                adapter.H2_Insertar_Foto_Perfil_Afiliado(afiliadoId, ruta + "\\" + nombre, nombre);


                strEncoded = strEncoded.Replace("data:image/png;base64,", "");

                byte[] arrBytImage = Convert.FromBase64String(strEncoded);
                System.Drawing.Image objImage = null;

                // Convierte un array de bytes a una imagen
                using (System.IO.MemoryStream stmBitmap = new System.IO.MemoryStream(arrBytImage, 0, arrBytImage.Length))
                { // Escribe el array de bytes en el stream de memoria
                    stmBitmap.Write(arrBytImage, 0, arrBytImage.Length);
                    // Carga la imagen del stream
                    objImage = System.Drawing.Image.FromStream(stmBitmap);
                    // Cierra el stream
                    stmBitmap.Close();
                }
                // Devuelve la imagen
                //return objImage;

                //objImage.Save(@"\\10.10.8.66\documentacion_new\imgPerfilAfiliado\" + nombre);



                    //si no existe la carpeta temporal la creamos
                if (!(Directory.Exists(@ruta)))
                    {
                        Directory.CreateDirectory(@ruta);
                    }

                objImage.Save(@ruta + "\\" + nombre);
                
            }
            //catch
            //(Exception ex) { throw new Exception(ex.Message); 
            catch { throw new Exception("Ha ocurrido un inconveniente al intentar guardar la foto. Intentelo nuevamente"); }

        }


        public string Traer_Foto_Perfil_Afiliado(long afiliadoId) {
            GenteDALTableAdapters.H2_Traer_Foto_Perfil_AfiliadoTableAdapter adapter = new GenteDALTableAdapters.H2_Traer_Foto_Perfil_AfiliadoTableAdapter();
            GenteDAL.H2_Traer_Foto_Perfil_AfiliadoDataTable table = new GenteDAL.H2_Traer_Foto_Perfil_AfiliadoDataTable();
            string ruta = "";
            table = adapter.GetData(afiliadoId);
            foreach (GenteDAL.H2_Traer_Foto_Perfil_AfiliadoRow row in table.Rows)
            {
                 ruta =  row.ruta.Replace("\\10.10.8.66\\documentacion_new\\imgPerfilAfiliado\\","");
            }
            return ruta;
        }

        //guarda la ruta e info del archivo que se sube en la BD
        public void Pacientes_Adjuntos_Insert(Pacientes_Adjuntos adjunto)
        {
            PacientesDALTableAdapters.QueriesTableAdapter adapter = new PacientesDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_Pacientes_Adjuntos(adjunto.afiliadoId, adjunto.rutaArchivo, adjunto.nombreArchivo,adjunto.tipo);
            }
            catch 
            {
                throw new Exception("Ha ocurrido un inconveniente al intentar adjuntar el archivo. Intentelo nuevamente");
            }
        }
    }
}