import _ from 'lodash';

//get last part of IPV4
function getLastPart(src) {
    const FOURTH = 3;
    const parts = src.split('.');
    return parts[FOURTH];
}

/**
 * Arrange an array of ips into array of ranges.
 * input ["192.168.10.1", "192.168.10.2", "192.168.110.2", "192.168.110.3", "192.168.110.4",  "192.168.10.8", "192.168.10.4", "192.168.10.9"]
 * output [ "192.168.10.1-192.168.10.2", "192.168.10.4", "192.168.10.8-192.168.10.9", "192.168.110.2-192.168.110.4"]
 * @param array
 */
function groupIPByRange(array) {
    if (!array) return;
    const grps =  _.chain(array)
        .sortBy()
        .groupBy(a => {return a.slice(0, a.lastIndexOf('.'))} )
        .transform(function(result, n){
            const len = n.length-1;
            // Return two item unless there are more that can be arranged in ranges.
            if (len == 1) {
                result.push( n[0]);
                result.push( n[1]);
            }
            else {
                function rangeOrOne(n, start, end) {
                    return (start===end) ? n[start] : (n[start]+'-'+n[end]);
                }
                let start =0;
                _.reduce(n, function(result, seed, seq) {
                    if (seq > 0 && seq === n.length-1) {
                        result.push(rangeOrOne(n, start, seq));
                    }
                    if ((n[seq-1]) && (getLastPart(seed) - getLastPart(n[seq-1])) > 1) {
                        const end = seq-1;
                        result.push(rangeOrOne(n, start, end));
                        start = seq;
                    }
                    return result;
                },[]).map(e => {result.push(e) });
            }
            return result;
        }, [] );
    return _.toArray(grps);
}
export {groupIPByRange}

