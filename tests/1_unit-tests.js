const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

let example = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let result = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';

// Logic handles a valid puzzle string of 81 characters
// Logic handles a puzzle string with invalid characters (not 1-9 or .)
// Logic handles a puzzle string that is not 81 characters in length
// Logic handles a valid row placement
// Logic handles an invalid row placement
// Logic handles a valid column placement
// Logic handles an invalid column placement
// Logic handles a valid region (3x3 grid) placement
// Logic handles an invalid region (3x3 grid) placement
// Valid puzzle strings pass the solver
// Invalid puzzle strings fail the solver
// Solver returns the expected solution for an incomplete puzzle

suite('Unit Tests', () => {

    test('Logic handles a valid puzzle string of 81 characters', done => {
        assert.equal(solver.checkLength(example), true);
        done();
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', done => {
        let invalidExample = '0?9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.equal(solver.checkCharacters(invalidExample), false);
        done();
    });

    test('Logic handles a puzzle string that is not 81 characters in length', done => {
        let invalidExample = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6.';
        assert.equal(solver.checkLength(invalidExample), false);
        done();
    });

    test('Logic handles a valid row placement', done => {
        assert.equal(solver.checkRowPlacement(example, 'A', 4, 2), true);
        done();
    });

    test('Logic handles an invalid row placement', done => {
        assert.equal(solver.checkRowPlacement(example, 'A', 4, 1), false);
        done();
    });

    test('Logic handles a valid column placement', done => {
        assert.equal(solver.checkColPlacement(example, 'E', 1, 3), true);
        done();
    });

    test('Logic handles an invalid column placement', done => {
        assert.equal(solver.checkColPlacement(example, 'E', 1, 5), false);
        done();
    });

    test('Logic handles a valid region (3x3 grid) placement', done => {
        assert.equal(solver.checkRegionPlacement(example, 'E', 4, 8), true);
        done();
    });

    test('Logic handles an invalid region (3x3 grid) placement', done => {
        assert.equal(solver.checkRegionPlacement(example, 'E', 4, 1), false);
        done();
    });

    test('Valid puzzle strings pass the solver', done => {
        assert.equal(solver.solve(result), result);
        done();
    });

    test('Invalid puzzle strings fail the solver', done => {
        let invalidExample = '1.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.equal(solver.solve(invalidExample), false);
        done();
    });

    test('Solver returns the expected solution for an incomplete puzzle', done => {
        assert.equal(solver.solve(example), result);
        done();
    });
});