const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let example = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let solution = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';

// Solve a puzzle with valid puzzle string: POST request to /api/solve
// Solve a puzzle with missing puzzle string: POST request to /api/solve
// Solve a puzzle with invalid characters: POST request to /api/solve
// Solve a puzzle with incorrect length: POST request to /api/solve
// Solve a puzzle that cannot be solved: POST request to /api/solve
// Check a puzzle placement with all fields: POST request to /api/check
// Check a puzzle placement with single placement conflict: POST request to /api/check
// Check a puzzle placement with multiple placement conflicts: POST request to /api/check
// Check a puzzle placement with all placement conflicts: POST request to /api/check
// Check a puzzle placement with missing required fields: POST request to /api/check
// Check a puzzle placement with invalid characters: POST request to /api/check
// Check a puzzle placement with incorrect length: POST request to /api/check
// Check a puzzle placement with invalid placement coordinate: POST request to /api/check
// Check a puzzle placement with invalid placement value: POST request to /api/check

suite('Functional Tests', () => {

    suite('POST request to /api/solve', () => {

        test('Solve a puzzle with valid puzzle string: POST request to /api/solve', done => {
            chai
                .request(server)
                .post('/api/solve')
                .send({ puzzle: example })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.solution, solution);
                    done();
                });
        });

        test('Solve a puzzle with missing puzzle string: POST request to /api/solve', done => {
            chai
                .request(server)
                .post('/api/solve')
                .send({})
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field missing');
                    done();
                });
        });

        test('Solve a puzzle with invalid characters: POST request to /api/solve', done => {
            let invalidExample = '0?9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

            chai
                .request(server)
                .post('/api/solve')
                .send({ puzzle: invalidExample })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid characters in puzzle');
                    done();
                });
        });

        test('Solve a puzzle with incorrect length: POST request to /api/solve', done => {
            let invalidExample = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.';

            chai
                .request(server)
                .post('/api/solve')
                .send({ puzzle: invalidExample })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                    done();
                });
        });

        test('Solve a puzzle that cannot be solved: POST request to /api/solve', done => {
            let invalidExample = '1.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

            chai
                .request(server)
                .post('/api/solve')
                .send({ puzzle: invalidExample })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Puzzle cannot be solved');
                    done();
                });
        });

    });

    suite('POST request to /api/check', () => {

        test('Check a puzzle placement with all fields: POST request to /api/check', done => {
            chai
                .request(server)
                .post('/api/check')
                .send({ puzzle: example, coordinate: 'A1', value: '7' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.valid, true);
                    done();
                });
        });

        test('Check a puzzle placement with single placement conflict: POST request to /api/check', done => {
            chai
                .request(server)
                .post('/api/check')
                .send({ puzzle: example, coordinate: 'E4', value: '1' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.conflict.length, 1);
                    done();
                });
        });

        test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', done => {
            chai
                .request(server)
                .post('/api/check')
                .send({ puzzle: example, coordinate: 'E4', value: '9' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.conflict.length, 2);
                    done();
                });
        });

        test('Check a puzzle placement with all placement conflicts: POST request to /api/check', done => {
            chai
                .request(server)
                .post('/api/check')
                .send({ puzzle: example, coordinate: 'A2', value: '5' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.conflict.length, 3);
                    done();
                });
        });

        test('Check a puzzle placement with missing required fields: POST request to /api/check', done => {
            chai
                .request(server)
                .post('/api/check')
                .send({ puzzle: example, coordinate: 'A2' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Required field(s) missing');
                    done();
                });
        });

        test('Check a puzzle placement with invalid characters: POST request to /api/check', done => {
            let invalidExample = '0?9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

            chai
                .request(server)
                .post('/api/check')
                .send({ puzzle: invalidExample, coordinate: 'A2', value: '2' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid characters in puzzle');
                    done();
                });
        });

        test('Check a puzzle placement with incorrect length: POST request to /api/check', done => {
            let invalidExample = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.';

            chai
                .request(server)
                .post('/api/check')
                .send({ puzzle: invalidExample, coordinate: 'A2', value: '2' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
                    done();
                });
        });

        test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', done => {
            chai
                .request(server)
                .post('/api/check')
                .send({ puzzle: example, coordinate: 'Z0', value: '1' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid coordinate');
                    done();
                });
        });

        test('Check a puzzle placement with invalid placement value: POST request to /api/check', done => {
            chai
                .request(server)
                .post('/api/check')
                .send({ puzzle: example, coordinate: 'A1', value: '0' })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.error, 'Invalid value');
                    done();
                });
        });
    });
});

after(() => {
    chai.request(server)
        .get('/');
});