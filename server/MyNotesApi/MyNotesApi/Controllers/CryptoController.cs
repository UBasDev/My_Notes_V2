using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyNotesApi.DTOs;
using Newtonsoft.Json;
using System.Net;

namespace MyNotesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CryptoController : ControllerBase
    {
        
        public CryptoController()
        {
            
        }

        [HttpGet("get_all_cryptos")]
        [ResponseCache(Duration = 30000)]
        public async Task<IActionResult> Get_All_Cryptos(string currency, string order, int page_size, int current_page, string locale, string price_change_percentage)
        {
            try
            {
                string request_url = $"https://api.coingecko.com/api/v3/coins/markets?vs_currency={currency}&order={order}&per_page={page_size}&page={current_page}&sparkline=false&price_change_percentage={price_change_percentage}&locale={locale}";
                using (HttpClient httpClient = new HttpClient())
                {
                    httpClient.DefaultRequestHeaders.Add("user-agent", "Other");
                    //httpClient.DefaultRequestHeaders.Add("content-type", "application/json");
                    //httpClient.DefaultRequestHeaders.Add("charset", "utf-8");
                    //httpClient.BaseAddress = new Uri(request_url);
                    var response = await httpClient.GetAsync(request_url);
                    var response_string = await response.Content.ReadAsStringAsync();
                    var response_mapped = JsonConvert.DeserializeObject<List<CryptoGetAllRequestDTO>>(response_string);

                    return Ok(response_mapped);
                }                                
            }
            catch (Exception ex)
            {
                var x = ex;
                Console.WriteLine(ex);
                return NotFound(ex);
            }
        }
    }
}
