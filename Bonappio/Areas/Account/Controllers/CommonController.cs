using Bonappio.Areas.Account.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bonappio.Areas.Account.Controllers
{
    public class CommonController : Controller
    {
        public static int GetFirmID() {
            return 1;
        }

        public JsonResult GetCategories(string Type)
        {
            baioEntities db = new baioEntities();
            return Json(db.sp_CategoryGetAll(GetFirmID(), Type));
        }
    }
}