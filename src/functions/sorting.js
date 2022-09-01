//arr의 구성은{time1:id1, time2:id2} 형태이다. 
export const mintime=(arr)=>{
    //const arr={'23:15:41.141':'id1', '22:25:21.141':'id2', '22:13:31.141': 'id3'}
    //arr.keys(time들)를 가지고 와 sorting한다.
    const arrkeys = Object.keys(arr)
    //sorting된 것을 가지고와 순서대로 item(id)을 return arr에 담는다.
    var h='60'
    var m='60'
    var s='60'
    var splikeys=[]
    var minkey=0
    for (var keys in arrkeys){
        splikeys.push(arrkeys[keys].split(':'))
    }
    for (var keys in splikeys){
        if(splikeys[keys][0]<h){
            h=splikeys[keys][0]
            m=splikeys[keys][1]
            s=splikeys[keys][2].split('.')[0]
            minkey=keys
        }
        else if(splikeys[keys][0]===h){
            if(splikeys[keys][1]<m){
                h=splikeys[keys][0]
                m=splikeys[keys][1]
                s=splikeys[keys][2].split('.')[0]
                minkey=keys
            }
            else if(splikeys[keys][1]===m){
                if(splikeys[keys][0]<s){
                    h=splikeys[keys][0]
                    m=splikeys[keys][1]
                    s=splikeys[keys][2].split('.')[0]
                    minkey=keys
                }
            }
            
        }
        
    }
    //가장작은시간의 id를 넘겨준다.
    return arr[arrkeys[minkey]]
}

export const maxtime=(arr)=>{
    //const arr={'23:15:41.141':'id1', '22:25:21.141':'id2', '22:13:31.141': 'id3'}
    //arr.keys(time들)를 가지고 와 sorting한다.
    const arrkeys = Object.keys(arr)
    //sorting된 것을 가지고와 순서대로 item(id)을 return arr에 담는다.
    var h='0'
    var m='0'
    var s='0'
    var splikeys=[]
    var maxkey=0
    for (var keys in arrkeys){
        splikeys.push(arrkeys[keys].split(':'))
    }
    for (var keys in splikeys){
        if(splikeys[keys][0]>h){
            h=splikeys[keys][0]
            m=splikeys[keys][1]
            s=splikeys[keys][2].split('.')[0]
            maxkey=keys
        }
        else if(splikeys[keys][0]===h){
            if(splikeys[keys][1]>m){
                h=splikeys[keys][0]
                m=splikeys[keys][1]
                s=splikeys[keys][2].split('.')[0]
                maxkey=keys
            }
            else if(splikeys[keys][1]===m){
                if(splikeys[keys][0]>s){
                    h=splikeys[keys][0]
                    m=splikeys[keys][1]
                    s=splikeys[keys][2].split('.')[0]
                    maxkey=keys
                }
            }
            
        }
        
    }
    //가장 늦은 시간의 id를 넘겨준다.
    return arr[arrkeys[maxkey]]
}