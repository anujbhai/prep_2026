(function() {
    /* Deep comparision */
    function deep_equal(a, b) {
        if (a === b) return true;

        if (a == null || b == null) return false;

        if (typeof a !== 'object' || typeof b !== 'object') return false;
        let keys_a = Object.keys(a);
        let keys_b = Object.keys(b);

        if (keys_a.length !== keys_b.length) return false;

        for (let key of keys_a) {
            if (!keys_b.includes(key) || !deep_equal(a[key], b[key])) {
                return false;
            }
        }

        return true;
    }

    let obj = { here: { is: "an" }, object: 4 };
    console.log(deep_equal(obj, obj));
    console.log(deep_equal(obj, { here: { is: "an" }, object: 4 }));
    console.log(deep_equal(obj, { here: { is: "an" }, object: 5 }));
    console.log(deep_equal(null, undefined));
    console.log(deep_equal({ a: 1 }, null));
})()
