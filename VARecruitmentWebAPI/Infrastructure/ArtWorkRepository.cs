using System.Text.Json;
using VAArtGalleryWebAPI.Domain.Interfaces;
using VAArtGalleryWebAPI.Domain.Entities;
using System.Linq;

namespace VAArtGalleryWebAPI.Infrastructure
{
    public class ArtWorkRepository(string filePath) : IArtWorkRepository
    {
        private readonly string _filePath = filePath;

        public async Task<ArtWork> CreateAsync(Guid artGalleryId, ArtWork artWork, CancellationToken cancellationToken = default)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var galleries = await new ArtGalleryRepository(_filePath).GetAllArtGalleriesAsync(cancellationToken);

            var gallery = galleries.Find(g => g.Id == artGalleryId) ?? throw new ArgumentException("unknown art gallery", nameof(artGalleryId));
            artWork.Id = Guid.NewGuid();

            if (gallery.ArtWorksOnDisplay == null)
            {
                gallery.ArtWorksOnDisplay = [artWork];
            }
            else
            {
               gallery.ArtWorksOnDisplay.Add(artWork);
            }

            cancellationToken.ThrowIfCancellationRequested();

            await UpdateGalleries(galleries);

            return artWork; 
        }

        public async Task<bool> DeleteAsync(Guid artWorkId, CancellationToken cancellationToken = default)
        {
            //TODO: Clean spaghetti code

            cancellationToken.ThrowIfCancellationRequested();

            var galleries = await new ArtGalleryRepository(_filePath).GetAllArtGalleriesAsync(cancellationToken);

            var gallery = galleries.FindIndex(g => g.ArtWorksOnDisplay.Any(art => art.Id == artWorkId));

            if (gallery < 0)
                return false;

            var artworkIndex = galleries[gallery].ArtWorksOnDisplay.FindIndex(a => a.Id == artWorkId);

            galleries[gallery].ArtWorksOnDisplay.Remove(galleries[gallery].ArtWorksOnDisplay.First(item => item.Id == artWorkId));

            //galleries.Remove(testes);


            //if (gallery != null)
            //{
            //    //var artToRemove = gallery.ArtWorksOnDisplay.FindIndex(a => a.Id == artWorkId);
            //    var artToRemove = gallery.ArtWorksOnDisplay.FirstOrDefault(a => a.Id == artWorkId);
            //    if (artToRemove != null) 
            //    {
            //        gallery.ArtWorksOnDisplay.Remove(artToRemove);
            //        Console.WriteLine("galeria sendo excluida: ", artToRemove.ToString());
            //        return true;
            //    }

            //}
            //
            await UpdateGalleries(galleries);


            return true;

            
        }

        public async Task<List<ArtWork>> GetArtWorksByGalleryIdAsync(Guid artGalleryId, CancellationToken cancellationToken = default)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var galleries = await new ArtGalleryRepository(_filePath).GetAllArtGalleriesAsync(cancellationToken);

            var gallery = galleries.Find(g => g.Id == artGalleryId) ?? throw new ArgumentException("unknown art gallery", nameof(artGalleryId));
            if (gallery.ArtWorksOnDisplay == null)
            {
                return [];
            }
            return gallery.ArtWorksOnDisplay;
        }

        private async Task UpdateGalleries(List<ArtGallery> galleries)
        {
            await Task.Run(() =>
            {
                using TextWriter tw = new StreamWriter(_filePath, false);
                tw.Write(JsonSerializer.Serialize(galleries));
            });
        }
    }
}