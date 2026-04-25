import React from 'react'

const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: 'AI తో తెలుగు అనువాదం',
    desc: 'మీ ఆంగ్ల డాక్యుమెంట్‌ను AI చదివి, సరైన తెలుగులో మార్చి చూపిస్తుంది.',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
      </svg>
    ),
    title: 'PDF, DOCX, TXT — అన్నీ చదువుతాం',
    desc: 'మీకు ఇష్టమైన ఏ ఫైల్ అయినా పంపవచ్చు. మేం టెక్స్ట్ తీసుకుని తెలుగులో ఇస్తాం.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
      </svg>
    ),
    title: 'ఆడియో వినవచ్చు',
    desc: 'అనువాదం తయారైన వెంటనే ఆడియో కూడా సిద్ధంగా ఉంటుంది. 0.5× నుండి 2× వేగంలో వినవచ్చు.',
    color: 'bg-rose-100 text-rose-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'మీ డేటా సురక్షితం',
    desc: 'మీ పేర్లు, నంబర్లు అన్నీ అనువాదం ముందు దాచి, తర్వాత పునరుద్ధరిస్తాం. ఏ డేటా సేవ్ కాదు.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'సులభంగా అర్థమవుతుంది',
    desc: 'కష్టమైన ఆంగ్ల భాషను అందరికీ అర్థమయ్యే సులభమైన తెలుగులో చెప్తాం.',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    title: 'అనువాదం + వివరణ కలిసి',
    desc: '"అనువాదం + సులభ వివరణ" మోడ్‌లో రెండు కార్డులు, రెండు ఆడియో ప్లేయర్లు వస్తాయి.',
    color: 'bg-emerald-100 text-emerald-600',
  },
]

// How-it-works steps — domain classification kept as internal detail only, not shown as user-facing feature
const HOW_IT_WORKS = [
  {
    step: '౦౧',
    title: 'ఫైల్ చదవడం',
    desc: 'మీరు పంపిన PDF, DOCX లేదా TXT ఫైల్‌లోని టెక్స్ట్ తీసుకుంటాం — పేరాగ్రాఫులు, లిస్టులు అన్నీ భద్రంగా ఉంటాయి.',
  },
  {
    step: '౦౨',
    title: 'డేటా భద్రత',
    desc: 'పేర్లు, నంబర్లు, ID లు వంటివి అనువాదానికి వెళ్ళే ముందు దాచుతాం, తర్వాత తిరిగి చేర్చుతాం.',
  },
  {
    step: '౦౩',
    title: 'AI అనువాదం',
    desc: 'AI మీ ఆంగ్ల టెక్స్ట్‌ను సహజమైన తెలుగులోకి మారుస్తుంది — translate, simplify లేదా రెండూ మీరు ఎంచుకున్నట్టు.',
  },
  {
    step: '౦౪',
    title: 'ఆడియో తయారు',
    desc: 'తెలుగు టెక్స్ట్ వెంటనే మాటగా మారుతుంది. మీరు Play నొక్కగానే వినవచ్చు — ఆగాల్సిన అవసరం లేదు.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/30 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">

        {/* హెడర్ */}
        <div className="text-center mb-14 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold mb-5">
            మా గురించి
          </div>
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            తెలుగు నేర్చుకునే వారికి,<br />చదివే వారికి అందరికీ
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            ఆంగ్లంలో ఉన్న డాక్యుమెంట్లు తెలుగులో చదవాలనుకుంటున్నారా?
            ఈ టూల్ మీ కోసమే — విద్యార్థులు, ఉద్యోగులు, లేదా తెలుగు నేర్చుకుంటున్న వారెవరైనా సరే.
          </p>
        </div>

        {/* ఫీచర్లు */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${f.color}`}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1.5 text-sm">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ఎలా పని చేస్తుంది */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm animate-fade-up">
          <h2 className="font-display font-bold text-2xl text-gray-800 mb-6 text-center">
            ఇది ఎలా పని చేస్తుంది?
          </h2>
          <div className="space-y-4">
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4">
                <span className="text-2xl font-display font-bold text-gray-100 w-10 flex-shrink-0 leading-none mt-0.5">
                  {step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-700">{title}</p>
                  <p className="text-xs text-gray-400 leading-relaxed mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
