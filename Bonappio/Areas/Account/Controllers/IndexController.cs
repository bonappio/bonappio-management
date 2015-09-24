using Bonappio.Areas.Account.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bonappio.Areas.Account.Controllers
{
    public class IndexController : BaseController
    {
        // GET: Account/Index
        int FirmID = 1;
        public ActionResult Index()
        {
            baioEntities db = new baioEntities();
            ViewData["Categories"] = db.sp_ProductGetAllbyPaging(1,50,0,false,FirmID);
            return View();
        }
    }
}