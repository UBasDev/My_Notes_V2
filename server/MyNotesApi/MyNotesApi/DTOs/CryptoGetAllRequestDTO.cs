namespace MyNotesApi.DTOs
{
    public class CryptoGetAllRequestDTO
    {
        public string? id { get; set; }
        public string? symbol { get; set; }
        public string? name { get; set; }
        public string? image { get; set; }
        public double? current_price { get; set; }
        public long? market_cap { get; set; }
        public int? market_cap_rank { get; set; }
        public long? fully_diluted_valuation { get; set; }
        public long? total_volume { get; set; }
        public double? high_24h { get; set; }
        public double? low_24h { get; set; }
        public double? price_change_24h { get; set; }
        public double? price_change_percentage_24h { get; set; }
        public double? market_cap_change_24h { get; set; }
        public double? market_cap_change_percentage_24h { get; set; }
        public double? circulating_supply { get; set; }
        public double? total_supply { get; set; }
        public double? max_supply { get; set; }
        public double? ath { get; set; }
        public double? ath_change_percentage { get; set; }
        public DateTime? ath_date { get; set; }
        public double? atl { get; set; }
        public double? atl_change_percentage { get; set; }
        public DateTime? atl_date { get; set; }
        public object? roi { get; set; }
        public DateTime? last_updated { get; set; }
        public double? price_change_percentage_1h_in_currency { get; set; }
    }
}
