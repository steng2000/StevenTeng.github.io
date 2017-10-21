import _ from 'lodash';

 function groupByRange(array) {
        const grps =  _.chain(array)
            .sortBy()
            .groupBy(a => {return a.slice(0, a.lastIndexOf('.'))} )
            .transform(function(result, n){
                function rangeOrOne(n, start, end) {
                    return (start===end) ? n[start] : (n[start]+'-'+n[end]);
                }

                const len = n.length-1;
                // Return two item unless there are more that can be arranged in ranges.
                if (len == 1) {
                    result.push( n[0]);
                    result.push( n[1]);
                }
                else {
                    let start =0;
                     _.reduce(n, function(result, seed, seq) {
                        if (seq > 0 && seq === n.length-1) {
                            result.push(rangeOrOne(n, start, seq));   //(start===seq) ? result.push(n[start]) : result.push(n[start]+'-'+n[seq]);
                        }
                        if ((n[seq-1]) && (getLastPart(seed) - getLastPart(n[seq-1])) > 1) {
                            const end = seq-1;
                            result.push(rangeOrOne(n, start, end));   //(start===end) ? result.push(n[start]) : result.push(n[start]+'-'+n[end]);
                            start = seq;
                        }
                        return result;
                    },[]).map(e => {result.push(e) });
                }
                return result;
            }, [] );
        return grps;
    }

function getLastPart(src) {
    const parts = src.split('.');
    return parts[3];
}

function getIPRanges(array) {
            // test array
            //const src = ["192.168.10.1", "192.168.10.2", "192.168.110.2", "192.168.110.3", "192.168.110.4",  "192.168.10.8", "192.168.10.4", "192.168.10.9"]

            const src = array.map(a => { return a.address});
            const arrayRanges = _.toArray(this.groupByRange(src));
            return arrayRanges;
}

export {getIPRanges}


