import { useEffect, useState } from 'react';
import { authFetch, isLoggedIn } from '../services/auth';

function Dashboard () {
    const loggedIn = isLoggedIn();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!loggedIn) return;

        async function loadUsers() {
            try {
                const response = await authFetch('http://localhost:3000/users');

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to fetch users');
                }

                const data = await response.json();
                setUsers(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        loadUsers();
    }, [loggedIn]);

    if (!loggedIn) {
        return (
            <div className="p-5">
                <h1 className="text-3xl font-bold text-red-400">
                    Please log in to access the dashboard.
                </h1>
            </div>
        );
    }

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-5">
                Dashboard Page
            </h1>

            {loading && <p>Loading users...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <table className="border-collapse border w-full max-w-3xl">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 text-left">ID</th>
                            <th className="border p-2 text-left">Name</th>
                            <th className="border p-2 text-left">Email</th>
                            <th className="border p-2 text-left">Birthdate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border p-2">{user.id}</td>
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">
                                    {user.birthdate
                                        ? new Date(user.birthdate).toLocaleDateString()
                                        : '-'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Dashboard;
