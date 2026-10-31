/* =========================================================
   文澜 · built-in demonstration paper (selected sections)
   The excerpt is from an open-access article (CC BY 4.0):
   Senadheera et al., Information Processing and Management 63 (2026) 104932.
   It exists so the annotation workflow can be tried without uploading a file.
   ========================================================= */

(function () {
  'use strict';

  const TITLE = 'Is responsible AI a public demand? Trust, risk, and persuasion in local government AI';

  const ABSTRACT = 'Local governments are increasingly integrating AI into public service delivery; however, public acceptance remains uneven and is shaped by multiple factors. This study investigates how trust, persuasion, and perceived risk interact to shape public demand for responsible AI. Using a cross-national survey of 1220 respondents across Australia, Spain, and the United States and analysing the data through structural equation modelling (SEM), the study identifies key psychological drivers of public expectations. The findings reveal that trust consistently reduces perceived AI risk, while persuasion primarily strengthens trust rather than directly influencing risk perceptions. Notable cross-country differences emerged; in Australia, trust plays a dominant role in shaping perceptions of AI risk (β = −0.39); in Spain, persuasion (β = −0.21) balances for low institutional trust; and in the United States, mediated persuasion accounts for nearly 30% of variance in trust (β = 0.55). Across all contexts, perceived risk is positively associated with stronger expectations for responsible AI, explaining 11%–24% of the variance in demand. This study contributes by moving beyond normative policy framing of responsible AI and showing empirically that it is a locally interpreted public demand. This highlights that responsible AI is not a universal construct and calls for context-specific strategies that align with local intuitional trust dynamics and mediated persuasive environments.';

  const P = {
    intro1: 'AI is transforming local governance by adopting AI-driven tools across different administrative and service functions (Wirtz et al., 2019; Yigitcanlar, Li, Beeramoole, & Paz, 2023). From automating citizen inquiries through optimising resources to urban planning, AI delivers efficiency gains that were previously unattainable, through tools such as chatbots, traffic prediction models, and pattern recognition systems (Abbasi & El Hanandeh, 2016; Mellit & Pavan, 2010; Senadheera et al., 2025; Tian & Pan, 2015). These applications help reduce bureaucratic inertia, improve decision-making, create opportunities for citizen engagement in smart city coproduction, and enhance service delivery (Rotta et al., 2019; Wirtz et al., 2019).',
    intro2: 'Nevertheless, as AI becomes increasingly embedded in decision-making, there are attendant and mounting concerns over transparency, fairness, and accountability (Androutsopoulou et al., 2019; Wirtz et al., 2019; Yigitcanlar, David, et al., 2024). As AI systems exhibit more autonomous practices or advisory roles in governance, questions around who takes the responsibility or how the responsibility is achieved become increasingly prominent (Yigitcanlar et al., 2021). In this context, public opinion is not optional but foundational to ensure the acceptance of AI in democratic governance.',
    intro4: 'Yet, understanding public perceptions of AI is challenging. Perception can vary significantly across individuals and national contexts. Many determinants such as trust, experiences, social convincing, awareness, and personal and cultural norms shape how technology is received (Kelly et al., 2023). It reveals that public acceptance of AI is not uniform, nor are perceptions of its responsible adoption. Given that local governments operate at the intersection of citizen engagement and service delivery (Bright et al., 2019), they are uniquely positioned and obligated to respond to these variations in perception (Yigitcanlar et al., 2025). However, while prior research identifies trust and risk as central to public technology acceptance, and responsible AI scholarship has largely focused on normative frameworks and institutional definitions (Li et al., 2023; Mikalef et al., 2022) little is known about how these dynamics vary across different governance contexts. This study addresses this gap by advancing theory and empirical evidence, by examining how trust, persuasion, and perceived risk jointly interact, framing responsible AI as a locally interpreted public demand that emerges differently under varying institutional trust-risk regimes.',
    intro5: "Accordingly, this study investigates the public perception of responsible AI in the context of AI adoption among local governments. Here, 'local government' refers to the subnational tier of public administration closest to citizens within each national context, who are responsible for frontline public service delivery (e.g., municipal or city councils). Following a cross-national comparative focus, this study attempts to address two key research questions: (a) How do institutional trust contexts and persuasive environments shape citizens' interpretation of AI-related risks? (b) How does this perceived risk influence the public view on the importance of responsible AI?",
    find1: 'It is anticipated that trust plays a crucial role in shaping public perceptions of risk (Beldad et al., 2011; Glikson & Woolley, 2020), particularly in government adoptions of emerging technologies. When public resources are invested in technologies supposedly aimed at improving citizen services, people seek assurance that these decisions serve the public good. In such context, trust in local authorities becomes a more decisive factor in whether individuals perceive these technologies as beneficial or risk laden. Our study reaffirms this foundational ideology while extending it by comparing responses from three distinct national contexts. What stands out across all cases is that trust plays a stronger role than persuasion in public perceptions of AI risks.',
    concl1: 'This study aimed to examine public perceptions of responsible AI adoption in local governments, focusing on the roles of public trust, persuasion, and perceived risk. Using an online survey (n=1220) across Australia, Spain, and the United States, and employing structural equation modelling (SEM), it investigated how cultural, institutional, and social factors are associated with attitudes towards responsible AI at the local level.',
    concl2: "Findings reveal several key insights. First, trust plays a stronger role than persuasion in shaping public perceptions of AI risk. However, persuasion is more effective at building trust than at directly reducing perceived risks. These dynamics differ by context: in Australia, trust in local government is the primary lens through which AI risk is evaluated, with persuasion showing limited influence, likely due to the country's cohesive, trust-oriented governance culture. In the United States, trust shows stronger association with persuasive cues, nearly 30% of trust is accounted by external narratives, reflecting technologically optimistic, individualistic cultural norms. In Spain, where institutional trust is comparatively lower, persuasion contributes to trust formation but operates less effectively than in the US.",
    concl3: "Across all three countries, higher endorsement of AI-related risk concerns is associated with stronger expectations for responsible AI governance However, the meaning of 'responsible AI' is interpreted differently. In Australia, it is associated with accountability, regulation, and cultural inclusivity. In Spain, transparency, security, and regional identity are central. In the US, responsibility is largely framed through performance, accountability, and sustainability. These findings suggest while responsible AI demanded in all countries, it is not a universal construct, but one dynamically shaped by local values, governance traditions, and public experience.",
    concl5: "In conclusion, this study underscores that perceptions of responsible AI in local government are deeply rooted with cultural and institutional realities. What constitutes 'responsibility' varies across societies and communities. Rather than applying standardised models, this study emphasises the importance of aligning governance approaches with locally articulated expectations."
  };

  const blocks = [
    { type: 'h2', text: '1. Introduction', page: 1 },
    { type: 'p', text: P.intro1, page: 1 },
    { type: 'p', text: P.intro2, page: 2 },
    { type: 'p', text: P.intro4, page: 2 },
    { type: 'p', text: P.intro5, page: 3 },
    { type: 'h4', text: '5.1.1. Trust plays a stronger role than persuasion in public perceptions of AI risk', page: 11 },
    { type: 'p', text: P.find1, page: 11 },
    { type: 'h2', text: '6. Conclusion', page: 16 },
    { type: 'p', text: P.concl1, page: 16 },
    { type: 'p', text: P.concl2, page: 16 },
    { type: 'p', text: P.concl3, page: 16 },
    { type: 'p', text: P.concl5, page: 16 }
  ];

  const doc = {
    id: 'demo_responsible_ai_2026',
    title: TITLE,
    displayName: '负责任的人工智能是公众需求吗 · 示例文献',
    authors: 'Sajani Senadheera, Tan Yigitcanlar, Kevin Desouza, Karen Mossberger, Pauline Hope Cheong, Juan Corchado, Alexander Paz',
    abstract: ABSTRACT,
    keywords: ['local government', 'artificial intelligence', 'responsible AI adoption', 'public trust', 'risk perception', 'persuasive communication'],
    source: 'Information Processing and Management · 63 (2026) 104932',
    doi: '10.1016/j.ipm.2026.104932',
    year: '2026',
    pageCount: 16,
    blocks,
    wordCount: 920,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    originalName: '示例文献 · 节选（CC BY 4.0）',
    isDemo: true
  };

  const pairs = [
    // Abstract
    ['Local governments are increasingly integrating AI into public service delivery; however, public acceptance remains uneven and is shaped by multiple factors.', '地方政府正日益将人工智能嵌入公共服务供给；然而，公众接受度仍不均衡，并受多重因素塑造。'],
    ['This study investigates how trust, persuasion, and perceived risk interact to shape public demand for responsible AI.', '本研究考察信任、说服与感知风险如何相互作用，共同塑造公众对负责任人工智能的需求。'],
    ['Using a cross-national survey of 1220 respondents across Australia, Spain, and the United States and analysing the data through structural equation modelling (SEM), the study identifies key psychological drivers of public expectations.', '研究基于澳大利亚、西班牙和美国 1220 名受访者的跨国调查，并运用结构方程模型（SEM）分析数据，识别公众期望背后的关键心理驱动因素。'],
    ['The findings reveal that trust consistently reduces perceived AI risk, while persuasion primarily strengthens trust rather than directly influencing risk perceptions.', '研究发现，信任始终能降低公众感知到的人工智能风险，而说服主要增强信任，而非直接影响风险感知。'],
    ['Notable cross-country differences emerged; in Australia, trust plays a dominant role in shaping perceptions of AI risk (β = −0.39); in Spain, persuasion (β = −0.21) balances for low institutional trust; and in the United States, mediated persuasion accounts for nearly 30% of variance in trust (β = 0.55).', '显著的跨国差异随之显现：在澳大利亚，信任在塑造人工智能风险感知中起主导作用（β = −0.39）；在西班牙，说服（β = −0.21）在一定程度上弥补了较低的机构信任；在美国，中介化说服解释了信任方差近 30%（β = 0.55）。'],
    ['Across all contexts, perceived risk is positively associated with stronger expectations for responsible AI, explaining 11%–24% of the variance in demand.', '在所有情境中，感知风险均与更强烈的负责任人工智能期待正相关，解释了需求方差的 11%–24%。'],
    ['This study contributes by moving beyond normative policy framing of responsible AI and showing empirically that it is a locally interpreted public demand.', '本研究的贡献在于超越负责任人工智能的规范性政策框架，以实证表明它是一种被地方性解读的公众需求。'],
    ['This highlights that responsible AI is not a universal construct and calls for context-specific strategies that align with local intuitional trust dynamics and mediated persuasive environments.', '这凸显出负责任人工智能并非普遍适用的建构，需要与地方制度信任动态和中介化说服环境相契合的情境化策略。'],

    // Introduction 1
    ['AI is transforming local governance by adopting AI-driven tools across different administrative and service functions (Wirtz et al., 2019; Yigitcanlar, Li, Beeramoole, & Paz, 2023).', '人工智能正通过在不同行政与服务职能中采用人工智能工具，重塑地方治理（Wirtz et al., 2019; Yigitcanlar, Li, Beeramoole, & Paz, 2023）。'],
    ['From automating citizen inquiries through optimising resources to urban planning, AI delivers efficiency gains that were previously unattainable, through tools such as chatbots, traffic prediction models, and pattern recognition systems (Abbasi & El Hanandeh, 2016; Mellit & Pavan, 2010; Senadheera et al., 2025; Tian & Pan, 2015).', '从自动回应市民咨询、优化资源配置到城市规划，人工智能借助聊天机器人、交通预测模型和模式识别系统等工具，带来了此前难以实现的效率提升（Abbasi & El Hanandeh, 2016; Mellit & Pavan, 2010; Senadheera et al., 2025; Tian & Pan, 2015）。'],
    ['These applications help reduce bureaucratic inertia, improve decision-making, create opportunities for citizen engagement in smart city coproduction, and enhance service delivery (Rotta et al., 2019; Wirtz et al., 2019).', '这些应用有助于减少官僚惰性、改善决策、为市民参与智慧城市共同生产创造机会，并提升服务供给（Rotta et al., 2019; Wirtz et al., 2019）。'],

    // Introduction 2
    ['Nevertheless, as AI becomes increasingly embedded in decision-making, there are attendant and mounting concerns over transparency, fairness, and accountability (Androutsopoulou et al., 2019; Wirtz et al., 2019; Yigitcanlar, David, et al., 2024).', '然而，随着人工智能日益嵌入决策过程，透明度、公平性与问责制等方面也引发了伴随而来且不断加剧的担忧（Androutsopoulou et al., 2019; Wirtz et al., 2019; Yigitcanlar, David, et al., 2024）。'],
    ['As AI systems exhibit more autonomous practices or advisory roles in governance, questions around who takes the responsibility or how the responsibility is achieved become increasingly prominent (Yigitcanlar et al., 2021).', '当人工智能系统在治理中表现出更强的自主实践或咨询角色时，由谁承担责任、责任如何实现等问题便愈发突出（Yigitcanlar et al., 2021）。'],
    ['In this context, public opinion is not optional but foundational to ensure the acceptance of AI in democratic governance.', '在此背景下，公众意见并非可有可无，而是确保人工智能在民主治理中获得接受的基础。'],

    // Introduction 4
    ['Yet, understanding public perceptions of AI is challenging.', '然而，理解公众对人工智能的感知并非易事。'],
    ['Perception can vary significantly across individuals and national contexts.', '感知会因个体与国别情境而显著不同。'],
    ['Many determinants such as trust, experiences, social convincing, awareness, and personal and cultural norms shape how technology is received (Kelly et al., 2023).', '信任、经验、社会说服、意识以及个人与文化规范等诸多决定因素，共同塑造技术如何被接受（Kelly et al., 2023）。'],
    ['It reveals that public acceptance of AI is not uniform, nor are perceptions of its responsible adoption.', '这表明，公众对人工智能的接受并非整齐划一，对其负责任采用的感知亦非如此。'],
    ['Given that local governments operate at the intersection of citizen engagement and service delivery (Bright et al., 2019), they are uniquely positioned and obligated to respond to these variations in perception (Yigitcanlar et al., 2025).', '鉴于地方政府处于公民参与与服务供给的交汇点（Bright et al., 2019），它们具有独特的位置，也有义务回应这些感知差异（Yigitcanlar et al., 2025）。'],
    ['However, while prior research identifies trust and risk as central to public technology acceptance, and responsible AI scholarship has largely focused on normative frameworks and institutional definitions (Li et al., 2023; Mikalef et al., 2022) little is known about how these dynamics vary across different governance contexts.', '然而，尽管已有研究将信任与风险视为公众技术接受的核心，负责任人工智能研究也大多聚焦于规范性框架与制度定义（Li et al., 2023; Mikalef et al., 2022），但人们对这些动态如何在不同治理情境中变化仍知之甚少。'],
    ['This study addresses this gap by advancing theory and empirical evidence, by examining how trust, persuasion, and perceived risk jointly interact, framing responsible AI as a locally interpreted public demand that emerges differently under varying institutional trust-risk regimes.', '本研究通过推进理论与实证证据来填补这一空白：考察信任、说服与感知风险如何共同作用，并将负责任人工智能框定为一种在不同制度信任—风险体制下以不同方式生成的、被地方性解读的公众需求。'],

    // Research questions
    ['Accordingly, this study investigates the public perception of responsible AI in the context of AI adoption among local governments.', '据此，本研究考察地方政府采用人工智能背景下公众对负责任人工智能的感知。'],
    ["Here, 'local government' refers to the subnational tier of public administration closest to citizens within each national context, who are responsible for frontline public service delivery (e.g., municipal or city councils).", '这里的“地方政府”指各国情境中最贴近公民的次国家公共行政层级，负责一线公共服务供给（如市议会或市政厅）。'],
    ["Following a cross-national comparative focus, this study attempts to address two key research questions: (a) How do institutional trust contexts and persuasive environments shape citizens' interpretation of AI-related risks?", '遵循跨国比较的取向，本研究试图回答两个关键研究问题：（a）制度信任情境与说服环境如何塑造公民对人工智能相关风险的解读？'],
    ['(b) How does this perceived risk influence the public view on the importance of responsible AI?', '（b）这种感知风险如何影响公众对负责任人工智能重要性的看法？'],

    // Findings
    ['It is anticipated that trust plays a crucial role in shaping public perceptions of risk (Beldad et al., 2011; Glikson & Woolley, 2020), particularly in government adoptions of emerging technologies.', '可以预期，信任在塑造公众风险感知中发挥关键作用（Beldad et al., 2011; Glikson & Woolley, 2020），在新兴技术的政府采用中尤其如此。'],
    ['When public resources are invested in technologies supposedly aimed at improving citizen services, people seek assurance that these decisions serve the public good.', '当公共资源被投入那些据称旨在改善市民服务的技术时，人们会寻求保证，确认这些决策服务于公共利益。'],
    ['In such context, trust in local authorities becomes a more decisive factor in whether individuals perceive these technologies as beneficial or risk laden.', '在此情境下，对地方政府的信任，成为决定个体将这些技术视为有益还是充满风险的一个更具决定性的因素。'],
    ['Our study reaffirms this foundational ideology while extending it by comparing responses from three distinct national contexts.', '本研究在比较三个不同国家情境的回应时，重申并拓展了这一基础性理念。'],
    ['What stands out across all cases is that trust plays a stronger role than persuasion in public perceptions of AI risks.', '在所有案例中，尤为突出的是：在公众对人工智能风险的感知中，信任的作用强于说服。'],

    // Conclusion 1
    ['This study aimed to examine public perceptions of responsible AI adoption in local governments, focusing on the roles of public trust, persuasion, and perceived risk.', '本研究旨在考察公众对地方政府采用负责任人工智能的感知，重点关注公众信任、说服与感知风险的作用。'],
    ['Using an online survey (n=1220) across Australia, Spain, and the United States, and employing structural equation modelling (SEM), it investigated how cultural, institutional, and social factors are associated with attitudes towards responsible AI at the local level.', '研究在澳大利亚、西班牙和美国开展在线调查（n=1220），并采用结构方程模型（SEM），考察文化、制度与社会因素如何与地方层面公众对负责任人工智能的态度相关联。'],

    // Conclusion 2
    ['Findings reveal several key insights.', '研究发现揭示了若干关键洞见。'],
    ['First, trust plays a stronger role than persuasion in shaping public perceptions of AI risk.', '第一，在塑造公众对人工智能风险的感知方面，信任的作用强于说服。'],
    ['However, persuasion is more effective at building trust than at directly reducing perceived risks.', '然而，说服在建立信任方面比直接降低感知风险更为有效。'],
    ["These dynamics differ by context: in Australia, trust in local government is the primary lens through which AI risk is evaluated, with persuasion showing limited influence, likely due to the country's cohesive, trust-oriented governance culture.", '这些动态因情境而异：在澳大利亚，对地方政府的信任是评估人工智能风险的主要透镜，说服的影响有限，这很可能源于该国强调凝聚与信任的治理文化。'],
    ['In the United States, trust shows stronger association with persuasive cues, nearly 30% of trust is accounted by external narratives, reflecting technologically optimistic, individualistic cultural norms.', '在美国，信任与说服线索的关联更强，近 30% 的信任可由外部叙事解释，反映出技术乐观主义与个人主义的文化规范。'],
    ['In Spain, where institutional trust is comparatively lower, persuasion contributes to trust formation but operates less effectively than in the US.', '在制度信任相对较低的西班牙，说服有助于信任形成，但其作用不及美国。'],

    // Conclusion 3
    ["Across all three countries, higher endorsement of AI-related risk concerns is associated with stronger expectations for responsible AI governance However, the meaning of 'responsible AI' is interpreted differently.", '在三个国家中，对人工智能相关风险担忧的更高认同，均与更强烈的负责任人工智能治理期待相关；然而，“负责任人工智能”的含义却有着不同解读。'],
    ['In Australia, it is associated with accountability, regulation, and cultural inclusivity.', '在澳大利亚，它意味着问责、监管与文化包容性。'],
    ['In Spain, transparency, security, and regional identity are central.', '在西班牙，透明度、安全与区域认同处于核心位置。'],
    ['In the US, responsibility is largely framed through performance, accountability, and sustainability.', '在美国，责任主要通过绩效、问责与可持续性来框定。'],
    ['These findings suggest while responsible AI demanded in all countries, it is not a universal construct, but one dynamically shaped by local values, governance traditions, and public experience.', '这些发现表明，尽管所有国家都要求负责任人工智能，它并非普遍适用的建构，而是由地方价值、治理传统与公众经验动态塑造的。'],

    // Conclusion 5
    ['In conclusion, this study underscores that perceptions of responsible AI in local government are deeply rooted with cultural and institutional realities.', '总之，本研究强调，公众对地方政府负责任人工智能的感知深深植根于文化与制度现实。'],
    ["What constitutes 'responsibility' varies across societies and communities.", '“责任”的内涵因社会与共同体而异。'],
    ['Rather than applying standardised models, this study emphasises the importance of aligning governance approaches with locally articulated expectations.', '本研究并不主张套用标准化模型，而是强调使治理路径与地方性表达的期待相契合的重要性。']
  ];

  const annotations = [
    {
      quote: 'This study investigates how trust, persuasion, and perceived risk interact to shape public demand for responsible AI.',
      tag: '核心论点',
      color: 'ochre',
      translation: '本研究考察信任、说服与感知风险如何相互作用，共同塑造公众对负责任人工智能的需求。',
      note: '研究问题把“负责任 AI”从规范倡议转译为一种可被公众感知、由信任与风险共同中介的需求。阅读时可先交代这一理论转向。'
    },
    {
      quote: 'Across all contexts, perceived risk is positively associated with stronger expectations for responsible AI, explaining 11%–24% of the variance in demand.',
      tag: '关键证据',
      color: 'sage',
      translation: '在所有情境中，感知风险均与更强烈的负责任人工智能期待正相关，解释了需求方差的 11%–24%。',
      note: '注意这里的方向：风险感知越高，反而越期待“负责任”的治理安排。可结合三国制度信任差异，讨论风险如何被转译为治理诉求。'
    },
    {
      quote: 'In this context, public opinion is not optional but foundational to ensure the acceptance of AI in democratic governance.',
      tag: '理论对话',
      color: 'clay',
      translation: '在此背景下，公众意见并非可有可无，而是确保人工智能在民主治理中获得接受的基础。',
      note: '这句话把公众意见提升为民主治理的构成性条件，而不只是政策反馈。可与信息公平、公共参与等议题对话。'
    },
    {
      quote: 'These findings suggest while responsible AI demanded in all countries, it is not a universal construct, but one dynamically shaped by local values, governance traditions, and public experience.',
      tag: '待讨论',
      color: 'mist',
      translation: '这些发现表明，尽管所有国家都要求负责任人工智能，它并非普遍适用的建构，而是由地方价值、治理传统与公众经验动态塑造的。',
      note: '适合作为汇报的收束点：不存在一套通用的“负责任 AI”标准。可追问：对图书馆等公共服务机构而言，地方性期待应如何被测量与纳入设计？'
    }
  ];

  window.__WENLAN_TRANSLATIONS__ = pairs.map(([en, zh]) => ({ en, zh }));
  window.__WENLAN_DEMO__ = { doc, annotations };
})();
