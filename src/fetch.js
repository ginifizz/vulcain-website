const ENTRYPOINT = process.env.API_ENTRYPOINT; // eslint-disable-line no-undef
const MIME_TYPE = 'application/ld+json';

class FetchError extends Error {
  constructor(violations) {
    super(violations._error);
    this.violations = violations;
  }
}

export async function fetch(id, options = {}) {
  options.credentials = 'include';
  if ('undefined' === typeof options.headers) options.headers = new Headers();

  // Set the default MIME types to JSON-LD
  if (null === options.headers.get('Accept')) options.headers.set('Accept', MIME_TYPE);

  if (
    'undefined' !== options.body &&
    !(options.body instanceof FormData) &&
    null === options.headers.get('Content-Type')
  )
    options.headers.set('Content-Type', MIME_TYPE);

  // Add a Bearer token retrieved from Auth0
  if (options.getTokenSilently) {
    const token = await options.getTokenSilently();
    options.headers.set('Authorization', `Bearer ${token}`);
  }

  return global.fetch(new URL(id, ENTRYPOINT), options).then((response) => {
    if (response.ok) return response;

    if (response.status === 401) {
      throw new Error('Invalid credentials');
    }

    return response.json().then(
      (json) => {
        const _error = json['hydra:description'] || json['hydra:title'] || 'An error occurred.';
        if (!json.violations) throw new FetchError({ _error });

        let errors = { _error };
        json.violations.forEach((violation) =>
          errors[violation.propertyPath]
            ? (errors[violation.propertyPath] += '\n' + errors[violation.propertyPath])
            : (errors[violation.propertyPath] = violation.message)
        );

        throw new FetchError(errors);
      },
      () => {
        throw new FetchError({
          _error: response.statusText || 'An error occurred.',
        });
      }
    );
  });
}
