import { FlatListProps } from "react-native";
import { HeaderConfig } from "../types/HeaderConfig";
import { ScrollPair } from "../types/ScrollPair";

const headerConfig = useMemo<HeaderConfig>(
  () => ({
    heightCollapsed: defaultHeaderHeight,
    heightExpanded: headerHeight,
  }),
  [defaultHeaderHeight, headerHeight],
);

const scrollPairs = useMemo<ScrollPair[]>(
  () => [
    { list: friendsRef, position: friendsScrollValue },
    { list: suggestionsRef, position: suggestionsScrollValue },
    { list: otherRef, position: otherScrollValue },
  ],
  [friendsRef, friendsScrollValue, suggestionsRef, 
    suggestionsScrollValue, otherRef, otherScrollValue],
);

const useScrollSync = (
  scrollPairs: ScrollPair[],
  headerConfig: HeaderConfig
) => {
  const sync: NonNullable<FlatListProps<any>["onMomentumScrollEnd"]> = (
    event
  ) => {
    const { y } = event.nativeEvent.contentOffset;

    const { heightCollapsed, heightExpanded } = headerConfig;

    const headerDiff = heightExpanded - heightCollapsed;

    for (const { list, position } of scrollPairs) {
      const scrollPosition = position.value ?? 0;

      if (scrollPosition > headerDiff && y > headerDiff) {
        continue;
      }

      list.current?.scrollToOffset({
        offset: Math.min(y, headerDiff),
        animated: false,
      });
    }
  };
  return { sync };
};

export default useScrollSync;
