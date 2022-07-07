using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for centro
/// </summary>
public class centro
{
	public centro()
	{

    }

       public centro(int id, string razonSocial)
        {
            Id = id;
            RazonSocial = razonSocial;
        }

        #region Properties
        public string Observacioens2
        {
            get;set;
        }

        public string NroCuit
        {
            get;set;
        }

        public string LOCNOMBRE
        {
            get;set;
        }

        public string Director
        {
            get;set;
        }

        public string NroInscripcion
        {
            get;set;
        }

        

        public string Observaciones
        {
            get;set;
        }


        public string Provincia
        {
           get;set;
        }


        public int LocalidadId
        {
            get;set;
        }


        public string CodigoPostal
        {
           get;set;
        }


        public string Depto
        {
            get;set;
        }


        public string Nro
        {
           get;set;
        }


        public string Calle
        {
           get;set;
        }

        public string RazonSocial
        {
           get;set;
        }


        public int Id
        {
            get;set;
        }

        public string Piso
        {
           get;set;
        }

        #endregion



        public string Fax { get; set; }

        public string Telefono { get; set; }
    }


public class CentroList: List<centro>
{
}

public class centro_unico
{ 
        public string Observacioens2
        {
            get;set;
        }

        public string NroInscripcion
        {
            get;set;
        }

        public string CodigoPostal
        {
           get;set;
        }

        public string Localidad
        {
            get;
            set;
        }

        public string Provincia
        {
            get;
            set;
        }

        public string Depto
        {
            get;set;
        }


        public string Nro
        {
           get;set;
        }


        public string Calle
        {
           get;set;
        }

        public string RazonSocial
        {
           get;set;
        }


        public int Id
        {
            get;set;
        }

        public string Piso
        {
           get;set;
        }


        public string Fax { get; set; }

        public string Telefono { get; set; }
}

public class CentroUnicoList : List<centro_unico>
{
}

	
