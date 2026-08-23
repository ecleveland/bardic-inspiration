import { APP_FILTER } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters';

// Every other spec registers the filter by hand, so deleting the provider
// below would leave all of them green while production silently loses error
// sanitizing. Asserting on the module metadata is the cheapest thing that
// fails when that happens, and it needs no database.
describe('AppModule wiring', () => {
  const providers = Reflect.getMetadata('providers', AppModule) as {
    provide?: unknown;
    useClass?: unknown;
  }[];

  it('should register AllExceptionsFilter globally', () => {
    expect(providers).toEqual(
      expect.arrayContaining([
        { provide: APP_FILTER, useClass: AllExceptionsFilter },
      ]),
    );
  });
});
