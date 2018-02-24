using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GitHubBooksMarks.Models
{


    public class Repository
    {
        private string Data { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public int Forks { get; set; }
    }
}