using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GitHubBooksMarks.Models;

namespace GitHubBooksMarks.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        //public JsonResult Search(string data) =>  Json(data: data, behavior: JsonRequestBehavior.AllowGet);
        public JsonResult Store(Repository data)
        {
            Session[data.Name] = data;
            return Json(data: "success");
        }
    }
}
