function flattenFor(arr) {
    let bc = []
    for(let i = 0; i< arr.length; i++) {
        if(Array.isArray(arr[i])) {
            bc = bc.concat(flattenFor(arr[i]))
        }else {
            bc = bc.concat(arr[i])
        }
    }

    return bc;
}


function flattenWithDeep(arr, deepLeval = 1 ) {
    let bc = []
    for(let i = 0; i< arr.length; i++) {
        if(Array.isArray(arr[i]) && deepLeval > 1) {
            bc = bc.concat(flattenFor(arr[i], --deepLeval))
        }else {
            bc = bc.concat(arr[i])
        }
    }
    return bc;
}