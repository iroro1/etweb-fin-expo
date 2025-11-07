import { useLocalSearchParams } from "expo-router";
import { PlaceholderScreen } from "@/screens/PlaceholderScreen";

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  return (
    <PlaceholderScreen
      title={`Order ${id ?? ""}`.trim()}
      description="Detailed order timeline and receipt will appear here."
    />
  );
}


