import _ from 'lodash';
import Math from 'mathjs';

Math.config({
    number: 'BigNumber', // Default type of number:
    // 'number' (default), 'BigNumber', or 'Fraction'
    precision: 64        // Number of significant digits for BigNumbers 
})


let ts = [];
let ws = [];
let s = [];



function d(n, J) {

    let spliced_array = _.slice(ts, 0, n);
    console.log('d_spliced_array', spliced_array);



    return _.reduce(spliced_array, (sum, el) => {
        console.log('d: s[i] ', s[Math.mod(el, J)])

        return sum + s[Math.mod(el, J)]
    }, 0);
}


function D(n, J) {

    let spliced_array = _.slice(ws, 0, n);
    console.log('D_spliced_array', spliced_array);

    return _.reduce(spliced_array, (sum, el) => {
        console.log('D: s[i] ', s[Math.mod(el, J)])
        return sum + s[Math.mod(el, J)]
    }, 0);
}

function t(i, g, J, p) {
    if (i === 0)
        throw new Error('t_funtion_errror');

    return Math.number(
        Math.mod(
            Math.multiply(
                Math.bignumber(ts[i - 1]),
                Math.bignumber(Math.pow(g,
                    Math.bignumber(s[Math.mod(Math.bignumber(ts[i - 1]), J)])
                ))
            ),
            p
        ))


}

function w(i, g, J, p) {
    if (i === 0)
        throw new Error('w_funtion_errror');

    return Math.number(
        Math.mod(
            Math.multiply(
                Math.bignumber(ws[i - 1]),
                Math.bignumber(Math.pow(g,
                    Math.bignumber(s[Math.mod(Math.bignumber(ws[i - 1]), J)])
                ))
            ),
            p
        ))

}

function findCollision() {

    let ws_collision = _.find(ws, w1 => _.findIndex(ts, t1 => t1 === w1) !== -1);
    console.log('ws_collision', ws_collision)


    let ts_collision = _.find(ts, t1 => _.findIndex(ws, w1 => t1 === w1) !== -1);
    console.log('ts_collision', ts_collision)

    return !(ts_collision !== undefined || ws_collision !== undefined);
}

function findCollisionIndex() {
    let ws_collision_index = _.findIndex(ws, w1 => _.findIndex(ts, t1 => t1 === w1) !== -1);
    let ts_collision_index = _.findIndex(ts, t1 => _.findIndex(ws, w1 => t1 === w1) !== -1);
    return {
        ws_collision_index,
        ts_collision_index
    }
}


function run(x, g, p) {

    let b = p - 1;
    let a = b - 100;

    let J = 7;
    for (let index = 0; index < J; index++) {
        s.push(Math.pow(2, index));
    }
    ws.push(x);
    ts.push(1);

    let iteration = 0;
    while (findCollision() && iteration < 50) {


        console.log('iteration: ', iteration);
        ts.push(t((iteration + 1), g, J, p));
        ws.push(w((iteration + 1), g, J, p));

        iteration++;
    } 2
    console.log('ws', ws)
    console.log('ts', ts)




    let f3 = Math.mod(
        Math.bignumber(
            Math.pow(
                Math.bignumber(2),
                Math.bignumber(169)
            )
        ),
        541
    )
    console.log('f3', f3.toString())

    let f1 = Math.mod(
        Math.bignumber(
            Math.multiply(
                Math.bignumber(
                    Math.pow(
                        Math.bignumber(470),
                        Math.bignumber(358)
                    )
                ),
                Math.bignumber(
                    Math.pow(
                        Math.bignumber(358),
                        Math.bignumber(164)
                    )
                )

            )
        ), 541);


    let f2 = Math.mod(
        Math.bignumber(
            Math.pow(
                Math.bignumber(2),
                Math.bignumber('1141118')
            )
        ),
        451
    )
    console.log('f2', f2.toString())

    for (let index = 0; index < 500; index++) {
        if ((1 + 540 * index) % 169 === 0) {
            console.log('i', index)
        }

    }

    console.log(f1.toString());

    let result = findCollisionIndex();
    console.log('RESULT2: ', result);

    console.log('y= ', b + d(result.ts_collision_index, J) - D(result.ws_collision_index, J))
}


export default run;