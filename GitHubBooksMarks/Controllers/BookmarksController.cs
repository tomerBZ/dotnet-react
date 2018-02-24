using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GitHubBooksMarks.Controllers
{
    public class BookmarksController : Controller
    {
        // GET: Bookmarks
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Get()
        {
            var response = new List<object>();

            for (int i = 0; i < Session.Contents.Count; i++)
            {
                response.Add(Session[i]);
            }
            return Json(data: response, behavior: JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Reset()
        {
            Session.Clear();
            return Json(data: "success");
        }


    }
}