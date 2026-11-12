export type Role = 'NURSE' | 'DOCTOR' | 'PHARMACIST';
export type User = {id: string; name: string; role: Role};
export type LoginResult = {user: User; accessToken: string};

// Android emulator reaches the host computer via 10.0.2.2.
// Replace the port/path with your backend configuration.
const API_BASE_URL = 'http://10.0.2.2:3000/api';

export async function loginUser(identifier: string, password: string): Promise<LoginResult> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({identifier, password}),
  });
  if (!response.ok) {
    throw new Error(response.status === 401 ? 'Invalid credentials' : 'Unable to sign in');
  }
  const result: LoginResult = await response.json();
  if (!result?.accessToken || !result?.user ||
      !['NURSE', 'DOCTOR', 'PHARMACIST'].includes(result.user.role)) {
    throw new Error('Unexpected login response from server');
  }
  return result;
}
