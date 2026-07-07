import { Alert,Button,TextInput,ScrollView, View, Text, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useCallback, useEffect } from 'react';
import BookCard from "../../components/BookCard";
import { fetchBooks } from "../../services/bookService";

interface Book {
    id: number;
    title: string;
    authors: string;
    formats: string;
}

export default function BookScreen () {
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState<Book[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loadBooks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const books = await fetchBooks();
            setBooks(books);
        } catch (error) {
            setError("Failed to fetch books.");
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        )
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center">
                <Text className="text-red-500">{error}</Text>
                <Button title="Retry" onPress={loadBooks} />
            </SafeAreaView>
        )
    }

    if (!isAuthenticated) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center p-5">
                <View className="p-5 bg-white rounded-xl shadow m-5">
                    <Text className="text-2xl font-bold mb-4">Login</Text>

                    <TextInput
                        placeholder="Email"
                        className="border border-gray-300 rounded p-2 mb-4"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        className="border border-gray-300 rounded p-2 mb-4"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button title="Login" onPress={() => setIsAuthenticated(true)} />
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className="flex-1">
            <FlatList
                data={books}
                keyExtractor={(book) => book.id.toString()}
                contentContainerClassName="p-5 pb-10"
                renderItem={({ item }) => (
                    <BookCard
                        name={item.title}
                        author={item.authors}
                        pictureSource={item.formats}
                    />
                )}
                ListEmptyComponent={() => (
                    <View className="flex-1 items-center justify-center">
                        <Text>No books available.</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}