export default function getdate(){
    const datetime = new Date()
    var month =datetime.getMonth()+1
    var date = datetime.getDate()
    var hour = datetime.getHours()

    if(month<'10') month = '0'+month
    if(date<'10') date = '0'+date
    if(hour<'10') hour = '0'+hour
    const time =datetime.getFullYear()+'-'+month+'-'+date+'T'+hour+':'+datetime.getMinutes()+':'+datetime.getSeconds()+'.'+datetime.getMilliseconds()+'Z'
    return  time
}