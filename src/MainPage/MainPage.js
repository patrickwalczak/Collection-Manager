import LargestCollectionsController from "./LargestCollectionsController";
import LatestItemsController from "./LatestItemsController";
import MainPageWrapper from "./MainPageWrapper";

const MainPage = () => {
  return (
    <MainPageWrapper>
      <LatestItemsController />
      <LargestCollectionsController />
    </MainPageWrapper>
  );
};
export default MainPage;

/* Main page contains:
list of latest items (name, collections, authors);
list of the top 5 largest collections;
tag cloud (when the user clicks on the tag you display the list of items — in general you should use “search results page” for it).
 */
