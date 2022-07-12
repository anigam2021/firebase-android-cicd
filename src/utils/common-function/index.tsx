import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import { colors } from '@app/constants';
import { Platform, NativeModules } from 'react-native';
import store from '@app/store';
import i18next, { t } from 'i18next';
import { EATCH_APP_PLATFORM_ANDROID_X_REQUEST, EATCH_APP_PLATFORM_IOS_X_REQUEST } from '@env';
/** Axios Instance */
const $axios = axios.create({

  // provide base url here

  // dev server
  baseURL: 'https://api.acc.eatch.me',

  // stag server
  // baseURL: 'https://api.eatch.noserver.cloud/',

  // qa server
  //  baseURL: 'https://api.eatch.noserver.cloud/',

  timeout: 30000,
  headers: {
    'accept': 'application/json',
    'X-Requested-With': Platform.OS === "ios" ? EATCH_APP_PLATFORM_IOS_X_REQUEST : EATCH_APP_PLATFORM_ANDROID_X_REQUEST
  },
});


$axios.interceptors.request.use(
  function (config) {
    console.log('Request Config ==>', config);
    return config;
  },
  function (error) {
    // Do something with request error
    console.log('Request Error ==>', error);
    return Promise.reject(error);
  },
);

$axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    console.log('Response Interceptor ==>', response);
    return response;
  },
  function (error) {
    // Do something with response error
    console.log('Response Error Interceptor ==>', error.response);
    return Promise.reject(error);
  },
);

const setAuthorizationToken = (token?: string, beforeVerification?: boolean) => {
  if (beforeVerification) {
    delete $axios.defaults.headers.common["Authorization"];
    $axios.defaults.headers.common['Accept-Language'] = store.getState().authReducer.language ? store.getState().authReducer.language : checkDeviceLang()
  }
  else {
    $axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    $axios.defaults.headers.common['Content-Type'] = `application/json`;
    $axios.defaults.headers.common['Accept-Language'] = store.getState().authReducer.language ? store.getState().authReducer.language : checkDeviceLang()
  }
};

const deviceLanguage = Platform.OS === 'ios'
  ? NativeModules.SettingsManager.settings.AppleLocale ||
  NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
  : NativeModules.I18nManager.localeIdentifier;

const checkDeviceLang = () => {
  if (deviceLanguage.includes("nl")) {
    return "nl"
  }
  //Here we can give condition for any of the language.
  else {
    return "en"
  }
}

const isNullUndefined = (item: any) => {
  try {
    return item === null || item === undefined || item === '';
  } catch (err) {
    return true;
  }
};


const keyFinder = () => {
  return Math.random()
    .toString(36)
    .substring(7)
    .toString();
};

const getNameFromUrl = (url: string) => {
  var uri_dec = decodeURIComponent(url);
  const arr = uri_dec.split('/');

  return arr[arr.length - 1];
};

export const nFixedLines = (
  numberOfLines: number = 1,
  ellipsizeMode: any = 'tail',
) => ({
  numberOfLines,
  ellipsizeMode,
});

const removeEmojis = (str: string) => {
  const regex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
  return str.replace(regex, '');
};

const removeSpaces = (name: string) => {
  return removeEmojis(name).replace(/^\s+/g, '');
};

const handleApiError = (payload: any) => {
  Snackbar.show({
    text: payload,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: 'rgba(0,0,0,0.9)',
    textColor: 'white',
  });
};



const getExtention = (filename: any) => {
  //To get the file extension
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};


function showSnackbar(
  title: string = `${t('SomethingWentWrong')}`,
  color: any = colors.blackColor,
) {
  Snackbar.show({
    text: title,
    duration: 4000,
    action: {
      onPress: undefined,
      textColor: colors.whiteColor,
      text: `${t('close')}`,
    },
    textColor: colors.whiteColor,
    backgroundColor: color,
  });
}



function worldClock(zone: any, region: any, timeF: any) {
  var dst = 0
  var time = timeF ? new Date(timeF) : new Date()
  var gmtMS = time.getTime() + (time.getTimezoneOffset() * 60000)
  var gmtTime = new Date(gmtMS)
  var day: any = gmtTime.getDate()
  var month = gmtTime.getMonth()
  //@ts-ignore
  var year = gmtTime.getYear()
  if (year < 1000) {
    year += 1900
  }
  var monthArray = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12")

  var monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
  if (year % 4 === 0) {
    monthDays = new Array("31", "29", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
  }
  if (year % 100 === 0 && year % 400 !== 0) {
    monthDays = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31")
  }

  var hr = gmtTime.getHours() + zone
  var min: any = gmtTime.getMinutes()
  var sec: any = gmtTime.getSeconds()

  if (hr >= 24) {
    hr = hr - 24
    day -= -1
  }
  if (hr < 0) {
    hr -= -24
    day -= 1
  }
  if (hr < 10) {
    hr = " " + hr
  }
  if (min < 10) {
    min = "0" + min
  }
  if (sec < 10) {
    sec = "0" + sec
  }
  if (day <= 0) {
    if (month === 0) {
      month = 11
      year -= 1
    }
    else {
      month -= 1
    }
    day = monthDays[month]
  }
  if (day > monthDays[month]) {
    day = 1
    if (month === 11) {
      month = 0
      year -= -1
    }
    else {
      month -= -1
    }
  }

  if (region === "Europe") {
    var startDST = new Date()
    var endDST = new Date()
    startDST.setMonth(2)
    startDST.setHours(1)
    startDST.setDate(31)
    var dayDST = startDST.getDay()
    startDST.setDate(31 - dayDST)
    endDST.setMonth(9)
    endDST.setHours(0)
    endDST.setDate(31)
    dayDST = endDST.getDay()
    endDST.setDate(31 - dayDST)
    var currentTime = new Date()
    currentTime.setMonth(month)
    //@ts-ignore
    currentTime.setYear(year)
    currentTime.setDate(day)
    currentTime.setHours(hr)
    if (currentTime >= startDST && currentTime < endDST) {
      dst = 1
    }
  }
  if (dst === 1) {
    hr -= -1
    if (hr >= 24) {
      hr = hr - 24
      day -= -1
    }
    if (hr < 10) {
      hr = " " + hr
    }
    if (day > monthDays[month]) {
      day = 1
      if (month === 11) {
        month = 0
        year -= -1
      }
      else {
        month -= -1
      }
    }
    if (hr < 10) {
      hr = hr.replace(/\s/g, '')
      hr = "0" + hr
    }
    if (day < 10) {
      day = "0" + day
    }
    return year + '-' + monthArray[month] + '-' + day + 'T' + hr + ":" + min + ":" + sec + "+" + "02:00"
  }
  else {
    if (hr < 10) {
      hr = hr.replace(/\s/g, '')
      hr = "0" + hr
    }
    if (day < 10) {
      day = "0" + day
    }
    return year + '-' + monthArray[month] + '-' + day + 'T' + hr + ":" + min + ":" + sec + "02:00"
  }
}


function diffYMDHMS(date1: any, date2: any) {

  const years = date1.diff(date2, 'year');
  date2.add(years, 'years');

  const months = date1.diff(date2, 'months');
  date2.add(months, 'months');

  const days = date1.diff(date2, 'days');
  date2.add(days, 'days');

  const hours = date1.diff(date2, 'hours');
  date2.add(hours, 'hours');

  const minutes = date1.diff(date2, 'minutes');
  date2.add(minutes, 'minutes');

  const seconds = date1.diff(date2, 'seconds');

  return { years, months, days, hours, minutes, seconds };
}

const getDayname = (day: number) => {
  //Getting the day of the week dynamically for every language
  switch (day) {
    case 0: {
      return i18next.t('Sunday')
    }
    case 1: {
      return i18next.t('Monday')
    }
    case 2: {
      return i18next.t('Tuesday')
    }
    case 3: {
      return i18next.t('Wednesday')
    }
    case 4: {
      return i18next.t('Thursday')
    }
    case 5: {
      return i18next.t('Friday')
    }
    case 6: {
      return i18next.t('Saturday')
    }
    default: {
      return ""
    }
  }
}

const getDaynameShot = (day: number) => {
  //Getting the day of the week dynamically for every language
  switch (day) {
    case 0: {
      return i18next.t('SundayShort')
    }
    case 1: {
      return i18next.t('MondayShort')
    }
    case 2: {
      return i18next.t('TuesdayShort')
    }
    case 3: {
      return i18next.t('WednesdayShort')
    }
    case 4: {
      return i18next.t('ThursdayShort')
    }
    case 5: {
      return i18next.t('FridayShort')
    }
    case 6: {
      return i18next.t('SaturdayShort')
    }
    default: {
      return ""
    }
  }
}
const getMonthname = (month: number) => {
  switch (month) {
    case 0: {
      return i18next.t('January')
    }
    case 1: {
      return i18next.t('February')
    }
    case 2: {
      return i18next.t('March')
    }
    case 3: {
      return i18next.t('April')
    }
    case 4: {
      return i18next.t('May')
    }
    case 5: {
      return i18next.t('June')
    }
    case 6: {
      return i18next.t('July')
    }
    case 7: {
      return i18next.t('August')
    }
    case 8: {
      return i18next.t('September')
    }
    case 9: {
      return i18next.t('October')
    }
    case 10: {
      return i18next.t('November')
    }
    case 11: {
      return i18next.t('December')
    }
    default: {
      return ""
    }
  }
}

const getMonthnameShot = (month: number) => {
  switch (month) {
    case 0: {
      return i18next.t('Jan')
    }
    case 1: {
      return i18next.t('Feb')
    }
    case 2: {
      return i18next.t('Mar')
    }
    case 3: {
      return i18next.t('Apr')
    }
    case 4: {
      return i18next.t('May')
    }
    case 5: {
      return i18next.t('Jun')
    }
    case 6: {
      return i18next.t('Jul')
    }
    case 7: {
      return i18next.t('Aug')
    }
    case 8: {
      return i18next.t('Sep')
    }
    case 9: {
      return i18next.t('Oct')
    }
    case 10: {
      return i18next.t('Nov')
    }
    case 11: {
      return i18next.t('Dec')
    }
    default: {
      return ""
    }
  }
}
export default {
  setAuthorizationToken,
  isNullUndefined,
  axios: $axios,
  keyFinder,
  getNameFromUrl,
  nFixedLines,
  removeSpaces,
  removeEmojis,
  getExtention,
  showSnackbar,
  worldClock,
  diffYMDHMS,
  getDayname,
  getMonthname,
};

const dateFun = (date: number) => {
  return date;
}

export const getDateDayMonth = (getDateDayMonthType: number, day: number, month: number, date: any, year?: any) => {
  const lang = store.getState().authReducer.language;
  const currentLang = lang === "en" ? true :
    (lang === null ? checkDeviceLang() === 'en' ? true : false :
      (checkDeviceLang() === 'en' && lang === "en" ? true : false))
  if (currentLang) {
    if (getDateDayMonthType === 1) {
      return `${getDayname(day)}, ${getMonthname(month)} ${dateFun(date)}`
    } else if (getDateDayMonthType === 2) {
      return `${getDaynameShot(day)}, ${getMonthnameShot(month)} ${dateFun(date)}`

    } else if (getDateDayMonthType === 3) {
      return `${getMonthname(month)} ${dateFun(date)}, ${year}`
    }
  } else {
    if (getDateDayMonthType === 1) {
      return `${getDayname(day)} ${dateFun(date)} ${getMonthname(month)}`

    } else if (getDateDayMonthType === 2) {
      return `${getDaynameShot(day)} ${dateFun(date)} ${getMonthnameShot(month)}`

    } else if (getDateDayMonthType === 3) {
      return `${dateFun(date)} ${getMonthname(month)} ${year}`
    }
  }
}