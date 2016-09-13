//  _____  ______  _____ _______            _____ _____    _    _ _____  _      
// |  __ \|  ____|/ ____|__   __|     /\   |  __ \_   _|  | |  | |  __ \| |     
// | |__) | |__  | (___    | |       /  \  | |__) || |    | |  | | |__) | |     
// |  _  /|  __|  \___ \   | |      / /\ \ |  ___/ | |    | |  | |  _  /| |     
// | | \ \| |____ ____) |  | |     / ____ \| |    _| |_   | |__| | | \ \| |____ 
// |_|  \_\______|_____/   |_|    /_/    \_\_|   |_____|   \____/|_|  \_\_____|
const RESTURL = 'http://localhost:3000/';

function binarySearch(arr, element, compare_fn) {
    var start = 0;
    var end = arr.length - 1;
    while (start <= end) {
        var mid = Math.floor(((end - start) / 2) + start);//(end + start) >> 1;
        var cmp = compare_fn(element, arr[mid]);
        if (cmp > 0) {
            start = mid + 1;
        } else if (cmp < 0) {
            end = mid - 1;
        } else {
            return mid;
        }
    }
    return false;
}