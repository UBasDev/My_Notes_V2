namespace MyNotesApi.Entities.Base
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; } = new DateTime(9999, 1, 1);
    }
}
