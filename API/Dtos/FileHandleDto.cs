using Microsoft.AspNetCore.Http;

namespace API.Dtos
{
    public class FileHandleDto
    {
        public IFormFile File { get; set; }
        public string Url { get; set; }
    }
}
