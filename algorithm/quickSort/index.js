function quickSort(arr) {
    if(!arr.length) return [] 
    let current = arr[0];
    let right = [];
    let left = [];
    let mid = [];

    let index = 0;
    while(index < arr.length) {

        const crt = arr[index];
        
        if(current > crt) {
            left.push(crt)
        } else if( current < crt) {
            right.push(crt)
        } else {
            mid.push(crt)
        }

        index++
    }

    return quickSort(left).concat(mid).concat(quickSort(right))
}