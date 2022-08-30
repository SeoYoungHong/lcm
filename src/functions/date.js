export default function getdate(){
    const datetime = new Date()
    var month =datetime.getMonth()
    var date = datetime.getDate()

    if(month<'10') month = '0'+month
    if(date<'10') date = '0'+date
    console.log(date)
    const time =datetime.getFullYear()+'-'+month+'-'+date+'T'+datetime.getHours()+':'+datetime.getMinutes()+':'+datetime.getSeconds()+'.'+datetime.getMilliseconds()+'Z'
    console.log(time)
    return  time
}