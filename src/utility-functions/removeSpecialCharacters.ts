export default function removeSpecialChars(email: string) {
  return email.replace(/[^\w\s]/gi, '');
}
