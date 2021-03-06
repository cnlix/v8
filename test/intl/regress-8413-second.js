// Copyright 2018 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// "ar-SA" has problem on Android, split it to regress-8432.js
// All the known locales egrep by
// find third_party/icu/source/data/locales/*.txt|cut -d: -f 1| \
//     sort -u|cut -d/ -f6|cut -d. -f1|tr "_" "-"
let locales = [
  "af-NA", "af", "af-ZA", "agq-CM", "agq", "ak-GH", "ak", "am-ET", "am", "an",
  "ar-001", "ar-AE", "ar-BH", "ar-DJ", "ar-DZ", "ar-EG", "ar-EH", "ar-ER",
  "ar-IL", "ar-IQ", "ar-JO", "ar-KM", "ar-KW", "ar-LB", "ar-LY", "ar-MA",
  "ar-MR", "ar-OM", "ar-PS", "ar-QA", /* "ar-SA", */ "ar-SD", "ar-SO", "ar-SS",
  "ars", "ar-SY", "ar-TD", "ar-TN", "ar", "ar-YE", "asa", "asa-TZ", "as-IN",
  "ast-ES", "ast", "as", "az-AZ", "az-Cyrl-AZ", "az-Cyrl", "az-Latn-AZ",
  "az-Latn", "az", "bas-CM", "bas", "be-BY", "bem", "bem-ZM", "be", "bez",
  "bez-TZ", "bg-BG", "bg", "bm-ML", "bm", "bn-BD", "bn-IN", "bn", "bo-CN",
  "bo-IN", "bo", "br-FR", "br", "brx-IN", "brx", "bs-BA", "bs-Cyrl-BA",
  "bs-Cyrl", "bs-Latn-BA", "bs-Latn", "bs", "ca-AD", "ca-ES", "ca-FR",
  "ca-IT", "ca", "ccp-BD", "ccp-IN", "ccp", "ce-RU", "ce", "cgg", "cgg-UG",
  "chr", "chr-US", "ckb-IQ", "ckb-IR", "ckb", "cs-CZ", "cs", "cy-GB", "cy",
  "da-DK", "da-GL", "da", "dav-KE", "dav", "de-AT", "de-BE", "de-CH", "de-DE",
  "de-IT", "de-LI", "de-LU", "de", "dje-NE", "dje", "dsb-DE", "dsb", "dua-CM",
  "dua", "dyo-SN", "dyo", "dz-BT", "dz", "ebu-KE", "ebu", "ee-GH", "ee-TG",
  "ee", "el-CY", "el-GR", "el", "en-001", "en-150", "en-AG", "en-AI", "en-AS",
  "en-AT", "en-AU", "en-BB", "en-BE", "en-BI", "en-BM", "en-BS", "en-BW",
  "en-BZ", "en-CA", "en-CC", "en-CH", "en-CK", "en-CM", "en-CX", "en-CY",
  "en-DE", "en-DG", "en-DK", "en-DM", "en-ER", "en-FI", "en-FJ", "en-FK",
  "en-FM", "en-GB", "en-GD", "en-GG", "en-GH", "en-GI", "en-GM", "en-GU",
  "en-GY", "en-HK", "en-IE", "en-IL", "en-IM", "en-IN", "en-IO", "en-JE",
  "en-JM", "en-KE", "en-KI", "en-KN", "en-KY", "en-LC", "en-LR", "en-LS",
  "en-MG", "en-MH", "en-MO", "en-MP", "en-MS", "en-MT", "en-MU", "en-MW",
  "en-MY", "en-NA", "en-NF", "en-NG", "en-NH", "en-NL", "en-NR", "en-NU",
  "en-NZ", "en-PG", "en-PH", "en-PK", "en-PN", "en-PR", "en-PW", "en-RH",
  "en-RW", "en-SB", "en-SC", "en-SD", "en-SE", "en-SG", "en-SH", "en-SI",
  "en-SL", "en-SS", "en-SX", "en-SZ", "en-TC", "en-TK", "en-TO", "en-TT",
  "en-TV", "en", "en-TZ", "en-UG", "en-UM", "en-US-POSIX", "en-US", "en-VC",
  "en-VG", "en-VI", "en-VU", "en-WS", "en-ZA", "en-ZM", "en-ZW", "eo", "es-419",
  "es-AR", "es-BO", "es-BR", "es-BZ", "es-CL", "es-CO", "es-CR", "es-CU",
  "es-DO", "es-EA", "es-EC", "es-ES", "es-GQ", "es-GT", "es-HN", "es-IC",
  "es-MX", "es-NI", "es-PA", "es-PE", "es-PH", "es-PR", "es-PY", "es-SV", "es",
  "es-US", "es-UY", "es-VE", "et-EE", "et", "eu-ES", "eu", "ewo-CM", "ewo",
  "fa-AF", "fa-IR", "fa", "ff", "fi-FI", "fil-PH", "fil", "fi", "fo-DK",
  "fo-FO", "fo", "fr-BE", "fr-BF", "fr-BI", "fr-BJ", "fr-BL", "fr-CA", "fr-CD",
  "fr-CF", "fr-CG", "fr-CH", "fr-CI", "fr-CM", "fr-DJ", "fr-DZ", "fr-FR",
  "fr-GA", "fr-GF", "fr-GN", "fr-GP", "fr-GQ", "fr-HT", "fr-KM", "fr-LU",
  "fr-MA", "fr-MC", "fr-MF", "fr-MG", "fr-ML", "fr-MQ", "fr-MR", "fr-MU",
  "fr-NC", "fr-NE", "fr-PF", "fr-PM", "fr-RE", "fr-RW", "fr-SC", "fr-SN",
  "fr-SY", "fr-TD", "fr-TG", "fr-TN", "fr", "fr-VU", "fr-WF", "fr-YT",
  "fur-IT", "fur", "fy-NL", "fy", "ga-IE", "ga", "gd-GB", "gd", "gl-ES", "gl",
  "gsw-CH", "gsw-FR", "gsw-LI", "gsw", "gu-IN", "gu", "guz-KE", "guz", "gv-IM",
  "gv", "ha-GH", "ha-NE", "ha-NG", "ha", "haw", "haw-US", "he-IL", "he",
  "hi-IN", "hi", "hr-BA", "hr-HR", "hr", "hsb-DE", "hsb", "hu-HU", "hu",
  "hy-AM", "hy", "ia-001", "ia", "id-ID", "id", "ig-NG", "ig", "ii-CN", "ii",
  "in-ID", "in", "is-IS", "is", "it-CH", "it-IT", "it-SM", "it", "it-VA",
  "iw-IL", "iw", "ja-JP", "ja", "jgo-CM", "jgo", "jmc",
  "jmc-TZ", "jv-ID", "jv", "kab-DZ", "kab", "ka-GE", "kam-KE", "kam", "ka",
  "kde", "kde-TZ", "kea-CV", "kea", "khq-ML", "khq", "ki-KE", "ki", "kkj-CM",
  "kkj", "kk-KZ", "kk", "kl-GL", "kln-KE", "kln", "kl", "km-KH", "km", "kn-IN",
  "kn", "kok-IN", "ko-KP", "ko-KR", "kok", "ko", "ksb", "ksb-TZ", "ksf-CM",
  "ksf", "ksh-DE", "ksh", "ks-IN", "ks", "ku-TR", "ku", "kw-GB", "kw", "ky-KG",
  "ky", "lag", "lag-TZ", "lb-LU", "lb", "lg", "lg-UG", "lkt", "lkt-US", "ln-AO",
  "ln-CD", "ln-CF", "ln-CG", "ln", "lo-LA", "lo", "lrc-IQ", "lrc-IR", "lrc",
  "lt-LT", "lt", "lu-CD", "luo-KE", "luo", "lu", "luy-KE", "luy", "lv-LV", "lv",
  "mas-KE", "mas", "mas-TZ", "mer-KE", "mer", "mfe-MU", "mfe", "mgh-MZ", "mgh",
  "mg-MG", "mgo-CM", "mgo", "mg", "mi-NZ", "mi", "mk-MK", "mk", "ml-IN", "ml",
  "mn-MN", "mn", "mo", "mr-IN", "mr", "ms-BN", "ms-MY", "ms-SG", "ms", "mt-MT",
  "mt", "mua-CM", "mua", "my-MM", "my", "mzn-IR", "mzn", "naq-NA", "naq",
  "nb-NO", "nb-SJ", "nb", "nds-DE", "nds-NL", "nds", "nd", "nd-ZW", "ne-IN",
  "ne-NP", "ne", "nl-AW", "nl-BE", "nl-BQ", "nl-CW", "nl-NL", "nl-SR", "nl-SX",
  "nl", "nmg-CM", "nmg", "nnh-CM", "nnh", "nn-NO", "nn", "no-NY", "no-NO",
  "no", "nus-SS", "nus", "nyn", "nyn-UG", "om-ET", "om-KE", "om", "or-IN", "or",
  "os-GE", "os-RU", "os", "pa-Arab-PK", "pa-Arab", "pa-Guru-IN", "pa-Guru",
  "pa-IN", "pa-PK", "pa", "pl-PL", "pl", "ps-AF", "ps", "pt-AO", "pt-BR",
  "pt-CH", "pt-CV", "pt-GQ", "pt-GW", "pt-LU", "pt-MO", "pt-MZ", "pt-PT",
  "pt-ST", "pt-TL", "pt", "qu-BO", "qu-EC", "qu-PE", "qu", "rm-CH", "rm",
  "rn-BI", "rn", "rof", "rof-TZ", "ro-MD", "root", "ro-RO", "ro", "ru-BY",
  "ru-KG", "ru-KZ", "ru-MD", "ru-RU", "ru", "ru-UA", "rwk", "rwk-TZ", "rw-RW",
  "rw", "sah-RU", "sah", "saq-KE", "saq", "sbp", "sbp-TZ", "sd-PK", "sd",
  "se-FI", "seh-MZ", "seh", "se-NO", "se-SE", "ses-ML", "ses", "se", "sg-CF",
  "sg", "sh-BA", "sh-CS", "shi-Latn-MA", "shi-Latn", "shi-MA", "shi-Tfng-MA",
  "shi-Tfng", "shi", "sh", "sh-YU", "si-LK", "si", "sk-SK", "sk", "sl-SI", "sl",
  "smn-FI", "smn", "sn", "sn-ZW", "so-DJ", "so-ET", "so-KE", "so-SO", "so",
  "sq-AL", "sq-MK", "sq", "sq-XK", "sr-BA", "sr-CS", "sr-Cyrl-BA", "sr-Cyrl-CS",
  "sr-Cyrl-ME", "sr-Cyrl-RS", "sr-Cyrl", "sr-Cyrl-XK", "sr-Cyrl-YU",
  "sr-Latn-BA", "sr-Latn-CS", "sr-Latn-ME", "sr-Latn-RS", "sr-Latn",
  "sr-Latn-XK", "sr-Latn-YU", "sr-ME", "sr-RS", "sr", "sr-XK", "sr-YU", "sv-AX",
  "sv-FI", "sv-SE", "sv", "sw-CD", "sw-KE", "sw", "sw-TZ", "sw-UG", "ta-IN",
  "ta-LK", "ta-MY", "ta-SG", "ta", "te-IN", "teo-KE", "teo", "teo-UG", "te",
  "tg-TJ", "tg", "th-TH", "th", "ti-ER", "ti-ET", "ti",
  "tk-TM", "tk", "tl-PH", "tl", "to-TO", "to", "tr-CY", "tr-TR", "tr", "tt-RU",
  "tt", "twq-NE", "twq", "tzm-MA", "tzm", "ug-CN", "ug", "uk", "uk-UA", "ur-IN",
  "ur-PK", "ur", "uz-AF", "uz-Arab-AF", "uz-Arab", "uz-Cyrl", "uz-Cyrl-UZ",
  "uz-Latn", "uz-Latn-UZ", "uz", "uz-UZ", "vai-Latn-LR", "vai-Latn", "vai-LR",
  "vai", "vai-Vaii-LR", "vai-Vaii", "vi", "vi-VN", "vun", "vun-TZ", "wae-CH",
  "wae", "wa", "wo-SN", "wo", "xh", "xh-ZA", "xog", "xog-UG", "yav-CM", "yav",
  "yi-001", "yi", "yo-BJ", "yo-NG", "yo", "yue-CN", "yue-Hans-CN", "yue-Hans",
  "yue-Hant-HK", "yue-Hant", "yue-HK", "yue", "zgh-MA", "zgh", "zh-CN",
  "zh-Hans-CN", "zh-Hans-HK", "zh-Hans-MO", "zh-Hans-SG", "zh-Hans",
  "zh-Hant-HK", "zh-Hant-MO", "zh-Hant-TW", "zh-Hant", "zh-HK", "zh-MO", "zh-SG",
  "zh-TW", "zh", "zu", "zu-ZA"];

// The test timeout in TSAN so we split into 9 different tests.
// "Table 5: Components of date and time formats" as in
// https://ecma-international.org/ecma-402/#sec-datetimeformat-abstracts
let table5 = [
  // ["weekday", ["narrow", "short", "long"]],
  // ["era", ["narrow", "short", "long"]],
  // ["year", ["2-digit", "numeric"]],
  // ["month", ["2-digit", "numeric", "narrow", "short", "long"]],
  // ["day", ["2-digit", "numeric"]],
  // ["hour", ["2-digit", "numeric"]],
  // ["minute", ["2-digit", "numeric"]],
  ["second", ["2-digit", "numeric"]],
  // ["timeZoneName", ["short", "long"]]
];

// Test each locale
for (let loc of locales) {
  // Test each property in Table 5
  for (let row of table5) {
    let prop = row[0];
    let values = row[1];
    // Test each value of the property
    for (let value of values) {
      let opt = {};
      opt[prop] = value;
      let dft = new Intl.DateTimeFormat([loc], opt);
      let result = dft.resolvedOptions();
      assertTrue(values.indexOf(result[prop]) >= 0,
          "Expect new Intl.DateTimeFormat([" + loc + "], {" + prop + ": '" +
          value + "'}).resolvedOptions()['" + prop + "'] to return one of [" +
          values + "] but got '" + result[prop] + "'");
    }
  }
}
