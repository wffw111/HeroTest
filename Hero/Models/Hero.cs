using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace Hero.Models
{

    /// <summary>
    /// Model to map json to .NET
    /// </summary>
    [JsonObject]
    public class Hero
    {
        [JsonProperty(PropertyName = "name")]
        public string Name
        {
            get; set;
        }
        [JsonProperty(PropertyName = "gender")]
        public string Gender
        {
            get; set;
        }
        [JsonProperty(PropertyName = "profileImage")]
        public string profileImage { get; set; }
    }


    //model definition for Hero Collection
    public class HeroCollection
    {
        public string Name { get; set; }
        public ICollection<Hero> Heroes { get; set; }
    }
}