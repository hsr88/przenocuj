import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Polityka Prywatności | Przenocuj.eu',
  description: 'Polityka prywatności serwisu Przenocuj.eu. Informacje o przetwarzaniu danych osobowych i plikach cookie.',
};

export default function PrivacyPage() {
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
            <span className="text-4xl">🔒</span>
            <div>
              <h1 className="text-3xl font-bold text-forest-800">Polityka Prywatności</h1>
              <p className="text-forest-500">Jak chronimy Twoje dane</p>
            </div>
          </div>

          <div className="prose prose-forest max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">Ostatnia aktualizacja: 20 marca 2025</p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">1. Informacje ogólne</h2>
            <p>
              Niniejsza Polityka Prywatności określa zasady przetwarzania danych osobowych użytkowników 
              serwisu Przenocuj.eu. Administrator danych osobowych nie przetwarza danych w sposób zautomatyzowany 
              – serwis działa bez wymagania logowania ani podawania danych osobowych.
            </p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">2. Zakres zbieranych danych</h2>
            <p>
              Serwis Przenocuj.eu nie wymaga podawania żadnych danych osobowych do korzystania z podstawowych funkcji. 
              Jedynie dane, jakie mogą być zapisywane, to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Dane lokalne w przeglądarce (localStorage) – preferencje użytkownika, lista ulubionych miejsc, trasa</li>
              <li>Dane geolokalizacji – wyłącznie po wyrażeniu zgody przez użytkownika, używane do pokazania lokalizacji na mapie</li>
              <li>Dane analityczne – anonimowe statystyki korzystania z serwisu (Google Analytics)</li>
            </ul>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">3. Pliki cookie</h2>
            <p>
              Serwis używa plików cookie w następujących celach:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Cookie analityczne</strong> – Google Analytics (identyfikator G-FPL2M0L4XC) służy do zbierania anonimowych statystyk o ruchu na stronie</li>
              <li><strong>Cookie techniczne</strong> – zapisywanie preferencji użytkownika (np. akceptacja ciasteczek)</li>
            </ul>
            <p>
              Użytkownik może w każdej chwili wyrazić lub wycofać zgodę na używanie plików cookie poprzez 
              odpowiednie ustawienia przeglądarki lub baner cookie wyświetlany przy pierwszej wizycie.
            </p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">4. Google Analytics</h2>
            <p>
              Korzystamy z usługi Google Analytics dostarczanej przez Google LLC w celu analizy ruchu na stronie. 
              Google Analytics używa plików cookie do generowania statystyk. 
              Zbierane dane są anonimizowane i nie pozwalają na identyfikację konkretnych użytkowników.
            </p>
            <p>
              Więcej informacji o polityce prywatności Google:{' '}
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-forest-600 hover:text-forest-800 underline"
              >
                https://policies.google.com/privacy
              </a>
            </p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">5. Dane geolokalizacji</h2>
            <p>
              Serwis może prosić o dostęp do lokalizacji użytkownika wyłącznie w celu wyświetlenia pozycji na mapie. 
              Te dane nie są nigdzie przesyłane ani zapisywane – są przetwarzane wyłącznie lokalnie w przeglądarce.
            </p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">6. Prawa użytkownika</h2>
            <p>Użytkownik ma prawo do:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Dostępu do swoich danych</li>
              <li>Sprostowania danych</li>
              <li>Usunięcia danych (przez wyczyszczenie localStorage w przeglądarce)</li>
              <li>Ograniczenia przetwarzania</li>
              <li>Wycofania zgody na przetwarzanie w dowolnym momencie</li>
            </ul>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">7. Kontakt</h2>
            <p>
              W sprawach związanych z ochroną danych osobowych można kontaktować się pod adresem:
            </p>
            <p>
              <a 
                href="mailto:kontakt@hsr.gg" 
                className="text-forest-600 hover:text-forest-800 font-medium"
              >
                kontakt@hsr.gg
              </a>
            </p>

            <h2 className="text-xl font-semibold text-forest-700 mt-8 mb-4">8. Zmiany w polityce prywatności</h2>
            <p>
              Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. 
              O wszelkich zmianach użytkownicy będą informowani poprzez aktualizację daty w nagłówku dokumentu.
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
