function next(s) {
    return s.replace(/(.)\1*/g, (g, c) => g.length + c);
}

function ant(n) {
    let s = '1';
    for (let i = 0; i < n; i++) {
        s = next(s);
    }
    return s;
}
process.stdout.write(ant(10));