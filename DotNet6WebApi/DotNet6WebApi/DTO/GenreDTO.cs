﻿namespace DotNet6WebAPI.DTO
{
    public class GenreDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        //public virtual IList<Game> Games { get; set; }
    }
    public class SmallerGenreDTO
    {
        public string? Name { get; set; }
        //public virtual IList<Game> Games { get; set; }
    }
}
