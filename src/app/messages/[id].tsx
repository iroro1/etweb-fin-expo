import { useLocalSearchParams } from "expo-router";
import { PlaceholderScreen } from "@/screens/PlaceholderScreen";

export default function ConversationScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  return (
    <PlaceholderScreen
      title={`Conversation ${id ?? ""}`.trim()}
      description="Conversation threads and chat UI are scheduled for Phase 3."
    />
  );
}


