using System.ComponentModel.DataAnnotations;

namespace ProjectManagementAPI.Models.Dtos.Comments
{
    public class CommentCreateDto
    {
        [Required, MaxLength(1000)]
        public string Text { get; set; }
    }

}
