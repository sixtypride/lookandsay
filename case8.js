const READ = { type: "read" };
const WRITE = value => ({ type: "write", value });

function* next() {
    let prev = yield READ;
    let count = 1;
    let value;
    while ((value = yield READ)) {
        if (prev === value) {
            count++;
        } else {
            yield WRITE(count); 
            yield WRITE(prev); 
            prev = value; 
            count = 1;
        }
    }
    console.log('[NEXT comp write] ', count, prev);
    yield WRITE(count);
    yield WRITE(prev);
}
function* dispatch(procs, n) {
    let value;
    let cur = n;
    while (true) {
        let next = procs[cur].next(value);
        if (next.done) {
            if (cur === n) {
                return;
            } else {
                value = undefined; 
                cur++;
            }
        } else {
            if (next.value.type === "read") {
                cur--;
            } else if (cur === n) {
                yield next.value.value;
            } else {
                value = next.value.value; 
                cur++;
            }
        }
    }
}
function* ant(n) {
    let procs = new Array(n + 1); 
    procs[0] = (function* () {
        yield WRITE(1);
    })();
    for (let i = 1; i < n + 1; i++) {
        procs[i] = next();
    }
    yield* dispatch(procs, n);
}

const g = ant(3);
console.log('---------',  g.next().value);
console.log('---------',  g.next().value);
console.log('---------',  g.next().value);
console.log('---------',  g.next().value);
console.log('---------',  g.next().value);
console.log('---------',  g.next().value);
console.log('---------',  g.next().value);
console.log('---------',  g.next().value);
console.log('---------',  g.next().value);
// for (let a of ant(3)) {
//     process.stdout.write(`${a}`);
// }