export default class Validators {
  static validMailString(mailString) {
    const emailArray = mailString
      .replace(/ /g, '')
      .replace(/;/g, ',')
      .split(',');

    return emailArray.every(email => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email));
  }

  static validPassword(value, minLength) {
    return !(!value || value === '' || value.length < minLength);
  }
}
