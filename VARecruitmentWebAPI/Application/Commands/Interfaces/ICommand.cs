using MediatR;

namespace VAArtGalleryWebAPI.Application.Commands.Interfaces
{
    public interface ICommand : ICommand<Unit>
    {
    }

    public interface ICommand<out TResponse>: IRequest<TResponse>
    {

    }
}
