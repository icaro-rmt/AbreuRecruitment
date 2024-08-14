using VAArtGalleryWebAPI.Application.Commands.Interfaces;
using VAArtGalleryWebAPI.Domain.Entities;
using VAArtGalleryWebAPI.Domain.Interfaces;
using VARecruitmentWebAPI.WebApi.Models;

namespace VAArtGalleryWebAPI.Application.Commands.Handlers.ArtWorks
{
    public record CreateArtWorkCommandHandler(CreateArtWorkRequest request) : ICommand<CreateArtWorkResult>;
    public record CreateArtWorkResult(Guid Id);
    internal class CreateArtWorkHandler(IArtWorkRepository artWorkRepository) : ICommandHandler<CreateArtWorkCommandHandler, CreateArtWorkResult>
    {
        public async Task<CreateArtWorkResult> Handle(CreateArtWorkCommandHandler command, CancellationToken cancellationToken)
        {
            var newArtWork = new ArtWork(command.request.Name, command.request.Author, command.request.CreationYear, command.request.AskPrice);

            var result = await artWorkRepository.CreateAsync(command.request.Id, newArtWork);

            return new CreateArtWorkResult(result.Id);
        }
    }
}
