using Bonappio.Areas.Account.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bonappio.Areas.Account.Controllers
{
    public class ProductController : Controller
    {
        public int FirmID = CommonController.GetFirmID();
        // GET: Account/Product
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ProductAdd(Product p)
        {
            baioEntities db = new baioEntities();

            List<int> ImageIDs = new List<int>();
            List<string> ImageFilenames = new List<string>();
            string filename = "";
            for (int j = 0; j < Request.Files.Count; j++)
            {
                var file = Request.Files[j];
                Guid gd = Guid.NewGuid();
                filename = gd.ToString();
                var _Server = System.Web.HttpContext.Current.Server;
                file.SaveAs(_Server.MapPath("~/Assets/photo/u/" + filename + ".jpg"));
                Image img = Image.FromFile(_Server.MapPath("~/Assets/photo/u/" + filename + ".jpg"));
                imageProcessor ip = new imageProcessor();
                int ImgTypeID = GetImageTypeID("Product");
                string imgInfo = ip.Handle(ImgTypeID, 0, filename, "jpg", img, j + 1);
                int ImageID = Convert.ToInt32(imgInfo.Split(new[] { "|%|" }, StringSplitOptions.RemoveEmptyEntries)[1]);
                ImageIDs.Add(ImageID);
                //ImageFilenames.Add(filename);
                
            }

            int ProductID = (int)db.sp_ProductAdd(FirmID,
                p.CategoryID,
                p.Name,
                p.Ingredients,
                p.Cost,
                p.Price,
                p.Stock, filename, p.CriticalStock).FirstOrDefault();
            

            foreach (var imgID in ImageIDs)
            {
                db.sp_ProductImagesAdd(ProductID, imgID);
            }
            

            return Json(ProductID);
        }

        public JsonResult ProductFeatureAdd(int ProductID, string[] FeatureNames, decimal[] PriceDifferences)
        {
            baioEntities db = new baioEntities();
            for (int i = 0; i < FeatureNames.Length; i++)
            {
                db.sp_ProductFeatureAdd(FirmID, ProductID, FeatureNames[i], PriceDifferences[i]);
            }

            return Json(1);
        }
        public int GetImageTypeID(string Type)
        {
            baioEntities db = new baioEntities();
            var ImgType = db.ImageType.Where(x => x.Name == Type).FirstOrDefault();
            if (ImgType != null)
                return ImgType.ID;
            else
                return 1;
        }
        public JsonResult GetProducts(DataTableParameters param)
        {
            baioEntities db = new baioEntities();
            //string CategoryType = param.pageType;
            //IEnumerable<sp_ProductGetAllbyPaging_Result> data = db.sp_ProductGetAllbyPaging(1, param.iDisplayLength, 0,false).ToList();

            IEnumerable<sp_ProductGetAllbyPaging_Result> data = db.sp_ProductGetAllbyPaging((param.iDisplayStart / param.iDisplayLength) + 1, param.iDisplayLength, 0, false,1).ToList();

            string sKey;

            if (!string.IsNullOrEmpty(param.sSearch))
            {

                sKey = param.sSearch.ToLower();
                data = data.Where(x => !string.IsNullOrEmpty(x.Name) ? x.Name.ToLower().Contains(sKey) : true);
            }
            var sortColumnIndex = Convert.ToInt32(Request["iSortCol_0"]);
            Func<sp_ProductGetAllbyPaging_Result, string> orderingFunction = (p => sortColumnIndex == 1 ? p.Name :
               sortColumnIndex == 2 ? p.Stock.ToString() :
               p.Price.ToString());

            var pagedData = data.OrderBy(x => x.Rank);
            var sortDirection = Request["sSortDir_0"];
            if (sortDirection == "asc")
                pagedData = pagedData.OrderBy(orderingFunction);
            else
                pagedData = pagedData.OrderByDescending(orderingFunction);

            //string CacheKey = CategoryType + param.iDisplayLength + param.iDisplayStart + param.sSearch + param.iDisplayLength + sortColumnIndex + sortDirection;
            //var _Context = System.Web.HttpContext.Current;
            //var PageCache = _Context.Cache.Get(CacheKey) as List<sp_GetPagesLite_Result>;
            var lastData = new List<sp_ProductGetAllbyPaging_Result>();
            //if (PageCache == null)
            //if (true)
            //{
                lastData = pagedData
                  //  .Skip(param.iDisplayStart / param.iDisplayLength * param.iDisplayLength)
                  //.Take(param.iDisplayLength)
                  .Select(x => new sp_ProductGetAllbyPaging_Result
                  {
                     ImageSrc = x.ImageSrc,
                     Total = x.Total,
                     ID = x.ID,
                     Name = x.Name,
                     IsActive = x.IsActive,
                     Stock = x.Stock,
                     OrderCount = x.OrderCount,
                     Variant = x.Variant,
                      Price = x.Price
                  }).ToList();
                //_Context.Cache.Add(CacheKey, lastData, null, System.Web.Caching.Cache.NoAbsoluteExpiration, new TimeSpan(6, 0, 0), System.Web.Caching.CacheItemPriority.Default, null);
            //}
            //else
            //{
            //    lastData = PageCache;
            //}

            return Json(new
            {
                sEcho = param.sEcho,
                iTotalRecords = data.Count(),
                iTotalDisplayRecords = data.FirstOrDefault() != null ? data.FirstOrDefault().Total : 0,
                aaData = lastData
            },
            JsonRequestBehavior.AllowGet);
        }
        public class DataTableParameters
        {
            /// <summary>
            /// Request sequence number sent by DataTable,
            /// same value must be returned in response
            /// </summary>       
            public string sEcho { get; set; }

            /// <summary>
            /// Text used for filtering
            /// </summary>
            public string sSearch { get; set; }

            /// <summary>
            /// Number of records that should be shown in table
            /// </summary>
            public int iDisplayLength { get; set; }

            /// <summary>
            /// First record that should be shown(used for paging)
            /// </summary>
            public int iDisplayStart { get; set; }

            /// <summary>
            /// Number of columns in table
            /// </summary>
            public int iColumns { get; set; }

            /// <summary>
            /// Number of columns that are used in sorting
            /// </summary>
            public int iSortingCols { get; set; }

            /// <summary>
            /// Comma separated list of column names
            /// </summary>
            public string sColumns { get; set; }
            public string pageType { get; set; }
        }
        [HttpPost]
        public void SetAP(int ID, bool AP) {
            baioEntities db = new baioEntities();
            db.sp_ProductSetAP(ID, AP);
        }
        [HttpPost]
        public bool SetPageRank(int[] IDs, int firstIndex, int lastIndex
            //, string CacheKey
            )
        {
            try
            {
                baioEntities db = new baioEntities();
                int a = 0;
                for (int i = firstIndex; i <= lastIndex; i++)
                {
                    int ID = IDs[a];
                    Product p = db.Product.Where(x => x.ID == ID).FirstOrDefault();
                    if (p != null)
                    {
                        p.Rank = i;
                    }

                    a++;
                }
                db.SaveChanges();
                //string[] CacheKeys = { CacheKey };
                //HelpClass.RemoveCaches(CacheKeys);
                return true;
            }
            catch
            {
                return false;
            }

        }
    }
}