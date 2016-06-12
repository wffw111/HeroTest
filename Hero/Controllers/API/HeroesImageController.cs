using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Configuration;
using System.IO;

namespace Hero.Controllers.API
{
    [RoutePrefix("api/HeroesImage")]
    public class HeroesImageController : ApiController
    {
        private string imageLocation = WebConfigurationManager.AppSettings["ProfileImagesPath"];

        [HttpGet]
        [Route("{name}")]
        public IHttpActionResult Get([FromUri]string name)
        {
            var root = System.Web.Hosting.HostingEnvironment.MapPath("~");
            var imagePath = string.Format("{0}//{1}//{2}.png", root, imageLocation,name);
            if (File.Exists(imagePath))
            {
                return new FileResult(imagePath, null, false);
            }

            return NotFound();
        }
    }
}
