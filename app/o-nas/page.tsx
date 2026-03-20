import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'O nas | Przenocuj.eu',
  description: 'Odkryj najlepsze miejsca na dziki kemping w Polsce i Europie. Darmowe pola namiotowe, noclegi w naturze i legalne campingi.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-white to-forest-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <nav className="mb-8">
          <Link href="/" className="text-forest-600 hover:text-forest-800 transition-colors">
            ← Powrót do mapy
          </Link>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🏕️</span>
            <div>
              <h1 className="text-3xl font-bold text-forest-800">O nas</h1>
              <p className="text-forest-500">Poznaj historię Przenocuj.eu</p>
            </div>
          </div>

          <div className="prose prose-forest max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              Przenocuj.eu powstało z pasji do podróżowania i nocowania na dziko. Jako miłośnicy van life i biwakowania 
              w naturze, wiedzieliśmy jak trudno znaleźć dobre, sprawdzone miejsca na nocleg poza tradycyjnymi kempingami.
            </p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">Nasza misja</h2>
            <p className="text-gray-700 leading-relaxed">
              Tworzymy największą i najbardziej aktualną bazę miejsc na dziki kemping w Polsce i Europie. 
              Chcemy pokazywać, że nocowanie w naturze może być legalne, bezpieczne i niesamowite – 
              wystarczy wiedzieć, gdzie szukać.
            </p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">Co oferujemy</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Polskie Dzikie Zachody</strong> – sprawdzone miejsca z programu Zanocuj w Dzikiej Polsce</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Darmowe pola namiotowe</strong> – miejsca z OpenStreetMap z aktualnymi danymi</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Camper-friendly spots</strong> – miejsca przyjazne kamperom i vanom</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Informacje o przepisach</strong> – gdzie legalnie można biwakować w Polsce</span>
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">Open Source</h2>
            <p className="text-gray-700 leading-relaxed">
              Projekt jest otwartoźródłowy – kod dostępny jest na GitHub. Zachęcamy do współtworzenia bazy miejsc, 
              zgłaszania nowych lokalizacji i poprawiania danych. Razem tworzymy społeczność, która pomaga 
              sobie nawzajem odkrywać piękno dzikiej Polski.
            </p>

            <div className="mt-8 p-4 bg-forest-50 rounded-xl border border-forest-200">
              <h3 className="font-semibold text-forest-800 mb-2">Kontakt</h3>
              <p className="text-gray-700">
                Masz pytania lub sugestie? Napisz do nas:
              </p>
              <a 
                href="mailto:kontakt@hsr.gg" 
                className="text-forest-600 hover:text-forest-800 font-medium"
              >
                kontakt@hsr.gg
              </a>
            </div>

            <div className="mt-8 flex gap-4">
              <a 
                href="https://github.com/hsr88/przenocuj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-sm text-forest-400">
          <div className="flex justify-center gap-4 mb-2">
            <Link href="/o-nas/" className="hover:text-forest-600">O nas</Link>
            <Link href="/polityka-prywatnosci/" className="hover:text-forest-600">Polityka prywatności</Link>
            <Link href="/regulamin/" className="hover:text-forest-600">Regulamin</Link>
          </div>
          © 2025 Przenocuj.eu
        </footer>
      </div>
    </div>
  );
}
