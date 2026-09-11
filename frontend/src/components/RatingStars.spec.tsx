import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import RatingStars from './RatingStars';
import { deferred, stubFetch } from '@/test/fetch-stub';
import { makeGeneration } from '@/test/fixtures';

const RATE_PATH = '/generations/generation-1/rate';

function stars() {
  return screen.getAllByRole('button');
}

describe('RatingStars', () => {
  it('renders five stars and no score before anything is rated', () => {
    stubFetch({});
    render(<RatingStars generationId="generation-1" />);

    expect(stars()).toHaveLength(5);
    expect(screen.queryByText(/\/5$/)).not.toBeInTheDocument();
  });

  it('pre-fills the score from currentRating', () => {
    stubFetch({});
    render(<RatingStars generationId="generation-1" currentRating={3} />);

    expect(screen.getByText('3/5')).toBeInTheDocument();
  });

  it('posts the chosen rating and reports it back', async () => {
    const user = userEvent.setup();
    const fetchStub = stubFetch({
      [RATE_PATH]: { body: makeGeneration({ rating: 4 }) },
    });
    const onRated = vi.fn();
    render(<RatingStars generationId="generation-1" onRated={onRated} />);

    await user.click(stars()[3]);

    await waitFor(() => expect(screen.getByText('4/5')).toBeInTheDocument());
    expect(onRated).toHaveBeenCalledWith(4);

    const [call] = fetchStub.callsTo(RATE_PATH);
    expect(call.method).toBe('POST');
    expect(call.body).toEqual({ rating: 4 });
  });

  it('ignores further clicks while a rating is in flight', async () => {
    const user = userEvent.setup();
    const gate = deferred();
    const fetchStub = stubFetch({
      [RATE_PATH]: async () => {
        await gate.promise;
        return { body: makeGeneration({ rating: 2 }) };
      },
    });
    render(<RatingStars generationId="generation-1" />);

    await user.click(stars()[1]);
    await waitFor(() => expect(stars()[0]).toBeDisabled());

    // Every star is disabled, so this lands on nothing.
    await user.click(stars()[4]);

    gate.resolve();
    await waitFor(() => expect(screen.getByText('2/5')).toBeInTheDocument());
    expect(fetchStub.callsTo(RATE_PATH)).toHaveLength(1);
  });

  it('tells the user when the rating fails to save', async () => {
    const user = userEvent.setup();
    const onRated = vi.fn();
    stubFetch({
      [RATE_PATH]: { status: 500, statusText: 'Internal Server Error' },
    });
    render(<RatingStars generationId="generation-1" onRated={onRated} />);

    await user.click(stars()[2]);

    expect(await screen.findByRole('alert')).toHaveTextContent(/couldn't save/i);
    expect(screen.queryByText(/\/5$/)).not.toBeInTheDocument();
    expect(onRated).not.toHaveBeenCalled();
  });

  it('leaves the stars usable after a failure and clears the error on retry', async () => {
    const user = userEvent.setup();
    let shouldFail = true;
    stubFetch({
      [RATE_PATH]: () =>
        shouldFail
          ? { status: 503, statusText: 'Service Unavailable' }
          : { body: makeGeneration({ rating: 5 }) },
    });
    render(<RatingStars generationId="generation-1" />);

    await user.click(stars()[4]);
    expect(await screen.findByRole('alert')).toBeInTheDocument();

    shouldFail = false;
    await user.click(stars()[4]);

    await waitFor(() => expect(screen.getByText('5/5')).toBeInTheDocument());
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
