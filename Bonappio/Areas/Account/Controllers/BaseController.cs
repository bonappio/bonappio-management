using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Configuration;

namespace Bonappio.Areas.Account.Controllers
{
    public class BaseController : Controller
    {
        protected override IAsyncResult BeginExecuteCore(AsyncCallback callback, object state)
        {
            return base.BeginExecuteCore(callback, state);

        }
        protected override void Initialize(RequestContext requestContext)
        {

                base.Initialize(requestContext);
        
        }
        protected override void OnException(ExceptionContext filterContext)
        {

            //if (filterContext.ExceptionHandled)
            //    return;
            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                // oluşan hatayı view de göstermek için bu kez bir json veri döndürüyoruz
                filterContext.Result = new JsonResult()
                {
                    Data = filterContext.Exception.Message,
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet
                };

                filterContext.ExceptionHandled = true;
                filterContext.HttpContext.Response.Clear();
            }
            else
            {
                 base.OnException(filterContext);
            }
            // oluşan hatayı view de göstermek için bir tempdata nesnesine atabiliriz.
            filterContext.Controller.TempData["Exception"] = filterContext.Exception;

            // hata oluştuğunda yönlendirilecek sayfa
            filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(
                new { controller = "Exception", action = "HandleError" }));

            // başka hata yakalama işlemi varsa durdur
            filterContext.ExceptionHandled = true;

            // cevap üzerindeki diğer herşeyi sil
            filterContext.HttpContext.Response.Clear();

            base.OnException(filterContext);
        }


    }
}