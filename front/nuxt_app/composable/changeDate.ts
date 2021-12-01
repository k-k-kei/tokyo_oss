const changeDate = (time:number) :string =>{
      const dateTime = new Date(time)
      return dateTime.toLocaleDateString('ja-JP')
    }

export default changeDate