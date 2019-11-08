function next(s) {
    let length = 1;
    let head = s.charAt(0);
    let result = '';
    for (let i = 1; i < s.length; i++) {
        if (s.charAt(i) == head) {
            length++;
        } else {
            result += length;
            result += head;
            length = 1;
            head = s.charAt(i);
        }
    }
    result += length;
    result += head;
    return result;
}
function ant(n) {
    let s = '1';
    for (let i = 0; i < n; i++) {
        s = next(s);
    }
    return s;
}
process.stdout.write(ant(10));