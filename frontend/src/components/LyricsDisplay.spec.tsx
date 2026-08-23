import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import LyricsDisplay from './LyricsDisplay';

function setClipboard(writeText?: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', {
    value: writeText ? { writeText } : undefined,
    configurable: true,
  });
}

function setExecCommand(impl?: (command: string) => boolean) {
  Object.defineProperty(document, 'execCommand', { value: impl, configurable: true });
}

// The only button LyricsDisplay renders. Queried by role alone because its
// label is the thing under test in half these specs.
function copyButton() {
  return screen.getByRole('button');
}

afterEach(() => {
  Reflect.deleteProperty(navigator, 'clipboard');
  Reflect.deleteProperty(document, 'execCommand');
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe('LyricsDisplay', () => {
  describe('rendering', () => {
    it('shows the lyrics prop as a single block', () => {
      render(<LyricsDisplay title="The Mocking Tide" lyrics={'first line\nsecond line'} />);

      expect(screen.getByRole('heading', { name: /The Mocking Tide/ })).toBeInTheDocument();
      expect(screen.getByText(/first line/)).toBeInTheDocument();
    });

    it('shows numbered verses, chorus and bridge when there is no lyrics prop', () => {
      render(
        <LyricsDisplay
          title="The Mocking Tide"
          verses={['verse one', 'verse two']}
          chorus="the chorus"
          bridge="the bridge"
        />,
      );

      expect(screen.getByText('Verse 1')).toBeInTheDocument();
      expect(screen.getByText('Verse 2')).toBeInTheDocument();
      expect(screen.getByText('Chorus')).toBeInTheDocument();
      expect(screen.getByText('Bridge')).toBeInTheDocument();
      expect(screen.getByText('verse two')).toBeInTheDocument();
    });

    it('omits chorus and bridge headings when those sections are absent', () => {
      render(<LyricsDisplay title="The Mocking Tide" verses={['verse one']} />);

      expect(screen.queryByText('Chorus')).not.toBeInTheDocument();
      expect(screen.queryByText('Bridge')).not.toBeInTheDocument();
    });
  });

  describe('copying', () => {
    it('copies the title followed by the assembled sections', async () => {
      const user = userEvent.setup();
      const writeText = vi.fn().mockResolvedValue(undefined);
      setClipboard(writeText);
      render(
        <LyricsDisplay
          title="The Mocking Tide"
          verses={['verse one', 'verse two']}
          chorus="the chorus"
          bridge="the bridge"
        />,
      );

      await user.click(copyButton());

      expect(writeText).toHaveBeenCalledWith(
        'The Mocking Tide\n\n' +
          '[Verse 1]\nverse one\n\n' +
          '[Verse 2]\nverse two\n\n' +
          '[Chorus]\nthe chorus\n\n' +
          '[Bridge]\nthe bridge',
      );
    });

    it('copies the raw lyrics when the lyrics prop is used', async () => {
      const user = userEvent.setup();
      const writeText = vi.fn().mockResolvedValue(undefined);
      setClipboard(writeText);
      render(<LyricsDisplay title="The Mocking Tide" lyrics="just the words" />);

      await user.click(copyButton());

      expect(writeText).toHaveBeenCalledWith('The Mocking Tide\n\njust the words');
    });

    it('confirms the copy, then goes back to idle after two seconds', async () => {
      // fireEvent rather than userEvent: userEvent's internal delays deadlock
      // against fake timers, and this test is specifically about the timer.
      vi.useFakeTimers();
      setClipboard(vi.fn().mockResolvedValue(undefined));
      render(<LyricsDisplay title="The Mocking Tide" lyrics="just the words" />);

      await act(async () => {
        fireEvent.click(copyButton());
      });
      expect(screen.getByRole('status')).toHaveTextContent('Copied!');

      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(screen.getByRole('status')).toHaveTextContent('Copy');
      expect(screen.getByRole('status')).not.toHaveTextContent('Copied!');
    });

    it('restarts the two-second window instead of stacking timers', async () => {
      vi.useFakeTimers();
      setClipboard(vi.fn().mockResolvedValue(undefined));
      render(<LyricsDisplay title="The Mocking Tide" lyrics="just the words" />);

      await act(async () => {
        fireEvent.click(copyButton());
      });
      act(() => {
        vi.advanceTimersByTime(1500);
      });
      await act(async () => {
        fireEvent.click(copyButton());
      });

      // 1500ms after the first copy but only 1000 after the second, so the
      // first copy's timer must not be the one that fires.
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.getByRole('status')).toHaveTextContent('Copied!');
      expect(vi.getTimerCount()).toBe(1);

      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.getByRole('status')).toHaveTextContent('Copy');
    });

    it('drops the pending reset timer when it unmounts', async () => {
      vi.useFakeTimers();
      setClipboard(vi.fn().mockResolvedValue(undefined));
      const { unmount } = render(<LyricsDisplay title="The Mocking Tide" lyrics="just the words" />);

      await act(async () => {
        fireEvent.click(copyButton());
      });
      expect(vi.getTimerCount()).toBe(1);

      unmount();

      expect(vi.getTimerCount()).toBe(0);
    });

    it('still confirms when the Clipboard API is unavailable and execCommand carries it', async () => {
      const user = userEvent.setup();
      setClipboard(undefined);
      setExecCommand(vi.fn().mockReturnValue(true));
      render(<LyricsDisplay title="The Mocking Tide" lyrics="just the words" />);

      await user.click(copyButton());

      expect(await screen.findByText('Copied!')).toBeInTheDocument();
    });

    it('says the copy failed instead of claiming success (VEG-76)', async () => {
      const user = userEvent.setup();
      setClipboard(vi.fn().mockRejectedValue(new Error('permission denied')));
      setExecCommand(vi.fn().mockReturnValue(false));
      render(<LyricsDisplay title="The Mocking Tide" lyrics="just the words" />);

      await user.click(copyButton());

      expect(await screen.findByText('Copy failed')).toBeInTheDocument();
      expect(screen.queryByText('Copied!')).not.toBeInTheDocument();
    });

    it('recovers on a later attempt after a failure', async () => {
      const user = userEvent.setup();
      const writeText = vi
        .fn()
        .mockRejectedValueOnce(new Error('permission denied'))
        .mockResolvedValueOnce(undefined);
      setClipboard(writeText);
      setExecCommand(vi.fn().mockReturnValue(false));
      render(<LyricsDisplay title="The Mocking Tide" lyrics="just the words" />);

      await user.click(copyButton());
      expect(await screen.findByText('Copy failed')).toBeInTheDocument();

      await user.click(copyButton());
      expect(await screen.findByText('Copied!')).toBeInTheDocument();
    });
  });
});
