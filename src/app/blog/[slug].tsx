import { useLocalSearchParams } from "expo-router";
import { PlaceholderScreen } from "@/screens/PlaceholderScreen";

export default function BlogPostScreen() {
  const { slug } = useLocalSearchParams<{ slug?: string }>();

  return (
    <PlaceholderScreen
      title={slug ? slug.replace(/-/g, " ") : "Blog Post"}
      description="Detailed blog content will appear here in a future milestone."
    />
  );
}


