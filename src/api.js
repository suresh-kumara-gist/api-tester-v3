export async function sendRequest(method, url, headers, body, authToken) {
  const startTime = performance.now();

  try {
    const requestHeaders = { ...headers };

    if (authToken) {
      requestHeaders['Authorization'] = `Bearer ${authToken}`;
    }

    if (body && (method === 'POST' || method === 'PUT')) {
      requestHeaders['Content-Type'] = 'application/json';
    }

    const options = {
      method,
      headers: requestHeaders,
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = body;
    }

    const response = await fetch(url, options);
    const endTime = performance.now();
    const timeTaken = Math.round(endTime - startTime);

    let responseBody;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      responseBody = await response.json();
    } else {
      responseBody = await response.text();
    }

    // Capture all response headers
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,  // All response headers
      body: responseBody,
      time: timeTaken,
      success: response.ok
    };
  } catch (error) {
    const endTime = performance.now();
    const timeTaken = Math.round(endTime - startTime);

    return {
      status: 0,
      statusText: 'Network Error',
      headers: {},
      body: { error: error.message },
      time: timeTaken,
      success: false,
      error: true
    };
  }
}