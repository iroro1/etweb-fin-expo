import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { useTheme } from "@/contexts/theme-context";

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  image: string;
}

interface PromoCarouselProps {
  slides: Slide[];
  intervalMs?: number;
}

const { width } = Dimensions.get("window");
const CONTENT_PADDING = 40; // matches Screen horizontal padding
const SLIDE_WIDTH = width - CONTENT_PADDING;

export function PromoCarousel({ slides, intervalMs = 6000 }: PromoCarouselProps) {
  const router = useRouter();
  const listRef = useRef<FlatList<Slide>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { colors } = useTheme();

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((index) => {
        const next = (index + 1) % slides.length;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.surface, width: SLIDE_WIDTH }]}
    >
      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              contentFit="cover"
            />
            <View style={[styles.overlay, { backgroundColor: colors.overlay }]} />
            <View style={styles.content}>
              <Text style={[styles.title, { color: colors.textInverse }]}>
                {item.title}
              </Text>
              <Text style={[styles.subtitle, { color: colors.textInverse }]}>
                {item.subtitle}
              </Text>
              <Pressable
                onPress={() => router.push(item.ctaHref)}
                style={({ pressed }) => [
                  styles.cta,
                  {
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.9 : 1,
                  },
                ]}
              >
                <Text style={[styles.ctaText, { color: colors.textInverse }]}>
                  {item.ctaText}
                </Text>
                <ArrowRight color={colors.textInverse} size={18} />
              </Pressable>
            </View>
          </View>
        )}
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const nextIndex = Math.round(
            event.nativeEvent.contentOffset.x / SLIDE_WIDTH
          );
          setActiveIndex(nextIndex);
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        getItemLayout={(_, index) => ({
          length: SLIDE_WIDTH,
          offset: SLIDE_WIDTH * index,
          index,
        })}
        style={styles.list}
      />
      <View style={styles.dots}>
        {slides.map((slide, index) => (
          <View
            key={slide.id}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === activeIndex ? colors.primary : colors.borderSecondary,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    overflow: "hidden",
  },
  list: {
    flexGrow: 0,
  },
  slide: {
    width: SLIDE_WIDTH,
    height: SLIDE_WIDTH * 0.5,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.9,
  },
  cta: {
    marginTop: 8,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  dots: {
    position: "absolute",
    bottom: 18,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
});


