export default function orderData(){
    const tempArr = []
    for(let i = 1; i <= 12; i++){
      let existsInSet = false
      for(let ii = 0; ii <= 12; ii++){
        if(i == Object.keys(talliedObject.monthGroup)[ii]){
          talliedMonthArray.push(new MonthData(Object.keys(talliedObject.monthGroup)[ii],Object.values(talliedObject.monthGroup)[ii]))
          existsInSet = true
        }
      }
      !existsInSet ? talliedMonthArray.push(new MonthData(i, 0)) : ""
    }

    return tempArr
}