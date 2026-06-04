import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../lib/constants';

export function useCookieConsent() {
  const [accepted, setAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.COOKIE_CONSENT);
    if (stored === 'true') setAccepted(true);
    else if (stored === 'false') setAccepted(false);
    else setAccepted(null);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, 'true');
    setAccepted(true);
  };
  const decline = () => {
    localStorage.setItem(STORAGE_KEYS.COOKIE_CONSENT, 'false');
    setAccepted(false);
  };

  return { accepted, accept, decline };
}
