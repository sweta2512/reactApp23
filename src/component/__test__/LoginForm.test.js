import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { LoginForm } from "../LoginForm"
import "@testing-library/jest-dom"

describe('integration Test Login Form', () => {
    test('test login is rendered', () => {
        render(<LoginForm />)
        let loginForm = screen.getByRole('button', { name: 'Login' })
        expect(loginForm).toBeInTheDocument()
    })

    test('logs in a user and shows success message', async () => {
        const mockLogin = jest.fn(() => Promise.resolve());// Pretends to be a function (like your real login function)(Mock login function)
        //const mockLogin = jest.fn(() => Promise.reject(new Error('Login failed')));

        render(<LoginForm onLogin={mockLogin} />);

        const input = screen.getByPlaceholderText(/email/i);
        const button = screen.getByRole('button', { name: /login/i });

        fireEvent.change(input, { target: { value: 'user@example.com' } });// fireEvent to fire events
        fireEvent.click(button);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('user@example.com');
            expect(screen.getByText(/welcome!/i)).toBeInTheDocument();
        });
    });
})