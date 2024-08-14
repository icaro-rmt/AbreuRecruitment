namespace VARecruitmentWebAPI.WebApi.Models
{
    public class CreateArtWorkRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public int CreationYear { get; set; }
        public decimal AskPrice { get; set; }

        public CreateArtWorkRequest() { }

        public CreateArtWorkRequest(Guid idGaleria, string artName, string author, int year, decimal price)
        {
            Id = idGaleria;
            Name = artName;
            Author = author;
            CreationYear = year;
            AskPrice = price;
        }
    }
}