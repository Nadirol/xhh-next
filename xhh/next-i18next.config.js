const path = require('path')

module.exports = {
    i18n: {
      defaultLocale: 'vi',
      locales: ['en', 'vi'],
      localePath: path.resolve('./public/locales'),
      localeDetection: false,
    },
    fallbackLng: {
      default: ['en'],
      'vi-VN': ['vi'],
      'en-US': ['en'],
    },
}