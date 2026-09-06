import { afterEach, describe, expect, it, vi } from 'vitest';
import { copyText } from './clipboard';

/**
 * jsdom implements neither `navigator.clipboard` nor `document.execCommand`,
 * which is a fair model of the browsers this helper exists for: the Clipboard
 * API is secure-context only, so a plain-HTTP origin sees it as undefined.
 */

function setClipboard(writeText?: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', {
    value: writeText ? { writeText } : undefined,
    configurable: true,
  });
}

function setExecCommand(impl?: (command: string) => boolean) {
  Object.defineProperty(document, 'execCommand', {
    value: impl,
    configurable: true,
  });
}

afterEach(() => {
  Reflect.deleteProperty(navigator, 'clipboard');
  Reflect.deleteProperty(document, 'execCommand');
  vi.restoreAllMocks();
});

describe('copyText', () => {
  it('writes through the Clipboard API when it is available', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard(writeText);

    await expect(copyText('a bawdy limerick')).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith('a bawdy limerick');
  });

  it('falls back to execCommand when the Clipboard API rejects', async () => {
    setClipboard(vi.fn().mockRejectedValue(new Error('permission denied')));
    const execCommand = vi.fn().mockReturnValue(true);
    setExecCommand(execCommand);

    await expect(copyText('a bawdy limerick')).resolves.toBe(true);
    expect(execCommand).toHaveBeenCalledWith('copy');
  });

  it('falls back to execCommand when there is no Clipboard API at all', async () => {
    setClipboard(undefined);
    const execCommand = vi.fn().mockReturnValue(true);
    setExecCommand(execCommand);

    await expect(copyText('a bawdy limerick')).resolves.toBe(true);
    expect(execCommand).toHaveBeenCalledWith('copy');
  });

  it('reports failure when neither path works', async () => {
    setClipboard(vi.fn().mockRejectedValue(new Error('permission denied')));
    setExecCommand(vi.fn().mockReturnValue(false));

    await expect(copyText('a bawdy limerick')).resolves.toBe(false);
  });

  it('reports failure when execCommand is missing rather than throwing', async () => {
    setClipboard(undefined);
    setExecCommand(undefined);

    await expect(copyText('a bawdy limerick')).resolves.toBe(false);
  });

  it('leaves no scratch textarea behind on either outcome', async () => {
    setClipboard(undefined);
    setExecCommand(vi.fn().mockReturnValue(true));
    await copyText('a bawdy limerick');
    expect(document.querySelectorAll('textarea')).toHaveLength(0);

    setExecCommand(
      vi.fn().mockImplementation(() => {
        throw new Error('nope');
      }),
    );
    await copyText('a bawdy limerick');
    expect(document.querySelectorAll('textarea')).toHaveLength(0);
  });

  it('reports failure rather than rejecting when the DOM refuses the scratch textarea', async () => {
    // The boolean contract is a promise TypeScript cannot enforce, so it needs
    // a test. Before this, the setup ran outside the try and copyText rejected.
    setClipboard(undefined);
    vi.spyOn(document.body, 'appendChild').mockImplementation(() => {
      throw new Error('an extension ate the body');
    });

    await expect(copyText('a bawdy limerick')).resolves.toBe(false);
  });

  it('puts the text in the scratch textarea it asks execCommand to copy', async () => {
    setClipboard(undefined);
    let copied: string | undefined;
    setExecCommand(() => {
      copied = (document.activeElement as HTMLTextAreaElement | null)?.value;
      return true;
    });

    await copyText('a bawdy limerick');

    expect(copied).toBe('a bawdy limerick');
  });
});
