import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();
tester.run("rule", rule, {
    valid: [
        "ダッシュを使っていないテキスト",
        "ダッシュではなく──罫線を使っているテキスト"
    ],
    invalid: [
        // EMダッシュ
        {
            text: "創造——破壊（EMダッシュ）",
            errors: [
                {
                    message: 'EMダッシュ "——" の代わりに罫線 "──" を使用してください。',
                    range: [2, 4]
                }
            ]
        },
        // ENダッシュ
        {
            text: "事実––虚構（ENダッシュ）",
            errors: [
                {
                    message: 'ENダッシュ "––" の代わりに罫線 "──" を使用してください。',
                    range: [2, 4]
                }
            ]
        },
        // 水平線
        {
            text: "過去――未来（水平線）",
            errors: [
                {
                    message: '水平線 "――" の代わりに罫線 "──" を使用してください。',
                    range: [2, 4]
                }
            ]
        },
        // 複数のダッシュ
        {
            text: `––ここだけではなく——別の箇所もダッシュがあるテキスト`,
            errors: [
                {
                    message: 'ENダッシュ "––" の代わりに罫線 "──" を使用してください。',
                    range: [0, 2]
                },
                {
                    message: 'EMダッシュ "——" の代わりに罫線 "──" を使用してください。',
                    range: [10, 12]
                }
            ]
        }
    ]
});
