const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

type requestProps = {
  path: string;
  options?: RequestOptions;
  type?: "default" | "withHeaders";
}

export async function request<T>({ path, options = {}, type = "default" }: requestProps): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json', ...headers } : headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!response.ok) {
    throw new ApiError(response.statusText, response.status);
  }
  const result = await response.json();
  if (type === "withHeaders") {
    const totalCount = Number(response.headers.get('X-Total-Count') ?? '0');
    return { result, totalCount } as T
  }
  return (result) as T;
}

export class ApiError extends Error {
  public readonly status: number;

  public constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

