//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Bonappio.Areas.Account.Models
{
    using System;
    
    public partial class sp_ProductGet_Result
    {
        public int ID { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> FirmID { get; set; }
        public Nullable<int> CategoryID { get; set; }
        public string Name { get; set; }
        public string Ingredients { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public Nullable<decimal> Price { get; set; }
        public Nullable<int> Stock { get; set; }
        public string ImageSrc { get; set; }
        public Nullable<int> CriticalStock { get; set; }
        public Nullable<int> Rank { get; set; }
    }
}
