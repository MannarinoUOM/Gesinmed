using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

/// <summary>
/// Summary description for FacturacionBLL
/// </summary>
namespace Hospital
{
    public class FacturacionBLL
    {
        public FacturacionBLL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        public List<FacturacionFactura_Cab> VerFacturas(DateTime Desde, DateTime Hasta, string NroPuesto)
        {
            List<FacturacionFactura_Cab> lista = new List<FacturacionFactura_Cab>();
            FacturacionDALTableAdapters.H2_FACT_LIST_FACTURAS_SNTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LIST_FACTURAS_SNTableAdapter();
            FacturacionDAL.H2_FACT_LIST_FACTURAS_SNDataTable aTable = adapter.GetData(Desde,Hasta,NroPuesto);
            foreach (FacturacionDAL.H2_FACT_LIST_FACTURAS_SNRow row in aTable)
            {
                FacturacionFactura_Cab f = new FacturacionFactura_Cab();
                f.AnioFacturado = row.AnioFacturado;
                if (!row.IsAnuladaNull())
                    f.Anulada = row.Anulada;
                else f.Anulada = false;
                f.CUIT = row.CUIT;
                if (!row.IsDescripcionNull())
                    f.Descripcion = row.Descripcion;
                else f.Descripcion = string.Empty;
                f.Factura_A = row.Factura_A;
                f.Factura_Tipo = row.Factura_Tipo;
                f.Fecha = row.Fecha.ToShortDateString();
                f.Gasto = row.Gasto;
                f.Honorario = row.Honorario;
                f.Medicamento = row.Medicamento;
                f.MesFacturado = row.MesFacturado;
                if (!row.IsPacienteNull())
                    f.NHC = row.Paciente.ToString();
                else f.NHC = string.Empty;
                f.NroFactura = row.NroFactura;
                f.NroPuesto = row.NroPuesto;
                if (!row.IsObraSocialNull())
                    f.ObraSocial = row.ObraSocial;
                else f.ObraSocial = 0;
                if (!row.IsObservacionesNull())
                    f.Observaciones = row.Observaciones;
                else f.Observaciones = string.Empty;
                f.UsuarioId = row.UsuarioId;
                lista.Add(f);
            }
            return lista;
        }

        public List<listadeconvenios> VerlosConvenios(string Convenio)
        {
            List<listadeconvenios> list = new List<listadeconvenios>();
            FacturacionDALTableAdapters.H2_Fact_TodoslosconveniosTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fact_TodoslosconveniosTableAdapter();
            FacturacionDAL.H2_Fact_TodoslosconveniosDataTable aTable = adapter.GetData(Convenio);
            foreach (FacturacionDAL.H2_Fact_TodoslosconveniosRow row in aTable)
            {
                listadeconvenios l = new listadeconvenios();
                l.contacto = row.contacto;
                l.convenios = row.convenio;
                l.detalles = row.detalles;
                l.fechafinal = row.fechafinal.ToShortDateString();
                l.fechainicial = row.fechainicial.ToShortDateString();
                l.id = row.id;
                if (!row.IsRazonSocial_FactNull())
                    l.razonsocial = row.RazonSocial_Fact;
                else l.razonsocial = string.Empty;
                if (!row.IsDireccion_FactNull())
                    l.direccion_fact = row.Direccion_Fact;
                else l.direccion_fact = string.Empty;
                if (!row.IsCUIT_FactNull())
                    l.cuit_fact = row.CUIT_Fact;
                else l.cuit_fact = string.Empty;
                list.Add(l);
            }
            return list;
        }

        public listadeconvenios Convenio_by_OS(long OS)
        {
            listadeconvenios l = new listadeconvenios();
            FacturacionDALTableAdapters.H2_FACT_OBTENER_CONV_OSTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_OBTENER_CONV_OSTableAdapter();
            FacturacionDAL.H2_FACT_OBTENER_CONV_OSDataTable aTable = adapter.GetData(OS);
            foreach (FacturacionDAL.H2_FACT_OBTENER_CONV_OSRow row in aTable)
            {
                l.contacto = row.contacto;
                l.convenios = row.convenio;
                l.detalles = row.detalles;
                l.fechafinal = row.fechafinal.ToShortDateString();
                l.fechainicial = row.fechainicial.ToShortDateString();
                l.id = row.id;
                if (!row.IsRazonSocial_FactNull())
                    l.razonsocial = row.RazonSocial_Fact;
                else l.razonsocial = string.Empty;
                if (!row.IsDireccion_FactNull())
                    l.direccion_fact = row.Direccion_Fact;
                else l.direccion_fact = string.Empty;
                if (!row.IsCUIT_FactNull())
                    l.cuit_fact = row.CUIT_Fact;
                else l.cuit_fact = string.Empty;
            }
            return l;
        }

        public List<Facturacion_ListNomenclaSN> ListNomencladoresSN()
        {
            List<Facturacion_ListNomenclaSN> list = new List<Facturacion_ListNomenclaSN>();
            FacturacionDALTableAdapters.H2_FACT_LIST_NOMENCLA_ANTERIORES_SNTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LIST_NOMENCLA_ANTERIORES_SNTableAdapter();
            FacturacionDAL.H2_FACT_LIST_NOMENCLA_ANTERIORES_SNDataTable aTable = adapter.GetData();
            foreach (FacturacionDAL.H2_FACT_LIST_NOMENCLA_ANTERIORES_SNRow row in aTable)
            {
                Facturacion_ListNomenclaSN l = new Facturacion_ListNomenclaSN();
                l.Fecha = row.Fecha.ToShortDateString();
                list.Add(l);
            }
            return list;
        }

        public List<Facturacion_RangosPrac> VerRangos()
        {
            List<Facturacion_RangosPrac> list = new List<Facturacion_RangosPrac>();
            FacturacionDALTableAdapters.H2_Fact_Rangos_Practicas_ListTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fact_Rangos_Practicas_ListTableAdapter();
            FacturacionDAL.H2_Fact_Rangos_Practicas_ListDataTable aTable = adapter.GetData();
            foreach (FacturacionDAL.H2_Fact_Rangos_Practicas_ListRow row in aTable)
            {
                Facturacion_RangosPrac l = new Facturacion_RangosPrac();
                l.PracticaDesde = row.PracticaDesde;
                l.PracticaHasta = row.PracticaHasta;
                l.RangoId = row.IdRango;
                list.Add(l);
            }
            return list;
        }

        public List<especialidades> Fac_PracticaEspecialidad_List_by_PracticaId(long CodigoId)
        {
            List<especialidades> list = new List<especialidades>();
            FacturacionDALTableAdapters.H2_Fac_PracticaEspecialidad_List_by_PracticaIdTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fac_PracticaEspecialidad_List_by_PracticaIdTableAdapter();
            FacturacionDAL.H2_Fac_PracticaEspecialidad_List_by_PracticaIdDataTable aTable = adapter.GetData(CodigoId);
            foreach (FacturacionDAL.H2_Fac_PracticaEspecialidad_List_by_PracticaIdRow row in aTable.Rows)
            {
                especialidades e = new especialidades();
                e.Id = row.Id;
                e.Especialidad = row.Especialidad;
                list.Add(e);
            }
            return list;
        }

        public List<Facturacion_RangoConv> VerRangosporConvenio(int ConvenioId, int RangoId,string Nomenclador)
        {
            List<Facturacion_RangoConv> list = new List<Facturacion_RangoConv>();
            FacturacionDALTableAdapters.H2_FACT_VALOR_RANGO_CONV_LISTTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_VALOR_RANGO_CONV_LISTTableAdapter();
            FacturacionDAL.H2_FACT_VALOR_RANGO_CONV_LISTDataTable aTable = adapter.GetData(ConvenioId, RangoId, Nomenclador);
            foreach (FacturacionDAL.H2_FACT_VALOR_RANGO_CONV_LISTRow row in aTable)
            {
                Facturacion_RangoConv l = new Facturacion_RangoConv();
                l.ConvenioDesc = row.convenio;
                l.ConvenioId = row.ConvenioId;
                l.RangoId = row.IdRango;
                l.RangoDesc = row.RangoDesc;
                l.Valor = row.Valor.ToString("f2");
                if (!row.IsValorHonorarioNull())
                    l.ValorHonorario = row.ValorHonorario.ToString("f2");
                else l.ValorHonorario = "0,00";
                list.Add(l);
            }
            return list;
        }

        public FactValorPracticas BuscarValoresSana_NN(long Inst, int Codigo, string Fecha)
        {
            List<Facturacion_RangoConv> list = new List<Facturacion_RangoConv>();
            FacturacionDALTableAdapters.H2_SN_FACT_BUSCAR_PRACTICA_VALORTableAdapter adapter = new FacturacionDALTableAdapters.H2_SN_FACT_BUSCAR_PRACTICA_VALORTableAdapter();
            DateTime _fecha;
            if (Fecha.Equals("1")) _fecha = DateTime.Now.AddDays(1);
            else _fecha = DateTime.Parse(Fecha);
            FacturacionDAL.H2_SN_FACT_BUSCAR_PRACTICA_VALORDataTable aTable = adapter.GetData(Inst, Codigo, _fecha);
            foreach (FacturacionDAL.H2_SN_FACT_BUSCAR_PRACTICA_VALORRow row in aTable)
            {
                FactValorPracticas l = new FactValorPracticas();
                    if (!row.IsValueNull()) l.ValorNN = row.Value.ToString().Replace(",", "."); else l.ValorNN = "0.00";
                return l;
            }
            return null;
        }


        public FactValorPracticas BuscarValoresHonorario_NN(long Inst, int Codigo, string Fecha)
        {
            List<Facturacion_RangoConv> list = new List<Facturacion_RangoConv>();
            FacturacionDALTableAdapters.H2_SN_FACT_BUSCAR_HONORARIO_VALORTableAdapter adapter = new FacturacionDALTableAdapters.H2_SN_FACT_BUSCAR_HONORARIO_VALORTableAdapter();
            DateTime _fecha;
            if (Fecha.Equals("1")) _fecha = DateTime.Now.AddDays(1);
            else _fecha = DateTime.Parse(Fecha);
            FacturacionDAL.H2_SN_FACT_BUSCAR_HONORARIO_VALORDataTable aTable = adapter.GetData(Inst, Codigo, _fecha);
            foreach (FacturacionDAL.H2_SN_FACT_BUSCAR_HONORARIO_VALORRow row in aTable)
            {
                FactValorPracticas l = new FactValorPracticas();
                decimal a;
                    if (!row.IsValueNull()) a = decimal.Parse(row.Value.ToString()); else a = decimal.Parse("0.00");
                    l.ValorNN = a.ToString("f2");
                return l;
            }
            return null;
        }

        public decimal BuscarValoresHonorario_byTipo(long Inst, int Codigo, string Fecha, int Tipo)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            DateTime _fecha;
            if (Fecha.Equals("1")) _fecha = DateTime.Now.AddDays(1);
            else _fecha = DateTime.Parse(Fecha);
            object obj = adapter.H2_SN_FACT_BUSCAR_VALORES_HONO(Inst, Codigo, _fecha, Tipo);
            if (obj != null) return Convert.ToDecimal(obj.ToString());
            else return 0;
        }

        public string FACT_ESTA_FACTURADO_NROREND(long NroParte)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_FACT_ESTA_FACTURADO_NROREND(NroParte);
            if (obj != null) return obj.ToString();
            else return string.Empty;
        }

        public long Insert_Fact_HonoMedicos_Det(Facturacion_Medicos_Det d)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_FACTURACION_PARTE_INSERT_DET_MEDICOS(d.NroParte, d.Ambulatorio, d.Internacion, d.Modulo, d.Practica, DateTime.Parse(d.FechaPractica),
            DateTime.Parse(d.FechaRendicion), d.ServicioId, d.EspecialidadId, d.Cantidad, d.Porcentaje, d.PracticaId, d.Precio, d.Facturarlo);
            if (obj != null) return Convert.ToInt32(obj.ToString());
            else return -1;
        }

        public long Insert_Fact_HonoMedicos_Cab(Facturacion_Medico_Cab d)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_FACTURACION_PARTE_INSERT_MEDICOS_CAB(d.NroParte, DateTime.Parse(d.Fecha), d.CentroId, d.MedicoId, d.Ambulatorio, d.Internacion, d.UsuarioId);
            if (obj != null) return Convert.ToInt32(obj.ToString());
            else return -1;
        }

        public void Insert_Fact_HonoMedicos_NroOrdenInt(int NroParte, string NroOrdenInt)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_FACT_INSERT_NRO_ORDEN_INT(NroParte, NroOrdenInt);
        }

        public void Practica_Eliminar(long Codigo, string IsActive)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_FACT_PRACTICA_ELIMINAR(Codigo, IsActive);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int Fact_Rangos_Practicas_INSERT(Facturacion_RangosPrac f)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object obj = adapter.H2_Fact_Rangos_Practicas_INSERT(f.RangoId, f.PracticaDesde, f.PracticaHasta);
            if (obj != null) return Convert.ToInt32(obj.ToString());
            else return -1;
        }

        public void Fact_Rango_Valores_Conv_INSERT(Facturacion_RangoConv f,string Nomenclador)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            decimal a, b;
            if (decimal.TryParse(f.ValorHonorario.Replace('.', ','), out a) && decimal.TryParse(f.Valor.Replace('.', ','), out b))
            adapter.H2_Fact_Rango_Valores_Conv_INSERT(f.RangoId, f.ConvenioId, b, a, Nomenclador);
            else throw new Exception("Error al Insertar Valor");
        }

        public void Fact_Rango_Valores_Conv_DELETE(int IdRango, long ConvenioId,string Nomencladores)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Fact_Rango_Valores_Conv_DELETE(IdRango, ConvenioId,Nomencladores);
        }

        public void Fact_Rangos_Practicas_Delete(int Id)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Fact_Rangos_Practicas_Delete(Id);
        }

        public List<Facturacion_ModulosEnc> ListModulosEnc()
        {
            List<Facturacion_ModulosEnc> list = new List<Facturacion_ModulosEnc>();
            FacturacionDALTableAdapters.H2_FACT_MODULOS_ENC_LISTTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_MODULOS_ENC_LISTTableAdapter();
            FacturacionDAL.H2_FACT_MODULOS_ENC_LISTDataTable aTable = adapter.GetData();
            foreach (FacturacionDAL.H2_FACT_MODULOS_ENC_LISTRow row in aTable.Rows)
            {
                list.Add(CreateFrowRow_ListModulosEnc(row));
            }
            return list;
        }

        private Facturacion_ModulosEnc CreateFrowRow_ListModulosEnc(FacturacionDAL.H2_FACT_MODULOS_ENC_LISTRow row)
        {
            Facturacion_ModulosEnc f = new Facturacion_ModulosEnc();
            f.Descripcion = row.Descripcion;
            f.EncabezadoId = row.EncabezadoId;
            return f;
        }

        public void ActualizarPracticasMasiva(int NomencladorId,long ConvenioId, long EspecialidadId,int CodigoDesde, int CodigoHasta,
            decimal Porcentaje, decimal Valor, long UsuarioId, int NomencladorBase)
        {
            try
            {
                FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
                adapter.H2_FACT_ACTUALIZAR_PRECIO_MASIVO_PRAC(NomencladorId, ConvenioId, EspecialidadId, CodigoDesde, CodigoHasta, Porcentaje, Valor, UsuarioId, NomencladorBase);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void ActualizarModulosMasiva(long ConvenioId, long CodigoDesde, long CodigoHasta, decimal Porcentaje, decimal Valor)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACT_ACTUALIZAR_PRECIO_MASIVO_MOD(ConvenioId, CodigoDesde, CodigoHasta, Porcentaje, Valor);
        }

        public int QuitarConvenio(long Id)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object r = adapter.H2_Fact_Quitar_Convenios(Id);
            return Convert.ToInt32(r.ToString());
        }

        public int ParteBaja(long Id, long UsuarioBaja)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object r = adapter.H2_FACT_PARTE_BAJA(Id,UsuarioBaja);
            return Convert.ToInt32(r.ToString());
        }

        public int ParteBajaMedicos(long Id)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object r = adapter.H2_FACT_PARTE_BAJA_MEDICOS(Id);
            return Convert.ToInt32(r.ToString());
        }

        public void GuardarConvenios(long ConvenioNro, string Convenios, string Contacto, DateTime FechaInicio, DateTime FechaFin, string Detalles, int usuario)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Fact_Guardar_Convenios(ConvenioNro, Convenios, Contacto, FechaInicio, FechaFin, Detalles, usuario);
        }

        public void GuardarConveniosSN(long ConvenioNro, string Convenios, string Contacto, DateTime FechaInicio, DateTime FechaFin, string Detalles, int usuario,
        string RazonSocial, string Direccion_Fact, string CUIT_Fact)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Fact_Guardar_Convenios_SN(ConvenioNro, Convenios, Contacto, FechaInicio, FechaFin, Detalles, usuario,RazonSocial,Direccion_Fact,CUIT_Fact);
        }

        public void GuardarRelacionSeccional(long ConvenioNro, long  Seccinoal)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Fact_GuardarRelacion_Seccional(ConvenioNro, Seccinoal);
        }

        public listadeconvenios ExisteRelacionSeccional_Convenio(long Seccional)
        { 
            FacturacionDALTableAdapters.H2_FACT_EXISTE_RELACION_CON_CONVENIO_SECTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_EXISTE_RELACION_CON_CONVENIO_SECTableAdapter();
            FacturacionDAL.H2_FACT_EXISTE_RELACION_CON_CONVENIO_SECDataTable aTable = adapter.GetData(Seccional);
            if (aTable.Rows.Count > 0)
                return CreateFromRow_ExisteRelacionSeccional_Convenio(aTable[0]);
            else return null;
        }

        private listadeconvenios CreateFromRow_ExisteRelacionSeccional_Convenio(FacturacionDAL.H2_FACT_EXISTE_RELACION_CON_CONVENIO_SECRow row)
        {
            listadeconvenios Conv = new listadeconvenios();
            Conv.id = row.Enc_Id;
            Conv.convenios = row.convenio;
            return Conv;
        }

        public listadeconvenios ExisteRelacionOS_Convenio(long OS)
        {
            FacturacionDALTableAdapters.H2_FACT_EXISTE_RELACION_CON_CONVENIO_OSTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_EXISTE_RELACION_CON_CONVENIO_OSTableAdapter();
            FacturacionDAL.H2_FACT_EXISTE_RELACION_CON_CONVENIO_OSDataTable aTable = adapter.GetData(OS);
            if (aTable.Rows.Count > 0)
                return CreateFromRow_ExisteRelacionOS_Convenio(aTable[0]);
            else return null;
        }

        public listadeconvenios ExisteRelacionMed_Convenio(long Med)
        {
            FacturacionDALTableAdapters.H2_FACT_EXISTE_RELACION_CON_CONVENIO_MEDTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_EXISTE_RELACION_CON_CONVENIO_MEDTableAdapter();
            FacturacionDAL.H2_FACT_EXISTE_RELACION_CON_CONVENIO_MEDDataTable aTable = adapter.GetData(Med);
            if (aTable.Rows.Count > 0)
                return CreateFromRow_ExisteRelacionMed_Convenio(aTable[0]);
            else return null;
        }

        private listadeconvenios CreateFromRow_ExisteRelacionMed_Convenio(FacturacionDAL.H2_FACT_EXISTE_RELACION_CON_CONVENIO_MEDRow row)
        {
            listadeconvenios Conv = new listadeconvenios();
            Conv.id = row.Enc_Id;
            Conv.convenios = row.convenio;
            return Conv;
        }


        private listadeconvenios CreateFromRow_ExisteRelacionOS_Convenio(FacturacionDAL.H2_FACT_EXISTE_RELACION_CON_CONVENIO_OSRow row)
        {
            listadeconvenios Conv = new listadeconvenios();
            Conv.id = row.Enc_Id;
            Conv.convenios = row.convenio;
            return Conv;
        }

        public void GuardarRelacionInstitucion(long ConvenioNro, long Seccinoal)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Fact_GuardarRelacion_Institucion(ConvenioNro, Seccinoal);
        }

        public void GuardarRelacionMedico(long ConvenioNro, long Medico)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Fact_GuardarRelacion_Medico(ConvenioNro, Medico);
        }

        public void GuardarModulos(FactModulosDetalles modulo)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_Fact_Modulos_Guardar(modulo.Codigo, modulo.Descripcion, modulo.ValorNN, modulo.ValorGastos, modulo.ValorHonorario, modulo.SeFacturoOS, modulo.CobraHonorario,modulo.UsuarioId);
            }
            catch (SqlException ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public void QuitarModulos(long Codigo)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Fact_Modulos_Quitar(Codigo);
        }


        public List<FactModulosDetalles> List_Modulos_SN()
        {
            List<FactModulosDetalles> list = new List<FactModulosDetalles>();
            FacturacionDALTableAdapters.H2_FACT_LIST_MODULOS_SNTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LIST_MODULOS_SNTableAdapter();
            FacturacionDAL.H2_FACT_LIST_MODULOS_SNDataTable aTable = adapter.GetData();
            foreach (FacturacionDAL.H2_FACT_LIST_MODULOS_SNRow row in aTable)
            {
                FactModulosDetalles l = new FactModulosDetalles();
                l.Codigo = row.Codigo;
                l.Descripcion = row.Descripcion;
                list.Add(l);
            }
            return list;
        }

        public List<FactModulosDetalles> List_Modulos_SN_por_OS(long OS)
        {
            List<FactModulosDetalles> list = new List<FactModulosDetalles>();
            FacturacionDALTableAdapters.H2_FACT_LIST_MODULOS_SN_VALORIZADOS_POR_OSTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LIST_MODULOS_SN_VALORIZADOS_POR_OSTableAdapter();
            FacturacionDAL.H2_FACT_LIST_MODULOS_SN_VALORIZADOS_POR_OSDataTable aTable = adapter.GetData(OS);
            foreach (FacturacionDAL.H2_FACT_LIST_MODULOS_SN_VALORIZADOS_POR_OSRow row in aTable)
            {
                FactModulosDetalles l = new FactModulosDetalles();
                l.Codigo = row.Codigo;
                l.Descripcion = row.Descripcion;
                list.Add(l);
            }
            return list;
        }
        

        public List<FactModulosDetalles> ListadoModulos(long? Codigo, string Descripcion)
        {
            List<FactModulosDetalles> list = new List<FactModulosDetalles>();
            FacturacionDALTableAdapters.H2_Fact_Modulos_ListaTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fact_Modulos_ListaTableAdapter();
            FacturacionDAL.H2_Fact_Modulos_ListaDataTable aTable = adapter.GetData(Codigo, Descripcion);
            foreach (FacturacionDAL.H2_Fact_Modulos_ListaRow row in aTable)
            {
                FactModulosDetalles l = new FactModulosDetalles();
                if (!row.IsCobraHonorariosNull()) { l.CobraHonorario = row.CobraHonorarios; } else { l.CobraHonorario = false; }
                l.Codigo = row.Codigo;
                l.Descripcion = row.Descripcion;                
                if (!row.IsSeFacturaNull()) {l.SeFacturoOS = row.SeFactura; } else {l.SeFacturoOS = false;}
                l.ValorNN = row.ValorImporte;
                l.ValorGastos = row.ValorGastos;
                l.ValorHonorario = row.ValorHonorarios;
                if (!row.IsCobraHonorariosNull()) {l.CobraHonorario = row.CobraHonorarios; } else {l.CobraHonorario = false;}
                list.Add(l);
            }
            return list;
        }

        /*
         SP : H2_FACT_VALOR_MODULO_CONVENIO
         * Modificado: 11/07/2016
         * Autor: Fede
         * Se agrego NomencladorId, para obtener valores por Convenio, Modulo y Nomenclador.
         */
        public FactValorModulosConvenio Fact_Valor_Modulo_Convenio(int NomencladorId, int InstSecc, int ModuloId)
        {
            try
            {
                FacturacionDALTableAdapters.H2_FACT_VALOR_MODULO_CONVENIOTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_VALOR_MODULO_CONVENIOTableAdapter();
                FacturacionDAL.H2_FACT_VALOR_MODULO_CONVENIODataTable aTable = adapter.GetData(NomencladorId, InstSecc, ModuloId);
                foreach (FacturacionDAL.H2_FACT_VALOR_MODULO_CONVENIORow row in aTable.Rows)
                {
                    FactValorModulosConvenio f = new FactValorModulosConvenio();
                    f.moduloid = row.codigoId;
                    f.nomencladorid = row.nomencladorId;
                    f.convenioid = row.convenioId;
                    f.ValorACA = row.vcargoafiliado;
                    f.ValorACI = row.vcargoins;
                    f.ValorBono = row.vbono;
                    f.ValorGastos = row.vgastos;
                    f.ValorHonorario = row.vhono;
                    f.ValorNN = row.vnn;
                    return f;
                }
                return null;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public FactValorModulosConvenio Fact_ValorAnterior_Modulo_Convenio(int InstSecc, int ModuloId, string Fecha)
        {
            FacturacionDALTableAdapters.H2_FACT_VALOR_ANTERIOR_MODULO_CONVENIOTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_VALOR_ANTERIOR_MODULO_CONVENIOTableAdapter();
            DateTime _fecha;
            if (Fecha.Equals("1")) _fecha = DateTime.Now.AddDays(1);
            else _fecha = DateTime.Parse(Fecha);
            FacturacionDAL.H2_FACT_VALOR_ANTERIOR_MODULO_CONVENIODataTable aTable = adapter.GetData(InstSecc, ModuloId, _fecha);
            foreach (FacturacionDAL.H2_FACT_VALOR_ANTERIOR_MODULO_CONVENIORow row in aTable.Rows)
            {
                FactValorModulosConvenio f = new FactValorModulosConvenio();
                f.moduloid = row.codigoId;
                f.convenioid = row.convenioId;
                f.ValorACA = row.vcargoafiliado;
                f.ValorACI = row.vcargoins;
                f.ValorBono = row.vbono;
                f.ValorGastos = row.vgastos;
                f.ValorHonorario = row.vhono;
                f.ValorNN = row.vnn;
                return f;
            }
            return null;
        }



        public List<listaconveniosseccionales> CargarSeccionalesconConvenios(int ConvenioId)
        {
            List<listaconveniosseccionales> list = new List<listaconveniosseccionales>();
            FacturacionDALTableAdapters.H2_Fact_SeccionalesRelacionTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fact_SeccionalesRelacionTableAdapter();
            FacturacionDAL.H2_Fact_SeccionalesRelacionDataTable aTable = adapter.GetData(ConvenioId);
            bool Todas = false;

            if (aTable.Count > 0)
            {
                if (aTable[0].Todas == 1)
                {
                    Todas =true;
                }
            }

            foreach (FacturacionDAL.H2_Fact_SeccionalesRelacionRow row in aTable)
            {
                listaconveniosseccionales l = new listaconveniosseccionales();                
                l.SeccionalId = Convert.ToInt32(row.Numero);
                if (!row.IsidNull()) { if (!Todas) { l.clase = "btn-success"; } } else { l.clase = ""; }
                l.Seccional = row.Seccional;
                if (Todas)
                {
                    l.claseTodas = "btn-success";
                }
                list.Add(l);
            }
            return list;
        }

        public List<listaconveniosprofesionales> CargarProfesionalesconConvenios(int ConvenioId)
        {
            List<listaconveniosprofesionales> list = new List<listaconveniosprofesionales>();
            FacturacionDALTableAdapters.H2_Fact_ProfesionalesRelacionTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fact_ProfesionalesRelacionTableAdapter();
            FacturacionDAL.H2_Fact_ProfesionalesRelacionDataTable aTable = adapter.GetData(ConvenioId);
            bool Todas = false;

            if (aTable.Count > 0)
            {
                if (aTable[0].Todas == 1)
                {
                    Todas = true;
                }
            }

            foreach (FacturacionDAL.H2_Fact_ProfesionalesRelacionRow row in aTable)
            {
                listaconveniosprofesionales l = new listaconveniosprofesionales();
                l.MedicoId = Convert.ToInt32(row.Numero);
                if (!row.IsidNull()) { if (!Todas) { l.clase = "btn-success"; } } else { l.clase = ""; }
                l.Medico = row.Medico;
                if (Todas)
                {
                    l.claseTodas = "btn-success";
                }
                list.Add(l);
            }
            return list;
        }


        public List<listaconveniosinstituciones> CargarInstitucionesconConvenios(int ConvenioId)
        {
            List<listaconveniosinstituciones> list = new List<listaconveniosinstituciones>();
            FacturacionDALTableAdapters.H2_Fact_InstitucionesRelacionTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fact_InstitucionesRelacionTableAdapter();
            FacturacionDAL.H2_Fact_InstitucionesRelacionDataTable aTable = adapter.GetData(ConvenioId);
            bool Todas = false;

            if (aTable.Count > 0)
            {
                if (aTable[0].Todas == 1)
                {
                    Todas = true;
                }
            }

            foreach (FacturacionDAL.H2_Fact_InstitucionesRelacionRow row in aTable)
            {
                listaconveniosinstituciones l = new listaconveniosinstituciones();
                l.InstitucionId = Convert.ToInt32(row.Numero);
                if (!row.IsidNull()) { if (!Todas) { l.clase = "btn-success"; } } else { l.clase = ""; }
                l.Institucion = row.institucion;
                if (Todas)
                {
                    l.claseTodas = "btn-success";
                }
                list.Add(l);
            }
            return list;
        }



        public void Sugerencia_Eliminar(long Codigo, int Usuario)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Fact_Sugerencias_Eliminar(Codigo, Usuario);
        }


        public void Sugerencia_Guardar(long Codigo, string Descripcion)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Fact_Sugerencias_Guardar(Descripcion, Codigo);
        }

        public List<listasugerencias> Sugerencia_Listar()
        {
            List<listasugerencias> list = new List<listasugerencias>();
            FacturacionDALTableAdapters.H2_Fact_Sugerencias_ListaTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fact_Sugerencias_ListaTableAdapter();
            FacturacionDAL.H2_Fact_Sugerencias_ListaDataTable aTable = adapter.GetData();
            foreach (FacturacionDAL.H2_Fact_Sugerencias_ListaRow row in aTable)
            {
                listasugerencias l = new listasugerencias();
                l.Codigo = row.codigo;
                l.Descripcion = row.descripcion;
                list.Add(l);
            }
            return list;
        }


        public List<listasugerencias> Carencias_Listar()
        {
            List<listasugerencias> list = new List<listasugerencias>();
            FacturacionDALTableAdapters.H2_Fact_CarenciasTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fact_CarenciasTableAdapter();
            FacturacionDAL.H2_Fact_CarenciasDataTable aTable = adapter.GetData();
            foreach (FacturacionDAL.H2_Fact_CarenciasRow row in aTable)
            {
                listasugerencias l = new listasugerencias();
                l.Codigo = row.id;
                l.Descripcion = row.descripcion;
                list.Add(l);
            }
            return list;
        }


        public List<listasugerencias> Complejidad_Listar()
        {
            List<listasugerencias> list = new List<listasugerencias>();
            FacturacionDALTableAdapters.H2_Fact_ComplejidadTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fact_ComplejidadTableAdapter();
            FacturacionDAL.H2_Fact_ComplejidadDataTable aTable = adapter.GetData();
            foreach (FacturacionDAL.H2_Fact_ComplejidadRow row in aTable)
            {
                listasugerencias l = new listasugerencias();
                l.Codigo = row.id;
                l.Descripcion = row.descripcion;
                list.Add(l);
            }
            return list;
        }



        public void GuardarFacturacionPracticas(
            List<listasugerencias> objPracticas,
             long codigo,
             string descripcion,
             long sugerenciasId,
             bool sugerenciasEstado,
             int complejidadId,
             long carenciaid,
             int topemensual,
             int topeanual,
             bool valorglobal,
             decimal vnn,
             decimal vguar,
             decimal vg,
             decimal vhono,
             bool ck_sefacturo,
             bool ck_cobrahono
            )
        {
            if (HttpContext.Current.Session["Usuario"] != null)
            {
                if (!sugerenciasEstado) sugerenciasId = 0;
                try
                {
                    FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
                    adapter.H2_Fac_GuardarPracticas((Int32)codigo, descripcion, sugerenciasId, sugerenciasEstado, complejidadId, (Int32)carenciaid, topemensual, topeanual, valorglobal, ck_sefacturo, ck_cobrahono);
                    usuarios U = (usuarios)HttpContext.Current.Session["Usuario"];
                    FacGuardarPracticasValor((Int32)codigo, vnn, vguar, vg, vhono, U.nombre);
                    FacBorrarPracticasEspecialidad(codigo);
                    foreach (listasugerencias o in objPracticas)
                    {
                        if (o.Estado == 1) FacGuardarPracticasEspecialidad(codigo, (Int32)o.Codigo);
                    }
                }
                catch (SqlException ex)
                {
                    throw new Exception(ex.Message);
                }
            }
            else throw new Exception("Inicie Sesion.");
        }

        //Guarda valores para un modulo y convenio...
        //Se envia nomencladorId para modificar valores de un cierto nomenclador
        /*
         SP: H2_Fact_ValorConvenioGuardar
         * Modificado: 11/07/2017
         * Autor: Fede
         */
        public void GuardarFacturacionModulos(FactValorModulosConvenio modulo)
        {
            try
            {
                FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
                adapter.H2_Fact_ValorConvenioGuardar(modulo.nomencladorid,modulo.convenioid,modulo.moduloid, modulo.ValorBono, modulo.ValorACA, modulo.ValorACI, 
                    modulo.ValorNN, modulo.ValorGastos, modulo.ValorHonorario,modulo.UsuarioId);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public void FacGuardarPracticasValor(int Codigo, decimal vnn, decimal vguar, decimal vg, decimal vhono, string Usuario)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Fac_Practica_Guardar_Precio(Codigo, vnn, Usuario, vguar, vg, vhono,vg);
        }



        public void FacGuardarPracticasEspecialidad(long PracticaId, int Especialidad)
        {
            try
            {
                FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
                adapter.H2_Fac_PracticasEspecialidadGuardar(PracticaId, Especialidad);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }



        public void FacBorrarPracticasEspecialidad(long PracticaId)
        {
            try
            {
                FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
                adapter.H2_Fac_PracticasEspecialidadBorrar(PracticaId);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }




        public List<listarEspecialidadPracticarelacion> ListadePracticasyEspecialidades(long PracticaId)
        {
            List<listarEspecialidadPracticarelacion> list = new List<listarEspecialidadPracticarelacion>();
            FacturacionDALTableAdapters.H2_Fac_ListarPracticasEspecialidadTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fac_ListarPracticasEspecialidadTableAdapter();
            FacturacionDAL.H2_Fac_ListarPracticasEspecialidadDataTable aTable = adapter.GetData(PracticaId);
            foreach (FacturacionDAL.H2_Fac_ListarPracticasEspecialidadRow row in aTable)
            {
                listarEspecialidadPracticarelacion l = new listarEspecialidadPracticarelacion();
                l.practica = row.Practica;
                l.especialidad = row.Especialidad;
                l.especialidadNombre = row.Descripcion;
                list.Add(l);
            }
            return list;
        }

        public void GuardarValorHonorario(long ConvenioId, int MedicoId, int EspecialidadId, decimal vhono, long Codigo)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            if (ExisteRelacionConv_Medico(MedicoId, ConvenioId))
                adapter.H2_Fact_ValorHonoGuardar(ConvenioId, EspecialidadId, MedicoId, vhono, Codigo);
            else
                throw new Exception("No Existe la relación médico - convenio");
        }

        public bool ExisteRelacionConv_Medico(long MedicoId, long ConvenioId)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object res = adapter.H2_FACT_EXISTE_RELACION_MEDICO(MedicoId, ConvenioId);
            if (Convert.ToInt16(res.ToString()) == 0) return false;
            else return true;
            
        }


        public void Fact_GuardarValorPracticas(long ConvenioId,int NomencladorId, int PracticaId, int EspecialidadId, decimal vbono, 
            decimal vaa, decimal vaci, decimal vnn, decimal vg, decimal vhono, long UsuarioId)
        {
            try
            {
                FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
                adapter.H2_Fact_ValorPracticaGuardar(ConvenioId, NomencladorId, EspecialidadId, PracticaId, vbono, vaa, vaci, vnn, vg, vhono, UsuarioId);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void Fact_QuitarHonoMedicos(long ConvenioId, int MedicoId, int EspecialidadId, long Codigo)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_Fact_HonoMedicoQuitar(MedicoId, ConvenioId, EspecialidadId,Codigo);
        }

        public void Fact_QuitarValorPracticas(long ConvenioId, int PracticaId, int EspecialidadId, int NomencladorId)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_Fact_ValorPracticaQuitar(PracticaId, ConvenioId, EspecialidadId, NomencladorId);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        /*
           SP: H2_Fact_ValorModulosQuitar
         * Modificado: 11/07/2016
         * Autor: Fede
         * Se agrega NomencladorId para eliminar un valor asignado a un modulo.
         */

        public void Fact_QuitarValorModulos(int NomencladorId, long ConvenioId, int PracticaId)
        { 
            try
            {
                FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
                adapter.H2_Fact_ValorModulosQuitar(NomencladorId,PracticaId, ConvenioId);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public List<FactValorPracticasEspecialidad> Facturacion_Practicas_Especialidad_Convenios_Lista(long CodigoId, long PracticaId, int NomencladorId)
        {
            try
            {
                List<FactValorPracticasEspecialidad> list = new List<FactValorPracticasEspecialidad>();
                FacturacionDALTableAdapters.H2_Fact_PracticasConv_ListaTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fact_PracticasConv_ListaTableAdapter();
                FacturacionDAL.H2_Fact_PracticasConv_ListaDataTable aTable = adapter.GetData(CodigoId, PracticaId, NomencladorId);
                foreach (FacturacionDAL.H2_Fact_PracticasConv_ListaRow row in aTable)
                {
                    FactValorPracticasEspecialidad l = new FactValorPracticasEspecialidad();
                    l.practica = row.Practica;
                    l.practicaid = row.codigoId;
                    l.especialidad = row.Especialidad;
                    l.especialidadid = row.especialidadId;
                    if (!row.IsconvenioNull()) l.convenio = row.convenio;
                    l.convenioid = row.convenioId;
                    if (!row.IsvcargoafiliadoNull()) l.ValorACA = row.vcargoafiliado.ToString().Replace(",", ".").ToString(); else l.ValorACA = "0.00";
                    if (!row.IsvcargoinsNull()) l.ValorACI = row.vcargoins.ToString().Replace(",", "."); else l.ValorACI = "0.00";
                    if (!row.IsvbonoNull()) l.ValorBono = row.vbono.ToString().Replace(",", "."); else l.ValorBono = "0.00";
                    if (!row.IsvgastosNull()) l.ValorGastos = row.vgastos.ToString().Replace(",", "."); else l.ValorGastos = "0.00";
                    if (!row.IsvhonoNull()) l.ValorHonorario = row.vhono.ToString().Replace(",", "."); else l.ValorHonorario = "0.00";
                    if (!row.IsvnnNull()) l.ValorNN = row.vnn.ToString().Replace(",", "."); else l.ValorNN = "0.00";
                    l.nomencladorid = row.nomencladorId;
                    list.Add(l);
                }
                return list;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<FactValorHonoMedicos> Facturacion_MedicosHono_Convenios_Lista(long CodigoId, long MedicoId)
        {
            List<FactValorHonoMedicos> list = new List<FactValorHonoMedicos>();
            FacturacionDALTableAdapters.H2_Fact_MedicoConv_ListaTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fact_MedicoConv_ListaTableAdapter();
            FacturacionDAL.H2_Fact_MedicoConv_ListaDataTable aTable = adapter.GetData(CodigoId, MedicoId);
            foreach (FacturacionDAL.H2_Fact_MedicoConv_ListaRow row in aTable)
            {
                FactValorHonoMedicos l = new FactValorHonoMedicos();
                l.medico = row.Medico;
                l.medicoId = row.medicoId;
                l.especialidad = row.Especialidad;
                l.especialidadid = row.EspecialidadId;
                if (!row.IsConvenioNull()) l.convenio = row.Convenio;
                l.convenioid = row.convenioId;
                if (!row.IsvhonoNull()) l.ValorHonorario = row.vhono.ToString().Replace(",", "."); else l.ValorHonorario = "0.00";
                l.practicaid = row.CodigoId;
                l.practica = row.Practica;
                list.Add(l);
            }
            return list;
        }
		
		public void DeleteParteDetalles(long NroParte)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACTURACION_PARTE_DELETE_DET(NroParte);
        }

        public void DeleteParteDetallesMedicos(long NroParte)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACTURACION_PARTE_DELETE_DET_MEDICOS(NroParte);
        }

        public int EstaProcesadoParte(long NroParte)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object r = adapter.H2_FACT_PARTE_ESTAPROCESADO(NroParte);
            return Convert.ToInt32(r.ToString());
        }

        public int EstaProcesadoParteMedicos(long NroParte)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object r = adapter.H2_FACT_PARTE_ESTAPROCESADO_MEDICOS(NroParte);
            return Convert.ToInt32(r.ToString());
        }

        public long InsertParteCab(Facturacion_Parte_Cab f)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            try
            {
                object Nro = adapter.H2_FACTURACION_PARTE_INSERT_CAB(f.NroParte, DateTime.Parse(f.Fecha), f.NHC, f.InstitucionId, f.CentroId, f.NroInternacion, f.Ambulatorio, f.Internacion, f.UsuarioId);
                if (Nro != null) return Convert.ToInt64(Nro.ToString());
                else throw new Exception("Error al guardar Parte.");
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void UpdateCabeceraParteSN(long NroParte, string NroOrdenIntCarpeta,string Observaciones)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACT_UPDATE_CABECERA(NroParte, NroOrdenIntCarpeta, Observaciones);
        }


        public long InsertParteCabSN(Facturacion_Parte_Cab f)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object Nro = adapter.H2_FACTURACION_PARTE_INSERT_CAB_SN(f.NroParte, DateTime.Parse(f.Fecha), f.NHC, f.InstitucionId, f.CentroId, f.NroInternacion, f.Ambulatorio, f.Internacion, f.UsuarioId, f.NroOrdenCarpeta, f.Observaciones,f.Nomenclador);
            if (Nro != null) return Convert.ToInt64(Nro.ToString());
            else return f.NroParte;
        }

        public long InsertParteDet(Facturacion_Parte_Det f)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            TimeSpan H = TimeSpan.Zero;
            if (!string.IsNullOrEmpty(f.HoraPractica)) H = TimeSpan.Parse(f.HoraPractica);
            long _NroOrden;
            if (!long.TryParse(f.NroOrden.ToString(), out _NroOrden)) _NroOrden = 0;
            object Nro = adapter.H2_FACTURACION_PARTE_INSERT_DET(f.NroParte, f.Ambulatorio, f.Internacion, f.Modulo, f.Practica, DateTime.Parse(f.FechaPractica), DateTime.Parse(f.FechaRendicion),
                f.ServicioId, f.EspecialidadId, f.MedicoId, f.Cantidad, f.Porcentaje, f.PracticaId, f.Total, f.Facturarlo, f.APE, H, f.Honorarios, f.PrecioHonorario, f.Detalle, _NroOrden,f.SubPracticaId);
            return Convert.ToInt64(Nro.ToString());
        }

        public long NroInternacionbyNHC(long NHC)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object Nro = adapter.H2_FACTURACION_NROINTERNACION_BY_NHC_SN(NHC);
            long n = Convert.ToInt64(Nro.ToString());
            if (n != 0) return n;
            else
            {
                return 0;
                throw new Exception("La Internación tiene una rendición asociada");
            }
        }

        public void InsertHonorariosMed(Facturacion_Honorarios_Med f)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_INSERT_HONO_PRACTICA(f.NroParte, f.PracticaId, f.MedicoId, f.Honorario, f.Tipo,f.Porcentaje,f.Detalle);
        }

        public void DeleteHonorariosMed(long NroParte)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACT_DELETE_HONO_MEDICOS(NroParte);
        }

        public decimal ValorPractica(int PracticaId)
        {
            PracticasDALTableAdapters.QueriesTableAdapter adapter = new PracticasDALTableAdapters.QueriesTableAdapter();
            object Precio = adapter.H2_Practica_PrecioFacturado(PracticaId);
            if (Precio != null)
                return Convert.ToDecimal(Precio.ToString());
            else return 0;
        }

        public FactValorHonoMedicos ValorHonoMedicoporConvenio(int EspecialidadId, int MedicoId, DateTime FechaParte, long Codigo)
        {
            FacturacionDALTableAdapters.H2_FACT_VALOR_HONO_MEDICOTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_VALOR_HONO_MEDICOTableAdapter();
            FacturacionDAL.H2_FACT_VALOR_HONO_MEDICODataTable aTable = adapter.GetData(EspecialidadId, MedicoId, FechaParte,Codigo);
            if (aTable.Rows.Count > 0) return CreateFromRow_ValorHonoMedicoporConvenio(aTable[0]);
            else return null;
        }

        public FactValorPracticasEspecialidad ValorPracticaporConvenio(int Seccional, int EspecialidadId, int PracticaId, int Nomenclador)
        {  
            try
            {
                FacturacionDALTableAdapters.H2_FACT_VALOR_PRAC_CONVENIOTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_VALOR_PRAC_CONVENIOTableAdapter();
                FacturacionDAL.H2_FACT_VALOR_PRAC_CONVENIODataTable aTable = adapter.GetData(Seccional, EspecialidadId, PracticaId, Nomenclador);
                if (aTable.Rows.Count > 0) return CreateFromRow_ValorPracticaporConvenio(aTable[0]);
                else return null;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public FactValorPracticasEspecialidad ValorAnteriorPracticaporConvenio(int InstSecc, int EspecialidadId, int PracticaId, string Fecha)
        {
            FacturacionDALTableAdapters.H2_FACT_VALOR_ANTERIOR_PRAC_CONVENIOTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_VALOR_ANTERIOR_PRAC_CONVENIOTableAdapter();
            DateTime _fecha;
            if (Fecha.Equals("1")) _fecha = DateTime.Now.AddDays(1);
            else _fecha = DateTime.Parse(Fecha);
            FacturacionDAL.H2_FACT_VALOR_ANTERIOR_PRAC_CONVENIODataTable aTable = adapter.GetData(InstSecc, EspecialidadId, PracticaId, _fecha);
            if (aTable.Rows.Count > 0) return CreateFromRow_ValorPracticaporConvenio(aTable[0]);
            else return null;
        }


        private FactValorHonoMedicos CreateFromRow_ValorHonoMedicoporConvenio(FacturacionDAL.H2_FACT_VALOR_HONO_MEDICORow row)
        {
            FactValorHonoMedicos f = new FactValorHonoMedicos();

            f.convenioid = row.convenioId;
            f.especialidadid = (int)row.especialidadId;
            f.medicoId = row.medicoId;

            if (!row.IsvhonoNull())
                f.ValorHonorario = row.vhono.ToString();

            return f;
        }

        private FactValorPracticasEspecialidad CreateFromRow_ValorPracticaporConvenio(FacturacionDAL.H2_FACT_VALOR_ANTERIOR_PRAC_CONVENIORow row)
        {
            FactValorPracticasEspecialidad f = new FactValorPracticasEspecialidad();

            f.convenioid = row.convenioId;
            f.especialidadid = row.especialidadId;
            f.practicaid = row.codigoId;

            if (!row.IsvcargoafiliadoNull())
                f.ValorACA = row.vcargoafiliado.ToString();

            if (!row.IsvcargoinsNull())
                f.ValorACI = row.vcargoins.ToString();

            if (!row.IsvbonoNull())
                f.ValorBono = row.vbono.ToString();

            if (!row.IsvgastosNull())
                f.ValorGastos = row.vgastos.ToString();

            if (!row.IsvhonoNull())
                f.ValorHonorario = row.vhono.ToString();

            if (!row.IsvnnNull())
                f.ValorNN = row.vnn.ToString();
            return f;
        }

        private FactValorPracticasEspecialidad CreateFromRow_ValorPracticaporConvenio(FacturacionDAL.H2_FACT_VALOR_PRAC_CONVENIORow row)
        {
            FactValorPracticasEspecialidad f = new FactValorPracticasEspecialidad();
            
            f.convenioid = row.convenioId;
            f.especialidadid = row.especialidadId;
            f.practicaid = row.codigoId;
            f.nomencladorid = row.nomencladorId;

            if(!row.IsvcargoafiliadoNull())
            f.ValorACA = row.vcargoafiliado.ToString();

            if(!row.IsvcargoinsNull())
            f.ValorACI = row.vcargoins.ToString();

            if (!row.IsvbonoNull())
            f.ValorBono = row.vbono.ToString();

            if(!row.IsvgastosNull())
            f.ValorGastos = row.vgastos.ToString();

            if(!row.IsvhonoNull())
            f.ValorHonorario = row.vhono.ToString();

            if (!row.IsvnnNull())
            f.ValorNN = row.vnn.ToString();
            return f;
        }

        public List<Facturacion_Buscar_Partes> ListPartesMedicos(long NroParte,DateTime DesdeParte, DateTime HastaParte, DateTime DesdePrac, DateTime HastaPrac, DateTime DesdeRend, DateTime HastaRend, int EspecialidadId, int MedicoId)
        {
            List<Facturacion_Buscar_Partes> lista = new List<Facturacion_Buscar_Partes>();
            FacturacionDALTableAdapters.H2_FACTURACION_LIST_PARTES_MEDICOSTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_LIST_PARTES_MEDICOSTableAdapter();
            FacturacionDAL.H2_FACTURACION_LIST_PARTES_MEDICOSDataTable aTable = adapter.GetData(NroParte, DesdeParte, HastaParte, DesdePrac, HastaPrac, DesdeRend, HastaRend, EspecialidadId, MedicoId);
            foreach (FacturacionDAL.H2_FACTURACION_LIST_PARTES_MEDICOSRow row in aTable.Rows)
            {
                lista.Add(CreateRowFromListPartesMedicos(row));
            }
            return lista;
        }

        private Facturacion_Buscar_Partes CreateRowFromListPartesMedicos(FacturacionDAL.H2_FACTURACION_LIST_PARTES_MEDICOSRow row)
        {
            Facturacion_Buscar_Partes f = new Facturacion_Buscar_Partes();

            f.Fecha = row.Fecha.ToShortDateString();
            f.Seccional = row.Servicio;
            f.NroParte = row.NroParte;
            return f;
        }

        public List<Facturacion_Buscar_Partes> ListPartes(long NHC, int InstitucionId, string Afiliado, int SeccionalId, long NroParte,
           DateTime DesdeParte, DateTime HastaParte, DateTime DesdePrac, DateTime HastaPrac, DateTime DesdeRend, DateTime HastaRend, int EspecialidadId, int MedicoId)
        {
            List<Facturacion_Buscar_Partes> lista = new List<Facturacion_Buscar_Partes>();
            FacturacionDALTableAdapters.H2_FACTURACION_LIST_PARTESTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_LIST_PARTESTableAdapter();
            FacturacionDAL.H2_FACTURACION_LIST_PARTESDataTable aTable = adapter.GetData(NHC,InstitucionId,Afiliado,SeccionalId,NroParte,DesdeParte,HastaParte,DesdePrac,HastaPrac,DesdeRend,HastaRend,EspecialidadId,MedicoId);
            foreach(FacturacionDAL.H2_FACTURACION_LIST_PARTESRow row in aTable.Rows)
            {
                lista.Add(CreateRowFromListPartes(row));
            }
            return lista;
        }

        public List<Facturacion_Buscar_Partes> ListPartesSN(long NHC, int InstitucionId, string Afiliado, long NroParte,DateTime DesdeParte, DateTime HastaParte)
        {
            List<Facturacion_Buscar_Partes> lista = new List<Facturacion_Buscar_Partes>();
            FacturacionDALTableAdapters.H2_FACTURACION_LIST_PARTES_SNTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_LIST_PARTES_SNTableAdapter();
            FacturacionDAL.H2_FACTURACION_LIST_PARTES_SNDataTable aTable = adapter.GetData(NHC, InstitucionId, Afiliado, NroParte, DesdeParte, HastaParte);
            foreach (FacturacionDAL.H2_FACTURACION_LIST_PARTES_SNRow row in aTable.Rows)
            {
                lista.Add(CreateRowFromListPartes_SN(row));
            }
            return lista;
        }

        private Facturacion_Buscar_Partes CreateRowFromListPartes(FacturacionDAL.H2_FACTURACION_LIST_PARTESRow row)
        {
            Facturacion_Buscar_Partes f = new Facturacion_Buscar_Partes();
            
            f.Fecha = row.Fecha.ToShortDateString();
            f.NHC = row.NHC;
            f.NroParte = row.NroParte;
            f.Paciente = row.Paciente;
            if(!row.IsSeccionalNull())
            f.Seccional = row.Seccional;
            return f;
        }

        private Facturacion_Buscar_Partes CreateRowFromListPartes_SN(FacturacionDAL.H2_FACTURACION_LIST_PARTES_SNRow row)
        {
            Facturacion_Buscar_Partes f = new Facturacion_Buscar_Partes();

            f.Fecha = row.Fecha.ToShortDateString();
            f.NHC = row.NHC;
            f.NroParte = row.NroParte;
            f.Paciente = row.Paciente;
            if (!row.IsSeccionalNull())
                f.Seccional = row.Seccional;
            return f;
        }

        public Facturacion_ParteMedicos_Cab ListParteCabMedicos(int NroParte)
        {
            FacturacionDALTableAdapters.H2_FACTURACION_LISTPARTES_MEDICOS_BY_NROPARTETableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_LISTPARTES_MEDICOS_BY_NROPARTETableAdapter();
            FacturacionDAL.H2_FACTURACION_LISTPARTES_MEDICOS_BY_NROPARTEDataTable aTable = adapter.GetData(NroParte);
            if (aTable.Rows.Count > 0)
                return CreateFromRowListParteCabMedicos(aTable[0]);
            else return null;
        }

        private Facturacion_ParteMedicos_Cab CreateFromRowListParteCabMedicos(FacturacionDAL.H2_FACTURACION_LISTPARTES_MEDICOS_BY_NROPARTERow row)
        {
            Facturacion_ParteMedicos_Cab f = new Facturacion_ParteMedicos_Cab();
            f.CentroId = row.CentroId;
            f.Fecha = row.Fecha.ToShortDateString();
            f.MedicoId = row.MedicoId;
            f.NroParte = row.NroParte;
            if (!row.IsBajaNull()) f.Baja = row.Baja;
            else f.Baja = false;
            f.Ambulatorio = row.Ambulatorio;
            f.Internacion = row.Internacion;
            return f;
        }

        public Facturacion_Parte_Cab ListParteCab(int NroParte)
        {
            FacturacionDALTableAdapters.H2_FACTURACION_LISTPARTES_BY_NROPARTETableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_LISTPARTES_BY_NROPARTETableAdapter();
            FacturacionDAL.H2_FACTURACION_LISTPARTES_BY_NROPARTEDataTable aTable = adapter.GetData(NroParte);
            if (aTable.Rows.Count > 0)
                return CreateFromRowListParteCab(aTable[0]);
            else return null;
        }

        private Facturacion_Parte_Cab CreateFromRowListParteCab(FacturacionDAL.H2_FACTURACION_LISTPARTES_BY_NROPARTERow row)
        {
            Facturacion_Parte_Cab f = new Facturacion_Parte_Cab();
            f.CentroId = row.CentroId;
            f.Fecha = row.Fecha.ToShortDateString();
            f.InstitucionId = row.InstitucionId;
            f.NHC = row.NHC;
            f.NroParte = row.NroParte;
            f.NroInternacion = row.NroInternacion;
            f.Ambulatorio = row.Ambulatorio;
            f.Internacion = row.Internacion;
            f.Nomenclador = row.Nomenclador;
            if (!row.IsNroOrdenInt_CarpetaNull()) f.NroOrdenCarpeta = row.NroOrdenInt_Carpeta;
            else f.NroOrdenCarpeta = string.Empty;
            if (!row.IsObservacionesNull()) f.Observaciones = row.Observaciones;
            else f.Observaciones = string.Empty;
            return f;
        }

        public List<Facturacion_GenerarHono_List> GenerarHono_List(string Desde, string Hasta)
        {
            List<Facturacion_GenerarHono_List> list = new List<Facturacion_GenerarHono_List>();
            FacturacionDALTableAdapters.H2_FACT_PARTES_CON_HONO_LISTTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_PARTES_CON_HONO_LISTTableAdapter();
            DateTime _desde = DateTime.Parse(Desde); 
            DateTime _hasta = DateTime.Parse(Hasta);
            if (_desde <= _hasta)
            {
                FacturacionDAL.H2_FACT_PARTES_CON_HONO_LISTDataTable aTable = adapter.GetData(_desde, _hasta);
                foreach (FacturacionDAL.H2_FACT_PARTES_CON_HONO_LISTRow row in aTable.Rows)
                {
                    list.Add(CreateFromRowGenerarHono_List(row));
                }
                return list;
            }
            else throw new Exception("Verifique las fechas.");
        }

        private Facturacion_GenerarHono_List CreateFromRowGenerarHono_List(FacturacionDAL.H2_FACT_PARTES_CON_HONO_LISTRow row)
        {
            Facturacion_GenerarHono_List f = new Facturacion_GenerarHono_List();
            f.Fecha = row.Fecha.ToShortDateString();
            f.NHC = row.NHC;
            f.NroParte = row.NroParte;
            f.ObraSocial = row.OS;
            f.Paciente = row.Paciente;
            if (!row.IsFechaImpresoNull())
                f.FechaImpreso = row.FechaImpreso.ToString();
            else f.FechaImpreso = string.Empty;
            f.NroOrdenInt = row.NroOrdenInt;
            return f;
        }

        public List<FactValorModulosConvenio> ListaModulosConveniosTotal(int NomencladorId,long ConvenioId, int Codigo)
        {
            try
            {
                List<FactValorModulosConvenio> lista = new List<FactValorModulosConvenio>();
                FacturacionDALTableAdapters.H2_Fact_ModulosConvenio_ListaTotalTableAdapter adapter = new FacturacionDALTableAdapters.H2_Fact_ModulosConvenio_ListaTotalTableAdapter();
                FacturacionDAL.H2_Fact_ModulosConvenio_ListaTotalDataTable aTable = adapter.GetData(NomencladorId, ConvenioId, Codigo);
                foreach (FacturacionDAL.H2_Fact_ModulosConvenio_ListaTotalRow row in aTable.Rows)
                {
                    FactValorModulosConvenio m = new FactValorModulosConvenio();
                    m.convenio = row.convenio;
                    m.nomencladorid = row.nomencladorId;
                    m.convenioid = row.convenioId;
                    m.modulo = row.modulo;
                    m.moduloid = row.moduloId;
                    m.ValorACA = row.vcargoafiliado;
                    m.ValorACI = row.vcargoins;
                    m.ValorBono = row.vbono;
                    m.ValorGastos = row.vgastos;
                    m.ValorHonorario = row.vhono;
                    m.ValorNN = row.vnn;
                    lista.Add(m);
                }
                return lista;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<FactValorModulosConvenio> ListaModulosbyEnc(int EncabezadoId)
        {
            List<FactValorModulosConvenio> lista = new List<FactValorModulosConvenio>();
            FacturacionDALTableAdapters.H2_FACT_MODULOS_LIST_BYENCABEZADOTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_MODULOS_LIST_BYENCABEZADOTableAdapter();
            FacturacionDAL.H2_FACT_MODULOS_LIST_BYENCABEZADODataTable aTable = adapter.GetData(EncabezadoId);
            foreach (FacturacionDAL.H2_FACT_MODULOS_LIST_BYENCABEZADORow row in aTable.Rows)
            {
                FactValorModulosConvenio m = new FactValorModulosConvenio();
                m.moduloid = row.Codigo;
                m.modulo = row.Descripcion;
                lista.Add(m);
            }

            return lista;

        }

        private Facturacion_Medicos_Det CreateRowFromListParteDetMedicos(FacturacionDAL.H2_FACTURACION_LISTPARTESMEDICOS_BY_NROPARTE_DETRow row)
        {
            Facturacion_Medicos_Det f = new Facturacion_Medicos_Det();
            if (!row.IsAmbulatorioNull())
                f.Ambulatorio = row.Ambulatorio;
            if (!row.IsCantidadNull())
                f.Cantidad = row.Cantidad;
            if (!row.IsEspecialidadIdNull())
                f.EspecialidadId = row.EspecialidadId;
            if (!row.IsFacturarloNull())
                f.Facturarlo = row.Facturarlo;
            if (!row.IsFechaPracticaNull())
                f.FechaPractica = row.FechaPractica.ToShortDateString();
            if (!row.IsFechaRendicionNull())
                f.FechaRendicion = row.FechaRendicion.ToShortDateString();
            if (!row.IsInternacionNull())
                f.Internacion = row.Internacion;
            if (!row.IsModuloNull())
                f.Modulo = row.Modulo;
            f.NroParte = row.NroParte;
            if (!row.IsPorcentajeNull())
                f.Porcentaje = row.Porcentaje;
            if (!row.IsPracticaNull())
                f.Practica = row.Practica;
            if (!row.IsPracticaIdNull())
                f.PracticaId = row.PracticaId;
            if (!row.IsPrecioNull())
                f.Precio = row.Precio;
            if (!row.IsServicioIdNull())
                f.ServicioId = row.ServicioId;
            if (!row.IsPracticaDescNull())
                f.PracNombre = row.PracticaDesc;
            return f;
        }


        public List<Facturacion_Medicos_Det> ListParteDetMedicos(int NroParte)
        {
            List<Facturacion_Medicos_Det> lista = new List<Facturacion_Medicos_Det>();
            FacturacionDALTableAdapters.H2_FACTURACION_LISTPARTESMEDICOS_BY_NROPARTE_DETTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_LISTPARTESMEDICOS_BY_NROPARTE_DETTableAdapter();
            FacturacionDAL.H2_FACTURACION_LISTPARTESMEDICOS_BY_NROPARTE_DETDataTable aTable = adapter.GetData(NroParte);
            foreach (FacturacionDAL.H2_FACTURACION_LISTPARTESMEDICOS_BY_NROPARTE_DETRow row in aTable.Rows)
            {
                lista.Add(CreateRowFromListParteDetMedicos(row));
            }
            return lista;
        }


        public List<Facturacion_Parte_Det> ListParteDet(int NroParte)
        {
            List<Facturacion_Parte_Det> lista = new List<Facturacion_Parte_Det>();
            FacturacionDALTableAdapters.H2_FACTURACION_LISTPARTES_BY_NROPARTE_DETTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_LISTPARTES_BY_NROPARTE_DETTableAdapter();
            FacturacionDAL.H2_FACTURACION_LISTPARTES_BY_NROPARTE_DETDataTable aTable = adapter.GetData(NroParte);
            foreach (FacturacionDAL.H2_FACTURACION_LISTPARTES_BY_NROPARTE_DETRow row in aTable.Rows)
            {
                lista.Add(CreateRowFromListaParteDet(row));
            }
            return lista;
        }

        public long InsertMedicamentosCab(long NroParte,DateTime FechaParte,DateTime FechaRendicion, long NHC)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object o = adapter.H2_FACTURACION_MEDICAMENTOS_CAB(NroParte, FechaParte, FechaRendicion, NHC);
            return Convert.ToInt64(o.ToString());
        }

        public void InsertMedicamentosDet(Facturacion_Medicamentos_Det m)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACTURACION_DETALLES_MEDICAMENTOS_INSERT(m.NroParte, m.Ambulatorio, m.Internacion, m.Medicamento, m.Monodroga, m.Cantidad, m.Precio, DateTime.Parse(m.FechaPractica), m.Facturarlo, m.Estadisticas, m.APE,m.Porcentaje);
        }

        public void InsertDescartablesDet(Facturacion_Descartables_Det m)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACTURACION_DETALLES_DESC_INSERT(m.NroParte, m.InsumoId, m.Cantidad, m.Precio, DateTime.Parse(m.FechaPractica), m.Facturarlo, m.Estadisticas, m.APE, m.Internacion, m.Ambulatorio, m.Porcentaje);
        }

        public Facturacion_Medicamentos_Cab List_Medicamentos_Cab(long NroParte)
        {
            FacturacionDALTableAdapters.H2_FACTURACION_MEDICAMENTOS_CAB_LIST_BYPARTETableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_MEDICAMENTOS_CAB_LIST_BYPARTETableAdapter();
            FacturacionDAL.H2_FACTURACION_MEDICAMENTOS_CAB_LIST_BYPARTEDataTable aTable = adapter.GetData(NroParte);
            if (aTable.Rows.Count > 0)
                return CreateFromRowListMedicamentosCab(aTable[0]);
            else return null;
        }

        private Facturacion_Medicamentos_Cab CreateFromRowListMedicamentosCab(FacturacionDAL.H2_FACTURACION_MEDICAMENTOS_CAB_LIST_BYPARTERow row)
        {
            Facturacion_Medicamentos_Cab f = new Facturacion_Medicamentos_Cab();
            f.FechaParte = row.FechaParte.ToShortDateString();
            f.FechaRendicion = row.FechaRendicion.ToShortDateString();
            f.NHC = row.NHC;
            f.NroParte = row.NroParte;
            return f;
        }

        public List<Facturacion_Descartables_Det> List_Descartables_Det(long NroParte)
        {
            List<Facturacion_Descartables_Det> lista = new List<Facturacion_Descartables_Det>();
            FacturacionDALTableAdapters.H2_FACTURACION_DESC_DETALLES_LIST_BYPARTETableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_DESC_DETALLES_LIST_BYPARTETableAdapter();
            FacturacionDAL.H2_FACTURACION_DESC_DETALLES_LIST_BYPARTEDataTable aTable = adapter.GetData(NroParte);
            foreach (FacturacionDAL.H2_FACTURACION_DESC_DETALLES_LIST_BYPARTERow row in aTable.Rows)
            {
                lista.Add(CreateFromRowDescartableDet(row));
            }
            return lista;
        }

        private Facturacion_Descartables_Det CreateFromRowDescartableDet(FacturacionDAL.H2_FACTURACION_DESC_DETALLES_LIST_BYPARTERow row)
        {
            Facturacion_Descartables_Det f = new Facturacion_Descartables_Det();
            f.APE = row.APE;
            f.Cantidad = row.Cantidad;
            f.Descripcion = row.REM_NOMBRE + "-" + row.REM_GRAMAJE + row.medida;
            f.InsumoId = row.InsumoId;
            f.Estadisticas = row.Estadisticas;
            f.Facturarlo = row.Facturarlo;
            f.Internacion = row.Internacion;
            f.Ambulatorio = row.Ambulatorio;
            if (!row.IsFechaPracticaNull())
            f.FechaPractica = row.FechaPractica.ToShortDateString();
            f.NroParte = row.NroParte;
            if (!row.IsPrecioNull())
            f.Precio = row.Precio;
            if (!row.IsPorcentajeNull())
                f.Porcentaje = row.Porcentaje;
            return f;
        }

        public List<Facturacion_Medicamentos_Det> List_Medicamentos_Det(long NroParte)
        {
            List<Facturacion_Medicamentos_Det> lista = new List<Facturacion_Medicamentos_Det>();
            FacturacionDALTableAdapters.H2_FACTURACION_MEDICAMENTOS_DETALLES_LIST_BYPARTETableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_MEDICAMENTOS_DETALLES_LIST_BYPARTETableAdapter();
            FacturacionDAL.H2_FACTURACION_MEDICAMENTOS_DETALLES_LIST_BYPARTEDataTable aTable = adapter.GetData(NroParte);
            foreach (FacturacionDAL.H2_FACTURACION_MEDICAMENTOS_DETALLES_LIST_BYPARTERow row in aTable.Rows)
            {
                lista.Add(CreateFromRowMedicamentosDet(row));
            }
            return lista;
        }

        public void Delete_Descartables_Det(long NroParte) {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACTURACION_DESC_DETALLES_DELETE_BYPARTE(NroParte);
        }

        public void Delete_Medicamentos_Det(long NroParte)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACTURACION_MEDICAMENTOS_DETALLES_DELETE_BYPARTE(NroParte);
        }

        private Facturacion_Medicamentos_Det CreateFromRowMedicamentosDet(FacturacionDAL.H2_FACTURACION_MEDICAMENTOS_DETALLES_LIST_BYPARTERow row)
        {
            Facturacion_Medicamentos_Det f = new Facturacion_Medicamentos_Det();
            f.APE = row.APE;
            f.Cantidad = row.Cantidad;
            f.Medicamento_Nombre = row.Insumo + " - " + row.medida;
            f.Medicamento = row.Medicamento;
            if (!row.IsMonodrogaNull())
            f.Monodroga = row.Monodroga;
            if (!row.IsMonodroga_NombreNull())
                f.Monodroga_Nombre = row.Monodroga_Nombre;
            else f.Monodroga_Nombre = "";
            f.DetalleId = row.DetalleId;
            f.Estadisticas = row.Estadisticas;
            f.Facturarlo = row.Facturarlo;
            if (!row.IsInternacionNull())
            f.Internacion = row.Internacion;
            if (!row.IsAmbulatorioNull())
            f.Ambulatorio = row.Ambulatorio;
            if (!row.IsFechaPracticaNull())
                f.FechaPractica = row.FechaPractica.ToShortDateString();
            f.NroParte = row.NroParte;
            if (!row.IsPrecioNull())
                f.Precio = row.Precio;
            if (!row.IsPorcentajeNull())
                f.Porcentaje = row.Porcentaje;
            return f;
        }

        private Facturacion_Parte_Det CreateRowFromListaParteDet(FacturacionDAL.H2_FACTURACION_LISTPARTES_BY_NROPARTE_DETRow row)
        {
            Facturacion_Parte_Det f = new Facturacion_Parte_Det();
            if (!row.IsAmbulatorioNull())
            f.Ambulatorio = row.Ambulatorio;
            if (!row.IsAPENull())
            f.APE = row.APE;
            if (!row.IsCantidadNull())
            f.Cantidad = row.Cantidad;
            if(!row.IsEspecialidadIdNull())
            f.EspecialidadId = row.EspecialidadId;
            if (!row.IsFacturarloNull())
            f.Facturarlo = row.Facturarlo;
            if (!row.IsFechaPracticaNull())
            f.FechaPractica = row.FechaPractica.ToShortDateString();
            if (!row.IsFechaRendicionNull())
            f.FechaRendicion = row.FechaRendicion.ToShortDateString();
            if (!row.IsHonorariosNull())
            f.Honorarios = row.Honorarios;
            if (!row.IsInternacionNull())
            f.Internacion = row.Internacion;
            if (!row.IsMedicoIdNull())
            f.MedicoId = row.MedicoId;
            if (!row.IsModuloNull())
            f.Modulo = row.Modulo;
            f.NroParte = row.NroParte;
            if (!row.IsPorcentajeNull())
            f.Porcentaje = row.Porcentaje;
            if (!row.IsPracticaNull())
            f.Practica = row.Practica;
            if (!row.IsPracticaIdNull())
            f.PracticaId = row.PracticaId;
            if (!row.IsPrecioNull())
            f.Precio = row.Precio;
            if (!row.IsServicioIdNull())
            f.ServicioId = row.ServicioId;
            if (!row.IsPracticaDescNull())
            f.Prac_Nombre = row.PracticaDesc;
            if (!row.IsPrecioHonorarioNull())
                f.PrecioHonorario = row.PrecioHonorario;
            else f.PrecioHonorario = 0;
            if (!row.IsHoraNull())
            {
                int m = row.Hora.Minutes;
                string strm;
                if (m < 10) strm = "0" + m.ToString();
                else strm = m.ToString();
                f.HoraPractica = row.Hora.Hours.ToString() + ":" + strm;
            }
            else f.HoraPractica = string.Empty;
            f.Detalle = (int)row.DetalleId;
            if (!row.IsNroOrdenNull())
                f.NroOrden = row.NroOrden;
            if (!row.IsSubCodigoIdNull())
                f.SubPracticaId = row.SubCodigoId;
            return f;
        }



        public decimal Fact_PrecioMax_Monodroga(int MonodrogaId, int InsumoId)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object precio = adapter.H2_FACT_PRECIOMAX_MONODROGA(MonodrogaId, InsumoId);
            if (precio != null) return Convert.ToDecimal(precio.ToString());
            return 0;
        }

        public List<Facturacion_SeleccionDatos> List_Partes_SeleccionDatos(long NHC, string Afiliado, int SeccionalId, int Estado, bool Ambos, bool Internacion, bool Ambulatorio,
            DateTime DesdeParte, DateTime HastaParte, int Order, int ServicioId)
        {
            List<Facturacion_SeleccionDatos> lista = new List<Facturacion_SeleccionDatos>();
            FacturacionDALTableAdapters.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOSTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOSTableAdapter();
            FacturacionDAL.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOSDataTable aTable = adapter.GetData(NHC, Afiliado, SeccionalId, Estado, Ambos, Internacion, Ambulatorio, DesdeParte, HastaParte, Order, ServicioId);
            foreach (FacturacionDAL.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOSRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_List_Partes_SeleccionDatos(row));
            }
            if (lista.Count > 0)
                return lista;
            else return null;
        }
        
        public List<Facturacion_SeleccionDatos> List_Partes_SeleccionDatosMedicos(long NroParte, int MedicoId, int EspecialidadId,int Estado, bool DatosRevalorizar, bool Ambos, bool Internacion, bool Ambulatorio,
            DateTime DesdeParte, DateTime DesdeRendicion, DateTime DesdePractica, DateTime HastaParte, DateTime HastaPractica, DateTime HastaRendicion)
        {
            List<Facturacion_SeleccionDatos> lista = new List<Facturacion_SeleccionDatos>();
            FacturacionDALTableAdapters.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOS_MEDICOSTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOS_MEDICOSTableAdapter();
            FacturacionDAL.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOS_MEDICOSDataTable aTable = adapter.GetData(NroParte, MedicoId, EspecialidadId, Estado, DatosRevalorizar, Ambos, Internacion, Ambulatorio, DesdeParte, DesdePractica, DesdeRendicion, HastaParte, HastaPractica, HastaRendicion);
            foreach (FacturacionDAL.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOS_MEDICOSRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_List_Partes_SeleccionDatosMedicos(row));
            }
            if (lista.Count > 0)
                return lista;
            else return null;
        }

        private Facturacion_SeleccionDatos CreateFromRow_List_Partes_SeleccionDatosMedicos(FacturacionDAL.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOS_MEDICOSRow row)
        {
            Facturacion_SeleccionDatos f = new Facturacion_SeleccionDatos();
            f.Afiliado = row.Medico;
            if (!row.IsCantidadNull())
                f.Cantidad = row.Cantidad;
            if (!row.IsPracticaIdNull())
                f.Codigo = row.PracticaId;
            if (!row.IsPracticaNull())
                f.Practica = row.Practica;
            f.FechaParte = row.FechaParte.ToShortDateString();
            if (!row.IsFechaPracticaNull())
                f.FechaPractica = row.FechaPractica.ToShortDateString();
            if (!row.IsFechaRendicionNull())
                f.FechaRendicion = row.FechaRendicion.ToShortDateString();
            f.NroParte = row.NroParte;
            if (!row.IsProcesadoNull())
            {
                if (row.Procesado == 1) f.Select = "1";
                else f.Select = "0";
            }
            if (!row.IsRevalorizarNull())
            {
                if (row.Revalorizar) f.RV = "S";
                else f.RV = "N";
            }
            else f.RV = "N";
            return f;
        }


        public List<Facturacion_SeleccionDatos> List_Partes_SeleccionDatosSN(long NroParte,bool Ambos,bool Ambulatorio,long NHC, string Afiliado, int SeccionalId, long InstitucionId, int Estado, DateTime DesdeParte, DateTime HastaParte)
        {
            List<Facturacion_SeleccionDatos> lista = new List<Facturacion_SeleccionDatos>();
            FacturacionDALTableAdapters.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOS_SNTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOS_SNTableAdapter();
            FacturacionDAL.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOS_SNDataTable aTable = adapter.GetData(NroParte,Ambulatorio,Ambos, NHC, Afiliado, SeccionalId, InstitucionId, Estado, DesdeParte,HastaParte);
            foreach (FacturacionDAL.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOS_SNRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_List_Partes_SeleccionDatosSN(row));
            }
            if (lista.Count > 0)
                return lista;
            else return null;
        }

        public List<Facturacion_ListRendicionInternacionSN> List_RendicionInternacion_SN(long InstitucionId, DateTime DesdeParte, DateTime HastaParte, long DesdeRendicion, long HastaRendicion)
        {
            List<Facturacion_ListRendicionInternacionSN> lista = new List<Facturacion_ListRendicionInternacionSN>();
            FacturacionDALTableAdapters.H2_FACT_LISTRENDICION_INTERNACION_SNTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LISTRENDICION_INTERNACION_SNTableAdapter();
            FacturacionDAL.H2_FACT_LISTRENDICION_INTERNACION_SNDataTable aTable = adapter.GetData(InstitucionId, DesdeParte, HastaParte, DesdeRendicion, HastaRendicion);
            foreach (FacturacionDAL.H2_FACT_LISTRENDICION_INTERNACION_SNRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_List_RendicionInternacion_SN(row));
            }
            return lista;
        }

        public List<Facturacion_ListRendicionInternacionSN> List_RendicionAmbulatoria_Monica_SN(long InstitucionId, DateTime DesdeParte, DateTime HastaParte, long DesdeRendicion, long HastaRendicion)
        {
            List<Facturacion_ListRendicionInternacionSN> lista = new List<Facturacion_ListRendicionInternacionSN>();
            FacturacionDALTableAdapters.H2_FACT_LISTRENDICION_AMBULATORIA_SN_MONICATableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LISTRENDICION_AMBULATORIA_SN_MONICATableAdapter();
            FacturacionDAL.H2_FACT_LISTRENDICION_AMBULATORIA_SN_MONICADataTable aTable = adapter.GetData(InstitucionId, DesdeParte, HastaParte, DesdeRendicion, HastaRendicion);
            foreach (FacturacionDAL.H2_FACT_LISTRENDICION_AMBULATORIA_SN_MONICARow row in aTable.Rows)
            {
                Facturacion_ListRendicionInternacionSN f = new Facturacion_ListRendicionInternacionSN();
                f.Afiliado = row.Afiliado;
                f.FechaPractica = row.FechaParte.ToShortDateString();
                if (!row.IsNroBeneficiarioNull())
                    f.NroBeneficiario = row.NroBeneficiario;
                else f.NroBeneficiario = string.Empty;
                f.NroParte = row.NroParte;
                f.NroInternacion = row.NroInternacion;
                f.ObraSocial = row.Seccional;
                f.Gasto = row.Total;
                lista.Add(f);
            }
            return lista;
        }
        

        public List<Facturacion_ListRendicionInternacionSN> List_HonorariosInternacion_SN(long InstitucionId, DateTime DesdeParte, DateTime HastaParte, long DesdeRendicion, long HastaRendicion)
        {
            List<Facturacion_ListRendicionInternacionSN> lista = new List<Facturacion_ListRendicionInternacionSN>();
            FacturacionDALTableAdapters.H2_FACT_LISTRENDICION_HONORARIOS_INT_SNTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LISTRENDICION_HONORARIOS_INT_SNTableAdapter();
            FacturacionDAL.H2_FACT_LISTRENDICION_HONORARIOS_INT_SNDataTable aTable = adapter.GetData(InstitucionId, DesdeParte, HastaParte, DesdeRendicion, HastaRendicion);
            foreach (FacturacionDAL.H2_FACT_LISTRENDICION_HONORARIOS_INT_SNRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_List_HonorarioInternacion_SN(row));
            }
            return lista;
        }

        public List<Facturacion_ListRendicionInternacionSN> List_Rendicion_Facturacion_SN(DateTime Periodo, long OS, long NHC, int Tipo)
        {
            List<Facturacion_ListRendicionInternacionSN> lista = new List<Facturacion_ListRendicionInternacionSN>();
            FacturacionDALTableAdapters.H2_FACT_LIST_RENDICIONES_INT_FACTURATableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LIST_RENDICIONES_INT_FACTURATableAdapter();
            FacturacionDAL.H2_FACT_LIST_RENDICIONES_INT_FACTURADataTable aTable = adapter.GetData(Periodo, OS, NHC, Tipo);
            foreach (FacturacionDAL.H2_FACT_LIST_RENDICIONES_INT_FACTURARow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_List_Rendicion_Facturacion_SN(row));
            }
            return lista;
        }

        private Facturacion_ListRendicionInternacionSN CreateFromRow_List_Rendicion_Facturacion_SN(FacturacionDAL.H2_FACT_LIST_RENDICIONES_INT_FACTURARow row)
        {
            Facturacion_ListRendicionInternacionSN f = new Facturacion_ListRendicionInternacionSN();
            f.Afiliado = row.Afiliado;
            f.NroParte = row.NroParte;
            f.FechaPractica = row.FechaParte.ToShortDateString();
            f.NHC = row.NHC;
            f.ObraSocial = row.Seccional;
            f.NroInternacion = row.NroInternacion;
            f.NroBeneficiario = row.NroBeneficiario;
            f.Gasto = row.Total;
            return f;
        }

        public decimal GenerarTotal(long NroParte)
        {
            FacturacionDALTableAdapters.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOS_TOTALESPORPARTE_SNTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOS_TOTALESPORPARTE_SNTableAdapter();
            FacturacionDAL.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOS_TOTALESPORPARTE_SNDataTable aTable = adapter.GetData(NroParte);
            int i = 0;
                decimal Total = 0;
                for (i = 0; i <= aTable.Rows.Count - 1; i++)
                {
                    Total += aTable[i].Total;
                }
                return Total;
        }

        private Facturacion_ListRendicionInternacionSN CreateFromRow_List_RendicionInternacion_SN(FacturacionDAL.H2_FACT_LISTRENDICION_INTERNACION_SNRow row)
        {
            Facturacion_ListRendicionInternacionSN f = new Facturacion_ListRendicionInternacionSN();
            f.Afiliado = row.Afiliado;
            f.NHC = row.NHC;
            f.FechaPractica = row.FechaParte.ToShortDateString();
            if (!row.IsNroBeneficiarioNull())
                f.NroBeneficiario = row.NroBeneficiario;
            else f.NroBeneficiario = string.Empty;
            f.NroParte = row.NroParte;
            f.NroInternacion = row.NroInternacion;
            f.ObraSocial = row.Seccional;
            f.Gasto = GenerarTotal(f.NroParte);
            return f;
        }

        private Facturacion_ListRendicionInternacionSN CreateFromRow_List_HonorarioInternacion_SN(FacturacionDAL.H2_FACT_LISTRENDICION_HONORARIOS_INT_SNRow row)
        {
            Facturacion_ListRendicionInternacionSN f = new Facturacion_ListRendicionInternacionSN();
            f.Afiliado = row.Afiliado;
            f.FechaPractica = row.FechaParte.ToShortDateString();
            if (!row.IsNroBeneficiarioNull())
                f.NroBeneficiario = row.NroBeneficiario;
            else f.NroBeneficiario = string.Empty;
            f.NroParte = row.NroParte;
            f.NroInternacion = row.NroInternacion;
            f.ObraSocial = row.Seccional;
            f.Gasto = row.TotalHono;
            return f;
        }


        private Facturacion_SeleccionDatos CreateFromRow_List_Partes_SeleccionDatosSN(FacturacionDAL.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOS_SNRow row)
        {
            Facturacion_SeleccionDatos f = new Facturacion_SeleccionDatos();
            f.Afiliado = row.Afiliado;
            f.FechaParte = row.FechaParte.ToShortDateString();
            f.NHC = row.NHC;
            f.NroParte = row.NroParte;
            if (!row.IsProcesadoNull())
            {
                if (row.Procesado == 1) f.Select = "1";
                else f.Select = "0";
            }
            if (!row.IsSeccionalNull())
                f.Seccional = row.Seccional;
            else f.Seccional = string.Empty;
            f.Total = GenerarTotal(f.NroParte);
            return f;
        }
        
        public List<Facturacion_PreFacturacion> List_Partes_FacturadosMedicos(long NroRendicion)
        {
            List<Facturacion_PreFacturacion> lista = new List<Facturacion_PreFacturacion>();
            FacturacionDALTableAdapters.H2_FACT_LIST_DETALLES_FACTURADOS_MEDICOSTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LIST_DETALLES_FACTURADOS_MEDICOSTableAdapter();
            FacturacionDAL.H2_FACT_LIST_DETALLES_FACTURADOS_MEDICOSDataTable aTable = adapter.GetData(NroRendicion);
            foreach (FacturacionDAL.H2_FACT_LIST_DETALLES_FACTURADOS_MEDICOSRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_List_Partes_FacturadosMedicos(row));
            }
            if (lista.Count > 0)
                return lista;
            else return null;
        }

        private Facturacion_PreFacturacion CreateFromRow_List_Partes_FacturadosMedicos(FacturacionDAL.H2_FACT_LIST_DETALLES_FACTURADOS_MEDICOSRow row)
        {
            Facturacion_PreFacturacion f = new Facturacion_PreFacturacion();
            if (!row.IsCantidadNull())
                f.Cantidad = row.Cantidad;
            if (!row.IsFechaPracticaNull())
                f.FechaPractica = row.FechaPractica.ToShortDateString();
            if (!row.IsFechaRendicionNull())
                f.FechaRendicion = row.FechaRendicion.ToShortDateString();
            f.Practica = row.Practica;
            if (!row.IsPracticaIdNull())
                f.PracticaId = row.PracticaId;
            f.NroParte = row.NroParte;
            f.Tipo = row.Tipo;
            return f;
        }


        public List<Facturacion_PreFacturacion> List_Partes_Facturados(long NroRendicion)
        {
            List<Facturacion_PreFacturacion> lista = new List<Facturacion_PreFacturacion>();
            FacturacionDALTableAdapters.H2_FACT_LIST_DETALLES_FACTURADOSTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LIST_DETALLES_FACTURADOSTableAdapter();
            FacturacionDAL.H2_FACT_LIST_DETALLES_FACTURADOSDataTable aTable = adapter.GetData(NroRendicion);
            foreach (FacturacionDAL.H2_FACT_LIST_DETALLES_FACTURADOSRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_List_Partes_Facturados(row));
            }
            return lista;
        }


        public List<Facturacion_PreFacturacion> List_PreFacturacion(bool Ambulatorio, bool PorPractica, DateTime Fecha, bool Internacion,string Seccionales,string Instituciones)
        {
            List<Facturacion_PreFacturacion> lista = new List<Facturacion_PreFacturacion>();
            FacturacionDALTableAdapters.H2_FACTURACION_PREFACT_LISTTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_PREFACT_LISTTableAdapter();
            FacturacionDAL.H2_FACTURACION_PREFACT_LISTDataTable aTable = adapter.GetData(Ambulatorio,Internacion, PorPractica, Fecha,Seccionales,Instituciones);
            foreach (FacturacionDAL.H2_FACTURACION_PREFACT_LISTRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_List_PreFacturacion(row));
            }
            return lista;
        }

        public List<Facturacion_PreFacturacion> List_PreFacturacionMedicos(bool Ambulatorio, bool PorPractica, DateTime Fecha, bool Internacion, string Medicos)
        {
            List<Facturacion_PreFacturacion> lista = new List<Facturacion_PreFacturacion>();
            FacturacionDALTableAdapters.H2_FACTURACION_PREFACT_LIST_MEDICOSTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_PREFACT_LIST_MEDICOSTableAdapter();
            FacturacionDAL.H2_FACTURACION_PREFACT_LIST_MEDICOSDataTable aTable = adapter.GetData(Ambulatorio, Internacion, PorPractica, Fecha, Medicos);
            foreach (FacturacionDAL.H2_FACTURACION_PREFACT_LIST_MEDICOSRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_List_PreFacturacionMedicos(row));
            }
            if (lista.Count > 0)
                return lista;
            else return null;
        }

        private Facturacion_PreFacturacion CreateFromRow_List_PreFacturacionMedicos(FacturacionDAL.H2_FACTURACION_PREFACT_LIST_MEDICOSRow row)
        {
            Facturacion_PreFacturacion f = new Facturacion_PreFacturacion();
            if (!row.IsCantidadNull())
                f.Cantidad = row.Cantidad;
            if (!row.IsFechaPracticaNull())
                f.FechaPractica = row.FechaPractica.ToShortDateString();
            if (!row.IsFechaRendicionNull())
                f.FechaRendicion = row.FechaRendicion.ToShortDateString();
            f.Practica = row.Practica;
            if (!row.IsPracticaIdNull())
                f.PracticaId = row.PracticaId;
            f.NroParte = row.NroParte;
            f.Tipo = row.Tipo;
            return f;
        }


        public List<Facturacion_PreFacturacion> List_PreFacturacionSN(bool Ambulatorio, bool PorPractica, DateTime Fecha, bool Internacion, string Seccionales, string Instituciones)
        {
            List<Facturacion_PreFacturacion> lista = new List<Facturacion_PreFacturacion>();
            FacturacionDALTableAdapters.H2_FACTURACION_PREFACT_LIST_SNTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_PREFACT_LIST_SNTableAdapter();
            FacturacionDAL.H2_FACTURACION_PREFACT_LIST_SNDataTable aTable = adapter.GetData(Ambulatorio, Internacion, PorPractica, Fecha, Seccionales, Instituciones);
            foreach (FacturacionDAL.H2_FACTURACION_PREFACT_LIST_SNRow row in aTable.Rows)
            {
                lista.Add(CreateFromRow_List_PreFacturacionSN(row));
            }
            if (lista.Count > 0)
                return lista;
            else return null;
        }

        private Facturacion_PreFacturacion CreateFromRow_List_PreFacturacionSN(FacturacionDAL.H2_FACTURACION_PREFACT_LIST_SNRow row)
        {
            Facturacion_PreFacturacion f = new Facturacion_PreFacturacion();
            if (!row.IsCantidadNull())
                f.Cantidad = row.Cantidad;
            if (!row.IsFechaPracticaNull())
                f.FechaPractica = row.FechaPractica.ToShortDateString();
            if (!row.IsFechaRendicionNull())
                f.FechaRendicion = row.FechaRendicion.ToShortDateString();
            f.Practica = row.Practica;
            if (!row.IsPracticaIdNull())
                f.PracticaId = row.PracticaId;
            f.NroParte = row.NroParte;
            f.Tipo = row.Tipo;
            return f;
        }

        private Facturacion_PreFacturacion CreateFromRow_List_PreFacturacion(FacturacionDAL.H2_FACTURACION_PREFACT_LISTRow row)
        {
            Facturacion_PreFacturacion f = new Facturacion_PreFacturacion();
            if (!row.IsCantidadNull())
            f.Cantidad = row.Cantidad;
            if(!row.IsFechaPracticaNull())
            f.FechaPractica = row.FechaPractica.ToShortDateString();
            if(!row.IsFechaRendicionNull())
            f.FechaRendicion = row.FechaRendicion.ToShortDateString();
            f.Practica = row.Practica;
            if (!row.IsPracticaIdNull())
            f.PracticaId = row.PracticaId;
            f.NroParte = row.NroParte;
            f.Tipo = row.Tipo;
            return f;
        }

        private Facturacion_SeleccionDatos CreateFromRow_List_Partes_SeleccionDatos(FacturacionDAL.H2_FACTURACION_LIST_PARTES_BY_SELECCIONDATOSRow row)
        {
            Facturacion_SeleccionDatos f = new Facturacion_SeleccionDatos();
            if (!row.IsAfiliadoNull()) f.Afiliado = row.Afiliado;
            if (!row.IsCantidadNull()) f.Cantidad = row.Cantidad;
            if (!row.IsPracticaIdNull()) f.Codigo = row.PracticaId;
            if (!row.IsPracticaNull()) f.Practica = row.Practica;
            if (!row.IsFechaParteNull()) f.FechaParte = row.FechaParte.ToShortDateString();
            if (!row.IsFechaPracticaNull()) f.FechaPractica = row.FechaPractica.ToShortDateString();
            if (!row.IsFechaRendicionNull()) f.FechaRendicion = row.FechaRendicion.ToShortDateString();
            if (!row.IsNHCNull()) f.NHC = long.Parse(row.NHC.Replace(".","").Replace(" ",""));
            if (!row.IsNroParteNull()) f.NroParte = row.NroParte;
            if (!row.IsSeccionalNull()) f.Seccional = row.Seccional;
            if (!row.IsEspecialidadNull()) f.Especialidad = row.Especialidad;
            if (!row.IsMedicoNull()) f.Medico = row.Medico;

            if (!row.IsProcesadoNull())
            {
                if (row.Procesado == 1) f.Select = "1";
                else f.Select = "0";
            }
            if (!row.IsRevalorizarNull())
            {
                if (row.Revalorizar) f.RV = "S";
                else f.RV = "N";
            }
            else f.RV = "N";
            return f;
        }

        private Facturacion_PreFacturacion CreateFromRow_List_Partes_Facturados(FacturacionDAL.H2_FACT_LIST_DETALLES_FACTURADOSRow row)
        {
            Facturacion_PreFacturacion f = new Facturacion_PreFacturacion();
            if (!row.IsCantidadNull())
                f.Cantidad = row.Cantidad;
            if (!row.IsFechaPracticaNull())
                f.FechaPractica = row.FechaPractica.ToShortDateString();
            if (!row.IsFechaRendicionNull())
                f.FechaRendicion = row.FechaRendicion.ToShortDateString();
            f.Practica = row.Practica;
            if (!row.IsPracticaIdNull())
                f.PracticaId = row.PracticaId;
            f.NroParte = row.NroParte;
            f.Tipo = row.Tipo;
            return f;
        }

        public void InsertSeleccionDatos(Facturacion_SelectDatos_Table Obj)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACTURACION_INSERT_SELECCIONDATOS(Obj.NroParte, Obj.Codigo, -1, false, Obj.Procesado); 
        }

        public void InsertSeleccionDatosMedicos(Facturacion_SelectDatos_Table Obj)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACTURACION_INSERT_SELECCIONDATOS_MEDICOS(Obj.NroParte, Obj.Codigo, -1, false, Obj.Procesado);
        }

        public void InsertSeleccionDatosSN(Facturacion_SelectDatos_Table Obj,List<Facturacion_Descartables_Det> Des,
        List<Facturacion_Medicamentos_Det> Medic,List<Facturacion_Parte_Det> Detalles)
        {
            Des.ForEach(delegate(Facturacion_Descartables_Det d)
            {
                FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
                adapter.H2_FACTURACION_INSERT_SELECCIONDATOS_SN(Obj.NroParte, d.InsumoId ,Obj.Procesado);
            });
            Medic.ForEach(delegate(Facturacion_Medicamentos_Det m)
            {
                FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
                adapter.H2_FACTURACION_INSERT_SELECCIONDATOS_SN(Obj.NroParte, Convert.ToInt32(m.Medicamento), Obj.Procesado);
            });
            Detalles.ForEach(delegate(Facturacion_Parte_Det det)
            {
                FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
                adapter.H2_FACTURACION_INSERT_SELECCIONDATOS_SN(Obj.NroParte, det.PracticaId, Obj.Procesado);
            });
            
        }

        public void RevalorizarParte(Facturacion_SelectDatos_Table Obj)
        {
            try
            {
                FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
                adapter.H2_FACTURACION_PARTES_RV(Obj.NroParte, Obj.Codigo, Obj.PrecioRevalorizado, Obj.Revalorizado);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void RevalorizarParteMedicos(Facturacion_SelectDatos_Table Obj)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACTURACION_PARTES_RV_MEDICOS(Obj.NroParte, Obj.Codigo, Obj.PrecioRevalorizado, Obj.Revalorizado);
        }

        public void RevalorizarParteSN(Facturacion_SelectDatos_Table Obj)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACTURACION_PARTES_RV_SN(Obj.NroParte, Obj.Codigo, Obj.PrecioRevalorizado, Obj.Revalorizado);
        }

        public void UpdateFechaRendicion(long NroParte,long Codigo, DateTime Fecha)
        {
            try
            {
                FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
                adapter.H2_FACTURACION_UPDATE_FECHARENDICION(NroParte, Fecha, Codigo);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void UpdateFechaRendicionMedicos(long NroParte, long Codigo, DateTime Fecha)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACTURACION_UPDATE_FECHARENDICION_MEDICOS(NroParte, Fecha, Codigo);
        }

        public long UltimaRendicion()
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object r = adapter.H2_FACTURACION_ULTIMA_RENDICION();
            if (r != null) return Convert.ToInt64(r);
            else return 1;
        }

        public long UltimaRendicionMedicos()
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object r = adapter.H2_FACTURACION_ULTIMA_RENDICION_MEDICOS();
            if (r != null) return Convert.ToInt64(r);
            else return 1;
        }

        public void FacturarPartes(Facturacion_Parte_Det det, long NroRendicion, long UsuarioId, DateTime FechaFacturacion, string Observacion)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_FACTURACION_FACTURARPARTES(NroRendicion, det.NroParte, det.PracticaId, UsuarioId, FechaFacturacion, Observacion);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public void FacturarPartesMedicos(Facturacion_Parte_Det det, long NroRendicion, long UsuarioId, DateTime FechaFacturacion, string Observacion)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACTURACION_FACTURARPARTES_MEDICOS(NroRendicion, det.NroParte, det.PracticaId, UsuarioId, FechaFacturacion, Observacion);
        }

        public List<farmacia> ListInsumosDescartables()
        {
            List<farmacia> List = new List<farmacia>();
            FacturacionDALTableAdapters.H2_FACTURACION_LIST_INSUMOS_DESCARTABLESTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACTURACION_LIST_INSUMOS_DESCARTABLESTableAdapter();
            FacturacionDAL.H2_FACTURACION_LIST_INSUMOS_DESCARTABLESDataTable aTable = adapter.GetData();
            foreach (FacturacionDAL.H2_FACTURACION_LIST_INSUMOS_DESCARTABLESRow row in aTable.Rows)
            {
                List.Add(CreateFromRow_List_Insumos_Desc(row));
            }
            return List;
        }

        private farmacia CreateFromRow_List_Insumos_Desc (FacturacionDAL.H2_FACTURACION_LIST_INSUMOS_DESCARTABLESRow row)
        {
            farmacia i = new farmacia();
            i.REM_ID = row.REM_ID.ToString();
            i.REM_GRAMAJE = row.REM_GRAMAJE;
            i.REM_NOMBRE = row.REM_NOMBRE;
            i.REM_PRECIO = row.REM_PRECIO;
            i.Medida = row.medida;
            return i;
        }

        public long GetNroParte()
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object obj =  adapter.H2_FACT_GET_NROPARTE();
            if (obj != null)
                return Convert.ToInt64(obj.ToString());
            else return -1;

        }

        public List<Facturacion_Rendiciones> List_Rendiciones(long NroRendicion, long SeccionalId, bool Ambulatorio, bool Internacion, DateTime FechaDesde, DateTime FechaHasta)
        {
            List<Facturacion_Rendiciones> list = new List<Facturacion_Rendiciones>();
            FacturacionDALTableAdapters.H2_FACT_LIST_RENDICIONESTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LIST_RENDICIONESTableAdapter();
            FacturacionDAL.H2_FACT_LIST_RENDICIONESDataTable aTable = adapter.GetData(NroRendicion,SeccionalId,Ambulatorio,Internacion,FechaDesde,FechaHasta);
            foreach(FacturacionDAL.H2_FACT_LIST_RENDICIONESRow row in aTable.Rows)
            {
                list.Add(CreateFromRow_ListRendiciones(row));
            }
            return list;
        }

        private Facturacion_Rendiciones CreateFromRow_ListRendiciones(FacturacionDAL.H2_FACT_LIST_RENDICIONESRow row)
        {
            Facturacion_Rendiciones f = new Facturacion_Rendiciones();
            f.Año = row.Año.ToString();
            f.FechaFacturacion = row.FechaFacturacion.ToShortDateString();
            f.Mes = row.Mes.ToString();
            f.NroRendicion = row.NroRendicion;
            if (!row.IsSeccionalNull())
                f.Seccional = row.Seccional;
            else f.Seccional = "";
            return f;
        }

        public List<Facturacion_Rendiciones> List_RendicionesMedicos(long NroRendicion, long MedicoId, bool Ambulatorio, bool Internacion, DateTime FechaDesde, DateTime FechaHasta)
        {
            List<Facturacion_Rendiciones> list = new List<Facturacion_Rendiciones>();
            FacturacionDALTableAdapters.H2_FACT_LIST_RENDICIONES_MEDICOSTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LIST_RENDICIONES_MEDICOSTableAdapter();
            FacturacionDAL.H2_FACT_LIST_RENDICIONES_MEDICOSDataTable aTable = adapter.GetData(NroRendicion, MedicoId, Ambulatorio, Internacion, FechaDesde, FechaHasta);
            foreach (FacturacionDAL.H2_FACT_LIST_RENDICIONES_MEDICOSRow row in aTable.Rows)
            {
                list.Add(CreateFromRow_List_RendicionesMedicos(row));
            }
            return list;
        }

        private Facturacion_Rendiciones CreateFromRow_List_RendicionesMedicos(FacturacionDAL.H2_FACT_LIST_RENDICIONES_MEDICOSRow row)
        {
            Facturacion_Rendiciones f = new Facturacion_Rendiciones();
            f.Año = row.Año.ToString();
            f.FechaFacturacion = row.FechaFacturacion.ToShortDateString();
            f.Mes = row.Mes.ToString();
            f.NroRendicion = row.NroRendicion;
            f.Seccional = row.Medico;
            return f;
        }

        public List<Facturacion_PracticasFaltantes> List_PracticasFaltantes(long Seccional,long Institucion,bool Practica, DateTime FechaDesde, DateTime FechaHasta)
        {
            List<Facturacion_PracticasFaltantes> list = new List<Facturacion_PracticasFaltantes>();
            FacturacionDALTableAdapters.H2_FACT_PRACTICAS_MODULOS_SIN_CONVENIOTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_PRACTICAS_MODULOS_SIN_CONVENIOTableAdapter();
            FacturacionDAL.H2_FACT_PRACTICAS_MODULOS_SIN_CONVENIODataTable aTable = adapter.GetData(Seccional, Institucion, Practica, FechaDesde, FechaHasta);
            foreach (FacturacionDAL.H2_FACT_PRACTICAS_MODULOS_SIN_CONVENIORow row in aTable.Rows)
            {
                list.Add(CreateFromRow_List_PracticasFaltantes(row));
            }
            return list;
        }

        private Facturacion_PracticasFaltantes CreateFromRow_List_PracticasFaltantes(FacturacionDAL.H2_FACT_PRACTICAS_MODULOS_SIN_CONVENIORow row)
        {
            Facturacion_PracticasFaltantes f = new Facturacion_PracticasFaltantes();
            f.Afiliado = row.Apellido;
            f.Codigo = row.Codigo;
            f.Fecha = row.Fecha.ToShortDateString();
            f.NHC = row.NHC;
            f.NroParte = row.NroParte;
            f.Practica = row.Practica;
            return f;
        }

        public long PresupuestoInsertCab(Facturacion_Presupuesto_Cab f)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object Id = adapter.H2_FACT_PRESUPUESTO_CAB_INSERT(f.ServicioId, f.Paciente, f.SeccionalId, f.InstitucionId, f.EspecialidadId, f.MedicoId,f.Diagnostico,f.Incluye,f.NoIncluye,f.UsuarioId);
            if (Id != null) return Convert.ToInt64(Id.ToString());
            else return -1;
        }

        public void PresupuestoInsertDet(Facturacion_Presupuesto_Det d)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACT_PRESUPUESTOS_DET_INSERT(d.Presupuesto_Id, d.PracticaId, DateTime.Parse(d.FechaRendicion), DateTime.Parse(d.FechaPractica), d.Tipo, d.Modulo, d.Practica, d.Facturar, d.Cantidad, d.Precio, d.Total);
        }

        public List<Facturacion_Presupuesto_Cab> List_Presupuesto_Cab(long NroPresupuesto, long SeccionalId, long InstitucionId, DateTime Desde, DateTime Hasta)
        {
            List<Facturacion_Presupuesto_Cab> list = new List<Facturacion_Presupuesto_Cab>();
            FacturacionDALTableAdapters.H2_FACT_PRESUPUESTO_CAB_LISTTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_PRESUPUESTO_CAB_LISTTableAdapter();
            FacturacionDAL.H2_FACT_PRESUPUESTO_CAB_LISTDataTable aTable = adapter.GetData(NroPresupuesto, SeccionalId, InstitucionId, Desde, Hasta);
            foreach (FacturacionDAL.H2_FACT_PRESUPUESTO_CAB_LISTRow row in aTable.Rows)
            {
                list.Add(CreateFromRow_List_Presupuesto_Cab(row));
            }
            return list;
        }

        private Facturacion_Presupuesto_Cab CreateFromRow_List_Presupuesto_Cab(FacturacionDAL.H2_FACT_PRESUPUESTO_CAB_LISTRow row)
        {
            Facturacion_Presupuesto_Cab f = new Facturacion_Presupuesto_Cab();
            f.Presupuesto_Id = row.Presupuesto_Id;
            f.Seccional = row.Seccional;
            f.Fecha = row.Fecha.ToShortDateString();
            f.Paciente = row.Paciente;
            return f;
        }

        public Facturacion_Presupuesto_Cab List_Cabecera_byId(long NroPresupuesto)
        {
            Facturacion_Presupuesto_Cab Cab = new Facturacion_Presupuesto_Cab();
            FacturacionDALTableAdapters.H2_FACT_PRESUPUESTO_CAB_LIST_BYIDTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_PRESUPUESTO_CAB_LIST_BYIDTableAdapter();
            FacturacionDAL.H2_FACT_PRESUPUESTO_CAB_LIST_BYIDDataTable aTable = adapter.GetData(NroPresupuesto);
            foreach (FacturacionDAL.H2_FACT_PRESUPUESTO_CAB_LIST_BYIDRow row in aTable.Rows)
            {
                if (!row.IsIncluyeNull())
                Cab.Incluye = row.Incluye;
                if (!row.IsDiagnosticoNull())
                Cab.Diagnostico = row.Diagnostico;
                Cab.EspecialidadId = row.EspecialidadId;
                Cab.Fecha = row.Fecha.ToShortDateString();
                Cab.InstitucionId = row.InstitucionId;
                Cab.MedicoId = row.MedicoId;
                if (!row.IsNoIncluyeNull())
                Cab.NoIncluye = row.NoIncluye;
                Cab.Paciente = row.Paciente;
                Cab.SeccionalId = row.SeccionalId;
                Cab.InstitucionId = row.InstitucionId;
                Cab.Presupuesto_Id = row.Presupuesto_Id;
                Cab.ServicioId = row.ServicioId;
            }
            return Cab;
        }

        public List<Facturacion_Presupuesto_Det> List_Detalles_byId(long NroPresupuesto)
        {
            List<Facturacion_Presupuesto_Det> list = new List<Facturacion_Presupuesto_Det>();
            FacturacionDALTableAdapters.H2_FACT_PRESUPUESTO_LIST_DET_BYYDTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_PRESUPUESTO_LIST_DET_BYYDTableAdapter();
            FacturacionDAL.H2_FACT_PRESUPUESTO_LIST_DET_BYYDDataTable aTable = adapter.GetData(NroPresupuesto);
            foreach (FacturacionDAL.H2_FACT_PRESUPUESTO_LIST_DET_BYYDRow row in aTable.Rows)
            {
                list.Add(CreateFromRow_List_Detalles_byId(row));
            }
            return list;
        }

        private Facturacion_Presupuesto_Det CreateFromRow_List_Detalles_byId(FacturacionDAL.H2_FACT_PRESUPUESTO_LIST_DET_BYYDRow row)
        {
            Facturacion_Presupuesto_Det f = new Facturacion_Presupuesto_Det();
            f.Cantidad = row.Cantidad;
            f.Facturar = row.Facturar;
            f.FechaPractica = row.FechaPractica.ToShortDateString();
            f.FechaRendicion = row.FechaRendicion.ToShortDateString();
            f.Modulo = row.Modulo;
            f.Practica = row.Practica;
            f.PracticaDesc = row.PracticaDesc;
            f.PracticaId = row.PracticaId;
            f.Precio = row.Precio;
            f.Presupuesto_Id = row.PresupuestoId;
            f.Tipo = row.Tipo;
            f.Total = row.Total;
            return f;
        }

        public registro_internacion List_Fact_Internacion_by_Id(long NroInternacion, long NHC)
        {
            registro_internacion f = new registro_internacion();
            FacturacionDALTableAdapters.H2_FACT_INTERNACION_BY_IDTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_INTERNACION_BY_IDTableAdapter();
            FacturacionDAL.H2_FACT_INTERNACION_BY_IDDataTable aTable = adapter.GetData(NroInternacion,NHC);
            foreach (FacturacionDAL.H2_FACT_INTERNACION_BY_IDRow row in aTable.Rows)
            {
                if (!row.IsEgresoFechaNull())
                    f.egreso = row.EgresoFecha.ToShortDateString();
                else f.egreso = "";
                f.ingreso = row.Fecha.ToString();
                f.id = row.Id.ToString();
                f.idservicio = row.ServicioId;
                f.cama = row.Cama;
            }
            return f;
        }

        public List<Facturacion_Honorarios_Med> List_Fact_MedicosHono_by_Parte(long NroParte)
        {
            List<Facturacion_Honorarios_Med> list = new List<Facturacion_Honorarios_Med>();
            FacturacionDALTableAdapters.H2_FACT_LIST_MEDICOSHONO_BY_PARTETableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LIST_MEDICOSHONO_BY_PARTETableAdapter();
            FacturacionDAL.H2_FACT_LIST_MEDICOSHONO_BY_PARTEDataTable aTable = adapter.GetData(NroParte);
            foreach (FacturacionDAL.H2_FACT_LIST_MEDICOSHONO_BY_PARTERow row in aTable.Rows)
            {
                Facturacion_Honorarios_Med f = new Facturacion_Honorarios_Med();
                f.Honorario = row.Honorario;
                f.MedicoId = Convert.ToInt32(row.MedicoId);
                f.NroParte = row.NroParte;
                f.PracticaId = Convert.ToInt32(row.CodigoId);
                f.Tipo = row.Tipo;
                f.Medico = row.Medico;
                if (!row.IsPorcentajeNull())
                    f.Porcentaje = row.Porcentaje;
                else f.Porcentaje = 100;
                f.Detalle = (int)row.DetalleId;
                list.Add(f);
            }
            return list;
        }

        public long EmiteFacturaInsertSN(Facturacion_EmiteFactura f)
        {
            long IdFactura;
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object id = adapter.H2_FACT_EMITEFACTURA_INSERT_SN(f.OS, f.Importe, f.Observacion, f.Baja,f.UsuarioId);
            if (Int64.TryParse(id.ToString(), out IdFactura)) return IdFactura;
            else return -1;
        }

        public void FACT_COPY_NOMENCLADOR_SN()
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACT_COPY_NOMENCLADOR_SN();
        }

        public List<Facturacion_ListRendicionAmbulatorioSN> ListRendicionAmbulatoriaSN(string Desde,string Hasta, long OS, long DesdeRend, long HastaRend)
        {
            List<Facturacion_ListRendicionAmbulatorioSN> list = new List<Facturacion_ListRendicionAmbulatorioSN>();
            FacturacionDALTableAdapters.H2_FACT_LIST_RENDICION_AMBULATORIA_SNTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LIST_RENDICION_AMBULATORIA_SNTableAdapter();
            FacturacionDAL.H2_FACT_LIST_RENDICION_AMBULATORIA_SNDataTable aTable = adapter.GetData(DateTime.Parse(Desde), DateTime.Parse(Hasta), OS, DesdeRend,HastaRend);
            foreach (FacturacionDAL.H2_FACT_LIST_RENDICION_AMBULATORIA_SNRow row in aTable)
            {
                if (row.Cantidad > 0)
                {
                    Facturacion_ListRendicionAmbulatorioSN l = new Facturacion_ListRendicionAmbulatorioSN();
                    l.Fecha = row.FechaPractica.ToShortDateString();
                    l.RendicionId = (int)row.NroParte;
                    l.Paciente = row.Paciente;
                    if (!row.IsMedicoNull())
                        l.Profesional = row.Medico;
                    else
                        l.Profesional = string.Empty;
                    l.Codigo = (int)row.PracticaId;
                    l.Cantidad = row.Cantidad;
                    l.Prestacion = row.Practica;
                    l.HonoOS = row.HonoOS;
                    l.GastoOS = row.Total;
                    l.GastoTotal = row.HonoOS + row.Total;
                    if (!row.IsNroOrdenNull())
                        l.NroOrden = row.NroOrden.ToString();
                    else l.NroOrden = string.Empty;
                    l.Clase = row.Clase;
                    list.Add(l);
                }
            }
            return list;
        }

        public List<Facturacion_Parte_Det> ListParteDet_Labo(long NroInternacion, long ObraSocial, string Nomenclador)
        {
            List<Facturacion_Parte_Det> lista = new List<Facturacion_Parte_Det>();
            FacturacionDALTableAdapters.H2_FACT_PRACTICAS_LABO_LIST_INTERNACIONTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_PRACTICAS_LABO_LIST_INTERNACIONTableAdapter();
            FacturacionDAL.H2_FACT_PRACTICAS_LABO_LIST_INTERNACIONDataTable aTable = adapter.GetData(NroInternacion, ObraSocial, Nomenclador);
            foreach (FacturacionDAL.H2_FACT_PRACTICAS_LABO_LIST_INTERNACIONRow row in aTable.Rows)
            {
                lista.Add(CreateRowFromListaParteDet_Labo(row));
            }
            if (lista.Count > 0) return lista;
            else return null;
        }

        public FacturacionTotales ListTotales_by_NroPartes(string NroPartes)
        {
            FacturacionDALTableAdapters.H2_FACT_LIST_RENDICIONES_TOTALES_BY_NRORENDTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_LIST_RENDICIONES_TOTALES_BY_NRORENDTableAdapter();
            FacturacionDAL.H2_FACT_LIST_RENDICIONES_TOTALES_BY_NRORENDDataTable aTable = adapter.GetData(NroPartes);
            FacturacionTotales f = new FacturacionTotales();
            foreach (FacturacionDAL.H2_FACT_LIST_RENDICIONES_TOTALES_BY_NRORENDRow row in aTable.Rows)
            {
                if (!row.IsTotalGastoNull()) if (row.TotalGasto > 0) f.Gasto = row.TotalGasto;
                if (!row.IsTotalHonorarioNull()) if (row.TotalHonorario > 0) f.Honorario = row.TotalHonorario;
                if (!row.IsTotalMedicamentosNull()) if (row.TotalMedicamentos > 0) f.Medicamentos = row.TotalMedicamentos;
            }
            return f;
        }

        private Facturacion_Parte_Det CreateRowFromListaParteDet_Labo(FacturacionDAL.H2_FACT_PRACTICAS_LABO_LIST_INTERNACIONRow row)
        {
            Facturacion_Parte_Det f = new Facturacion_Parte_Det();
            if (!row.IsAmbulatorioNull())
                f.Ambulatorio = Convert.ToBoolean(row.Ambulatorio);
            if (!row.IsAPENull())
                f.APE = Convert.ToBoolean(row.APE);
            if (!row.IsCantidadNull())
                f.Cantidad = row.Cantidad;
            if (!row.IsEspecialidadIdNull())
                f.EspecialidadId = row.EspecialidadId;
            if (!row.IsFacturarloNull())
                f.Facturarlo = Convert.ToBoolean(row.Facturarlo);
            if (!row.IsFechaPracticaNull())
                f.FechaPractica = row.FechaPractica.ToShortDateString();
            if (!row.IsFechaRendicionNull())
                f.FechaRendicion = row.FechaRendicion.ToShortDateString();
            if (!row.IsHonorariosNull())
                f.Honorarios = Convert.ToBoolean(row.Honorarios);
            if (!row.IsInternacionNull())
                f.Internacion = Convert.ToBoolean(row.Internacion);
            if (!row.IsMedicoIdNull())
                f.MedicoId = row.MedicoId;
            if (!row.IsModuloNull())
                f.Modulo = Convert.ToBoolean(row.Modulo);
            f.NroParte = 0;
            if (!row.IsPorcentajeNull())
                f.Porcentaje = row.Porcentaje;
            if (!row.IsPracticaNull())
                f.Practica = Convert.ToBoolean(row.Practica);
            if (!row.IsPracticaIdNull())
                f.PracticaId = Convert.ToInt32(row.PracticaId);
            if (!row.IsPrecioNull())
                f.Precio = row.Precio;
            if (!row.IsServicioIdNull())
                f.ServicioId = row.ServicioId;
            if (!row.IsPracticaDescNull())
                f.Prac_Nombre = row.PracticaDesc;
            if (!row.IsPrecioHonorarioNull())
                f.PrecioHonorario = row.PrecioHonorario;
            else f.PrecioHonorario = 0;
            if (!row.IsHoraPracticaNull())
            {
                int m = row.HoraPractica.Minutes;
                string strm;
                if (m < 10) strm = "0" + m.ToString();
                else strm = m.ToString();
                f.HoraPractica = row.HoraPractica.Hours.ToString() + ":" + strm;
            }
            else f.HoraPractica = string.Empty;
            f.Detalle = (int)row.DetalleId;
            if (!row.IsNroOrdenNull())
                f.NroOrden = row.NroOrden;
            if (!row.IsSubPracticaIdNull())
                f.SubPracticaId = row.SubPracticaId;
            else f.SubPracticaId = string.Empty;
            return f;
        }

        public List<FacturacionPuesto> ListPuestos()
        {
            FacturacionDALTableAdapters.H2_FACT_FACTURA_PUESTOSTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_FACTURA_PUESTOSTableAdapter();
            FacturacionDAL.H2_FACT_FACTURA_PUESTOSDataTable aTable = adapter.GetData();
            List<FacturacionPuesto> list = new List<FacturacionPuesto>();
            foreach (FacturacionDAL.H2_FACT_FACTURA_PUESTOSRow row in aTable.Rows)
            {
                FacturacionPuesto f = new FacturacionPuesto();
                f.NroPuesto = row.NroPuesto;
                f.CUIT = row.CUIT;
                f.RazonSocial = row.RazonSocial;
                if (!row.IsDireccionNull()) f.Direccion = row.Direccion;
                else f.Direccion = string.Empty;
                if (!row.IsFechaInicioActividadNull()) f.FechaInicioActividad = row.FechaInicioActividad.ToShortDateString();
                else f.FechaInicioActividad = string.Empty;
                if (!row.IsActivoNull()) f.Activo = row.Activo;
                else f.Activo = true;
                list.Add(f);
            }
            return list;
        }

        public string FACT_GET_NROFACTURA_PUESTO(string NroPuesto)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            object NroFactura = adapter.H2_FACT_GET_NROFACTURA_PUESTO(NroPuesto);
            if (NroFactura != null) return NroPuesto + "-" + NroFactura;
            else throw new Exception("Error al obtener Nro. Factura.");
        }

        public string FACT_FACTURA_INSERT_CAB(FacturacionFactura_Cab f)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            long _NHC;
            if (!long.TryParse(f.NHC, out _NHC)) _NHC = 0;
            object NroFactura = adapter.H2_FACT_FACTURA_INSERT_CAB(f.NroPuesto, f.NroFactura, f.CUIT, f.Gasto, f.Honorario, f.Medicamento, f.ObraSocial, f.Observaciones,
                DateTime.Parse(f.Fecha), f.UsuarioId, f.Factura_A, f.Factura_Tipo, f.MesFacturado, f.AnioFacturado,_NHC);
            return NroFactura.ToString();
        }

        public void FACT_FACTURA_INSERT_DET(FacturacionFactura_Det f)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            adapter.H2_FACT_FACTURA_INSERT_DET(f.NroPuesto, f.NroFactura, f.NroParte);
        }

        public List<FacturacionFactura_Det> SplitPartes(string NroPartes)
        {
            List<FacturacionFactura_Det> list = new List<FacturacionFactura_Det>();
            string[] arr = NroPartes.Split(',');
            foreach (string Parte in arr)
            {
                long _Parte;
                if (long.TryParse(Parte, out _Parte)) 
                {
                    FacturacionFactura_Det f = new FacturacionFactura_Det();
                    f.NroParte = _Parte;
                    list.Add(f);
                }
            }
            return list;
        }

        public void Anular_Rendicion(long NroRendicion)
        {
            FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
            try
            {
                adapter.H2_FACT_ANULAR_FACTURACION(NroRendicion);
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public int FACT_NOMENCLA_INSERT(Facturacion_Nomenclador nomencla)
        {
            try
            {
                FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
                object Id = adapter.H2_FACT_NOMENCLA_INSERT(nomencla.FACT_NOMENCLA_ID, nomencla.FACT_CONVENIO_ID, DateTime.Parse(nomencla.FACT_NOMENCLA_DESDE), 
                    DateTime.Parse(nomencla.FACT_NOMENCLA_HASTA), nomencla.FACT_NOMENCLA_DESC, nomencla.FACT_NOMENCLA_BAJA,nomencla.FACT_USUARIO_ID);
                if (Id != null) return Convert.ToInt32(Id.ToString());
                else return -1;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public List<Facturacion_Nomenclador> FACT_NOMENCLA_LIST(bool Todos, int ConvenioId)
        {
            try
            {
                FacturacionDALTableAdapters.H2_FACT_NOMENCLA_LISTTableAdapter adapter = new FacturacionDALTableAdapters.H2_FACT_NOMENCLA_LISTTableAdapter();
                FacturacionDAL.H2_FACT_NOMENCLA_LISTDataTable aTable = adapter.GetData(Todos, ConvenioId);
                List<Facturacion_Nomenclador> list = new List<Facturacion_Nomenclador>();
                foreach (FacturacionDAL.H2_FACT_NOMENCLA_LISTRow row in aTable.Rows)
                    list.Add(new Facturacion_Nomenclador(row.FACT_NOMENCLA_ID, row.FACT_CONVENIO_ID, row.Convenio, row.FACT_NOMENCLA_DESDE.ToShortDateString(),
                        row.FACT_NOMENCLA_HASTA.ToShortDateString(), row.FACT_NOMENCLA_DESC, row.FACT_NOMENCLA_BAJA));
                return list;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public string FACT_REPORTES_RENDICION_SEC_FECHA(int Seccional, string Desde, string Hasta)
        {
            try
            {
                FacturacionDALTableAdapters.QueriesTableAdapter adapter = new FacturacionDALTableAdapters.QueriesTableAdapter();
                object ruta = adapter.H2_FACT_REPORTES_RENDICION_SEC_FECHA(Seccional, Convert.ToDateTime(Desde), Convert.ToDateTime(Hasta));
                if (ruta != null) return ruta.ToString();
                else return string.Empty;
            }
            catch (SqlException ex)
            {
                throw new Exception(ex.Message);
            }

        }

    }
}