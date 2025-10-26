/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @param {import("@textlint/types").TextlintRuleOptions<{ allows?: string[]}>} options
 * @returns {import("@textlint/types").TextlintRuleCreator}
 */
export default function (context, options = {}) {
    const { Syntax, RuleError, report, getSource, locator} = context;
    const allows = options.allows ?? [];
    return {
        [Syntax.Str](node) {
            const text = getSource(node);
            if (allows.some(allow => text.includes(allow))) {
                return;
            }
            // ダッシュ2つの連続を検出（EMダッシュ、ENダッシュ、水平線）
            const dashPattern = /——|––|――/g;
            const matches = text.matchAll(dashPattern);
            for (const match of matches) {
                const index = match.index ?? 0;
                const matchedText = match[0];
                const matchRange = [index, index + matchedText.length];
                let replacement = '──';
                let matchedTextType = '';
                if (matchedText === '——') {
                    matchedTextType = 'EMダッシュ';
                } else if (matchedText === '––') {
                    matchedTextType = 'ENダッシュ';
                } else if (matchedText === '――') {
                    matchedTextType = '水平線';
                }
            
                const ruleError = new RuleError(
                    `${matchedTextType} "${matchedText}" の代わりに罫線 "${replacement}" を使用してください。`,
                    {
                        padding: locator.range(matchRange)
                    }
                );
                report(node, ruleError);
            }
        }
    }
};
