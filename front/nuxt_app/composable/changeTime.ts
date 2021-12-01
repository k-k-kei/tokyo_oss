const changeTime = (time:number) :string => {
      const dateTime = new Date(time)
      return dateTime.toLocaleTimeString('ja-JP')
    }

export default changeTime
