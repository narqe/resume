
import { useTranslation } from 'react-i18next';

export const changeLanguage = (i18n: any) => {
    const lang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(lang);
};