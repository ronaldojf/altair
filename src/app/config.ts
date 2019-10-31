import isElectron from './utils/is_electron';

const isTranslateMode = window['__ALTAIR_TRANSLATE__'];
const defaultHeaders = {
  'Authorization': 'Bearer SUA_CHAVE_DE_API',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export default {
  donation: {
    url: 'https://opencollective.com/altair/donate',
    action_count_threshold: 50
  },
  ga: '',
  add_query_depth_limit: 4,
  tab_size: 2,
  max_windows: isElectron ? 50 : 15,
  default_language: isTranslateMode ? 'ach-UG' : 'en-US',
  languages: {
    'en-US': 'English',
    'fr-FR': 'French',
    'es-ES': 'Español',
    'cs-CZ': 'Czech',
    'de-DE': 'German',
    'pt-BR': 'Brazilian',
    'ru-RU': 'Russian',
    'zh-CN': 'Chinese Simplified',
    'ja-JP': 'Japanese',
    'sr-SP': 'Serbian',
    'it-IT': 'Italian',
    'pl-PL': 'Polish',
    'ko-KR': 'Korean',
    'ro-RO': 'Romanian',
    'vi-VN': 'Vietnamese',
  },
  query_history_depth: isElectron ? 50 : 7,
  defaultTheme: 'matchMedia' in window && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  themes: ['light', 'dark'],
  isTranslateMode,
  defaultHeaders,
  isWebApp: window['__ALTAIR_WEB_APP__'],
  initialData: {
    url: window['__ALTAIR_ENDPOINT_URL__'] || '{{endpointURL}}',
    subscriptionsEndpoint: window['__ALTAIR_SUBSCRIPTIONS_ENDPOINT__'] || '',
    query: window['__ALTAIR_INITIAL_QUERY__'] || '',
    variables: window['__ALTAIR_INITIAL_VARIABLES__'] || '',
    headers: window['__ALTAIR_INITIAL_HEADERS__'] || defaultHeaders,
    preRequestScript: window['__ALTAIR_INITIAL_PRE_REQUEST_SCRIPT__'],
    activeEnvironment: '1',
    subEnvironments: [{
      id: '1',
      title: 'Sandbox',
      variablesJson: '{\n  "endpointURL": "https://sandbox.autentique.com.br/v2/graphql"\n}'
    }, {
      id: '2',
      title: 'Production',
      variablesJson: '{\n  "endpointURL": "https://api.autentique.com.br/v2/graphql"\n}'
    }]
  }
};
