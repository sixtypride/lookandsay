function iter(obj) {
    return obj[Symbol.iterator]();
}
function uniter(iter) {
    return {
        [Symbol.iterator]: function () {
            return iter;
        }
    }
}
function group(it) {
    let g = null;
    return {
        next() {
            while (true) {
                let { value, done } = it.next();
                if (done && g === null) {
                    return { done: true };
                } else if (done) {
                    let result = g;
                    g = null;
                    return { done: false, value: result };
                } else if (g === null) {
                    g = [value];
                } else if (g[0] === value) {
                    g.push(value);
                } else {
                    let result = g;
                    g = [value];
                    return { done: false, value: result };
                }
            }
        }
    };
}
function map(f, it) {
    return {
        next() {
            let { value, done } = it.next();
            if (done) {
                return { done: true };
            } else {
                return { done: false, value: f(value) };
            }
        }
    }
}
function concat(it) {
    let inner = null;
    return {
        next() {
            while (true) {
                if (inner === null) {
                    let { value, done } = it.next();
                    if (done) {
                        return { done: true };
                    } else {
                        inner = value;
                    }
                }
                let { value, done } = inner.next();
                if (done) {
                    inner = null;
                } else {
                    return { done: false, value };
                }
            }
        }
    };
}
function next(ns) {
    return concat(map(g => iter([g.length, g[0]]), group(ns)));
}
function ant(n) {
    let s = iter([1]);
    for (let i = 0; i < n; i++) {
        s = next(s);
    }
    return s;
}

// const c = concat(iter([iter([1,3,4]),iter([1,3,4])]));
// const g = group(iter('11'));
for (let a of uniter(ant(100))) {
    process.stdout.write(`${a}`);
}