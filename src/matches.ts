type Match = {
    change: string,
    new: string
}

function getRegexMatches(test_str: string, expr: RegExp, dummy_new: string | undefined = undefined): Match[] {
    let matches: Match[] = [];
    let match;

    while ((match = expr.exec(test_str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (match.index === expr.lastIndex) {
            expr.lastIndex++;
        }
        let res: Match = {
            change: match[1],
            new: typeof dummy_new === 'string' ? dummy_new : match[2]
        }
        matches.push(res)
    }
    return matches;
}

function replaceMatch(original_str: string, match: Match): string {
    return original_str.replace(match.change, match.new);
}

function matchChanges(test_str: string): Match[] {
    let matches: Match[] = [];

    let rem = /(\\remove\{(.+?)\})/gm;
    matches.push(...getRegexMatches(test_str, rem, ""));

    let add = /(\\add\{(.+?)\})/gm;
    matches.push(...getRegexMatches(test_str, add));

    let change = /(\\change\{(?:.+?)}\{(.+?)\})/gm;
    matches.push(...getRegexMatches(test_str, change));

    return matches;
}

function replaceDoubleSpaces(test_str: string): string {
    return test_str.replace(/  /g, " ");
}

function applyChanges(test_str: string, matches: Match[]): string {
    let res = test_str;
    matches.forEach((match) => {
        res = replaceMatch(res, match);
    });
    res = replaceDoubleSpaces(res);
    return res;

}

function applyChangesToAll(test_str: string): string {
    let matches = matchChanges(test_str);
    return applyChanges(test_str, matches);
}

export { applyChangesToAll };

