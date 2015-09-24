using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace Bonappio.Areas.Account.Models
{
    public class imageProcessor
    {

        public static int SiteID = Convert.ToInt32(WebConfigurationManager.AppSettings["SiteID"]);
        bool ContainsTransparent(Bitmap image)
        {
            for (int y = 0; y < image.Height; ++y)
            {
                for (int x = 0; x < image.Width; ++x)
                {
                    if (image.GetPixel(x, y).A != 255)
                    {
                        return true;
                    }
                }
            }
            return false;
        }
        public string Handle(int TypeId, int ImgId,string filename,string ext, System.Drawing.Image image,int Rank)
        {
            baioEntities db = new baioEntities();
            ImageType it = db.ImageType.Where(x => x.IsDelete == false & x.ID == TypeId).FirstOrDefault();
            if (it != null)
            {
                photoWidth = Convert.ToInt32(it.Width);
                photoHeight = Convert.ToInt32(it.Height);
                photoMaxWidth = Convert.ToInt32(it.MaxWidth);
            }
            else
            {
                photoWidth = 100;
                photoHeight = 100;
                photoMaxWidth = 1000;
            }



            if (ImgId == 0) // Ekleme İşlemi, değilse güncellenecek
            {
                //Images i = new Images();
                ////i.SiteID = SiteID;
                //i.Src = filename;
                //i.ImageTypeID = TypeId;
                //i.Date = DateTime.Now;
                //i.IsDelete = false;
                //i.Rank = Rank;
                //i.Src = filename;
                //db.Images.Add(i);
                //db.SaveChanges();

                ImgId = (int)db.sp_ImagesAdd(filename, TypeId, Rank).FirstOrDefault();


            }
            else
            {
                // Güncelleme İşlemi
                
                //string oldFile = db.sp_ImageGetSrc(ImgId).FirstOrDefault();
                
                db.sp_ImageSrcUpdate(ImgId, filename);
                //tryToDelete(oldFile, "~/Assets/photo/r/");
                //tryToDelete(oldFile, "~/Assets/photo/u/");

            }
            
            int newwidthimg = photoMaxWidth;
            float AspectRatio = (float)image.Size.Width / (float)image.Size.Height;
            int newHeight = Convert.ToInt32(newwidthimg / AspectRatio);


            Bitmap bmPhoto;
            Graphics grPhoto;
            ImageCodecInfo ici;
            
            isTransparent = ContainsTransparent((Bitmap)image);
            if (isTransparent)
            {
                ici = GetEncoderInfo("image/png");
                bmPhoto = new Bitmap(newwidthimg, newHeight, PixelFormat.Format32bppArgb);
                bmPhoto.SetResolution(72, 72);
                grPhoto = Graphics.FromImage(bmPhoto);
                grPhoto.Clear(Color.Transparent);
            }
            else {
                ici = GetEncoderInfo("image/jpeg");
                bmPhoto = new Bitmap(newwidthimg, newHeight, PixelFormat.Format24bppRgb);
                bmPhoto.SetResolution(72, 72);
                grPhoto = Graphics.FromImage(bmPhoto);
            
            }

            grPhoto.CompositingQuality = CompositingQuality.HighQuality;
            grPhoto.SmoothingMode = SmoothingMode.HighQuality;
            grPhoto.InterpolationMode = InterpolationMode.HighQualityBicubic;
            grPhoto.PixelOffsetMode = PixelOffsetMode.HighQuality;

            grPhoto.DrawImage
                    (
                    image,
                    new Rectangle(0, 0, newwidthimg, newHeight),
                    0,
                   0,
                    image.Width,
                    image.Height,
                    GraphicsUnit.Pixel
                    );
            //Filigran
            //grPhoto.DrawImage(System.Drawing.Image.FromFile(System.Web.HttpContext.Current.Server.MapPath("~/www/seyir/Assets/photo/filigran.png")), new Point(0, (int)((newHeight - 900) / 2)));
            EncoderParameters ep = new EncoderParameters(1);
            ep.Param[0] = new EncoderParameter(Encoder.Quality, (long)100);




            //Graphics g = Graphics.FromImage(bmPhoto);


            grPhoto.Dispose();
            string path1 = HttpContext.Current.Server.MapPath("~/Assets/photo/r/" + filename + "_b.jpg");
            string path2 = HttpContext.Current.Server.MapPath("~/Assets/photo/r/" + filename + "_b.png");
            bmPhoto.Save(path1, ici, ep);
            bmPhoto.Save(path2, ici, ep);
            bmPhoto.Dispose();
            image.Dispose();




            if (isTransparent)
            {
                getAspectRatioPng(HttpContext.Current.Server.MapPath("~/Assets/photo/r/" + filename + "_b.png"),
                HttpContext.Current.Server.MapPath("~/Assets/photo/r/" + filename + "_t.jpg"),
                HttpContext.Current.Server.MapPath("~/Assets/photo/r/" + filename + "_t.png"), photoWidth, photoHeight, photoWidth, photoHeight, ext);
            }
            else
            {
                getAspectRatio(HttpContext.Current.Server.MapPath("~/Assets/photo/r/" + filename + "_b.jpg"),
                HttpContext.Current.Server.MapPath("~/Assets/photo/r/" + filename + "_t.png"),
                HttpContext.Current.Server.MapPath("~/Assets/photo/r/" + filename + "_t.jpg"), photoWidth, photoHeight, photoWidth, photoHeight, ext);
                
            }

            tryToDelete(SpecialDate(DateTime.Now.AddDays(-1)), "~/Assets/photo/u/");

            string result = filename + "|%|" + ImgId.ToString();
            return result;
        }
        public static void CropImageFile(string ImageFrom, string ImageTo, int targetW, int targetH, string ext)
        {


            System.Drawing.Image imgPhoto = System.Drawing.Image.FromFile(ImageFrom);
            imgPhoto.Save(ImageTo);
            int targetX = (imgPhoto.Width - targetW) / 2;
            int targetY = (imgPhoto.Height - targetH) / 2;

            Bitmap bmPhoto;
            Graphics grPhoto;
            ImageCodecInfo ici;
            if (!isTransparent)
            {
                ici = GetEncoderInfo("image/jpeg");
                bmPhoto = new Bitmap(targetW, targetH, PixelFormat.Format24bppRgb);
                bmPhoto.SetResolution(72, 72);
                grPhoto = Graphics.FromImage(bmPhoto);
            }
            else
            {
                ici = GetEncoderInfo("image/png");
                bmPhoto = new Bitmap(targetW, targetH, PixelFormat.Format32bppArgb);
                bmPhoto.SetResolution(72, 72);
                grPhoto = Graphics.FromImage(bmPhoto);
                grPhoto.Clear(Color.Transparent);
            }

            grPhoto.CompositingQuality = CompositingQuality.HighQuality;
            grPhoto.SmoothingMode = SmoothingMode.HighQuality;
            grPhoto.InterpolationMode = InterpolationMode.HighQualityBicubic;
            grPhoto.PixelOffsetMode = PixelOffsetMode.HighQuality;

            grPhoto.DrawImage
                    (
                    imgPhoto,
                    new Rectangle(0, 0, targetW, targetH),
                    targetX,
                    targetY,
                    targetW,
                    targetH,
                    GraphicsUnit.Pixel
                    );
            EncoderParameters ep = new EncoderParameters(1);
            ep.Param[0] = new EncoderParameter(Encoder.Quality, (long)100);


            imgPhoto.Dispose();
            grPhoto.Dispose();

            bmPhoto.Save(ImageTo, ici, ep);
            bmPhoto.Dispose();

        }
        public static void getAspectRatio(string ImageFrom, string ImageToResized, string ImageToResizedCropped, int newWidth, int newHeight, int widthReadOnly, int heightReadOnly, string ext)
        {

            System.Drawing.Image image = System.Drawing.Image.FromFile(ImageFrom);
            float AspectRatio = (float)image.Size.Width / (float)image.Size.Height;

            float RealAspectRatio = (float)newWidth / (float)newHeight;
            image.Dispose();
            if (AspectRatio > RealAspectRatio)
            {
                ImageResizeAsPerHeight(ImageFrom, ImageToResized, ImageToResizedCropped, newHeight, widthReadOnly, heightReadOnly, ext);
            }
            else
            {
                ImageResizeAsPerWidth(ImageFrom, ImageToResized, ImageToResizedCropped, newWidth, widthReadOnly, heightReadOnly, ext);

            }

        }
        public static void ImageResizeAsPerWidth(string ImageFrom, string ImageToResized, string ImageToResizedCropped, int newWidthImg, int widthReadOnly, int heightReadOnly, string ext)
        {
            System.Drawing.Image image = System.Drawing.Image.FromFile(ImageFrom);
            float AspectRatio = (float)image.Size.Width / (float)image.Size.Height;
            int newHeightImg = Convert.ToInt32(newWidthImg / AspectRatio);
            Bitmap bmPhoto;
            Graphics grPhoto;
            ImageCodecInfo ici;
            if (!isTransparent)
            {
                ici = GetEncoderInfo("image/jpeg");
                bmPhoto = new Bitmap(newWidthImg, newHeightImg, PixelFormat.Format24bppRgb);
                bmPhoto.SetResolution(72, 72);
                grPhoto = Graphics.FromImage(bmPhoto);
            }
            else
            {
                ici = GetEncoderInfo("image/png");
                bmPhoto = new Bitmap(newWidthImg, newHeightImg, PixelFormat.Format32bppArgb);
                bmPhoto.SetResolution(72, 72);
                grPhoto = Graphics.FromImage(bmPhoto);
                grPhoto.Clear(Color.Transparent);
            }

            grPhoto.CompositingQuality = CompositingQuality.HighQuality;
            grPhoto.SmoothingMode = SmoothingMode.HighQuality;
            grPhoto.InterpolationMode = InterpolationMode.HighQualityBicubic;
            grPhoto.PixelOffsetMode = PixelOffsetMode.HighQuality;

            grPhoto.DrawImage
                    (
                    image,
                    new Rectangle(0, 0, newWidthImg, newHeightImg),
                    0,
                   0,
                    image.Width,
                    image.Height,
                    GraphicsUnit.Pixel
                    );
            // Save out to memory and then to a file.  We dispose of all objects to make sure the files don't stay locked.
            EncoderParameters ep = new EncoderParameters(1);
            ep.Param[0] = new EncoderParameter(Encoder.Quality, (long)100);


            grPhoto.Dispose();
            bmPhoto.Save(ImageToResized, ici, ep);
            bmPhoto.Dispose();

            CropImageFile(ImageToResized, ImageToResizedCropped, widthReadOnly, heightReadOnly, ext);

            image.Dispose();
        }
        public static void ImageResizeAsPerHeight(string ImageFrom, string ImageToResized, string ImageToResizedCropped, int newHeightImg, int widthReadOnly, int heightReadOnly, string ext)
        {
            System.Drawing.Image image = System.Drawing.Image.FromFile(ImageFrom);
            float AspectRatio = (float)image.Size.Width / (float)image.Size.Height;
            int newWidthImg = Convert.ToInt32(newHeightImg * AspectRatio);
            Bitmap bmPhoto;
            Graphics grPhoto;
            ImageCodecInfo ici;
            if (!isTransparent)
            {
                ici = GetEncoderInfo("image/jpeg");
                bmPhoto = new Bitmap(newWidthImg, newHeightImg, PixelFormat.Format24bppRgb);
                bmPhoto.SetResolution(72, 72);
                grPhoto = Graphics.FromImage(bmPhoto);
            }
            else
            {
                ici = GetEncoderInfo("image/png");
                bmPhoto = new Bitmap(newWidthImg, newHeightImg, PixelFormat.Format32bppArgb);
                bmPhoto.SetResolution(72, 72);
                grPhoto = Graphics.FromImage(bmPhoto);
                grPhoto.Clear(Color.Transparent);
            }

            grPhoto.CompositingQuality = CompositingQuality.HighQuality;
            grPhoto.SmoothingMode = SmoothingMode.HighQuality;
            grPhoto.InterpolationMode = InterpolationMode.HighQualityBicubic;
            grPhoto.PixelOffsetMode = PixelOffsetMode.HighQuality;

            grPhoto.DrawImage
                    (
                    image,
                    new Rectangle(0, 0, newWidthImg, newHeightImg),
                    0,
                   0,
                    image.Width,
                    image.Height,
                    GraphicsUnit.Pixel
                    );
            EncoderParameters ep = new EncoderParameters(1);
            ep.Param[0] = new EncoderParameter(Encoder.Quality, (long)100);


            grPhoto.Dispose();
            bmPhoto.Save(ImageToResized, ici, ep);
            bmPhoto.Dispose();

            CropImageFile(ImageToResized, ImageToResizedCropped, widthReadOnly, heightReadOnly, ext);

            image.Dispose();
        }
        public static void getAspectRatioPng(string ImageFrom, string ImageToResized, string ImageToResizedCropped, int newWidth, int newHeight, int widthReadOnly, int heightReadOnly, string ext)
        {

            System.Drawing.Image image = System.Drawing.Image.FromFile(ImageFrom);
            float AspectRatio = (float)image.Size.Width / (float)image.Size.Height;
            float RealAspectRatio = (float)newWidth / (float)newHeight;
            if (AspectRatio > RealAspectRatio)
            {
                ImageResizeAsPerHeightPng(ImageFrom, ImageToResized, ImageToResizedCropped, newHeight, widthReadOnly, heightReadOnly, ext);
            }
            else
            {
                ImageResizeAsPerWidthPng(ImageFrom, ImageToResized, ImageToResizedCropped, newWidth, widthReadOnly, heightReadOnly, ext);

            }

        }

        public static void ImageResizeAsPerWidthPng(string ImageFrom, string ImageToResized, string ImageToResizedCropped, int newWidthImg, int widthReadOnly, int heightReadOnly, string ext)
        {
            System.Drawing.Image image = System.Drawing.Image.FromFile(ImageFrom);
            float AspectRatio = (float)image.Size.Width / (float)image.Size.Height;
            int newHeightImg = Convert.ToInt32(newWidthImg / AspectRatio);
            Bitmap bmPhoto;
            Graphics grPhoto;
            ImageCodecInfo ici;
            if (!isTransparent)
            {
                ici = GetEncoderInfo("image/jpeg");
                bmPhoto = new Bitmap(newWidthImg, newHeightImg, PixelFormat.Format24bppRgb);
                bmPhoto.SetResolution(72, 72);
                grPhoto = Graphics.FromImage(bmPhoto);
            }
            else
            {
                ici = GetEncoderInfo("image/png");
                bmPhoto = new Bitmap(newWidthImg, newHeightImg, PixelFormat.Format32bppArgb);
                bmPhoto.SetResolution(72, 72);
                grPhoto = Graphics.FromImage(bmPhoto);
                grPhoto.Clear(Color.Transparent);
            }

            grPhoto.CompositingQuality = CompositingQuality.HighQuality;
            grPhoto.SmoothingMode = SmoothingMode.HighQuality;
            grPhoto.InterpolationMode = InterpolationMode.HighQualityBicubic;
            grPhoto.PixelOffsetMode = PixelOffsetMode.HighQuality;

            grPhoto.DrawImage
                    (
                    image,
                    new Rectangle(0, 0, newWidthImg, newHeightImg),
                    0,
                   0,
                    image.Width,
                    image.Height,
                    GraphicsUnit.Pixel
                    );
            EncoderParameters ep = new EncoderParameters(1);
            ep.Param[0] = new EncoderParameter(Encoder.Quality, (long)100);


            grPhoto.Dispose();
            bmPhoto.Save(ImageToResized, ici, ep);
            bmPhoto.Dispose();

            CropImageFile(ImageToResized, ImageToResizedCropped, widthReadOnly, heightReadOnly, ext);

            image.Dispose();
        }
        public static void ImageResizeAsPerHeightPng(string ImageFrom, string ImageToResized, string ImageToResizedCropped, int newHeightImg, int widthReadOnly, int heightReadOnly, string ext)
        {

            System.Drawing.Image image = System.Drawing.Image.FromFile(ImageFrom);
            float AspectRatio = (float)image.Size.Width / (float)image.Size.Height;
            int newWidthImg = Convert.ToInt32(newHeightImg * AspectRatio);


            Bitmap bmPhoto;
            Graphics grPhoto;
            ImageCodecInfo ici;
            if (!isTransparent)
            {
                ici = GetEncoderInfo("image/jpeg");
                bmPhoto = new Bitmap(newWidthImg, newHeightImg, PixelFormat.Format24bppRgb);
                bmPhoto.SetResolution(72, 72);
                grPhoto = Graphics.FromImage(bmPhoto);
            }
            else
            {
                ici = GetEncoderInfo("image/png");
                bmPhoto = new Bitmap(newWidthImg, newHeightImg, PixelFormat.Format32bppArgb);
                bmPhoto.SetResolution(72, 72);
                grPhoto = Graphics.FromImage(bmPhoto);
                grPhoto.Clear(Color.Transparent);
            }

            grPhoto.CompositingQuality = CompositingQuality.HighQuality;
            grPhoto.SmoothingMode = SmoothingMode.HighQuality;
            grPhoto.InterpolationMode = InterpolationMode.HighQualityBicubic;
            grPhoto.PixelOffsetMode = PixelOffsetMode.HighQuality;

            grPhoto.DrawImage
                    (
                    image,
                    new Rectangle(0, 0, newWidthImg, newHeightImg),
                    0,
                   0,
                    image.Width,
                    image.Height,
                    GraphicsUnit.Pixel
                    );
            EncoderParameters ep = new EncoderParameters(1);
            ep.Param[0] = new EncoderParameter(Encoder.Quality, (long)100);


            grPhoto.Dispose();
            bmPhoto.Save(ImageToResized, ici, ep);
            bmPhoto.Dispose();

            CropImageFile(ImageToResized, ImageToResizedCropped, widthReadOnly, heightReadOnly, ext);

            image.Dispose();
        }
        public static ImageCodecInfo GetEncoderInfo(String mimeType)
        {
            int j;
            ImageCodecInfo[] encoders;
            encoders = ImageCodecInfo.GetImageEncoders();
            for (j = 0; j < encoders.Length; ++j)
            {
                if (encoders[j].MimeType == mimeType)
                    return encoders[j];
            }
            return null;
        }

        public static void tryToDelete(string src, string path)
        {

            string[] filePaths = Directory.GetFiles(HttpContext.Current.Server.MapPath(path));
            foreach (string filePath in filePaths)
            {
                if (filePath.Contains(src) == true)
                {
                    try
                    {
                        File.Delete(filePath);
                    }
                    catch
                    {


                    }

                }

            }

        }
        

        public int photoWidth { get; set; }
        public int photoHeight { get; set; }
        public int photoMaxWidth { get; set; }
        public static bool isTransparent { get; set; }
        public string SpecialDate(DateTime dt)
        {
            string tarihEki = dt.Date.ToString().Replace(".", "-").Replace(":", "").Replace(" ", "");

            tarihEki = "_" + tarihEki;
            return tarihEki;
        }
    }
}