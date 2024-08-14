using VAArtGalleryWebAPI.Application.Commands.Interfaces;
using VAArtGalleryWebAPI.Domain.Entities;
using VAArtGalleryWebAPI.Domain.Interfaces;
using VAArtGalleryWebAPI.WebApi.Models;

namespace VAArtGalleryWebAPI.Application.Commands.Handlers.Gallery
{
    public record CreateArtGalleryCommandHandler(CreateArtGalleryRequest request): ICommand<CreateArtGalleryResult>;
    
    internal class CreateArtGalleryHandler(IArtGalleryRepository repository) : ICommandHandler<CreateArtGalleryCommandHandler, CreateArtGalleryResult>
    {
        public async Task<CreateArtGalleryResult> Handle(CreateArtGalleryCommandHandler command, CancellationToken cancellationToken)
        {
            var newArtGallery = new ArtGallery(command.request.Name, command.request.City, command.request.Manager);
            var result = await repository.CreateAsync(newArtGallery);

            return new CreateArtGalleryResult(result.Id, result.Name, result.City, result.Manager);

        }
    }
}
