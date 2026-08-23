/**
 * Copies text to the clipboard, reporting whether it worked.
 *
 * The Clipboard API is the fast path but it is secure-context only and
 * permission-gated, so a plain-HTTP origin or a denied prompt has to fall back
 * to a scratch textarea and the deprecated `document.execCommand('copy')`.
 * Callers get a boolean rather than a rejected promise because "the copy did
 * not happen" is a UI state, not an exception.
 */
export async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the textarea path.
    }
  }
  return copyViaTextarea(text);
}

function copyViaTextarea(text: string): boolean {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  // Off-screen but still focusable. `display: none` would make it unselectable
  // and iOS zooms toward any focused field smaller than 16px.
  textarea.style.position = 'fixed';
  textarea.style.top = '-9999px';
  textarea.style.fontSize = '16px';
  document.body.appendChild(textarea);

  try {
    textarea.focus();
    textarea.select();
    // execCommand is gone from the spec but is the only fallback that works
    // without a permission prompt. Missing entirely in some environments,
    // hence the catch rather than an existence check.
    return document.execCommand('copy');
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}
