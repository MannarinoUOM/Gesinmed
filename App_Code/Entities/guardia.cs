using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for guardia
/// </summary>
    
    public class guardia
    {
        private int id;
        private string hora;
        private string recepciono;
        private string atencion;
        private string nhc;
        private string apellido;
        private string mediconombre;
        private int medicoid;
        private string estado;
        private int especialidadid;
        private string especialidad;
        private string fecha;
        private int bonoid;
        private string esguardia;

        private int motivoegreso;
        private int diagnostico;
        private int box;
        private int icd10;
        private bool accidente;
        private int motivoaccidenteid;
        private string obs;

        public static readonly System.Drawing.Color ColorEnEspera = System.Drawing.Color.FromArgb(255, 255, 204);
        public static readonly System.Drawing.Color ColorEnConsultorio = System.Drawing.Color.FromArgb(204, 255, 204);
        public static readonly System.Drawing.Color ColorAtentido = System.Drawing.Color.FromArgb(204, 255, 255);
        public static readonly System.Drawing.Color ColorAusente = System.Drawing.Color.FromArgb(255, 204, 204);


        public guardia()
        { }

        public guardia(int id)
        { ID = id; }


        public int ID { get { return id; } set { id = value; } }
        public string HORA { get { return hora; } set { hora = value; } }
        public string RECEPCIONO { get { return recepciono; } set { recepciono = value; } }
        public string ATENCION { get { return atencion; } set { atencion = value; } }
        public string NHC { get { return nhc; } set { nhc = value; } }
        public string APELLIDO { get { return apellido; } set { apellido = value; } }
        public string MEDICONOMBRE { get { return mediconombre; } set { mediconombre = value; } }
        public int MEDICOID { get { return medicoid; } set { medicoid = value; } }
        public string ESTADO { get { return estado; } set { estado = value; } }
        public int ESPECIALIDADID { get { return especialidadid; } set { especialidadid = value; } }
        public string ESPECIALIDAD { get { return especialidad; } set { especialidad = value; } }
        public string FECHA { get { return fecha; } set { fecha = value; } }
        public int BONOID { get { return bonoid; } set { bonoid = value; } }
        public int DIAGNOSTICO { get { return diagnostico; } set { diagnostico = value; } }
        public int MOTIVOEGRESO { get { return motivoegreso; } set { motivoegreso = value; } }
        public string ESGUARDIA { get { return esguardia; } set { esguardia = value; } }
        public int BOX { get { return box; } set { box = value; } }
        public int ICD10 { get { return icd10; } set { icd10 = value; } }
        public bool ACCIDENTE { get { return accidente; } set { accidente = value; } }
        public int MOTIVOACCIDENTEID { get { return motivoaccidenteid; } set { motivoaccidenteid = value; } }
        public string OBS { get { return obs; } set { obs = value; } }

    }

    public class Boxes
    {
        private int idBox;
        private string nombreBox;

        public int IDBOX
        {
            get { return idBox; }
            set { idBox = value; }
        }


        public string NOMBREBOX
        {
            get { return nombreBox; }
            set { nombreBox = value; }
        }

        public Boxes()
        {

        }

        public Boxes(int id)
        {
            idBox = id;
        }
    }

    public class MotivoEgreso_Guardia
    {
        public long Id { get; set; }
        public string Motivo { get; set; }

        public MotivoEgreso_Guardia()
        { 
            
        }
    }

    public class Guardia_Atencion { 
        public int IdGuardia {get;set;}
        public long NHC {get;set;}
        public string Fecha { get; set; }
        public string MotivoConsulta {get;set;}
        public string Evolucion {get;set;}
        public string ICD10 {get;set;}
        public bool Laboratorio {get;set;}
        public bool Rx {get;set;}
        public bool Tac {get;set;}
        public bool Ecografia {get;set;}
        public string Otros {get;set;}
        public string Interconsulta {get;set;}
        public string IndicacionesEnfermeria {get;set;}
        public long MotivoEgreso {get;set;}
        public bool Policial {get;set;}
        public bool Internado {get;set;}
        public bool ART { get; set; }
        public string ICD10_Desc { get; set; }
        public long UsuarioId { get; set; }

        public Guardia_Atencion()
        { 
            
        }
    }

    public class Guardia_Enfermeria {
        public int IdGuardia { get; set; }
        public long NHC { get; set; }
        public string Fecha { get; set; }
        public string Afiliado { get; set; }
        public string Box { get; set; }
        public string Medico { get; set; }
        public string Practica { get; set; }
        public string Indicaciones { get; set; }
        public string Estado { get; set; }
        public string FechaEntrega { get; set; }

        public Guardia_Enfermeria()
        { 
            
        }
    }

    public class Guardia_Plantilla_Med
    {
        public int Id { get; set; }
        public string Medicamento { get; set; }
        public string Monodroga { get; set; }
        public int Cantidad { get; set; }

        public Guardia_Plantilla_Med()
        { 
        
        }
    }

    public class Guardia_Plantilla_Prac
    {
        public long Codigo { get; set; }
        public string Descripcion { get; set; }
        public int Cantidad { get; set; }

        public Guardia_Plantilla_Prac()
        {

        }
    }

    public class Guardia_Pedido_Medicamentos
    {
        public int Pedido_Id { get; set; }
        public int Ped_Numero { get; set; }
        public long NHC { get; set; }
        public int Servicio_Id { get; set; }
        public long Usuario_Id { get; set; }
        public int GuardiaId { get; set; }

        public Guardia_Pedido_Medicamentos()
        { }
    }

    public class Guardia_Medicamentos {
        public long IdGuardia { get; set; }
        public int InsumoId {get;set;}
        public int Cantidad {get;set;}
        public int PedidoFarmaciaId { get; set; }

        public Guardia_Medicamentos() { }
    }

    public class HistorialGuardia
    {
        public int id { get; set; }
        public string nhc { get; set; }
        public int medicoid { get; set; }
        public string texto { get; set; }
        public string fecha { get; set; }
        public DateTime fecha2 { get; set; }
        public string medico { get; set; }
        public int protocolo { get; set; }


        public HistorialGuardia()
        {

        }
    }

    public class Guardia_Box {
        public int Id { get; set; }
        public string Box { get; set; }
        public bool Estado { get; set; }

        public Guardia_Box() { }
    }
    public class Medicamentos
    {
        public string InsumoID;
        public string PrecioUOM;
        public string PrecioOS;
        public string Nombre;
        public string Codigo_Kike;
        public Medicamentos() { }
    }

    public class MedicamentosSeleccionar
    {
        public string nombre;
        public string id;
        public MedicamentosSeleccionar() { }
    }

    public class mensajeGuardia
    {
        public string afiliado;
        public string fecha;
        public mensajeGuardia() { }
    }


    public class itemCOVID
    {
        public long id { get; set; }
        public string valor { get; set; }
    }

    public class PDFCOVID
    {
        public long id { get; set; }
        public long afiliadoId { get; set; }
        public long medicoId { get; set; }
        public string nombreArchivo { get; set; }
        public int activo { get; set; }
        public string medico { get; set; }
        public string fecha { get; set; }
        public string afiliado { get; set; }
    }

    public class MedicoCOVID
    {
        public long id { get; set; }
        public string medico { get; set; }

    }


    public class SeguimientoCOVID
    {
public long id {get;set;}
public long afiliadoId {get;set;}
public string nombre {get;set;}
public string dni {get;set;}
public string pediatrico {get;set;}
public string direccion {get;set;}
public string localidad {get;set;}
public string uom {get;set;}
public string telefono {get;set;}
public string fechaIsopado {get;set;}
public string resultado {get;set;}
public string destino {get;set;}
public string internacion {get;set;}
public string alta {get;set;}
public string Mseguimiento {get;set;}
public string hisopadoControl {get;set;}
public string fechaEpidemilogica {get;set;}
public string donate {get;set;}
public int obito {get;set;}
public long usuario { get; set; }
public string fechaCarga { get; set; }

    }