function bubbleSort(arr) {
    for(let i = 0; i< arr.length; i++) {
        for(let j = i + 1; j< arr.length; j++) {
            let max = arr[i]
            if(arr[i] > arr[j]) {
                arr[i] = arr[j]
                arr[j] = max;
            }
        }
    }
}