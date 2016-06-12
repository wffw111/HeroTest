using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Hero.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult ProfileTemplate()
        {
            return PartialView();
        }
    }
}
