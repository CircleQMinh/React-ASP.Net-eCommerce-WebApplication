﻿using AutoMapper;
using DotNet6WebAPI.DTO;
using DotNet6WebAPI.Repository;
using Microsoft.AspNetCore.Mvc;

namespace DotNet6WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public GenreController(IUnitOfWork _unitOfWork, IMapper _mapper)
        {
            unitOfWork = _unitOfWork;
            mapper = _mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var genre = await unitOfWork.Genres.GetAll(q => q.Id != 0, q => q.OrderBy(genre => genre.Id), null);
                var result = mapper.Map<IList<GenreDTO>>(genre);
                return Ok(new { result = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.ToString() });
            }
        }
    }
}
