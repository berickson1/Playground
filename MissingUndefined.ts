export function test() {
    let foo: { bar: number };
    // Compiler error as expected
    //foo.bar = 4;
    setTimeout(() => {
        // Expect compiler error since foo has never been assigned
        console.log(foo.bar);
    }, 0);
}

test();