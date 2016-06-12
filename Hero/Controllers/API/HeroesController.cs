using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.IO;
using Hero.Models;

namespace Hero.Controllers.API
{
    public class HeroesController : ApiController
    {
        string jsonPath;
        public HeroesController() : base()
        {
            jsonPath = System.Web.Hosting.HostingEnvironment.MapPath("~/JSONSeed/heroes.json");

        }

        public IHttpActionResult Get()
        {
            if (File.Exists(jsonPath))
            {

                //read and convert json into the list of heroes
                string allText = File.ReadAllText(jsonPath);
                var heroes = JsonConvert.DeserializeObject<HeroCollection>(allText);
                if (heroes != null && heroes.Heroes != null &&  heroes.Heroes.Count > 0)
                {
                    heroes.Heroes = heroes.Heroes.OrderBy(m => m.Name).ToList();
                }
                return Ok(heroes);

            }
            return NotFound();

        }
    }
}
