let apiKey = "ETEWL6NPSKHWI9XU"
// let apiKey = "demo"
let polygonApiKey = "FhVraapciQGr1op_d8mSSHFo7iDOzpbo"
async function getStockData(tickerSymbol)
{
    let url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol="+tickerSymbol+"&apikey="+apiKey
    // let url = "https://api.polygon.io/v2/aggs/ticker/IBM/range/1/month/2023-01-01/2024-01-01?adjusted=true&sort=asc&apiKey=FhVraapciQGr1op_d8mSSHFo7iDOzpbo"
    console.log(url)
    let response = await fetch(url)
    .then(response => response.json())
    console.log(response['Monthly Time Series'])

    let labels = []
    let priceData = []

    let monthCounter = 1

    for(const key in response['Monthly Time Series'])
    {
        labels.push(key)
        priceData.push(response['Monthly Time Series'][key]['4. close'])
        if(monthCounter >= 12)
        {
            break
        }
        monthCounter++
    }
    console.log(priceData)

    return [labels.reverse(), priceData.reverse()]
}