const isIterable = iter => iter && iter[Symbol.iterator];

function ant(n) {
    let s = [1];
    for (let i = 0; i < n; i++) {
        s = next(s);
    }
    return s;
}
function* concat(iter) {
    for (const a of iter) {
        if (isIterable(a)) {
            yield* a;
        } else {
            yield a;
        }
    }
};
function* map(f, iter) {
    for (const a of iter) {
        yield f(a);
    }
}
function* group(iter) {
    let g = null;
    for (const a of iter) {
        if (g === null) {
            g = [a];
        } else if (g[0] === a) {
            g.push(a);
        } else {
            yield g;
            g = [a];
        }
    }
    yield g;
}
function next(ns) {
    return concat(map(g => [g.length, g[0]], group(ns)));
}

for (let a of ant(10)) {
    process.stdout.write(`${a}`);
}