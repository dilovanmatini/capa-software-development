import { View, Text, Image } from "react-native";

interface BookCardProps {
    name: string;
    author: string;
    price?: string;
    pictureSource?: string
}

export default function BookCard({ name, author, price = 'N/A', pictureSource }: BookCardProps) {
    return (
        <View className="bg-white rounded-xl shadow p-5 mb-4">
            {pictureSource ? (
                <Image
                source={{ uri: pictureSource }}
                className="w-16 h-24 mb-2 rounded"
                />
            ) : (
                <Image
                source={require("../assets/images/react-logo.png")}
                className="w-16 h-16 mb-2"
                />
            )}
            <Text className="text-xl font-bold">{name}</Text>
            <Text className="text-gray-600">{author}</Text>
        </View>
    )
}