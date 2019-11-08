// 111224411
// group [1,1, 1], [2,2], [4,4], [1,1]
// map [3, 1], [2, 2], [2, 4], [2, 1]
// concat 31222421
function group(s) {
    let r = [];
    let g = null;
    for (let i = 0; i < s.length; i++) {
        if (!g || !(g[0] == s.charAt(i))) {
            g = [];
            r.push(g);
        }
        g.push(s.charAt(i));
    }
    return r;
}

function map(f, l) {
    let r = [];
    for (let i = 0; i < l.length; i++) {
        r.push(f(l[i]));
    }
    return r;
}
function concat(l) {
    let r = [];
    for (let i = 0; i < l.length; i++) {
        if (l[i] instanceof Array) {
            for (let j = 0; j < l[i].length; j++) {
                r.push(l[i][j]);
            }
        } else {
            r.push(l[i]);
        }
    }
    return r;
}

function next(s) {
    return concat(map(e => [e.length.toString(), e[0]], group(s))).join('');
}
function ant(n) {
    let s = '1';
    for (let i = 0; i < n; i++) {
        s = next(s);
    }
    return s;
}
process.stdout.write(ant(10));