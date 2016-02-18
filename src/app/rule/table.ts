export module Tables {
    export function count(records:number[][], base?: {}): {} {
        var counting = base || {};
        records.forEach(record => record.forEach(item => counting[item] ? counting[item]++ : (counting[item] = 1)));
        return counting;
    }

    export function merge(lhs: {}, rhs: {}): {} {
        var merged = {};
        
        for (var item in lhs) {
            if (lhs.hasOwnProperty(item)) {
                merged[item] = rhs[item] ? lhs[item] + rhs[item] : lhs[item];
            }
        }

        for (var item in rhs) {
            if (rhs.hasOwnProperty(item)) {
                merged[item] = merged[item] || rhs[item];
            }
        }
        
        return merged;
    }
    
    export function spread(records:number[][], keys: any[]): {} {
        var table = keys.reduce((acc, key) => { acc[key] = []; return acc; }, {});
        
        records.forEach((record, index) => {
            for (var item in table) {
                if (table.hasOwnProperty(item)) {
                    table[item].push(0);
                }
            }
            
            record.forEach(item => {
                table[item] && (table[item][index] += 1);
            });
        });
        
        return table;
    }
}




