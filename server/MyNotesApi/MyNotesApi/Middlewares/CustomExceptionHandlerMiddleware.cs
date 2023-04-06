using Microsoft.Extensions.Logging;
using MyNotesApi.Helpers.Exceptions;
using System.Net;

namespace MyNotesApi.Middlewares
{
    public class CustomExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;        

        public CustomExceptionHandlerMiddleware(RequestDelegate next)
        {            
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (ExceptionInfo ex)
            {                
                await HandleExceptionAsync(httpContext, ex);
            }
        }        
        private static Task HandleExceptionAsync(HttpContext context, ExceptionInfo exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            
            return context.Response.WriteAsync(new ExceptionInfo()
            {
                StatusCode = exception.StatusCode,
                Message = exception.Message
            }.ToString());
        }
    }
}
