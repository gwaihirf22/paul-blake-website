// Regex-free email validation to avoid ReDoS (polynomial regex) on user input.
// Deliberately permissive (format check only, not full RFC 5322) since the
// real validation of deliverability happens via MailerLite's double opt-in.
export function isValidEmail(email) {
  if (typeof email !== 'string' || email.length === 0 || email.length > 254) {
    return false;
  }

  if (/\s/.test(email)) {
    return false;
  }

  const atIndex = email.indexOf('@');
  if (atIndex <= 0 || atIndex !== email.lastIndexOf('@')) {
    return false;
  }

  const localPart = email.slice(0, atIndex);
  const domainPart = email.slice(atIndex + 1);

  if (localPart.length === 0 || domainPart.length === 0) {
    return false;
  }

  const dotIndex = domainPart.indexOf('.');
  if (dotIndex <= 0 || dotIndex === domainPart.length - 1) {
    return false;
  }

  return true;
}
