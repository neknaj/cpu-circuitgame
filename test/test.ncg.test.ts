import { FixedLengthArray, Modules } from "./module/turing_complete";
describe('nor', () => {
    it('should handle case #1', () => {
        expect(Modules["nor"].func(true, true)).toEqual([false]);
    });
    it('should handle case #2', () => {
        expect(Modules["nor"].func(true, false)).toEqual([false]);
    });
    it('should handle case #3', () => {
        expect(Modules["nor"].func(false, true)).toEqual([false]);
    });
    it('should handle case #4', () => {
        expect(Modules["nor"].func(false, false)).toEqual([true]);
    });
});

describe('true', () => {
    it('should handle case #1', () => {
        expect(Modules["true"].func(true)).toEqual([true]);
    });
    it('should handle case #2', () => {
        expect(Modules["true"].func(false)).toEqual([true]);
    });
});

describe('false', () => {
    it('should handle case #1', () => {
        expect(Modules["false"].func(false)).toEqual([false]);
    });
    it('should handle case #2', () => {
        expect(Modules["false"].func(false)).toEqual([false]);
    });
});

describe('buf', () => {
    it('should handle case #1', () => {
        expect(Modules["buf"].func(true)).toEqual([true]);
    });
    it('should handle case #2', () => {
        expect(Modules["buf"].func(false)).toEqual([false]);
    });
});

describe('not', () => {
    it('should handle case #1', () => {
        expect(Modules["not"].func(true)).toEqual([false]);
    });
    it('should handle case #2', () => {
        expect(Modules["not"].func(false)).toEqual([true]);
    });
});

describe('and', () => {
    it('should handle case #1', () => {
        expect(Modules["and"].func(true, true)).toEqual([true]);
    });
    it('should handle case #2', () => {
        expect(Modules["and"].func(true, false)).toEqual([false]);
    });
    it('should handle case #3', () => {
        expect(Modules["and"].func(false, true)).toEqual([false]);
    });
    it('should handle case #4', () => {
        expect(Modules["and"].func(false, false)).toEqual([false]);
    });
});

describe('or', () => {
    it('should handle case #1', () => {
        expect(Modules["or"].func(true, true)).toEqual([true]);
    });
    it('should handle case #2', () => {
        expect(Modules["or"].func(true, false)).toEqual([true]);
    });
    it('should handle case #3', () => {
        expect(Modules["or"].func(false, true)).toEqual([true]);
    });
    it('should handle case #4', () => {
        expect(Modules["or"].func(false, false)).toEqual([false]);
    });
});

describe('nand', () => {
    it('should handle case #1', () => {
        expect(Modules["nand"].func(true, true)).toEqual([false]);
    });
    it('should handle case #2', () => {
        expect(Modules["nand"].func(true, false)).toEqual([true]);
    });
    it('should handle case #3', () => {
        expect(Modules["nand"].func(false, true)).toEqual([true]);
    });
    it('should handle case #4', () => {
        expect(Modules["nand"].func(false, false)).toEqual([true]);
    });
});

describe('xor', () => {
    it('should handle case #1', () => {
        expect(Modules["xor"].func(true, true)).toEqual([false]);
    });
    it('should handle case #2', () => {
        expect(Modules["xor"].func(true, false)).toEqual([true]);
    });
    it('should handle case #3', () => {
        expect(Modules["xor"].func(false, true)).toEqual([true]);
    });
    it('should handle case #4', () => {
        expect(Modules["xor"].func(false, false)).toEqual([false]);
    });
});

describe('xnor', () => {
    it('should handle case #1', () => {
        expect(Modules["xnor"].func(true, true)).toEqual([true]);
    });
    it('should handle case #2', () => {
        expect(Modules["xnor"].func(true, false)).toEqual([false]);
    });
    it('should handle case #3', () => {
        expect(Modules["xnor"].func(false, true)).toEqual([false]);
    });
    it('should handle case #4', () => {
        expect(Modules["xnor"].func(false, false)).toEqual([true]);
    });
});

describe('3or', () => {
    it('should handle case #1', () => {
        expect(Modules["3or"].func(true, true, true)).toEqual([true]);
    });
    it('should handle case #2', () => {
        expect(Modules["3or"].func(true, true, false)).toEqual([true]);
    });
    it('should handle case #3', () => {
        expect(Modules["3or"].func(true, false, true)).toEqual([true]);
    });
    it('should handle case #4', () => {
        expect(Modules["3or"].func(false, true, true)).toEqual([true]);
    });
    it('should handle case #5', () => {
        expect(Modules["3or"].func(true, false, false)).toEqual([true]);
    });
    it('should handle case #6', () => {
        expect(Modules["3or"].func(false, true, false)).toEqual([true]);
    });
    it('should handle case #7', () => {
        expect(Modules["3or"].func(false, false, true)).toEqual([true]);
    });
    it('should handle case #8', () => {
        expect(Modules["3or"].func(false, false, false)).toEqual([false]);
    });
});

describe('3and', () => {
    it('should handle case #1', () => {
        expect(Modules["3and"].func(true, true, true)).toEqual([true]);
    });
    it('should handle case #2', () => {
        expect(Modules["3and"].func(true, true, false)).toEqual([false]);
    });
    it('should handle case #3', () => {
        expect(Modules["3and"].func(true, false, true)).toEqual([false]);
    });
    it('should handle case #4', () => {
        expect(Modules["3and"].func(false, true, true)).toEqual([false]);
    });
    it('should handle case #5', () => {
        expect(Modules["3and"].func(true, false, false)).toEqual([false]);
    });
    it('should handle case #6', () => {
        expect(Modules["3and"].func(false, true, false)).toEqual([false]);
    });
    it('should handle case #7', () => {
        expect(Modules["3and"].func(false, false, true)).toEqual([false]);
    });
    it('should handle case #8', () => {
        expect(Modules["3and"].func(false, false, false)).toEqual([false]);
    });
});

describe('4match', () => {
    it('should handle case #1', () => {
        expect(Modules["4match"].func(true, true, true, true)).toEqual([true]);
    });
    it('should handle case #2', () => {
        expect(Modules["4match"].func(false, false, false, false)).toEqual([false]);
    });
    it('should handle case #3', () => {
        expect(Modules["4match"].func(true, true, false, false)).toEqual([true]);
    });
    it('should handle case #4', () => {
        expect(Modules["4match"].func(false, false, true, true)).toEqual([true]);
    });
    it('should handle case #5', () => {
        expect(Modules["4match"].func(true, false, true, false)).toEqual([true]);
    });
    it('should handle case #6', () => {
        expect(Modules["4match"].func(false, true, false, true)).toEqual([true]);
    });
});

describe('4even', () => {
    it('should handle case #1', () => {
        expect(Modules["4even"].func(true, true, true, true)).toEqual([true]);
    });
    it('should handle case #2', () => {
        expect(Modules["4even"].func(true, true, false, false)).toEqual([true]);
    });
    it('should handle case #3', () => {
        expect(Modules["4even"].func(true, false, true, false)).toEqual([true]);
    });
    it('should handle case #4', () => {
        expect(Modules["4even"].func(false, false, false, false)).toEqual([true]);
    });
    it('should handle case #5', () => {
        expect(Modules["4even"].func(true, true, true, false)).toEqual([false]);
    });
    it('should handle case #6', () => {
        expect(Modules["4even"].func(true, false, false, false)).toEqual([false]);
    });
});

describe('4odd', () => {
    it('should handle case #1', () => {
        expect(Modules["4odd"].func(true, true, true, true)).toEqual([false]);
    });
    it('should handle case #2', () => {
        expect(Modules["4odd"].func(true, true, false, false)).toEqual([false]);
    });
    it('should handle case #3', () => {
        expect(Modules["4odd"].func(true, false, true, false)).toEqual([false]);
    });
    it('should handle case #4', () => {
        expect(Modules["4odd"].func(false, false, false, false)).toEqual([false]);
    });
    it('should handle case #5', () => {
        expect(Modules["4odd"].func(true, true, true, false)).toEqual([true]);
    });
    it('should handle case #6', () => {
        expect(Modules["4odd"].func(true, false, false, false)).toEqual([true]);
    });
});

describe('4or', () => {
    it('should handle case #1', () => {
        expect(Modules["4or"].func(true, true, true, true)).toEqual([true]);
    });
    it('should handle case #2', () => {
        expect(Modules["4or"].func(true, true, true, false)).toEqual([true]);
    });
    it('should handle case #3', () => {
        expect(Modules["4or"].func(true, true, false, false)).toEqual([true]);
    });
    it('should handle case #4', () => {
        expect(Modules["4or"].func(true, false, false, false)).toEqual([true]);
    });
    it('should handle case #5', () => {
        expect(Modules["4or"].func(false, false, false, false)).toEqual([false]);
    });
});

describe('4and', () => {
    it('should handle case #1', () => {
        expect(Modules["4and"].func(true, true, true, true)).toEqual([true]);
    });
    it('should handle case #2', () => {
        expect(Modules["4and"].func(true, true, true, false)).toEqual([false]);
    });
    it('should handle case #3', () => {
        expect(Modules["4and"].func(true, true, false, false)).toEqual([false]);
    });
    it('should handle case #4', () => {
        expect(Modules["4and"].func(true, false, false, false)).toEqual([false]);
    });
    it('should handle case #5', () => {
        expect(Modules["4and"].func(false, false, false, false)).toEqual([false]);
    });
});

describe('4count', () => {
    it('should handle case #1', () => {
        expect(Modules["4count"].func(true, true, true, true)).toEqual([false, false, true]);
    });
    it('should handle case #2', () => {
        expect(Modules["4count"].func(true, true, false, false)).toEqual([false, true, false]);
    });
    it('should handle case #3', () => {
        expect(Modules["4count"].func(true, false, true, false)).toEqual([false, true, false]);
    });
    it('should handle case #4', () => {
        expect(Modules["4count"].func(false, false, false, false)).toEqual([false, false, false]);
    });
    it('should handle case #5', () => {
        expect(Modules["4count"].func(true, false, false, false)).toEqual([true, false, false]);
    });
    it('should handle case #6', () => {
        expect(Modules["4count"].func(false, true, false, false)).toEqual([true, false, false]);
    });
});

describe('hAddr', () => {
    it('should handle case #1', () => {
        expect(Modules["hAddr"].func(true, true)).toEqual([true, false]);
    });
    it('should handle case #2', () => {
        expect(Modules["hAddr"].func(true, false)).toEqual([false, true]);
    });
    it('should handle case #3', () => {
        expect(Modules["hAddr"].func(false, true)).toEqual([false, true]);
    });
    it('should handle case #4', () => {
        expect(Modules["hAddr"].func(false, false)).toEqual([false, false]);
    });
});

describe('fAddr', () => {
    it('should handle case #1', () => {
        expect(Modules["fAddr"].func(true, true, true)).toEqual([true, true]);
    });
    it('should handle case #2', () => {
        expect(Modules["fAddr"].func(false, true, true)).toEqual([true, false]);
    });
    it('should handle case #3', () => {
        expect(Modules["fAddr"].func(true, false, true)).toEqual([true, false]);
    });
    it('should handle case #4', () => {
        expect(Modules["fAddr"].func(false, false, true)).toEqual([false, true]);
    });
    it('should handle case #5', () => {
        expect(Modules["fAddr"].func(true, true, false)).toEqual([true, false]);
    });
    it('should handle case #6', () => {
        expect(Modules["fAddr"].func(false, true, false)).toEqual([false, true]);
    });
    it('should handle case #7', () => {
        expect(Modules["fAddr"].func(true, false, false)).toEqual([false, true]);
    });
    it('should handle case #8', () => {
        expect(Modules["fAddr"].func(false, false, false)).toEqual([false, false]);
    });
});

describe('fAddr2', () => {
    it('should handle case #1', () => {
        expect(Modules["fAddr2"].func(true, true)).toEqual([true, true]);
    });
    it('should handle case #2', () => {
        expect(Modules["fAddr2"].func(false, true)).toEqual([true, false]);
    });
    it('should handle case #3', () => {
        expect(Modules["fAddr2"].func(true, false)).toEqual([true, false]);
    });
    it('should handle case #4', () => {
        expect(Modules["fAddr2"].func(false, false)).toEqual([false, true]);
    });
});

describe('8nor', () => {
    it('should handle case #1', () => {
        expect(Modules["8nor"].func(true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true)).toEqual([false, false, false, false, false, false, false, false]);
    });
    it('should handle case #2', () => {
        expect(Modules["8nor"].func(true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false)).toEqual([false, false, false, false, true, true, true, true]);
    });
    it('should handle case #3', () => {
        expect(Modules["8nor"].func(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false)).toEqual([true, true, true, true, true, true, true, true]);
    });
});

describe('8buf', () => {
    it('should handle case #1', () => {
        expect(Modules["8buf"].func(true, true, true, true, false, false, false, false)).toEqual([true, true, true, true, false, false, false, false]);
    });
    it('should handle case #2', () => {
        expect(Modules["8buf"].func(false, false, false, false, true, true, true, true)).toEqual([false, false, false, false, true, true, true, true]);
    });
});

describe('8not', () => {
    it('should handle case #1', () => {
        expect(Modules["8not"].func(true, true, true, true, false, false, false, false)).toEqual([false, false, false, false, true, true, true, true]);
    });
    it('should handle case #2', () => {
        expect(Modules["8not"].func(false, false, false, false, true, true, true, true)).toEqual([true, true, true, true, false, false, false, false]);
    });
});

describe('8or', () => {
    it('should handle case #1', () => {
        expect(Modules["8or"].func(true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true)).toEqual([true, true, true, true, true, true, true, true]);
    });
    it('should handle case #2', () => {
        expect(Modules["8or"].func(true, true, true, true, false, false, false, false, false, false, false, false, false, false, false, false)).toEqual([true, true, true, true, false, false, false, false]);
    });
    it('should handle case #3', () => {
        expect(Modules["8or"].func(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false)).toEqual([false, false, false, false, false, false, false, false]);
    });
});

describe('8and', () => {
    it('should handle case #1', () => {
        expect(Modules["8and"].func(true, true, true, true, false, false, false, false, true, true, true, true, false, false, false, false)).toEqual([true, true, true, true, false, false, false, false]);
    });
    it('should handle case #2', () => {
        expect(Modules["8and"].func(true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true)).toEqual([false, false, false, false, false, false, false, false]);
    });
    it('should handle case #3', () => {
        expect(Modules["8and"].func(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false)).toEqual([false, false, false, false, false, false, false, false]);
    });
});

describe('8shiftr', () => {
    it('should handle case #1', () => {
        expect(Modules["8shiftr"].func(true, true, true, true, false, false, false, false)).toEqual([false, true, true, true, true, false, false, false]);
    });
    it('should handle case #2', () => {
        expect(Modules["8shiftr"].func(false, false, false, false, true, true, true, true)).toEqual([false, false, false, false, false, true, true, true]);
    });
});

describe('8addr', () => {
    it('should handle case #1', () => {
        expect(Modules["8addr"].func(true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true)).toEqual([true, true, true, true, true, true, true, true]);
    });
    it('should handle case #2', () => {
        expect(Modules["8addr"].func(true, true, true, true, true, true, true, false, true, false, false, false, true, true, true, true)).toEqual([false, false, false, false, true, true, true, false]);
    });
    it('should handle case #3', () => {
        expect(Modules["8addr"].func(false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false)).toEqual([false, false, false, false, false, false, false, false]);
    });
});

describe('8sub', () => {
    it('should handle case #1', () => {
        expect(Modules["8sub"].func(true, false, true, false, false, false, false, false, false, true, false, false, false, false, false, false)).toEqual([true, true, false, false, false, false, false, false]);
    });
    it('should handle case #2', () => {
        expect(Modules["8sub"].func(true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false)).toEqual([true, true, true, true, true, true, true, true]);
    });
    it('should handle case #3', () => {
        expect(Modules["8sub"].func(true, true, false, true, false, false, false, false, false, false, true, true, false, false, false, false)).toEqual([true, true, true, true, true, true, true, true]);
    });
});

describe('8nagate', () => {
    it('should handle case #1', () => {
        expect(Modules["8nagate"].func(true, true, true, true, false, false, false, false)).toEqual([true, false, false, false, true, true, true, true]);
    });
    it('should handle case #2', () => {
        expect(Modules["8nagate"].func(false, false, false, false, true, true, true, true)).toEqual([false, false, false, false, true, false, false, false]);
    });
    it('should handle case #3', () => {
        expect(Modules["8nagate"].func(false, false, false, false, false, false, false, false)).toEqual([false, false, false, false, false, false, false, false]);
    });
});

describe('1decoder', () => {
    it('should handle case #1', () => {
        expect(Modules["1decoder"].func(true)).toEqual([false, true]);
    });
    it('should handle case #2', () => {
        expect(Modules["1decoder"].func(false)).toEqual([true, false]);
    });
});

describe('2decoder', () => {
    it('should handle case #1', () => {
        expect(Modules["2decoder"].func(true, true)).toEqual([false, false, false, true]);
    });
    it('should handle case #2', () => {
        expect(Modules["2decoder"].func(false, true)).toEqual([false, false, true, false]);
    });
    it('should handle case #3', () => {
        expect(Modules["2decoder"].func(true, false)).toEqual([false, true, false, false]);
    });
    it('should handle case #4', () => {
        expect(Modules["2decoder"].func(false, false)).toEqual([true, false, false, false]);
    });
});

describe('8switch', () => {
    it('should handle case #1', () => {
        expect(Modules["8switch"].func(true, true, true, true, false, false, false, false, true)).toEqual([true, true, true, true, false, false, false, false]);
    });
    it('should handle case #2', () => {
        expect(Modules["8switch"].func(true, true, true, true, false, false, false, false, false)).toEqual([false, false, false, false, false, false, false, false]);
    });
    it('should handle case #3', () => {
        expect(Modules["8switch"].func(false, false, false, false, true, true, true, true, true)).toEqual([false, false, false, false, true, true, true, true]);
    });
    it('should handle case #4', () => {
        expect(Modules["8switch"].func(false, false, false, false, true, true, true, true, false)).toEqual([false, false, false, false, false, false, false, false]);
    });
});

describe('6or', () => {
    it('should handle case #1', () => {
        expect(Modules["6or"].func(true, true, true, true, true, true)).toEqual([true]);
    });
    it('should handle case #2', () => {
        expect(Modules["6or"].func(false, true, true, true, true, true)).toEqual([true]);
    });
    it('should handle case #3', () => {
        expect(Modules["6or"].func(true, false, true, true, true, true)).toEqual([true]);
    });
    it('should handle case #4', () => {
        expect(Modules["6or"].func(true, true, false, true, true, true)).toEqual([true]);
    });
    it('should handle case #5', () => {
        expect(Modules["6or"].func(true, true, true, false, true, true)).toEqual([true]);
    });
    it('should handle case #6', () => {
        expect(Modules["6or"].func(true, true, true, true, false, true)).toEqual([true]);
    });
    it('should handle case #7', () => {
        expect(Modules["6or"].func(true, true, true, true, true, false)).toEqual([true]);
    });
    it('should handle case #8', () => {
        expect(Modules["6or"].func(false, false, false, false, false, false)).toEqual([false]);
    });
});

describe('selector', () => {
    it('should handle case #1', () => {
        expect(Modules["selector"].func(true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true, true)).toEqual([true, true, true, true, false, false, false, false]);
    });
    it('should handle case #2', () => {
        expect(Modules["selector"].func(true, true, true, true, false, false, false, false, false, false, false, false, true, true, true, true, false)).toEqual([false, false, false, false, true, true, true, true]);
    });
});

describe('copyvalue', () => {
    it('should handle case #1', () => {
        expect(Modules["copyvalue"].func(true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, false)).toEqual([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
    });
    it('should handle case #2', () => {
        expect(Modules["copyvalue"].func(true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, true, false)).toEqual([true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false]);
    });
    it('should handle case #3', () => {
        expect(Modules["copyvalue"].func(true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, false, true)).toEqual([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
    });
    it('should handle case #4', () => {
        expect(Modules["copyvalue"].func(true, true, true, true, true, true, true, true, false, false, false, false, false, false, false, false, true, true)).toEqual([false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true]);
    });
});

describe('8inc', () => {
    it('should handle case #1', () => {
        expect(Modules["8inc"].func(false, true, true, true, true, true, true, true)).toEqual([true, true, true, true, true, true, true, true]);
    });
    it('should handle case #2', () => {
        expect(Modules["8inc"].func(false, false, false, false, false, false, false, false)).toEqual([true, false, false, false, false, false, false, false]);
    });
    it('should handle case #3', () => {
        expect(Modules["8inc"].func(true, true, true, true, true, true, true, false)).toEqual([false, false, false, false, false, false, false, true]);
    });
});

describe('7or', () => {
    it('should handle case #1', () => {
        expect(Modules["7or"].func(true, false, false, false, false, false, false)).toEqual([true]);
    });
    it('should handle case #2', () => {
        expect(Modules["7or"].func(false, false, false, false, false, false, true)).toEqual([true]);
    });
    it('should handle case #3', () => {
        expect(Modules["7or"].func(false, false, false, false, false, false, false)).toEqual([false]);
    });
    it('should handle case #4', () => {
        expect(Modules["7or"].func(true, true, true, true, true, true, true)).toEqual([true]);
    });
});
