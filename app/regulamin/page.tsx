import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Regulamin | Przenocuj.eu',
  description: 'Regulamin korzystania z serwisu Przenocuj.eu. Zasady użytkowania mapy dzikich miejsc na kemping.',
};

export default function TermsPage() {
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
            <span className="text-4xl">📋</span>
            <div>
              <h1 className="text-3xl font-bold text-forest-800">Regulamin</h1>
              <p className="text-forest-500">Zasady korzystania z serwisu</p>
            </div>
          </div>

          <div className="prose prose-forest max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">Ostatnia aktualizacja: 20 marca 2025</p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">§1. Postanowienia ogólne</h2>
            <p>
              1. Serwis Przenocuj.eu dostarcza informacji o miejscach do biwakowania, kempingu i noclegów w naturze.
            </p>
            <p>
              2. Korzystanie z serwisu jest dobrowolne i bezpłatne.
            </p>
            <p>
              3. Serwis ma charakter informacyjny – nie organizuje noclegów ani nie pośredniczy w rezerwacjach.
            </p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">§2. Definicje</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Serwis</strong> – strona internetowa dostępna pod adresem przenocuj.eu</li>
              <li><strong>Użytkownik</strong> – osoba korzystająca z Serwisu</li>
              <li><strong>Miejsce</strong> – lokalizacja wyświetlana na mapie przeznaczona do biwakowania lub kempingu</li>
              <li><strong>Dane OSM</strong> – dane pochodzące z OpenStreetMap, wykorzystywane do wyświetlania miejsc</li>
            </ul>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">§3. Zasady korzystania</h2>
            <p>1. Użytkownik zobowiązuje się do:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Przestrzegania obowiązujących przepisów prawa podczas korzystania z miejsc wskazanych w Serwisie</li>
              <li>Szanowania przyrody i zasad Leave No Trace</li>
              <li>Nie pozostawiania śmieci na dziko</li>
              <li>Stosowania się do regulaminów poszczególnych miejsc (jeśli obowiązują)</li>
            </ul>
            <p>
              2. Serwis dostarcza informacji o miejscach na podstawie dostępnych źródeł (OpenStreetMap, publiczne rejestry), 
              ale nie gwarantuje ich aktualności ani dokładności.
            </p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">§4. Odpowiedzialność</h2>
            <p>
              1. Administrator Serwisu nie ponosi odpowiedzialności za:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Szkody wynikłe z korzystania z miejsc wskazanych w Serwisie</li>
              <li>Nieaktualność lub błędność informacji o miejscach</li>
              <li>Zmianę statusu prawnego miejsc (np. zakaz biwakowania)</li>
              <li>Warunki pogodowe, stan techniczny miejsc, obecność innych osób</li>
            </ul>
            <p>
              2. Użytkownik korzysta z miejsc na własną odpowiedzialność.
            </p>
            <p>
              3. Przed udaniem się w dane miejsce, Użytkownik powinien samodzielnie zweryfikować:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Legalność biwakowania w danym miejscu</li>
              <li>Aktualne regulaminy i ograniczenia</li>
              <li>Stan bezpieczeństwa miejsca</li>
            </ul>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">§5. Dane z OpenStreetMap</h2>
            <p>
              1. Serwis wykorzystuje dane z OpenStreetMap (OSM) na licencji ODbL (Open Database License).
            </p>
            <p>
              2. Dane OSM są udostępniane „tak jak są” – mogą zawierać błędy lub być niekompletne.
            </p>
            <p>
              3. Użytkownicy mogą współtworzyć bazę danych poprzez edycję OpenStreetMap.
            </p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">§6. Własność intelektualna</h2>
            <p>
              1. Kod źródłowy Serwisu jest udostępniany na licencji open source (MIT lub podobna) na GitHub.
            </p>
            <p>
              2. Treści zamieszczone w Serwisie (opisy miejsc, grafiki) są chronione prawem autorskim, 
              o ile nie pochodzą z zewnętrznych źródeł (OSM, publiczne rejestry).
            </p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">§7. Zgłaszanie miejsc</h2>
            <p>
              1. Użytkownicy mogą zgłaszać nowe miejsca do dodania do mapy.
            </p>
            <p>
              2. Zgłaszając miejsce, Użytkownik oświadcza, że:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Ma prawo udostępnić dane o tym miejscu</li>
              <li>Informacje są zgodne ze stanem faktycznym</li>
              <li>Nie narusza praw osób trzecich</li>
            </ul>
            <p>
              3. Administrator zastrzega sobie prawo do weryfikacji i odrzucenia zgłoszeń.
            </p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">§8. Zmiany regulaminu</h2>
            <p>
              1. Administrator zastrzega sobie prawo do zmiany Regulaminu w dowolnym czasie.
            </p>
            <p>
              2. Zmiany wchodzą w życie z chwilą publikacji w Serwisie.
            </p>
            <p>
              3. Kontynuowanie korzystania z Serwisu po zmianach oznacza akceptację nowego Regulaminu.
            </p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">§9. Postanowienia końcowe</h2>
            <p>
              1. W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego.
            </p>
            <p>
              2. Wszelkie spory będą rozstrzygane przez właściwe polskie sądy powszechne.
            </p>
            <p>
              3. Kontakt z Administratorem:{' '}
              <a 
                href="mailto:kontakt@hsr.gg" 
                className="text-forest-600 hover:text-forest-800 font-medium"
              >
                kontakt@hsr.gg
              </a>
            </p>
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
