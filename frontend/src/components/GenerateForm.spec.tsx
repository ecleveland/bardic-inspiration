import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import GenerateForm from './GenerateForm';
import { deferred, stubFetch, type Route } from '@/test/fetch-stub';
import { makeGeneration, makeGenre, makeSpell } from '@/test/fixtures';

/**
 * These specs stub `fetch` rather than `@/lib/api`, so the real client runs and
 * the real SpellSelector and GenreSelector render. Selecting a spell here goes
 * through the same dropdown a user clicks.
 */

const SPELLS = [
  makeSpell(),
  makeSpell({ _id: 'spell-heat-metal', name: 'Heat Metal', level: 2, type: 'spell' }),
];

const GENRES = [
  makeGenre(),
  makeGenre({ _id: 'genre-power-ballad', name: 'Power Ballad', slug: 'power-ballad', category: 'modern' }),
];

function renderForm(routes: Record<string, Route> = {}) {
  const onGenerated = vi.fn();
  const onLoading = vi.fn();
  const fetchStub = stubFetch({
    '/spells': { body: SPELLS },
    '/genres': { body: GENRES },
    ...routes,
  });
  const { container } = render(<GenerateForm onGenerated={onGenerated} onLoading={onLoading} />);
  const form = container.querySelector('form');
  if (!form) throw new Error('GenerateForm rendered without a form element');
  return { onGenerated, onLoading, fetchStub, form };
}

async function chooseSpellAndGenre(user: UserEvent) {
  await user.click(await screen.findByRole('button', { name: /select a spell/i }));
  await user.click(await screen.findByRole('button', { name: /Vicious Mockery/ }));
  await user.click(await screen.findByRole('button', { name: 'Sea Shanty' }));
}

function submitButton() {
  return screen.getByRole('button', { name: /generate lyrics/i });
}

let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('GenerateForm', () => {
  it('fills both selectors from the API', async () => {
    renderForm();

    expect(await screen.findByRole('button', { name: 'Sea Shanty' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Power Ballad' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /select a spell/i }));
    expect(await screen.findByRole('button', { name: /Vicious Mockery/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Heat Metal/ })).toBeInTheDocument();
  });

  it('keeps submit disabled until a spell and a genre are both chosen', async () => {
    renderForm();
    expect(submitButton()).toBeDisabled();

    await user.click(await screen.findByRole('button', { name: /select a spell/i }));
    await user.click(await screen.findByRole('button', { name: /Vicious Mockery/ }));
    expect(submitButton()).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Sea Shanty' }));
    expect(submitButton()).toBeEnabled();
  });

  it('posts the selection and hands the generation back', async () => {
    const generation = makeGeneration();
    const { onGenerated, fetchStub } = renderForm({
      '/generate': { body: generation },
    });

    await chooseSpellAndGenre(user);
    await user.click(submitButton());

    await waitFor(() => expect(onGenerated).toHaveBeenCalledWith(generation));

    const [call] = fetchStub.callsTo('/generate');
    expect(call.method).toBe('POST');
    expect(call.body).toEqual({
      spellId: 'spell-vicious-mockery',
      genreId: 'genre-sea-shanty',
    });
  });

  it('sends the custom prompt when one is written', async () => {
    const { fetchStub } = renderForm({ '/generate': { body: makeGeneration() } });

    await chooseSpellAndGenre(user);
    await user.type(screen.getByPlaceholderText(/specific instructions/i), 'make it filthy');
    await user.click(submitButton());

    await waitFor(() => expect(fetchStub.callsTo('/generate')).toHaveLength(1));
    expect(fetchStub.callsTo('/generate')[0].body).toEqual({
      spellId: 'spell-vicious-mockery',
      genreId: 'genre-sea-shanty',
      customPrompt: 'make it filthy',
    });
  });

  it('brackets the request with onLoading, and disables submit while it runs', async () => {
    const gate = deferred();
    const { onLoading } = renderForm({
      '/generate': async () => {
        await gate.promise;
        return { body: makeGeneration() };
      },
    });

    await chooseSpellAndGenre(user);
    await user.click(submitButton());

    await waitFor(() => expect(screen.getByRole('button', { name: /generating/i })).toBeDisabled());
    expect(onLoading).toHaveBeenCalledWith(true);
    expect(onLoading).not.toHaveBeenCalledWith(false);

    gate.resolve();
    await waitFor(() => expect(onLoading).toHaveBeenLastCalledWith(false));
  });

  it('shows the API error and clears loading when generation fails', async () => {
    const { onGenerated, onLoading } = renderForm({
      '/generate': { status: 500, statusText: 'Internal Server Error' },
    });

    await chooseSpellAndGenre(user);
    await user.click(submitButton());

    expect(await screen.findByText('API error: 500 Internal Server Error')).toBeInTheDocument();
    expect(onGenerated).not.toHaveBeenCalled();
    expect(onLoading).toHaveBeenLastCalledWith(false);
    expect(submitButton()).toBeEnabled();
  });

  /**
   * The empty-selection guard cannot be reached by clicking, and not by Enter
   * in the spell dropdown's search box either: implicit submission runs the
   * default button's activation behavior, and a disabled button has none. So
   * these drive the form's submit event directly. The guard still earns its
   * place as the backstop if that button ever stops being disabled.
   */
  describe('the empty-selection guard', () => {
    it('refuses a submit with nothing selected', async () => {
      const { fetchStub, form } = renderForm({ '/generate': { body: makeGeneration() } });

      fireEvent.submit(form);

      expect(await screen.findByText('Please select both a spell and a genre.')).toBeInTheDocument();
      expect(fetchStub.callsTo('/generate')).toHaveLength(0);
    });

    it('refuses a submit with only a spell selected', async () => {
      const { fetchStub, form } = renderForm({ '/generate': { body: makeGeneration() } });

      await user.click(await screen.findByRole('button', { name: /select a spell/i }));
      await user.click(await screen.findByRole('button', { name: /Vicious Mockery/ }));
      fireEvent.submit(form);

      expect(await screen.findByText('Please select both a spell and a genre.')).toBeInTheDocument();
      expect(fetchStub.callsTo('/generate')).toHaveLength(0);
    });

    it('clears the message once a real submit goes through', async () => {
      const { form } = renderForm({ '/generate': { body: makeGeneration() } });

      fireEvent.submit(form);
      expect(await screen.findByText('Please select both a spell and a genre.')).toBeInTheDocument();

      await chooseSpellAndGenre(user);
      await user.click(submitButton());

      await waitFor(() =>
        expect(
          screen.queryByText('Please select both a spell and a genre.'),
        ).not.toBeInTheDocument(),
      );
    });
  });
});
