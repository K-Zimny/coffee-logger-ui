export default function formatData(data){
    const datePattern = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}).*/;

    class BrewEvent {
      constructor(id, year, month, day, hour) {
        this.id    = id
        this.year  = parseInt(year)
        this.month = parseInt(month)
        this.day   = parseInt(day)
        this.hour  = parseInt(hour)
      }
    }

    return data.map((item)=>{
      const dataMatched = item.Timestamp.match(datePattern)

      return new BrewEvent(item.EventID, dataMatched[1], dataMatched[2], dataMatched[3], dataMatched[4])
    })
  }