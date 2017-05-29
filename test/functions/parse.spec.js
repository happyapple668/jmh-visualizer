import { expect } from 'chai';

import { parseMethodName, parseBenchmarkName, getUniqueParamValues, parseBenchmarkCollections } from '../../src/javascript/functions/parse.js'
import BenchmarkRun from '../../src/javascript/models/BenchmarkRun.js'
import BenchmarkCollection from '../../src/javascript/models/BenchmarkCollection.js'
import BenchmarkResults from '../../src/javascript/models/BenchmarkResults.js'


describe('functions: parseMethodName', () => {

    it('default', () => {

        expect(parseMethodName({
            benchmark: "io.morethan.javabenchmarks.showcase.ParamsBenchmark.bench"
        })).to.equal("bench");
        expect(parseMethodName({
            benchmark: "ParamsBenchmark.bench"
        })).to.equal("bench");

    });

});

describe('functions: parseBenchmarkName', () => {

    it('default', () => {

        expect(parseBenchmarkName({
            benchmark: "io.morethan.javabenchmarks.showcase.ParamsBenchmark.bench"
        })).to.equal("bench");
        expect(parseBenchmarkName({
            benchmark: "ParamsBenchmark.bench"
        })).to.equal("bench");

    });

    it('singleParams', () => {

        expect(parseBenchmarkName({
            benchmark: "io.morethan.javabenchmarks.showcase.ParamsBenchmark.bench",
            params: {
                arg: "1"
            }
        })).to.equal("bench arg=1");
        expect(parseBenchmarkName({
            benchmark: "io.morethan.javabenchmarks.showcase.ParamsBenchmark.bench",
            params: {
                arg: "2"
            }
        })).to.equal("bench arg=2");

    });

    it('multipleParams', () => {

        expect(parseBenchmarkName({
            benchmark: "io.morethan.javabenchmarks.showcase.ParamsBenchmark.bench",
            params: {
                arg: "1",
                certainty: "32",
                gender: "male"
            }
        })).to.equal("bench arg=1 certainty=32 gender=male");

    });

});

describe('functions: getUniqueParamValues', () => {

    it('default', () => {
        const benchmarks = [
            {
                params: {
                    arg: 1,
                    certainty: 0
                }
            },
            {
                params: {
                    arg: 1,
                    certainty: 32
                }
            },
            {
                params: {
                    arg: 2,
                    certainty: 0
                }
            }];
        expect(getUniqueParamValues(benchmarks, 'arg')).to.deep.equal([1, 2]);
        expect(getUniqueParamValues(benchmarks, 'certainty')).to.deep.equal([0, 32]);

    });

});

describe('functions: parseBenchmarkCollections', () => {

    it('default', () => {
        const run1 = new BenchmarkRun({
            name: "1",
            benchmarks: [
                {
                    "benchmark": "com.A.bench",
                },
                {
                    "benchmark": "com.B.bench",
                    "primaryMetric": {
                        "score": 1
                    }
                }
            ]

        });
        const run2 = new BenchmarkRun({
            name: "2",
            benchmarks: [
                {
                    "benchmark": "com.B.bench",
                    "primaryMetric": {
                        "score": 2
                    }
                },
                {
                    "benchmark": "com.B.bench2",
                },
                {
                    "benchmark": "com.C.bench",
                }
            ]
        });
        const benchmarkCollections = parseBenchmarkCollections([run1, run2]);
        const expectedCollections = [
            new BenchmarkCollection({
                key: 'com.A',
                name: 'A',
                methodNames: ['bench'],
                benchmarkResults: [new BenchmarkResults({
                    name: 'bench',
                    params: null,
                    benchmarks: [run1.benchmarks[0], null]
                })]
            }),
            new BenchmarkCollection({
                key: 'com.B',
                name: 'B',
                methodNames: ['bench', 'bench2'],
                benchmarkResults: [
                    new BenchmarkResults({
                        name: 'bench',
                        params: null,
                        benchmarks: [run1.benchmarks[1], run2.benchmarks[0]]
                    }),
                    new BenchmarkResults({
                        name: 'bench2',
                        params: null,
                        benchmarks: [null, run2.benchmarks[1]]
                    })
                ]
            }),
            new BenchmarkCollection({
                key: 'com.C',
                name: 'C',
                methodNames: ['bench'],
                benchmarkResults: [
                    new BenchmarkResults({
                        name: 'bench',
                        params: null,
                        benchmarks: [null, run2.benchmarks[2]]
                    })
                ]
            })
        ];

        expect(benchmarkCollections).to.have.lengthOf(3);
        expect(benchmarkCollections).to.deep.equal(expectedCollections);
    });

});