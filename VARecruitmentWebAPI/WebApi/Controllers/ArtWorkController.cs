using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using VAArtGalleryWebAPI.Application.Commands;
using VAArtGalleryWebAPI.Application.Commands.Handlers.ArtWorks;
using VAArtGalleryWebAPI.Application.Queries;
using VAArtGalleryWebAPI.Domain.Entities;
using VAArtGalleryWebAPI.Domain.Interfaces;
using VAArtGalleryWebAPI.WebApi.Models;
using VARecruitmentWebAPI.WebApi.Models;

namespace VAArtGalleryWebAPI.WebApi.Controllers
{
    [Route("api/art-work")]
    [ApiController]
    public class ArtWorkController(IMediator mediator, IArtWorkRepository artWorkRepository) : ControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<GetArtGalleryArtWorksResult>> GetAllGalleries([FromRoute] Guid id)
        {
            var galleries = await mediator.Send(new GetAllArtGalleriesQuery());

            var artWorks = galleries.Where(g => g.Id == id).SelectMany(g => g.ArtWorksOnDisplay!);

            return Ok(artWorks);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] CreateArtWorkRequest request)
        {

            var createdGallery = await mediator.Send(new CreateArtWorkCommandHandler(request));

            if(createdGallery != null)
            {
                return Ok(createdGallery);
            }

            return BadRequest();

            
        }

        [HttpDelete("{artWorkId}")]
        public async Task<ActionResult> Delete([FromRoute] Guid artWorkId)
        {
            var result = await artWorkRepository.DeleteAsync(artWorkId);

            if (result) return NoContent();
            
            return BadRequest();

        }
    }
}
