using Newtonsoft.Json;

namespace MyNotesApi.Helpers.Exceptions
{
    public class ExceptionInfo: IOException
    {
        public ExceptionInfo()
        {

        }
        public ExceptionInfo(string message, int statusCode)
        {
            StatusCode = statusCode;
            Message = message;
        }
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
