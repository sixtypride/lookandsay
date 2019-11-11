let s = '1';
for (let line = 0; line < 10; line++) {
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
    s = result;
}
process.stdout.write(s);